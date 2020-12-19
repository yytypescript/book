# デフォルト型パラメーター

関数の引数にデフォルト値を指定するように、ジェネリクスでもデフォルトの型パラメーターを指定することができます。

例としてエラーイベントを表す`MyErrorEvent`という型を定義してみます。この型は発生した任意のエラーオブジェクトとその種類を文字列で保持する型です。

```typescript
type MyErrorEvent<T> = {
    error: T;
    type: string;
};
```

この型は次のように利用できます。

```typescript
class NetworkError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

const errorEvent: MyErrorEvent<Error> = { error: new Error('エラーです'), type: 'syntax' }
const networkErrorEvent: MyErrorEvent<NetworkAccessError> = { error: new NetworkAccessError('ネットワークエラーです'), type: 'nextwork' }
```

例外処理を記述する時に`NetworkError`のように対応するエラークラスを全て用意することはなく、標準の`Error`で対応してしまうケースも多くありますが、今の状態では`MyErrorEvent`のジェネリクスの型`T`を常に指定する必要があり非常に面倒です。

```typescript
// 型 T が必須なので、MyErrorEvent<Error>と指定する必要がある。
// Generic type 'MyErrorEvent' requires 1 type argument(s)
const errorEvent: MyErrorEvent = { error: new Error('エラーです'), type: 'syntax' }
```

そこで、デフォルト型パラメーターとして`Error`を指定することでジェネリクスの型`T`は必要な時だけ指定して、何も指定してない場合は自動で`Error`とする事ができます。

```typescript
type MyErrorEvent<T = Error> = {
    error: T;
    type: string;
}

// デフォルト型パラメータを指定した事で Error の型指定を省略できる
const errorEvent: MyErrorEvent = { error: new Error('エラーです'), type: 'syntax' }
const networkErrorEvent: MyErrorEvent<NetworkAccessError> = { error: new NetworkAccessError('ネットワークエラーです'), type: 'nextwork' }
```

### 型パラメーターの制約と併用する

ある型の部分型であることを指定しながら、かつ省略時はデフォルト型を指定する合わせ技もできます。型パラメーターの制約については専門のページがありますのでそちらを参照してください。

{% page-ref page="type-parameter-constraint.md" %}

`MyErrorEvent`をに与えられる型`T`を`Error`のサブクラスに限定しつつ、省略時は`SyntaxError`としたい場合は次のような書き方になります。

```typescript
type MyErrorEvent<T extends Error = SyntaxError> = {
  error: T;
  type: string;
}
```

型パラメーターの制約とデフォルト型パラメーターの両立をする場合はデフォルト型パラメーターが制約を満たしている必要があります。

```typescript
interface Serializable<T extends string | number = bigint> {
  value: T;

  toString(): string;
}
```

この例は`string | number`型に制約しているにもかかわらず、デフォルト型パラメーターに`bigint`型を指定しています。そのため制約を満足することができずTypeScriptから指摘を受けます。

```typescript
TS2344: Type 'bigint' does not satisfy the constraint 'string | number'.
```

### デフォルト型パラメーターをジェネリクスで指定する

ジェネリクスが複数あるとき、デフォルト型パラメーターをデフォルト型パラメーターで指定できます。

```typescript
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

デフォルト型パラメータは左から順に参照されるため、左にあるジェネリクスが右のジェネリクスを指定することはできません。

```typescript
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

```typescript
TS2744: Type parameter defaults can only reference previously declared type parameters.
```

