---
sidebar_label: 関数の引数
---

# 関数の引数 (function parameter)

## 引数の個数

JavaScriptの関数では、関数が期待する引数の個数と、関数を呼び出した際に渡した引数の数が一致していなくても、関数が呼び出せます。つまり、JavaScriptは引数のチェックを行わないということです。たとえば、引数が1つ渡されることを期待する関数を、引数2つで呼び出してもエラーになりません。

```js twoslash
function increment(n) {
  return n + 1;
}
increment(1, 2); // OK
```

逆に、JavaScriptでは、引数が少ない場合であっても関数が実行されます。その際、渡されなかった引数の値は`undefined`になります。

```js twoslash
function foo(a, b) {
  console.log(b);
}
foo(1); // 引数が足りない
// @log: undefined
```

基本的に引数が多く渡される分には、関数の実行が問題になることはありません。余分な引数は無視してしまえばよいからです。それでも、引数の個数を厳密にチェックしたいケースでは、変数`arguments`の`length`プロパティで引数の数をチェックします。

```js twoslash
function foo(a, b) {
  if (arguments.length > 2) {
    throw new Error("引数の数は2つまでです");
  }
}
foo(1, 2); // OK
foo(1, 2, 3); // エラー
```

JavaScriptでは、上のように引数の数をチェックするには、そのためのロジックを書く必要があります。

TypeScriptでは、関数の引数の数が一致していないとコンパイルエラーになります。

```ts twoslash
// @noImplicitAny: false
// @errors: 2554
function increment(n) {
  return n + 1;
}
increment(1, 2); // 引数が多い
increment(); // 引数が足りない
```

そのため、TypeScriptではJavaScriptのようにチェックロジックを書く必要はありません。

## 引数の型

JavaScriptは、引数の型についてもチェックを行いません。JavaやPHPなどの他のプログラミング言語の中には、関数の引数の型を定義することで、関数が期待する引数の型と異なる値が渡されたときに、関数実行前にエラーにしてくれる言語があります。JavaScriptにはこのような機能がありません。たとえば、文字列型の引数を期待する関数に、null型の値を渡しても、JavaScriptの関数は実行されます。

```js twoslash
function len(str) {
  return str.length;
}
console.log(len(null));
```

この関数`len`の引数`str`は文字列型であることを想定していますが、渡される値は`null`です。それでも、関数の実行自体は行われ、`null`に存在しない`length`プロパティへの参照を試みる段階でやっとエラーになります。

JavaScriptでは、引数の型を厳密にする場合、チェック処理を書く必要があります。たとえば、引数が数値型や文字列型などのプリミティブ型かのチェックはこの`typeof`演算子を使って行います。

```js twoslash
function len(str) {
  if (typeof str !== "string") {
    throw new Error("strは文字列型にしてください");
  }
  return str.length;
}
len("a"); // OK
len(1); // エラー
```

TypeScriptでは、関数の引数に型注釈が書けます。型注釈を書いておくと、引数に意図しない型を書くとコンパイルエラーになります。

```ts twoslash
// @errors: 2345
function len(str: string) {
  return str.length;
}
len("a"); // OK
len(1); // エラー
```

そのため、TypeScriptではJavaScriptのように型チェックの処理を書く必要はありません。
