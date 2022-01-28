# 索引:記号とキーワード

JavaScriptやTypeScriptのコードには`?.`のような記号や`as`のようなキーワードが使われます。こういった記号やキーワードはGoogleで検索しづらく、意味を調べるのは難しいものです。

この索引は、JavaScriptとTypeScriptの記号やキーワードから、その名前や意味を調べられるようにするためのものです。コードを読んでいて未知の記号やキーワードに出くわしたら、その意味や使い方を調べる手がかりにしてください。

ここで扱う記号とキーワードには、JavaScript由来のもの、つまり、JavaScriptとTypeScriptに共通して使えるものと、TypeScriptでのみ使えるものを併記しています。JavaScript由来のものには![js]のマークを、TypeScript固有のものには![ts]マークを表示しています。

<!--
:::編集者ノート:::
記号はASCIIコード順です。
キーワードはアルファベット順です。
-->

[js]: /img/js.svg
[ts]: /img/ts.svg

## 記号

### `!` 論理否定演算子 (logical not operator) ![js]

真値と偽値を反転します。

### `!` 非Nullアサーション (non-null assertion operator) ![ts]

値がnullやundefinedでないことを宣言し、コンパイラーに値を非Nullとして解釈させます。

```ts
function firstChar(text: string | undefined) {
  // コンパイルエラーにならない
  return text!.charAt(0);
}
```

### `!` Definite Assignment Assertion演算子 (definite assignment assertion operator) ![ts]

クラスのプロパティが型アノテーションで示された型でセットされていることをコンパイラーに伝える記号です。

```ts
class Example {
  public foo!: number;
}
```

または、変数の値が型アノテーションで示された型でセットされていることをコンパイラーに伝える記号です。

```ts
let numbers!: number[];
```

[definite assignment assertion](./reference/values-types-variables/definite-assignment-assertion.md)

### `!!` Double Bang ![js]

double bangはJavaScriptで定義されている演算子ではなく、論理否定演算子を2つ連続したイディオムです。値がtruthyかを求めるときに使われます。

### `!=` 不等価演算子 (inequality operator) ![js]

左の値と右の値が異なるか判定します。型が異なる場合は型変換されて比較されます。

```js twoslash
"1" != 1;
// @log: false
```

### `!==` 厳密不等価演算子 (strict inequality operator) ![js]

型を含めて左の値と右の値が異なるか判定します。

```js twoslash
1 !== 2;
// @log: true
```

### `"` 文字列リテラル (string literal) ![js]

`"foo"`のように文字列リテラルの開始と終了に使われる記号です。

### `#` プライベートプロパティ (private property) ![js]

クラスのプロパティのうち`#`で始まるプロパティはプライベートになります。

```js
class ExampleClass {
  #privateField;
  #privateMethod() {}
  static #PRIVATE_STATIC_FIELD;
  static #privateStaticMethod() {}
}
```

### `$` ドル変数 (dollar variable) ![js]

慣習的にjQueryなどのライブラリで変数として使われることがあります。変数名として`$`が使われる場合は、JavaScriptとしては変数以上の特別な意味はありません。

### `$` 文字列中の変数展開 (placeholder) ![js]

テンプレートリテラル内で変数を展開するときに用いられる記号です。

```js twoslash
const name = "John";
console.log(`Hi, ${name}.`);
// @log: "Hi, John."
```

### `%` 剰余演算子 (reminder operator) ![js]

左の値を右の値で割った余りを計算します。

```js twoslash
12 % 5;
// @log: 2
```

### `%=` 剰余代入 (reminder assignment) ![js]

左の変数の値に右の値で割り算した余りを左の変数に割り当てます。

### `&` ビット論理積 (bitwise and) ![js]

左の値と右の値で共にビットが1である位置のビットを1に します。

```js twoslash
const a = 1;
// @log: 00000001
const b = 5;
// @log: 00000101
console.log(a & b);
// @log: 00000001
// 出力: 1
```

