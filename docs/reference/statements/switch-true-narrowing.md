---
sidebar_label: switch (true) による型の絞り込み
---

# `switch (true)` による型の絞り込み (`switch (true)` Narrowing)

一般的な条件分岐の方法として `switch` 文があります。`switch`文は`case`節の値によって異なるコードを実行します。通常、`case`節には文字列や数値ですが、TypeScript では `switch (true)` を使用して、特定の条件に基づいて型を絞り込むことができます。

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

型の絞り込みであれば`instanceof`に対しても使用することができます。次の例の`UserError`と`SystemError`はどちらも`Error`を継承したクラスであり、独自に`user`と`system`プロパティを持っています。`switch (true)`を使用して、どちらのエラーかを判別し、それぞれのプロパティにアクセスしています。

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
function handleError(error: Error): void {
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

独自のユーザー定義型ガードを使用して、`switch (true)`の条件をより明確にすることもできます。

```ts twoslash
type Admin = {
  type: "ADMIN";
  level: number;
};
type Organizer = {
  type: "ORGANIZER";
  validUntil: Date;
};
type User = {
  type: "USER";
  name: string;
};
type Account = Admin | Organizer | User;

const isAdmin = (account: Account): account is Admin => {
  return account.type === "ADMIN";
};
const isOrganizer = (account: Account): account is Organizer => {
  return account.type === "ORGANIZER";
};
const isUser = (account: Account): account is User => {
  return account.type === "USER";
};

function handleAccount(account: Account): void {
  switch (true) {
    case isAdmin(account):
      console.log(account.level);
      break;
    case isOrganizer(account):
      console.log(account.validUntil);
      break;
    case isUser(account):
      console.log(account.name);
      break;
  }
}
```

もっとも、この例は判別可能なユニオン型としても書けるので、あえて`switch (true)`を使う必要はありません。

[判別可能なユニオン型](../values-types-variables/discriminated-union.md)
