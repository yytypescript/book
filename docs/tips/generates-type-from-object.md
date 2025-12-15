# Tạo type từ object

Trong nhiều ngôn ngữ, coding bắt đầu bằng việc định nghĩa struct, object bằng type, nhưng TypeScript có nguồn gốc từ JavaScript nên thường không có quy định như vậy.

## Lập trình quyết định type trước - cách thông thường

Trong nhiều ngôn ngữ, quyết định type là gì trước, sau đó quyết định object thuộc type đó. Ví dụ sau là ví dụ TypeScript, nhưng có thể áp dụng cho ngôn ngữ khác mà không có vấn đề.

```ts twoslash
type Account = {
  accountName: string;
  password: string;
  age: number;
  plan: "Free" | "Standard" | "Premium";
};

const account: Account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard",
};
```

Trong project có sẵn JavaScript asset, không có type công khai, nên không tồn tại type như `Account` và chỉ tồn tại biểu thức gán `const account`. Trong trường hợp đó, có thể chuyển đổi `const account` này sang TypeScript và tạo type gần nhất có thể.

### `typeof`

`typeof` này không phải của JavaScript, mà là `typeof` của TypeScript. Nếu sử dụng nó với biến đang hoạt động thực tế, có thể biết TypeScript nhận diện biến đó là type gì.

```ts twoslash
const account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard",
};

type Account = typeof account;
//   ^?
```

`plan` không thành union type như mong muốn, nhưng đã có thể lấy được type khá gần.

### Trường hợp muốn lấy property dưới dạng giá trị constant

Nếu muốn lấy property dưới dạng giá trị constant, thêm `as const` vào object.

```ts twoslash
const account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard",
} as const;

type Account = typeof account;
//   ^?
```

### Trường hợp chỉ muốn lấy property cụ thể dưới dạng giá trị constant

Với cách này, ràng buộc type quá mạnh nên không thể gán giá trị khác, cần linh hoạt hơn. Ví dụ, nếu muốn chỉ `plan` thành union type, viết type mong muốn ở bên phải của `plan` thì sẽ thành type đó.

```ts twoslash
const account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard" as "Free" | "Standard" | "Premium",
};

type Account = typeof account;
//   ^?
```
