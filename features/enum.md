# 列挙型 \(Enum\)

列挙型を用いると、定数のセットに意味を持たせたコード表現ができます。列挙型は利点があるものの、いくつかの問題点も指摘される機能です。

## 列挙型の宣言と利用

列挙型を宣言するには、`enum`キーワードの後に列挙型名とメンバーを書きます。次の例では、`Postion`が列挙型名で、`Top`、`Right`、`Bottom`、`Left`がメンバーになります。

```typescript
enum Position {
  Top,
  Right,
  Bottom,
  Left,
}
```

`enum`キーワードはTypeScript独自のものです。なのでJavaScriptにコンパイルすると次のようなコードになります。

```typescript
var Position;
(function (Position) {
    Position[Position["Top"] = 0] = "Top";
    Position[Position["Right"] = 1] = "Right";
    Position[Position["Bottom"] = 2] = "Bottom";
    Position[Position["Left"] = 3] = "Left";
})(Position || (Position = {}));
```

ご覧のとおり、列挙型名と同じ名前のオブジェクトが定義されます。列挙型のメンバーはオブジェクトのプロパティーになります。値は0からの連番になります。

```typescript
console.log(Position.Top); // 0
console.log(Position.Right); // 1
console.log(Position.Bottom); // 2
```

列挙型名は型として扱うことができます。

```typescript
let position: Position;
//            ^^^^^^^^型
```

## 列挙型の種類

列挙型には、数値列挙型\(numeric enum\)、文字列列挙型\(string enum\)、異種混合の列挙型\(heterogeneous enum\)の3種類があります。

### 数値列挙型\(numeric enum\)

数値列挙型はもっとも典型的な列挙型です。メンバーの値は上から順に`0`からの連番になります。

```typescript
enum Position {
  Top, // 0
  Right, // 1
  Bottom, // 2
  Left, // 3
}
```

メンバーは値を代入できます。値を代入した場合、それに続くメンバーは連番になります。

```typescript
enum Position {
  Top = 1, // 1
  Right, // 2
  Bottom, // 3
  Left, // 4
}
```

### 文字列列挙型\(string enum\)

メンバーの値には文字列も使えます。文字列で構成された列挙型は文字列列挙型と呼ばれます。

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

### 異種混合の列挙型\(heterogeneous enum\)

数値メンバーと文字列メンバーの両方を持った列挙型も作れます。

```typescript
enum YesNo {
  No = 0,
  Yes = "yes"
}
```

## 列挙型の問題点

列挙型にはいくつか問題点が指摘されていてます。ここでは、その問題点と代替手段を説明します。

### 列挙型はTypeScript独自すぎる

TypeScriptは、JavaScriptを拡張した言語です。拡張といっても、むやみに機能を足すのではなく、追加するのは型の世界に限ってです。こういった思想がTypeScriptにはあるため、型に関する部分を除けば、JavaScriptの文法から離れすぎない言語になっています。

JavaScriptの文法からドラスティックに離れたAltJSもあります。その中で、TypeScriptが多くの開発者に支持されているのは、JavaScriptから離れすぎないところに魅力があるからというのもひとつの要因です。

TypeScriptの列挙型に目を向けると、構文もJavaScriptに無いものであるだけでなく、コンパイル後の列挙型はJavaScriptのオブジェクトに変化したりと、型の世界の拡張からはみ出している独自機能になっています。TypeScriptプログラマーの中には、この点が受け入れられない人もいます。

### 数値列挙型には型安全上の問題がある

数値列挙型は、`number`型なら何でも代入できるという型安全上の問題点があります。次の例は、値が`0`と`1`のメンバーだけからなる列挙型ですが、実際にはそれ以外の数値を代入できてしまいます。

```typescript
enum ZeroOrOne {
  Zero = 0,
  One = 1,
}
const zeroOrOne: ZeroOrOne = 9; // コンパイルエラーは起きません！
```

列挙型には、列挙型オブジェクトに値でアクセスすると、メンバー名を得られる仕様があります。これにも問題があります。メンバーに無い値でアクセスしたら、コンパイルエラーになってほしいところですが、そうなりません。

```typescript
enum ZeroOrOne {
  Zero = 0,
  One = 1,
}

console.log(ZeroOrOne[0]); //=> "Zero" これは期待どおり
console.log(ZeroOrOne[9]); //=> undefined これはコンパイルエラーになってほしいところ…
```

### 文字列列挙型だけ公称型になる

TypeScriptの型システムは、[構造的部分型](structural-subtyping.md)を採用しています。ところが、文字列列挙型は例外的に公称型になります。

```typescript
enum StringEnum {
  Foo = "foo",
}
const foo1: StringEnum = StringEnum.Foo; // コンパイル通る
const foo2: StringEnum = "foo"; // コンパイルエラーになる
```

この仕様は意外さがある部分です。加えて、数値列挙型は公称型にならないので、不揃いなところでもあります。

### 列挙型の代替案

列挙型の代替案をいくつか提示します。ただし、どの代替案も列挙型の特徴を100%再現するものではありません。次の代替案は目的や用途に合う合わないを判断して使い分けてください。

#### 列挙型の代替案1: ユニオン型

もっともシンプルな代替案はユニオン型を用いる方法です。

```typescript
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

```typescript
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

#### 列挙型の代替案2: オブジェクトリテラル

オブジェクトリテラルを使う方法もあります。

```typescript
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

列挙型の宣言方法と使い方、列挙型の3つの種類を説明しました。また、列挙型の問題点と代替案についても説明しました。特に列挙型は型安全上の問題もあるため、列挙型を積極的に使うかどうかは、よく検討してください。

