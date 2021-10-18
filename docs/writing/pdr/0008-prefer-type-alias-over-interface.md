# 0008-サンプルコードではInterfaceよりType Aliasを優先して使う

- ステータス: 採用
- 提案者: suin, jamashita, t-yng, クロレ
- 決定者: 同上
- 更新日: 2020-03-27

## 解決する問題とその背景

- 事実: TypeScriptでは、interfaceとtype aliasのどちらでもオブジェクトの型を定義できる。
- 見解: 書籍のサンプルコードはどちらかに統一するのが好ましい。
- 論点: サンプルコードにおいて、オブジェクト型の型定義には、interfaceとtype aliasどちらを選択するか？

## 検討した選択肢

- interface
- type alias

## 決定事項

- サンプルコードでオブジェクトの型定義を示す場合は、type aliasを優先して使う。
- 理由: 理由は忘れたが、多数決的に決まった。
- 例外: 次の目的でサンプルコードを示す場合は、interfaceを使ってもよい。
  - interface自体を説明する。
  - interfaceとtype aliasの同異を説明する。
  - classでインターフェースをimplementsする。
