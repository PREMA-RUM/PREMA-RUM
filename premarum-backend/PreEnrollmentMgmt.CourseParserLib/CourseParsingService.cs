using System.Collections.Immutable;
using Antlr4.Runtime;

namespace PreEnrollmentMgmt.CourseParserLib;

public class CourseParsingService
{
    public bool CompliesWithRequisites(IEnumerable<string> coursesTaken, string requisites)
    {
        var stream = new AntlrInputStream(requisites);
        var lexer = new CourseGrammarLexer(stream);
        var parser = new CourseGrammarParser(new CommonTokenStream(lexer));
        var tree = parser.start()!;
        var visitor = new CourseTreeVisitor( coursesTaken.ToImmutableHashSet() );
        return false;
    }
}