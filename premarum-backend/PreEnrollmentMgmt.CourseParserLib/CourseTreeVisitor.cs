using System.Collections.Immutable;
using Antlr4.Runtime.Tree;
using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.CourseParserLib;



public class CourseTreeVisitor: CourseGrammarBaseVisitor<bool> {
    public CourseTreeVisitor(ImmutableHashSet<CourseTakenVisitorValue> coursesTaken)
    {
        CoursesTaken = coursesTaken;
    }

    public ImmutableHashSet<CourseTakenVisitorValue> CoursesTaken { get; set; }
    public List<CourseTakenVisitorValue> Missing { get; set; }


    public override bool VisitAndExpression(CourseGrammarParser.AndExpressionContext context)
    {
        return VisitExpression(context.left) && VisitExpression(context.right);
    }

    public override bool VisitOrExpression(CourseGrammarParser.OrExpressionContext context)
    {
        return VisitExpression(context.left) || VisitExpression(context.right);
    }

    public override bool VisitParenExpression(CourseGrammarParser.ParenExpressionContext context)
    {
        return base.VisitParenExpression(context);
    }

    public override bool VisitIdentifierExpression(CourseGrammarParser.IdentifierExpressionContext context)
    {
        
        var currentCourse = new CourseTakenVisitorValue(context.IDENTIFIER().Symbol.Text);
        
        if (currentCourse.CourseCode.Equals("dir") || CoursesTaken.Contains(currentCourse))
            return true;
        
        Missing.Add(currentCourse);
        return false;
        
}

    public override bool VisitStart(CourseGrammarParser.StartContext context)
    {
        return VisitExpression(context.expression());
    }

    public override bool VisitExpression(CourseGrammarParser.ExpressionContext context)
    {
        return base.VisitExpression(context);
    }

    public override bool VisitTerminal(ITerminalNode node)
    {
        return base.VisitTerminal(node);
    }
}