# 0007-関数定義のサンプルコードには極力functionを使う

- ステータス: 採用
- 提案者: suin
- 決定者: suin, reoring, クロレ, jamashita
- 更新日: 2020-02-21

## 解決する問題とその背景

TypeScript/JavaScriptの関数定義のサンプルコードを示すとき、関数(function)でもアロー関数(arrow function)でもどちらでも解説に影響がないとき、どちらの書き方を優先して使ったらいいか？

JavaScriptでは、関数を定義するとき、functionを使う方法と、arrow functionを使う方法の2つがある。どのような基準でどちらを使うか明確にしておくことで、ひとつの書籍としての一体感が出るとともに、読者の混乱を避けることができる。

## 決定事項

**関数定義のサンプルコードには極力functionを使う**。その理由は、

- functionのほうが関数であることが、読み手にとって読み取りやすいから。
- TypeScript公式のハンドブックでfunctionのほうを使っているから。

ただし、**arrow functionを使うべきところ、使わないと解説できないところは、arrow functionを使う**。たとえば、

- 高階関数などが、thisへの参照を持ちたい場合。
- arrow functionそのものについての説明をする場合。
- フレームワークなどのしきたりでarrow functionのほうが現実でよく使われる場合。
