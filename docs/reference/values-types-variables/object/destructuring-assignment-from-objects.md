---
sidebar_label: オブジェクトの分割代入
---

# オブジェクトの分割代入 (destructuring assignment)

見かたに慣れていないと使いづらい機能ではありますが、分割代入という便利な代入方法があります。

## 分割代入のなかった時代はこうしていた

あるタイプエイリアス`Wild`があったとします(上述のものと同一です)。

```ts
type Wild = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};
```

この`Wild`を変数で受けたあと`name`と`no`と`genre`だけを使いたい時、かつては次のようにする必要がありました。

```ts
const pokemon: Wild = safari();

const name: string = pokemon.name;
const no: number = pokemon.no;
const genre: string = pokemon.genre;
```

これを簡素に代入まで済ませてしまおうというのが分割代入の目的です。

## 分割代入を使うとこうなる

分割代入は、オブジェクトを返す関数などの戻り値に直接オブジェクト自体を書くような方式で使います。たとえば上記の例だとこのようになります。

```ts
const { name, no, genre }: Wild = safari();
```

もちろん`height, weight`が必要なときは書き足せば定数として設定されます。このときは1行目の宣言(今回は`const`)によって変数か定数かが決まるので、変数も定数も欲しい時は分けて書いてください。

## ネストしたオブジェクトの分割代入

オブジェクトの中のオブジェクト、つまりネストした状態でも問題なく使うことができます。先ほど出てきた次の例で考えます。

```ts
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  name: string;
  canada: Country;
  us: Country;
  mexico: Country;
};
```

このような分割代入をすることができます。

```ts
const {
  name,
  canada: { name },
  us: { name },
  mexico: { name },
} = america();
```

しかしながら、この例では`name`という名前が重複してしまっているため、理論上は正しいのですが同じ名前の定数の多重定義となってしまっています。

## 分割代入しつつ名前を変更する

分割代入はプロパティの名前をそのまま継ながなければならないかというとそうではありません。好きな名前に変更することができます。先ほどの`name`が重複してしまった例は次のように書き直せます。

```ts
const {
  name: continentName,
  canada: { name: canadaName },
  us: { name: usName },
  mexico: { name: mexicoName },
} = america();
```

## 関連情報

[配列の分割代入 (destructuring assignment)](../array/destructuring-assignment-from-array.md)
