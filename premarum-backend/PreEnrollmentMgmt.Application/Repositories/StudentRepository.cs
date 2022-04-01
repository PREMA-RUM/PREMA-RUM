using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.Application.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly PremaRumDbContext _context;

    public StudentRepository(PremaRumDbContext context)
    {
        _context = context;
    }

    public async Task<Student?> GetByEmailSimple(string email)
    {
        // Check if student exists 
        return await _context.Students.SingleOrDefaultAsync(st => st!.Email == email);
    }

    public async Task<Student?> GetByEmailWithCoursesTaken(string email)
    {
        return await GetStudentWithCoursesQueryable()
            .Where(st => st!.Email == email)
            .FirstOrDefaultAsync();
    }
    
    private IQueryable<Student> GetStudentWithCoursesQueryable()
    {
        return _context
            .Students
            .Include(st => st.CoursesTaken);
    }
    
    public async Task Create(Student student)
    {
        await _context.Students.AddAsync(student);
    }
    public void Save(Student student)
    {
        _context.Update(student);
    }
}