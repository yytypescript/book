# 索引:記号とキーワード

JavaScriptやTypeScriptのコードには`?.`のような記号や`as`のようなキーワードが使われます。こういった記号やキーワードはGoogleで検索しづらく、意味を調べるのは難しいものです。

この索引は、JavaScriptとTypeScriptの記号やキーワードから、その名前や意味を調べられるようにするためのものです。コードを読んでいて未知の記号やキーワードに出くわしたら、その意味や使い方を調べる手がかりにしてください。

ここで扱う記号とキーワードには、JavaScript由来のもの、つまり、JavaScriptとTypeScriptに共通して使えるものと、TypeScriptでのみ使えるものを併記しています。JavaScript由来のものには![js](.gitbook/assets/js.svg)のマークを、TypeScript固有のものには![TS](.gitbook/assets/ts.svg)マークを表示しています。

## 記号とキーワード

### `!` 論理否定演算子 (logical not operator) ![js](.gitbook/assets/js.svg)

真値と偽値を反転します。

### `!` 非Nullアサーション (non-null assertion operator) ![ts](.gitbook/assets/ts.svg)

値がnullやundefinedでないことを宣言し、 コンパイラーに値を非Nullとして解釈させます。

```typescript
function firstChar(text: string | undefined) {
  // コンパイルエラーにならない
  return text!.charAt(0);
}
```

### `!` Definite Assignment Assertion演算子 ![ts](.gitbook/assets/ts.svg)

クラスのプロパティが型アノテーションで示された型でセットされていることをコンパイラーに伝える記号です。

```typescript
class Example {
  public foo!: number;
}
```

または、変数の値が型アノテーションで示された型でセットされていることをコンパイラーに伝える記号です。

```typescript
let numbers!: number[];
```

### `!!` Double Bang ![js](.gitbook/assets/js.svg)

double bangはJavaScriptで定義されている演算子ではなく、論理否定演算子を2つ連続したイディオムです。値がtruthyかを求めるときに使われます。

### `!=` 不等価演算子 (inequality operator) ![js](.gitbook/assets/js.svg)

左の値と右の値が異なるか判定します。型が異なる場合は型変換されて比較されます。

```javascript
"1" != 1; // false
```

### `!==` 厳密不等価演算子 (strict inequality operator) ![js](.gitbook/assets/js.svg)

型を含めて左の値と右の値が異なるか判定します。

```javascript
1 !== 2; // true
```

### `"` 文字列リテラル (string literal) ![js](.gitbook/assets/js.svg)

`"foo"`のように文字列リテラルの開始と終了に使われる記号です。

### `#` プライベートプロパティ (private property) ![js](.gitbook/assets/js.svg)

クラスのプロパティのうち`#`で始まるプロパティはプライベートになります。

```javascript
class ExampleClass {
  #privateField;
  #privateMethod() {}
  static #PRIVATE_STATIC_FIELD;
  static #privateStaticMethod() {}
}
```

### `$` ドル変数 (dollar variable) ![js](.gitbook/assets/js.svg)

慣習的にjQueryなどのライブラリで変数として使われることがあります。変数名として`$`が使われる場合は、JavaScriptとしては変数以上の特別な意味はありません。

### `$` 文字列中の変数展開 (placeholder) ![js](.gitbook/assets/js.svg)

テンプレートリテラル内で変数を展開するときに用いられる記号です。

```javascript
const name = "John";
console.log(`Hi, ${name}.`); // "Hi, John."
```

### `%` 剰余演算子 (reminder operator) ![js](.gitbook/assets/js.svg)

左の値を右の値で割った余りを計算します。

```javascript
12 % 5; // 2
```

### `%=` 剰余代入 (reminder assignment) ![js](.gitbook/assets/js.svg)

左の変数の値に右の値で割り算した余りを左の変数に割り当てます。

### `&` ビット論理積 (bitwise and) ![js](.gitbook/assets/js.svg)

左の値と右の値で共にビットが1である位置のビットを1に します。

```javascript
const a = 1; // 00000001
const b = 5; // 00000101
console.log(a & b); // 00000001
// 出力: 1
```

### `&` インターセクション型 ![ts](.gitbook/assets/ts.svg)

複数の型を組み合わせたインターセクション型を定義する。

```typescript
interface Swordsman {
  sword: string;
}
interface Wizard {
  magic: string;
}
type MagicalSwordsman = Swordsman & Wizard;
```

{% content-ref url="reference/values-types-variables/intersection.md" %}
[intersection.md](reference/values-types-variables/intersection.md)
{% endcontent-ref %}

