# オブジェクト型のreadonlyプロパティ

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

pikachu;
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

## プロパティを書き換えさせなくしたい

オブジェクトリテラルが定義されたとき、特に型を指定しないとTypeScriptはプロパティの型を推測します。たとえば上記の定数`pikachu`はTypeScriptはこのように型を定義します。

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
// Type 'false' is not assignable to type 'string'.
```

プロパティを書き換えさせないためには、次のような方法が挙げられます。

## `readonly`

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

## `readonly`で注意すること

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

{% page-ref page="../../../../features/utility-types.md" %}

## 

