using System.Collections.Immutable;
using Antlr4.Runtime;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.Services.Interfaces;

namespace PreEnrollmentMgmt.CourseParserLib;

public class CourseParsingService : ICourseParsingService
{
    private readonly ICourseRepository _courseRepository;

    public CourseParsingService(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<List<Course>> GetMissingCourses(IEnumerable<CoursesTaken> coursesTaken, Course course)
    {
        if (string.IsNullOrEmpty(course.CoursePrerequisites))
            return new List<Course>();
        var stream = new AntlrInputStream(course.CoursePrerequisites);
        var lexer = new CourseGrammarLexer(stream);
        var parser = new CourseGrammarParser(new CommonTokenStream(lexer));
        var tree = parser.start()!;
        var visitor = new CourseTreeVisitor(coursesTaken
            .Select(ct => new CourseTakenVisitorValue(ct.Course.CourseCode, ct.CourseId)).ToImmutableHashSet());
        var result = visitor.VisitExpression(tree.expression());
        var courses = await _courseRepository.GetByCourseCodeList(result.MissingCourses.ToList());
        return courses;
    }
}