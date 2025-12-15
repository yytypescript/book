---
description: Làm nghiêm ngặt check null và undefined
tags: [strict]
image: /img/strictNullChecks.png
---

# strictNullChecks

`strictNullChecks` là compiler option làm nghiêm ngặt check `null` và `undefined`.

- Mặc định: `true` nếu [strict](./strict.md) được bật, ngược lại là `false`
- Phiên bản thêm vào: 2.0
- TypeScript khuyến nghị nên bật

## Nguy cơ của việc có thể gán `null` và `undefined`

Trong TypeScript khi `strictNullChecks` là `false`, việc gán `null` và `undefined` không được check. Có thể gán `null` và `undefined` vào biến non-null type hoặc non-undefined type.

```ts twoslash title="Khi strictNullChecks là false"
// @strictNullChecks: false
const date: Date = null; // OK
const error: Error = undefined; // OK
```

`null` và `undefined` không có property. Do đó khi chạy JavaScript sẽ báo lỗi:

```ts twoslash
const date: Date = null; // OK
// ---cut---
date.getDay();
// @error: Cannot read properties of null (reading 'getDay')
// @strictNullChecks: false
```

Khi `strictNullChecks` là `true`, việc gán `null` vào non-null type, gán `undefined` vào non-undefined type sẽ báo compile error:

```ts twoslash title="Khi strictNullChecks là true"
// @strictNullChecks: true
// @errors: 2322
const date: Date = null;
const error: Error = undefined;
```

## Ảnh hưởng đến return value type của function

Cấu hình `strictNullChecks` có thể thay đổi return value type của function. Return value type của method `find` của array là type của phần tử hoặc `undefined`. Tuy nhiên, khi `strictNullChecks` là `false`, compiler sẽ không xem xét khả năng return value là `undefined`. Tương tự với function có thể trả về `null` như `getElementById`.

```ts twoslash title="Khi strictNullChecks là false"
// @strictNullChecks: false
const result = [1, 2, 3].find((x) => x == 1);
//    ^?
const element = document.getElementById("main");
//    ^?
```

Khi `strictNullChecks` là `true`, compiler sẽ xem xét khả năng return value là `undefined` hoặc `null`. Do đó `find` sẽ là union type của type phần tử và `undefined`, `getElementById` sẽ là `HTMLElement | null`:

```ts twoslash title="Khi strictNullChecks là true"
// @strictNullChecks: true
const result = [1, 2, 3].find((x) => x == 1);
//    ^?
const element = document.getElementById("main");
//    ^?
```

Hiệu ứng của cấu hình này cũng ảnh hưởng đến user-defined type guard function. Ví dụ, ngay cả khi type annotate return value của function là `string | undefined`, nếu `strictNullChecks` là `false` thì sẽ trở thành `string` type:

```ts twoslash title="Khi strictNullChecks là false"
// @strictNullChecks: false
// User-defined type guard function
function getStringOrUndefined(): string | undefined {
  return undefined;
}
const value = getStringOrUndefined();
//    ^?
```

## Nên bật `strictNullChecks`

Việc có thể gán `null` hoặc `undefined` vào biến không mong đợi chúng là nguy hiểm. Ngoài ra, việc không thấy được khả năng return value của function là `null` hoặc `undefined` cũng là nguyên nhân gây bug không mong muốn. Khuyến nghị nên set `strictNullChecks` thành `true`.

<PostILearned>

😱TypeScript mặc định không check việc gán null và undefined (có thể gán vào bất kỳ type nào)
✅Đặt compiler option strictNullChecks thành true để check việc gán null và undefined
👍Nên bật strictNullChecks

</PostILearned>

## Thông tin liên quan

[strict](./strict.md)

[null型](../values-types-variables/null.md)

[undefined型](../values-types-variables/undefined.md)
