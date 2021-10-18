# 判別可能なユニオン \(discriminated union\)

次のようなタイプエイリアスの`SuccessResponse, ErrorResponse`を考え、そのユニオン型として`Response`を考えます。

```typescript
type SuccessResponse = {
  success: true;
  response: Data;
};

type ErrorResponse = {
  success: false;
  error: Error;
};

type Response = SuccessResponse | ErrorResponse;
```

ユニオン型の`Response`はふたつのタイプエイリアスが持つ`success`を共通のプロパティとして持ちますが片方は`true`でもう片方は`false`です。ここは`boolean`型とせず**あえてリテラル型にしています**。

そしてこの`Request`を返す関数`req()`があり、それを呼び戻り値を定数`res`で受けたとすると次のようなことができます。

```typescript
const res: Response = req();

if (res.success) {
  // res.response ...
} else {
  // res.error ...
}
```

`if`の条件が`true`になる、つまり`res.success`が`true`になるとそのブロックでは`res.response`を呼び出せます。一方`else`のブロックでは`res.error`を呼び出せます。これは`res.success`が`true`の場合は`SuccessResponse`であることが確定し`false`の場合は`ErrorResponse`であることが確定するからです。

値があるかもしれないしないかもしれないことを意味するモナドの`Optional`をユニオン型を使って表現するとこのようになるでしょう。

```typescript
type Some<T> = {
  present: true;
  value: T;
};

type None = {
  present: false;
};

type Optional<T> = Some<T> | None;
```

リテラル型を使えば`true, false`に限らず他の型でも可能です。

```typescript
type English = {
  iso639: 'en';
  thanks: 'thank you very much';
};

type French = {
  iso639: 'fr';
  merci: 'merci beaucoup';
};

type German = {
  iso639: 'de';
  danke: 'danke schön';
};

type Langauge = English | French | German;

const lang: Langauge = select();

switch(lang.iso639) {
  case 'en':
    return lang.thanks;
  case 'fr':
    return lang.merci;
  case 'de':
    return lang.danke;
}
```

上記例では`lang.iso639`がそれに該当します。

リテラル型でなくても他の型どうしであればTypeScriptはこの判別を自動的にしてくれます。

```typescript
type Measurement = {
  b: number;
  w: number;
  h: number;
};

type TopSecret = {
  b: 'secret';
  w: 'secret';
  h: 'secret';
};

type ThreeSize = Measurement | TopSecret;

const size: ThreeSize = measure();

if (size.b === 'secret') {
  console.log(size.w);
  // -> 'secret'
  console.log(size.h);
  // -> 'secret'
}
```

スリーサイズを公表したくない人は`'secret'`という文字をどこかひとつでもに入れておけば`TopSecret`型であると判別され、対応する`if`ブロックではすべてのサイズは`'secret'`になります。

