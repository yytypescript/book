# 従来の関数とアロー関数の違い

JavaScriptの関数は、[関数宣言]、[関数式]、[アロー関数]の3とおりの方法で作れます。

[関数宣言]: ./function-declaration.md
[関数式]: ./function-expression.md
[アロー関数]: ./arrow-functions.md

## アロー関数は後発

JavaScriptの歴史を紐解くと、元々は関数宣言と関数式しかありませんでした。この2つの機能上の違いはほぼありません。この2つはまとめて「従来の関数」と呼びます。アロー関数は、従来の関数の問題点を解決するために、あとで導入されたものです。

## 構文の簡潔さ

従来の関数は構文の長さが問題でした。JavaScriptではよくコールバック関数を書きます。コールバック関数とは、関数の引数として渡される関数を言います。従来の関数は、関数を書くたびに`function`キーワードを書く必要があります。処理が1行だけでも、複数行要するコーディングスタイルもあります。書くのも読むのもわずらわしいコードになりがちです。一方で、アロー関数は短くシンプルな記述になります。

```js twoslash
// 従来の関数(関数式)
[1, 2, 3].map(function (n) {
  return n + 1;
});
// アロー関数
[1, 2, 3].map((n) => n + 1);
```

## 引き算で再設計されたアロー関数

アロー関数が後発だと聞くと、従来の関数に機能が追加されたものと思われるかもしれません。実は逆です。引き算のアプローチでアロー関数は再設計されました。従来の関数が持つ機能から、関数としては余計な機能を削ったり、複雑な仕様を単純化したりしたものです。そのため、シンプルに「関数らしさ」がより際立つものになっています。どのような機能が間引かれたか見ていきましょう。

### コンストラクタ

関数の機能の本質は、入力から計算結果を返すことです。JavaScriptの従来の関数にはこの本質以外に、オブジェクトを生成するコンストラクタの役割も担います。関数をコンストラクタとして扱うには`new`演算子を用います。

```js twoslash
function Cat(name) {
  this.name = name;
}
// Catオブジェクトを生成する
const cat = new Cat("ミケ");
console.log(cat);
// @log: Cat { name: 'ミケ' }
```

関数にコンストラクタ機能がついているのは、一見すると便利そうです。しかし、関数に`new`演算子をつけるべきかどうかを、使い手が判断する必要がでてしまいます。それを判断するには、関数の処理内容を読んでみるまで分かりません。コンストラクタとして実行すべき関数を、普通の関数として呼び出ししてまうとバグの原因になりえます。

アロー関数はコンストラクタになれません。もしもJavaScriptで`new`演算子を使うと実行エラーになります。誤用の心配がありません。

```js twoslash
const Cat = (name) => {};
const cat = new Cat("ミケ");
// @error: TypeError: Cat is not a constructor
```

TypeScriptでは、従来の関数でもコンストラクタとして使えないようになっています。もし、関数を誤って`new`したとしても、コンパイルエラーで警告されるので安心です。

```ts twoslash
// @errors: 7009
function Cat(name: string) {
  /* ... */
}
const cat = new Cat("ミケ");
```

まとめると、JavaScriptではコンストラクタになれるかどうかは意識する必要がありますが、TypeScriptではコンパイルエラーで気づけるので、JavaScriptほど注意を払う必要はないということになります。

### thisの指すもの

従来の関数では、変数`this`の指すものが実行時の文脈で決まるという仕様があります。言い換えると、同じ関数であっても、関数の呼び出し方や呼び出される環境によって`this`が別のものを参照するようになります。次の`this`をコンソールに表示する従来の関数を例に見てみましょう。

```js twoslash
function showThis() {
  console.log(this);
}
```

この`showThis`関数を普通に実行した場合、`this`が指すのはグローバルオブジェクトです。グローバルオブジェクトとはブラウザでは`Window`オブジェクトです。`Window`オブジェクトはページのサイズやURL、表示するHTML(DOM)などを操作するAPIを提供するオブジェクトです。

```js twoslash
showThis();
// @log: Window
```

JavaScriptにはstrictモードがあります。これは危険な処理ができないよう制約する実行モードです。strictモードを有効にするには`"use strict"`をコードの冒頭に書きます。strictモードで`showThis`を実行すると、`this`の値は`undefined`になります。

```js twoslash
"use strict";
showThis();
// @log: undefined
```

