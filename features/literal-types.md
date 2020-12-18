# リテラル型 \(Literal Types\)

TypeScriptではプリミティブ型の中の一部だけを示すような型の表現も可能です。

## リテラル型とは

決め打った値を示す型です。例を見ることが何よりもわかりやすいので以下をご覧ください。

```typescript
const impossible: false = false;
const three: 3 = 3;
const radetzky: 'Radetzky' = 'Radetzky';
```

本来なら`boolean, number, string`と型を書くべきところにも値が入っているように見えるこれがリテラル型です。

リテラル型は`let`で宣言してもその値しか代入できません。代入できるのも同じリテラルだけです。

```typescript
let impossible: false = false;

impossible = false;
impossible = true;
// Type 'true' is not assignable to type 'false'.
```

### `const`と何が違うのか？

これでは定数の`const`と宣言していることと何が違うのかと疑問を持たれる方もいらっしゃるかと思います。`const`はESMAScriptで定められている定数の宣言であるのに対し、リテラル型はTypeScriptで用意されたその1値のみを許容する変数あるいは定数のことです。

TypeScriptによる型のサポートはあくまでもコーディング中の話であり、実際に動作する時は型のないJavaScriptになります。他の値が代入できないという制限はもはやなくなっている状態であり、これは上書きできないということが撤廃されていることを意味します。そのためリテラル型をあたかも定数のように使うことは避けてください。

```typescript
let impossible: false = false;
// ...
// Type assertion
impossible = true as false;
```

## リテラル型の使い方

リテラル型はのちに紹介されるユニオン型との相性がよく併用されます。ここではユニオン型とは`|`で区切られた型のどれかであるとだけ解釈してください。

{% page-ref page="union-types.md" %}

```typescript
let persons: 1 | 2 | 3 | 4 | 5 = 4;
```

変数`persons`は`1`から`5`までの値が格納できる変数ということを意味しています。もちろんそれ以外の値は代入できません。

```typescript
let persons: 1 | 2 | 3 | 4 | 5 = 6;
// Type '6' is not assignable to type '1 | 2 | 3 | 4 | 5'.
```

これはデータ型が異なるリテラル型同士でも可能です。

```typescript
let age: 'thirty five' | 35 = 35;
```

また、プリミティブ型、クラスのインスタンスを含むオブジェクト型ともユニオン型を構成することができます。

```typescript
const response: Response | null = ajax.get('https://....');
```

意図しない関数、メソッドの戻り値のときに`null`を返す例は\(この戻り値が好ましいかは置いておくとして\)このようになります。

## TypeScriptはこう解釈している

リテラル型はそのリテラルが所属するデータ型の派生型として解釈されます。この使い方はジェネリクスで頻出します。初めはプリミティブ型の派生型とは一体何かと面食らうことがあるかもしれません。

{% page-ref page="generics.md" %}

## リテラル型にできないリテラル

`number`型の`NaN, Infinity, -Infinity`はリテラル型として使うことができません。

```typescript
let inf: Infinity = Infinity;
// 'Infinity' refers to a value, but is being used as a type here. Did you mean 'typeof Infinity'?
let minInf: -Infinity = -Infinity;
// Type expected.
let nan: NaN = NaN;
// 'NaN' refers to a value, but is being used as a type here. Did you mean 'typeof NaN'?
```

