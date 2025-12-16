---
description: Sự khác biệt giữa khai báo bằng interface và khai báo bằng type alias
---

# Sự khác biệt giữa interface và type

Bằng cách sử dụng type alias, bạn có thể định nghĩa tương tự như interface.

```ts twoslash
// @noErrors
interface Animal {
  name: string;
  bark(): string;
}
type Animal = {
  name: string;
  bark(): string;
};
```

Chương này sẽ giải thích chi tiết sự khác biệt giữa interface và type alias.

## Sự khác biệt giữa interface và type alias

| Nội dung             | Interface             | Type alias                                                   |
| :------------------- | :-------------------- | :----------------------------------------------------------- |
| Kế thừa              | Có thể                | Không thể. Tuy nhiên có thể biểu diễn bằng intersection type |
| Override khi kế thừa | Override hoặc error   | Intersection type được tính cho mỗi field                    |
| Khai báo cùng tên    | Định nghĩa được merge | Error                                                        |
| Mapped Types         | Không sử dụng được    | Sử dụng được                                                 |

### Kế thừa

Interface có thể kế thừa interface hoặc type alias.

```ts twoslash
interface Animal {
  name: string;
}
type Creature = {
  dna: string;
};
interface Dog extends Animal, Creature {
  dogType: string;
}
```

Mặt khác, type alias không thể kế thừa. Thay vào đó, bằng cách sử dụng intersection type (&), có thể thực hiện điều tương tự như kế thừa.

```ts twoslash
type Animal = {
  name: string;
};
type Creature = {
  dna: string;
};
type Dog = Animal &
  Creature & {
    dogType: string;
  };
```

### Override property

Khi override property trong quá trình kế thừa interface, type của property từ nguồn kế thừa sẽ bị ghi đè.

```ts twoslash
// OK
interface Animal {
  name: any;
  price: {
    yen: number;
  };
  legCount: number;
}

interface Dog extends Animal {
  name: string;
  price: {
    yen: number;
    dollar: number;
  };
}

// Định nghĩa cuối cùng của Dog
interface Dog {
  name: string;
  price: {
    yen: number;
    dollar: number;
  };
  legCount: number;
}
```

Tuy nhiên, để override, phải có thể gán được vào type gốc. Ví dụ sau là trường hợp cố gắng override field có type `number` bằng type `string`.

```ts twoslash
// @errors: 2430
interface A {
  numberField: number;
  price: {
    yen: number;
    dollar: number;
  };
}

interface B extends A {
  numberField: string;
  price: {
    yen: number;
    euro: number;
  };
}
```

Mặt khác, trong trường hợp type alias, không phải là ghi đè mà intersection type của type của field được tính toán. Ngoài ra, ngay cả khi có mâu thuẫn trong intersection type và không thể tính toán, cũng không xảy ra compile error.

```ts twoslash
// @noErrors
type Animal = {
  name: number;
  price: {
    yen: number;
    dollar: number;
  };
};

type Dog = Animal & {
  name: string;
  price: {
    yen: number;
    euro: number;
  };
};

// Định nghĩa cuối cùng của Dog
type Dog = {
  name: never; // Khi không thể tạo intersection type, thành type never thay vì compile error
  price: {
    yen: number;
    dollar: number;
    euro: number;
  };
};
```

### Khai báo cùng tên

Type alias không thể định nghĩa nhiều type cùng tên, sẽ xảy ra compile error.

```ts twoslash
// @errors: 2300
type SameNameTypeWillError = {
  message: string;
};
type SameNameTypeWillError = {
  detail: string;
};
```

Mặt khác, trong trường hợp interface, có thể định nghĩa interface cùng tên, và sẽ trở thành interface tổng hợp tất cả các định nghĩa cùng tên.
Tuy nhiên, nếu field cùng tên nhưng định nghĩa type khác nhau, sẽ xảy ra compile error.

```ts twoslash
// @errors: 2717
interface SameNameInterfaceIsAllowed {
  myField: string;
  sameNameSameTypeIsAllowed: number;
  sameNameDifferentTypeIsNotAllowed: string;
}

interface SameNameInterfaceIsAllowed {
  newField: string;
  sameNameSameTypeIsAllowed: number;
}

interface SameNameInterfaceIsAllowed {
  sameNameDifferentTypeIsNotAllowed: number;
}
```

### Mapped Types

Mapped Types sẽ được giải thích chi tiết ở trang khác, ở đây chỉ giải thích có thể sử dụng với type alias hay interface.

[Mapped Types](../../type-reuse/mapped-types.md)

Mapped Types là cơ chế cho phép chỉ định key của type một cách động, và chỉ có thể sử dụng với type alias.
Ví dụ sau tạo type mới với danh sách union type làm key.

```typescript twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
```

Nếu sử dụng Mapped Types với interface sẽ xảy ra error.

```typescript twoslash
// @errors: 7061
type SystemSupportLanguage = "en" | "fr" | "it" | "es";

interface Butterfly {
  [key in SystemSupportLanguage]: string;
}
```

## Phân biệt sử dụng interface và type alias

Vậy khi thực tế định nghĩa type, nên sử dụng interface hay type alias? Rất tiếc, không có câu trả lời chính xác rõ ràng cho vấn đề này.

Cả interface và type alias đều có thể định nghĩa type, nhưng có những điểm khác nhau về khả năng mở rộng và khả năng sử dụng Mapped Types, vì vậy hãy cân nhắc những ưu nhược điểm này để quyết định quy tắc trong dự án và tuân thủ nó.

Làm ví dụ tham khảo, trong mục [Type Aliases vs Interfaces](https://google.github.io/styleguide/tsguide.html#interfaces-vs-type-aliases) của style guide TypeScript mà Google công khai, khuyến nghị sử dụng type alias khi định nghĩa type cho primitive value, union type hoặc tuple, và sử dụng interface khi định nghĩa type cho object.

Nếu việc phân biệt sử dụng interface và type alias gây khó khăn và làm chậm tốc độ phát triển, cũng có cách nghĩ là thống nhất viết bằng type alias.

### Ví dụ sử dụng interface

Khi tạo library mà cấu trúc của type được định nghĩa phụ thuộc vào phía application, việc sử dụng interface là phù hợp.

Type định nghĩa của `process.env` trong Node.js được implement trong `@types/node/process.d.ts` như sau.

```ts twoslash
declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        TZ?: string;
      }
    }
  }
}
```

Vì được định nghĩa bằng interface, phía sử dụng package có thể tự do mở rộng type.

Nếu `ProcessEnv` được định nghĩa bằng type alias, sẽ không thể mở rộng type và trở nên rất khó phát triển. Như vậy, khi nhiều user không xác định tham chiếu type, hãy định nghĩa type bằng interface để cân nhắc khả năng mở rộng.

```ts twoslash
// src/types/global.d.ts
declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production";
      }
    }
  }
}
```

## Thông tin liên quan

[Interface](./README.md)

[Type alias](../../values-types-variables/type-alias.md)
