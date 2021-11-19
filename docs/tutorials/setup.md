---
description: TypeScriptの開発に必要になるNode.jsとTypeScriptコンパイラ、エディタをインストールしましょう。
---

# 開発環境の準備

## Node.jsとは

Node.jsは、JavaScriptをサーバーサイドで動かすことを目的に開発されたソフトウェアです。Node.jsはGoogle ChromeのJavaScriptエンジンと同じ「V8」でJavaScriptを実行します。

Node.jsにはGoogle Chromeと同じJavaScriptエンジンが乗っていると言っても、組み込みのAPIは異なります。ブラウザはJavaScriptからHTMLを操作する必要があるのでDOM APIがありますが、Node.jsにはありません。代わりにNode.jsには、サーバーサイドのさまざまなリソースを制御する必要があるので、ファイルシステムにアクセスするAPIやHTTPサーバーを建てるためのAPI、プロセスを起動したり終了したりするAPIなどがあります。

Node.jsの典型的な用途は、サーバーサイドアプリケーションの開発です。たとえば、ウェブサービスのバックエンドなどです。最近のフロントエンド開発でも、Node.jsが必要になってきています。なぜかというと、開発で使うツールをNode.jsで動かす必要があるからです。TypeScriptでの開発も、TypeScriptコンパイラ(tsc)を動かすのにNode.jsが必要になります。

## Node.jsのインストール

Node.jsは公式サイトからダウンロードしてインストールすることもできますが、もっとも手軽な方法はHomebrewを使ったインストールです。

```text
brew install node@16
```

インストールされたら`node -v`でバージョンが表示されるかを見て、`node`コマンドが実行できるかを確かめてください。

```text
$ node -v
v16.13.0
```

## TypeScriptをインストールする

お使いのターミナルからTypeScriptコンパイラをインストールします。

```text
npm install -g typescript
```

`tsc`コマンドが実行できるか`tsc -v`コマンドで確認します。

```text
tsc -v
Version 4.4.4
```

表示されたバージョンはインストール時の最新バージョンになります。上の例は執筆時のバージョンなので、これと異なっていても問題ありません。

## エディター・IDE

TypeScriptの開発にお勧めエディター・IDEはVisual Studio CodeまたはJetBrains IDEです。

### Visual Studio Code

Visual Studio Code(VS Code)は、Microsoftが提供する無料でオープンソースのIDEです。Windows、Mac、Linuxに対応しています。このIDE自体もTypeScriptで実装されています。

https://code.visualstudio.com/download

### JetBrains IDE

JetBrains IDEはJetBrains社が提供する有償のIDEシリーズです。Windows、Mac、Linuxで使えます。JetBrains IDEシリーズはプログラミング言語ごとに最適化された個別のIDEが提供されています。TypeScript専用のIDEはありませんが、次にあげるIDEはTypeScriptにしっかり対応しています。

- [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/) (基本はJava向けIDEだが、JSやPHP、Ruby、Goなども扱える)
- [WebStorm](https://www.jetbrains.com/webstorm/) (JavaScript向けIDE)
- [PhpStorm](https://www.jetbrains.com/phpstorm/) (PHP向けIDE)
- [RubyMine](https://www.jetbrains.com/ruby/) (Ruby向けIDE)
- [PyCharm](https://www.jetbrains.com/pycharm/) (Python向けIDE)
- [GoLand](https://www.jetbrains.com/go/) (Go向けIDE)

フロントエンドの開発のみを予定している場合、最安のWebStormで十分です。バックエンドとフロントエンドの両方を開発する場合は、PhpStorm、RubyMine、PyCharm、GoLandの中からバックエンド言語に合ったものを選ぶとよいでしょう。さまざまな言語を使う予定がある場合、ハイエンドのIntelliJ IDEA Ultimateを選ぶと網羅的になります。JetBrains IDEシリーズには無償版IntelliJ Community Edition(CE)がありますが、これはTypeScriptには対応していません。

JetBrains IDEには、30日間のフリートライアルと、学生は無料で使える[無料ライセンスプログラム](https://www.jetbrains.com/community/education/#students)もあります。

日本の販売代理店の株式会社サムライズムからは、[300円から1,000円の割引](https://secure.samuraism.com/referral/8BF59FFA232F45460DFA1635194C68B6)で購入することもできます。
