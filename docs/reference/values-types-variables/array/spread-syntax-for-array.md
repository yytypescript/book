---
sidebar_label: "配列のスプレッド構文「...」"
---

# 配列のスプレッド構文「...」(spread syntax)

JavaScript の配列ではスプレッド構文「...」を使うことで、要素を展開することができます。

## 配列の作成

ある配列に要素を追加して新しい配列を作成する場合に、スプレッド構文を使わない場合は次のようなコードを書く必要があります。

```ts
const arr = [1, 2, 3];
const arr2 = [];
for (const item of arr) {
  arr2.push(item);
}
arr2.push(4);
```

スプレッド構文を使用することで、上の実装は次のように簡単に書き直すことができます。

```ts
const arr = [1, 2, 3];
const arr2 = [...arr, 4];
```

スプレッド構文は配列リテラルの好きな位置に記述できるので、要素と要素の間に他の配列を挿入することもできます。

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [0, ...arr, 4];
```

## 配列のコピー

配列のコピーも簡単に書けます。

```ts
const arr = [1, 2, 3];
const arr2 = [...arr];
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
