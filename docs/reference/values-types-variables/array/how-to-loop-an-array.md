---
image: /img/how-to-loop-an-array.png
---

# 配列をループする方法

JavaScript/TypeScriptで配列をループするには、主にfor文、for-of文、配列のメソッドの3つの方法があります。

## for文

for文は古くからある配列をループする方法です。

```ts twoslash
const arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
  // 0 a
  // 1 b
  // 2 c の順で出力される
}
```

`break`でループを中断できます。

```ts twoslash
const arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
  if (arr[i] === "b") {
    break;
  }
}
// a b が順に出力されて終了する
```

`continue`で次のループにスキップできます。

```ts twoslash
const arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === "a") {
    continue;
  }
  console.log(arr[i]);
  // b c が順に出力される
}
```

## for-of文

for-of文は、配列の要素をひとつひとつ処理する場合、for文よりもシンプルに書けるのが特徴です。

```ts twoslash
const arr = ["a", "b", "c"];
for (const value of arr) {
  console.log(value);
  // a b cの順で出力される
}
```

for-of文もfor文と同様に、`break`や`continue`が使えます。

[for-of文](../../statements/for-of.md)

## Arrayのメソッド

`Array`には要素ごとに処理を行うメソッドがいくつかあります。

`forEach`メソッドに渡したコールバック関数が、要素ごとに実行されます。`forEach`には戻り値がありません。for文などと異なり、`break`や`continue`は使えません。

```ts twoslash
const arr = ["a", "b", "c"];
arr.forEach((value, i) => {
  console.log(value, i);
  // a 0
  // b 1
  // c 2 の順で出力される
});
```

`map`メソッドも要素ごとにコールバック関数を実行します。コールバック関数の戻り値が、`map`には戻り値になります。配列要素の値を加工して、別の配列を作るときに便利です。`map`では`break`や`continue`は使えません。

```ts twoslash
const arr = ["a", "b", "c"];
const arr2 = arr.map((value) => value + value);
console.log(arr2);
// @log: [ 'aa', 'bb', 'cc' ]
```

## for-in文は使わない

for-in文で配列をループすることもできます。しかし、for-in文は配列をループするのには使わないほうがよいです。配列は順番が重要なことが多いですが、for-in文は順番どおりになる保証がないためです。

また、配列オブジェクトに追加のプロパティがある場合、for-in文はそれも反復処理に含めます。これが予期しない不具合につながる危険性もあります。

```js twoslash
const arr = ["a", "b", "c"];
arr.foo = "bar"; // 追加のプロパティ
for (const x in arr) {
  console.log(x, arr[x]);
  // 0 a
  // 1 b
  // 2 c
  // foo bar が順に出力される
}
```

<PostILearned>

・TypeScript/JavaScriptで配列をループするには主に3つの方法がある。
① for文
② for-of文
③ 配列のメソッド
・for文は古くからある構文
・for-of文はfor文よりもループをシンプルに書ける
・配列にはforEachやmapメソッドがある

</PostILearned>

## 関連情報

[オブジェクトをループする方法](../object/how-to-loop-an-object.md)