### `&=` ビット論理積代入 (bitwise and assignment) ![js](.gitbook/assets/js.svg)

左の変数の値と右の値で共にビットが1である位置のビットを1にした結果を左の変数に割り当てます。

```javascript
let a = 1; // 00000001
const b = 5; // 00000101
a &= b;
console.log(a); // 00000001
// 出力: 1
```

### `&&` 論理積 (logical and) ![js](.gitbook/assets/js.svg)

すべての真偽値が `true` のときに `true` を返します。そうでない場合に `false` を返します。

### `&&=` 論理積代入 (logical and assignment) ![js](.gitbook/assets/js.svg)

左の変数の真偽値と右の真偽値の論理積の結果を左の変数に割り当てます。

```javascript
let a = true;
let b = false;
a &&= b;
console.log(a); // false
```

### `'` 文字列リテラル (string literal) ![js](.gitbook/assets/js.svg)

`'foo'`のように文字列リテラルの開始と終了に使われる記号です。

### `()` 即時実行関数の一部 (IIFE: immediately invoked function expression) ![js](.gitbook/assets/js.svg)

定義されるとすぐ実行される即時実行関数式(IIFF; Immediately Invoked Function Expression)の一部に用いられる書き方です。即時実行関数式そのものがデザインパターンで、その一部である`()`は関数呼び出しのカッコであり、JavaScriptの特別な演算子や構文というわけではありません。即時実行関数式は即時関数と呼ばれることがあります。

```javascript
(function () { /* 何らかの処理 */ }());
//                               ^^
(function () { /* 何らかの処理 */ })();
//                                ^^
(() => { /* 何らかの処理*/ })();
//                         ^^
```

### `*` 乗算演算子 (multiplication operator) ![js](.gitbook/assets/js.svg)

左の値と右の値を掛け算します。

### `*` ジェネレーター関数の宣言 (generator) ![js](.gitbook/assets/js.svg)

`Generator`オブジェクトを返すジェネレーター関数を宣言するときに用いられる記号です。

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 2;
}
```

### `*` yield\*式 (yield) ![js](.gitbook/assets/js.svg)

別のジェネレーターに移譲する式を書くときに用いられる記号です。

```javascript
function* func1() {
  yield 123;
}

function* func2() {
  yield* func1();
  //   ^ここ
}
```

### `*=` 乗算代入 (multiplication assignment) ![js](.gitbook/assets/js.svg)

左の変数の値と右の値を掛け算した結果を左の変数に割り当てます。

### `**` べき乗演算子 (exponentiation) ![js](.gitbook/assets/js.svg)

左の値を右の値でべき乗します。

```javascript
2 ** 3; // 8
```

### `**=` べき乗代入 (exponentiation assignment) ![js](.gitbook/assets/js.svg)

左の変数の値を右の値でべき乗した結果を左の変数に割り当てます。

### `+` 単項正値演算子 ![js](.gitbook/assets/js.svg)

Number型に変換します。

```javascript
+"1"; // 1
```

### `+` 加算演算子 (addition operator) ![js](.gitbook/assets/js.svg)

2つの値を足し算します。

### `+` 文字列結合演算子 (concatenation operator) ![js](.gitbook/assets/js.svg)

2つの文字列を結合します。

### `+` 修飾子の付加 ![ts](.gitbook/assets/ts.svg)

`readonly`や`?`などの修飾子を追加する。

何も指定しない場合は暗黙的に`+`が付与されるので `+`を実際に利用する機会はおそらくありません。

```typescript
type MyPartial<T> = {
  [k in keyof T]+?: T[k];
};

