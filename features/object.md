# オブジェクト \(Object\)

クラスのインスタンスとしてのオブジェクト以外に、`JSON`を代表とする`{}`で囲まれたオブジェクトリテラルという書き方もかなり一般的です。

## オブジェクトリテラル

オブジェクトリテラル、と聞くとパッと思い浮かばないかもしれませんが、クラスという概念が追加される前のオブジェクトと言えばコレ。のオブジェクトです。

```typescript
const pokemon = {
  name: 'pikachu',
  no: 25,
  genre: 'mouse pokémon',
  height: 0.4,
  weight: 6.0,
};
```

## オブジェクトの型

プリミティブ型以外を総称するためにTypeScriptでは`object`という型が定義されています。これはどのような形のオブジェクトリテラルも、クラスのインスタンスも、関数も受けることができます。

```typescript
const pikachu: object = {
  name: 'pikachu',
  no: 25,
  genre: 'mouse pokémon',
  height: 0.4,
  weight: 6.0,
};

const pokemon: object = new Pokemon(
  'pikachu',
  25,
  'mouse pokémon',
  0.4,
  6.0
);

const increment: object = i => i + 1;
```

しかしながら悲しいことに`object`型を与えた変数はその変数の持っているプロパティ、メソッドに対してアクセスができません。

```typescript
console.log(pikachu.no);
// -> Property 'no' does not exist on type 'object'.
console.log(pokemon.genre);
// -> Property 'genre' does not exist on type 'object'.
console.log(increment(4));
// -> This expression is not callable.
// -> Type '{}' has no call signatures.
```

そこでオブジェクトの型を独自に定義することができます。独自に定義した型にエイリアス\(別名\)をつけて使い回すこともできます。この機能については本書のタイプエイリアスの頁を参照ください。

{% page-ref page="type-alias.md" %}

## オブジェクトのプロパティは上書き可能

オブジェクトのプロパティはたとえオブジェクトを定数にしたとしても書き換えができてしまいます。

```typescript
const pikachu = {
  name: 'pikachu',
  no: 25,
  genre: 'mouse pokémon',
  height: 0.4,
  weight: 6.0,
};

pikachu.name = 'raichu';

console.log(pikachu);
// ->
// {
//   name: 'raichu',
//   no: 25,
//   genre: 'mouse pokémon',
//   height: 0.4,
//   weight: 6
// }
```

これはJavaScript, TypeScriptが抱えている問題というわけではなく、オブジェクトをリファレンス型として持つ言語では当然の挙動です。

### プロパティを書き換えさせなくしたい

オブジェクトリテラルが定義されたとき、特に型を指定しないとTypeScriptはプロパティの型を推測します。例えば上記の定数`pikachu`はTypeScriptはこのように型を定義します。

```typescript
type Wild = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};
```

そのため、先ほどのような`name`を`string`型で上書きするようなことができてしまいます。ちなみに`string`型ではない型の代入はできません。

```typescript
pikachu.name = false;
// -> Type 'false' is not assignable to type 'string'.
```

プロパティを書き換えさせないためには、以下のような方法が挙げられます。

#### `readonly`

`readonly`については、タイプエイリアスの頁にて解説がありますので、そちらをご参照ください。

{% page-ref page="type-alias.md" %}

#### `const assertion`

オブジェクトリテラルの末尾に`as const`を記述すればプロパティが`readonly`でリテラルタイプで指定した物と同等の扱いになります。

```typescript
const pikachu = {
  name: 'pikachu',
  no: 25,
  genre: 'mouse pokémon',
  height: 0.4,
  weight: 6.0,
} as const;
```

代入はもちろんできません。

```typescript
pikachu.name = 'raichu';
// -> Cannot assign to 'name' because it is a read-only property.
```

### `readonly`と`const assertion`の違い

どちらもオブジェクトのプロパティを`readonly`にする機能は同じですが、以下が異なります。

#### `readonly`はプロパティごとにつけられる

`const assertion`はオブジェクト全体に対する宣言なので、全てのプロパティが対象になりますが、`readonly`は必要なプロパティのみにつけることができます。

#### `const assertion`は再帰的に`readonly`にできる

オブジェクトの中にオブジェクトがあるときの挙動が異なります。例えば以下のようなオブジェクトがあるとします。

