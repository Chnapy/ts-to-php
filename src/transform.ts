import * as ts from 'typescript';
export type GenerateScopedNameFn = (name: string, filepath: string, css: string) => string

/**
 * Primarily from https://github.com/css-modules/css-modules-require-hook
 *
 * @export
 * @interface Opts
 */
export interface Opts {
    generateFilePath?(filename: string): string
    threshold?: number
}

function getRequirePath(node: ts.Node, { factory }: ts.TransformationContext): string | null {

    if (node.kind !== ts.SyntaxKind.CallExpression) {
        return null;
    }

    const expression = (node as ts.CallExpression).expression as ts.PropertyAccessExpression;
    if (!expression) {
        return null;
    }

    if (
        expression.kind !== ts.SyntaxKind.PropertyAccessExpression ||
        expression.expression.getText() !== 'System' ||
        expression.name.text !== 'import'
    ) {
        return null
    }

    return (node as ts.CallExpression).arguments[ 0 ].getText()
}

/**
 * Create Promise.resolve(require(path))
 * @param path
 */
function createPromisifiedRequire(path: string, { factory }: ts.TransformationContext): ts.Node {


    // Create Require Node
    const requireNode = factory.createCallExpression(
        factory.createIdentifier('require'),
        undefined,
        [
            factory.createIdentifier(path)
        ]
    );

    // Create promise node
    const promiseNode = factory.createPropertyAccessExpression(
        factory.createIdentifier('Promise'),
        'resolve'
    );

    const node = factory.createCallExpression(
        promiseNode,
        undefined,
        [ requireNode ]
    );

    return node
}

export const transform = (): ts.TransformerFactory<ts.SourceFile> => (ctx) => {

    const visitor: ts.Visitor = (node) => {
        const requirePath = getRequirePath(node, ctx)
        if (!requirePath) {
            return ts.visitEachChild(node, visitor, ctx)
        }

        return createPromisifiedRequire(requirePath, ctx)
    }

    return (sf) => ts.visitNode(sf, visitor)
}