# undefined型

undefined trong JavaScript là giá trị primitive biểu thị chưa được định nghĩa. Xuất hiện khi biến chưa được gán giá trị, hàm không có return value, truy cập property không tồn tại trong object, truy cập index không tồn tại trong array, v.v.

```js twoslash
let name;
console.log(name);
// @log: undefined

function func() {}
console.log(func());
// @log: undefined

const obj = {};
console.log(obj.name);
// @log: undefined

const arr = [];
console.log(arr[1]);
// @log: undefined
```

## undefined literal

Trong JavaScript, các primitive type như boolean hay number có literal, nhưng `undefined` không có literal. Thực ra `undefined` là một biến. Có thể hiểu nó như một global constant.

## Type annotation của undefined

Để type annotation cho undefined trong TypeScript, sử dụng `undefined`.

```ts twoslash
const x: undefined = undefined;
```

Hàm không có return value sẽ trả về `undefined`, nhưng trong TypeScript để type annotation cho hàm không có return value, dùng `void` thay vì `undefined`. Xem chi tiết tại phần giải thích về hàm.

[戻り値がない関数とvoid型 (void type)](../functions/void-type.md)
