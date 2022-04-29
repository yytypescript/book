---
sidebar_label: オブジェクトの分割代入
---

# オブジェクトの分割代入 (destructuring assignment)

JavaScriptには、オブジェクトの分割代入(destructuring assignment)という便利な構文があります。分割代入は、オブジェクトからプロパティを取り出す機能です。

通常、オブジェクトからプロパティを取り出す場合は、プロパティアクセサーを用います。プロパティアクセサーは、ドットを使ってプロパティを参照する記法です。

```ts twoslash
const item = { price: 100 };
const price = item.price; // プロパティアクセサー
```

分割代入は、中カッコ`{}`に取り出したいプロパティを指定することで、プロパティ名と同じ名前の変数が作れます。次の分割代入のサンプルコードは、上のプロパティアクセサーを使ったコードと同等の処理になります。

```ts twoslash
const item = { price: 100 };
const { price } = item;
// 上は const price = item.price; と同等の処理
```

分割代入は、プロパティ名と同じ名前で変数を定義するときに、プロパティ名を2度書かないで済むのがひとつの利点です。

## 複数のプロパティを取り出す

分割代入は、複数のプロパティを一度に取り出すこともできます。その場合、取り出したいプロパティを中カッコに列挙します。

```ts twoslash
const obj = { a: 1, b: 2 };
const { a, b } = obj;
```

この特徴は、取り出すプロパティ数が多い場合に、プロパティアクセサーより便利です。プロパティアクセサーでは、プロパティごとに代入文を書かないとなりません。

```ts twoslash title="プロパティアクセサーで取り出す例"
const color = { r: 0, g: 122, b: 204, a: 1 };
const r = color.r;
const g = color.g;
const b = color.b;
const a = color.a;
```

分割代入を使うと、これを簡潔にまとめられます。

```ts twoslash title="多くのプロパティを分割代入で取り出す例"
const color = { r: 0, g: 122, b: 204, a: 1 };
const { r, g, b, a } = color;
```

## 代入する変数名の指定

オブジェクトの分割代入では、コロン`:`のあとに変数名を指定すると、その名前の変数に代入できます。

```ts twoslash
const color = { r: 0, g: 122, b: 204, a: 1 };
const { r: red, g: green, b: blue, a: alpha } = color;
console.log(green);
// @log: 122
```

## 入れ子構造の分割代入

オブジェクトの中にオブジェクトある入れ子構造にも、分割代入が使えます。深い階層のプロパティを取り出すには、階層の分だけ中カッコで囲みます。

```ts twoslash
const continent = {
  name: "北アメリカ",
  us: {
    name: "アメリカ合衆国",
    capitalCity: "ワシントンD.C.",
  },
};

const {
  us: { name, capitalCity },
} = continent;

console.log(name);
// @log: "アメリカ合衆国"
console.log(capitalCity);
// @log: "ワシントンD.C."
// @lib: esnext
```

## 入れ子構造の分割代入と変数名の指定

入れ子構造の分割代入をしながら、値を代入する変数名を指定することを同時にすることもできます。

```ts twoslash
const continent = {
  name: "北アメリカ",
  us: {
    name: "アメリカ合衆国",
    capitalCity: "ワシントンD.C.",
  },
};

const {
  name: continentName,
  us: { name: countryName },
} = continent;

console.log(continentName);
// @log: "北アメリカ"
console.log(countryName);
// @log: "アメリカ合衆国"
```

## 分割代入のデフォルト値

分割代入では、`=`のあとにデフォルト値が指定できます。デフォルト値は値が、`undefined`のときに代入されます。

```ts twoslash
const color = { r: undefined, g: 122, b: 204 };
const { r = 0, g = 0, b = 0 } = color;
console.log(r, g, b);
// @log: 0,  122,  204
```

値が`null`のときは、デフォルト値が使われません。`null`がそのまま代入されます。

```ts twoslash
const color = { r: null };
const { r = 0 } = color;
console.log(r);
// @log: null
```

## デフォルト値と変数名の指定

分割代入のデフォルト値と代入先の変数名を同時に指定することもできます。その場合、代入先変数名に続けて、デフォルト値を書きます。

```ts twoslash
const color = { r: undefined, g: 122, b: 204 };
const { r: red = 0 } = color;
console.log(red);
// @log: 0
```

<TweetILearned>

・JavaScriptの分割代入はプロパティを取り出せる。
・同じ変数名を使う場合、コードが簡潔になる。
・複数のプロパティを取り出すときは特に便利。
・入れ子のプロパティも取り出せる。
・デフォルト値も指定できる。

</TweetILearned>

## 関連情報

[配列の分割代入 (destructuring assignment)](../array/destructuring-assignment-from-array.md)
