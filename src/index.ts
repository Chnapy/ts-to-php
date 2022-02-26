// import { parse } from "@babel/parser";
const pluginTs = require('@babel/plugin-syntax-typescript').default;
const transformTypeScript = require("@babel/plugin-transform-typescript").default;
const generate = require("@babel/generator").default;
import { parse } from '@typescript-eslint/parser'
import { VariableDeclaration } from '@typescript-eslint/types'
import * as ts from 'typescript'

const p = ts.createProgram(["../test-files/toto.ts"], {});

// console.log(p.emit())
// @ts-ignore
// p.emit = () => {
// return 1;
// }
const p2: ts.Program = {
    ...p,

}

// class P implements ts.Program {

//     constructor() {

//     }

//     getCurrentDirectory(): string {
//     }
//     getRootFileNames(): readonly string[] {
//         throw new Error('Method not implemented.');
//     }
//     getSourceFiles(): readonly ts.SourceFile[] {
//         throw new Error('Method not implemented.');
//     }
//     emit(targetSourceFile?: ts.SourceFile, writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: ts.CustomTransformers): ts.EmitResult {
//         throw new Error('Method not implemented.');
//     }
//     getOptionsDiagnostics(cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
//         throw new Error('Method not implemented.');
//     }
//     getGlobalDiagnostics(cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
//         throw new Error('Method not implemented.');
//     }
//     getSyntacticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.DiagnosticWithLocation[] {
//         throw new Error('Method not implemented.');
//     }
//     getSemanticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
//         throw new Error('Method not implemented.');
//     }
//     getDeclarationDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.DiagnosticWithLocation[] {
//         throw new Error('Method not implemented.');
//     }
//     getConfigFileParsingDiagnostics(): readonly ts.Diagnostic[] {
//         throw new Error('Method not implemented.');
//     }
//     getTypeChecker(): ts.TypeChecker {
//         throw new Error('Method not implemented.');
//     }
//     getNodeCount(): number {
//         throw new Error('Method not implemented.');
//     }
//     getIdentifierCount(): number {
//         throw new Error('Method not implemented.');
//     }
//     getSymbolCount(): number {
//         throw new Error('Method not implemented.');
//     }
//     getTypeCount(): number {
//         throw new Error('Method not implemented.');
//     }
//     getInstantiationCount(): number {
//         throw new Error('Method not implemented.');
//     }
//     getRelationCacheSizes(): { assignable: number; identity: number; subtype: number; strictSubtype: number; } {
//         throw new Error('Method not implemented.');
//     }
//     isSourceFileFromExternalLibrary(file: ts.SourceFile): boolean {
//         throw new Error('Method not implemented.');
//     }
//     isSourceFileDefaultLibrary(file: ts.SourceFile): boolean {
//         throw new Error('Method not implemented.');
//     }
//     getProjectReferences(): readonly ts.ProjectReference[] | undefined {
//         throw new Error('Method not implemented.');
//     }
//     getResolvedProjectReferences(): readonly (ts.ResolvedProjectReference | undefined)[] | undefined {
//         throw new Error('Method not implemented.');
//     }
//     getCompilerOptions(): ts.CompilerOptions {
//         throw new Error('Method not implemented.');
//     }
//     getSourceFile(fileName: string): ts.SourceFile | undefined {
//         throw new Error('Method not implemented.');
//     }
//     getSourceFileByPath(path: ts.Path): ts.SourceFile | undefined {
//         throw new Error('Method not implemented.');
//     }
    
// }

const code = "var a: ay = class \n  Example {}";
const ast = parse(code, {
    program: p,
    // plugins: [
    //     transformTypeScript
    // ]
});
// let a: ;
// console.log((ast.body[0] as VariableDeclaration).declarations[0].id.typeAnnotation)
ts.createCompilerHost({}).
const output = generate(
  ast,
  {
    /* options */
  },
  code
);

// console.log('output', output);
