import { SyntaxKind, ts } from 'ts-morph';
import { Transformer } from '../transformers';

export const varTransformer: Transformer = (project) => (ctx) => {
    const { factory: f } = ctx;

    const typeChecker = project.getTypeChecker().compilerObject;
    const foundSymbols = new Set<ts.Symbol>();

    const checkId = (node: ts.Node) => {

        if (ts.isIdentifier(node)) {

            if (
                !ts.isVariableDeclaration(node.parent)
                && !ts.isParameter(node.parent)
            ) {
                return;
            }

            const relatedSymbol = typeChecker.getSymbolAtLocation(node);

            if (relatedSymbol) {
                foundSymbols.add(relatedSymbol);
            }
        }

    };

    return (node) => {
        checkId(node);

        if (ts.isIdentifier(node)) {
            const relatedSymbol = typeChecker.getSymbolAtLocation(node);
            if (relatedSymbol && foundSymbols.has(relatedSymbol)) {
                const name = node.getText();
                if (!name.startsWith('$')) {
                    return f.createIdentifier('$' + name);
                }
            }
        }

        // if (ts.isPropertyAccessExpression(node) && node.getText() === 'System.import') {
        // node.getText = () => 'System->import';
        // node.getFullText = () => 'System->import';

        // const a = f.createToken(SyntaxKind.HashToken);
        // const e = f.createToken(SyntaxKind.AmpersandAmpersandToken);
        // const t: ts.PunctuationToken<any> = {
        //     kind: SyntaxKind.BarBarEqualsToken,
        //     flags: 0,
        //     parent: e.parent,
        //     getSourceFile: e.getSourceFile,
        //     getChildCount: e.getChildCount,
        //     getChildAt: e.getChildAt,
        //     getChildren: e.getChildren,
        //     getStart: e.getStart,
        //     getFullStart: e.getFullStart,
        //     getEnd: e.getEnd,
        //     getWidth: e.getWidth,
        //     getFullWidth: e.getFullWidth,
        //     getLeadingTriviaWidth: e.getLeadingTriviaWidth,
        //     getFullText: () => '->',
        //     getText: () => '->',
        //     getFirstToken: e.getFirstToken,
        //     getLastToken: e.getLastToken,
        //     forEachChild: e.forEachChild,
        //     pos: e.pos,
        //     end: e.end
        // }

        // return f.createPropertyAccessExpression(
        //     f.createBinaryExpression(
        //         node.getChildAt(0) as any,
        //         t,
        //         node.getChildAt(2) as any
        //     ), node.name)

        // return ([
        //     node.getChildAt(0),
        //     // a,
        //     node.getChildAt(2)
        // ]);
        // }

        return node;
    }
};
