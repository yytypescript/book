# import / export /require

Node.jsが出てからというものの、フロントエンドの開発もNode.jsを通して行うことができるようにはなりましたが、実際に動く場所がブラウザとサーバーと事情が異なります。  
TypeScriptは最終的にどの場面で使われるか、その用途に適した出力に変えることができます。

## かつてのJavaScript

かつてJavaScriptがブラウザでのみ動いていた時代は、モジュール分割と言う考え自体はあったもののそれはあくまでもブラウザ上、さらには`html`での管理となっていました。よく使われていた`jQuery`というライブラリがあるとすれば、それは次のように`html`に書く必要がありました。

```markup
<script src="https://ajax.googleapis.com/ajax/libs/jquery/x.y.z/jquery.min.js"></script>
```

もし`jQuery`に依存するライブラリがあるとすれば、それより下に書く必要があります。

```markup
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/x.y.z/jquery-ui.min.js"></script>
```

ライブラリが少なければまだしも、増えてくると依存関係が複雑になります。もしも読み込む順番を間違えるとその`html`では動作しなくなるでしょう。

## Node.jsが登場してから

`npm`が登場してから、使いたいパッケージを持ってきてそのまま使うことが主流になりました。

## `CommonJS`

### `require()`

Node.jsでは現在でも主流の他の`.js`ファイル\(TypeScriptでは`.ts`も\)を読み込む機能です。基本は次の構文です。

```typescript
const package1 = require('package1');
```

これは、パッケージの`package1`の内容を定数`package1`に持ってくることを意味しています。このとき`package1`は現在のプロジェクトの`node_modules`というディレクトリに存在する必要があります。

自分で作った他の`.js, .ts`ファイルを読み込むこともできます。呼び出すファイルから見た、読み込みたいファイルの位置を**相対パス**で書きます。たとえ同じ階層にあっても相対パスで書く必要があります。このとき`.js, .json`とTypeScriptなら加えて`.ts`を省略することができます。TypeScriptでの開発においては最終的にJavaScriptにトランスパイルされることを考慮すると書かないほうが無難です。

```typescript
const myPackage = require('./MyPackage');
```

`.js`を`.ts`と同じ場所に出力するようにしているとTypeScriptにとって同じ名前の読み込ことができるファイルがふたつ存在することになります。このときTypeScriptは`.js`を優先して読み込むので注意してください。いくらTypeScriptのコードを変更しても変更が適用されていないようであれば、この問題の可能性があります。

またディレクトリの中に`index.js (index.ts)`があるのであれば、ディレクトリの名前まで書けば`index.js (index.ts)`を読み込んでくれます。

### `module.exports`

他のファイルを読む込むためにはそのファイルは何かを出力している必要があります。そのために使うのがこの構文です。

```typescript
// increment.js
module.exports = i => i + 1;
```

このような`.js`のファイルがあれば同じ階層で読み込みたい時は次のようになります。

```typescript
// index.js
const increment = require('./increment');

console.log(increment(3));
// 4
```

このとき、読み込んだ内容を受ける定数`increment`はこの名前である必要はなく変更が可能です。

この`module.exports`はひとつのファイルでいくらでも書くことができますが、適用されるのは最後のもののみです。

```typescript
// dayOfWeek.js
module.exports = 'Monday';
module.exports = 'Tuesday';
module.exports = 'Wednesday';
module.exports = 'Thursday';
module.exports = 'Friday';
module.exports = 'Saturday';
module.exports = 'Sunday';
```

```typescript
// index.js
const day = require('./dayOfWeek');

console.log(day);
// 'Sunday'
```

### `exports`

`module.exports`だと良くも悪くも出力しているモノの名前を変更できてしまいます。それを避けたい時はこの`exports`を使用します。

```typescript
// util.js
exports.increment = i => i + 1;
```

読み込み側では次のようになります。

```typescript
// index.js
const util = require('./util');

console.log(util.increment(3));
// 4
```

分割代入を使うこともできます。

```typescript
// index.js
const { increment } = require('./util');

console.log(increment(3));
// 4
```

こちらは`increment`という名前で使用する必要があります。他のファイルに同じ名前のものがあり、名前を変更する必要がある時は、分割代入のときと同じように名前を変更することができます。

```typescript
// index.js
const { increment } = require('./other');
const { increment: inc } = require('./util');

console.log(inc(3));
// 4
```

## `ES Module`

主にフロントエンド\(ブラウザ\)で採用されているファイルの読み込み方法です。`ES6`で追加された機能のため、あまりに古いブラウザでは動作しません。

