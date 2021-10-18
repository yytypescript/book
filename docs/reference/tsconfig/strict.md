# strict

このオプションは**TypeScript4.4時点で**次の8個のオプションをすべて有効にしていることと同じです。スクラッチから開発するのであれば有効にしておいて差し支えないでしょう。

- noImplicitAny
- strictNullChecks
- strictFunctionTypes
- strictBindCallApply
- strictPropertyInitialization
- noImplicitThis
- useUnknownInCatchVariables
- alwaysStrict

この説明にTypeScriptのバージョンが明記されているのは、今後のバージョンで**オプションが追加または廃止されることがありうる**からです。より安定したオプションを設定したい場合は`strict`ではなく個々のオプションを有効にしてください。このオプションを有効にして個々のオプションを無効にした場合個々の設定が優先されます。
