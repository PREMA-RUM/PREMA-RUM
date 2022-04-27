using System.Collections.Immutable;
using Antlr4.Runtime;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.Output;
using PreEnrollmentMgmt.Core.Services.Interfaces;

namespace PreEnrollmentMgmt.CourseParserLib;

public class CourseParsingService : ICourseParsingService
{
    public CourseParserOutput CompliesWithRequisites(IEnumerable<CoursesTaken> coursesTaken, string requisites)
    {
        if (string.IsNullOrEmpty(requisites))
            return new CourseParserOutput(true);
        var stream = new AntlrInputStream(requisites);
        var lexer = new CourseGrammarLexer(stream);
        var parser = new CourseGrammarParser(new CommonTokenStream(lexer));
        var tree = parser.start()!;
        var visitor = new CourseTreeVisitor(coursesTaken
            .Select(ct => new CourseTakenVisitorValue(ct.Course.CourseCode, ct.CourseId)).ToImmutableHashSet());
        return visitor.VisitExpression(tree.expression());
    }
}