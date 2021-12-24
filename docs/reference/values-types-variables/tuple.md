---
sidebar_label: タプル
---

# タプル (tuple)

TypeScriptの関数は1値のみ返却可能です。戻り値に複数の値を返したい時に、配列に返したいすべての値を入れて返すことがあります。なお次の関数の戻り値は定数になっていますが、実際は演算した結果だと解釈してください。

```ts
function tuple() {
  //...
  return [1, "ok", true];
}
```

## 配列が抱える問題

上記例では戻り値の型として何が妥当でしょうか。配列のページから読み進めていただいた方はなんでも入れられる型、ということで`any[]`または`unknown[]`が型の候補として思い浮かぶ人もいるかと思います。

```ts
const list: unknown[] = tuple();

list[0].toString();
```

ですが、この`list[n]`からメソッドを呼ぶことができません。それは`list`の各要素は`unknown`であるからです。

では`any[]`を戻り値の型として使うべきかというと、それも問題です。せっかくTypeScriptを使って型による恩恵を享受しているのに、ここだけ型がないものとしてコーディングをするのも味気がありません。そこで使えるのがタプルです。

## タプルの型

タプルの型は簡単で`[]`を書いて中に型を書くだけです。つまり、上記関数`tuple()`は次のような戻り値を持っていると言えます。

```ts
const list: [number, string, boolean] = tuple();
```

同様に関数の戻り値にも書くことができます。

```ts
function tuple(): [number, string, boolean] {
  //...
  return [1, "ok", true];
}
```

配列の型はarray(`T[]`), generic(`Array<T>`)というふたつの書き方がありましたがタプルはこの書き方しか存在しません。

## タプルへのアクセス

タプルを受けた変数はそのまま中の型が持っているプロパティ、メソッドを使用できます。

```ts
const list: [number, string, boolean] = tuple();

list[0].toExponential();
list[1].length;
list[2].valueOf();
```

タプルを受けた変数は、タプルで定義した範囲外の要素に対してアクセスができません。

```ts
const list: [number, string, boolean] = tuple();

list[5];
// Tuple type '[number, string, boolean]' of length '3' has no element at index '5'.
```

そのため`list.push()`のような配列の要素を増やす操作をしてもその要素を使うことはできません。

### 分割代入を使ってタプルにアクセスする

上記関数`tuple()`の戻り値は分割代入を使うと次のように受けることができます。

```ts
const [num, str, bool]: [number, string, boolean] = tuple();
```

また、特定の戻り値だけが必要である場合は変数名を書かず`,`だけを書きます。

```ts
const [, , bool]: [number, string, boolean] = tuple();
```

## タプルを使う場面

TypeScriptで非同期プログラミングをする時に、時間のかかる処理を直列ではなく並列で行いたい時があります。そのときTypeScriptでは`Promise.all()`というものを使用します。このときタプルが役に立ちます。
`Promise`についての詳しい説明は本書に専門の頁がありますので譲ります。ここでは`Promise<T>`という型の変数は`await`をその前につけると`T`が取り出せることだけ覚えておいてください。また、この`T`をジェネリクスと言いますが、こちらも専門の頁があるので譲ります。

[Promise / async / await](../promise-async-await.md)

[ジェネリクス (generics)](/reference/generics)

```ts
const promise: Promise<number> = yyAsync();
const num: number = await promise;
```

たとえば次のような処理に時間が3秒、5秒かかる関数`takes3Seconds(), takes5Seconds()`があるとします。

```ts
async function takes3Seconds(): Promise<string> {
  // ...
  return "finished!";
}

async function takes5Seconds(): Promise<number> {
  // ...
  return -1;
}
```

この関数をそのまま実行すると3 + 5 = 8秒かかってしまいます。

```ts
const str: string = await takes3Seconds();
const num: number = await takes5Seconds();
```

これを`Promise.all()`を使うことで次のように書くことができます。このときかかる時間は関数の中でもっとも時間がかかる関数、つまり5秒です。

```ts
const tuple: [string, number] = await Promise.all([
  takes3Seconds(),
  takes5Seconds(),
]);
```

このとき`Promise.all()`の戻り値を受けた変数`tuple`は`[string, number]`です。実行する関数の`Promise<T>`のジェネリクスの部分とタプルの型の順番は一致します。つまり次のように入れ替えたら、入れ変えた結果のタプルである`[number, string]`が得られます。

```ts
const tuple: [number, string] = await Promise.all([
  takes5Seconds(),
  takes3Seconds(),
]);
```

`Promise.all()`は先に終了した関数から順番に戻り値のタプルとして格納されることはなく、元々の順番を保持します。`take3seconds()`の方が早く終わるから、先にタプルに格納されるということはなく、引数に渡した順番のとおりにタプル`tuple`の要素の型は決まります。
