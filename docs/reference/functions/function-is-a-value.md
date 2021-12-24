# 関数は値

他の言語では関数は特別な立ち位置のことがあります。ある言語では、同じ名前の変数を定義してもエラーにならないのに対し、同じ名前の関数定義はエラーになります。またある言語では、関数を変数に代入できなかったりします。

JavaScriptの関数は値です。つまり、PHPのような他の言語と比べると特別扱いの度合いが少ないです。たとえば、関数を変数に代入することができます。

```js
function hello() {
  return "Hello World";
}

const helloWorld = hello; // 関数を変数に代入

helloWorld(); // 関数呼び出しも問題なくできる
```

また、JavaScriptでは定義済みの関数と同じ名前の関数を宣言することができます。これはエラーにはなりません。これは実質、再代入のような振る舞いになります。

```js twoslash
function hello() {
  return "HELLO";
}

// これは二度目の関数宣言ですが、実質的には再代入です
function hello() {
  return "KONNICHIWA";
}

hello();
// @log: KONNICHIWA
```

このようにJavaScriptの関数は、bool値やstring値などと同じような値としての性質があります。意図しない再代入はバグの原因になりますが、JavaScriptでは関数宣言では注意して書く以外に方法はありません。

JavaScriptで関数の再代入によるバグを未然に回避したい場合は、`const`と関数式を組み合わせます。関数式については後述します。

```js
const hello = function () {
  return "HELLO";
};
```

ちなみに、TypeScriptではコンパイラーが重複した関数宣言を警告してくれるので、バグの心配はありません。

## 関数のスコープ

関数は値なので、関数名のスコープも変数と同じようにスコープの概念があります。たとえば、関数スコープの中で定義された関数は、そのローカルスコープでのみ使うことができます。

```js twoslash
function main() {
  // ローカルスコープの関数
  function hello() {
    console.log("hello");
  }

  hello();
}

main();
// @log: "hello"

// ローカルスコープで宣言された関数にはアクセスできない
hello();
// @error: ReferenceError: hello is not defined
```
