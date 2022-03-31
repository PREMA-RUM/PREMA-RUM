using System.Collections.Immutable;
using Antlr4.Runtime.Tree;

namespace PreEnrollmentMgmt.CourseParserLib;



public class CourseTreeVisitor: CourseGrammarBaseVisitor<CourseVisitorOutput> {
    public CourseTreeVisitor(ImmutableHashSet<string> coursesTaken)
    {
        CoursesTaken = coursesTaken;
    }

    public ImmutableHashSet<string> CoursesTaken { get; set; }
}