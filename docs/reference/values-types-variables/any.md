---
sidebar_label: Kiểu any
---

# Kiểu any

Kiểu any trong TypeScript là kiểu cho phép gán bất kỳ giá trị nào. Dù là primitive type hay object, bạn có thể gán gì vào cũng không gây lỗi.

```ts twoslash
let value: any;
value = 1; // OK
value = "string"; // OK
value = { name: "Object" }; // OK
```

Ngoài ra, với biến kiểu any, compiler sẽ không thực hiện type checking nữa. Ngay cả code sẽ lỗi khi chạy, compiler cũng không cảnh báo. Trong ví dụ sau, ta gán số vào biến `str`. Tuy nhiên `toLowerCase` ở dòng 2 là method của string mà không tồn tại trong number, nên khi chạy sẽ gây lỗi. Mâu thuẫn đơn giản như vậy TypeScript compiler có thể phát hiện được, nhưng với giá trị được type annotation là any thì compiler sẽ không cảnh báo.

```ts twoslash
const str: any = 123;
str.toLowerCase();
// @error: TypeError: str.toLowerCase is not a function
```

## Implicit any

Khi bỏ qua type annotation và không thể suy luận type từ context, TypeScript sẽ ngầm định coi type là any. Ví dụ như khi bỏ qua type annotation của tham số.

Trong ví dụ sau, biến `name` được xác định là any nên type checking sẽ pass. Tuy nhiên vì giá trị number gọi method `toUpperCase()` nên sẽ phát sinh lỗi undefined method.

```ts twoslash
function hello(name) {
  //           ^?
  console.log(`Hello, ${name.toUpperCase()}`);
}

// @error: name.toUpperCase is not a function
hello(1);
// @noImplicitAny: false
```

Như vậy implicit any có thể vượt qua type checking và gây runtime error. TypeScript cung cấp option `noImplicitAny` để kiểm soát implicit any.

Bằng cách setting `noImplicitAny: true` trong tsconfig.json, khi TypeScript suy luận type là any sẽ phát sinh lỗi.

```ts twoslash
// @errors: 7006
function hello(name) {
  console.log(`Hello, ${name.toUpperCase()}`);
}
```

[noImplicitAny](../tsconfig/noimplicitany.md)

## any có tệ không?

any là type đặc biệt dùng khi muốn vô hiệu hóa compiler check. Lạm dụng any sẽ làm yếu type checking và khó phát hiện bug. Có thể nói any là type từ bỏ type checking, nhưng không phải lúc nào cũng tệ. Dùng any vô cớ là vấn đề, nhưng có những trường hợp buộc phải dùng any, hoặc ưu tiên tạo code chạy được trước rồi mới lo type safety sau. Mức độ chấp nhận any, mức độ nghiêm ngặt của type checking phụ thuộc nhiều vào trình độ team và định hướng dự án.

## "TypeScript không cố gắng quá"

TypeScript là ngôn ngữ static typing giúp viết code an toàn hơn nhờ type checking.
Với người đã quen viết dynamic typing language như JavaScript, việc viết static type khi implement có thể cảm thấy khó khăn.

Thực tế khi chưa quen, có thể mất cả ngày để tìm hiểu và giải quyết nguyên nhân compile error.

TypeScript có approach "TypeScript không cố gắng quá".

Ưu điểm lớn của TypeScript là có thể tự do control các ràng buộc về type. any cũng là một trong số đó. Ví dụ khi gặp khó với compile error, chỉ cần dùng any là có thể giải quyết compile error tạm thời.

Ngoài ra khi đưa TypeScript vào dự án JavaScript có sẵn có thể phát sinh rất nhiều compile error. Nếu không giải quyết hết compile error thì không thể hoàn thành việc đưa TypeScript vào, có thể dẫn đến bỏ cuộc giữa chừng. Trong trường hợp đó, tích cực sử dụng any để giải quyết compile error, sau đó từng bước typing dần cũng là một phương án.

Lý tưởng là toàn bộ implementation đều type-safe, nhưng ngay cả chỉ một phần type-safe thôi cũng đã nhận được lợi ích lớn so với chỉ dùng JavaScript hoàn toàn không có type checking.

Ràng buộc bởi type chỉ là một phương tiện để viết code an toàn hơn. Dành thời gian cho ràng buộc type mà không tạo được thứ chạy được thì đánh mất đi mục đích.

Khi cảm thấy mệt mỏi với type system của TypeScript, hãy nhớ đến approach "TypeScript không cố gắng quá".

<PostILearned>

・any cho phép gán bất kỳ type nào
・any không được type checking
・Biến không thể type inference sẽ ngầm định là any
・any không hẳn là tệ tùy cách dùng
・Có tư duy "TypeScript không cố gắng quá"

</PostILearned>

## Thông tin liên quan

[Kiểu unknown](../statements/unknown.md)

[any vs unknown](../statements/any-vs-unknown.md)
