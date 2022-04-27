using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.Output;

namespace PreEnrollmentMgmt.Core.Services.Interfaces;

public interface ICourseParsingService
{
    public CourseParserOutput CompliesWithRequisites(IEnumerable<CoursesTaken> coursesTaken, string requisites);
}