create table "Semester"
(
    s_id   serial
        constraint semester_pk
            primary key,
    s_term varchar(50) not null,
    s_year varchar(10)
);

create table "Department"
(
    dept_id   integer      not null
        constraint department_pk
            primary key,
    dept_name varchar(100) not null
);

create table "Profesor"
(
    p_id    integer default nextval('"Proffesor_p_id_seq"'::regclass) not null
        constraint proffesor_pk
            primary key,
    p_name  varchar(30)                                               not null,
    dept_id integer                                                   not null
        constraint dept_id
            references "Department"
);

create table "Student"
(
    st_id    serial
        constraint student_pk
            primary key,
    st_email varchar(50) not null,
    dept_id  integer     not null
        constraint dept_id
            references "Department"
);

create table "PreEnrollment"
(
    pe_id   serial
        constraint preenrollment_pk
            primary key,
    pe_name varchar(20) not null,
    s_id    integer     not null
        constraint s_id
            references "Semester",
    st_id   integer     not null
        constraint st_id
            references "Student"
);

create table "Course"
(
    c_id     integer     not null
        constraint course_pk
            primary key,
    c_code   varchar(10) not null,
    c_desc   varchar(100),
    c_prereq varchar(100),
    c_coreq  varchar(100),
    c_credit integer     not null,
    c_name   varchar(30) not null,
    dept_id  integer
        constraint dept_id
            references "Department"
);

create table "SemesterOffer"
(
    so_id       serial
        constraint semesteroffer_pk
            primary key,
    so_capacity integer,
    p_id        integer not null
        constraint p_id
            references "Profesor",
    c_id        integer not null
        constraint c_id
            references "Course",
    s_id        integer not null
        constraint s_id
            references "Semester"
);

create table "TimeSlot"
(
    ts_start_time time    not null,
    ts_end_time   time    not null,
    so_id         integer not null
        constraint so_id
            references "SemesterOffer",
    ts_day        dayenum not null
);

create table "PreEnrollmentSelection"
(
    pe_id integer not null
        constraint pe_id
            references "PreEnrollment",
    so_id integer not null
        constraint so_id
            references "SemesterOffer"
);

create table "ProfessorTeaches"
(
    so_id integer not null
        constraint so_id
            references "SemesterOffer",
    p_id  integer not null
        constraint p_id
            references "Profesor"
);

create unique index department_dept_name_uindex
    on "Department" (dept_name);

create table "CoursesTaken"
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

