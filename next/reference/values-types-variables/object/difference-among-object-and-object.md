# object、Object、{}の違い

これらは大変よく似ています。どれもオブジェクトの型の定義にどれも使うことができます。

```typescript
const a: object = {};
const b: Object = {};
const c: {} = {};
```

また、相互に入れ替えが可能です。

```typescript
const d: object = a;
const e: object = b;
const f: object = c;

const g: Object = a;
const h: Object = b;
const i: Object = c;

const j: {} = a;
const k: {} = b;
const l: {} = c;
```

`object`はプリミティブ型ではないので、すべてのリファレンス型を総称するものとして定義されています。

`Object`はTypescriptで型の定義がされているインターフェースです。そのため`.`を入力すればオブジェクトが持っているメソッドの入力補完ができます。

`{}`はプロパティ、メソッドを持たないオブジェクトリテラルの型定義です。こちらも`object`と同様に入力補完はできません。

### プリミティブ型を代入する

当然ながらプリミティブ型はオブジェクトではありません。そのため、そもそも代入できないのではと思われるかもしれませんが、次のようになります。

```typescript
const object1: object = undefined;
// Type 'undefined' is not assignable to type 'object'.
const object2: object = null;
// Type 'null' is not assignable to type 'object'.
const object3: object = false;
// Type 'false' is not assignable to type 'object'.
const object4: object = 0;
// Type '0' is not assignable to type 'object'.
const object5: object = '';
// Type '""' is not assignable to type 'object'.
const object6: object = Symbol();
// Type 'unique symbol' is not assignable to type 'object'.
const object7: object = 10n;
// Type '10n' is not assignable to type 'object'.

const iObject1: Object = undefined;
// Type 'undefined' is not assignable to type 'Object'.
const iObject2: Object = null;
// Type 'null' is not assignable to type 'Object'.
const iObject3: Object = false;
const iObject4: Object = 0;
const iObject5: Object = '';
const iObject6: Object = Symbol();
const iObject7: Object = 10n;

const literal1: {} = undefined;
// Type 'undefined' is not assignable to type '{}'.
const literal2: {} = null;
// Type 'null' is not assignable to type '{}'.
const literal3: {} = false;
const literal4: {} = 0;
const literal5: {} = '';
const literal6: {} = Symbol();
const literal7: {} = 10n;
```

`object`と異なり、`Object, {}`は`boolean, number, string, symbol, bigint`型の変数に代入ができてしまいます。

これはTypesScriptの設計がおかしいわけではなくJavaScriptが元々持っているAutoboxingを意味します。

### Autoboxing \(プリミティブ型の対応するラッパークラスとの自動変換\)

文字数カウントをしたいときは`str.length`とすれば文字数が得られます。数値を文字列にしたいときは\(テンプレートリテラルを使わなければ\)`num.toString()`とすれば文字列が得られます。

プリミティブ型はオブジェクトではないのでプロパティやメソッドを持っていないはずです。ですがこのようなことができるのは、内部的にはJavaScriptがプリミティブ型の値をオブジェクトに変換しているからです。この暗黙の型変換をAutoboxingと呼びます。

ちなみにこのときに使われるオブジェクトを通称ラッパークラスと呼び、それらのインターフェースもTypeScriptに`Boolean, Number, String, Symbol, BigInt`として定義されています。なお`undefined`と`null`のラッパークラスはありません。

```typescript
const bool: Boolean = false;
const num: Number = 0;
const str: String = '';
const sym: Symbol = Symbol();
const big: BigInt = 10n;
```

当然ながらラッパークラスは`Object`をスーパークラスに持っているため、変数の型として`Object, {}`が定義されてしまうとAutoboxingをしたものと解釈され、代入ができます

