# デフォルト型パラメータ

関数の引数にデフォルト値を指定するように、ジェネリクスでもデフォルトの型パラメーターを指定することができます。

例としてエラーイベントを表す、`MyErrorEvent` という型を定義してみます。この型は発生した任意のエラーオブジェクトとその種類を文字列で保持する型です。

```typescript
type MyErrorEvent<T> = {
    error: T;
    type: string;
}
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

例外処理を記述する時に `NetworkError`のように対応するエラークラスをすべて用意することはなく、標準の `Error` で対応してしまうケースも多くありますが、今の状態では `MyErrorEvent` のジェネリクスの型 `T` を常に指定する必要があり非常に面倒です。

```typescript
// 型 T が必須なので、MyErrorEvent<Error>と指定する必要がある。
// Generic type 'MyErrorEvent' requires 1 type argument(s)
const errorEvent: MyErrorEvent = { error: new Error('エラーです'), type: 'syntax' }
```

そこで、デフォルト型パラメーターとして `Error`を指定することで、ジェネリクスの型 `T`は必要な時だけ指定して、何も指定してない場合は自動で `Error` の型とすることができます。

```typescript
type MyErrorEvent<T = Error> = {
    error: T;
    type: string;
}

// デフォルト型パラメータを指定した事で Error の型指定を省略できる
const errorEvent: MyErrorEvent = { error: new Error('エラーです'), type: 'syntax' }
const networkErrorEvent: MyErrorEvent<NetworkAccessError> = { error: new NetworkAccessError('ネットワークエラーです'), type: 'nextwork' }
```

