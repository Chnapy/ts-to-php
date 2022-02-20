import { varTransformer } from './transformers/var-transformer';
import { Project, printNode, ts } from 'ts-morph';
import { highlight } from 'cli-highlight';
import { getTransformers } from './transformers';

const compile = async () => {
  const project = new Project({
    tsConfigFilePath: "test-files/tsconfig.json"
  });

  const emitResult = await project.emitToMemory({
    customTransformers: {
      before: [ getTransformers(project) ]
    }
  });

  const diagnostics = project
    .getPreEmitDiagnostics()
    .concat(emitResult.getDiagnostics());

  if (diagnostics.length) {
    console.log(
      project.formatDiagnosticsWithColorAndContext(diagnostics)
    );
  } else {
    for (const file of emitResult.getFiles()) {
      console.log("----");
      console.log(file.filePath);
      console.log("----");
      console.log(highlight(file.text, { language: 'javascript' }));
      console.log("\n");
    }
  }

  let exitCode = emitResult.getEmitSkipped() ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}

compile()
  .catch(console.error);
