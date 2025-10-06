---
description: 関数のすべての分岐できちんと`return`を書いているかを検査する
---

# noImplicitReturns

`noImplicitReturns`は、直訳すると「暗黙的なreturnの禁止」という意味で、関数のすべての分岐できちんと値を返しているかを検査するオプションです。

- デフォルト: `false`
- 追加されたバージョン: 1.8

## 解説

JavaScriptでは、関数が明示的に`return`をしなくても、暗黙的に`undefined`を返す仕様があります。

```js twoslash
function doSomething() {
  // return文がない
}

const value = doSomething();
console.log(value);
// @log: undefined
```

つまり、上の関数は次のような`return undefined`を書いた関数と同じ意味になります。

```js twoslash
function doSomething() {
  return undefined;
}
```

この仕様にはひとつ問題があります。「本当に`undefined`を返したくて`return`文を省略したのか」「`return`文を書き忘れて、意図せず`undefined`を返しているのか」がはっきりしないという問題です。もし単なる書き忘れだった場合は、バグにつながります。

```js twoslash
function getValue(map, key) {
  if (key in map) {
    return map[key];
  }
  // この経路では、undefinedを返すことを意図している？
  // それとも本当はnullを返したかった？
  // もしくは例外を投げるべきだった？
}
```

そのため、JavaScriptのベストプラクティスとしては、本当に`undefined`を返すつもりなら、明示的に`return`文を書くことが推奨されています。

```js
function getValue(map, key) {
  if (key in map) {
    return map[key];
  }
  return undefined;
}
```

関数が複雑になるほど、どこかの分岐で`return`の書き忘れ事故が発生しやすくなります。次の例はさほど複雑でないものの、「境界値の処理を忘れる」という典型的なミスを含んだ例です。

```ts twoslash
// @noImplicitReturns: false
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // num === 0 の経路で return を書き忘れている
  // → この関数は暗黙的に undefined を返す
}

console.log(negaposi(0));
// @log: undefined
```

`noImplicitReturns`を有効にすると、`return`を書き忘れた関数を検出できるようになります。たとえば、次のようなコードはエラーになります。

```ts twoslash
// @noImplicitReturns: true
// @errors: 7030
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // return忘れ
}
```

すべての経路で値を返すように修正すると、コンパイルが通ります。

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  return "zero"; // return漏れを修正
}
```

## `return`なしが許容されるケース

`noImplicitReturns`を有効にした場合でも、利便性のために`return`なしが許容されるケースがあります。

まず、`throw`で終わる分岐は許容されます。

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  throw new Error("this is 0"); // returnなしでもエラーにならない
}
```

次に、戻り値の型注釈が`void`の場合も`return`なしが許容されます。

```ts twoslash
// @noImplicitReturns: true
function log(message?: string): void {
  //                            ^^^^型注釈
  if (!message) {
    return;
  }
  console.log(message);
  // returnなしでもエラーにならない
}
```

戻り値の型注釈が`string | void`のようなユニオン型の場合も`return`なしの経路が許容されます。

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number): string | void {
  //                            ^^^^^^^^^^^^^型注釈
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // returnなしでもエラーにならない
}
```

`void`がユニオン型に含まれない場合、たとえ`undefined`が含まれていても、何も返さない経路があるとエラーになります。

```ts twoslash
// @noImplicitReturns: true
// @errors: 7030
function negaposi(num: number): string | undefined {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // ここにreturnが必要
}
```

`noImplicitReturns`の警告を抑えるために、戻り値の型を`void`と別の型で構成するよりも、しっかり`return undefined`を書き、戻り値の型注釈も`string | undefined`とするほうが、意外性の少ないコードになるので、特に事情がない限りそう書くようにしましょう。

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number): string | undefined {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  return undefined;
}
```

最後に、戻り値の型注釈が`any`の場合も`return`なしが許容されます。

```ts twoslash
// @noImplicitReturns: true
function log(message?: string): any {
  //                            ^^^型注釈
  if (!message) {
    return;
  }
  console.log(message);
  // returnなしでもエラーにならない
}
```

注意点として`any`は`noImplicitReturns`の警告を抑えるだけでなく、他の型チェックも放棄するので、コードの安全性を損なう可能性があります。特段の理由がない限り、`noImplicitReturns`についての警告を抑えるためだけに`any`を使うのは避けましょう。
