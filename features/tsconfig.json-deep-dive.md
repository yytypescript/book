# tsconfig.json Deep Dive

基本的なtsconfig.jsonの設定を理解されている前提で話が進みますのでまだの方はすでにある本書のtsconfig.jsonのページをご覧ください。

{% page-ref page="../handson/tsconfig.json-settings.md" %}

## パッケージを使う人にもTypeScriptによる型の享受を目指す

パッケージを公開するときは、動作する形で公開するのが前提なので`js`にする必要があります。つまりコンパイルは必須です。ですがせっかくTypeScriptで作ったのだからパッケージの型情報も提供しましょう。

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

  public equals(other: NumericalValueObject): boolean {
    return this.value === other.value;
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
    equals(other: NumericalValueObject): boolean;
    toString(): string;
}
```

内容自体はちょうどインターフェースのようなファイルとなっています。

### 宣言元へのジャンプでの`ts`ファイルを参照できるようにする

IDEを使っているときに有用で、実際のTypeScriptのソースコードがどのようにコーディングされているかを閲覧することができるようになります。tsconfig.jsonにある`declarationMap`の項目を`true`に変更します。

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

実際にパッケージとなるファイルにどのようなファイルが含まれているかについては以下のコマンドを実行してください。

```typescript
npm publish --dry-run
```

### JavaScriptの`sourceMap`も出力する

`sourceMap`とはAltJSがコンパイルされたJavaScriptとの行を一致させるものです。これがあることによってデバッグやトレースをしているときに、元の`ts`ファイルの何行目で問題が発生しているかわかりやすくなります。`module bundler`を使用するときはこのオプションを有効にしていないと基本的に何もわかりません。このオプションはパッケージを公開しないとしても有効にしておくことが望ましいでしょう。

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

### Dual Packageのためのpackage.json

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

`module bundler`の登場により、フロントエンドは今までのような`<script>`でいろいろな`js`ファイルを読み込む方式に加えてを全部載せ`js`にしてしまうという選択肢が増えました。この全部載せ`js`は開発者としては自分ができるすべてをそのまま実行環境であるブラウザに持っていけるので楽になる一方、ひとつの`js`ファイルの容量が大きくなり過ぎるという欠点があります。特にそれがSPA\(Signle Page Application\)だと問題です。SPAは読み込みが完了してから動作するのでユーザーにしばらく何もない画面を見せることになってしまいます。

この事態を避けるために`module bundler`は容量削減のための涙ぐましい努力を続けています。その機能のひとつとして題名のTree Shakingを紹介するとともに、開発者にできるTree Shaking対応パッケージの作り方を紹介します。

#### Tree Shakingとは

Tree Shakingとは使われていない関数、クラスを最終的な`js`ファイルに含めない機能のことです。使っていないのであれば入れる必要はない。というのは至極当然の結論ですがこのTree Shakingを使うための条件があります。

* `esmodule`で書かれている
* 副作用\(side effects\)のないコードである

各条件の詳細を見ていきましょう。

### `esmodule`で書かれている

`commonjs`と`esmodule`では外部ファイルの解決方法が異なります。

`commonjs`は`require()`を使用します。`require()`はファイルのどの行でも使用ができますが`esmodule`の`import`はファイルの先頭でやらなければならないという決定的な違いがあります。

`require()`はあるときはこの`js`を、それ以外のときはあの`js`を、と読み込むファイルをコードで切り替えることができます。つまり、次のようなことができます。

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

副作用があり、そのファイルが判明しているときはそのファイルを指定します。

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

厳密なコーディングといえば`linter`がありますがTypeScript自身にもより型の評価を厳密にするオプションがあります。以下はTypeScript 4.3.2のtsconfig.jsonの該当する部分を抜粋したものです。

```typescript
/* Strict Type-Checking Options */
"strict": true,                                 /* Enable all strict type-checking options. */
// "noImplicitAny": true,                       /* Raise error on expressions and declarations with an implied 'any' type. */
// "strictNullChecks": true,                    /* Enable strict null checks. */
// "strictFunctionTypes": true,                 /* Enable strict checking of function types. */
// "strictBindCallApply": true,                 /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
// "strictPropertyInitialization": true,        /* Enable strict checking of property initialization in classes. */
// "noImplicitThis": true,                      /* Raise error on 'this' expressions with an implied 'any' type. */
// "alwaysStrict": true,                        /* Parse in strict mode and emit "use strict" for each source file. */

