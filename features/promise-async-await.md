# Promise / async / await

`Promise`はES2015から追加された機能で、非同期処理を見通しよく書くことができます。ES2017で導入された`async / await`を使うことで`Promise`で書いたコードをさらに見通しよく書くことができます。

ここでは`Promise`の詳細な説明は割愛させて頂きます。

次のドキュメントが非常に分かりやすくまとめて頂いているので、最初にこちらを読み  
進めて`Promise`について学ぶことをオススメします。

[非同期処理:コールバック/Promise/Async Function · JavaScript Primer \#jsprimer](https://jsprimer.net/basic/async/)

ここでは、TypeScriptで`Promise`を使う場合に注意する点を記載していきます。

## コールバック地獄

次の3つのAPIがある時に、API3で得た結果を表示する処理を考えてみます。

* API1:  何かの値を返す
* API2: API1の結果をリクエストで受け取る
* API3: API2の結果をリクエストで受け取る

```typescript
// 非同期でAPIにリクエストを投げて値を取得する処理
function request1(callback: (result1: number) => void) {
    setTimeout(function() { 
        callback(1);
    }, 1000);
};

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number, callback: (result2: number) => void) {
    setTimeout(function() { 
        callback(result1+1);
    }, 1000);
};

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number, callback: (result3: number) => void) {
    setTimeout(function(){ 
        callback(result2+2)
    }, 1000);
};

// コールバック地獄
// 一つ前のAPIの結果を待って次のAPIをリクエストするために
// コールバック関数が入れ子になってしまう
request1(function (result1) {
    request2(result1, function (result2) {
        request3(result2, function (result3) {
            console.log(result3); // 4
        });
    });
});
```

次のAPIにリクエストを投げる為に、ひとつ前の非同期なAPIリクエストの結果を待つ必要があり、関数の呼び出しが入れ子になってしまいます。  
これを**コールバック地獄**と呼び、ネストが深くコードの記述が非常に複雑になってしまう問題があります。

## Promiseとジェネリクス

先ほどの例を`Promise`を使って書き直してみます。

```typescript
// 非同期でAPIにリクエストを投げて値を取得する処理
function request1(): Promise<number> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(1);
        }, 1000);
    });
};

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number): Promise<number> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(result1+1);
        }, 1000);
    });
};

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number): Promise<number> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(result2+2);
        }, 1000);
    });
};

request1()
.then(function(result1){
    return request2(result1);
})
.then(function(result2){
    const result3 = request3(result2);
    console.log(result3); // 4
});
```

先ほどのコールバックの例と比べると非常にスッキリ書けるようになりました。

ここで注目するべきは `request1()` 関数の戻り値を `Promise<number>` と型指定をしている箇所です。

TypeScriptで`Promise`の型を指定する場合は、`Promise<T>` と書きます。`T` には`Promise`が解決 \(resolve\) された時に渡す値の任意の型を指定します。

今回の例では `resolve(1);` と解決する値として数値を渡しているので`Promise<number>` を指定しています。

たとえば、独自で定義した型の値を解決する場合は次のように記述します。

```typescript
type User = {
    name: string;
    age: number;
}

function getUser(): Promise<User> {
    return new Promise(function(resolve) {
        const user: User = {
            name: '太郎',
            age: 10,
        };
        resolve(user);
    })
}

const user = getUser();
console.log(user);
```

`Promise`のジェネリクスの型 `T` は必須なので、省略した場合はコンパイルエラーになります。

```typescript
// Generic type 'Promise<T>' requires 1 type argument(s)
function request(): Promise {
    return new Promise(function(resolve) {
        resolve(1); 
    });
}
```

ジェネリクスの型`T` と返す値の型が合わない場合もコンパイルエラーになります。

```typescript
function request(): Promise<string> {
    return new Promise(function(resolve) {
        // string型を期待しているが、number型を返しているのでコンパイルエラー
        // Argument of type '1' is not assignable to parameter 
        // of type 'string | PromiseLike<string> | undefined'.
        resolve(1); 
    });
}
```

## async / await

`Promise`を利用した非同期処理をより簡単に書ける構文として`async /await`が存在します。  
この構文を利用することで、非同期処理をより同期処理と同じような文脈で書くことができるようになります。

### async関数

関数の前に`async`キーワードをつけることで、その関数は非`Promise`の値を返す時にその値を解決した`Promise`を返すようになります。

```typescript
async function request_async(): Promise<number> {
    return 1;
}

// asyncを使わずに書いた場合
function request(): Promise<number> {
    return new Promise(function(resolve) {
        resolve(1);
    });
}

request_async()
.then(function(result){
    console.log(result) // 1
});
```

`Promise`をそのまま返すことも可能です。二重に`Promise`がラップされることはありません。

```typescript
async function request_async(): Promise<number> {
    return new Promise(function(resolve) {
        resolve(1);
    });
}

request_async()
.then(function(result){
    console.log(result) // 1
});
```

### await

`await`は Promiseの値が解決されるまで実行を待機して、解決された値を返します。

`await`の注意点として **`await`は`async`関数の中でのみ利用することができます。**

```typescript
// 1秒後に値を返す
function request(): Promise<string> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve('hello');
        }, 1000);
    });
}

// この書き方はできない
// const result = await request();
// console.log(result);

async function main() {
    const result = await request();
    console.log(result);
}

main();
```

この例では `await request()` の行で `request()` が`Promise`を解決するまで1秒待機し、コンソールに`"hello"`と表示します。

### async / awaitで書き直す

最後に3つのAPI呼び出しのコードを`async / await`を利用して書き直してみます。

このように`async / await`を利用することで、非同期の処理を同期処理のようにスッキリ書くことができるようになります。

```typescript
// 非同期でAPIにリクエストを投げて値を取得する処理
function request1(): Promise<number> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(1);
        }, 1000);
    });
};

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number): Promise<number> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(result1+1);
        }, 1000);
    });
};

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number): Promise<number> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(result2+2);
        }, 1000);
    });
};

async function main() {
    const result1 = await request1();
    const result2 = await request2(result1);
    const result3 = await request3(result2);
    console.log(result3);
}

main();
```

