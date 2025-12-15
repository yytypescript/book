# Tạo type property từ object

## Muốn lấy chỉ property từ object

[Tạo type key từ object](generates-type-from-object-key.md)

Trái ngược với trang trước, mục tiêu là lấy union type chỉ của property từ object. Lần này cũng giống như lần trước, giả sử có message sau được định nghĩa.

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
```

Cuối cùng, union type như sau là mục tiêu lần này.

```ts twoslash
type ConfirmationMessage =
  | "Are you sure?"
  | "Êtes-vous sûr?"
  | "Está seguro?"
  | "よろしいですか？"
  | "您确定吗？";
```

## Để giải bài toán lần này

Lần này có thể thực hiện bằng cách kết hợp phương pháp tạo type từ object đã giới thiệu trước đó và Mapped Types.

[Tạo type từ object](generates-type-from-object.md)

[Tạo type key từ object](generates-type-from-object-key.md)

Cách tiếp cận là đầu tiên tạo type key từ object, sử dụng Mapped Types để tham chiếu type property của object, và lấy chúng dưới dạng literal type.

### Tạo type key

Tạo type key giống với trang trước. Có thể lấy được union type của ngôn ngữ là key bằng cách sau. Để biết chi tiết, hãy xem trang tạo type key từ object.

[Tạo type key từ object](generates-type-from-object-key.md)

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
// ---cut---
type Language = keyof typeof conf;
//   ^?
```

### Mapped Types

Sử dụng Mapped Types để tham chiếu type property của object. Khi đó sử dụng `typeof` để tạo type từ object gốc.

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
type Language = keyof typeof conf;
// ---cut---
type ConfirmationMessage = (typeof conf)[Language];
//   ^?
```

### Làm cho có thể lấy literal type

Nếu để nguyên như này, giống như tạo type từ object, type không phải là literal type. Nghĩa là chỉ là union type của `string` type tức là `string` type. Vì vậy, thêm `as const` vào object gốc `conf`.

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
} as const;
```

## Tóm tắt

Tùy ý gán type key `Language` đã định nghĩa vào phần key của Mapped Types. Hình thức cuối cùng như sau.

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
} as const;

type ConfirmationMessage = (typeof conf)[keyof typeof conf];
//   ^?
```

Đừng quên `as const`.
