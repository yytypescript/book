---
sidebar_label: switch (true) による型の絞り込み
---

# `switch (true)` による型の絞り込み (`switch (true)` Narrowing)

一般的な条件分岐の方法として`switch`文があります。`switch`文は`case`節の値によって異なるコードを実行します。通常、`case`節には文字列や数値を指定しますが、TypeScript では`switch (true)`を使用すると、各`case`節で真偽値を返す式を評価できます。TypeScriptのコントロールフロー解析により、`true`と評価された`case`ブロック内では、その条件に基づいて型が自動的に絞り込まれます。

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

型の絞り込みであれば`instanceof`に対しても同様に使用することができます。次の例の`UserError`と`SystemError`は独自に`user`と`system`プロパティを持っているクラスです。`switch (true)`を使用して、どちらのエラーかを判別し、それぞれのプロパティにアクセスしています。

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

独自のユーザー定義型ガードを`switch (true)`に使用することもできます。

```ts twoslash
type Panda = string;
type Broccoli = number;
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
      console.log("I am a panda");
      break;
    case isBroccoli(value):
      console.log("I am broccoli");
      break;
    case isUser(value):
      console.log(value.name);
      break;
  }
}
```
