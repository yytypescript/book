# 索引:記号とキーワード

ここではJavaScriptとTypeScriptの記号やキーワードから、その意味を調べられます。TypeScriptのコードを読んでいて知らない記号やキーワードに出くわしたら、ここからその意味や使い方を調べる手がかりにしてください。

ここで扱う記号とキーワードには、JavaScript由来のもの、つまり、JavaScriptとTypeScriptに共通してあるものと、TypeScriptにしかないものを併記しています。JavaScript由来のものには![js](.gitbook/assets/js.svg)のマークを、TypeScript固有のものには![TS](.gitbook/assets/ts.svg)マークを表示しています。

## `+`

### `+` 単項正値演算子 ![js](.gitbook/assets/js.svg)

Number型に変換します。

```js
+"1"; // 1
```

### `+` 加算演算子 ![js](.gitbook/assets/js.svg)

2つの値を足し算します。

### `+` 文字列結合演算子 ![js](.gitbook/assets/js.svg)

2つの文字列を結合します。

### `+` 修飾子の付加 ![ts](.gitbook/assets/ts.svg)

`readonly`や`?`などの修飾子を追加する。

何も指定しない場合は暗黙的に`+`が付与されるので `+`を実際に利用する機会はおそらくありません。

```ts
type MyPartial<T> = {
  [k in keyof T]+?: T[k];
};

type MyReadonly<T> = {
  +readonly [k in keyof T]: T[k];
};
```

## `-`

### `-` 単項負値演算子 ![js](.gitbook/assets/js.svg)

正負を反転してNumber型に変換します。

```js
-"1"; // -1
```

### `-` 減算演算子 ![js](.gitbook/assets/js.svg)

2つの値を引き算します。

### `-` 修飾子の削除 ![ts](.gitbook/assets/ts.svg)

`readonly`や`?`などの修飾子を削除する。

```ts
type MyRequired<T> = {
  [k in keyof T]-?: T[k];
};

type Writable<T> = {
  -readonly [k in keyof T]: T[k];
};
```

## `/`

### `/` 除算演算子 ![js](.gitbook/assets/js.svg)

左の値を右の値で割り算します。

## `*`

### `*` 乗算演算子 ![js](.gitbook/assets/js.svg)

左の値と右の値を掛け算します。

## `%`

### `%` 剰余演算子 ![js](.gitbook/assets/js.svg)

左の値を右の値で割った余りを計算します。

## `**`

### `**` べき乗演算子 ![js](.gitbook/assets/js.svg)

左の値を右の値でべき乗します。

```js
2 ** 3; // 8
```

## `~`

### `~` ビット否定演算子 ![js](.gitbook/assets/js.svg)

ビットを反転します。

```js
const a = 1; // 00000001
console.log(~a); // 11111110
// 出力: -2
```

## `!`

### `!` 論理否定演算子 ![js](.gitbook/assets/js.svg)

真値と偽値を反転します。

### `!` 非Nullアサーション ![ts](.gitbook/assets/ts.svg)

値がnullやundefinedでないことを宣言し、
コンパイラーに値を非Nullとして解釈させます。

```ts
function firstChar(text: string | undefined) {
  // コンパイルエラーにならない
  return text!.charAt(0);
}
```

## `<`

### `<` 小なり演算子 ![js](.gitbook/assets/js.svg)

左の値が右の値よりも小さいか判定します。

## `>`

### `>` 大なり演算子 ![js](.gitbook/assets/js.svg)

左の値が右の値よりも大きいか判定します。

## `<=`

### `<=` 小なりイコール演算子 ![js](.gitbook/assets/js.svg)

左の値が右の値以下か判定します。

## `>=`

### `>=` 大なりイコール演算子 ![js](.gitbook/assets/js.svg)

左の値が右の値以上か判定します。

## `==`

### `==` 等価演算子 ![js](.gitbook/assets/js.svg)

左の値と右の値が等しいか判定します。型が異なる場合は型変換されて比較されます。

```js
"1" == 1; // true
```

## `!=`

### `!=` 不等価演算子 ![js](.gitbook/assets/js.svg)

