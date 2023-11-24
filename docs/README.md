---
slug: /
image: /img/ogp.png
sidebar_label: トップ
---

# TypeScript

<head>
  <title>TypeScript入門『サバイバルTypeScript』〜実務で使うなら最低限ここだけはおさえておきたいこと〜</title>
</head>

<!-- markdownlint-disable MD033 -->

<iframe src="https://ghbtns.com/github-btn.html?user=yytypescript&repo=book&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="170" height="30" title="GitHub" style={{marginBottom: "1rem"}}></iframe>

<!-- markdownlint-restore -->

:::note
本書『サバイバルTypeScript』は実務でTypeScriptを使う開発者のための入門書です。そして、このページはTypeScriptの特徴を最速で把握できるよう、数百ページからなる本書のコンテンツをつまみ食いした要約です。

» [本書ついて詳しく知る](./about.md)
» [とにかく今すぐTypeScriptを書いてみたい](./tutorials/README.md)
:::

## TypeScriptとは

- JavaScriptの**スーパーセット**となるプログラミング言語。
- **静的型付け言語**であり、プログラムの正しさが**静的に検査**できる。
- ライブラリやIDEなどの開発環境が充実しており、**大きなエコシステム**を持っている。
- **Microsoft**が2012年に開発し、**オープンソース**で公開した。

» [TypeScriptの特徴について詳しく知る](./overview/features.md)
» [TypeScript誕生の背景について詳しく知る](./overview/before-typescript.md)

## TypeScriptはJavaScriptのスーパーセット

- **スーパーセット**とは、元の言語との**互換性**を保ちつつ、元の言語を**拡張**して作った言語のこと。
- TypeScriptは、JavaScriptとの互換性を保ちつつ、JavaScriptを拡張して作った言語である。
- よって、JavaScriptのコードはすべてTypeScriptとしてあつかえる。
- TypeScriptは、型注釈やインターフェース、ジェネリクスなど独自の機能を追加している。

<figure><figcaption>TypeScriptの機能とJavaScriptの機能</figcaption>
<img src="/top/typescript-as-superset-of-javascript.svg" width="480" />
</figure>

### スーパーセットのメリット

- **学習のしやすさ**: JavaScriptの知識を活かしてTypeScriptを学べる。
- **資産が活かせる**: 既存のJavaScriptコード資産を活かして開発できる。
- **移行のしやすさ**: 既存のJavaScriptプロジェクトはTypeScriptへ移行がしやすい。

» [TypeScriptとJavaScriptの関係について詳しく知る](./overview/javascript-is-typescript.md)

## 静的な検査

- TypeScriptはプログラムの正しさを静的に検査できる。
- JavaScriptは実行しないとバグがあるかを確かめられない。
- TypeScriptは実行せずにチェックが行える。

» [静的な検査について詳しく知る](./overview/static-type.md)

### 開発効率と品質を向上し、安心感を高める

- 問題を早期に発見し、開発を効率化できる。
- コーディング時に問題を発見し、修正できるため、バグを予防できる。
- エディターとTypeScriptを連携させると、リアルタイムのチェックやコード補完が可能。

<figure><figcaption>エディター上でのフィードバック</figcaption>
<img src="/top/compile-error-feedback-on-editor.svg" width="480" />
</figure>

- 問題を早期に修正できることで、製品の信頼感や安心感が高まる。
- 見通しの悪い大規模なプログラムや、重要なシステムの開発では静的な検査が安心材料になる。

## 検査の仕組み

- TypeScriptの検査は**型システム**に基づく。
- 型システムに基づき、**コンパイル**のタイミングでプログラムを検査する。

### 型システム

- 型システムは、データの種別ごとに型を与え、データに対して行える操作に制約を設ける。
- これにより、変数には決められた値のみが代入され、決められた操作のみが行われることが保証され、プログラムが正確で安全になる。
- 型システムは、数学の「型理論」を背景に構築され、数学的証明によりプログラムの欠陥をあぶり出せる。

### 型注釈

- 変数にどのような値が代入できるのかを制約するものを「**型**」と言う。
- 開発者は、変数がどのような型なのかを**型注釈**で指定する。
- TypeScriptでは、型注釈を手がかりに検査が行われる。

<figure><figcaption>型注釈</figcaption>
<img src="/top/type-annotation.svg" width="480" />
</figure>

### 型推論

- 値の型が文脈で明白な場合、型が自動で判断される。この仕組みを**型推論**という。
- 型推論のおかげで、開発者は型注釈を割愛でき、記述量を減らせる。

<figure><figcaption>型推論</figcaption>
<img src="/top/type-inference.svg" width="480" />
</figure>

### コンパイル

- TypeScriptを実行するために、JavaScriptへ変換する。この変換のことを**コンパイル**という。
- 変換後のJavaScriptコードはブラウザやサーバーで実行できる。
- TypeScriptの検査はコンパイルのタイミングで行われる。

<figure><figcaption>コンパイル</figcaption>
<img src="/top/compile-from-typescript-to-javascript.svg" width="480" />
</figure>

## 型はドキュメント、リファクタリング、ツールの充実にも寄与

