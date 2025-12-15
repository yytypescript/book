# Kiểu never

Kiểu `never` là kiểu đặc biệt của TypeScript có nghĩa là "không có giá trị".

## Đặc tính của never

### Không thể gán gì vào

Không thể gán bất cứ thứ gì vào kiểu `never`.

```ts twoslash
// @errors: 2322
const foo: never = 1;
```

Ngay cả kiểu `any` cũng không thể gán vào.

```ts twoslash
// @errors: 2322
const any: any = 1;
const foo: never = any;
```

Chỉ có kiểu `never` mới có thể gán vào.

```ts twoslash
const foo: never = 1 as never;
```

### Có thể gán vào bất cứ kiểu nào

Kiểu `never` có thể được gán vào bất kỳ kiểu nào.

```ts twoslash
const nev = 1 as never;
const a: string = nev; // Gán OK
const b: string[] = nev; // Gán OK
```

## Không có giá trị nghĩa là gì

"Không có giá trị" của kiểu `never` nghĩa là gì? Ví dụ, giá trị trả về của hàm luôn gây ra exception. Giá trị trả về không bao giờ có thể lấy được. Do đó, kiểu của giá trị trả về là kiểu `never`.

```ts twoslash
function throwError(): never {
  throw new Error();
}
```

Hàm không kết thúc cũng có giá trị trả về là kiểu `never`.

```ts twoslash
function forever(): never {
  while (true) {} // Vòng lặp vô hạn
}
```

Giá trị không thể tạo ra cũng trở thành kiểu `never`. Ví dụ, không thể tạo ra giá trị có thể gán cho cả kiểu number và kiểu string. Do đó, [intersection type](../values-types-variables/intersection.md) của kiểu number và kiểu string là kiểu `never`.

```ts twoslash
type NumberString = number & string;
//   ^?
```

## Sự khác biệt giữa kiểu void và kiểu never

Kiểu `void` có thể gán `undefined`, nhưng `never` không thể có giá trị.

```ts twoslash
// @errors: 2322
const ok: void = undefined;
const ng: never = undefined;
```

Về mặt ý nghĩa, `void` và `never` ở giá trị trả về đều giống nhau là không có giá trị trả về. Điểm khác biệt là hàm có kết thúc hay không. `void` có nghĩa là hàm được thực thi đến cuối. `never` có nghĩa là xử lý của hàm bị gián đoạn hoặc thực thi mãi mãi.

| Kiểu    | Giá trị trả về | Có kết thúc không                           |
| ------- | -------------- | ------------------------------------------- |
| `void`  | Không          | `return` hoặc thực thi đến cuối             |
| `never` | Không          | Bị gián đoạn hoặc thực thi mãi mãi          |

Do đó, nếu implementation của hàm có giá trị trả về là `never` có thể chạy đến cuối, TypeScript sẽ báo lỗi compile.

```ts twoslash
// @errors: 2534
function func(): never {}
```

## Kiểm tra tính đầy đủ (exhaustiveness check) bằng never

Đặc tính không thể gán gì vào của `never` có thể được ứng dụng cho exhaustiveness check. Exhaustiveness check là việc để compiler kiểm tra xem logic có xử lý hết tất cả các pattern hay không khi xử lý phân nhánh [union type](../values-types-variables/union.md).

Ví dụ, có một union type với 3 pattern.

```ts twoslash
type Extension = "js" | "ts" | "json";
```

Đây là xử lý phân nhánh chỉ xử lý 2 pattern. Không có tính đầy đủ, nhưng TypeScript không cảnh báo.

```ts twoslash title="Phân nhánh không đầy đủ"
type Extension = "js" | "ts" | "json";
// ---cut---
function printLang(ext: Extension): void {
  switch (ext) {
    case "js":
      console.log("JavaScript");
      break;
    case "ts":
      console.log("TypeScript");
      break;
    // Không có phân nhánh cho "json"
  }
}
```

### Cơ bản về exhaustiveness check

Để thực hiện exhaustiveness check, gán giá trị cần kiểm tra tính đầy đủ cho kiểu never trong phân nhánh `default`. Khi đó, TypeScript sẽ cảnh báo lỗi gán.