### `import`

`require()`と同じく他の`.js, .ts`ファイルを読み込む機能ですが、`require()`はファイル内のどこにでも書くことができる一方で`import`は**必ずファイルの一番上に書く必要があります**。  
なお、書き方が2とおりあります。

```typescript
import * as package1 from 'package1';
import package2 from 'package2';
```

使い方に若干差がありますので以下で説明します。

### `export default`

`module.exports`に対応するものです。`module.exports`と異なり、ひとつのファイルはひとつの`export default`しか許されていなく複数書くと動作しません。

```typescript
// increment.js
export default i => i + 1;
```

この`.js`のファイルは次のようにして読み込みます。

```typescript
// index.js
import increment from './increment';

console.log(increment(3));
// 4
```

```typescript
// index.js
import * as increment from './increment';

console.log(increment.default(3));
// 4
```

### `export`

`exports`に相当するものです。書き方が2とおりあります。

```typescript
// util.js
export const increment = i => i + 1;
```

```typescript
// util.js
const increment = i => i + 1;

export { increment };
```

なお1番目の表記は定数宣言の`const`を使っていますが`let`を使っても読み込み側から定義されている`increment`を書き換えることはできません。

次のようにして読み込みます。

```typescript
// index.js
import { increment } from './util';

console.log(increment(3));
// 4
```

```typescript
// index.js
import * as util from './util';

console.log(util.increment(3));
// 4
```

1番目の場合の`import`で名前を変更する時は、`require`のとき\(分割代入\)と異なり`as`という表記を使って変更します。

```typescript
// index.js
import { increment as inc } from './util';

console.log(inc(3));
// 4
```

### `import()`

`ES Module`では`import`をファイルの先頭に書く必要があります。これは動的に読み込むファイルを切り替えられないことを意味します。この`import()`はその代替手段にあたります。

`require()`と異なる点としては`import()`は読み込み終えたあと`Promise`を返します。

```typescript
// index.js
import('./util').then(({increment}) => {
    console.log(increment(3));
    // 4
});
```

## Node.jsで`ES Module`を使う

先述のとおりNode.jsでは`CommonJS`が長く使われていますが、`13.2.0`でついに正式に`ES Module`もサポートされました。

しかしながら、あくまでもNode.jsは`CommonJS`で動作することが前提なので`ES Module`を使いたい時はすこし準備が必要になります。

### `.mjs`

`ES Module`として動作させたいJavaScriptのファイルをすべて`.mjs`の拡張子に変更します。

```typescript
// increment.mjs
export const increment = i => i + 1;
```

読み込み側は以下です。

```typescript
// index.mjs
import { increment } from './increment.mjs';

console.log(increment(3));
// 4
```

`import`で使うファイルの**拡張子が省略できない**ことに注意してください。

### `"type": "module"`

`package.json`にこの記述を追加するとパッケージ全体が`ES Module`をサポートします。

```typescript
{
  "name": "YYTS",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "license": "Apache-2.0"
}
```

このようにすることで拡張子を`.mjs`に変更しなくてもそのまま`.js`で`ES Module`を使えるようになります。なお`"type": "module"`の省略時は`"type": "commonjs"`と指定されたとみなされます。これは今までとおりのNode.jsです。

```typescript
// increment.js
export const increment = i => i + 1;
```

```typescript
// index.js
import { increment }  from './increment.js';

console.log(increment(3));
// 4
```

`.js`ではありますが**読み込む時は拡張子を省略できなくなる**ことに注意してください。

#### `.cjs`

`"type": "module"`を採用すると今度は`CommonJS`で書かれたJavaScriptを読み込みたくなります。そのときは`CommonJS`で書かれているファイルをすべて`.cjs`に変更する必要があります。

```typescript
// increment.cjs
exports.increment = i => i + 1;
```

読み込み側は以下です。

```typescript
// index.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { increment } = require('./increment.cjs');

console.log(increment(3));
// 4
```

`ES Module`には`require()`がなく、一手間加えて作り出す必要があります。

### `"type": "module"`の問題点

すべてを`ES Module`として読み込むこの設定は、多くのパッケージがまだ`"type": "module"`に対応していない現状としては非常に使いづらいです。

たとえば`linter`やテストといった各種開発補助のパッケージの設定ファイルを`.js`で書いていると動作しなくなってしまいます。かといってこれらを`.cjs`に書き換えても、パッケージが設定ファイルの読み込み規則に`.cjs`が含んでいなければそれらのパッケージは設定ファイルがないと見なします。そのため`"type": "module"`は現段階では非常に扱いづらいものとなっています。

