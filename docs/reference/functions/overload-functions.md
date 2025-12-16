---
sidebar_label: Overload function
---

# Overload function (hàm nạp chồng)

Overload function là tính năng của TypeScript cho phép một hàm có nhiều function signature khác nhau. Function signature là kiểu của hàm bao gồm các tham số và kiểu trả về. Nói cách khác, hàm có nhiều pattern khác nhau về tham số và giá trị trả về được gọi là overload function.

## Cú pháp overload function

Trong TypeScript, overload function được viết thành 2 phần: function signature và implementation.

```ts twoslash
// Phần function signature
function hello(person: string): void; // Signature 1
function hello(persons: string[]): void; // Signature 2
// Phần implementation
function hello(person: string | string[]): void {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
}
```

Phần function signature được viết nhiều lần tùy theo số pattern overload. Phần này định nghĩa interface nên không thể viết body của hàm.

Phần implementation viết hàm bao quát tất cả các pattern overload. Nó cần bao quát mọi pattern về số lượng và kiểu của tham số. Logic cũng cần sử dụng phân nhánh để viết xử lý cho từng pattern.

Tên hàm của function signature và phần implementation phải giống nhau.

Tổng quát hóa cú pháp overload function như sau:

```js
function tênHàm functionSignature1
function tênHàm functionSignature2
function tênHàm implementationBaoQuátTấtCảSignature
```

## Kết quả compile của overload function

Khi compile overload function từ TypeScript sang JavaScript, phần function signature và type annotation sẽ bị xóa, code trở thành như sau:

```ts twoslash title="JavaScript sau khi compile"
// @showEmit
// @target: esnext
// @alwaysStrict: false
function hello(person: string): void;
function hello(persons: string[]): void;
function hello(person: string | string[]): void {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
}
```

## Tại sao không giống overload của Java?

Overload cũng có trong các ngôn ngữ khác như các ngôn ngữ JVM bắt đầu từ Java, C#, Swift, v.v. Nếu bạn biết overload của các ngôn ngữ này, overload của TypeScript có thể trông độc đáo.

Cách viết overload của các ngôn ngữ khác cho phép viết implementation cho từng signature. Ví dụ, trong Kotlin - một ngôn ngữ JVM, có thể viết như sau. So với TypeScript, implementation được tách riêng cho từng signature, không có if phân nhánh, có thể dễ đọc hơn.

```kotlin title="Overload function trong Kotlin"
fun hello(person: String) {
  println("Hello $person")
}

fun hello(persons: Array<String>) {
  println("Hello ${persons.joinToString(",")}")
}
```

Vậy tại sao TypeScript không áp dụng cách viết này? Lý do là JavaScript không có overload.

Phương châm cơ bản của TypeScript là "code TypeScript thành JavaScript khi xóa phần liên quan đến type". Nhờ đó, developer không cần xác nhận xem code TypeScript có compile thành JavaScript như ý muốn hay không, chỉ cần nhìn code TypeScript là có thể dự đoán được code JavaScript.

Nếu áp dụng overload giống Java, vì JavaScript không có overload, TypeScript sẽ phải sinh logic giải quyết gọi hàm nào khi compile. Điều đó sẽ lệch xa khỏi phương châm cơ bản của TypeScript. Tính dự đoán từ source code cũng giảm. Vì vậy, overload của TypeScript chỉ dừng lại ở việc định nghĩa function signature.

## Arrow function và overload

Cú pháp overload function chỉ có cho function declaration. Arrow function không có cú pháp overload. Để tạo overload function với arrow function, cần dùng call signature để type annotation.

```ts twoslash
// Định nghĩa type Hello bằng call signature
type Hello = {
  (person: string): void;
  (persons: string[]): void;
};
// Type annotation bằng type Hello
const hello: Hello = (person: string | string[]): void => {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
};
```

Ngoài call signature, cũng có thể dùng function type và intersection type.

```ts twoslash {1-2}
// Định nghĩa type Hello bằng function type và intersection type
type Hello = ((person: string) => void) & ((persons: string[]) => void);
const hello: Hello = (person: string | string[]): void => {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
};
```

## Viết function signature theo thứ tự chi tiết

Thứ tự function signature trong overload rất quan trọng. TypeScript thử function signature từ trên xuống và áp dụng signature đầu tiên match. Vì vậy, function signature chi tiết hơn phải ở trên, ít chi tiết hơn ở dưới. Chi tiết nghĩa là phạm vi type của tham số hẹp. Ví dụ, `1 | 2` hẹp hơn `number`. `any` rộng hơn `number`.

```ts twoslash
function func(param: 1 | 2): 1 | 2; // Hàm chi tiết
function func(param: number): number; // Hàm tương đối chi tiết
function func(param: any): any; // Hàm không chi tiết
function func(param: any): any {
  // ...
}
const result1 = func(1);
//    ^?
const result2 = func(100);
//    ^?
const result3 = func("others");
//    ^?
```

Nếu sai lầm viết hàm chi tiết ở dưới như sau, hàm chi tiết sẽ không bao giờ được áp dụng.

```ts twoslash title="Sai: Thứ tự signature sai"
function func(param: any): any; // Hàm không chi tiết. Được áp dụng
function func(param: 1 | 2): 1 | 2; // Hàm chi tiết. Không được áp dụng
function func(param: any): any {
  // ...
}
const result = func(1);
//     ^?
```

## Hãy cân nhắc các phương pháp khác ngoài overload

Có những trường hợp nên dùng phương pháp khác thay vì overload function.

### Dùng optional parameter thay thế

Nếu chỉ khác số lượng tham số, nên dùng [optional parameter](./optional-parameters.md) thay vì overload. Ví dụ, overload function sau không thể truyền `undefined` cho tham số thứ 2 khi [strictNullChecks](../tsconfig/strictnullchecks.md) được bật.

```ts twoslash title="Ví dụ dùng overload"
// @strictNullChecks: true
// @errors: 2345
function func(one: number): void;
function func(one: number, two: number): void;
function func(one: number, two?: number): void {}
func(1, undefined);
```

Trường hợp này nên chỉ dùng [optional parameter](./optional-parameters.md) như sau.

```ts twoslash title="Ví dụ dùng optional parameter"
// @strictNullChecks: true
function func(one: number, two?: number): void {}
func(1, undefined);
```

### Dùng union type thay thế

Nếu chỉ khác kiểu tham số, dùng [union type](../values-types-variables/union.md) sẽ đơn giản hơn.

```ts twoslash title="Ví dụ dùng overload"
function func(x: string): void;
function func(x: number): void;
function func(x: string | number) {}
```

```ts twoslash title="Ví dụ dùng union type"
function func(x: string | number) {}
```

### Dùng generics thay thế

Nếu có quan hệ nhất định giữa kiểu tham số và kiểu trả về, dùng [generics](../generics/README.md) có thể đơn giản hơn.

```ts twoslash title="Ví dụ dùng overload"
function func(x: boolean): boolean;
function func(x: number): number;
function func(x: string): string;
function func(x: boolean | string | number): boolean | string | number {
  return x;
}
```

```ts twoslash title="Ví dụ dùng generics"
function func<T extends boolean | number | string>(x: T): T {
  return x;
}
```