type MyReadonly<T> = {
  +readonly [k in keyof T]: T[k];
};
```

### `+=` 加算代入 (addition assignment) ![js](.gitbook/assets/js.svg)

左の変数の値とに右の値を足し算した結果を左の変数に割り当てます。

### `++` インクリメント (increment) ![js](.gitbook/assets/js.svg)

変数に`1`を足す演算子です。

```javascript
let x = 3;
x++;
console.log(x); // 4
```

### `,` 関数引数の区切り ![js](.gitbook/assets/js.svg)

複数の引数を関数に与えたり、複数の引数を受け取る関数宣言に用いる記号です。

```javascript
function plus(x, y, z) {
  return x + y + z;
}
plus(1, 2, 3);
```

### `,` 配列要素の区切り ![js](.gitbook/assets/js.svg)

複数の要素を持つ配列を宣言するときに用いる記号です。

```javascript
const numbers = [1, 2, 3];
```

### `,` オブジェクトプロパティの区切り ![js](.gitbook/assets/js.svg)

複数のプロパティを持つオブジェクトを宣言するときに用いる記号です。

```javascript
const data = {
  property1: 1,
  property2: true,
  property3: "hello",
};
```

### `,` タプル型の要素の区切り ![ts](.gitbook/assets/ts.svg)

複数の要素を持つタプル型を宣言するときに用いる記号です。

```typescript
type Tuple = [number, string, boolean];
```

### `,` カンマ演算子 (comma operator) ![js](.gitbook/assets/js.svg)

左から右に式を評価をして、一番右の評価した値を返します。

```javascript
let x = -1
const a = x++, x++, x > 0
console.log(a)  // true
```

### `-` 単項負値演算子 ![js](.gitbook/assets/js.svg)

正負を反転してNumber型に変換します。

```javascript
-"1"; // -1
```

### `-` 減算演算子 (subtraction operator) ![js](.gitbook/assets/js.svg)

2つの値を引き算します。

### `-` 修飾子の削除 ![ts](.gitbook/assets/ts.svg)

`readonly`や`?`などの修飾子を削除します。

```typescript
type MyRequired<T> = {
  [k in keyof T]-?: T[k];
};

type Writable<T> = {
  -readonly [k in keyof T]: T[k];
};
```

### `-=` 減算代入 (subtraction assignment) ![js](.gitbook/assets/js.svg)

左の変数の値から右の値を引き算した結果を左の変数に割り当てます。

### `--` デクリメント (decrement) ![js](.gitbook/assets/js.svg)

変数に`1`を引き算する演算子です。

```javascript
let x = 3;
x--;
console.log(x); // 2
```

### `.` プロパティへのアクセス (dot operator) ![js](.gitbook/assets/js.svg)

オブジェクトのプロパティにアクセスするときに用いる記号です。

```javascript
const object = { property: 123 };
object.property; // 123
```

### `...` スプレッド構文 (spread syntax) ![js](.gitbook/assets/js.svg)

配列などの反復可能オブジェクトを関数の引数にする構文です。

```javascript
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6
```

または、配列などの反復可能オブジェクトを配列要素に展開する構文です。

```javascript
const numbers = [1, 2, 3];
const newNumbers = [0, ...numbers, 4];
console.log(newNumbers); // [ 0, 1, 2, 3, 4 ]
```

または、オブジェクトのプロパティを展開する構文です。

```javascript
const object = { x: 1, y: 2 };
const newObject = { ...object, z: 3 };
console.log(newObject); // { x: 1, y: 2, z: 3 }
```

### `...` 残余構文 (rest syntax) ![js](.gitbook/assets/js.svg)

関数の残りの引数をひとつの配列として受け取るのに用いられる構文です。

```javascript
function func(a, b, ...rest) {
  return rest;
}
console.log(func(1, 2, 3, 4, 5)); // [ 3, 4, 5 ]
```

または、配列などの反復可能オブジェクトの残りの要素を取り出す構文です。

```javascript
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(rest); // [ 3, 4, 5 ]
```

または、オブジェクトの残りのプロパティを取り出す構文です。

```javascript
const object = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = object;
console.log(rest); // { c: 3, d: 4 }
```

### `/` 除算演算子 (division operator) ![js](.gitbook/assets/js.svg)

左の値を右の値で割り算します。

### `/` 正規表現リテラル (regular expression literal) ![js](.gitbook/assets/js.svg)

`/[0-9]+/`のような正規表現リテラルの前後に書かれる記号です。

### `/=` 除算代入 (division assignment) ![js](.gitbook/assets/js.svg)

左の変数の値を右の値で割り算した結果を左の変数に割り当てます。

### `//` 一行コメント (one line comment) ![js](.gitbook/assets/js.svg)

行コメントの開始を表す記号です。

### `/*` 複数行コメント (multiline comment) ![js](.gitbook/assets/js.svg)

複数行コメントの開始を表す記号です。

```javascript
/*
 コメント
 */
```

### `/**` JSDoc

慣習的にJSDocなどのドキュメンテーションコメントの開始を表す記号です。これはJavaScriptやTypeScriptの構文ではなく、複数行コメントを用いたドキュメンテーションに慣習的に用いられるものです。

### `:` オブジェクトの一部 ![js](.gitbook/assets/js.svg)

オブジェクトプロパティのキーと値の対関係を表すのに用いられる記号です。

