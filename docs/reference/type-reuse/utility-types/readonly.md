---
description: 全プロパティを読み取り専用にする
title: Readonly<T>
---

`Readonly<T>`は、オブジェクト型`T`のプロパティをすべて読み取り専用にするユーティリティ型です。

## Readonly&lt;T>の型引数

### T

型引数`T`にはオブジェクト型を代入します。

## Readonlyの使用例

```ts
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type ReadonlyPerson = Readonly<Person>;
```

上の`ReadonlyPerson`は次の型と同じになります。

```ts
type ReadonlyPerson = {
  readonly surname: string;
  readonly middleName?: string;
  readonly givenName: string;
};
```

## Readonlyの効果は再帰的ではない

`Readonly<T>`が読み取り専用にするのは、オブジェクト型`T`直下のプロパティのみです。プロパティがオブジェクトだった場合、それが持つプロパティまでは読み取り専用に注意してください。

## 関連情報

[オブジェクト型のreadonlyプロパティ (readonly property)](../../values-types-variables/object/readonly-property.md)

[クラスのreadonly修飾子](../../object-oriented/class/readonly-modifier-in-classes.md)

[インターフェースのreadonly修飾子](../../object-oriented/interface/readonly-modifier-in-interfaces.md)

[readonlyとconstの違い](../../values-types-variables/object/readonly-vs-const.md)
