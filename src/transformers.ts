import { ts, Project } from 'ts-morph';
import { functionTransformer } from './transformers/function-transformer';
import { varTransformer } from './transformers/var-transformer';

type ResultNode = ts.Node | ts.Node[];

export type Transformer = (project: Project) => (context: ts.TransformationContext) => (node: ts.Node) => ResultNode;

const transformers: Transformer[] = [
    varTransformer,
    functionTransformer,
];

export const getTransformers = (project: Project): ts.TransformerFactory<ts.SourceFile> => (ctx) => {

    const tList = transformers.map(t => t(project)(ctx))
    
    const visitor: ts.Visitor = (node) => {
        let nodeList: ts.Node[] = [node];
        
        for(const t of tList) {
            nodeList = nodeList.flatMap(t);
        }
        
        return nodeList.map(n => ts.visitEachChild(n, visitor, ctx));
        // return nodeList.flatMap(n => visitor(n) ?? []);
    }

    return (sf) => {
        const res = ts.visitNode(sf, visitor);

        return res;
    };
};