/* Additional Checks */
// "noUnusedLocals": true,                      /* Report errors on unused locals. */
// "noUnusedParameters": true,                  /* Report errors on unused parameters. */
// "noImplicitReturns": true,                   /* Report error when not all code paths in function return a value. */
// "noFallthroughCasesInSwitch": true,          /* Report errors for fallthrough cases in switch statement. */
// "noUncheckedIndexedAccess": true,            /* Include 'undefined' in index signature results */
// "noImplicitOverride": true,                  /* Ensure overriding members in derived classes are marked with an 'override' modifier. */
// "noPropertyAccessFromIndexSignature": true,  /* Require undeclared properties from index signatures to use element accesses. */
```

初期設定では`strict`のみが有効になっています。

以下は各オプションの説明です。

## Strict Type-Checking Options

### `strict`

このオプションは**TypeScript4.4時点で**次の8個のオプションをすべて有効にしていることと同じです。スクラッチから開発するのであれば有効にしておいて差し支えないでしょう。

* noImplicitAny
* strictNullChecks
* strictFunctionTypes
* strictBindCallApply
* strictPropertyInitialization
* noImplicitThis
* useUnknownInCatchVariables
* alwaysStrict

この説明にTypeScriptのバージョンが明記されているのは、今後のバージョンで**オプションが追加または廃止されることがありうる**からです。より安定したオプションを設定したい場合は`strict`ではなく個々のオプションを有効にしてください。このオプションを有効にして個々のオプションを無効にした場合個々の設定が優先されます。

### `noImplicitAny`

型を明示しないとき、とくに引数の場合、TypeScriptはその引数を`any`型として解釈します。

```typescript
function increment(i) {
  return i + 1;
}
```

`any` 型ということは、この関数に値をを代入することはJavaScriptと同じようにいかなる型の値も代入ができてしまうということです。

```typescript
increment(1);
// -> 2
increment('1');
// -> '11'
increment(null);
// -> 1
increment(undefined);
// -> NaN
```

このオプションはこれを禁止するもので `any` 型となりうる型の非明示を避けます。

なお戻り値についてはTypeScriptは戻り値を推測することができるので明示する必要はありません。

```typescript
function increment(i: number) {
  return i + 1;
}
```

### `strictNullChecks`

#### リリースされたバージョン: 2.1

このオプションがなかったころは言語的に `null` と `undefined` を無視していました。つまり、次のようなことが問題なくできました。

```typescript
const date: Date = null;
const error: Error = undefined;
```

当然ながら `null` には `getDay()` というプロパティは存在せず `undefined` には `message` というメソッドが存在しません。これらを呼び出そうとすると実行時エラーになります。

```typescript
date.getDay();
// TypeError: Cannot read property 'getDay' of null
error.message;
// TypeError: Cannot read property 'message' of undefined
```

このオプションを有効にすると `undefined` と `null` はそれぞれ独立した型を持つようになり `undefined` と `null` を他の型に代入することはできなくなります。

```typescript
error TS2322: Type 'undefined' is not assignable to type 'Error'.
const error: Error = undefined;
      ~~~~~
error TS2322: Type 'null' is not assignable to type 'Date'.
const date: Date = null;
      ~~~~
```

### `strictFunctionTypes`

#### リリースされたバージョン: 2.6

オブジェクト指向では、スーパークラスに対しサブクラスのインスタンスを代入することはできますがその逆は一般的ではありません。  
例えばJavaScriptの `Error` クラスを拡張しスタックトレースを出力できるようになった `RuntimeError` というクラスを用意します。ここではスタックトレースの実装は重要ではないので `stacktrace()` というメソッドが加わったとだけ解釈してください。

```typescript
class RuntimeError extends Error {
  public stacktrace(): string {
    return ...;
  }
}
```

`RuntimeError` クラスのスタックトレースを出力する関数 `dumpRuntimeError()` を定義します。当然ながら `RuntimeError` のインスタンスは代入できますがスーパークラスの `Error` を代入することはできません。

```typescript
function dumpRuntimeError(err: RuntimeError): void {
  console.log(err.stacktrace());
};

dumpRuntimeError(new RuntimeError('runtime error'));
dumpRuntimeError(new Error('error'));

error TS2345: Argument of type 'Error' is not assignable to parameter of type 'RuntimeError'.
  Property 'stacktrace' is missing in type 'Error' but required in type 'RuntimeError'.

errorDump(new Error('error'));
          ~~~~~~~~~~~~~~~~~~
