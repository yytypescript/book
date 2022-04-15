# 🚧Next.jsで○○を作ろう

:::caution 執筆中

Next.js+TypeScriptで簡単なウェブアプリケーションを作るチュートリアルを書く。

作るサンプルアプリケーションのアイディア

読者が学べるとよいこと

- Next.jsの概要
- Next.jsのインストール&セットアップ
- SSRを使ったAPI呼び出し
  => ボタンを表示してみる
  => 猫の画像の表示してみる
  => APIで猫の画像を取得して動的に表示してみる
  => SSRのタイミングで猫の画像を表示する => いきなりgetServerSidePropsは読者が混乱するので、最後にやる
  => 実装の途中で段階的に型づけをする
- プロダクションコードの生成
- Vercelへのデプロイ

- おまけ: デザインの調整

:::

## Next.jsの概要

[Next.js](https://nextjs.org/)はVercel社が開発しているOSSのReactをベースにしたフレームワークです。
Next.js登場前はReactで開発を進める上でwebpack等のビルドツールの設定ファイルを記述するには一定の知識が必要で、チャンク分割やCSS Modulesの読み込みなど多くのことをやろうとすると、非常に設定が複雑化してメンテナンスが非常に大変になっていました。

Next.jsはルーティング時のプリフェッチや画像の最適化などのパフォーマンス最適化をフレームワーク内で内包しており、ゼロコンフィグで簡単にパフォーマンスの高いアプリケーションを構築することができます。ページ単位のサーバーサイドレンダリング（SSR）や静的サイト生成(SSG)の機能も提供しているので、用途に合わせて柔軟にアーキテクチャを選択できるのも特徴です。

また、Vercelというプラットフォームを提供しており、Next.jsで構築したアプリケーションを非常に簡単にデプロイ/配信することができます。

## これから作るもの

このチュートリアルでは、猫🐱の画像をランダムに表示するWebアプリケーションを実装します。

最終的な成果物は[こちら](ホスティングしたURL)で試すことができます。
チュートリアルを開始する前に事前に触ってみることで、各ステップでどんな実装をしているかのイメージが掴みやすくなります。

また、最終的な成果物のソースコードは[yytypescript/random-cat](https://github.com/yytypescript/random-cat)で確認することができます。

## Next.jsのセットアップ

最初に `create-next-app` でプロジェクトを作成します。
TypeScriptをベースにしたプロジェクトを作成するために `--example with-typescript` を指定します。
`random-cat` は作成するリポジトリの名前なので好きな名前で作成してください。

```shell
yarn create next-app --example with-typescript random-cat
```

プロジェクトが作成できたら、早速アプリケーションを起動してみます。
作成されたリポジトリに移動して`yarn dev`を実行します。

アプリケーションの起動に成功したら、ターミナルに表示されているURLにブラウザでアクセスしてください。

```sh
cd random-cat
yarn dev
```

## リポジトリをまっさらな状態にする

チュートリアルを進める前にファイルが沢山ある状態では作業が進めにくいので、ボイラーテンプレートで作成されたファイルを削除して、プロジェクトをまっさらなシンプルな状態にします。

最初にソースファイルのディレクトリをすべて削除して、src/pages/index.tsxを作成します。

Next.jsでは`pages`ディレクトリが特別な意味を持っており、`pages`ディレクトリ配下のディレクトリ構造がページのルーティングに1対1で対応をします。
作成した src/pages/index.tsx は `/` へルーティングされます。

```sh
rm -rf pages utils interfaces components
mkdir -p src/pages && touch src/pages/index.tsx
```

index.tsxで「Hello,Next.js👋」と表示するようにコンポーネントを実装してましょう。

```ts twoslash
const IndexPage = () => {
  return <h1>Hello, Next.js 👋</h1>;
};
```

- 再起動しないと新しい src ディレクトリを認識できない

## 開発

### ボタンを表示

```typescript
const IndexPage = () => {
  return <button>きょうのにゃんこ🐱</button>;
};
```

### 猫の画像を表示

```typescript
const IndexPage = () => {
  return (
    <div>
      <button>きょうのにゃんこ🐱</button>
      <div style={{ marginTop: 10 }}>
        <img src="https://cdn2.thecatapi.com/images/bpc.jpg" />
      </div>
    </div>
  );
};

export default IndexPage;
```

### 猫画像のURLを状態として持つ

今のままだと動的に猫の画像を変更できないので、URLを状態として保持するように修正します。

```typescript
import { useState } from "react";

const IndexPage = () => {
  const [catImageUrl, setCatImageUrl] = useState(
    "https://cdn2.thecatapi.com/images/bpc.jpg"
  );

  return (
    <div>
      <button style={{ marginBottom: 10 }}>きょうのにゃんこ🐱</button>
      <div>
        <img src={catImage} />
      </div>
    </div>
  );
};

export default IndexPage;
```

### APIで猫の画像を取得する

最初はAPIのリクエスト処理だけを実装してコンソールで確認してみます

```typescript
// pages/index.tsx
const fetchCatImage = async () => {
  const res = await fetch("api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0];
};

fetchCatImage().then((image) => {
  console.log(image);
});

// (省略)
```

### APIのレスポンスに型付け

今の状態だと `fetchCatImage()` の戻り値が `any` のままなので、呼び出し側で存在しないプロパティを参照しても気づけずにバグが発生する危険性があります。

```typescript
fetchCatImage().then((image) => {
  // 戻り値がany型なので型エラーにならない
  console.log(image.alt);
});
```

APIレスポンスは仕様変更で頻繁に変更される可能性が高く特にフロントエンドではバグが混在しやすいです。
TypeScriptで型を指定することで安全にAPIを扱えるようにします。

`res.json()`は型定義で`Promise<any>`となっているため、`as`（型アサーション）で型情報を上書きしています。

fetchAPIを使うと型アサーションを使う必要があるのがモヤモヤ
TypeScript始めた人が型アサーションを積極的に使っていいんだと思ってしまう心配がある

レスポンスの型ガードを書く？
実行時に型が消えるのでAPIレスポンスが型定義と異なる場合に問題が発生する。
=> レスポンスの型ガードを書けば多少解決はできる

API周りは型定義ファイルを自動生成する仕組みもあったりする

```typescript
interface SearchCatImage {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImagesResponse = SearchCatImage[];

const fetchCatImage = async () => {
  const res = await fetch("api.thecatapi.com/v1/images/search");
  const result = (await res.json()) as SearchCatImageResponseBody;
  return result[0];
};

fetchCatImage().then((image) => {
  // @error
  console.log(image.alt);
});
```

TypeScriptはJavaScriptにコンパイルされて実行されため、実行時には型情報が失われている。

型アサーションは型チェックのタイミングでしか誤りに気付けないので、型定義のプロパティ名を間違えている状態で、プロパティを参照していても型チェックは通過する。

実行時にプロパティ名が間違っているので、参照エラーとなる点に注意が必要

厳密に型ガードを駆使して実装する場合はこんな感じで書く
この方法を書いてで業務で積極的にこっちのやり方を使うと型ガードだらけになって良くないので書かない方がいいかも

```typescript
const isSearchCatImage = (image: any): image is SearchCatImage => {
  // プロパティのnullチェックだと値としてnullを返す場合に対応ができない
  // hasOwnPropertyやinキーワードでチェックした方が良い
  return (
    image.breeds != null &&
    image.id != null &&
    image.url != null &&
    image.width != null &&
    image.height != null
  );
};

const fetchCatImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  if (
    !Array.isArray(result) ||
    result.length === 0 ||
    !isSearchCatImage(result[0])
  ) {
    throw new Error("レスポンスのデータ構造が正しくありません");
  }

  return result[0] as SearchCatImage;
};
```

ライブラリで型定義からコードを自動生成して色々とやる方法もある

https://tech.mobilefactory.jp/entry/2021/12/10/000000

### ボタンをクリックして猫画像を更新

```typescript
import { useState } from "react";

interface SearchCatImage {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await res.json()) as SearchCatImageResponse;
  return result[0];
};

const IndexPage = () => {
  const [catImageUrl, setCatImageUrl] = useState(
    "https://cdn2.thecatapi.com/images/bpc.jpg"
  );

  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  };

  return (
    <div>
      <button onClick={handleClick}>きょうのにゃんこ🐱</button>
      <div style={{ marginTop: 10 }}>
        <img src={catImageUrl} width={500} height="auto" />
      </div>
    </div>
  );
};

export default IndexPage;
```

### 初期画像もAPIで取得する

ページを読み込み時は固定の画像を表示している状態なので、最初の画像もランダムに画像を表示するようにしましょう。

```typescript
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface SearchCatImage {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await res.json()) as SearchCatImageResponse;
  return result[0];
};

interface IndexPageProps {
  initialCatImageUrl: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  };

  return (
    <div>
      <button onClick={handleClick}>きょうのにゃんこ🐱</button>
      <div style={{ marginTop: 10 }}>
        <img src={catImageUrl} width={500} height="auto" />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};

export default IndexPage;
```
