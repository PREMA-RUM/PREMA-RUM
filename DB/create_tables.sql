create table if not exists "Day"
(
    d_id serial primary key,
    d_name varchar(50) unique
);

create table if not exists "Term"
(
    t_id serial constraint term_pk primary key,
    t_name varchar(50) constraint term_name_unique unique
);

create table if not exists "Semester"
(
    s_id serial
        constraint semester_pk
            primary key,
    t_id integer constraint t_id references "Term" not null,
    s_year integer check (s_year > 2000 and s_year < 2200) not null
);

create table if not exists "Department"
(
    dept_id serial not null
        constraint department_pk
            primary key,
    dept_name varchar(100) not null unique
);

create table if not exists "Professor"
(
    p_id serial not null
        constraint professor_pk
            primary key,
    p_name varchar(30) not null,
    dept_id integer not null
        constraint dept_id
            references "Department" on delete restrict
);

create table if not exists "Student"
(
    st_id serial
        constraint student_pk
            primary key,
    st_email varchar(50) not null constraint st_email_unique unique,
    dept_id integer
        constraint dept_id
            references "Department" on delete restrict
);

create table if not exists "PreEnrollment"
(
    pe_id serial
        constraint preenrollment_pk
            primary key,
    pe_name varchar(100) not null,
    s_id integer not null
        constraint s_id
            references "Semester" on delete restrict,
    st_id integer not null
        constraint st_id
            references "Student" on delete cascade
);

create table if not exists "Course"
(
    c_id serial not null
        constraint course_pk
            primary key,
    c_code varchar(10) not null,
    c_desc varchar(100),
    c_prereq varchar(100),
    c_coreq varchar(100),
    c_credit integer not null check ( c_credit >= 0 and c_credit < 7 ),
    c_name varchar(30) not null,
    dept_id integer
        constraint dept_id
            references "Department" on delete restrict
);

create table if not exists "SemesterOffer"
(
    so_id serial
        constraint semesteroffer_pk
            primary key,
    so_capacity integer,
    so_section_name varchar(30) not null,
    so_classroom varchar(30),
    c_id integer not null
        constraint c_id
            references "Course" on delete restrict,
    s_id integer not null
        constraint s_id
            references "Semester" on delete restrict
);

create table if not exists "TimeSlot"
(
    ts_start_time time not null check(ts_start_time < ts_end_time),
    ts_end_time time not null check(ts_start_time < ts_end_time),
    so_id integer not null
        constraint so_id
            references "SemesterOffer" on delete restrict,
    d_id integer constraint d_id references "Day" on delete restrict
        not null,
    constraint timeslot_pk primary key (ts_start_time, ts_end_time, so_id, d_id)
);

create table if not exists "PreEnrollmentSelection"
(
    pe_id integer not null
        constraint pe_id
            references "PreEnrollment" on delete cascade,
    so_id integer not null
        constraint so_id
            references "SemesterOffer" on delete restrict,
    primary key (pe_id, so_id)
);

create table if not exists "ProfessorTeaches"
(
    so_id integer not null
        constraint so_id
            references "SemesterOffer" on delete restrict,
    p_id integer not null
        constraint p_id
            references "Professor" on delete restrict,
    constraint professorteaches_pk primary key(so_id, p_id)
);

create table if not exists "CoursesTaken"
(
    st_id integer
        constraint st_id
            references "Student" on delete cascade,
    c_id  integer
        constraint c_id
            references "Course" on delete restrict,
    s_id  integer
        constraint s_id
            references "Semester" on delete restrict,
    constraint courses_taken_pk primary key (st_id, c_id)
);

-- Stored Procedures
create or replace function sp_conflicting_selections(
    pre_enrollment_id integer
)
    returns table (
                      semester_offer_id_a integer,
                      semester_offer_id_b integer,
                      start_time_a time,
                      end_time_a time,
                      start_time_b time,
                      end_time_b time,
                      day_id integer
                  )
    language plpgsql as $$
begin
    create or replace temp view PreEnrollmentsWithSlots
    as
    select pe_id, so_id, ts_start_time, ts_end_time, d_id
    from "PreEnrollment"
             natural inner join "PreEnrollmentSelection"
             natural inner join "SemesterOffer"
             natural inner join "Course"
             natural inner join "TimeSlot"
    order by pe_id;

    return query select
                     A.so_id semester_offer_id_a, B.so_id semester_offer_id_b,
                     A.ts_start_time start_time_a, A.ts_end_time end_time_a,
                     B.ts_start_time start_time_b, B.ts_end_time end_time_b,
                     A.d_id day_id
                 from PreEnrollmentsWithSlots A
                          inner join PreEnrollmentsWithSlots B
                                     on A.pe_id = B.pe_id AND
                                        A.so_id != B.so_id AND
                                        A.d_id = B.d_id AND
                                        A.so_id < B.so_id AND
                                        (A.ts_start_time, A.ts_end_time) OVERLAPS (B.ts_start_time, B.ts_end_time)
                 where A.pe_id = pre_enrollment_id;
end;
$$;

create or replace function top_100_courses_for_pre_enrollment(_pre_enrollment_id integer)
    returns TABLE(so_id integer, so_capacity integer, so_section_name character varying, c_id integer, s_id integer, so_classroom character varying, rank numeric)
    language plpgsql
as
$$
    #variable_conflict use_column
