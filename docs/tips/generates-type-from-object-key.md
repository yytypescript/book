# Tạo type key từ object

## Muốn lấy chỉ key từ object

Giả sử có message được định nghĩa theo từng ngôn ngữ.

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
```

Nội dung là message hệ thống bình thường để xác nhận. Sử dụng object này để tạo danh sách các ngôn ngữ hệ thống hỗ trợ. Union type sau là mục tiêu lần này.

```ts twoslash
type Language = "en" | "fr" | "es" | "ja" | "zh";
```

### `typeof`

`typeof` xuất hiện thường xuyên này không phải của JavaScript, mà là `typeof` của TypeScript. Ví dụ sử dụng nó với object có ở trang trước.

[Tạo type từ object](generates-type-from-object.md)

Nếu thực thi với ví dụ này, type `TypeOfLanguage` như sau sẽ được tạo (tên type chỉ là cho tiện).

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
// ---cut---
type TypeOfLanguage = typeof conf;
//   ^?
```

Đến đây thì chỉ còn một chút nữa. Chỉ biến key của type `TypeOfLanguage` thành type.

### `keyof`

`keyof` khi sử dụng với type của object sẽ trả về key của object đó dưới dạng union type. Nếu có type `TypeOfLanguage` ở trên

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
type TypeOfLanguage = typeof conf;
// ---cut---
type Language = keyof TypeOfLanguage;
//   ^?
```

sẽ được như vậy.

[keyof type operator](../reference/type-reuse/keyof-type-operator.md)

## Tóm tắt

Mặc dù trông hơi kỳ lạ, nhưng có thể tạo union type của key mong muốn từ object bằng cách sau.

```ts twoslash
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
type TypeOfLanguage = typeof conf;
// ---cut---
type Language = keyof typeof conf;
//   ^?
```

### Câu hỏi: `keyof conf` không được sao?

Không hoạt động. Vì `keyof` có thể sử dụng với type (của object) chứ không phải value. Mặt khác `typeof` tạo type từ value nên cần sử dụng theo thứ tự này.
