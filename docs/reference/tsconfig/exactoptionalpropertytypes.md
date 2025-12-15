---
description: Cấm gán undefined cho optional property
---

# exactOptionalPropertyTypes

`exactOptionalPropertyTypes` là compiler option cấm gán `undefined` cho optional property.

- Mặc định: `false`
- Phiên bản thêm vào: 4.4
- TypeScript khuyến nghị nên bật

## Giải thích

Trước đây, optional modifier cho phép không chỉ bỏ qua việc set giá trị mà còn có thể set `undefined` một cách có chủ đích.

```ts twoslash
interface User {
  name: string;
  nationality?: "India" | "China";
}

const user1: User = {
  name: "Srinivasa Aiyangar Ramanujan",
  nationality: "India",
};

const user2: User = {
  name: "Sergei Vasilevich Rachmaninov",
  nationality: undefined,
};

const user3: User = {
  name: "Yekaterina II Alekseyevna",
};
```

Giá trị chưa được định nghĩa và giá trị là `undefined` có hành vi khác nhau. Ví dụ điển hình là `Object.keys()`, khi áp dụng lên `user1, user2, user3` ở trên, kết quả sẽ như sau:

```ts twoslash
// user1
["name", "nationality"];
// user2
["name", "nationality"];
// user3
["name"];
```

Sự khác biệt này có thể gây ra lỗi runtime không mong muốn. Nếu giá trị được set đúng (trong trường hợp này là `'India' | 'China'`) thì `nationality` nên có trong `Object.keys()`, nhưng khi là `undefined` thì vẫn cần phải check sự tồn tại của giá trị ở phía sau.

Khi bật option này, các key có optional modifier trong `interface, type` sẽ không được phép có key với giá trị `undefined`. Trong ví dụ trước, `user2` gán `undefined` sẽ báo lỗi như sau:

```ts twoslash
// @exactOptionalPropertyTypes: true
// @errors: 2375
interface User {
  name: string;
  nationality?: "India" | "China";
}

const user1: User = {
  name: "Srinivasa Aiyangar Ramanujan",
  nationality: "India",
};

const user2: User = {
  name: "Sergei Vasilevich Rachmaninov",
  nationality: undefined,
};

const user3: User = {
  name: "Yekaterina II Alekseyevna",
};
```

Nếu thực sự muốn key có thể nhận giá trị `undefined`, hãy thêm union type với `undefined` vào ngoài optional modifier.