```typescript
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
  name: 'North American Continent',
  canada: {
    name: 'Republic of Canada',
    capitalCity: 'Ottawa'
  },
  us: {
    name: 'United States of America',
    capitalCity: 'Washington, D.C.'
  },
  mexico: {
    name: 'United Mexican States',
    capitalCity: 'Mexico City'
  }
};
```

ここで`Continent`のタイプエイリアスがもつプロパティは全て`readonly`です。よって以下のようなことはできません。

```typescript
america.name = 'African Continent';
// -> Cannot assign to 'name' because it is a read-only property.
america.canada = {
  name: 'Republic of Côte d\'Ivoire',
  capitalCity: 'Yamoussoukro'
};
// -> Cannot assign to 'canada' because it is a read-only property.
```

しかしながら、以下のようなことは問題なくできてしまいます。

```typescript
america.canada.name = 'Republic of Côte d\'Ivoire';
america.canada.capitalCity = 'Yamoussoukro';
```

これは`readonly`をつけたプロパティがオブジェクトである場合に、そのオブジェクトのプロパティまで`readonly`にはしないことに起因します。

#### `const assertion`は全てのプロパティを固定する

`as const`を付けます。

```typescript
const america = {
  name: 'North American Continent',
  canada: {
    name: 'Republic of Canada',
    capitalCity: 'Ottawa'
  },
  us: {
    name: 'United States of America',
    capitalCity: 'Washington, D.C.'
  },
  mexico: {
    name: 'United Mexican States',
    capitalCity: 'Mexico City'
  }
} as const;
```

`readonly`と同様にトップレベルのプロパティへの代入はできません。

```typescript
america.name = 'African Continent';
// -> Cannot assign to 'name' because it is a read-only property.
america.canada = {
  name: 'Republic of Côte d\'Ivoire',
  capitalCity: 'Yamoussoukro'
};
// -> Cannot assign to 'canada' because it is a read-only property.
```

これだけではなくオブジェクトが持つプロパティも同様に`readonly`にしてくれます。

```typescript
america.canada.name = 'Republic of Côte d\'Ivoire';
// -> Cannot assign to 'name' because it is a read-only property.
america.canada.capitalCity = 'Yamoussoukro';
// -> Cannot assign to 'capitalCity' because it is a read-only property.
```

## 分割代入 \(`Destructuring assignment`\)

見方に慣れていないと使いづらい機能ではありますが、分割代入という便利な代入方法があります。

### 分割代入のなかった時代はこうしていた

あるタイプエイリアス`Wild`があったとします。

```typescript
type Wild = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};
```

この`Wild`を変数で受けたあと`name`と`no`と`genre`だけを使いたい時、かつては以下のようにする必要がありました。

```typescript
const pokemon: Wild = safari();

const name: string = pokemon.name;
const no: number = pokemon.no;
const genre: string = pokemon.genre;
```

これを簡素に代入まで済ませてしまおうというのが分割代入の目的です。

### 分割代入を使うとこうなる

分割代入は、オブジェクトを返す関数などの戻り値に直接オブジェクト自体を書くような方式で使います。例えば上記の例だとこのようになります。

```typescript
const {
  name,
  no,
  genre
}: Wild = safari();
```

もちろん`height, weight`が必要なときは書き足せば定数として設定されます。この時は1行目の宣言\(今回は`const`\)によって変数か定数かが決まるので、変数も定数も欲しい時は分けて書いてください。

### ネストしたオブジェクトの分割代入

オブジェクトの中のオブジェクト、つまりネストした状態でも問題なく使うことができます。先ほど出てきた以下の例で考えます。

```typescript
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

```typescript
const {
  name,
  canada: {
    name
  },
  us: {
    name
  },
  mexico: {
    name
  }
} = america();
```

しかしながら、この例では`name`という名前が重複してしまっているため、理論上は正しいのですが同じ名前の定数の多重定義となってしまっています。

### 分割代入しつつ名前を変更する

分割代入はプロパティの名前をそのまま継ながなければならないかというとそうではありません。好きな名前に変更することができます。先ほどの`name`が重複してしまった例は以下のように書き直せます。

```typescript
const {
  name: continentName,
  canada: {
    name: canadaName
  },
  us: {
    name: usName
  },
  mexico: {
    name: mexicoName
  }
} = america();
```

### 配列にも分割代入

配列にも分割代入を使うことができます。

```typescript
const [alpha, bravo, charlie, delta, echo] = phone();
```

配列の中の配列も同様に分割代入を使えます。

```typescript
const [alpha, [bravo, [charlie, [delta, echo]]]] = phone();
```

先頭からではなく、特定番目だけ欲しい時は以下のように書くこともできます。

```typescript
const [,,, delta, echo] = phone();
```

`Rest parameters`を使うこともできます。以下の例では`alpha`が`T`型で`rest`は`T[]`型になります。

```typescript
const [alpha, ...rest] = phone();
```

### オブジェクトへの代入も分割代入

オブジェクトのキーと変数名が同じ時にかぎり、オブジェクトに値を代入するときも同様に分割代入を使うことができます。以下の例がほぼ全てです。

```typescript
const name: string = 'pikachu';
const no: number = 25;
const genre: string = 'mouse pokémon';
const height: number = 0.4;
const weight: number = 6.0;

