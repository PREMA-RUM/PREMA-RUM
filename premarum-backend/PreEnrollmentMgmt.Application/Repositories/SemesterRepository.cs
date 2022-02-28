using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.Application.Repositories;

public class SemesterRepository: ISemesterRepository
{
    private readonly PremaRumDbContext _context;

    public SemesterRepository(PremaRumDbContext context)
    {
        _context = context;
    }

    public async Task<Semester?> GetByIdComplete(int id)
    {
        return await _context
            .Semesters
            .Include(sem => sem.Term)
            .SingleOrDefaultAsync(se => se.Id == id);
    }
}