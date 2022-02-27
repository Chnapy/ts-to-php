import ts from 'typescript';
import { Transformer } from '../transformers';

export const functionTransformer: Transformer = (program) => (ctx) => {
    const { factory: f } = ctx;

    return (node) => {

        if (ts.isPropertyAssignment(node)) {
            const children = node.getChildren();
            const ident = children.find(ts.isIdentifier);
            const arrowFn = children.find(ts.isArrowFunction);
            if (ident && arrowFn) {

                const oldBody = arrowFn.body;

                let body;
                if (ts.isBlock(oldBody)) {
                    body = oldBody;
                } else {
                    body = f.createBlock([
                        f.createReturnStatement(oldBody)
                    ], true);
                }

                const a = f.createMethodDeclaration(
                    node.decorators,
                    node.modifiers,
                    undefined,
                    ident,
                    node.questionToken,
                    undefined,
                    arrowFn.parameters,
                    undefined,
                    body);

// console.log('A', a);
                f.updateObjectLiteralExpression(node.parent, [
                    a
                ])

                    return a;
            }
        }

        return node;
    }
};
