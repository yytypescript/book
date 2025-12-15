# Kiểu unknown

Kiểu unknown của TypeScript được sử dụng khi không biết kiểu là gì.

Kiểu unknown có thể được gán bất kỳ giá trị nào.

```ts twoslash
let value: unknown;
value = 1; // OK
value = "string"; // OK
value = { name: "Object" }; // OK
```

## Kiểu unknown là kiểu any type-safe

Kiểu unknown thường được gọi là "kiểu any type-safe" và được đối chiếu với kiểu any.

Kiểu any có thể được gán cho bất kỳ kiểu biến nào.

```ts twoslash
const value: any = 10;
const int: number = value;
const bool: boolean = value;
const str: string = value;
const obj: object = value;
```

Ngược lại, giá trị kiểu unknown không thể được gán cho kiểu cụ thể.

```ts twoslash
// @errors: 2322
const value: unknown = 10;
const int: number = value;
const bool: boolean = value;
const str: string = value;
const obj: object = value;

const any: any = value; // OK
const unknown: unknown = value; // OK
```

Có thể nghĩ rằng việc gán thất bại ngay cả đối với biến `int` có kiểu number là hơi quá mức, nhưng đây là cách để xử lý kiểu không xác định một cách an toàn.

Ngoài ra, kiểu unknown không cho phép truy cập property và gọi method.

```ts twoslash
// @errors: 18046
const value: unknown = 10;
value.toFixed();

const obj: unknown = { name: "Object" };
obj.name;
```

Chi tiết về sự khác biệt đặc tính giữa any và unknown, vui lòng xem trang sau.

[anyとunknownの違い](any-vs-unknown.md)

## unknown và thu hẹp kiểu

unknown là kiểu không xác định an toàn hơn any, nhưng không thể sử dụng nguyên trạng. Để sử dụng giá trị unknown, cần thu hẹp kiểu.

Để thu hẹp kiểu, sử dụng câu lệnh if có chứa biểu thức điều kiện như `typeof` hoặc `instanceof`. Điều này được gọi là type guard. Khi thu hẹp bằng type guard, xử lý sau đó có thể coi là kiểu đã được thu hẹp.

```ts twoslash
const value: unknown = "";
// Type guard
if (typeof value === "string") {
  // Ở đây, value có thể được coi là kiểu string
  console.log(value.toUpperCase());
}
```

Trong ví dụ này, biến `value` có kiểu unknown được xác định là kiểu string trong if bằng `typeof`, nên có thể sử dụng method `toUpperCase()` của kiểu string.

Để thu hẹp kiểu, cũng có thể sử dụng [hàm type guard].

```ts twoslash
// Hàm type guard
function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
const value: unknown = { a: 1, b: 2 };
// Type guard
if (isObject(value)) {
  // Ở đây, value có thể được coi là kiểu object
  console.log(Object.keys(value));
  //                      ^?
}
```

[hàm type guard]: ../functions/type-guard-functions.md

[制御フロー分析](../statements/control-flow-analysis-and-type-guard.md)

### Thu hẹp kiểu unknown thành kiểu mảng

Khi muốn thu hẹp kiểu unknown thành kiểu mảng, sử dụng `Array.isArray()`. Thêm vào đó, kiểm tra cả phần tử mảng sẽ làm cho xử lý kiểm tra an toàn hơn.

```ts twoslash
function isNumberArray(value: unknown): value is number[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every((e) => typeof e === "number");
}
```

### Thu hẹp kiểu unknown thành kiểu object

