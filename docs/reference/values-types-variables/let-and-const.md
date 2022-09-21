# 変数宣言: letとconst

JavaScriptの変数宣言(variable declaration)には、`let`と`const`があります。

## letの変数宣言

`let`を用いた変数宣言の書き方は次のようにします。

```ts twoslash
let x = 1;
```

`let`は再代入が可能です。

```ts twoslash
let x = 1;
x = 2; // 再代入ができる
```

`let`は変数の初期値なしで変数定義できます。初期値なしの変数の値は`undefined`になります。

```js twoslash
let x; // 初期値なし
x = 1; // 後で代入
```

## constの変数宣言

`const`を用いた変数宣言の書き方は次のようになります。初期値は必須です。

```js twoslash
const y = 2;
```

`const`は変数への再代入が禁止されています。

```js twoslash
const y = 1;
y = 1;
// @error: TypeError: Assignment to constant variable.
```

## letとconstの使い分け

初めて JavaScript を書く場合に、`let`と`const`のどちらの変数宣言を使えばよいか悩む場合があるかもしれません。基本は`const`で変数宣言をして必要な場合にのみ、`let`を使うのがオススメです。`const`で変数宣言することで再代入を禁止して、意図せず変数が書き換えられることを予防できるので、より安全なコードになります。

<TweetILearned>

・JavaScriptの変数宣言はletとconstがある
・letは再代入OK、constは再代入NG
・基本的にconstを使うとよい

</TweetILearned>

## constは可変オブジェクトを保護しない

constは再代入不可な変数名を宣言するだけです。constには、可変(ミュータブル)なオブジェクトのプロパティを不変にする保護効果はありません。この点は誤解されがちです。

たとえば、constでオブジェクトを宣言した場合、変数自体への再代入はできません。ところが、オブジェクトプロパティは変更できます。

```ts twoslash
// @errors: 2588
const obj = { a: 1 };
obj = { a: 2 }; // 再代入は不可
obj.a = 2; // プロパティの変更はできる
```

TypeScriptでオブジェクトを不変にするには、プロパティを読み取り専用にする必要があります。

[readonlyプロパティ](./object/readonly-property.md)

配列もオブジェクトの一種のため同様です。変数自体の再代入はできません。しかし、配列要素は変更できます。

```ts twoslash
// @errors: 2588
const arr = [1, 2];
arr = [3, 4]; // 再代入は不可
arr.push(3); // 要素の変更はできる
```

TypeScriptで配列を不変にするには読み取り専用配列を使う必要があります。

[読み取り専用配列](./array/readonly-array.md)

constアサーションを使ってオブジェクトや配列を不変にする方法もあります。

[constアサーション](./const-assertion.md)
