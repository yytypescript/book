# unknown型

TypeScriptのunknown型は、型が何かわからないときに使う型です。

unknown型にはどのような値も代入できます。

```ts twoslash
let value: unknown;
value = 1; // OK
value = "string"; // OK
value = { name: "オブジェクト" }; // OK
```

## unknown型は型安全なany型

unknown型はよく「型安全なany型」と言われ、any型と対比されます。

any型はどのような型の変数にも代入できます。

```ts twoslash
const value: any = 10;
const int: number = value;
const bool: boolean = value;
const str: string = value;
const obj: object = value;
```

一方、unknown型の値は具体的な型へ代入できません。

```ts twoslash
// @errors: 2322
const value: unknown = 10;
const int: number = value;
const bool: boolean = value;
const str: string = value;
const obj: object = value;

const any: any = value; // OK
const unknown: unknown = value; // OK
```

number型である変数`int`に対しても代入が失敗しているのは、やりすぎではないかと思われるかもしれませんが、不明な型を安全に扱うとこのようになります。

また、unknown型はプロパティへのアクセス、メソッドの呼び出しも許されません。

```ts twoslash
// @errors: 2571
const value: unknown = 10;
value.toFixed();

const obj: unknown = { name: "オブジェクト" };
obj.name;
```

anyとunknownの特性の違いの詳細は次のページをご覧ください。

[anyとunknownの違い](any-vs-unknown.md)

## unknownと型の絞り込み

unknownはanyよりも安全な不明型ですが、そのままでは実用できません。unknownの値を使うには、型を絞り込む必要があります。

型の絞り込みには`typeof`や`instanceof`などを条件式に含んだif文を使います。これは型ガードと呼ばれます。型ガードで絞り込むと、それ以降の処理では絞り込まれた型として扱えます。

```ts twoslash
const value: unknown = "";
// 型ガード
if (typeof value === "string") {
  // ここブロックではvalueはstring型として扱える
  console.log(value.toUpperCase());
}
```

この例ではunknown型の変数`value`が`typeof`によりifの中ではstring型であることが確定したため、string型のメソッドである`toUpperCase()`を使えるようになります。

型の絞り込みは、[型ガード関数]を使う方法もあります。

```ts twoslash
// 型ガード関数
function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
const value: unknown = { a: 1, b: 2 };
// 型ガード
if (isObject(value)) {
  console.log(Object.keys(value));
  //                      ^?
  // ここでは、valueはobject型として扱える
}
```

[型ガード関数]: ../functions/type-guard-functions.md

[制御フロー分析](../statements/control-flow-analysis-and-type-guard.md)

### unknown型を配列型に絞り込む

unknown型を配列型に絞り込みたいときは`Array.isArray()`を使います。加えて、さらに配列要素までチェックすると、より安全なチェック処理になります。

```ts twoslash
function isNumberArray(value: unknown): value is number[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every((e) => typeof e === "number");
}
```

### unknown型をオブジェクトの型に絞り込む

unknown型をオブジェクトの型に絞り込むには、`typeof`演算子を用います。

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return true;
}
```

このままでは、値が本当に`Email`型を満たしているかわかりません。`from`などのプロパティまでチェックしていないからです。チェックの正確さを高めるためには、各プロパティの型をチェックする必要があります。

```ts twoslash
// @noErrors
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // 各プロパティのチェック
  if (typeof value.from !== "string") {
    return false;
  }
  return true;
}
```

上のプロパティチェックは一見問題なさそうですが、実際は次のようなコンパイルエラーが発生します。

```ts twoslash
// @errors: 2339
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // ---cut---
  // 各プロパティのチェック
  if (typeof value.from !== "string") {
    return false;
  }

  return true;
}
```

これを回避するには、[型アサーション](../values-types-variables/type-assertion-as.md)を使って`Email`型に近づけます。このとき、型アサーションは`as Email`でも構いませんが、より型安全にするためにunknown型の[`Record`](../type-reuse/utility-types/record.md)を使うのがお勧めです。

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // 型アサーションでvalueをEmail型に近づける
  const email = value as Record<keyof Email, unknown>;
  // 各プロパティのチェック
  if (typeof email.from !== "string") {
    return false;
  }
  return true;
}
```

このときの`Record<keyof Email, unknown>`型は次のように、`Email`のプロパティがすべて`unknown`になった型となります。

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
type MayBeEmail = Record<keyof Email, unknown>;
//   ^?
```

最後に、各プロパティのチェックをすべて実装したチェック処理は次のようになります。

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const email = value as Record<keyof Email, unknown>;
  if (typeof email.from !== "string") {
    return false;
  }
  if (typeof email.to !== "string") {
    return false;
  }
  if (typeof email.title !== "string") {
    return false;
  }
  return typeof email.subject === "string";
}
```

:::info バリデーションライブラリも検討しよう

unknown型からobject型へ安全に絞り込むには、プロパティをひとつひとつチェックする必要があります。上の例を見た読者の中には、これを実装するのは大変だと思った方もいるのではないでしょうか。

チェックするプロパティ数が多い場合は、次のバリデーションライブラリを導入したほうがよいでしょう。

- [zod](https://github.com/colinhacks/zod)
- [superstruct](https://docs.superstructjs.org/)

これらのライブラリはチェック項目を宣言的に実装できるので、実装コストを抑えられたり、チェック処理の間違いが起きにくくなります。

:::

## unknownの用途

### any型の値をより安全にする

たとえば`JSON.parse()`は戻り値が[any型](../values-types-variables/any.md)です。このまま戻り値を取り回すと、もし存在しないプロパティにアクセスした場合に、実行時エラーになる危険性が残ります。

そこで一旦unknown型にしておくことで、存在しないプロパティへのアクセスにコンパイル時に気づきやすくなります。

```ts twoslash
const data: unknown = JSON.parse("...");
```

### 型アサーションの制約を回避する

通常、[型アサーション](../values-types-variables/type-assertion-as.md)では、まったく異なる型は指定できません。

```ts twoslash
// @errors: 2352
const str = "a";
const num = str as number;
```

このようなときにunknown型を使うことができます。unknown型はどのような型にも型アサーションできるため、目的の型の前に一度unknown型への型アサーションを挟むテクニックがあります。

```ts twoslash
// @errors: 2352
const str = "a";
const num = str as unknown as number;
```

ただし、型アサーションは実際に値の型をキャストしているのではなく、TypeScriptにその型であると認識させているだけなので型安全性の問題は残ります。

### try-catchで捕捉される値の型

TypeScriptは4.4になって、投げられた例外がany型としてかunknown型のどちらかで捕捉されるかを選べるようになりました。ですが、標準の設定では投げられた例外はany型なのでunknown型にしたい場合はtsconfig.jsonの設定を変える必要があります。

[useUnknownInCatchVariables](../tsconfig//useunknownincatchvariables.md)
