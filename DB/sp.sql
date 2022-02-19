
create or replace procedure sp_changeProfessorName(professor_id int)
language plpgsql
as $$
begin
    update "Professor" as P
    set p_name = 'Nombre Creado por SP'
    where P.p_id = professor_id;
end;
    $$;


create or replace procedure sp_getStudentPreEnrollments(student_id int)
language plpgsql
as $$
begin
    select * from "PreEnrollment" as PE
    where st_id = student_id;
end;
    $$;


create or replace procedure sp_addStudentPreEnrollment(preEnrollment_name varchar, semester_id integer, student_id integer)
language plpgsql
as $$
begin
    insert into "PreEnrollment"(pe_name, s_id, st_id) values (preEnrollment_name, semester_id, student_id);
    --returning *; -- Return inserted row
end;
    $$;






