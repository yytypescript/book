# ユニオン型 \(Union Types\)

大元が動的な型付言語であるJavaScriptのため、成功した時は`number`型を返すけれど、失敗した時は`false`を返すといった関数を提供するパッケージもあります。つまり`A`型のときもあれば`B`型の時もある。ということをひっくるめたい時にこのユニオン型が使えます。

## ユニオン型の宣言

上記例のユニオン型を受ける変数は以下のように宣言できます。

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

## 配列やジェネリクスで注意すること

以下のような宣言は、おそらく希望通りの結果になりません。

```typescript
string | number[];
Array<number> | string;
```

これは両方とも`string`型または`number[]`型であることを意味します。

正しくは以下です。特に配列を`array`方式で書いている時は`()`が必要になるので注意してください。

```typescript
(string | number)[];
Array<string | number>;
```

## TypeScriptはどう解釈するか

上記の関数`union()`の戻り値を受けた定数`numOrFalse`のあとに`.`をつけると`number`型と`boolean`型の**どちらもが持っているメソッド、プロパティ**が入力補完候補に表示されます。

以下のようなクラス`Beast`と`Bird`があったとします。

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

するとこのユニオン型を返す関数を受けた定数`creature`は`Beast`と`Bird`が**共に持つプロパティ、メソッド**が使用できます。つまりこの場合`creature.legs`と`creature.alive()`が入力補完候補として表示されます。

## ユニオン型で注意すること

ユニオン型になった元の型がもっているプロパティ、メソッドが同じでも戻り値の型が異なる場合は、その戻り値もまたユニオン型になります。  
以下のクラス`A, B`を考えます。

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

`uni.does()`は以下のようなメソッドとして解釈されます。

```typescript
const done: string | number = uni.does();
```

また同じメソッド名でありながら引数の型が違うメソッドがあれば、その引数もユニオン型になります。さらに戻り値の型も異なれば同じようにユニオン型になります。

つまり`uni.makes()`は以下のようなメソッドであると解釈されます。

```typescript
const made: string | number = uni.makes(arg: string | number);
```

この時、引数の型を確定させても、戻り値の型に影響を与えません。他の言語にあるようなオーバーロードのような現象は起こりません。例えば`uni.makes()`に`number`型を引数に入れたとしても、これは`uni.makes()`が`number`型を要求する`A`型と確定したと解釈されることはありません。

## ユニオン型から型を確定させる

JavaScriptはその変数がどの型かを確定させる機能があります。もちろんTypeScriptにも存在し、その機能を用いて型が確定できた場合、TypeScriptはその型として見なしてくれます。この時よく使うのは`typeof`と`instanceof`です。主にプリミティブ型に対しては`typeof`を、クラスに対しては`instanceof`を使えば問題ありません。

```typescript
const prim: number | string = unionPrimitive();

if (typeof prim === 'number') {
  prim
  return;
}

const creature: Beast | Bird = unionClass();

if (creature instanceof Bird) {
  creature
}
```

上記例では`typeof`で`number`型と確定した`if`のブロックの中、つまり4行目で`prim.`とすると`number`型のプロパティ、メソッドが入力補完候補として現れます。  
同様に`instanceof`で`Bird`と確定した`if`ブロックの中、つまり11行目で`creature.`とすると`Bird`のインスタンスが持つプロパティ、メソッドが表示されます。

## 判別可能なユニオン型\(Discriminated unions\)

以下のようなタイプエイリアスの`SuccessResponse, ErrorResponse`を考え、そのユニオン型として`Response`を考えます。

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

ユニオン型の`Response`は2つのタイプエイリアスが持つ`success`を共通のプロパティとして持ちますが片方は`true`でもう片方は`false`です。

そしてこの`Request`を返す関数`req()`があり、それを呼び戻り値を定数`res`で受けたとすると以下のようなことができます。

```typescript
const res: Response = req();

if (res.success) {
  // res.response ...
} else {
  // res.error ...
}
```

`if`の条件が`true`になる、つまり`res.success`が`true`になるとそのブロックでは`res.response`が入力補完候補として表示されるようになります。一方`else`のブロックでは`res.error`が入力補完候補として表示されるようになります。これは`res.success`が`true`の場合は`SuccessResponse`であることが確定し`false`の場合は`ErrorResponse`であることが確定するからです。

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

定数であれば`boolean`型の変数`true, false`に限らず他の型でも可能です。

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

`switch`を使いましたが、`switch`を使う際はfallthroughに注意してください。

## TypeScriptはこう解釈している

ユニオン型に所属するひとつのデータ型は、ユニオン型の派生型\(subtype\)として解釈されます。この使い方はジェネリクスで頻出します。

