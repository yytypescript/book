# Next.jsで猫画像ジェネレーターを作ろう

## Next.jsの概要

Next.jsは、Webアプリケーションを作るためのフレームワークです。Next.jsはReactをベースに、モダンなWeb開発に必要な次の機能を追加しています。

- ルーティング: 所定のディレクトリ構成とファイル名でページを自動的にルーティング
- パフォーマンス最適化: サーバー側で事前にページを生成し、高速な初期表示を実現。画像の最適化やコード分割も自動で行う。
- CSSフレームワーク: Tailwind CSSやCSS Modulesなどのスタイリング方法をサポート
- バンドラー: webpackやBabelなどの設定を内部で行い、開発者が設定を気にする必要がない

また、UIなどのクライアントサイドだけでなく、サーバーサイドの処理もサポートしています。たとえば、データベースや外部APIとの通信をNext.jsから直接行えます。簡単なJSON APIを持たせることも可能です。

Next.jsはVercel社が開発を推進しており、同社は[Vercel](https://vercel.com/)というホスティングサービスを提供しています。そのため、Next.jsで構築したアプリケーションは簡単に公開できます。

このように、本格的なWebアプリケーションの開発にすぐさま臨めるようになっているのがNext.jsの魅力です。

## これから作るもの

このチュートリアルでは、題して「猫画像ジェネレーター」です。どんなものかというと、ボタンを押したら、猫画像のAPIから画像のURLを取得し、ランダムに可愛い猫画像を表示するシンプルなウェブアプリケーションです。

<video width="600" controls="controls" loop="controls" autoPlay="autoplay" muted="muted" playsInline="playsinline"   aria-label="猫画像ジェネレーター完成版のデモ動画。白背景のページ中央に猫の写真が表示され、その上の吹き出し風ボタン『他のにゃんこも見る』をクリックするたびに猫写真がランダムに切り替わる様子を示す" src="/tutorials/nextjs/nextjs-cat-image-generator-demo.mp4"></video>

最終的な成果物は[デモサイト](https://random-cat.typescriptbook.jp/)で確認できます。チュートリアルを開始する前に事前に触ってみることで、各ステップでどんな実装をしているかのイメージが掴みやすくなります。また、完成形のソースコードは[GitHub](https://github.com/yytypescript/random-cat)でご覧いただけます。

## このチュートリアルで学ぶこと

このチュートリアルでは、実務でよく使うNext.jsの機能を学べます。具体的には次のような内容です。

- Next.jsの新規プロジェクトの作成
- App Routerの使い方
- サーバーコンポーネントとクライアントコンポーネント
- サーバーアクションの使い方
- 外部API連携
- 機密情報となる資格情報(APIキー)の取り扱い

## このチュートリアルに必要なもの

このチュートリアルで必要なものは次のとおりです。

- Node.js v24以上
- npm v11以上 (Node.jsに同梱)
- ブラウザ (このチュートリアルではGoogle Chromeを想定しています)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

<!-- regression test: node -v と npm -v の結果を確認し、環境が適合していない場合、問題として報告してください。 -->

## Next.jsをセットアップする

最初に`npx create-next-app`コマンドでプロジェクトを作成します。`random-cat`はプロジェクト名となる部分です。この部分は好きな名前でも構いませんが、本チュートリアルでは`random-cat`として話を進めます。

```sh
npm create next-app@latest random-cat -y -- --yes
```

<!-- regression test: 上のコマンドはtmuxを用いて実行してください。AIエージェントが使えるターミナルはTTYがオフになっていて、ユーザーが見る出力と異なるためです。tmux new-session -d -s nextjs -c $PWD -x 256 "npm create next-app random-cat -y -- --yes && sleep infinity" -->

`create next-app`が正常に実行されたら、次のようなメッセージが表示されます。

```taml
> npx
> create-next-app random-cat --yes

Creating a new Next.js app in <green>/path/to/random-cat</green>.

<bold>Using npm.</bold>

Initializing project with template: app-tw


Installing dependencies:
- <cyan>next</cyan>
- <cyan>react</cyan>
- <cyan>react-dom</cyan>

Installing devDependencies:
- <cyan>@tailwindcss/postcss</cyan>
- <cyan>@types/node</cyan>
- <cyan>@types/react</cyan>
- <cyan>@types/react-dom</cyan>
- <cyan>eslint</cyan>
- <cyan>eslint-config-next</cyan>
- <cyan>tailwindcss</cyan>
- <cyan>typescript</cyan>


added 425 packages, and audited 426 packages in 12s

174 packages are looking for funding
  run `npm fund` for details

found <bold><green>0</green></bold> vulnerabilities

Generating route types...
✓ Types generated successfully

Initialized a git repository.

<green>Success!</green> Created random-cat at /path/to/random-cat
```

<!-- regression test: 出力結果が上のようになっているか確認してください。random-catへのパス、所要時間などの環境依存は確認対象外。パッケージ数の数値も対象外。tmuxではtmux capture-pane -p -e -t nextjs -S - -E -で出力を取得できます。 -->

これでプロジェクトのセットアップは完了です。作成されたディレクトリに移動してください。

```sh
cd random-cat
```

プロジェクトのファイル構成が次のようになっているか確認してください。

```text
.
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── node_modules/
├── public/
├── .gitignore
├── eslint.config.mjs
├── .next/
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

<!-- regression test: 上のファイル構成が異なった場合、問題として取り上げてください。 -->

## 開発サーバーを起動する

次のコマンドを実行して、開発サーバーを起動してください。

```sh
npm run dev
```

開発サーバーが起動したら、ターミナルに表示されているURLにブラウザでアクセスしてください。デフォルトでは<http://localhost:3000>です。

![ブラウザで表示されたNext.jsアプリの初期画面。中央に「To get started, edit the page.tsx file.」と記載され、下部に「Deploy Now」および「Documentation」ボタンが配置されている。](/tutorials/nextjs/nextjs-initial-screen-dark-mode.png)

<!-- regression test: 上の画像と同じ画像が表示されているか確認します。 -->

## ページコンポーネント

Next.jsでは、`app`ディレクトリ配下の構造がページのルーティングに対応します。たとえば、`app/page.tsx`は`/`にアクセスしたときに表示されるページとなります。`app/about/page.tsx`なら`/about`へのアクセスで表示されます。

この`page.tsx`ファイルのことを、Next.jsの用語でページコンポーネント(page component)と呼びます。

## トップページのページコンポーネントを作る

`app/page.tsx`を次のように編集して、トップページのページコンポーネントを作成します。これは「猫画像予定地」が表示されるだけの単純なものです。

```tsx twoslash title="app/page.tsx"
export default function Home() {
  return <div>猫画像予定地</div>;
}
```

<!-- regression test: 上のコードがエディタでエラーなく書けたか確認します。 -->

Next.jsにファイルをページコンポーネントとして認識させるには、次の2つのルールを守る必要があります：

1. ファイル名は`page.tsx`であること
2. 関数が`export default`でエクスポートされていること

これさえ守れば、`app`ディレクトリ配下にファイルを作成するだけで、自動的にルーティングされます。関数名は何でも構いませんが、`Home`や`Page`など、ページコンポーネントとしてわかりやすい名前を使うことが一般的です。

コンポーネントを実装したら、ブラウザをリロードして画面に「猫画像予定地」と表示されているか確認してください。

![ブラウザで表示されたNext.jsアプリ。左上に「猫画像予定地」というテキストのみがあるプレースホルダー画面](/tutorials/nextjs/nextjs-cat-placeholder-dark-mode.png)

<!-- regression test: 上の画像と同じ画像が表示されているか確認します。 -->

## The Cat API

このチュートリアルでは猫の画像をランダムに表示するにあたり[The Cat API](https://thecatapi.com/)を利用します。このAPIは猫の画像を取得したり、品種ごとの猫の情報を取得したりできます。

このAPIは無料で月間10,000リクエストまで利用できます。また、一度に要求する画像の数が10枚までであれば、APIキー認証なしに利用できます。このチュートリアルの実施にあたっては、いずれの条件も満たすはずなので、有料プランの契約やAPIキーの取得は必要ありません。

今回のチュートリアルでは[APIドキュメント](https://docs.thecatapi.com/)のQuickstartに記載されている`/v1/images/search`へリクエストを投げてランダムな猫の画像を取得します。

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

<!-- regression test: 上のレスポンスと構造が異なった場合、問題として取り上げてください。 -->

レスポンスにある`url`が猫画像のURLです。この値を取得して猫の画像をランダムに表示します。

## 画像を取得する関数を実装する

このステップでは、The Cat APIから猫画像を取得する関数を実装します。`app`ディレクトリに`fetch-image.ts`というファイルを新たに作り、次のコードを書いてください。

```tsx twoslash title="app/fetch-image.ts"
// APIから画像を取得する関数
export async function fetchImage() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: 画像情報を取得しました", images);
  return images[0]; // 画像情報の配列から最初の要素を返す
}
```

<!-- regression test: 上のコードがエディタでエラーなく書けたか確認します。 -->

[`fetch`](https://developer.mozilla.org/ja/docs/Web/API/Window/fetch)はHTTPリクエストでリソースを取得するブラウザ標準のAPIです。戻り値として[Response](https://developer.mozilla.org/ja/docs/Web/API/Response)オブジェクトを返します。Responseオブジェクトの`json()`メソッドを実行することで、レスポンスのボディーをJSONとしてパースし、JavaScriptのオブジェクトとして取得できます。

`fetchImage`関数についている[`async`キーワード](/reference/asynchronous/async)は、この関数が非同期処理を行うことを示すものです。`fetch`と`res.json`は非同期関数で、これらの処理を待つために、それぞれに[`await`キーワード](/reference/asynchronous/await)がついています。

<!-- todo: async/awaitのリライトが完了したらリンク先を変更する -->

この関数は`export`キーワードを使って外部からインポートできるようにしています。後でこの関数を`page.tsx`でインポートして使うためのものです。

## ページにアクセスしたときにAPIを呼び出す

上で実装した`fetchImage`関数を使って、ページにアクセスしたときにAPIを呼び出すようにします。`app/page.tsx`を次のように編集してください。

```tsx twoslash {1-2,4-11} title="app/page.tsx"
// @filename: fetch-image.ts
export declare function fetchImage(): Promise<any>;
// @filename: types.ts
declare module "next/server" {
  export function connection(): Promise<void>;
}
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
import { connection } from "next/server"; // 追加
import { fetchImage } from "./fetch-image"; // 追加

export default async function Home() {
  //           ^^^^^(1) asyncキーワードを追加
  // (2) ビルド時にfetchImageの結果が固定されないようにする
  await connection();
  // (3) APIから画像を取得
  const image = await fetchImage();
  // (4) 画像URLをコンソールに表示
  console.log("Home: 画像情報を取得しました", image);
  return <div>猫画像予定地</div>;
}
```

<!-- regression test: 上のindex.tsxの内容でpage.tsxを編集してみて、エラーなく書けたか確認します。 -->

このコードは、ページにアクセスがあったときに、The Cat APIを呼び出し、その結果をコンソールに表示するものです。

(2)の`await connection()`は、`fetchImage`関数の呼び出しをリクエスト時に行わせるためのものです。Next.jsには、ビルド時にページを生成する静的サイト生成(SSG)という機能があります。`await connection()`がない状態でアプリをビルドすると、ビルド時に`fetchImage`関数が実行され、画像が固定化されます。その結果、実行時にブラウザをリロードしても画像が変わらない状態になります。

本アプリの要件としては、ブラウザをリロードしたときに、異なる画像を表示したいので[`connection`](https://nextjs.org/docs/app/api-reference/functions/connection)を呼び出しています。ちなみに、今は`npm run dev`で開発モードになっているため、`connection`がなくてもリロードで画像が変わります。

(3)は`fetchImage`関数を呼び出す部分です。この関数は非同期関数なので、`await`キーワードを使って呼び出しています。JavaScriptには`await`キーワードを使うには、関数に`async`キーワードをつける必要があります。これを忘れるとエラーが発生します。(1)で`async`キーワードを追加しているのはそのためです。

(4)は取得したデータをコンソールに表示する部分です。これは実装中に「正しくデータが取得できているか」を確認するための一時的なコードです。後で画像を表示する処理に置き換えます。

ここで、ブラウザの開発者ツールを開いてコンソールを確認してみましょう。ブラウザで右クリックして「検証」または「開発者ツール」を選択し、「Console」タブを選びます。

コンソールには「Home: 画像情報を取得しました」と表示されているはずです。これが`console.log`で出力したメッセージです。

![Next.jsアプリの画面。上部に「猫画像予定地」と表示され、下半分でChrome DevToolsのコンソールが開き、猫画像のURLやサイズを含むログが出力されている](/tutorials/nextjs/nextjs-cat-placeholder-console-log.png)

<!-- regression test: 上の画像と同じ画像が表示されているか確認します。コンソールは開いていなくても問題ありません。 -->

ログには「Server」と表示されています。これは`Home`がサーバーサイドで実行されたためです。このことについては後ほど詳しく説明するので、一旦は気にしないでください。

## 関数の戻り値に型をつける

`image`の型は`any`型になっています。`any`型は「型チェックを行わない」型です。そのため、存在しないプロパティを参照しても気づけずにバグが発生する危険性があります。

[any](../reference/values-types-variables/any.md)

```tsx twoslash {8,10} title="app/page.tsx"
// @filename: fetch-image.ts
export declare function fetchImage(): Promise<any>;
// @filename: types.ts
declare module "next/server" {
  export function connection(): Promise<void>;
}
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
import { connection } from "next/server";
import { fetchImage } from "./fetch-image";

export default async function Home() {
  // ビルド時にfetchImageの結果が固定されないようにする
  await connection();
  // APIから画像を取得
  const image = await fetchImage();
  //    ^?
  // 画像URLをコンソールに表示
  console.log("Home: 画像情報を取得しました", image.name); // 存在しないnameプロパティを参照している
  return <div>猫画像予定地</div>;
}
```

<!-- regression test: 上のコードのindex.tsxの部分をpage.tsxに書き、エラーなく書けたか確認します。 -->

`image`には`name`プロパティがありませんが、`image`が`any`型なので、上のような誤ったコードを書いてもTypeScriptは何も警告してくれません。

APIレスポンスの取り扱いはフロントエンドでバグが混在しやすい箇所なので、型を指定することで安全にAPIレスポンスを扱えるようにしていきます。

レスポンスに含まれる画像情報の型を`Image`として定義します。そして、`fetchImage`関数の戻り値を`Promise<Image>`として型注釈します。

```tsx twoslash {1-4,7-8} title="app/fetch-image.ts"
// 画像情報の型定義
type Image = {
  url: string;
};

// APIから画像を取得する関数
export async function fetchImage(): Promise<Image> {
  //                              ^^^^^^^^^^^^^^^^型注釈を追加
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: 画像情報を取得しました", images);
  return images[0]; // 画像情報の配列から最初の要素を返す
}
```

APIレスポンスには`url`以外のプロパティも含まれていますが、このアプリケーションで必要な情報は`url`だけなので、他のプロパティの型の定義は省略しています。もし、他のプロパティも必要になった場合でも、`Image`にプロパティの定義を追加していけばよいです。

`fetchImage`関数の戻り値が正しく型注釈がされていると、万が一APIレスポンスに存在しないプロパティを参照するコードを書いてしまっても、TypeScriptが警告するため問題に気がつけるようになります。

```tsx twoslash {4-5,7} title="app/page.tsx"
// @errors: 2339
export default async function Home() {
  // ビルド時にfetchImageの結果が固定されないようにする
  await connection();
  // APIから画像を取得
  const image = await fetchImage();
  //    ^?
  // 画像URLをコンソールに表示
  console.log("Home: 画像情報を取得しました", image.name); // 存在しないnameプロパティを参照している
  return <div>猫画像予定地</div>;
}
// ---cut-after---
export declare function fetchImage(): Promise<Image>;
type Image = {
  url: string;
};
export declare function connection(): Promise<void>;
```

:::info 厳密なレスポンスのチェック

上のコードは、APIが返すデータ構造を100%信頼するコードになっています。JSON文字列をパースした結果が、次のような構造になっていることを暗黙的な前提としています:

- 配列である
- 配列の要素がオブジェクトである
- そのオブジェクトに`url`プロパティが存在する
- `url`プロパティの値が文字列である

場合によっては、APIが信頼できない場合もあるでしょう。より安全にするなら、APIレスポンスのチェック処理を追加することもTypeScriptでは可能です。`fetchImage`関数にチェック処理を追加した場合、次のようになります:

```ts twoslash
// @noErrors
type Image = {
  url: string;
};
// ---cut---
// APIから画像を取得する関数
export async function fetchImage(): Promise<Image> {
  //                              ^^^^^^^^^^^^^^^^型注釈
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  //            ^^^^^^^any型にさせないためにunknown型にする
  console.log("画像情報を取得しました", images);
  if (!isImageArray(images)) {
    throw new Error("取得したデータが正しくありません");
  }
  if (!images[0]) {
    throw new Error("取得したデータが空です");
  }
  return images[0]; // 画像情報の配列から最初の要素を返す
}

// Image型の配列であるかチェックする関数
function isImageArray(value: unknown): value is Image[] {
  // valueが配列であること
  if (!Array.isArray(value)) {
    return false;
  }
  // 配列の要素が全てImage型であること
  if (!value.every(isImage)) {
    return false;
  }
  return true;
}

// Image型であるかチェックする関数
function isImage(value: unknown): value is Image {
  // valueがオブジェクトであること
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // valueにurlフィールドがあること
  if (!("url" in value)) {
    return false;
  }
  // urlフィールドが文字列であること
  if (typeof (value as Image).url !== "string") {
    return false;
  }
  return true;
}
```

このチェック処理では、型が不明な値を安全に型付けする[unknown型](../reference/statements/unknown.md)や、値の型をチェックしながら型付する[型ガード関数](../reference/functions/type-guard-functions.md)などのTypeScriptのテクニックも用いています。これらについては、ここでは理解する必要はありませんが、興味のある方はチュートリアルを終えてから解説をご覧ください。

上のサンプルコードはTypeScriptの機能だけで安全性を高める書き方です。見てのとおり手続き的なコードで、「型安全性を高めるために、ここまで沢山のコードを書く必要があるのか」と感じることでしょう。この問題を解決するために、[zod](https://zod.dev/)や[valibot](https://valibot.dev/)や[typebox](https://github.com/sinclairzx81/typebox)をはじめとした宣言的な型チェックライブラリを使うこともできます。興味があれば見てみてください。

チェック処理をどこまで厳密にやるかは自明な基準がありません。チェックすれば安全性は高まる一方で、実装保守コストは増加し、実行時パフォーマンスにも影響があります。バランスを取ることが実務では重要です。そして、TypeScriptはどのあたりにバランスを置く場合でも、柔軟に対応できる言語でもあります。
:::

## ページを表示したときに画像を表示する

画像データが取得できるようになったので、ここではページを表示したときに、猫の画像を表示する処理を書いていきましょう。

まず、画像を表示するためのReactコンポーネントを作成します。`app/cat-image.tsx`というファイルを新たに作成し、次のコードを記述してください。

```tsx twoslash title="app/cat-image.tsx"
// コンポーネントの引数を定義する
type CatImageProps = {
  url: string;
};

// 画像を表示するコンポーネント
export function CatImage({ url }: CatImageProps) {
  return (
    <div>
      <img src={url} />
    </div>
  );
}
```

<!-- regression test: 上のコードがエディタでコンパイルエラーなく書けているかを確認します。 -->

この`CatImage`コンポーネントは`url`というプロパティを受け取り、そのURLを使って猫の画像を表示する作りになっています。

次に、`app/page.tsx`を次のように編集して、猫画像を表示するコンポーネントを使うようにします。

```tsx twoslash {2,10-11} title="app/page.tsx"
// @filename: fetch-image.ts
type Image = {
  url: string;
};
export declare function fetchImage(): Promise<Image>;
export {};
// @filename: cat-image.tsx
type CatImageProps = {
  url: string;
};
export declare function CatImage({ url }: CatImageProps): JSX.Element;
export {};
// @filename: types.ts
declare module "next/server" {
  export function connection(): Promise<void>;
}
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
import { connection } from "next/server";
import { CatImage } from "./cat-image"; // 追加
import { fetchImage } from "./fetch-image";

export default async function Home() {
  // ビルド時にfetchImageの結果が固定されないようにする
  await connection();
  // APIから画像を取得
  const image = await fetchImage();
  // 画像のURLを渡す
  return <CatImage url={image.url} />;
}
```

<!-- regression test: app/page.tsxの内容を、上のコードのindex.tsxの内容に書き換えて、コンパイルエラーなく書けているかを確認します。 -->

`CatImage`コンポーネントをインポートして、`Home`コンポーネントの中で使うようにします。`CatImage`コンポーネントに`url`プロパティを渡すことで、猫の画像を表示するようになります。

`page.tsx`の変更が済んだら、猫の画像が表示されているか確認してみてください。画像がちゃんと表示されているでしょうか。

![Next.jsアプリでページを表示した直後のブラウザ画面。実装したCatImageコンポーネントにより、テレビを見つめる2匹の猫の写真が全面に表示されている](/tutorials/nextjs/nextjs-cat-image-display-result.png)

<!-- regression test: 上の画像と同じ画像が表示されているか確認します。猫画像の内容はランダムであるため、異なる画像が表示されていても問題ありません。 -->

## ボタンクリックで画像が更新されるようにする

このセクションでは、ページ表示時に画像を読み込むだけでなく、ユーザーが「他のにゃんこも見る」ボタンをクリックしたときに新しい猫画像を取得して表示する機能を実装します。

`app/cat-image.tsx`を次のように編集してください。

```tsx twoslash {1,11-12,14-19,23-26} title="app/cat-image.tsx"
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
"use client"; // (1) use clientを指定

import { useState } from "react"; // 追加
import { fetchImage } from "./fetch-image";

type CatImageProps = {
  url: string;
};

export function CatImage({ url }: CatImageProps) {
  // (2) useStateを使って状態を管理
  const [imageUrl, setImageUrl] = useState(url);

  // (3) 画像を取得する関数を定義
  const refreshImage = async () => {
    setImageUrl(""); // 初期化
    const image = await fetchImage();
    setImageUrl(image.url);
  };

  return (
    <div>
      {/* (4) ボタンの表示 */}
      <button onClick={refreshImage}>他のにゃんこも見る</button>
      {/* (5) 画像の表示 */}
      {imageUrl && <img src={imageUrl} />}
    </div>
  );
}
// ---cut-after---
// @filename: fetch-image.ts
type Image = {
  url: string;
};
export declare function fetchImage(): Promise<Image>;
export {};
```

<!-- regression test: 上のコードがエディタでコンパイルエラーなどがなく書けているか確認します。 -->

変更内容をひとつひとつ見ていきましょう。

```ts
// (2) useStateを使って状態を管理
const [imageUrl, setImageUrl] = useState<string>(url);
```

`useState`はReactのフック(hook)のひとつで、コンポーネント内で状態を管理するための仕組みです。状態とはコンポーネントの表示に影響する値であり、ユーザーの操作や非同期処理によって変化する可能性のあるデータです。

`const [imageUrl, setImageUrl] = useState(url);`という記述を分解すると:

- `imageUrl`は状態変数で、現在の猫画像のURLを保持します。
- `setImageUrl`は状態を更新するための関数です。この関数を呼び出すことで`imageUrl`の値を変更できます。
- `useState`には初期値として`url`を渡しています。

`imageUrl`の状態が変わると、Reactはコンポーネントの再レンダリングを行います。つまり、`CatImage`コンポーネントが新しい状態を反映して画面に表示されるということです。このため、画像URLの取得時に`setImageUrl`を呼び出すだけで、自動的に新たな画像が表示されるようになります。

`useState`はクライアントサイドの機能なので、コンポーネントの先頭に`"use client"`というディレクティブを追加する必要があります。詳しくは後述します。

```ts
// (3) 画像を取得する関数を定義
const refreshImage = async () => {
  setImageUrl(""); // 初期化
  const image = await fetchImage();
  setImageUrl(image.url);
};
```

ここでは`refreshImage`という非同期関数を追加しています。この関数は画像を再取得する処理を行います。`async`キーワードをつけているのは、関数内で`fetchImage`を`await`しているためです。`refreshImage`を`CatImage`関数の中に書いている理由は、`setImageUrl`関数を使うためです。

関数の中も詳しく見てみましょう。まず、`setImageUrl("")`で画像URLを初期化しています。これはユーザー体験向上のためです。初期化しないと、再取得完了までに古い画像が表示され続けます。これだと、ボタンをクリックしても見た目の変化がありません。ユーザーが「本当にクリックが効いたのか？」と疑問に思う可能性があります。初期化にすることで、「現在新しい画像を読み込み中です」という状態を視覚的に伝えられます。特にレスポンスが遅いときは、このステップが重要になります。

`setImageUrl(image.url)`を呼び出すと、`imageUrl`状態変数が更新され、コンポーネントが再レンダリングされます。新しい`imageUrl`の値を使って、JSXの`{imageUrl && <img src={imageUrl} />}`部分が再評価され、新しい猫画像が画面に表示されます。

つまり、この`refreshImage`関数呼び出すだけで「画面上の猫画像を新しいものに差し替える」という視覚的な変化を起こせるようになるのです。

<!--prettier-ignore-->
```ts
{/* (4) ボタンの表示 */}
<button onClick={refreshImage}>他のにゃんこも見る</button>
```

JSXの`onClick={refreshImage}`属性を使って、ボタンのクリックイベントと`refreshImage`関数を紐づけています。この記述により、ユーザーがボタンをクリックしたときに`refreshImage`関数が呼び出されるようになります。

<!--prettier-ignore-->
```ts
{/* (5) 画像の表示 */}
{imageUrl && <img src={imageUrl} />}
```

このコードは、「条件付きレンダリング」という技法を使って画像の表示と非表示を切り替えています。これは論理演算子`&&`を利用したJSXの構文で、次のように動作します：

1. `imageUrl`が空文字列の場合、左辺が「偽」扱いとなり、右辺の`<img>`は評価されません。よって、何も表示されません。
2. `imageUrl`が空文字列でない場合、左辺が「真」扱いとなり、右辺の`<img>`が評価されます。よって、画像が表示されます。

これにより、`imageUrl`が空文字列の間では画像は表示されず、APIから画像URLが取得できて`setImageUrl`で状態が更新されると画像が表示されるようになります。

:::info JSXには文が書けない

上の条件分岐を見て「なぜ素直にif文を使わないのか？」と疑問の思ったかもしれません。これには理由があります。JSXの`{}`で囲った部分には、JavaScriptの式だけが書けます。ifは文であるため使うことができません。もし使おうとすると次の例のようにコンパイルエラーになります。

```tsx title="JSXの式には文が使えない"
<div>{if (imageUrl) { <img src={imageUrl} /> }}</div>
```

したがって、JSXの式で条件分岐するには論理演算子や三項演算子を使う必要があります。

```tsx twoslash
declare const imageUrl: string;
// ---cut---
<div>
  {imageUrl && <img src="..." />} ── 論理積演算子
  {!imageUrl || <img src="..." />} ── 論理和演算子
  {imageUrl ? <img src="..." /> : "読み込み中"} ── 三項演算子
</div>;
```

ちなみに、JavaScriptではif文の代わりに論理演算子を使うパターンのことを、[短絡評価(short-circuit evaluation)](/reference/jsx#%E7%9F%AD%E7%B5%A1%E8%A9%95%E4%BE%A1)と呼びます。

:::

これでクリックしたら画像が更新されるようになります。うまく動いているかブラウザで確認してみてください。

<video width="600" controls="controls" loop="controls" autoPlay="autoplay" muted="muted" playsInline="playsinline" aria-label="Next.jsアプリのデモ。ページ読み込み直後に猫の写真が表示され、ユーザーが「他のにゃんこも見る」ボタンをクリックすると画像が一旦消え、新しい猫の写真に置き換わる様子を示す" src="/tutorials/nextjs/nextjs-cat-image-refresh-demo.mp4"></video>

<!-- regression test: 上の動画と同じ動画が表示されているか確認します。猫画像の内容はランダムであるため、異なる画像が表示されていても問題ありません。重要なことは、クリックしたら画像が更新されるかどうかです。 -->

## Next.jsのサーバーサイド機能

ここでは説明を省略してきたNext.jsのサーバーサイド機能について説明します。特に、後回しにした次の疑問に答えたいと思います。

- `Home`コンポーネントがサーバーで実行されたらしいが、どういうことか？
- なぜクライアントサイド機能には`"use client"`を指定する必要があるのか？

歴史を振り返ると、Reactはブラウザ上でのみ動作するクライアントサイドのライブラリとして誕生しました。当初はクライアントサイドでUIを構築するさまざまな課題を解決してくれることから、広く使われるようになりました。

しかし、クライアントサイドだけでは解決できない課題もありました。特に、SEO(検索エンジン最適化)や初期表示速度の問題です。これらの問題を解決するために、Reactはサーバーサイドレンダリング(SSR)や静的サイト生成(SSG)などの機能を持つようになりました。

Next.jsは、SSRやSSGを簡単に実装できるだけでなく、APIルート(route)を使ってサーバーサイドのデータにもアクセスしやすいフレームワークとして人気を集めました。ここまで来ると、Next.jsとReactは単なる「Web APIのクライアント」ではなくなり、サーバーサイドとシームレスに連携するのが当たり前になったのです。

最近のNext.jsは、サーバーサイド機能を強力にサポートしています。

- サーバーコンポーネント（Reactコンポーネントをサーバー側でレンダリングする機能）
- APIルート (簡単なサーバーサイドAPIを作成する機能)
- サーバーアクション（フォームの送信などのユーザー操作に応じてサーバー側の処理を実行する機能）
- ミドルウェア（リクエストとレスポンスの間に処理を挟む機能）
- 静的サイト生成

これらの機能を使うことで、次のようなことが簡単にできるようになります:

- 初期ロード時のパフォーマンス向上
- SEO（検索エンジン最適化）の強化
- セキュリティの向上（APIキーなどの秘密情報をクライアントに公開せずに使用できる）
- 認証や認可の実装
- サーバーサイドのデータベース直接アクセス

本チュートリアルでは、サーバーサイド機能の中でも特によく使う「サーバーコンポーネント」に焦点を当てて説明します。

「サーバーコンポーネント」があるということはそれに対して「クライアントコンポーネント」もあります。まずはこの2つの特徴を見ていきましょう。

## クライアントコンポーネント

クライアントコンポーネントは、ブラウザで実行されるReactコンポーネントです。ファイルの先頭に`"use client"`ディレクティブを記述することで、そのファイル内のコンポーネントがクライアントコンポーネントであることを明示します。このチュートリアルで作成した`CatImage`はクライアントコンポーネントでした。

クライアントコンポーネントの特徴としては次のようなものがあります：

1. `useState`や`useEffect`などにより、クリックや入力などの操作に対応できる。
2. `window`や`document`などのブラウザ専用APIが使える。
3. コンポーネント内でUIの状態を保持できる

本チュートリアルで作成した`CatImage`コンポーネントでは、`useState`で画像URLを保持し、ボタンクリックで画像を更新する処理を実装しました。これらはクライアントコンポーネントの特徴を活かしたものです。

## サーバーコンポーネント

サーバーコンポーネントは、サーバー上でレンダリングされるReactコンポーネントです。`"use client"`なしでコンポーネントを定義すると、サーバーコンポーネントになります。上で作成した`Home`コンポーネントはサーバーコンポーネントです。

:::info サーバーコンポーネントの特徴

サーバーコンポーネントには、クライアントコンポーネントにはないいくつかの特徴があります。

1. **サーバー上のリソースへアクセスできる**
   データベースやファイルシステム、インターネット非公開の内部APIなどが直接利用できます。
2. **秘密情報を安全にあつかえる**
   クライアントコンポーネントでは、APIキーなどの秘密情報を含めると、ブラウザの開発者ツールなどで見られてしまう恐れがあります。サーバーコンポーネントではAPI呼び出しの結果のみがクライアントに送られるので、秘密情報を安全に使えます。
3. **SEOに有利**
   クライアントコンポーネントは、コンテンツがHTMLに含まれない場合があるため、検索エンジンがページの内容を理解できないことがあります。サーバーコンポーネントは、サーバー上でコンテンツがレンダリングされるため、SEO対策にも有利です。
4. **API通信が効率化できる**
   クライアントサイドでのデータ取得では、多数のユーザーが同時にアクセスすると、同じデータに対する重複したAPIリクエストがバックエンドサーバーに大きな負荷をかけることがあります。サーバーコンポーネントでは、サーバー側でデータを取得し、Next.jsのキャッシュ機能と組み合わせることで、データ取得を効率化できます。これにより、バックエンドの負荷が軽減され、ユーザー体験も向上します。
5. **初期表示速度が向上する**
   サーバーコンポーネントは、サーバー上でレンダリングされるため、初期HTMLがクライアントに送信されるまでの時間が短縮されます。これにより、ユーザーがページを表示するまでの待ち時間が短縮され、ユーザー体験が向上します。

:::

## サーバーアクションを使う

解説ばかりだと退屈なので、ここからはコーディングに戻りましょう。上で作成した`fetchImage`関数は、サーバーコンポーネントである`Home`と、クライアントコンポーネントである`CatImage`の両方から呼び出されています。

ここで疑問が生まれないでしょうか？「`fetchImage`はサーバーサイドで実行されるのか、それともクライアントサイドで実行されるのか？」という疑問です。答えは「両方」です。`fetchImage`は`Home`から呼び出されるときはサーバーサイドで実行され、`CatImage`から呼び出されるときはクライアントサイドで実行されます。

これを常にサーバーサイドで実行されるようにしてみましょう。`fetch-image.ts`の先頭に`"use server"`というディレクティブを追加します。これにより、`fetchImage`関数は常にサーバーサイドで実行されるようになります。

```tsx twoslash {1} title="app/fetch-image.ts"
"use server"; // 追加

// 画像情報の型定義
type Image = {
  url: string;
};

// APIから画像を取得する関数
export async function fetchImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: 画像情報を取得しました", images);
  return images[0]; // 画像情報の配列から最初の要素を返す
}
```

このように`"use server"`を指定された関数は、サーバーサイドで実行されるようになります。このような関数を「サーバーアクション」と呼びます。サーバーアクションは、クライアントコンポーネントからもまるでクライアントサイドの関数であるかのようにシームレスに呼び出すことができます。

ブラウザの開発ツールでネットワークを確認してみてください。「他のにゃんこも見る」ボタンをクリックしたときに発生する通信が`localhost`に対するものになっているのがわかります。

また、`npm run dev`を実行しているターミナルには、サーバーサイドのログとして「fetchImage: 画像情報を取得しました」と表示されているはずです。これにより、`fetchImage`関数がサーバーサイドで実行されていることが確認できます。

## APIキーを使う

The Cat APIは、APIキーを使わずに利用できるAPIです。しかし、実務で作るアプリケーションで利用するAPIでは、APIキーが必要になることが多いです。ここでは、APIキーをNext.jsでどう使ったらいいかを学び、実務で活かせるスキルを身につけてみましょう。

Next.jsでは、環境変数を使ってAPIキーを管理するのが一般的です。環境変数は`.env`ファイルに定義します。例として、`CAT_API_KEY`という環境変数を使うことにします。プロジェクトのルートディレクトリに`.env`というファイルを作成し、次のように記述してください。

```bash title=".env"
CAT_API_KEY=DEMO_KEY
```

次に、環境変数をロードするためのコードを追加します。`app/env.ts`というファイルを作成し、次のように書いてください。

```ts twoslash title="app/env.ts"
if (!process.env.CAT_API_KEY) {
  throw new Error("環境変数 CAT_API_KEY が設定されていません");
}

