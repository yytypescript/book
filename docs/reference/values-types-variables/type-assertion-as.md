---
sidebar_label: Type assertion "as"
---

# Type assertion "as"

TypeScript có tính năng ghi đè type inference. Tính năng này được gọi là type assertion.

TypeScript compiler suy luận kiểu từ code. Type inference đó rất thông minh, nhưng đôi khi lập trình viên biết kiểu chính xác hơn compiler. Trong trường hợp đó, có thể sử dụng type assertion để cho compiler biết kiểu. Type assertion giống như nói với compiler "Tin tôi đi! Tôi biết rõ về kiểu hơn".

## Cách viết type assertion

Có 2 cách viết type assertion. Một là cú pháp as.

```ts twoslash
const value: string | number = "this is a string";
const strLength: number = (value as string).length;
```

Cách còn lại là cú pháp angle-bracket (angle-bracket syntax).

```ts twoslash
const value: string | number = "this is a string";
const strLength: number = (<string>value).length;
```

Tùy sở thích dùng cách nào, nhưng cú pháp angle-bracket đôi khi không phân biệt được với JSX, nên cú pháp as được dùng nhiều hơn.

## Type assertion gây lỗi compile

Không phải type assertion có thể ghi đè thông tin kiểu không giới hạn. Ví dụ, type assertion chuyển kiểu `number` thành kiểu `string` sẽ gây lỗi compile.

```ts twoslash
// @errors: 2352
const num = 123;
const str: string = num as string;
```

Lỗi này có nghĩa "Việc chuyển kiểu number thành kiểu string là sai. Vì hai kiểu có quá ít phần chung".

Như vậy, dù type assertion có thể ghi đè type inference của compiler, nhưng không thể chuyển đổi kiểu vô lý.

Nếu vẫn tin type assertion mình viết là đúng, có thể tránh lỗi trên bằng cách đi qua kiểu `unknown`.

```ts twoslash
const num = 123;
const str: string = num as unknown as string; // OK
```

## Sự khác biệt giữa type assertion và cast

Type assertion giống với cast của các ngôn ngữ khác. Cast là việc chuyển đổi kiểu của một giá trị sang kiểu khác tại runtime. Type assertion không ảnh hưởng đến runtime. Nó không chuyển đổi kiểu giá trị. Chỉ đơn thuần là truyền kiểu cho compiler tại compile time. Compiler dùng thông tin đó để kiểm tra code. Type assertion không phải cast, nên trong TypeScript không gọi type assertion là cast. Để chuyển đổi kiểu tại runtime, cần viết logic cho việc đó.

## Với sức mạnh lớn đi kèm trách nhiệm lớn

Type assertion có sức mạnh ghi đè type inference của compiler. Do đó, lập trình viên cần cẩn thận để type assertion không gây ra bug. Về kiểu, dựa vào type inference của compiler sẽ an toàn hơn, nên type assertion chỉ nên dùng khi không còn cách nào khác.

Khi cần sử dụng type assertion, trước hết hãy xem xét có thể giải quyết bằng type guard hoặc user-defined type guard không.

[Thu hẹp kiểu bằng control flow analysis và type guard](../statements/control-flow-analysis-and-type-guard.md)

[Type guard function](../functions/type-guard-functions.md)

[Assertion function](../functions/assertion-functions.md)

## Sự khác biệt giữa type assertion và type annotation

Type assertion và type annotation có tên giống nhau nên thường bị nhầm lẫn. Trong sách này, type annotation được gọi là "type annotation". Đây là 2 tính năng khác nhau của TypeScript.

Type annotation là việc cho compiler biết "Biến này chỉ có thể gán kiểu này". Compiler dùng type annotation làm gợi ý để kiểm tra xem giá trị có thể gán vào kiểu đó không, và báo cáo ngay khi phát hiện không thể gán.

```ts twoslash
let value: number;
//         ^^^^^^ Type annotation
```

Mặt khác, type assertion là việc cho compiler biết "Bạn nghĩ kiểu này, nhưng thực tế là kiểu kia" để truyền đạt sự không chính xác của type inference.

[Type annotation trong khai báo biến](type-annotation.md)