```javascript
const object = { a: 1, b: 2, c: 3, d: 4 };
```

### `:` 三項演算子の一部 (conditional operator) ![js](.gitbook/assets/js.svg)

`a ? b : c`のような三項演算子のelseを表すのに用いられる記号です。

### `:` 型アノテーション ![ts](.gitbook/assets/ts.svg)

変数の型アノテーションに用いられる記号です。

```typescript
const variable: number = 20;
```

または、関数の引数や戻り値の型アノテーションに用いられる記号です。

```typescript
function numberToString(x: number): string {
  return x.toString();
}
```

### `<` 小なり演算子 (less than operator) ![js](.gitbook/assets/js.svg)

左の値が右の値よりも小さいか判定します。

### `<` ジェネリクス ![ts](.gitbook/assets/ts.svg)

ジェネリクスの型引数の開始に用いられる記号です。

```typescript
function func1<T>(x: T) { /*...*/ }
const result = func<string>("hello");
```

{% content-ref url="reference/generics/" %}
[generics](reference/generics/)
{% endcontent-ref %}

### `<` JSX ![ts](.gitbook/assets/ts.svg)

JSXと呼ばれるXMLリテラルの開始に現れる記号です。

{% code title="Hello.tsx" %}
```typescript
function Hello() {
  return <div>HELLO</div>;
}
```
{% endcode %}

### `<` 型アサーション ![ts](.gitbook/assets/ts.svg)

型アサーションに用いられる記号です。`as`の別の書き方です。

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

### `<=` 小なりイコール演算子 (less than or equal) ![js](.gitbook/assets/js.svg)

左の値が右の値以下か判定します。

### `<<` ビット左シフト演算子 (left shift operator) ![js](.gitbook/assets/js.svg)

左の値のビットを右の値の数だけ左にずらします。

```javascript
const a = 1; // 00000001
const b = 3;
console.log(a << b); // 00001000
// 出力: 8
```

### `<<=` 左シフト代入 (left shift assignment) ![js](.gitbook/assets/js.svg)

左の変数の値のビットを右の値の数だけ左にずらした結果を左の変数に割り当てます。

```javascript
let a = 1; // 00000001
const b = 3;
a <<= b;
console.log(a); // 00001000
// 出力: 8
```

### `=` 代入演算子 (assignment) ![js](.gitbook/assets/js.svg)

左の変数に右の値を割り当てます。

### `==` 等価演算子 (equality) ![js](.gitbook/assets/js.svg)

左の値と右の値が等しいか判定します。型が異なる場合は型変換されて比較されます。

```javascript
"1" == 1; // true
```

### `===` 厳密等価演算子 (strict equality) ![js](.gitbook/assets/js.svg)

型を含めて左の値と右の値が等しいか判定します。

```javascript
"1" === 1; // false
```

### `=>` アロー関数の一部 (arrow function) ![js](.gitbook/assets/js.svg)

アロー関数の引数と関数ボディーの間に書かれる記号です。

```javascript
const increment = (num) => num + 1;
//                 ^^^ 引数
//                         ^^^^^^^ 関数ボディ
```

### `>` 大なり演算子 (greater than) ![js](.gitbook/assets/js.svg)

左の値が右の値よりも大きいか判定します。

### `>=` 大なりイコール演算子 (greater than or equal) ![js](.gitbook/assets/js.svg)

左の値が右の値以上か判定します。

### `>>` ビット右シフト演算子 (right shift) ![js](.gitbook/assets/js.svg)

左の値のビットを右の値の数だけ右にずらします。

```javascript
const a = 8; // 00001000
const b = 3;
console.log(a >> b); // 00000001
// 出力: 1
```

### `>>=` 右シフト代入 (right shift assignment) ![js](.gitbook/assets/js.svg)

左の変数の値のビットを右の値の数だけ右にずらした結果を左の変数に割り当てます。

### `>>>` 符号なし右シフト演算子 (unsigned right shift) ![js](.gitbook/assets/js.svg)

左の値のビットを右の値の数だけ右にずらします。左に入る符号ビットは常に0になります。

```javascript
const a = -2; // 11111111111111111111111111111110
const b = 3;
console.log(a >>> b); // 00011111111111111111111111111111
// 出力: 536870911
```

### `>>>=` 符号なし右シフト代入 (unsigned right shift assignment) ![js](.gitbook/assets/js.svg)

左の変数の値のビットを右の値の数だけ右にずらした結果を左の変数に割り当てます。左に入る符号ビットは常に 0 になります。

