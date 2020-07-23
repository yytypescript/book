# タイプエイリアス \(Type aliases\)

`JSON`は`JavaScript Object Notation`の略です。JavaScriptでは`{}`で囲まれたキー、プロパティのペアがオブジェクトになります。

## オブジェクトの型について

`JSON`を代表とするオブジェクトリテラルをTypeScriptでは`object`型で受けることができるのですが、かなり問題があります。

```typescript
const person: object = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};

console.log(person.surname);
// -> Property 'surname' does not exist on type 'object'.
```

`object`型に代入したオブジェクトはプロパティ、メソッドを一切持っていないものとしてみなされます。そのため6行目のようにプロパティ、メソッドに対するアクセスができません。

## オブジェクトの型を定義する

これでは何も旨味がないので独自に型を定義します。上記の人名を持つオブジェクトであれば以下のように定義できます。

```typescript
const person: {
  surname: string;
  givenName: string;
} = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};

console.log(person.surname);
```

型にもそのままオブジェクトを書いてしまいます。このようにすることで変数`person`は`surname`と`givenName`というふたつのプロパティを持っていることが表現でき、アクセスができるようになります。

### オブジェクトとその型定義で違うところ

オブジェクトの型の定義が実体と異なるところは、プロパティの後ろにオブジェクトであれば`,`を付けますが型定義では`;`を付けます。実際のオブジェクトとオブジェクトの型定義は以下です。

```typescript
// object
{
  surname: 'Fauré',
  givenName: 'Gabriel'
};

// type
{
  surname: string;
  givenName: string;
};
```

## 型定義が抱える問題

この機能を使って**円満な**家族を表現してみましょう。両親がおり、子供が複数存在します。最近は減りましたが二世帯住宅であれば祖父母もいるでしょう。グローバルな現在では夫婦別姓制もあります。

おそらく変数`family`の型はこのようになるでしょう

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

エイリアスと名前の通り、ある型に対する別名をつけることが目的です。例えばはじめに紹介した人物名であれば以下のようになります。

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

タイプエイリアスの中でタイプエイリアスを使うこともできます。これを使えば家族は以下のようになるでしょう。

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

プロパティの`grandparents`は最大ふたつじゃないか、という指摘があるかと思います。気になる方はタプルの章をご参照ください。

## オブジェクト内の関数の定義

オブジェクトが持つ関数\(メソッド\)の定義の方法はふたつあります。これらが指す関数の意味は同じです。

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

ただし`Surname, GivenName`はあくまでも`string`型の別名にしかすぎません。つまり以下のようなことが問題なく起こってしまいます。

```typescript
const surname: Surname = 'Fauré';
const givenName: GivenName = 'Gabriel';

const person: Person = {
  surname: givenName,
  givenName: surname
};
```

この例は`surname`と`givenName`を取り違えていますが、これに関してTypeScriptが何かを指摘するということはありません。

たいして役に立たないのではと思われるかもしれませんが、これが大いに役に立つ場面があります。それはユニオン型`(Union types)`と組み合わせることです。ユニオン型の説明は専門にありますので詳細は譲ります。ここではユニオン型は`|`で区切られたものの**どれか**がであることだけ覚えておいてください。

```typescript
type SystemSupportLanguage = 'en' | 'fr' | 'it' | 'es';
```

これはそのシステムがサポートする言語は`'en', 'fr', 'it', 'es'`のいずれかであり、それに`SystemSupportLanguage`という別名を与えたことになります。

## 宣言に使える特殊な記号

オブジェクトの型定義をするにあたり便利な記号を紹介します。

### `?`

これはそのプロパティを選択可`(Optional)`にする時に使います。つまりあってもなくても構いませんの意味になります。

```typescript
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
```

上記例に`middleName`というプロパティを追加し`?`を付与しました。こうすればこのタイプエイリアス`Person`は`surname, givenName`は必ず持っているものの`middleName`は持っていない人がいるということを示しています。

この記号が付与されているプロパティを呼び出す時、使用者はその値があるかないかを確定させる必要があります。ある時はタイプエイリアス通りの型、つまりこの場合は`string`型ですが、ない時は`undefined`として解釈されますのでその判定が必要になります。

ちなみに`string`型あるいは`undefined`であればユニオン型を使うと`string | undefined`と書くことができるのですが、これと`?`では明確に違う点があります。それは`undefined`とのユニオン型で書いた場合、**宣言時に省略ができなくなります**。つまり宣言時に値を持っていないことを`undefined`として明記する必要があります。

```typescript
type Person = {
  surname: string;
  middleName: string | undefined;
  givenName: string;
};

const person: Person = {
  surname: 'Fauré',
  givenName: 'Gabriel'
};
// -> Property 'middleName' is missing in type '{ surname: string; givenName: string; }' but required in type 'Person'.
```