begin
    return query
        with
            -- Student Data
            current_preenrollment_selections as
                (
                    -- Get the pre-enrollment of interest
                    SELECT c_id selection
                    FROM "PreEnrollment"
                             natural inner join "PreEnrollmentSelection"
                             natural inner join "SemesterOffer"
                             natural inner join "Course"
                    WHERE pe_id = _pre_enrollment_id
                ),
            student_department as (
                SELECT dept_id
                FROM "Student"
                         natural inner join "PreEnrollment"
                where pe_id = _pre_enrollment_id LIMIT 1
            ),
            --- Statistics
            global_selected_courses as
                (
                    -- Simple join to get all selections of all pre enrollments
                    -- not filtering by dept_id will output global scores
                    SELECT "PreEnrollment".pe_id, "Course".c_id, "Student".dept_id
                    FROM
                        "PreEnrollment"
                            inner join "Student" on "PreEnrollment".st_id = "Student".st_id
                            inner join "PreEnrollmentSelection" on "PreEnrollment".pe_id = "PreEnrollmentSelection".pe_id
                            inner join "SemesterOffer" on "PreEnrollmentSelection".so_id = "SemesterOffer".so_id
                            inner join "Course" on "SemesterOffer".c_id = "Course".c_id
                ),
            department_selected_courses as
                (
                    select * from global_selected_courses
                    where dept_id = (select dept_id from student_department)
                ),
            -- VECTORS
            course_vector_global as
                (
                    -- Compute how many a times a course has been selected with another
                    -- In all pre-enrollments
                    SELECT sc1.c_id c_id_a, sc2.c_id c_id_b, count(*) frequency
                    FROM global_selected_courses sc1, global_selected_courses sc2
                    WHERE sc1.pe_id = sc2.pe_id -- In the same pre enrollment
                      AND sc1.c_id != sc2.c_id
                    GROUP BY sc1.c_id, sc2.c_id
                ),
            course_vector_dept as
                (
                    SELECT sc1.c_id c_id_a, sc2.c_id c_id_b, count(*) frequency
                    FROM department_selected_courses sc1, global_selected_courses sc2
                    WHERE sc1.pe_id = sc2.pe_id -- In the same pre enrollment
                      AND sc1.c_id != sc2.c_id
                    GROUP BY sc1.c_id, sc2.c_id
                ),
            course_vector_courses_taken as
                (
                    SELECT ct1.c_id c_id_a, ct2.c_id c_id_b, count(*) frequency
                    FROM ("CoursesTaken" natural inner join "Student") ct1, "CoursesTaken" ct2
                    WHERE ct1.c_id != ct2.c_id
                      AND ct1.st_id = ct2.st_id
                      AND ct1.dept_id = (select dept_id from student_department) -- SHOULD BE A PARAMETER
                    group by ct1.c_id, ct2.c_id
                ),
            -- SCORING
            global_scores as
                (
                    -- Compute dot product by pairing target pre-enrollment
                    -- selections with course x vector component
                    SELECT c_id_a c_id, sum(frequency) score
                    from course_vector_global cv
                             inner join current_preenrollment_selections cp
                                        on cv.c_id_b = cp.selection
                    group by c_id_a
                    order by c_id_a
                ),
            dept_scores as
                (
                    SELECT c_id_a c_id, sum(frequency) score
                    from course_vector_dept cv
                             inner join current_preenrollment_selections cp
                                        on cv.c_id_b = cp.selection
                    group by c_id_a
                    order by c_id_a
                ),
            courses_taken_scores as
                (
                    SELECT c_id_a c_id, sum(frequency) score
                    from course_vector_courses_taken cv
                             inner join current_preenrollment_selections cp
                                        on cv.c_id_b = cp.selection
                    group by c_id_a
                    order by c_id_a
                ),
            all_stats as (
                select dept_scores.c_id,
                       dept_scores.score
                           / (
                           SELECT max(score)
                           FROM dept_scores
                       )* 0.75
                           dept_score,
                       coalesce(global_scores.score, 0)
                           /(
                           SELECT max(score)
                           FROM global_scores
                       ) * 0.20
                           global_score,
                       coalesce(courses_taken_scores.score, 0)
                           /(
                           SELECT max(courses_taken_scores.score)
                           FROM courses_taken_scores
                       ) *0.05
                           course_taken_score
                from dept_scores
                         left join global_scores on dept_scores.c_id = global_scores.c_id
                         left join courses_taken_scores on dept_scores.c_id = courses_taken_scores.c_id
            ),
            final_scores as
                (
                    select c_id,
                           coalesce(dept_score, 0) final_dept_score,
                           coalesce(global_score, 0) final_global_score,
                           coalesce(course_taken_score, 0) final_course_taken_score
                    from all_stats natural right join "Course"
                ),
            aggregate_rank as
                (
                    SELECT c_id, (final_dept_score + final_global_score + final_course_taken_score) rank
                    FROM final_scores
                ),
            -- SELECT ONLY COURSES in current semester
            semester_courses as
                (
                    SELECT
                        so_id, so_capacity, so_section_name, c_id, s_id, so_classroom, round(rank, 3) as rank
                    FROM aggregate_rank
                             natural inner join "SemesterOffer"
                    WHERE s_id = (
                        (
                            SELECT s_id
                            FROM "PreEnrollment"
                            WHERE pe_id = _pre_enrollment_id
                            LIMIT 1
                        )
                    ) AND
                            c_id not in (select selection from current_preenrollment_selections)
                    order by rank desc
                )
        select * FROM semester_courses LIMIT 100;
end;
$$;