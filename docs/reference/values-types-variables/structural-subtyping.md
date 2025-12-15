---
sidebar_label: Structural typing
---

# TypeScript và Structural Typing

Đối với ngôn ngữ lập trình, hệ thống kiểu là một chủ đề quan trọng. Hệ thống kiểu là tập hợp các quy tắc gán "kiểu" cho các giá trị và biến khác nhau trong chương trình. Những quy tắc này quyết định tính chất và cách xử lý dữ liệu. Đặc biệt, **cách phân biệt giữa các kiểu** và ngược lại, **cách xác định tính tương thích giữa các kiểu** là chủ đề liên quan trực tiếp đến tính dễ sử dụng và an toàn của ngôn ngữ.

Hãy suy nghĩ xem: kiểu `string` và kiểu `boolean` có thể được coi là giống nhau không? Đây rõ ràng là các kiểu dữ liệu khác nhau, và việc gán chuỗi cho biến kiểu `boolean` không phải là điều mong muốn khi bảo vệ tính an toàn kiểu. Sự phân biệt kiểu như vậy là cần thiết để chương trình hoạt động đúng.

Hơn nữa, "tính tương thích" của kiểu cũng là khái niệm quan trọng. Ví dụ, hãy xem xét hai class sau:

```ts twoslash
class Person {
  walk() {}
}

class Dog {
  walk() {}
}
```

Các class này giống nhau ở điểm đều có method `walk`. Trong trường hợp này, liệu kiểu `Person` và kiểu `Dog` có thể được coi là "tương thích"? Hay nên xử lý chúng như các kiểu hoàn toàn khác nhau?

Để giải quyết những vấn đề này, các ngôn ngữ lập trình áp dụng các hệ thống kiểu khác nhau. Cần xem xét đặc tả hệ thống kiểu từ góc độ: nên phân biệt kiểu như thế nào, và nên xác định tính tương thích giữa các kiểu như thế nào. TypeScript áp dụng hệ thống kiểu gọi là "structural typing". Việc hiểu cách structural typing phân biệt kiểu và ngược lại, cách xác định tính tương thích giữa các kiểu sẽ hữu ích cho việc viết code tốt.

## Hai cách tiếp cận phân biệt kiểu

Trong ngôn ngữ lập trình, có hai cách tiếp cận chính để phân biệt và xác định tính tương thích của kiểu:

- Nominal typing (kiểu định danh)
- Structural typing (kiểu cấu trúc)

Từ đây, chúng ta sẽ xem xét từng cách tiếp cận, bao gồm cả TypeScript và các ngôn ngữ khác.

### Nominal typing

Nominal typing là phương pháp phân biệt kiểu dựa trên tên của kiểu. Trong cách tiếp cận này, tên kiểu đóng vai trò quan trọng khi xác định các kiểu có giống nhau hay không. Ví dụ, kiểu `string` và kiểu `number` có tên khác nhau nên được xử lý như các kiểu khác nhau. Tương tự, khi các kiểu có cùng tên (ví dụ: `string` và `string`), chúng được coi là cùng kiểu. Trong cách tiếp cận này, kiểu `Person` và kiểu `Dog` có tên khác nhau nên được xử lý như các kiểu khác nhau và không có tính tương thích.

Các ngôn ngữ áp dụng nominal typing bao gồm Java, PHP, C#, Swift, v.v. Trong những ngôn ngữ này, tính tương thích kiểu được kiểm soát bởi tên kiểu. Ví dụ trong Java, nếu cố gán instance `Person` cho biến kiểu `Dog`, sự không khớp kiểu sẽ được báo lỗi compile.

```java
class Person {}

class Dog {}

class Main {
    public static void main(String[] args) {
        Person person = new Person();
        Dog dog = person; // Lỗi compile: kiểu không tương thích
    }
}
```

Trong ví dụ này, kiểu `Person` và kiểu `Dog` có tên khác nhau, nên hệ thống kiểu Java xử lý chúng như các kiểu khác nhau và không có tính tương thích. Như vậy, trong nominal typing, tên kiểu là tiêu chuẩn để xác định tính đồng nhất và tương thích của kiểu.

### Structural typing

Structural typing là cách tiếp cận phân biệt và xác định tính tương thích của kiểu dựa trên "cấu trúc" của kiểu, không phải tên. Trong phương pháp này, nếu cấu trúc property và method của các kiểu giống nhau, các kiểu có tên khác nhau vẫn được coi là tương thích. TypeScript áp dụng structural typing làm hệ thống kiểu.

