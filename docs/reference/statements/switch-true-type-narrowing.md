# switch (true)での型の絞り込み

## switch (true)

JavaScript では、`switch`文が受け取る条件式が`true`という値そのものである場合には、次のように`case`の値に式や変数を書いて評価対象にすることができます。

```js
const score = 55;

switch (true) {
  case score >= 90:
    console.log("A評価です");
    break;
  case score >= 70:
    console.log("B評価です");
    break;
  default:
    console.log("C評価です");
}
```

if-else 文で書く場合には次のようになります。

```js
const score = 55;

if (score >= 90) {
  console.log("A評価です");
} else if (score >= 70) {
  console.log("B評価です");
} else {
  console.log("C評価です");
}
```

ただし、`if`文とは異なり、`switch (true)`は`case`の式を評価した結果と`true`を厳密等価演算子(`===`)で比較するだけです。`case`の式がtruthyな値を返しても、それが`true`そのものでなければ一致しません。

```js twoslash
const name = "TypeScript";

switch (true) {
  case name:
    console.log("名前があります");
    break;
  default:
    console.log("名前がありません");
}
// @log: 名前がありません
```

truthyかどうかで分岐したい場合は、`case Boolean(name):`のように真偽値に変換します。

[switch文](./switch.md)

## 型の絞り込み

TypeScript 5.3 から、`switch (true)`の各`case`節の式が条件式として扱われ、型の絞り込みができるようになりました。

```ts twoslash
function handleStringOrNumber(value: string | number) {
  switch (true) {
    case typeof value === "string":
      return value.toUpperCase();
    //       ^?
    case typeof value === "number":
      return value.toFixed(2);
    //       ^?
    default:
      return value;
    //       ^?
  }
}
```

どの`case`節にも当てはまらない`default`節では、`value`の型は`never`になります。

ただし、TypeScript 5.2 以前では`case`節で型が絞り込まれないため、同じコードが次のようにコンパイルエラーになります。

<!--prettier-ignore-->
```ts title="TS 5.2以前" twoslash
function handleStringOrNumber(value: string | number) {
  switch (true) {
    case typeof value === "string":
      return value.toUpperCase();
// @error: Property 'toUpperCase' does not exist on type 'string | number'.
    case typeof value === "number":
      return value.toFixed(2);
// @error: Property 'toFixed' does not exist on type 'string | number'.
    default:
      return value;
  }
}
```

`typeof`だけでなく、[型ガード関数](../functions/type-guard-functions.md)による絞り込みも使えます。
`Array.isArray()`も`x is any[]`という型ガードとして定義されているため、同じように型が絞り込まれます。

```ts twoslash
const isBoolean = (x: unknown): x is boolean => typeof x === "boolean";

function f(x: unknown) {
  switch (true) {
    case isBoolean(x):
      return x;
    //       ^?
    case Array.isArray(x):
      return x;
    //       ^?
  }
}
```

## フォールスルーと型の絞り込み

`break`が無い分岐では[フォールスルー](./switch-fallthrough.md)が発生します。型の絞り込みもこの挙動を反映しており、`break`が無い場合は、前の節で絞り込んだ型と次の節の型がユニオン型として合わさります。

```ts twoslash
function f(x: unknown) {
  switch (true) {
    case typeof x === "string":
      console.log(x);
    //            ^?
    // ↓ breakがないため、次の節へフォールスルーする
    case Array.isArray(x):
      console.log(x);
    //            ^?
    // ↓ breakがないため、次の節へフォールスルーする
    case typeof x === "number":
      console.log(x);
      //          ^?
      break;
    // ↓ 直前の節にbreakがあるため、フォールスルーしない
    case typeof x === "boolean":
      console.log(x);
    //            ^?
  }
}
```

たとえば、`case Array.isArray(x):`の節では`x`の型が`string | any[]`に、`case typeof x === "number":`の節では`string | number | any[]`になります。一方、`break`で抜けた後の`case typeof x === "boolean":`の節では、`x`の型は`boolean`だけです。

意図しないフォールスルーには、この型の変化から気づくこともできます。コンパイラオプション`noFallthroughCasesInSwitch`を有効にしておけば、フォールスルーそのものがコンパイルエラーになります。

[noFallthroughCasesInSwitch](../tsconfig/nofallthroughcasesinswitch.md)

## 関連情報

`switch (true)`による型の絞り込みは、次のページでも解説しています。

[制御フロー分析と型ガードによる型の絞り込み](./control-flow-analysis-and-type-guard.md)
