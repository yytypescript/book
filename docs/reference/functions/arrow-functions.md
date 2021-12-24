---
sidebar_label: アロー関数
---

# アロー関数 (arrow function)

JavaScriptの関数は関数式に加えて、もうひとつの書き方があります。それがアロー関数(arrow function)です。

```js
// 関数式
const hello = function (name) {
  return `Hello, ${name}!`;
};

// アロー関数
const hello = (name) => {
  return `Hello, ${name}!`;
};
```

アロー関数は関数式に比べて短く書けるのが特徴的です。引数が1つだけの場合は、引数のカッコが省略できます。

<!--prettier-ignore-->
```js
const hello = name => {
  return `Hello, ${name}!`;
};
```

さらに、関数内のコードが式1つだけの場合は、ブレースと`return`が省略できます。

<!--prettier-ignore-->
```js
const hello = name => `Hello, ${name}!`;
```

`return`を省略したアロー関数でオブジェクトリテラルを返したい時はそのまま返すことができません。

<!--prettier-ignore-->
```ts twoslash
const func = () => {x: 1}; // この書き方は誤り
console.log(func());
// @log: undefined
```

このときはオブジェクトリテラルを`()`で括ることで返すことができます。

```ts twoslash
const func = () => ({ x: 1 });
console.log(func());
// @log: { x: 1 }
```

## アロー関数の型注釈

TypeScriptでのアロー関数の型注釈は関数宣言と同様です。

```ts
const increment = (num: number): number => num + 1;
```

アロー関数でカッコを省略した記述をした場合には、**引数と戻り値のどちらも型注釈を書けません。**

<!--prettier-ignore-->
```ts
const increment = num => num + 1;
```

コンパイラーオプションで`noImplicitAny`を有効にしている場合は、引数の型注釈が必須となるため、カッコを省略したアロー関数の記述自体が出来なくなります。

<!--prettier-ignore-->
```ts twoslash
// @errors: 7006
const increment = num => num + 1;
```

[noImplicitAny](../tsconfig/noimplicitany.md)

`noImplicitAny`が有効になっていても、関数引数に直接アロー関数を書く場合は型注釈を省略できます。

```ts
[1, 2, 3].map((num) => num + 1);
```

## 関連情報

[関数式とアロー関数の違い](function-expression-vs-arrow-functions.md)

[関数式 (function expression)](function-expression.md)
