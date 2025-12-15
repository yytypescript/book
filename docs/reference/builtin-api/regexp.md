---
title: RegExp
---

RegExp là class built-in của JavaScript cho regular expression. Vì là built-in nên có 2 cách viết: literal và sử dụng constructor.
Trang này đề cập đến kiểu RegExp trong JavaScript, không đề cập trực tiếp đến bản thân regular expression.

Kiểu RegExp dạng literal bao quanh ký tự cần tìm bằng `/` và viết flag ở cuối. Còn với constructor, tham số thứ nhất là ký tự cần tìm, tham số thứ hai là flag. Các kiểu RegExp sau đây giống nhau:

```ts twoslash
const regexp1 = /0(8|9)0-[0-9]{4}-[0-9]{4}/g;
const regexp2 = new RegExp("0(8|9)0-[0-9]{4}-[0-9]{4}", "g");
```

Lúc này, với `\`, khi sử dụng constructor cần viết hai lần. Các kiểu RegExp sau đây giống nhau:

```ts twoslash
const regexp1 = /0(8|9)0-\d{4}-\d{4}/g;
const regexp2 = new RegExp("0(8|9)0-\\d{4}-\\d{4}", "g");
```

Đặc biệt, khi muốn tìm 1 ký tự backslash `\`, với constructor cần viết 4 ký tự `\\\\`, cần lưu ý.

Khi muốn thay đổi động đối tượng tìm kiếm thì dùng constructor, còn nếu không có lý do đặc biệt thì nên dùng literal.

## Thao tác với RegExp

### Kiểm tra xem có ký tự khớp trong chuỗi hay không - `Regexp.prototype.test()`

Để tìm kiếm chuỗi tham số thứ nhất bằng regular expression, sử dụng method `test`.
Trả về `true` nếu có ký tự khớp, ngược lại trả về `false`.

```ts twoslash
const regex = /日/;

console.log(regex.test("日曜日"));
// @log: true
```

### Tìm kiếm ký tự khớp trong chuỗi - `Regexp.prototype.exec()`

Tìm kiếm chuỗi tham số thứ nhất bằng regular expression và trả về kết quả dạng kiểu `string[]`.
Phần tử thứ 0 của `string[]` là chuỗi khớp, từ phần tử thứ 1 trở đi chỉ khi đặt capture group mới lấy được chuỗi khớp với pattern.
Trả về `null` nếu không có ký tự khớp.

```ts twoslash
const regex = /(.日).*(.日).*(.日).*(.日).*(.日)/;
const results = regex.exec("03月01日は日曜日で祝日、晴れの日でした。");

console.log(results);
// @log: ["1日は日曜日で祝日、晴れの日", "1日", "は日", "曜日", "祝日", "の日"]
```

## Method của string sử dụng RegExp

### Tìm kiếm chuỗi - `String.prototype.match()`

Tìm kiếm chuỗi bằng `RegExp`. Có thể sử dụng tương tự `Regexp.prototype.exec()`.
Kết quả trả về dạng kiểu `string[]`, phần tử thứ 0 là chuỗi khớp, từ phần tử thứ 1 trở đi khi đặt capture group sẽ lấy được chuỗi khớp với pattern.
Trả về `null` nếu không có ký tự khớp.

```ts twoslash
const regex = /(.日).*(.日).*(.日).*(.日).*(.日)/;
const str = "03月01日は日曜日で祝日、晴れの日でした。";

console.log(str.match(regex));
// @log: ["1日は日曜日で祝日、晴れの日", "1日", "は日", "曜日", "祝日", "の日"]
```

### Lưu ý khi dùng `String.prototype.match()`

Khi RegExp có flag g, sẽ trả về mảng các chuỗi khớp hoàn toàn và không trả về capture group.

```ts twoslash
const regex1 = /(.日)/;
const regex2 = /(.日)/g;
const str = "03月01日は日曜日で祝日、晴れの日でした。";

console.log(str.match(regex1));
// @log: ["1日", "1日"]
console.log(str.match(regex2));
// @log: ["1日", "は日", "曜日", "祝日", "の日"]
```

## Về Named capturing groups

Có Named capturing groups cho phép chỉ định tên cho capture group, nhưng tiếc là không tương thích tốt với TypeScript.
Trong ví dụ sau, với Named capturing groups `pref` và `ward` sẽ khớp với `"静岡県"` và `"磐田市"` nhưng TypeScript không đảm bảo rằng giá trị đã được set cho property đó. Nên dùng optional chaining khi lấy giá trị.

```ts twoslash
const regex = /(?<pref>.+[都道府県])(?<ward>.+[市区町村])/gu;
const str = "静岡県磐田市気子島";
const match = regex.exec(str);

console.log(match?.groups?.pref);
// @log: "静岡県"
console.log(match?.groups?.ward);
// @log: "磐田市"

// @errors: 2532
```

[Optional chaining](../values-types-variables/object/optional-chaining.md)