ちなみにTypeScriptでは、コンパイラオプション[`alwaysStrict`](../tsconfig/alwaysstrict.md)を有効にすると、コンパイル後のJavaScriptがstrictモードになります。

また、JavaScriptにはスクリプトモードとモジュールモードがあります。モジュールモードのJavaScriptでは、`export`や`import`の構文が使えます。このモードでは自動的にstrictモードになります。そのため、モジュールモードで`showThis`を実行すると、`this`の値は`undefined`になります。

```js twoslash
export {};
showThis();
// @log: undefined
```

関数はオブジェクトのメソッドとして呼び出すこともできます。`showThis`関数をメソッド呼び出しした場合、`this`が指す値はメソッドが紐づくオブジェクトになります。

```js twoslash
const foo = { name: "Foo" };
// 関数をオブジェクトのメンバーにする
foo.showThis = showThis;
// メソッドとして呼び出す
foo.showThis();
// @log: {name: "Foo", showThis: function}
```

従来の関数はコンストラクタとして呼び出せることを説明しましたが、コンストラクタとして呼び出した場合、`this`は生成中のオブジェクトを指します。

```js twoslash
function showThis() {
  this.name = "Foo";
  console.log(this);
}
new showThis();
// @log: {name: "Foo"}
```

上で例示してきたとおり、従来の関数は実行の文脈で`this`の内容が動的に決まります。そのため、従来の関数は呼び出し方に注意を払う必要があります。使い方を誤るとバグに繋がる危険性があります。

<figure><figcaption>従来の関数のthisが指すもの</figcaption>

| 文脈                                           | thisの値                            |
| ---------------------------------------------- | ----------------------------------- |
| 通常の呼び出し<br/>`showThis()`                | グローバルオブジェクト(`Window`)    |
| 通常の呼び出し + strictモード<br/>`showThis()` | `undefined`                         |
| メソッド呼び出し<br/>`obj.showThis()`          | メソッドが属するオブジェクト(`obj`) |
| コンストラクタ呼び出し<br/>`new showThis()`    | 生成中のオブジェクト                |

</figure>

アロー関数の`this`はレキシカルスコープで静的です。つまり、定義したときに`this`が指すものが決定し、関数の呼び出し方(文脈)に左右されません。`this`の値は明瞭です。

たとえば、次の`timer`オブジェクトは1秒後にメッセージを表示する`start`メソッドを持ちます。`start`メソッドで1秒後に`timer`の`message`フィールドの値を出力する処理を予約しています。

`start`関数の`this`は`timer`を指します(❶)。1秒経つと、`this.message`を出力しようとします。従来の関数は、`this`がグローバルオブジェクトの`Window`を指すため、`undefined`が出力されます(❷)。一方のアロー関数は、`this`がレキシカルスコープの`this`を指します(❸)。この`this`は`timer`です。よって、`message`フィールドの値`"時間です！"`が正常に出力されます。

```js twoslash
const oneSecond = 1000;
const timer = {
  message: "時間です！",
  start: function () {
    console.log(this); // ❶

    // 従来の関数
    setTimeout(function () {
      console.log(this.message); // ❷
    }, oneSecond);

    // アロー関数
    setTimeout(() => {
      console.log(this.message); // ❸
    }, oneSecond);
  },
};
timer.start();
```

### `call`、`apply`、`bind`の振る舞い

JavaScriptの関数はオブジェクトで、`call`、`apply`、`bind`の3つのメソッドが生えています。このメソッドは関数を呼び出すものですが、従来の関数では、第一引数に`this`が何を指すかを指定できます。

```js twoslash
function showThis() {
  console.log(this);
}
const obj = { name: "foo" };
showThis.bind(obj)(); // objをthisにバインドして、関数呼び出し
// @log: { name: 'foo' }
```

アロー関数にも、`call`、`apply`、`bind`が生えていますが、第一引数に値を渡しても`this`は上書きされません。

```js twoslash
const showThis = () => {
  console.log(this);
};
const obj = { name: "foo" };
showThis.bind(obj)();
// @log: {}
```

### arguments変数の有無

従来の関数では、`arguments`という特殊な変数が自動的に定義されます。この値は引数の配列です。

```js twoslash
function foo() {
  console.log(arguments);
}
foo(1, 2, 3);
// @log: [1, 2, 3]
```

`arguments`は可変長引数を実現するには便利ですが、関数を実装する多くの場合、利用することのない余計な変数という見方もできます。アロー関数には`arguments`がありません。アロー関数で可変長引数を実現したい場合は、[残余引数](./rest-parameters.md)`...`を用います。

