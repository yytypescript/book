# 型ガード \(Type Guards\)

JavaScriptでは`typeof, instanceof`というその変数の型が何であるかを判別できる演算子があります。主に`typeof`はプリミティブ型に、`instanceof`はクラスに対して使います。

TypeScriptはこれらの演算子で型を判別したあと、その`if, case`ブロックではその変数はキャストをすることなくその型であるかのように振る舞うことができます。このTypeScriptの機能を型ガードと呼びます。以下は`typeof`の例です。`typeof`を`switch`で使用し、その結果を`case`で分岐させています。

```typescript
function toString(n: unknown): string {
  switch (typeof n) {
    case 'undefined':
      return 'undefined';
    case 'object':
      if (n === null) {
        return 'null';
      }
      return Object.prototype.toString.call(n);
    case 'number':
      return n.toExponential();
    case 'string':
      return n;
    default:
      return Object.prototype.toString.call(n);
  }
}
```

ここで注目していただきたいのは`case 'number'`の箇所です。ここで変数`n`は`unknown`型からこのブロックに限り`number`型としてみなされ`number`型のメソッドである`toExponential()`が使えるようになっています。

### ユニオン型と併用する

変数がある型AまたはBであるようなとき、TypeScriptではユニオン型を使い表現できます。ユニオン型については専門のページがあるため詳しい説明はそちらに譲ります。ここでは型がAまたはBであるときはユニオン型を使うと`A | B`と書くことができるということだけを覚えておいてください。

{% page-ref page="union-types.md" %}

ユニオン型はそのどちらか\(あるいはどれか\)が不確定であることを示していますが`typeof`または`instanceof`を使うことによってそのユニオン型からどの型であるかを確定させることができます。

```typescript
function toEuropeanNumber(n: string | null): string {
  if (typeof n === 'string') {
    // n is string
    console.log(n.split(',').join('.'));
  }

  // ...
}
```

型が確定しているのは`if`ブロックの中だけであり、そのブロックを抜けてしまうと変数は再び元の型として解釈されます。

```typescript
function toEuropeanNumber(n: string | null): string {
  if (typeof n === 'string') {
    // n is string
    console.log(n.split(',').join('.'));
  }

  // n is string | null
  console.log(n.split(',').join('.'));
  // Object is possibly 'null'.
}
```

上の例は`if`ブロックを抜けた後で`string`型のメソッドである`split()`を使おうとしているためTypeScriptから指摘を受けています。

型ガードを使うためには毎回`if`ブロックを用意しなければならないかというとそうではありません。つまり次のようにする必要はありません。

```typescript
function toEuropeanNumber(n: string | null): string {
  if (typeof n === 'string') {
    // n is string
    console.log(n.split(',').join('.'));
    return n.split(',').join('.');
  }
  if (n === null) {
    return 'NaN';
  }
  
  //return what?;
}
```

このようなときは`if`ブロックの中で`return`が行われている、あるいは`else`ブロックが使われていればTypeScriptはそれ以外の場合を想定してくれます。

#### `if`ブロックの中で`return`をした場合

次の例のようにあるユニオン型からひとつの型を確定させ、確定させた`if`ブロックで`return`が行われるとそのブロックを抜けたあとはユニオン型からその型を抜いたとしてTypeScriptは自動的に解釈してくれます。

```typescript
function toEuropeanNumber(n: string | null): string {
  if (typeof n === 'string') {
    // n is string
    console.log(n.split(',').join('.'));
    return n.split(',').join('.');
  }

  // n is null
  return 'null';
}
```

#### `if`ブロックに対応する`else`ブロックがある場合

この場合は`return`は必須ではありません。

```typescript
function toEuropeanNumber(n: string | null): string {
  if (typeof n === 'string') {
    // n is string
    console.log(n.split(',').join('.'));
  } else {
    // n is null
    return 'null';
  }
}
```

## Type Predicate

