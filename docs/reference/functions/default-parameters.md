---
sidebar_label: "デフォルト引数"
---

# デフォルト引数 (default parameter)

引数の値が`undefined`のとき、代わりの値を指定できるのがデフォルト引数(default parameter)です。

## デフォルト引数の構文

JavaScriptのデフォルト引数は、引数の右に`=`とデフォルト値を書きます。

```js twoslash
// 関数宣言
function 関数名(引数 = デフォルト値) {}
// アロー関数
(引数 = デフォルト値) => {};
```

TypeScriptで、型注釈とデフォルト引数の両方を書く場合は、型注釈のほうを先に書きます。

```ts twoslash
interface 型 {}
declare const デフォルト値: 型;
// ---cut---
// 関数宣言
function 関数名(引数: 型 = デフォルト値) {}
// アロー関数
(引数: 型 = デフォルト値) => {};
```

## `undefined`のときデフォルト値が使われる

JavaScriptの引数は省略すると`undefined`になります。

```js twoslash
function foo(x) {
  console.log(x);
}
foo();
// @log: undefined
```

デフォルト引数は、引数が`undefined`のときに、その値が変わりに代入されます。たとえば、次の例の関数呼び出しは、引数を渡していないので`x`は`undefined`です。そのため、デフォルト値`1`が代入されます。

```ts twoslash
function foo(x = 1) {
  console.log(x);
}
foo();
// @log: 1
```

次のように、引数に`undefined`を渡す場合も、デフォルト値が代入されます。

```ts twoslash
function foo(x = 1) {
  console.log(x);
}
// ---cut---
foo(undefined);
// @log: 1
```

引数が`null`のときは、デフォルト引数は適用されません。ご注意ください。

```js twoslash {4}
function foo(x = 1) {
  console.log(x);
}
foo(null);
// @log: null
```

## 引数リストの途中に書ける

JavaScriptのデフォルト引数は、デフォルト値を持たない引数の前に書くこともできます。

```js twoslash
function foo(x, y = 2, z) {
  console.log(x, y, z);
}
foo(1, undefined, 3);
// @log: 1 2 3
```

## 初期化処理が書ける

JavaScriptのデフォルト値には式が書けます。

```js twoslash
function foo(x = 2 * 2) {}
```

式が書けるので、関数呼び出しも書けます。

```js twoslash
function foo(x = parseInt("1.5")) {}
```

### 非同期処理は書けない

ただし、`await`を使って、非同期関数を呼び出すような処理は書けません。

```ts twoslash
// @errors: 2524
async function foo(x = await Promise.resolve(1)) {}
```

## 型推論が効く

TypeScriptでは、デフォルト引数があると、引数の型推論が効きます。そのため、デフォルト引数が型注釈を省略することもできます。

```ts twoslash
function foo(x = 1) {}
//           ^?
```

<TweetILearned>

・JavaScriptのデフォルト引数は引数がundefinedのとき使われる値
・構文: function 関数名(引数: 型 = デフォルト値) {}
・nullのときはデフォルト値にならない
・引数の途中に書ける
・簡単な初期化処理も書ける
・TypeScriptでは型推論が効く

</TweetILearned>
