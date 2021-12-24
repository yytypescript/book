# 配列はオブジェクト

JavaScriptの配列はオブジェクトであるため、配列の中身が同じでも、オブジェクトのインスタンスが異なると`==`では期待する比較ができないので注意が必要です。この点はPythonのリストと同じです。

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
