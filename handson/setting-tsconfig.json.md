# tsconfig.jsonを設定する

Node.jsはそれ自身ではTypeScriptをサポートしているわけではないため、TypeScriptの導入をする時はTypeScriptの設定ファイルである`tsconfig.json`が必要です。

## 初めての`tsconfig.json`

`typescript`が`package.json`の`dependencies`に入っているプロジェクトで以下を実行してください。

```bash
npx tsc --init
```

`typescript`をglobal installしてあれば以下でも可能です。

```bash
tsc --init
```

`tsconfig.json`が作成されます。すでに`tsconfig.json`がある時は上書きされませんのでいったん既存の`tsconfig.json`を別名に変更してから実行など、一度`tsconfig.json`と名のつくファイルが存在しないようにしてください。

公式にある`tsconfig.json`の説明はこちらです。

{% embed url="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" %}

全てのオプションの解説をすると余白が足りないので、ここでは用途を抽出して、以下の観点で説明します。

* `target`の決め方
* フロントエンドとバックエンドで出力設定を変えたほうがよいか
* `Dual Package`

## `target`

TypeScriptは最終的にJavaScriptにトランスパイルされます。このオプションはその時に、どのバージョンのJavaScript向けに出力するかといったものです。

JavaScriptも時代とともに進化をして、既存のオブジェクトに新しいメソッドが追加されることがあります。この追加された新しいメソッドが出力するJavaScriptのバージョン以下の時は使えないというわけではなく、TypeScript側で擬似的に再現して補ってくれます。  
現在では欠かせない非同期処理のための`Promise, async/await`も、これらがないバージョンのJavaScriptにトランスパイルをして補い、使えるようにしてくれます。

このような最新バージョンにはある、または現在実装には至っていないが提案中\(proposal\)である機能を取り入れて使えるようにする物を通称`polyfill`と言います。

### `lib`

使いたい`target`には使いたい機能がない、でも使いたい。そのような時は`lib`オプションを指定することで使うことができるようになります。ある`target`を指定すれば、その`target`で追加されている`lib`は追加されますのであえて列挙する必要はありません。

### `target`は何を指定したらいいか

あえて古いコードで動かしているまたは古いNode.jsを使っているといった事情がなければ最新に近い物を指定することは問題ありません。またBabelなどの専用のコンパイラや`module bundler`に処理を任せたい場合は`ESNext`を指定して、そこからバージョンに合わせたコンパイルを各々にお願いすることになります。

## フロントエンドとバックエンド

フロントエンドとバックエンドはモジュールを出力する、他のモジュールを読み込むための作りが異なっています。詳細は`import / export / require`の項をご覧ください。そのため、モジュール解決のためのオプションを分けたほうが無難です。

### `module`

モジュールの仕組みが異なっているライブラリは互換性がある場合もありますが、一般的にはないものと考えてください。

#### `commonjs`

バックエンド\(サーバーサイド\)で使われている解決方法です。作成しているモジュールやパッケージがバックエンドでの動作だけを保証したい場合は最も無難な選択です。

#### `es2015, es2020, esnext`

フロントエンドで使われている解決方法です。Node.jsは`13.2.0`でこのモジュール解決方法をサポートしましたが、現状対応しているパッケージは少なく、使いづらい印象です。

このような違いがあるため、使う場面がバックエンドなら`commonjs`を、フロントエンドなら`es2015, es2020, esnext`を指定することが望ましいです。

## `Dual Package`

フロントエンドでもバックエンドでもTypeScriptこれ一本！Universal JSという考えがあります。確かにフロントエンドを動的にしたいのであればほぼ避けて通れないJavaScriptと、バックエンドでも使えるようになったJavaScriptで同じコードを使いまわせれば保守の観点でも異なる言語を触る必要がなくなり、統一言語としての価値が大いにあります。

しかしながら前項で述べたように、JavaScriptのモジュール解決の方法がフロントエンドとバックエンドで異なります。この差異のために同じTypeScriptのコードを別々に分けなければいけないかというとそうではありません。ひとつのモジュールを`commonjs, esmodule`の両方に対応した出力をする`Dual Package`という考えがあります。

### `Dual Package`ことはじめ

名前が仰々しいですが、やることは`commonjs`用のJavaScriptと`esmodule`用のJavaScriptを出力することです。つまり出力する`module`の分だけ`tsconfig.json`を用意します。

プロジェクトはおおよそ以下のような構成になります。