ちなみにこの省略可能な`undefined`はTypeScriptでは`undefined`型ではなく、`void`型に属しています。

### `readonly`

これはそのプロパティを読み取り専用`(Readonly)`にする時に使います。

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
// -> Cannot assign to 'surname' because it is a read-only property.
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
// -> Cannot assign to 'name' because it is a read-only property.
person.age = 80;
// -> Cannot assign to 'age' because it is a read-only property.
```

これらが代入不可能なのはわかるかと思いますが、問題は以下です。

```typescript
person.name.surname = 'Panda';
person.name.givenName = 'Gorilla';
```

`Name`のプロパティ`surname, givenName`はともに`readonly`ではないためこのように上書きができてしまいます。

## 便利な組み込み型

タイプエイリアスをより便利に使うためにいくつかの便利な組み込み型が定義されています。その中でも有用なものを紹介します。これらで全てではありません。なお、以下のタイプエイリアスを使うものとします。

```typescript
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
```

### `Readonly<T>`

さきほど出てきた`readonly`を全てのプロパティに対して適用してくれる組み込み型です。`readonly`の項目でも紹介したようにプロパティがオブジェクトだった場合、それが持つプロパティまでは`readonly`にしないことに注意してください。

`Readonly<Person>`は以下と同じ型になります。

```typescript
type ReadonlyPerson = {
  readonly surname: string;
  readonly middleName?: string;
  readonly givenName: string;
};
```

### `Partial<T>`

`?`を全てのプロパティに対して適用してくれる組み込み型です。

`Partial<Person>`は以下と同じ型になります。

```typescript
type PartialPerson = {
  surname?: string;
  middleName?: string;
  givenName?: string;
};
```

### `Required<T>`

`Partial<T>`の逆で、全てのプロパティから`?`を取り去ります。

`Required<Person>`は以下と同じ型になります。

```typescript
type RequiredPerson = {
  surname: string;
  middleName: string;
  givenName: string;
};
```

## `Index signatures`

オブジェクトのキーをあえて指定せず、プロパティのみを指定したい場合があります。そのときに使えるのがこの`Index signatures`です。  
プロパティが全て`string`型であるようなオブジェクトのタイプエイリアスは以下です。

```typescript
type Butterfly = {
  [key: string]: string;
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

ただし、どのキーも存在するものとして扱われます、存在しないキーを指定してもエラーは発生せず`undefined`を返します。またTypeScriptによる入力補完も働きません。

```typescript
console.log(bufferflies.ja);
// undefined
```

### ユニオン型と合わせる

先ほどシステムがサポートする言語を定義しました。

```typescript
type SystemSupportLanguage = 'en' | 'fr' | 'it' | 'es';
```

これはユニオン型のタイプエイリアスですが、これを`Index signatures`のキーとして使用することができます。

```typescript
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
```

このように`Butterfly`を更新するとシステムがサポートしない言語、ここでは`de`が設定、使用できなくなります。

```typescript
const bufferflies: Butterfly = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa',
  de: 'Schmetterling'
};
// -> Object literal may only specify known properties, and 'de' does not exist in type 'Butterfly'.
```

### `Index signatures`の制限

`Index signatures`は`string`型、`number`型しか指定できません。

```typescript
type Jekyll = {
  [key: boolean]: string;
};
// -> An index signature parameter type must be either 'string' or 'number'.
```

ちなみに`number`型のキーを持つオブジェクトとは配列のことです。様々な型をキーに設定したい場合は`Map`を使用してください。

### `Record<K, T>`

`Index signatures`を使うことと同義の組み込み方があります。`K`にキーとなる型を、`T`にプロパティとなる型を指定します。

```typescript
type StringKeyObject = Record<string, string>;
type NumberKeyObject = Record<number, string>;
```

こちらは`Index signatures`で使用できる型に加えてキーに`symbol`型も使うことができます。また、ユニオン型をキーに使うこともできます。

```typescript
type SymbolKeyObject = Record<symbol, string>;
type Butterfly = Record<SystemSupportLanguage, string>;
```

## インターセクション型 `(Intersection types)`

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

type ThreeDimensionalPoint = TwoDimensionPointal & Z;

const p: ThreeDimensionPointal = {
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
// -> Type '"2"' is not assignable to type 'never'.
```

この`never`型にはいかなる値も代入できません。使い道がまるでないように見えますが、関数の戻り値に設定すると必ず例外を返す関数、無限ループの関数など、後続のコードが実行されないことを示す時に使えます。

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

一眼でどれが必須で、どれが選択可かが非常にわかりづらいです。そこで先ほど紹介した`Required<T>`と`Partial<T>`をつかってプロパティを分離し、最後にインターセクション型を使い合成します。

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

type Parameter = Readonly<Mandatory & Optional>;
```

