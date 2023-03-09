# Next.jsで猫画像ジェネレーターを作ろう

## Next.jsの概要

[Next.js](https://nextjs.org/)は、オープンソースのUIライブラリReactをベースにしたフロントエンドフレームワークです。

Reactで開発する場合、webpackのようなバンドラーを用いるのが普通です。webpackの設定ファイルを記述するには、一定の知識が必要です。特に、チャンク分割やCSSモジュールの設定は複雑だったりと、設定ファイルのメンテナンスが大変です。Next.jsは、webpackの設定があらかじめなされた状態で開発が始められるようになっています。

Next.jsはルーティング時のプリフェッチや画像の最適化などのパフォーマンス最適化をフレームワーク内で内包しており、ゼロコンフィグで簡単にパフォーマンスの高いアプリケーションを構築することができます。ページ単位のサーバーサイドレンダリング(SSR)や静的サイト生成(SSG)の機能も提供しており、用途に合わせて柔軟にアーキテクチャを選択できるのも特徴です。

Next.jsはVercel社が開発しています。同社は[Vercel](https://vercel.com/)というホスティングサービスを提供しているので、Next.jsで構築したアプリケーションは簡単に公開できます。

## これから作るもの

このチュートリアルでは、題して「猫画像ジェネレーター」です。どんなものかというと、ボタンを押したら、猫画像のAPIから画像のURLを取得し、ランダムに可愛い猫画像を表示するシンプルなウェブアプリケーションです。

<video width="600" controls="controls" loop="controls" autoplay="autoplay" muted="muted" playsinline="playsinline">
  <source src="/tutorials/nextjs/demo.mp4" type="video/mp4" />
</video>

最終的な成果物は[デモサイト](https://random-cat.typescriptbook.jp/)で確認できます。チュートリアルを開始する前に事前に触ってみることで、各ステップでどんな実装をしているかのイメージが掴みやすくなります。また、完成形のソースコードは[GitHub](https://github.com/yytypescript/random-cat)で確認することができます。

## このチュートリアルに必要なもの

このチュートリアルで必要なものは次のとおりです。

- Node.js v16以上
- Yarn v1系 (このチュートリアルはv1.22.19で動作確認しています)
- ブラウザ (このチュートリアルではGoogle Chromeを想定しています)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

パッケージ管理ツールとしてYarnを利用します。最初にインストールをしておきましょう。すでにインストール済みの方はここのステップはスキップして大丈夫です。

```shell
npm install -g yarn
```

## Next.jsをセットアップする

最初に`create-next-app`コマンドでプロジェクトを作成します。TypeScriptをベースにしたプロジェクトを作成するために `--example with-typescript` を指定します。`random-cat` はリポジトリ名となる部分です。この部分は好きな名前でも構いませんが、本チュートリアルでは`random-cat`として話を進めます。

```sh
yarn create next-app --example with-typescript random-cat
```

このコマンドを実行すると、`random-cat`ディレクトリが作成されるので、そのディレクトリに移動してください。

```sh
cd random-cat
```

プロジェクトのファイル構成が次のようになっているか確認してください。

```text
.
├── components ---- ディレクトリ
├── interfaces ---- ディレクトリ
├── node_modules -- ディレクトリ
├── pages --------- ディレクトリ
├── utils --------- ディレクトリ
├── README.md
├── next-env.d.ts
├── package.json
├── tsconfig.json
└── yarn.lock
```

## 開発サーバーを起動する

次のコマンドを実行して、開発サーバーを起動してください。

```sh
yarn dev
```

開発サーバーが起動したら、ターミナルに表示されているURLにブラウザでアクセスしてください。

## 不要なファイルを消す

チュートリアルを進める前に、ここでは使わないファイルを削除します。プロジェクトをシンプルな状態にして、作業を進めやすくしましょう。

```sh
rm -rf pages utils interfaces components
```

## ページコンポーネントディレクトリを作る

Next.jsでは、`pages`ディレクトリ配下のディレクトリ構造がページのルーティングに対応します。たとえば、pages/users.tsxとファイルを作成すると、`/users`へアクセスしたとき、それが実行されます。pages/index.tsxの場合は、`/` へアクセスしたときに実行されます。

この`pages`ディレクトリに置かれたコンポーネントのことを、Next.jsの用語でページコンポーネント(page component)と呼びます。

次のコマンドを実行してページコンポーネントを置くためのディレクトリを作成してください。

```sh
mkdir pages
```

## トップページのページコンポーネントを作る

次のコマンドを実行して、トップページのページコンポーネントを作成してください。

```sh
touch pages/index.tsx
```

ページコンポーネントの内容は、次のようにします。この`IndexPage`関数がページコンポーネントです。これは「猫画像予定地」が表示されるだけの単純なものです。

```tsx twoslash title="pages/index.tsx"
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return <div>猫画像予定地</div>;
};
export default IndexPage;
```

Next.jsでは、1ファイルにつき1ページコンポーネントを作成します。Next.jsは`pages`ディレクトリの各`tsx`ファイルを読み込み、デフォルトエクスポートされた関数をページコンポーネントとして認識します。上のコードで`IndexPage`関数を`export default`にしているのは、Next.jsにページコンポーネントと認識させるためです。`NextPage`はページコンポーネントを表す型です。この型を注釈しておくと、関数の実装がページコンポーネントの要件を満たしているかがチェックできます。

コンポーネントを実装したら、ブラウザをリロードして画面に「猫画像予定地」と表示されているか確認してください。

<!-- todo: 画像 -->

:::info Next.jsではアロー関数を使うべきですか？

JavaScriptで関数を作るには、大きく分けて[アロー関数と関数宣言を使った方法の2種類](../reference/functions/function-expression-vs-arrow-functions.md)があります。上で書いた`IndexPage`関数はアロー関数です。これを関数宣言に書き換えると次のようになります。

```tsx twoslash
import { ReactElement } from "react";

export default function IndexPage(): ReactElement<any, any> | null {
  return <div>猫画像予定地</div>;
}
```

Next.jsでは、アロー関数と関数宣言のどちらで書いても構いません。このチュートリアルでアロー関数を採用しているのは、ページコンポーネントに`NextPage`型の型注釈をつけるのが、アロー関数のほうがやりやすいためです。

:::

## The Cat API

このチュートリアルでは猫の画像をランダムに表示するにあたり[The Cat API](https://thecatapi.com/)を利用します。このAPIは特定の条件で猫の画像を取得したり、品種ごとの猫の情報を取得することができます。今回のチュートリアルでは[APIドキュメント](https://docs.thecatapi.com/)のQuickstartに記載されている`/v1/images/search`へリクエストを投げてランダムな猫の画像を取得します。

試しにブラウザで<https://api.thecatapi.com/v1/images/search>へアクセスしてみてください。ランダムな結果が返ってくるので値は少し違いますが、次のような構造のデータがレスポンスとして取得できます。レスポンスのデータ構造が配列になっている点に注意してください。

```json title="The Cat APIのレスポンスのサンプル"
[
  {
    "id": "co9",
    "url": "https://cdn2.thecatapi.com/images/co9.jpg",
    "width": 900,
    "height": 600
  }
]
```

レスポンスにある`url`が猫画像のURLです。この値を取得して猫の画像をランダムに表示します。

## 画像を取得する関数を実装する

このステップでは、The Cat APIにリクエストし猫画像を取得する関数を実装します。次の実装をした`fetchImage`関数を`export default IndexPage`の後ろに追加してください。

```ts twoslash
const fetchImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
```

`fetch`はHTTPリクエストでリソースを取得するブラウザ標準のAPIです。戻り値として[Response](https://developer.mozilla.org/ja/docs/Web/API/Response)オブジェクトを返します。Responseオブジェクトの`json()`メソッドを実行することで、レスポンスのボディーをJSONとしてパースし、JavaScriptのオブジェクトとして取得できます。

`fetchImage`関数についている[`async`キーワード](/reference/promise-async-await#async関数)は、この関数が非同期処理を行うことを示すものです。`fetch`と`res.json`は非同期関数で、これらの処理を待つために、それぞれに[`await`キーワード](/reference/promise-async-await#await)がついています。

<!-- todo: async/awaitのリライトが完了したらリンク先を変更する -->

`fetchImage`関数がAPIを呼び出せているかテストするために、これを呼び出す処理を`fetchImage`関数の後ろに追加してください。

```tsx twoslash {15} title="pages/index.tsx"
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return <div>猫画像予定地</div>;
};
export default IndexPage;

const fetchImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

fetchImage(); // 追加
```

Chromeの開発者ツールを開いてからページをリロードしてください。「コンソール」タブで次のようなテキストが表示されていたら成功です。

![](/tutorials/nextjs/the-cat-api-response-is-shown-in-console.png)

`fetchImage`関数の動作確認が済んだら、この関数の呼び出しは不要になるので消してください。

## 関数の戻り値に型をつける

上で作った`fetchImage`関数の戻り値の型は`any`型です。そのため、呼び出し側で存在しないプロパティを参照しても気づけずにバグが発生する危険性があります。

```ts twoslash
const fetchImage = async () => {
  //  ^?
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

fetchImage().then((image) => {
  //                   ^?
  console.log(image.alt); // 存在しないプロパティを参照している
});
```

`image`には`alt`プロパティがありませんが、`image`が`any`型なので、上のような誤ったコードを書いても、コンパイル時に誤りに気づけません。

APIレスポンスの取り扱いはフロントエンドでバグが混在しやすい箇所なので、型を指定することで安全にAPIレスポンスを扱えるようにしていきます。

レスポンスに含まれる画像情報の型を`Image`として定義します。そして、`fetchImage`関数の戻り値を`Promise<Image>`として型注釈します。

```ts twoslash {1-5}
type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  //                       ^^^^^^^^^^^^^^^^型注釈
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
```

APIレスポンスには`url`以外のプロパティも含まれていますが、このアプリケーションで必要な情報は`url`だけなので、他のプロパティの型の定義は省略しています。もし、他のプロパティも必要になった場合でも、`Image`にプロパティの定義を追加していけばよいです。

`fetchImage`関数の戻り値が正しく型注釈がされていると、万が一APIレスポンスに存在しないプロパティを参照するコードを書いてしまっても、コンパイルエラーが発生することで問題に気がつけるようになります。

```ts twoslash
// @errors: 2339
type Image = { url: string };
declare const fetchImage: () => Promise<Image>;
// ---cut---
fetchImage().then((image) => {
  //               ^?
  console.log(image.alt); // 存在しないプロパティを参照している
});
```

:::info 厳密なレスポンスのチェック

上のコードは、サーバーサイドを100%信頼するコードになっています。クライアントサイドが期待するデータ構造を、サーバーサイドが必ず返すことを前提としたコードなのです。しかし、サーバーサイドは本当にデータ期待する構造を返してくれているでしょうか？

より防衛的にするなら、クライアントサイドではサーバーのレスポンスをチェックするほうが望ましいでしょう。チェックの一例として次のような実装も考えられます。

```ts twoslash
// @noErrors
type Image = {
  url: string;
};
// ---cut---
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  // 配列として表現されているか？
  if (!Array.isArray(images)) {
    throw new Error("猫の画像が取得できませんでした");
  }
  const image: unknown = images[0];
  // Imageの構造をなしているか？
  if (!isImage(image)) {
    throw new Error("猫の画像が取得できませんでした");
  }
  return image;
};

// 型ガード関数
const isImage = (value: unknown): value is Image => {
  // 値がオブジェクトなのか？
  if (!value || typeof value !== "object") {
    return false;
  }
  // urlプロパティが存在し、かつ、それが文字列なのか？
  return "url" in value && typeof value.url === "string";
};
```

このチェック処理では、型が不明な値を安全に型付けする[unknown型](../reference/statements/unknown.md)や、値の型をチェックしながら型付する[型ガード関数](../reference/functions/type-guard-functions.md)などのTypeScriptのテクニックも用いています。これらについては、ここでは理解する必要はありませんが、興味のある方はチュートリアルを終えてから解説をご覧ください。

このチュートリアルでは厳密さよりもシンプルさに重心を置くため、上のようなチェック処理はあえて追加せずに話を進めます。

:::

## ページを表示したときに画像を表示する

ページを表示したときに`fetchImage`を呼び出して、猫の画像を表示する処理を書いています。`IndexPage`関数の中身を次のように変更してください。

```tsx twoslash {2,5-16} title="pages/index.tsx"
import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
  // ❶ useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  // ❷ マウント時に画像を読み込む宣言
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url); // 画像URLの状態を更新する
      setLoading(false); // ローディング状態を更新する
    });
  }, []);
  // ❸ ローディング中でなければ、画像を表示する
  return <div>{loading || <img src={imageUrl} />}</div>;
};
export default IndexPage;

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
```

変更内容をひとつひとつ見ていきましょう。

❶ まず、Reactの`useState`関数を使い、`imageUrl`と`loading`の2つの状態を定義します。

```tsx twoslash
import { useState } from "react";
// ---cut---
const [imageUrl, setImageUrl] = useState("");
const [loading, setLoading] = useState(true);
```

`imageUrl`は画像のURLが代入される変数です。初期値は空文字列です。`loading`はAPIを呼び出し中かどうかを管理する変数です。初期値は呼び出し中を意味する`true`です。

❷ 次に、コンポーネントがマウントされたときに、APIから猫の画像情報を取得する処理を定義します。

```tsx twoslash
import { useEffect, useState } from "react";

const [imageUrl, setImageUrl] = useState("");
const [loading, setLoading] = useState(true);
// ---cut---
useEffect(() => {
  fetchImage().then((newImage) => {
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // ローディング状態を更新する
  });
}, []);
// ---cut-after---
type Image = { url: string };
declare const fetchImage: () => Promise<Image>;
```

Reactの`useEffect`関数を使用します。`useEffect`は2つの引数を指定しています。第1引数は処理内容、第2引数はどのタイミングで処理内容を実行するかの指定です。第2引数は空の配列`[]`になっています。空配列であるため一見すると不要そうに見えますが、これには「コンポーネントがマウントされたときのみ実行する」という重要な役割があるので省略しないでください。

`useEffect`関数の第1引数となる関数の処理を見てみましょう。`fetchImage`関数は非同期処理です。非同期処理が完了したタイミングで、`imageUrl`に画像URLをセットするために`setImageUrl`関数を呼び出します。同時に、ローディング状態を`false`に更新するために`setLoading`関数も呼び出します。

:::info `useEffect`には非同期関数は渡せない

`useEffect`に渡している関数は非同期処理をしているのに、`async`キーワードを使わずに`then`を使って記述していることに気がついた方もいるかもしれません。その方の中には、次のように非同期関数を渡す書き方にして、コードが読みやすくしたいと思う方もいるでしょう。

```ts twoslash
import { useState } from "react";

const [imageUrl, setImageUrl] = useState("");
const [loading, setLoading] = useState(true);
declare const useEffect: any;
type Image = { url: string };
declare const fetchImage: () => Promise<Image>;
// ---cut---
useEffect(async () => {
  const newImage = await fetchImage();
  setImageUrl(newImage.url);
  setLoading(false);
}, []);
```

しかし、`useEffect`には非同期関数を直接渡すことはできません。渡そうとすると、コンパイルエラーになります。

```ts twoslash
// @errors: 2345
import { useEffect } from "react";
// ---cut---
useEffect(async () => {
  /* 中略 */
}, []);
```

:::

❸ 最後に画像を表示するロジックです。`||`は論理和演算子で、`loading`が`false`のときに`<img>`要素を表示します。

```tsx twoslash
declare const loading: boolean;
declare const imageUrl: string;
const IndexPage = () => {
  // ---cut---
  return <div>{loading || <img src={imageUrl} />}</div>;
  // ---cut-after---
};
```

:::info JSXには文が書けない
上の条件分岐を見て「なぜ素直にif文を使わないのか？」と疑問の思ったかもしれません。これには理由があります。JSXの`{}`で囲った部分には、JavaScriptの式だけが書けます。ifは文であるため使うことができません。もし使おうとすると次の例のようにコンパイルエラーになります。

```tsx twoslash title="JSXの式には文が使えない"
// @errors: 1109 1381
declare const loading: boolean;
declare const imageUrl: string;
  // ---cut---
<div>{if (!loading) { <img src={imageUrl} /> }}</div>
```

したがって、JSXの式で条件分岐するには論理演算子や三項演算子を使う必要があります。

```tsx twoslash
declare const loaded: boolean;
declare const loading: boolean;
// ---cut---
<div>
  {loaded && <img src="..." />} ── 論理積演算子
  {loading || <img src="..." />} ── 論理和演算子
  {loading ? "読み込み中" : <img src="..." />} ── 三項演算子
</div>;
```

:::

変更内容の詳細は以上です。`IndexPage`の変更が済んだら、猫の画像が表示されているか確認してみてください。画像がちゃんと表示されているでしょうか。

![猫の画像がuseEffectによって表示されるようになった様子](/tutorials/nextjs/cat-image-is-displayed-by-use-effect.png)

## ボタンをクリックしたときに画像が更新されるようにする

ここではボタンをクリックしたときに、APIから新しい画像情報を取得し、表示中の画像を新しい画像に置き換える機能を作ります。次のように`IndexPage`コンポーネントに、`handleClick`関数とボタンを追加してください。

```tsx twoslash {13-25} title="pages/index.tsx"
import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []);
  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読込中フラグを倒す
  };
  return (
    <div>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );
};
export default IndexPage;

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
```

これでクリックしたら画像が更新されるようになります。うまく動いているかブラウザで確認してみてください。

<video width="600" controls="controls" loop="controls" autoplay="autoplay" muted="muted" playsinline="playsinline">
  <source src="/tutorials/nextjs/cat-image-is-changed-when-click-the-button.mp4" type="video/mp4" />
</video>

## Next.jsのSSRとデータフェッチAPI

Reactはクライアントサイドでのレンダリングに特化していますが、Next.jsはサーバーサイドレンダリング(server-side rendering; SSR)をサポートしています。これにより、初回読み込みの速度を向上させることができ、SEOやパフォーマンスにもよい影響を与えます。

SSRはウェブアプリケーションのレンダリングをサーバーサイドで行う技術のことです。通常、クライアントサイドレンダリング(CSR)では、ブラウザがHTML、CSS、JavaScriptファイルをダウンロードして、JavaScriptを使用してページをレンダリングします。これに対して、SSRではサーバーがHTMLを生成し、ブラウザに送信します。

Next.jsでSSRを行うには、次のデータフェッチAPIの関数を使います。

- `getServerSideProps`
- `getStaticProps`
- `getInitialProps`

これらの関数を使うことで、Next.jsで簡単にSSRを実装できます。

### getServerSideProps

`getServerSideProps`は、ページがリクエストされるたびにサーバーサイドで実行され、ページのプロパティを返す関数です。この関数を使用すると、リクエストごとにページのデータを取得できます。また、クライアントサイドでルーティングが発生した場合も、この関数がサーバーサイドで実行されます。

サーバーサイドでのみ実行されるため、`getServerSideProps`内でのみ利用しているモジュールや関数は、クライアントのコードにバンドルされません。これは、配信するファイルサイズを削減することにも繋がります。

サーバーサイドで実行されるため、データベースなどウェブに公開していないミドルウェアから直接データを取得するような処理も記述できます。

### getStaticProps

`getStaticProps`は、静的生成するページのデータを取得するための関数で、ビルド時に実行されます。この関数を使用すると、ビルド時にページのデータを取得しておき、クライアントからのリクエスト時にはそのキャッシュからデータを返すようになります。この関数は、リクエスト時や描画時にはデータ取得が実行されないことに注意が必要です。ユーザーログインが不要なランディングページや、内容のリアルタイムさが不要なブログなどの静的なページを構築するときに利用します。

### getInitialProps

`getInitialProps`は、SSR時にサーバーサイドでデータ取得の処理が実行されます。また、クライアントサイドでルーティングが発生した場合は、クライアント側でもデータの取得が実行されます。このAPIはサーバーとクライアントの両方で実行されるため、両方の環境で動作するように実装する必要があります。

`getInitialProps`は、Next.js 9までのバージョンで使われていた古い方法です。現在でもサポートされていますが、Next.js 10以降では、代わりに `getServerSideProps`や`getStaticProps`の使用を推奨しています。

## データフェッチAPIを使ってリクエスト時に初期画像を取得する

これまでに作ってきた`IndexPage`コンポーネントには、クライアントサイドで最初の画像を取得し表示していました。ここでは、データフェッチAPIの`getServerSideProps`を使って、サーバーサイドで初期画像を取得するように変更します。先に完成形のコードを示すと、次のようになります。

```tsx twoslash {1-2,4-18,34-43} title="pages/index.tsx"
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
  const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
```

上で行った変更をひとつひとつ見ていきましょう。まず、`getServerSideProps`関数を追加しました。この関数は、サーバーサイドで実行する処理を書きます。上のコードは画像情報を取得する処理になっています。`getServerSideProps`関数は、`IndexPage`コンポーネントが引数として受け取る`prop`を戻り値に含めます。`getServerSideProps`関数は、Next.jsに認識させるために`export`しておく必要があります。

次に、`IndexPage`関数は`getServerSideProps`が返す`props`を受け取れるように引数を追加してあります。`props`の`initialImageUrl`には初期画像のURLが入っていて、この値を`image`の初期値となるように、`useState`の引数に渡します。

初期画像はサーバーサイドで取得するようにしたので、クライアントサイドで初期画像を取得していた`useEffect`の部分は不要になります。

これで、ページをリクエストするタイミングで、サーバーサイドで画像情報が取得され、ランダムに猫画像が表示されるようになります。

## ビジュアルを作り込む

機能面が完成したので、最後にビジュアルデザインを作り込んでいきましょう。まず、スタイルシートを作成します。スタイルシートの内容は長くなるので、次のURLからスタイルシートをダウンロードしてください。ダウンロードしたら、`pages`ディレクトリに`index.module.css`として保存してください。

<https://raw.githubusercontent.com/yytypescript/random-cat/main/pages/index.module.css>

このスタイルを`IndexPage`コンポーネントに当てます。まず、`index.modules.css`をインポートします。`.modules.css`で終わるファイルはCSSモジュール(CSS Modules)と言うもので、CSSファイル内で定義したクラス名をTypeScriptからオブジェクトとして参照できるようになります。次に、各要素に`className`属性でクラス名を指定してください。

```tsx twoslash {3,8,9,12,13} title="pages/index.tsx"
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // 中略
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        他のにゃんこも見る
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};
// 以下略
// ---cut-after---
type Image = { url: string };
type Props = { initialImageUrl: string };
declare const fetchImage: () => Promise<Image>;
declare const handleClick: () => Promise<void>;
declare const imageUrl: string;
declare const loading: boolean;
```

以上でNext.jsを使った猫画像ジェネレーターの開発は完了です。

## プロダクションビルドと実行

Next.jsでは`next build`を実行することで最適化されたプロダクション用のコードを生成でき、`next start`で生成されたプロダクションコードを実行できます。このチュートリアルではボイラテンプレートを利用しているので、package.jsonにbuildコマンドとstartコマンドがすでに用意されています。`yarn build`と`yarn start`を実行して本番用のアプリケーションを実行してみましょう。

```sh
yarn build && yarn start
```

アプリケーション起動後に<http://localhost:3000>へブラウザでアクセスをすることで、本番用のアプリケーションの実行を確認できます。
