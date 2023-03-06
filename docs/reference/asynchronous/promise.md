---
title: Promise<T>
slug: /reference/asynchronous/promise
---

`Promise`はES2015から追加された機能で、非同期処理を見通しよく書くことができます。ES2017で導入された`async`/`await`を使うことで`Promise`で書いたコードをさらに見通しよく書くことができます。

## `Promise`がなかった時代のこと

次のみっつのAPIがあるとしてこれらで得た結果を表示する処理を考えてみます。

1. API1: リクエストを送り、結果を受け取る
1. API2: API1の結果を使ってリクエストを送り、結果を受け取る
1. API3: API2の結果を使ってリクエストを送り、結果を受け取る

API1, API2, API3の通信をする関数`request1()`, `request2()`, `request3()`は次のようになります。各関数の`setTimeout()`はAPI通信をしている部分の遅延を意味している程度に考えてください。

```js twoslash
// API1. 非同期でAPIにリクエストを送って値を取得する処理
function request1(callback) {
  setTimeout(() => {
    // 1 は適当な例、なんでもいいです
    callback(1);
  }, 1000);
}

// API2. 受け取った値を別のAPIにリクエストを送って値を取得する処理
function request2(result1, callback) {
  setTimeout(() => {
    callback(result1 + 1);
  }, 1000);
}

// API3. 受け取った値を別のAPIにリクエストを送って値を取得する処理
function request3(result2, callback) {
  setTimeout(() => {
    callback(result2 + 2);
  }, 1000);
}
```

これらの関数を組み合わせてみっつのAPIリクエストを順次実装すると次のようになります。

```js twoslash
request1((result1) => {
  request2(result1, (result2) => {
    request3(result2, (result3) => {
      console.log(result3);
      // @log: 4
    });
  });
});
```

次のAPIにリクエストを投げるためにひとつ前の非同期なAPIリクエストの結果を待つ必要があり、関数の呼び出しが入れ子になってしまいます。
これを**コールバック地獄**と呼び、ネストが深くコードの記述が非常に複雑になってしまう問題があります。ちなみにコールバック地獄は英語でもCallback hellと呼びます。どの世界でも地獄は地獄です。

## `Promise`が解決してくれること

先ほどの例を`Promise`を使って書き直してみます。

```js twoslash
// 非同期でAPIにリクエストを投げて値を取得する処理
function request1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result1 + 1);
    }, 1000);
  });
}

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result2 + 2);
    }, 1000);
  });
}
```

戻り値が`Promise`になり、コールバック関数を示す引数がなくなりました。`Promise`を返す関数を使うと次のようにみっつのAPIリクエストを実装できます。

```js twoslash
request1()
  .then((result1) => {
    return request2(result1);
  })
  .then((result2) => {
    return request3(result2);
  })
  .then((result3) => {
    console.log(result3);
    // @log: 4
  });
```

先ほどのコールバックの例と比べると非常にスッキリ書けるようになりました。

## `Promise`とジェネリクス

TypeScriptで`Promise`の型を指定する場合はジェネリクスを伴い`Promise<T>`と書きます。`T`には`Promise`が履行された(fulfilled)ときに返す値の型を指定します。今回の例では`resolve(1)`と履行する値として数値を渡しているので`Promise<number>`を指定しています。
たとえば、独自で定義した型の値を履行する場合は次のように記述します。

```ts twoslash
type User = {
  name: string;
  age: number;
};

function getUser(): Promise<User> {
  return new Promise((resolve) => {
    const user: User = {
      name: "太郎",
      age: 10,
    };
    resolve(user);
  });
}

getUser().then((user: User) => {
  console.log(user);
  // @log: { "name": "太郎", "age": 10 }
});
```

`Promise`のジェネリクスの型`T`は必須なので、省略した場合はコンパイルエラーになります。

```ts twoslash
// @errors: 2314
function request(): Promise {
  return new Promise((resolve) => {
    resolve(1);
  });
}
```

ジェネリクスの型`T`と返す値の型が合わない場合もコンパイルエラーになります。

```ts twoslash
// @errors: 2345
function request(): Promise<string> {
  return new Promise((resolve) => {
    // string型を期待しているが、number型を返しているのでコンパイルエラー
    resolve(1);
  });
}
```

## `Promise`のメソッド

`Promise<T>`には覚えておくべきメソッドがみっつあります。

### 待ち受けた非同期処理の結果をコールバックで実行する - `Promise.prototype.then()`

`Promise<T>`が履行された(fulfilled)ときに呼び出されます。引数に使われるコールバックの第1引数は`T`型の値です。
コールバックの戻り値として`S`型または`Promise<S>`型の値を返すと`Promise<S>`型を返します。

```ts twoslash
const promise1: Promise<number> = Promise.resolve(1);
const promise2: Promise<string> = promise1.then((value) => `${value}`);
```

上記例は`then()`のたびに新しく定数を定義していますが。上述のとおり`then()`でメソッドチェーンできます。

```ts twoslash
const promise: Promise<boolean> = Promise.resolve("1")
  .then((value) => Number(value)) // Promise<number>型になる
  .then((value) => value > 0); // Promise<boolean>型になる
```

コールバック内で例外を投げるとそのPromiseは拒否されます。

```ts twoslash
Promise.resolve(1)
  .then(() => {
    throw new Error();
  })
  .then(() => {
    console.log("fulilled");
  })
  .catch(() => {
    console.log("rejected");
  });
// @log: 'rejected'
```

同様に、コールバック内で拒否された`Promise`を返すとそのPromiseは拒否されます。