- **ドキュメントになる**: 型情報はドキュメントの役割を果たし、コードの理解を助ける。
- **リファクタリングが安全に**: 変数の型や関数のシグネチャを変更したとき、修正が必要な箇所がコンパイル時にすべて分かり、不注意による誤修正を減らせる。
- **ツールサポートが充実**: IDEやエディターでのリアルタイムのエラーチェック、自動補完、リファクタリングツール、ナビゲーションなど、開発ツールのサポートが充実している。

» [TypeScriptを使う動機について詳しく知る](./overview/why-you-should-use-typescript.md)

## 多くのエディターがTypeScriptをサポート

- Visual Studio Code
- JetBrains IDE (IntelliJ, WebStorm, PhpStorm, RubyMine, PyCharm, GoLandなど)
- Vim
- NeoVim
- Emacs (Tide)
- Atom
- Sublime Text

» [TypeScriptとエコシステムについて詳しく知る](./overview/ecosystem.md)

## 多様なソフトウェアが作れる

作れるものの範囲が広いことは、TypeScriptの魅力のひとつ。

- **Webアプリケーション**: TypeScriptの主戦場。フロントエンドの開発に広く使用される。
- **サーバーサイドアプリケーション**: Node.jsと組み合わせて、バックエンドやAPIサーバーを開発することが可能。
- **モバイルアプリケーション**: React Nativeなどのフレームワークを利用して、モバイルアプリケーションを開発できる。
- **デスクトップアプリケーション**: Electronを使用して、クロスプラットフォームのデスクトップアプリを開発できる。
- **クラウド関連の機能**: AWS LambdaやAzure Functionsなどのクラウドプラットフォームで、サーバーレス関数が作成できる。
- **ユーティリティーやCLIツール**: コマンドラインツールや各種ユーティリティの開発ができる。
- **インフラ構成管理(IaC)**: PulumiやAWS CDKを使用して、インフラの構成を管理することができる。
- **アプリケーションの拡張機能**: Google ChromeやVisual Studio Codeなどデスクトップアプリケーションの拡張をTypeScriptで開発できる。

» [TypeScriptの射程圏について詳しく知る](./overview/range-of-typescript.md)

## TypeScriptを導入した企業の感想

- **[Slack][]**: コードベースが大規模になっても、型システムが安全性と信頼性を保証してくれる。
- **[Airbnb][]**: TypeScriptを使っていたらAirbnbの38%ものバグを未然に防げた。
- **[ヤフー株式会社][]**: 静的型付けによりコードの品質とメンテナンス性が向上し、IDEとの連携により開発者の生産性が向上した。
- **[LINE株式会社][]**: ちょっとした修正でもかかるQAのコストを、TypeScript化によって抑制。
- **[Sansan株式会社][]**: 型がドキュメントとしての役割を果たし、コードリーディングや他チームのコード変更に役立った。採用の文脈でアピールポイントにもなった。
- **[ラクスル株式会社][]**:型システムの恩恵が得られる、エディターの入力補完を受けられる、コード=ドキュメントという状況を作りやすい。

[Slack]: https://slack.engineering/typescript-at-slack/
[Airbnb]: https://www.reddit.com/r/typescript/comments/aofcik/38_of_bugs_at_airbnb_could_have_been_prevented_by/
[ヤフー株式会社]: https://codezine.jp/article/detail/16905
[Sansan株式会社]: https://buildersbox.corp-sansan.com/entry/2021/06/24/110000
[ラクスル株式会社]: https://techblog.raksul.com/entry/2020/10/07/after-introducing-typescript-to-existing-product/
[LINE株式会社]: https://logmi.jp/tech/articles/322702

## 基本的な型

### プリミティブ型

<!--TODO: ここから続きやる-->

- [`boolean`](./reference/values-types-variables/boolean.md): 真偽値。
- [`number`](./reference/values-types-variables/number/README.md): 数値。
- [`string`](./reference/values-types-variables/string.md): 文字列。
- [`bigint`](./reference/values-types-variables/bigint.md): 大きな整数。
- [`symbol`](./reference/values-types-variables/symbol.md): 一意の値を示す。
- [`undefined`](./reference/values-types-variables/undefined.md): 値が定義されていない状態を示す。
- [`null`](./reference/values-types-variables/null.md): 値が存在しない状態を示す。

```typescript twoslash
const isReady: boolean = false;
const age: number = 25;
const fullName: string = "John Doe";
const bigNumber: bigint = 100n;
const uniqueSymbol: symbol = Symbol("unique");
const notDefined: undefined = undefined;
const empty: null = null;
```

### 特殊な型

- [`any`](./reference/values-types-variables/any.md): 何でも代入できる型。型が不明な場合に使用する。その値に対する操作の制限がなく、型の安全性は弱まる。
- [`unknown`](./reference/statements/unknown.md): any型と似て、何でも代入できる型。その値に対する操作は制限され、型の安全性が保たれる。
- [`void`](./reference/functions/void-type.md): 値が存在しないことを示す。関数が何も返さない場合に使用する。
- [`never`](./reference/statements/never.md): 決して何も返さないことを示す。エラーを投げる関数や無限ループの関数の戻り値として使用する。

