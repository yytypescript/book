# Copy nông object

Object có thể xử lý nhiều tổ hợp key và property như một thứ duy nhất.

Khi xử lý object, so sánh hoặc gán instance giống như các ngôn ngữ khác là so sánh và gán tham chiếu. Nếu tham chiếu đó được giữ ở đâu đó khác, có thể bị viết lại ở đó.

## Tác hại khi ghi đè instance một cách bừa bãi

Ví dụ giả sử bạn đang tạo service liên quan đến bệnh lối sống. Service đó nhập bữa ăn trong ngày và tính nhiệt lượng (calo) từ bữa ăn đó, hơn nữa có thể đoán xem tương lai có bị bệnh lối sống (gọi là Metabolic Syndrome tuy hơi khác) hay không.

Ở đây định nghĩa type `MealsPerDay` nghĩa là object của bữa ăn trong ngày, và định nghĩa function `willBeMetabo()` đoán xem có bị bệnh lối sống hay không từ nhiệt lượng bữa ăn trong ngày.

```ts twoslash
// @noErrors
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

function willBeMetabo(meals: MealsPerDay): boolean {
  // ...
}
```

Cách sử dụng như sau.

```ts twoslash
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

declare function willBeMetabo(meals: MealsPerDay): boolean;

// ---cut---
// 439.2 kcal
const meals: MealsPerDay = {
  breakfast: "a vegetable salad",
  lunch: "a cod's meuniere",
  dinner: "a half bottle of wine (white)",
};

willBeMetabo(meals);
// @log: false
```

Tuy nhiên, chỉ như vậy thì khi có input không hợp lệ như đồ không phải thức ăn như ốc vít, service có thể phản ứng không như mong đợi. Vì vậy định nghĩa function `isMeals()` để validate xem input có thực sự là bữa ăn hay không. Function này throw exception khi nhận được thứ không phải bữa ăn.

Cấu trúc của `isMeals()` đơn giản. Chỉ cần đoán từng bữa sáng, trưa, tối xem có phải bữa ăn hay không. Nếu có function `isMeal()` đoán một bữa ăn có phải bữa ăn hay không thì chỉ cần gọi nó bên trong. Triển khai `isMeal()` không quan trọng lần này nên bỏ qua.

```ts twoslash
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};
declare function isMeal(something: string): boolean;
// ---cut---
function isMeals(meals: MealsPerDay): void {
  if (!isMeal(meals.breakfast)) {
    throw new Error("BREAKFAST IS NOT A MEAL!");
  }
  if (!isMeal(meals.lunch)) {
    throw new Error("LUNCH IS NOT A MEAL!!!");
  }
  if (!isMeal(meals.dinner)) {
    throw new Error("DINNER IS NOT A MEAL!!!");
  }
}
```

Trong use case lần này, sau khi validate bằng `isMeals()` thì đoán bữa ăn đó bằng `willBeMetabo()`. Khi nhận được thứ không ăn được, chỉ cần catch exception và xử lý nên đại khái như sau.

```ts twoslash
// @noErrors
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};
declare function isMeals(meals: MealsPerDay): void;
declare function willBeMetabo(meals: MealsPerDay): boolean;
// ---cut---
function shouldBeCareful(meals: MealsPerDay): boolean {
  try {
    // ...
    isMeals(meals);

    return willBeMetabo(meals);
  } catch (err: unknown) {
    // ...
  }
}
```

Ở đây giả sử người tạo hoặc bảo trì `isMeals()` vì lý do gì đó đã viết chương trình ghi đè instance gốc bằng bữa ăn béo ngậy yêu thích của mình. Thay đổi này khiến user đang ăn rất lành mạnh chưa đến 500 kcal bị `isMeals()` biến thành đang ăn bom calo 19,800 kcal.

