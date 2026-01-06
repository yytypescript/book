---
description: macOSでチュートリアル(docs/tutorials)の回帰テストを行う手順をまとめます。
sidebar_label: チュートリアル回帰テスト(macOS)
---

# macOSでチュートリアルの回帰テストを行う

このページは執筆者向けです。チュートリアル(`docs/tutorials`)に変更を入れたときに手順やサンプルコードが壊れていないか、また、チュートリアルが古くなっていないかをmacOS上で確認する方法をまとめます。

本プロジェクトのmacOS検証環境は、[Tart](https://github.com/cirruslabs/tart)で仮想環境を構築することを推奨します。仮想化の目的は、ホストマシンを壊さないことと、できるだけクリーンな環境を用意し、検証のブレを少なくすることです。

## 前提

- Apple Silicon搭載のmacOS 13.0(Ventura)以降を使っていること
- ディスク容量に余裕があること(初回に約25GBのイメージをダウンロードします。回線によっては40分程度かかります)

## TartでmacOS環境を用意する

### Tartをインストールする

Homebrewでインストールできます。

```shell
brew install cirruslabs/cli/tart
```

### VMを用意して起動する

公式のQuick Startに沿って、macOSのベースイメージをクローンして起動します。初回はイメージのダウンロードが走ります。

イメージは `-base:latest` で終わるものがお勧めです。`base` イメージは Homebrew が使えるため、VM内のセットアップがやりやすいです(必要に応じてVM内で `brew --version` などで確認してください)。

利用可能なmacOSイメージと「最新」を確認したい場合は、Cirrus LabsのPackages一覧から確認できます: [cirruslabs packages (macos-\*)](https://github.com/orgs/cirruslabs/packages?tab=packages&q=macos-)

```shell
tart clone ghcr.io/cirruslabs/macos-sequoia-base:latest sequoia-base
tart run sequoia-base
```

`tart run sequoia-base` を実行すると、VMの画面がウィンドウで表示されます。VMを起動したまま、別ターミナルを開いてSSHでログインできます。

```shell
ssh admin@$(tart ip sequoia-base)
```

## VMに入っているNode.jsを削除する

`base` イメージにはすでにNode.jsがインストールされています。VM内の環境を揃えるため、brewで入っているNode.jsはアンインストールします。

```shell
brew uninstall node
```

## `docs/tutorials/setup.md` にしたがって環境構築する

チュートリアルの検証は、チュートリアル本文の手順と同じ環境で行います。環境構築の具体的な手順は、次のページを参照してVM内で実施してください。

- [開発環境の準備](../tutorials/setup.md)

## 検証が終わったときの後片付け

### VMを停止する

`tart run sequoia-base` を実行しているターミナルで、`Ctrl + C` を押すとVMが停止します。

### VM一覧を確認する

削除したいVM名を調べたい場合は、次のコマンドで一覧を表示できます。

```shell
tart list
```

### VMを削除する

もう使わないVMは削除してディスク容量を空けます。VM名は適宜読み替えてください。

```shell
tart delete sequoia-base
```
