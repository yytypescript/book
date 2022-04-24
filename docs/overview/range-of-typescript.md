# TypeScriptの射程

TypeScriptを覚えるとさまざまなものを作れるようになります。TypeScriptはJavaScriptにコンパイルして使う言語です。そのため、JavaScriptで作れるものは何でも作れます。ここでは、TypeScriptを学んだらどのようなソフトウェアを作れるのか、「TypeScriptの射程」について説明します。

## フロントエンド

TypeScriptがもっとも人気な分野は、フロントエンドアプリケーション開発です。ブラウザで動くアプリです。ブラウザではJavaScriptが圧倒的な地位を確立しています。TypeScriptはJavaScriptのエコシステムに乗っかっているため、フロントエンドアプリケーション開発で大きな力を発揮します。

## バックエンド

バックエンドアプリケーションもTypeScriptを使って開発ができます。技術的にはNode.jsというサーバーサイドJavaScriptのエコシステムに乗ることができます。バックエンド言語はJava、Ruby、PHPなどの多数の競合があるものの、TypeScriptもサーバーサイドプログラミングのひとつの選択肢になります。

## フロントエンドとバックエンドの両方でTypeScriptを採用するメリット

フロントエンドとバックエンドの両方でTypeScriptを採用するとメリットがあります。プロジェクトで扱う言語が1つでよいという点です。言語が1つであると、次のような利点が生まれます。

### モジュールを共有できる

両方で言語が異なる場合、同じロジックであっても各言語で実装しなければなりません。テストも倍になります。一方、両方でTypeScriptを採用すると、一方で作ったTypeScriptのモジュールをもう一方で再利用できます。

### プロジェクト内でのノウハウが共有できる

言語の壁はノウハウ共有を難しくします。フロントエンドとバックエンドで言語が異なる場合、ノウハウ共有はフロントエンドとバックエンドの垣根を超えにくいものになります。たとえば、バックエンドで便利な日付操作ライブラリを見つけていたとしても、フロントエンドではそれが使えないので、そのノウハウはバックエンドだけで終わってしまいます。

もしも、両方でTypeScriptを使っているなら、フロントエンドのノウハウをバックエンドに還元したり、その逆が成立しやすくなります。

### 学習のコストパフォーマンスが最大化する

新しい言語を覚えることは思いの外、時間のかかるものです。チュートリアルやリファレンスで座学するだけなら、短期間で学習できます。しかし、その言語のエコシステムや実務上のベストプラクティス、言語の細かい癖や陥りがちな罠などまで、しっかり理解した実践レベルに到達しようとなると、多くの学習時間を要します。

フロントエンドとバックエンドの両方を担当する場合にそれぞれが別言語であれば、安心して実務的なコードを書けるようになるまで、個人であれ、組織であれ、言語習得にかなりの時間を投資することになるでしょう。

逆にどこでもTypeScriptが使えるようになっていれば、言語やエコシステムの学習オーバーヘッドが最小限で済みます。

## デスクトップアプリケーション

