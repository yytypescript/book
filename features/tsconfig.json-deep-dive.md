# tsconfig.json Deep Dive

基本的なtsconfig.jsonの設定を理解されている前提で話が進みますのでまだの方はすでにある本書のtsconfig.jsonのページをご覧ください。

{% page-ref page="../handson/tsconfig.json-settings.md" %}

## パッケージを使う人にもTypeScriptによる型の享受を目指す

パッケージを公開する時は、動作する形で公開するのが前提なので`js`にする必要があります。つまりコンパイルは必須です。ですがせっかくTypeScriptで作ったのだからパッケージの型情報も提供しましょう。

### 型定義ファイルも出力する

型定義ファイルを一緒に出力しましょう。そのためにはtsconfig.jsonにある`declaration`の項目を`true`に変更します。

```typescript
"declaration": true,
/* Generates corresponding '.d.ts' file. */
```

このように設定するとコンパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`d.ts`のファイルも出力されるようになります。これが型情報のファイルです。なおこの型定義ファイルだけをコンパイルで出力された`js`と別のディレクトリに出力するためのオプションは存在しません。

変哲もない`number`型のプロパティ持つ`Value Object`を作ったとします。

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

これをコンパイルし、型定義を生成するとこのようになっています。

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

内容自体はちょうどインターフェースのようなファイルとなっています。

### 宣言元へのジャンプでの`ts`ファイルを参照できるようにする

IDEを使っているときに有用で、実際の`ts`のソースコードがどのようにして動作しているのかを閲覧することができるようになります。tsconfig.jsonにある`declarationMap`の項目を`true`に変更します。

```typescript
"declarationMap": true,
/* Generates a sourcemap for each corresponding '.d.ts' file. */
```

このように設定するとコンパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`d.ts.map`のファイルも出力されるようになります。このファイルは元の`ts`と実際に動作する`js`の対応付けをしてくれます。ただしこの設定だけでは不十分で、参照元となる元の`ts`ファイルも一緒にパッケージとして公開する必要があります。

### 元の`ts`も公開する

特に設定していなければ元の`ts`ファイルも公開されますが、公開する内容を調整している場合は逆にpackage.jsonの`files`プロパティをを変更して元の`ts`ファイルも公開するように変更が必要です。tsconfig.jsonの`declarationMap`を設定しても元の`ts`ファイルを参照できないときはここで公開する内容を制限していないか確認してください。

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

この例は`dist`にコンパイルした結果の`js, d.ts, d.ts.map`があり、`src`に元の`ts`があるものと想定しています。

### JavaScriptの`sourceMap`も出力する

`sourceMap`とはAltJSがコンパイルされたJavaScriptとの行を一致させるものです。これがあることによってデバッグやトレースをしている時に、元の`ts`ファイルの何行目で問題が発生しているかわかりやすくなります。`module bundler`を使用する時はこのオプションを有効にしていないと基本的に何もわかりません。このオプションはパッケージを公開しないとしても有効にしておくことが望ましいでしょう。

tsconfig.jsonにある`sourceMap`の項目を`true`に変更します。

```typescript
"sourceMap": true,
/* Generates corresponding '.map' file. */
```

こちらもコンパイルで出力した`js`ファイルと同じディレクトリに同名で拡張子が`js.map`のファイルも出力されるようになります。

## Dual Package

フロントエンドでもバックエンドでもTypeScriptこれ一本！Universal JSという考えがあります。確かにフロントエンドを動的にしたいのであればほぼ避けて通れないJavaScriptと、バックエンドでも使えるようになったJavaScriptで同じコードを使いまわせれば保守の観点でも異なる言語を触る必要がなくなり、統一言語としての価値が大いにあります。

しかしながらフロントエンドとバックエンドではJavaScriptのモジュール解決の方法が異なります。この差異のために同じTypeScriptのコードを別々に分けなければいけないかというとそうではありません。ひとつのモジュールを`commonjs, esmodule`の両方に対応した出力をするDual Packageという考えがあります。

### Dual Packageことはじめ

名前が仰々しいですが、やることは`commonjs`用のJavaScriptと`esmodule`用のJavaScriptを出力することです。つまり出力する`module`の分だけtsconfig.jsonを用意します。

プロジェクトはおおよそ次のような構成になります。

```bash
./
├── tsconfig.base.json
├── tsconfig.cjs.json
├── tsconfig.esm.json
└── tsconfig.json
```