Hãy xem xét cách nghĩ của structural typing với ví dụ class `Person` và class `Dog`.

```ts twoslash
class Person {
  walk() {}
}

class Dog {
  walk() {}
}
```

Các class này có tên khác nhau nhưng cấu trúc giống nhau. Cả hai đều có một method `walk`. Method này không nhận tham số và không có giá trị trả về. Từ góc độ structural typing, cấu trúc chung này khiến `Person` và `Dog` được coi là tương thích.

Hãy xem ví dụ code TypeScript.

```ts twoslash
class Person {
  walk() {}
}

class Dog {
  walk() {}
}
// ---cut---
const person = new Person();
const dog: Dog = person; // Không có lỗi compile
```

Trong code này, instance `Person` được gán cho biến kiểu `Dog`, nhưng không có lỗi compile. Điều này là do `Person` và `Dog` tương thích về cấu trúc.

Ngược lại, nếu cấu trúc khác nhau thì không được công nhận tính tương thích.

```ts twoslash
// @errors: 2741
class Person {
  speak() {}
}
class Dog {
  bark() {}
}
const person = new Person();
const dog: Dog = person; // Lỗi compile
```

Trong trường hợp này, `Person` và `Dog` có các method khác nhau nên không tương thích về cấu trúc, và việc gán sẽ gây lỗi compile.

Một ngôn ngữ khác áp dụng structural typing là Go. Như vậy, structural typing cung cấp hệ thống kiểu tập trung vào "cấu trúc" hơn là tên kiểu, cho phép lập trình linh hoạt và trực quan.

Bảng sau tóm tắt đặc điểm của nominal typing và structural typing.

|                         | Nominal typing                             | Structural typing                          |
| ----------------------- | ------------------------------------------ | ------------------------------------------ |
| Tiêu chuẩn phân biệt    | Tên kiểu                                   | Cấu trúc kiểu                              |
| Xác định tính tương thích | Tương thích nếu tên giống nhau           | Tương thích nếu cấu trúc giống nhau        |
| Ngôn ngữ chính          | Java, C#, Swift, PHP, v.v.                 | TypeScript, Go, v.v.                       |

## Subtype (kiểu con)

Trong nhiều ngôn ngữ lập trình, mối quan hệ giữa các kiểu có thể được hiểu như cấu trúc phân cấp. Ở đỉnh của cấu trúc phân cấp là kiểu trừu tượng nhất. Càng đi xuống trong cấu trúc, kiểu càng cụ thể. Kiểu ở vị trí trên trong cấu trúc phân cấp được gọi là **supertype** (kiểu cha). So với kiểu dưới, supertype là kiểu trừu tượng hơn. Kiểu ở vị trí dưới trong cấu trúc phân cấp được gọi là **subtype** (kiểu con). Subtype là kiểu có tất cả tính chất và hành vi (method và property) của supertype, đồng thời có thêm tính chất và hành vi mới.

Ví dụ, khi xem xét các kiểu về hình dạng và diện tích, dưới supertype `Shape` (hình dạng) có thể định nghĩa các subtype như `Circle` (hình tròn) và `Rectangle` (hình chữ nhật). `Shape` là kiểu trừu tượng hơn so với các kiểu dưới, có khả năng tính diện tích (method `area`). Mặt khác, `Circle` là kiểu cụ thể hơn, kế thừa khả năng của `Shape` và có thêm thuộc tính mới là bán kính (`radius`). Tương tự, `Rectangle` cũng kế thừa khả năng của `Shape` và có thêm thuộc tính chiều rộng (`width`) và chiều cao (`height`).

import ClassDiagramShapeCircleRectangle from '@site/static/img/reference/values-types-variables/structural-subtyping/class-diagram-shape-circle-rectangle.svg';

<!-- 画像ソース: https://www.figma.com/file/E22NH0kgcl5xhVCtn1HCfz/%E3%82%B5%E3%83%90%E3%82%A4%E3%83%90%E3%83%ABTypeScript%E7%94%BB%E5%83%8F%E3%82%A2%E3%82%BB%E3%83%83%E3%83%88?type=design&node-id=558-127&mode=design&t=Mw06bZx3zqMd92aa-4 -->

<figure class="themed">
    <figcaption>Cấu trúc phân cấp</figcaption>
    <ClassDiagramShapeCircleRectangle />
