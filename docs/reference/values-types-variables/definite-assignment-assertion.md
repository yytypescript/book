---
sidebar_label: Definite assignment assertion
---

# Definite assignment assertion

Definite assignment assertion là toán tử cho compiler TypeScript biết rằng biến hoặc property chắc chắn đã được khởi tạo.

## `strictNullChecks` và lỗi khởi tạo biến

Khi compiler option [`strictNullChecks`](../tsconfig/strictnullchecks.md) được đặt là `true`, TypeScript sẽ báo lỗi khi tham chiếu đến biến chưa được khởi tạo.

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num: number;
console.log(num * 2);
```

Ngay cả khi biến rõ ràng được khởi tạo bên trong một function, compiler vẫn báo lỗi rằng biến chưa được khởi tạo.

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num: number;
initNum(); // Khởi tạo num trong function nhưng...
console.log(num * 2);
function initNum() {
  num = 2;
}
```

## `strictPropertyInitialization` và lỗi khởi tạo property

Trong TypeScript, khi cả hai compiler option sau đều là `true`, sẽ báo lỗi nếu property của class chưa được khởi tạo.

- [`strictNullChecks`](../tsconfig/strictnullchecks.md)
- [`strictPropertyInitialization`](../tsconfig/strictpropertyinitialization.md)

```ts twoslash
// @strictPropertyInitialization: true
// @strictNullChecks: true
// @errors: 2564
class Foo {
  num: number;
}
```

TypeScript compiler kiểm tra xem property có được khởi tạo tại định nghĩa property hoặc trong `constructor` hay không. Tuy nhiên, nó không theo dõi việc khởi tạo trong các method khác ngoài `constructor`. Ví dụ, trong ví dụ sau, `num3` thực tế được khởi tạo, nhưng compiler vẫn cảnh báo rằng nó chưa được khởi tạo.

```ts twoslash
// @strictPropertyInitialization: true
// @strictNullChecks: true
// @errors: 2564
class Foo {
  num1: number = 1; // Đã khởi tạo
  num2: number;
  num3: number;

  constructor() {
    this.num2 = 1; // Đã khởi tạo
    this.initNum3(); // Khởi tạo num3
  }

  initNum3() {
    this.num3 = 1;
  }
}
```

## Sử dụng definite assignment assertion

Để cho compiler biết rằng biến hoặc property chắc chắn đã được khởi tạo, sử dụng definite assignment assertion. Viết `!` sau tên biến hoặc tên property trong khai báo.

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num!: number;
//     ^Definite assignment assertion
initNum();
console.log(num * 2); // Không còn lỗi
function initNum() {
  num = 2;
}
```

```ts twoslash
// @strictPropertyInitialization: true
// @strictNullChecks: true
class Foo {
  num!: number;
  // ^Definite assignment assertion
}
```

## Non-null assertion

Một phương pháp khác là sử dụng non-null assertion. Trong trường hợp này, viết `!` sau biến tại nơi tham chiếu đến biến.

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num: number;
initNum();
console.log(num! * 2); // Không còn lỗi
//             ^Non-null assertion
function initNum() {
  num = 2;
}
```

## Viết code an toàn hơn

Definite assignment assertion và non-null assertion chuyển trách nhiệm đảm bảo an toàn type từ compiler sang programmer. Và về type, con người dễ mắc sai lầm hơn compiler. Vì vậy, không sử dụng các assertion này sẽ an toàn hơn.

Ví dụ, trong ví dụ trên, việc gán giá trị trả về của `initNum` cho `num` sẽ là code an toàn hơn.

```ts twoslash
// @strictNullChecks: true
let num: number;
num = initNum();
console.log(num * 2);
function initNum() {
  return 2;
}
```

Ngoài ra, còn có phương pháp kiểm tra xem `num` có phải là kiểu number hay không bằng type guard.

```ts twoslash
// @strictNullChecks: true
let num: number | undefined;
initNum();
// Type guard
if (typeof num === "number") {
  console.log(num * 2);
}
function initNum() {
  num = 2;
}
```

Khuyến nghị trước tiên hãy xem xét các phương pháp không dựa vào assertion. Sau đó, chỉ sử dụng assertion khi thực sự cần thiết. Đôi khi do yêu cầu của framework hoặc library, việc sử dụng là không thể tránh khỏi.

<PostILearned>

・Definite assignment assertion cho TypeScript compiler biết rằng biến chắc chắn đã được khởi tạo
・Viết ! sau tên biến
・Vì nó chuyển trách nhiệm an toàn type từ compiler sang programmer, hãy xem xét phương pháp không sử dụng trước
・Chỉ sử dụng khi không còn cách nào khác

</PostILearned>

## Thông tin liên quan

[strictNullChecks](../tsconfig/strictnullchecks.md)

[strictPropertyInitialization](../tsconfig/strictpropertyinitialization.md)
