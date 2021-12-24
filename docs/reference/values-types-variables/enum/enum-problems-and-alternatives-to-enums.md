# 列挙型(enum)の問題点と代替手段

TypeScriptの列挙型(enum)にはいくつか問題点が指摘されていてます。ここでは、その問題点と代替手段を説明します。

## 列挙型の問題点

### 列挙型はTypeScript独自すぎる

TypeScriptは、JavaScriptを拡張した言語です。拡張といっても、むやみに機能を足すのではなく、追加するのは型の世界に限ってです。こういった思想がTypeScriptにはあるため、型に関する部分を除けば、JavaScriptの文法から離れすぎない言語になっています。

JavaScriptの文法からドラスティックに離れたAltJSもあります。その中で、TypeScriptが多くの開発者に支持されているのは、JavaScriptから離れすぎないところに魅力があるからというのもひとつの要因です。

TypeScriptの列挙型に目を向けると、構文もJavaScriptに無いものであるだけでなく、コンパイル後の列挙型はJavaScriptのオブジェクトに変化したりと、型の世界の拡張からはみ出している独自機能になっています。TypeScriptプログラマーの中には、この点が受け入れられない人もいます。

### 数値列挙型には型安全上の問題がある

数値列挙型は、`number`型なら何でも代入できるという型安全上の問題点があります。次の例は、値が`0`と`1`のメンバーだけからなる列挙型ですが、実際にはそれ以外の数値を代入できてしまいます。

```ts
enum ZeroOrOne {
  Zero = 0,
  One = 1,
}
const zeroOrOne: ZeroOrOne = 9; // コンパイルエラーは起きません！
```

列挙型には、列挙型オブジェクトに値でアクセスすると、メンバー名を得られる仕様があります。これにも問題があります。メンバーに無い値でアクセスしたら、コンパイルエラーになってほしいところですが、そうなりません。

```ts twoslash
enum ZeroOrOne {
  Zero = 0,
  One = 1,
}

console.log(ZeroOrOne[0]); // これは期待どおり
// @log: "Zero"
console.log(ZeroOrOne[9]); // これはコンパイルエラーになってほしいところ…
// @log: undefined
```

### 文字列列挙型だけ公称型になる

TypeScriptの型システムは、[構造的部分型](enum-problems-and-alternatives-to-enums.md)を採用しています。ところが、文字列列挙型は例外的に公称型になります。

```ts
enum StringEnum {
  Foo = "foo",
}
const foo1: StringEnum = StringEnum.Foo; // コンパイル通る
const foo2: StringEnum = "foo"; // コンパイルエラーになる
```

この仕様は意外さがある部分です。加えて、数値列挙型は公称型にならないので、不揃いなところでもあります。

## 列挙型の代替案

列挙型の代替案をいくつか提示します。ただし、どの代替案も列挙型の特徴を100%再現するものではありません。次の代替案は目的や用途に合う合わないを判断して使い分けてください。

### 列挙型の代替案1: ユニオン型

もっともシンプルな代替案はユニオン型を用いる方法です。

```ts
type YesNo = "yes" | "no";

function toJapanese(yesno: YesNo) {
  switch (yesno) {
    case "yes":
      return "はい";
    case "no":
      return "いいえ";
  }
}
```

ユニオン型とシンボルを組み合わせる方法もあります。

```ts
const yes = Symbol();
const no = Symbol();
type YesNo = typeof yes | typeof no;

function toJapanese(yesno: YesNo) {
  switch (yesno) {
    case yes:
      return "はい";
    case no:
      return "いいえ";
  }
}
```

### 列挙型の代替案2: オブジェクトリテラル

オブジェクトリテラルを使う方法もあります。

```ts
const Position = {
  Top: 0,
  Right: 1,
  Bottom: 2,
  Left: 3,
} as const;

type Position = typeof Position[keyof typeof Position];
// 上は type Position = 0 | 1 | 2 | 3 と同じ意味になります

function toJapanese(position: Position) {
  switch (position) {
    case Position.Top:
      return "上";
    case Position.Right:
      return "右";
    case Position.Bottom:
      return "下";
    case Position.Left:
      return "左";
  }
}
```

## まとめ

列挙型の問題点と代替案についても説明しました。特に列挙型は型安全上の問題もあるため、列挙型を積極的に使うかどうかは、よく検討してください。