</figure>

Subtype tương thích với supertype. Có thể gán giá trị subtype cho biến supertype. Ví dụ, `Circle` và `Rectangle` là các kiểu khác nhau, nhưng có thể xử lý như cùng `Shape`. Khả năng xử lý ở mức trừu tượng hơn tăng tính tiện lợi. Ví dụ, trường hợp tính tổng diện tích của các hình khác nhau: có thể gán giá trị `Circle` hoặc `Rectangle` cho biến kiểu `Shape` và tính tổng diện tích của chúng.

```ts twoslash
declare class Shape {
  area(): number;
}
declare class Circle extends Shape {
  radius: number;
  constructor(options: { radius: number });
  area(): number;
}
declare class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(options: { width: number; height: number });
  area(): number;
}
// ---cut---
function totalArea(shape1: Shape, shape2: Shape): number {
  return shape1.area() + shape2.area();
}

const circle = new Circle({ radius: 10 });
const rectangle = new Rectangle({ width: 10, height: 20 });
totalArea(circle, rectangle); // Có thể xử lý Circle và Rectangle như Shape
```

Tiêu chuẩn xác định kiểu nào là supertype và subtype của kiểu nào cũng khác nhau giữa nominal typing và structural typing. Ví dụ, việc `Circle` có phải là subtype của `Shape` hay không có tiêu chuẩn khác nhau trong nominal typing và structural typing. Hãy xem các tiêu chuẩn đó ở phần tiếp theo.

### Nominal subtype

Trong ngôn ngữ lập trình áp dụng nominal typing, khi định nghĩa cấu trúc phân cấp kiểu, tên kiểu và mối quan hệ của chúng được chú trọng. Trong cách tiếp cận này, mối quan hệ cha-con giữa các kiểu (supertype và subtype) được hình thành thông qua kế thừa class hoặc interface. Subtype được xử lý theo cách tiếp cận nominal typing được gọi là **nominal subtype**.

Ví dụ, trong Java, sử dụng từ khóa `extends` để khai báo mối quan hệ giữa supertype và subtype. Khai báo này cho Java compiler biết rằng class cụ thể là subtype của class khác.

```java
class Shape {}

class Circle extends Shape {}
```

Trong ví dụ code này, class `Circle` kế thừa class `Shape`. Thông qua kế thừa này, `Circle` trở thành subtype của `Shape`. Mối quan hệ phân cấp này cho phép gán instance kiểu `Circle` cho biến kiểu `Shape`. Việc gán này được đảm bảo tính tương thích kiểu vì `Circle` là subtype của `Shape`.

```java
Shape shape = new Circle();
```

Mặt khác, nếu không có khai báo kế thừa bằng từ khóa `extends` giữa `Circle` và `Shape`, không có mối quan hệ phân cấp giữa chúng.

```java
class Shape {}

class Circle {}
```

Trong tình huống này, nếu cố gán instance kiểu `Circle` cho biến kiểu `Shape`, sẽ xảy ra lỗi kiểu không khớp. Lỗi này xảy ra vì Java compiler đánh giá `Circle` và `Shape` là các kiểu độc lập không tương thích.

```java
Shape shape = new Circle();
// Lỗi: kiểu không tương thích: không thể chuyển Circle thành Shape
```

### Structural subtype

Trong TypeScript áp dụng structural typing, mối quan hệ phân cấp giữa các kiểu cũng được xác định dựa trên cấu trúc. Cách tiếp cận này tập trung vào cấu trúc property và method của kiểu, không phải tên kiểu, để xác định mối quan hệ supertype và subtype. Loại subtype như vậy được gọi là **structural subtype**.

Hãy xem xét ví dụ code TypeScript sau.

```ts twoslash
class Shape {
  area(): number {
    return 0;
  }
}

class Circle {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

Trong ví dụ này, class `Circle` có method `area` của class `Shape`, và định nghĩa thêm property `radius`. Mặc dù không sử dụng từ khóa `extends`, `Circle` được xử lý như subtype của `Shape`. Điều này là do `Circle` chứa cấu trúc của `Shape` (ở đây là method `area`). Do đó, có thể gán instance kiểu `Circle` cho biến kiểu `Shape`.

```ts twoslash
declare class Shape {
  area(): number;
}
declare class Circle {
  constructor(radius: number);
  area(): number;
}
// ---cut---
const shape: Shape = new Circle(10);
```

Trong TypeScript cũng có thể sử dụng từ khóa `extends` để khai báo mối quan hệ kế thừa giữa các class. Tuy nhiên, điều này không được sử dụng làm tiêu chuẩn xác định có phải subtype hay không. Đây là điểm khác với ngôn ngữ nominal subtype như Java. Hiệu quả của từ khóa `extends` là kế thừa chức năng của class cha và đảm bảo class con tuân theo interface của class cha.

```ts twoslash
class Animal {
  walk() {}
}

