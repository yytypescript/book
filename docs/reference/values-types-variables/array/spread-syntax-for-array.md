---
sidebar_label: "配列のスプレッド構文「...」"
---

# 配列のスプレッド構文「...」(spread syntax)

JavaScript の配列ではスプレッド構文「...」を使うことで、要素を展開することができます。

## 配列の作成

ある配列に要素を追加して新しい配列を作成する場合に、スプレッド構文を使わない場合は次のようなコードを書く必要があります。

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [];
for (const item of arr) {
  arr2.push(item);
}
arr2.push(4);
```

スプレッド構文を使用することで、上の実装は次のように簡単に書き直すことができます。

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [...arr, 4];
```

スプレッド構文は配列リテラルの好きな位置に記述できるので、要素と要素の間に他の配列を挿入することもできます。

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [0, ...arr, 4];
```

## 配列のコピー

スプレッド構文を用いて、配列のコピーを簡単に書けます。
この方法により作成されたコピーは、元の配列とは異なる実体を持ちます。

```js twoslash
const arr = [1, 2, 3];
const arr2 = [...arr];

arr.push(4);

console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(arr2);
// @log: (3) [1, 2, 3]
```

ただし、この方法で行われるのはあくまでも浅いコピーです。
そのため、自身の要素として配列を持つ配列をスプレッド構文でコピーした場合には、要素として含まれている配列の実体はコピー元と同じものになります。
つまり、もっとも外側の配列については片方への変更が他方に影響することはありません。

```js twoslash
const arr = [[1, 2], 3];
const arr2 = [...arr];

arr.push(4);

console.log(arr);
// @log: (3) [Array(2), 3, 4]
console.log(arr[0]);
// @log: (2) [1, 2]

console.log(arr2);
// @log: (2) [Array(2), 3]
console.log(arr2[0]);
// @log: (2) [1, 2]
```

しかし、配列内の配列については片方への変更が他方にも反映されます。

```js twoslash
const arr = [[1, 2], 3];
const arr2 = [...arr];

arr[0].push(3);

console.log(arr);
// @log: (2) [Array(3), 3]
console.log(arr[0]);
// @log: (3) [1, 2, 3]

console.log(arr2);
// @log: (2) [Array(3), 3]
console.log(arr2[0]);
// @log: (3) [1, 2, 3]
```

上記のような浅いコピーの挙動についての詳しい解説はこちらにあります。

[オブジェクトを浅くコピーする](../../../tips/shallow-copy-object.md)

なお、任意の配列について異なる実体を持つコピーを作る方法はさまざまですが、[配列の`concat()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)を用いる方法があります。

```js twoslash
const arr = [[1, 2], 3];
const arr2 = arr.concat();

arr[0].push(3);

console.log(arr);
// @log: (2) [Array(3), 3]
console.log(arr[0]);
// @log: (3) [1, 2, 3]

console.log(arr2);
// @log: (2) [Array(2), 3]
console.log(arr2[0]);
// @log: (2) [1, 2]
```

## 配列の連結

配列の連結もスプレッド構文を使用して簡単に書けます。

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [4, 5, 6];

const concated = [...arr, ...arr2];
```

## 分割代入と残余パターン

似たシンタックスとして分割代入で使われる残余パターンの構文がありますが、異なる構文なので注意が必要です。

[配列の分割代入](./destructuring-assignment-from-array.md)
