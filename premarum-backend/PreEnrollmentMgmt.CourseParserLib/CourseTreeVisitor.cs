using System.Collections.Immutable;
using Antlr4.Runtime.Tree;
using PreEnrollmentMgmt.Core.Entities.Output;

namespace PreEnrollmentMgmt.CourseParserLib;

public class CourseTreeVisitor : CourseGrammarBaseVisitor<CourseParserOutput>
{
    public CourseTreeVisitor(ImmutableHashSet<CourseTakenVisitorValue> coursesTaken)
    {
        CoursesTaken = coursesTaken;
    }

    public ImmutableHashSet<CourseTakenVisitorValue> CoursesTaken { get; set; }

    public override CourseParserOutput VisitAndExpression(CourseGrammarParser.AndExpressionContext context)
    {
        var result = new CourseParserOutput();
        var leftVisit = VisitExpression(context.left);
        var rightVisit = VisitExpression(context.right);
        if (!(leftVisit.CompliesWithRequisites && rightVisit.CompliesWithRequisites))
        {
            result.MissingCourses.UnionWith(leftVisit.MissingCourses);
            result.MissingCourses.UnionWith(rightVisit.MissingCourses);
        }
        result.CompliesWithRequisites = leftVisit.CompliesWithRequisites && rightVisit.CompliesWithRequisites;
        return result;
    }

    public override CourseParserOutput VisitOrExpression(CourseGrammarParser.OrExpressionContext context)
    {
        var result = new CourseParserOutput();
        var leftVisit = VisitExpression(context.left);
        var rightVisit = VisitExpression(context.right);
        if (!(leftVisit.CompliesWithRequisites || rightVisit.CompliesWithRequisites))
        {
            result.MissingCourses.UnionWith(leftVisit.MissingCourses);
            result.MissingCourses.UnionWith(rightVisit.MissingCourses);
        }
        result.CompliesWithRequisites = leftVisit.CompliesWithRequisites || rightVisit.CompliesWithRequisites;
        
        return result;
    }

    public override CourseParserOutput VisitParenExpression(CourseGrammarParser.ParenExpressionContext context)
    {
        return VisitExpression(context.expression());
    }

    public override CourseParserOutput VisitIdentifierExpression(
        CourseGrammarParser.IdentifierExpressionContext context)
    {
        var result = new CourseParserOutput();
        var currentCourse = new CourseTakenVisitorValue(context.IDENTIFIER().Symbol.Text);

        if (currentCourse.CourseCode.Equals("dir") || CoursesTaken.Contains(currentCourse))
            result.CompliesWithRequisites = true;

        else result.MissingCourses.Add(currentCourse.CourseCode);
        
        return result;
    }

    public override CourseParserOutput VisitStart(CourseGrammarParser.StartContext context)
    {
        var result = VisitExpression(context.expression());
        if (result.CompliesWithRequisites)
            result.MissingCourses.RemoveWhere(str => true);
        return result;
    }

    public override CourseParserOutput VisitExpression(CourseGrammarParser.ExpressionContext context)
    {
        return Visit(context);
    }
    
    public override CourseParserOutput VisitTerminal(ITerminalNode node)
    {
        return base.VisitTerminal(node);
    }

}