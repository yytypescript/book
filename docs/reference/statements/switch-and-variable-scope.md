# switch và variable scope

Trong JavaScript, mỗi `switch` tạo ra một variable scope riêng.

```ts twoslash
switch (
  true // Variable scope 1
) {
  default:
    switch (
      true // Variable scope 2
    ) {
      default:
      // ...
    }
}
```

## case không có variable scope riêng

Mỗi `case` không tạo ra variable scope riêng. Khi có nhiều `case`, toàn bộ `switch` chia sẻ chung một variable scope. Do đó, khi khai báo cùng tên biến ở nhiều `case` sẽ xảy ra lỗi runtime.

<!--prettier-ignore-->
```ts twoslash
let x = 1;
switch (x) {
  case 1:
    const sameName = "A";
    break;
  case 2:
    const sameName = "B";
// @error: SyntaxError: Identifier 'sameName' has already been declared
    break;
}
// @noErrors
```

Trong TypeScript, khi khai báo cùng tên biến sẽ xuất hiện lỗi compile.

```ts twoslash
// @errors: 2451
let x = 1;
switch (x) {
  case 1:
    const sameName = "A";
    break;
  case 2:
    const sameName = "B";
    break;
}
```

## Cách tạo variable scope cho case

Để tạo variable scope cho case, bọc case bằng dấu ngoặc nhọn.

```ts twoslash
let x = 1;
switch (x) {
  case 1: {
    const sameName = "A";
    break;
  }
  case 2: {
    const sameName = "B";
    break;
  }
}
```

Khi làm như vậy, cả lỗi runtime của JavaScript và lỗi compile của TypeScript đều không xảy ra.

<PostILearned>

🌏switch trong JavaScript có chung một variable scope cho toàn bộ
😕Không có scope riêng ở mức case

Nếu khai báo cùng tên biến ở nhiều case...
🔥JavaScript → Lỗi runtime
⛔️TypeScript → Lỗi compile

✅Viết {} ở case sẽ tạo scope riêng

</PostILearned>