```typescript twoslash
const a: any = 100; // 代入できる
console.log(a * 3); // 操作もできる
// @log: 300

// @errors: 18046
const x: unknown = 100; // 代入はできる
console.log(x * 3); // 操作はできない

// 戻り値のない関数
function doSomething(): void {}

// 戻り値を返すことがありえない関数
function throwError(): never {
  throw new Error();
}
```

## 型エイリアス

- [型エイリアス](./reference/values-types-variables/type-alias.md)は既存の型を新たな名前で定義する機能。
- より複雑な型を簡素に表現したり、コードの可読性を向上するのに役立つ。

```typescript twoslash
type StringOrNumber = string | number;
let value: StringOrNumber;
value = "hello"; // string型が代入可能
value = 123; // number型も代入可能
```

## 構造的部分型

- TypeScriptは[構造的部分型](./reference/values-types-variables/structural-subtyping.md)を採用している。
- 構造的部分型では、変数の代入可否を、構造が互換しているかに着目して判定する。

```typescript twoslash
// @errors: 2741
type Summary = { name: string };
type Detail = { name: string; age: number };

const johnDetail: Detail = { name: "John", age: 28 };
const summary: Summary = johnDetail; // 代入できる。構造的部分型として互換があるため

const johnSummary: Summary = { name: "John" };
const detail: Detail = johnSummary; // 代入できない。構造的部分型として互換がない（ageを含まないため）
```

## 配列

### 配列リテラル

- 配列の値を作るには[配列リテラル](reference/values-types-variables/array/array-literal.md)(`[]`)を使う。
- `[要素1, 要素2, ...]`の形で配列の初期値を設定できる。

```typescript twoslash
const numbers = [1, 2, 3];
```

### 配列の型注釈

- [配列の型注釈](reference/values-types-variables/array/type-annotation-of-array.md)には`型名[]`または`Array<型名>`を使う。

```typescript twoslash
let numbers: number[];
let strings: Array<string>;
```

### 配列要素へのアクセス

- [配列要素にアクセスする](reference/values-types-variables/array/how-to-access-elements-in-an-array.md)にはインデックス（インデックス）を使う。
- 0から始まる整数を指定して配列の値を取得し、代入も可能。

```typescript twoslash
const colors = ["red", "green", "blue"];
console.log(colors[0]);
// @log: 'red'
colors[1] = "yellow";
console.log(colors);
// @log: ['red', 'yellow', 'blue']
```

### 読み取り専用配列

- [読み取り専用配列](reference/values-types-variables/array/readonly-array.md)は値の変更ができない配列を表す。
- 配列の型注釈に`readonly`をつけると読み取り専用配列となる。
- `ReadonlyArray<型名>`でも読み取り専用配列が宣言でき、`readonly 型名[]`と機能は同じ。

```typescript twoslash
// @errors: 2542 2339
const numbers: readonly number[] = [1, 2, 3];
const strings: ReadonlyArray<string> = ["hello", "world"];

numbers[0] = 4; // 値を変更できない
strings.push("!"); // 要素を追加できない
```

### 配列のループ

- [配列をループする](reference/values-types-variables/array/how-to-loop-an-array.md)ための`for...of`構文もある。

```typescript twoslash
const numbers = [1, 2, 3];

for (const num of numbers) {
  console.log(num); // 1, 2, 3と出力される
}
```

## タプル型

- [タプル型](reference/values-types-variables/tuple.md)を使うと、配列の要素数と要素の型が固定される。
- それぞれの要素のインデックスごとに型が決まる。

```typescript twoslash
// @errors: 2322
let tuple: [string, number];
tuple = ["hello", 10]; // 代入できる
tuple = [10, "hello"]; // 順序が正しくないため、代入できない
tuple = ["hello", 10, "world"]; // 要素が多すぎるため代入できない
```

### タプルの要素へのアクセス

- タプルの要素にアクセスする場合も配列同様にインデックス（インデックス）を使用する。

```typescript twoslash
const tuple: [string, number] = ["hello", 10];
console.log(tuple[0]);
// @log: 'hello'
```

## オブジェクト

### オブジェクトリテラル

- オブジェクトの作り方は[オブジェクトリテラル](reference/values-types-variables/object/object-literal.md)(`{}`)を使う。
- `{ プロパティキー: 値, ... }` の形でオブジェクトの初期値を設定できる。

```typescript twoslash
const john = { name: "John", age: 20 };
```

### プロパティアクセス

- ドット`.`を使ってオブジェクトのプロパティにアクセスできる。

```typescript twoslash
declare const john: { name: string; age: number };
// ---cut---
console.log(john.name);
// @log: 'John'
```

### オブジェクトの型注釈

- [オブジェクトの型注釈](reference/values-types-variables/object/type-annotation-of-objects.md)は`{プロパティ1: 型1, プロパティ2: 型2, ...}`の形で記述する。

```typescript twoslash
let obj: { name: string; age: number };
```

### readonlyプロパティ

- [`readonly`](reference/values-types-variables/object/readonly-property.md)をつけたプロパティは代入できない。

```typescript twoslash
// @errors: 2540
let obj: { readonly name: string; age: number };
obj = { name: "John", age: 20 };
obj.name = "Tom";
```

### オプションプロパティー

- [オプショナルプロパティー](reference/values-types-variables/object/optional-property.md)`?`をつけたプロパティは省略可能。