### `&` インターセクション型 (intersection type) ![ts]

複数の型を組み合わせたインターセクション型を定義します。

```ts
interface Swordsman {
  sword: string;
}
interface Wizard {
  magic: string;
}
type MagicalSwordsman = Swordsman & Wizard;
```

[インターセクション型 (intersection type)](reference/values-types-variables/intersection.md)

### `&=` ビット論理積代入 (bitwise and assignment) ![js]

左の変数の値と右の値で共にビットが1である位置のビットを1にした結果を左の変数に割り当てます。

```js twoslash
let a = 1;
// @log: 00000001
const b = 5;
// @log: 00000101
a &= b;
console.log(a);
// @log: 00000001
// 出力: 1
```

### `&&` 論理積 (logical and) ![js]

左の値がtruthyな場合は右の値を返します。そうでないときは左の値を返します。

特にboolean値が与えられた場合は、双方とも`true`のときに`true`を返し、そうでないときに`false`を返します。

```js twoslash
console.log(true && true);
// @log: true
console.log(true && false);
// @log: false

console.log(1 && "");
// @log: ""
```

### `&&=` 論理積代入 (logical and assignment) ![js]

左の変数と右の値の`&&`論理積の結果を左の変数に割り当てます。

```js twoslash
let a = true;
let b = 1;
a &&= b;

console.log(a);
// @log: 1
```

### `'` 文字列リテラル (string literal) ![js]

`'foo'`のように文字列リテラルの開始と終了に使われる記号です。

### `()` 即時実行関数の一部 (IIFE: immediately invoked function expression) ![js]

定義されるとすぐ実行される即時実行関数式(IIFE; Immediately Invoked Function Expression)の一部に用いられる書き方です。即時実行関数式そのものがデザインパターンで、その一部である`()`は関数呼び出しのカッコであり、JavaScriptの特別な演算子や構文というわけではありません。即時実行関数式は即時関数と呼ばれることがあります。

```js
(function () {})();
//              ^^
(function () {})();
//              ^^
(() => {})();
//        ^^
```

### `*` 乗算演算子 (multiplication operator) ![js]

左の値と右の値を掛け算します。

### `*` ジェネレーター関数の宣言 (generator) ![js]

`Generator`オブジェクトを返すジェネレーター関数を宣言するときに用いられる記号です。

```js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 2;
}
```

### `*` yield\*式 (yield) ![js]

別のジェネレーターに移譲する式を書くときに用いられる記号です。

```js
function* func1() {
  yield 123;
}

function* func2() {
  yield* func1();
  //   ^ここ
}
```

### `*=` 乗算代入 (multiplication assignment) ![js]

左の変数の値と右の値を掛け算した結果を左の変数に割り当てます。

### `**` べき乗演算子 (exponentiation) ![js]

左の値を右の値でべき乗します。

```js twoslash
2 ** 3;
// @log: 8
```

### `**=` べき乗代入 (exponentiation assignment) ![js]

左の変数の値を右の値でべき乗した結果を左の変数に割り当てます。

### `+` 単項正値演算子 ![js]

Number型に変換します。

```js twoslash
+"1";
// @log: 1
```

### `+` 加算演算子 (addition operator) ![js]

2つの値を足し算します。

### `+` 文字列結合演算子 (concatenation operator) ![js]

2つの文字列を結合します。

### `+` 修飾子の付加 ![ts]

`readonly`や`?`などの修飾子を追加します。

何も指定しない場合は暗黙的に`+`が付与されるので`+`を実際に利用する機会はおそらくありません。

```ts
type MyPartial<T> = {
  [k in keyof T]+?: T[k];
};

type MyReadonly<T> = {
  +readonly [k in keyof T]: T[k];
};
```

### `+=` 加算代入 (addition assignment) ![js]

左の変数の値とに右の値を足し算した結果を左の変数に割り当てます。

### `++` インクリメント (increment) ![js]

変数に`1`を足す演算子です。