```

しかしながら `dumpRuntimeError` 型の部分型である `dumpError` という型を定義したとすると、以下の代入が成り立ちます。

```typescript
type dumpError = (err: Error) => void;
const dumpError: dumpError = dumpRuntimeError;
```

この関数 `dumpError()` に `Error` 型のインスタンスを代入すると `Error` 型には `stacktrace()` というメソッドがないため実行時エラーになります。

このオプションを有効にすることで関数の引数の方は厳密に評価されるようになります。そのクラスまたはサブクラス以外を代入することはできなくなります。

```typescript
error TS2322: Type '(err: RuntimeError) => void' is not assignable to type 'dumpError'.
  Types of parameters 'err' and 'err' are incompatible.
    Property 'stacktrace' is missing in type 'Error' but required in type 'RuntimeError'.

const dumpError: dumpError = dumpRuntimeError;
      ~~~~~~~~~
```

### `strictBindCallApply`

**リリースされたバージョン: 3.2**

`function.bind(), function.call(), function.apply()` はその関数を実行します。どれも第2引数以降にその関数の引数を代入できます。

例えば、与えられた引数の名、姓からイニシャルを返す関数 `initial()` を考えます。与えられた文字列に対する例外検査などが少々甘いですが実装は次のようになります。

```typescript
function initial(givenName: string, surname: string): string {
  return `${givenName[0].toUpperCase()}. ${surname[0].toUpperCase()}`;
}
```

このとき `function.bind(), function.call(), function.apply()` を使って関数を呼び出すには次のようにします。

```typescript
initial('salvador', 'dali');
// -> 'S. D'
initial.bind(null, 'salvador', 'dali')();
// -> 'S. D'
initial.call(null, 'salvador', 'dali');
// -> 'S. D'
initial.apply(null, ['salvador', 'dali']);
// -> 'S. D'
```

これらの関数の問題点は、例え関数が引数にある型を要求するように作っていたとしても任意の値を代入できてしまうことでした。  
引数を本来の `string` 型から他の型に変えて実行するとすべて実行時エラーになります。

```typescript
initial.bind(null, 'salvador', 5)();
// TypeError: Cannot read property 'toUpperCase' of undefined
initial.call(null, 'salvador', 5);
// TypeError: Cannot read property 'toUpperCase' of undefined
initial.apply(null, ['salvador', 5]);
// TypeError: Cannot read property 'toUpperCase' of undefined
```

このオプションを有効にするとこれらの関数呼び出しのときの引数の評価が厳密になり実行することができなくなります。

```typescript
// error of initial.bind()
error TS2769: No overload matches this call.
  Overload 1 of 6, '(this: (this: any, arg0: "salvador", arg1: string) => string, thisArg: any, arg0: "salvador", arg1: string): () => string', gave the following error.
    Argument of type 'number' is not assignable to parameter of type 'string'.
  Overload 2 of 6, '(this: (this: any, ...args: "salvador"[]) => string, thisArg: any, ...args: "salvador"[]): (...args: "salvador"[]) => string', gave the following error.
    Argument of type '5' is not assignable to parameter of type '"salvador"'.

initial.bind(null, 'salvador', 5)();
                               ~
// error of initial.call()
error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

initial.call(null, 'salvador', 5);
                               ~

// error of initial.apply()
error TS2322: Type 'number' is not assignable to type 'string'.

initial.apply(null, ['salvador', 5]);
                                 ~
```

### `strictPropertyInitialization`

**リリースされたバージョン: 2.7**

このオプションを有効にするためには `strictNullChecks` も同様に有効にする必要があります。

クラスのプロパティは初期化しない状態では `undefined` が格納されます。

```typescript
class User {
  public name: string;
  public gender: string;
  public age: number;
}

const user: User = new User();

console.log(user.name);
// -> undefined
console.log(user.gender);
// -> undefined
console.log(user.age);
// -> undefined
```

これはクラスの宣言時に、コンストラクタで各プロパティが初期化されていないためです。  
このオプションを有効にすると宣言されたプロパティは `undefined` とのユニオン型またはオプション修飾子がついている場合を除いて必ずコンストラクタの呼び出しの時点で初期化をする必要があります。

```typescript
class User {
  public name: string | undefined;
  public gender?: string;
  public age: number;
}

const user: User = new User();
```

```typescript
error TS2564: Property 'age' has no initializer and is not definitely assigned in the constructor.

public age: number;
       ~~~
```

これを回避するためにはコンストラクタで初期化するか、初期値を設定します。

```typescript
class User {
  public name: string | undefined;
  public gender?: string;
  public age: number;

