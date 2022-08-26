---
sidebar_label: アロー関数
---

# アロー関数 (arrow function)

アロー関数(arrow function)はJavaScriptの関数を作る方法のひとつです。

## アロー関数の構文

JavaScriptのアロー関数は短く書けるのが特徴的です。カッコに引数のリスト、アロー記号`=>`、中カッコに処理内容を書きます。

```js twoslash
(引数) => {
  // 処理内容
};
```

アロー関数は式です。式とは、評価した結果が値になるものを言います。アロー関数に関数名をつけるには、変数に代入します。

```js twoslash
const 変数名 = (引数) => {
  // 処理内容
};
```

たとえば、次の[関数式](./function-expression.md)をアロー関数に書き直すと

```js twoslash title="関数式で定義したincrement関数"
const increment = function (n) {
  return n + 1;
};
```

次のようになります。

```js twoslash title="アロー関数で定義したincrement関数"
const increment = (n) => {
  return n + 1;
};
```

### アロー関数の省略形

JavaScriptのアロー関数は、引数が1つだけの場合、引数のカッコが省略できます。

```js twoslash
// prettier-ignore
const increment = n => { /* ... */ };
//                ^カッコの省略
```

引数がない場合は、引数のカッコは省略できません。

```js twoslash title="引数がないアロー関数"
const getOne = () => {
  return 1;
};
```

さらに、関数内のコードが式1つだけの場合は、中カッコ`{}`と`return`が省略できます。この省略形は簡潔文体(concise body)、非省略形はブロック文体(block body)と呼びわけます。

```js twoslash
// prettier-ignore
const increment = n => n + 1;
//                     ^^^^^returnと中括弧の省略
```

戻り値が[オブジェクトリテラル](../values-types-variables/object/object-literal.md)の場合は要注意です。簡潔文体では、オブジェクトリテラルをカッコ`()`で囲む必要があります。

```js twoslash
// prettier-ignore
(n) => { foo: n + 1 }; // 誤り
(n) => ({ foo: n + 1 }); // 正しい
```

そうしないと、オブジェクトリテラルの開始と終了のつもりで書いた中カッコ`{}`は、ブロック文体の中カッコと解釈され、異なる処理になるからです。上の例では、`foo`はオブジェクトプロパティのキーではなく、ラベルとして扱われます。

## アロー関数の型注釈

TypeScriptのアロー関数では、引数に型注釈が書けます。

```ts twoslash
const increment = (num: number) => num + 1;
//                    ^^^^^^^^引数の型注釈
```

戻り値の型注釈も書けます。

```ts twoslash
const increment = (num: number): number => num + 1;
//                             ^^^^^^^^戻り値の型注釈
```

引数のカッコを省略した場合は、**引数と戻り値のどちらも型注釈を書けません。**

<!--prettier-ignore-->
```ts twoslash
// @noImplicitAny: false
const increment = num => num + 1;
```

暗黙のanyを禁ずるコンパイラオプション`noImplicitAny`が有効の場合、引数カッコを省略したアロー関数がコンパイルエラーになる場合があります。

<!--prettier-ignore-->
```ts twoslash
// @errors: 7006
const increment = num => num + 1;
```

[noImplicitAny](../tsconfig/noimplicitany.md)

`noImplicitAny`が有効でも、引数の型が推論できる場合は、引数カッコが省略できます。たとえば、他の関数の引数にアロー関数を直接書く場合です。次の`map`関数は第1引数に関数を取ります。第1引数の型情報、引数の型がついているので、渡されるアロー関数の型注釈は省略できます。

```ts twoslash
[1, 2, 3].map((num) => num + 1); // 型注釈が省略可
```

<TweetILearned>

・JavaScriptのアロー関数は()=>{}のように短く書ける
・引数が1つの場合、()は省略できる
・処理が1行の場合、{}は省略できる(簡潔文体)
・TypeScriptでは引数カッコ省略時に型注釈が書けない

</TweetILearned>

## 関連情報

[関数式とアロー関数の違い](function-expression-vs-arrow-functions.md)

[関数宣言](./function-declaration.md)

[関数式 (function expression)](function-expression.md)
