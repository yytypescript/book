# ユニオン型 \(Union type\)

値によっては複数の型をとりうるものが出てきます。例えば、関数で成功した時は`number`型を返すけれど、失敗した時は`false`を返すといったものがあります。`A`型のときもあれば`B`型のときもある。ということを表現したいときに用いるのがユニオン型\(union type\)です。

## ユニオン型の型注釈

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

次の関数`union()`の戻り値を受けた変数`numOrFalse`は`number`型と`boolean`型の**どちらもが持っているメソッド、プロパティ**を呼び出せます。

```typescript
function union(): number | false {
  return false;
}
const numOrFalse: number | false = union();
```

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

creature.legs;
creature.alive();
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

