# 配列はオブジェクト

JavaScriptの配列はオブジェクトです。そのため、比較やコピーの際の挙動に注意が必要です。

## 配列同士の比較

配列の中身が同じでも、オブジェクトのインスタンスが異なると`==`では期待する比較ができないので注意が必要です。

```ts twoslash
const list1 = [1, 2, 3];
const list2 = [1, 2, 3];
console.log(list1 == list2);
// @log: false
```

PHPでは配列(インデックス配列)は要素の内容で等価比較できますが、JavaScriptでは同じようにはできないので注意しましょう。

```php
<?php
$list1 = [1, 2, 3];
$list2 = [1, 2, 3];
var_dump($list1 === $list2); //=> bool(true)
```

このような配列の中身を比べるための演算子やメソッドはJavaScriptにはないため、中身を比較したいときにはlodashの[isEqual](https://lodash.com/docs/4.17.15#isEqual)などのパッケージを使うのがお勧めです。

## 配列のコピー

配列も他のオブジェクトと同様に、代入を用いても値のコピーにはなりません。代入元の変数と代入先の変数は同じ値を指します。そして、一方の変数だけを変更したつもりでも、他方にも変更が反映されます。

```ts twoslash
const arr = [1, 2, 3];
const backup = arr;
arr.push(4); // 変更
console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(backup); // こちらにも影響
// @log: (4) [1, 2, 3, 4]
```

上のような単純な配列のコピーには、スプレッド構文を使ってください。

```ts twoslash
const arr = [1, 2, 3];
const backup = [...arr]; // スプレッド構文
arr.push(4); // 変更
console.log(backup); // 影響なし
// @log: (4) [1, 2, 3]
```

[配列のコピー](./spread-syntax-for-array.md)
