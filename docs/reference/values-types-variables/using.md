---
sidebar_label: using宣言
---

# 新しい変数宣言 using

using宣言(using declaration)とは、JavaScriptに導入される新しい変数宣言であり、執筆時点のECMAScriptプロポーザルではStage2の機能です。TypeScriptでは5.2からサポートされています。

using宣言された変数がスコープを抜けるときに、その変数に紐づくリソースについて自動的にクリーンアップ処理が実行されることで明示的なリソース管理(Explicit Resource Management)を実現できます。