Để thu hẹp kiểu unknown thành kiểu object, sử dụng toán tử `typeof`.

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
function isEmail(value: unknown): value is Email {
  return typeof value !== "object" || value === null;
}
```

Như vậy, không biết được giá trị có thực sự thỏa mãn kiểu `Email` hay không. Vì không kiểm tra đến property như `from`. Để tăng độ chính xác của kiểm tra, cần kiểm tra kiểu của từng property.

```ts twoslash
// @noErrors
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // Kiểm tra từng property
  if (typeof value.from !== "string") {
    return false;
  }
  return true;
}
```

Kiểm tra property ở trên thoạt nhìn có vẻ không có vấn đề, nhưng thực tế sẽ xảy ra lỗi compile như sau.

```ts twoslash
// @errors: 2339
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // ---cut---
  // Kiểm tra từng property
  if (typeof value.from !== "string") {
    return false;
  }

  return true;
}
```

Để tránh điều này, sử dụng [type assertion](../values-types-variables/type-assertion-as.md) để đưa về gần kiểu `Email`. Lúc này, type assertion có thể là `as Email`, nhưng để type-safe hơn, khuyến nghị sử dụng [`Record`](../type-reuse/utility-types/record.md) của kiểu unknown.

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // Type assertion để đưa value về gần kiểu Email
  const email = value as Record<keyof Email, unknown>;
  // Kiểm tra từng property
  if (typeof email.from !== "string") {
    return false;
  }
  return true;
}
```

Lúc này, kiểu `Record<keyof Email, unknown>` trở thành kiểu có tất cả property của `Email` là `unknown` như sau.

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
type MayBeEmail = Record<keyof Email, unknown>;
//   ^?
```

Cuối cùng, xử lý kiểm tra đã implement kiểm tra tất cả property như sau.

```ts twoslash
type Email = {
  from: string;
  to: string;
  title: string;
  subject: string;
};
// ---cut---
function isEmail(value: unknown): value is Email {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const email = value as Record<keyof Email, unknown>;
  if (typeof email.from !== "string") {
    return false;
  }
  if (typeof email.to !== "string") {
    return false;
  }
  if (typeof email.title !== "string") {
    return false;
  }
  return typeof email.subject === "string";
}
```

:::info Hãy xem xét thư viện validation

Để thu hẹp an toàn từ kiểu unknown sang kiểu object, cần kiểm tra từng property một. Có thể một số độc giả nhìn ví dụ trên nghĩ rằng việc implement này khá vất vả.

Nếu số property cần kiểm tra nhiều, nên sử dụng thư viện validation sau.

- [zod](https://github.com/colinhacks/zod)
- [superstruct](https://docs.superstructjs.org/)

Các thư viện này có thể implement các mục kiểm tra một cách khai báo, giúp giảm chi phí implementation và giảm sai sót trong xử lý kiểm tra.

:::

## Mục đích sử dụng unknown

### Làm cho giá trị kiểu any an toàn hơn

Ví dụ, giá trị trả về của `JSON.parse()` là [kiểu any](../values-types-variables/any.md). Nếu lấy giá trị trả về như vậy, nếu truy cập vào property không tồn tại, có nguy cơ gặp lỗi runtime.

Do đó, bằng cách chuyển thành kiểu unknown, sẽ dễ dàng nhận ra truy cập vào property không tồn tại tại thời điểm compile.

```ts twoslash
const data: unknown = JSON.parse("...");
```

### Tránh hạn chế của type assertion

Thông thường, trong [type assertion](../values-types-variables/type-assertion-as.md), không thể chỉ định kiểu hoàn toàn khác.

```ts twoslash
// @errors: 2352
const str = "a";
const num = str as number;
```

Trong trường hợp như vậy có thể sử dụng kiểu unknown. Vì kiểu unknown có thể type assertion sang bất kỳ kiểu nào, có kỹ thuật là chèn type assertion sang kiểu unknown trước kiểu mục tiêu.

```ts twoslash
// @errors: 2352
const str = "a";
const num = str as unknown as number;
```

Tuy nhiên, type assertion không thực sự cast kiểu của giá trị, mà chỉ làm cho TypeScript nhận diện là kiểu đó, nên vấn đề về type-safe vẫn còn.

### Kiểu của giá trị được bắt trong try-catch

TypeScript từ phiên bản 4.4 cho phép chọn exception được ném sẽ được bắt là kiểu any hay kiểu unknown. Tuy nhiên, theo cài đặt mặc định, exception được ném là kiểu any, nên nếu muốn là kiểu unknown, cần thay đổi cài đặt tsconfig.json.

[useUnknownInCatchVariables](../tsconfig//useunknownincatchvariables.md)
