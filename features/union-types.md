# ユニオン型 \(Union Types\)

値によっては複数の型をとりうるものが出てきます。例えば、関数で成功した時は`number`型を返すけれど、失敗した時は`false`を返すといったものがあります。`A`型のときもあれば`B`型のときもある。ということを表現したいときに用いるのがユニオン型\(union type\)です。

## ユニオン型の宣言

上記例のユニオン型を受ける変数は次のように宣言できます。

```typescript
const numOrFalse: number | false = union();
```

関数の戻り値についても同様に書くことができます。

```typescript
function union(): number | false {
  // ....
  return false;
}
```

タイプエイリアスに使うこともできます。

```typescript
type PHPLikeReturnValue = number | false;
```

型を`|`で並べるだけです。上記例は2つの例ですが、いくつでも並べることができます。

`|`は型のリストの冒頭に置くこともできます。型ごとに改行するときに、列が揃うので便利です。

```typescript
type ErrorCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405;
```

## 配列の要素にユニオン型を使うときの注意点

配列の要素としてユニオン型を用いる場合は、書き方に注意が必要です。例えば、`string`または`number`からなる配列の型を宣言することを考えてみましょう。`string`または`number`をユニオン型で表現すると`string | number`になります。配列型は要素の型に`[]`をつけて表現します。これをそのまま繋げて考えると、次のような型を思いつくかもしれませんが、これは間違いです。

```typescript
string | number[]
```

これは`string`型または`number[]`型であることになっているためです。正しくは以下です。特に配列を`array`で書いているときは`()`が必要になるので注意してください。

```typescript
(string | number)[]
```

## TypeScriptはどう解釈するか

上記の関数`union()`の戻り値を受けた定数`numOrFalse`は`number`型と`boolean`型の**どちらもが持っているメソッド、プロパティ**を呼び出せます。

次のようなクラス`Beast`と`Bird`があるとします。

```typescript
class Beast {
  public legs: number = 4;

  public walk(): void {
    // ...
  }

  public alive(): boolean {
    return true;
  }
}

class Bird {
  public legs: number = 2;
  public wings: number = 2;

  public fly(): void {
    // ...
  }

  public alive(): boolean {
    return true;
  }
}

function union(): Beast | Bird {
  // ...
}

const creature: Beast | Bird = union();

creature.
```

するとこのユニオン型を返す関数を受けた定数`creature`は`Beast`と`Bird`が**共に持つプロパティ、メソッド**を呼び出せます。つまりこの場合`creature.legs`と`creature.alive()`を使えます。

## ユニオン型で注意すること

ユニオン型になったクラスのプロパティもユニオン型になり、メソッドの戻り値もまたユニオン型になります。

次のクラス`A, B`を考えます。

```typescript
class A {

  public does(): number {
    return 1;
  }

  public makes(num: number): number {
    return num;
  }
}

class B {

  public does(): string {
    return '';
  }

  public makes(str: string): string {
    return str;
  }
}

function union(): A | B {
  // ...
}

const uni: A | B = union();
```

`uni.does()`は次のようなメソッドとして解釈されます。

```typescript
const done: string | number = uni.does();
```

`uni.makes()`は次のようなメソッドであると解釈されます。

```typescript
const made: string | number = uni.makes(arg: string | number);
```

このとき、引数の型をどちらかに確定させても戻り値の型に影響を与えません。他の言語にあるようなオーバーロードのような現象は起こりません。たとえば`uni.makes()`に`number`型を引数として与えたとしても、これは`uni.makes()`が`number`型を要求する`A`型と確定したと解釈されることはありません。

## 判別可能なユニオン型\(Discriminated Unions\)

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

## TypeScriptはこう解釈している

ユニオン型に所属するひとつのデータ型は、ユニオン型の派生型\(subtype\)として解釈されます。この使い方はジェネリクスで頻出します。

