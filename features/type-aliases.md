# タイプエイリアス \(Type Aliases\)

JSONはJavaScript Object Notationの略です。JavaScriptでは`{}`で囲まれたキー、プロパティのペアがオブジェクトになります。

## オブジェクトの型について

JSONを代表とするオブジェクトリテラルをTypeScriptでは`object`型で受けることができるのですが、かなり問題があります。

```typescript
const person: object = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};

console.log(person.surname);
// Property 'surname' does not exist on type 'object'.
```

`object`型に代入したオブジェクトはプロパティ、メソッドを一切持っていないものとしてみなされます。そのため6行目のようにプロパティ、メソッドに対するアクセスができません。

{% page-ref page="object.md" %}

## オブジェクトの型を定義する

これでは何も旨味がないので独自に型を定義しましょう。上記の人名を持つオブジェクトであれば次のように定義できます。

```typescript
const person: {
  surname: string;
  givenName: string;
} = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};

person.surname;
// -> 'Fauré'
```

型にもそのままオブジェクトを書いてしまいます。このようにすることで変数`person`は`surname`と`givenName`というふたつのプロパティを持っていることが表現でき、アクセスができるようになります。

### オブジェクトとその型定義で違うところ

オブジェクトの型の定義が実体と異なるところは、プロパティの後ろにオブジェクトであれば`,`を付けますが型定義では`;`を付けます。実際のオブジェクトとオブジェクトの型定義は以下です。

```typescript
// object
const obj = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};

// type
type typ = {
  surname: string;
  givenName: string;
};
```

## 型定義が抱える問題

この機能を使って**円満な**家族を表現してみましょう。両親がおり、子供が複数存在します。最近は減りましたが二世帯住宅であれば祖父母もいるでしょう。グローバルな現在では夫婦別姓制もあります。

おそらく変数`family`型はこのようになるでしょう

```typescript
const family: {
  parents: {
    mother: {
      surname: string;
      givenName: string;
    };
    father: {
      surname: string;
      givenName: string;
    };
  };
  children: {
    surname: string;
    givenName: string;
  }[];
  grandparents: {
    mother: {
      surname: string;
      givenName: string;
    };
    father: {
      surname: string;
      givenName: string;
    };
  }[];
} = {...};
```

同じものの繰り返しが多く、再利用性がありません。そこで本項で紹介するタイプエイリアスを使用します。

## タイプエイリアスの定義

エイリアスと名前のとおり、ある型に対する別名をつけることが目的です。たとえばはじめに紹介した人物名であれば次のようになります。

```typescript
type Person = {
  surname: string;
  givenName: string;
};

const person: Person = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};
```

タイプエイリアスの中でタイプエイリアスを使うこともできます。これを使えば家族は次のようになるでしょう。なお`Person`は上記のものを使うものとします。

```typescript
type Parents = {
  mother: Person;
  father: Person;
};

type Family = {
  parents: Parents;
  children: Person[];
  grandparents: Parents[];
};

const family: Family = {...};
```

プロパティの`grandparents`は最大ふたつじゃないか、という指摘があるかと思います。そのように設定することもできます。その方法が気になる方はタプルのページをご参照ください。

{% page-ref page="tuple.md" %}

## オブジェクト内の関数の定義

オブジェクトが持つメソッドの定義の方法はふたつあります。これらが指す関数の意味は厳密には異なりますが、基本的に同じです。差異はかなり踏み込んだ内容になりますので本書では触れません。

```typescript
type A = {
  merge: (arg1: string, arg2: string) => string;
};

type B = {
  merge(arg1: string, arg2: string): string;
};
```

## プリミティブ型にもタイプエイリアス

タイプエイリアスはオブジェクトだけではなく、プリミティブ型に対してもつけることが可能です。

```typescript
type Surname = string;
type GivenName = string;

type Person = {
  surname: Surname;
  givenName: GivenName;
};
```

上記例はこのように置き換えることも可能です。

ただし`Surname, GivenName`はあくまでも`string`型の別名にしかすぎません。つまり次のようなことが問題なく起こってしまいます。

```typescript
const surname: Surname = 'Fauré';
const givenName: GivenName = 'Gabriel';

const person: Person = {
  surname: givenName,
  givenName: surname
};
```

この例は`surname`と`givenName`を取り違えていますが、これに関してTypeScriptが何かを指摘するということはありません。