  public constructor(age: number) {
    this.age = age;
  }
}
```

```typescript
class User {
  public name: string | undefined;
  public gender?: string;
  public age: number = 100;
}
```

### `noImplicitThis`

**リリースされたバージョン: 2.0**

名前付き関数、匿名関数はアロー関数と異なり、実行時に`this`が決定されます。そのため、内部で`this`を使っているとそれらは関数を書いている時点では`any`型と同じ扱いになります。

例えば、対角線の長さを求める関数 `lengthOfDiagonal()` を考えます。\(横, 縦\)を \(width, height\) とすれば関数は次のようになります。

```typescript
function lengthOfDiagonal(): number {
  return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
}
```

これを `width, height` をプロパティに持つオブジェクトのインスタンスに代入すれば対角線の長さを計算できます。

```typescript
const area = {
  width: 3,
  height: 4,
  diagonal: lengthOfDiagonal
};

console.log(area.diagonal());
// -> 5
```

このとき、打ち間違いで `width` を `witch` としてしまったとするとこの関数は意図した結果を返さなくなります。

```typescript
const area = {
  witch: 3,
  height: 4,
  diagonal: lengthOfDiagonal
};

console.log(area.diagonal());
// -> NaN
```

このオプションを有効にすると `any` 型として認識されてしまっている `this` がどの型であるかを明確にできない限り実行することができなくなります。

```typescript
error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
         ~~~~
error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
                             ~~~~
```

これを回避するためには `this`が何かを明示します。引数の`this`については関数のページに詳細がありますので併せてご参照ください。

{% page-ref page="function.md" %}

```typescript
type Area = {
  width: number;
  height: number;
  diagonal(): number;
};

function lengthOfDiagonal(this: Area): number {
  return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
}

const area: Area = {
  width: 3,
  height: 4,
  diagonal: lengthOfDiagonal
};
```

### `useUnknownInCatchVariables`

#### リリースされたバージョン: 4.4

JavaScript はいかなる値も例外として投げることができます。そのため補足した値は `any` 型でした。

```typescript
// case 1
try {
  throw new Error();
} catch (err) {
  // err is any
}

// case 2
try {
  throw 'This is an error!';
} catch (err) {
  // err is any
}

// case 3
try {
  throw undefined;
} catch (err) {
  // err is any
}
```

この混沌は TypeScript4.0 でようやく整理されることとなりました。補足した値に対して `unknown` 型を明記することによって補足した値の型はわからないものの型安全を獲得できるようになりました。

```typescript
// case 1
try {
  throw new Error();
} catch (err) {
  // err is any
}

// case 2
try {
  throw 'This is an error!';
} catch (err: unknown) {
  // err is unknown
}

// case 3
try {
  throw undefined;
} catch (err: unknown) {
  // err is any
}
```

今回のオプションはこの機能を常時有効にするものです。例外が補足した値は型の明記をすることなくすべてが `unknown` 型として解釈されるようになります。

```typescript
// case 1
try {
  throw new Error();
} catch (err) {
  // err is unknown
}

// case 2
try {
  throw 'This is an error!';
} catch (err) {
  // err is unknown
}

// case 3
try {
  throw undefined;
} catch (err) {
  // err is unknown
}
```

また、この制限を緩くしたい。つまり `unknown` 型ではなく `any` 型にしたいのであれば補足した値に対し `any` 型を明記してください。

### `alwaysStrict`

**リリースされたバージョン: 2.1**

`'use strict'`を各ファイルの先頭に付加します。

### `noUnusedLocals`

**リリースされたバージョン: 2.0**

宣言したにもかかわらず使用されていない変数を禁止します。

```typescript
function add(n1: number, n2: number): number {
  const message: string = `the sum is ${n1 + n2}`;

  return n1 + n2;
}
```

このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS6133: 'message' is declared but its value is never read.

const message: string = `the sum is ${n1 + n2}`;
      ~~~~~~~
```

### `noUnusedParameters`

**リリースされたバージョン: 2.0**

関数で使用していない引数を禁止します。

```typescript
function add(n1: number, n2: number, n3: number): number {
  return n1 + n2;
}
```

このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS6133: 'n3' is declared but its value is never read.

