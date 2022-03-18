# unknown型

TypeScriptにはunknown型という型があります。これはこの型の変数の実体が何かわからないときに使うタイプセーフなany型です。
any型と同様にunknown型にはどのような値を代入してもエラーにはなりません。

```ts twoslash
let value: unknown;
value = 1; // OK
value = "string"; // OK
value = { name: "オブジェクト" }; // OK
```

## unknown型はタイプセーフ

any型はどのような型の変数にも代入できます。ただし、次の例ではboolean型、string型、object型には代入が失敗してほしいところです。

```ts twoslash
const value: any = 10;
const int: number = value;
const bool: boolean = value;
const str: string = value;
const obj: object = value;
```

一方、unknown型に代入した値はany型, unknown型をのぞき他の型には代入できません。

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

number型である変数`int`に対しても代入が失敗しているのはやりすぎではないかと思われるかもしれませんが、不明な型をタイプセーフに扱うとこのようになります。

また、unknown型はたとえその変数にある元の値の型がわかっていたとしてもいかなるプロパティへのアクセス、メソッドの呼び出しも許されません。

```ts twoslash
// @errors: 2571
const value: unknown = 10;

value.toFixed();

const obj: unknown = { name: "オブジェクト" };

obj.name;
```

## unknownの使い方

このような型、一体どのように使うべきなのかという疑問が出てくるかもしれませんが次のような使い道があります。

- any型よりも安全な型として使用する
- 型ガードを使って再び有効な型として使う

### any型よりも安全な型として使用する

こちらについてはany型とunknown型の比較をしているページがありますのでそちらを参照ください。

[anyとunknownの違い](any-vs-unknown.md)

### 型ガードを使って再び有効な型として使う

あるunknown型の引数を型ガードを使ってどの型であるかをTypeScriptに判定させることができます。
たとえば、オブジェクトを判定する型ガードの関数は次のようになります。

```ts twoslash
function isObject(value: unknown): value is object {
  if (typeof value === "object") {
    return value !== null;
  }

  return false;
}
```

unknown型が帰ってきた場合は型ガードや`typeof`、`instanceof`で欲しい型へと絞り込みます。
型を絞り込むことができればその時点で変数がその型であるように振る舞うことができるようになります。

```ts twoslash
function capitalize(value: unknown): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

この例ではunknown型の変数`value`が`typeof`によりifの中ではstring型であることが確定したため、string型のメソッドである`toUpperCase()`を使えるようになりました。

[型ガード関数](../functions/type-guard-functions.md)

[制御フロー分析](../statements/control-flow-analysis-and-type-guard.md)

### any型を返す関数の戻り値として代わりに使う

たとえば`JSON.parse()`は戻り値がany型ですが、代わりにunknown型を使うことで意図しないプロパティへのアクセスを防げます。

[any型](../values-types-variables/any.md)

### unknown型を配列型へと絞り込む

unknown型を配列型に絞り込みたいときは`Array.isArray()`を使います。使ったあとの配列はany[]型と判定されます。
このあとさらに各要素が希望する型であるかどうかを判定したい場合はそれぞれに型ガードを施します。

```ts
function isNumberArray(value: unknown): value is number[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((e) => {
    return typeof e === "number";
  });
}
```

### unknown型からオブジェクト型へ絞り込む

unknown型をオブジェクト型に絞り込みたいときに`typeof === "object"`を使うとキーとプロパティの定義されていないオブジェクトであるとされ、望む形のオブジェクトかどうかの判定ができません。そのようなときは一度希望する型とキーは同じではあるものの、プロパティの型がunknownである型を`Record<>`で作成してキャストし、その後各プロパティの型チェックをします。

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

このときの`Record<keyof Email, unknown>`型は次のようになります。

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};

type MayBeEmail = Record<keyof Email, unknown>;

const mayBeEmail: MayBeEmail = {
  //              ^?
  from: "",
  to: "",
  title: "",
  subject: "",
};
```

`Record<>`についての詳しい説明は専用に説明しているページがありますので併せて参照してください。

[Record<K, T>](../type-reuse/utility-types/record.md)

### unknown型を型アサーションに使う

通常、型アサーションではまったく異なる型へのキャストができません。

```ts twoslash
// @errors: 2352
const str = "a";
const num = str as number;
```

このようなときにunknown型を使うことができます。unknown型を使った型アサーションはどのような型へのキャストもできるため、目的の型にキャストする前に一度unknown型へのキャストを挟むことによってこれが可能になります。

```ts twoslash
// @errors: 2352
const str = "a";
const num = str as unknown as number;
```

ただし、このキャストは実際に値の型を変更しているのではなく、TypeScriptにその型であると認識させているだけなので型の安全性に問題が生じます。

[型アサーション](../values-types-variables/type-assertion-as.md)

### try-catchで捕捉される値の型

TypeScriptは4.4になって、投げられた例外がany型としてかunknown型のどちらかで捕捉されるかを選べるようになりました。
ですが、標準の設定では投げられた例外はany型なのでunknown型にしたい場合はtsconfig.jsonの設定を変える必要があります。

[useUnknownInCatchVariables](../tsconfig//useunknownincatchvariables.md)

## バリデーションライブラリ

unknown型を安全にキャストするためにはバリデーションを行う専門のライブラリがあります。ここでは有名なライブラリを紹介します。

[superstruct](https://docs.superstructjs.org/)
[zod](https://github.com/colinhacks/zod)
