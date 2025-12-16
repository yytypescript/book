---
sidebar_label: Kiểu liệt kê
slug: /reference/values-types-variables/enum
---

# Kiểu liệt kê (enum)

Trong TypeScript, sử dụng kiểu liệt kê (enum) cho phép biểu diễn code với ý nghĩa gắn liền với một tập hợp các hằng số.

Để khai báo kiểu liệt kê, viết keyword `enum` theo sau là tên enum và các member. Trong ví dụ sau, `Position` là tên enum, còn `Top`, `Right`, `Bottom`, `Left` là các member.

```ts twoslash
enum Position {
  Top,
  Right,
  Bottom,
  Left,
}
```

Keyword `enum` là riêng của TypeScript. Vì vậy khi compile sang JavaScript sẽ thành code như sau.

<!--prettier-ignore-->
```js
var Position;
(function (Position) {
    Position[Position["Top"] = 0] = "Top";
    Position[Position["Right"] = 1] = "Right";
    Position[Position["Bottom"] = 2] = "Bottom";
    Position[Position["Left"] = 3] = "Left";
})(Position || (Position = {}));
```

Như bạn thấy, một object cùng tên với enum được định nghĩa. Các member của enum trở thành property của object. Giá trị là số thứ tự bắt đầu từ 0.

```ts twoslash
enum Position {
  Top,
  Right,
  Bottom,
  Left,
}
// ---cut---
console.log(Position.Top); // 0
console.log(Position.Right); // 1
console.log(Position.Bottom); // 2
```

Tên enum có thể được sử dụng như một type.

```ts twoslash
enum Position {
  Top,
  Right,
  Bottom,
  Left,
}
// ---cut---
let position: Position;
//            ^^^^^^^^type
```