* tsconfig.base.json
  * 基本となるtsconfig.jsonです
* tsconfig.cjs.json
  * tsconfig.base.jsonを継承した`commonjs`用のtsconfig.jsonです
* tsconfig.esm.json
  * tsconfig.base.jsonを継承した`esmodule`用のtsconfig.jsonです
* tsconfig.json
  * IDEはこの名前を優先して探すので、そのためのtsconfig.jsonです

tsconfig.base.jsonとtsconfig.jsonを分けるかどうかについては好みの範疇です。まとめてしまっても問題はありません。

#### tsconfig.jsonの継承

tsconfig.jsonは他のtsconfig.jsonを継承する機能があります。上記はtsconfig.cjs.json, tsconfig.esm.jsonは次のようにしてtsconfig.base.jsonを継承しています。

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

`outDir`はコンパイルした`js`と、型定義ファイルを出力していれば\(後述\)それを出力するディレクトリを変更するオプションです。

このようなtsconfig.xxx.jsonができていれば、あとは次のようにファイル指定してコンパイルをするだけです。

```bash
tsc -p tsconfig.cjs.json
tsc -p tsconfig.esm.json
```

### Dual Pakcageのためのpackage.json

package.jsonもDual Packageのための設定が必要です。

#### `main`

package.jsonにあるそのパッケージのエントリーポイントとなるファイルを指定する項目です。Dual Packageのときはここに`commonjs`のエントリーポイントとなる`js`ファイルを設定します。

#### `module`

Dual Packageのときはここに`esmodule`のエントリーポイントとなる`js`ファイルを設定します。

#### `types`

型定義ファイルのエントリーポイントとなる`ts`ファイルを設定します。型定義ファイルを出力するようにしていれば`commonjs, esmodule`のどちらのtsconfig.jsonで出力したものでも問題ありません。

package.jsonはこのようになっているでしょう。

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

コンパイル後の`js`のファイルの出力先はあくまでも例です。tsconfig.jsonの`outDir`を変更すれば出力先を変更できるのでそちらを設定後、package.jsonでエントリーポイントとなる`js`ファイルの設定をしてください。

### Tree Shaking

`module bundler`の登場により、フロントエンドは今までのような`<script>`でいろいろな`js`ファイルを読み込む方式に加えてを全部載せ`js`にしてしまうという選択肢が増えました。この全部載せ`js`は開発者としては自分ができるすべてをそのまま実行環境であるブラウザに持っていけるので楽になる一方、ひとつの`js`ファイルの容量が大きくなりすぎるという欠点があります。特にそれがSPA\(Signle Page Application\)だと問題です。SPAは読み込みが完了してから動作するのでユーザーにしばらく何もない画面を見せることになってしまいます。

この事態を避けるために`module bundler`は容量削減のための涙ぐましい努力を続けています。その機能のひとつとして題名のTree Shakingを紹介するとともに、開発者にできるTree Shaking対応パッケージの作り方を紹介します。

#### Tree Shakingとは

Tree Shakingとは使われていない関数、クラスを最終的な`js`ファイルに含めない機能のことです。使っていないのであれば入れる必要はない。というのは至極当然の結論ですがこのTree Shakingを使うための条件があります。

* `esmodule`で書かれている
* 副作用\(side effects\)のないコードである

各条件の詳細を見ていきましょう。

### `esmodule`で書かれている

`commonjs`と`esmodule`では外部ファイルの解決方法が異なります。

`commonjs`は`require()`を使用します。`require()`はファイルのどの行でも使用ができますが`esmodule`の`import`はファイルの先頭でやらなければならないという決定的な違いがあります。

`require()`はある時はこの`js`を、それ以外のときはあの`js`を、と読み込むファイルをコードで切り替えることができます。つまり、次のようなことができます。

```typescript
let police = null;
let firefighter = null;

if (shouldCallPolice()) {
  police = require('./police');
} else {
  firefighter = require('./firefighter');
}
```

一方、先述のとおり`esmodule`はコードに読み込みロジックを混ぜることはできません。

上記例で`shouldCallPolice()`が常に`true`を返すように作られていたとしても`module bundler`はそれを検知できない可能性があります。本来なら必要のない`firefighter`を読み込まないという選択を取ることは難しいでしょう。

