---
description: 全プロパティをオプショナルにする
title: Partial<T>
---

`Partial<T>`は、オブジェクト型`T`のすべてのプロパティをオプションプロパティにするユーティリティ型です。

## Partial&lt;T>の型引数

### T

型引数`T`にはオブジェクト型を渡します。

## Partialの使用例

```ts
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type PartialPerson = Partial<Person>;
```

この`PartialPerson`は次の型と同じになります。

```ts
type PartialPerson = {
  surname?: string;
  middleName?: string;
  givenName?: string;
};
```

## Partialを用いたOptions Objectパターンの例

`Partial`をOptions Objectパターンに応用すると、省略可能でありながら見やすい関数を実装できます。

[キーワード引数とOptions Objectパターン](../../functions/keyword-arguments-and-options-object-pattern.md)

ユーザーの検索をかける関数を作ります。プロパティはそれぞれ引数となっており、対応する引数に値を与えると検索ができる関数`findUsers()`があるとします。ここでは例のため引数を

```ts
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};

function findUsers(
  surname?: string,
  middleName?: string,
  givenName?: string,
  age?: number,
  address?: string,
  nationality?: string
): Promise<User[]> {
  // ...
}
```

ですが、この`findUsers()`のシグネチャだと**年齢だけがXX才の**ユーザーが欲しい時は引数の順番を維持するために他の引数は`undefined`を入力しなければいけません。

```ts
findUsers(undefined, undefined, undefined, 22);
```

この例では引数は6個しかなく`age`以降の引数は省略できるためそこまで見辛くありませんが、多い引数の関数になるとどこが対応する引数なのかを探すだけでも面倒です。これを`Partial<T>`を使って見た目をよくできます。

まず引数はすべてオブジェクトで受け渡しされるものとしてそのオブジェクトの型を定義します。さらにプロパティを省略可能にするために`Partial<T>`をつけます。

```ts
type FindUsersArgs = Partial<User>;
```

これを関数`findUsers()`の引数にします。

```ts
function findUsers({
  surname,
  middleName,
  givenName,
  age,
  address,
  nationality,
}: FindUsersArgs): Promise<User[]> {
  // ...
}
```

これだけではまだ呼び出し側は省略ができません。`findUsers()`を使用する時は仮に何も設定する必要がなくても引数に`{}`を与えなければいけません。

```ts
findUsers({});
```

引数を省略できるようにするためにデフォルト引数を使い省略時に`{}`が代入されるようにします。

```ts
function findUsers({
  surname,
  middleName,
  givenName,
  age,
  address,
  nationality,
}: FindUsersArgs = {}): Promise<User[]> {
  // ...
}

findUsers();
findUsers({ age: 22 });
```

`FindUsersArgs`の右の`= {}`がそれにあたります。これにより`findUsers()`は引数がなくても呼び出せるようになります。特定の引数だけ値を指定することもできます。`findUsers({ age: 22 })`がその例です。

さらに`FindUsersArgs`側にもデフォルト型を設定することで初期値することもできます。

```ts
function findUsers({
  name = "John Doe",
  nationality = "Araska",
  age = 22,
}: FindUsersArgs = {}): Promise<User[]> {
  // ...
}
```

## 関連情報

[Required&lt;T>](required.md)
