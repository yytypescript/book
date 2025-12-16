# Markdown

Markdown ngoài cú pháp tiêu chuẩn còn có các specification được mở rộng riêng cho project này.

## Frontmatter

Có thể viết meta information và setting của trang vào frontmatter khi cần. Frontmatter có format YAML.

```yaml
---
slug: /reference/function
---
```

Các setting có thể sử dụng như sau.

| Key             | Type       | Mô tả                                                                                                                                                                            |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sidebar_label` | `string`   | Tiêu đề trang hiển thị trên sidebar, navigation trang trước/sau, và block link nội bộ. Nếu không chỉ định, nội dung heading đầu tiên sẽ hiển thị trên sidebar.                   |
| `slug`          | `string`   | Phần path của URL trang. Nếu không chỉ định, tên file bỏ extension sẽ là `slug`.                                                                                                 |
| `tags`          | `string[]` | Tag của trang. Giá trị mặc định là `[]`.                                                                                                                                         |
| `description`   | `string`   | Tóm tắt trang. Được dùng cho `<meta name="description" content="..."/>` và mô tả trong block link nội bộ. Nếu không chỉ định, đoạn văn đầu tiên của content sẽ là `description`. |
| `title`         | `string`   | Tiêu đề trang. Nếu chỉ định cái này, không cần thêm heading vào Markdown.                                                                                                        |
| `image`         | `string`   | Path của ảnh OGP. Chỉ định path tương đối từ thư mục static.                                                                                                                     |

```yaml
---
sidebar_label: Arrow function
slug: /reference/functions/arrow-function
tags:
  - function
  - arrow-function
description: Cách định nghĩa arrow function trong TypeScript
image: /img/ogp.png
---
```

## Heading

Heading level 1 `#` chỉ dùng cho tiêu đề trang.
Các section trong trang dùng heading level 2 `##` trở lên.

```markdown title="Ví dụ"
# Tiêu đề trang

...lời mở đầu...

## Heading lớn

...

### Heading vừa

...
```

## Link

Link nội bộ viết đường dẫn file Markdown bằng **relative path**.

```markdown
Chi tiết xem tại [Function](../references/functions.md).
```

### Block link nội bộ

Block link nội bộ dùng để hiển thị link đến các trang trong site. Như ví dụ sau, đây là component tự động hiển thị tiêu đề trang và mô tả.

[let và const](../reference/values-types-variables/let-and-const.md)

Block link nội bộ có các ưu điểm sau.

- Trang liên quan nổi bật
- Tự động cập nhật theo khi đổi tiêu đề trang đích

Để tạo block link, đặt dòng trống trước và sau, và không viết gì khác trước/sau dòng link nội bộ.

```markdown
...text...

[let và const](../references/values-types-variables/let-and-const.md)

...text...
```

:::caution
Link text của Markdown bị bỏ qua, tiêu đề của trang đích được sử dụng. Ví dụ, nếu tiêu đề của function.md là "Về function", và Markdown là <code>&#91;Function]&#40;./function.md)</code>, thì "Function" bị bỏ qua, hiển thị trên website sẽ là "Về function".
:::

## Inline code

Không đặt khoảng trắng trước/sau inline code.

```markdown
❌ Khai báo biến dùng `const` .
⭕️ Khai báo biến dùng`const`.
```

Để dùng backtick trong inline code, dùng double backtick.

```markdown
Template literal dùng`` ` ``.
```

> Template literal dùng`` ` ``.

## Code block

Code block sẽ có syntax highlight nếu chỉ định tên ngôn ngữ.

````markdown
```ts
// code
```
````

Các ngôn ngữ có thể sử dụng như sau.

- https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages

### Tiêu đề code block

Để thêm tiêu đề cho code block, chỉ định attribute `title`.

````markdown
```ts title="sample.ts"
// sample code
```
````

```ts title="sample.ts"
// sample code
```

### Số dòng

Code block từ 4 dòng trở lên sẽ tự động có số dòng.

```markdown
Dòng 1
Dòng 2
Dòng 3
```

```markdown
Dòng 1
Dòng 2
Dòng 3
Dòng 4
```

### Twoslash