class Dog extends Animal {
  walk() {}
}
```

Trong code này, `Dog` kế thừa `Animal`. Trong ví dụ này, method `walk` của `Dog` có cùng tham số và giá trị trả về với method `walk` của `Animal`, nên `Dog` tuân theo interface của `Animal`. Vì `Dog` tuân theo interface của `Animal`, không có lỗi compile cho `Dog`.

Mặt khác, nếu class con không tuân theo interface của class cha, TypeScript sẽ báo lỗi. Trong ví dụ code sau, method `walk` của class `Dog` có tham số khác với method của class `Animal`. Class `Dog` không tuân theo interface của class `Animal`. Trong ví dụ này, cảnh báo được đưa ra cho method `walk`. Đây là hiệu quả của từ khóa `extends`.

```ts twoslash
// @errors: 2416
class Animal {
  walk() {}
}

class Dog extends Animal {
  walk(speed: number) {} // Lỗi compile
}
```

## Lý do áp dụng structural typing

Lý do TypeScript áp dụng structural typing liên quan sâu sắc đến đặc tính của JavaScript. Ở đây, hãy xem xét tại sao TypeScript chọn structural typing.

### Duck typing

Duck typing là phong cách lập trình đánh giá object dựa trên method và property mà object có, thay vì kiểu của object. Trong thế giới duck typing, không cần implement interface cụ thể một cách rõ ràng bằng từ khóa `implements`. Thay vào đó, kiểu của object được xác định dựa trên việc object có tuân theo quy ước cụ thể hay không, ví dụ có method cụ thể hay không. Duck typing thường không sử dụng tên kiểu để xác định kiểu. Nhân tiện, thuật ngữ duck typing xuất phát từ câu nói "Nếu một con chim đi như vịt và kêu như vịt, thì đó là vịt".

Duck typing thường thấy trong ngôn ngữ kiểu động. JavaScript cũng là ngôn ngữ kiểu động và có lịch sử đi cùng duck typing. TypeScript là ngôn ngữ mở rộng của JavaScript. Do đó, cần hệ thống kiểu cho phép duck typing. Structural typing là hệ thống kiểu phù hợp với duck typing. Đây cũng được coi là một trong những lý do TypeScript áp dụng structural typing.

### Object literal

Một trong những đặc điểm của JavaScript là [object literal]. Object literal là tính năng tạo object tại chỗ mà không cần định nghĩa kiểu như class hoặc interface.

[object literal]: ./object/object-literal.md

```ts twoslash
const circle = {
  radius: 10,
  area() {
    return Math.PI * this.radius ** 2;
  },
};
```

Như ví dụ trên, object `circle` không có tên kiểu. Vì không có tên kiểu, không thể xác định kiểu bằng tên kiểu như nominal typing. Để có thể xử lý code JavaScript như vậy, TypeScript được cho là đã áp dụng structural typing.

## Ưu điểm của structural typing

Tính linh hoạt và tiện lợi của structural typing đáng được chú ý. Ở đây, hãy xem xét ưu điểm của structural typing với các ví dụ cụ thể.

### Đơn giản hóa mock test

Structural typing giúp dễ dàng thực hiện mock test và dependency injection. Đặc biệt, khi test component phụ thuộc vào API hoặc service bên ngoài, có thể dễ dàng tạo mock object mô phỏng dependency đó. Trong nominal typing, cần interface hóa object cần mock trước. Sau đó, chuẩn bị mock class implement interface đó. Trong structural typing, chỉ cần cung cấp trực tiếp object literal có method và property cần thiết để dễ dàng chuẩn bị mock cho test. Vì không cần định nghĩa interface, cấu trúc đơn giản hơn và chuẩn bị test cũng tiết kiệm hơn.

Trong ví dụ sau, class `UserService` phụ thuộc vào `UserApi`. Để test dependency này, tạo mock mô phỏng method `getUser` của `UserApi` và test hoạt động của `UserService`.

```ts twoslash
// @noErrors: 2355
type User = { id: number; name: string };

