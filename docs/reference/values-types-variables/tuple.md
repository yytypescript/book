---
sidebar_label: Tuple
---

# Tuple

Function của TypeScript chỉ có thể trả về 1 giá trị. Tuy nhiên, thực tế có lúc muốn trả về nhiều giá trị. Trong trường hợp đó, có thể đặt tất cả giá trị muốn trả về vào mảng và return.

Giá trị trả về của function sau là hằng số, nhưng hãy hiểu như kết quả tính toán thực tế.

```ts twoslash
function tuple() {
  //...
  return [1, "ok", true];
}
```

## Vấn đề của mảng

Trong ví dụ trên, kiểu nào là phù hợp cho giá trị trả về? Nếu bạn đã đọc từ trang mảng, có thể nghĩ đến `any[]` hoặc `unknown[]` vì đây là kiểu có thể chứa bất kỳ thứ gì.

```ts twoslash
// @errors: 2571
declare function tuple(): [number, string, boolean];
// ---cut---
const list: unknown[] = tuple();

list[0].toString();
```

Tuy nhiên, không thể gọi method từ `list[n]`. Vì mỗi phần tử của `list` là `unknown`.

Vậy có nên dùng `any[]` làm kiểu giá trị trả về không? Điều đó cũng có vấn đề. Đang dùng TypeScript để tận hưởng lợi ích của kiểu, nhưng ở đây lại code như thể không có kiểu thì nhạt nhẽo. Đó là lúc có thể dùng tuple.

## Kiểu của tuple

Kiểu của tuple đơn giản, chỉ cần viết `[]` và đặt kiểu bên trong. Nghĩa là, function `tuple()` ở trên có thể nói là có giá trị trả về như sau.

```ts twoslash
declare function tuple(): [number, string, boolean];
// ---cut---
const list: [number, string, boolean] = tuple();
```

Tương tự có thể viết ở giá trị trả về của function.

```ts twoslash
function tuple(): [number, string, boolean] {
  //...
  return [1, "ok", true];
}
```

Kiểu mảng có 2 cách viết `T[]` và `Array<T>` nhưng tuple chỉ có cách viết này.

### Đặt label cho tuple

Khi function trả về tuple toàn giá trị cùng kiểu, có thể khó hiểu kiểu đó biểu thị điều gì. Trong trường hợp đó, có thể đặt label cho tuple.

```ts twoslash
declare function tuple(): [x: number, y: number, z: number];
// ---cut---
const coordinate: [x: number, y: number, z: number] = tuple();
```

Với ví dụ này, dễ hiểu rằng đây là giá trị trả về của function trả về tọa độ 3 chiều.

## Truy cập tuple

Biến nhận tuple có thể sử dụng trực tiếp property và method của kiểu bên trong.

```ts twoslash
declare function tuple(): [number, string, boolean];
// ---cut---
const list: [number, string, boolean] = tuple();

list[0].toExponential();
list[1].length;
list[2].valueOf();
```

Biến nhận tuple không thể truy cập phần tử ngoài phạm vi đã định nghĩa trong tuple.

```ts twoslash
// @errors: 2493
declare function tuple(): [number, string, boolean];
// ---cut---
const list: [number, string, boolean] = tuple();

list[5];
```

Do đó, ngay cả khi thực hiện thao tác tăng phần tử mảng như `list.push()`, cũng không thể sử dụng phần tử đó.

### Truy cập tuple có label

Label chỉ được dùng để cải thiện khả năng đọc, không thể dùng label để truy cập trong code thực tế.

```ts twoslash
// @errors: 2339
const tuple = (): [x: number, y: number, z: number] => {
  return [1, 2, 3];
};
// ---cut---
const coordinate: [x: number, y: number, z: number] = tuple();

coordinate[0];
coordinate.x;
```

### Truy cập tuple bằng destructuring assignment

Giá trị trả về của function `tuple()` có thể nhận bằng destructuring assignment như sau.

```ts twoslash
declare function tuple(): [number, string, boolean];
// ---cut---
const [num, str, bool]: [number, string, boolean] = tuple();
```

Ngoài ra, nếu chỉ cần một số giá trị trả về nhất định, chỉ viết `,` mà không viết tên biến.

```ts twoslash
declare function tuple(): [number, string, boolean];
// ---cut---
const [, , bool]: [number, string, boolean] = tuple();
```

## Trường hợp sử dụng tuple

Khi lập trình bất đồng bộ trong TypeScript, có lúc muốn thực hiện các xử lý tốn thời gian song song thay vì tuần tự. Lúc đó TypeScript sử dụng `Promise.all()`. Đây là lúc tuple hữu ích.
Giải thích chi tiết về `Promise` có trang chuyên đề trong sách này. Ở đây chỉ cần nhớ rằng biến kiểu `Promise<T>` khi đặt `await` phía trước sẽ lấy ra được `T`. Ngoài ra, `T` này được gọi là generics, cũng có trang chuyên đề.

[Xử lý bất đồng bộ](../asynchronous/README.md)

[Generics](/reference/generics)

```ts twoslash
// @module: esnext
// @target: esnext
import fs from "fs";

declare function yyAsync(): Promise<number>;
// ---cut---
const promise: Promise<number> = yyAsync();
const num: number = await promise;
```

Ví dụ, giả sử có 2 function `takes3Seconds(), takes5Seconds()` mất 3 giây và 5 giây để xử lý.

```ts twoslash
async function takes3Seconds(): Promise<string> {
  // ...
  return "finished!";
}

async function takes5Seconds(): Promise<number> {
  // ...
  return -1;
}
```

Nếu thực thi trực tiếp các function này sẽ mất 3 + 5 = 8 giây.

```ts twoslash
// @module: esnext
// @target: esnext
import fs from "fs";

declare function takes3Seconds(): Promise<string>;
declare function takes5Seconds(): Promise<number>;
// ---cut---
const str: string = await takes3Seconds();
const num: number = await takes5Seconds();
```

Sử dụng `Promise.all()` có thể viết như sau. Thời gian mất là thời gian của function lâu nhất, tức là 5 giây.

```ts twoslash
// @module: esnext
// @target: esnext
import fs from "fs";

declare function takes3Seconds(): Promise<string>;
declare function takes5Seconds(): Promise<number>;
// ---cut---
const tuple: [string, number] = await Promise.all([
  takes3Seconds(),
  takes5Seconds(),
]);
```

Lúc này biến `tuple` nhận giá trị trả về của `Promise.all()` có kiểu `[string, number]`. Phần generics `Promise<T>` của các function thực thi và thứ tự kiểu của tuple là nhất quán. Nghĩa là nếu đổi chỗ như sau, sẽ nhận được tuple `[number, string]` đã đổi chỗ.

```ts twoslash
// @module: esnext
// @target: esnext
import fs from "fs";

declare function takes3Seconds(): Promise<string>;
declare function takes5Seconds(): Promise<number>;
// ---cut---
const tuple: [number, string] = await Promise.all([
  takes5Seconds(),
  takes3Seconds(),
]);
```

`Promise.all()` không lưu vào tuple giá trị trả về theo thứ tự function kết thúc trước, mà giữ nguyên thứ tự ban đầu. Không phải vì `take3seconds()` kết thúc sớm hơn nên được lưu vào tuple trước, mà kiểu phần tử của tuple `tuple` được quyết định theo thứ tự truyền vào argument.
