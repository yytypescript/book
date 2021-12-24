# デフォルト型引数

関数の引数にデフォルト値を指定するように、ジェネリクスでもデフォルトの型引数を指定することができます。

例としてエラーイベントを表す`MyErrorEvent`という型を定義してみます。この型は発生した任意のエラーオブジェクトとその種類を文字列で保持する型です。

```ts
type MyErrorEvent<T> = {
  error: T;
  type: string;
};
```

この型は次のように利用できます。

```ts
class NetworkError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

const errorEvent: MyErrorEvent<Error> = {
  error: new Error("エラーです"),
  type: "syntax",
};
const networkErrorEvent: MyErrorEvent<NetworkError> = {
  error: new NetworkError("ネットワークエラーです"),
  type: "nextwork",
};
```

例外処理を記述する時に`NetworkError`のように対応するエラークラスをすべて用意することはなく、標準の`Error`で対応してしまうケースも多くありますが、今の状態では`MyErrorEvent`のジェネリクスの型`T`を常に指定する必要があり非常に面倒です。

```ts
// 型 T が必須なので、MyErrorEvent<Error>と指定する必要がある。
// Generic type 'MyErrorEvent' requires 1 type argument(s)
const errorEvent: MyErrorEvent = {
  error: new Error("エラーです"),
  type: "syntax",
};
```

そこで、デフォルト型引数として`Error`を指定することでジェネリクスの型`T`は必要な時だけ指定して、何も指定してない場合は自動で`Error`とすることができます。

```ts
type MyErrorEvent<T = Error> = {
  error: T;
  type: string;
};

// デフォルト型引数を指定した事で Error の型指定を省略できる
const errorEvent: MyErrorEvent = {
  error: new Error("エラーです"),
  type: "syntax",
};
const networkErrorEvent: MyErrorEvent<NetworkError> = {
  error: new NetworkError("ネットワークエラーです"),
  type: "nextwork",
};
```

## 型引数の制約と併用する

ある型の部分型であることを指定しながら、かつ省略時はデフォルト型を指定する合わせ技もできます。型引数の制約については専門のページがありますのでそちらを参照してください。

[型引数の制約](type-parameter-constraint.md)

`MyErrorEvent`に与えられる型`T`を`Error`のサブクラスに限定しつつ、省略時は`SyntaxError`としたい場合は次のような書き方になります。

```ts
type MyErrorEvent<T extends Error = SyntaxError> = {
  error: T;
  type: string;
};
```

型引数の制約とデフォルト型引数の両立をする場合はデフォルト型引数が制約を満たしている必要があります。

```ts
interface Serializable<T extends string | number = bigint> {
  value: T;

  toString(): string;
}
```

この例は`string | number`型に制約しているにもかかわらず、デフォルト型引数に`bigint`型を指定しています。そのため制約を満足することができずTypeScriptから指摘を受けます。

```text
TS2344: Type 'bigint' does not satisfy the constraint 'string | number'.
```

## デフォルト型引数をジェネリクスで指定する

ジェネリクスが複数あるとき、デフォルト型引数をデフォルト型引数で指定できます。

```ts
class Aubergine<A, B = A, C = B> {
  private readonly a: A;
  private readonly b: B;
  private readonly c: C;

  public constructor(a: A, b: B, c: C) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  // ...
}
```

デフォルト型引数は左から順に参照されるため、左にあるジェネリクスが右のジェネリクスを指定することはできません。

```ts
class Aubergine<A = B, B, C = B> {
  private readonly a: A;
  private readonly b: B;
  private readonly c: C;

  public constructor(a: A, b: B, c: C) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
```

```text
TS2744: Type parameter defaults can only reference previously declared type parameters.
```
