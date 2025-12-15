---
sidebar_label: Nhận object, trả về object
---

# Nhận object, trả về object (RORO)

Có một cách nghĩ gọi là RORO, trong đó function hoặc method nhận một object làm tham số và giá trị trả về cũng là một object. RORO là viết tắt của **Receive an Object, Return an Object**. Cách nghĩ này mang lại lợi ích lớn trong JavaScript và TypeScript.

## Function truyền thống

Không chỉ JavaScript, function thời mới bắt đầu thường có dạng như sau.

```ts twoslash
// @noErrors
type User = {
  id: string;
  name: string;
  age: number;
  country: string;
  password: string;
  vip: boolean;
};
// ---cut---
function findUser(
  name?: string,
  age?: number,
  country?: string,
  isVip?: boolean
): User {
  // ...
}
```

Để có thể tìm kiếm theo parameter tùy thích, các tham số được làm thành optional để có thể tìm kiếm. Tuy nhiên các vấn đề sau xuất hiện.

### Khi tham số được thêm vào

Giả sử nơi cư trú và quốc tịch khác nhau! và parameter quốc tịch(`nationality`) được thêm vào. Khi đó quốc tịch sẽ được thêm ở đâu? Sau `isVip` là an toàn nhưng có người có thể không thích vị trí đó.

Ngoài ra, lần này chỉ nói về function `findUser()`, nhưng nếu có method `~~~User()` nhận các tham số tương tự thì cần sửa đồng thời nhiều chỗ. Điều này rất phiền phức.

### Trường hợp function khác có tham số không thể bỏ qua

Trong các tham số, những cái có thể bỏ qua phải được viết về bên phải (phía sau). Lần này vì là tìm kiếm nên tất cả tham số đều có thể bỏ qua, nhưng tùy trường hợp nếu tạo function yêu cầu quốc gia (`country`) là bắt buộc, thì chỉ nó phải là tham số thứ 1 của function. Nếu vấn đề như vậy xảy ra, sẽ gây nhầm lẫn về thứ tự tham số giống như khi tham số được thêm vào.

Để giải quyết vấn đề như vậy, có cách nghĩ RORO là đóng gói thông tin cần thiết vào một object và gửi làm tham số.

## RORO (Receive an Object, Return an Object)

Với user trên, nếu tạo data class (class chỉ có data với visibility public) thì có thể tránh được vấn đề. Nếu gọi type đó là `UserInfo` trong TypeScript thì `UserInfo` như sau.

```ts twoslash
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  isVip?: boolean;
};
```

Lần này có thêm `?` của `Optional` cẩn thận, nhưng cũng có thể thay thế bằng `Partial<T>`.

Như vậy nhận một object của type này làm type tham số.

```ts twoslash
// @noErrors
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  isVip?: boolean;
};
type User = {
  id: string;
  name: string;
  age: number;
  country: string;
  password: string;
  vip: boolean;
};
// ---cut---
function findUser(info: UserInfo): User {
  if (info.age >= 20) {
    // ...
  }

  // ...
}
```

Như vậy thì không phải là Tip tiện lợi có thể sử dụng trong JavaScript và TypeScript, mà chỉ là Tip bình thường. Tại sao nó được coi trọng trong JavaScript, TypeScript là vì liên quan đến destructuring assignment.

Khi sử dụng destructuring assignment, function có thể truy cập giá trị chỉ bằng cách chỉ định key của object làm tham số. Ví dụ với `findUserByName()` là function chỉ cần tên (`name`), thay vì nhận toàn bộ `UserInfo`, sử dụng destructuring assignment như sau.

```ts twoslash
// @noErrors
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  isVip?: boolean;
};
type User = {
  id: string;
  name: string;
  age: number;
  country: string;
  password: string;
  vip: boolean;
};
// ---cut---
function findUserByName({ name }: UserInfo): User {
  // ...
}
```

Nếu cần ôn lại kiến thức về destructuring assignment, hãy xem trang sau.

[Destructuring assignment của object](../reference/values-types-variables/object/destructuring-assignment-from-objects.md)

[Destructuring assignment parameter](../reference/functions/destructuring-assignment-parameters.md)

Destructuring assignment giúp người dùng function không cần quan tâm đến thứ tự tham số, và điều đáng mừng là dù `UserInfo` phát triển do mở rộng chức năng trong tương lai, cũng không cần thêm tham số mỗi lần mà chỉ cần viết lại `UserInfo` và truy cập key đó trong function muốn sử dụng. Như ví dụ trên, nếu thêm quốc tịch (`nationality`) thì chỉ cần thêm ở vị trí tùy thích. Thứ tự không ảnh hưởng đến việc gọi.

```ts twoslash
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  nationality?: string;
  isVip?: boolean;
};
```

Chỉ cần vậy là có thể gọi `nationality` dễ dàng (tạm bỏ qua vấn đề `byName` sử dụng quốc tịch).

```ts twoslash
// @noErrors
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  nationality?: string;
  isVip?: boolean;
};
type User = {
  id: string;
  name: string;
  age: number;
  country: string;
  password: string;
  vip: boolean;
};
// ---cut---
function findUserByName({ name, nationality }: UserInfo): User {
  // ...
}
```

Như đã nói trong phần giải thích về function, destructuring assignment cũng có thể sử dụng giá trị mặc định. Ví dụ nếu `findUser()` thông thường không tìm kiếm user đã nghỉ hưu, chỉ cần viết lại `UserInfo` và function như sau.

```ts twoslash
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  nationality?: string;
  isVip?: boolean;
  isRetired?: boolean;
};
```

```ts twoslash
// @noErrors
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  nationality?: string;
  isVip?: boolean;
  isRetired?: boolean;
};
type User = {
  id: string;
  name: string;
  age: number;
  country: string;
  password: string;
  vip: boolean;
};
// ---cut---
function findUser({ name, age, country, isRetired = false }: UserInfo): User {
  // ...
}
```