左の値と右の値が異なるか判定します。型が異なる場合は型変換されて比較されます。

```js
"1" != 1; // false
```

## `===`

### `===` 厳密等価演算子 ![js](.gitbook/assets/js.svg)

型を含めて左の値と右の値が等しいか判定します。

```js
"1" === 1; // false
```

## `!==`

### `!==` 厳密不等価演算子 ![js](.gitbook/assets/js.svg)

型を含めて左の値と右の値が異なるか判定します。

```js
1 === 2; // true
```

## `<<`

### `<<` ビット左シフト演算子 ![js](.gitbook/assets/js.svg)

左の値のビットを右の値の数だけ左にずらします。

```js
const a = 1; // 00000001
const b = 3;
console.log(a << b); // 00001000
// 出力: 8
```

## `>>`

### `>>` ビット右シフト演算子 ![js](.gitbook/assets/js.svg)

左の値のビットを右の値の数だけ右にずらします。

```js
const a = 8; // 00001000
const b = 3;
console.log(a >> b); // 00000001
// 出力: 1
```

## `>>>`

### `>>>` 符号なし右シフト演算子 ![js](.gitbook/assets/js.svg)

左の値のビットを右の値の数だけ右にずらします。左に入る符号ビットは常に0になります。

```js
const a = -2; // 11111111111111111111111111111110
const b = 3;
console.log(a >>> b); // 00011111111111111111111111111111
// 出力: 536870911
```

## `&`

### `&` ビット論理積 ![js](.gitbook/assets/js.svg)

左の値と右の値で共にビットが1である位置のビットを1に
します。

```js
const a = 1; // 00000001
const b = 5; // 00000101
console.log(a & b); // 00000001
// 出力: 1
```

### `&` インターセクション型 ![ts](.gitbook/assets/ts.svg)

複数の型を組み合わせたインターセクション型を定義する。

```ts
interface Swordsman {
  sword: string;
}
interface Wizard {
  magic: string;
}
type MagicalSwordsman = Swordsman & Wizard;
```

## `|`

### `|` ビット論理和 ![js](.gitbook/assets/js.svg)

左の値と右の値でどちらのビットが1である位置のビットを1に
します。

```js
const a = 1; // 00000001
const b = 5; // 00000101
console.log(a & b); // 00000101
// 出力: 5
```

### `|` ユニオン型 ![ts](.gitbook/assets/ts.svg)

複数の型を組み合わせたユニオン型を定義する。

```js
type ID = string | number;
const id1 = "e29b41"; // OK
const id2 = 100; // OK
const id3 = true; // ERROR
```

## `^`

### `^` ビット排他的論理和 ![js](.gitbook/assets/js.svg)

左の値と右の値でビットの値が異なる位置のビットを1にします。

```js
const a = 1; // 00000001
const b = 5; // 00000101
console.log(a & b); // 00000100
// 出力: 4
```

## `&&`

### `&&` 論理積 ![js](.gitbook/assets/js.svg)

全ての真偽値が `true` のときに `true` を返します。そうでない場合に `false` を返します。

## `||`

### `||` 論理和 ![js](.gitbook/assets/js.svg)

一つでも真偽値が `true` のときに `true` を返します。そうでない場合に `false` を返します。

## `??`

### `??` Null合体 ![js](.gitbook/assets/js.svg)

左の値が `null` または `undefined` の時に右の値を返します。そうでない場合は左の値を返します。

```js
console.log(undefined ?? 1); // 1
console.log(2 ?? 1); // 2
```

## `a ? b : c`

### `a ? b : c` 条件（三項）演算子 ![js](.gitbook/assets/js.svg)

`a`の真偽値が `true` の場合は `b` の値を返します。`a`の真偽値が `false` の場合は `c` の値を返します。

## `?.`

### `?.` オプショナルチェイニング ![js](.gitbook/assets/js.svg)

プロパティのアクセス元が `null` または `undefined` のときにエラーを発生させずに `undefined` を返します。

```js
const user = null;
console.log(user.name); // Cannot read property 'name' of null
console.log(user?.name); // undefined
```