```typescript twoslash
let obj: { name: string; age?: number };
obj = { name: "John" }; // `age`プロパティがなくてもエラーにならない
```

### オブジェクトメソッド

- 関数をプロパティに持つオブジェクトを定義できる。

```typescript twoslash
const obj = {
  a: 1,
  b: 2,
  sum(): number {
    return this.a + this.b;
  },
};
console.log(obj.sum());
// @log: 3
```

### インデックス型

- オブジェクトは[インデックス型](reference/values-types-variables/object/index-signature.md)を利用して任意のキーの値を取得することができる。
- インデックス型プロパティの型注釈は`[キー名: プロパティキーの型]: プロパティ値の型` の形で記述する。

```typescript twoslash
let obj: { [key: string]: number };
obj = { key1: 1, key2: 2 };
console.log(obj["key1"]);
// @log: 1
console.log(obj["key2"]);
// @log: 2
```

### Shorthand property names

- プロパティの値がすでに定義されている変数である場合、そのプロパティ名を省略して記述できる([shorthand property names](reference/values-types-variables/object/shorthand-property-names.md))。

```typescript twoslash
export default "変数nameを使いたいのでモジュール化する必要がありました。";
// ---cut---
const name = "John";
const age = 20;
const obj = { name, age };
console.log(obj);
// @log: { name: 'John', age: 20 }
```

### オプショナルチェーン

- プロパティが存在するかどうか不確定である場合、`?.`演算子（[オプショナルチェーン](reference/values-types-variables/object/optional-chaining.md)）で安全にアクセスできる。

```typescript twoslash
function printLength(obj: { a?: string }) {
  console.log(obj.a?.length);
}
printLength({ a: "hello" });
// @log: 5
printLength({});
// @log: undefined
```

## Map

### Mapオブジェクト

- [Mapオブジェクト](reference/builtin-api/map.md)はキーとそれに対応する値を対にしたコレクション。
- キーはオブジェクトも含め任意の値が可能。

```typescript twoslash
const map = new Map();
map.set("name", "John");
map.set("age", "20");

console.log(map.get("name"));
// @log: 'John'
```

### Mapの型注釈

- Mapの型注釈は`Map<キーの型, 値の型>`の形で記述する。

```typescript twoslash
let people: Map<string, number>;
```

### Mapのループ

- Mapオブジェクトは`for...of`でループすると、各エントリーがキーと値の配列として順に取得できる。
- 要素の順序は、要素を追加した順が保証されている。

```typescript twoslash
const map = new Map<string, number>();
// ---cut---
for (const [key, value] of map) {
  console.log(key, value);
}
```

## Set

### Set オブジェクト

- [Setオブジェクト](reference/builtin-api/set.md)は同じ値が存在しないコレクション。
- Setの要素は何でも可能である。

```typescript twoslash
const set = new Set();
set.add(1);
set.add(2);
set.add(2); // 同じ値は追加されない。

console.log(set);
// @log: Set {1, 2}
```

### Setの型注釈

- Setの型注釈は`Set<要素の型>`の形で記述する。

```typescript twoslash
let numSet: Set<number>;
```

### Setのループ

- SetもMap同様に`for...of`でループすることが可能。
- 順序は`add`した順。

```typescript twoslash
const set = new Set<number>();
// ---cut---
for (const value of set) {
  console.log(value);
}
```

## 列挙型 (Enum)

### 列挙型の基本

- [列挙型](reference/values-types-variables/enum/README.md)(enum)は、関連する一連の数値または文字列値の集まりを定義する。
- 列挙型は`enum`キーワードを使用して定義する。

```typescript twoslash
enum Color {
  Red,
  Green,
  Blue,
}
```

### 列挙型に値を設定

- 列挙体の値は文字列リテラルまたは数値リテラルで指定できる。

```typescript twoslash
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
```

### 列挙型の利用

- 列挙型の各値にアクセスするにはドット演算子を使用する。

```typescript twoslash
enum Color {
  Red,
  Green,
  Blue,
}
// ---cut---
const myColor: Color = Color.Red;
```

## ユニオン型

- [ユニオン型](reference/values-types-variables/union.md)は複数の型のうちのいずれかをとる値を表現できる。
- `型1 | 型2 | ...`の形式で使う。
- ひとつ以上の異なる型の値を同じ変数で扱う場合に使用する。

```typescript twoslash
let value: boolean | number;
value = true; // 代入できる
value = 100; // 代入できる
```

### 判別可能なユニオン型

- [判別可能なユニオン型](reference/values-types-variables/discriminated-union.md)は、共通のリテラル型のプロパティを持つ特別なユニオン型。
- 共通のプロパティを利用して、型を判別できる。

```typescript twoslash
type Triangle = { kind: "triangle"; base: number; height: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Triangle | Rectangle;

function getArea(shape: Shape): number {
  // 共通のプロパティkindを利用して型を判定する
  switch (shape.kind) {
    case "triangle":
      // この節ではshapeがTriangle型に絞り込まれる
      return (shape.base * shape.height) / 2;
    case "rectangle":
      //  この節ではshapeがRectangle型に絞り込まれる
      return shape.width * shape.height;
  }
}
```

## インターセクション型

