# オブジェクトをループする方法

JavaScript・TypeScriptでオブジェクトのプロパティをループする方法を説明します。

## for-in文

JavaScriptでオブジェクトをループする古くからある方法はfor-in文を使うものです。

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
for (const prop in foo) {
  console.log(prop, foo[prop]);
  // a 1
  // b 2
  // c 3 の順で出力される
}
```

## for-in文では`hasOwnProperty`を使おう

JavaScriptのオブジェクトには元になるプロトタイプがあります。たとえば、オブジェクトリテラルであれば、`Object.prototype`がプロトタイプになります。

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
console.log(Object.getPrototypeOf(foo) === Object.prototype);
// @log: true
```

`Object.prototype`を変更するとその影響は、このプロトタイプを持つすべてのオブジェクトに影響します。

```js twoslash
const foo = { a: 1 };
const date = new Date();
const arr = [1, 2, 3];

// どのオブジェクトもhiプロパティが無いことを確認
console.log(foo.hi, date.hi, arr.hi);
// @log: undefined undefined undefined

// プロトタイプにプロパティを追加する
Object.prototype.hi = "Hi!";

// どのオブジェクトもhiプロパティを持つようになる
console.log(foo.hi, date.hi, arr.hi);
// @log: Hi! Hi! Hi!
```

for-in文はプロトタイプのプロパティも含めてループする仕様があります。そのため、プロトタイプが変更されると、意図しないところでfor-inのループ回数が変わることがあります。

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
Object.prototype.hi = "Hi!";
for (const prop in foo) {
  console.log(prop, foo[prop]);
  // a 1
  // b 2
  // c 3
  // hi Hi! の順で出力される
}
```

したがって、for-inで反復処理を書く場合は、`hasOwnProperty`でプロパティがプロトタイプのものでないことをチェックしたほうが安全です。

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
Object.prototype.hi = "Hi!";
for (const prop in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, prop)) {
    console.log(prop, foo[prop]);
    // a 1
    // b 2
    // c 3  の順で出力される
  }
}
```

## `Object.entries`

`Object.entries`の戻り値をfor-of文でループする方法もあります。

```ts twoslash
// @target: es2017
const foo = { a: 1, b: 2, c: 3 };
for (const [key, value] of Object.entries(foo)) {
  console.log(key, value);
  // a 1
  // b 2
  // c 3 の順で出力される
}
```

for-in文と異なり、`hasOwnProperty`のチェックが不要です。

## `Object.keys`

プロパティのキーだけを反復処理する場合は、`Object.key`の戻り値をfor-of文でループする方法があります。

```ts twoslash
// @target: es2017
const foo = { a: 1, b: 2, c: 3 };
for (const key of Object.keys(foo)) {
  console.log(key);
  // a
  // b
  // c の順で出力される
}
```

for-in文と異なり、`hasOwnProperty`のチェックが不要です。

## `Object.values`

プロパティの値だけを反復処理する場合は、`Object.values`の戻り値をfor-of文でループする方法があります。

```ts twoslash
// @target: es2017
const foo = { a: 1, b: 2, c: 3 };
for (const key of Object.values(foo)) {
  console.log(key);
  // 1
  // 2
  // 3 の順で出力される
}
```

for-in文と異なり、`hasOwnProperty`のチェックが不要です。

<TweetILearned>

JavaScriptやTypeScriptのオブジェクトプロパティをループするには次の方法がある。

1️⃣ for-in文
2️⃣ for-of文 + Object.entries()
3️⃣ for-of文 + Object.keys()
4️⃣ for-of文 + Object.values()

⚠️ for-in文はhasOwnPropertyのチェックが必要。

</TweetILearned>

## 関連情報

[配列をループする方法](../array/how-to-loop-an-array.md)
