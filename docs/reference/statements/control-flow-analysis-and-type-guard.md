# 制御フロー分析と型ガードによる型の絞り込み

TypeScriptは制御フローと型ガードにより、処理の流れに応じて変数の型を絞り込むことができます。

## ユニオン型と曖昧さ

ユニオン型で変数の型注釈を書いた時に、片方の型でしか定義されていないメソッドやプロパティにアクセスをすると型エラーが発生します。

```ts twoslash
// @errors: 2339
function showMonth(month: string | number) {
  console.log(month.padStart(2, "0"));
}
```

これは`month`の変数が`string`or`number`型のどちらかになる可能性があり`number`型が渡された時に未定義なメソッドへのアクセスが発生する危険があるためです。

## 制御フロー分析

TypeScriptは`if`や`for`ループなどの制御フローを分析することで、コードが実行されるタイミングでの型の可能性を判断しています。

先ほどの例に`month`変数が`string`型であることを条件判定を追加することで`month.padStart()`の実行時は`month`が`string`型であるとTypeScriptが判断し型エラーを解消することができます。

```ts twoslash
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
  }
}
```

もう少し複雑な例を見てみましょう。

次の例では`month.toFixed()`の呼び出しは条件分岐のスコープ外であり`month`変数の型が`string | number`となるため型エラーが発生します。

```ts twoslash
// @errors: 2339
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
  }
  console.log(month.toFixed());
}
```

この関数の最初の条件分岐の中に`return`を追記して早期リターンで関数の処理を終了させてみます。

```ts twoslash
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
    return;
  }
  console.log(month.toFixed());
}
```

この変更によりエラーとなっていた`month.toFixed()`のメソッド呼び出しの型エラーが解消されます。

これは制御フロー分析により`month`変数が`string`型の場合は早期リータンにより関数が終了し、`month.toFixed()`が実行されるタイミングでは`month`変数は`number`型のみであるとTypeScriptが判断するためです。

## 型ガード

制御フローの説明において、型の曖昧さを回避するために`if(typeof month === "string")`という条件判定で変数の型を判定して型の絞り込みを行いました。

このような型チェックのコードを型ガードと呼びます。

### typeof

代表的な例は`typeof`演算子を利用した型ガードです。

[typeof演算子](../values-types-variables/typeof-operator.md)

次の例では`typeof`で`month`変数の型を`string`型と判定しています。

```ts twoslash
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
  }
}
```

`typeof`の型ガードでは`typeof null === "object"`となる点に注意が必要です。

JavaScriptにおいて`null`はオブジェクトであるため、次の型ガードを書いた場合は`date`変数は`Date | null`に絞り込まれ`null`となる可能性が残ってしまい型エラーが発生します。

```ts twoslash
// @errors: 2531
function getMonth(date: string | Date | null) {
  if (typeof date === "object") {
    console.log(date.getMonth() + 1);
  }
}
```

`date != null`の型ガードを追加することで型エラーを解消できます。

```ts twoslash
function getMonth(date: string | Date | null) {
  if (typeof date === "object" && date != null) {
    console.log(date.getMonth() + 1);
  }
}
```

### instanceof

`typeof`でインスタンスを判定した場合はオブジェクトであることまでしか判定ができません。
特定のクラスのインスタンスであることを判定する型ガードを書きたい場合は`instanceof`を利用します。

```ts twoslash
function getMonth(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.getMonth() + 1);
  }
}
```

### in

特定のクラスのインスタンスであることを明示せず、`in`演算子でオブジェクトが特定のプロパティを持つかを判定する型ガードを書くことで型を絞り込むこともできます。

```ts twoslash
interface Wizard {
  castMagic(): void;
}
interface SwordMan {
  slashSword(): void;
}

function attack(player: Wizard | SwordMan) {
  if ("castMagic" in player) {
    player.castMagic();
  } else {
    player.slashSword();
  }
}
```

### ユーザー定義の型ガード関数

型ガードはインラインで記述する以外にも関数として定義することもできます。

```ts
function isWizard(player: Player): player is Wizard {
  return "castMagic" in player;
}

function attack(player: Wizard | SwordMan) {
  if (isWizard(player)) {
    player.castMagic();
  } else {
    player.slashSword();
  }
}
```

この名称(user-defined type guard)は英語としても長いらしく、型ガード関数(type guarding function, guard's function)と呼ばれることもあります。

[型ガード関数](../functions/type-guard-functions.md)

### 型ガードの変数代入

型ガードに変数を使うこともできます。
ただし、この文法は TypeScript4.4 以降のみで有効なため、使用する場合はバージョンに注意してください。

```ts twoslash
function getMonth(date: string | Date) {
  const isDate = date instanceof Date;
  if (isDate) {
    console.log(date.getMonth() + 1);
  }
}
```

## 関連情報

[any型](../values-types-variables/any.md)

[any vs unknown](any-vs-unknown.md)