WindowsやmacOS、Linux向けにデスクトップアプリケーションを作る場合もTypeScriptが使えます。デスクトップアプリケーションをJavaScript、HTML、CSSの技術スタックで開発できる[Electron](https://www.electronjs.org/)を用います。Electron + TypeScript製の著名なアプリとしては、SlackやMicrosoft社のVS Codeがあります。

## CLIアプリケーション

コマンドラインツールの開発もTypeScriptで行えます。サーバーサイドJavaScript実行環境のNode.jsとTypeScriptを組み合わせて開発します。CLIアプリケーションフレームワークには、Heroku製の[oclif](https://github.com/oclif/oclif)などがあります。Google製の[zx](https://github.com/google/zx)を用いると、シェルスクリプトの代わりにTypeScriptを使うのもしやすくなります。

## サーバーレス (FaaS)

サーバーレスとは、サーバーの構築や保守なしに、サーバーサイドのプログラムを実行できる仕組みです。通常、バックエンドアプリケーションを動かそうとすると、Linuxなどのサーバーを立てたり、メンテナンスする必要が出てきます。サーバーレスでは、AWSなどのクラウドベンダーがJavaScriptなどのマネージド実行環境を提供することで、アプリケーション開発者はサーバーを保守する必要がなくなります。開発者はJavaScriptの関数を書いたファイルをアップロードするだけで、バックエンドなどのウェブサービスを公開できます。このような関数を実行するクラウドサービスのことをFaaS(Function as a Service)と言います。

JavaScriptをサポートしているFaaSは多数あります。もっとも有名なのがAWSの[Lambda](https://aws.amazon.com/lambda/)です。この他に、[Google Cloud Functions](https://cloud.google.com/functions)、Next.jsと親和性の高いVercelの[Serverless Functions](https://vercel.com/docs/functions/introduction)、静的サイトホスティングで有名なNetlifyの[Netlify Functions](https://www.netlify.com/products/functions/)、世界90カ国194の都市にエッジを持つCDN Cloudflareの[Cloudflare Workers](https://workers.cloudflare.com/)などがあります。これらのサービスを用いると、TypeScriptでサーバーレスなウェブアプリケーションを提供できます。

## インフラ構成管理 (IaC)

インフラが物理的なものから仮想的なものになり、自社サーバーからクラウド化が進んだ結果、サーバーをいくつどのように配置するか、ネットワークはどう繋ぎこむかといったインフラ構成管理も、ソフトウェアで自動化されることが増えてきました。インフラ構成をコードで定義し、プログラマブルにすることをIaC(Infrastructure as Code)と呼びます。

TypeScriptでもIaCを行えます。AWSのインフラ構成を自動化するツールに[AWS CDK(Cloud Development Kit)](https://aws.amazon.com/cdk/#:~:text=The%20AWS%20Cloud%20Development%20Kit,resources%20using%20familiar%20programming%20languages.&text=AWS%20CDK%20uses%20the%20familiarity,languages%20for%20modeling%20your%20applications.)があります。これはTypeScriptをサポートしています。

AWSやGoogle Platformなど複数のクラウドベンダーに対応したインフラ構成ツールとして、[Pulumi](https://www.pulumi.com/)もあります。PulumiはTypeScriptで各ベンダーのインフラ構成を記述できます。インフラ構成ツールでもっとも有名なのは[Terraform](https://www.terraform.io/)ですが、TerraformはHCLと呼ばれる独自言語で記述するのに対し、PulumiはTypeScriptなので、TypeScriptプログラマーにとって手が届きやすいツールです。

## Google Apps Script

GoogleはSpreadsheetやDocsなどのオフィススイートを提供していて、多くの企業で導入されています。Google Spreadsheetなどには、JavaScriptで機能を拡張する仕組みが備わっています。それをGoogle Apps Scriptと呼びます。Google Apps Scriptを使うと、スプレッドシートに独自の関数を作ったり、操作を自動化したりでき、業務の効率化に役立ちます。TypeScriptで書いたコードはJavaScriptにコンパイルすれば、Google Apps Scriptで利用できます。

## ブラウザ拡張

Google ChromeやFirefoxなどのブラウザには、ブラウザの機能を拡張する仕組みがあります。ブラウザ拡張はJavaScriptで書くことができます。TypeScriptで書いたコードもJavaScriptにコンパイルすることで、ブラウザ拡張として動かせます。

## 機械学習

機械学習やニューラルネットワーク、ディープラーニングなどの分野はPythonが一強であることは異論がないでしょう。しかし、JavaScriptでも機械学習などのツールが多数作られてきており、TypeScriptプログラマーも手が届きやすくなってきています。[TensorFlow.js](https://www.tensorflow.org/js/)はGoogleが開発した機械学習ライブラリです。[Brain.js](https://brain.js.org/)はニューラルネットワークのライブラリです。

## 組み込み系

MicrosoftはTypeScriptのサブセット言語として、リソースの少ない組み込みデバイスを対象としたStatic TypeScript(STS)を開発し、実際にそれで組み込み系のソフトウェアを作る[研究成果を発表](https://www.infoq.com/jp/news/2019/11/static-typescript-msft-paper/)しました。STSはTypeScriptと同じではありませんし、まだ研究段階ですが、こうした動きが活発になってくれば、組み込み系プログラミングもTypeScriptプログラマーの射程圏内に入ってくることでしょう。

## WebAssembly

WebAssembly(WASM)はブラウザで動くアセンブリー言語です。WASMはJavaScriptよりも高速な処理が必要とされるところで用いられます。WASMのプログラムはC言語やC++、Rustといったシステム言語で開発されることが多いですが、TypeScriptでWASMを開発できるようにする試みも出てきています。その筆頭が[AssemblyScript](https://www.assemblyscript.org/)です。AssemblyScriptを使うと、TypeScript風のコードをWASMに変換できます。
