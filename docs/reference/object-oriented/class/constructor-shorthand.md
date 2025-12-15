# Constructor shorthand

Không thể đặt access modifier cho tham số của method, nhưng constructor là trường hợp đặc biệt.

Khi khai báo access modifier cho tham số, ý nghĩa như sau:

| Access modifier | Mô tả                                                                                 |
| :-------------- | :------------------------------------------------------------------------------------ |
| (không khai báo)| Chỉ có thể truy cập trong method constructor                                         |
| public          | Có thể truy cập từ class hiện tại, class kế thừa và class đã instance hóa            |
| protected       | Có thể truy cập từ class hiện tại và class kế thừa                                   |
| private         | Chỉ có thể truy cập từ class hiện tại                                                |

Định nghĩa hai class `ConstructorInAccessModifier` và `ConstructorOutAccessModifier`.

Sự khác biệt duy nhất giữa hai class là có khai báo access modifier trong constructor hay không, chức năng hoàn toàn giống nhau.

```ts title="example.ts" twoslash
class ConstructorInAccessModifier {
  constructor(
    arg0: number,
    public arg1: number,
    protected arg2: number,
    private arg3: number
  ) {
    console.log({ arg0, arg1, arg2, arg3 });
  }
}

class ConstructorOutAccessModifier {
  public arg1: number;
  protected arg2: number;
  private arg3: number;
  constructor(arg0: number, arg1: number, arg2: number, arg3: number) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    console.log({ arg0, arg1, arg2, arg3 });
  }
}
```

Xem file JavaScript sau khi compile có thể xác nhận cả hai có chức năng giống hệt nhau.

```js title="example.js" twoslash
class ConstructorInAccessModifier {
  constructor(arg0, arg1, arg2, arg3) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    console.log({ arg0, arg1, arg2, arg3 });
  }
}
class ConstructorOutAccessModifier {
  constructor(arg0, arg1, arg2, arg3) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    console.log({ arg0, arg1, arg2, arg3 });
  }
}
```

Khi viết TypeScript, chức năng scope của mỗi access modifier có hiệu lực, nên property có thể truy cập từ instance chỉ là `arg1` được khai báo `public`.

```ts title="example.ts" twoslash
class ConstructorInAccessModifier {
  constructor(
    arg0: number,
    public arg1: number,
    protected arg2: number,
    private arg3: number
  ) {
    console.log({ arg0, arg1, arg2, arg3 });
  }
}

class ConstructorOutAccessModifier {
  public arg1: number;
  protected arg2: number;
  private arg3: number;
  constructor(arg0: number, arg1: number, arg2: number, arg3: number) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    console.log({ arg0, arg1, arg2, arg3 });
  }
}

// ---cut---
// @errors: 2339 2445 2341
const InAccess = new ConstructorInAccessModifier(1, 2, 3, 4);
InAccess.arg0;
InAccess.arg1;
InAccess.arg2;
InAccess.arg3;

const outAccess = new ConstructorOutAccessModifier(1, 2, 3, 4);
outAccess.arg0;
outAccess.arg1;
outAccess.arg2;
outAccess.arg3;
```

Tức là access modifier của tham số constructor chỉ đơn giản là cách viết tắt cho việc khai báo property.
