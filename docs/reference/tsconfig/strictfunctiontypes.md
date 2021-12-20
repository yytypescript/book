---
description: 引数型の変性のチェックを厳しくする
tags: [strict]
---

# strictFunctionTypes

`strictFunctionTypes`は引数型の変性のチェックを厳しくするコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: 2.6
- TypeScript公式が有効化推奨

## 引数の双変性は安心できない

TypeScriptの関数には引数の双変性(parameter bivariance)という性質があります。どういうことか、順を追って見ていきましょう。

まず、次の3つの型の範囲を考えてみましょう。

1. `number`
2. `number | null`
3. `number | null | undefined`

`number`は`number | null`より狭い型です。`number | null`の範囲には`1`や`0.5`などの数値型とnull型があります。`number`型の範囲にあるのは数値型だけです。最後の`number | null | undefined`はこの中でもっとも範囲が広い型です。

| 型                                               | 範囲の広さ | 取れる値の例                       |
| ------------------------------------------------ | ---------- | ---------------------------------- |
| `number`                                         | 狭い       | `1`、`0.5`...                      |
| <code>number &#124; null</code>                  | 広い       | `1`、`0.5`...、`null`              |
| <code>number &#124; null &#124; undefined</code> | より広い   | `1`、`0.5`...、`null`、`undefined` |

続いて、次の変数`func`について考えてみましょう。この変数の型は、引数に`number | null`を取る関数です。

```ts twoslash
let func: (n: number | null) => any;
```

この変数`func`に代入できる値はどんな型でしょうか。当然、型注釈と同じ関数は問題なく代入できます。

```ts twoslash
let func: (n: number | null) => any;
// ---cut---
func = (n: number | null) => {}; // OK
```

引数`number | null`より広い`number | null | undefined`を受ける関数は代入できるでしょうか。これも大丈夫です。

```ts twoslash
let func: (n: number | null) => any;
// ---cut---
func = (n: number | null | undefined) => {}; // OK
```

このような引数型の範囲を広められる特性を**引数の反変性(parameter contravariance)**と言います。

引数`number | null`より狭い`number`を取る関数は代入できるでしょうか。これもTypeScriptでは代入できます。

```ts twoslash
// @strictFunctionTypes: false
let func: (n: number | null) => any;
// ---cut---
func = (n: number) => {}; // OK
```

このような引数型の範囲を狭められる特性を**引数の共変性(parameter covariance)**と言います。

TypeScriptの関数型は、引数の反変性と引数の共変性の両特性を持っています。この両特性は一言で、**引数の双変性**と言います。

引数の双変性は危険な側面があります。`null`が渡せる`func`関数に、`number`だけが来ることを前提とした関数を代入しているためです。もしも、`func`に`null`を渡すと、実行時エラーが発生します。

```ts twoslash
// nullも来る可能性がある関数型
let func: (n: number | null) => any;
// numberを前提とした関数を代入
func = (n: number) => n.toString();
// funcにはnullが渡せる → 矛盾が実行時エラーを生む
func(null);
// @error: Cannot read properties of null (reading 'toString')
// @strictFunctionTypes: false
```

こうした実行時エラーが起きないようにするには、引数型は反変だけが許されるべきです。そして、もし共変ならコンパイルエラーで知らせてほしいところです。ところが、TypeScriptは引数型は双変(つまり共変もOK)であるため、安心できない仕様になっています。

## 引数の共変性を許さない`strictFunctionTypes`

上の課題を解決するのが、コンパイラオプション`strictFunctionTypes`です。これを`true`にすると、引数が反変になります。もし、共変の引数にした場合、TypeScriptが警告を出します。

```ts twoslash
// @errors: 2322
let func: (n: number | null) => any;
// 不変
func = (n: number | null) => {}; // OK
// 反変
func = (n: number | null | undefined) => {}; // OK
// 共変
func = (n: number) => {}; // NG
```

`strictFunctionTypes`は思いがけない実行時エラーを防ぐのに役立ちます。`strictFunctionTypes`は`true`を設定するのがお勧めです。

## メソッド型はチェックされない

`strictFunctionTypes`のチェックが働くのは関数型だけです。メソッド型には働きません。

```ts twoslash
interface Obj {
  // メソッド型
  method(n: number | null): any;
}
const obj: Obj = {
  method: (n: number) => {}, // チェックされない
};
```

インターフェースのメソッドでも、**関数型で定義されたメソッド**は`strictFunctionTypes`のチェックが働きます。

```ts twoslash
// @errors: 2322
interface Obj {
  // 関数型
  method: (n: number | null) => any;
}
const obj: Obj = {
  method: (n: number) => {}, // チェックが働く
};
```

<TweetILearned>

⚙️TypeScriptのstrictFunctionTypesは、引数型の変性のチェックを厳しくするコンパイルオプション
☹️TypeScriptの引数は双変で安心できない
🔥実行時エラーが起こることも
✅strictFunctionTypesは反変にしてくれる
👍有効化推奨のオプション

</TweetILearned>

## 関連情報

[strict](./strict.md)
