---
sidebar_label: デュアルパッケージ開発者のためのtsconfig
---

# デュアルパッケージ開発者のためのtsconfig (Dual Package)

フロントエンドでもバックエンドでもTypeScriptこれ一本！Universal JSという考えがあります。確かにフロントエンドを動的にしたいのであればほぼ避けて通れないJavaScriptと、バックエンドでも使えるようになったJavaScriptで同じコードを使いまわせれば保守の観点でも異なる言語を触る必要がなくなり、統一言語としての価値が大いにあります。

しかしながらフロントエンドとバックエンドではJavaScriptのモジュール解決の方法が異なります。この差異のために同じTypeScriptのコードを別々に分けなければいけないかというとそうではありません。ひとつのモジュールを`commonjs, esmodule`の両方に対応した出力をするDual Packageという考えがあります。

## Dual Packageことはじめ

名前が仰々しいですが、やることは`commonjs`用のJavaScriptと`esmodule`用のJavaScriptを出力することです。つまり出力する`module`の分だけtsconfig.jsonを用意します。

プロジェクトはおおよそ次のような構成になります。

```text
./
├── tsconfig.base.json
├── tsconfig.cjs.json
├── tsconfig.esm.json
└── tsconfig.json
```

- tsconfig.base.json
  - 基本となるtsconfig.jsonです
- tsconfig.cjs.json
  - tsconfig.base.jsonを継承した`commonjs`用のtsconfig.jsonです
- tsconfig.esm.json
  - tsconfig.base.jsonを継承した`esmodule`用のtsconfig.jsonです
- tsconfig.json
  - IDEはこの名前を優先して探すので、そのためのtsconfig.jsonです

tsconfig.base.jsonとtsconfig.jsonを分けるかどうかについては好みの範疇です。まとめてしまっても問題はありません。

### tsconfig.jsonの継承

tsconfig.jsonは他のtsconfig.jsonを継承する機能があります。上記はtsconfig.cjs.json, tsconfig.esm.jsonは次のようにしてtsconfig.base.jsonを継承しています。

```json
// tsconfig.cjs.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "./dist/cjs"
    // ...
  }
}
```

```json
// tsconfig.esm.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "esnext",
    "outDir": "./dist/esm"
    // ...
  }
}
```

`outDir`はコンパイルした`js`と、型定義ファイルを出力していれば(後述)それを出力するディレクトリを変更するオプションです。

このようなtsconfig.xxx.jsonができていれば、あとは次のようにファイル指定してコンパイルをするだけです。

```bash
tsc -p tsconfig.cjs.json
tsc -p tsconfig.esm.json
```

## Dual Packageのためのpackage.json

package.jsonもDual Packageのための設定が必要です。

### `main`

package.jsonにあるそのパッケージのエントリーポイントとなるファイルを指定する項目です。Dual Packageのときはここに`commonjs`のエントリーポイントとなる`js`ファイルを設定します。

### `module`

Dual Packageのときはここに`esmodule`のエントリーポイントとなる`js`ファイルを設定します。

### `types`

型定義ファイルのエントリーポイントとなる`ts`ファイルを設定します。型定義ファイルを出力するようにしていれば`commonjs, esmodule`のどちらのtsconfig.jsonで出力したものでも問題ありません。

package.jsonはこのようになっているでしょう。

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```

コンパイル後の`js`のファイルの出力先はあくまでも例です。tsconfig.jsonの`outDir`を変更すれば出力先を変更できるのでそちらを設定後、package.jsonでエントリーポイントとなる`js`ファイルの設定をしてください。

## Tree Shaking

`module bundler`の登場により、フロントエンドは今までのような`<script>`でいろいろな`js`ファイルを読み込む方式に加えてを全部載せ`js`にしてしまうという選択肢が増えました。この全部載せ`js`は開発者としては自分ができるすべてをそのまま実行環境であるブラウザに持っていけるので楽になる一方、ひとつの`js`ファイルの容量が大きくなりすぎるという欠点があります。特にそれがSPA(Single Page Application)だと問題です。SPAは読み込みが完了してから動作するのでユーザーにしばらく何もない画面を見せることになってしまいます。

この事態を避けるために`module bundler`は容量削減のための涙ぐましい努力を続けています。その機能のひとつとして題名のTree Shakingを紹介するとともに、開発者にできるTree Shaking対応パッケージの作り方を紹介します。

### Tree Shakingとは

Tree Shakingとは使われていない関数、クラスを最終的な`js`ファイルに含めない機能のことです。使っていないのであれば入れる必要はない。というのは至極当然の結論ですがこのTree Shakingを使うための条件があります。

- `esmodule`で書かれている
- 副作用(side effects)のないコードである

各条件の詳細を見ていきましょう。

## `esmodule`で書かれている

`commonjs`と`esmodule`では外部ファイルの解決方法が異なります。

`commonjs`は`require()`を使用します。`require()`はファイルのどの行でも使用ができますが`esmodule`の`import`はファイルの先頭でやらなければならないという決定的な違いがあります。

`require()`はあるときはこの`js`を、それ以外のときはあの`js`を、と読み込むファイルをコードで切り替えることができます。つまり、次のようなことができます。

```ts
let police = null;
let firefighter = null;

if (shouldCallPolice()) {
  police = require("./police");
} else {
  firefighter = require("./firefighter");
}
```

一方、先述のとおり`esmodule`はコードに読み込みロジックを混ぜることはできません。

上記例で`shouldCallPolice()`が常に`true`を返すように作られていたとしても`module bundler`はそれを検知できない可能性があります。本来なら必要のない`firefighter`を読み込まないという選択を取ることは難しいでしょう。

最近では`commonjs`でもTree Shakingができる`module bundler`も登場しています。

## 副作用のないコードである

ここで言及している副作用とは以下が挙げられます。

- `export`するだけで効果がある
- プロトタイプ汚染のような、既存のものに対して影響を及ぼす

これらが含まれているかもしれないと`module bundler`が判断するとTree Shakingの効率が落ちます。

### 副作用がないことを伝える

`module bundler`に制作したパッケージに副作用がないことを伝える方法があります。package.jsonにひとつ加えるだけで完了します。

### `sideEffects`

このプロパティをpackage.jsonに加えて、値を`false`とすればそのパッケージには副作用がないことを伝えられます。

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": false,
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```

副作用があり、そのファイルが判明しているときはそのファイルを指定します。

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": ["./xxx.js", "./yyy.js"],
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```
