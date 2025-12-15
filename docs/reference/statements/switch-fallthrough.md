# Vấn đề fallthrough trong switch

`case` trong switch của JavaScript không có tác dụng thoát khỏi phân nhánh. Để thoát khỏi phân nhánh, cần có `break`. Nếu không viết `break`, xử lý sẽ tiếp tục vào phân nhánh tiếp theo. Đặc tả này được gọi là fallthrough.

```ts twoslash
let s = "A";
switch (s) {
  case "A": // Phân nhánh không có break
    console.log(1);
  case "B": // Xử lý tiếp tục vào phân nhánh này
    console.log(2);
}
// @log: 1 2 được xuất ra theo thứ tự
```

Fallthrough thường là nguyên nhân gây bug. Trong TypeScript, bật compiler option `noFallthroughCasesInSwitch` thành `true` sẽ cảnh báo về fallthrough. Nên bật option này.

```ts twoslash
// @noFallthroughCasesInSwitch: true
// @errors: 7029
let s = "A";
switch (s) {
  case "A":
    console.log(1);
  case "B":
    console.log(2);
}
```

[noFallthroughCasesInSwitch](../tsconfig/nofallthroughcasesinswitch.md)

<PostILearned>

😴case trong switch của JavaScript không có tác dụng thoát khỏi phân nhánh
⏩Nếu không viết break, phân nhánh tiếp theo cũng được thực thi (fallthrough)
🐞Fallthrough dễ gây bug
✅Trong TypeScript, bật noFallthroughCasesInSwitch sẽ phát hiện fallthrough

</PostILearned>