class UserApi {
  async getUser(id: number): Promise<User | undefined> {
    // Bỏ qua implementation, hãy tưởng tượng implementation gọi API thực tế bằng fetch, v.v.
  }
}

class UserService {
  private api: UserApi;

  constructor(api: UserApi) {
    this.api = api;
  }

  async userExists(id: number): Promise<boolean> {
    const user = await this.api.getUser(id);
    return user !== undefined;
  }
}
```

Trong test case, chỉ cần tạo trực tiếp object thỏa mãn cấu trúc của `UserApi` và truyền cho instance của `UserService` để thực hiện unit test.

```ts twoslash
declare const test: any;
declare const expect: any;
declare type User = { id: number; name: string };
declare class UserApi {
  getUser(id: number): Promise<User | undefined>;
}
declare class UserService {
  private api;
  constructor(api: UserApi);
  userExists(id: number): Promise<boolean>;
}
// ---cut---
test("Trả về true khi user tồn tại", async () => {
  // Tạo mock object trực tiếp
  const api: UserApi = {
    async getUser(id) {
      return { id, name: "Alice" };
    },
  };
  // Truyền mock object cho UserService để test
  const service = new UserService(api);
  const result = await service.userExists(123);
  expect(result).toBe(true);
});
```

Như vậy, sử dụng structural typing giúp việc inject dependency của đối tượng test trở nên dễ dàng hơn.

## Lưu ý về structural typing

Structural typing cung cấp nhiều ưu điểm nhờ tính linh hoạt, nhưng cũng có những điểm cần lưu ý. Đặc biệt, một trong số đó là khả năng kiểu vô tình có tính tương thích.

Trong hệ thống structural typing, tính tương thích kiểu được xác định dựa trên cấu trúc. Do đó, các kiểu có mục đích hoặc ý nghĩa khác nhau có thể vô tình được đánh giá là tương thích nếu tình cờ có cùng cấu trúc.

```ts
class UserId {
  id: string;
}

class ProductId {
  id: string;
}