- [インターセクション型](reference/values-types-variables/intersection.md)は複数の型を1つに結合した新しい型を定義する。
- `型1 & 型2 & ...`の形式で使う。
- その結果として生じた型は、それぞれの型が持つすべてのプロパティとメソッドを備えている。

```typescript twoslash
type Octopus = { swims: boolean };
type Cat = { nightVision: boolean };
type Octocat = Octopus & Cat;

const octocat: Octocat = { swims: true, nightVision: true };
console.log(octocat);
// @log: { swims: true, nightVision: true }
```

## 分割代入

- 分割代入を使うと、配列の各要素を一度に変数に代入できる([配列の分割代入](reference/values-types-variables/array/destructuring-assignment-from-array.md))。

```typescript twoslash
const [a, b] = [1, 2];
console.log(a);
// @log: 1
console.log(b);
// @log: 2
```

- 分割代入により、オブジェクトのプロパティを個別の変数へ代入できる([オブジェクトの分割代入](reference/values-types-variables/object/destructuring-assignment-from-objects.md))。

```typescript twoslash
export default "変数nameを使いたいのでモジュール化する必要がありました。";
// ---cut---
const obj = {
  name: "John",
  age: 20,
};

const { name, age } = obj;
console.log(name);
// @log: 'John'
console.log(age);
// @log: 20
```

## 条件分岐

- TypeScriptではJavaScriptと同様に、条件分岐には`if`構文や`switch`構文が利用できる。

### [if-else文](reference/statements/if-else.md)

```typescript twoslash
const age: number = 20;

if (age >= 20) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
// @log: 'You are an adult.'
```

### [switch文](reference/statements/switch.md)

```typescript twoslash
const color: string = "blue";

switch (color) {
  case "red":
    console.log("Color is red.");
    break;
  case "blue":
    console.log("Color is blue.");
    break;
  default:
    console.log("Color is neither red nor blue.");
}
// @log: 'Color is blue.'
```

### 型の絞り込み

- 条件分岐を利用すると、その節内では型が自動的に絞り込まれる([制御フロー分析と型ガードによる型の絞り込み](reference/statements/control-flow-analysis-and-type-guard))。

```typescript twoslash
let value: string | number;
// 50%の確率でstring型またはnumber型の値を代入する
value = Math.random() < 0.5 ? "Hello" : 100;

if (typeof value === "string") {
  // この節ではvalueはstring型として扱われる
  console.log(value.toUpperCase());
} else {
  // この節ではvalueはnumber型として扱われる
  console.log(value * 3);
}
```

## 関数

- TypeScriptではアロー関数や関数宣言に型注釈をつけることができる。

### [アロー関数](reference/functions/arrow-functions.md)

```typescript twoslash
const greet = (name: string): string => {
  return `Hello ${name}`;
};

console.log(greet("John"));
// @log: 'Hello John'
```

### [関数宣言](reference/functions/function-declaration.md)

```typescript twoslash
function greet(name: string): string {
  return `Hello ${name}`;
}

console.log(greet("John"));
// @log: 'Hello John'
```

### 分割代入引数

- 関数の引数に配列またはオブジェクトリテラルを展開することができる([分割代入引数](reference/functions/destructuring-assignment-parameters.md))。

```typescript twoslash
const printCoord = ({ x, y }: { x: number; y: number }) => {
  console.log(`Coordinate is (${x}, ${y})`);
};

printCoord({ x: 10, y: 20 });
// @log: 'Coordinate is (10, 20)'
```

### 型ガード関数

- 特定の型であることを判定する関数([型ガード関数](reference/functions/type-guard-functions.md))を利用することで、型が絞り込まれる。

```typescript twoslash
function isString(value: any): value is string {
  return typeof value === "string";
}

function printLength(value: any) {
  if (isString(value)) {
    // この節ではvalueはstring型として扱われる
    console.log(value.length);
  }
}

printLength("hello");
// @log: 5
```

### オプション引数

- 関数の引数には`?`をつけることで任意とすることができる([オプション引数](reference/functions/optional-parameters.md))。

```typescript twoslash
function greet(name?: string) {
  if (name === undefined) {
    return "Hello!";
  } else {
    return `Hello ${name}!`;
  }
}

console.log(greet("John"));
// @log: 'Hello John!'
console.log(greet());
// @log: 'Hello!'
```

### デフォルト引数

- 関数の引数には`=`を使ってデフォルトの値を設定することができる([デフォルト引数](reference/functions/default-parameters.md))。

```typescript twoslash
function greet(name: string = "Mystery") {
  return `Hello ${name}!`;
}

console.log(greet("John"));
// @log: 'Hello John!'
console.log(greet());
// @log: 'Hello Mystery!'
```

### 残余引数

- `...`を使って[残余引数](reference/functions/rest-parameters.md)(任意の数の引数)を設定することができる。

```typescript twoslash
function sum(...numbers: number[]) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));
// @log: 15
```

## クラス

### クラス構文

- JavaScriptの[クラス](reference/object-oriented/class/README.md)構文はそのまま利用できる。
- [フィールド](reference/object-oriented/class/fields.md)宣言に型注釈をつけることができる。

```typescript twoslash
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
john.introduce();
// @log: 'My name is John and I am 20 years old.'
```

### アクセス修飾子

