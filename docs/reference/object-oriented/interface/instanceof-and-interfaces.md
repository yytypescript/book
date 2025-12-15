# Interface và instanceof

[Toán tử instanceof](../class/instanceof-operator.md) là toán tử của JavaScript để kiểm tra xem object có phải là instance của class hay không. Ở đây sẽ giải thích mối quan hệ giữa toán tử `instanceof` và interface của TypeScript.

## Khác biệt với `instanceof` của các ngôn ngữ khác

Toán tử `instanceof` của các ngôn ngữ khác như Java hay PHP có thể sử dụng với interface, nên cần lưu ý khi học TypeScript sau các ngôn ngữ khác. Dưới đây là ví dụ sử dụng toán tử `instanceof` với interface trong PHP.

```php title="Ví dụ toán tử instanceof của PHP"
interface MyInterface
{
}

class MyClass implements MyInterface
{
}

$a = new MyClass();
var_dump($a instanceof MyInterface);
//=> bool(true)
```

### Không thể sử dụng `instanceof` với interface

TypeScript khác với các ngôn ngữ trên, không thể kiểm tra kiểu bằng `instanceof tên_interface`. Nếu sử dụng tên interface với toán tử `instanceof`, sẽ xảy ra lỗi compile.

```ts twoslash title="Ví dụ lỗi compile khi sử dụng toán tử instanceof trong TypeScript"
// @errors: 2693
interface MyInterface {}

class MyClass implements MyInterface {}

const a = new MyClass();
console.log(a instanceof MyInterface);
```

Lý do là vì interface là tính năng riêng của TypeScript và bị xóa khỏi code khi compile. Interface là thứ ở level type. TypeScript xóa các thứ ở level type khi compile sang JavaScript. Đây là lý do tương tự như type annotation của biến bị xóa khi compile.

Việc bị xóa khi compile có nghĩa là không có thông tin về interface ở đâu cả khi chạy JavaScript. Do đó, `instanceof` không thể nhận tên interface.

## Sử dụng type guard function để kiểm tra interface

Để kiểm tra xem giá trị có tương thích với interface khi runtime hay không, sử dụng [type guard function](../../functions/type-guard-functions.md). Type guard function là function nhận giá trị muốn kiểm tra kiểu làm tham số và trả về `true` hoặc `false`. Ví dụ, function kiểm tra xem giá trị có phải là kiểu `Student` interface hay không như sau:

```ts twoslash
interface Student {
  name: string;
  grade: number;
}

// Type guard function kiểm tra kiểu Student
function isStudent(value: unknown): value is Student {
  // Kiểm tra xem giá trị có phải object không
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { name, grade } = value as Record<keyof Student, unknown>;
  // Kiểm tra xem property name có phải kiểu string không
  if (typeof name !== "string") {
    return false;
  }
  // Kiểm tra xem property grade có phải kiểu number không
  if (typeof grade !== "number") {
    return false;
  }
  return true;
}
```

Sử dụng function `isStudent` này thay cho `instanceof` để có thể kiểm tra kiểu khi runtime.

```ts twoslash
interface Student {
  name: string;
  grade: number;
}
declare function isStudent(value: unknown): value is Student;
// ---cut---
const tom: object = { name: "Tom", grade: 2 };
//    ^?
if (isStudent(tom)) {
  tom;
  // ^?
}
```

Để biết chi tiết về type guard function, xem trang sau:

[Type guard function](../../functions/type-guard-functions.md)

## zod hữu ích cho việc kiểm tra interface phức tạp

Như ví dụ về type guard function, tôi đã trình bày implementation của `isStudent` ở trên, nhưng khi xem nội dung có thể thấy cần logic kiểm tra kiểu cho từng property. Nếu property ít, implementation của type guard function có thể giữ ngắn trong phạm vi bảo trì được, nhưng có thể tưởng tượng khi property nhiều sẽ trở thành code khó bảo trì.

Trong trường hợp đó, [zod](https://zod.dev/) rất hữu ích. zod là thư viện kiểm tra cấu trúc object, được tạo cho TypeScript. Với zod, khi định nghĩa cấu trúc object, sẽ có được type guard function kiểm tra cấu trúc. Dưới đây là ví dụ implement `isStudent` bằng zod:

```ts twoslash
import z from "zod";

// Định nghĩa schema bằng zod
const studentSchema = z.object({
  name: z.string(),
  grade: z.number(),
});
// Suy luận kiểu của interface
type Student = z.infer<typeof studentSchema>;
//   ^?
// Type guard function
function isStudent(value: unknown): value is Student {
  return studentSchema.safeParse(value).success;
}
// Kiểm tra kiểu
const tom: object = { name: "Tom", grade: 2 };
if (isStudent(tom)) {
  tom;
  //^?
}
```

Với zod, code trở nên declarative, không cần tự viết implementation chi tiết của type guard function. Khi cần type guard function cho interface có nhiều property hoặc interface có cấu trúc lồng nhau, nên xem xét việc sử dụng zod.

## Abstract class và `instanceof`

TypeScript có [abstract class](./../class/abstract-class.md) tương tự interface. Khác với interface, abstract class có thể sử dụng toán tử `instanceof`. Lý do là vì abstract class vẫn tồn tại dưới dạng class ngay cả sau khi compile.

```ts twoslash
abstract class AbstractClass {}
class ConcreteClass extends AbstractClass {}
const obj = new ConcreteClass();
console.log(obj instanceof AbstractClass);
// @log: true
```