```js twoslash
const foo = (...args) => {
  console.log(args);
};
foo(1, 2, 3);
// @log: [1, 2, 3]
```

### ジェネレーター

JavaScriptにはジェネレーターという複数の値を生成できる特殊な関数があります。ジェネレーターは、`function`キーワードにアスタリスクをつけ、`yield`文で生成する値を記述します。

```js twoslash
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

ジェネレーターの値はfor-ofなどの反復処理で取り出せます。

```js twoslash
for (const value of generateNumbers()) {
  console.log(value); // 1、2、3の順で出力される
}
```

ジェネレーターを定義できるのは従来の関数だけです。アロー関数はそもそもジェネレーター構文をサポートしていないため、ジェネレーターを定義することはできません。

## 安全性が強化されたアロー関数

アロー関数は、従来の関数にあった危険な仕様が改善されています。

### 引数名の重複

JavaScriptの従来の関数は、引数名の重複が許されます。引数が重複した場合、最後の引数に渡された値が採用されます。

```js twoslash
function foo(a, a, a) {
  console.log(a);
}
foo(1, 2, 3);
// @log: 3
```

この仕様はバグを引き起こしやすいものですが、従来の関数でもstrictモードにすることで、引数名の重複を構文エラーにできます。

```js twoslash
"use strict";
function foo(a, a) {}
//              ^構文エラー
// @error: SyntaxError: Duplicate parameter name not allowed in this context
```

アロー関数が導入される際には、こうした危険な仕様が最初から省かれました。アロー関数で引数名が重複した場合、strictモードのオンオフにかかわらず常に構文エラーになります。

```js twoslash
const foo = (a, a) => {};
//              ^構文エラー
// @error: SyntaxError: Duplicate parameter name not allowed in this context
```

TypeScriptでは、従来の関数でも引数名の重複はコンパイルエラーになります。

```ts twoslash
// @errors: 2300
function foo(a: number, a: number) {}
```

そのため、TypeScriptにおいては、従来の関数とアロー関数の間に、そもそも安全面での差はありません。

### 関数名の重複

JavaScriptでは変数宣言するときに`const`と`let`、`var`のいずれかで行います。`var`はJavaScriptの初期から存在する宣言方法ですが、`const`と`let`は2015年に追加されたものです。大きな違いは、`const`は宣言時にのみ値が代入できる宣言方法で、`let`は宣言後でも値を変更できる宣言方法です。

`const`と`let`は、`var`の問題点を解決するために導入されました。`var`の問題点のひとつが何度も同じ変数名で変数宣言できる点でした。たとえば、`value`という変数がすでに宣言されていたとしても、もう一度`var value`で変数宣言しなおすと、特にエラーになることはなく実行できてしまいます。

```js twoslash
var value = 1;
var value = 2;
console.log(value);
// @log: 2
```

この仕様は、意図しない変数の上書きに気づきにくく、不具合の要因になることがしばしばあります。`const`や`let`は変数名が重複している場合は、エラーになります。つまり、`var`よりも安全なコーディングが行えます。

```js twoslash
let value = 1;
let value = 2; // 構文エラー
// @error: SyntaxError: Identifier 'value' has already been declared
```

関数宣言で作った関数は`var`に相当します。そのため、重複した関数名で関数が作れてしまいます。

```js twoslash
function foo() {
  console.log("1つ目の関数");
}
function foo() {
  console.log("2つ目の関数");
}
foo();
// @log: "2つ目の関数"
```

アロー関数は、変数宣言と同じ構文で作るため、`var`を避けて`let`または`const`を使うコーディングをしている限り、関数名の重複が起こりえません。

```js twoslash
const foo = () => {};
const foo = () => {};
//    ^^^構文エラー
// @error: SyntaxError: Identifier 'foo' has already been declared
```

もちろん、アロー関数でも`var`を用いて関数を作った場合は、関数名が重複できてしまいます。しかし、最近のJavaScriptのベストプラクティスでは、`var`を使わないことが推奨されています。そのため、関数宣言と比べて、アロー関数のほうがずっと関数名重複のミスを低減できる状況が多いです。

TypeScriptでは、関数宣言でも重複した関数名がコンパイルエラーになります。

```ts twoslash
// @errors: 2393
function foo() {}
function foo() {}
```

したがって、関数名の重複問題に関しては、TypeScriptでは安全性の差がありません。

## 巻き上げと関数定義と呼び出しの順序

関数宣言とアロー関数では[巻き上げ(hoisting)](./function-declaration-and-hoisting.md)が起こるか否かの違いがあります。巻き上げとは、変数が宣言される前のコードで、その変数を参照できる仕様です。

巻き上げとは、変数スコープの途中で宣言された変数が、変数スコープの冒頭に変数宣言を自動的に持ってくる仕様です。巻き上げられた変数は`undefined`で初期化された状態になります。次の例では、`value`の変数宣言よりも先に、変数`value`を参照していますが、これはエラーにならず`undefined`が出力されます。

```js twoslash
console.log(value);
// @log: undefined
var value = 1;
```

これは変数`value`に巻き上げが起こり、`console.log(value)`よりも手前で`value`の変数宣言がなされるためです。上のコードは、実質的に次のコードと同じ意味になります。

```js twoslash
var value;
console.log(value);
value = 1;
```

関数宣言でも類似の巻き上げが起こります。`var`の巻き上げと異なる点は、関数は`undefined`で初期化されるのではなく、関数の実装も合わせて巻き上げられる点です。そのため、関数宣言よりも手前で関数呼び出しが行えます。

```js twoslash
foo();
// @log: 実行しました
function foo() {
  console.log("実行しました");
}
```

コードに書かれた順序が、関数呼び出し、関数宣言の順になるだけで、関数の巻き上げには問題点はありません。

<TweetILearned>

JavaScriptのアロー関数の特徴

・構文が短い
・thisがレキシカルスコープ
・コンストラクタになれない
・ジェネレータになれない
・引数の重複が起こらない
・関数の宣言重複が起きにくい
・巻き上げが起きにくい

</TweetILearned>

## 従来の関数とアロー関数の使い分け

上では、従来の関数(関数宣言と関数式)とアロー関数の機能上の違いを見てきました。違いを踏まえた上で、この2つはどちらを使ったほうがよいのでしょうか。もしどちらも使う場合、どのような基準で使い分けたらよいのでしょうか。

従来の関数を使うべきか、アロー関数を使うべきかは、意見が分かれるところです。アロー関数は従来の関数の問題点を解決した新しい機能であるため、できるだけアロー関数を使うべきという考えの人もいます。一方で、関数宣言とアロー関数は適度に使い分けるべきという意見の人もいます。アロー関数よりも関数宣言を積極的に使うべきと考える人もいるでしょう。どこでアロー関数を使い、どこで従来の関数を使うか。こうした基準は議論が尽きないところです。どのような判断基準が正しいと断言できるものではありません。

それでも、従来の関数とアロー関数の使い分け方は、個人やチームといったひとつのソースコードを共有する範囲では、一貫した決まりで使い分けることが重要です。ここからは、自分なりの使い分けを考えられるようになるために、判断材料の手がかりを示したいと思います。ここで提示することが普遍的に正しいとは限りません。読んだ上で自分なりの使い分け方を考えてみてください。

特に理由がない場合、アロー関数を使うほうが無難です。なぜかと言うと、アロー関数は関数としての最低限の機能をもったシンプルな関数だからです。上で見たように、従来の関数にはコンストラクタや`this`の動的な解釈などさまざまな機能があり、それらの機能を使わない場合は余計な機能になります。機能が多い分、コーディング時に考慮しないといけないことが増えます。アロー関数はミニマムな機能に抑えられているので、細かいことを気にせず書ける利点があります。

アロー関数が特に相性がいいところはコールバック関数です。たとえば、配列オブジェクトの`Array`には、各要素に対して処理をかけるメソッドがいくつかあります。これらのメソッドは引数に関数を渡す必要があります。次の例は、数値の配列に対して`filter`メソッドを用い、偶数だけを抽出するコードです。このコードでは関数式をコールバック関数に渡しています。

```js twoslash
const nums = [1, 2, 3, 4];
const even = nums.filter(function (n) {
  return n % 2 === 0;
});
console.log(even);
// @log: [2, 4]
```

これをアロー関数に置き換えると、次のようにシンプルな記述になります。

```js twoslash
const nums = [1, 2, 3, 4];
const even = nums.filter((n) => n % 2 === 0);
console.log(even);
// @log: [2, 4]
```

こうしたコールバック関数ではアロー関数を積極的に使うことで、コードの記述量が減ったり、コードが意図する処理が目立つといったメリットが出てきます。

従来の関数も出番がないわけではありません。HTMLのボタンがクリックされたときに何らかの処理をしたい場合、`addEventListener`メソッドを使います。任意の処理をコールバック関数としてこのメソッドに渡すことで、好きな処理が行なえます。

```js twoslash
button.addEventListener("click", コールバック関数);
```

処理の中でクリックされたボタンを参照する場合、渡す関数が従来の関数なら変数`this`でボタンを参照できます。下の例では、クリックした「保存」ボタンの表示を「保存中…」に変えるコードです。`this.innerText`でボタン表示を変更しています。このような`this`の使い方をしたい場合はアロー関数では書くことができません。

```html
<button id="save">保存</button>
<script>
  const button = document.getElementById("save");
  button.addEventListener("click", function () {
    this.innerText = "保存中…";
  });