const pikachu: Wild = {
  name,
  no,
  genre,
  height,
  weight
};
```

要するにこちらの省略型です。

```typescript
const pikachu: Wild = {
  name: name,
  no: no,
  genre: genre,
  height: height,
  weight: weight
};
```

もちろん一行で書くこともできます。

```typescript
const pikachu: Wild = { name, no, genre, height, weight };
```

### 引数にも分割代入

**オブジェクトへの代入も分割代入**を理解した上でご覧ください。例えば先ほどの`Wild`型の変数を関数に引数として与える時、以下のように与えることもできます。

```typescript
const newPokemon: Wild = evolution({ name, no, genre, height, weight });
```

また、関数でこれを関数内で分割代入で受け取ることもできます。

```typescript
function evolution({ name, no, genre, height, weight }: Wild): Wild {
  // ...
}
```

関数における分割代入については**関数\(Funcitons\)**の頁に詳細がありますので併せてご参照ください。

{% page-ref page="function.md" %}

## タイプエイリアス？それともインターフェース？

タイプエイリアスとインターフェースは機能が似通っており、誰もがどちらを使うべきか非常に困惑します。  
本書では主にオブジェクトリテラルを指すときはタイプエイリアスを使用していますが、インターフェースを使っても特に問題がありません。  
そこで、以下にタイプエイリアスとインターフェースの違いを挙げます。

### プリミティブ型を定義する

インターフェースはオブジェクトの型を定義することだけができます。プリミティブ型に対してインターフェースを作ることはできません。

```typescript
type Nil = null;
```

### ユニオン型、インターセクション型を受ける

ユニオン型、インターセクション型はタイプエイリアスのみが受けることができます。このとき、ユニオン型とインターセクション型の対象となるもの\(以下の場合`T, Mandatory, Optional`\)はタイプエイリアスでもインターフェースでもどちらでも構いません。

```typescript
type Nullable<T> = T | null;
type Parameter = Mandatory & Optional;
```

### 拡張する

インターフェイスはインターセクション型こそできませんが代わりに拡張することができます。

```typescript
interface Parameter extends Mandatory, Optional {
}
```

### インターセクション型とインターフェイスの拡張の違い

同じプロパティが違う型で衝突した時の定義が異なります。以下の例を考えます。

```typescript
type A = {
  x: number;
};

type B = {
  x: string;
};
```

これをインターセクション型で合成するとプロパティの`x`は`never`型になります。

```typescript
type C = A & B;
// ->
// type C = {
//   x: never;
// };
```

これはプリミティブ型をインターセクション型で合成した時の挙動として正しいものです。

```typescript
type N = number & string;
const n: N = 2;
// -> Type '2' is not assignable to type 'never'
const n: N = 'maintenance mode';
// -> Type '"maintenance mode"' is not assignable to type 'never'.
```

インターフェイスでは拡張自体ができません。

```typescript
interface D extends A, B {
}
// -> Interface 'D' cannot simultaneously extend types 'A' and 'B'.
```

### `Declaration merging`

インターフェイスのみができる機能で、最もタイプエイリアスと異なる特徴です。

JavaScriptが`ES2015, ES2016, ES2017, ES2018, ES2019`と進化するにつれ、既存のクラスにもメソッドが追加されることもあります。例えば`Array<T>`は`ES2016`で`array.includes()`が、`ES2019`で`array.flatMap()`が追加されました。

インターフェイスではバージョンごとにメソッドの`Array<T>`のインターフェイスをファイルを分けて定義して、環境に応じて読み込むファイルを変えるだけで`Array<T>`の型定義ができます。

```typescript
// ES2016.array.ts
interface Array<T> {
  
