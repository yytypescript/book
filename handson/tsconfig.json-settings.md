# tsconfig.jsonを設定する

Node.jsはそれ自身ではTypeScriptをサポートしているわけではないため、TypeScriptの導入をする時はTypeScriptの設定ファイルであるtsconfig.jsonが必要です。

## 初めての`tsconfig.json`

typescriptがpackage.jsonのdependencies\(devDependencies\)に入っているプロジェクトで以下を実行してください。

```bash
npx tsc --init
```

typescriptがグローバルインストールされていれば下記のように実行することもできます。

```bash
tsc --init
```

tsconfig.jsonが作成されます。すでにtsconfig.jsonがある時は上書きされませんのでいったん既存のtsconfig.jsonを別名に変更するなど、一度tsconfig.jsonと名のつくファイルが存在しないようにしてください。

公式にあるtsconfig.jsonの説明はこちらです。

{% embed url="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" caption="" %}

全てのオプションの解説をすると余白が足りないので、ここでは用途を抽出して、以下の観点で説明します。

* `target`の決め方
* フロントエンドとバックエンド
* 2020年版スクラッチからつくるなら

## `target`

TypeScriptは最終的にJavaScriptにトランスパイルされます。このオプションはその時にどのバージョンのJavaScript向けに出力するかといったものです。

JavaScriptも時代とともに進化をして、既存のオブジェクトに新しいメソッドが追加されることがあります。新しく追加されたメソッドは出力するJavaScriptのバージョンがそのメソッドをサポートしていない時はすなわち使えない、というわけではなくTypeScript側で擬似的に補完してくれます。

このような最新バージョンにはある、または現時点では実装には至っていないが提案中\(proposal\)である機能を取り入れて使えるようにする物を通称polyfillと言います。polyfillについて更に詳しく知りたい方は、[What is a polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill) \(この単語の創案者である Remy Sharp による記事\)をご覧ください。

### `lib`

使いたい`target`には使いたい機能がない、でも使いたい。そのような時は`lib`オプションを指定することで使うことができるようになります。

`lib`は必ず指定する必要はありません。`target`を指定すればその`target`で使われている標準ライブラリは自動的に追加されます。指定した`target`では実装されていないライブラリや、必要がないライブラリを除外したい時に使います。

指定は必ずしも必要ないとは申し上げましたがNode.jsでは構文\(`syntax`\)のサポートよりもAPIのサポートが先に行われることがあるため`target`ではまだサポートしていないがNode.jsで使えるようになっているAPIを`lib`を指定することによって使えるようにすることがあります。

### `target`は何を指定したらいいか

あえて古いコードで動かしている、または古いNode.jsを使っているといった事情がなければ最新に近い物を指定することは問題ありません。2020/09現在はLTSとしてNode.js 14.xが登場しています。Node.js 14.xであれば`target: "es2020"`は無難な選択肢です。

またBabelなどの専用のコンパイラやモジュールバンドラに処理を任せたい場合は`target`に`"esnext"`を指定して、そこからバージョンに合わせたコンパイルを各々にお願いすることになります。

## フロントエンドとバックエンド

フロントエンドとバックエンドはモジュールの読み込み方法が異なっています。詳細は`import / export / require`のページをご覧ください。以下の設定は使う場面で切り替えるべき項目です。

{% page-ref page="../features/import-export-require/" %}

### `module`

モジュール読み込みの仕組みが異なっているライブラリの互換性は一般的にはないものと考えてください。そしてこれは**フロントエンドとバックエンドでは異なります**。

#### `commonjs`

バックエンド\(サーバーサイド\)で使われているモジュール読み込みの解決方法です。作成しているモジュールやパッケージがバックエンドでの動作だけを保証したい場合は最も無難な選択です。

#### `es2015, es2020, esnext`

通称`esmodule`と呼ばれるモジュール読み込みの解決方法です。フロントエンドで使われています。Node.jsは13.2.0でバックエンドでも同様にこのモジュール解決方法をサポートしましたが2020年現在は対応しているパッケージは少ないです。

このような違いがあるため、使う場面がバックエンドなら`commonjs`を、フロントエンドなら`es2015, es2020, esnext`を指定することが望ましいです。

## 2020年版スクラッチから作るなら

スクラッチから作るということは現在の資産との整合性の都合、しがらみが一切ない状態です。ここから作るならこれだけは満たしておけば型に満ちたプログラミングができるという紹介です。

しがらみがないという条件のもと、Node.jsは14.xを使っているものとします。

### バックエンドの場合

```javascript
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": [
      "es2020"
    ],
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
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ],
  "compileOnSave": false
}
```

### フロントエンドの場合

```javascript
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "lib": [
      "es2020",
      "dom"
    ],
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
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ],
  "compileOnSave": false
}
```

### 異なる箇所について

これらふたつのtsconfig.jsonの設定で異なるのは`module, lib, jsx`です。フロントエンドであれば`lib`に`dom`を加え、さらに`jsx`を使うのであればどのミドルウェアを使うのかを設定します。

