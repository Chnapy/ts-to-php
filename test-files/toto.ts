const System = {
    a: 9,
    import: (s: string) => Promise.resolve(null),
    require(toto: number) {
        return Promise.resolve(null);
    },
    req: ($tutu: number) => {}
}
const ts = require('typescript').SyntaxKind;
System.import('foo').then(console.log);
const foo = <S extends string>(s: S) => s + "_toto" + 2;
foo("tutu")
class C {
    constructor(a: string, b: C) { }

    toString() {
        return "foo";
    }
}
