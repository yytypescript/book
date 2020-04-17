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

オブジェクトの型の定義が実体と異なるところは、プロパティの後ろにオブジェクトであれば`,`を付けますが型宣言では`;`を付けます。実際のオブジェクトとオブジェクトの型定義は以下です。

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

エイリアスと名前のいう通り、ある型に対する別名をつけることが目的です。例えばはじめに紹介した人物名であれば以下のようになります。

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

家族は以下のようになるでしょう。

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

たいして役に立たないのではと思われるかもしれませんが、これが大いに役に立つ場面があります。それはユニオン型`(Union types)`と組み合わせることです。ユニオン型の説明は専門にありますので詳細は譲ります。ここではユニオン型は`|`で区切られたもののどれかがであることだけ覚えてください。

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

上記例に`middleName`というプロパティを追加し`?`を付与しました。こうすればこのタイプエイリアス`Person`は`surname, givenName`は必ず持っているが`middleName`は持っていない人がいるということを示していると解釈できます。

この記号が付与されているプロパティを呼び出すとき、使用者はその値があるかないかを確定させる必要があります。あるときはタイプエイリアス通りの型、つまりこの場合は`string`型ですが、ないときは`undefined`として解釈されますのでその判定が必要になります。

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
```

もちろん`readonly`がついていないプロパティ、この場合`givenName`は代入が可能です。

```typescript
person.givenName = 'Gorilla';
```

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

person.age = 80;
// -> Cannot assign to 'age' because it is a read-only property.
person.name = {
  surname: 'Panda',
  givenName: 'Gorilla'
};
// -> Cannot assign to 'name' because it is a read-only property.
```

これらが代入不可能なのはわかるかと思いますが、問題は以下です。

```typescript
person.name.surname = 'Panda';
person.name.givenName = 'Gorilla';
```

`Name`型のプロパティ`surname, givenName`はともに`readonly`ではないためこのように上書きができてしまいます。

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

こちらは`?`を全てのプロパティに対して適用してくれる組み込み型です。

`Partial<Person>`は以下と同じ型になります。

```typescript
type PartialPerson = {
  surname?: string;
  middleName?: string;
  givenName?: string;
};
```

### `Requied<T>`

こちらは`Partial<T>`の逆で、全てのプロパティから`?`を取り去ります。

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

もちろんこの`Butterfly`にはそれが`string`型であればなんでも入ります。

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

`Index signatures`は`string`型もしくは`number`型しか指定できません。

```typescript
type Jekyll = {
  [key: boolean]: string;
};
// -> An index signature parameter type must be either 'string' or 'number'.
```

ちなみに`number`型のキーを持つオブジェクトとは配列のことです。様々な型をキーに設定したい場合は`Map`を使用してください。

## インターセクション型 `(Intersection types)`

考え方はユニオン型と相対するものです。ユニオン型が**どれか**を意味するならインターセクション型は**どれも**です。言い換えるとオブジェクトの定義を合成させることを指します。

```typescript
type TwoDimensionPoint = {
  x: number;
  y: number;
};

type Z = {
  z: number;
};

type ThreeDimensionPoint = TwoDimensionPoint & Z;

const p: ThreeDimensionPoint = {
  x: 0,
  y: 1,
  z: 2
};
```

xy平面上の点を表す`TwoDimensionPoint`を拡張してxyz平面上の点の`ThreeDimensionPoint`に変換しました。

### プリミティブ型のインターセクション型

プリミティブ型のインターセクション型をつくると`never`という型ができます。

```typescript
type Never = string & number;

const n: Never = '2';
// -> Type '"2"' is not assignable to type 'never'.
```

この`never`型にはいかなる値も代入できません。使い道がまるでないように見えますが、実は少し役に立ちます。

### インターセクション型を使いこなす

システムの巨大化に伴い、受け付けたいオブジェクトが巨大化したとします。

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

一眼見てでどれが必須で、どれが選択可かが非常にわかりづらいです。そこで先ほど紹介した`Required<T>`と`Partial<T>`をつかってプロパティを分離し、最後にインターセクション型を使い合成します。

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

## インターフェイスとの違い

タイプエイリアスとインターフェイスは機能が似通っており、誰もがどちらを使うべきか非常に困惑します。  
本書では主にオブジェクトリテラルを指すときはタイプエイリアスを使用していますが、インターフェイスを使っても特に問題がありません。  
そこで、以下にタイプエイリアスとインターフェイスの違いを挙げます。

### プリミティブ型を別の名前で定義する

インターフェイスはオブジェクトの型を定義することだけができます。プリミティブ型に対してインターフェイスを作ることはできません。

```typescript
type nil = null;
```

### ユニオン型、インターセクション型を受ける

ユニオン型、インターセクション型はタイプエイリアスのみが受けることができます。

```typescript
type Maybe<T> = T | null | undefined;
type Parameter = Mandatory & Optional;
```

### 拡張する

インターフェイスはインターセクション型こそできませんが代わりに拡張することができます。

```typescript
interface Parameter extends RequiredParameters, OptionalParameters {
}
```

### `Declaration merging`

インターフェイスのみができる機能で、最もタイプエイリアスと異なる特徴です。JavaScriptが`ES2015, ES2016, ES2017, ES2018, ES2019`と進化するにつれ、既存のクラスにもメソッドが追加されることもあります。例えば`Array`は`ES2016`で`array.includes()`が、`ES2019`で`array.flatMap()`が追加されました。

インターフェースではファイルを分けて`Array<T>`というインターフェースを定義して、使用する環境に応じて読み込むファイルを変えるだけで実装ができます。

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

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

| メインライター | 対応スケジュール |
| :--- | :--- |
| jamashita | 04/17終了 |