```bash
./
├── tsconfig.base.json
├── tsconfig.cjs.json
├── tsconfig.esm.json
└── tsconfig.json
```

* `tsconfig.base.json`
  * 基本となる`tsconfig.json`です
* `tsconfig.cjs.json`
  * `tsconfig.base.json`を継承した`commonjs`用の`tsconfig.json`です
* `tsconfig.esm.json`
  * `tsconfig.base.json`を継承した`esmodule`用の`tsconfig.json`です
* `tsconfig.json`
  * IDEなどはこの名前を優先して探すので、そのための`tsconfig.json`です

`tsconfig.base.json`と`tsconfig.json`を分けるかどうかについては好みの範疇です。まとめてしまっても特に問題はありません。

#### `tsconfig.json`の継承

`tsconfig.json`は他の`tsconfig.json`を継承する機能があります。上記例であれば`tsconfig.cjs.json, tsconfig.esm.json`は以下のようにして`tsconfig.base.json`を継承しているはずです。

```typescript
// tsconfig.cjs.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "./dist/cjs",
    // ...
  }
}
```

```typescript
// tsconfig.esm.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "esnext",
    "outDir": "./dist/esm",
    // ...
  }
}
```

`outDir`はトランスパイルした`js`と、型定義ファイルを出力していれば\(後述\)それらを出力するディレクトリを変更するオプションです。

このような`tsconfig.xxx.json`ができていれば、あとは以下のようにファイル指定してトランスパイルをするだけです。

```bash
tsc -p tsconfig.cjs.json
tsc -p tsconfig.esm.json
```

### `Dual Pakcage`のための`package.json`

`package.json`も`Dual Package`のための設定が必要です。

#### `main`

`package.json`にあるそのパッケージのエントリポイントとなるファイルを指定する項目です。`Dual Package`の時はここに`commonjs`のエントリポイントとなる`js`ファイルを設定します。

#### `module`

`Dual Package`の時はここに`esmodule`のエントリポイントとなる`js`ファイルを設定します。

#### `types`

型定義ファイルのエントリポイントとなる`ts`ファイルを設定します。型定義ファイルを出力するようにしていれば`commonjs, esmodule`のどちらの`tsconfig.json`で出力したものでも問題ありません。

`package.json`はこのようになっているでしょう。

```typescript
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

トランスパイル後の`js`のファイルの出力先はあくまでも例です。`tsconfig.json`の`outDir`を変更すれば出力先を変更できるのでそちらを設定後、`package.json`でエントリポイントとなる`js`ファイルの設定をしてください。

### `Tree Shaking`

`module bundler`の登場により、フロントエンドは今までのような`<script>`でいろいろな`js`ファイルを読み込む方式に加えてを全部載せ`js`にしてしまうという選択肢が増えました。この全部載せ`js`は開発者としては自分ができる全てをそのまま実行環境であるブラウザに持っていけるので楽になる一方、ひとつの`js`ファイルの容量が大きくなりすぎるという弱点があります。特にそれが`SPA(Signle Page Application)`だと問題です。`SPA`は読み込みが完了してから動作するのでユーザーにしばらく何もない画面を見せることになってしまいます。

この事態を避けるために`module bundler`は容量削減のための涙ぐましい努力を続けています。その機能のひとつとして題名の`Tree Shaking`を紹介するとともに、開発者にできる`Tree Shaking`対応パッケージの作り方を紹介します。

#### `Tree Shaking`とは

簡潔に申し上げると`Tree Shaking`とは使われていない関数、クラスを最終的な`js`ファイルに含めない機能のことです。使っていないのであれば入れる必要はない。というのは至極当然の結論ですが、この`Tree Shaking`ができるための条件があります。

* `esmodule`で書かれている
* 副作用\(`side effects`\)のないコードである

以下で詳細を述べます

### `esmodule`で書かれている

`commonjs`と`esmodule`では外部ファイルの解決方法が異なります。

`commonjs`は`require()`を使用します。`require()`はファイルのどこでも使用ができますが`esmodule`の`import`はファイルの先頭でやらなければならないという決定的な違いがあります。

`require()`はある時はこの`js`を、それ以外の時はあの`js`を、と読み込むファイルをコードで切り替えることができます。つまり、以下のようなことができます。

```typescript
let police = null;
let firefighter = null;

