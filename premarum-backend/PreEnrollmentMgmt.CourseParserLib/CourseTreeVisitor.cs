using System.Collections.Immutable;
using Antlr4.Runtime.Tree;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.Output;

namespace PreEnrollmentMgmt.CourseParserLib;



public class CourseTreeVisitor: CourseGrammarBaseVisitor<CourseParserOutput> {
    public CourseTreeVisitor(ImmutableHashSet<CourseTakenVisitorValue> coursesTaken)
    {
        CoursesTaken = coursesTaken;
        Missing = new List<CourseTakenVisitorValue>();
    }

    public ImmutableHashSet<CourseTakenVisitorValue> CoursesTaken { get; set; }
    public List<CourseTakenVisitorValue> Missing { get; set; }


    public override CourseParserOutput VisitAndExpression(CourseGrammarParser.AndExpressionContext context)
    {
        var result = new CourseParserOutput();
        result.CompliesWithRequisites = VisitExpression(context.left).CompliesWithRequisites &&
                                        VisitExpression(context.right).CompliesWithRequisites;
        return result;
    }

    public override CourseParserOutput VisitOrExpression(CourseGrammarParser.OrExpressionContext context)
    {
        var result = new CourseParserOutput();
        result.CompliesWithRequisites = VisitExpression(context.left).CompliesWithRequisites ||
                                        VisitExpression(context.right).CompliesWithRequisites;
        return result;
    }

    public override CourseParserOutput VisitParenExpression(CourseGrammarParser.ParenExpressionContext context)
    {
        return VisitExpression(context.expression());
    }

    public override CourseParserOutput VisitIdentifierExpression(CourseGrammarParser.IdentifierExpressionContext context)
    {
        var result = new CourseParserOutput();
        var currentCourse = new CourseTakenVisitorValue(context.IDENTIFIER().Symbol.Text);

        if (currentCourse.CourseCode.Equals("dir") || CoursesTaken.Contains(currentCourse))
            result.CompliesWithRequisites = true;
        
        Missing.Add(currentCourse);
        return result;
        
}

    public override CourseParserOutput VisitStart(CourseGrammarParser.StartContext context)
    {
        return VisitExpression(context.expression());
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