```ts twoslash
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

const meals: MealsPerDay = {
  breakfast: "a vegetable salad",
  lunch: "a cod's meuniere",
  dinner: "a half bottle of wine (white)",
};

declare function willBeMetabo(meals: MealsPerDay): boolean;

declare function isMeal(meal: string): boolean;

// ---cut---
function isMeals(meals: MealsPerDay): void {
  meals.breakfast = "a beef steak";
  // beef steak will be 1200 kcal
  meals.lunch = "a bucket of ice cream";
  // a bucket of ice cream will be 7200 kcal
  meals.dinner = "3 pizzas";
  // 3 pizzas will be 11400 kcal

  if (!isMeal(meals.breakfast)) {
    throw new Error("BREAKFAST IS NOT MEAL!");
  }
  if (!isMeal(meals.lunch)) {
    throw new Error("LUNCH IS NOT MEAL!!!");
  }
  if (!isMeal(meals.dinner)) {
    throw new Error("DINNER IS NOT MEAL!!!");
  }
}

console.log(meals);
// @log: 439.2 kcal

isMeals(meals);

console.log(meals);
// @log: 19,800 kcal!!!

willBeMetabo(meals);
// @log: true
```

Khi đã gọi `isMeals()`, bất kể bữa ăn nào được đưa vào, `willBeMetabo()` sẽ đoán ai cũng đang trên đường đến bệnh lối sống. Thay đổi biến `meals` không chỉ dừng lại trong `isMeals()` mà còn ảnh hưởng ra bên ngoài.

### Vấn đề lần này

Lần này ví dụ `isMeals()` gây hại. Nếu function này do chính mình tạo thì có thể tìm nguyên nhân ngay. Không viết function có vấn đề như vậy tất nhiên quan trọng, nhưng nếu có teammate chưa thành thạo thì có thể viết function như vậy. Thiết kế ngăn không cho con người mắc lỗi quan trọng hơn giả định con người không mắc lỗi.

Nếu `isMeals()` là package lấy từ bên ngoài thì có vấn đề. Tự mình sửa package này không dễ (không phải không thể). Gửi pull request cho người tạo và dừng phát triển cho đến khi bug được fix cũng không thực tế.

### Nên làm thế nào

Nên làm cho instance không thể bị viết lại, hoặc chuẩn bị instance scapegoat để instance gốc không bị phá hủy. Phương pháp trước được đại diện bởi value object. Ở đây giới thiệu phương pháp sau, scapegoat, tức là chuẩn bị copy.

## Shallow copy là gì

Như tiêu đề, **nông** nghĩa là gì? Đó là khi copy object, dù object có cấu trúc sâu đến đâu (nested) thì chỉ copy tầng đầu tiên. Tất nhiên từ đối nghịch là deep copy.

### Object đã shallow copy không bằng nhau

Giả sử function shallow copy là `shallowCopy()`. Triển khai không khó nhưng lần này chỉ muốn nói về hành vi nên để sau. Object đã shallow copy và original khi so sánh bằng `===` trả về `false`. Điều này tự nhiên theo định nghĩa của copy, nếu trả về `true` thì copy đã thất bại.

```ts twoslash
declare function shallowCopy(obj: object): object;

// ---cut---
const object1: object = {};
const object2: object = shallowCopy(object1);

console.log(object1 === object2);
// @log: false
```

Ví dụ sau ngăn chặn ghi đè instance bằng shallow copy. Instance `meals` không thay đổi và chỉ `scapegoat` được truyền làm tham số cho `isMeals()` bị thay đổi.

```ts twoslash
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

const meals: MealsPerDay = {
  breakfast: "a vegetable salad",
  lunch: "a cod's meuniere",
  dinner: "a half bottle of wine (white)",
};

declare function shallowCopy(meals: MealsPerDay): MealsPerDay;

declare function isMeals(meals: MealsPerDay): void;

// ---cut---
const scapegoat: MealsPerDay = shallowCopy(meals);

console.log(meals);
// @log: { breakfast: "a vegetable salad", lunch: "a cod's meuniere", dinner: "a half bottle of wine (white)" }

console.log(scapegoat);
// @log: { breakfast: "a vegetable salad", lunch: "a cod's meuniere", dinner: "a half bottle of wine (white)" }

isMeals(scapegoat);

console.log(meals);
// @log: { breakfast: "a vegetable salad", lunch: "a cod's meuniere", dinner: "a half bottle of wine (white)" }

console.log(scapegoat);
// @log: { breakfast: "a beef steak", lunch: "a bucket of ice cream", dinner: "3 pizzas" }
```

