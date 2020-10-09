# プリミティブ型 \(Primitive types\)

TypeScriptはJavaScriptの機能を独自拡張しているわけではないため、JavaScriptにあるプリミティブ型をそのまま使うことができます。

## プリミティブ型とは

プリミティブ自体の意味は「単純である、シンプル」に近くただその値のみに意味があることを示しています。そのためプリミティブ型は一般的には振る舞いを持ちません。

### 振る舞いがないとは

振る舞いがないとは一般的にはメソッドを持たないことです。

```typescript
null.toString();
```

意図せずこのようにしてしまい実行時エラーになってしまった経験はあるかと思います。これは`null`が`toString()`という振る舞いを持っていないことに起因します。

とはいうもののJavaScriptにおいてプリミティブ型の多くはラッパークラスを持っています。それらはメソッド呼び出しがあれば実行時に`Autoboxing`によって対応するクラスのインスタンスに変換されるため、あたかもプリミティブ型が振る舞いを持つように見え、またそのように使うことができます。

// TODO 何か一言紹介前の前段階が欲しい

## `undefined`

値がないことを示す値です。他言語の`null`のように設定されなかった時に代入されます。

### 歴史的背景

以前はグローバルスコープの変数だったため上書きができました。そのため、その値が`undefined`であるかどうかの判定に対して`undefinied`との等値比較をすることが必ずしも正しくないことがありましたが、昨今の開発環境では代入ができないプロパティとして設定されています。そのため簡便に`undefined`との等値比較をすることでその値が`undefined`かどうかの判定ができます。

```typescript
if (whatIsThis === undefined) {
  // whatIsThis is undefined
}
```

古い環境で動作することを考慮する必要がある時や、かつての正しい判定を使いその値が`undefined`かどうかを安全に判定するには`typeof`を使います。

```typescript
if (typeof whatIsThis === 'undefined') {
  // whatIsThis is undefined
}
```

もしも`undefined`が別の値で上書きされたときは`void`演算子を使うことで`undefined`の戻り値を得ることができます。この時、`void`の右にある式にこだわりはなくどのような式でも構いません。多くの資料で`void 0`となっていることを確認できると思います。

```typescript
undefined = void 0;
```

TypeScriptでは戻り値の型では`void`\(これは上記演算子とは異なり、型です\)を使う方が望ましい場合が多いです。こちらの解説は関数のページをご覧ください。

{% page-ref page="function.md" %}

ラッパークラスはありません。

## `null`

値がないことを示す値です。他言語の`null`のような役割は`undefined`が担っていることが多く、こちらは意図的に値を指定しないことを強調できます。

`undefined`と異なりこちらはリテラルであり、上書きされる危険は考慮する必要がありません。等値比較も`null`との比較で問題ありません。

却って`typeof`で`null`を判定させると`'object'`となり、やや面倒です。

```typescript
if (typeof whatIsThis === 'object') {
  // whatIsThis is object or null
}
```

ラッパークラスはありません。

## `boolean`

真偽値と呼ばれる2値のみを持ちます。ラッパークラスは`Boolean`です。

## `number`

整数だけではなく実数を含めた数値を扱います。四則演算`+, -, *, /`に加え剰余`%`と累乗`**`ができます。

### メソッド呼び出し

数値リテラルに対し直接メソッド呼び出しをしたい場合は小数点とメソッドアクセスに使われる記号**`.`**が同じため注意が必要です。厳密には整数部しか持たない数値リテラルの時は**`.`**がふたつ必要です。

```typescript
5..toString();
// -> '5'
6.08.toString();
// -> '6.08'
```

### 2進数、8進数、16進数

10進数だけではなく2進数、8進数、16進数の表記も可能です。それぞれ表現したい数値の前に`0b, 0o, 0x`をつけます。

```typescript
0b1;
0o1;
0x1;
```

### `Numeric separator`

視認性を上げるために数値を`_`で区切ることができます。n桁ずつ区切るなどと言った決まりはなく、国や地域の慣習で自由に選択できます。

```typescript
const million: number = 10_000_00_0_00.0_000000_00;
```

しかしながら`_`を先頭や末尾、小数点の前後に置いたり、連続で2個以上置くことはできません。

### 特殊な値

`Infinity, -Infinity, NaN`という特殊な値を持っています。これらはリテラル型として扱うことができません。

{% page-ref page="literal-types.md" %}

`NaN`はいかなる値と等値比較しても`false`となる特殊な値で、その値が`NaN`であるかを判定したい時はこの性質を逆に利用します。

```typescript
function isNaN(n: number): boolean {
  return n !== n;
}
```

ラッパークラスは`Number`です。

## `string`

0文字以上の文字からなる文字列を扱います。`number`型と同じですが意味の異なる連結`+`の演算子を処理できます。

### 演算子の`+`

`string`型同士であれば単純でただの文字列の合成を意味します。

```typescript
const w1: string = 'World';
const w2: string = 'Wide';
const w3: string = 'Web';

console.log(w1 + w2 + w3);
// -> 'WorldWideWeb'
```

