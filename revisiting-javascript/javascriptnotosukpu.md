# JavaScriptの変数とスコープ

JavaScriptは変数の宣言方法により変数のスコープ範囲が変化する言語です。変数宣言とスコープ範囲の関係を理解しないと予期せぬ所でバグを発生させる危険性があります。

## 変数宣言

JavaScriptの変数宣言には `var` ,`let` ,`const` の3種類の宣言方法があります。

`let` と `const` は `var` における問題を解消するために ES2015 から新たに追加された構文です。そのため、ES2015以前では `let` と `const` は利用できないので注意してください。

`var` には色々な問題が存在するので、新たにコードを書く場合には`var` は使わずに`let` と `const`を使うことを推奨します。

## var

ES2015以前から存在する一番最初のJavaScriptでの宣言方法です。  
次のように書くことで変数を宣言できます。

```javascript
var name = "taro";
```

`var` は変数を宣言する箇所でスコープの範囲が異なります。

### グローバル変数

関数の外で定義された `var` 変数はグローバル変数となり、全てのJSファイルやHTMLファイルのスクリプトから参照可能になります。またグローバル変数は `window` オブジェクトのプロパティとして定義されるので、`window` オブジェクトを介してアクセスすることもできます。

グローバル変数の定義はバグの原因になりやすいので、特別な理由が無い限り利用は避けることをオススメします。

```javascript
// a.js
var greeting = "こんにちは";

// b.js
function hello() {
    console.log(greeting); // こんにちは
}

console.log(greeting) // こんにちは
console.log(window.greeting) // こんにちは
```

### ローカル変数

関数内で定義された`var` 変数は関数内でのみ参照可能なローカル変数となります。

```javascript
function hello() {
    var greeting = "こんにちは”;
    console.log(greeting); // こんにちは
}

console.log(greeting); // undefined
```

`var` 変数は宣言されたコンテキストに依存するので、グローバル変数と同じ名前のローカル変数を宣言した場合には、実行箇所でそれぞれ別の変数が参照されます。

次の例は `hello` 関数内ではローカル変数である `greeting` 変数が参照され、`こんばんは` の文字列が表示されます。関数の外ではグローバル変数として宣言されている `greeting` 変数が参照されるため、`こんにちは`と表示されます。

```javascript
var greeting = "こんにちは";

function hello() {
    var greeting = "こんばんは";
    console.log(greeting); // こんばんは
}

console.log(greeting) // こんにちは
```

## varの問題

`var` による変数宣言には気をつけるべき挙動が何点か存在します。

### 同名の変数宣言

varの変数宣言では同じ変数名で宣言をした場合にエラーとならずに、後から宣言された変数が有効となります。これは思いがけず既存の変数を書き換えてしましい、意図しない結果を出力する可能性があります。

```javascript
function test() {
    var x = 1;
    var x = 2;
    console.log(x);
}
```

### グローバル変数の上書き

`var` はグローバル変数として定義されたときに、`window` オブジェクトのプロパティとして定義されるため、既存のプロパティを上書きする危険性があります。

例えば、ブラウザ上で `innerWidth` 変数をグローバル変数として定義してしまうと、標準API の `window.innerWidth` が上書きされるため、ブラウザの幅を変更しても常に同じ値が返ってくるようになってしまいます。

```javascript
var innerWidth = 10;
console.log(window.innerWidth) // 10
```

### 変数の巻上げ

JavaScriptで宣言された変数はスコープの先頭で変数が生成されます。これは一般に **変数の巻き上げ** と呼ばれています。

`var` で宣言された変数は、スコープの先頭で生成されて `undefined` で値が初期化されます。  
次の例では `greeting` 変数への参照はエラーとならずに `undefined` となります。

```typescript
console.log(greeting) // undefined
var greeting = "こんにちは";

// ↓ 巻き上げの影響で実際はこう実行される

var greeting;
console.log(greeting); // undefined
greeting = "こんにちは";
```

`var` での変数巻き上げでは参照エラーとならないため、意図せずに `undefined` の値を参照し予期せぬバグが発生する危険性があります。

