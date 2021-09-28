# Record&lt;Keys, Type&gt;

`Record<Keys, Type>`はプロパティのキーが`Keys`であり、プロパティの値が`Type`であるオブジェクト型を作るユーティリティ型です。

## 型引数

### 1. Keys

オブジェクトのプロパティーキーを指定します。`Keys`に代入できる型は、`string`、`number`、`symbol`とそれぞれのリテラル型です。

### 2. Type

オブジェクトのプロパティの値の型を指定します。任意の型が代入できます。

## 使用例

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

{% page-ref page="../../values-types-variables/object/index-signature.md" %}

{% page-ref page="../indexed-access-types.md" %}

