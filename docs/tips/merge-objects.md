# Merge (kết hợp) object

Ở trang trước đã nói về shallow copy của object.
Nhờ spread syntax (`...`) đã giới thiệu trước đó, có thể dễ dàng thực hiện shallow copy.

Lần này xem xét việc merge hai object trở lên. Vì sử dụng kiến thức về shallow copy của object từ trang trước, nếu chưa đọc hãy đọc trước rồi xem trang này.

[Copy nông object](shallow-copy-object.md)

## Về merge lần này

Từ merge thường nghe thấy nhiều nhất ở VCS (Version Control System) như Git. Nói chung merge có bên thực hiện và bên bị thực hiện, thường chỉ việc tất cả (đôi khi có thể chọn) của bên bị thực hiện được di chuyển hoặc copy sang bên thực hiện.

Merge trong codebase JavaScript, TypeScript hơi khác với VCS, chủ yếu là tạo object mới đã merge từ hai object.

### Cách merge

Sử dụng kiến thức về shallow copy của object. Ôn lại, shallow copy chỉ cần viết như sau với spread syntax.

```ts twoslash
const obj: object = {
  why: "reason",
};
// ---cut---
const copied = { ...obj };
```

Merge object có thể copy bằng cách xếp các object muốn merge với spread syntax như tham số

```ts twoslash
const obj1: object = {
  why: "reason",
};
const obj2: object = {
  where: "place",
};
// ---cut---
const merged = { ...obj1, ...obj2 };
```

### Điều vui

Merge object không giới hạn ở hai, có thể merge bao nhiêu object tùy ý.

```ts twoslash
const obj1: object = {
  why: "reason",
};
const obj2: object = {
  where: "place",
};
const obj3: object = {
  how: "way",
};
// ---cut---
const merged = {
  ...obj1,
  ...obj2,
  ...obj3,
  // ...
};
```

Vì shallow copy cũng output ES2017 nên kết hợp output sẽ là

<!--prettier-ignore-->
```ts twoslash
const obj1: object = {
  why: 'reason'
};
const obj2: object = {
  where: 'place'
};
const obj3: object = {
  how: 'way'
};
// ---cut---
const merged = Object.assign(Object.assign(Object.assign({}, obj1), obj2), obj3);
```

được compile. Nhân tiện điều này hơi dài dòng và

```ts twoslash
const obj1: object = {
  why: "reason",
};
const obj2: object = {
  where: "place",
};
const obj3: object = {
  how: "way",
};
// ---cut---
const merged = Object.assign({}, obj1, obj2, obj3);
```

viết như vậy cũng cho kết quả tương tự.

### Điều cần chú ý

Khi có key trùng tên, cái được viết cuối cùng luôn được ưu tiên. Hãy cẩn thận để không ghi đè giá trị.

```ts twoslash
const obj1: object = {
  firstName: "Otto",
  middleName: "von",
  lastName: "Bismarck",
};
const obj2: object = {
  firstName: "Yuko",
  lastName: "Sato",
};

const merged: object = { ...obj1, ...obj2 };

console.log(merged);
// @log: { firstName: "Yuko", middleName: "von" lastName: "Sato" }
```
