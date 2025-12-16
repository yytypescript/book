---
sidebar_label: Excess property checking
---

# Excess property checking

Type của object trong TypeScript có trường hợp được kiểm tra thêm gọi là excess property checking. Excess property checking là kiểm tra cấm việc gán object có property không tồn tại trong type của object.

Ví dụ, `{ x: number }` là type của object có property `x` bắt buộc. Giả sử cố gán giá trị `{ x: 1, y: 2 }` cho type này. Việc gán này có được phép không? Vì type của giá trị gán thỏa mãn property bắt buộc `{ x: number }` nên có vẻ không có vấn đề. Tuy nhiên, việc gán này không được phép.

```ts twoslash
// @errors: 2353
let onlyX: { x: number };
onlyX = { x: 1 }; // OK
onlyX = { x: 1, y: 2 }; // Compile error
```

Lúc này, compile error "Object literal may only specify known properties, and 'y' does not exist in type '{ x: number; }'." xảy ra. Lý do là `{ y: 2 }` bị coi là thừa. Việc kiểm tra không cho phép property thừa như vậy trong TypeScript chính là excess property checking.

## Excess property checking chỉ kiểm tra object literal

Excess property checking cấm property thừa của object, giúp code tuân thủ type nghiêm ngặt hơn. Tuy nhiên, excess property checking chỉ có hiệu lực với việc gán object literal. Do đó, kiểm tra này không hoạt động với gán biến.

```ts twoslash
const xy: { x: number; y: number } = { x: 1, y: 2 };
let onlyX: { x: number };
onlyX = xy; // OK
```

Có thể nghĩ excess property checking nên hoạt động cả với gán biến để type nghiêm ngặt hơn. Tuy nhiên, không như vậy vì TypeScript ưu tiên tính tiện lợi hơn tính an toàn của type.
