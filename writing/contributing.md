---
description: あなたが本書に貢献できること。
---

# CONTRIBUTING

本書の執筆には、TypeScripterのための座談会「YYTypeScript」の参加者を中心に、オープンソース的に複数人のライターが参加しています。本書をお読み下さった読者の方も、執筆に参加することができます。このページでは、どのような参加方法があるのか説明します。

## 感想を伝える

* 読んでの感想を教えて頂けると、執筆の参考になります。
* ポジティブな感想はうれしいです。モチベーションが上がります。

## 分からないことを質問する

* TypeScriptで分からないことを質問して頂けると、執筆のトピックを考えるのに役立ちます。
* 読んだ上で生まれた疑問を質問して頂けると、内容の改善に役立ちます。
* 質問は下記で受け付けています:
  * Twitter: @suin [https://twitter.com/suin](https://twitter.com/suin)
  * Slack: [https://yytypescript.github.io/slack](https://yytypescript.github.io/slack)
  * 執筆会に参加してもらって質問して頂いても構いません。

## SNSでシェアする

* TwitterなどSNSでシェアして頂けるとうれしいです。

## 執筆会を見学する

* 「見学」はもっとも簡単な参加形態です。まずは気軽に見に来てください。
* 見学の際には「見学に来ました」とお伝えください。

### オフライン執筆会を見学する

まずは、YYTypeScriptが実施する【TypeScript技術執筆会】にお越しください。  
2019年12月現在、第1週目以外の金曜日に毎週開催しています。  
具体的なイベントの開催予定は[YYTypeScript - compass](https://yyts.connpass.com/) よりご確認ください。

{% hint style="danger" %}
新型コロナウイルス\(COVID-19\)感染拡大防止のため、オフラインの執筆会は休止しています。代わりにリモート執筆会にご参加ください。
{% endhint %}

### リモートで執筆会を見学する

まずはYYTypeScriptのSlackへご参加ください。次のURLから参加可能です。  
[https://yytypescript.github.io/slack](https://yytypescript.github.io/slack)  
執筆に関してはチャンネル \#publish にて行なっています。

## 執筆する

* 執筆はこのプロジェクトの中心的な活動です。
* 執筆には、次のような活動があります:
  * 新規ページを書く
  * 既存ページを良くする
    * 誤字脱字の訂正
    * 内容の改善
    * 内容の追記
  * 既存ページにコメントする

### 執筆のための準備

* Slackに参加する。
  * こちらのURLから参加できます→ [https://yytypescript.github.io/slack](https://yytypescript.github.io/slack)
* gitbook.comのYYTypeScriptチームに参加する。\(執筆をgitbook.comのエディターで行っているため\)
  * 参加申し込みはこちら→[Join YYTypeScript - GitBook](https://app.gitbook.com/invite/yyts?invite=-Lw1ObCW8Ut0NnNfHG1w)
* PDRを理解する。
  * PDR\(publishers' decision record; 出版者意思決定記録\)は、これまで執筆に関して合意してきた意思決定が記録されています。執筆前にざっと目を通しておいてください。

{% page-ref page="pdr/" %}

### 新規ページを書く\(目次からトピックを選んで書く\)

1. [目次](https://docs.google.com/document/d/1KubBKVfOZD-Uby6G0U2rRNViI2P1QoVsBbcSNWA9iJk/edit)から書きたいページを選ぶ。
2. 執筆意思表示する: 目次に「\(○○執筆中\)」のように自分の名前を書く。
3. gitbook.comで、新しいページを作り執筆を開始する。
4. 執筆完了したら、Mergeする。\(レビューは不要\)

### 新規ページを書く\(目次にないトピックを書く\)

* 書きたいトピックがない場合は、新しく目次を作ることができます。
* 目次を作った後はすぐに執筆をしても構いませんが、その目次の需要を確認した後に執筆することをお勧めします。

## 意思決定に参加する

行動方針や執筆に当たっての取り決めなど、意思決定をしたい場合、次のいずれかの方法があります。

* Slackの\#publishチャンネルで、雑談レベルで提案する。
* PDRの提案を書き、Mergeする前にSlackの\#publishチャンネルで共有する。
* 執筆会に来て相談する。

### 意思決定プロセス

しっかりとしたプロセスはまだありません。今の所ふわっと合意できれば決定します。

## 校正チェック
このプロジェクトでは[textlint](https://textlint.github.io/)による校正チェックを導入しています。

`npm run textlint`を実行すると文章に対する校正チェックを実行できます。

```
$ npm run textlint
```

`npm run textlint:fix`を実行することで文章の校正チェックでエラーとなっている箇所を自動修正できます。

```
$ npm run textlint:fix
```

### 表記揺れの統一
表記揺れを発見された場合は、[prh/yytypescript.yml](https://github.com/yytypescript/book/tree/master/handson)にルールを追加してください。

prhの設定ファイルの書き方は次のページを参照してください。  
[prh/prh](https://github.com/prh/prh)
