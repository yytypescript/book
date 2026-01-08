---
sidebar_label: satisfies演算子 「satisfies operator」
---

# satisfies演算子「satisfies operator」

`satisfies T`(`T`は型)は、変数宣言時に使用する演算子で、その値が型`T`を満たすことを検証します。この演算子は型の絞り込みを保持したまま型チェックを行える特徴があります。

`as const`と異なり、`satisfies`はその後に型を要求します。単独で使用することはできません。

## 型アノテーションと同じようにできること

変数宣言のときに変数名の後ろに`: T`と書くことを型アノテーションといいます。こちらは変数宣言時にその変数が型`T`を満たすことを検証します。

というと`satisfies T`の機能が型アノテーションとまったく同じように見えます。実際次の例はまったく同じ働きをします。

```ts twoslash
type Pokemon = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};
const pikachu: Pokemon = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
};
const raichu = {
  name: "raichu",
  no: 26,
  genre: "mouse pokémon",
  height: 0.8,
  weight: 30.0,
} satisfies Pokemon;
```

どちらも宣言した型に沿わない型を与えるとエラーが発生します。
また、存在しないプロパティを追加することもできません。

```ts twoslash
type Pokemon = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

// ---cut---
// @errors: 2322 2353
const pikachu: Pokemon = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: "0.4m",
  weight: "6.0kg",
};
const raichu = {
  name: "raichu",
  no: 26,
  genre: "mouse pokémon",
  height: "0.8m",
  weight: "30.0kg",
} satisfies Pokemon;
```

```ts twoslash
type Pokemon = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

// ---cut---
// @errors: 2353
const pikachu: Pokemon = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
  type: "electric",
};
const raichu = {
  name: "raichu",
  no: 26,
  genre: "mouse pokémon",
  height: 0.8,
  weight: 30.0,
  type: "electric",
} satisfies Pokemon;
```

## 型アノテーションとちがうこと

`satisfies`の最大の特徴は、型`T`にユニオン型が含まれる場合でも、実際の値に基づいて型を絞り込むことができる点です。型アノテーションでは失われてしまう型の情報を保持できます。
主にオブジェクトリテラルや配列で使用しますが、プリミティブ型でも使用できます。

```ts twoslash
const array1: (string | number)[] = [1, 2, 3];
//    ^?
const array2 = [1, 2, 3] satisfies (string | number)[];
//    ^?
```

ユニオン型の配列の場合は期待する結果にならないときもあります。

```ts twoslash
const array1: (string | number)[] = [1, "2", 3];
//    ^?
const array2 = [1, "2", 3] satisfies (string | number)[];
//    ^?
```

タプル型の場合は個々に型の絞り込みを行います。

```ts twoslash
const tuple1: [string | number, string | number, string | number] = [1, "2", 3];
//    ^?
const tuple2 = [1, "2", 3] satisfies [
  string | number,
  string | number,
  string | number,
];
```

オブジェクトのプロパティにあるユニオン型にも効果があります。

```ts twoslash
type SuccessResponse = {
  success: true;
  data: object;
};
type ErrorResponse = {
  success: false;
  error: string;
};
type ApiResponse = SuccessResponse | ErrorResponse;

const res1: ApiResponse = {
  //    ^?
  success: false,
  error: "too many requests",
};
const res2 = {
  //    ^?
  success: false,
  error: "too many requests",
} satisfies ApiResponse;
```

## as constと組み合わせる

`as const`と組み合わせて`as const satisfies T`と書くことができます。

これは型`T`を満たしていることを検証した上で絞り込みを行い、さらにリテラル型にしてreadonlyにするという`as const`と`satisfies`の機能をあわせ持っています。

```ts twoslash
type SuccessResponse = {
  success: true;
  data: object;
};
type ErrorResponse = {
  success: false;
  error: string;
};
type ApiResponse = SuccessResponse | ErrorResponse;
// ---cut---
const array = [1, "2", 3] as const satisfies (string | number)[];
//    ^?
const tuple = [1, "2", 3] as const satisfies [
  string | number,
  string | number,
  string | number,
];

const res = {
  //    ^?
  success: false,
  error: "too many requests",
} as const satisfies ApiResponse;
```
