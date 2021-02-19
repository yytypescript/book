# 型推論 \(Type Inference\)

TypeScriptには型推論の機能があります。コンパイラが型を自動で判別してくれるため、すべての箇所で型アノテーションを書く必要がなくコードの記述量を大幅に減らすことができます。

## 型推論とは？

冒頭でも述べたように、型推論とはコンパイラが**型を自動で判別する**機能のことです。

```typescript
// let x: number
let x = 1;

// Error: Type 'string' is not assignable to type 'number'.
x = 'hello';
```

上の例では変数`x`に`1`の値を代入しています。この時点でコンパイラは代入された値から、変数`x`の型を`number`型と自動で判別します。その後、`hello`の文字列を再代入をしていますが、コンパイラは`number`型の変数に`string`型の値が代入されることを検知して、型の不一致によりコンパイルエラーとなります。

## 動的型付けとの違い

型を書かないという意味では、RubyやPHPなどの動的型付け言語でも同様です。型推論と動的型付けは何が違うのでしょうか？

型推論はコンパイルのタイミングで型が決定され、その型が変更されることはありません。型をプログラマが書くかコンパイラが自動で決めるという点で違いがあり、あくまで静的型付けの世界に閉じた話になります。

次のTypeScriptの例では、変数`x`が型推論により `number`型として決定され、以降は常に `number`型として振舞います。

```typescript
// TypeSciprtでの例
// let x: number
let x = 1;

// Error: Type 'string' is not assignable to type 'number'.
x = 'hello'; // x はnumber型と決定しているのでstring型を代入するとエラー

// Property 'substring' does not exist on type 'number'.
console.log(x.substring(1,3))
```

一方、動的型付けでは実行時に型が決まるので、実行タイミングにより型が変化します。

次のJavaScriptの例では、最初に`1`の値が代入され変数`x`の型は`number`型となります。その後、`hello`の文字列を代入することで 変数`x`の型は `string`型に変更されます。このように実行タイミングで型が変化するので、型推論ではエラーになる処理も動的型付け言語では正常に動作します。

```javascript
// JavaScriptでの例
let x = 1; // x はnumber型となる
x = 'hello'; // x はstring型となる

// output: "el"
console.log(x.substring(1,3))
```

## 色々な型推論

### 変数代入

変数は代入している値から型が推論されます。

```typescript
// 代入する値から型が推論され x はnumber[]型になる
const x = [1, 2, 3];
```

### 関数の引数

関数の引数の型を省略した場合は、型を決定するヒントが無いので`any`型になります。

```typescript
// const add = (a: any, b: any) => any
function add(a, b) {
    return a + b;
}

// 引数はany型なので、何でも渡せる
const x = add([1, 2, 3], 'hello');
```

ただし、次の例のように定義済みの関数プロパティに再代入する形で関数を上書きする場合は`button.onclick`の引数`event`の型が`MouseEvent`と定義されているため、その型情報から代入する関数の引数の型を省略しても、`event`の型を`MousetEvent`と推論してくれます。

このようにTypeScriptでは文脈上の流れから型を推論することもできます。

```typescript
const button = document.createElement('button');

// event は MouseEvent型になる
button.onclick = function(event) {
    console.log(event.target);

    // Property 'hoge' does not exist on type 'MouseEvent'.(2339)
    console.log(event.hoge);
}
```

### 関数の戻り値

関数は実際に返している値で戻り値の型が推論されます。

```typescript
// 戻り値の型はnumber型
// const add = (a: number, b: number) => number
const add = function(a: number, b: number) {
    return a+b;
}
```

`return`が複数あり違う型を返している場合推論される型はユニオン型になります。

```typescript
type Person = {
  age?: number;
};

// 戻り値の型はnumber | null型
function getAge(person: Person) {
  if (typeof person.age === 'undefined') {
    return null;
  }

  return person.age;
}
```

### クラスのプロパティ

クラスのインスタンスプロパティは宣言時に型を省略した場合でもコンストラクタで値が代入される場合は、代入する値で型が推論されます。下の例ではコンストラクタで`string`の型の値を代入しているため`_name`は`string`型となります。

```typescript
class User {
    private _name;

    constractor(name: string) {
        this._name = name;
    }

    hello() {
        // _name は string型 として型推論されるので、コンパイルエラー
        // Property 'hoge' does not exist on type 'string'.(2339)
        console.log(`Hello, ${this._name.hoge()}`);
    }
}
```