```js twoslash
let x = 3;
x++;
console.log(x);
// @log: 4
```

### `,` 関数引数の区切り ![js]

複数の引数を関数に与えたり、複数の引数を受け取る関数宣言に用いる記号です。

```js
function plus(x, y, z) {
  return x + y + z;
}
plus(1, 2, 3);
```

### `,` 配列要素の区切り ![js]

複数の要素を持つ配列を宣言するときに用いる記号です。

```js
const numbers = [1, 2, 3];
```

### `,` オブジェクトプロパティの区切り ![js]

複数のプロパティを持つオブジェクトを宣言するときに用いる記号です。

```js
const data = {
  property1: 1,
  property2: true,
  property3: "hello",
};
```

### `,` タプル型の要素の区切り ![ts]

複数の要素を持つタプル型を宣言するときに用いる記号です。

```ts
type Tuple = [number, string, boolean];
```

### `,` カンマ演算子 (comma operator) ![js]

左から右に式を評価をして、一番右の評価した値を返します。

```js twoslash
let x = -1;
const a = (x++, x++, x > 0);
console.log(a);
// @log: true
```

### `-` 単項負値演算子 ![js]

正負を反転してNumber型に変換します。

```js twoslash
-"1";
// @log: -1
```

### `-` 減算演算子 (subtraction operator) ![js]

2つの値を引き算します。

### `-` 修飾子の削除 ![ts]

`readonly`や`?`などの修飾子を削除します。

```ts
type MyRequired<T> = {
  [k in keyof T]-?: T[k];
};

type Writable<T> = {
  -readonly [k in keyof T]: T[k];
};
```

### `-=` 減算代入 (subtraction assignment) ![js]

左の変数の値から右の値を引き算した結果を左の変数に割り当てます。

### `--` デクリメント (decrement) ![js]

変数に`1`を引き算する演算子です。

```js twoslash
let x = 3;
x--;
console.log(x);
// @log: 2
```

### `.` プロパティへのアクセス (dot operator) ![js]

オブジェクトのプロパティにアクセスするときに用いる記号です。

```js twoslash
const object = { property: 123 };
object.property;
// @log: 123
```

### `...` スプレッド構文 (spread syntax) ![js]

配列などの反復可能オブジェクトを関数の引数にする構文です。

```js twoslash
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
// @log: 6
```

または、配列などの反復可能オブジェクトを配列要素に展開する構文です。

```js twoslash
const numbers = [1, 2, 3];
const newNumbers = [0, ...numbers, 4];
console.log(newNumbers);
// @log: [ 0, 1, 2, 3, 4 ]
```

または、オブジェクトのプロパティを展開する構文です。

```js twoslash
const object = { x: 1, y: 2 };
const newObject = { ...object, z: 3 };
console.log(newObject);
// @log: { x: 1, y: 2, z: 3 }
```

### `...` 残余構文 (rest syntax) ![js]

関数の残りの引数をひとつの配列として受け取るのに用いられる構文です。

```js twoslash
function func(a, b, ...rest) {
  return rest;
}
console.log(func(1, 2, 3, 4, 5));
// @log: [ 3, 4, 5 ]
```

または、配列などの反復可能オブジェクトの残りの要素を取り出す構文です。

```js twoslash
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(rest);
// @log: [ 3, 4, 5 ]
```

または、オブジェクトの残りのプロパティを取り出す構文です。

```js twoslash
const object = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = object;
console.log(rest);
// @log: { c: 3, d: 4 }
```

### `/` 除算演算子 (division operator) ![js]

左の値を右の値で割り算します。

### `/` 正規表現リテラル (regular expression literal) ![js]

`/[0-9]+/`のような正規表現リテラルの前後に書かれる記号です。

### `/=` 除算代入 (division assignment) ![js]

左の変数の値を右の値で割り算した結果を左の変数に割り当てます。

### `//` 一行コメント (one line comment) ![js]

行コメントの開始を表す記号です。

