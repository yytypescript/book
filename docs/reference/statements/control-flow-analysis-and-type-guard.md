# Phân tích control flow và thu hẹp kiểu bằng type guard

TypeScript có thể thu hẹp kiểu của biến theo luồng xử lý thông qua control flow và type guard.

## Union type và sự mơ hồ

Khi viết type annotation cho biến bằng union type, sẽ xảy ra lỗi kiểu nếu truy cập vào method hoặc property chỉ được định nghĩa ở một trong các kiểu.

```ts twoslash
// @errors: 2339
function showMonth(month: string | number) {
  console.log(month.padStart(2, "0"));
}
```

Điều này là do biến `month` có thể là kiểu `string` hoặc `number`, và có nguy cơ xảy ra truy cập vào method chưa được định nghĩa khi kiểu `number` được truyền vào.

## Phân tích control flow

TypeScript phân tích control flow như `if` hoặc vòng lặp `for` để xác định khả năng về kiểu tại thời điểm code được thực thi.

Trong ví dụ trước, bằng cách thêm điều kiện kiểm tra biến `month` là kiểu `string`, TypeScript sẽ xác định rằng tại thời điểm thực thi method `padStart` của `month`, `month` là kiểu `string`, giúp giải quyết lỗi kiểu.

```ts twoslash
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
  }
}
```

Hãy xem một ví dụ phức tạp hơn.

Trong ví dụ sau, việc gọi method `toFixed` của `month` nằm ngoài scope của điều kiện phân nhánh, nên kiểu của biến `month` vẫn là `string | number`, dẫn đến lỗi kiểu.

```ts twoslash
// @errors: 2339
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
  }
  console.log(month.toFixed());
}
```

Thêm `return` vào điều kiện phân nhánh đầu tiên của hàm để kết thúc xử lý hàm bằng early return.

```ts twoslash
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
    return;
  }
  console.log(month.toFixed());
}
```

Thay đổi này giải quyết lỗi kiểu khi gọi method `toFixed` của `month`.

Điều này là do phân tích control flow xác định rằng nếu biến `month` là kiểu `string`, hàm sẽ kết thúc bằng early return, và tại thời điểm method `toFixed` của `month` được thực thi, TypeScript xác định biến `month` chỉ có thể là kiểu `number`.

## Type guard

Trong phần giải thích về control flow, chúng ta đã thu hẹp kiểu bằng cách sử dụng điều kiện `if(typeof month === "string")` để kiểm tra kiểu của biến và tránh sự mơ hồ về kiểu.

Code kiểm tra kiểu như thế này được gọi là type guard.

### typeof

Ví dụ điển hình là type guard sử dụng toán tử `typeof`.

[typeof演算子](../values-types-variables/typeof-operator.md)

Trong ví dụ sau, `typeof` được sử dụng để xác định biến `month` là kiểu `string`.

```ts twoslash
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
  }
}
```

Cần lưu ý rằng với type guard bằng `typeof`, `typeof null === "object"`.

Trong JavaScript, `null` là object, nên khi viết type guard như sau, biến `date` sẽ bị thu hẹp thành `Date | null`, vẫn còn khả năng là `null`, dẫn đến lỗi kiểu.

```ts twoslash
// @errors: 18047
function getMonth(date: string | Date | null) {
  if (typeof date === "object") {
    console.log(date.getMonth() + 1);
  }
}
```

Có thể giải quyết lỗi kiểu bằng cách thêm type guard `date != null`.

```ts twoslash
function getMonth(date: string | Date | null) {
  if (typeof date === "object" && date != null) {
    console.log(date.getMonth() + 1);
  }
}
```

### instanceof

Khi xác định instance bằng `typeof`, chỉ có thể xác định là object.
Để viết type guard xác định là instance của một class cụ thể, sử dụng `instanceof`.

```ts twoslash
function getMonth(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.getMonth() + 1);
  }
}
```

### in

Không cần chỉ định rõ là instance của class cụ thể, mà có thể thu hẹp kiểu bằng cách viết type guard sử dụng toán tử `in` để kiểm tra object có property cụ thể hay không.

