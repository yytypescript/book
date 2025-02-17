---
sidebar_label: プロジェクト参照
---

# プロジェクト参照 (project references)

TypeScriptのプロジェクト参照(project references)は、大規模なTypeScriptプログラムを効率的に管理するための強力な機能です。この機能を使用することで、開発者は大きなコードベースを小さな部分に分割し、より効率的に作業を進めることができます。

## TypeScriptプロジェクト参照とは何か

プロジェクト参照は、TypeScript 3.0で導入された機能で、複数の関連するTypeScriptプロジェクトを論理的に分割し、それらの間の依存関係を明示的に定義する方法を提供します。これにより、大規模なアプリケーションやライブラリを構造化し、管理しやすくすることができます。

たとえば、フロントエンドもバックエンドも一枚岩(single monolith)の大規模なTypeScriptプロジェクトを、小さな独立したプロジェクトに分割して、それらの間の依存関係を明確に定義することができるということです。以下は、プロジェクト参照を使用した大規模なTypeScriptプロジェクトの構造の一例です：

```plaintext
├── フロントエンド
│   ├── UI
│   └── ロジック
│
├── バックエンド
│   ├── API
│   └── データベース
│
└── 共通
```

この中の、UI、ロジック、API、データベース、共通がプロジェクト参照における「プロジェクト」です。プロジェクト間の依存関係も次のように明確に定義できます。

- フロントエンド/UI は フロントエンド/ロジック に依存しています。
- フロントエンド/ロジック は 共通 に依存しています。
- バックエンド/API は バックエンド/データベース に依存しています。
- バックエンド/データベース は 共通 に依存しています。

プロジェクトという単位に分割されることで、各プロジェクトは独立してビルドすることができます。そして、ビルドも依存関係を考慮して自動的に行われます。

## なぜプロジェクト参照が必要なのか

プロジェクト参照には次のような重要な利点があります：

1. ビルド時間の大幅な改善
2. コンポーネント間の論理的な分離の強化
3. コードの新しい、よりよい組織化方法の実現
4. 型チェックとコンパイルの速度向上
5. エディター使用時のメモリ使用量の減少
6. プログラムの論理的なグループ化の強化

これらの利点により、大規模なTypeScriptプロジェクトの開発と保守が大幅に容易になります。

## プロジェクト参照の基本概念

プロジェクト参照を理解し、効果的に使用するためには、いくつかの基本的な概念と設定オプションを知る必要があります。

### `tsconfig.json`の`references`プロパティ

プロジェクト参照の中心となるのは、`tsconfig.json`ファイルの`references`プロパティです。このプロパティを使用して、他のプロジェクトへの参照を定義します。

```json
{
  "compilerOptions": {
    // 通常のコンパイラオプション
  },
  "references": [{ "path": "../otherproject" }]
}
```

この例では、現在のプロジェクトが`../otherproject`にあるプロジェクトを参照していることを示しています。

### `composite`オプションの役割

参照されるプロジェクトでは、`composite`オプションを有効にする必要があります。このオプションは次の効果があります：

