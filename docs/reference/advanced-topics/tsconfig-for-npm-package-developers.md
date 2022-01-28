# NPMパッケージ開発者のためのtsconfig

## パッケージを使う人にもTypeScriptによる型の享受を目指す

パッケージを公開するときは、動作する形で公開するのが前提なので`js`にする必要があります。つまりコンパイルは必須です。ですがせっかくTypeScriptで作ったのだからパッケージの型情報も提供しましょう。

### 型定義ファイルも出力する

型定義ファイルを一緒に出力しましょう。そのためにはtsconfig.jsonにある`declaration`の項目を`true`に変更します。

```json
"declaration": true,
/* Generates corresponding '.d.ts' file. */
```

このように設定するとコンパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`d.ts`のファイルも出力されるようになります。これが型情報のファイルです。なおこの型定義ファイルだけをコンパイルで出力された`js`と別のディレクトリに出力するためのオプションは存在しません。

変哲もない`number`型のプロパティ持つ`Value Object`を作ったとします。

```ts
class NumericalValueObject {
  private value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public equals(other: NumericalValueObject): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return `${this.value}`;
  }
}
```

これをコンパイルし、型定義を生成するとこのようになっています。

```ts
declare class NumericalValueObject {
  private value;
  constructor(value: number);
  equals(other: NumericalValueObject): boolean;
  toString(): string;
}
```

内容自体はちょうどインターフェースのようなファイルとなっています。

### 宣言元へのジャンプでの`ts`ファイルを参照できるようにする

IDEを使っているときに有用で、実際のTypeScriptのソースコードがどのようにコーディングされているかを閲覧することができるようになります。tsconfig.jsonにある`declarationMap`の項目を`true`に変更します。

```json
"declarationMap": true,
/* Generates a sourcemap for each corresponding '.d.ts' file. */
```

このように設定するとコンパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`d.ts.map`のファイルも出力されるようになります。このファイルは元の`ts`と実際に動作する`js`の対応付けをしてくれます。ただしこの設定だけでは不十分で、参照元となる元の`ts`ファイルも一緒にパッケージとして公開する必要があります。

### 元の`ts`も公開する

特に設定していなければ元の`ts`ファイルも公開されますが、公開する内容を調整している場合は逆にpackage.jsonの`files`プロパティをを変更して元の`ts`ファイルも公開するように変更が必要です。tsconfig.jsonの`declarationMap`を設定しても元の`ts`ファイルを参照できないときはここで公開する内容を制限していないか確認してください。

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": false,
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "files": ["dist", "src"],
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```

この例は`dist`にコンパイルした結果の`js, d.ts, d.ts.map`があり、`src`に元の`ts`があるものと想定しています。

実際にパッケージとなるファイルにどのようなファイルが含まれているかについては次のコマンドを実行してください。

```sh
npm publish --dry-run
```

### JavaScriptの`sourceMap`も出力する

`sourceMap`とはAltJSがコンパイルされたJavaScriptとの行を一致させるものです。これがあることによってデバッグやトレースをしているときに、元の`ts`ファイルの何行目で問題が発生しているかわかりやすくなります。`module bundler`を使用するときはこのオプションを有効にしていないと基本的に何もわかりません。このオプションはパッケージを公開しないとしても有効にしておくことが望ましいでしょう。

tsconfig.jsonにある`sourceMap`の項目を`true`に変更します。

```json
"sourceMap": true,
/* Generates corresponding '.map' file. */
```

こちらもコンパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`js.map`のファイルも出力されるようになります。