- `public`(デフォルト)、`protected`、`private`の3つの[アクセス修飾子](reference/object-oriented/class/access-modifiers.md)が利用できる。

```typescript twoslash
// @errors: 2341
class Person {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
console.log(john.name); // 'John'が出力される
console.log(john.age); // エラー（privateなのでアクセスできない）
```

### クラスのreadonly修飾子

- [`readonly`修飾子](reference/object-oriented/class/readonly-modifier-in-classes.md)をつけたプロパティは、読み取り専用となる。
- `readonly`修飾子はアクセス修飾子と併用可能。

```typescript twoslash
// @errors: 2540
class Person {
  readonly name: string;
  private readonly age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
john.name = "Tom"; // エラー（readonlyのため変更不可）
```

### Constructor shorthand

- TypeScriptでは、コンストラクタパラメータにアクセス修飾子をつけることで、自動的にそのフィールドが定義される([constructor shorthand](reference/object-oriented/class/constructor-shorthand.md))。
- これによりコードの簡略化が図れる。

```typescript twoslash
class Person {
  constructor(public name: string, private age: number) {}

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
john.introduce();
// @log: 'My name is John and I am 20 years old.'
```

### フィールドの初期化子

- フィールド宣言の際に直接初期値を設定できる([フィールドの初期化子](reference/object-oriented/class/field-initializers.md))。

```typescript twoslash
class Counter {
  count = 0; // 初期値を0に設定
  //    ^^^初期化子

  increment(): void {
    this.count++;
  }
}

const counter = new Counter();
console.log(counter.count);
// @log: 0
counter.increment();
console.log(counter.count);
// @log: 1
```

### 静的フィールドと静的メソッド

- `static`キーワードを使うことで、インスタンスではなくクラス自体に関連するフィールドやメソッドを定義できる([静的フィールド](reference/object-oriented/class/static-fields.md)、[静的メソッド](reference/object-oriented/class/static-methods.md))。

```typescript twoslash
class MyClass {
  static x = 0;

  static printX(): void {
    console.log(MyClass.x);
  }
}

MyClass.printX();
// @log: 0
```

### this型

- メソッド内で`this`を返すことで、メソッドの呼び出しを直列につなげるメソッドチェーンを可能にする([メソッドチェーン](reference/object-oriented/class/return-this-type.md))。

```typescript twoslash
class MyClass {
  value = 1;

  increment(): this {
    this.value++;
    return this;
  }

  add(v: number): this {
    this.value += v;
    return this;
  }

  print(): this {
    console.log(this.value);
    return this;
  }
}

new MyClass().increment().add(3).print();
// @log: 5
```

### クラスの継承

- `extends`キーワードにより、[クラスの継承](reference/object-oriented/class/class-inheritance.md)が可能。
- スーパークラスのプロパティ・メソッドの値は、サブクラスからアクセス可能。

```typescript twoslash
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

class Dog extends Animal {
  bark(): string {
    return "Woof!";
  }
}

const dog = new Dog("Max");
console.log(dog.greet());
// @log: 'Hello, my name is Max'
console.log(dog.bark());
// @log: 'Woof!'
```

### `instanceof`演算子

- [`instanceof`演算子](reference/object-oriented/class/instanceof-operator.md)は、オブジェクトが特定のクラスのインスタンスであるかを判定できる。

```typescript twoslash
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);
// @log: true
console.log(dog instanceof Animal);
// @log: true
```

### 抽象クラス

- `abstract`キーワードにより、[抽象クラス](reference/object-oriented/class/abstract-class.md)を定義できる。
- 抽象クラスはインスタンス化できず、他のクラスが継承するための基底クラスに使用される。

```typescript twoslash
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof Woof");
  }
}

const dog = new Dog();
dog.move();
// @log: 'roaming the earth...'
dog.makeSound();
// @log: 'Woof Woof'
```

### ゲッターとセッター

- ゲッターやセッターは、オブジェクトのプロパティを取得・設定するためのメソッド。
- ゲッターは`get`キーワードで、セッターは`set`キーワードで定義する。

```typescript twoslash
class Circle {
  private _radius: number;

  constructor(radius: number) {
    this._radius = radius;
  }

  // ゲッター
  get radius(): number {
    return this._radius;
  }

  // セッター
  set radius(radius: number) {
    if (radius <= 0) {
      throw new Error("Invalid radius value");
    }
    this._radius = radius;
  }
}

const circle = new Circle(5);
console.log(circle.radius);
// @log: 5
circle.radius = 3;
console.log(circle.radius);
// @log: 3
circle.radius = -2;
// 例外: 'Invalid radius value'
```

### インターフェース

- TypeScriptのインターフェースは、プロパティ、メソッド、クラスなどの形状を定義する能力を持つ。
- インターフェースを使用する主な目的は、特定のクラスまたはオブジェクトが特定のプロパティまたはメソッドを保持することを強制する。

```typescript twoslash
interface Printable {
  print(): void;
}

class MyClass implements Printable {
  print(): void {
    console.log("Hello, world!");
  }
}
```

### インターフェース構文

- TypeScriptの[インターフェース](reference/object-oriented/interface/README.md)はオブジェクトの形状を定義することが可能。
- インターフェースはプロパティやメソッドのシグネチャを記述できる。