### `/*` 複数行コメント (multiline comment) ![js]

複数行コメントの開始を表す記号です。

```js
/*
 コメント
 */
```

### `/**` JSDoc

慣習的にJSDocなどのドキュメンテーションコメントの開始を表す記号です。これはJavaScriptやTypeScriptの構文ではなく、複数行コメントを用いたドキュメンテーションに慣習的に用いられるものです。

### `:` オブジェクトの一部 ![js]

オブジェクトプロパティのキーと値の対関係を表すのに用いられる記号です。

```js
const object = { a: 1, b: 2, c: 3, d: 4 };
```

### `:` 三項演算子の一部 (conditional operator) ![js]

`a ? b : c`のような三項演算子のelseを表すのに用いられる記号です。

### `:` 型アノテーション (type annotation) ![ts]

変数の型アノテーションに用いられる記号です。

```ts
const variable: number = 20;
```

または、関数の引数や戻り値の型アノテーションに用いられる記号です。

```ts
function numberToString(x: number): string {
  return x.toString();
}
```

### `<` 小なり演算子 (less than operator) ![js]

左の値が右の値よりも小さいか判定します。

### `<` ジェネリクス (generic) ![ts]

ジェネリクスの型引数の開始に用いられる記号です。

```ts
function func1<T>(x: T) {}
const result = func<string>("hello");
```

[ジェネリクス (generics)](/reference/generics)

### `<` JSX ![ts]

JSXと呼ばれるXMLリテラルの開始に現れる記号です。

```ts title="Hello.tsx"
function Hello() {
  return <div>HELLO</div>;
}
```

### `<` 型アサーション (type assertion) ![ts]

型アサーションに用いられる記号です。`as`の別の書き方です。

```ts
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

### `<=` 小なりイコール演算子 (less than or equal) ![js]

左の値が右の値以下か判定します。

### `<<` ビット左シフト演算子 (left shift operator) ![js]

左の値のビットを右の値の数だけ左にずらします。

```js twoslash
const a = 1;
// @log: 00000001
const b = 3;
console.log(a << b);
// @log: 00001000
// 出力: 8
```

### `<<=` 左シフト代入 (left shift assignment) ![js]

左の変数の値のビットを右の値の数だけ左にずらした結果を左の変数に割り当てます。

```js twoslash
let a = 1;
// @log: 00000001
const b = 3;
a <<= b;
console.log(a);
// @log: 00001000
// 出力: 8
```

### `=` 代入演算子 (assignment) ![js]

左の変数に右の値を割り当てます。

### `==` 等価演算子 (equality) ![js]

左の値と右の値が等しいか判定します。型が異なる場合は型変換されて比較されます。

```js twoslash
"1" == 1;
// @log: true
```

### `===` 厳密等価演算子 (strict equality) ![js]

型を含めて左の値と右の値が等しいか判定します。

```js twoslash
"1" === 1;
// @log: false
```

### `=>` アロー関数の一部 (arrow function) ![js]

アロー関数の引数と関数ボディーの間に書かれる記号です。

```js
const increment = (num) => num + 1;
//                 ^^^ 引数
//                         ^^^^^^^ 関数ボディ
```

### `>` 大なり演算子 (greater than) ![js]

左の値が右の値よりも大きいか判定します。

### `>=` 大なりイコール演算子 (greater than or equal) ![js]

左の値が右の値以上か判定します。

### `>>` ビット右シフト演算子 (right shift) ![js]

左の値のビットを右の値の数だけ右にずらします。

```js twoslash
const a = 8;
// @log: 00001000
const b = 3;
console.log(a >> b);
// @log: 00000001
// 出力: 1
```

### `>>=` 右シフト代入 (right shift assignment) ![js]

左の変数の値のビットを右の値の数だけ右にずらした結果を左の変数に割り当てます。

### `>>>` 符号なし右シフト演算子 (unsigned right shift) ![js]

左の値のビットを右の値の数だけ右にずらします。左に入る符号ビットは常に0になります。

```js twoslash
const a = -2;
// @log: 11111111111111111111111111111110
const b = 3;
console.log(a >>> b);
// @log: 00011111111111111111111111111111
// 出力: 536870911
```

### `>>>=` 符号なし右シフト代入 (unsigned right shift assignment) ![js]

左の変数の値のビットを右の値の数だけ右にずらした結果を左の変数に割り当てます。左に入る符号ビットは常に0になります。

### `?` 三項演算子の一部 (conditional operator) ![js]

三項演算子`a ? b : c`の一部で、条件式の終わりに置かれる記号です。

### `?` オプション修飾子 (optional property) ![ts]

オブジェクトのプロパティを任意プロパティとして定義します。

```ts
interface User {
  name: string;
  // name は必須
  age?: number;
  // age は任意
}
const user: User = { name: "taro" };
```

または、関数の引数を必須ではなくします。

```ts
function func(x?: number) {}
func();
// xがなくてもOK
```

### `?.` オプショナルチェーン (optional chaining) ![js]

プロパティのアクセス元が`null`または`undefined`のときにエラーを発生させずに`undefined`を返します。

```js twoslash
const user = null;
console.log(user.name);
// @error: Cannot read property 'name' of null
console.log(user?.name);
// @log: undefined
```

### `??` Null合体 (nullish coalescing operator) ![js]

左の値が`null`または`undefined`のときに右の値を返します。そうでない場合は左の値を返します。

```js twoslash
console.log(undefined ?? 1);
// @log: 1
console.log(2 ?? 1);
// @log: 2
```

### `??=` Null合体代入 (logical nullish assignment) ![js]

左の変数の値が`null`または`undefined`の場合のみ右の値を左の変数に割り当てます。

```js twoslash
const user1 = { name: undefined };
user1.name ??= "taro";
console.log(user1.name);
// @log: taro