`typeof, instanceof`だけでは物足りず、自分でその変数が意図する型であるかを判定したくなることがあります。このようなときにType predicateを使うことができます。次の例は動物がアヒルかどうかを判定するその名も`isDuck()`です。

```typescript
function isDuck(animal: Animal): boolean {
  if (walksLikeDuck(animal)) {
    if (quacksLikeDuck(animal)) {
      return true;
    }
  }

  return false;
}
```

ですが、この関数は使用者に対してその変数がアヒルかどうかを伝えているだけです。TypeScriptに対してそれがアヒルであることを伝えるためには型アサーションが必要になります。

```typescript
if (isDuck(animal)) {
  const duck: Duck = animal as Duck;
  duck.quacks();
  // ...
}
```

`as`はTypeScriptにおけるキャストの一種です。名前を型アサーションと言いますが他の言語と異なりかなり強引な型変換ができてしまいますので使用には気をつけてください。

Type predicateは型アサーションをすることなくより賢くやろうものです。

### Type predicateの宣言

Type predicateの宣言は戻り値が`boolean`型の関数に対して適用でき、戻り値の型の部分を次のように書き替えます。

```typescript
function isDuck(animal: Animal): animal is Duck {
  // ...
}
```

これで関数`isDuck()`が`true`を返す時の`if`のブロックの中では`animal`は`Duck`型として解釈されるようになります。

```typescript
if (isDuck(animal)) {
  animal.quacks();
  // ...
}
```

しかしながら、これはあくまでもその型であるとTypeScriptに解釈させるだけなので、JavaScriptとして正しいということは断言できません。

```typescript
function isUndefined(value: unknown): value is undefined {
  return typeof value === 'number';
}
```

上記関数`isUndefined()`は明らかに誤っていますが、この誤りに対してTypeScriptは何も警告を出しません。

## Assertion Functions

やりたいことはほぼType predicateと同じです。Type predicateは`boolean`型の戻り値に対して使いましたがこちらは例外を投げるかどうかで判定します。上記関数`isDuck()`をAssertion functionsで書きかえると次のようになります。

```typescript
function isDuck(animal: Animal): asserts animal is Duck {
  if (walksLikeDuck(animal)) {
    if (quacksLikeDuck(animal)) {
      return;
    }
  }

  throw new Error('YOU ARE A FROG!!!');
}

// ...

isDuck(animal);

animal.quacks();
```

こちらはこの関数が呼ばれた後であればいつでも変数`animal`は`Duck`型として解釈されます。

## Type predicate, Assertion functionsのつかいかた

値が存在するかしないかを表現するとき、言語によっては`Optional`という入れ物のクラスを用意することがあります。このクラスを抽象クラスとして定義し、サブクラスに値が存在する`Some`と存在しない`None`を用意すると`Optional`にType predicateを使うことができます。

```typescript
abstract class Optional<T> {
  public abstract isPresent(): this is Some<T>;
}

class Some<T> extends Optional<T> {
  public isPresent(): this is Some<T> {
    return true;
  }
}

class None<T> extends Optional<T> {
  public isPresent(): this is Some<T> {
    return false;
  }
}
```

### Type predicateで注意すること

上記`Optional`の例が顕著なのですが、`optional.isPresent()`が`false`を返したからと言ってTypeScriptは変数`optional`が`None`であるとは解釈しません。あくまでも`Some`ではないと解釈されるだけです。

```typescript
if (optional.isPresent()) {
  // optional is Some<T>
} else {
  // optional is something else other than Some<T>
}
```

またType predicateは`false`の場合を定義することができません。つまり次のような定義はできません。

```typescript
public abstract isPresent(): this is Some<T>, this is not None<T>;
```

このような時は専用のメソッドを用意します。

```typescript
abstract class Optional<T> {
  // ...
  public abstract isPresent(): this is Some<T>;

  public abstract isAbsent(): this is None<T>;
}
```

ただしこの例の場合TypeScriptではユニオン型によって簡単に解決できます。ユニオン型については詳細の説明があるのでそちらをご参照ください。

{% page-ref page="union-types.md" %}

