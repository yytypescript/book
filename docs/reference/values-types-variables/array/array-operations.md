# 配列の破壊的操作

## 破壊的操作と非破壊的操作

Array.prototype.reverse() は配列を逆順にソートするメソッドで指定した配列を直接書き換えています。
このようにオブジェクトの中身を直接書き換えてしまう処理を**破壊的操作**と呼びます。

```javascript twoslash
const fruits = ["apple", "banana"];
fruits.push("orange");
console.log(fruits);
// @log: ['apple', 'banana', 'orange']
```

対照的に Array.prototype.concat() は2つ以上の配列を結合するメソッドですが、指定した配列は書き換えずに新しい配列を返しています。
このようにオブジェクトの中身を直接書き換えずに新しいオブジェクトを返す処理を**非破壊的操作**と呼びます。

```javascript twoslash
const fruits = ["apple", "banana"];
const foods = ["menma", "takoyaki"];
const all = fruits.concat(foods);
console.log(fruits);
// @log: ['apple', 'banana']
console.log(all);
// @log: ['apple', 'banana', 'menma', 'takoyaki']
```

PHPでは配列の要素を逆順にソートする場合は、オブジェクトの中身を変更せずに逆順にソートされた配列を新しく生成して返します。他の言語では非破壊的な配列操作がJavaScriptでは破壊的操作の場合があるので、意図せず配列が変更されて予期せぬバグを生まないように注意が必要です。

```php
$fruits = ["apple", "banana"];
$reversed_fruits = array_reverse($fruits);
var_dump($fruits);
var_dump($reversed_fruits);
```

## 破壊的操作の危険性

配列の破壊的操作が問題になる場面として配列が関数の引数として渡された場合があります。

例として配列の最後の要素を取得する `last` という関数の実装を考えてみます。
下のサンプルコードでは `last` 関数が破壊的操作である `Array.prototype.reverse()` を使って実装がされているため、呼び出し側で引数として渡した配列 `fruits` が意図せず順番が逆になった状態で先頭の要素を取得してしまい `apple` と表示させる箇所が誤って `orange` と表示されてしまっています。

```typescript twoslash
const last = (arr: string[]) => {
  const reversed = arr.reverse();
  return reversed[0];
};

const fruits = ["apple", "banana", "orange"];
const lastItem = last(fruits);
const firstItem = last(fruits);

console.log(lastItem);
// @log: orange
console.log(firstItem);
// @log: orange
```

このサンプルコードは極端な例ですが、このように破壊的操作を使った場合に気づかずに配列を変更してしまいバグを生む可能性があるので注意して利用しましょう。
