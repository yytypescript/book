# Truy cập phần tử array

## Truy cập phần tử array trong JavaScript

Để truy cập phần tử của array trong JavaScript, sử dụng bracket `[]`. Trong bracket, viết số index của phần tử cần truy cập. Số index bắt đầu từ 0. Ví dụ, để truy cập phần tử đầu tiên của `abc = ["a", "b", "c"]`, viết `abc[0]`.

```js twoslash
const abc = ["a", "b", "c"];
console.log(abc[0]);
// @log: "a"
```

Trong JavaScript, có thể truy cập bằng số index không tồn tại. Trong trường hợp đó, JavaScript không báo lỗi. Giá trị nhận được là `undefined`.

```js twoslash
const abc = ["a", "b", "c"];
console.log(abc[100]);
// @log: undefined
```

## Kiểu của phần tử trong TypeScript

Trong TypeScript, khi lấy phần tử từ array kiểu `Type[]`, kiểu của giá trị đó là `Type`. Ví dụ, kiểu của phần tử thứ 0 từ array kiểu `string[]` là `string`.

```ts twoslash
const abc: string[] = ["a", "b", "c"];
const character: string = abc[0];
```

Như đã giải thích, trong JavaScript khi truy cập phần tử bằng index không tồn tại, không báo lỗi mà nhận được `undefined`. Tuy nhiên, TypeScript compiler cũng không cảnh báo về việc truy cập phần tử không tồn tại.

```ts twoslash
const abc = ["a", "b", "c"];
const character: string = abc[100]; // Không báo lỗi
```

Giá trị lấy được từ truy cập phần tử có thể là `string` hoặc `undefined`, nhưng TypeScript luôn coi nó là kiểu string. Do đó, lỗi khi truy cập phần tử trả về `undefined` không thể phát hiện bởi TypeScript mà chỉ xuất hiện khi chạy JavaScript.

```ts twoslash
const abc = ["a", "b", "c"];
const character: string = abc[100];
console.log(character);
// @log: undefined
character.toUpperCase();
// @error: Cannot read properties of undefined (reading 'toUpperCase')
```

## Cài đặt để truy cập phần tử type-safe trong TypeScript

Để TypeScript chỉ ra vấn đề này, cần bật compiler option `noUncheckedIndexedAccess`.

[noUncheckedIndexedAccess](../../tsconfig/nouncheckedindexedaccess.md)

Khi bật option này, ví dụ kiểu của giá trị lấy được từ array `string[]` sẽ là `string | undefined`, nghĩa là kiểu string hoặc undefined.

```ts twoslash
const abc: string[] = ["a", "b", "c"];
const character: string | undefined = abc[0];
character.toUpperCase();
// @error: Object is possibly 'undefined'.
```

Với kiểu `string | undefined`, không thể gọi các method của kiểu string như `toUpperCase`. Do đó, cần thu hẹp biến để chỉ còn kiểu string bằng câu lệnh if. Khi đó, có thể gọi method của kiểu string mà không bị compile error.

```ts twoslash
const abc: string[] = ["a", "b", "c"];
const character = abc[0];
// Điều kiện thu hẹp
if (typeof character === "string") {
  character.toUpperCase(); // Không bị compile error
}
```

Khuyến nghị bật `noUncheckedIndexedAccess` để đảm bảo an toàn khi truy cập phần tử array.
