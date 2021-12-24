# Shorthand property names

オブジェクトのキーと変数名が同じ時にかぎり、オブジェクトに値を代入するときも同様にShorthand property namesを使うことができます。これも分割代入と調べると情報を得られることがあります。次の例がほぼすべてです。

```ts
const name: string = "pikachu";
const no: number = 25;
const genre: string = "mouse pokémon";
const height: number = 0.4;
const weight: number = 6.0;

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
