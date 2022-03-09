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
end;$$