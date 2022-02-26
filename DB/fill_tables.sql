INSERT INTO "Day" (d_name) VALUES 
    ('Monday'), 
    ('Tuesday'), 
    ('Wednesday'), 
    ('Thursday'), 
    ('Friday'), 
    ('Saturday');

INSERT INTO "Term" (t_name) VALUES 
    ('Fall'), 
    ('Spring'), 
    ('First Summer'),
    ('Second Summer'),
    ('Six Week Summer');

INSERT INTO "Department" (dept_name) VALUES
    ('Computer Science And Engineering'),
    ('Software Engineering'),
    ('Computer & Electrical Engineering'),
    ('Civil Engineering'),
    ('Industrial Engineering'),
    ('Business Administration - Finance'),
    ('Business Administration - Marketing'),
    ('Business Administration - Information Systems');

INSERT INTO "Course"
    (c_code, c_desc, c_prereq, c_coreq, c_credit, c_name, dept_id)
    VALUES
    ('CIIC4050', 'Operating Systems', '(ICOM4035 O CIIC4020) Y (CIIC4082 O INEL4206)', '', 4, 'OS', 1),
    ('INSO4101', '', 'ICOM4035 O CIIC4020', '', 3, 'Intro to Software', 1),
    ('JAPO0101', '', '', '', 3, 'Japones', 8),
    ('CIIC 3015', '', '', '', 3, 'Into to computer science', 1),
    ('ININ4010', '', '', '', 4, 'Prob and statistics', 5);

INSERT INTO "Semester" (t_id, s_year) VALUES
    (1, 2020),
    (3, 2020),
    (5, 2020);

INSERT INTO "SemesterOffer" (so_capacity, so_section_name, c_id, s_id) VALUES
    (30, '30H', 1, 1),
    (20, '05', 2, 1),
    (10, '02', 3, 1),
    (20, '03', 4, 2);

INSERT INTO "Student" (st_email, dept_id) VALUES
     ('pepo@upr.edu', 1),
     ('keno@upr.edu', 2),
     ('tata@upr.edu', 3);

INSERT INTO  "CoursesTaken" (st_id, c_id, s_id) VALUES
    (1, 1, 1),
    (1, 2, NULL),
    (2, 5, 2);

INSERT INTO "Professor" (p_name, dept_id) VALUES
    ('Milton Quintana', 1),
    ('Pedro Figueroa', 2),
    ('Juano Vega', 4),
    ('Pedro Pierluisi', 5);

INSERT INTO "ProfessorTeaches" (so_id, p_id) VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (4, 4);

INSERT INTO "TimeSlot" (ts_start_time, ts_end_time, so_id, d_id) VALUES
    ('3:30'::time, '4:45'::time, 1, 1),
    ('3:30'::time, '4:45'::time, 1, 3),
    ('3:30'::time, '4:45'::time, 1, 6);

INSERT INTO "PreEnrollment" (pe_name, s_id, st_id) VALUES
    ('Mi primera matricula', 1, 1);

INSERT INTO "PreEnrollmentSelection" (pe_id, so_id) VALUES
    (1, 1),
    (1, 2);