1. `rootDir`が明示的に設定されていない場合、デフォルトで`tsconfig.json`ファイルを含むディレクトリになります。
2. すべての実装ファイルが`include`パターンにマッチするか、`files`配列にリストされている必要があります。
3. `declaration`オプションを有効にする必要があります。

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  }
}
```

### `declarationMap`オプションとその利点

`declarationMap`オプションを有効にすると、宣言ファイル（`.d.ts`）のソースマップが生成されます。これにより、次のような利点があります：

1. プロジェクトの境界を越えて「定義へ移動」や「名前の変更」などのエディター機能を透過的に使用できます。
2. ソースコードとコンパイル後のコードの対応関係をより詳細に把握できます。

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

これらの基本的な設定を理解することで、プロジェクト参照を効果的に使用し、大規模なTypeScriptプロジェクトを効率的に管理できるようになります。

## プロジェクト参照が解決する主な課題

プロジェクト参照は、大規模なTypeScriptプロジェクトで開発者が直面する多くの課題を解決します。次に主な課題とその解決方法を示します：

1. ビルド時間の長さ：
   - プロジェクト参照を使用すると、変更されたプロジェクトのみを再コンパイルできるため、大規模プロジェクトでのコンパイル時間が大幅に短縮されます。
2. コード構造の複雑さ：
   - 大きなコードベースを論理的に分割し、各部分を独立したプロジェクトとして管理できるため、全体の構造が明確になり、管理が容易になります。
3. 依存関係の管理：
   - プロジェクト間の依存関係を`tsconfig.json`ファイルで明示的に定義できるため、コードベース全体の構造と関係性が明確になります。
4. 不必要な再コンパイル：
   - 変更されていない部分の再コンパイルを避けることができるため、ビルドプロセスの効率が大幅に向上します。
5. 型チェックの遅延：
   - プロジェクトを小さな部分に分割することで、各部分の型チェックが高速化され、全体的な性能が向上します。
6. モジュール間の不適切な参照：
   - プロジェクト境界を明確に定義することで、意図しないモジュール間の参照を防ぎ、コードの構造を改善できます。
7. ビルドプロセスの複雑さ：
   - `tsc --build`モードを使用することで、複数の設定ファイルや複雑なビルドスクリプトの必要性が減り、ビルドプロセスが簡素化されます。

これらの課題を解決することで、プロジェクト参照は大規模なTypeScriptプロジェクトの開発効率と保守性を大幅に向上させます。

## プロジェクト参照の利点

プロジェクト参照を導入することで、開発者は多くの利点を享受できます。主な利点は次の通りです：

### メモリ効率

プロジェクト参照は、従来の方法と比較して非常にメモリ効率がよいです：

1. プロセス数の削減：
   - 従来の方法：各パッケージで`tsc --watch`を実行する場合、パッケージごとに1つのプロセスが必要でした。
   - プロジェクト参照：1つのプロセスですべてのパッケージをカバーできます。
2. メモリ使用量の比較：
   - 従来の方法（`tsc --watch`）：1プロセスあたり120MB〜200MB
   - プロジェクト参照：約70MB（パッケージ数による大きな変動なし）
3. 10プロジェクトの場合の比較：
   - 従来の方法：1.2GB〜2.0GB
   - プロジェクト参照：約70MB

この大幅なメモリ使用量の削減により、開発マシンのリソースを他のタスクに活用できます。

### 開発体験（DX）の向上

プロジェクト参照の導入により、次のような開発体験の向上が期待できます：

1. 高速なフィードバックループ：
   - ビルド時間の短縮により、コード変更後のフィードバックが迅速に得られます。
   - 部分的なビルドが可能になり、作業中の箇所に関連する部分のみを素早くチェックできます。
2. IDEパフォーマンスの向上：
   - プロジェクトの分割により、各部分の型チェックが高速化され、IDEのレスポンスが向上します。
   - メモリ使用量の削減により、大規模プロジェクトでもIDEの動作が軽快になります。
3. コードナビゲーションの改善：
   - `declarationMap`機能により、プロジェクト間のジャンプ（定義へ移動など）がスムーズになります。
4. モジュール境界の明確化：
   - プロジェクト間の依存関係が明示的になり、アーキテクチャの理解が容易になります。
   - 不適切な依存関係を早期に発見できるため、コード品質の維持が容易になります。
5. 柔軟な開発環境：
   - 大規模プロジェクトの一部のみを扱うことができ、開発者は必要な部分に集中できます。
6. ビルドプロセスの簡素化：
   - `tsc --build`モードにより、複雑なビルドスクリプトが不要になります。
7. エラー検出の改善：
   - プロジェクト間の型の不一致や、不適切な依存関係をより早く、正確に検出できます。
8. コラボレーションの向上：
   - プロジェクトの明確な分割により、チーム間の作業分担や責任範囲が明確になります。

これらの利点により、開発者はより生産的に、ストレスなく作業を進めることができ、コードの品質向上と開発速度の向上が期待できます。

### 従来のアプローチとプロジェクト参照の比較

次の表は、従来の一枚岩のプロジェクト管理とプロジェクト参照を使用した場合の主な違いを示しています：

| 特徴               | 一枚岩のアプローチ       | プロジェクト参照       |
| ------------------ | ------------------------ | ---------------------- |
| ビルド時間         | 全体を毎回ビルド         | 変更部分のみビルド     |
| 依存関係の管理     | 暗黙的                   | 明示的                 |
| モジュール間の参照 | 制限なし                 | プロジェクト境界で制限 |
| メモリ使用量       | 高い                     | 低い                   |
| IDE性能            | 大規模プロジェクトで低下 | 比較的安定             |
| 部分的なビルド     | 不可                     | 容易                   |
| 設定ファイル       | 単一または複雑           | 複数の明確な設定       |

この比較から、プロジェクト参照が大規模プロジェクトの管理にどれだけ有効かが分かります。

## プロジェクト参照の実装

プロジェクト参照の基本概念を理解したところで、より複雑なシナリオでの実装方法を見ていきましょう。ここでは、モノレポ（monorepo）構成でのプロジェクト参照の実装を例に説明します。

### モノレポとは

モノレポ（monorepo）は、複数の関連するプロジェクトやパッケージを単一のリポジトリで管理する開発アプローチです。この方法は、コードの共有、依存関係の管理、リリースの調整が容易になるため、大規模プロジェクトや複数のパッケージを持つライブラリの開発で人気があります。

### プロジェクト構造の設計

典型的なモノレポ構造は次のようになります：

```plaintext
.
├── package.json
├── packages (プログラムコードを置く場所)
│   ├── cli
│   ├── common
│   └── web
├── tsconfig.base.json (全パッケージで共通のコンパイル設定を記述するファイル)
├── tsconfig.json (プロジェクトリファレンスの設定を記述するファイル)
```

この例では、`packages` ディレクトリ内に3つのパッケージ（cli、common、web）があります。これらのパッケージは次のような依存関係を持ちます：

- `cli` パッケージは `common` パッケージに依存しています。
- `web` パッケージは `common` パッケージに依存しています。

`common`パッケージで共通の機能を実装し、それを`cli`（CLIアプリケーション）と`web`（ウェブアプリケーション）で利用する構成です。

### `tsconfig.json`ファイルの設定

モノレポでプロジェクト参照を使用する場合、複数の`tsconfig.json`ファイルを適切に設定する必要があります。

#### ルートの`tsconfig.json`

ルートディレクトリの`tsconfig.json`は、プロジェクト全体の「目次」のような役割を果たします：

```json
{
  "include": [],
  "references": [
    {
      "path": "packages/cli"
    },
    {
      "path": "packages/common"
    },
    {
      "path": "packages/web"
    }
  ]
}
```

この設定により、TypeScriptコンパイラーはモノレポ内の各パッケージを認識し、適切な順序でビルドできるようになります。

#### 共通の`tsconfig.base.json`

共通の設定を`tsconfig.base.json`にまとめることで、各パッケージの設定を簡素化できます：

```json
{
  "compilerOptions": {
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "target": "ESNext",
    "declaration": true,
    "composite": true,
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "${configDir}/src",
    "outDir": "${configDir}/dist"
  }
}
```

ここで重要なのは`composite: true`設定です。これにより、各パッケージがプロジェクト参照の「プロジェクト」として認識されます。

#### 各パッケージの`tsconfig.json`

各パッケージの`tsconfig.json`は、共通の設定を継承し、必要に応じて参照を追加します：

```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