しかし、setterなどを利用して変数に値を代入する場合は`any`型として推論されます。

```typescript
class User {
    private _name;

    set name(value: string) {
        this._name = value;
    }

    hello() {
        // _name は any型として型推論されるので、コンパイルエラーにならない。
        console.log(`Hello, ${this._name.hoge()}`);
    }
}
```

## 型を書くとき書かないとき

型推論のおかげで私たちは型を書かなくてもコンパイラが自動で型を決定してくれます。では、どんな時に型アノテーションを書いてどんな時に省略するのがよいのでしょうか？

これに関しては明確な正解はありません。コードの読みやすさを考慮して、すべての箇所で型を書いてもよいですし、少しでも記述量を減らすために型推論をしてくれる箇所は積極的に型を書かない選択をしてもOKです。

ここではひとつの参考意見として、どんな時に型を書いてどんな時に型を省略するかを記載します。

### 変数代入

変数代入では代入している値を見れば型がわかるので、型を書かないことが多いです。

```typescript
// 型を省略するケース
const x = 1;
const user = new User('taro');
```

空配列を初期値として代入する場合やletで変数定義をする場合は`any`型になってしまうので、こういったケースでは積極的に型アノテーションを書いていきます。

```typescript
// 型を省略すると any となる例
let y; // any型になる
let list = [];  // any[] となる

// 型を書く
let y: string;
let list: number[] = [];
```

### 関数の引数

関数の引数は型アノテーションを書きます。型を省略した場合は`any`型になってしまうため、型の恩恵が受けられなくなってしまいます。

```typescript
// name はany型になる。
// 引数でnumber型などを渡してもコンパイルエラーにならない
function hello(name) {
    console.log(`Hello, ${name.toUpperCase()}`);
}

// 関数の引数は型アノテーションを書く
function hello(name: string) {
    console.log(`Hello, ${name}`);
}
```

### 関数の戻り値

関数の戻り値の型アノテーションは場合によって書き分けます。たとえば、`add()`関数のように関数自体がシンプルでどのような型が返ってくるかが、自明の場合は型アノテーションを省略します。

```typescript
function add(a: number, b: number) {
    return a + b;
}
```

別の例としてユーザー情報を取得する`getUser()`関数を考えてみます。この関数では`UserRepository`クラスに処理を委譲しており具体的な実装は`getUser()`に書かれているため、`getUser()`関数の戻り値の型を知るためには`userRepository.getUser()`の戻り値の型を確認する必要があります。こういった場合には、関数の戻り値として型アノテーションが書いてあると他の人がコードを読みやすくなります。

```typescript
function getUser(id: number) {
  const userRepository = new UserRepository();
  return userRepository.getUser();
}

// 処理を委譲している場合は戻り値の型アノテーションを書いておくと読みやすくなる
function getUser(id: number): User {
  const userService = new userRepository();
  return userService.getUser();
}
```

もうひとつ、別の関数としてユーザー情報を取得するAPIリクエストの処理をラップした`fetchUser()`関数を考えてみます。`response.json()`はFetch APIで取得したレスポンスをJSONオブジェクトにパースしており、このときの型は`Promise<any>`となるため、この関数で型アノテーションを省略した場合は`fetchUser()`関数の戻り値も`Promise<any>`となってしまいます。

```typescript
// 戻り値の型は Promise<any> になる
async function fetchUser() {
  // ユーザー情報を取得する架空のAPI
  const response = await fetch('https://example.com/api/v1/user?id=1');
  return response.json();
}

// user は any型 
fetchUser()
.then(user => console.log(user));
```

こういった場合には、関数の戻り値の型アノテーションを書くことで呼び出し側で値が`any`として扱われることを防ぐことができます。

```typescript
// 戻り値の型は Promise<User> になる
async function fetchUser(): Promise<User> {
  // ユーザー情報を取得する架空のAPI
  const response = await fetch('https://example.com/api/v1/user?id=1');
  return response.json();
}

// user は User型 
fetchUser()
.then(user => console.log(user));
```

### クラスのプロパティ

クラスのインスタンスプロパティは型を書くケースが多いです。先ほどの型推論の例でコンストラクタで代入する場合には型が推論されると書きましたが、プロパティに型アノテーションを書いてある方がコードが読みやすくなります。

```typescript
class User {
    private _name: string;
    private _age: number;

    constractor(name: string) {
        this._name = name;
    }

    set age(value: number) {
        this._age = value;
    }
}
```

