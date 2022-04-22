---
sidebar_label: constアサーション「as const」
---

# constアサーション「as const」 (const assertion)

オブジェクトリテラルの末尾に`as const`を記述すればプロパティが`readonly`でリテラルタイプで指定した物と同等の扱いになります。

```ts twoslash
const pikachu = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
} as const;
```

代入はもちろんできません。

```ts twoslash
// @errors: 2540
const pikachu = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
} as const;
// ---cut---
pikachu.name = "raichu";
```

## `readonly`と`const assertion`の違い

どちらもオブジェクトのプロパティを`readonly`にする機能は同じですが、以下が異なります。

### `readonly`はプロパティごとにつけられる

`const assertion`はオブジェクト全体に対する宣言なので、すべてのプロパティが対象になりますが、`readonly`は必要なプロパティのみにつけることができます。

### `const assertion`は再帰的に`readonly`にできる

オブジェクトの中にオブジェクトがあるときの挙動が異なります。たとえば次のようなオブジェクトがあるとします。

```ts twoslash
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  readonly name: string;
  readonly canada: Country;
  readonly us: Country;
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

```ts twoslash
// @errors: 2540
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  readonly name: string;
  readonly canada: Country;
  readonly us: Country;
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
// ---cut---
america.name = "African Continent";
america.canada = {
  name: "Republic of Côte d'Ivoire",
  capitalCity: "Yamoussoukro",
};
```

しかしながら、次のようなことは問題なくできてしまいます。

```ts twoslash
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  readonly name: string;
  readonly canada: Country;
  readonly us: Country;
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
// ---cut---
america.canada.name = "Republic of Côte d'Ivoire";
america.canada.capitalCity = "Yamoussoukro";
```

これは`readonly`をつけたプロパティがオブジェクトである場合に、そのオブジェクトのプロパティまで`readonly`にはしないことに起因します。

### `const assertion`はすべてのプロパティを固定する

`as const`を付けます。

```ts twoslash
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

```ts twoslash
// @errors: 2540
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
// ---cut---
america.name = "African Continent";
america.canada = {
  name: "Republic of Côte d'Ivoire",
  capitalCity: "Yamoussoukro",
};
```

これだけではなくオブジェクトが持つプロパティも同様に`readonly`にしてくれます。

```ts twoslash
// @errors: 2540
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
// ---cut---
america.canada.name = "Republic of Côte d'Ivoire";
america.canada.capitalCity = "Yamoussoukro";
```

## 関連情報

[型アサーション「as」(type assertion)](type-assertion-as.md)

[オブジェクト型のreadonlyプロパティ (readonly property)](object/readonly-property.md)