### スコープ

JavaScript では `var` で宣言された変数のスコープは関数となるため、`{}` の中で変数宣言をしても最初に定義した変数 `x` は上書きされます。

```typescript
function print() {
    var x = 1;
    if (true) {
        var x = 2;
        console.log(x); // 2
    }
    console.log(x); // 2
}
```

## let と const

ES2015からは `var` に代わる新しい変数宣言の方法とし`let` と `const` が導入されました。

変数宣言の書き方は `var` の時と同じで、次のように宣言します。

```typescript
let x = 1;
const y = 2;
```

### 再代入

`let` では再代入が可能です。

```typescript
let x = 1;
x = 2; // 再代入ができる
```

`const` では変数への再代入が禁止されています。

```typescript
const y = 1;
y = 1; // Uncaught TypeError: Assignment to constant variable.
```

`const` で宣言された変数の再代入について注意すべきなのが、代入された**オブジェクトのプロパティは変更可能**であるという点です。`const` は変数への再代入を禁止しているだけなので、代入されている変数の値の操作は禁止されていません。これは配列の操作でも同様です。

```typescript
// オブジェクトのプロパティは変更できる
const user = { name: "taro", age: 10 };
user.age = 20;
console.log(user); // { name: 'taro', age: 20 }

// 配列の操作も同様
const fruits = ["banana", "apple"];
fruits.shift();
console.log(fruits); // ["apple"]
```

### 同名の変数宣言

`var` で可能だった同名の変数宣言はできません。

```typescript
let x = 1;
let x = 2; // SyntaxError: Identifier 'x' has already been declared

const y = 1;
const y = 2; // SyntaxError: Identifier 'y' has already been declared
```

### グローバル変数の上書き

`let` や `const` はグローバルなスコープで定義されることはないため、`window` オブジェクトのプロパティを不用意に上書きする心配はありません。

```typescript
const innerWidth = 10;
console.log(window.innerWidth) // 500
```

### 変数の巻き上げ

宣言前の変数を参照すると `Reference Error` が発生します。

```typescript
console.log(x); // ReferenceError
let x = 1;

console.log(y); // ReferenceError
const y = 2;
```

ただ、ここで注意すべきなのが `let` と `const` の場合でも**変数の巻上げは発生している** という点です。

では、なぜ `Reference Error` が発生するのでしょうか？

`var` は変数の巻上げが発生したタイミングで `undefined` で**変数を初期化している**ため、値の参照が可能となっていました。それに対して `let` と `const` は変数の巻上げが発生しても変数が評価されるまで **変数は初期化されません** 。そのため、初期化されていない変数を参照するため `Reference Error` が発生しているのです。

次の例では `let` や `const` で変数の巻き上げが発生しないなら `console.log(x)` の評価のタイミングで関数の先頭で宣言されている `var x = 1` が参照されて `1` が出力されるはずです。しかし、実際は `let` で宣言された変数 `x` がブロックスコープ内で初期化されていない状態で生成されるため、未初期化の `x` を参照して`Reference Error` が発生します。

```typescript
function output() {
    var x = 1;
    {
        console.log(x);　　// Reference Error
        let x = 2;
    }
}

output();
```

### スコープ

スコープはブロックスコープです。

次の例は`var` では変数 `x` が上書きされていましたが、ここではブロックスコープ内で異なる変数として別々に定義されています。

```typescript
public class Code {
    public static void main(String[] args) {
        const x = 1;
        if (ture) {
            const x = 2;
            System.out.println(x); // 2
        }
        System.out.println(x); // 1
    }
}
```

### let と const の使い分け

初めて JavaScript を書く場合に、`let` と `const` どちらの変数宣言を使えば良いか悩む場合があるかもしれません。

基本は `const`で変数宣言をして必要な場合にのみ `let` を使うのがオススメです。  
`const` で変数宣言することで再代入を禁止して、意図せず変数が書き換えらることを予防できるので、より安全なコーディングが可能になります。

