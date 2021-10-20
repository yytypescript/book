---
description: 本書の利用者、及び執筆者のライセンスについて
---

# 0005-ライセンスについて

## \[本書のライセンスについて]

- ステータス: 採用
- 提案者: nouphet
- 決定者: suin, reoring, fuubit, クロレ
- 更新日: 2020-01-31

### 解決する問題とその背景

本書はTypeScriptコミュニティの成長に寄与することを目的として執筆されている。すなわち本書が広く活用されることが期待される。広く活用されるためには利用を制限してしまうことはできるだけ避けたい。そのためどのようにしたら本書が最大限に活用してもらえるかという観点において、本書と同様の目的や執筆方法を採用している出版物をリストアップし検討し、決定した。

また、執筆者が執筆に参加するにあたってのライセンスについても検討し、決定した。

## 本書を第3者が利用するに場合のライセンス

### このコミュニティで作成した著作物を第3者が利用する場合のライセンスについて検討した選択肢

- 株式会社ドワンゴが出している[Scala初学者向けの学習テキスト](https://scala-text.github.io/scala_text/#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9)
  - [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.ja)
- [typescript-handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
  - <https://github.com/microsoft/TypeScript-Handbook/blob/master/LICENSE](https://github.com/microsoft/TypeScript-Handbook/blob/master/LICENSE>
  - [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- TypeScript-Deep-Dive
  - [typescript-book](https://github.com/basarat/typescript-book/blob/master/LICENSE.md)
  - [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Wikipedia
  - [Wikipediaのライセンスがクリエイティブ・コモンズに - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/0905/22/news039.html)
  - [漢(オトコ)のコンピュータ道: Wikipediaのライセンスがクリエイティブコモンズになった。](http://nippondanji.blogspot.com/2009/05/wikipedia.html) ← 説明がめっちゃわかりやすい
- クリエイティブ・コモンズ・ライセンスの4つの属性
  - BY: 原作者の氏名（クレジット）を明記すること。
  - NC: 商用利用不可。（Non-Commercial）
  - ND: 改変不可。（No Derives）
  - SA: 改変したときは同じライセンスを与えること。（Share Alike）

### 決定事項

[Creative Commons — 表示 - 継承 3.0 非移植 — CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.ja) を採用した。
商用利用も許可する。**Linuxの精神に則り CC BY-SA に決定**する。

#### 採用した理由

- **商用利用が可能**
  - Linuxと同じ考え。昔はCDで焼ける人が限定的だったため雑誌にCDがバンドルされていた。つまりは売られていた。売っても良しとすることで広い利用を促す。
  - 著作権を放棄するわけではないので原作者(**BY**)を明示し、改変したときは同じライセンスを与えることで利用を可能にする(**SA**)。
- ただし、**NC**はTypeScriptコミュニティの成長を制限してしまうので適さない。

### 各選択肢のよい点と悪い点

- [**クリエイティブ・コモンズ・ライセンス**](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.ja)の4つの属性
  - BY: 原作者の氏名（クレジット）を明記すること。
  - NC: 商用利用不可。（Non-Commercial）
  - ND: 改変不可。（No Derives）
  - SA: 改変したときは同じライセンスを与えること。（Share Alike）
  - **よい点**: 広く制作物向けに作られたライセンス。いくつかのオプションを組み合わせることにより目的に合致した内容に調整可能。
  - **悪い点**: ソフトウェアには適さない。
- [**Apache License 2.0**](https://www.apache.org/licenses/LICENSE-2.0)
  - <https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)>
  - 簡単な要約: Apacheソフトウェア財団 (ASF) によるソフトウェア向けライセンス規定。必要な通知を含める限り、ソフトウェアを使用して好きなことを行うことができる。この許容ライセンスには、コードの貢献者からの特許ライセンスが含まれている。
  - 必須
    - 著作権を含める
    - ライセンスを含める
    - 状態の変化を述べる
    - 通知を含める
  - 可能
    - 商用利用
    - 変更
    - 配布
    - サブライセンス
    - 私的使用
    - 特許クレーム
  - できないこと
    - 責任を負う
    - 商標を使用する
- **よい点**: ”BSDスタイルのライセンス”で、使用や頒布、修正、派生版の頒布、ライセンスの継承に関して制限がない。求められるのはApacheLicenseを使用していることの宣言のみ。
- **悪い点**: 広く利用されているライセンスなので悪くない。が、今回はソフトウェアではないので、クリエイティブ・コモンズが適していると判断した。

### 参加者が執筆に参加するにあたってのライセンスについて検討した選択肢

著作物としてどうなるか

- [Wikipedia:FAQ 投稿者向け](https://ja.wikipedia.org/wiki/Wikipedia:FAQ_%E6%8A%95%E7%A8%BF%E8%80%85%E5%90%91%E3%81%91)
  - [Wikipedia:著作権](https://ja.wikipedia.org/wiki/Wikipedia:%E8%91%97%E4%BD%9C%E6%A8%A9)
  - [Wikipedia:著作権問題](https://ja.wikipedia.org/wiki/Wikipedia:%E8%91%97%E4%BD%9C%E6%A8%A9%E5%95%8F%E9%A1%8C)
  - [Wikipedia:ガイドブック 著作権に注意](https://ja.wikipedia.org/wiki/Wikipedia:%E3%82%AC%E3%82%A4%E3%83%89%E3%83%96%E3%83%83%E3%82%AF_%E8%91%97%E4%BD%9C%E6%A8%A9%E3%81%AB%E6%B3%A8%E6%84%8F)
- 執筆の参加者にはこれに同意してもらった上で参加、執筆してもらうフローにする必要がある。
- ライセンスへの同意フロー
  - PRで「はい」って書いてもらう？
  - gitbookでの実現方法
    - 個別に同意してもらう。
    - 何かしらの方法で。(メール or Googleフォーム) ← 【採用: 今後追記】
