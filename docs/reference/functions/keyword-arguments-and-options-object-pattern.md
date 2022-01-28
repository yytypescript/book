# キーワード引数とOptions Objectパターン

JavaScriptやTypeScriptの関数には、Pythonにあるキーワード引数のような機能はありません。その代わり、分割代入引数を応用することで、キーワード引数と同じようなことができます。

## キーワード引数とは

キーワード引数(keyword argument)は、Pythonの機能です。関数呼び出し時に、値だけを指定するのではなく、引数名を使って「名前=値」の形式で引数を指定する方法です。

```python
# Pythonコード
def func(x, y, z):
    print(x, y, z)

func(x=1, y=2, z=3)  # => 1 2 3
```

キーワード引数と同じような機能はRubyや、Scalaの名前付き引数(named argument)などに見られます。JavaScriptやTypeScriptにはキーワード引数に相当する機能はありません。

キーワード引数の仕様上の特徴は、位置引数(positional argument)と異なり、関数呼び出し側が引数の順番を自由に変えられるところです。

```python
# Pythonコード
func(z=3, y=2, x=1)  # => 1 2 3
```

## Options Objectパターン

JavaScriptやTypeScriptにはキーワード引数のような言語仕様はありませんが、Options Objectパターンというデザインパターンで似たようなことができます。Options Objectパターンは複数の位置引数を受け取る代わりに、ひとつのオブジェクトを引数に受け取るように設計された関数を言います。

```js twoslash
// 位置引数の関数
function normalFunc(x, y, z) {
  console.log(x, y, z);
}

// オブジェクトひとつだけを引数に持つ関数
function func(options) {
  console.log(options.x, options.y, options.z);
}

func({ x: 1, y: 2, z: 3 });
// @log: 1 2 3
```

さらに、Options Objectパターンでは分割代入引数を応用すると、引数の部分をよりシンプルに書けるようになります。

```js
function func({ x, y, z }) {
  console.log(x, y, z);
}
```

[分割代入引数 (destructuring assignment parameter)](destructuring-assignment-parameters.md)

## Options Objectパターンの型注釈

TypeScriptでOptions Objectパターンを使うときには、引数の型注釈が必要になります。型注釈はオブジェクト型を書きます。

```ts
function func({ x, y, z }: { x: number; y: number; z: number }) {
  // ...
}
```

オブジェクト型の記述が長すぎる場合には、TypeScriptの型エイリアス(type alias)を用いて、引数の型を分けて書くと可読性が良くなります。

```ts
type Options = {
  x: number;
  y: number;
  z: number;
};

function func({ x, y, z }: Options) {
  // ...
}
```

## Options Objectパターンの利点

Options Objectパターンの利点は次の3つがあります。

- 引数の値が何を指すのか分かりやすい
- 引数追加時に古いコードを壊さない
- デフォルト引数が省略できる

### 引数の値が何を指すのか分かりやすい

位置引数3つを持つような関数の呼び出しコードには分かりにくさがあります。

```js
findProducts(true, true, true);
```

`true`が3つ並んでいますが、それが何を指すのかは、これを見ただけでは分かりません。それを知るには関数の実装を見に行く必要があります。また、引数の順番を間違えやすいという問題もあります。

Options Objectパターンの場合、関数呼び出しコードを見ただけで、引数の意味が理解できます。引数名が際立つため、誤って引数を入れ替えてしまう心配が少ないです。

```js
findProducts({ isSale: true, withDetails: true, freeShipping: true });
```

### 引数追加時に古いコードを壊さない

位置引数の関数は変更に弱い側面があります。たとえば、ユーザーを検索する関数を実装したとします。最初の要件は国と都市でユーザーを絞り込めること、そして、ユーザー属性でソートできることだったとします。その場合、次のような実装をすれば要件は満たせます。

```js
function findUsers(country, city, order, sort) {}

findUsers("JP", "Tokyo", "id", "asc");
```

その後、年齢の範囲でも絞り込みたいという要望が出てきたとします。年齢範囲を指定できる引数を追加する必要があります。この場合、2つの選択肢があります。1つ目は、呼び出し側のコードを壊さないよう、引数の最後に年齢範囲を追加することです。

```js
function findUsers(country, city, order, sort, ageMin, ageMax);
//                                             ^^^^^^^^^^^^^^追加
```

この場合、並び順指定のorderとsortが絞り込み条件のcityとageMinに挟まれる形となります。これはあまりキレイな引数の並びではありません。

