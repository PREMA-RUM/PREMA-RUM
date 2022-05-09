years = [2021,2022]
term_ids = [1,2,3,4,5]
class SemesterTable:
    
    def __init__(self,term, year):
        self.term = term
        self.year = year
        
    def print_inserts(self):
        print('insert into "Semester" values(%d,%d);' % (self.term,self.year))
        

semester_inserts = set()

for year in years:
    for term_id in term_ids:
        semester = SemesterTable(term_id,year)
        semester_inserts.add(semester.print_inserts())
        
for insert in semester_inserts:
    print(insert)
        