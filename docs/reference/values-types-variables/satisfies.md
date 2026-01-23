---
sidebar_label: satisfies演算子
---

# satisfies演算子 (satisfies operator)

`satisfies`は、「型に合っているかだけ検査して、推論結果はそのまま残す」ための演算子です。型注釈が持つ「型安全性の保証」と、型推論が持つ「具体的な値の使いやすさ」の、いいとこ取りができるのが特徴です。

## 型注釈と型推論のトレードオフ

`satisfies`が登場する前は、「安全性を取るか」「使い勝手を取るか」のトレードオフがありました。

次のような構造の設定オブジェクトの例で考えてみます。`Config`型はテキストサイズを定義する型で、文字列リテラルまたは数値を受け入れます。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
```

### 型チェックをしないと危険

まず、設定オブジェクトを型注釈なしで定義した例を見てみましょう。以下は設定値を誤ってしまったケースです。

```ts twoslash
// 型注釈をつけていない
const config = { textSize: "extra-large" };
//    ^?
```

`config`の型は`{ textSize: string }`と推論され、`Config`型とは合致していないことがわかります。`textSize`は`"small" | "medium" | "large" | number`のいずれかであるべきで、任意の文字列（`string`）は入れられないはずです。

本来なら、`Config`型の定義にしたがって`extra-large`という値の代入を防ぎたいところですが、型注釈をつけていないためコンパイラによるチェックが行われません。

### 型注釈すると安全にはなるが…

コンパイラにチェックしてもらうために、型注釈をつけてみましょう。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
const config: Config = { textSize: "extra-large" };
// @errors: 2322
```

型注釈をつけたのでチェックが効き、使ってはいけない`extra-large`があぶり出されました。これで解決したように見えますが、新たな問題が発生します。

[変数宣言の型注釈](type-annotation.md)

### 推論は消えてしまう

型注釈をつけるとチェックは効くようになりますが、副作用として推論結果が変わってしまいます。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
// 型注釈がないため推論あり
const config1 = { textSize: 10 };
//    ^?
config1.textSize;
//      ^?
// 型注釈があるため推論なし
const config2: Config = { textSize: 10 };
//    ^?
config2.textSize;
//      ^?
```

`config1`は`{ textSize: number }`と推論されましたが、`config2`は`Config`型になっています。
そのため、`config1.textSize`は`number`型ですが、`config2.textSize`は`"small" | "medium" | "large" | number`型です。このように、型推論と型注釈では得られる型情報が異なります。

別の見方をすると、`{ textSize: 10 }`は`config2`に代入された時点で、コンパイラが「`textSize`が`number`だったこと」を忘れてしまうとも言えます。

これで困るのは、`textSize`が数値であることを前提にした処理を直接書けなくなることです。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
const config: Config = { textSize: 10 };
const configForMobile: Config = {
  textSize: config.textSize * 1.1,
};
// @errors: 2362
```

人間がコードを読む限り、`textSize`が数値であることは明らかですが、コンパイラは`textSize`に数値以外が入る可能性まで考慮してしまい、`textSize * 1.1`の計算式をエラーとして報告してきます。

これを回避するには、次のように型ガードを書かなければなりません。`textSize`が`10`であることは自明であるにもかかわらず、です。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
const config: Config = { textSize: 10 };
if (typeof config.textSize !== "number") {
  throw new Error("textSize is not number");
}
const configForMobile: Config = { textSize: config.textSize * 1.1 };
```

[Control Flow Analysisと型ガード](../statements/control-flow-analysis-and-type-guard.md)

もしくは、型アサーションを使う方法もありますが、記述が冗長になってしまいます。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
const config: Config = { textSize: 10 };
const configForMobile: Config = {
  textSize: (config as { textSize: number }).textSize * 1.1,
};
```

[型アサーション](type-assertion-as.md)

このように、型注釈を外せば型推論が効いて数値計算を直接書けるようになりますが、型チェックがなくなるので設定ミスに気づきにくくなります。逆に、型注釈があると設定ミスは防げますが、数値計算を直接行うことができなくなります。

## 型チェックと型推論の両立

「型チェックはしたいが、中身が`number`であるという情報は消さないでほしい」この願いを叶えるのが`satisfies`です。上の例を`satisfies`で解決してみましょう。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
const config = { textSize: 10 } satisfies Config;
```

主な変更点は、`config`の型注釈を外し、値の後ろに`satisfies Config`をつけたことです。

これにより、`{ textSize: 10 }`は`Config`型に丸められることなく、`{ textSize: number }`として推論されます。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
const config = { textSize: 10 } satisfies Config;
//    ^?
```