const userId: UserId = new UserId();
const productId: ProductId = userId; // Có thể gán, nhưng không phải thiết kế có chủ đích
```

Trong ví dụ này, class `UserId` và class `ProductId` có cùng cấu trúc với property `id`. TypeScript coi các kiểu này là tương thích vì cấu trúc giống nhau. Tuy nhiên, từ góc độ data model hoặc domain model, ID người dùng và ID sản phẩm là các khái niệm hoàn toàn khác nhau, và trong hầu hết trường hợp muốn phân biệt chúng trong hệ thống kiểu. Khi sử dụng design pattern như value object trong TypeScript, cần chú ý vấn đề này. Nếu nhất định muốn phân biệt về kiểu, hãy xem xét các kỹ thuật giới thiệu trong phần "Cách thực hiện nominal typing" dưới đây.

## Cách thực hiện nominal typing

TypeScript về cơ bản áp dụng structural typing, nhưng cũng có trường hợp trở thành nominal typing hoặc design pattern mô phỏng nominal typing. Đây là kỹ thuật tận dụng tính linh hoạt của hệ thống kiểu TypeScript, được sử dụng để tăng cường tính chính xác của chương trình.

### Class có private member

Trong TypeScript, class có `private` member được phân biệt với các class khác. Điều này là do `private` member là riêng của class đó, nên các instance của class khác nhau không được coi là tương thích ngay cả khi có cùng cấu trúc.

```ts twoslash
// @errors: 2322
class UserId {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

class ProductId {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

const userId: UserId = new UserId("1");
const productId: ProductId = userId; // Lỗi gán
```

Trong ví dụ này, `UserId` và `ProductId` có `private` member `id` bên trong, nhưng được xử lý như các kiểu khác nhau. Tức là, giống như nominal typing, kiểu được phân biệt bằng tên.

[Class với tính nominal](../object-oriented/class/class-nominality.md)

### Brand type

Brand type (hoặc phantom type, opaque type) là design pattern phân biệt kiểu rõ ràng bằng cách cho kiểu có property để phân biệt. Đây là cách gắn tag như metadata cho kiểu, cho phép phân biệt các kiểu về cấu trúc giống nhau.

```ts twoslash
interface UserId {
  __brand: "UserId";
  id: number;
}

interface ProductId {
  __brand: "ProductId";
  id: number;
}
```

Trong ví dụ này, sử dụng property `__brand` để phân biệt kiểu `UserId` và kiểu `ProductId`. Nhờ đó, dù cả hai có cùng property `id` về cấu trúc, trong hệ thống kiểu chúng được xử lý như các kiểu khác nhau. Đây là kỹ thuật tận dụng khéo léo đặc điểm của structural typing. Trong structural typing, khi cấu trúc khác nhau thì không có tính tương thích, nên bằng cách sử dụng thứ như `__brand` cố tình làm khác cấu trúc, có thể phân biệt kiểu.

Property `__brand` được sử dụng trong brand type là để phân biệt kiểu, không cần giữ như dữ liệu runtime. Do đó, thường làm cho property `__brand` không được bao gồm trong dữ liệu thực tế. Để đạt được điều này, kỹ thuật thường dùng là sử dụng từ khóa `as` để thực hiện [type assertion].

[type assertion]: ./type-assertion-as.md

```ts twoslash
interface UserId {
  __brand: "UserId";
  id: number;
}
// ---cut---
const userId = { id: 1 } as UserId;
```

Giá trị được tạo bằng brand type sẽ được phân biệt kiểu bằng tên, giống như nominal typing.

```ts twoslash
// @errors: 2322
interface UserId {
  __brand: "UserId";
  id: number;
}

interface ProductId {
  __brand: "ProductId";
  id: number;
}
// ---cut---
const userId = { id: 1 } as UserId;
const productId: ProductId = userId; // Không thể gán
```

Sử dụng các kỹ thuật này, ngay cả trong TypeScript với structural typing, cũng có thể phân biệt kiểu phụ thuộc vào tên. Nếu cần phân biệt kiểu bằng tên, hãy xem xét những kỹ thuật này.

## Tóm tắt

|                              | Nominal typing                                                                                      | Structural typing                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Tiêu chuẩn phân biệt kiểu    | Tên kiểu                                                                                            | Cấu trúc kiểu (property và method, v.v.)                                     |
| Tiêu chuẩn xác định tương thích | Tương thích nếu tên giống nhau                                                                    | Tương thích nếu cấu trúc giống nhau                                          |
| Tính rõ ràng supertype-subtype | Rõ ràng (sử dụng kế thừa bằng từ khóa `extends`, v.v.)                                            | Ngầm định (tự động coi là subtype khi cấu trúc kiểu khớp)                    |
| Ngôn ngữ chính               | Java, C#, Swift, PHP                                                                                | TypeScript, Go                                                               |
| Ưu điểm                      | - Có thể phân biệt rõ ràng dựa trên tên kiểu<br />- Mối quan hệ phân cấp kiểu rõ ràng, thể hiện ý đồ thiết kế | - Nhờ duck typing, có thể tạo object ad-hoc                                  |
| Nhược điểm                   | - Tính tương thích giữa kiểu phụ thuộc vào tên, có thể thiếu linh hoạt                              | - Có thể xảy ra tính tương thích không mong muốn<br />- Phân biệt kiểu có thể không trực quan |

Structural typing là khái niệm cốt lõi của hệ thống kiểu TypeScript, xác định tính tương thích kiểu dựa trên cấu trúc. Đây là cách nhìn vào cấu trúc property và method của kiểu để xác định tính đồng nhất và tương thích, không phải tên kiểu. Cách tiếp cận này được áp dụng để đáp ứng đặc tính động và linh hoạt của JavaScript, phù hợp với các đặc điểm của JavaScript như duck typing và object literal.

Structural typing có tính linh hoạt cao, giúp dễ dàng thực hiện mock test, v.v., nhưng cũng có điểm cần lưu ý là có thể xảy ra tính tương thích không mong muốn. Tuy nhiên, bằng cách sử dụng các kỹ thuật như `private` member hoặc brand type, có thể mô phỏng hành vi nominal typing trong hệ thống structural typing và thực hiện phân biệt kiểu rõ ràng.

Bằng cách hiểu và áp dụng đúng structural typing, bạn có thể viết code an toàn và dễ bảo trì hơn.

<PostILearned>

・TypeScript sử dụng structural typing
・Structural typing chú trọng cấu trúc hơn tên kiểu
・Structural typing xác định tính tương thích dựa trên cấu trúc kiểu
・Có thể mô phỏng nominal typing bằng private hoặc brand type
・Structural typing cần chú ý tính tương thích không mong muốn

</PostILearned>
