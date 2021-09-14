# void型 \(void type\)

ここで取り上げる`void`は型です。JavaScriptにある演算子ではありません。

主に戻り値で使われる型です。戻り値が`void`型であるとはその関数は戻り値を持っていないことを意味します。

JavaScriptにはこの型は存在せず`void`型の実際の値は`undefined`です。なぜTypeScriptは`undefined`ではなく、あえて`void`を用意したのでしょうか。

### 変数の型として使う

変数の型として`void`を使うことはほぼありませんが、使うことがあれば`void`は値`undefined`を代入する変数として使用できます。

```typescript
function returnUnfefined(): undefined {
  return undefined;
}

function returnVoid(): void {
}

const u1: undefined = returnUnfefined();
const u2: void = returnUnfefined();

const v1: undefined = returnVoid();
// Type 'void' is not assignable to type 'undefined'.
const v2: void = returnVoid();
```

```typescript
const v1: void = undefined;
const u1: undefined = undefined;
```

代入時は異なる挙動になります。`undefined`型の変数を`void`型の変数に代入することができる一方で`void`型の変数を`undefined`型の変数に代入することはできません。

```typescript
const v2: void = u1;
const u2: undefined = v1;
// Type 'void' is not assignable to type 'undefined'.
```

### 関数の引数として使う

変数同様、意図的に引数を`void`型にすることはほぼありませんが、後に登場するジェネリクスで必要になることがあります。

{% page-ref page="../generics.md" %}

何もしない関数を作ります。

```typescript
function doNothing1(arg: undefined): any {
  // NOOP
}

function doNothing2(arg: void): any {
  // NOOP
}
```

これらは引数の型が違うだけです。これらに先ほど定義した`void`型の変数と`undefined`型の変数を代入します。すると変数の型について説明したように`undefined`型を要求する関数`doNothing1()`に`void`型の変数を代入することはできません。

```typescript
doNothing1(u1);
doNothing1(v1);
// Argument of type 'void' is not assignable to parameter of type 'undefined'.
doNothing2(u1);
doNothing2(v1);
```

さらに`void`型を引数に指定した関数`doNothing2()`は引数を省略することができるようになります。

```typescript
doNothing1();
// Expected 1 arguments, but got 0.
doNothing2();
```

この引数の`void`型の挙動はオプション引数の`?`に似ています。

```typescript
function distance1(p1: Point, p2?: Point): number {
  // ...
}

function distance2(p1: Point, p2: Point | void): number {
  // ...
}
```

### 関数の戻り値として使う

`void`の用途はほぼこれです。戻り値の型を`void`型にすると`return`を書かなくてもよい関数を作ることができます。今度は戻り値に`void`と`undefined`を設定した何もしない関数を作ります。

```typescript
function doNothing1(): undefined {
  //
};

function doNothing2(): void {
  //
};

doNothing1();
doNothing2();
```

すると`undefined`を戻り値に指定した関数`doNothing1()`に次のような指摘が現れます。

```typescript
A function whose declared type is neither 'void' nor 'any' must return a value.
```

これは戻り値が`void`型でも`any`型でもない関数は`return`を省略できないことを意味しています。この指摘を回避するためには`doNothing1()`は明示的に`undefined`を返すか値を書かない`return`が必要です。

次のどちらかであれば`doNothing1()`はTypeScriptから指摘を受けません。

```typescript
function doNothing1(): undefined {
  return;
};

function doNothing1(): undefined {
  return undefined;
};
```

### `void`とは

これらを考慮すると`undefined`型は`undefined`という1値だけを持つ型なのに対し`void`型はそれに加えて何も書かなかった時に代入される非明示の`undefined`の2値を持っている型といえます。

