# tsconfig.jsonを設定する

Node.jsはそれ自身ではTypeScriptをサポートしているわけではないため、TypeScriptの導入をする時はTypeScriptの設定ファイルであるtsconfig.jsonが必要です。

## 初めてのtsconfig.json

typescriptがpackage.jsonのdependencies(devDependencies)に入っているプロジェクトで以下を実行してください。

```bash
npx tsc --init
```

typescriptがグローバルインストールされていれば次のように実行することもできます。

```bash
tsc --init
```

tsconfig.jsonが作成されます。すでにtsconfig.jsonがある時は上書きされませんのでいったん既存のtsconfig.jsonを別名に変更するなど、一度tsconfig.jsonと名のつくファイルが存在しないようにしてください。

公式にあるtsconfig.jsonの説明はこちらです。

<https://www.typescriptlang.org/docs/handbook/tsconfig-json.html>

すべてのオプションの解説をすると余白が足りないので、ここでは用途を抽出して、次の観点で説明します。

- `target`の決め方
- フロントエンドとバックエンド
- 2020年版スクラッチからつくるなら

## `target`

TypeScriptは最終的にJavaScriptにコンパイルされます。このオプションはそのときにどのバージョンのJavaScript向けに出力するかといったものです。

`target`を設定すれば、TypeScriptはその`target`の時点で使用できるオブジェクト、関数の定義ファイルが読み込まれます。つまり、あまりにも古いバージョンの`target`を指定すると昨今当然のように使っているオブジェクトや関数を使うことができないかもしれません。

`target`を最新にしても、動作する環境が古いままだと使うことはできません。TypeScriptはコーディング中はあたかもそのオブジェクト、関数があるかのように入力補完をしますが、実際に動く`js`の実行環境がそのバージョンのオブジェクトや関数を持っているかどうかは別問題だからです。とはいえ構文に新たな記法が生まれた場合、生まれるより前の`target`に設定すると新たな記法で書いていたとしてもコンパイル時にその`target`で有効な構文に変換してくれます。有名な例では関数の表記です。たとえば`"target": "es5"`を指定した場合は`() => {}`といった`"target": "es2015"`から使えるアロー関数などの構文を`ES5`でも動く`function() {}`という形式にコンパイルしてくれます。

### `lib`

使いたい`target`には使いたい機能がない、でも使いたい。そのような時は`lib`オプションを指定することで使うことができるようになります。

このような最新バージョンにはある、または現時点では実装には至っていないが提案中(proposal)である機能を取り入れて使えるようにする物を通称ポリフィルと言います。ポリフィルについてさらに詳しく知りたい方は、[What is a polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill) (この単語の創案者である Remy Sharp による記事)をご覧ください。

`lib`は必ず指定する必要はありません。`target`を指定すればその`target`で使われているライブラリは自動的に追加されます。指定した`target`では実装されていないライブラリや、必要がないライブラリを除外したいときに使います。

指定は必ずしも必要ないとは申しあげましたがNode.jsでは構文(`syntax`)のサポートよりもAPIのサポートが先に行われることがあるため`target`ではまだサポートしていないがNode.jsで使えるようになっているAPIを`lib`を指定することによって使えるようにすることがあります。

#### `lib`を指定する上での注意

`lib`を指定すると、明示的にどの`target`の`lib`を使うかも明記しなければいけません。

次のような`lib`を指定しない`target`の書き方は問題がありません。

```json
{
  "compilerOptions": {
    "target": "es2018"
    // "lib": []
  }
}
```

`lib`を指定すると、明示的にどの`target`の`lib`を使うかも明記しなければいけません。

```json
{
  "compilerOptions": {
    "target": "es2018",
    "lib": [
      "es2018",
      "esnext.AsyncIterable",
      "esnext.Array",
      "esnext.Intl",
      "esnext.Symbol"
    ]
  }
}
```

`lib`の先頭要素の`"es2018"`を省いてしまうとライブラリの多くが存在しない状態になります。

### `target`は何を指定したらいいか

あえて古いコードで動かしている、または古いNode.jsを使っているといった事情がなければ最新に近い物を指定することは問題ありません。2020/09現在はLTSとしてNode.js 14.xが登場しています。Node.js 14.xであれば`"target": "es2020"`は無難な選択肢です。

またBabelなどの専用のコンパイラやモジュールバンドラに処理を任せたい場合は`target`に`"esnext"`を指定して、そこからバージョンに合わせたコンパイルを各々にお願いすることになります。

Node.jsのバージョンごとにサポートされているEcmaScriptの機能は [node.green](https://node.green) で確認することができます。

## フロントエンドとバックエンド

フロントエンドとバックエンドはモジュールの読み込み方法が異なっています。詳細は`import / export / require`のページをご覧ください。次の設定は使う場面で切り替えるべき項目です。

[import / export /require](../import-export-require.md)

ここで登場するモジュールという言葉ですが、この言葉に馴染みのない方はそのコードのファイルが読み込む他のファイルの中にあるコードぐらいに捉えてください。それらは同じプロジェクト内の他のファイルの中のコードでもあれば`npm install`したものでもあります。とくに`npm install`したものであればこれらをパッケージと呼びます。

### `module`

このオプションは出力されるJavaScriptがどのようにモジュールを読み込むか指定します。

モジュール読み込みの仕組みが異なっているライブラリの互換性は一般的にはないものと考えてください。そしてこれは**フロントエンドとバックエンドでは異なります**。

#### `commonjs`

バックエンド(サーバーサイド)で使われているモジュール読み込みの解決方法です。作成しているモジュールやパッケージがバックエンドでの動作だけを保証したい場合はもっとも無難な選択です。

#### `es2015, es2020, esnext`

通称`esmodule`と呼ばれるモジュール読み込みの解決方法です。フロントエンドで使われています。Node.jsは13.2.0でバックエンドでも同様にこのモジュール解決方法をサポートしましたが2020年現在は対応しているパッケージは少ないです。

このような違いがあるため、使う場面がバックエンドなら`commonjs`を、フロントエンドなら`es2015, es2020, esnext`を指定することが望ましいです。

## 2020年版スクラッチから作るなら

スクラッチから作るということは現在の資産との整合性の都合、しがらみが一切ない状態です。ここから作るならこれだけは満たしておけば型に満ちたプログラミングができるという紹介です。

しがらみがないという条件のもと、Node.jsは14.xを使っているものとします。

### バックエンドの場合

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "src",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"],
  "compileOnSave": false
}
```

### フロントエンドの場合

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "jsx": "react",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "src",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"],
  "compileOnSave": false
}
```

### 異なる箇所について

これらふたつのtsconfig.jsonの設定で異なるのは`module, lib, jsx`です。フロントエンドであれば`lib`に`dom`を加えることもあります(ただし、これは`"target": "es2020"`に組み込まれています)。さらに`jsx`を使うのであれば`tsx`をどのようにしてjsのファイルに出力コンパイルしたいかを`jsx`オプションで指定します。