Twoslash là tính năng thêm thông tin từ TypeScript compiler vào sample code. Thông tin được thêm bao gồm type của biến, message compile error, v.v.

#### Hiển thị type của biến

Viết `^?` để hiển thị nội dung type được suy luận của biến.

````markdown
```ts twoslash
const point = { x: 135, y: 35 };
//    ^?
type ReadonlyPoint = Readonly<typeof point>;
//   ^?
```
````

```ts twoslash title="Ví dụ hiển thị"
const point = { x: 135, y: 35 };
//    ^?
type ReadonlyPoint = Readonly<typeof point>;
//   ^?
```

#### Hiển thị error

Dùng `@errors` để hiển thị nội dung compile error.

````markdown
```ts twoslash
// @errors: 7006
function fn(s) {}
```
````

```ts twoslash title="Ví dụ hiển thị"
// @errors: 7006
function fn(s) {}
```

#### Thiết lập compiler option

Viết theo format `@compilerOption: value` để thiết lập compiler option chỉ có hiệu lực trong code block đó.

````markdown
```ts twoslash
// @noImplicitAny: false
function fn(s) {}
```
````

```ts twoslash title="Ví dụ hiển thị"
// @noImplicitAny: false
function fn(s) {}
```

:::tip

Compiler option mặc định của twoslash xem tại tsconfig.twoslash.json.

:::

#### Hiển thị kết quả thực thi

Dùng `@log`, `@warn`, `@error` để styling và hiển thị comment kết quả thực thi.

````markdown
```js twoslash
console.log(123);
// @log: 123
console.warn("message");
// @warn: message
const x = value;
// @error: ReferenceError: value is not defined
```
````

```js twoslash title="Ví dụ hiển thị"
console.log(123);
// @log: 123
console.warn("message");
// @warn: message
const x = value;
// @error: ReferenceError: value is not defined
```

#### Tái hiện code completion

Viết `^|` để tái hiện code completion như trong VS Code.

<!--prettier-ignore-->
````markdown
```ts twoslash
// @noErrors
[1, 2, 3].fin
//           ^|
```
````

<!--prettier-ignore-->
```ts twoslash title="Ví dụ hiển thị"
// @noErrors
[1, 2, 3].fin
//           ^|
```

#### Output JavaScript

Dùng `@showEmit` để hiển thị code JavaScript sau khi compile.

````markdown
```ts twoslash title="Ví dụ hiển thị"
// @showEmit
enum Example {
  FOO,
  BAR,
}
```
````

```ts twoslash title="Ví dụ hiển thị"
// @showEmit
enum Example {
  FOO,
  BAR,
}
```

#### Output file định nghĩa type

Có thể hiển thị kết quả chuyển đổi TypeScript source code thành file định nghĩa type.

````markdown
```ts twoslash
// @declaration: true
// @showEmit
// @showEmittedFile: index.d.ts

export function getStringLength(value: string) {
  return value.length;
}
```
````

```ts twoslash title="Ví dụ hiển thị"
// @declaration: true
// @showEmit
// @showEmittedFile: index.d.ts

export function getStringLength(value: string) {
  return value.length;
}
```

#### Inline highlight (underline)

Phần có underline `^^` sẽ được highlight. Tính năng này chưa được hỗ trợ, chỉ comment underline biến mất.

````markdown
```ts twoslash
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
//                ^^^^^^^^^^
```
````

```ts twoslash title="Ví dụ hiển thị"
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
//                ^^^^^^^^^^
```

:::tip Twoslash Troubleshooting

#### `import` bị compile error (2307)

Khi import module giả không tồn tại, sẽ phát sinh error sau.

> [2307] 0 - Cannot find module 'module name' or its corresponding type declarations.

Khi dùng module giả trong sample code, cần dùng `@filename` để tạo module.

````markdown
```ts twoslash
// @filename: fictional-module.ts
export const fictional = "fictional value!";

// @filename: index.ts
// ---cut---
import { fictional } from "./fictional-module";
//       ^?
```
````

```ts twoslash title="Ví dụ hiển thị"
// @filename: fictional-module.ts
export const fictional = "fictional value!";

// @filename: index.ts
// ---cut---
import { fictional } from "./fictional-module";
//       ^?
```

##### Tạo NPM module giả