たいして役に立たないのではと思われるかもしれませんが、これが大いに役に立つ場面があります。それはユニオン型と組み合わせることです。ユニオン型の説明は専門にありますので詳細は譲ります。ここではユニオン型は`|`で区切られたものの**どれか**がであることだけ覚えておいてください。

```typescript
type SystemSupportLanguage = 'en' | 'fr' | 'it' | 'es';
```

これはそのシステムがサポートする言語は`'en', 'fr', 'it', 'es'`のいずれかであり、それに`SystemSupportLanguage`という別名を与えたことになります。

{% page-ref page="union-types.md" %}

## 宣言に使える特殊な記号

オブジェクトの型定義をするにあたり便利な記号を紹介します。

### `?`

これはそのプロパティを選択可\(Optional\)にする時に使います。つまりあってもなくても構いませんの意味になります。

```typescript
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
```

上記例に`middleName`というプロパティを追加し`?`を付与しました。こうすればこのタイプエイリアス`Person`は`surname, givenName`は必ず持っているものの`middleName`は持っていない人がいるということを示しています。

この記号が付与されているプロパティを呼び出す時、使用者はその値があるかないかを確定させる必要があります。ある時はタイプエイリアスとおりの型、つまりこの場合は`string`型ですが、ない時は`undefined`として解釈されますのでその判定が必要になります。

### `readonly`

これはそのプロパティを読み取り専用\(Readonly\)にする時に使います。

```typescript
type Person = {
  readonly surname: string;
  givenName: string;
};
```

上記例の`surname`を`readonly`に変更しました。これによりこのプロパティに対しての代入はできなくなります。

```typescript
const person: Person = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};

person.surname = 'Panda';
// Cannot assign to 'surname' because it is a read-only property.
person.givenName = 'Gorilla';
```

もちろん`readonly`がついていないプロパティ、この場合`givenName`は代入が可能です。

### `readonly`で注意すること

`readonly`はそのオブジェクトが入れ子になっている場合、その中のオブジェクトのプロパティまでを`readonly`にはしません。つまり、再帰的なものではありません。

```typescript
type Name = {
  surname: string;
  givenName: string;
};

type Person = {
  readonly name: Name;
  readonly age: number;
};

const person: Person = {
  name: {
    surname: 'Fauré',
    givenName: 'Gabriel'
  },
  age: 79
};

person.name = {
  surname: 'Panda',
  givenName: 'Gorilla'
};
// Cannot assign to 'name' because it is a read-only property.
person.age = 80;
// Cannot assign to 'age' because it is a read-only property.
```

これらが代入不可能なのはわかるかと思いますが、問題は以下です。

```typescript
person.name.surname = 'Panda';
person.name.givenName = 'Gorilla';
```

`Name`のプロパティ`surname, givenName`はともに`readonly`ではないためこのように上書きができてしまいます。

これら記号と、それを発展させた型の表現についてはユーティリティ型に詳細がありますのでご参照ください。

{% page-ref page="utility-types.md" %}

## インデックス型\(Index Signatures\)

オブジェクトのキーをあえて指定せず、プロパティのみを指定したい場合があります。そのときに使えるのがこのインデックス型です。  
プロパティがすべて`string`型であるようなオブジェクトのタイプエイリアスは以下です。

```typescript
type Butterfly = {
  [key: string] : string;
};
```

キーを表している変数`key`は別名でも構いません。

もちろんこの`Butterfly`にはプロパティが`string`型であればなんでも入ります。

```typescript
const bufferflies: Butterfly = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa',
  de: 'Schmetterling'
};
```

この型の変数を利用する時、どのキーも存在するものとして扱われます。存在しないキーを指定してもエラーが発生することなく`undefined`を返します。またTypeScriptによる入力補完も働きません。

```typescript
bufferflies.ja;
// -> undefined
```

このチェックをより厳密にするオプションがtsconfig.jsonにあります。このオプションを有効にするとたとえプロパティがあるキーにアクセスしてもプロパティの型は`undefined`とのユニオン型であると解釈されるようになります。こちらについてはtsconfig.json Deep Diveのページをご覧ください。

{% page-ref page="tsconfig.json-deep-dive.md" %}

### インデックス型の制限

インデックス型は`string`型、`number`型しか指定できません。

```typescript
type Jekyll = {
  [key: boolean]: string;
};
// An index signature parameter type must be either 'string' or 'number'.
```

