create type dayenum as enum ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
create type termenum as enum ('Fall', 'Spring', 'First Summer','Second Summer','Six Week Summer');

create table if not exists "Semester"
(
    s_id serial
        constraint semester_pk
            primary key,
    s_term termenum not null,
    s_year integer check (s_year > 2000 and s_year < 2200) not null
);

create table if not exists "Department"
(
    dept_id serial not null
        constraint department_pk
            primary key,
    dept_name varchar(100) not null unique
);

create table if not exists "Profesor"
(
    p_id serial not null
        constraint proffesor_pk
            primary key,
    p_name varchar(30) not null,
    dept_id integer not null
        constraint dept_id
            references "Department"
);

create table if not exists "Student"
(
    st_id serial
        constraint student_pk
            primary key,
    st_email varchar(50) not null,
    dept_id integer not null
        constraint dept_id
            references "Department"
);

create table if not exists "PreEnrollment"
(
    pe_id serial
        constraint preenrollment_pk
            primary key,
    pe_name varchar(20) not null,
    s_id integer not null
        constraint s_id
            references "Semester",
    st_id integer not null
        constraint st_id
            references "Student"
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
            references "Department"
);

create table if not exists "SemesterOffer"
(
    so_id serial
        constraint semesteroffer_pk
            primary key,
    so_capacity integer,
    c_id integer not null
        constraint c_id
            references "Course",
    s_id integer not null
        constraint s_id
            references "Semester"
);

create table if not exists "TimeSlot"
(
    ts_start_time time not null check(ts_start_time < ts_end_time),
    ts_end_time time not null check(ts_start_time < ts_end_time),
    so_id integer not null
        constraint so_id
            references "SemesterOffer",
    ts_day dayenum not null
);

create table if not exists "PreEnrollmentSelection"
(
    pe_id integer not null
        constraint pe_id
            references "PreEnrollment",
    so_id integer not null
        constraint so_id
            references "SemesterOffer",
    primary key (pe_id, so_id)
);

create table if not exists "ProfessorTeaches"
(
    so_id integer not null
        constraint so_id
            references "SemesterOffer",
    p_id integer not null
        constraint p_id
            references "Profesor",
    primary key(so_id, p_id)
);

create table if not exists "CoursesTaken"
(
    st_id integer
        constraint st_id
            references "Student",
    c_id  integer
        constraint c_id
            references "Course",
    s_id  integer
        constraint s_id
            references "Semester"

);

