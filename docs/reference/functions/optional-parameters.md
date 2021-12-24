---
sidebar_label: オプション引数
---

# オプション引数 (optional parameter)

引数を省略したいことがあります。そのときはオプション引数とデフォルト引数を使用することができます。

上記の関数`distance()`は、現在は与えられた座標を元に原点からの距離を計算していますが、これを2点の距離を計算できるようにしたいとします。すると上記の関数`distance()`は次のようになります。

```ts
function distance(p1: Point, p2: Point): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

ここで第2引数は省略可能にし、省略した場合は第1引数と原点の距離を返したいとします。これはオプション引数を使用すると次のように書けます。

```ts
function distance(p1: Point, p2?: Point): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}

distance(q1, q2);
distance(q1);
```

引数の`p2`の右隣に`?`がつきました。これで`p2`は省略可能な引数となり5, 6行目のどちらの書き方も受けつけるようになります。

しかし、このオプション引数は意味する型が少々変わります。内部的には`p2`は`Point`ではなく`Point | undefined`のユニオン型として解釈されます。ユニオン型の説明は先の章にあるため詳しい説明は譲りますが、ユニオン型は日本語で言うと**どれか**の意味です。

[ユニオン型 (union type)](../values-types-variables/union.md)

ユニオン型が与えられた時は、どちらの型にもあるプロパティ、メソッドでなければ使うことができません。上記のコードでは`p2`は`undefined`にもなる可能性があり、`undefined`には`x, y`というプロパティは存在しないため、TypeScriptに指摘されます。

この問題を解消したのが次のふたつです。

## 省略時の初期化処理を書く

```ts
function distance(p1: Point, p2?: Point): number {
  let p0: Point | undefined = p2;

  if (typeof p0 === "undefined") {
    p0 = {
      x: 0,
      y: 0,
    };
  }

  return ((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2) ** (1 / 2);
}
```

省略時はどの値を使うか初期化処理にて明文化する必要がありますが、後述のデフォルト引数がほぼ同じことをできます。可能であればデフォルト引数の使用を検討してください。

### 処理を分ける

```ts
function distance(p1: Point, p2?: Point): number {
  if (typeof p2 === "undefined") {
    return (p1.x ** 2 + p1.y ** 2) ** (1 / 2);
  }

  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

型ガードにより`if`ブロックより下は`p2`がPointであることが確定します。そのためTypeScriptはユニオン型から普通の`Point`として解釈できるようになります。

## `Point | undefined`との違い

`p2`の型が`Point | undefined`として解釈されるのなら、あえて`?`などという記号を新しく定義する必要などないのではと思われるかもしれませんが、明確な違いがあります。それは**呼び出し側で省略できるかどうかということ**です。上記のとおりオプション引数は省略が可能なのですが、`undefined`とのユニオン型であることを明記すると省略ができません。

```ts
function distance(p1: Point, p2: Point | undefined): number {
  // ...
}

distance(q1, q2);
distance(q1);
// Expected 2 arguments, but got 1.

distance(q1, undefined);
```

6行目のような書き方はTypeScriptから指摘を受けます、どうしても動作させたいのであれば9行目のように書かなければいけません。

## オプション引数でできないこと

オプション引数は必ず最後に書かなければいけません。つまり、次のようにオプション引数より後ろに普通の引数を書くことはできません。

```ts
function distance(p1?: Point, p2: Point): number {
  // ...
}
// A required parameter cannot follow an optional parameter.
```
