# Vercelにデプロイしてみよう

このチュートリアルでは前のNext.jsのハンズオンで作成した猫画像ジェネレーターをVercelへデプロイする方法を学びます。

## Vercelとは？

Next.jsを開発しているVercel社が提供しているフロントエンド向けのクラウドプラットフォームで、特徴としては次の点があります。

- 特別な設定をせずにゼロコンフィグでGitHubリポジトリと連携をするだけで簡単にデプロイ環境を構築できる
- プルリク単位で自動でプレビュー環境を利用できる
- JavaScriptやCSSファイルを自動で圧縮してCDN環境で配信

特にVercelはNext.jsをホスティングする環境として開発されており、Next.jsのサーバーサイド機能を特別なセットアップなしに利用できるので、他のクラウドプラットフォームを利用する理由がない場合はNext.jsのホスティング環境としてVercelはオススメです。

## このチュートリアルに必要なもの

今回のチュートリアルではGitHubリポジトリとの連携を利用してデプロイ環境を構築するために、次のものが必要です。

- GitHubアカウント
- 「[Next.jsで猫画像ジェネレーターを作ろう](./nextjs.md)」で作成したコードと、それをpush済みのGitHubリポジトリ
  - 上のチュートリアルを実施された方は、ご自身のGitHubアカウントのリポジトリにコードをpushしておいてください。
  - 自分で作ったコードでなくても構わない方は、本書が提供する[random-catリポジトリ](https://github.com/yytypescript/random-cat)を[フォーク](https://docs.github.com/ja/get-started/quickstart/fork-a-repo)しておくのでも構いません。

## デプロイの流れ

- Vercelアカウントを作成する
- Vercelにログインする
- GitHubリポジトリを連携する

## Vercelアカウントを作成する

:::note
Vercelのアカウントをすでにお持ちの方は、この手順を飛ばしてください。
:::

最初に[Vercel](https://vercel.com/signup)にアクセスをして、GitHubアカウントでVercelのアカウントを作成しましょう。アカウント作成後に連携するGitHubリポジトリの選択画面が表示されるので、「GitHubリポジトリを連携する」にお進みください。

## Vercelにログインする

[Vercelのログイン画面](https://vercel.com/login)に遷移してGitHubアカウントでログインをします。

## GitHubリポジトリを連携する

[VercelのGitHubリポジトリ連携のページ](https://vercel.com/new)へアクセスして猫画像ジェネレーターのGitHubリポジトリを検索して「Import」ボタンをクリックします。

![VercelのGitHubリポジトリ連携画面で、ユーザーのリポジトリから「random-cat」を検索し、検索結果に表示されたリポジトリ名の横に「Import」ボタンが表示されている。](vercel-deploy/vercel-import-github-random-cat.png)

プロジェクトの設定画面が表示されるので、設定はデフォルトのままで「Deploy」ボタンをクリックしてください。

![Vercelの新規プロジェクト作成画面で、GitHubリポジトリ「random-cat」が選択され、Next.jsのプリセットが設定された状態。プロジェクト名やルートディレクトリが自動入力され、「Deploy」ボタンが表示されている。](vercel-deploy/vercel-project-settings-random-cat.png)

デプロイ完了画面が表示されればデプロイは完了です。🎉画面のプレビュー表示がリンクになっており、クリックすることでデプロイされたアプリを表示することができます。

![Vercelのデプロイ完了画面で、新規プロジェクトデプロイ成功を知らせるメッセージと共に、中央に「他のにゃんこも見る」ボタン付きの猫画像表示アプリが表示されている。](vercel-deploy/vercel-deploy-complete-random-cat.png)

「Continue To Dashboard」のボタンをクリックすることでプロジェクトのダッシュボードページへ遷移できます。ダッシュボード上でVercelが自動生成したドメインを確認できます。このドメインはプロジェクトが存続している限り変更されないため、このURLを他の人に共有することでアプリを公開することができます。

![Vercelのダッシュボードに表示された「random-cat」プロジェクトの本番デプロイ情報。中央には「他のにゃんこも見る」ボタンと猫の画像があり、右側にデプロイURLやステータス「Ready」などの詳細が表示されている。](vercel-deploy/vercel-dashboard-production-random-cat.png)

## 自動デプロイを体験

プルリクエストを作成・マージして自動デプロイを実行してみます。VercelではGitHub連携が完了した段階で自動デプロイのCI/CD環境も自動で構築されるので、プルリクエストを作成・マージするだけで自動でデプロイがされる状態になっています。

実際に猫画像ジェネレーターのコードの一部を修正して自動デプロイを実行してみましょう。

次のようにボタンの文言を「他のにゃんこも見る」を「One more cat!」に変更してGitHubリポジトリでプルリクエストを作成してください。

```tsx twoslash {22-24} title="app/cat-image.tsx"
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
"use client";
import { useState } from "react";
import { fetchImage } from "./fetch-image";
import styles from "./page.module.css";
type CatImageProps = {
  url: string;
};
export function CatImage({ url }: CatImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(url);
  const refreshImage = async () => {
    setImageUrl("");
    const image = await fetchImage();
    setImageUrl(image.url);
  };
  return (
    <div className={styles.page}>
      <button onClick={refreshImage} className={styles.button}>
        One more cat!
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

Vercelは連携しているGitHubリポジトリに新たにブランチがプッシュされると自動でビルドが実行されて、プレビュー環境をデプロイしてくれます。

プルリクエストを作成するとVercel BOTが画像のようにビルドのステータスとプレビュー環境のURLをコメントとしてくれるので、「Visit Preview」のリンクをクリックすることでレビュアーは簡単に新しい変更の確認をすることができます。

![GitHubのプルリクエストにVercel BOTが投稿したコメントで、プロジェクト「random-cat」の最新のデプロイ状況を表すテーブルが表示されている。ステータスは「Ready」で、「Visit Preview」リンクからプレビュー環境にアクセス可能。](vercel-deploy/vercel-github-pr-preview-comment.png)

ビルドの結果はプルリクエストのstatus checksにも表示されるので、ビルドが失敗している状態で誤ってデプロイをする事故も防ぐこともできます。

![GitHubのプルリクエスト画面で、Vercelによる2件のチェックが成功し、ベースブランチとの競合もないことが確認された状態。「Merge pull request」ボタンが緑色で有効になっている。](vercel-deploy/vercel-github-checks-merge-ready.png)

「Merge pull request」ボタンをクリックして、このプルリクエストをマージしてみましょう。ベースブランチに新しくブランチがマージされると本番環境に更新が自動でデプロイされます。

先ほど確認した本番環境のURLにアクセスをすることで、ボタンのデザインが変更されており今回の修正が本番環境に自動でデプロイされたのを確認できます。😺

![Vercelでデプロイされた猫画像ジェネレーターのプレビュー画面。画面中央に「One more cat!」ボタンと、トラのフィギュアを見つめる茶トラ猫の画像が表示されている。](vercel-deploy/random-cat-preview-one-more-cat.png)

## プロジェクトを削除

プロジェクトが残って気になる方は、Settingsページに移動して「Delete」ボタンをクリックし、ダイアログで必要なテキストを入力することでプロジェクトを削除できます。

![Vercelのプロジェクト設定画面で、「random-cat」プロジェクトの削除セクションが表示されており、赤い「Delete」ボタンが強調されている。上部の「Settings」タブからアクセスされたことを示す矢印付きの注釈がある。](vercel-deploy/vercel-project-settings-delete-random-cat.png)
![Vercelのプロジェクト削除ダイアログで、削除確認として2つの入力欄にプロジェクト名と「delete my project」の文言が入力され、「Delete」ボタンが強調表示されている。](vercel-deploy/vercel-project-delete-confirmation.png)