2つ目の方法は、呼び出し側のコードを壊す代わりに、引数の並びはキレイに保つ方法です。絞り込み条件は前方に、並び順指定は後方に配置します。

```js
function findUsers(country, city, ageMin, ageMax, order, sort);
//                                ^^^^^^^^^^^^^^^追加
```

この場合、呼び出し側コードは修正を余儀なくされます。

Options Objectパターンを用いれば、呼び出し元コードを壊さずに、追加引数を適切な位置に足せます。変更前の関数の実装と、その呼び出しコードは次のようになります。

```js
function findUsers({ country, city, order, sort }) {}

findUsers({ country: "JP", city: "Tokyo", order: "id", sort: "asc" });
```

これに年齢範囲を追加した場合、関数定義の引数の位置はふさわしいところに置けます。

```js
function findUsers({ country, city, ageMin, ageMax, order, sort }) {}
//                                  ^^^^^^^^^^^^^^追加
```

加えて、関数呼び出し側のコードは変更する必要がありません。

### デフォルト引数が省略できる

位置引数を採用した関数では、場合によってはデフォルト引数が省略できません。たとえば、デフォルト引数を持つ位置引数3つを持つ関数で、1番目を2番目をデフォルトにしたい場合、それぞれに`undefined`を書く必要があります。

```js twoslash
function findProducts(
  isSale = false,
  withDetails = false,
  freeShipping = false
) {
  console.log(isSale, withDetails, freeShipping);
}

findProducts(undefined, undefined, true);
// @log: false false true
```

Options Objectパターンを用いた場合は、デフォルトにしたい引数については何も書く必要がありません。

```js twoslash
function findProducts({
  isSale = false,
  withDetails = false,
  freeShipping = false,
}) {
  console.log(isSale, withDetails, freeShipping);
}

findProducts({ freeShipping: true });
// @log: false false true
```

## 引数名を変更する方法

位置引数の利点は引数名の変更に強いことです。関数呼び出し側を壊すことなく、関数宣言側の引数名を自由に変更できます。たとえば、`function func(hoge) {}`の`hoge`を`fuga`に変更したとしても、呼び出し側のコードには影響がありません。

引数名の指定を必要とするOptions Objectパターンでは、引数名の変更が呼び出し側コードに影響を及ぼします。たとえば、`function func({ hoge }) {}`の`hoge`を`fuga`に変更した場合、呼び出し側の`func({ hoge: 123 })`も`func({ fuga: 123 })`に変更しなければなりません。

Options Objectパターンの引数名変更問題を解決するには、分割代入の異なる引数名への代入機能を遣います。上の例でいうと、関数宣言側を`function func({ hoge })`に変更する代わりに`function func({ hoge: fuga })`のようにします。

```js twoslash
function func({ hoge: fuga }) {
  console.log(fuga);
}

func({ hoge: 123 });
// @log: 123
```

すると、関数呼び出し側は古い変数名`hoge`を渡すやり方から変えなくても動作するようにできます。関数の実装は、新しい変数名`fuga`が使えます。

## デフォルト引数の型注釈

TypeScriptでOptions Objectにデフォルト引数をもたせたい場合は、引数名のところにデフォルト値を書いた上で、オブジェクト型の型注釈にてオプションプロパティを指定する`?`を書きます。

```ts twoslash
function func({ x, y = 0, z = 0 }: { x: number; y?: number; z?: number }) {
  console.log(x, y, z);
}

func({ x: 1, y: undefined });
// @log: 1 0 0
```

## Option Object自体をオプショナルにする方法

TypeScriptでOptions Object自体を渡さなくても関数を呼び出せるようにするには、Options Objectのデフォルト値として空のオブジェクト`{}`を指定するとできます。

```ts twoslash
type Options = {
  x?: number;
  y?: number;
  z?: number;
};

function func({ x = 0, y = 0, z = 0 }: Options = {}) {
  console.log(x, y, z);
}

func();
// @log: 0 0 0
```

<TweetILearned>

・Pythonのキーワード引数相当の構文はJavaScript/TypeScriptにはない
・代わりにOptions Objectパターンが使える
・このパターンのメリット:
①引数の値が何を指すのか分かりやすい
②引数追加時に古いコードを壊さない
③デフォルト引数が省略できる

</TweetILearned>

## 関連情報

[Partial&lt;T>](../type-reuse/utility-types/partial.md)
