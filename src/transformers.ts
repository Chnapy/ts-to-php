import { ts, Project } from 'ts-morph';
import { Program } from 'typescript';
import { functionTransformer } from './transformers/function-transformer';
import { varTransformer } from './transformers/var-transformer';

type ResultNode = ts.Node;

export type Transformer = (program: Program) => (context: ts.TransformationContext) => (node: ts.Node) => ResultNode;

const transformers: Transformer[] = [
    varTransformer,
    functionTransformer,
];

export const getRawTransformers = (program: Program) => transformers.map(t => t(program));

export const getTransformers = (program: Program): ts.TransformerFactory<ts.SourceFile> => (ctx) => {

    const tList = transformers.map(t => t(program)(ctx))

    const visitor: ts.Visitor = (node) => {
        let nodeList: ts.Node[] = [ node ];

        for (const t of tList) {
            nodeList = nodeList.flatMap(t);
        }

        return ts.visitEachChild(nodeList[0], visitor, ctx)
        // return nodeList.map(n => ts.visitEachChild(n, visitor, ctx));
        // return nodeList.flatMap(n => visitor(n) ?? []);
    }

    return (sf) => {
        const res = ts.visitNode(sf, visitor);
        return res;
    };
};
