---
sidebar_label: constアサーション「as const」
---

# constアサーション「as const」 (const assertion)

変数宣言のときに、末尾に`as const`をつけるとその値をreadonlyにした上で、リテラル型にしてくれます。
プリミティブ型の値だとそこまでうま味を感じにくいですが、配列やオブジェクトリテラルに対して使うと便利です。

```ts twoslash
const str1 = "hello";
//    ^?
const str2 = "hello" as const; // これはas constがなくても同じ
//    ^?
const array1 = [1, 2, 3];
//    ^?
const array2 = [1, 2, 3] as const;
//    ^?
const obj1 = {
  //    ^?
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
};
const obj2 = {
  //    ^?
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
} as const;
```

readonlyになるため代入はもちろんできません。

```ts twoslash
const array1 = [1, 2, 3];
const array2 = [1, 2, 3] as const;
const obj1 = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
};
const obj2 = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
} as const;

// @errors: 2540
// ---cut---
array1[0] = 4;
array2[0] = 4;
obj1.name = "raichu";
obj2.name = "raichu";
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
