# Kiểu this cho giá trị trả về của method và method chaining

## Fluent interface

Fluent interface có nghĩa là "giao diện trôi chảy", là cách thiết kế method sử dụng kỹ thuật method chaining (chuỗi method) để tạo code có khả năng đọc cao. Thường được dùng khi tạo class cung cấp domain-specific language (DSL).

Xét class `Operator` đơn giản có thể thực hiện các phép tính bốn phép toán:

```ts twoslash
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

Cần phải tách statement cho mỗi phép tính. Trong trường hợp này có thể sử dụng method chaining để liên tục các xử lý.

```ts twoslash
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

Thay đổi kiểu giá trị trả về của `op.sum(), op.subtract(), op.multiply(), op.divide()` thành `Operator`. Nhờ đó method chaining trở nên khả thi.

Giờ muốn mở rộng class `Operator` để thêm phép tính lũy thừa. Class mới `NewOperator` sẽ như sau:

```ts twoslash
class Operator {
  protected value: number;

  public constructor(value: number) {
    this.value = value;
  }
}
// ---cut---
// @errors: 2304
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

Tuy nhiên, class này không thể thực hiện phép tính sau:

```ts twoslash
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

class NewOperator extends Operator {
  public constructor(value: number) {
    super(value);
  }

  public power(value: number): NewOperator {
    this.value **= value;
    return this;
  }
}
// ---cut---
// @errors: 2339
const op: NewOperator = new NewOperator(2);
op.power(3).multiply(2).power(3);
```

Lý do là giá trị trả về của `op.multiply()` là `Operator`. Vì `Operator` không có method `power()` nên xảy ra vấn đề này.

Trong trường hợp như vậy, có thể đặt `this` cho giá trị trả về. Thay thế tất cả `Operator, NewOperator` trong giá trị trả về của class trên bằng `this` thì vấn đề được giải quyết.

```ts twoslash
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