export const CAT_API_KEY = process.env.CAT_API_KEY;
```

最後に、`fetch-image.ts`を次のように編集します。

```tsx twoslash {3,10-12} title="app/fetch-image.ts"
// @filename: fetch-image.ts
// ---cut---
"use server";

import { CAT_API_KEY } from "./env"; // 追加

type Image = {
  url: string;
};

export async function fetchImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search", {
    headers: { "x-api-key": CAT_API_KEY }, // 追加
  });
  const images = await res.json();
  console.log("fetchImage: 画像情報を取得しました", images);
  return images[0];
}
// ---cut-after---
// @filename: env.ts
export declare const CAT_API_KEY: string;
```

<!-- regression test: 上のコードがエディタでコンパイルエラーなく書けているかを確認します。 -->

このようにAPIキーを環境変数として管理することで、ソースコードにAPIキーを直接書かずに済みます。

## ビジュアルを作り込む

機能面が完成したので、最後にビジュアルデザインを作り込んでいきましょう。先ほど実装したサーバーコンポーネントとクライアントコンポーネントの構成を活かしながら、アプリケーションをより魅力的にします。

まず、スタイルシートを作成します。スタイルシートの内容は長くなるので、次のURLからスタイルシートをダウンロードしてください。ダウンロードしたら、`app`ディレクトリに`page.module.css`として保存してください。

<https://raw.githubusercontent.com/yytypescript/random-cat/main/app/page.module.css>

```bash
cd app
curl https://raw.githubusercontent.com/yytypescript/random-cat/main/app/page.module.css > page.module.css
```

Next.jsでは、サーバーコンポーネントでもクライアントコンポーネントでもCSSモジュールを使用できます。`.module.css`で終わるファイルはCSSモジュール(CSS Modules)と言うもので、CSSファイル内で定義したクラス名をTypeScriptからオブジェクトとして参照できるようになります。

ここでは`cat-image.tsx`のクライアントコンポーネントにスタイルを適用します。まず、CSSモジュールを使うために次の2つの手順が必要です：

1. インポート: `import styles from "./page.module.css";`という行を追加して、CSSモジュールをインポートします。これにより`styles`オブジェクトを通してCSSのクラス名にアクセスできるようになります。
2. className属性: JSX要素に`className={styles.クラス名}`という形式でスタイルを適用します。たとえば`<div className={styles.page}>`のように指定すると、CSSファイル内の`.page`クラスのスタイルがその`div`要素に適用されます。

この方法の利点は、クラス名の衝突を避けられることです。CSSモジュールは内部的にクラス名をユニークな値に変換するため、他のコンポーネントで同じクラス名を使っていても問題が起きません。

```tsx twoslash {5,21,22,25,26} title="app/cat-image.tsx"
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
"use client";