Để tạo NPM module giả, chuẩn bị type definition của module bằng `declare module`. Lúc này, module giả không cần `@filename` cũng compile được.

````markdown
```ts twoslash
declare module "fictional-npm-module" {
  const fictional = "fictional NPM module!";
}
// @filename: index.ts
// ---cut---
import { fictional } from "fictional-npm-module";
//       ^?
```
````

```ts twoslash title="Ví dụ hiển thị"
declare module "fictional-npm-module" {
  const fictional = "fictional NPM module!";
}
// @filename: index.ts
// ---cut---
import { fictional } from "fictional-npm-module";
//       ^?
```

:::

### Highlight dòng

Khi muốn người đọc chú ý vào dòng cụ thể, viết số dòng để đổi màu nền của dòng đó.

````markdown
```js twoslash {1,4-6,11} title="Ví dụ highlight dòng"
import React from "react";

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```
````

```js twoslash {1,4-6,11} title="Ví dụ highlight dòng"
import React from "react";

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```

### Auto format sample code

Code block được auto format bằng Prettier.

Nếu không muốn auto format code block, viết `<!--prettier-ignore-->` ngay trước.

<!--prettier-ignore-->
````markdown {4}
```ts
f = x => x;
```

<!--prettier-ignore-->
```ts
f = x => x;
```
````

````markdown {1,6} title="Kết quả format"
```ts
f = (x) => x;
```

<!--prettier-ignore-->
```ts
f = x => x;
```
````

## Hiển thị cảnh báo

Text được bao bởi triple colon `:::` có thể hiển thị dạng cảnh báo.

```markdown
:::note
Text
:::

:::tip
Text
:::

:::info
Text
:::

:::caution
Text
:::

:::danger
Text
:::
```

:::note
Text
:::

:::tip
Text
:::

:::info
Text
:::

:::caution
Text
:::

:::danger
Text
:::

Có thể chỉ định tiêu đề cho hiển thị cảnh báo.

```markdown
:::note Tiêu đề tùy chọn
Text
:::
```

:::note Tiêu đề tùy chọn
Text
:::

## Caption cho hình và bảng

Khi thêm caption cho hình và bảng, có thể dùng `<figure>` và `<figcaption>`.

```markdown
<figure><figcaption>Hình con mèo</figcaption>

![](https://placekitten.com/300/300)

</figure>
```

<figure><figcaption>Hình con mèo</figcaption>

![](https://placekitten.com/300/300)

</figure>

```markdown
<figure><figcaption>Quốc gia và tiền tệ</figcaption>

| Quốc gia | Tiền tệ |
| -------- | ------- |
| Mỹ       | USD     |
| Việt Nam | VND     |

</figure>
```

<figure><figcaption>Quốc gia và tiền tệ</figcaption>

| Quốc gia | Tiền tệ |
| -------- | ------- |
| Mỹ       | USD     |
| Việt Nam | VND     |

</figure>

## Block "Chia sẻ kiến thức"

Block "Chia sẻ kiến thức" giúp người đọc dễ dàng chia sẻ nội dung trang lên X. Nội dung được bao bởi `<PostILearned>` sẽ trở thành nội dung post.

```markdown title="Ví dụ cách viết block Chia sẻ kiến thức"
<PostILearned>

・JavaScript có khai báo biến let và const
・let cho phép gán lại, const không cho phép gán lại
・Cơ bản nên dùng const

</PostILearned>
```

Ví dụ hiển thị:

<PostILearned>

・JavaScript có khai báo biến let và const
・let cho phép gán lại, const không cho phép gán lại
・Cơ bản nên dùng const

</PostILearned>

:::caution Lưu ý về block "Chia sẻ kiến thức"

- Cần có dòng trống ngay sau `<PostILearned>` và ngay trước `</PostILearned>`.
- X có giới hạn số ký tự cho nội dung post, nên hãy chú ý lượng text. Hãy tính toán lượng text với giả định "Từ 『Survival TypeScript』" sẽ được thêm vào cuối.
- Không dùng cú pháp Markdown trong nội dung post. Đặc biệt, thay thế cú pháp list bằng "・".
- Không đưa URL vào nội dung post. Vì post có URL có xu hướng ít hiển thị trên timeline.

:::
