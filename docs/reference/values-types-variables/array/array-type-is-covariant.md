---
sidebar_label: Tính hiệp biến của array
---

# Tính hiệp biến của array (covariance)

Kiểu array của TypeScript là hiệp biến (covariant). Ở đây chúng ta sẽ xem xét tính hiệp biến (covariance) của array là gì, cần chú ý điều gì do tính hiệp biến này, và tại sao array của TypeScript lại là hiệp biến.

## Hiệp biến là gì

Trong thế giới của type, hiệp biến nghĩa là có thể gán chính kiểu đó hoặc subtype (kiểu con) của nó. Ví dụ, giả sử có hai kiểu Animal và Dog. Dog là subtype của Animal. Nếu là hiệp biến, biến kiểu Animal có thể được gán chính Animal hoặc subtype của nó là Dog.

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  isDog: boolean;
}

let pochi: Dog = { isAnimal: true, isDog: true };
let animal: Animal = pochi; // Gán OK
```

Mặt khác, với hiệp biến, biến kiểu Dog không thể được gán Animal - supertype của Dog.

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  isDog: boolean;
}
// ---cut---
// @errors: 2741
let animal: Animal = { isAnimal: true };
let pochi: Dog = animal;
```

## Array cho phép hiệp biến

Kiểu array của TypeScript là hiệp biến. Ví dụ, có thể gán `Dog[]` cho array kiểu `Animal[]`.

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  isDog: boolean;
}

let pochi: Dog = { isAnimal: true, isDog: true };
let animal: Animal = pochi; // Gán OK
// ---cut---
const dogs: Dog[] = [pochi];
const animals: Animal[] = dogs; // Gán OK
```

Thoạt nhìn tính chất này có vẻ không có vấn đề. Tuy nhiên, vấn đề xảy ra khi thay thế `animals[0]` bằng giá trị kiểu Animal như ví dụ sau.

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  wanwan(): string; // Method
}

const pochi = {
  isAnimal: true,
  wanwan() {
    return "wanwan"; // Implementation của method
  },
};

const dogs: Dog[] = [pochi];
const animals: Animal[] = dogs;
animals[0] = { isAnimal: true }; // Đồng thời dogs[0] cũng bị thay đổi
const mayBePochi: Dog = dogs[0];
mayBePochi.wanwan();
// Lỗi runtime JS: mayBePochi.wanwan is not a function
```

Khi gán `dogs` cho biến `animals`, thay đổi `animals` cũng ảnh hưởng đến `dogs`. Điều này là do array của JavaScript là mutable object. Khi gán giá trị kiểu Animal cho `animals[0]`, `dogs[0]` cũng trở thành giá trị Animal. `dogs` là kiểu `Dog[]`, nên theo lý thuyết không nên chấp nhận kiểu Animal, nhưng thực tế lại có thể. Kết quả là khi gọi method `wanwan` của `dogs[0]`, xảy ra lỗi runtime JavaScript vì method không tồn tại.

Nếu truy cầu sự an toàn của type, array không nên là hiệp biến. Trong Java - ngôn ngữ có type khác, kiểu `List<T>` là bất biến (invariant) chứ không phải hiệp biến. Với array bất biến, chỉ có thể gán chính kiểu đó, và vấn đề như trên sẽ không xảy ra.

```java
// Code Java
import java.util.*;

class Animal {
}

class Dog extends Animal {
}

public class Main {
    static {
        List<Dog> dogs = new ArrayList<Dog>();
        List<Animal> animals = dogs;
        // Lỗi: kiểu không tương thích: không thể convert List<Dog> sang List<Animal>
    }
}
```

Trong ví dụ code Java trên, compile error xảy ra ngay khi gán `dogs` cho `animals`.

## Lý do array là hiệp biến trong TypeScript

Trong khi có ngôn ngữ mà array là bất biến, tại sao TypeScript lại làm cho array hiệp biến với cái giá là hy sinh sự an toàn của type? Đó là vì TypeScript thiết kế type system với mục tiêu cân bằng giữa tính đúng đắn (soundness) và tính tiện lợi. Nếu array là bất biến thì tính đúng đắn cao hơn, nhưng tính tiện lợi giảm đi.

Vậy cụ thể sẽ bất tiện ở đâu, hãy xem xét. Vì đây là vấn đề phức tạp, sẽ giải thích từng bước.

Đầu tiên, hiệp biến nghĩa là có thể gán một kiểu và subtype của nó. Ví dụ, kiểu `number` là subtype của union type `number | null`. Khi biến thành array, kiểu `number[]` là subtype của kiểu `(number | null)[]`.

Kiểu array của TypeScript là hiệp biến. Do đó, kiểu `number[]` có thể gán cho kiểu `(number | null)[]`. Nếu kiểu array của TypeScript là bất biến, thì chỉ có thể gán chính kiểu đó cho `(number | null)[]`. `number[]` sẽ không thể gán cho `(number | null)[]`.

Tổng hợp những điều trên như sau:

- `number` là subtype của `number | null`
- `number[]` là subtype của `(number | null)[]`
- Nếu hiệp biến, có thể gán `number[]` cho `(number | null)[]`
- Nếu bất biến, không thể gán `number[]` cho `(number | null)[]`

Tiếp theo, thay đổi chủ đề, xem xét function như sau.

```ts twoslash
function sum(values: (number | null)[]): number {
  let total = 0;
  for (const value of values) {
    if (typeof value === "number") {
      total += value;
    }
  }
  return total;
}
```

Function `sum` này nhận `(number | null)[]` - tức array có thể chứa cả number và null, pick ra chỉ các number và trả về tổng. Khi gán cho argument của function, array của TypeScript cũng là hiệp biến. Vì hiệp biến nên có thể gán giá trị kiểu `number[]` như sau.

```ts twoslash
declare function sum(values: (number | null)[]): number;
// ---cut---
const values: number[] = [1, 2, 3];
sum(values);
```

Nếu array của TypeScript là bất biến, code như trên sẽ gây compile error. Vì function `sum` expect `(number | null)[]` cho argument, nhưng lại truyền `number[]`. Và để tránh compile error đó, phải thêm type assertion thừa như sau.

```ts twoslash
declare function sum(values: (number | null)[]): number;
declare const values: number[];
// ---cut---
sum(values as (number | null)[]);
//         ^^^^^^^^^^^^^^^^^type assertion
```

Nếu điều này xảy ra ở nhiều nơi, việc viết và đọc đều bất tiện. Do đó, có thể thấy TypeScript ưu tiên tính tiện lợi hơn là sự hoàn hảo của type.

Ngoài ra, TypeScript là ngôn ngữ thêm type vào JavaScript, với JavaScript làm nền tảng. Có thể có code migrate từ JavaScript sang TypeScript, nhưng code JavaScript được viết với giả định array là bất biến có lẽ rất ít. Trong tình huống đó, có thể TypeScript đã cho phép hiệp biến.
