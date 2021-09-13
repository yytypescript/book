# null型

値がないことを示す値です。他言語の`null`のような役割は`undefined`が担っていることが多く、こちらは意図的に値を指定しないことを強調できます。

## nullリテラル

TODO

## nullの型注釈

TODO

## nullとundefinedの違い

TODO

## typeof演算子の注意点

JavaScriptには値の型を調べるtypeof演算子があります。`null`に対して`typeof`を用いると`"object"`が返るので注意が必要です。

```javascript
typeof null; //=> "object"
```

typeof演算子の詳細は「typeof演算子」のセクションをご覧ください。

{% page-ref page="typeof-operator.md" %}

