# TypeScriptの学習リソース

TypeScriptには開発元のMicrosoftが提供しているものを含め、学習や調査に役立つ数多くのリソースが存在しています。

このページでは『サバイバルTypeScript』を読んだ後や、読んでいる途中などでも利用できるTypeScriptをより知るために役立つ情報源を紹介します。もちろんここで紹介したものすべてをいきなり読みこなすというのは困難かつ非効率なので、それぞれの情報源についての役割などを意識して用途に応じて利用することをオススメします。

またこのページの後半では学習において非常に重要となる公式ドキュメントの詳細と読み方などを含めた攻略方法を解説します。

## リソースの紹介

### Microsoft公式の情報源

Microsoftが公式で提供している主要な情報源です。

| 名称                                                                                                                                | 種類             | 特徴                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [TypeScript Documentation](https://www.typescriptlang.org/docs/)                                                                    | 公式ドキュメント | TypeScriptの公式ドキュメントです。もっとも重要な基本的な情報源およびリファレンスとなります。このページの後半で詳細と攻略の方法を解説します。                                                                                 |
| [Microsoft Developer Blogs](https://devblogs.microsoft.com/typescript/)                                                             | 開発者ブログ     | Microsoftの開発者ブログにおけるTypeScriptについての記事です。新しいバージョンの情報告知など、TypeScriptについての最新情報を知ることができます。                                                                              |
| [FAQ - microsoft/TypeScript Wiki](https://github.com/microsoft/TypeScript/wiki/FAQ)                                                 | FAQ              | TypeScriptについてのよくある質問集です。挙動やプラクティスなどについてWhy/What/How/Shouldのタイプの質問と回答が提供されています。                                                                                            |
| [Roadmap - microsoft/TypeScript Wiki](https://github.com/microsoft/TypeScript/wiki/Roadmap)                                         | ロードマップ     | TypeScriptに将来的に追加される機能ついてのロードマップとこれまで追加されてきた機能の一覧です。各バージョンで追加された機能のプルリクエストが一覧となっており、そこから言語開発者による機能や概念の説明を読むことができます。 |
| [docs/spec-ARCHIVED.md](https://github.com/microsoft/TypeScript/blob/3c99d50da5a579d9fa92d02664b1b66d4ff55944/doc/spec-ARCHIVED.md) | 仕様書           | TypeScriptの古い仕様書であり、公式ドキュメントに未記載のいくつかの細かい挙動や概念などが記載されています。現在はmainブランチから削除されているため注意が必要です。                                                           |
| [compiler/checker.ts](https://raw.githubusercontent.com/microsoft/TypeScript/main/src/compiler/checker.ts)                          | ソースコード     | 型チェッカーの実装となるファイルです。現在のTypeScriptには更新されている仕様書が無いため、型チェックの挙動がコメントとして記載されている唯一のドキュメントとなります。                                                       |

公式が提供する情報源でもっとも重要なのが公式ドキュメントですが、公式ドキュメントに記載されていない細かい挙動や概念などは開発リポジトリにある情報を参照する必要があります。

### サードパーティの情報源

サードパーティのもので人気のある学習リソースを紹介します。

| 名称                                                                                                                                 | 種類                         | 特徴                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [roadmap.sh](https://roadmap.sh/typescript)                                                                                          | ロードマップ                 | 開発者が学ぶべき内容についてロードマップ形式でまとめられているroadmap.shというサイトのTypeScriptバージョンです。TypeScriptの全体像や学習パスを俯瞰することができます。                                                                       |
| [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)                                                         | オープンソースのドキュメント | オンライン上で公開されているオープンソースの解説書です。コンパクトながらTypeScriptについての高度な内容を知ることができます。オリジナルバージョンは英語ですが、有志による日本語翻訳があるため日本語で読むことができます。                     |
| [プログラミングTypeScript ―スケールするJavaScriptアプリケーション開発](https://www.oreilly.co.jp/books/9784873119045/)               | 書籍                         | O'Reilly Japanから出版されているTypeScriptの入門書です。TypeScriptのシンタックス以前に型安全性や、型チェッカーとは何か、そもそも型とは何なのかなど根本的なことから解説されており、TypeScriptの型システムについて深く理解することができます。 |
| [プロを目指す人のためのTypeScript入門 安全なコードの書き方から高度な型の使い方まで](https://gihyo.jp/book/2022/978-4-297-12747-3)    | 書籍                         | 技術評論社から出版されている通称「ブルーベリー本」と呼ばれるTypeScriptの入門書です。TypeScriptのみならずJavaScriptについての解説も含まれています。                                                                                           |
| [プレイリスト:日本一わかりやすいTypeScript入門](https://www.youtube.com/watch?v=kd8VH10jXwc&list=PLX8Rsrpnn3IW0REXnTWQp79mxCvHkIrad) | 動画シリーズ                 | Youtubeでとらゼミから提供されているTypeScriptの解説動画シリーズです。動画で分かりやすくTypeScriptの基本について学ぶことができます。                                                                                                          |

## 公式ドキュメントの攻略

TypeScriptの公式ドキュメントは英語で書かれている上に分量が多いため、いきなり手出しするのを躊躇してしまうかもしれません。

とはいえ、TypeScriptの学習や開発を進める上で各機能についての正確な情報や詳細情報を知るためには公式ドキュメントを読むことが必須となるので、この項目ではドキュメントの中核となるハンドブックを中心に公式ドキュメントの読み方や攻略の仕方を紹介します。

公式ドキュメントは『サバイバルTypeScript』を読み終えた後でもお世話になることが頻繁にあるため、ぜひ読み方をマスターして公式ドキュメントと仲良くなりましょう。

### 構成要素

まずは公式ドキュメントの構成要素から把握していきましょう。TypeScriptの公式ドキュメントは次にリストアップした複数のセクションから構成されます。

| セクション            | 内容                                                                                                                                                                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Get Started**       | 学習者のバックグラウンドやスキルに基づいたイントロダクションのセクションです。                                                                                                                                                                     |
| **Handbook**          | ハンドブックは言語機能と挙動の包括的ガイドです。日常的なユースケースにおけるTypeScriptの機能と挙動について数時間で読めるような構成となっています。                                                                                                 |
| **Reference**         | ハンドブックでカバーしていない応用的な話題のリファレンスとなるようなセクションです。ユーティリティ型や名前空間、型の互換性などの話題が含まれます。                                                                                                 |
| Tutorial              | いくつかの環境でのTypeScript導入を行うためのチュートリアルです。                                                                                                                                                                                   |
| Declaration Files     | [型定義ファイル](reference/declaration-file)(`.d.ts`)についての解説を行うドキュメントです。パッケージの配布などで型定義ファイルを作成する際にはこのセクションが役立ちます。                                                                        |
| JavaScript            | JavaScriptを利用するプロジェクトでTypeScriptのツールなどの恩恵を受けるために必要な情報などが記載されています。                                                                                                                                     |
| Project Configuration | プロジェクト設定についてのドキュメントです。[tsconfig](reference/tsconfig)の設定方法などについて解説されています。コンパイラオプションについての詳細な情報を知りたい場合にはこのセクションが役立ちます。                                           |
| **Cheat Sheets**      | シンタックスなどが画像に分かりやすくまとめられているチートシート。TypeScriptのシンタックスを俯瞰したい際に有用です。                                                                                                                               |
| What's new            | 各バージョンごとに追加された機能の紹介ページです。新しいバージョンのページでは実際にその機能が追加されたプルリクエストが紐付けられているため、より詳細な挙動の説明を知りたい場合にはそのリンクをたどることで開発者による説明を読むことができます。 |

公式ドキュメントと言うと上記のハンドブックのセクションを指すケースが多いですが、TypeScriptの公式サイト上には[TypeScript Documentation](https://www.typescriptlang.org/docs/)というページが存在し、チートシートなどを含めてこのページにまとめられているドキュメントの一群が公式ドキュメントとなります。

とはいっても、すべてのセクションを隅から隅まで一気に読んでいく必要はありません。初学者が重点的に読み込むべき箇所や読み方のヒントなどを後で解説します。

### 基本的な攻略方針

公式ドキュメントの攻略の方針として利用できる読み方の方法を紹介します。次のようにいつくかの方法で学習のレベルや状況に応じて公式ドキュメントの読み方を変えていくと効率的に読みこなすことができます。

- (A) 公式ドキュメントの構造や特徴を掴む
- (B) 「Get Started」のイントロダクションを読む
- (C) ハンドブックを頭から読む
- (D) リファレンスなど詳細な知識が必要になった段階で読む
- (E) TypeScriptの開発リポジトリにある一次情報を読む
- (X) チートシートでシンタックスの概要を俯瞰する

基本的には(A)から(E)までの方法を時系列順で行っていくことで知識を徐々に拡張してくことができます。(X)のチートシートにはTypeScriptのシンタックスが網羅的に分かりやすくまとめられており、これを眺めることで必要となる知識を俯瞰することができるので気になった時に見てみるとよいでしょう。

(A)についてはこのページを読み込むことで完了しますが、特に公式ドキュメントを学習リソースとして見なすときには「Get Started」とハンドブックが重要となり、重点的に読むべき箇所となります。この２つについては時間をとって重点的に読み込み、リファレンスなどは必要になった時や暇な時につまみ食いしていくように読んでいくと効率的に読みこなすことができます。

また、特定の機能は公式ドキュメントでは説明が不十分なものなどがあります。より詳細な挙動などについて知りたい場合などは、TypeScriptのコードベースとなっているリポジトリからその機能が実装されたプルリクエストの説明を読み込みことで細かい挙動を知ることができます。各機能が導入されたTypeScriptのバージョンは「What's new」のページや「[Roadmap](https://github.com/microsoft/TypeScript/wiki/Roadmap)」の一覧から知ることができるのでそれらの資料からプルリクエストに到達することができます。

公式ドキュメントの攻略方法の基本指針はこのようになりますが、以下では中核となるハンドブックなどについて解説していきます。

### ハンドブックのバージョン

TypeScriptは2012年に初めてリリースされてから今や10年以上の歴史があります。その間も継続的なアップデートが繰り返されて機能的に進化してきた訳ですが、TypeScript自体のアップデート伴い公式ドキュメントも進化してきました。

[TypeScript誕生の背景](overview/before-typescript.md)

公式ドキュメントにはさまざまなセクションがありますが、中でも「ハンドブック」と呼ばれるセクションが非常に重要です。ハンドブックはTypeScript言語の包括的なガイドであり、日常的に使用するTypeScriptの機能と挙動について学習者が理解できるようなウォークスルーを提供しています。

そして、公式ドキュメントの顕著な進化として、2021年に「v2」と呼ばれる新しいバージョンのハンドブックが公開されたことが挙げられます。v2以前のハンドブックは「v1」と呼ばれ、現在では非推奨(deprecated)なものとして[アーカイブされたリポジトリ](https://github.com/microsoft/TypeScript-Handbook)から閲覧することが可能です。

v2が公開されたのはかなり最近なので、これまでのポピュラーな入門書籍やWeb上のリソースの多くはv1の内容が反映されたものとなっていることに注意してください。

### ハンドブックの特徴

v2ハンドブックは開発者ブログの記事「[Announcing the New TypeScript Handbook](https://devblogs.microsoft.com/typescript/announcing-the-new-typescript-handbook/)」において次のような制約のもとで執筆されていると語られています。

- JavaScriptの解説は専門家に任せる (Leave teaching JavaScript to the experts)
- インクリメンタルに教える (Teach incrementally)
- コンパイラに話させる (Let the compiler do the talking)
- 日常的なケースについて執筆する (Write for the everyday cases)

特徴的なのは、ハンドブックではJavaScriptの知識についての解説を一からすることなく、他の書籍やWeb上のリソースに任せることで内容をコンパクトにしている点です。ハンドブックの目的のひとつが、言語的にスーパセットとなるTypeScriptがJavaScriptの上にどのように構築されているかをエンジニアが理解できるようにすることであるため、読者に対してJavaScriptの程度の知識や背景があることを前提にして話が進んでいきます。

ただし、あとで語るようにさまざまなスキルレベルを持つ読者のためにハンドブックの外側に「Get Started」というイントロダクション用のセクションを用意しており、他の言語習得者を含めて初学者はこのセクションのページから読むことが推奨されています。

#### サバイバルTypeScriptと併用しよう

上で語ったようにハンドブックではJavaScriptに元々ある機能やシンタックスなどについての解説はありません。しかし、TypeScriptの理解にはJavaScriptの理解が欠かせないという事実から、TypeScriptと並行してJavaScript自体も学びたい場合にはサバイバルTypeScriptが非常に有用です。

[JavaScriptはTypeScriptの一部](overview/javascript-is-typescript.md)

本書を読んで気になった機能や深堀りしたい内容があれば、ハンドブックを含めた公式ドキュメント全体で探してみましょう。英語が苦手であれば、本書のページを熟読して内容をしっかり理解した上で該当する公式ドキュメントのページを読んでみることをオススメします。

また、サバイバルTypeScriptとの類似点としてハンドブックではすべてのエッジケースをカバーすることなく、日常的なケースを意識した内容となっています。そして、その範疇を超えるものはリファレンスセクションのページに記載されています。

公式ドキュメントとサバイバルTypeScriptの違いとして、本書はより実務を意識した作りとなっているため、さまざまなアプリケーションを実際に実装してみる第３章の「[作って学ぶTypeScript](tutorials)」やコーディングテクニックを紹介する第5章の「[Tips](tips)」などが実務を行う上で役立つはずです。両者を目的や状況に応じて使い分けることで効率的に学習を進めることができます。

### 言語のレイヤーを意識しよう

TypeScriptについてはこのように公式ドキュメントを併用するのがよいですが、JavaScriptの機能やシンタックスについてより深く知りたいという場合にはMDN Web Docsを併用して、さらに仕様まで知りたいという場合にはECMAScriptの仕様書を参照するようにしてください。

- TypeScript → [公式ドキュメント](https://www.typescriptlang.org/docs/)
- JavaScript → [MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- ECMAScript → [ecma262](https://tc39.es/ecma262/)

TypeScriptという言語は型システム+ランタイム+言語仕様のように別々に存在する複数のレイヤーを内包しているため挙動や問題の調査などを行う場合にはそれぞれのレイヤーでのドキュメントに当たる必要があります。TypeScriptの公式ドキュメントを参照するタイミングは、TypeScriptの機能、つまり型に関しての機能(型注釈や型推論、型演算子など)について知りたい場合となります。

[静的型付け](overview/static-type.md)

何についての情報を知りたいのかを意識して、JavaScriptのシンタックスやECMAScript仕様を知りたい場合にはそれが書いてあるドキュメントを読むようにしましょう。

### イントロダクションを読もう

ハンドブックを本格的に読みはじめる前に読むべき項目として「Get Started」というイントロダクションのセクションが存在します。このセクションのページでは、さまざまなスキルレベルやバックグラウンドを持つ多様な読者がTypeScriptの特徴を簡単に知れるように次の５つのドキュメントが用意されています。

| ページ                                                                                                                  | 内容                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [TypeScript for New Programmers](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)             | TypeScriptの最初の言語として選んだプログラミング初心者のための解説ページ。                                                                        |
| [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)      | JavaScriptの経験があるプログラマーのための解説ページ。                                                                                            |
| [TypeScript for Java/C# Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)     | JavaやC#などのオブジェクト指向プログラミング(OOP)の経験があるプログラマーのための解説ページ。                                                     |
| [TypeScript for Functional Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html) | HaskellやMLなどの関数型プログラミング(FP)の経験があるプログラマーのための解説ページ。                                                             |
| [TypeScript Tooling in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html)    | TypeScriptのインストールからシンプルなWebアプリケーションの構築までを簡単に解説したページ。今すぐにTypeScriptを使いたいという読者に適しています。 |

自身のスキルやバックグラウンドに応じたイントロダクションのページを選択して読むようにしてください。以下でそれぞれのスキルレベルの人が読むべきページの内容を紹介しますが、「Get Started」の各ページには**そこにしか記載されていない重要な知識や考え方などがあるため**、時間があれば他のページにも目を通しておくことをオススメします。

#### 🧑‍💻 プログラミング初心者

TypeScriptがはじめてのプログラミング言語となるプログラミング初心者の方は「[TypeScript for New Programmers](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)」のページから読むことで今後どのような学習をすればよいのかの指針を得ることができます。

内容としては、JavaScriptの歴史や、JavaScriptとTypeScriptの関係などについての簡単な説明があります。

ハンドブックの「JavaScriptの解説は専門家に任せる」という執筆の制約からJavaScriptの機能やシンタックスについての解説は基本的に無いため、JavaScriptの学習リソースが提示された上で「TypeScriptを学ぶためにJavaScriptを学ぼう」という旨で締められてJavaScriptの学習を促されます。

#### 🧙 JavaScriptの経験がある読者

JavaScriptについての知識や経験があるなら「[TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)」のページから読むことをオススメします。このページは非常に有用であり、次のようなTypeScriptの中枢を占める重要な機能や概念について高速で知ることが可能です。

- 型推論
- 型定義
- 型の合成(ユニオン型とジェネリクス)
- 構造的型システム

このページを読めばTypeScriptでの重要な概念については把握することができるため、ハンドブックではそれらの知識をさらに拡張していけばよいことになります。

#### 👨‍🚀 オブジェクト指向プログラミングの経験がある読者

JavaやC#などのオブジェクト指向プログラミング(OOP)の経験がある学習者は「[TypeScript for Java/C# Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)」のページを読むことでTypeScriptにおいて、クラスやオブジェクト指向の考え方の違いについて学ぶことができます。

公称型(Nominal Typing)を採用しているJavaやC#に対して、TypeScriptは構造的部分型(Structural Subtyping)を採用してることから知っておくべき違いや型への考え方についての重要なアイデアが提示されています。

[構造的部分型 (structural subtyping)](reference/values-types-variables/structural-subtyping.md)

#### 🦸‍♂️ 関数型プログラミングの経験がある読者

HaskellやMLなどの関数型プログラミング(FP)の経験がある学習者は「[TypeScript for Functional Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html)」のページを読むことで、それらの関数型言語との類似機能や違いなどを学びながらTypeScriptについて知ることができます。

内容としてはポイントフリースタイルプログラミング(point-free programming)や高カインド型(higher-kinded types)などをTypeScriptでのどのように扱うかなどの解説があります。

### ハンドブックの読み進め方

ハンドブックは次のようなページ構成となっています。

- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) (ハンドブックの目的と構成について)
- [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) (TypeScriptにおける基本的な考え方などについての解説)
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) (日常的に使用するあらゆる型についての解説)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) (型の絞り込みについての解説)
- [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html) (関数の型についての詳細解説)
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) (オブジェクト型についての詳細解説)
- Type Manipulation (型演算子を使った型の合成についての解説)
  - [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
  - [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
  - [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
  - [Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
  - [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
  - [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
  - [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
  - [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) (アクセス修飾子やクラスの型注釈の方法などの解説)
- [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) (モジュール解決などにいての解説)

「インクリメンタルに教える」という執筆の制約から、ハンドブックでは始めから終わりまで直線的に読めるように、未解説の機能についての言及をなるべく避けながら徐々に知識を積み上げていくような構成となっています。したがって、読み方の基本指針としては**頭から順番に読んでいく**ということになります。

TypeScriptについてまったく知らないという方であれば「Get Started」のイントロダクションページを読み終えてから、冒頭の「[The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)」と「[Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)」だけでも読んでおくことでTypeScriptの概要を掴むことができます。

それぞれの知識はページとしてモジュール化されているため、サバイバルTypeScriptを読んで知っている内容などは飛ばして知りたい箇所のページのみを都度読んでいくという読み方も有効です。ハンドブックのセクションだけでなく、特にリファレンスのセクションはそのような読み方が有効です。たとえばリファレンスに収められているユーティリティ型の紹介ページがベースとしている型演算子(type operator)の知識はハンドブックの「Type Manipulation」のセクションで解説されています。本書のページでは「型の再利用」として解説している箇所となります。

[型の再利用](reference/type-reuse/README.md)

公式ドキュメントよりもサバイバルTypeScriptの方が細かく知識をモジュール化しているため、逆に公式ドキュメントをよみながら日本語でよりわかりやすい解説を読みたいという時に本書を利用するという読み方も有効です。