```ts twoslash
interface Wizard {
  castMagic(): void;
}
interface Swordsman {
  slashSword(): void;
}

function attack(player: Wizard | Swordsman) {
  if ("castMagic" in player) {
    player.castMagic();
  } else {
    player.slashSword();
  }
}
```

### Hàm type guard do người dùng định nghĩa

Type guard có thể được định nghĩa dưới dạng hàm ngoài việc viết inline.

```ts
function isWizard(player: Player): player is Wizard {
  return "castMagic" in player;
}

function attack(player: Wizard | Swordsman) {
  if (isWizard(player)) {
    player.castMagic();
  } else {
    player.slashSword();
  }
}
```

Tên gọi này (user-defined type guard) dường như dài ngay cả trong tiếng Anh, nên đôi khi được gọi là hàm type guard (type guarding function, guard's function).

[型ガード関数](../functions/type-guard-functions.md)

### Gán type guard vào biến

Cũng có thể sử dụng biến cho type guard.

```ts twoslash
function getMonth(date: string | Date) {
  const isDate = date instanceof Date;
  if (isDate) {
    console.log(date.getMonth() + 1);
  }
}
```

## Thu hẹp kiểu bằng `switch (true)`

Câu lệnh `switch` thực thi code khác nhau dựa trên giá trị của mệnh đề `case`. Thông thường, trong mệnh đề `case` sẽ chỉ định chuỗi hoặc số, nhưng trong TypeScript, sử dụng `switch (true)` cho phép đánh giá biểu thức trả về giá trị boolean trong mỗi mệnh đề `case`. Trong block `case` được đánh giá là `true`, kiểu sẽ tự động được thu hẹp dựa trên điều kiện đó.

```ts twoslash
function handleValue(value: string | number | boolean): void {
  switch (true) {
    case typeof value === "string":
      console.log(`String value: ${value.padStart(2, "0")}`);
      break;
    case typeof value === "number":
      console.log(`Number value: ${value.toFixed(2)}`);
      break;
    case typeof value === "boolean":
      console.log(`Boolean value: ${value}`);
      break;
    default:
      console.log("Unknown type");
  }
}
```

Không chỉ `typeof`, mà cũng có thể sử dụng tương tự với `instanceof`. Trong ví dụ sau, `UserError` và `SystemError` là các class có property riêng `user` và `system`. Sử dụng `switch (true)` để phân biệt error nào và truy cập vào property tương ứng.

```ts twoslash
class UserError extends Error {
  public user: string;
  constructor(message: string) {
    super(message);
    this.user = "defaultUser";
    this.name = "UserError";
  }
}

class SystemError extends Error {
  public system: string;
  constructor(message: string) {
    super(message);
    this.system = "defaultSystem";
    this.name = "SystemError";
  }
}

// ---cut---
function handleError(error: UserError | SystemError): void {
  switch (true) {
    case error instanceof UserError:
      console.log(`User error for ${error.user}: ${error.message}`);
      break;
    case error instanceof SystemError:
      console.log(`System error for ${error.system}: ${error.message}`);
      break;
    default:
      console.log("Unknown error type");
  }
}
```

Cũng có thể sử dụng hàm type guard do người dùng định nghĩa với `switch (true)`.

```ts twoslash
type Panda = {
  panda: string;
};
type Broccoli = {
  broccoli: number;
};
type User = {
  name: string;
};

const isPanda = (value: unknown): value is Panda => {
  return true;
};
const isBroccoli = (value: unknown): value is Broccoli => {
  return true;
};
const isUser = (value: unknown): value is User => {
  return true;
};

// ---cut---
function handleValue(value: Panda | Broccoli | User): void {
  switch (true) {
    case isPanda(value):
      console.log(`I am a panda: ${value.panda}`);
      break;
    case isBroccoli(value):
      console.log(`I am broccoli: ${value.broccoli}`);
      break;
    case isUser(value):
      console.log(`I am ${value.name}`);
      break;
  }
}
```

## Thông tin liên quan

[any型](../values-types-variables/any.md)

[any vs unknown](any-vs-unknown.md)