### `?` 三項演算子の一部 (conditional operator) ![js](.gitbook/assets/js.svg)

三項演算子`a ? b : c`の一部で、条件式の終わりに置かれる記号です。

### `?` オプション修飾子 ![ts](.gitbook/assets/ts.svg)

オブジェクトのプロパティを任意プロパティとして定義します。

```typescript
interface User {
  name: string; // name は必須
  age?: number; // age は任意
}
const user: User = { name: "taro" };
```

または、関数の引数を必須ではなくします。

```typescript
function func(x?: number) {}
func(); // xがなくてもOK
```

### `?.` オプショナルチェーン (optional chaining) ![js](.gitbook/assets/js.svg)

プロパティのアクセス元が `null` または `undefined` のときにエラーを発生させずに `undefined` を返します。

```javascript
const user = null;
console.log(user.name); // Cannot read property 'name' of null
console.log(user?.name); // undefined
```

### `??` Null合体 (nullish coalescing operator) ![js](.gitbook/assets/js.svg)

左の値が `null` または `undefined` のときに右の値を返します。そうでない場合は左の値を返します。

```javascript
console.log(undefined ?? 1); // 1
console.log(2 ?? 1); // 2
```

### `??=` Null合体代入 (logical nullish assignment) ![js](.gitbook/assets/js.svg)

左の変数の値が null または undefined の場合のみ右の値を左の変数に割り当てます。

```javascript
const user1 = { name: undefined };
user1.name ??= "taro";
console.log(user1.name); // taro

const user2 = { name: "kaori" };
user2.name ??= "taro";
console.log(user2.name); // kaori
```

### `@` デコレーター ![ts](.gitbook/assets/ts.svg)

デコレーターはクラスやクラスメンバーに注釈を追加するもので、デコレーターを使うのに用いられる記号です。

### `[` 配列リテラル (array literal notation) ![js](.gitbook/assets/js.svg)

`[1, 2, 3]`のような配列リテラルの開始に用いられる記号です。

### `[` アクセッサー (bracket notation) ![js](.gitbook/assets/js.svg)

配列の要素やオブジェクトのプロパティにアクセスするときに用いられる記号です。

```javascript
const numbers = [1, 2, 3];
numbers[0]; // 1
const object = { a: 1, b: 2 };
object["a"]; // 1
```

### `[` 配列の分割代入 (destructuring assignment) ![js](.gitbook/assets/js.svg)

配列などの反復可能オブジェクトの分割代入の開始に用いられる記号です。

```javascript
const numbers = [1, 2, 3];
const [first, ...rest] = numbers; // 分割代入
console.log(first, rest); // 1 [ 2, 3 ]

function func([first, ...rest]) { // 分割代入
    console.log(first, rest);
}
func([1, 2, 3]); // 1 [ 2, 3 ]
```

### `[` インデックス型 ![ts](.gitbook/assets/ts.svg)

インデックス型(index signature)の開始に用いられる記号です。

```typescript
type StringKeysAndStringValues = {
  [key: string] : string;
};
```

{% content-ref url="reference/values-types-variables/object/index-signature.md" %}
[index-signature.md](reference/values-types-variables/object/index-signature.md)
{% endcontent-ref %}

### `[]` 配列型 ![ts](.gitbook/assets/ts.svg)

配列型を表現するのに用いられる記号です。

```typescript
let names: string[];
type FooList = Foo[];
```

### `\` 文字列エスケープシーケンス (escaping character) ![js](.gitbook/assets/js.svg)

文字列のエスケープシーケンスの開始に用いられる記号です。

```javascript
const lineBreak = "\n";
```

### `^` ビット排他的論理和 (bitwise xor) ![js](.gitbook/assets/js.svg)

左の値と右の値でビットの値が異なる位置のビットを1にします。

```javascript
const a = 1; // 00000001
const b = 5; // 00000101
console.log(a ^ b); // 00000100
// 出力: 4
```

### `^=` ビット排他的論理和代入 (bitwise xor assignment) ![js](.gitbook/assets/js.svg)

左の変数の値と右の値でビットの値が異なる位置のビットを1にした結果を左の変数に割り当てます。

### `_` 数値の区切り文字 ![js](.gitbook/assets/js.svg)

数値の可読性のために、桁区切りとして用いられる記号です。

```javascript
const hyakuman = 1_000_000;
```

### `_` アンダースコア変数 ![js](.gitbook/assets/js.svg)

慣習的にlodashなどのライブラリで変数として使われることがあります。変数名として`_`が使われる場合は、JavaScriptとしては変数以上の特別な意味はありません。

