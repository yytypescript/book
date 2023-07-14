# Vercelにデプロイしてみよう

このチュートリアルでは前のNext.jsのハンズオンで作成した猫画像ジェネレーターをVercelへデプロイする方法を学びます。

## Vercelとは？

Next.jsを開発しているVercel社が提供しているフロントエンド向けのクラウドプラットフォームで、特徴としては次の点があります。

- 特別な設定をせずにゼロコンフィグでGitHubリポジトリと連携をするだけで簡単にデプロイ環境を構築できる
- プルリク単位で自動でプレビュー環境を利用できる
- JavaScriptやCSSファイルを自動で圧縮してCDN環境で配信

特にVercelはNext.jsをホスティングする環境として開発されており、Next.jsのAPIルートの自動スケールや特別な対応がなくISRを利用できるので、他のクラウドプラットフォームを利用する理由がない場合はNext.jsのホスティング環境としてVercelを利用することをオススメします。

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

![連携するGitHubリポジトリの選択](vercel-deploy/screen1.png)

プロジェクトの設定画面が表示されるので、設定はデフォルトのままで「Deploy」ボタンをクリックしてください。

![プロジェクトの設定画面](vercel-deploy/screen2.png)

デプロイ完了画面が表示されればデプロイは完了です。🎉画面のプレビュー表示がリンクになっており、クリックすることでデプロイされたアプリを表示することができます。

![デプロイ完了画面](vercel-deploy/screen3.png)

「Continue To Dashboard」のボタンをクリックすることでプロジェクトのダッシュボードページへ遷移できます。ダッシュボード上でVercelが自動生成したドメインを確認できます。このドメインはプロジェクトが存続している限り変更されないため、このURLを他の人に共有することでアプリを公開することができます。

![ダッシュボード](vercel-deploy/screen6.png)

## 自動デプロイを体験

プルリクエストを作成・マージして自動デプロイを実行してみます。VercelではGitHub連携が完了した段階で自動デプロイのCI/CD環境も自動で構築されるので、プルリクエストを作成・マージするだけで自動でデプロイがされる状態になっています。

実際に猫画像ジェネレーターのコードの一部を修正して自動デプロイを実行してみましょう。

次のようにボタンの文言を「他のにゃんこも見る」を「One more cat!」に変更してGitHubリポジトリでプルリクエストを作成してください。

```tsx twoslash {13} title="src/pages/index.tsx"
import { NextPage } from "next";
import { useState } from "react";
type Props = { initialImageUrl: string };
type Image = { url: string };
declare function fetchImage(): Promise<Image>;
declare const styles: any;
// ---cut---
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        One more cat!
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};
```

Vercelは連携しているGitHubリポジトリに新たにブランチがプッシュされると自動でビルドが実行されて、プレビュー環境をデプロイしてくれます。

プルリクエストを作成するとVercel BOTが画像のようにビルドのステータスとプレビュー環境のURLをコメントとしてくれるので、「Visit Preview」のリンクをクリックすることでレビュアーは簡単に新しい変更の確認をすることができます。

![VercelのBOTがプルリクエストのプレビュー環境のURLをコメント](vercel-deploy/screen4.png)

ビルドの結果はプルリクエストのstatus checksにも表示されるので、ビルドが失敗している状態で誤ってデプロイをする事故も防ぐこともできます。

![プルリクエストのステータスチェック](vercel-deploy/screen5.png)

「Merge pull request」ボタンをクリックして、このプルリクエストをマージしてみましょう。ベースブランチに新しくブランチがマージされると本番環境に更新が自動でデプロイされます。

先ほど確認した本番環境のURLにアクセスをすることで、ボタンのデザインが変更されており今回の修正が本番環境に自動でデプロイされたのを確認できます。😺

![ボタンのデザインを変更した画面](vercel-deploy/screen7.png)

## プロジェクトを削除

プロジェクトが残って気になる方は、Settingsページに移動して`Delete`ボタンをクリックし、ダイアログで必要なテキストを入力することでプロジェクトを削除できます。

![プロジェクトの削除ボタン](vercel-deploy/screen8.png)
![プロジェクトの削除ダイアログ](vercel-deploy/screen9.png)
