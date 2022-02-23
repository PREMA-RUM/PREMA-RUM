using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.Application.Repositories;

public class StudentRepository: IStudentRepository
{
    private readonly PremaRumDbContext _context;

    public StudentRepository(PremaRumDbContext context)
    {
        _context = context;
    }
    
    public async Task<Student> GetByEmailSimple(string email)
    {
        // Check if student exists 
        return await _context.Students.SingleAsync(st => st.Email == email);
    }
}