そして、`textSize * 1.1`の計算式もエラーとして報告されなくなります。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
const config = { textSize: 10 } satisfies Config;
const configForMobile: Config = {
  textSize: config.textSize * 1.1, // OK
};
```

また、設定できない値はチェックされるので安全性も保証されます。つまり、設定ミスを防ぐことができます。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// ---cut---
const config = { textSize: "extra-large" } satisfies Config;
// @errors: 2322
```

## 比較

型注釈、型推論、`satisfies`の違いをまとめると次のようになります。

| 特徴             | 型注釈なし（型推論任せ） | 型注釈あり      | satisfies       |
| :--------------- | :----------------------- | :-------------- | :-------------- |
| 型安全性         | ❌ チェックなし          | ✅ チェックあり | ✅ チェックあり |
| 具体的な値の情報 | ✅ 保持                  | ❌ 消える       | ✅ 保持         |

## 実用的なユースケース

`satisfies`の具体的なユースケースを見てみましょう。

### 設定ファイル

前述の例と同様に、アプリケーションの設定をTypeScriptで記述する場合、`satisfies`が最適です。テーマ設定、デザイントークン、CLIツールの設定ファイルなどがこれに該当します。

### 式の中でのインライン型チェック

変数を宣言せずに、その場で型チェックだけを行いたい場合にも便利です。

たとえば、次のように`JSON.stringify`にオブジェクトリテラルを直接渡すようなケースです。

```ts twoslash
// @errors: 1360
type User = { id: number; name: string };

// idプロパティが足りないことに気づける
JSON.stringify({ name: "taro" } satisfies User);

// satisfiesがないと、idプロパティが足りないことに気づけない
JSON.stringify({ name: "taro" });
```

もし`satisfies`を使わないとなると、型チェックのために一度変数に入れて型注釈を書く必要があり、コードの形も変えなければなりません。

```ts twoslash
type User = { id: number; name: string };
const user: User = { id: 1, name: "taro" };
const json = JSON.stringify(user);
```

似た例として、`default export`の値をチェックしたい場合にも便利です。

```ts twoslash
type Config = { textSize: "small" | "medium" | "large" | number };

// "extra-large"が設定ミスであることに気づける
export default { textSize: "extra-large" } satisfies Config;
// @errors: 2322
```

もし`satisfies`を使わないとなると、型チェックのために一度変数に入れる必要があります。

```ts twoslash
type Config = { textSize: "small" | "medium" | "large" | number };
const config: Config = { textSize: "extra-large" };
export default config;
// @errors: 2322
```

## constアサーションとの組み合わせ

constアサーション（`as const`）は、値を変更不可（readonly）かつリテラル型として扱うようTypeScriptコンパイラに指示する機能です。これと`satisfies`を組み合わせると、値を厳格なリテラル型として固定しつつ、型チェックも行うことができます。

[constアサーション](const-assertion.md)

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
// constアサーションを使わない場合
const config1 = { textSize: 10 } satisfies Config;
//    ^?
// constアサーションを使った場合
const config2 = { textSize: 10 } as const satisfies Config;
//    ^?
```

`config1`は`{ textSize: number }`と推論されますが、`config2`は`{ readonly textSize: 10 }`と推論されます。違いとして`textSize`が`number`型よりも具体的な`10`（リテラル型）になっていることがわかります。

ソースコードには`10`と書いてあるので、よりコード通りの情報を型に持たせられていると言えます。`number`型よりも具体的な情報が保持されることで、型情報を用いた発展的な処理につなげていくことができます。

少し応用的な例になりますが、テンプレートリテラル型と組み合わせた例を見てみます。`configA`（`as const`なし）は単なる`number`なので推論結果が`"${number}px"`になりますが、`configB`（`as const`あり）は`10`という値を持っているので`"${10}px"`（つまり`"10px"`）という厳密な型を導き出せます。

```ts twoslash
type Config = {
  textSize: "small" | "medium" | "large" | number;
};
const configA = { textSize: 10 } satisfies Config;
const configB = { textSize: 10 } as const satisfies Config;

// Config.textSizeの数値から"[数値]px"というリテラル型を導出する型レベル関数
type Px<T extends Config> = `${T["textSize"]}px`;

// constアサーションなしのほうは [数字]px という文字列が代入可能
const fontSize1: Px<typeof configA> = "10px"; // OK
const fontSize2: Px<typeof configA> = "999px"; // OK

// constアサーションありのほうは "10px" という文字列だけに限定できる
const fontSize3: Px<typeof configB> = "10px"; // OK
const fontSize4: Px<typeof configB> = "999px"; // エラー
// @errors: 2322
```

[typeof演算子](typeof-operator.md)

このように`as const`と`satisfies`の合わせ技は、より厳密な型定義が必要な場面で強力な味方になってくれるでしょう。