また、慣習的に使わない変数の受け取り先に使われることがあります。たとえば、2つの引数を受け取るコールバック関数で、第2引数だけを使う場合、第1引数をアンダースコアにする書き方をするコードが中にはあります。

```javascript
[1, 2, 3].map((_, index) => {
  // _ は 1, 2, 3のような要素値。それを使わないという意味で _ にしている
});
```

### \`\` テンプレートリテラル (template literal) ![js](.gitbook/assets/js.svg)

テンプレートリテラル(テンプレート文字列)の前後に置かれる記号です。

```javascript
`string text`;
```

### `{` ブロック文 ![js](.gitbook/assets/js.svg)

if文やfor文などの構文に付随して使われる記号です。

```javascript
if (isOK) {
  // ...
} else {
  // ...
}
```

if文やfor文などの構文を伴わないブロック文は、単に変数のスコープを分けることを目的にしていることがあります。

```javascript
{
  const value = 1;
}
{
  const value = 2; // 上と同じ変数名で初期化しているが、スコープが別になるためエラーにならない。
}
```

### `{` オブジェクトの分割代入 ![js](.gitbook/assets/js.svg)

オブジェクトの分割代入に用いられる記号です。

```javascript
const object = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = object; // 分割代入
console.log(a, b, rest); // 1 2 { c: 3, d: 4 }

function func({ a, b, ...rest }) { // 分割代入
  console.log(a, b, rest);
}
func(object); // 1 2 { c: 3, d: 4 }
```

### `|` ビット論理和 ![js](.gitbook/assets/js.svg)

左の値と右の値でどちらのビットが1である位置のビットを1に します。

```javascript
const a = 0b010;
const b = 0b101;
console.log((a | b) === 0b111); // true
```

### `|` ユニオン型 ![ts](.gitbook/assets/ts.svg)

複数の型を組み合わせたユニオン型を定義する。

```javascript
type ID = string | number;
const id1 = "e29b41"; // OK
const id2 = 100; // OK
const id3 = true; // ERROR
```

### `|=` ビット論理和代入 ![js](.gitbook/assets/js.svg)

左の変数の値と右の値でどちらかがのビットが1である位置のビットを1にした結果を左の変数に割り当てます。

### `||` 論理和 ![js](.gitbook/assets/js.svg)

ひとつでも真偽値が `true` のときに `true` を返します。そうでない場合に `false` を返します。

### `||=` 論理和代入 ![js](.gitbook/assets/js.svg)

左の変数の真偽値と右の真偽値の論理和の結果を左の変数に割り当てます。

### `~` ビット否定演算子 ![js](.gitbook/assets/js.svg)

ビットを反転します。

```javascript
const a = 1; // 00000001
console.log(~a); // 11111110
// 出力: -2
```

### `~~` Double Tilde ![js](.gitbook/assets/js.svg)

ビット否定演算子を2つ重ねたもので、小数点以下を消し去る計算をするイディオムです。JavaScriptにこういう演算子があるわけではなく慣習的なものです。double tildeの計算結果は、正の数については`Math.floor`と同じに、負の数は`Math.ceil`と同じになります。

```javascript
~~1.5; // 1
Math.floor(1.5); // 1
Math.ceil(1.5); // 2

~~(-1.5); // -1
Math.floor(-1.5); // -2
Math.ceil(-1.5); // -1
```

### `as` 型アサーション ![](.gitbook/assets/ts.svg)

TypeScriptコンパイラーが解釈した型を上書きする「型アサーション」に用いられるキーワードです。

### `is` 型アサーション関数の一部 ![](.gitbook/assets/ts.svg)

型ガードに用いる型アサーション関数の戻り値の型アノテーション部分に用いられるキーワードです。

```typescript
function isDuck(animal: Animal): animal is Duck { /* ... */ }
```

### `keyof` keyof型演算子 ![](.gitbook/assets/ts.svg)

オブジェクト型からプロパティ名を型として返す型演算子です。

### `n` bigintリテラル ![js](.gitbook/assets/js.svg)

数字がbigintリテラルであることを表すのに用いる記号です。

```javascript
100n; // bigint型の100
```

### `typeof` typeof演算子 ![js](.gitbook/assets/js.svg)

与えられた値の型を表す文字列を返します。

```javascript
console.log(typeof 123); // "number"
```

### `typeof` typeof型演算子 ![](.gitbook/assets/ts.svg)

変数から型を抽出する演算子です。