## `=`

### `=` 代入演算子 ![js](.gitbook/assets/js.svg)

左の変数に右の値を割り当てます。

## `*=`

### `*=` 乗算代入 ![js](.gitbook/assets/js.svg)

左の変数の値と右の値を掛け算した結果を左の変数に割り当てます。

## `**=`

### `**=` べき乗代入 ![js](.gitbook/assets/js.svg)

左の変数の値を右の値でべき乗した結果を左の変数に割り当てます。

## `/=`

### `/=` 除算代入 ![js](.gitbook/assets/js.svg)

左の変数の値を右の値で割り算した結果を左の変数に割り当てます。

## `%=`

### `%=` 剰余代入 ![js](.gitbook/assets/js.svg)

左の変数の値に右の値で割り算した余りを左の変数に割り当てます。

## `+=`

### `+=` 加算代入 ![js](.gitbook/assets/js.svg)

左の変数の値とに右の値を足し算した結果を左の変数に割り当てます。

## `-=`

### `-=` 減算代入 ![js](.gitbook/assets/js.svg)

左の変数の値から右の値を引き算した結果を左の変数に割り当てます。

## `<<=`

### `<<=` 左シフト代入 ![js](.gitbook/assets/js.svg)

左の変数の値のビットを右の値の数だけ左にずらした結果を左の変数に割り当てます。

```js
let a = 1; // 00000001
const b = 3;
a <<= b;
console.log(a); // 00001000
// 出力: 1
```

## `>>=`

### `>>=` 右シフト代入 ![js](.gitbook/assets/js.svg)

左の変数の値のビットを右の値の数だけ右にずらした結果を左の変数に割り当てます。

## `>>>=`

### `>>>=` 符号なし右シフト代入 ![js](.gitbook/assets/js.svg)

左の変数の値のビットを右の値の数だけ右にずらした結果を左の変数に割り当てます。左に入る符号ビットは常に 0 になります。

## `&=`

### `&=` ビット論理積代入 ![js](.gitbook/assets/js.svg)

左の変数の値と右の値で共にビットが1である位置のビットを1にした結果を左の変数に割り当てます。

```js
let a = 1; // 00000001
const b = 5; // 00000101
a &= b;
console.log(a); // 00000001
// 出力: 1
```

## `|=`

### `|=` ビット論理和代入 ![js](.gitbook/assets/js.svg)

左の変数の値と右の値でどちらかがのビットが1である位置のビットを1にした結果を左の変数に割り当てます。

## `^=`

### `^=` ビット排他的論理和代入 ![js](.gitbook/assets/js.svg)

左の変数の値と右の値でビットの値が異なる位置のビットを1にした結果を左の変数に割り当てます。

## `&&=`

### `&&=` 論理積代入 ![js](.gitbook/assets/js.svg)

左の変数の真偽値と右の真偽値の論理積の結果を左の変数に割り当てます。

```js
let a = true;
let b = false;
a &&= b;
console.log(a); // false
```

## `||=`

### `||=` 論理和代入 ![js](.gitbook/assets/js.svg)

左の変数の真偽値と右の真偽値の論理和の結果を左の変数に割り当てます。

## `??=`

### `??=` Null合体代入 ![js](.gitbook/assets/js.svg)

左の変数の値が null または undefined の場合のみ右の値を左の変数に割り当てます。

```js
const user1 = { name: undefined };
user1.name ??= "taro";
console.log(user1.name); // taro

const user2 = { name: "kaori" };
user2.name ??= "taro";
console.log(user2.name); // kaori
```

## `,`

### `,` カンマ演算子 ![js](.gitbook/assets/js.svg)

左から右に式を評価をして、一番右の評価した値を返します。

```js
let x = -1
const a = x++, x++, x > 0
console.log(a)  // true
```

## `?`

### `?` オプション修飾子 ![ts](.gitbook/assets/ts.svg)

オブジェクトのプロパティを任意プロパティとして定義します。

```ts
interface User {
  name: string; // name は必須
  age?: number; // age は任意
}

const user: User = { name: "taro" };
```
