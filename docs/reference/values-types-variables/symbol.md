---
sidebar_label: symbol型
title: symbol型 (シンボル型)
---

symbol型trong JavaScript là một loại primitive type, giá trị của nó là duy nhất. boolean型hay number型nếu giá trị giống nhau thì so sánh bằng sẽ là `true`. Ngược lại, symbol ngay cả khi tên giống nhau nhưng nơi khởi tạo khác nhau thì sẽ là `false`.

```js twoslash
const s1 = Symbol("foo");
const s2 = Symbol("foo");
console.log(s1 === s1);
// @log: true
console.log(s1 === s2);
// @log: false
```

Ruby cũng có type tên là symbol. Symbol của Ruby nếu giá trị giống nhau thì so sánh bằng sẽ là `true` dù viết ở vị trí khác nhau.

```ruby
# Rubyコード
s1 = :foo
s2 = :foo
p s1 == s2 #=> true
```

Ngược lại, JavaScript như đã nói ở trên, được quyết định bởi nơi khởi tạo symbol, nên những người từ Ruby chuyển sang cần chú ý. Điều tương tự symbol của Ruby, trong JavaScript hay TypeScript được giải quyết bằng chuỗi.

## Type annotation của symbol

Type annotation của symbol trong TypeScript dùng `symbol`.

```ts twoslash
const s: symbol = Symbol();
```

## Lưu ý khi dùng symbol型

Truyền symbol型 trực tiếp vào `JSON.stringify()` sẽ trả về `undefined`.

```ts twoslash
console.log(JSON.stringify(Symbol("many")));
// @log: undefined
```

Ngoài ra, truyền object chứa symbol型 trong property vào `JSON.stringify()`, key chứa symbol型 trong property sẽ biến mất.

```ts twoslash
console.log(
  JSON.stringify({
    x: Symbol("many"),
    y: "hello",
  })
);
// @log: { "y": "hello" }
```

Tương tự, truyền object chứa symbol型 làm key vào `JSON.stringify()`, key là symbol型 sẽ biến mất.

```ts twoslash
console.log(
  JSON.stringify({
    [Symbol("many")]: "hello",
    y: "hello",
  })
);
// @log: { "y": "hello" }
```

## Mục đích của symbol

Động cơ đưa symbol vào JavaScript là để thêm API mới mà không phá vỡ backward compatibility của built-in API của JavaScript. Tóm lại, được đưa vào để dễ dàng update bản thân JavaScript. Do đó, giới hạn trong trường hợp phát triển application, cơ hội viết code sử dụng nhiều symbol không nhiều lắm.