```typescript twoslash
interface Point {
  readonly x: number;
  readonly y: number;
  sum(): number;
}

const point: Point = {
  x: 10,
  y: 20,
  sum: function () {
    return this.x + this.y;
  },
};
```

### インターフェースのreadonly修飾子

- インターフェース内でreadonly修飾子を使用して、プロパティを読み取り専用に設定できる。
- これにより、プロパティの値が一旦設定されると後から変更できなくなる。

```typescript twoslash
// @errors: 2540
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = { x: 10, y: 20 };
p1.x = 5;
```

## 例外処理

- TypeScriptでは[例外処理](reference/statements/exception.md)のためにtry / catch / finally ブロックを使用できる。
- 例外が発生した場合（つまり、エラーオブジェクトをスローした場合）catchブロックが実行される。

```typescript twoslash
try {
  throw new Error("An error occurred!");
} catch (error) {
  console.log(error);
}
```

### try-catch-finally構文

- tryブロック内のコードは、エラーを検出し、catchブロックはエラーをハンドリングする。
- finallyブロックはエラーの有無に関係なく実行される。

```typescript twoslash
try {
  throw new Error("Oops, something went wrong.");
} catch (error) {
  console.log(error);
} finally {
  console.log("This is the finally block. It always gets executed.");
}
```

### 例外クラス

- TypeScriptでは、カスタムエラークラスを作成することも可能。
- Errorクラスを継承したカスタムクラスで、具体的なエラータイプを作成することができる。

```typescript twoslash
class CustomError extends Error {
  code = "CustomError";

  constructor(message?: string) {
    super(message);
  }
}

try {
  throw new CustomError("This is a custom error");
} catch (error) {
  if (error instanceof CustomError) {
    console.log(`${error.code}: ${error.message}`);
  }
}
```

## 非同期処理

- TypeScriptでは、[非同期プログラミング](reference/asynchronous/README.md)をサポートしていて、コード内で時間を要する処理を効率的に扱うことができる。

### Promise

- [Promise](reference/asynchronous/promise.md)は非同期操作の最終的な完了（または失敗）とその結果の値を表す。

```typescript twoslash
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 2000);
});

promise.then((data) => {
  console.log(data);
});
// @log: 'Promise resolved'
```

### async/await 構文

- 非同期処理をより直感的に書くことができる[async構文](reference/asynchronous/async.md)と[await構文](reference/asynchronous/await.md)を導入している。
- async/await 構文を使うと、非同期コードをあたかも同期コードであるかのように書ける。

```typescript twoslash
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function asyncFunction() {
  console.log("Start");
  await delay(2000);
  console.log("End");
}

asyncFunction();

// @log: 'Start'
// 2秒後
// @log: 'End'
```

## ジェネリクス

- TypeScriptの[ジェネリクス](reference/generics/README.md)を使用すると、型の再利用性が向上し、型の一貫性を保つことができる。
- ジェネリクスを使用すると、[型変数](reference/generics/type-variables.md)を導入でき、これにより機能の一部を一般化できる。

```typescript twoslash
// Tが型変数
function identity<T>(arg: T): T {
  return arg;
}

// 型変数Tにstringを割り当てる
const output1 = identity<string>("myString");
//    ^?

// 型変数Tにnumberを割り当てる
const output2 = identity<number>(100);
//    ^?
```

## モジュール

- TypeScriptのモジュールシステムは、他のモジュールと共有するコードと、モジュール内部限定のコードとを分けることを可能にする([モジュール](reference/modules.md))。

```typescript twoslash title="greeter.ts"
export function greet(name: string) {
  return `Hello, ${name}!`;
}
```

```typescript twoslash title="main.ts"
// @filename: greeter.ts
export function greet(name: string) {
  return `Hello, ${name}!`;
}

// @filename: main.ts
// ---cut---
import { greet } from "./greeter";
console.log(greet("TypeScript"));
// @log: 'Hello, TypeScript!'
```

### importとexport

- モジュール内で定義した関数や変数を外部に公開するには、exportを使用する。
- モジュールが公開した関数や変数を利用するには、importを使用する。

```typescript twoslash title="math.ts"
export function square(x: number) {
  return x * x;
}

export function cube(x: number) {
  return x * x * x;
}
```

```typescript twoslash title="main.ts"
// @filename: math.ts
export function square(x: number) {
  return x * x;
}

export function cube(x: number) {
  return x * x * x;
}

// @filename: main.ts
// ---cut---
import { square, cube } from "./math";

console.log(square(2));
// @log: 4
console.log(cube(2));
// @log: 8
```

### default export

- defaultキーワードを使用すると、モジュールがデフォルトで1つの値のみをエクスポートすることを意味する。
- default exportは、importする際に別名を指定することが可能である。

```typescript twoslash title="greeter.ts"
export default function greet(name: string) {
  return `Hello, ${name}!`;
}
```

```typescript twoslash title="main.ts"
// @filename: greeter.ts
export default function greet(name: string) {
  return `Hello, ${name}!`;
}

// @filename: main.ts
// ---cut---
import greetFunction from "./greeter";
console.log(greetFunction("TypeScript"));
// @log: 'Hello, TypeScript!'
```

### 再export

- モジュールは、別のモジュールからエクスポートされたものを再エクスポートすることができる。

