grammar CourseGrammar;

start
 : expression EOF
 ;

expression
 : left=expression AND right=expression #andExpression
 | left=expression OR right=expression #orExpression
 | LPAREN expression RPAREN #parenExpression
 | IDENTIFIER #identifierExpression
 ;


AND        : 'Y' ;
OR         : 'O' ;
LPAREN     : '(' ;
RPAREN     : ')' ;
IDENTIFIER : [a-zA-Z_] [a-zA-Z_0-9]* ;
WS         : [ \r\t\u000C\n]+ -> skip;