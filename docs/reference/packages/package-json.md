---
sidebar_label: package.json
---

# package.json

## package.jsonの役割

package.jsonは、Node.jsプロジェクトのメタ情報と依存関係を管理するファイルです。プロジェクトの「身分証明書」のようなもので、そのプロジェクトの名前やバージョン、使っているパッケージの一覧などが記載されています。

TypeScriptやJavaScriptのプロジェクトでは、ほぼすべてのプロジェクトにこのファイルが存在します。パッケージをインストールしたり、ビルドコマンドを実行したりする際に、package.jsonが参照されます。

## package.jsonの作り方

package.jsonは`npm init`コマンドで作成できます。

```shell
npm init
```

このコマンドを実行すると、パッケージ名やバージョンなどを対話的に入力するよう求められます。すべての質問にデフォルト値で答えてすぐにファイルを作りたい場合は、`-y`オプションをつけます。

```shell
npm init -y
```

`-y`を使うと、次のようなpackage.jsonが自動的に生成されます。

```json title="npm init -yで生成されるpackage.json"
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 主要フィールドの解説

package.jsonにはさまざまなフィールドがありますが、ここでは初学者がまず押さえておくべきものに絞って解説します。

### name

`name`はパッケージの名前です。プロジェクトのディレクトリ名が自動的に設定されることが多いです。

```json
{
  "name": "my-app"
}
```

npmにパッケージを公開する場合、この名前がパッケージの識別子になります。公開しない自分用のプロジェクトであっても、`name`は設定しておくのが一般的です。

### version

`version`はパッケージのバージョンです。`1.0.0`のように3つの数字をドットで区切った形式(セマンティックバージョニング)で記載します。

```json
{
  "version": "1.0.0"
}
```

npmにパッケージとして公開する場合、バージョンはリリースのたびに適切に更新する必要があります。一方、Webアプリケーションのように公開しないプロジェクトでは、`npm init`で設定された初期値(`1.0.0`)のままで問題ありません。

:::tip セマンティックバージョニング
セマンティックバージョニングについて詳しくは[パッケージのインストール](./installing-packages.md)で説明しています。
:::

### scripts

`scripts`は、よく使うコマンドに名前をつけて登録しておくフィールドです。ここに登録したコマンドは`npm run <スクリプト名>`で実行できます。

```json
{
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "lint": "eslint ."
  }
}
```

上の例では、`npm run build`を実行すると`tsc`(TypeScriptコンパイラ)が動きます。`npm run test`でテスト、`npm run lint`でリンター(コードの問題を検出するツール)が実行されます。

:::tip
`test`と`start`だけは特別で、`npm run`を省略して`npm test`、`npm start`のように実行できます。
:::

### dependencies

`dependencies`は、本番環境でも必要なパッケージの一覧です。アプリケーションが動作するために欠かせないパッケージをここに記載します。

```json
{
  "dependencies": {
    "zod": "^3.22.0",
    "express": "^4.18.0"
  }
}
```

たとえば、バリデーションライブラリのzodやWebフレームワークのexpressなど、アプリケーションの機能そのものに使うパッケージが該当します。

### devDependencies

`devDependencies`は、開発時にのみ必要なパッケージの一覧です。本番環境では使わないが、開発やビルドの過程で必要になるパッケージをここに記載します。

```json
{
  "devDependencies": {
    "typescript": "^5.3.0",
    "vitest": "^1.0.0",
    "eslint": "^8.50.0"
  }
}
```

TypeScriptコンパイラ、テストツール、リンターなどが代表例です。これらは開発中に使いますが、アプリケーションの実行自体には必要ありません。

### dependenciesとdevDependenciesの違い

この2つの違いを、料理にたとえてみましょう。`dependencies`は「料理の材料」です。お客さんに提供する料理に欠かせないものです。一方、`devDependencies`は「調理器具」です。料理を作るのには必要ですが、お客さんのテーブルには並びません。

### npm install(引数なし)で一括インストール

プロジェクトをgitからクローンしたときや、他の開発者からプロジェクトを受け取ったとき、`node_modules`は含まれていないのが普通です。その場合は、`npm install`を引数なしで実行してください。

```shell
npm install
```

このコマンドを実行すると、`dependencies`と`devDependencies`に記載されたすべてのパッケージがインストールされます。

### peerDependencies

`peerDependencies`は、そのパッケージが利用者側で別途インストールされていることを前提とするパッケージの一覧です。

```json
{
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

これは主にプラグインやライブラリの作者が使うフィールドです。たとえば、Reactプラグインを作る場合、React本体は利用者のプロジェクトにすでにインストールされているはずです。このとき、プラグイン側のpackage.jsonで`peerDependencies`にReactを指定します。

初学者がアプリケーション開発で直接書くことは少ないですが、パッケージをインストールしたときに「peerDependenciesが不足しています」という警告が出ることがあります。その場合は、指示されたパッケージを追加でインストールすれば解決します。

## npm installとnpm install -Dの違い

パッケージをインストールするとき、どちらのフィールドに追加するかは`npm install`コマンドのオプションで決まります。

```shell
# dependenciesに追加される
npm install zod
```

```shell
# devDependenciesに追加される
npm install -D typescript
```

`npm install <パッケージ名>`を実行すると`dependencies`に追加されます。`-D`(`--save-dev`の省略形)をつけると`devDependencies`に追加されます。

迷ったときは、「このパッケージがないとアプリケーションが動かないか？」と考えてみてください。動かないなら`dependencies`、開発やビルドのためだけなら`devDependencies`です。

## 具体例

実際のpackage.jsonの例を見てみましょう。TypeScriptプロジェクトで、zodとvitestを使う場合のpackage.jsonです。

```json title="package.jsonの例"
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "test": "vitest"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
```

各フィールドの意味を整理すると、次のようになります。

| フィールド                   | 値          | 意味                                          |
| ---------------------------- | ----------- | --------------------------------------------- |
| `name`                       | `"my-app"`  | プロジェクト名                                |
| `version`                    | `"1.0.0"`   | バージョン                                    |
| `scripts.build`              | `"tsc"`     | `npm run build`でTypeScriptをコンパイル       |
| `scripts.test`               | `"vitest"`  | `npm run test`でテストを実行                  |
| `dependencies.zod`           | `"^3.22.0"` | zodをバージョン3.22.0以上で使用(本番で必要)   |
| `devDependencies.typescript` | `"^5.3.0"`  | TypeScriptをバージョン5.3.0以上で使用(開発用) |
| `devDependencies.vitest`     | `"^1.0.0"`  | vitestをバージョン1.0.0以上で使用(開発用)     |

:::note バージョン指定の`^`(キャレット)
`^3.22.0`のように先頭に`^`がついたバージョン指定は「メジャーバージョンが同じ範囲で最新のもの」を意味します。つまり`^3.22.0`は`3.22.0`以上`4.0.0`未満のバージョンを受け入れます。これにより、バグ修正や小さな機能追加を含む新しいバージョンが自動的にインストールされます。
:::

<PostILearned>

・package.jsonはプロジェクトのメタ情報と依存関係を管理するファイル
・npm init -yで作成できる
・dependenciesは本番用、devDependenciesは開発専用パッケージ
・scriptsにコマンドを登録しnpm runで実行できる

</PostILearned>
