const System = {
    import: (s: string) => Promise.resolve(null),
    require(toto: number) {
        return Promise.resolve(null);
    },
    req: ($tutu: number) => {}
}
const ts = require('typescript').SyntaxKind;

System.import('foo').then(console.log);



const foo = <S extends string>(s: S) => s + "_toto" + ts.Unknown;
foo("tutu")
