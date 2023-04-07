---
title: async
slug: /reference/asynchronous/async
---

`Promise`を利用した非同期処理をより簡単に書ける構文として`async`/`await`が存在します。
この構文を利用することで、非同期処理をより同期処理と同じような文脈で書くことができるようになります。
`async`/`await`は基本セットで使いますが、本ページでは`async`を主に取り上げます。

### `async`関数、`async`メソッド

関数、メソッドの前に`async`キーワードをつけると、たとえその関数内で`Promise`が返されていなくても、戻り値の型を`Promise`で包んで返します。`async`関数、メソッドの中では`await`キーワードを使うことができます。`await`については`await`のページをご参照ください。

[await](./await.md)

```ts twoslash
type User = {
  id: string;
  name: string;
  age: number;
};

declare function findById(id: string): Promise<any>;
// ---cut---
async function requestAsync(): Promise<number> {
  return 1;
}

const fetchAsync = async (): Promise<number> => {
  return 1;
};

class UserRepository {
  async find(id: string): Promise<User> {
    const { name, age } = await findById(id);

    return {
      id,
      name,
      age,
    };
  }
}
```

この例では`Promise`ではない定数を返していますが`async`関数はその戻り値を`Promise`で包んでいます。

```ts twoslash
async function requestAsync(): Promise<number> {
  return 1;
}

// requestAsyncはこれと同じ
function request(): Promise<number> {
  return new Promise((resolve) => {
    resolve(1);
  });
}

requestAsync().then((result) => {
  console.log(result);
  // @log: 1
});
```

### `async`関数の宣言

JavaScriptにはみっつの関数の宣言方法がありますが、それらを`async`関数として宣言することもできます。

```ts twoslash
async function requestAsync1(): Promise<number> {
  return 1;
}

const requestAsync2 = async function (): Promise<number> {
  return 1;
};

const requestAsync3 = async (): Promise<number> => {
  return 1;
};
```

### `async`メソッドとアクセス修飾子

メソッドでアクセス修飾子をつけたい場合は`async`の前につけます。

```ts twoslash
type User = {
  id: string;
  name: string;
  age: number;
};

declare function findById(id: string): Promise<any>;
// ---cut---
class UserRepository {
  public async find(id: string): Promise<User> {
    const { name, age } = await findById(id);

    return {
      id,
      name,
      age,
    };
  }
}
```

### `async`関数、メソッドの戻り値

`async`関数は`Promise`を戻り値として返すことも可能です。このとき`Promise<Promise<T>>`のように`Promise`が二重に包まれることはなく、`Promise<T>`となります。

```ts twoslash
async function requestAsync(): Promise<number> {
  return new Promise((resolve) => {
    resolve(1);
  });
}

requestAsync().then((result) => {
  console.log(result);
  // @log: 1
});
```

### `async`関数、メソッドをreject(拒否)する

`async`関数、メソッドを拒否するためには`async`関数、メソッド内で`throw`を使うだけです。

```ts twoslash
async function requestAsync(): Promise<number> {
  throw new Error("error");
}
```

これで`requestAsync`が返す`Promise`はreject(拒否)されます。