function add(n1: number, n2: number, n3: number): number {
                                     ~~
```

これを回避するためには、使用していない引数を`_`で始まる名前に変更します。

```typescript
function add(n1: number, n2: number, _n3: number): number {
  return n1 + n2;
}
```

### `exactOptionalPropertyTypes`

#### リリースされたバージョン: 4.4

今までオプション修飾子は値を設定しないことに加えて `undefined` を意図的に設定することができました。

```typescript
interface User {
  name: string;
  nationality?: 'India' | 'China';
}

const user1: User = {
  name: 'Srinivasa Aiyangar Ramanujan',
  nationality: 'India'
};

const user2: User = {
  name: 'Sergei Vasilevich Rachmaninov'
  nationality: undefined
};

const user3: User = {
  name: 'Yekaterina II Alekseyevna',
};
```

値が未定義であることと値が `undefined` であることは厳密には動作が異なります。例えば  `Object.keys()` は最たる例で、上記の `user1, user2, user3` にそれぞれ `Object.keys()` を適用すれば結果は次のようになります。

```typescript
// user1
[ 'name', 'nationality' ]
// user2
[ 'name', 'nationality' ]
// user3
[ 'name' ]
```

この差異が意図しない実行時エラーを生むことがあります。このオプションを有効にすると `interface, type` でオプション修飾子を持つキーはその値がキー自体を持たないようにしなければなりません。先程の例では

```typescript
TS2322: Type 'undefined' is not assignable to type '"India" | "China"'.

nationality: undefined
~~~~~~~~~~~
```

と `undefined` を代入した `user2` を修正するように指摘を受けます。

どうしてもキーに `undefined` も指定したい場合はオプション修飾子に加えて `undefined` のユニオン型を付加してください。

### `noImplicitReturns`

**リリースされたバージョン: 1.8**

戻り値が `void` 型以外の関数ですべての条件分岐において値を返しているかを厳密に評価します。

```typescript
function negaposi(num: number): string {
  if (num > 0) {
    return 'positive';
  } else if (num < 0) {
    return 'negative';
  }
}
```

このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS7030: Not all code paths return a value.

function negaposi(num: number): string {
                                ~~~~~~
```

これを回避するためには条件分岐の場合分けのときに値を返し忘れないように設計します。

```typescript
function negaposi(num: number): string {
  if (num > 0) {
    return 'positive';
  } else if (num < 0) {
    return 'negative';
  }

  return 'this is 0';
}
```

### `noFallthroughCasesInSwitch`

**リリースされたバージョン: 1.8**

`fallthrough`とは`switch`でにおける `case` 文で`break`または`return`を行わないことを意味します。 `case` 文が空でない場合に限り `break` や `return` が行われているかを厳密に評価します。

```typescript
function daysOfMonth(month: number): number {
  let days: number = 31;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      break;
    case 2:
      days = 28;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
    default:
      throw new Error('INVALID INPUT');
  }

  return days;
}
```

ある月の日数を求める関数 `daysOfMonth()` を定義しましたがこの関数には `fallthrough` が存在します。このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS7029: Fallthrough case in switch.

    case 2:
　  ~~~~~~~
error TS7029: Fallthrough case in switch.

    case 11:
    ~~~~~~~~
```

`case 1, case 3, case 5, ....` が `fallthrough` とみなされないのは `case` 文の実行部分が `break` だけで何もしないからです。

これを回避するためには`case`では漏れなく`break`あるいは`return`をするように設計します。

```typescript
ffunction daysOfMonth(month: number): number {
  let days: number = 31;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      break;
    case 2:
      days = 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    default:
      throw new Error('INVALID INPUT');
  }

  return days;
}
```

### `noUncheckedIndexedAccess`

**リリースされたバージョン: 4.1**

インデックス型や配列で宣言されたオブジェクトが持つプロパティへのアクセスを厳密に評価します。インデックス型についてはタイプエイリアスのページをご参照ください。

{% page-ref page="type-aliases.md" %}

```typescript
type ObjectLiteralLike = {
  en: string;
  fr: string;
  it: string;
  [lang: string]: string;
};
type ArrayObjectLike = {
  0: string;
  1: string;
  [num: number]: string;
};

function log(s: string): void {
  console.log(s);
}

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

log(spanish);
log(third);
```

`ObjectLiteralLike, ArrrayObjectLike`は共に`string`型のプロパティを持つオブジェクトの型として宣言されています。

```typescript
const spanish: string = butterfly.es;
const third: string = phoneticCodes[2];
```

これらのオブジェクトのプロパティにアクセスするときは完全な型安全ではありません。このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

log(spanish);
    ~~~~~~~
error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

log(third);
    ~~~~~
```

このように厳密に定義されていないプロパティは`undefined`型とのユニオン型として解釈されるようになります。

