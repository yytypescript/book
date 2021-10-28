# Markdown

Markdownは標準的な記法に加えて、本プロジェクトで独自拡張した仕様があります。

## Frontmatter

必要に応じてページのメタ情報や設定をfrontmatterに書くことができます。frontmatterはYAML形式です。

```yaml
---
slug: /reference/function
---
```

利用可能な設定は次のものがあります。

| キー            | 型         | 説明                                                                                                                                                                    |
| --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sidebar_label` | `string`   | サイドバーや前後ページナビゲーション、サイト内リンクブロックに表示されるページタイトルです。指定しない場合、最初の見出しの内容がサイドバーに表示されます。              |
| `slug`          | `string`   | ページのURLのパス部分。指定しない場合、ファイル名から拡張子を除いたものが`slug`になります。                                                                             |
| `tags`          | `string[]` | ページのタグ。デフォルト値は`[]`です。                                                                                                                                  |
| `description`   | `string`   | ページの要約。`<meta name="description" content="..."/>`やサイト内リンクブロックの説明として使われる。指定しない場合、コンテンツの最初の段落が`description`になります。 |
| `title`         | `string`   | ページのタイトル。これを指定した場合、Markdownに見出しをつける必要はありません。                                                                                        |

```yaml
---
sidebar_label: アロー関数
slug: /reference/functions/arrow-function
tags:
  - 関数
  - アロー関数
description: TypeScriptでアロー関数を定義する方法
---
```

## 見出し

見出しレベル1`#`は、ページタイトルにのみ使います。
ページ内のセクションは見出しレベル2`##`以上を使います。

```markdown title="例"
# ページタイトル

...序文...

## 大見出し

...

### 中見出し

...
```

## リンク

サイト内リンクはMarkdownファイルパスを**相対パス**で書きます。

```markdown
詳細は[関数](../references/functions.md)をご覧ください。
```

### 内部リンクブロック

内部リンクブロックは、サイト内のページへのリンクを表示するためのものです。次の例のように、ページタイトルと説明文が自動的に表示されるコンポーネントです。

[letとconst](../reference/values-types-variables/let-and-const.md)

内部リンクブロックには次の利点があります。

- 関連ページが目立つ
- リンク先ページのタイトル変更に自動的に追従できる

リンクブロックを作るには、前後に空白行を置き、かつ、サイト内リンクの行の前後には何も文字を書かないようにします。

```markdown
...テキスト...

[letとconst](../references/values-types-variables/let-and-const.md)

...テキスト...
```

:::caution
Markdownのリンクテキストは無視され、リンク先のタイトルが採用されます。たとえば、function.mdのタイトルが「関数について」で、Markdownが`[ファンクション](./function.md)`のとき、「ファンクション」は無視され、ウェブサイト上の表示は「関数について」が採用されます。
:::

## インラインコード

インラインコードの前後には空白を置かないようにします。

```markdown
❌ 変数宣言は `const` を用います。
⭕️ 変数宣言は`const`を用います。
```

インラインコードでバッククォートを使うには、ダブルバッククォートを使います。

```markdown
テンプレートリテラルは`` ` ``を使います。
```

> テンプレートリテラルは`` ` ``を使います。

## コードブロック

コードブロックは言語名を指定すると、シンタックスハイライトが効きます。

````markdown
```ts
// code
```
````

使用可能な言語は次のとおりです。

- https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages

### コードブロックのタイトル

コードブロックにタイトルをつけるには`title`属性を指定します。

````markdown
```ts title="sample.ts"
// sample code
```
````

```ts title="sample.ts"
// sample code
```

### 行番号

4行以上あるコードブロックは行番号が自動で付与されます。

```markdown
1行目
2行目
3行目
```

```markdown
1行目
2行目
3行目
4行目
```

### Twoslash

TwoslashはサンプルコードにTypeScriptコンパイラーから得られる情報を付加する機能です。付加される情報には変数の型、コンパイルエラーのメッセージなどがあります。

#### 変数の型を表示する

`^?`を書くと型推論された変数の型の中身を表示できます。

````markdown
```ts twoslash
const point = { x: 135, y: 35 };
//    ^?
type ReadonlyPoint = Readonly<typeof point>;
//   ^?
```
````