### Trường hợp shallow copy không ngăn được

Như đã nói, shallow copy chỉ copy tầng đầu tiên của object. Vì vậy nếu object có cấu trúc sâu, phức tạp, nó không copy tất cả mà tầng thứ hai trở đi chỉ là tham chiếu. Ví dụ sau cho thấy khi property của shallow copy có object, nó là tham chiếu chứ không phải copy.

```ts twoslash
declare function shallowCopy(meals: NestObject): NestObject;

// ---cut---
type NestObject = {
  nest: object;
};

const object1: NestObject = {
  nest: {},
};
const object2: NestObject = shallowCopy(object1);

console.log(object1 === object2);
// @log: false
console.log(object1.nest === object2.nest);
// @log: true
```

Nếu muốn tạo copy hoàn chỉnh, sử dụng deep copy đã đề cập cùng với shallow copy.
Lần này không đi sâu vào deep copy. So với shallow copy, deep copy tốn thời gian copy hơn, và vì copy thực thể chứ không phải tham chiếu, cần cấp phát cùng lượng bộ nhớ. Nếu deep copy tràn lan sẽ nhanh chóng lãng phí tài nguyên thời gian và không gian. Khi shallow copy đủ dùng thì nên sử dụng shallow copy.

### Triển khai shallow copy

Triển khai shallow copy trong JS hiện đại rất dễ, chỉ cần code sau là xong.

```ts twoslash
const sample: object = {
  year: 1999,
  month: 7,
};
// ---cut---
const shallowCopied: object = { ...sample };
```

Tất nhiên biến `sample` phải là object. `...` này là spread syntax. Về spread syntax hãy xem chương function.

Có thể sử dụng spread syntax để copy object từ ES2018. Ví dụ shallow copy như sau

```ts twoslash
const sample: object = {
  year: 1999,
  month: 7,
};

const shallowCopied: object = { ...sample };
```

khi compile với ES2018 sẽ thành như sau.

```ts twoslash
const sample = {
  year: 1999,
  month: 7,
};
const shallowCopied = { ...sample };
```

Gần như giống nhau nhưng khi compile với ES2017 sẽ thành như sau.

```ts twoslash
const sample = {
  year: 1999,
  month: 7,
};
const shallowCopied = Object.assign({}, sample);
```

Trước khi spread syntax được triển khai, sử dụng `Object.assign()` này. Hai cái này không hoàn toàn giống nhau nhưng có thể sử dụng `Object.assign({}, obj)` gần như thay thế cho `{...obj}`.

## Sử dụng API để copy

Trong JavaScript, tùy object có API được cung cấp để viết shallow copy ngắn gọn. `Map` và `Set` có thể sử dụng điều đó.

### Copy `Map<K, V>`

Khi copy `Map`, truyền object `Map` muốn copy vào constructor `Map`.

```ts twoslash
const map1 = new Map([
  [".js", "JS"],
  [".ts", "TS"],
]);
const map2 = new Map(map1);
// Phần tử giống nhau nhưng instance Map khác nhau
console.log(map2);
// @log: Map (2) {".js" => "JS", ".ts" => "TS"}
console.log(map1 !== map2);
// @log: true
```

[Map](../reference/builtin-api/map.md)

### Copy `Set<T>`

Khi copy `Set`, truyền object `Set` muốn copy vào constructor `Set`.

```ts twoslash
const set1 = new Set([1, 2, 3]);
const set2 = new Set(set1);
// Phần tử giống nhau nhưng instance Set khác nhau
console.log(set2);
// @log: Set (3) {1, 2, 3}
console.log(set1 !== set2);
// @log: true
```

[Set](../reference/builtin-api/set.md)

### Copy `Array<T>`

Có nhiều cách copy array, nhưng đơn giản nhất là sử dụng spread syntax của array.

```ts twoslash
const array1 = [1, 2, 3];
const array2 = [...array1];
```

Khi đó nếu quên viết spread syntax `...` sẽ tạo ra array của array `T[][]` nên hãy cẩn thận.

## Thông tin liên quan

[Spread syntax](../reference/values-types-variables/array/spread-syntax-for-array.md)
