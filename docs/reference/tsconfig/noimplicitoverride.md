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

```ts twoslash
class ToggleButton {
  protected _active: boolean;

  public constructor() {
    this._active = false;
  }

  public get active(): boolean {
    return this._active;
  }

  public enable(): void {
    this._active = true;
  }

  public disable(): void {
    this._active = false;
  }

  public push(): void {
    if (this._active) {
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

```ts twoslash
class ToggleButton {
  protected _active: boolean;

  public constructor() {
    this._active = false;
  }

  public get active(): boolean {
    return this._active;
  }

  public enable(): void {
    this._active = true;
  }

  public disable(): void {
    this._active = false;
  }

  public push(): void {
    if (this.active) {
      this.disable();
      // ...
      return;
    }
    this.enable();
    // ...
  }
}
// ---cut---
class ToggleCountButton extends ToggleButton {
  private _counter: number;

  public constructor() {
    super();
    this._counter = 0;
  }

  public enable(): void {
    this._counter++;
    this._active = true;
  }

  public disable(): void {
    this._counter++;
    this._active = false;
  }

  public get counter(): number {
    return this._counter;
  }
}
```

ここでスーパークラスの`ToggleButton`が「オンオフの切り替えにメソッドはふたつも要らない！セッターで十分だ」と変更されたとします。

```ts twoslash
class ToggleButton {
  protected _active: boolean;

  public constructor() {
    this._active = false;
  }

  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {
    this._active = active;
  }

  public push(): void {
    this._active = !this._active;
    // ...
  }
}
```

するとサブクラスでオーバーライドしたはずのメソッド`enable(), disable()`が意味のないメソッドとして残ることになります。

`noImplicitOverride`はオーバーライドしているメソッドに`override`キーワードをつけることによってスーパークラスに同名のメソッドがないかを確認させます。`override`キーワードがついているにもかかわらずオーバーライド元となるメソッドが存在しないと次のようなエラーが発生します。

```ts twoslash
class ToggleButton {
  protected _active: boolean;

  public constructor() {
    this._active = false;
  }

  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {
    this._active = active;
  }

  public push(): void {
    this._active = !this.active;
    // ...
  }
}
// ---cut---
// @noImplicitOverride: true
// @errors: 4113
class ToggleCountButton extends ToggleButton {
  private _counter: number;

  public constructor() {
    super();
    this._counter = 0;
  }

  public override enable(): void {
    this._counter++;
    this._active = true;
  }

  public override disable(): void {
    this._counter++;
    this._active = false;
  }

  public get counter(): number {
    return this._counter;
  }
}
```
