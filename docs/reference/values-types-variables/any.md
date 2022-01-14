# any型

TypeScriptのany型は、どんな型でも代入を許す型です。プリミティブ型であれオブジェクトであれ何を代入してもエラーになりません。

```ts twoslash
let value: any;
value = 1; // OK
value = "string"; // OK
value = { name: "オブジェクト" }; // OK
```

また、any型の変数については、これ以上コンパイラーが型チェックを行いません。実行してみるとエラーになるようなコードでも、コンパイラーはその問題を指摘しません。次の例では、数値を変数`str`に代入しています。しかし、2行目の`toLowerCase`は文字列型のメソッドで数値型には存在しなため、実行してみるとエラーになります。このような単純な矛盾はTypeScriptコンパイラーで発見できますが、型注釈でanyにした値についてはコンパイラーが警告しなくなります。

```ts twoslash
const str: any = 123;
str.toLowerCase();
// @error: TypeError: str.toLowerCase is not a function
```

## 暗黙のany

型を省略してコンテキストから型が推論できない時、TypeScriptは暗黙的に型をany型として扱います。たとえば、引数の型注釈を省略した場合です。

次の例では `name` 変数がany型として判定されるため、型チェックは問題なく通ってしまいます。しかし、Number型の値で `toUpperCase()` のメソッドの呼び出しが実行されるため、未定義メソッドとしてエラーが発生します。

```ts twoslash
function hello(name) {
  //           ^?
  console.log(`Hello, ${name.toUpperCase()}`);
}

// @error: name.toUpperCase is not a function
hello(1);
// @noImplicitAny: false
```

このように暗黙のanyは型チェックをすり抜けて実行時エラーを引き起こす可能性があります。TypeScriptでは暗黙のanyを規制するオプションとして `noImplicitAny` が用意されています。

tsconfig.json にて `noImplicitAny: true` を設定することで、TypeScriptが型をany型と推測した場合にエラーが発生するようになります。

```ts twoslash
// @errors: 7006
function hello(name) {
  console.log(`Hello, ${name.toUpperCase()}`);
}
```

[noImplicitAny](../tsconfig/noimplicitany.md)

## anyは悪？

any型はコンパイラーのチェックを抑制したいときに用いる特別な型です。any型を濫用すると、型チェックが弱くなりバグの発見できなくなる恐れがあります。anyは型のチェックを放棄した型とも言えますが、一概に悪いとは言い切れません。理由なくanyを使うのは問題ですが、どうしてもanyを使わないとならない場面や、型安全性を妥協した上で、まずは動くコードを形にすることを優先するといったこともありえます。anyをどこまで許容するか、型チェックをどこまで厳格にするかは、チームの熟練度やプロジェクトの方針によるところが大きいです。

## 「がんばらないTypeScript」

TypeScriptは型チェックにより安全にコードを書くことができる静的型付け言語です。
今までJavaScriptなどの動的型付き言語を書いていた人にとっては、実装時に静的な型を書くことに難しさを感じるかもしれません。

実際に慣れない頃はコンパイルエラーが出ている原因を調べて解消するのに1日を費やす場合もあります。

TypeScriptには「がんばらないTypeScript」というアプローチがあります。

TypeScript の大きな利点として、型の制約を自由にコントールすることができる点があります。ここで紹介されている any型 もそのひとつです。たとえば、コンパイルエラーで詰まった時に any型 を指定すれば、とりあえずコンパイルエラーを解消することができます。

また、既存のJavaScriptプロジェクトにTypeScriptを導入する際には大量のコンパイルエラーが発生する可能性があります。それらのコンパイルエラーをすべて解消するまでTypeScriptの導入を終わらせられないと、途中で挫折して結局TypeScriptの導入ができないという状況になるかもしれません。そんな場合は any型 などを積極的に利用して、とりあえずコンパイルエラーを解消して段階的に型付けをしていくのもひとつの手段です。

すべてが型安全な実装になっている状態が理想ですが、一部分だけが型安全な実装になっているだけでも、型チェックがまったくないJavaScriptだけのときよりも大きな恩恵を受けることができます。

型による制約はコードをより安全に書くためのひとつの手段にすぎません。型の制約に時間を費やして、動くモノが作れないのは本末転倒です。

TypeScriptの型システムで疲弊しそうになったら、「がんばらないTypeScript」のアプローチを思い出してみてください。

<TweetILearned>

・any型はどんな型でも代入を許す
・any型は型チェックされない
・型推論できない変数は暗黙的にany型になる
・anyは使いようによっては悪くない
・がんばらないTypeScriptという考え方もある

</TweetILearned>

## 関連情報

[🚧unknown型](../statements/unknown.md)

[any vs unknown](../statements/any-vs-unknown.md)