```ts twoslash title="Phân nhánh có exhaustiveness check"
// @errors: 2322
type Extension = "js" | "ts" | "json";
// ---cut---
function printLang(ext: Extension): void {
  switch (ext) {
    case "js":
      console.log("JavaScript");
      break;
    case "ts":
      console.log("TypeScript");
      break;
    default:
      const exhaustivenessCheck: never = ext;
      break;
  }
}
```

### Exhaustiveness check bằng exception

Khuyến nghị nên định nghĩa class exception cho exhaustiveness check. Class này được thiết kế để nhận kiểu `never` làm tham số constructor.

```ts twoslash title="Hàm exhaustiveness check"
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
```

Ném exception này trong phân nhánh `default`. Truyền tham số cần kiểm tra tính đầy đủ vào constructor. Khi làm như vậy, nếu tính đầy đủ không được đáp ứng, TypeScript sẽ cảnh báo lỗi gán.

```ts twoslash
// @errors: 2345
type Extension = "js" | "ts" | "json";
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
// ---cut---
function printLang(ext: Extension): void {
  switch (ext) {
    case "js":
      console.log("JavaScript");
      break;
    case "ts":
      console.log("TypeScript");
      break;
    default:
      throw new ExhaustiveError(ext);
  }
}
```

Có 2 lợi ích khi dùng exception.

1. Có thể xử lý `noUnusedLocals`
2. Code có ý thức về runtime

#### Có thể xử lý `noUnusedLocals`

Compiler option [`noUnusedLocals`](../tsconfig/nounusedlocals.md) cài đặt có cảnh báo về biến không được sử dụng hay không. Khi option này là `true`, exhaustiveness check chỉ gán vào biến sẽ gây lỗi compile.

```ts twoslash title="Dù xử lý đủ hết nhưng vẫn bị cảnh báo biến không sử dụng"
// @noUnusedLocals: true
// @errors: 6133
function func(value: "yes" | "no"): void {
  switch (value) {
    case "yes":
      console.log("YES");
      break;
    case "no":
      console.log("NO");
      break;
    default:
      const exhaustivenessCheck: never = value;
      break;
  }
}
```

Nếu làm exhaustiveness check bằng exception, lỗi compile về biến không sử dụng sẽ không xảy ra.

#### Code có ý thức về runtime

Exception là implementation có ý thức hơn về JavaScript sau khi compile. Khi compile code exhaustiveness check bằng gán biến, sẽ sinh ra JavaScript sau.

```ts twoslash title="JavaScript sau khi compile (exhaustiveness check bằng gán biến)"
// @alwaysStrict: false
// @showEmit
function func(value: "yes" | "no"): void {
  switch (value) {
    case "yes":
      console.log("YES");
      break;
    case "no":
      console.log("NO");
      break;
    default:
      const exhaustivenessCheck: never = value;
      break;
  }
}
```

Người không biết TypeScript gốc khi nhìn code này, việc gán vào `exhaustivenessCheck` có ý đồ không rõ ràng. Hơn nữa, exhaustiveness check không được thực hiện tại runtime.

Exhaustiveness check bằng exception có ý đồ rõ ràng ngay cả khi chỉ nhìn code sau compile. Hơn nữa, check cũng được thực hiện tại runtime. Đây là implementation tốt hơn.

```ts twoslash title="JavaScript sau khi compile (exhaustiveness check bằng exception)"
// @alwaysStrict: false
// @showEmit
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
function func(value: "yes" | "no"): void {
  switch (value) {
    case "yes":
      console.log("YES");
      break;
    case "no":
      console.log("NO");
      break;
    default:
      throw new ExhaustiveError(value);
  }
}
```

<PostILearned>

never trong TypeScript là kiểu "không có giá trị".

1️⃣Đặc tính 1: Không thể gán gì vào never
2️⃣Đặc tính 2: never có thể gán vào bất cứ thứ gì
💥Có thể dùng cho giá trị trả về của hàm luôn gây exception
👐Khác với void
✅Có thể ứng dụng cho exhaustiveness check

</PostILearned>
