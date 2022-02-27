import { highlight } from 'cli-highlight';
import ts from 'typescript';
import { emit } from './printer/emitter';
import { getTransformers } from './transformers';

const compile = async () => {
  // const project = new Project({
  //   // useInMemoryFileSystem: true,
  //   tsConfigFilePath: "test-files/tsconfig.json",
  //   // skipFileDependencyResolution: true
  // });

  const program = ts.createProgram([
    'test-files/toto.ts'
  ], {

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

  // const res = program.emit(undefined, (a, data) => {
  //   // console.log('res',data)
  // }, undefined, undefined, {
  //   before: [ getTransformers(program) ]
  // });

  const sfs = program.getSourceFiles()
    .filter(s => !s.isDeclarationFile) as ts.SourceFile[];
  // console.log("sfs", sfs)
  // const writer = project.createWriter();
  // console.log(emitResult.compilerObject)

  // const transform = getTransformers(project)(nullTransformationContext());

  const transformAst = ts.transform(
    [ sfs[ 0 ] ],
    [
      getTransformers(program)
    ],
    // project.compilerOptions.get()
  );

  // transformNodes(
  //   factory, project.compilerOptions.get(), sfs,
  //   // getRawTransformers(project),
  //   [getTransformers(project)], 
  //   true
  // )

  const ast = transformAst.transformed
    .filter(t => t && t.getFullText().includes('_toto'))

  // console.log(ast.transformed
  //   .filter(t => !t.isDeclarationFile)
  // )

  console.log('F',
    highlight(
      sfs.filter(s => !s.isDeclarationFile)
        .map(sf => emit(ast[ 0 ])).join(''),
      { language: 'php' }
    )
  );

  // const exitCode = emitResult.getEmitSkipped() ? 1 : 0;
  // console.log(`Process exiting with code '${exitCode}'.`);
  // process.exit(exitCode);
}

compile()
  .catch(console.error);
