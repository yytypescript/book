---
sidebar_label: "\U0001F6A7デフォルト引数"
---

# 🚧デフォルト引数 (default parameter)

引数を省略した時、原点との距離を求める代わりに点(1, 2)との距離を求めるといった変化球がきたとします。何も考えないとこのようになります。

```typescript
function distance(p1: Point, p2?: Point): number {
  if (p2 === undefined) {
    return ((p1.x - 1) ** 2 + (p1.y - 2) ** 2) ** (1 / 2);
  }

  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

もちろん動くのですが、意図がわかりにくくなってしまいます。このようなときに便利なのがデフォルト引数です。デフォルト引数を使用すると次のように書けます。

```typescript
const p0: Point = {
  x: 1,
  y: 2,
};

function distance(p1: Point, p2: Point = p0): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}

distance(q1, q2);
distance(q1);
distance(q1, undefined);
```

入力がなかった時に初期値として使いたい値を、その引数の右に書きます。ここでは`p2`の右側の`= p0`がそれにあたります。

オプション引数と違いユニオン型ではないため、処理の分岐が不要になります。拡張性や見通しを考えればデフォルト引数の方に軍配が上がるでしょう。

## 初期値に関数の戻り値を使う

デフォルト引数には関数の戻り値を指定することができます。たとえば、ある(x, y)が与えられると転置した(y, x)を返す`inverse()`という関数の戻り値を初期値として使用します。ちなみに`inverse()`は以下です。

```typescript
function inverse(p: Point): Point {
  return {
    x: p.y,
    y: p.x,
  };
}
```

これを使うと`distance()`は次のようになります。

```typescript
function distance(p1: Point, p2: Point = inverse(p1)): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

また、デフォルト引数はオプション引数と異なりその引数を最後に書く必要はありません。呼び出し側でデフォルト引数を使用させたい時は`undefined`を指定します。このとき`null`ではこの役目を果たせないので注意してください。もちろん末尾のデフォルト引数であれば省略が可能です。

```typescript
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
// Argument of type 'null' is not assignable to parameter of type 'Point | undefined'.
```

## デフォルト引数でできないこと

関数をデフォルト引数として使うときは非同期の関数を使うことができません。詳細は先のページにあるため詳しい説明は譲りますが次のようなデフォルト引数はできません。なお`inverseAsync()`は非同期関数とします。

```typescript
async function distanceAync(
  p1: Point,
  p2: Point = await inverseAync(p1)
): Promise<number> {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

TODO: 🚧デフォルト引数を指定すると型推論が効くことについて書く。
