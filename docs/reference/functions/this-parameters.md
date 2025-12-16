---
sidebar_label: Tham số this
---

# Tham số this (this parameter)

Tham số đầu tiên của function (ngoài arrow function) và method của class có thể nhận tham số đặc biệt là `this`. Vì ý nghĩa của `this` thay đổi tùy theo context sử dụng, nên điều này được dùng để cho TypeScript biết function này nên được sử dụng trong context nào. Khi gọi, caller không cần quan tâm đến `this` này. Chỉ cần chỉ định từ tham số thứ hai trở đi.

```twoslash include main
class Male {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public toString(): string {
    return `Monsieur ${this.name}`;
  }
}

class Female {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public toString(this: Female): string {
    return `Madame ${this.name}`;
  }
}
```

```ts twoslash
// @include: main
```

Class `Male` và `Female` ở trên có cấu trúc gần như giống nhau nhưng tham số của method `toString()` khác nhau.

`Male` và `Female` đều có thể sử dụng theo cách thông thường.

```ts twoslash
// @include: main
// ---cut---
const male: Male = new Male("Frédéric");
const female: Female = new Female("Frédérique");

male.toString();
// @log: Monsieur Frédéric
female.toString();
// @log: Madame Frédérique
```

Tuy nhiên, khi gán `toString()` của mỗi instance vào biến, ý nghĩa sẽ thay đổi.

```ts twoslash
// @errors: 2684
// @include: main
const male: Male = new Male("Frédéric");
const female: Female = new Female("Frédérique");
// ---cut---
const maleToStr: () => string = male.toString;
const femaleToStr: (this: Female) => string = female.toString;

maleToStr();
femaleToStr();
```

`femaleToStr()` nhận được cảnh báo rằng context không phải là `Female`. Code này không thể thực thi được. Nhân tiện, `maleToStr()` không có xử lý này tuy có thể thực thi nhưng sẽ xảy ra exception runtime.

```js twoslash
class Male {
  // ...
  // prettier-ignore
  toString() {
// @error: TypeError: Cannot read property 'name' of undefined
    return `Monsieur ${this.name}`;
  }
}
```

Bằng cách chỉ định tham số `this`, có thể tránh việc mang method ra ngoài context không mong muốn.
