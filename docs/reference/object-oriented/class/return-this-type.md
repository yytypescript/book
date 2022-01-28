# メソッド戻り値のthis型とメソッドチェーン

## fluent interface

fluent interfaceとは「流れるようなインターフェース」という意味で、method chaining(メソッドの連鎖)という小技を使って、可読性の高いコードを実現するメソッドの作り方のことです。よくドメイン固有言語(DSL)を提供するようなクラスを作るときに使われます。

四則演算ができる変哲もないクラス`Operator`を考えます

```ts
class Operator {
  protected value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public sum(value: number): void {
    this.value += value;
  }

  public subtract(value: number): void {
    this.value -= value;
  }

  public multiply(value: number): void {
    this.value *= value;
  }

  public divide(value: number): void {
    this.value /= value;
  }
}

const op: Operator = new Operator(0);

op.sum(5); // 5
op.subtract(3); // 2
op.multiply(6); // 12
op.divide(3); // 4
```

演算ごとにステートメントを分ける必要があります。このような場合メソッドチェインを使って処理を連続させることができます。

```ts
class Operator {
  protected value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public sum(value: number): Operator {
    this.value += value;
    return this;
  }

  public subtract(value: number): Operator {
    this.value -= value;
    return this;
  }

  public multiply(value: number): Operator {
    this.value *= value;
    return this;
  }

  public divide(value: number): Operator {
    this.value /= value;
    return this;
  }
}

const op: Operator = new Operator(0);
op.sum(5).subtract(3).multiply(6).divide(3); // 4
```

`op.sum(), op.subtract(), op.multiply(). op.divide()`の戻り値の型を`Operator`に変更しました。これによりメソッドチェインが可能になりました。

ここで、このクラス`Operator`を拡張して累乗の計算を追加したいとします。すると新しいクラス`NewOperator`は次のようになるでしょう。

```ts
class NewOperator extends Operator {
  public constructor(value: number) {
    super(value);
  }

  public power(value: number): NewOperator {
    this.value **= value;
    return this;
  }
}
```

ですが、このクラスでは次の演算ができません。

```ts
const op: NewOperator = new NewOperator(2);
op.power(3).multiply(2).power(3);
// Property 'power' does not exist on type 'Operator'.
```

これは`op.multiply()`の戻り値が`Operator`だからです。`Operator`には`power()`というメソッドがないためこのような問題が発生します。

このような時、戻り値に`this`を設定することができます。上記クラスの戻り値の`Operator, NewOperator`をすべて`this`に置き換えると問題が解消されます。

```ts
class Operator {
  protected value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public sum(value: number): this {
    this.value += value;
    return this;
  }

  public subtract(value: number): this {
    this.value -= value;
    return this;
  }

  public multiply(value: number): this {
    this.value *= value;
    return this;
  }

  public divide(value: number): this {
    this.value /= value;
    return this;
  }
}

class NewOperator extends Operator {
  public constructor(value: number) {
    super(value);
  }

  public power(value: number): this {
    this.value **= value;
    return this;
  }
}

const op: NewOperator = new NewOperator(2);
op.power(3).multiply(2).power(3); // 4096
```