```typescript
const spanish: string | undefined = butterfly.es;
const third: string | undefined = phoneticCodes[2];
```

配列はインデックス記法でアクセスをすると`undefined`型とのユニオン型と解釈されますが`for-of, array.forEach()`はこの制約を受けないため積極的に使用を検討してください。

```typescript
const phoneticCodes: string[] = ['alpha', 'bravo', 'charlie'];

for (const p of phoneticCodes) {
  // ...
}

phoneticCodes.forEach((p: string) => {
  // ...
});
```

### `noImplicitOverride`

**リリースされたバージョン: 4.3**

サブクラスがスーパークラスのメソッドを拡張したときに `override` のキーワードをメソッドの前に書くことを強制します。これはスーパークラスの拡張しているメソッドが取り除かれたり、名称が変更されたことを検知することに役立ちます。

例えば、トグルボタン \(クリックするとオン、オフを繰り返すボタン\) のクラスが次のようになっているとします。

```typescript
class ToggleButton {
  protected active: boolean;
  
  public constructor() {
    this.active = false;
  }

  public isActive(): boolean {
    return this.active;
  }

  public enable(): void {
    this.active = true;
  }

  public disable(): void {
    this.active = false;
  }

  public push(): void {
    if (this.isActive()) {
      this.disable();
      // ...
      return;
    }
    this.enable();
    // ...
  }
}
```

ここで値のオンオフの切り替えを何回したかを数えられるサブクラス `ToggleCountButton` を考えます。すると `ToggleCountButton` は次のようになります。

```typescript
class ToggleCountButton extends ToggleButton {
  private counter: number;
  
  public constructor() {
    super();
    this.counter = 0;
  }

  public enable(): void {
    this.counter++;
    this.active = true;
  }

  public disable(): void {
    this.counter++;
    this.active = false;
  }

  public getCounter(): number {
    return this.counter;
  }
}
```

ここでスーパークラスの `ToggleButton` が「オンオフの切り替えにメソッドはふたつも要らない！セッターで十分だ」と変更されたとします。

```typescript
class ToggleButton {
  protected active: boolean;

  public isActive(): boolean {
    return this.active;
  }

  public setActive(active: boolean): void {
    this.active = active;
  }

  public push(): void {
    if (this.isActive()) {
      this.setActive(false);
      // ...
      return;
    }
    this.setActive(true);
    // ...
  }
}
```

するとサブクラスでオーバーライドしたはずのメソッド `enable(), disable()` が意味のないメソッドとして残ることになります。

`noImplicitOverride` はオーバーライドしているメソッドに `override`キーワードをつけることによってスーパークラスに同名のメソッドがないかを確認させます。オーバーライドをしているにもかかわらず `override` のキーワードを付けずにこのオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'ToggleButton'.

public enable(): void {
       ~~~~~~
error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'ToggleButton'.

public disable(): void {
       ~~~~~~~
```

逆に、オーバーライドしていないメソッドに `override` キーワードをつけると次のようなエラーが発生します。

```typescript
error TS4113: This member cannot have an 'override' modifier because it is not declared in the base class 'ToggleButton'.

public override enable(): void {
                ~~~~~~
error TS4113: This member cannot have an 'override' modifier because it is not declared in the base class 'ToggleButton'.

public override disable(): void {
                ~~~~~~~
```

### `noPropertyAccessFromIndexSignature`

**リリースされたバージョン: 4.2**

`noUncheckedIndexedAccess` と同様にインデックス型を持つオブジェクトに対する型評価です。インデックス型に対するアクセスをインデックス記法に強制します。

ドット記法とインデックス記法についてですが、次のようにあるオブジェクトがあるとしてドット\(`.`\)でプロパティアクセスをしているものがドット記法、ブラケット\(`[]`\)でアクセスをしているものがインデックス記法です。

```typescript
type SystemTerms = {
  en: string;
  [key: string]: string;
};

const butterfly: SystemTerms = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa'
};

// dot syntax
butterfly.en;
// indexed syntax
butterfly['en'];
```

` SystemTerms` は `noUncheckedIndexedAccess` にて登場した型と同じものでシステムにおける単語、用語のうち英語は担保し他言語の存在は曖昧なものにしています。

```typescript
console.log(butterfly.fr);
```

存在が不確かなプロパティへのアクセスについて、ドット記法でアクセスするときに、このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS4111: Property 'fr' comes from an index signature, so it must be accessed with ['fr'].

console.log(butterfly.fr);
                      ~~
```

このようにインデックス型へのドット記法でのアクセスが禁止されます。