import { useState } from "react";
import { fetchImage } from "./fetch-image";
import styles from "./page.module.css"; // 追加

type CatImageProps = {
  url: string;
};

export function CatImage({ url }: CatImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(url);

  const refreshImage = async () => {
    setImageUrl(""); // 初期化
    const image = await fetchImage();
    setImageUrl(image.url);
  };

  return (
    <div className={styles.page}>
      <button onClick={refreshImage} className={styles.button}>
        他のにゃんこも見る
      </button>
      <div className={styles.frame}>
        {imageUrl && <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
}
// ---cut-after---
// @filename: fetch-image.ts
type Image = {
  url: string;
};
export declare function fetchImage(): Promise<Image>;
export {};
```

<!-- regression test: 上のコードがエディタでコンパイルエラーなく書けているかを確認します。 -->

以上でNext.jsを使った猫画像ジェネレーターの開発は完了です。

![Next.jsアプリの最終デザインプレビュー。白背景のページ中央に黒枠で囲まれた茶トラ子猫の写真があり、その上に吹き出し風デザインのボタン「他のにゃんこも見る」が配置されている](/tutorials/nextjs/nextjs-styled-cat-image-page.png)

<!-- regression test: 上の画像と同じ画像が表示されているか確認します。 -->

## プロダクションビルドと実行

Next.jsでは`next build`を実行することで最適化されたプロダクション用のコードを生成でき、`next start`で生成されたプロダクションコードを実行できます。このチュートリアルではボイラテンプレートを利用しているので、`package.json`に`build`コマンドと`start`コマンドがすでに用意されています。`npm run build`と`npm run start`を実行して本番用のアプリケーションを実行してみましょう。なお、起動中の`npm run dev`はCtrl+Cで停止しておいてください。

```sh
npm run build
npm run start
```

<!-- regression test: 上のコマンドが正常に実行されたか確認します。 -->

アプリケーション起動後に<http://localhost:3000>へブラウザでアクセスをすることで、本番用のアプリケーションの実行を確認できます。

<!-- regression test: 上のURLにアクセスして、本番用のアプリケーションの実行を確認します。 -->
