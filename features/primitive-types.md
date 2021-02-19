# プリミティブ型 \(Primitive Types\)

TypeScriptはJavaScriptの機能を独自拡張しているわけではないため、JavaScriptにあるプリミティブ型をそのまま使うことができます。

## プリミティブ型とは

プリミティブ自体の意味は「単純である、シンプル」に近くただその値のみに意味があることを示しています。そのためプリミティブ型は一般的には振る舞いを持ちません。

### 振る舞いがないとは

振る舞いがないとはメソッドを持たないことです。

```typescript
null.toString();
```

意図せずこのようにしてしまい実行時エラーになってしまった経験はあるかと思います。これは`null`が`toString()`という振る舞いを持っていないことに起因します。

とはいうもののJavaScriptにおいてプリミティブ型の多くはラッパークラスを持っています。ラッパークラスを持つプリミティブ型の値はメソッド呼び出しがあれば実行時にAutoboxingによって対応するラッパークラスのインスタンスに変換されるため、あたかもプリミティブ型が振る舞いを持つように見え、またそのように使うことができます。

以下はJavaScriptに用意されているプリミティブ型の紹介です。

## `undefined`

値がないことを示す値です。他言語の`null`のように設定されなかったときに代入されます。

### 存在しないプロパティへのアクセス

オブジェクトに存在しないプロパティにアクセスしたときは`undefined`が返却されます。

```typescript
const str: any = 90;

str.length;
// -> undefined
```

JavaScriptでは配列は`number`型のプロパティを持つオブジェクトと解釈されているため、存在しないインデックスのアクセスも同様に`undefined`が返却されます。

```typescript
const fruits: string[] = ['Apple', 'Papaya', 'Tomato'];

fruits[7800000];
// -> undefined
```

### 歴史的背景

以前はグローバルスコープの変数だったため上書きができました。そのためその値が`undefined`であるかどうかの判定に対して`undefinied`との等値比較をすることが必ずしも正しくないことがありました。

昨今の環境においては`undefined`は代入ができないプロパティとして設定されているため`undefined`との等値比較をすることでその値が`undefined`かどうかの判定ができますが、古い環境で動作することも保証する必要がある時は`typeof`を使います。

```typescript
if (whatIsThis === undefined) {
  // whatIsThis is undefined
}
```

```typescript
if (typeof whatIsThis === 'undefined') {
  // whatIsThis is undefined
}
```

もしも`undefined`が別の値で上書きされた時は`void`演算子を使うことで`undefined`の戻り値を得ることができます。このとき`void`の右にある式にこだわりはなくどのような式でも構いません。多くの資料で`void 0`となっていることを確認できると思います。

```typescript
undefined = void 0;
```

これを等値比較に使うこともできます。

```typescript
if (whatIsThis === void 0) {
  // whatIsThis is undefined
}
```

### 型としての`undefined`

TypeScriptには型に`undefined`型が用意されていますがそれとは別に`void`型\(これは上記演算子とは異なり、型です\)も用意されています。戻り値の型として使う場合は`void`型の方がよく見られ、また望ましい場合が多いです。こちらの解説は関数のページをご覧ください。

{% page-ref page="function.md" %}

ラッパークラスはありません。

## `null`

値がないことを示す値です。他言語の`null`のような役割は`undefined`が担っていることが多く、こちらは意図的に値を指定しないことを強調できます。

`undefined`と異なりこちらはリテラルであり、上書きされる危険を考慮する必要がありません。等値比較も`null`との比較で問題ありません。かえって`typeof`を使うと戻り値が`'object'`となってしまいます。

```typescript
typeof null;
// -> 'object'
```

ラッパークラスはありません。

## `boolean`

真偽値と呼ばれる2値のみを持ちます。ラッパークラスは`Boolean`です。

## `number`

整数だけではなく実数を含めた数値を扱います。四則演算`+, -, *, /`に加え剰余`%`と累乗`**`ができます。

### メソッド呼び出し

数値リテラルに対し直接メソッド呼び出しをしたい場合は小数点とメソッドアクセスに使われる記号**`.`**が同じため注意が必要です。厳密には整数部しか持たない数値リテラルのときは**`.`**がふたつ必要です。

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

### Numeric Separator

視認性を上げるために数値を`_`で区切ることができます。n桁ずつ区切るなどといった決まりはなく、国や地域の慣習で自由に選択できます。

```typescript
const million: number = 10_000_00_0_00.0_000000_00;
```

しかしながら`_`を先頭や末尾、小数点の前後に置いたり、連続で2個以上置くことはできません。つまり次のような表記はできません。

```typescript
_100;
100_;
100_.0;
100._0;
1__00;
```

### 特殊な値

`Infinity, -Infinity, NaN`という特殊な値を持っています。これらはリテラル型として使うことができません。

{% page-ref page="literal-types.md" %}

`NaN`はいかなる値と等値比較しても`false`となる特殊な値で、その値が`NaN`であるかを判定したい時はこの性質を逆に利用します。

```typescript
function isNaN(n: number): boolean {
  return n !== n;
}
```

ラッパークラスは`Number`です。

## `string`