if (shouldCallPolice()) {
  police = require('./police');
} else {
  firefighter = require('./firefighter');
}
```

一方、先述の通り`esmodule`はコードに読み込みロジックを混ぜることはできません。

この機能のおかげで`module bundler`が`Tree Shaking`をしにくくなります。そのため`esmodule`で書かれている方が`module bundler`が`Tree Shaking`を行うための対応がしやすいという利点があります。

最近では`commonjs`でも`Tree Shaking`ができる`module bundler`も登場しています。

### 副作用\(`side effects`\)のないコードである

ここで言及している副作用とは以下が挙げられます。

* `export`するだけで効果がある
* プロトタイプ汚染のような、既存のものに対して影響を及ぼす

これらが含まれているかもしれないと`module bundler`が判断すると`Tree Shaking`の効率が落ちます。

#### 副作用がないことを伝える

`module bundler`に制作したパッケージに副作用がないことを伝える方法があります。`package.json`にひとつ加えるだけで完了します。

#### `sideEffects`

このプロパティを`package.json`に加えて、値を`false`とすればそのパッケージには副作用がないことを伝えられます。

```typescript
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

副作用があり、そのファイルが判明している時はそのファイルを指定します。

```typescript
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": [
    "./xxx.js",
    "./yyy.js"
  ],
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

## パッケージを使う人にもTypeScriptによる型の享受を目指す

パッケージを公開する時は、動作する形で公開するのが前提なので`js`にする必要があります。つまりトランスパイルは必須です。ですがせっかくTypeScriptで作ったのだからパッケージの型情報も提供しましょう。

### 型定義ファイルも出力する

型定義ファイルを一緒に出力しましょう。そのためには`tsconfig.json`にある`declaration`の項目を`true`に変更します。

```typescript
"declaration": true,
/* Generates corresponding '.d.ts' file. */
```

このように設定するとトランスパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`d.ts`のファイルも出力されるようになります。これが型情報のファイルです。なおこの型定義ファイルだけをトランスパイルで出力された`js`と別のディレクトリに出力するためのオプションは存在しません。

変哲もない`number`を持つ`Value Object`を作ったとします。

```typescript
class NumericalValueObject {
  private value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public eq(other: NumericalValueObject): boolean {
    return this.value === other.value;
  }

  public gt(other: NumericalValueObject): boolean {
    return this.value > other.value;
  }

  public gte(other: NumericalValueObject): boolean {
    return this.value >= other.value;
  }

  public lt(other: NumericalValueObject): boolean {
    return this.value < other.value;
  }

  public lte(other: NumericalValueObject): boolean {
    return this.value <= other.value;
  }

  public toString(): string {
    return `${this.value}`;
  }
}
```

これをトランスパイルし、型定義を生成するとこのようになっています。

```typescript
declare class NumericalValueObject {
    private value;
    constructor(value: number);
    eq(other: NumericalValueObject): boolean;
    gt(other: NumericalValueObject): boolean;
    gte(other: NumericalValueObject): boolean;
    lt(other: NumericalValueObject): boolean;
    lte(other: NumericalValueObject): boolean;
    toString(): string;
}
```

内容自体は実装部分がないインターフェイスのようなファイルとなっています。

### 宣言元へのジャンプでの`ts`ファイルを参照できるようにする

IDEを使っている時に有用で、実際の`ts`のソースコードがどのようにして動作しているのかを閲覧することができるようになります。`tsconfig.json`にある`declarationMap`の項目を`true`に変更します。

```typescript
"declarationMap": true,
/* Generates a sourcemap for each corresponding '.d.ts' file. */
```

このように設定するとトランスパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`d.ts.map`のファイルも出力されるようになります。このファイルは元の`ts`と実際に動作する`js`の対応付けをしてくれます。ただしこの設定だけでは不十分で、参照元となる元の`ts`ファイルも一緒にパッケージとして公開する必要があります。

#### 元の`ts`も公開する

特に設定していなければ元の`ts`ファイルも公開されますが、公開する内容を調整している場合は逆に`package.json`の`files`プロパティをを変更して元の`ts`ファイルも公開するように変更が必要です。`tsconfig.json`の`declarationMap`を設定しても元の`ts`ファイルを参照できない時はここで公開する内容を制限していないか確認してください。

```typescript
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": false,
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```

この例は`dist`にトランスパイルした結果の`js, d.ts, d.ts.map`を、`src`に元の`ts`ファイルと想定しています。

### JavaScriptの`sourceMap`も出力する

`sourceMap`とはAltJSがトランスパイルされたJavaScriptとの行を一致させるものです。これがあることによってデバッグやトレースをしている時に、元の`ts`ファイルの何行目が問題、原因なのかがわかりやすくなります。`module bundler`を使用する時はこのオプションを有効にしていないと基本的に何もわかりません。

`tsconfig.json`にある`sourceMap`の項目を`true`に変更します。

```typescript
"sourceMap": true,
/* Generates corresponding '.map' file. */
```

こちらもトランスパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`js.map`のファイルも出力されるようになります。

## より厳密にコーディングする

厳密なコーディングといえば`linter`がありますが、TypeScript自身にもより型チェックを厳密にするオプションがあります。以下は`tsconfig.json`の該当する部分を抜粋したものです。

```typescript
  /* Strict Type-Checking Options */
  "strict": true,                           /* Enable all strict type-checking options. */
  // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
  // "strictNullChecks": true,              /* Enable strict null checks. */
  // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
  // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
  // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
  // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
  // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
  
  /* Additional Checks */
  // "noUnusedLocals": true,                /* Report errors on unused locals. */
  // "noUnusedParameters": true,            /* Report errors on unused parameters. */
  // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
  // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
