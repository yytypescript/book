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

配列のコピーを作る際に、スプレッド構文が便利な場合があります。スプレッド構文で作成されたコピーは、元の配列とは異なる実体を持ちます。

```ts twoslash
const arr = [1, 2, 3];
const backup = [...arr];
arr.push(4); // 変更を加える
console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(backup); // コピーには影響なし
// @log: (3) [1, 2, 3]
```

注意点として、この方法は浅いコピー(shallow copy)です。深いコピー(deep copy)ではない点に注意してください。浅いコピーで複製できるのは、1層目の要素だけです。配列の中に配列が入っている場合は、2層目より深くにある配列は、元の配列のものと値を共有します。

```js twoslash
const arr = [1, [2, 3]];
const backup = [...arr];
arr[1].push(4);
console.log(arr[1]);
// @log: (3) [2, 3, 4]
console.log(backup[1]); // 変更の影響あり
// @log: (3) [2, 3, 4]
```

上記のような浅いコピーの挙動についての詳しい解説はこちらにあります。

[オブジェクトを浅くコピーする](../../../tips/shallow-copy-object.md)

スプレッド演算子と同等の手段として、[配列の`concat()メソッド`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)を用いる方法もあります。

```ts twoslash
const arr = [1, 2, 3];
const backup = arr.concat();
arr.push(4); // 変更を加える
console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(backup); // コピーには影響なし
// @log: (3) [1, 2, 3]
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

## 関連情報

[オブジェクトのスプレッド構文「...」](../object/spread-syntax-for-object.md)