</script>
```

上の場合でも、`button`を参照すればアロー関数も使えます。なので、従来の関数でなければならない決定打ではありません。

```html {4-5}
<button id="save">保存</button>
<script>
  const button = document.getElementById("save");
  button.addEventListener("click", () => {
    button.innerText = "保存中…";
    // ^^^buttonを参照
  });
</script>
```

オブジェクトのメソッドとして関数を作る場合は、従来の関数を選ぶ理由になります。`this`でオブジェクトを参照できるからです。たとえば、次の例`fullName1`メソッドのように、メソッドでオブジェクトのプロパティを用いる場合、`this`で参照するのが便利です。

```js twoslash
const taroYamada = {
  firstName: "Taro",
  lastName: "Yamada",
  // 従来の関数
  fullName1: function () {
    return this.firstName + " " + this.lastName;
  },
  // アロー関数
  fullName2: () => {
    return this.firstName + " " + this.lastName;
  },
};
console.log(taroYamada.fullName1());
// @log: "Taro Yamada"
console.log(taroYamada.fullName2());
// @log: undefined undefined
```

アロー関数を用いた`fullName2`deは`this`がオブジェクトを指さないため、期待どおりの動作になりません。もし、アロー関数を使う場合は、`this`ではなく`taroYamada.firstName`のようにオブジェクトの変数名を参照する必要があります。

```js twoslash
const taroYamada = {
  firstName: "Taro",
  lastName: "Yamada",
  fullName: () => {
    return taroYamada.firstName + " " + taroYamada.lastName;
  },
};
console.log(taroYamada.fullName());
// @log: "Taro Yamada"
```

従来の関数には巻き上げがあるおかげで、理解しやすいコードになる場合もあります。たとえば、プログラムを処理過程ごとに関数でグルーピングし、プログラムの冒頭で関数呼び出しを羅列することで、そのプログラムの処理の概要が読み始めのところでわかりやすくなることがあります。

```js twoslash
// プログラムの概要
step1();
step2();
step3();