最近では`commonjs`でもTree Shakingができる`module bundler`も登場しています。

### 副作用のないコードである

ここで言及している副作用とは以下が挙げられます。

* `export`するだけで効果がある
* プロトタイプ汚染のような、既存のものに対して影響を及ぼす

これらが含まれているかもしれないと`module bundler`が判断するとTree Shakingの効率が落ちます。

#### 副作用がないことを伝える

`module bundler`に制作したパッケージに副作用がないことを伝える方法があります。package.jsonにひとつ加えるだけで完了します。

#### `sideEffects`

このプロパティをpackage.jsonに加えて、値を`false`とすればそのパッケージには副作用がないことを伝えられます。

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

## より厳密にコーディングする

厳密なコーディングといえば`linter`があります。TypeScript自身にもより型チェックを厳密にするオプションがあります。以下はtsconfig.jsonの該当する部分を抜粋したものです。

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
// "noUncheckedIndexedAccess": true,      /* Include 'undefined' in index signature results */
```

初期設定では`strict`のみが有効になっています。

以下は各オプションの説明です。

### `strict`

このオプションは**TypeScript4.0時点で**次の7個のオプションをすべて有効にしていることと同じです。スクラッチから開発するのであれば有効にしておいて差し支えないでしょう。

* noImplicitAny
* strictNullChecks
* strictFunctionTypes
* strictBindCallApply
* strictPropertyInitialization
* noImplicitThis
* alwaysStrict

この説明にTypeScriptのバージョンが明記されているのは、今後のバージョンで**オプションが追加または廃止されることがありうる**からです。より安定したオプションを設定したい場合は`strict`ではなく個々のオプションを有効にしてください。

### `noImplicitAny`

型を明示しない引数はTypeScriptでは`any`型になりますが、これを禁止します。

```typescript
function increment(i) {
  return i + 1;
}
```

`noImplicitAny`を`true`に設定しこれをコンパイルしようとすると

```typescript
Parameter 'i' implicitly has an 'any' type.
```

となります。これを回避するためには

```typescript
function increment(i: number): number {
  return i + 1;
}
```

とします。なお戻り値の型は必須ではありません。

### `strictNullChecks`

`null, undefined`のチェックが厳密になります。このオプションを入れていると変数に代入する時に`null, undefined`の代入を防げます。

```typescript
const error: Error = null;
```

`strictNullChecks`を`true`に設定しこれをコンパイルしようとすると

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

`strictFunctionTypes`を`true`に設定しこれをコンパイルしようとすると

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

`strictBindCallApply`を`true`に設定しこれをコンパイルしようとすると

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
  public gender: string;
  public age: number;
}
```

`strictPropertyInitialization`を`true`に設定しこれをコンパイルしようとすると

```typescript
Property 'name' has no initializer and is not definitely assigned in the constructor.
Property 'gender' has no initializer and is not definitely assigned in the constructor.
Property 'age' has no initializer and is not definitely assigned in the constructor.
```

となります。これを回避するためにはコンストラクタで初期化するか、初期値を設定します。

```typescript
class User {
  public name: string;
  public gender: string;
  public age: number;

  public constructor(name: string, gender: string, age: number) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }
}
```

```typescript
class User {
  public name: string = 'John';
  public gender: string = 'Female';
  public age: number = 20;
}
```

このオプションが有効だと、ORMで使うようなプロパティがすべて`public`でコンストラクタのないクラスは基本的に作れなくなります。

### `noImplicitThis`

名前付き関数、匿名関数はアロー関数と異なり、実行時に`this`が決定されます。そのため、内部で`this`を使っているとそれは関数を書いている時点では`any`型と同じ扱いになります。このオプションはそれを禁止します。

次のような`Type alias`があるとします。

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

コンパイルして実行します。

```typescript
console.log(person.intro());
```

落ちます。

```typescript
TypeError: Cannot read property '0' of undefined
```

これはプロパティが`name20`までしかない`Person`のオブジェクトリテラルに対して`name21 ~ name24`のプロパティを取得し、それに`capitalize()`を適用しようとしたことが問題です。

`noImplicitThis`を`true`に設定しこれをコンパイルしようとすると大量の次の警告が表示されます。

```typescript
'this' implicitly has type 'any' because it does not have a type annotation.
```

これを回避するためには`dump()`の関数が扱っている`this`が何かを指定します。`dump()`の第1引数を`this`とし、その型を書くことでTypeScriptに伝えることができます。

