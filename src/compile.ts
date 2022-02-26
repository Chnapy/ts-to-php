import { varTransformer } from './transformers/var-transformer';
import { Project, printNode, ts, EmitHint } from 'ts-morph';
import { highlight } from 'cli-highlight';
import { getTransformers } from './transformers';
import { ListFormat } from '@ts-morph/common/lib/typescript';
import { emit } from './printer/emitter';
import { TransformationContext } from 'typescript';

const noop = () => null;
const returnUndefined = () => undefined;
const returnBoolean = () => false;
const notImplemented = returnUndefined;

const nullTransformationContext = (): TransformationContext & Record<string, any> => ({
  factory: ts.factory, // eslint-disable-line object-shorthand
  getCompilerOptions: () => ({}),
  getEmitResolver: notImplemented,
  getEmitHost: notImplemented,
  getEmitHelperFactory: notImplemented,
  startLexicalEnvironment: noop,
  resumeLexicalEnvironment: noop,
  suspendLexicalEnvironment: noop,
  endLexicalEnvironment: returnUndefined,
  setLexicalEnvironmentFlags: noop,
  getLexicalEnvironmentFlags: () => 0,
  hoistVariableDeclaration: noop,
  hoistFunctionDeclaration: noop,
  addInitializationStatement: noop,
  startBlockScope: noop,
  endBlockScope: returnUndefined,
  addBlockScopedVariable: noop,
  requestEmitHelper: noop,
  readEmitHelpers: notImplemented,
  enableSubstitution: noop,
  enableEmitNotification: noop,
  isSubstitutionEnabled: returnBoolean,
  isEmitNotificationEnabled: returnBoolean,
  onSubstituteNode: (h, n) => n,
  onEmitNode: (h, n, c) => c(h, n),
  addDiagnostic: noop,
});

const compile = async () => {
  const project = new Project({
    // useInMemoryFileSystem: true,
    tsConfigFilePath: "test-files/tsconfig.json",
    // skipFileDependencyResolution: true
  });

  //   project.createSourceFile("tutu.ts", `

  // const foo = <S extends string>(s: S) => s + "_toto" + 2;
  // foo("tutu")

  //   `)
  //   project.addSourceFilesAtPaths("test-files/*.ts")
  //   project.resolveSourceFileDependencies()

  // console.log('AST',
  // project.getSourceFiles()[0].getChildren()[0].
  // )

  // const emitResult = await project.emitToMemory({
  //   customTransformers: {
  //     before: [ getTransformers(project) ]
  //   }
  // });

  // const diagnostics = project
  //   .getPreEmitDiagnostics()
  //   .concat(emitResult.getDiagnostics());

  // if (diagnostics.length) {
  //   console.log(
  //     project.formatDiagnosticsWithColorAndContext(diagnostics)
  //   );
  // } else {
  //   for (const file of emitResult.getFiles()) {
  //     console.log("----");
  //     console.log(file.filePath);
  //     console.log("----");
  //     console.log(highlight(file.text, { language: 'javascript' }));
  //     console.log("\n");
  //   }
  // }


  const sfs = project.getProgram().compilerObject.getSourceFiles();

  const writer = project.createWriter();
  // console.log(emitResult.compilerObject)

  const transform = getTransformers(project)(nullTransformationContext());

  console.log('F',
    highlight(
      sfs.filter(s => !s.isDeclarationFile)
        .map(sf => emit(transform(sf))).join(''),
      { language: 'typescript' }
    )
  );

  // const exitCode = emitResult.getEmitSkipped() ? 1 : 0;
  // console.log(`Process exiting with code '${exitCode}'.`);
  // process.exit(exitCode);
}

compile()
  .catch(console.error);