ちなみに`number`型のキーを持つオブジェクトとは配列のようなオブジェクトのことです。

## Mapped type

インデックス型では設定時はどのようなキーも自由に設定できてしまい、アクセス時は毎回`undefined`かどうかの型チェックが必要です。入力の形式が決まっているのであればMapped typeの使用を検討できます。

Mapped typeは主にユニオン型と組み合わせて使います。先ほどシステムがサポートする言語を定義しました。

```typescript
type SystemSupportLanguage = 'en' | 'fr' | 'it' | 'es';
```

これをインデックス型と同じようにキーの制約として使用することができます。

```typescript
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
```

このように`Butterfly`を定義するとシステムがサポートしない言語、ここでは`de`が設定、使用できなくなります。

```typescript
const bufferflies: Butterfly = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa',
  de: 'Schmetterling'
};
// Object literal may only specify known properties, and 'de' does not exist in type 'Butterfly'.
```

プロパティを読み取り専用にする`readonly`をそのオブジェクトのすべてのプロパティに適用する`Readonly<T>`というユーティリティ型があります。他にもユーティリティ型はありますが、それらについては専門のページがありますのでここでは割愛します。

{% page-ref page="utility-types.md" %}

`Readonly<T>`もこの機能で実現されています。`Readonly<T>`は次のように実装されています。

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

`keyof T`という見慣れない表現が登場しましたが、これはオブジェクトのキーをユニオン型に変更するものだと解釈してください。つまり次のようなものです。

```typescript
type Name = {
  surname: string;
  middleName: string;
  givenName: string;
};

type NameKeys = keyof Name;
// -> 'surname' | 'middleName' | 'givenName'
```

### インデックス型と異なるところ

Mapped typeはインデックス型と異なり`symbol`型もキーにすることができます。

```typescript
type Identifier = symbol | 1;
type Sample = {
  [P in Identifier]: string;
};

const sample: Sample = {
  [Symbol('thick')]: 'thin',
  1: 'pork'
};
```

## インターセクション型 \(Intersection Types\)

考え方はユニオン型と相対するものです。ユニオン型が**どれか**を意味するならインターセクション型は**どれも**です。言い換えるとオブジェクトの定義を合成させることを指します。

インターセクション型を作るためには合成したいオブジェクト同士を`&`で列挙します。

```typescript
type TwoDimensionalPoint = {
  x: number;
  y: number;
};

type Z = {
  z: number;
};

type ThreeDimensionalPoint = TwoDimensionalPoint & Z;

const p: ThreeDimensionalPoint = {
  x: 0,
  y: 1,
  z: 2
};
```

xy平面上の点を表す`TwoDimensionalPoint`を拡張してxyz平面上の点の`ThreeDimensionalPoint`に変換しました。

### プリミティブ型のインターセクション型

プリミティブ型のインターセクション型をつくることもできますが、作ると`never`という型ができます。

```typescript
type Never = string & number;

const n: Never = '2';
// Type '"2"' is not assignable to type 'never'.
```

この`never`型にはいかなる値も代入できません。使い道がまるでないように見えますが意外なところで役に立ちます。今回は説明を省きます。

### インターセクション型を使いこなす

システムの巨大化に伴い、受け付けたいパラメーターが巨大化したとします。

```typescript
type Parameter = {
  id: string;
  index?: number;
  active: boolean;
  balance: number;
  photo?: string;
  age?: number;
  surname: string;
  givenName: string;
  company?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  // ...
};
```

一見してどのプロパティが必須で、どのプロパティが選択可かが非常にわかりづらいです。これをインターセクション型とユーティリティ型の`Required<T>`と`Partial<T>`を使いわかりやすく表記できます。ユーティリティ型については解説しているページがありますのでご覧ください。

{% page-ref page="utility-types.md" %}

#### 必須とそうでないパラメータのタイプエイリアスに分離する

```typescript
type Mandatory = {
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
};

type Optional = {
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
};
```

#### `Required<T>, Partial<T>`をつける

`Mantatory`は`Required<T>`を、`Optional`は`Partial<T>`をつけます。

```typescript
type Mandatory = Required<{
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
}>;

type Optional = Partial<{
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
}>;
```

#### インターセクション型で合成する

これで最初に定義した`Parameter`と同じタイプエイリアスができました。

```typescript
type Parameter = Readonly<Mandatory & Optional>;
```

