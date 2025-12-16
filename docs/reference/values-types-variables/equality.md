---
sidebar_label: Equality (sự bằng nhau)
---

# Equality (sự bằng nhau)

Trong bất kỳ ngôn ngữ nào, đều có lúc cần so sánh giá trị. Trong JavaScript, có hai toán tử so sánh bằng là toán tử bằng (`==`) và toán tử bằng nghiêm ngặt (`===`). Lý do có hai toán tử để kiểm tra bằng nhau là vì không phải lúc nào cùng một thứ cũng được coi là bằng nhau.

## Bằng nhau với `===`

Đúng như tên gọi "nghiêm ngặt", bằng nhau với toán tử này nghĩa là **type bằng nhau VÀ giá trị bằng nhau**. Hành vi này giống với `==` trong các ngôn ngữ chỉ có một toán tử so sánh bằng.

Ví dụ sau có thể bạn thấy là đương nhiên.

```js twoslash
// JavaScript

console.log(null === undefined);
// @log: false
console.log(0 === 0n);
// @log: false
console.log(0 === "0");
// @log: false
```

`0n` là kiểu bigint chứ không phải kiểu number.

[Kiểu bigint](./bigint.md)

## Bằng nhau với `==`

Dù chỉ là toán tử bằng thông thường, nhưng toán tử này **có thể coi là bằng nhau ngay cả khi type khác nhau**. Chính xác hơn, khi type của giá trị khác nhau, nó sẽ thử convert type rồi mới so sánh giá trị.

```ts twoslash
console.log(null == undefined);
// @log: true
console.log(0 == 0n);
// @log: true
console.log(0 == "0");
// @log: true
console.log(0 == "");
// @log: true
console.log(0 == false);
// @log: true
console.log("0" == false);
// @log: true
console.log("" == false);
// @log: true
// @noErrors
```

`"0" == false` và `"" == false` đều trả về `true`, nhưng cần lưu ý rằng `"" == "0"` lại là `false`.

## Khi nào dùng `==` và `===`, hay phân biệt sử dụng

Từ quan điểm tránh hành vi không mong muốn, nên thường xuyên dùng toán tử bằng nghiêm ngặt (`===`), và dùng toán tử bằng (`==`) khi cần thiết. Tuy nhiên, hầu hết "khi cần thiết" đó là `x == null`. Điều này trả về `true` khi biến x là `null` hoặc `undefined`.

## Các giá trị cần cẩn thận khi so sánh bằng

Có những giá trị nếu so sánh bằng không cẩn thận sẽ trả về `false` và cần chú ý.

- `NaN`
- Giá trị kiểu symbol
- Giá trị kiểu object

### `NaN`

`NaN` là giá trị kiểu number, nhưng khi so sánh với bất kỳ giá trị nào đều trả về `false`. Ngay cả khi so sánh `NaN` với `NaN` cũng trả về `false`.

```js twoslash
// JavaScript

console.log(NaN == NaN);
// @log: false
console.log(NaN === NaN);
// @log: false
```

Sử dụng tính chất này, có thể kiểm tra xem giá trị có phải `NaN` không.

```ts twoslash
function isNaN(value: unknown): boolean {
  return value !== value;
}

console.log(isNaN(1));
// @log: false
console.log(isNaN(NaN));
// @log: true
```

### Giá trị kiểu symbol

Kiểu symbol, dù so sánh các giá trị có cùng description (tham số đầu tiên), nếu không tham chiếu đến cùng một biến thì sẽ trả về `false`.

```ts twoslash
console.log(Symbol("piano") == Symbol("piano"));
// @log: false
console.log(Symbol("piano") === Symbol("piano"));
// @log: false
const sym = Symbol(2);
console.log(sym === sym);
// @log: true
```

### Giá trị kiểu object

Kiểu object, dù so sánh các object có cùng cặp property và value, nếu không tham chiếu đến cùng một biến thì sẽ trả về `false`. Đây là hành vi đương nhiên với những người hiểu về object.

```js twoslash
// JavaScript

console.log({} == {});
// @log: false
console.log({} === {});
// @log: false
console.log({ age: 18 } == { age: 18 });
// @log: false
console.log({ equipment: "glasses" } === { equipment: "glasses" });
// @log: false
const obj = { hair: "blond" };
console.log(obj === obj);
// @log: true
// @noErrors
```

## Tóm tắt