```ts twoslash title="表示例"
const point = { x: 135, y: 35 };
//    ^?
type ReadonlyPoint = Readonly<typeof point>;
//   ^?
```

#### エラーを表示する

`@errors`でコンパイルエラーの内容を表示できます。

````markdown
```ts twoslash
// @errors: 7006
function fn(s) {}
```
````

```ts twoslash title="表示例"
// @errors: 7006
function fn(s) {}
```

#### コンパイラーオプションを設定する

`@コンパイラーオプション: 設定値`の形式で書くと、そのコードブロックでのみ効くコンパイラーオプションを設定できます。

````markdown
```ts twoslash
// @noImplicitAny: false
function fn(s) {}
```
````

```ts twoslash title="表示例"
// @noImplicitAny: false
function fn(s) {}
```

#### 実行結果を表示する

`@log`、`@warn`、`@error`を用いると、実行結果のコメントをスタイリングして表示できます。

````markdown
```js twoslash
console.log(123);
// @log: 123
console.warn("メッセージ");
// @warn: メッセージ
const x = value;
// @error: ReferenceError: value is not defined
```
````

```js twoslash title="表示例"
console.log(123);
// @log: 123
console.warn("メッセージ");
// @warn: メッセージ
const x = value;
// @error: ReferenceError: value is not defined
```

#### コード補完の再現

`^|`を書いたところにVS Codeでのコード補完の様子を再現できます。

````markdown
```ts twoslash
// @noErrors
[1, 2, 3].fin
//           ^|
```
````

<!--prettier-ignore-->
```ts twoslash title="表示例"
// @noErrors
[1, 2, 3].fin
//           ^|
```

#### JavaScriptの出力

`@showEmit`でコンパイル結果のJavaScriptコードを表示できます。

````markdown
```ts twoslash title="表示例"
// @showEmit
enum Example {
  FOO,
  BAR,
}
```
````

```ts twoslash title="表示例"
// @showEmit
enum Example {
  FOO,
  BAR,
}
```

#### 型定義ファイルの出力

TypeScriptソースコードを型定義ファイルに変換した結果を表示できます。

````markdown
```ts twoslash
// @declaration: true
// @showEmit
// @showEmittedFile: index.d.ts

export function getStringLength(value: string) {
  return value.length;
}
```
````

```ts twoslash title="表示例"
// @declaration: true
// @showEmit
// @showEmittedFile: index.d.ts

export function getStringLength(value: string) {
  return value.length;
}
```

#### インラインハイライト(下線)

下線`^^`を引いた部分がハイライトされます。これは未対応で、下線コメントが消えるだけです。

````markdown
```ts twoslash
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
//                ^^^^^^^^^^
```
````

```ts twoslash title="表示例"
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
//                ^^^^^^^^^^
```

### 行ハイライト

特定の行に注目してもらいたいときは、行番号を書くとその行の背景色を変えられます。

````markdown
```js twoslash {1,4-6,11} title="行ハイライトの表示例"
import React from "react";

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```
````

```js twoslash {1,4-6,11} title="行ハイライトの表示例"
import React from "react";

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```

### サンプルコードの自動整形

コードブロックはPrettierで自動整形されます。

自動整形をされたくないコードブロック場合は、`<!--prettier-ignore-->`を直前に書きます。

````markdown {4}
```ts
f = x => x;
```

<!--prettier-ignore-->
```ts
f = x => x;
```
````

````markdown {1,6} title="整形結果"
```ts
f = (x) => x;
```

<!--prettier-ignore-->
```ts
f = x => x;
```
````

## 警告表示

トリプルコロン`:::`で囲んだテキストは警告表示にできます。

```markdown
:::note
テキスト
:::

:::tip
テキスト
:::

:::info
テキスト
:::

:::caution
テキスト
:::

:::danger
テキスト
:::
```

:::note
テキスト
:::

:::tip
テキスト
:::

:::info
テキスト
:::

:::caution
テキスト
:::

:::danger
テキスト
:::

警告表示にはタイトルを指定できます。

```markdown
:::note 好みのタイトル
テキスト
:::
```

:::note 好みのタイトル
テキスト
:::
