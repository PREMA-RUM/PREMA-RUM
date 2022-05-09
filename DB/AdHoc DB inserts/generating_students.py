departments = ((1, 'CIENCIAS AGRICOLAS'), (2, 'CIENCIA TEC ALIMENTO'), (3, 'PSICOLOGIA'), (4, 'EDUCACION AGRICOLA'),
               (5, 'CIENCIA E INGE COMP'), (6, 'QUIMICA'), (7, 'CIENCIAS SOCIALES'), (8, 'CIEN Y TACT MILITAR'),
               (9, 'BIOLOGIA'), (10, 'INGENIERIA NUCLEAR'), (11, 'INGENIERIA AGRICOLA'), (12, 'GEOLOGIA'),
               (13, 'EST AEROESPACIALES'), (14, 'CIENCIAS MARINAS'), (15, 'INGENIERIA'), (16, 'EXTENSION'),
               (17, 'ARTES Y CIENCIAS'), (18, 'INGENIERIA CIVIL'), (19, 'INGENIERIA QUIMICA'),
               (20, 'TECNICO INGENIERIA'), (21, 'INGLES'), (22, 'AGRONOMIA'), (23, 'RESERVAS'), (24, 'HORTICULTURA'),
               (25, 'HUMANIDADES'), (26, 'INGENIERIA MECANICA'), (27, 'INGENIERIA INDUSTRIA'),
               (28, 'INGENIERIA SOFTWARE'), (29, 'ADMINIST EMPRESAS'), (30, 'ECON AGRIC SOC RURAL'), (31, 'FISICA'),
               (32, 'EDUCACION FISICA'), (33, 'ASUNTOS ACADEMICOS'), (34, 'ECONOMIA'), (35, 'ADM EMPRESAS'),
               (36, 'ESTUDIOS HISPANICOS'), (37, 'GASTOS GENERALES'), (38, 'PROTECCION CULTIVOS'),
               (40, 'INGENIERIA GENERAL'), (41, 'CIENCIA ANIMAL'), (42, 'ENFERMERIA'), (43, 'INGENIERIA ELECTRICA'),
               (44, 'MATEMATICAS'), (45, 'BIOTECNOLOGIA INDUST'), (46, 'INGENIERIA COMPUTADORAS'))


class StudentGenerator:

    def __init__(self, departmentsTuple):
        self.st_email = departmentsTuple[1] + ' Student'
        self.dept_id = departmentsTuple[0]

    def generateInsertValues(self):
        return ",('%s','%s')" % (
            self.st_email, str(self.dept_id))


StudentInsertString = 'insert into \"Student\" ( st_email, dept_id) VALUES '
for department in departments:
    student = StudentGenerator(department)
    StudentInsertString += '\n' + student.generateInsertValues()
StudentInsertString += ';'

print(StudentInsertString)