const user2 = { name: "kaori" };
user2.name ??= "taro";
console.log(user2.name);
// @log: kaori
```

### `@` デコレーター (decorator) ![ts]

デコレーターはクラスやクラスメンバーに注釈を追加するもので、デコレーターを使うのに用いられる記号です。

### `[` 配列リテラル (array literal notation) ![js]

`[1, 2, 3]`のような配列リテラルの開始に用いられる記号です。

### `[` アクセッサー (bracket notation) ![js]

配列の要素やオブジェクトのプロパティにアクセスするときに用いられる記号です。

```js twoslash
const numbers = [1, 2, 3];
numbers[0];
// @log: 1
const object = { a: 1, b: 2 };
object["a"];
// @log: 1
```

### `[` 配列の分割代入 (destructuring assignment) ![js]

配列などの反復可能オブジェクトの分割代入の開始に用いられる記号です。

```js twoslash
const numbers = [1, 2, 3];
const [first, ...rest] = numbers;
// 分割代入
console.log(first, rest);
// @log: 1 [ 2, 3 ]

// 分割代入
function func([first, ...rest]) {
  console.log(first, rest);
}
func([1, 2, 3]);
// @log: 1 [ 2, 3 ]
```

### `[` インデックス型 (index signature) ![ts]

インデックス型(index signature)の開始に用いられる記号です。

```ts
type StringKeysAndStringValues = {
  [key: string]: string;
};
```

[インデックス型 (index signature)](reference/values-types-variables/object/index-signature.md)

### `[]` 配列型 (array type) ![ts]

配列型を表現するのに用いられる記号です。

```ts
let names: string[];
type FooList = Foo[];
```

### `\` 文字列エスケープシーケンス (escaping character) ![js]

文字列のエスケープシーケンスの開始に用いられる記号です。

```js
const lineBreak = "\n";
```

### `^` ビット排他的論理和 (bitwise xor) ![js]

左の値と右の値でビットの値が異なる位置のビットを1にします。

```js twoslash
const a = 1;
// @log: 00000001
const b = 5;
// @log: 00000101
console.log(a ^ b);
// @log: 00000100
// 出力: 4
```

### `^=` ビット排他的論理和代入 (bitwise xor assignment) ![js]

左の変数の値と右の値でビットの値が異なる位置のビットを1にした結果を左の変数に割り当てます。

### `_` 数値の区切り文字 ![js]

数値の可読性のために、桁区切りとして用いられる記号です。

```js
const hyakuman = 1_000_000;
```

### `_` アンダースコア変数 ![js]

慣習的にlodashなどのライブラリで変数として使われることがあります。変数名として`_`が使われる場合は、JavaScriptとしては変数以上の特別な意味はありません。

また、慣習的に使わない変数の受け取り先に使われることがあります。たとえば、2つの引数を受け取るコールバック関数で、第2引数だけを使う場合、第1引数をアンダースコアにする書き方をするコードが中にはあります。

```js twoslash
[1, 2, 3].map((_, index) => {
  //  _ は 1, 2, 3のような要素値。それを使わないという意味で _ にしている
});
```

### `` ` `` テンプレートリテラル (template literal) ![js]

テンプレートリテラル(テンプレート文字列)の前後に置かれる記号です。

```js
`string text`;
```

### `{` ブロック文 (block) ![js]

if文やfor文などの構文に付随して使われる記号です。

```js
if (isOK) {
  // ...
} else {
  // ...
}
```

if文やfor文などの構文を伴わないブロック文は、単に変数のスコープを分けることを目的にしていることがあります。

```js
{
  const value = 1;
}
{
  const value = 2;
  // 上と同じ変数名で初期化しているが、スコープが別になるためエラーにならない。
}
```

### `{` オブジェクトの分割代入 (destructuring assignment) ![js]

オブジェクトの分割代入に用いられる記号です。

```js twoslash
const object = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = object; // 分割代入
console.log(a, b, rest);
// @log: 1 2 { c: 3, d: 4 }

// 分割代入
function func({ a, b, ...rest }) {
  console.log(a, b, rest);
}
func(object);
// @log: 1 2 { c: 3, d: 4 }
```

### `|` ビット論理和 (bitwise or) ![js]

左の値と右の値でどちらのビットが1である位置のビットを1にします。

```js twoslash
const a = 0b010;
const b = 0b101;
console.log((a | b) === 0b111);
// @log: true
```

### `|` ユニオン型 (union type) ![ts]

複数の型を組み合わせたユニオン型を定義します。

```ts
type ID = string | number;
const id1 = "e29b41"; // OK
const id2 = 100; // OK
const id3 = true; // ERROR
```

### `|=` ビット論理和代入 (bitwise or assignment) ![js]

左の変数の値と右の値でどちらかがのビットが1である位置のビットを1にした結果を左の変数に割り当てます。

### `||` 論理和 (logical or) ![js]

左の値がtruthyな場合はそれを返します。そうでないときは右の値を返します。

特にboolean値の場合は、ひとつでも`true`のときに`true`を返し、そうでない場合に`false`を返します。

```js twoslash
console.log(true || false);
// @log: true
console.log(false || false);
// @log: false

console.log(false || "abc");
// @log: "abc"
```

### `||=` 論理和代入 (logical or assignment) ![js]

左の変数と右の値の`||`論理和の結果を左の変数に割り当てます。

```js twoslash
let a = false;
let b = 1;
a ||= b;
console.log(a);
// @log: 1
```

### `~` ビット否定演算子 (bitwise not) ![js]

ビットを反転します。

```js twoslash
const a = 1;
// @log: 00000001
console.log(~a);
// @log: 11111110
// 出力: -2
```

### `~~` Double Tilde ![js]

ビット否定演算子を2つ重ねたもので、小数点以下を消し去る計算をするイディオムです。JavaScriptにこういう演算子があるわけではなく慣習的なものです。double tildeの計算結果は、正の数については`Math.floor`と同じに、負の数は`Math.ceil`と同じになります。

```js twoslash
~~1.5;
// @log: 1
Math.floor(1.5);
// @log: 1
Math.ceil(1.5);
// @log: 2

~~-1.5;
// @log: -1
Math.floor(-1.5);
// @log: -2
Math.ceil(-1.5);
// @log: -1
```

## キーワード

### `as` 型アサーション (type assertion) ![ts]

TypeScriptコンパイラーが解釈した型を上書きする「型アサーション」に用いられるキーワードです。

### `as const` constアサーション (const assertion) ![ts]

変数に含まれるハードコーディングされた値をそのリテラル型で宣言し、読み取り専用にします。

```ts twoslash
let hello = "hello";
//      ^?
let bye = "bye" as const;
//  ^?
const wolf = { caniformia: "Wolf" };
//    ^?
const fox = { caniformia: "Fox" } as const;
//    ^?
```

### `const` const ![js]

ブロックスコープを持つ定数定義です。スコープ内では再代入も再宣言もできません。

### `get` ゲッター (get) ![js]

オブジェクトのプロパティが参照されたときに対応する関数が呼ばれます。

```js twoslash
const exam = {
  scores: [50, 70, 90, 80, 100, 60],
  get best() {
    return Math.max(...this.scores);
  },
};

console.log(exam.best);
// @log: 100
```

### `in` in演算子 (in operator) ![js]

プロパティがオブジェクトにある場合に`true`を返す演算子です。

```js twoslash
const book = { name: "サバイバルTypeScript" };
console.log("name" in book);
// @log: true
console.log("price" in book);
// @log: false
```

### `in` for-in構文 ![js]

オブジェクトの列挙可能プロパティをループするfor-in構文です。

```js twoslash
const drink = { name: "Coffee", price: 500 };
for (const property in drink) {
  console.log(property);
}
```

### `in` mapped type ![ts]

mapped typeに現れる`in`です。

```ts twoslash
type MappedType = {
  [key in "foo" | "bar"]: string;
};
```

[Mapped type](reference/type-reuse/mapped-types.md)

### `is` 型アサーション関数の一部 (user-defined type guard) ![ts]

型ガードに用いる型アサーション関数の戻り値の型アノテーション部分に用いられるキーワードです。

```ts
function isDuck(animal: Animal): animal is Duck {}
```

### `keyof` keyof型演算子 (keyof) ![ts]

オブジェクト型からプロパティ名を型として返す型演算子です。

### `n` bigintリテラル (bigint literal) ![js]

数字がbigintリテラルであることを表すのに用いる記号です。

```js
100n; // bigint型の100
```

### `typeof` typeof演算子 (typeof) ![js]

与えられた値の型を表す文字列を返します。

```js twoslash
console.log(typeof 123);
// @log: "number"
```

### `typeof` typeof型演算子 (typeof) ![ts]

変数から型を抽出する演算子です。

### `set` セッター (set) ![js]

オブジェクトのプロパティを変更するときに対応する関数が呼ばれます。

```js twoslash
const prize = {
  latest: "",
  history: [],
  set winner(winner) {
    this.latest = winner;
    this.history.push(winner);
  },
};

prize.winner = "Stanislas Wawrinka";
prize.winner = "Rafael Nadal Parera";
prize.winner = "Novak Đoković";

console.log(prize.latest);
// @log: "Novak Đoković"
console.log(prize.history);
// @log: [ 'Stanislas Wawrinka', 'Rafael Nadal Parera', 'Novak Đoković' ]
```

### `void` void演算子 (void) ![js]

戻り値を`undefined`にします。

```js twoslash
console.log(void 123);
// @log: undefined
```

### `void` void型 (void) ![ts]

戻り値が`undefined`あるいはない場合に使用します。

```ts
function returnUndefined(num: number): void {
  if (num === 0) {
    return undefined;
  }

  return;
}
```

[void型](reference/functions/void-type.md)
