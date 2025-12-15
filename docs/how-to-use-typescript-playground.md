# Cách sử dụng TypeScript Playground

## TypeScript Playground là gì

Là môi trường thực thi được cung cấp chính thức, cho phép bạn dễ dàng thử nghiệm TypeScript trên Web.

## Sử dụng TypeScript Playground

Truy cập [TypeScript Playground](https://www.typescriptlang.org/play) là bạn có thể sử dụng ngay.

### Kiểm tra kết quả thực thi chương trình

Khi đã truy cập Playground, hãy thử chạy code ngay.

Nhập sample code sau vào editor của Playground.

```ts
function add(a: number, b: number) {
  return a + b;
}

console.log(add(1, 2));
```

Sau khi nhập xong, click `RUN` ở phía trên editor để thực thi code.

Sau khi thực thi, bạn có thể kiểm tra kết quả thực thi trong tab `Logs` bên phải.

![](how-to-use-typescript-playground/image1.png)

### Kiểm tra kết quả compile sang JavaScript

Khi viết TypeScript, đôi khi bạn muốn xác nhận code JavaScript được tạo ra. Trong trường hợp đó, mở tab `.JS` bên phải để xác nhận code JavaScript được tạo ra.

Hãy thử kiểm tra kết quả compile của `enum` - tính năng đặc trưng của TypeScript.

Nhập code sau vào editor và mở tab `.JS`.

```ts
enum Color {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
}

console.log(Color.RED);
```

Bạn có thể dễ dàng xác nhận TypeScript compile `enum` sang JavaScript như thế nào.

![](how-to-use-typescript-playground/image2.png)

### Cách kiểm tra lỗi compile

Hãy thử nhập sample code sau trong editor. Bạn có thể xác nhận lỗi compile realtime bằng cách di chuột qua đường gợn sóng đỏ hiển thị trên editor.

```ts
let value = "1";
value = 1;
value = true;
```

Ngoài việc di chuột trong editor, bạn cũng có thể hiển thị tab `Errors` bên phải để xem danh sách tất cả lỗi.

![](how-to-use-typescript-playground/image3.png)

### Cách kiểm tra type definition

Mở tab `.D.TS` để xác nhận type definition được tạo từ code trong editor.

```ts
// Code
function add(a: number, b: number) {
  return a + b;
}

// Output .D.TS
declare function add(a: number, b: number): number;
```

### Chia sẻ code đã viết

Hãy mở URL sau. TypeScript Playground sẽ hiển thị với code đã được nhập sẵn trong editor.

<https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwChF3FTioRSllEAaioBuFgF8WLCAgDOcADbEAdArgBzLOgwBGSgCZ69EUA>

TypeScript Playground có thể chia sẻ code đã viết với người khác chỉ bằng cách chia sẻ URL của trang.

Cơ chế hoạt động như sau:

1. Nén code của editor bằng thư viện nén chuỗi và đặt chuỗi vào URL
2. Chia sẻ URL
3. Khi URL được chia sẻ được mở, giải nén chuỗi đã nén và hiển thị trong editor

Mở Playground mới và nhập code giống với link trên vào editor, bạn sẽ thấy URL giống nhau được tạo ra.

### Chia sẻ code ở nhiều định dạng khác nhau

Từ tab `Export` ở phía trên, bạn có thể xuất text để chia sẻ code ở nhiều định dạng khác nhau.

Ví dụ, nếu chọn `Copy as Markdown Link with Preview`, bạn có thể xuất text theo định dạng sau.

````markdown
```
function add(a:number, b:number) {
    return a + b;
}
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwFgAoRTxU4qEUpMkQBqKgG52AX3bsICAM5wANsQB0SuAHMs6DAEZKAJnr0xQA)
````

## Cách cấu hình TypeScript Playground

### Cấu hình phiên bản TypeScript

Click vào tab hiển thị phiên bản ở góc trên bên trái để thay đổi phiên bản TypeScript thực thi.

Mặc định, phiên bản TypeScript là 4.1 trở lên, nên sample code sau không gây lỗi compile.

Hãy thử thay đổi phiên bản xuống dưới 4.1. Bạn sẽ thấy lỗi compile phát sinh do phiên bản TypeScript thay đổi khiến `Template Literal Types` không được hỗ trợ.

```ts
type LocaleLang = "en" | "ja" | "fr";
type LocaleId = `locale_${LocaleLang}`;
```

### Cấu hình TS Config

Click vào tab `TS Config` ở phía trên màn hình để cấu hình TS Config.

Nhập sample code sau vào editor và xác nhận code JavaScript được xuất ra trong `.JS`, mặc định sẽ là:

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

Cấu hình ban đầu của Playground chọn `module: 'esnext'`, nên kết quả xuất ra như sau.

```js
export function add(a, b) {
  return a + b;
}
```

Mở tab `TS Config` và thay đổi cấu hình `Module` thành `CommonJS`. Cấu hình TS Config được thay đổi và bạn có thể xác nhận code JavaScript được xuất ra theo định dạng `CommonJS`.

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
function add(a, b) {
  return a + b;
}
exports.add = add;
```