```

初期設定では`strict`のみが有効になっています。

以下は各オプションの説明です。

### `strict`

このオプションは**TypeScript3.9時点で**以下の7個のオプションを全て有効にしていることと同じです。スクラッチから開発するのであれば有効にしておいて差し支えないでしょう。

* noImplicitAny
* strictNullChecks
* strictFunctionTypes
* strictBindCallApply
* strictPropertyInitialization
* noImplicitThis
* alwaysStrict

この説明にTypeScriptのバージョンが明記されているのは、今後のバージョンで**オプションが追加または廃止されることがありうる**からです。より安定したオプションを設定したい場合は`strict`ではなく個々のオプションを有効にしてください。

### `noImplicitAny`

型を明示しない引数のTypeScriptでは`any`になりますが、これを禁止します。

```typescript
function increment(i) {
  return i + 1;
};
```

`noImplicitAny`を`true`に設定しこれをトランスパイルしようとすると

```typescript
Parameter 'i' implicitly has an 'any' type.
```

となります。これを回避するためには

```typescript
function increment(i: number): number {
  return i + 1;
};
```

とします。なお戻り値の型は必須ではありません。

### `strictNullChecks`

`null, undefined`のチェックが厳密になります。このオプションを入れていると変数に代入する時に`null, undefined`の代入を防げます。

```typescript
const error: Error = null;
```

`strictNullChecks`を`true`に設定しこれをトランスパイルしようとすると

```typescript
Type 'null' is not assignable to type 'Error'.
```

となります。これを回避するためには

```typescript
const error: Error | null = null;
```

とします。

### `strictFunctionTypes`

関数の引数の型チェックが厳格になります。

```typescript
class RuntimeError extends Error {
  private cause?: Error;

  public constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
  }

  public stacktrace(): string | undefined {
    if (typeof this.cause === 'undefined') {
      return this.stack;
    }

    return this.cause.stack;
  }
}
```

`Error`を拡張して他の`Error`を内包できるようにした`RuntimeError`があります。このクラスには`stacktrace()`というメソッドがあります。

スタックトレースを出力するメソッド`runtimeDump()`を作成します。

```typescript
const runtimeDump = (err: RuntimeError): void => {
  console.log(err.stacktrace());
};
```

もちろん以下は動作します。

```typescript
runtimeDump(new RuntimeError('runtime error', new Error('error')));
```

`runtimeDump()`を`Error`型を引数に受ける`Type alias`に代入します。

```typescript
type ErrorDump = (err: Error) => void;

const dump: ErrorDump = runtimeDump;
```

代入した`dump()`はもちろん引数に`Error`型を受けることができます。

```typescript
dump(new Error('error'));
```

しかしながら、これは落ちてしまいます。

```typescript
TypeError: err.stacktrace is not a function
```

これは`Error`には`err.stacktrace()`が存在しないことが原因です。

`strictFunctionTypes`を`true`に設定しこれをトランスパイルしようとすると

```typescript
Type '(err: RuntimeError) => void' is not assignable to type 'ErrorDump'.
  Types of parameters 'err' and 'err' are incompatible.
    Property 'stacktrace' is missing in type 'Error' but required in type 'RuntimeError'.
```

となります。関数の引数における型は、このオプションを有効にすることで代入時にそのクラスまたはサブクラス以外を禁止します。

### `strictBindCallApply`

`function.bind(), function.call(), function.apply()`の型チェックが厳密になります。

```typescript
function stackTrace(error: Error): string | undefined {
  return error.stack;
}

