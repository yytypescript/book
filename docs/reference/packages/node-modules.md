---
sidebar_label: node_modules
---

# node_modules

## node_modulesは何のためにある？

`node_modules`は、[`npm install`](./installing-packages.md)でインストールされたパッケージが保存されるディレクトリです。プロジェクトのルートディレクトリに自動的に作成されます。

```shell
npm install
```

このコマンドを実行すると、[package.json](./package-json.md)に記載されたパッケージがダウンロードされ、`node_modules`ディレクトリの中に配置されます。TypeScriptやJavaScriptのコードで`import`を使ってパッケージを読み込むとき、このディレクトリからパッケージが探されます。

```ts twoslash
// @types: zod
// node_modulesの中にあるzodパッケージを読み込む
import { z } from "zod";
```

つまり、`node_modules`はプロジェクトが利用するパッケージの保管場所です。本棚のようなもので、必要なパッケージ(本)がすべてこの中に並んでいます。

## node_modulesのgit管理

### gitにはコミットしない

`node_modules`はgitにコミットしてはいけません。`.gitignore`ファイルに`node_modules/`を追加して、gitの管理対象から除外します。

`.gitignore`に次の1行を追加してください。

```text title=".gitignore"
node_modules/
```

### なぜgitにコミットしないのか

`node_modules`をgitにコミットしない理由は主に3つあります。

1. サイズが非常に大きい: 小さなプロジェクトでも`node_modules`は数百MBになることがあります。gitリポジトリにこれを含めると、クローンやプルに時間がかかり、リポジトリのサイズも肥大化します。
2. ロックファイルから再現できる: [ロックファイル](./lock-file.md)があれば`npm install`を実行するだけで、まったく同じ内容の`node_modules`を再現できます。わざわざgitで管理する必要がありません。
3. OS依存のバイナリが含まれることがある: 一部のパッケージはOS(Windows, macOS, Linuxなど)に応じた実行ファイル(バイナリ)を含みます。あるOSで生成された`node_modules`を別のOSで使おうとすると、正しく動作しないことがあります。

:::caution
プロジェクトを新しくクローンしたときや、`node_modules`を削除してしまったときは、`npm install`を実行すれば復元できます。慌てる必要はありません。
:::

## 複数のパッケージが入る構造

`node_modules`の中には、インストールしたパッケージごとにディレクトリが作られます。

```text
node_modules/
├── zod/
│   ├── package.json
│   ├── lib/
│   └── ...
├── express/
│   ├── package.json
│   ├── lib/
│   └── ...
└── typescript/
    ├── package.json
    ├── bin/
    └── ...
```

各パッケージのディレクトリの中にも`package.json`があります。このpackage.jsonには、そのパッケージ自身の名前やバージョン、さらにそのパッケージが依存している別のパッケージの情報が記載されています。

### 推移的依存関係

パッケージAがパッケージBに依存し、パッケージBがパッケージCに依存しているということがあります。このように、直接インストールしたパッケージが間接的に依存しているパッケージのことを推移的依存関係(transitive dependencies)と呼びます。

たとえば、あなたが`express`をインストールしたとします。expressは内部で複数のパッケージに依存しています。それらのパッケージもまた別のパッケージに依存しています。こうした推移的依存関係にあるパッケージもすべて`node_modules`の中にインストールされます。

そのため、package.jsonに書かれているパッケージは数個でも、`node_modules`の中には数十から数百のパッケージが入っていることは珍しくありません。

### ホイスティングとファントム依存

npmは推移的依存関係のパッケージも`node_modules`の直下に配置します。この動作をホイスティング(hoisting: 巻き上げ)と呼びます。ホイスティングにより、同じパッケージの重複インストールを減らし、ディスク容量を節約できます。

```text
node_modules/
├── express/        ← 自分がインストールしたパッケージ
├── body-parser/    ← expressの推移的依存関係(ホイスティングされた)
├── cookie/         ← 同上
└── ...
```

しかし、ホイスティングには副作用があります。`node_modules`の直下にパッケージが並ぶため、`package.json`に書いていないパッケージでも`import`できてしまうのです。このように、宣言していない推移的依存関係にアクセスできてしまう問題をファントム依存(phantom dependency)と呼びます。

```ts
// package.jsonにはexpressだけ書いてあり、cookieは書いていない
// しかし、npmではこのimportが動いてしまう
import cookie from "cookie";
```

これは一見便利ですが、`express`がバージョンアップで`cookie`を使わなくなると、突然`import`が失敗するリスクがあります。

pnpmでは、`node_modules`の直下に直接依存のシンボリックリンクだけを配置し、推移的依存関係は内部ディレクトリに隔離することで、ファントム依存を防止しています。Bunでも設定を変更すると、pnpmと同様のシンボリックリンクベースの構造でファントム依存を防止できます。

Yarn([Plug'n'Play(PnP)](./package-manager.md)モード)は、これらとは異なるアプローチをとっています。そもそも`node_modules`を作らず、専用のローダーが依存関係を管理します。宣言されていないパッケージへのアクセスはローダーが拒否するため、ファントム依存が起きません。

いずれの場合も、`package.json`に書いていないパッケージを`import`しようとするとエラーになるため、依存関係の問題に早い段階で気付けます。

## なぜnode_packagesではなくnode_modulesなのか

「パッケージを入れるディレクトリなのに、なぜ`node_packages`ではなく`node_modules`なのか」と疑問に思うかもしれません。

これはNode.jsにおける「モジュール」と「パッケージ」の違いに関係しています。Node.jsでは、`node_modules`ディレクトリに置かれた`require()`で読み込めるもの(ファイルやディレクトリ)をモジュールと呼びます。一方、パッケージは`package.json`を持つディレクトリのことです。

実は`node_modules`には、パッケージだけでなく単一のJavaScriptファイルも置けます。たとえば`node_modules/foo.js`というファイルを作れば、`require('foo')`で読み込めます。このファイルは`package.json`を持たないので「パッケージ」ではなく「モジュール」です。つまり、`node_modules`は「モジュールを格納するディレクトリ」であり、パッケージはモジュールの一形態にすぎないため、`node_packages`ではなく`node_modules`と名付けられています。

:::note 参考
npmの公式ドキュメント「[How npm Works - File and Directory Names](https://npm.github.io/how-npm-works-docs/theory-and-design/file-and-directory-names.html)」で、モジュールとパッケージの違い、`node_modules`の命名理由が解説されています。
:::

<PostILearned>

・node_modulesはパッケージの保管ディレクトリ。gitには含めず.gitignoreで除外する
・ロックファイルからnpm installでいつでも再現可能
・推移的依存もすべて格納され、ホイスティングでファントム依存が起きうる
・pnpmやYarn PnPはファントム依存を防止できる

</PostILearned>