```typescript
function dump(this: Person): string {
  // ...
}
```

するとTypeScriptは存在しないプロパティについての指摘をするようになります。`name21 ~ name24`に次の警告が出るようになります。

```typescript
Property 'nameXX' does not exist on type 'Person'. Did you mean 'name01'?
```

この引数の`this`については関数のページに詳細がありますので併せてご参照ください。

{% page-ref page="function.md" %}

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

`noUnusedLocals`を`true`に設定しこれをコンパイルしようとすると

```typescript
'str' is declared but its value is never read.
```

となります。デバッグをしている時など若干邪魔なときがあります。

### `noUnusedParameters`

使用していない引数を禁止します。

```typescript
function choose(n1: string, n2: string): number {
  return n2;
}
```

`noUnusedParameters`を`true`に設定しこれをコンパイルしようとすると

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

関数のすべての条件分岐で`return`が行われているかを厳密にチェックします。

```typescript
function negaposi(num: number): string {
  if (num > 0) {
    return 'positive';
  } else if (num < 0) {
    return 'negative';
  }
}
```

`noImplicitReturns`を`true`に設定しこれをコンパイルしようとすると

```typescript
Not all code paths return a value.
```

となります。これを回避するためには戻り値が`void`型以外の関数は常に最後に`return`を書くようにするか、場合分けを漏れないように設計するしかありません。

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
function nextLyric(lyric: string, count: number = 1): string {
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

`noFallthroughCasesInSwitch`を`true`に設定しこれをコンパイルしようとすると

```typescript
Fallthrough case in switch.
```

となります。これは`case 'will'`のときに`return`されない場合がある、つまり`fallthrough`が発生していることが問題です。

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

なお、このオプションは`case`に処理がある場合のみ`break`あるいは`return`を強制します。この項目で一番初めに紹介した一か月の日数を求める関数`daysOfMonth()`は、`fallthrough`である`case`はすべて処理がないため警告は発生しません。

### `noUncheckedIndexedAccess`

インデックス型や配列で宣言されたオブジェクトが持つプロパティへのアクセスが厳密になります。インデックス型についてはタイプエイリアスのページをご参照ください。

{% page-ref page="type-aliases.md" %}

```typescript
type ObjectLiteralLike = {
  [key: string]: string;
};
type ArrayObjectLike = {
  [key: number]: string;
};

const butterfly: ObjectLiteralLike = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa'
};

const phoneticCodes: ArrayObjectLike = {
  0: 'alpha',
  1: 'bravo',
  2: 'charlie'
};
```

`ObjectLiteralLike, ArrrayObjectLike`は共に`string`型のプロパティを持つオブジェクトの型として宣言されています。

```typescript
const germanName: string = butterfly.de;
const fifth: string = phoneticCodes[4];
```

これらのオブジェクトのプロパティにアクセスするとき完全な型安全ではありません。上記`germanName, fifth`はどちらも定義されたオブジェクトには存在しませんがTypeScriptaはこれらを`string`型と解釈します。

`noUncheckedIndexedAccess`を`true`に設定しこれらをコンパイルしようとすると

```typescript
Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
```

このように厳密に定義されていないプロパティは`undefined`型とのユニオン型として解釈されるようになります。

```typescript
const englishName: string | undefined = butterfly.en;
const first: string | undefined = phoneticCode[0];
```

ここであるサービスが英語版だけは担保し、他の言語は追々という対応をしたとします。するとそのシステムにある単語や文章を意味する型は次のようになります。

```typescript
type SystemTerms = {
  [key: string]: string;
  en: string;
};
```

このような型を定義するとそのオブジェクトは`en`プロパティに限り`noUncheckedIndexedAccess`の制約を受けません。

```typescript
const butterfly: SystemTerms = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa'
};

const englishName: string = butterfly.en;
const frenchhName: string | undefined = butterfly.fr;
```

配列はインデックスを指定する方法でアクセスをすると`undefined`型とのユニオン型と解釈されますが`for-of, array.forEach()`はこの制約を受けないため積極的に使用を検討してください。

```typescript
const phoneticCodes: string[] = ['alpha', 'bravo', 'charlie'];

for (const p of phoneticCodes) {
  // ...
}

phoneticCodes.forEach((p: string) => {
  // ...
});
```

