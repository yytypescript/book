# typeof型演算子

TypeScriptの`typeof`は変数から型を抽出する型演算子です。次は、変数`point`に`typeof`演算子を用いて、`Point`型を定義する例です。

```ts
const point = { x: 135, y: 35 };
type Point = typeof point;
```

このPoint型は次のような型になります。

```ts
type Point = {
  x: number;
  y: number;
};
```

ここで説明したのはTypeScriptのtypeof**型**演算子です。JavaScriptのtypeof演算子と同じ名前ですが、まったく別のものなので注意してください。

[typeof演算子 (typeof operator)](../values-types-variables/typeof-operator.md)
