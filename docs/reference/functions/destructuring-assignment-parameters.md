---
sidebar_label: "分割代入引数"
---

# 分割代入引数 (destructuring assignment parameter)

JavaScriptでは分割代入構文は関数の引数でも使えます。引数がオブジェクトや配列の場合、そのオブジェクトや配列の一部だけを関数で利用したい場合に、分割代入引数が便利です。

## 分割代入引数の構文

JavaScriptでは、オブジェクトの分割代入引数の構文は中カッコ中に、オブジェクトのプロパティ名を書きます。引数名はプロパティ名と一致する必要があります。

```js twoslash
function foo({ a, b }) {
  console.log(a, b);
}
foo({ a: 1, b: 2, c: 3 });
// @log: 1 2
```

プロパティ名を別の引数名で受け取るには、`:`の後に引数名を指定します。

```js twoslash
function foo({ a: x, b: y }) {
  console.log(x, y);
}
foo({ a: 1, b: 2 });
// @log: 1 2
```

配列の分割代入引数は、カギカッコの中に配列要素を代入する変数名を書きます。配列要素に対応する引数名は自由に決められます。

```js twoslash
function bar([a, b]) {
  console.log(a, b);
}
bar([1, 2, 3]);
// @log: 1 2
```

分割代入引数はアロー関数でも使えます。

```js twoslash
const foo = ({ a, b }) => {};
const bar = ([a, b]) => {};
```

## 分割代入引数の型注釈

TypeScriptでオブジェクトを分割代入する場合、分割代入引数の右にオブジェクト型の型注釈を書きます。

```ts twoslash
function foo({ a, b }: { a: number; b: number }) {}
//                   ^^^^^^^^^^^^^^^^^^^^^^^^^^型注釈
```

配列を分割代入する場合も、分割代入引数の右に配列型の型注釈を書きます。

```ts twoslash
// @noUncheckedIndexedAccess: false
function bar([num1]: number[]) {}
//            ^?
```

型注釈が配列型の場合、コンパイラオプション`noUncheckedIndexedAccess`を有効にした場合、分割代入引数は`undefined`とのユニオン型になります。

```ts twoslash
// @noUncheckedIndexedAccess: true
function bar([num1]: number[]) {}
//            ^?
```

[noUncheckedIndexedAccess](../tsconfig/nouncheckedindexedaccess.md)

配列の分割代入引数の型注釈をタプル型にすると、`noUncheckedIndexedAccess`が有効な場合でも、`undefined`とのユニオン型にはなりません。

```ts twoslash
// @noUncheckedIndexedAccess: true
function bar([num1, num2]: [number, number]) {}
//            ^?
```

## 既定値とコンパイルエラー

JavaScriptでは、分割代入引数に対応するオブジェクトプロパティや配列要素が無い場合、`undefined`が代入されます。

```js twoslash
function foo({ a }) {
  console.log(a);
}
function bar([a]) {
  console.log(a);
}
foo({});
// @log: undefined
bar([]);
// @log: undefined
```

一方、TypeScriptでは分割代入引数に対応するオブジェクトプロパティや配列要素が無いと、コンパイルエラーになります。

```ts twoslash
// @errors: 2345
function foo({ a }: { a: number }) {}
function bar([a]: [number]) {}
foo({});
bar([]);
```

## 分割代入引数のデフォルト引数

JavaScriptで分割代入引数のデフォルト引数を指定する場合、引数名の後に`=`と既定値を書きます。

```js twoslash
function foo({ a = 0 }) {
  //             ^^^既定値の指定
  console.log(a);
}
function bar([a = 0]) {
  //            ^^^既定値の指定
  console.log(a);
}
foo({});
// @log: 0
bar([]);
// @log: 0
```

TypeScriptでデフォルト引数を型注釈する場合、オブジェクトではプロパティを`?`でオプションにします。

```ts twoslash
function foo({ a = 0 }: { a?: number | string }) {}
//             ^?
```

プロパティの既定値からプロパティの型が予想できる場合、型注釈を省略できる場合もあります。

```ts twoslash
function foo({ a = 0 }) {}
//             ^?
```

## 分割代入引数の全体の既定値

分割代入引数の全体の既定値を指定する場合、分割代入構文の後に`=`と既定値を書きます。この既定値は、引数全体が無い、または、`undefined`の場合に採用されます。

```js twoslash
function foo({ a, b } = { a: 0, b: 0 }) {
  console.log(a, b);
}
foo();
// @log: 1 2
foo({ a: 1 });
// @log: 1 undefined

function bar([a, b] = [0, 0]) {
  console.log(a, b);
}
bar();
// @log: 1 2
bar([1]);
// @log: 1 undefined
```

TypeScriptでは、引数全体の既定値は型注釈の後に書きます。

```ts twoslash
//                ................型注釈の位置
function foo({ a }: { a?: number } = { a: 0 }) {}
//                                 ^^^^^^^^^^既定値の位置
```

各プロパティの既定値と引数全体の既定値の両方を指定することもできます。この場合、引数全体を省略すると、各プロパティの既定値が使われます。

```ts twoslash
type Obj = { a?: number; b?: number };
function foo({ a = 0, b = 0 }: Obj = {}) {
  console.log(a + b);
}
foo();
// @log: 0
foo({});
// @log: 0
foo({ a: 1 });
// @log: 1
foo({ a: 1, b: 2 });
// @log: 3
```

## 呼び出し時のプロパティ名の省略

JavaScriptでは、分割代入引数の引数名と同じ変数が定義済みであれば、オブジェクトリテラルのプロパティ名を省略し、変数だけ渡すことができます。

```ts twoslash
function bmi({ height, weight }: { height: number; weight: number }) {}

// プロパティ名と同じ変数
const height = 170;
const weight = 65;

// プロパティ名を省略しない呼び出し
bmi({ height: height, weight: weight });

// プロパティ名を省略した呼び出し
bmi({ weight, height });
```

[Shorthand property names](../values-types-variables/object/shorthand-property-names.md)

<TweetILearned>

・分割代入引数は関数でobjectや配列を部分的に使うときに便利
・objectは中カッコで引数を書く
→ function foo({ a, b })
・配列はカギカッコで引数を書く
→ function foo([a, b])
・型注釈は分割代入の後に書く
・既定値も指定可
→ function foo({ a = 0})

</TweetILearned>

## 関連情報

[オブジェクトの分割代入](../values-types-variables/object/destructuring-assignment-from-objects.md)

[配列の分割代入](../values-types-variables/array/destructuring-assignment-from-array.md)
