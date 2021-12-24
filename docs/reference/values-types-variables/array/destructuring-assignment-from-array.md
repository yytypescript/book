---
sidebar_label: 配列の分割代入
---

# 配列の分割代入 (destructuring assignment)

## 配列の分割代入

JavaScriptでは、配列から要素を取り出す方法のひとつに、`array[1]`のようにインデックスでアクセスする方法があります。この方法とは別に、分割代入(destructuring assignment)という方法を使っても、配列要素にアクセスできます。

たとえば、`[1, 2, 3, 4, 5]`のような配列から、最初の3要素を取り出して変数に代入するには次のように書きます。

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [one, two, three] = oneToFive;
console.log(one);
// @log: 1
console.log(two);
// @log: 2
console.log(three);
// @log: 3
```

存在しない要素に対して分割代入した場合は、変数に`undefined`が代入されます。JavaScriptではこれはエラーになりません。

```js twoslash
const oneToFive = [1, 2];
const [one, two, three] = oneToFive;
console.log(three);
// @log: undefined
```

TypeScriptでは、分割代入された値の型は`T[]`の配列なら`T`型になります。たとえば、`number[]`型の`[1, 2, 3, 4, 5]`から分割代入したのなら、型は`number`になります。

```ts
const oneToFive = [1, 2, 3, 4, 5];
const [one, two, three] = oneToFive;
const num: number = one; // oneはnumber型になるので代入できる
```

ただしTypeScriptのコンパイラーオプション`noUncheckedIndexedAccess`を有効にした場合は異なります。

[noUncheckedIndexedAccess](../../tsconfig/nouncheckedindexedaccess.md)

このオプション有効状態で、配列`T[]`から分割代入すると`T`型もしくはundefined型を示す`T | undefined`型になります。たとえば、`number[]`型の`[1, 2, 3, 4, 5]`から分割代入したのなら、型は`number | undefined`になります。

```ts
const oneToFive = [1, 2, 3, 4, 5];
const [one, two, three] = oneToFive;
const num: number = one;
// 上はコンパイルエラーになる。
// oneはnumber | undefinedになり、numberには代入できないため。
```

## ネストした配列の分割代入

JavaScriptの分割代入はフラットな配列だけでなく、ネストした入れ子構造の配列からも要素を抽出できます。ネストした要素の分割代入の書き方は、ネスト構造と一致するようにブラケット(`[ ]`)を重ねます。

```ts twoslash
const twoByTwo = [
  [1, 2],
  [3, 4],
];
const [[one, two], [three]] = twoByTwo;
console.log(one);
// @log: 1
console.log(two);
// @log: 2
console.log(three);
// @log: 3
```

## 途中要素の分割代入

配列の分割代入は先頭からでなく、途中の要素を取り出すこともできます。その場合、取り出さない要素の数だけカンマを書きます。

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [, , , four, five] = oneToFive;
console.log(four);
// @log: 4
console.log(five);
// @log: 5
```

## 残余部分の代入

JavaScriptの配列を分割代入するときに、残余パターン(`...`)を用いて、配列の残りの部分を取り出して変数に代入できます。

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [one, ...rest] = oneToFive;
console.log(one);
// @log: 1
console.log(rest);
// @log: [ 2, 3, 4, 5 ]
```

このときTypeScriptでは、残余部分の型は配列の`number[]`になります。

## 関連情報

[配列要素へのアクセス](how-to-access-elements-in-an-array.md)

[オブジェクトの分割代入 (destructuring assignment)](../object/destructuring-assignment-from-objects.md)
