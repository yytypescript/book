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

先ほどの例に`month`変数が`string`型であることを条件判定を追加することで`month`の`padStart`メソッドの実行時は`month`が`string`型であるとTypeScriptが判断し型エラーを解消することができます。

```ts twoslash
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
  }
}
```

もう少し複雑な例を見てみましょう。

次の例では`month`の`toFixed`メソッドの呼び出しは条件分岐のスコープ外であり`month`変数の型が`string | number`となるため型エラーが発生します。

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

この変更によりエラーとなっていた`month`の`toFixed`メソッドの呼び出しの型エラーが解消されます。

これは制御フロー分析により`month`変数が`string`型の場合は早期リターンにより関数が終了し、`month`の`toFixed`メソッドが実行されるタイミングでは`month`変数は`number`型のみであるとTypeScriptが判断するためです。

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
// @errors: 18047
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
interface Swordsman {
  slashSword(): void;
}

function attack(player: Wizard | Swordsman) {
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

function attack(player: Wizard | Swordsman) {
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

```ts twoslash
function getMonth(date: string | Date) {
  const isDate = date instanceof Date;
  if (isDate) {
    console.log(date.getMonth() + 1);
  }
}
```

## `switch (true)` による型の絞り込み

`switch`文は`case`節の値によって異なるコードを実行します。通常、`case`節には文字列や数値を指定しますが、TypeScriptでは`switch (true)`を使用すると、各`case`節で真偽値を返す式を評価できます。`true`と評価された`case`ブロック内では、その条件に基づいて型が自動的に絞り込まれます。

```ts twoslash
function handleValue(value: string | number | boolean): void {
  switch (true) {
    case typeof value === "string":
      console.log(`String value: ${value.padStart(2, "0")}`);
      break;
    case typeof value === "number":
      console.log(`Number value: ${value.toFixed(2)}`);
      break;
    case typeof value === "boolean":
      console.log(`Boolean value: ${value}`);
      break;
    default:
      console.log("Unknown type");
  }
}
```

`typeof`に限らず`instanceof`に対しても同様に使用することができます。次の例の`UserError`と`SystemError`は独自に`user`と`system`プロパティを持っているクラスです。`switch (true)`を使用してどちらのエラーかを判別し、それぞれのプロパティにアクセスしています。

```ts twoslash
class UserError extends Error {
  public user: string;
  constructor(message: string) {
    super(message);
    this.user = "defaultUser";
    this.name = "UserError";
  }
}

class SystemError extends Error {
  public system: string;
  constructor(message: string) {
    super(message);
    this.system = "defaultSystem";
    this.name = "SystemError";
  }
}

// ---cut---
function handleError(error: UserError | SystemError): void {
  switch (true) {
    case error instanceof UserError:
      console.log(`User error for ${error.user}: ${error.message}`);
      break;
    case error instanceof SystemError:
      console.log(`System error for ${error.system}: ${error.message}`);
      break;
    default:
      console.log("Unknown error type");
  }
}
```

ユーザー定義型ガード関数を`switch (true)`に使用することもできます。

```ts twoslash
type Panda = {
  panda: string;
};
type Broccoli = {
  broccoli: number;
};
type User = {
  name: string;
};

const isPanda = (value: unknown): value is Panda => {
  return true;
};
const isBroccoli = (value: unknown): value is Broccoli => {
  return true;
};
const isUser = (value: unknown): value is User => {
  return true;
};

// ---cut---
function handleValue(value: Panda | Broccoli | User): void {
  switch (true) {
    case isPanda(value):
      console.log(`I am a panda: ${value.panda}`);
      break;
    case isBroccoli(value):
      console.log(`I am broccoli: ${value.broccoli}`);
      break;
    case isUser(value):
      console.log(`I am ${value.name}`);
      break;
  }
}
```

## 関連情報

[any型](../values-types-variables/any.md)

[any vs unknown](any-vs-unknown.md)