`string`型の変数を作成したい時は`'`か`"`のどちらかを使います。TypeScriptではこれらの差はありません。開始時の記号と終了時の記号が合っている必要と、途中にその文字が含まれている場合はエスケープされている必要があります。

```typescript
const palindrome1: string = 'ma\'am I\'m Adam.';
const palindrome2: string = "ma'am I'm Adam.";
```

### テンプレートリテラル

`', "`ではなく`````で囲むとテンプレートリテラルという文字列を作ることができます。テンプレートリテラルは`', "`で宣言されている`string`型と異なり

* 改行できる
* 変数展開できる

という利点があります。

#### 改行できる

テンプレートリテラルが導入されるまでは上のようにしなければいけなかった文字列が下のように書けるようになりました。

```typescript
console.log('                    _  _                       _');
console.log('                   (_)(_)                     | |');
console.log('                   (_)(_)                     | |');
console.log('   __ _  ___   ___  _  _  ______   __ _  _ __ | |_');
console.log('  / _` |/ __| / __|| || ||______| / _` || \'__|| __|');
console.log(' | (_| |\\__ \\| (__ | || |        | (_| || |   | |_');
console.log('  \\__,_||___/ \\___||_||_|         \\__,_||_|    \\__|');

console.log(`                   _  _                       _
                  (_)(_)                     | |
  __ _  ___   ___  _  _  ______   __ _  _ __ | |_
 / _\` |/ __| / __|| || ||______| / _\` || '__|| __|
| (_| |\\__ \\| (__ | || |        | (_| || |   | |_
 \\__,_||___/ \\___||_||_|         \\__,_||_|    \\__|`);
```

#### 変数展開できる

今までは`+`を使って調整していた文字列に、直感的に変数を代入できるようになりました。クエリのような制御構文を書いていると、`'`や`"`がJSの`string`型の開始、終了なのか制御文の開始終了なのかが非常に混乱するため、この変数展開で簡素にかけるのは便利です。

```typescript
const prefecture: string = 'Tokyo';
const paid: boolean = true;
const select1: string = 'SELECT * FROM customers JOIN users ON customers.user_id = users.user_id WHERE user.residence = "' + prefecture + '" AND user.paid = ' + paid + ';';
const select2: string = `SELECT * FROM customers JOIN users ON customers.user_id = users.user_id WHERE user.residence = "${prefecture}" AND user.paid = ${paid};`;
```

**\(注意\)** これは例です。実際にはSQLのクエリをこのようにして作成せず、プリペアドステートメントを使用してください。

## `symbol`

`symbol`はその値のみが一意になるように設計されているプリミティブ型です。`boolean, number, string`型は同じリテラルであれば等値比較が`true`になりますが`symbol`は必ず同じものでない限り`true`にはなりません。この性質はリファレンス型の等値比較に似ています。

```typescript
const sym1: symbol = Symbol('Dove is a symbol of peace');
const sym2: symbol = Symbol('Dove is a symbol of peace');

console.log(sym1 === sym1);
// -> true
console.log(sym1 === sym2);
// -> false
```

`Symbol()`は`symbol`型を返す関数ですが、ここに引数として同じ値を与えても同じ`symbol`を得ることはできません。

また見た目から`new Symbol()`としがちですが`Symbol()`はコンストラクタではないためこのように書くことはできません。

### `symbol`の使い方

`symbol`型はその一意性のために使われます。かつてJavaScriptはクラスのプロパティ、メソッドに対して可視性を与えることができませんでした。つまり外部からアクセスしてほしくないプロパティ、メソッドがあってもそれを隠蔽、保護する手段がありませんでした。

そのような外部からアクセスしてほしくないメソッドに対して`symbol`型の名前を与え、その`symbol`を外部に露出させないことで擬似的なprivateプロパティ、メソッドを実現していました。

```typescript
const sym = Symbol();


class S {
  exposedMethod() {
    return this[sym]();
  }

  [sym]() {
    return 'super secret data';
  }
}

module.exports = {
  S
};
```

メソッドの表記が不思議に見えますが`[sym]()`は`symbol`を使ったメソッド表記です。このメソッドにアクセスするために必要な`symbol`型の変数`sym`はこの`js`ファイルから露出していないため、外部からは見ることができません。

## `bigint`

`number`型よりも大きな整数を扱います。`number`型と同じように四則演算`+, -, *, /`に加え剰余`%`と累乗`**`ができます。

### 演算

`number`型と一緒に演算をすることはできず、どちらかに型を合わせる必要があります。

```typescript
2n + 3;
// Operator '+' cannot be applied to types '2n' and '3'.
```

`number`型が小数部を持っていない限り、より表現幅の広い`bigint`型に合わせる方が無難です。

```typescript
2n + BigInt(3);
// 5n
```

### `es2020`

`bigint`型の宣言は`number`型の宣言方法の末尾に`n`を付けるだけのように書いていますが、これは`tsconfig.json`の`target`が`es2020`以上の時限定の話になります。それ以外の`target`では`BigInt()`の関数を使って`bigint`型を作り出す必要があります。`tsconfig.json`の話は該当ページをご覧ください。

{% page-ref page="../handson/setting-tsconfig.json.md" %}

