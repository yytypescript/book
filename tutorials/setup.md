---
description: TypeScriptの開発に必要になるNode.jsとTypeScriptコンパイラ、エディタをインストールしましょう。
---

# 開発環境の準備

## Node.jsとは

Node.jsは、JavaScriptをサーバーサイドで動かすことを目的に開発されたソフトウェアです。Node.jsはGoogle ChromeのJavaScriptエンジンと同じ「V8」でJavaScriptを実行します。

Node.jsにはGoogle Chromeと同じJavaScriptエンジンが乗っていると言っても、組み込みのAPIは異なります。ブラウザはJavaScriptからHTMLを操作する必要があるのでDOM APIがありますが、Node.jsにはありません。代わりにNode.jsには、サーバーサイドの様々なリソースを制御する必要があるので、ファイルシステムにアクセスするAPIやHTTPサーバーを建てるためのAPI、プロセスを起動したり終了したりするAPIなどがあります。

Node.jsの典型的な用途は、サーバーサイドアプリケーションの開発です。例えば、ウェブサービスのバックエンドなどです。最近のフロントエンド開発でも、Node.jsが必要になってきています。なぜかというと、開発で使うツールをNode.jsで動かす必要があるからです。TypeScriptでの開発も、TypeScriptコンパイラ\(tsc\)を動かすのにNode.jsが必要になります。

## Node.jsのインストール

Node.jsは公式サイトからダウンロードしてインストールすることもできますが、最も手軽な方法はHomebrewを使ったインストールです。

```text
brew install node
```

インストールされたら`node -v`でバージョンが表示されるかを見て、`node`コマンドが実行できるかを確かめてください。

```text
$ node -v
v12.16.0
```

## TypeScriptをインストールする

お使いのターミナルからTypeScriptコンパイラをインストールします。

```text
npm install -g typescript
```

`tsc`コマンドが実行できるか`tsc -v`コマンドで確認します。

```text
tsc -v
Version 4.3.5
```

表示されたバージョンはインストール時の最新バージョンになります。上の例は執筆時のバージョンなので、これと異なっていても問題ありません。

## エディターは何を使ったらいいか？

シェアで決めつけるのも好きではありませんが、Visual Studio Codeが一番良く使われています。無料であり、インストールすれば拡張機能なしでもコーディングを行うことができます。

TypeScript、Visual Studio Codeも主にMicrosoftが中心に開発されているため相性がよいのかもしれません。

{% hint style="info" %}
🧙♂ **Tips:** Visual Studio Codeは主にTypeScriptで開発されています。またVS Codeと略すことが多いです。
{% endhint %}

対応OSはWindows、Mac、Linuxのいずれにも対応しています。ダウンロードサイトから環境にあったインストーラーをダウンロード・インストールを行ってください。  
[https://code.visualstudio.com/download](https://code.visualstudio.com/download)

