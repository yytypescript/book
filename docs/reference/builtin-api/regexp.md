---
title: RegExp
---

RegExpは正規表現のためのJavaScriptの組み込みクラスです。組み込みなだけあり、リテラルでの表記とコンストラクタを利用した表記の2通りがあります。
このページではJavaScriptのRegExp型について触れ、正規表現そのものについては直接触れません。

リテラルでのRegExp型は`/`で検索したい文字を囲み、最後にフラグを書きます。一方コンストラクタでは第1引数が検索したい文字で、第2引数がフラグになります。次のRegExp型は同じものを指しています。

```ts twoslash
const regexp1 = /0(8|9)0-[0-9]{4}-[0-9]{4}/g;
const regexp2 = new RegExp("0(8|9)0-[0-9]{4}-[0-9]{4}", "g");
```

このとき`\`については、コンストラクタを利用する場合はふたつ書く必要があります。次のRegExp型は同じものを指します。

```ts twoslash
const regexp1 = /0(8|9)0-\d{4}-\d{4}/g;
const regexp2 = new RegExp("0(8|9)0-\\d{4}-\\d{4}", "g");
```

とくに、バックスラッシュ`\`1文字を検索したい場合、コンストラクタでは`\\\\`と4文字書く必要があるので注意してください。

動的に検索する対象を切り替えたい場合はコンストラクタを利用し、特に理由がなければリテラル記法を利用するのがよいでしょう。

## RegExpの操作

### 文字列に一致するものがあるかどうかを検査する - `Regexp.prototype.test()`

第1引数の文字列を正規表現で検索するには`test`メソッドを使います。
一致するものがある場合は`true`、そうでない場合は`false`を返します。

```ts twoslash
const regex = /日/;

console.log(regex.test("日曜日"));
// @log: true
```

### 文字列で一致するものの検索をする - `Regexp.prototype.exec()`

第1引数の文字列を正規表現で検索し、結果を`string[]`型で返します。
`string[]`の0番目はマッチした文字列を、1番目以降はキャプチャグループを設定したときに限りパターンにマッチした文字列を取得します。
一致するものがない場合は`null`を返します。

```ts twoslash
const regex = /(.日).*(.日).*(.日).*(.日).*(.日)/;
const results = regex.exec("03月01日は日曜日で祝日、晴れの日でした。");

console.log(results);
// @log: ["1日は日曜日で祝日、晴れの日", "1日", "は日", "曜日", "祝日", "の日"]
```

## string型のメソッドでRegExpを使うメソッド

### 文字列を検索する - `Regexp.prototype.match()`

文字列をRegExpで検索します。`Regexp.prototype.exec()`と同じように使うことができます。
結果は`string[]`型で返り、0番目はマッチした文字列を、1番目以降はキャプチャグループを設定したときにパターンにマッチした文字列を取得します。
一致するものがない場合は`null`を返します。

```ts twoslash
const regex = /(.日).*(.日).*(.日).*(.日).*(.日)/;
const str = "03月01日は日曜日で祝日、晴れの日でした。";

console.log(str.match(regex));
// @log: ["1日は日曜日で祝日、晴れの日", "1日", "は日", "曜日", "祝日", "の日"]
```

### `String.prototype.match()`で注意すること

RegExpにgのフラグがついている場合、完全一致した文字列の配列を返し、キャプチャグループを返さなくなります。

```ts twoslash
const regex1 = /(.日)/;
const regex2 = /(.日)/g;
const str = "03月01日は日曜日で祝日、晴れの日でした。";

console.log(str.match(regex1));
// @log: ["1日", "1日"]
console.log(str.match(regex2));
// @log: ["1日", "は日", "曜日", "祝日", "の日"]
```

## Named capturing groupsについて

キャプチャグループで名前を指定することができるNamed capturing groupsがありますが、残念ながらTypeScriptとの相性はよくありません。
次の例ではNamed capturing groupsとして`pref`と`ward`にはそれぞれ`"静岡県"`と`"磐田市"`がマッチしますがTypeScriptはそのプロパティに値が設定されていることを保証しません。値の取得はオプショナルチェーンを使うとよいでしょう。

```ts twoslash
const regex = /(?<pref>.+[都|道|府|県])(?<ward>.+[市|区|町|村])/gu;
const str = "静岡県磐田市気子島";
const match = regex.exec(str);

console.log(match?.groups?.pref);
// @log: "静岡県"
console.log(match?.groups?.ward);
// @log: "磐田市"

// @errors: 2532
```

[オプショナルチェーン](../values-types-variables/object/optional-chaining.md)
