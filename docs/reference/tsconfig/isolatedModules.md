---
description: Hỗ trợ các module được compile riêng lẻ
---

# isolatedModules

`isolatedModules` là compiler option cảnh báo khi có code không thể phân tích được khi transform từng file độc lập.

- Mặc định: `false`
- Phiên bản thêm vào: 1.5

## `isolatedModules` là option dành cho transpiler

Khi chuyển TypeScript sang JavaScript, nhiều file có thể liên quan đến nhau. Tuy nhiên, các transpiler như Babel xử lý từng file một nên một số code có thể không được phân tích đúng.

Cụ thể, khi sử dụng các tính năng như `const enum` hoặc `namespace` có thể gây ra vấn đề runtime. `isolatedModules` sẽ cảnh báo khi có code không thể phân tích đúng để tránh các vấn đề này.

## Code không hoạt động khi `isolatedModules` được bật

Dưới đây là các ví dụ code không hoạt động khi `isolatedModules` được bật.

### Export identifier không phải là giá trị

TypeScript cho phép re-export type đã import.
Điều này hữu ích khi gom type và function từ nhiều module để export. Tuy nhiên, khi `isolatedModules` được bật, nếu re-export type mà không dùng `export type` sẽ báo lỗi.

**Code có vấn đề:**

```ts title="someModule.ts" twoslash
export type SomeType = any;
export function hello() {
  console.log("hello");
}
```

```ts twoslash title="index.ts"
// @filename: "someModule.ts"
export type SomeType = any
export function hello() {
  return { console.log("hello") };
}
// @filename: "index.ts"
// ---cut---
import { SomeType, hello } from "./someModule";

// someType là giá trị hay là type? Transpiler không thể phân biệt
export { SomeType, hello };
// @error: Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'.
```

**Giải pháp:**

Sử dụng `export type` để re-export type sẽ tránh được lỗi.

```ts title="index.ts" twoslash
// @filename: "someModule.ts"
export type SomeType = any
export function hello() {
  return { console.log("hello") };
}
// @filename: "index.ts"
// ---cut---
import { SomeType, hello } from "./someModule";

export type { SomeType }; // Có thể xác định được là type
export { hello };
```

### File không phải module

Khi `isolatedModules` được bật, tất cả các implementation file phải là module. Module có nghĩa là file sử dụng cú pháp `import` hoặc `export`. Nếu file không phải module sẽ báo lỗi.

**Code có vấn đề:**

```ts title="index.ts" twoslash
function fn() {}
// @error: 'index.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
```

**Giải pháp:**

Thêm câu lệnh `export {}` rỗng để biến file thành module.

```ts title="index.ts" twoslash
function fn() {}

// Thêm câu lệnh export rỗng để biến thành module
export {};
```

### Tham chiếu đến member của const enum

Trong TypeScript, khi tham chiếu đến member của `const enum`, trong JavaScript được generate ra, tham chiếu đó sẽ được thay thế bằng giá trị thực tế. Tuy nhiên, các transpiler khác không có thông tin về giá trị member nên không thể thay thế tham chiếu. Do đó sẽ xảy ra lỗi runtime.

**Code có vấn đề:**

```ts title="index.ts" twoslash
declare const enum Numbers {
  Zero = 0,
  One = 1,
}

console.log(Numbers.Zero + Numbers.One);
// @error: Cannot access ambient const enums when the '--isolatedModules' flag is provided.
```

**Giải pháp:**

Thay vì `const enum`, sử dụng `enum` thông thường sẽ tránh được lỗi.

```ts title="numbers.ts" twoslash
enum Numbers {
  Zero = 0,
  One = 1,
}

// Tham chiếu đến enum thông thường được cho phép
console.log(Numbers.Zero + Numbers.One);
```

`isolatedModules` là compiler option để tránh các vấn đề này.
Nhờ có cảnh báo, chúng ta có thể nhận biết được sự tồn tại của code mà compiler không thể phân tích đúng.

## Không nên đặt `isolatedModules` thành false trong tsconfig.json được tạo bởi `create-react-app` hoặc `create-next-app`

Trong tsconfig.json được tạo bởi các công cụ scaffold của React hoặc Next.js, `isolatedModules` được bật. Đây là vì React và Next sử dụng Babel bên trong. Nếu đổi `isolatedModules` thành false có thể khiến build bị lỗi, nên không nên thay đổi cấu hình này.

<PostILearned>

✅isolatedModules check code không thể phân tích được dựa trên giả định transform từng file
🚧Tồn tại để cải thiện khả năng tương thích với các transpiler như Babel
👍Nên bật isolatedModules

</PostILearned>
