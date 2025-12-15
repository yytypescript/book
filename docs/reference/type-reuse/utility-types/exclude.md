---
description: Loại bỏ kiểu tùy ý
title: "Exclude<T, U>"
---

`Exclude<T, U>` là utility type trả về union type sau khi loại bỏ kiểu được chỉ định trong `U` khỏi union type `T`.

## Type argument của Exclude&lt;T, U>

### T

Type argument `T` nhận union type.

### U

Type argument `U` nhận kiểu muốn loại bỏ khỏi `T`.

## Ví dụ sử dụng Exclude

```ts twoslash
type Grade = "A" | "B" | "C" | "D" | "E";
type PassGrade = Exclude<Grade, "E">;
```

PassGrade ở trên sẽ giống với kiểu sau:

```ts twoslash
type PassGrade = "A" | "B" | "C" | "D";
```

Nếu argument thứ 2 của `Exclude` là union type, có thể loại bỏ nhiều kiểu:

```ts twoslash
type Grade = "A" | "B" | "C" | "D" | "E";
type PassGrade = Exclude<Grade, "D" | "E">;
//   ^?
```

## Lưu ý khi sử dụng Exclude

`U` không có ràng buộc phải là tập con của `T`. Tức là cần chú ý để không đưa kiểu không tồn tại trong `T` vào `U`, hoặc typo. Trong ví dụ sau, hãy hiểu nó như là kiểu liên quan đến Pull Request.

```ts twoslash
type PullRequestState = "draft" | "reviewed" | "rejected";
type MergeableState = Exclude<PullRequestState, "draft" | "rejected">;
//   ^?
```

`MergeableState` có nghĩa là `reviewed`, nhưng cách sử dụng `Exclude` này có 2 vấn đề tiềm ẩn.

### Khi thêm trạng thái mới vào `PullRequestState`

Giả sử thêm trạng thái `testFailed` mà bạn không muốn bao gồm trong `MergeableState` vào `PullRequestState`. Khi đó, cùng với sửa đổi này, bạn cũng phải sửa argument thứ 2 của `MergeableState` đồng thời. Nếu quên việc này, `testFailed` sẽ được bao gồm trong `MergeableState`.

```ts twoslash
type PullRequestState = "draft" | "reviewed" | "rejected" | "testFailed";
type MergeableState = Exclude<PullRequestState, "draft" | "rejected">;
//   ^?
```

### Khi có thay đổi

`draft` của `PullRequestState` đã được đổi thành `open`. Trong trường hợp này, nếu quên sửa argument thứ 2 của `Exclude`, `open` sẽ được bao gồm trong `MergeableState`.

```ts twoslash
type PullRequestState = "open" | "reviewed" | "rejected";
type MergeableState = Exclude<PullRequestState, "draft" | "rejected">;
//   ^?
```
