# Shorthand property names

オブジェクトのキーと変数名が同じ時にかぎり、オブジェクトに値を代入するときも同様にShorthand property namesを使うことができます。これも分割代入と調べると情報を得られることがあります。次の例がほぼすべてです。

```ts
type Wild = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

const name = "pikachu";
const no = 25;
const genre = "mouse pokémon";
const height = 0.4;
const weight = 6.0;

const pikachu: Wild = {
  name,
  no,
  genre,
  height,
  weight,
};
```

要するにこちらの省略型です。

```ts
const pikachu: Wild = {
  name: name,
  no: no,
  genre: genre,
  height: height,
  weight: weight,
};
```

もちろん一行で書くこともできます。

```ts
const pikachu: Wild = { name, no, genre, height, weight };
```