```typescript twoslash title="math.ts"
export function add(x: number, y: number) {
  return x + y;
}
```

```typescript twoslash title="index.ts"
// @filename: math.ts
export function add(x: number, y: number) {
  return x + y;
}

// @filename: index.ts
// ---cut---
// 再エクスポート
export { add } from "./math";
```

```typescript twoslash title="main.ts"
// @filename: math.ts
export function add(x: number, y: number) {
  return x + y;
}

// @filename: index.ts
export { add } from "./math";

// @filename: main.ts
// ---cut---
import { add } from "./index";
console.log(add(2, 3));
// @log: 5
```

### type importとtype export

- 型だけをエクスポート・インポートすることもできる。

```typescript twoslash title="types.ts"
export type MyObject = {
  name: string;
  age: number;
};
```

```typescript twoslash title="main.ts"
// @filename: types.ts
export type MyObject = {
  name: string;
  age: number;
};

// @filename: main.ts
// ---cut---
import type { MyObject } from "./types";
//     ^^^^型インポート

const obj: MyObject = {
  name: "TypeScript",
  age: 3,
};
```

## 型レベルプログラミング

- TypeScriptには、typeof演算子やkeyof演算子、ユーティリティータイプなど、型レベルでプログラミングをするためのさまざまな機能が搭載されている。

### typeof型演算子

- [typeof演算子](reference/type-reuse/typeof-type-operator.md)は、変数名から型を逆算できる。

```typescript twoslash
const object = {
  name: "TypeScript",
  version: 3.9,
};

type ObjectType = typeof object;
//   ^?
```

### keyof型演算子

- [keyof演算子](reference/type-reuse/keyof-type-operator.md)を使うと、object型のすべてのキーを文字列リテラルのユニオン型として取得できる。

```typescript twoslash
// @errors: 2322
type Point = {
  x: number;
  y: number;
};

type Key = keyof Point;
//   ^?
const key1: Key = "x"; // 代入OK
const key2: Key = "y"; // 代入OK
const key3: Key = "z"; // 代入不可
```

### ユーティリティ型

- TypeScriptは、既存の型から新しい型を作成するためのさまざまな一般的な型操作を提供している。

#### Required

- [`Required`](reference/type-reuse/utility-types/required.md)は、オプションプロパティーを必須プロパティーにするユーティリティ型。

```typescript twoslash
type Person = {
  name: string;
  age?: number;
};

type RequiredPerson = Required<Person>;
//   ^?
// ageがオプションでなくなっている点に注目
```

#### Partial

- [`Partial`](reference/type-reuse/utility-types/partial.md)は、型のすべてのプロパティをオプションにするユーティリティ型。

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type OptionalPerson = Partial<Person>;
//   ^?
```

#### Readonly

- [`Readonly`](reference/type-reuse/utility-types/readonly.md)は、型のすべてのプロパティをreadonlyにするユーティリティ型。それらのプロパティは再代入できない。

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type ReadonlyPerson = Readonly<Person>;
//   ^?
```

#### Record

- [`Record`](reference/type-reuse/utility-types/record.md)は、オブジェクトのすべてのプロパティ値を特定の型に設定するユーティリティ型。

```typescript twoslash
type ThreeLetterRecord = Record<"one" | "two" | "three", string>;
//   ^?
```

#### Pick

- [`Pick`](reference/type-reuse/utility-types/pick.md)は、オブジェクトから特定のプロパティだけを拾い出すユーティリティ型。

```typescript twoslash
type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonNameAndAge = Pick<Person, "name" | "age">;
//   ^?
```

#### Omit

- [`Omit`](reference/type-reuse/utility-types/omit.md)は、オブジェクトから特定のプロパティを省いた型を作るユーティリティ型。

```typescript twoslash
type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonWithoutAddress = Omit<Person, "address">;
//   ^?
```

#### Exclude

- [`Exclude`](reference/type-reuse/utility-types/exclude.md)は、ユニオン型から特定の型を除外するユーティリティ型。

```typescript twoslash
type T1 = number | string | boolean;
type T2 = Exclude<T1, boolean>;
//   ^?
```

#### Extract

- [`Extract`](reference/type-reuse/utility-types/extract.md)は、ふたつのユニオン型の共通の部分を抽出するユーティリティ型。

```typescript twoslash
type T1 = number | string | boolean;
type T2 = string | boolean;
type T3 = Extract<T1, T2>;
//   ^?
```

#### NonNullable

- `NonNullable`は、nullまたはundefinedを含む型からいずれも除外するユーティリティ型。

```typescript
type T1 = string | null | undefined;
type T2 = NonNullable<T1>;
//   ^?
```

### Mapped types

- [Mapped types](reference/type-reuse/mapped-types.md)を使うと、既存の型から新しい型を生成できる。
- Mapped typesは、オブジェクトの各プロパティを”マップ”し、新しいオブジェクトを生成する。

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type ReadOnlyPerson = { readonly [K in keyof Person]: Person[K] };
//   ^?
```

### インデックスアクセス型

- [インデックスアクセス型](reference/type-reuse/indexed-access-types.md)を使うと、型のプロパティの型を取得できる。

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type Name = Person["name"];
//   ^?
```
