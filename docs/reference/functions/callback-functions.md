---
sidebar_label: "コールバック関数"
---

# コールバック関数 (callback functions)

コールバック関数とは、関数の引数として渡される関数です。関数の中で引数で指定した関数を呼び出す（コールバックする）ことで関数の振る舞いを制御したり、非同期な結果を受け取ることができます。
コールバック関数という言語レベルの構文が存在する訳ではなく、設計パターンのひとつとしてコールバック関数と呼ばれています。

## コールバック関数の使い方

### 関数の振る舞いの制御

コールバック関数はある関数の振る舞いの一部を外側から制御したい時に利用できます。

`greetNewUser`は「ご新規さん」に挨拶をする関数です。
`hello`関数と`goodMorning`関数をそれぞれコールバック関数として渡すことで、どのように挨拶するかの振る舞いを制御しています。

```ts twoslash
function greetNewUser(func: (name: string) => string) {
  console.log(func("ご新規さん"));
}

function hello(name: string) {
  return `こんにちは！${name}さん！！`;
}

function goodMorning(name: string) {
  return `おはようございます！${name}さん！！`;
}

// こんにちは！ご新規さん!!
greetNewUser(hello);

// おはようございます！ご新規さん!!
greetNewUser(goodMorning);
```

### 非同期な結果の受け取り

コールバック関数は非同期な関数の結果を受け取って処理をしたい場合にも利用できます。

次の例はNode.jsのfsモジュールのファイル読み込みのサンプルコードです。
ファイルの読み込みが非同期で実行され、読み込みが完了した後にコールバック関数が呼ぶことで、非同期な読み込み結果を呼び出し側へ渡すことができます。

```ts twoslash
import fs from "fs";

fs.readFile("./user.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});
```

### コールバック関数地獄

次のサンプルコードは

1. Aファイルを読み込み
2. Aファイルに記述されたBファイルを読み込む
3. Bファイルに記述されたCファイルを読み込む

という形でファイル読み込みをしています。

このようにコールバック関数の中でコールバック関数を呼び出すことでネストが深くなり、コードが読みづらくなる問題をコールバック地獄と呼びます。

```ts twoslash
import fs from "fs";

fs.readFile("./a.txt", "utf-8", (err, data) => {
  fs.readFile(data, "utf-8", (err, data) => {
    fs.readFile(data, (err, data) => {
      console.log(data);
    });
  });
});
```

このような場合には、コールバック関数を使用せずにPromiseを利用することで解消ができます。

コールバック地獄の問題を解消するために、Promiseが登場して以降は非同期処理の結果を取得する場合には、コールバック関数を用いずにPromiseを利用することが一般的になっています。

```ts twoslash
import { promises as fs } from "fs";

fs.readFile("a.txt", "utf-8")
  .then((data) => fs.readFile(data, "utf-8"))
  .then((data) => fs.readFile(data, "utf-8"))
  .then((data) => console.log(data));
```

## コールバック関数の型定義

コールバック関数の型は`(arg: [引数の型]) => [戻り値の型]`と記述します。
コールバック関数はただの関数なので、引数の型として関数の型宣言をしているだけです。

[関数の型宣言](./function-type-declaration.md)

```ts twoslash
function greetNewUser(func: (name: string) => string) {
  console.log(func("ご新規さん"));
}
```

## 同期型と非同期型

使い方の例でも見たように、コールバック関数には同期型と非同期型が存在します。

### 同期型のコールバック関数

同期型のコールバック関数は同期的にすぐに呼ばれるコールバック関数です。
代表的な例としては、標準APIの`Array.map`の引数が同期型のコールバック関数を受け取ります。

```ts twoslash
const numbers = [1, 2, 3];
const doubles = numbers.map((n: number) => {
  return n * 2;
});

// 2, 4, 6
console.log(doubles);
```

### 非同期型のコールバック関数

非同期型のコールバック関数はAPIリクエストなど非同期に呼ばれるコールバック関数です。
代表的な例としては、`setTimeout`の引数が非同期型のコールバック関数を受け取ります。

次の例では、`setTimeout`に渡したコールバック関数が1秒後に非同期に呼ばれ、
`hello`, `This is callback function!`の順番でコンソールに結果が表示されます。

```ts twoslash
setTimeout(() => {
  console.log("This is callback function!");
}, 1000);

console.log("hello");

// hello
// This is callback function!
```

### 同期型コールバック関数と非同期処理

`Array.map`などの同期型コールバック関数にPromiseを返す非同期関数を渡した場合は、どうなるでしょうか？

`doublePromise`は渡された値を2倍にする処理を非同期に実行して値を返す非同期関数です。
このとき`doublePromise`は非同期関数のため2倍した値ではなくPromiseを返すため、`doubles`はPromiseの配列となります。

```ts twoslash
function doublePromise(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n * 2);
    }, 100);
  });
}

const numbers = [1, 2, 3];
const doubles = numbers.map(doublePromise);

// [Promise: {}, Promise: {}, Promise: {}]
console.log(doubles);
```

同期型のコールバック関数に非同期関数を渡した場合は、Promiseの結果を解決するようにする必要があります。

```ts twoslash
function doublePromise(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n * 2);
    }, 100);
  });
}

(async function () {
  const numbers = [1, 2, 3];
  const doubles = await Promise.all(numbers.map(doublePromise));

  // [2, 4, 6]
  console.log(doubles);
})();
```

`Array.map`はコールバック関数として非同期関数も受け取るように型指定がされているため、型エラーは発生しません。
コールバック関数の型指定が同期関数だけ受け取る場合は、非同期関数を渡した時に型エラーが発生します。

```ts twoslash
// @errors: 2345

type User = {
  name: string;
};

function greetUser(getUser: () => User) {
  const user = getUser();
  console.log(`Hello, ${user.name}`);
}

function fetchUserFromDB(): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({ name: "太郎" });
    }, 1000);
  });
}

greetUser(fetchUserFromDB);
```
