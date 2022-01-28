---
sidebar_label: "デフォルト引数"
---

# デフォルト引数 (default parameter)

デフォルト引数とは、関数に値が渡されないときや`undefined`が渡されたときに代わりに初期化され使用される値のことです。なお`null`が渡されたときはデフォルト引数は適用されませんので注意してください。

ここでは例として、二次元上の点を定義します。

```ts
type Point = {
  x: number;
  y: number;
};
```

そして二次元上の点p1とp2の距離を求めたい場合、次の式が成立します。関数名を`distance()`とします。

```ts
function distance(p1: Point, p2: Point): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

これを、たとえば`p2`を省略したときは原点(0, 0)との距離を求めるようにしてほしいといったときにデフォルト引数が使えます。デフォルト引数を使いこの条件を再現すると次のようになります。

```ts
const p0: Point = {
  x: 0,
  y: 0,
};

function distance(p1: Point, p2: Point = p0): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

引数に指定されなかったときに初期値として使いたい値を、その引数の右に書きます。ここでは`p2`の右側の`= p0`がそれにあたります。
オプション引数と比べてもより簡素に書けるようになります。

```ts
function distance(p1: Point, p2?: Point): number {
  if (typeof p2 === "undefined") {
    return (p1.x ** 2 + p1.y ** 2) ** (1 / 2);
  }

  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

また、オプション引数と異なりデフォルト引数は値が渡されたときも渡されなかったときも意図する型(この場合`Point`型)が入っているのでオプション引数と異なり処理の分岐が不要になります。

さらに、デフォルト引数があることでデフォルト引数を受け付けている引数は型推論が効き型を書く必要がなくなります。

```ts twoslash
type Point = {
  x: number;
  y: number;
};

const p0: Point = {
  x: 0,
  y: 0,
};

// ---cut---
function distance(p1: Point, p2 = p0): number {
  //                         ^?
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

`q1, q2`が`Point`型であれば次の関数呼び出しはすべて動作します。

```ts
distance(q1, q2);
distance(q1);
distance(q1, undefined);
```

## 初期値に関数の戻り値を使う

デフォルト引数には関数の戻り値を指定することができます。たとえば、ある点(x, y)が与えられると転置した点(y, x)を返す`inverse()`という関数の戻り値を初期値として使用します。ちなみに`inverse()`は次のようになります。

```ts
function inverse(p: Point): Point {
  return {
    x: p.y,
    y: p.x,
  };
}
```

これを使うと`distance()`は次のようになります。

```ts
function distance(p1: Point, p2: Point = inverse(p1)): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

また、デフォルト引数はオプション引数と異なりその引数を最後に書く必要はありません。呼び出し側でデフォルト引数を使用させたい時は`undefined`を指定します。このときこのページの先頭に書いたように`null`ではこの役目を果たせないので注意してください。もちろん末尾のデフォルト引数であれば省略が可能です。

```ts twoslash
type Point = {
  x: number;
  y: number;
};

const q1: Point = {
  x: 0,
  y: 0,
};

const q2: Point = {
  x: 0,
  y: 0,
};

// ---cut---
const p0: Point = {
  x: 1,
  y: 2,
};

function distance(p1: Point = p0, p2: Point): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}

distance(q1, q2);
distance(undefined, q2);
distance(null, q2);
// @errors: 2345
```

## デフォルト引数でできないこと

関数をデフォルト引数として使うときは非同期の関数を使うことができません。詳細は先のページにあるため詳しい説明は譲りますが次のようなデフォルト引数はできません。なお`inverseAsync()`は非同期関数とします。

```ts twoslash
type Point = {
  x: number;
  y: number;
};
declare function inverseAsync(point: Point): Promise<Point>;
// ---cut---
// @errors: 2524
async function distanceAsync(
  p1: Point,
  p2: Point = await inverseAsync(p1)
): Promise<number> {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```
