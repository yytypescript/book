---
description: Bắt buộc dùng override keyword khi override method
---

# noImplicitOverride

`noImplicitOverride` là compiler option bắt buộc dùng override keyword khi override method.

- Mặc định: `false`
- Phiên bản thêm vào: 4.3

## Giải thích

Bắt buộc phải viết keyword `override` trước method khi subclass override method của superclass. Điều này giúp phát hiện khi method đang được override bị xóa hoặc đổi tên trong superclass.

Ví dụ, giả sử có class của toggle button (button click để bật tắt lặp lại) như sau:

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

Giờ xét subclass `ToggleCountButton` có thể đếm số lần đã toggle on/off. `ToggleCountButton` sẽ như sau:

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

Giờ giả sử superclass `ToggleButton` được thay đổi thành "Không cần hai method để toggle on/off! Setter là đủ":

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

Khi đó các method `enable(), disable()` vốn được override trong subclass sẽ trở thành method vô nghĩa.

`noImplicitOverride` yêu cầu thêm keyword `override` vào method đang override để kiểm tra xem có method cùng tên trong superclass hay không. Khi có keyword `override` nhưng không tồn tại method để override sẽ báo lỗi như sau:

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
