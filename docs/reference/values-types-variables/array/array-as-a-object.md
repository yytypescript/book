# 配列はオブジェクト

JavaScriptの配列はオブジェクトです。そのため、比較やコピーの際の挙動に注意が必要です。

## 配列同士の比較

JavaScriptの配列はオブジェクトであるため、配列の中身が同じでも、オブジェクトのインスタンスが異なると`==`では期待する比較ができないので注意が必要です。

```js twoslash
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

JavaScriptの配列はオブジェクトであるため、他のオブジェクトと同様、代入を用いてコピーされた場合、コピー元の配列とコピー先の配列は同じ実体を持ちます。つまり、一方への変更が他方にも反映されます。

```js twoslash
const arr = [1, 2, 3];
const arr2 = arr;

arr.push(4);

console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(arr2);
// @log: (4) [1, 2, 3, 4]
```

元の配列とは異なる実体を持つコピーを作成する手段はさまざまですが、スプレッド構文を使用する方法をこちらのページで紹介しています。

[配列のコピー](./spread-syntax-for-array.md)
