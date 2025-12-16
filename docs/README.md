---
slug: /
image: /img/ogp.png
sidebar_label: Trang chủ
---

# TypeScript

<head>
  <title>Nhập môn TypeScript "Survival TypeScript" - Những điều tối thiểu cần nắm vững khi sử dụng trong thực tế</title>
</head>

<!-- markdownlint-disable MD033 -->

<div style={{display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1rem"}}>
  <div>
    <small style={{color: "gray"}}>Bản gốc tiếng Nhật</small><br/>
    <iframe src="https://ghbtns.com/github-btn.html?user=yytypescript&repo=book&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
  </div>
  <div>
    <small style={{color: "gray"}}>Bản dịch tiếng Việt</small><br/>
    <iframe src="https://ghbtns.com/github-btn.html?user=LeHoangTuanbk&repo=survival-typescript-vietnamese&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
  </div>
</div>

<!-- markdownlint-restore -->

:::note
Cuốn sách "Survival TypeScript" này là sách nhập môn dành cho các developer sử dụng TypeScript trong công việc thực tế. Trang này là bản tóm tắt các nội dung chính từ hàng trăm trang của cuốn sách, giúp bạn nắm bắt nhanh nhất các đặc điểm của TypeScript.

» [Tìm hiểu thêm về cuốn sách](./about.md)
» [Muốn viết TypeScript ngay bây giờ](./tutorials/README.md)
:::

## TypeScript là gì

- Ngôn ngữ lập trình là **superset** của JavaScript.
- Là **ngôn ngữ kiểu tĩnh**, có thể **kiểm tra tĩnh** tính đúng đắn của chương trình.
- Có hệ sinh thái phong phú với nhiều library và IDE hỗ trợ phát triển.
- Được **Microsoft** phát triển năm 2012 và công bố dưới dạng **mã nguồn mở**.

» [Tìm hiểu thêm về đặc điểm của TypeScript](./overview/features.md)
» [Tìm hiểu thêm về bối cảnh ra đời của TypeScript](./overview/before-typescript.md)

## TypeScript là Superset của JavaScript

- **Superset** là ngôn ngữ được tạo ra bằng cách **mở rộng** ngôn ngữ gốc, đồng thời duy trì **tính tương thích** với ngôn ngữ gốc.
- TypeScript là ngôn ngữ được tạo ra bằng cách mở rộng JavaScript, đồng thời duy trì tính tương thích với JavaScript.
- Do đó, mọi code JavaScript đều có thể được xử lý như TypeScript.
- TypeScript bổ sung các tính năng riêng như type annotation, interface, generics.

<figure><figcaption>Các tính năng của TypeScript và JavaScript</figcaption>
<img src="/top/typescript-as-superset-of-javascript.svg" width="480" />
</figure>

### Lợi ích của Superset

- **Dễ học**: Có thể tận dụng kiến thức JavaScript để học TypeScript.
- **Tận dụng tài sản có sẵn**: Có thể phát triển dựa trên code JavaScript hiện có.
- **Dễ chuyển đổi**: Các dự án JavaScript hiện có có thể dễ dàng chuyển sang TypeScript.

» [Tìm hiểu thêm về mối quan hệ giữa TypeScript và JavaScript](./overview/javascript-is-typescript.md)

## Kiểm tra tĩnh

- TypeScript có thể kiểm tra tĩnh tính đúng đắn của chương trình.
- JavaScript phải chạy chương trình mới biết có bug hay không.
- TypeScript có thể kiểm tra mà không cần chạy chương trình.

» [Tìm hiểu thêm về kiểm tra tĩnh](./overview/static-type.md)

### Nâng cao hiệu quả phát triển, chất lượng và sự an tâm

- Phát hiện vấn đề sớm, tăng hiệu quả phát triển.
- Phát hiện và sửa lỗi ngay khi viết code, ngăn ngừa bug.
- Khi tích hợp editor với TypeScript, có thể kiểm tra realtime và code completion.

<figure><figcaption>Phản hồi trên editor</figcaption>
<img src="/top/compile-error-feedback-on-editor.svg" width="480" />
</figure>

- Việc sửa lỗi sớm giúp tăng độ tin cậy và sự an tâm cho sản phẩm.
- Kiểm tra tĩnh là yếu tố an tâm quan trọng khi phát triển các chương trình lớn, khó nhìn thấy tổng thể, hoặc các hệ thống quan trọng.

## Cơ chế kiểm tra

- Kiểm tra của TypeScript dựa trên **hệ thống kiểu** (type system).
- Dựa trên hệ thống kiểu, chương trình được kiểm tra tại thời điểm **compile**.

### Hệ thống kiểu

- Hệ thống kiểu gán kiểu cho mỗi loại dữ liệu và đặt ra các ràng buộc về thao tác có thể thực hiện trên dữ liệu đó.
- Nhờ đó, đảm bảo rằng chỉ các giá trị được chỉ định mới được gán cho biến và chỉ các thao tác được chỉ định mới được thực hiện, giúp chương trình chính xác và an toàn hơn.
- Hệ thống kiểu được xây dựng dựa trên "lý thuyết kiểu" trong toán học, có thể phát hiện lỗi chương trình thông qua chứng minh toán học.

### Type annotation

- **Kiểu** (type) là thứ ràng buộc giá trị nào có thể được gán cho biến.
- Developer chỉ định kiểu của biến thông qua **type annotation**.
- Trong TypeScript, kiểm tra được thực hiện dựa trên type annotation.

<figure><figcaption>Type annotation</figcaption>
<img src="/top/type-annotation.svg" width="480" />
</figure>

### Type inference

- Khi kiểu của giá trị rõ ràng từ ngữ cảnh, kiểu sẽ được tự động suy luận. Cơ chế này gọi là **type inference** (suy luận kiểu).
- Nhờ type inference, developer có thể bỏ qua type annotation, giảm lượng code cần viết.

<figure><figcaption>Type inference</figcaption>
<img src="/top/type-inference.svg" width="480" />
</figure>

### Compile

- Để chạy TypeScript, cần chuyển đổi sang JavaScript. Quá trình chuyển đổi này gọi là **compile**.
- Code JavaScript sau khi chuyển đổi có thể chạy trên browser hoặc server.
- Kiểm tra của TypeScript được thực hiện tại thời điểm compile.

<figure><figcaption>Compile</figcaption>
<img src="/top/compile-from-typescript-to-javascript.svg" width="480" />
</figure>

## Kiểu còn đóng góp cho documentation, refactoring và công cụ

- **Là documentation**: Thông tin kiểu đóng vai trò như documentation, giúp hiểu code.
- **Refactoring an toàn**: Khi thay đổi kiểu biến hoặc signature hàm, tất cả các vị trí cần sửa đều được phát hiện khi compile, giảm lỗi do sơ suất.
- **Hỗ trợ công cụ phong phú**: Hỗ trợ IDE và editor với kiểm tra lỗi realtime, auto-completion, refactoring tools, navigation.

» [Tìm hiểu thêm về lý do sử dụng TypeScript](./overview/why-you-should-use-typescript.md)

## Nhiều editor hỗ trợ TypeScript

- Visual Studio Code
- JetBrains IDE (IntelliJ, WebStorm, PhpStorm, RubyMine, PyCharm, GoLand, v.v.)
- Vim
- NeoVim
- Emacs (Tide)
- Atom
- Sublime Text

» [Tìm hiểu thêm về TypeScript và hệ sinh thái](./overview/ecosystem.md)

## Có thể tạo nhiều loại phần mềm

Phạm vi ứng dụng rộng là một trong những điểm hấp dẫn của TypeScript.

- **Web application**: Chiến trường chính của TypeScript. Được sử dụng rộng rãi trong phát triển frontend.
- **Server-side application**: Kết hợp với Node.js để phát triển backend hoặc API server.
- **Mobile application**: Sử dụng framework như React Native để phát triển ứng dụng mobile.
- **Desktop application**: Sử dụng Electron để phát triển ứng dụng desktop cross-platform.
- **Cloud functions**: Tạo serverless functions trên các nền tảng cloud như AWS Lambda hoặc Azure Functions.
- **Utility và CLI tools**: Phát triển command-line tools và các utility khác.
- **Infrastructure as Code (IaC)**: Sử dụng Pulumi hoặc AWS CDK để quản lý cấu hình infrastructure.
- **Extension cho ứng dụng**: Phát triển extension cho các ứng dụng desktop như Google Chrome hoặc Visual Studio Code bằng TypeScript.

» [Tìm hiểu thêm về phạm vi ứng dụng của TypeScript](./overview/range-of-typescript.md)

## Cảm nhận của các công ty đã áp dụng TypeScript

- **[Slack][]**: Dù codebase lớn, hệ thống kiểu vẫn đảm bảo tính an toàn và độ tin cậy.
- **[Airbnb][]**: Nếu sử dụng TypeScript, có thể ngăn ngừa được 38% bug của Airbnb.
- **[Yahoo Japan][]**: Kiểu tĩnh cải thiện chất lượng code và khả năng bảo trì, tích hợp với IDE tăng năng suất developer.
- **[LINE Corporation][]**: Giảm chi phí QA cho những sửa đổi nhỏ nhờ TypeScript hóa.
- **[Sansan Corporation][]**: Kiểu đóng vai trò như documentation, hữu ích cho việc đọc code và thay đổi code của team khác. Cũng là điểm thu hút trong tuyển dụng.
- **[Raksul Corporation][]**: Được hưởng lợi từ hệ thống kiểu, auto-completion từ editor, dễ dàng tạo tình huống code = documentation.

[Slack]: https://slack.engineering/typescript-at-slack/
[Airbnb]: https://www.reddit.com/r/typescript/comments/aofcik/38_of_bugs_at_airbnb_could_have_been_prevented_by/
[Yahoo Japan]: https://codezine.jp/article/detail/16905
[Sansan Corporation]: https://buildersbox.corp-sansan.com/entry/2021/06/24/110000
[Raksul Corporation]: https://techblog.raksul.com/entry/2020/10/07/after-introducing-typescript-to-existing-product/
[LINE Corporation]: https://logmi.jp/tech/articles/322702

## Các kiểu cơ bản

### Kiểu primitive

- [`boolean`](./reference/values-types-variables/boolean.md): Giá trị boolean (true/false).
- [`number`](./reference/values-types-variables/number/README.md): Số.
- [`string`](./reference/values-types-variables/string.md): Chuỗi.
- [`bigint`](./reference/values-types-variables/bigint.md): Số nguyên lớn.
- [`symbol`](./reference/values-types-variables/symbol.md): Biểu thị giá trị duy nhất.
- [`undefined`](./reference/values-types-variables/undefined.md): Biểu thị trạng thái giá trị chưa được định nghĩa.
- [`null`](./reference/values-types-variables/null.md): Biểu thị trạng thái không có giá trị.

```typescript twoslash
const isReady: boolean = false;
const age: number = 25;
const fullName: string = "John Doe";
const bigNumber: bigint = 100n;
const uniqueSymbol: symbol = Symbol("unique");
const notDefined: undefined = undefined;
const empty: null = null;
```

### Kiểu đặc biệt

- [`any`](./reference/values-types-variables/any.md): Kiểu có thể gán bất cứ thứ gì. Sử dụng khi không biết kiểu. Không có ràng buộc thao tác trên giá trị, tính an toàn kiểu yếu đi.
- [`unknown`](./reference/statements/unknown.md): Tương tự any, có thể gán bất cứ thứ gì. Thao tác trên giá trị bị hạn chế, tính an toàn kiểu được đảm bảo.
- [`void`](./reference/functions/void-type.md): Biểu thị không có giá trị. Sử dụng khi hàm không trả về gì.
- [`never`](./reference/statements/never.md): Biểu thị không bao giờ trả về gì. Sử dụng làm kiểu trả về cho hàm throw error hoặc vòng lặp vô hạn.

```typescript twoslash
const a: any = 100; // Có thể gán
console.log(a * 3); // Có thể thao tác
// @log: 300

// @errors: 18046
const x: unknown = 100; // Có thể gán
console.log(x * 3); // Không thể thao tác

// Hàm không có giá trị trả về
function doSomething(): void {}

// Hàm không bao giờ trả về giá trị
function throwError(): never {
  throw new Error();
}
```

## Type alias

- [Type alias](./reference/values-types-variables/type-alias.md) là tính năng định nghĩa kiểu có sẵn với tên mới.
- Hữu ích để biểu diễn kiểu phức tạp một cách đơn giản hoặc cải thiện khả năng đọc code.

```typescript twoslash
type StringOrNumber = string | number;
let value: StringOrNumber;
value = "hello"; // Có thể gán kiểu string
value = 123; // Có thể gán kiểu number
```

## Structural subtyping

- TypeScript áp dụng [structural subtyping](./reference/values-types-variables/structural-subtyping.md).
- Trong structural subtyping, việc gán biến được xác định dựa trên việc cấu trúc có tương thích hay không.

```typescript twoslash
// @errors: 2741
type Summary = { name: string };
type Detail = { name: string; age: number };

const johnDetail: Detail = { name: "John", age: 28 };
const summary: Summary = johnDetail; // Có thể gán vì tương thích structural subtyping

const johnSummary: Summary = { name: "John" };
const detail: Detail = johnSummary; // Không thể gán vì không tương thích structural subtyping (thiếu age)
```

## Array

### Array literal

- Để tạo giá trị array, sử dụng [array literal](reference/values-types-variables/array/array-literal.md)(`[]`).
- Có thể đặt giá trị khởi tạo array theo dạng `[phần tử 1, phần tử 2, ...]`.

```typescript twoslash
const numbers = [1, 2, 3];
```

### Type annotation cho array

- [Type annotation cho array](reference/values-types-variables/array/type-annotation-of-array.md) sử dụng `tên_kiểu[]` hoặc `Array<tên_kiểu>`.

```typescript twoslash
let numbers: number[];
let strings: Array<string>;
```

### Truy cập phần tử array

- Để [truy cập phần tử array](reference/values-types-variables/array/how-to-access-elements-in-an-array.md), sử dụng index.
- Chỉ định số nguyên bắt đầu từ 0 để lấy giá trị array và cũng có thể gán.

```typescript twoslash
const colors = ["red", "green", "blue"];
console.log(colors[0]);
// @log: 'red'
colors[1] = "yellow";
console.log(colors);
// @log: ['red', 'yellow', 'blue']
```

### Readonly array

- [Readonly array](reference/values-types-variables/array/readonly-array.md) biểu thị array không thể thay đổi giá trị.
- Thêm `readonly` vào type annotation array để tạo readonly array.
- Cũng có thể khai báo readonly array bằng `ReadonlyArray<tên_kiểu>`, chức năng giống với `readonly tên_kiểu[]`.

```typescript twoslash
// @errors: 2542 2339
const numbers: readonly number[] = [1, 2, 3];
const strings: ReadonlyArray<string> = ["hello", "world"];

numbers[0] = 4; // Không thể thay đổi giá trị
strings.push("!"); // Không thể thêm phần tử
```

### Lặp array

- Có cú pháp `for...of` để [lặp array](reference/values-types-variables/array/how-to-loop-an-array.md).

```typescript twoslash
const numbers = [1, 2, 3];

for (const num of numbers) {
  console.log(num); // In ra 1, 2, 3
}
```

## Tuple type

- Sử dụng [tuple type](reference/values-types-variables/tuple.md) để cố định số lượng phần tử và kiểu của mỗi phần tử trong array.
- Kiểu được xác định cho mỗi index của phần tử.

```typescript twoslash
// @errors: 2322
let tuple: [string, number];
tuple = ["hello", 10]; // Có thể gán
tuple = [10, "hello"]; // Không thể gán vì thứ tự không đúng
tuple = ["hello", 10, "world"]; // Không thể gán vì quá nhiều phần tử
```

### Truy cập phần tử tuple

- Để truy cập phần tử tuple, cũng sử dụng index như array.

```typescript twoslash
const tuple: [string, number] = ["hello", 10];
console.log(tuple[0]);
// @log: 'hello'
```

## Object

### Object literal

- Để tạo object, sử dụng [object literal](reference/values-types-variables/object/object-literal.md)(`{}`).
- Có thể đặt giá trị khởi tạo object theo dạng `{ key: giá trị, ... }`.

```typescript twoslash
const john = { name: "John", age: 20 };
```

### Property access

- Sử dụng dấu chấm `.` để truy cập property của object.

```typescript twoslash
declare const john: { name: string; age: number };
// ---cut---
console.log(john.name);
// @log: 'John'
```

### Type annotation cho object

- [Type annotation cho object](reference/values-types-variables/object/type-annotation-of-objects.md) được viết theo dạng `{property1: kiểu1, property2: kiểu2, ...}`.

```typescript twoslash
let obj: { name: string; age: number };
```

### Readonly property

- Property có [`readonly`](reference/values-types-variables/object/readonly-property.md) không thể gán.

```typescript twoslash
// @errors: 2540
let obj: { readonly name: string; age: number };
obj = { name: "John", age: 20 };
obj.name = "Tom";
```

### Optional property

- Property có dấu `?` ([optional property](reference/values-types-variables/object/optional-property.md)) có thể bỏ qua.

```typescript twoslash
let obj: { name: string; age?: number };
obj = { name: "John" }; // Không có property `age` cũng không lỗi
```

### Object method

- Có thể định nghĩa object có hàm làm property.

```typescript twoslash
const obj = {
  a: 1,
  b: 2,
  sum(): number {
    return this.a + this.b;
  },
};
console.log(obj.sum());
// @log: 3
```

### Index signature

- Object có thể sử dụng [index signature](reference/values-types-variables/object/index-signature.md) để lấy giá trị với key bất kỳ.
- Type annotation cho index signature property được viết theo dạng `[tên_key: kiểu_key]: kiểu_giá_trị`.

```typescript twoslash
let obj: { [key: string]: number };
obj = { key1: 1, key2: 2 };
console.log(obj["key1"]);
// @log: 1
console.log(obj["key2"]);
// @log: 2
```

### Shorthand property names

- Khi giá trị của property là biến đã được định nghĩa, có thể bỏ qua tên property đó ([shorthand property names](reference/values-types-variables/object/shorthand-property-names.md)).

```typescript twoslash
export default "Cần module hóa để sử dụng biến name.";
// ---cut---
const name = "John";
const age = 20;
const obj = { name, age };
console.log(obj);
// @log: { name: 'John', age: 20 }
```

### Optional chaining

- Khi không chắc property có tồn tại hay không, có thể truy cập an toàn bằng toán tử `?.` ([optional chaining](reference/values-types-variables/object/optional-chaining.md)).

```typescript twoslash
function printLength(obj: { a?: string }) {
  console.log(obj.a?.length);
}
printLength({ a: "hello" });
// @log: 5
printLength({});
// @log: undefined
```

## Map

### Map object

- [Map object](reference/builtin-api/map.md) là collection ghép cặp key và value tương ứng.
- Key có thể là bất kỳ giá trị nào, kể cả object.

```typescript twoslash
const map = new Map();
map.set("name", "John");
map.set("age", "20");

console.log(map.get("name"));
// @log: 'John'
```

### Type annotation cho Map

- Type annotation cho Map được viết theo dạng `Map<kiểu_key, kiểu_value>`.

```typescript twoslash
let people: Map<string, number>;
```

### Lặp Map

- Khi lặp Map object bằng `for...of`, mỗi entry được lấy theo thứ tự dưới dạng array gồm key và value.
- Thứ tự phần tử được đảm bảo theo thứ tự thêm phần tử.

```typescript twoslash
const map = new Map<string, number>();
// ---cut---
for (const [key, value] of map) {
  console.log(key, value);
}
```

## Set

### Set object

- [Set object](reference/builtin-api/set.md) là collection không có giá trị trùng lặp.
- Phần tử của Set có thể là bất cứ thứ gì.

```typescript twoslash
const set = new Set();
set.add(1);
set.add(2);
set.add(2); // Giá trị trùng không được thêm.

console.log(set);
// @log: Set {1, 2}
```

### Type annotation cho Set

- Type annotation cho Set được viết theo dạng `Set<kiểu_phần_tử>`.

```typescript twoslash
let numSet: Set<number>;
```

### Lặp Set

- Set cũng có thể lặp bằng `for...of` như Map.
- Thứ tự theo thứ tự `add`.

```typescript twoslash
const set = new Set<number>();
// ---cut---
for (const value of set) {
  console.log(value);
}
```

## Enum (Kiểu liệt kê)

### Cơ bản về enum

- [Enum](reference/values-types-variables/enum/README.md) định nghĩa tập hợp các giá trị số hoặc chuỗi liên quan.
- Enum được định nghĩa bằng từ khóa `enum`.

```typescript twoslash
enum Color {
  Red,
  Green,
  Blue,
}
```

### Gán giá trị cho enum

- Giá trị của enum có thể chỉ định bằng string literal hoặc numeric literal.

```typescript twoslash
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
```

### Sử dụng enum

- Để truy cập từng giá trị của enum, sử dụng toán tử dấu chấm.

```typescript twoslash
enum Color {
  Red,
  Green,
  Blue,
}
// ---cut---
const myColor: Color = Color.Red;
```

## Union type

- [Union type](reference/values-types-variables/union.md) có thể biểu diễn giá trị nhận một trong nhiều kiểu.
- Sử dụng theo dạng `kiểu1 | kiểu2 | ...`.
- Sử dụng khi muốn xử lý giá trị của nhiều kiểu khác nhau trong cùng một biến.

```typescript twoslash
let value: boolean | number;
value = true; // Có thể gán
value = 100; // Có thể gán
```

### Discriminated union

- [Discriminated union](reference/values-types-variables/discriminated-union.md) là union type đặc biệt có property kiểu literal chung.
- Có thể phân biệt kiểu bằng property chung.

```typescript twoslash
type Triangle = { kind: "triangle"; base: number; height: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Triangle | Rectangle;

function getArea(shape: Shape): number {
  // Sử dụng property chung kind để xác định kiểu
  switch (shape.kind) {
    case "triangle":
      // Trong nhánh này shape được thu hẹp thành kiểu Triangle
      return (shape.base * shape.height) / 2;
    case "rectangle":
      // Trong nhánh này shape được thu hẹp thành kiểu Rectangle
      return shape.width * shape.height;
  }
}
```

## Intersection type

- [Intersection type](reference/values-types-variables/intersection.md) định nghĩa kiểu mới kết hợp nhiều kiểu thành một.
- Sử dụng theo dạng `kiểu1 & kiểu2 & ...`.
- Kiểu kết quả có tất cả property và method của mỗi kiểu.

```typescript twoslash
type Octopus = { swims: boolean };
type Cat = { nightVision: boolean };
type Octocat = Octopus & Cat;

const octocat: Octocat = { swims: true, nightVision: true };
console.log(octocat);
// @log: { swims: true, nightVision: true }
```

## Destructuring assignment

- Sử dụng destructuring assignment có thể gán từng phần tử của array vào biến cùng lúc ([destructuring assignment cho array](reference/values-types-variables/array/destructuring-assignment-from-array.md)).

```typescript twoslash
const [a, b] = [1, 2];
console.log(a);
// @log: 1
console.log(b);
// @log: 2
```

- Với destructuring assignment, có thể gán property của object vào các biến riêng lẻ ([destructuring assignment cho object](reference/values-types-variables/object/destructuring-assignment-from-objects.md)).

```typescript twoslash
export default "Cần module hóa để sử dụng biến name.";
// ---cut---
const obj = {
  name: "John",
  age: 20,
};

const { name, age } = obj;
console.log(name);
// @log: 'John'
console.log(age);
// @log: 20
```

## Rẽ nhánh điều kiện

- Trong TypeScript, giống JavaScript, có thể sử dụng câu lệnh `if` hoặc `switch` để rẽ nhánh điều kiện.

### [Câu lệnh if-else](reference/statements/if-else.md)

```typescript twoslash
const age: number = 20;

if (age >= 20) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
// @log: 'You are an adult.'
```

### [Câu lệnh switch](reference/statements/switch.md)

```typescript twoslash
const color: string = "blue";

switch (color) {
  case "red":
    console.log("Color is red.");
    break;
  case "blue":
    console.log("Color is blue.");
    break;
  default:
    console.log("Color is neither red nor blue.");
}
// @log: 'Color is blue.'
```

### Thu hẹp kiểu

- Sử dụng rẽ nhánh điều kiện, kiểu được tự động thu hẹp trong nhánh đó ([Control flow analysis và type guard](reference/statements/control-flow-analysis-and-type-guard)).

```typescript twoslash
let value: string | number;
// Gán giá trị kiểu string hoặc number với xác suất 50%
value = Math.random() < 0.5 ? "Hello" : 100;

if (typeof value === "string") {
  // Trong nhánh này value được xử lý như kiểu string
  console.log(value.toUpperCase());
} else {
  // Trong nhánh này value được xử lý như kiểu number
  console.log(value * 3);
}
```

## Function

- Trong TypeScript có thể thêm type annotation cho arrow function hoặc function declaration.

### [Arrow function](reference/functions/arrow-functions.md)

```typescript twoslash
const greet = (name: string): string => {
  return `Hello ${name}`;
};

console.log(greet("John"));
// @log: 'Hello John'
```

### [Function declaration](reference/functions/function-declaration.md)

```typescript twoslash
function greet(name: string): string {
  return `Hello ${name}`;
}

console.log(greet("John"));
// @log: 'Hello John'
```

### Destructuring parameter

- Có thể destructure array hoặc object literal làm tham số hàm ([destructuring parameter](reference/functions/destructuring-assignment-parameters.md)).

```typescript twoslash
const printCoord = ({ x, y }: { x: number; y: number }) => {
  console.log(`Coordinate is (${x}, ${y})`);
};

printCoord({ x: 10, y: 20 });
// @log: 'Coordinate is (10, 20)'
```

### Type guard function

- Sử dụng hàm xác định kiểu cụ thể ([type guard function](reference/functions/type-guard-functions.md)), kiểu sẽ được thu hẹp.

```typescript twoslash
function isString(value: any): value is string {
  return typeof value === "string";
}

function printLength(value: any) {
  if (isString(value)) {
    // Trong nhánh này value được xử lý như kiểu string
    console.log(value.length);
  }
}

printLength("hello");
// @log: 5
```

### Optional parameter

- Có thể thêm `?` vào tham số hàm để làm cho nó tùy chọn ([optional parameter](reference/functions/optional-parameters.md)).

```typescript twoslash
function greet(name?: string) {
  if (name === undefined) {
    return "Hello!";
  } else {
    return `Hello ${name}!`;
  }
}

console.log(greet("John"));
// @log: 'Hello John!'
console.log(greet());
// @log: 'Hello!'
```

### Default parameter

- Có thể đặt giá trị mặc định cho tham số hàm bằng `=` ([default parameter](reference/functions/default-parameters.md)).

```typescript twoslash
function greet(name: string = "Mystery") {
  return `Hello ${name}!`;
}

console.log(greet("John"));
// @log: 'Hello John!'
console.log(greet());
// @log: 'Hello Mystery!'
```

### Rest parameter

- Có thể sử dụng `...` để đặt [rest parameter](reference/functions/rest-parameters.md) (số lượng tham số bất kỳ).

```typescript twoslash
function sum(...numbers: number[]) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));
// @log: 15
```

## Class

### Cú pháp class

- Cú pháp [class](reference/object-oriented/class/README.md) của JavaScript có thể sử dụng như bình thường.
- Có thể thêm type annotation cho khai báo [field](reference/object-oriented/class/fields.md).

```typescript twoslash
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
john.introduce();
// @log: 'My name is John and I am 20 years old.'
```

### Access modifier

- Có 3 [access modifier](reference/object-oriented/class/access-modifiers.md): `public` (mặc định), `protected`, `private`.

```typescript twoslash
// @errors: 2341
class Person {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
console.log(john.name); // In ra 'John'
console.log(john.age); // Lỗi (không thể truy cập vì private)
```

### Readonly modifier trong class

- Property có [`readonly` modifier](reference/object-oriented/class/readonly-modifier-in-classes.md) là read-only.
- `readonly` modifier có thể kết hợp với access modifier.

```typescript twoslash
// @errors: 2540
class Person {
  readonly name: string;
  private readonly age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
john.name = "Tom"; // Lỗi (không thể thay đổi vì readonly)
```

### Constructor shorthand

- Trong TypeScript, thêm access modifier vào constructor parameter sẽ tự động định nghĩa field đó ([constructor shorthand](reference/object-oriented/class/constructor-shorthand.md)).
- Điều này giúp đơn giản hóa code.

```typescript twoslash
class Person {
  constructor(public name: string, private age: number) {}

  introduce(): void {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const john = new Person("John", 20);
john.introduce();
// @log: 'My name is John and I am 20 years old.'
```

### Field initializer

- Có thể đặt giá trị khởi tạo trực tiếp khi khai báo field ([field initializer](reference/object-oriented/class/field-initializers.md)).

```typescript twoslash
class Counter {
  count = 0; // Đặt giá trị khởi tạo là 0
  //    ^^^initializer

  increment(): void {
    this.count++;
  }
}

const counter = new Counter();
console.log(counter.count);
// @log: 0
counter.increment();
console.log(counter.count);
// @log: 1
```

### Static field và static method

- Sử dụng từ khóa `static` có thể định nghĩa field hoặc method liên quan đến class thay vì instance ([static field](reference/object-oriented/class/static-fields.md), [static method](reference/object-oriented/class/static-methods.md)).

```typescript twoslash
class MyClass {
  static x = 0;

  static printX(): void {
    console.log(MyClass.x);
  }
}

MyClass.printX();
// @log: 0
```

### This type

- Trả về `this` trong method cho phép method chaining nối các lời gọi method ([method chaining](reference/object-oriented/class/return-this-type.md)).

```typescript twoslash
class MyClass {
  value = 1;

  increment(): this {
    this.value++;
    return this;
  }

  add(v: number): this {
    this.value += v;
    return this;
  }

  print(): this {
    console.log(this.value);
    return this;
  }
}

new MyClass().increment().add(3).print();
// @log: 5
```

### Kế thừa class

- Có thể [kế thừa class](reference/object-oriented/class/class-inheritance.md) bằng từ khóa `extends`.
- Giá trị property và method của superclass có thể truy cập từ subclass.

```typescript twoslash
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

class Dog extends Animal {
  bark(): string {
    return "Woof!";
  }
}

const dog = new Dog("Max");
console.log(dog.greet());
// @log: 'Hello, my name is Max'
console.log(dog.bark());
// @log: 'Woof!'
```

### Toán tử `instanceof`

- [Toán tử `instanceof`](reference/object-oriented/class/instanceof-operator.md) có thể xác định object có phải là instance của class cụ thể hay không.

```typescript twoslash
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);
// @log: true
console.log(dog instanceof Animal);
// @log: true
```

### Abstract class

- Có thể định nghĩa [abstract class](reference/object-oriented/class/abstract-class.md) bằng từ khóa `abstract`.
- Abstract class không thể khởi tạo instance, được sử dụng làm base class cho các class khác kế thừa.

```typescript twoslash
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof Woof");
  }
}

const dog = new Dog();
dog.move();
// @log: 'roaming the earth...'
dog.makeSound();
// @log: 'Woof Woof'
```

### Getter và Setter

- Getter và setter là method để lấy/đặt property của object.
- Getter được định nghĩa bằng từ khóa `get`, setter bằng từ khóa `set`.

```typescript twoslash
class Circle {
  private _radius: number;

  constructor(radius: number) {
    this._radius = radius;
  }

  // Getter
  get radius(): number {
    return this._radius;
  }

  // Setter
  set radius(radius: number) {
    if (radius <= 0) {
      throw new Error("Invalid radius value");
    }
    this._radius = radius;
  }
}

const circle = new Circle(5);
console.log(circle.radius);
// @log: 5
circle.radius = 3;
console.log(circle.radius);
// @log: 3
circle.radius = -2;
// Exception: 'Invalid radius value'
```

### Interface

- Interface của TypeScript có khả năng định nghĩa shape của property, method, class.
- Mục đích chính của sử dụng interface là bắt buộc class hoặc object cụ thể phải có property hoặc method cụ thể.

```typescript twoslash
interface Printable {
  print(): void;
}

class MyClass implements Printable {
  print(): void {
    console.log("Hello, world!");
  }
}
```

### Cú pháp interface

- [Interface](reference/object-oriented/interface/README.md) của TypeScript có thể định nghĩa shape của object.
- Interface có thể mô tả signature của property và method.

```typescript twoslash
interface Point {
  readonly x: number;
  readonly y: number;
  sum(): number;
}

const point: Point = {
  x: 10,
  y: 20,
  sum: function () {
    return this.x + this.y;
  },
};
```

### Readonly modifier trong interface

- Có thể sử dụng readonly modifier trong interface để đặt property là read-only.
- Điều này khiến giá trị property không thể thay đổi sau khi được đặt.

```typescript twoslash
// @errors: 2540
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = { x: 10, y: 20 };
p1.x = 5;
```

## Xử lý exception

- Trong TypeScript có thể sử dụng block try / catch / finally cho [xử lý exception](reference/statements/exception.md).
- Khi exception xảy ra (tức là throw error object), block catch được thực thi.

```typescript twoslash
try {
  throw new Error("An error occurred!");
} catch (error) {
  console.log(error);
}
```

### Cú pháp try-catch-finally

- Code trong block try phát hiện lỗi, block catch xử lý lỗi.
- Block finally được thực thi bất kể có lỗi hay không.

```typescript twoslash
try {
  throw new Error("Oops, something went wrong.");
} catch (error) {
  console.log(error);
} finally {
  console.log("This is the finally block. It always gets executed.");
}
```

### Exception class

- Trong TypeScript cũng có thể tạo custom error class.
- Có thể tạo error type cụ thể bằng custom class kế thừa Error class.

```typescript twoslash
class CustomError extends Error {
  code = "CustomError";

  constructor(message?: string) {
    super(message);
  }
}

try {
  throw new CustomError("This is a custom error");
} catch (error) {
  if (error instanceof CustomError) {
    console.log(`${error.code}: ${error.message}`);
  }
}
```

## Xử lý bất đồng bộ

- TypeScript hỗ trợ [lập trình bất đồng bộ](reference/asynchronous/README.md), có thể xử lý hiệu quả các tác vụ tốn thời gian trong code.

### Promise

- [Promise](reference/asynchronous/promise.md) biểu thị sự hoàn thành (hoặc thất bại) cuối cùng của thao tác bất đồng bộ và giá trị kết quả.

```typescript twoslash
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 2000);
});

promise.then((data) => {
  console.log(data);
});
// @log: 'Promise resolved'
```

### Cú pháp async/await

- Đã giới thiệu [cú pháp async](reference/asynchronous/async.md) và [cú pháp await](reference/asynchronous/await.md) để viết xử lý bất đồng bộ trực quan hơn.
- Sử dụng cú pháp async/await có thể viết code bất đồng bộ như thể là code đồng bộ.

```typescript twoslash
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function asyncFunction() {
  console.log("Start");
  await delay(2000);
  console.log("End");
}

asyncFunction();

// @log: 'Start'
// Sau 2 giây
// @log: 'End'
```

## Generics

- Sử dụng [generics](reference/generics/README.md) của TypeScript có thể tăng khả năng tái sử dụng kiểu và duy trì tính nhất quán của kiểu.
- Sử dụng generics có thể giới thiệu [type variable](reference/generics/type-variables.md), từ đó tổng quát hóa một phần chức năng.

```typescript twoslash
// T là type variable
function identity<T>(arg: T): T {
  return arg;
}

// Gán string cho type variable T
const output1 = identity<string>("myString");
//    ^?

// Gán number cho type variable T
const output2 = identity<number>(100);
//    ^?
```

## Module

- Hệ thống module của TypeScript cho phép tách code chia sẻ với các module khác và code nội bộ của module ([module](reference/modules.md)).

```typescript twoslash title="greeter.ts"
export function greet(name: string) {
  return `Hello, ${name}!`;
}
```

```typescript twoslash title="main.ts"
// @filename: greeter.ts
export function greet(name: string) {
  return `Hello, ${name}!`;
}

// @filename: main.ts
// ---cut---
import { greet } from "./greeter";
console.log(greet("TypeScript"));
// @log: 'Hello, TypeScript!'
```

### import và export

- Để công khai hàm hoặc biến định nghĩa trong module ra bên ngoài, sử dụng export.
- Để sử dụng hàm hoặc biến mà module công khai, sử dụng import.

```typescript twoslash title="math.ts"
export function square(x: number) {
  return x * x;
}

export function cube(x: number) {
  return x * x * x;
}
```

```typescript twoslash title="main.ts"
// @filename: math.ts
export function square(x: number) {
  return x * x;
}

export function cube(x: number) {
  return x * x * x;
}

// @filename: main.ts
// ---cut---
import { square, cube } from "./math";

console.log(square(2));
// @log: 4
console.log(cube(2));
// @log: 8
```

### default export

- Sử dụng từ khóa default có nghĩa là module mặc định chỉ export một giá trị.
- default export có thể chỉ định alias khi import.

```typescript twoslash title="greeter.ts"
export default function greet(name: string) {
  return `Hello, ${name}!`;
}
```

```typescript twoslash title="main.ts"
// @filename: greeter.ts
export default function greet(name: string) {
  return `Hello, ${name}!`;
}

// @filename: main.ts
// ---cut---
import greetFunction from "./greeter";
console.log(greetFunction("TypeScript"));
// @log: 'Hello, TypeScript!'
```

### Re-export

- Module có thể re-export những gì được export từ module khác.

```typescript twoslash title="math.ts"
export function add(x: number, y: number) {
  return x + y;
}
```

```typescript twoslash title="index.ts"
// @filename: math.ts
export function add(x: number, y: number) {
  return x + y;
}

// @filename: index.ts
// ---cut---
// Re-export
export { add } from "./math";
```

```typescript twoslash title="main.ts"
// @filename: math.ts
export function add(x: number, y: number) {
  return x + y;
}

// @filename: index.ts
export { add } from "./math";

// @filename: main.ts
// ---cut---
import { add } from "./index";
console.log(add(2, 3));
// @log: 5
```

### type import và type export

- Cũng có thể chỉ export/import kiểu.

```typescript twoslash title="types.ts"
export type MyObject = {
  name: string;
  age: number;
};
```

```typescript twoslash title="main.ts"
// @filename: types.ts
export type MyObject = {
  name: string;
  age: number;
};

// @filename: main.ts
// ---cut---
import type { MyObject } from "./types";
//     ^^^^type import

const obj: MyObject = {
  name: "TypeScript",
  age: 3,
};
```

## Lập trình ở cấp độ kiểu

- TypeScript có nhiều tính năng để lập trình ở cấp độ kiểu như toán tử typeof, toán tử keyof, utility type.

### Toán tử typeof

- [Toán tử typeof](reference/type-reuse/typeof-type-operator.md) có thể suy ra kiểu từ tên biến.

```typescript twoslash
const object = {
  name: "TypeScript",
  version: 3.9,
};

type ObjectType = typeof object;
//   ^?
```

### Toán tử keyof

- Sử dụng [toán tử keyof](reference/type-reuse/keyof-type-operator.md) có thể lấy tất cả key của object type dưới dạng union type của string literal.

```typescript twoslash
// @errors: 2322
type Point = {
  x: number;
  y: number;
};

type Key = keyof Point;
//   ^?
const key1: Key = "x"; // Gán OK
const key2: Key = "y"; // Gán OK
const key3: Key = "z"; // Không thể gán
```

`type Key = keyof Point = "x" | "y"`.

### Utility type

- TypeScript cung cấp nhiều thao tác kiểu phổ biến để tạo kiểu mới từ kiểu có sẵn.

#### Required

- [`Required`](reference/type-reuse/utility-types/required.md) là utility type biến optional property thành required property.

```typescript twoslash
type Person = {
  name: string;
  age?: number;
};

type RequiredPerson = Required<Person>;
//   ^?
// Chú ý age không còn là optional
```

#### Partial

- [`Partial`](reference/type-reuse/utility-types/partial.md) là utility type biến tất cả property của kiểu thành optional.

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type OptionalPerson = Partial<Person>;
//   ^?
```

#### Readonly

- [`Readonly`](reference/type-reuse/utility-types/readonly.md) là utility type biến tất cả property của kiểu thành readonly. Các property đó không thể gán lại.

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type ReadonlyPerson = Readonly<Person>;
//   ^?
```

#### Record

- [`Record`](reference/type-reuse/utility-types/record.md) là utility type đặt tất cả giá trị property của object thành kiểu cụ thể.

```typescript twoslash
type ThreeLetterRecord = Record<"one" | "two" | "three", string>;
//   ^?
```

#### Pick

- [`Pick`](reference/type-reuse/utility-types/pick.md) là utility type chọn ra các property cụ thể từ object.

```typescript twoslash
type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonNameAndAge = Pick<Person, "name" | "age">;
//   ^?
```

#### Omit

- [`Omit`](reference/type-reuse/utility-types/omit.md) là utility type tạo kiểu bỏ đi property cụ thể từ object.

```typescript twoslash
type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonWithoutAddress = Omit<Person, "address">;
//   ^?
```

#### Exclude

- [`Exclude`](reference/type-reuse/utility-types/exclude.md) là utility type loại bỏ kiểu cụ thể từ union type.

```typescript twoslash
type T1 = number | string | boolean;
type T2 = Exclude<T1, boolean>;
//   ^?
```

#### Extract

- [`Extract`](reference/type-reuse/utility-types/extract.md) là utility type trích xuất phần chung của hai union type.

```typescript twoslash
type T1 = number | string | boolean;
type T2 = string | boolean;
type T3 = Extract<T1, T2>;
//   ^?
```

#### NonNullable

- [`NonNullable`](reference/type-reuse/utility-types/nonnullable.md) là utility type loại bỏ cả null và undefined từ kiểu có chứa chúng.

```typescript twoslash
type T1 = string | null | undefined;
type T2 = NonNullable<T1>;
//   ^?
```

#### ReturnType

- [`ReturnType`](reference/type-reuse/utility-types/return-type.md) là utility type lấy kiểu trả về của hàm.

```typescript twoslash
function stringify(value: number): string {
  return `${value}`;
}

type StringifyReturnType = ReturnType<typeof stringify>;
//   ^?
```

#### Awaited

- [`Awaited`](reference/type-reuse/utility-types/awaited.md) là utility type lấy kiểu giá trị trả về của Promise.

```typescript twoslash
const promise1 = Promise.resolve("data");
const promise2 = Promise.resolve(Promise.resolve("data"));

type Data1 = Awaited<typeof promise1>;
//   ^?
type Data2 = Awaited<typeof promise2>;
//   ^?
```

### Mapped types

- Sử dụng [Mapped types](reference/type-reuse/mapped-types.md) có thể tạo kiểu mới từ kiểu có sẵn.
- Mapped types "map" từng property của object để tạo object mới.

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type ReadOnlyPerson = { readonly [K in keyof Person]: Person[K] };
//   ^?
```

### Indexed access type

- Sử dụng [indexed access type](reference/type-reuse/indexed-access-types.md) có thể lấy kiểu của property trong kiểu.

```typescript twoslash
type Person = {
  name: string;
  age: number;
};

type Name = Person["name"];
//   ^?
```
