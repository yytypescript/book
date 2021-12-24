---
description: 任意のプロパティだけを持つオブジェクト型を作る
title: "Pick<T, Keys>"
---

`Pick<T, Keys>`は、型`T`から`Keys`に指定したキーだけを含むオブジェクト型を返すユーティリティ型です。

## Pick&lt;T, Keys>の型引数

### T

型引数`T`にはオブジェクト型を代入します。

### Keys

`Keys`にはオブジェクト型`T`のプロパティキーを指定します。オブジェクト型`T`に存在しないプロパティーキーを指定するとコンパイルエラーになります。

## Pickの使用例

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
type Person = Pick<User, "surname" | "middleName" | "givenName">;
```

上の`Person`は次の型と同じになります。

```ts
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
```

## Pickで型の変更に追従する例

書籍を扱うサービスを作ったとして、書籍を意味するオブジェクト`Book`が次のように定義されているとします。

```ts
type Book = {
  id: number;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};
```

これを参考にして`Book`を作成するための入力データとして`BookInputData`を作るとします。これは外部からのリクエストで作成され、`id, createdAt, updatedAt`はこのサービスで後付けで割り当てられるとすれば`BookInputData`は次になります。

```ts
type BookInputData = {
  title: string;
  author: string;
};
```

ここで`author`プロパティが`string`ではなく`Person`になる必要があったとします。`Book, BookInputData`を独立して定義しているとこの変更のために都度、各々の`author`プロパティを変更する必要があります。

```ts
type Book = {
  id: number;
  title: string;
  author: Person; // 変更箇所
  createdAt: Date;
  updatedAt: Date;
};

type BookInputData = {
  title: string;
  author: Person; // 変更箇所
};
```

これらの定義が近くにある状態ならまだしも、異なるファイルにあれば非常に探し辛くなります。

そこで`BookInputData`を`Pick<T, K>`を使って定義しなおします。

```ts
type BookInputData = Pick<Book, "title" | "author">;
```

このようにすれば`BookInputData`は少なくとも`Book`とコード上の繋がりができる上に、`author`プロパティの型変更を自動で追従してくれるようになります。

## 関連情報

[Omit&lt;T, Keys>](omit.md)