この例は`cli`や`web`パッケージの設定で、`common`パッケージへの参照を含んでいます。

### `composite`と`declarationMap`オプションの使用

`composite`オプションは、プロジェクト参照で必須の設定です。これにより、プロジェクトが他のプロジェクトから参照可能になります。

`declarationMap`オプションは、ソースマップを`.d.ts`ファイルに含めるためのものです。これにより、プロジェクト間のナビゲーションが改善されます：

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

### プロジェクト間の参照の設定

プロジェクト間の参照は、`tsconfig.json`の`references`セクションで設定します：

```json
{
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

また、`package.json`でも依存関係を明示的に宣言する必要があります：

```json
{
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

この設定により、TypeScriptコンパイラーとパッケージマネージャーの両方が、プロジェクト間の依存関係を正しく理解できます。

## ビルドモードの使用

プロジェクト参照を効果的に使用するためには、TypeScriptコンパイラーのビルドモードを理解することが重要です。

### `tsc --build`コマンドの概要

`tsc --build`（または`tsc -b`）コマンドは、プロジェクト参照を考慮して、必要なプロジェクトを正しい順序でビルドします。

基本的な使用方法：

```bash
tsc -b                  # カレントディレクトリのtsconfig.jsonを使用
tsc -b src              # src/tsconfig.jsonを使用
tsc -b foo/tsconfig.json bar # 複数のプロジェクトをビルド
```

### 増分ビルドとクリーニング

`tsc --build`は増分ビルドをサポートしており、変更されたファイルとその依存先のみを再ビルドします。これにより、大規模プロジェクトでのビルド時間を大幅に短縮できます。

クリーンビルドを行う場合は、`--clean`フラグを使用します：

```bash
tsc -b --clean
```

これにより、ビルド出力が削除され、次回のビルドですべてのファイルが再コンパイルされます。

### ウォッチモードの活用

ウォッチモードを使用すると、ファイルの変更を監視し、自動的に再ビルドを行います：

```bash
tsc -b --watch
```

これは開発中に非常に便利で、コードを変更するたびに手動でビルドを実行する必要がなくなります。

## プロジェクト参照の管理ツール

大規模なプロジェクトでは、プロジェクト参照の管理が複雑になる可能性があります。そのため、いくつかの管理ツールが開発されています：

- [Moonrepo](https://moonrepo.dev/moon)
- [@monorepo-utils/workspaces-to-typescript-project-references](https://www.npmjs.com/package/@monorepo-utils/workspaces-to-typescript-project-references)
- [update-ts-references](https://www.npmjs.com/package/update-ts-references)

## 注意点とトレードオフ

プロジェクト参照を導入する際は、次の点に注意が必要です：

1. 初期セットアップの複雑さ：プロジェクト参照の初期設定は、単一の`tsconfig.json`を使用する場合よりも複雑です。
2. ビルド出力の管理：各プロジェクトの出力ディレクトリを適切に管理する必要があります。
3. 既存のビルドワークフローとの互換性：既存のビルドスクリプトやCI/CDパイプラインの更新が必要になる場合があります。
4. 学習曲線：チームメンバーがプロジェクト参照の概念と使用方法を理解する必要があります。

これらの課題は、プロジェクトの規模が大きくなるにつれて、得られる利点によって相殺されることが多いです。

プロジェクト参照は、大規模なTypeScriptプロジェクトの管理を大幅に改善する強力な機能です。適切に実装することで、開発効率の向上、ビルド時間の短縮、コードベースの整理が可能になります。次の章では、プロジェクト参照の具体的な活用例を見ていきます。

## プロジェクト参照の活用: モノレポ

### はじめに

#### 概要

このチュートリアルでは、TypeScriptのプロジェクト参照機能を使用してモノレポ（monorepo）を構築する方法を、ステップバイステップで説明します。

#### 目的

このガイドの目的は、次の要素を含むモノレポ構造を構築することです：

1. 共通のコードを含む `common` プロジェクト
2. `common` プロジェクトを利用する `cli` プロジェクト
3. 同じく `common` プロジェクトを利用する `web` プロジェクト

これらのプロジェクトは、TypeScriptのプロジェクト参照機能を使用して相互に関連付けられます。

#### 最終的なプロジェクト構造

チュートリアルの完了時、次のような構造のプロジェクトが完成します：

```plaintext
typescript-monorepo-example/ (ワークスペースルート)
├── package.json
├── tsconfig.json
├── tsconfig.base.json
├── .yarnrc.yml
└── packages/
    ├── common/ (プロジェクト)
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       └── index.ts
    ├── cli/ (プロジェクト)
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       └── index.ts
    └── web/ (プロジェクト)
        ├── package.json
        ├── tsconfig.json
        └── src/
            └── index.ts
```

この構造により、効率的なコード共有と型チェック、そして高速なビルドが可能になります。

#### 完成形のコード

このチュートリアルの完成形のコードは、次のGitHubリポジトリで確認できます：
https://github.com/yytypescript/project-reference-samples/tree/main/02-monorepo

### 用語の整理

#### ワークスペース

Yarnのワークスペース機能を使用して管理される、複数のプロジェクトを含むプロジェクト全体を指します。

#### ワークスペースルート

ワークスペースの最上位ディレクトリを指します。この例では `typescript-monorepo-example/` ディレクトリがワークスペースルートになります。

#### プロジェクト

TypeScriptのコンパイル単位を指します。この例では `common`、`cli`、`web` の各ディレクトリがそれぞれ独立したプロジェクトになります。

#### プロジェクトルート

各プロジェクトの最上位ディレクトリを指します。たとえば、`packages/common/` ディレクトリが `common` プロジェクトのプロジェクトルートになります。

### 前提条件

このチュートリアルをはじめる前に、次のツールがインストールされていることを確認してください：

- Node.js（最新の LTS バージョン）
- Yarn（バージョン 4.4.0 以上）

また、基本的な TypeScript の知識があることを前提としています。

### ワークスペースの初期化

#### ディレクトリの作成

まず、新しいワークスペースのためのディレクトリを作成します。ターミナルを開き、次のコマンドを実行してください：

```bash
mkdir typescript-monorepo-example
cd typescript-monorepo-example
```

#### package.json の作成

次に、ワークスペースルートに `package.json` ファイルを直接作成します。次の内容で `package.json` ファイルを作成してください：

```json
{
  "name": "typescript-monorepo-example",
  "private": true,
  "workspaces": ["packages/*"],
  "devDependencies": {
    "typescript": "^5.5.4"
  }
}
```

ここで重要なポイントは次の通りです：

- `"private": true`: このフィールドは、このパッケージが誤って公開されることを防ぎます。モノレポのルートパッケージは通常公開されないため、このフラグを設定します。
- `"workspaces": ["packages/*"]`: このフィールドは、Yarnにワークスペースの場所を指示します。この設定により、`packages` ディレクトリ内のすべてのサブディレクトリがワークスペースのプロジェクトとして認識されます。

#### .yarnrc.yml の作成

続いて、Yarnの設定ファイル `.yarnrc.yml` をワークスペースルートに作成し、次の内容を追加します：

```yaml
nodeLinker: node-modules
```

この設定により、Yarnがnode_modulesディレクトリを使用するようになります。

### 共通の TypeScript 設定

#### tsconfig.base.json の作成

TypeScriptの共通設定を作成します。ワークスペースルートに `tsconfig.base.json` ファイルを作成し、次の内容を追加してください：

```json
{
  "compilerOptions": {
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "target": "ESNext",
    "declaration": true,
    "composite": true,
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "${configDir}/src",
    "outDir": "${configDir}/dist"
  }
}
```

`tsconfig.base.json` の役割は、すべてのプロジェクトで共有される基本的なTypeScript設定を提供することです。この設定の中で、プロジェクト参照において特に重要なポイントは次の通りです：

- `"composite": true`: このオプションは、プロジェクト参照を使用する際に必須です。これにより、プロジェクトが他のプロジェクトから参照可能になります。
- `"declaration": true`: 宣言ファイル（.d.ts）を生成します。これは `"composite": true` を使用する際に必要です。
- `"rootDir"` と `"outDir"`: これらのオプションは、ソースファイルと出力ファイルの場所を指定します。プロジェクト参照を使用する際、これらの設定は一貫性を保つために重要です。

#### ワークスペースルートの tsconfig.json の作成

次に、ワークスペースルートに `tsconfig.json` ファイルを作成し、次の内容を追加します：

```json
{
  "include": [],
  "references": [
    {
      "path": "packages/common"
    },
    {
      "path": "packages/cli"
    },
    {
      "path": "packages/web"
    }
  ]
}
```

このワークスペースルートの `tsconfig.json` は、TypeScriptコンパイラーに向けた「目次」または「地図」のような役割を果たします。このファイルの `"references"` フィールドには、ワークスペース内のすべてのプロジェクトが列挙されており、これによってTypeScriptコンパイラーはワークスペース全体の構造を把握できます。ここでのプロジェクトの列挙順序は重要ではなく、TypeScriptコンパイラーが自動的に依存関係を解析し、適切なビルド順序を決定します。

このファイルには `compilerOptions` を含めていないことに注目してください。各プロジェクト固有の設定は、それぞれのプロジェクトの `tsconfig.json` で行います。このファイルの主な目的は、ワークスペース全体を一度にビルドできるようにすることです。ワークスペースルートで `tsc -b` を実行するだけで、すべてのプロジェクトを適切な順序でビルドできるようになります。

実際には、このファイルがなくても各プロジェクト（例：`packages/web`）で `tsc -b` を実行すれば、依存関係を解決しながらビルドすることは可能です。しかし、このファイルを用意することで、ワークスペース全体のビルドが簡単になります。このファイルは、大規模なプロジェクトの管理を容易にし、ビルドプロセスを効率化するための重要なツールです。コンパイルの制御ではなく、プロジェクト構造の定義に焦点を当てていることが特徴です。

### プロジェクトの設定

#### プロジェクトの基本構造の作成

まず、プロジェクトの基本構造を作成します。`packages` ディレクトリを作成し、その中に3つのサブディレクトリ（`common`、`cli`、`web`）を作成します。次のコマンドを実行してください：

```bash
mkdir -p packages/{common,cli,web}
```

#### common プロジェクトの設定

まず、`common` プロジェクトの設定を行います。`packages/common/package.json` ファイルを作成し、次の内容を追加してください：

```json
{
  "name": "@company/common",
  "type": "module",
  "exports": "./dist/index.js"
}
```

ここで、`"exports"` フィールドは、このパッケージが外部に公開するエントリーポイントを指定します。これにより、他のプロジェクトがこのパッケージをインポートする際の参照先が明確になります。

次に、`packages/common/tsconfig.json` ファイルを作成し、次の内容を追加します：

```json
{
  "extends": "../../tsconfig.base.json"
}
```

`"extends"` フィールドは、別の TSConfig ファイルから設定を継承することを指定します。この場合、ワークスペースルートの `tsconfig.base.json` から設定を継承しています。

最後に、`packages/common/src/index.ts` ファイルを作成し、次の内容を追加します：

```typescript title="packages/common/src/index.ts"
export function helloWorld(): string {
  return "Hello World";
}
```

#### cli プロジェクトの設定

次に、`cli` プロジェクトの設定を行います。`packages/cli/package.json` ファイルを作成し、次の内容を追加してください：

```json
{
  "name": "@company/cli",
  "type": "module",
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

`"dependencies"` フィールドは、このプロジェクトが依存する他のパッケージを指定します。ここでは、`@company/common` パッケージへの依存を宣言しています。`"workspace:^"` は、このパッケージがワークスペース内の別のプロジェクトであることを示しています。

続いて、`packages/cli/tsconfig.json` ファイルを作成し、次の内容を追加します：

```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

`"references"` フィールドは、このプロジェクトが参照する他のプロジェクトを指定します。これにより、TypeScriptコンパイラはプロジェクト間の依存関係を理解し、適切な順序でビルドを行うことができます。

最後に、`packages/cli/src/index.ts` ファイルを作成し、次の内容を追加します：

```typescript title="packages/cli/src/index.ts"
import { helloWorld } from "@company/common";

console.log(helloWorld());
```

#### web プロジェクトの設定

最後に、`web` プロジェクトの設定を行います。`packages/web/package.json` ファイルを作成し、次の内容を追加してください：

```json
{
  "name": "@company/web",
  "type": "module",
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

次に、`packages/web/tsconfig.json` ファイルを作成し、次の内容を追加します：

```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

最後に、`packages/web/src/index.ts` ファイルを作成し、次の内容を追加します：

```typescript title="packages/web/src/index.ts"
import { helloWorld } from "@company/common";

console.log(helloWorld());
```

### 依存関係のインストール

すべてのプロジェクトの設定が完了したら、依存関係をインストールします。ワークスペースルートで次のコマンドを実行してください：

```bash
yarn install
```

### プロジェクトのビルド

これで、ワークスペース全体をビルドする準備が整いました。次のコマンドをワークスペースルートで実行してプロジェクトをビルドしてください：

```bash
yarn tsc -b
```

このコマンドをワークスペースルートで実行することが重要です。なぜなら、ワークスペースルートの `tsconfig.json` がプロジェクト参照の構造を定義しているからです。

このコマンドを実行すると、次のような処理が行われます：

1. TypeScriptコンパイラ（tsc）は、まずワークスペースルートの `tsconfig.json` を読み込みます。このファイルには `"references"` フィールドがあり、ここに列挙されているプロジェクトがビルドの対象となります。
2. `"references"` フィールドに記載されている順序は重要ではありません。TypeScriptコンパイラは、これらの参照を解析し、プロジェクト間の依存関係を自動的に判断します。
3. 依存関係グラフに基づいて、プロジェクトを適切な順序でビルドします。この例では、次の順序でビルドが行われます：
   - まず `common` プロジェクト（他のプロジェクトに依存していないため）
   - 次に `cli` と `web` プロジェクト（両方とも `common` に依存しているため）
4. 各プロジェクトのビルド時には、そのプロジェクトの `tsconfig.json` が使用されます。これらの設定ファイルは `tsconfig.base.json` を継承しているため、共通の設定が適用されます。
5. 各プロジェクトのソースファイルがコンパイルされ、指定された出力ディレクトリ（`dist`）に JavaScript ファイルと型定義ファイル（.d.ts）が生成されます。
6. プロジェクト参照の情報を含む `.tsbuildinfo` ファイルが各プロジェクトに生成されます。これにより、次回のビルド時に変更されたファイルのみを再コンパイルすることができ、ビルド時間が短縮されます。

このプロセスにより、プロジェクト間の依存関係が正しく解決され、必要な順序でビルドが行われます。また、変更があったプロジェクトとその依存先のみが再ビルドされるため、大規模なプロジェクトでも効率的なビルドが可能になります。

### 実行

ビルドが成功したら、作成したプロジェクトを実行してみましょう。まず、CLI プロジェクトを実行します：

```bash
node packages/cli/dist/index.js
```

次に、Web プロジェクトを実行します：

```bash
node packages/web/dist/index.js
```

両方のコマンドで "Hello World" が出力されれば、セットアップは成功です。

### まとめ

このチュートリアルでは、TypeScriptのプロジェクト参照機能を使用してモノレポを構築する方法を学びました。この構造により、大規模なTypeScriptプロジェクトを効率的に管理し、ビルド時間を短縮し、コードの再利用性を高めることができます。プロジェクト参照を活用することで、ビルド時間の短縮、型チェックの効率化、依存関係の明確化など、多くの利点を得ることができます。

## プロジェクト参照の活用: ソースとテストの分離

### はじめに {#source-test-separation-intro}

#### 概要 {#source-test-separation-overview}

このチュートリアルでは、TypeScriptのプロジェクト参照機能を使用して、ソースコードとテストコードを分離した構造を持つプロジェクトを構築する方法を、ステップバイステップで説明します。

#### 目的 {#source-test-separation-purpose}

このガイドの目的は、次の要素を含むプロジェクト構造を構築することです：

1. メインのソースコードを含む `src` ディレクトリ
2. テストコードを含む `src` ディレクトリ内の `.test.ts` ファイル
3. ソースコードとテストコードを分離しつつ、プロジェクト参照を使用して関連つける

この構造により、ビルドの最適化と依存関係の明確化を実現します。依存関係の明確化は、次のような利点をもたらします：

- コードの構造が明確になり、開発者が全体像を把握しやすくなります。
- 不適切な依存関係（例：ソースコードがテストコードに依存する）を防ぎ、コードの品質を向上させます。
- ビルドプロセスの効率化につながり、大規模プロジェクトでのビルド時間を短縮します。

#### 最終的なプロジェクト構造 {#source-test-separation-final-structure}

チュートリアルの完了時、次のような構造のプロジェクトが完成します：

```plaintext
typescript-source-test-separation/
├── package.json
├── tsconfig.json
├── tsconfig.src.json
├── tsconfig.test.json
├── .yarnrc.yml
└── src/
    ├── hello-world.ts
    └── hello-world.test.ts
```

この構造により、効率的なコード管理と高速なビルドが可能になります。

#### 完成形のコード {#source-test-separation-final-code}

このチュートリアルの完成形のコードは、次のGitHubリポジトリで確認できます：
https://github.com/yytypescript/project-reference-samples/tree/main/01-source-test-separation

### 前提条件 {#source-test-separation-prerequisites}

このチュートリアルをはじめる前に、次のツールがインストールされていることを確認してください：

- Node.js（最新の LTS バージョン）
- Yarn（バージョン 4.4.0 以上）

また、基本的な TypeScript の知識があることを前提としています。

### プロジェクトの初期化 {#source-test-separation-init}

まず、新しいプロジェクトのためのディレクトリを作成します。ターミナルを開き、次のコマンドを実行してください：

```bash
mkdir typescript-source-test-separation
cd typescript-source-test-separation
```

次に、`package.json` ファイルを手動で作成します。次の内容を `package.json` ファイルに追加してください：

```json
{
  "name": "typescript-source-test-separation",
  "private": true,
  "devDependencies": {
    "@types/node": "^22.3.0",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}
```

続いて、`.yarnrc.yml` ファイルを作成し、次の内容を追加します：

```yaml
nodeLinker: node-modules
```

この設定により、Yarnがnode_modulesディレクトリを使用するようになります。

最後に、依存関係をインストールします：

```bash
yarn install
```

### TypeScript設定ファイルの作成

#### ルートの tsconfig.json

プロジェクトのルートディレクトリに `tsconfig.json` ファイルを作成し、次の内容を追加します：

```json
{
  "files": [],
  "references": [
    {
      "path": "tsconfig.src.json"
    },
    {
      "path": "tsconfig.test.json"
    }
  ]
}
```

このファイルは、TypeScriptコンパイラに向けた「目次」または「地図」のような役割を果たします。`"references"` フィールドには、このプロジェクトが参照する他のTSConfigファイルを指定します。これにより、TypeScriptコンパイラはプロジェクト間の依存関係を理解し、適切な順序でビルドを行うことができます。

`"files"` フィールドを空に設定することで、このファイル自体はコンパイル対象にならず、純粋にプロジェクト参照の設定のみを行います。これにより、プロジェクト全体の構造を定義しつつ、実際のコンパイルは各サブプロジェクトの設定に委ねることができます。

#### ソースコード用の tsconfig.src.json

次に、ソースコード用の `tsconfig.src.json` ファイルを作成し、次の内容を追加します：

```json
{
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["**/*.ts"],
  "exclude": ["**/*.test.ts"]
}
```

このファイルでは、次の設定が特に重要です：

- `"composite": true`: このオプションは、プロジェクト参照を使用する際に必須です。これにより、このプロジェクトが他のプロジェクトから参照可能になります。
- `"rootDir"`: ソースファイルのルートディレクトリを指定します。
- `"outDir"`: コンパイル後のファイルの出力先を指定します。

その他の設定項目：

- `"include"`: コンパイル対象のファイルを指定します。
- `"exclude"`: コンパイルから除外するファイルを指定します。ここではテストファイルを除外しています。

#### テストコード用の tsconfig.test.json

最後に、テストコード用の `tsconfig.test.json` ファイルを作成し、次の内容を追加します：

```json
{
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "noEmit": true,
    "skipLibCheck": true
  },
  "references": [
    {
      "path": "tsconfig.src.json"
    }
  ]
}
```

このファイルでは、次の設定が特に重要です：

- `"composite": true`: ソースコードの設定と同様、プロジェクト参照を可能にします。
- `"references"`: ソースコードのプロジェクトへの参照を定義します。これにより、テストコードからソースコードへの依存関係が明確になります。
- `"noEmit": true`: この設定により、テストコードのトランスパイル（JavaScriptへの変換）は行われませんが、型チェックは実行されます。これは、テストコードは直接実行されるため、トランスパイルする必要がない一方で、型の整合性は確認したいという要求に応えるものです。

その他の設定項目：

- `"skipLibCheck": true`: 宣言ファイルの型チェックをスキップし、ビルド時間を短縮します。

この構成により、ソースコードからテストコードへの依存が不可能になります。これは、本番コードにテストコードが混入することを防ぎ、コードの品質と保守性を向上させる重要な利点です。

### ソースコードとテストコードの作成

#### ソースコードの作成

`src` ディレクトリを作成し、その中に `hello-world.ts` ファイルを作成します：

```typescript
export function helloWorld(): string {
  return "Hello World";
}
```

#### テストコードの作成

同じく `src` ディレクトリ内に、`hello-world.test.ts` ファイルを作成します：

```typescript
import { expect, test } from "vitest";
import { helloWorld } from "./hello-world";

test("helloWorld function", () => {
  expect(helloWorld()).toBe("Hello World");
});
```

### プロジェクトのビルドとテスト

これで、プロジェクトをビルドし、テストを実行する準備が整いました。

#### ソースコードのみをコンパイル

ソースコードのみをコンパイルするには、次のコマンドを実行します：

```bash
yarn tsc -b tsconfig.src.json
```

このコマンドは `tsconfig.src.json` で定義されたソースコードのみをコンパイルします。テストコードは除外されます。

#### ソースコードとテストコードの両方をコンパイル

ソースコードとテストコードの両方をコンパイルするには、プロジェクトのルートで次のコマンドを実行します：

```bash
yarn tsc -b
```

このコマンドを実行すると、次のような処理が内部的に行われます：

1. TypeScriptコンパイラは、まずルートの `tsconfig.json` を読み込みます。
2. 依存関係グラフの構築:
   - `tsconfig.json` の `references` フィールドに基づいて、`tsconfig.src.json` と `tsconfig.test.json` が参照されます。
   - さらに、`tsconfig.test.json` の `references` フィールドにより、`tsconfig.src.json` への依存関係が認識されます。
   - これにより、`src` → `test` という依存関係グラフが構築されます。
3. コンパイルの実行:
   - 依存関係グラフに基づいて、プロジェクトを適切な順序で処理します。
   - まず `tsconfig.src.json` が処理されます。これにより、ソースコードがトランスパイルされ、出力ファイルが生成されます。
   - 次に `tsconfig.test.json` が処理されます。この際、`tsconfig.src.json` の出力を参照します。
   - `tsconfig.test.json` の `"noEmit": true` 設定により、テストコードのトランスパイルは行われませんが、型チェックは実行されます。

この過程により、ソースコードのトランスパイルとテストコードの型チェックが一度の操作で行われます。これにより、ソースコードとテストコード間の型の整合性が保証され、かつテストコードが不要にトランスパイルされることを防ぎます。

#### テストの実行

テストを実行するには、次のコマンドを使用します：

```bash
yarn vitest
```

このコマンドは、Vitestを使用してテストを実行します。

### プロジェクト参照の利点 {#source-test-separation-benefits}

このプロジェクト構造には、次のような利点があります：

1. **ビルドの最適化**: ソースコードとテストコードが分離されているため、本番用のビルドにテストコードが含まれません。
2. **依存関係の明確化**: テストプロジェクトがソースプロジェクトに依存する構造により、不適切な依存関係を防ぎます。特に、ソースコードからテストコードへの依存が不可能になるため、本番コードの品質が向上します。
3. **高速なフィードバック**: 部分的なビルドが可能になり、変更された部分のみを素早くチェックできます。
4. **IDE パフォーマンスの向上**: プロジェクトの分割により、各部分の型チェックが高速化され、IDEのレスポンスが向上します。

### まとめ {#source-test-separation-summary}

このチュートリアルでは、TypeScriptのプロジェクト参照機能を使用して、ソースコードとテストコードを分離した構造を持つプロジェクトを構築する方法を学びました。この構造により、大規模なTypeScriptプロジェクトを効率的に管理し、ビルド時間を短縮し、コードの品質を向上させることができます。プロジェクト参照を活用することで、開発プロセスの効率化と保守性の向上を実現できます。

## おわりに

TypeScriptのプロジェクト参照機能は、大規模プロジェクトの管理を効率化する強力なツールです。主な利点には、ビルド時間の短縮、コード構造の改善、型チェックの効率化があります。この機能を使うと、大きなコードベースを論理的に分割し、モジュール間の依存関係を明確にできます。プロジェクト参照の導入には学習が必要ですが、プロジェクトの規模が大きくなるほど、その価値は増大します。大規模なTypeScriptプロジェクトの開発者にとって、この機能の習得は生産性と品質を向上させる重要な投資となるでしょう。
