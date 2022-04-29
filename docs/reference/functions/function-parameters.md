---
sidebar_label: 関数の引数
---

# 関数の引数 (function parameter)

関数の入力値である引数は特殊なことをしない限り、要求する型の変数を、要求する数だけ入力しなければいけません。
たとえば原点との距離を求める次の関数があったとします。

```ts twoslash
type Point = {
  x: number;
  y: number;
};
// ---cut---
function distance(p: Point): number {
  return (p.x ** 2 + p.y ** 2) ** (1 / 2);
}
```

なお、xy座標上の点を表すPointの定義は次のとおりです。

```ts twoslash
type Point = {
  x: number;
  y: number;
};
```

関数`distance()`は平面状にある点(x, y)の原点からの距離を返します。この関数を呼ぶ時は必ず引数の数、順番は揃えなければなりません。つまり次のような関数呼び出しはできません。

## 引数が少ない

```ts twoslash
type Point = {
  x: number;
  y: number;
};
declare function distance(p: Point): number;

// ---cut---
distance();
// @error: Expected 1 arguments, but got 0.
// @noErrors
```

## 引数が多い

```ts twoslash
type Point = {
  x: number;
  y: number;
};
declare function distance(p: Point): number;

const q1 = 1;
const q2 = 2;

// ---cut---
distance(q1, q2);
// @errors: 2554
```

JavaScriptでは引数が少ない時はその引数には`undefined`が渡され、引数が多い場合は余分な引数は無視されますがここはTypeScriptとJavaScriptとの大きな違いです。
