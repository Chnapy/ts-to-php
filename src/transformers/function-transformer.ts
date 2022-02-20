import { Project, ts } from 'ts-morph';
import { Transformer } from '../transformers';

export const functionTransformer: Transformer = (project) => (ctx) => {
    const { factory: f } = ctx;

    return (node) => {

        if (ts.isPropertyAssignment(node)) {
            const children = node.getChildren();
            const ident = children.find(ts.isIdentifier);
            const arrowFn = children.find(ts.isArrowFunction);
            // console.log(node.getChildren().map(n=>ts.SyntaxKind[n.kind]))
            if (ident && arrowFn) {

                let body;
                if (ts.isBlock(arrowFn.body)) {
                    body = arrowFn.body;
                } else {
                    body = f.createBlock([
                        f.createReturnStatement(arrowFn.body)
                    ], true);
                }

                return f.createMethodDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    ident,
                    undefined,
                    undefined,
                    arrowFn.parameters,
                    undefined,
                    body);
            }
        }

        return node;
    }
};
