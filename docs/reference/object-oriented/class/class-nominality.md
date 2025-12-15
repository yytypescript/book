# Nominal typing class

Trong TypeScript, nếu class có ít nhất một property không public, class đó sẽ trở thành nominal typing thay vì structural subtyping.

Ví dụ, chỉ cần đặt property `id` trùng tên trong class `UserId` và `GroupId` thành private là không thể gán lẫn nhau.

```ts twoslash
// @errors: 2322
class UserId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class GroupId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const userId: UserId = new GroupId("...");
```

Cách này không chỉ áp dụng cho field mà còn có hiệu quả tương tự với private method hoặc `protected` property.

## Thông tin liên quan

[Structural subtyping (structural subtyping)](../../values-types-variables/structural-subtyping.md)