0文字以上の文字からなる文字列を扱います。`number`型と文字は同じですが意味の異なる連結`+`の演算子を処理できます。

### 演算子の`+`

`string`型同士であれば単純でただの文字列の合成を意味します。

```typescript
const w1: string = 'World';
const w2: string = 'Wide';
const w3: string = 'Web';

console.log(w1 + w2 + w3);
// -> 'WorldWideWeb'
```

`string`型の変数を定義したい時はシングルクォート`'`かダブルクォート`"`のどちらかを使います。TypeScriptではこれらの差はありません。開始時の記号と終了時の記号が合っている必要と、途中にその文字が含まれている場合はバックスラッシュ`\`でエスケープされている必要があります。

```typescript
const palindrome1: string = 'madam, I\'m Adam.';
const palindrome2: string = "madam, I'm Adam.";
```

### テンプレートリテラル\(テンプレートリテラル\)

バッククォート````````で囲むとテンプレートリテラルという文字列を作ることができます。テンプレートリテラルは`'` か `""` で宣言される`string`型と異なり

* 改行できる
* 変数展開できる

という利点があります。

#### 改行できる

テンプレートリテラルが導入されるまでは上のようにしなければいけなかった文字列が下のように書けるようになりました。

```typescript
console.log('                    _  _                       _');;
console.log('                   (_)(_)                     | |');
console.log('   __ _  ___   ___  _  _  ______   __ _  _ __ | |_');
console.log('  / _` |/ __| / __|| || ||______| / _` || \'__|| __|');
console.log(' | (_| |\\__ \\| (__ | || |        | (_| || |   | |_');
console.log('  \\__,_||___/ \\___||_||_|         \\__,_||_|    \\__|');

console.log(`                    _  _                       _
                   (_)(_)                     | |
   __ _  ___   ___  _  _  ______   __ _  _ __ | |_
  / _\` |/ __| / __|| || ||______| / _\` || '__|| __|
 | (_| |\\__ \\| (__ | || |        | (_| || |   | |_
  \\__,_||___/ \\___||_||_|         \\__,_||_|    \\__|`);
```

#### 変数展開できる

今までは`+`を使って調整していた文字列に、直感的に変数を代入できるようになりました。SQLのような制御構文を書いていると`'`や`"`がJavaScriptの`string`型の開始、終了の文字なのかそれとも制御文の開始、終了なのかで非常に混乱するため、この変数展開で簡潔にかけるのは便利です。

```typescript
const prefecture: string = 'Tokyo';
const paid: boolean = true;
const select1: string = 'SELECT * FROM customers JOIN users ON customers.user_id = users.user_id WHERE user.residence = "' + prefecture + '" AND user.paid = ' + paid + ';';
const select2: string = `SELECT *
  FROM customers
  JOIN users
  ON customers.user_id = users.user_id
  WHERE user.residence = "${prefecture}"
  AND user.paid = ${paid};`;
```

**\(注意\)** これは例です。実際にはSQLのクエリをこのようにして作成せず、プリペアドステートメントを使用してください。

ラッパークラスは`String`です。

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

そのような外部からアクセスしてほしくないメソッドに対して`symbol`型の名前を与え、その値を外部に露出させないことで疑似的なprivateプロパティ、メソッドを実現していました。

```typescript
const sym = Symbol();


class Sample {
  exposedMethod() {
    const secret = this[sym]();

    // ...

    return value;
  }

  [sym]() {
    return 'super secret data';
  }
}

module.exports = {
  Sample
};
```

メソッドの表記が不思議に見えますが`[sym]()`は`symbol`型を使ったメソッド表記です。このメソッドにアクセスするために必要な変数`sym`はこの`js`ファイルから露出していないため、外部からは見ることができません。

ラッパークラスは`Symbol`です。

## `bigint`

`number`型よりも大きな整数を扱います。`number`型と同じように四則演算`+, -, *, /`に加え剰余`%`と累乗`**`ができます。

### 宣言

`number`型と同様に数値リテラルを書くだけではなく、末尾に`n`をつけます。

```typescript
const bg1: bigint = 100n;
```

または`BigInt()`を使います。このとき`Bigint()`ではない\(`Int`は大文字から始まります\)ことに注意してください。

```typescript
const bg2: bigint = BigInt(100);
```

### 演算

`number`型と一緒に演算をすることはできません。どちらかに型を合わせる必要があります。

```typescript
2n + 3;
// Operator '+' cannot be applied to types '2n' and '3'.
```

`number`型が小数部を持っていない限り、より表現幅の広い`bigint`型に合わせる方が無難です。

```typescript
2n + BigInt(3);
// -> 5n
```

### es2020以前の場合

**宣言**において`bigint`型は`number`型の宣言方法の末尾に`n`をつけるだけで宣言ができるように書いていますがこれは tsconfig.json の `target`が`es2020`以上のときに限られます。  
それ以外の`target`では`BigInt()`の関数を使って`bigint`型を作り出す必要があります。tsconfig.jsonの話は該当ページをご覧ください。

{% page-ref page="../handson/tsconfig.json-settings.md" %}

ラッパークラスは`BigInt`です。こちらも`Int`が大文字になることに注意してください。

