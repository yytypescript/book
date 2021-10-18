# 🚧any型

TypeScriptのany型は、どんな型でも代入を許す型です。プリミティブ型であれオブジェクトであれ何を代入してもエラーになりません。

```typescript
let value: any;
value = 1; // OK
value = "string"; // OK
value = { name: "オブジェクト" }; // OK
```

また、any型の変数については、これ以上コンパイラーが型チェックを行いません。実行してみるとエラーになるようなコードでも、コンパイラーはその問題を指摘しません。次の例では、数値を変数`str`に代入しています。しかし、2行目の`toLowerCase`は文字列型のメソッドで数値型には存在しなため、実行してみるとエラーになります。このような単純な矛盾はTypeScriptコンパイラーで発見できますが、型注釈でanyにした値についてはコンパイラーが警告しなくなります。

```typescript
const str: any = 123;
str.toLowerCase();
// 実行時エラー: TypeError: str.toLowerCase is not a function
```

## 暗黙のany

TODO: 引数は型注釈がないとanyになることを説明する

TODO: 暗黙のanyを規制する`noImplicitAny`オプションを説明する

{% page-ref page="../tsconfig/noimplicitany.md" %}

## anyは悪？

any型はコンパイラーのチェックを抑制したいときに用いる特別な型です。any型を濫用すると、型チェックが弱くなりバグの発見できなくなる恐れがあります。anyは型のチェックを放棄した型とも言えますが、一概に悪いとは言い切れません。理由なくanyを使うのは問題ですが、どうしてもanyを使わないとならない場面や、型安全性を妥協した上で、まずは動くコードを形にすることを優先するといったこともありえます。anyをどこまで許容するか、型チェックをどこまで厳格にするかは、チームの熟練度やプロジェクトの方針によるところが大きいです。

## 「がんばらないTypeScript」

TODO: がんばらないTypeScriptというアプローチがあることを紹介する。

## 関連情報

{% page-ref page="../statements/unknown.md" %}

{% page-ref page="../statements/any-vs-unknown.md" %}