  includes(...): boolean;
}

// ES2019.array.ts
interface Array<T> {
  
  flatMap<U>(...): U[];
}
```

もしこれをタイプエイリアスでやるとすれば、以下のようになるでしょう。最終的な成果物が`Array<T>`となる必要があるため、それまで別の名前で定義して、最後にインターセクション型を使い合成して`Array<T>`を作り出す必要があります。

```typescript
type Array<T> = ES2016Array<T> & ES2019Array<T>;
```

この`Declaration merging`の機能は`polyfill`を行うライブラリの型定義でよく見ることができます。

## `object, Object, {}`

これらは大変よく似ています。どれもオブジェクトの型の定義にどれも使うことができます。

```typescript
const a: object = {};
const b: Object = {};
const c: {} = {};
```

また、相互に入れ替えが可能です。

```typescript
const d: object = a;
const e: object = b;
const f: object = c;

const g: Object = a;
const h: Object = b;
const i: Object = c;

const j: {} = a;
const k: {} = b;
const l: {} = c;
```

`object`はプリミティブ型ではないの全てのリファレンス型を総称するものとして定義されています。こちらは入力補完ができません。

`Object`はTypescriptで型の定義がされているインターフェイスです。そのため`.`を入力すればメソッドの入力補完ができます。

`{}`はプロパティ、メソッドを持たないオブジェクトリテラルの型定義です。こちらも`object`と同様に入力補完はできません。

### プリミティブ型を代入する

当然ながらプリミティブ型はオブジェクトではありません。そのため、そもそも代入できないのではと思われるかもしれませんが、以下のようになります。

```typescript
const object1: object = undefined;
// -> Type 'undefined' is not assignable to type 'object'.
const object2: object = null;
// -> Type 'null' is not assignable to type 'object'.
const object3: object = false;
// -> Type 'false' is not assignable to type 'object'.
const object4: object = 0;
// -> Type '0' is not assignable to type 'object'.
const object5: object = '';
// -> Type '""' is not assignable to type 'object'.
const object6: object = Symbol();
// -> Type 'unique symbol' is not assignable to type 'object'.
const object7: object = 10n;
// -> Type '10n' is not assignable to type 'object'.

const iObject1: Object = undefined;
// -> Type 'undefined' is not assignable to type 'Object'.
const iObject2: Object = null;
// -> Type 'null' is not assignable to type 'Object'.
const iObject3: Object = false;
const iObject4: Object = 0;
const iObject5: Object = '';
const iObject6: Object = Symbol();
const iObject7: Object = 10n;

const literal1: {} = undefined;
// -> Type 'undefined' is not assignable to type '{}'.
const literal2: {} = null;
// -> Type 'null' is not assignable to type '{}'.
const literal3: {} = false;
const literal4: {} = 0;
const literal5: {} = '';
const literal6: {} = Symbol();
const literal7: {} = 10n;
```

`object`は問題ないとして、`Object, {}`は`boolean, number, string, symbol, bigint`型の代入ができてしまいます。

これはTypesScriptの設計がおかしいわけではなくJavaScriptがもともと持っている`Autoboxing`を再現したものに当たります。

### `Autoboxing`

文字数カウントをしたい時は`str.length`とすれば文字数が得られます。また、数値を文字列にしたければ\(`template literal`を使わなければ\)`num.toString()`とすれば文字列が得られます。

プリミティブ型はオブジェクトではないのでプロパティやメソッドを持っていないはずです。ですがこのようなことができるのは、内部的にはJavaScriptがプリミティブ値をオブジェクトに変換しているからです。この暗黙の型変換を`Autoboxing`と呼びます。

ちなみにこの時に使われるオブジェクトを通称ラッパークラスと呼び、それらのインターフェイスもTypeScriptに`Boolean, Number, String, Symbol, BigInt`として定義されています。なお`undefined`と`null`のラッパークラス`Undefined, Null`はありません。

```typescript
const bool: Boolean = false;
const num: Number = 0;
const str: String = '';
const sym: Symbol = Symbol();
const big: BigInt = 10n;
```

当然ながらラッパークラスは`Object`を親クラスに持っているため、変数の型として`Object, {}`が定義されてしまうと`Autoboxing`をしたものと解釈され、代入ができます。

