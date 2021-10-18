---
description: キー・バリューからオブジェクト型を作る
---

# Record\<Keys, Type>

`Record<Keys, Type>`はプロパティのキーが`Keys`であり、プロパティの値が`Type`であるオブジェクト型を作るユーティリティ型です。

## Record\<Keys, Type>の型引数

### Keys

オブジェクトのプロパティーキーを指定します。`Keys`に代入できる型は、`string`、`number`、`symbol`とそれぞれのリテラル型です。

### Type

オブジェクトのプロパティの値の型を指定します。任意の型が代入できます。

## Recordの使用例

キーが`string`で値が`number`のインデックス型を定義する。

```typescript
type StringNumber = Record<string, number>;
const value: StringNumber = { a: 1, b: 2, c: 3 };
```

キーが`firstName`、`middleName`、`familyName`で、値が文字列になるオブジェクト型を定義する。

```typescript
type Person = Record<"firstName" | "middleName" | "lastName", string>;
const person: Person = {
  firstName: "Robert",
  middleName: "Cecil",
  lastName: "Martin",
};
```

## 関連情報

{% content-ref url="../../values-types-variables/object/index-signature.md" %}
[index-signature.md](../../values-types-variables/object/index-signature.md)
{% endcontent-ref %}

{% content-ref url="../mapped-types.md" %}
[mapped-types.md](../mapped-types.md)
{% endcontent-ref %}
