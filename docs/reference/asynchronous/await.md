---
title: await
slug: /reference/asynchronous/await
---

`Promise`を利用した非同期処理をより簡単に書ける構文として`async /await`が存在します。
この構文を利用することで、非同期処理をより同期処理と同じような文脈で書くことができるようになります。
`async / await`は基本セットで使いますが、本ページでは`await`を主に取り上げます。

### `await`

`await`は`Promise`の値が解決されるまで実行を待機して、解決された値を返します。

`await`の注意点として**基本的に`await`は`async`関数の中でしか使えません。**

```ts twoslash
// 1秒後に値を返す
function request(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("hello");
    }, 1000);
  });
}

// この書き方はできない
// const result = await request();
// console.log(result);

async function main() {
  const result = await request();
  console.log(result);
  // @log: "hello"
}

main();
```

この例では`await request()`の行で`request()`が`Promise`を解決するまで1秒待機し、コンソールに`"hello"`と表示します。

### `async`/`await`で書き直す

最後にみっつのAPI呼び出しのコードを`async`/`await`を利用して書き直してみます。

このように`async`/`await`を利用することで、非同期の処理を同期処理のようにスッキリ書くことができるようになります。

```ts twoslash
// 非同期でAPIにリクエストを投げて値を取得する処理
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result1 + 1);
    }, 1000);
  });
}

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result2 + 2);
    }, 1000);
  });
}

async function main() {
  const result1 = await request1();
  const result2 = await request2(result1);
  const result3 = await request3(result2);
  console.log(result3);
  // @log: 4
}

main();
```

### `Promise`を直接`await`する

関数を作らずに`Promise`を直接`await`することもできます。

```ts twoslash
async function main() {
  // 1秒後に値を返す
  await new Promise((resolve) => {
    setTimeout(() => resolve, 1000);
  });
}
```

### `async`関数を`await`する

`async`関数を`await`することもできます。

```ts twoslash
async function request(): Promise<string> {
  return "hello";
}

async function main() {
  const result = await request();
  console.log(result);
  // @log: "hello"
}
```

### `await`したときの型注釈

`Promise`, `async`関数の戻り値の型注釈は`Promise<T>`の`T`になります。

```ts twoslash
async function request(): Promise<string> {
  return "hello";
}

async function main() {
  const result: string = await request();
  // stringになる
  console.log(result);
  // @log: "hello"
}
```

### 拒否された`Promise`を`await`したとき

拒否された`Promise`を`await`したときは、`await`の呼び出し元で例外が発生します。

```ts twoslash
async function request(): Promise<string> {
  throw new Error("error");
}

async function main() {
  try {
    await request();
  } catch (error) {
    console.log(error);
    // @log: error
  }
}
```

### `then-catch`を`try-catch`に書き換える

`Promise`の`then`と`catch`を`try-catch`に書き換えることができます。次の`main2`関数は`main1`関数を`try-catch`で書き換えたものです。

```ts twoslash
async function request(): Promise<string> {
  return "hello";
}

function main1() {
  request()
    .then((result: string) => {
      console.log(result);
      // @log: "hello"
    })
    .catch((error: unknown) => {
      console.log(error);
    });
}

async function main2() {
  try {
    const result: string = await request();
    console.log(result);
    // @log: "hello"
  } catch (error: unknown) {
    console.log(error);
  }
}
```

### 拒否された`Promise`を`catch`する

拒否された`Promise`をそのまま関数の戻り値にしてしまうと拒否されたまま呼び出し元に戻されます。もし拒否された`Promise`を捕捉したい場合は、`return await`として例外を捕捉する必要があります。もしこの`Promise`が拒否されてなく、履行されている場合はそのまま呼び出し元に値を返します。

```ts twoslash
function request(): Promise<string> {
  throw new Error("error");
}

async function main() {
  try {
    // return await とすることでcatchで例外を捕捉できる
    return await request();
  } catch (error) {
    console.log(error);
    // @log: error
  }
}
```
