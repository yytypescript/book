---
description: あなたが本書に貢献できること。
---

# CONTRIBUTING

本書の執筆には、TypeScripterのための座談会「YYTypeScript」の参加者を中心に、オープンソース的に複数人のライターが参加しています。本書をお読み下さった読者の方も、執筆に参加することができます。このページでは、どのような参加方法があるのか説明します。

## 感想を伝える

- 読んでの感想を教えて頂けると、執筆の参考になります。
- ポジティブな感想はうれしいです。モチベーションが上がります。

## 分からないことを質問する

- TypeScriptで分からないことを質問して頂けると、執筆のトピックを考えるのに役立ちます。
- 読んだ上で生まれた疑問を質問して頂けると、内容の改善に役立ちます。
- 質問は下記で受け付けています:
  - Twitter: @suin <https://twitter.com/suin>
  - Slack: <https://yytypescript.github.io/slack>
  - 執筆会に参加してもらって質問して頂いても構いません。

## SNSでシェアする

- TwitterなどSNSでシェアして頂けるとうれしいです。

## 執筆会を見学する

- 「見学」はもっとも簡単な参加形態です。まずは気軽に見に来てください。
- 見学の際には「見学に来ました」とお伝えください。
- 執筆会の開催スケジュールはconnpassをご確認ください。
  - <https://yyts.connpass.com/>

## 執筆する

- 執筆はこのプロジェクトの中心的な活動です。
- 執筆には、次のような活動があります:
  - 新規ページを書く
  - 既存ページを良くする
    - 誤字脱字の訂正
    - 内容の改善
    - 内容の追記
  - 既存ページにコメントする

### 執筆のための準備

- Discordに参加する。
  - こちらのURLから参加できます→ <https://discord.gg/DTwRgzt>
- gitbook.comのYYTypeScriptチームに参加する。(執筆をgitbook.comのエディターで行っているため)
  - 参加申し込みはこちら→[Join YYTypeScript - GitBook](https://app.gitbook.com/invite/yyts?invite=-Lw1ObCW8Ut0NnNfHG1w)
- PDRを理解する。
  - PDR(publishers' decision record; 出版者意思決定記録)は、これまで執筆に関して合意してきた意思決定が記録されています。執筆前にざっと目を通しておいてください。

[PDR](pdr/README.md)

### 新規ページを書く

1. 🚧マークがついているページから書きたいページを選ぶ。
2. 執筆意思表示する: Discordのチャットでどこどこを書きますと発言する。
3. gitbook.comで、執筆を開始する。
4. 執筆完了したら、Mergeする。(レビューは不要)

## 意思決定に参加する

行動方針や執筆に当たっての取り決めなど、意思決定をしたい場合、次のいずれかの方法があります。

- Discordで、雑談レベルで提案する。
- PDRの提案を書き、共有する。
- 執筆会に来て相談する。

### 意思決定プロセス

しっかりとしたプロセスはまだありません。今の所ふわっと合意できれば決定します。

## 校正チェック

このプロジェクトでは[textlint](https://textlint.github.io/)による校正チェックを導入しています。

`npm run textlint`を実行すると文章に対する校正チェックを実行できます。

```text
$ npm run textlint
```

`npm run textlint:fix`を実行することで文章の校正チェックでエラーとなっている箇所を自動修正できます。

```text
$ npm run textlint:fix
```

### 表記揺れの統一

表記揺れを発見された場合は、[prh/yytypescript.yml](https://github.com/yytypescript/book/blob/master/prh/yytypescript.yml)にルールを追加してください。

prhの設定ファイルの書き方は次のページを参照してください。
[prh/prh](https://github.com/prh/prh)
