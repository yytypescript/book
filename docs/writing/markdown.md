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
```typescript
// code
```
````

使用可能な言語は次のとおりです。

- [Prisimでデフォルトで有効になっているもの](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js)
- [docusaurus.config.js](https://github.com/yytypescript/book/blob/master/docusaurus.config.js)の`additionalLanguages`で追加で有効にしたもの
  - 必要に応じて追加できます。

:::caution JSX/TSXのハイライト

JSXを含むJavaScriptやTypeScriptは、`jsx`や`tsx`を用いてください。`javascript`や`typescript`ではJSX部分がうまくハイライトされません。

:::

### コードブロックのタイトル

コードブロックにタイトルをつけるには`title`属性を指定します。

````markdown
```typescript title="sample.ts"
// sample code
```
````

```typescript title="sample.ts"
// sample code
```

### 行番号

4行以上あるコードブロックは行番号が自動で付与されます。

```text
1行目
2行目
3行目
```

```text
1行目
2行目
3行目
4行目
```

### 行ハイライト

特定の行に注目してもらいたいときは、行番号を書くとその行の背景色を変えられます。

````markdown
```jsx {1,4-6,11} title="行ハイライトの表示例"
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

```jsx {1,4-6,11} title="行ハイライトの表示例"
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

````markdown {5}
```typescript
f = x => x;
```

<!--prettier-ignore-->
```typescript
f = x => x;
```
````

````markdown {2,7} title="整形結果"
```typescript
f = (x) => x;
```

<!--prettier-ignore-->
```typescript
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
