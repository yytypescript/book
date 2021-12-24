---
sidebar_label: constアサーション「as const」
---

# constアサーション「as const」 (const assertion)

オブジェクトリテラルの末尾に`as const`を記述すればプロパティが`readonly`でリテラルタイプで指定した物と同等の扱いになります。

```ts
const pikachu = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
} as const;
```

代入はもちろんできません。

```ts
pikachu.name = "raichu";
// Cannot assign to 'name' because it is a read-only property.
```

## `readonly`と`const assertion`の違い

どちらもオブジェクトのプロパティを`readonly`にする機能は同じですが、以下が異なります。

### `readonly`はプロパティごとにつけられる

`const assertion`はオブジェクト全体に対する宣言なので、すべてのプロパティが対象になりますが、`readonly`は必要なプロパティのみにつけることができます。

### `const assertion`は再帰的に`readonly`にできる

オブジェクトの中にオブジェクトがあるときの挙動が異なります。たとえば次のようなオブジェクトがあるとします。

```ts
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  readonly name: string;
  readonly canada: Country;
  readonly america: Country;
  readonly mexico: Country;
};

const america: Continent = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
};
```

ここで`Continent`のタイプエイリアスがもつプロパティはすべて`readonly`です。よって次のようなことはできません。

```ts
america.name = "African Continent";
// Cannot assign to 'name' because it is a read-only property.
america.canada = {
  name: "Republic of Côte d'Ivoire",
  capitalCity: "Yamoussoukro",
};
// Cannot assign to 'canada' because it is a read-only property.
```

しかしながら、次のようなことは問題なくできてしまいます。

```ts
america.canada.name = "Republic of Côte d'Ivoire";
america.canada.capitalCity = "Yamoussoukro";
```

これは`readonly`をつけたプロパティがオブジェクトである場合に、そのオブジェクトのプロパティまで`readonly`にはしないことに起因します。

### `const assertion`はすべてのプロパティを固定する

`as const`を付けます。

```ts
const america = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
} as const;
```

`readonly`と同様にトップレベルのプロパティへの代入はできません。

```ts
america.name = "African Continent";
// Cannot assign to 'name' because it is a read-only property.
america.canada = {
  name: "Republic of Côte d'Ivoire",
  capitalCity: "Yamoussoukro",
};
// Cannot assign to 'canada' because it is a read-only property.
```

これだけではなくオブジェクトが持つプロパティも同様に`readonly`にしてくれます。

```ts
america.canada.name = "Republic of Côte d'Ivoire";
// Cannot assign to 'name' because it is a read-only property.
america.canada.capitalCity = "Yamoussoukro";
// Cannot assign to 'capitalCity' because it is a read-only property.
```

## 関連情報

[型アサーション「as」(type assertion)](type-assertion-as.md)

[オブジェクト型のreadonlyプロパティ (readonly property)](object/readonly-property.md)