## TypeScriptでは

TypeScriptでは一般的に`ES Module`方式に則った記法で書きます。これは`CommonJS`を使用しないというわけではなく、トランスパイル時の設定で`CommonJS, ES Module`のどちらにも対応した形式で出力できるのであまり問題ではないと言えます。ここまでの経緯などはTypeScriptでは意識することがあまりないでしょう。

また、執筆時\(2020/06\)ではTypeScriptのトランスパイルは`.js`のみを出力でき`.cjs, .mjs`を出力する設定はありません。ブラウザでもサーバーでも使えるJavaScriptを出力したい場合は一手間加える必要があります。

出力の方法に関しては`tsconfig.json`の頁に説明がありますのでそちらをご覧ください。

{% page-ref page="../../handson/tsconfig.json-settings.md" %}

## `require? import?`

ブラウザ用、サーバー用の用途で使い分けてください。ブラウザ用であれば`ES Module`を、サーバー用であれば`CommonJS`が無難な選択肢になります。どちらでも使えるユニバーサルなパッケージであれば`Dual Package`を目指すのもよいでしょう。

## `default export? named export?`

`CommonJS`の`module.exports`と`ES Module`の`export default`は`default export`と呼ばれ  
`CommonJS`の`exports`と`ES Module`の`export`は`named export`と呼ばれています。  
どちらも長所と短所があり、たびたび議論になる話題です。どちらか一方を使うように統一するコーディングガイドを持っている企業もあるようですが、どちらかが極端に多いというわけでもないので好みの範疇です。

### `default export`

#### Pros

* `import`する時に名前を変えることができる
* そのファイルが、他の`export`に比べ何をもっとも提供したいのかがわかる

#### Cons

* エディター、IDEによっては入力補完が効きづらい
* 再エクスポートの際に名前をつける必要がある

### `named export`

#### Pros

* エディター、IDEによる入力補完が効く
* ひとつのファイルから複数`export`できる

#### Cons

* \(名前の変更はできるものの\)基本的に決まった名前で`import`して使う必要がある
* `export`しているファイルが名前を変更すると動作しなくなる

ここで挙がっている**名前を変えることができる**についてはいろいろな意見があります。

### ファイルが提供したいもの

たとえばある国の会計ソフトウェアを作っていたとして、その国の消費税が`8%`だったとします。そのときのあるファイルの`export`はこのようになっていました。

```typescript
// taxIncluded.ts
export default price => price * 1.08;
```

もちろん呼び出し側はそのまま使うことができます。

```typescript
// index.ts
import taxIncluded from './taxIncluded';

console.log(taxIncluded(100));
// 108
```

ここで、ある国が消費税を`10%`に変更したとします。このときこのシステムでは`taxIncluded.ts`を変更すればこと足ります。

```typescript
// taxIncluded.ts
export default price => price * 1.1;
```

この変更をこのファイル以外は知る必要がありませんし、知ることができません。

### 今回の問題点

システムが**ある年月日当時の消税率**を元に金額の計算を多用するようなものだとこの暗黙の税率変更は問題になります。過去の金額もすべて現在の消費税率である`10%`で計算されてしまうからです。

### `named export`だと

`named export`であれば`export`する名称を変更することで呼び出し側の変更を強制させることができます。

```typescript
// taxIncluded.ts
export const taxIncludedAsOf2014 = price => price * 1.08;
```

```typescript
// index.ts
import { taxIncludedAsOf2014 } from './taxInclude';

console.log(taxIncludedAsOf2014(100));
// 108
```

税率が`10%`に変われば次のようにします。

```typescript
// taxIncluded.ts
export const taxIncludedAsOf2019 = price => price * 1.1;
```

```typescript
// index.ts
import { taxIncludedAsOf2019 } from './taxIncluded';

// this is no longer available.
// console.log(taxIncludedAsOf2014(100));
console.log(taxIncludedAsOf2019(100));
// 110
```

名前を変更したため、呼び出し元も名前の変更が強制されます。これは例え`as`を使って名前を変更していたとしても同じく変更する必要があります。

ロジックが変わったこととそれによる修正を強制したいのであれば`named export`を使う方がわかりやすく、そしてエディター、IDEを通して見つけやすくなる利点があります。逆に、公開するパッケージのようにAPIが一貫して明瞭ならば`default export`も価値があります。

