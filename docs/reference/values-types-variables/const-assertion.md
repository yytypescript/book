---
sidebar_label: Const assertion "as const"
---

# Const assertion "as const"

Khi khai báo biến, thêm `as const` vào cuối sẽ làm cho giá trị đó thành readonly và chuyển thành literal type.
Với giá trị primitive type thì không cảm nhận được nhiều lợi ích, nhưng với array hoặc object literal thì rất tiện lợi.

```ts twoslash
const str1 = "hello";
//    ^?
const str2 = "hello" as const; // Trường hợp này có hay không as const cũng giống nhau
//    ^?
const array1 = [1, 2, 3];
//    ^?
const array2 = [1, 2, 3] as const;
//    ^?
const obj1 = {
  //    ^?
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
};
const obj2 = {
  //    ^?
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
} as const;
```

Vì trở thành readonly nên đương nhiên không thể gán giá trị mới.

```ts twoslash
const array1 = [1, 2, 3];
const array2 = [1, 2, 3] as const;
const obj1 = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
};
const obj2 = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
} as const;

// @errors: 2540
// ---cut---
array1[0] = 4;
array2[0] = 4;
obj1.name = "raichu";
obj2.name = "raichu";
```

## Sự khác biệt giữa `readonly` và `const assertion`

Cả hai đều có chức năng làm cho property của object thành `readonly`, nhưng có các điểm khác biệt sau.

### `readonly` có thể áp dụng cho từng property

`const assertion` là khai báo cho toàn bộ object nên tất cả property đều bị ảnh hưởng, trong khi `readonly` có thể áp dụng chỉ cho những property cần thiết.

### `const assertion` có thể áp dụng `readonly` đệ quy

Hành vi khác nhau khi có object lồng trong object. Ví dụ, giả sử có object như sau.

```ts twoslash
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  readonly name: string;
  readonly canada: Country;
  readonly us: Country;
  readonly mexico: Country;
};

const america: Continent = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
};
```

Ở đây tất cả property của type alias `Continent` đều là `readonly`. Do đó không thể làm những việc như sau.

```ts twoslash
// @errors: 2540
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  readonly name: string;
  readonly canada: Country;
  readonly us: Country;
  readonly mexico: Country;
};

const america: Continent = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
};
// ---cut---
america.name = "African Continent";
america.canada = {
  name: "Republic of Côte d'Ivoire",
  capitalCity: "Yamoussoukro",
};
```

Tuy nhiên, những việc như sau vẫn có thể thực hiện được mà không có vấn đề.

```ts twoslash
type Country = {
  name: string;
  capitalCity: string;
};

type Continent = {
  readonly name: string;
  readonly canada: Country;
  readonly us: Country;
  readonly mexico: Country;
};

const america: Continent = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
};
// ---cut---
america.canada.name = "Republic of Côte d'Ivoire";
america.canada.capitalCity = "Yamoussoukro";
```

Điều này là do khi property có `readonly` là object, thì property của object đó không được làm thành `readonly`.

### `const assertion` cố định tất cả property

Thêm `as const`.

```ts twoslash
const america = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
} as const;
```

Tương tự như `readonly`, không thể gán cho property ở top-level.

```ts twoslash
// @errors: 2540
const america = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
} as const;
// ---cut---
america.name = "African Continent";
america.canada = {
  name: "Republic of Côte d'Ivoire",
  capitalCity: "Yamoussoukro",
};
```

Không chỉ vậy, property của object con cũng được làm thành `readonly`.

```ts twoslash
// @errors: 2540
const america = {
  name: "North American Continent",
  canada: {
    name: "Republic of Canada",
    capitalCity: "Ottawa",
  },
  us: {
    name: "United States of America",
    capitalCity: "Washington, D.C.",
  },
  mexico: {
    name: "United Mexican States",
    capitalCity: "Mexico City",
  },
} as const;
// ---cut---
america.canada.name = "Republic of Côte d'Ivoire";
america.canada.capitalCity = "Yamoussoukro";
```

## Thông tin liên quan

[Type assertion "as"](type-assertion-as.md)

[Readonly property trong object type](object/readonly-property.md)