// 各処理の詳細
function step1() {
  /* 処理の詳細 */
}
function step2() {
  /* 処理の詳細 */
}
function step3() {
  /* 処理の詳細 */
}
```

アロー関数は、`const`や`let`、`var`で作る必要があるため、関数の巻き上げが起こりません。そのため、上のサンプルコードのように先に処理の概要を示すようなパターンはそのまま書くことができません。

```js twoslash
step1();
// @error: ReferenceError: Cannot access 'step1' before initialization
step2();
step3();
const step1 = () => {};
const step2 = () => {};
const step3 = () => {};
```

もし上の書き方と近い表現をアロー関数で行う場合、処理の概要を書いた関数を定義し、その関数をプログラムの最後で呼び出す書き方になります。

```js twoslash
const main = () => {
  step1();
  step2();
  step3();
};
const step1 = () => {};
const step2 = () => {};
const step3 = () => {};
main();
```

関数が関数であることを目立たせたい場合に、関数宣言を使うという選択もあります。アロー関数は、変数宣言と同じ書き方で書くので、それが値なのか関数なのかがひと目では分かりにくいと感じる人も中にはいます。変数宣言の間に、アロー関数と関数宣言がある次の例を見比べてください。どちらがぱっと見て関数であると分かりやすいでしょうか。

```js twoslash
// 変数宣言の間にあるアロー関数
const str = "foo";
const obj = { value: str };
const func = (n) => n + 1;
const nums = [1, 2, 3];

// 変数宣言の間にある関数宣言
const str = "foo";
const obj = { value: str };
function func(n) {
  return n + 1;
}
const nums = [1, 2, 3];
```
