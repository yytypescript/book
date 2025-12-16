# Sự khác biệt giữa readonly và const

Trong JavaScript, biến khai báo bằng `const` không thể gán lại. Trong TypeScript, khi thêm modifier `readonly` vào property của object type, property đó không thể gán lại. Hai tính năng này giống nhau ở điểm "không thể gán lại". Vậy sự khác biệt là gì?

## const cấm gán vào biến

`const` cấm gán vào biến. Ví dụ, khi cố gán giá trị vào x đã khai báo bằng `const`, TypeScript sẽ báo compile error và JavaScript sẽ báo runtime error.

```ts twoslash
// @errors: 2588
const x = 1;
x = 2;
```

Việc cấm gán của `const` chỉ có hiệu lực với bản thân biến. Nếu biến là object, việc gán vào property được phép.

```ts twoslash
// @errors: 2588
const x = { y: 1 };
x = { y: 2 }; // Gán vào bản thân biến không được phép
x.y = 2; // Gán vào property được phép
```

## readonly cấm gán vào property

`readonly` của TypeScript cấm gán vào property. Ví dụ, khi cố gán giá trị vào property x có `readonly`, sẽ báo compile error.

```ts twoslash
// @errors: 2540
let obj: { readonly x: number } = { x: 1 };
obj.x = 2;
```

Ngược lại, gán vào bản thân biến được phép.

```ts twoslash
let obj: { readonly x: number } = { x: 1 };
obj = { x: 2 }; // Được phép
```

## Sự khác biệt giữa const và readonly

`const` cấm gán vào bản thân biến. Nếu biến là object, việc gán vào property được phép. Ngược lại, `readonly` cấm gán vào property. Việc gán thay thế bản thân biến được phép. Do sự khác biệt này, khi kết hợp `const` và `readonly`, có thể tạo object không thể thay đổi cả bản thân biến lẫn property của object.

```ts twoslash
// @errors: 2588 2540
const obj: { readonly x: number } = { x: 1 };
obj = { x: 2 };
obj.x = 2;
```

## Thông tin liên quan

[Khai báo biến: let và const](../let-and-const.md)