stackTrace.call(undefined, null);
```

`strictBindCallApply`を`true`に設定しこれをトランスパイルしようとすると

```typescript
Argument of type 'null' is not assignable to parameter of type 'Error'.
```

となります。これを回避するためには`call()`の第2引数を`Error`のインスタンスに変更します。

```typescript
stackTrace.call(undefined, new ReferenceError());
```

### `strictPropertyInitialization`

初期化されていない変数定数や、コンストラクタで初期化されていないクラスのプロパティを禁止します。

```typescript
class User {
  public name: string;
  public sex: string;
  public age: number;
}
```

`strictPropertyInitialization`を`true`に設定しこれをトランスパイルしようとすると

```typescript
Property 'name' has no initializer and is not definitely assigned in the constructor.
Property 'sex' has no initializer and is not definitely assigned in the constructor.
Property 'age' has no initializer and is not definitely assigned in the constructor.
```

となります。これを回避するためにはコンストラクタで初期化するか、初期値を設定します。

```typescript
class User {
  public name: string;
  public sex: string;
  public age: number;

  public constructor(name: string, sex: string, age: number) {
    this.name = name;
    this.sex = sex;
    this.age = age;
  }
}
```

```typescript
class User {
  public name: string = 'John';
  public sex: string = 'Doe';
  public age: number = 20;
}
```

このオプションが有効だと、ORMで使うようなプロパティが全て`public`でコンストラクタのないクラスは基本的に作れなくなります。

### `noImplicitThis`

名前付き関数、匿名関数はアロー関数と異なり、実行時に`this`が決定されます。そのため、内部で`this`を使っているとそれは関数を書いている時点では`any`と同じ扱いになります。このオプションはそれを禁止します。

以下のような`Type alias`があるとします。

```typescript
type Person = {
  name01: string;
  name02: string;
  name03: string;
  name04: string;
  name05: string;
  name06: string;
  name07: string;
  name08: string;
  name09: string;
  name10: string;
  name11: string;
  name12: string;
  name13: string;
  name14: string;
  name15: string;
  name16: string;
  name17: string;
  name18: string;
  name19: string;
  name20: string;
  intro(): void;
};
```

そして、アルファベットの先頭1文字を大文字にする`capitalize()`と`nameXX`のプロパティを出力する`dump()`を定義します。

```typescript
function capitalize(str: string): string {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function dump(): string {
  const props: string[] = [];

  props.push(capitalize(this.name01));
  props.push(capitalize(this.name02));
  props.push(capitalize(this.name03));
  props.push(capitalize(this.name04));
  props.push(capitalize(this.name05));
  props.push(capitalize(this.name06));
  props.push(capitalize(this.name07));
  props.push(capitalize(this.name08));
  props.push(capitalize(this.name09));
  props.push(capitalize(this.name10));
  props.push(capitalize(this.name11));
  props.push(capitalize(this.name12));
  props.push(capitalize(this.name13));
  props.push(capitalize(this.name14));
  props.push(capitalize(this.name15));
  props.push(capitalize(this.name16));
  props.push(capitalize(this.name17));
  props.push(capitalize(this.name18));
  props.push(capitalize(this.name19));
  props.push(capitalize(this.name20));
  props.push(capitalize(this.name21));
  props.push(capitalize(this.name22));
  props.push(capitalize(this.name23));
  props.push(capitalize(this.name24));
  props.push(capitalize(this.name25));
  props.push(capitalize(this.name26));
  props.push(capitalize(this.name27));
  props.push(capitalize(this.name28));
  props.push(capitalize(this.name29));
  props.push(capitalize(this.name30));

  return props.join(' ');
}
```

これを使い`Person`のインスタンスを作成します。

```typescript
const person: Person = {
  name01: 'pablo',
  name02: 'diego',
  name03: 'josé',
  name04: 'francisco',
  name05: 'de',
  name06: 'paula',
  name07: 'juan',
  name08: 'nepomuceno',
  name09: 'maría',
  name10: 'de',
  name11: 'los',
  name12: 'remedios',
  name13: 'cipriano',
  name14: 'de',
  name15: 'la',
  name16: 'santísima',
  name17: 'trinidad',
  name18: 'ruiz',
  name19: 'y',
  name20: 'picasso',
  intro: dump
};
```

トランスパイルして実行します。

```typescript
console.log(person.intro());
```

落ちます。

```typescript
TypeError: Cannot read property '0' of undefined
```

これはプロパティが`name20`までしかない`Person`のオブジェクトリテラルに対して`name21 ~ name30`のプロパティを取得し、それに`capitalize()`を適用しようとしたことが問題です。

`noImplicitThis`を`true`に設定しこれをトランスパイルしようとすると大量の以下の警告が表示されます。

```typescript
'this' implicitly has type 'any' because it does not have a type annotation.
```

これを回避するためには`dump()`の関数が扱っている`this`が何かを指定します。`dump()`の第1引数を`this`とし、その型を書くことでTypeScriptに伝えることができます。

```typescript
function dump(this: Person): string {
  // ...
}
```

するとTypeScriptは存在しないプロパティについての指摘をするようになります。`name21  ~ name30`に以下の警告が出るようになります。

```typescript
Property 'nameXX' does not exist on type 'Person'. Did you mean 'name01'?
```

この引数の`this`については関数 \(`Functions`\)の項に詳細がありますので併せてご参照ください。

{% page-ref page="../features/function.md" %}

### `alwaysStrict`

`'use strict'`を各ファイルの先頭に付加します。

### `noUnusedLocals`

使用していない変数を禁止します。

```typescript
function add(n1: string, n2: string): number {
  const str: string = 'this is debug message';
  // debug(str);

  return n1 + n2;
}
```

`noUnusedLocals`を`true`に設定しこれをトランスパイルしようとすると

```typescript
'str' is declared but its value is never read.
```

となります。デバッグをしている時など若干邪魔な時があります。

### `noUnusedParameters`

使用していない引数を禁止します。

```typescript
function choose(n1: string, n2: string): number {
  return n2;
}
```

`noUnusedParameters`を`true`に設定しこれをトランスパイルしようとすると

```typescript
'n1' is declared but its value is never read.
```

となります。これは上記例のように第2引数だけを使用する関数に対しても適用されます。これを回避するためには、使用していない引数を`_`で始まる名前に変更します。

```typescript
function choose(_n1: string, n2: string): number {
  // ...
}
```

### `noImplicitReturns`

関数の全ての条件分岐で`return`が行われているかを厳密にチェックします。

```typescript
function negaposi(num: number): string {
  if (num > 0) {
    return 'positive';
  } else if (num < 0) {
    return 'negative';
  }
}
```

`noImplicitReturns`を`true`に設定しこれをトランスパイルしようとすると

```typescript
Not all code paths return a value.
```

となります。これを回避するためには戻り値が`void`以外の関数は常に最後に`return`を書くようにするか、場合分けを漏れないように設計するしかありません。

```typescript
function negaposi(num: number): string {
  if (num > 0) {
    return 'negative';
  } else if (num < 0) {
    return 'positive';
  }
  
  return '0';
}
```

### `noFallthroughCasesInSwitch`

`fallthrough`とは`switch`で`break`または`return`を行わないことを意味します。以下は多くの方が`switch`で学習したであろう`fallthough`の例です。

```typescript
function daysOfMonth(month: number): number {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 2:
      return 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      throw new Error('INVALID INPUT');
  }
}
```

意図してこの`fallthrough`を使いこなすよりもバグを産むことの方が遥かに多いため、このオプションはそれを禁止します。

```typescript
function nextLyric(lyric: string, count: number): string {
  switch (lyric) {
    case 'we':
      return 'will';
    case 'will':
      if (count === 1) {
        return 'we';
      }
      if (count === 2) {
        return 'rock';
      }
    case 'rock':
      return 'you';
    default:
      throw new Error('YOU ARE A KING!!!');
  }
}
```

`noFallthroughCasesInSwitch`を`true`に設定しこれをトランスパイルしようとすると

```typescript
Fallthrough case in switch.
```

となります。これは`case 'will'`の時に`return`されない場合がある、つまり`fallthrough`が発生していることが問題です。

これを回避するためには`case`では漏れなく`break`あるいは`return`をするように設計します。

```typescript
function next(lyric: string, count: number): string {
  switch (lyric) {
    case 'we':
      return 'will';
    case 'will':
      if (count % 2 === 1) {
        return 'we';
      }

      return 'rock';
    case 'rock':
      return 'you';
    default:
      throw new Error('YOU ARE A KING!!!');
  }
}
```

なお、このオプションは`case`に処理がある場合のみ`break`あるいは`return`を強制します。この項目で一番初めに紹介した一か月の日数を求める関数`daysOfMonth()`は、`fallthrough`である`case`は全て処理がないため警告は発生しません。