```ts twoslash
Promise.resolve(1)
  .then(() => {
    return Promise.reject(new Error());
  })
  .then(() => {
    console.log("fulilled");
  })
  .catch(() => {
    console.log("rejected");
  });
// @log: 'rejected'
```

### 待ち受けた非同期処理の拒否の結果をコールバックで実行する - `Promise.prototype.catch()`

`Promise<T>`が拒否された(rejected)ときに呼び出されます。引数に使われるコールバックの第1引数は`any`型の値です。
これもコールバックの戻り値として`S`型または`Promise<S>`型の値を返すと`Promise<S>`型を返します。

```ts twoslash
const promise1: Promise<number> = Promise.reject(new Error());
const promise2: Promise<string> = promise1.catch((e) => e.message);
```

`catch()`は`Promise`が履行されている状態だと実行されません。そのため`catch()`のあとに`then()`をつなげると実行されたときの型と実行されなかったときの型の両方を考える必要があります。

```ts twoslash
Promise.resolve(1)
  .catch(() => {
    return "1";
  })
  // string | number型になる
  .then((value: string | number) => {
    console.log(value);
  });
```

ただし`catch()`のあとに`then()`を書くというより、`then()`のあとに`catch()`を書くほうが多いでしょう。

```ts twoslash
Promise.resolve(1)
  .then((num: number) => {
    return `${num}`;
  })
  .then((str: string) => {
    return str.length > 1;
  })
  .catch((e: any) => {
    console.log(e.message);
  });
```

### 待ち受けた非同期処理が終了次第コールバックを実行する - `Promise.prototype.finally()`

`Promise<T>`が決定された(settled)ときに呼び出されます。コールバックに引数はありません。
このメソッドは戻り値を設定することはできません。
`finally()`はES2018になって追加されました。

## `Promise`の静的メソッド

静的メソッドでも覚えておくべき大事なメソッドがあります。

### すべての非同期処理の結果を待ち受ける - `Promise.all()`

第1引数に要素が`Promise`の配列を取り、それらの実行結果を非同期で待ち受けます。戻り値は`Promise`が解決される時間にかかわらず配列に与えられた順番どおりにPromiseの結果が返ります。

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
}

Promise.all([request1(), request2(), request3()]).then(([num1, num2, num3]) => {
  // request1が一番終了するまで遅いが結果の順番は保持され、num1がrequest1の結果になる
  console.log(num1, num2, num3);
  // @log: 1, 2, 3
});
```

与えられた`Promise`のうちひとつでも拒否された場合`Promise.all()`は拒否されます。

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("failed1"));
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("faied2"));
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("failed3"));
    }, 1000);
  });
}

Promise.all([request1(), request2(), request3()])
  .then(([num1, num2, num3]) => {
    console.log(num1, num2, num3);
  })
  .catch((e) => {
    // 最も早く終わった例外が返る
    console.log(e.message);
    // @log: 'failed3'
  });
```

### 履行された`Promise`を返す - `Promise.resolve()`

履行された`Promise`を返します。

```ts twoslash
const promise: Promise<number> = Promise.resolve(4);
```

### 拒否された`Promise`を返す - `Promise.reject()`

拒否された`Promise`を返します。

```ts twoslash
const promise: Promise<string> = Promise.reject(new Error("failed"));
```

### `Promise`を履行、拒否にかかわらずすべて待ち受ける - `Promise.allSettled()`

第1引数に与えられたすべての`Promise`が決定される(settled)まで実行します。決定とは履行か拒否のことであり、ひとつでも拒否されると終了する`Promise.all()`と異なり、すべてが履行されるか拒否されるまで処理を待ちます。
戻り値は判別可能なユニオン型として返ります。

[判別可能なユニオン型](../../reference/values-types-variables/discriminated-union.md)

`allSettled`はES2020になって追加されました。

```ts twoslash
function request1(): Promise<number> {
  return Promise.resolve(1);
}

function request2(): Promise<number> {
  return Promise.reject(new Error("failed"));
}

Promise.allSettled([request1(), request2()]).then((values) => {
  console.log(values);
  // @log: { status: "fulfilled", value: 1}, { status: "rejected", reason: {}}
  // reason はエラーのオブジェクト
});
```

### いちばん初めに決定された`Promise`を返す - `Promise.race()`

`Promise.all()`のように第1引数に要素が`Promise`の配列を取り、それらをすべて非同期で実行しますが、その中のうちもっとも早く決定された`Promise`の結果を履行、拒否に関係なく返します。

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
}

Promise.race([request1(), request2(), request3()]).then((num) => {
  console.log(num);
  // @log: 3
});
```

次の例は一番初めに決定される`Promise`が拒否される場合の例です。

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("failed"));
    }, 1000);
  });
}

Promise.race([request1(), request2(), request3()])
  .then((num) => {
    console.log(num);
  })
  .catch((e) => {
    console.log(e.message);
    // @log: 'failed
  });
```

## `Promise`ふかぼり

### `Promise`の状態

文章中にも何度も出てきましたが、`Promise`にはみっつの状態があります。

- pending
- fulfilled
- rejected

pendingは待機中という意味で、まだ待ち受けている非同期処理が完了していないときの状態を示します。fulfilledは履行という意味で、待ち受けている非同期処理が完了し、意図している状態（例外が発生しなかった）になったことを示します。rejectedは拒否という意味で、待ち受けている非同期処理が例外とともに完了したことを示します。
fulfilledとrejectedを合わせてsettledということがあります。このsettledは決定という意味です。
