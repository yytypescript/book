---
description: メソッドオーバーライドにoverrideキーワードを必須にする
---

# noImplicitOverride

`noImplicitOverride`はメソッドオーバーライドにoverrideキーワードを必須にするコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 4.3

## 解説

サブクラスがスーパークラスのメソッドを拡張したときに`override`のキーワードをメソッドの前に書くことを強制します。これはスーパークラスの拡張しているメソッドが取り除かれたり、名称が変更されたことを検知することに役立ちます。

たとえば、トグルボタン (クリックするとオン、オフを繰り返すボタン) のクラスが次のようになっているとします。

```ts
class ToggleButton {
  protected active: boolean;

  public constructor() {
    this.active = false;
  }

  public isActive(): boolean {
    return this.active;
  }

  public enable(): void {
    this.active = true;
  }

  public disable(): void {
    this.active = false;
  }

  public push(): void {
    if (this.isActive()) {
      this.disable();
      // ...
      return;
    }
    this.enable();
    // ...
  }
}
```

ここで値のオンオフの切り替えを何回したかを数えられるサブクラス`ToggleCountButton`を考えます。すると`ToggleCountButton`は次のようになります。

```ts
class ToggleCountButton extends ToggleButton {
  private counter: number;

  public constructor() {
    super();
    this.counter = 0;
  }

  public enable(): void {
    this.counter++;
    this.active = true;
  }

  public disable(): void {
    this.counter++;
    this.active = false;
  }

  public getCounter(): number {
    return this.counter;
  }
}
```

ここでスーパークラスの`ToggleButton`が「オンオフの切り替えにメソッドはふたつも要らない！セッターで十分だ」と変更されたとします。

```ts
class ToggleButton {
  protected active: boolean;

  public isActive(): boolean {
    return this.active;
  }

  public setActive(active: boolean): void {
    this.active = active;
  }

  public push(): void {
    if (this.isActive()) {
      this.setActive(false);
      // ...
      return;
    }
    this.setActive(true);
    // ...
  }
}
```

するとサブクラスでオーバーライドしたはずのメソッド`enable(), disable()`が意味のないメソッドとして残ることになります。

`noImplicitOverride`はオーバーライドしているメソッドに`override`キーワードをつけることによってスーパークラスに同名のメソッドがないかを確認させます。オーバーライドをしているにもかかわらず`override`のキーワードを付けずにこのオプションを有効にすると次のようなエラーが発生します。

```text
error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'ToggleButton'.

public enable(): void {
       ~~~~~~
error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'ToggleButton'.

public disable(): void {
       ~~~~~~~
```

逆に、オーバーライドしていないメソッドに`override`キーワードをつけると次のようなエラーが発生します。

```text
error TS4113: This member cannot have an 'override' modifier because it is not declared in the base class 'ToggleButton'.

public override enable(): void {
                ~~~~~~
error TS4113: This member cannot have an 'override' modifier because it is not declared in the base class 'ToggleButton'.

public override disable(): void {
                ~~~~~~~
```
