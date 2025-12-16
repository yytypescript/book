---
sidebar_label: Read-only array
---

# Read-only array

Trong TypeScript, có thể type annotation cho array là read-only (readonly). Có 2 cách type annotation. Cách thứ nhất là sử dụng từ khóa `readonly`. Cách thứ hai là sử dụng `ReadonlyArray<T>`.

## readonly T\[]

Thêm từ khóa `readonly` trước type annotation `T[]` của array sẽ tạo thành kiểu read-only array. Ví dụ, viết `readonly number[]` thì kiểu của biến đó trở thành read-only array của number.

```ts twoslash
const nums: readonly number[] = [1, 2, 3];
```

## ReadonlyArray&lt;T>

Cũng có thể viết dạng `ReadonlyArray<T>` để tạo kiểu read-only array. Ví dụ, nếu muốn array có phần tử kiểu number thành read-only, viết `ReadonlyArray<number>`.

```ts twoslash
const nums: ReadonlyArray<number> = [1, 2, 3];
```

## Sự khác biệt giữa readonly T\[] và ReadonlyArray&lt;T>

Không có sự khác biệt nào giữa `readonly T[]` và `ReadonlyArray<T>` ngoài cách viết. Chọn cách nào tùy thuộc vào sở thích người viết. Trong team phát triển nên thống nhất sử dụng một cách viết.

## Đặc điểm của read-only array

Với read-only array, các method thực hiện thao tác phá hủy (destructive operation) như `push` và `pop` **sẽ không tồn tại tại thời điểm compile**. Do đó, code gọi `nums.push(4)` trên biến `nums` kiểu `readonly number[]` sẽ báo compile error.

```ts twoslash
// @errors: 2339
const nums: readonly number[] = [1, 2, 3];
nums.push(4);
```

Điều này chỉ có nghĩa là TypeScript compiler sẽ cảnh báo code cố gắng gọi các method thao tác phá hủy. Không phải là method `push` bị xóa khỏi array object. Do đó, khi chạy JavaScript, method `push` vẫn còn.

```ts twoslash
const nums: readonly number[] = [1, 2, 3];
console.log("push" in nums);
// @log: true
```

Vì method không bị xóa, nếu bỏ qua compile error và thực thi, vẫn có thể thay đổi array dù là kiểu read-only.

```ts twoslash
const nums: readonly number[] = [1, 2, 3];
// @ts-ignore
nums.push(4); // Bỏ qua compile error
console.log(nums);
// @log: [1, 2, 3, 4]
```

## Gán read-only array cho array thông thường

Không thể gán read-only array của TypeScript cho array thông thường. Cố gắng gán sẽ báo compile error.

```ts twoslash
// @errors: 4104
const readonlyNumbers: readonly number[] = [1, 2, 3];
const writableNumbers: number[] = readonlyNumbers;
```

Điều này là do array thông thường cần các method như `push` và `pop`, nhưng read-only array được coi là không có chúng. Nếu thực sự muốn gán read-only array cho array thông thường, có thể sử dụng type assertion.

```ts twoslash
const readonlyNumbers: readonly number[] = [1, 2, 3];
const writableNumbers: number[] = readonlyNumbers as number[];
//                                                ^^^^^^^^^^^ Type assertion
```

[Type assertion「as」](../type-assertion-as.md)

Ngược lại, có thể gán array thông thường cho read-only array.

## Thông tin liên quan

[Thao tác phá hủy của array](array-operations.md)

[Readonly property của object type](../object/readonly-property.md)

[Readonly&lt;T>](../../type-reuse/utility-types/readonly.md)

[const assertion](./../const-assertion.md)
