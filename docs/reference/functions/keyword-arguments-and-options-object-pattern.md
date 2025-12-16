# Keyword argument và Options Object pattern

JavaScript và TypeScript không có tính năng keyword argument như Python. Tuy nhiên, có thể ứng dụng destructuring assignment parameter để làm điều tương tự như keyword argument.

## Keyword argument là gì

Keyword argument là tính năng của Python. Khi gọi hàm, thay vì chỉ định giá trị, bạn sử dụng tên tham số để chỉ định theo dạng "tên=giá trị".

```python
# Code Python
def func(x, y, z):
    print(x, y, z)

func(x=1, y=2, z=3)  # => 1 2 3
```

Tính năng tương tự keyword argument có thể thấy trong Ruby, và named argument trong Scala. JavaScript và TypeScript không có tính năng tương đương keyword argument.

Đặc điểm của keyword argument là khác với positional argument, phía gọi hàm có thể tự do thay đổi thứ tự tham số.

```python
# Code Python
func(z=3, y=2, x=1)  # => 1 2 3
```

## Options Object pattern

JavaScript và TypeScript không có spec ngôn ngữ như keyword argument, nhưng có thể làm tương tự bằng design pattern Options Object. Options Object pattern là hàm được thiết kế để nhận một object thay vì nhiều positional argument.

```js twoslash
// Hàm có positional argument
function normalFunc(x, y, z) {
  console.log(x, y, z);
}

// Hàm chỉ có một object làm tham số
function func(options) {
  console.log(options.x, options.y, options.z);
}

func({ x: 1, y: 2, z: 3 });
// @log: 1 2 3
```

Hơn nữa, với Options Object pattern, khi ứng dụng destructuring assignment parameter, có thể viết phần tham số đơn giản hơn.

```js twoslash
function func({ x, y, z }) {
  console.log(x, y, z);
}
```

[Destructuring assignment parameter](destructuring-assignment-parameters.md)

## Type annotation cho Options Object pattern

Khi sử dụng Options Object pattern trong TypeScript, cần type annotation cho tham số. Type annotation là kiểu của object.

```ts twoslash
function func({ x, y, z }: { x: number; y: number; z: number }) {
  // ...
}
```

Nếu kiểu của object quá dài, có thể sử dụng type alias của TypeScript để tách riêng kiểu tham số, cải thiện khả năng đọc.

```ts twoslash
type Options = {
  x: number;
  y: number;
  z: number;
};

function func({ x, y, z }: Options) {
  // ...
}
```

## Ưu điểm của Options Object pattern

Options Object pattern có 3 ưu điểm sau:

- Dễ hiểu giá trị tham số chỉ điều gì
- Không phá vỡ code cũ khi thêm tham số
- Có thể bỏ qua default argument

### Dễ hiểu giá trị tham số chỉ điều gì

Code gọi hàm có 3 positional argument khó hiểu.

```ts twoslash
declare function findProducts(
  isSale: boolean,
  withDetails: boolean,
  freeShipping: boolean
): void;
// ---cut---
findProducts(true, true, true);
```

Có 3 giá trị `true`, nhưng chỉ nhìn vào thì không biết chúng chỉ điều gì. Để biết, cần xem implementation của hàm. Ngoài ra, còn có vấn đề dễ nhầm lẫn thứ tự tham số.

Với Options Object pattern, chỉ cần nhìn code gọi hàm là hiểu được ý nghĩa của tham số. Vì tên tham số nổi bật, ít lo ngại về việc nhầm lẫn thứ tự tham số.

```ts twoslash
declare function findProducts({
  isSale,
  withDetails,
  freeShipping,
}: {
  isSale: boolean;
  withDetails: boolean;
  freeShipping: boolean;
}): void;
// ---cut---
findProducts({ isSale: true, withDetails: true, freeShipping: true });
```

### Không phá vỡ code cũ khi thêm tham số

Hàm có positional argument có mặt yếu với thay đổi. Ví dụ, giả sử implement hàm tìm kiếm user. Yêu cầu ban đầu là lọc user theo quốc gia và thành phố, và có thể sort theo thuộc tính user. Trong trường hợp đó, implementation sau đây đáp ứng yêu cầu.

```ts twoslash
class User {}

declare function findUsers(
  country: string,
  city: string,
  order: string,
  sort: string
): Promise<User[]>;
// ---cut---
findUsers("JP", "Tokyo", "id", "asc");
```

Sau đó, có yêu cầu muốn lọc theo phạm vi tuổi. Cần thêm tham số chỉ định phạm vi tuổi. Trong trường hợp này có 2 lựa chọn. Thứ nhất, thêm phạm vi tuổi ở cuối tham số để không phá vỡ code phía gọi.

```js
function findUsers(country, city, order, sort, ageMin, ageMax);
//                                             ^^^^^^^^^^^^^^thêm
```

Trong trường hợp này, order và sort chỉ định thứ tự sắp xếp bị kẹp giữa điều kiện lọc city và ageMin. Đây không phải là thứ tự tham số đẹp.

Cách thứ hai là phá vỡ code phía gọi nhưng giữ thứ tự tham số đẹp. Điều kiện lọc ở phía trước, chỉ định thứ tự sắp xếp ở phía sau.

```js
function findUsers(country, city, ageMin, ageMax, order, sort);
//                                ^^^^^^^^^^^^^^^thêm
```

Trong trường hợp này, code phía gọi buộc phải sửa đổi.

Nếu sử dụng Options Object pattern, có thể thêm tham số ở vị trí thích hợp mà không phá vỡ code phía gọi. Implementation của hàm trước khi thay đổi và code gọi nó như sau.

```ts twoslash
class User {}

declare function findUsers({
  country,
  city,
  order,
  sort,
}: {
  country: string;
  city: string;
  order: string;
  sort: string;
}): Promise<User[]>;
// ---cut---
findUsers({ country: "JP", city: "Tokyo", order: "id", sort: "asc" });
```

Khi thêm phạm vi tuổi, vị trí tham số trong định nghĩa hàm có thể đặt ở nơi phù hợp.

```ts twoslash
class User {}

declare function findUsers({
  country,
  city,
  order,
  sort,
  ageMin,
  ageMax,
}: {
  country: string;
  city: string;
  order: string;
  sort: string;
  ageMin: number;
  ageMax: number;
}): Promise<User[]>;
// ---cut---
findUsers({
  country: "JP",
  city: "Tokyo",
  ageMin: 10,
  ageMax: 20,
  order: "id",
  sort: "asc",
});
```

Thêm vào đó, không cần thay đổi code phía gọi hàm.

### Có thể bỏ qua default argument

Với hàm sử dụng positional argument, có trường hợp không thể bỏ qua default argument. Ví dụ, với hàm có 3 positional argument có default argument, nếu muốn tham số thứ 1 và thứ 2 là default, cần viết `undefined` cho mỗi tham số.

```js twoslash
function findProducts(
  isSale = false,
  withDetails = false,
  freeShipping = false
) {
  console.log(isSale, withDetails, freeShipping);
}

findProducts(undefined, undefined, true);
// @log: false false true
```

Nếu sử dụng Options Object pattern, không cần viết gì cho tham số muốn để default.

```js twoslash
function findProducts({
  isSale = false,
  withDetails = false,
  freeShipping = false,
}) {
  console.log(isSale, withDetails, freeShipping);
}

findProducts({ freeShipping: true });
// @log: false false true
```

## Cách thay đổi tên tham số

Ưu điểm của positional argument là khả năng chống thay đổi tên tham số mạnh. Có thể tự do thay đổi tên tham số phía khai báo hàm mà không phá vỡ phía gọi. Ví dụ, nếu thay đổi `hoge` thành `fuga` trong `function func(hoge) {}`, code phía gọi không bị ảnh hưởng.

Với Options Object pattern yêu cầu chỉ định tên tham số, việc thay đổi tên tham số ảnh hưởng đến code phía gọi. Ví dụ, nếu thay đổi `hoge` thành `fuga` trong `function func({ hoge }) {}`, phía gọi `func({ hoge: 123 })` cũng phải thay đổi thành `func({ fuga: 123 })`.

Để giải quyết vấn đề thay đổi tên tham số trong Options Object pattern, sử dụng tính năng gán cho tên tham số khác của destructuring. Trong ví dụ trên, thay vì thay đổi khai báo hàm thành `function func({ hoge })`, thay đổi thành `function func({ hoge: fuga })`.

```js twoslash
function func({ hoge: fuga }) {
  console.log(fuga);
}

func({ hoge: 123 });
// @log: 123
```

Như vậy, phía gọi hàm có thể hoạt động mà không cần thay đổi cách truyền tên biến cũ `hoge`. Implementation của hàm có thể sử dụng tên biến mới `fuga`.

## Type annotation cho default argument

Khi muốn có default argument trong Options Object của TypeScript, viết giá trị default ở vị trí tên tham số, và chỉ định optional property `?` trong type annotation của object.

```ts twoslash
function func({ x, y = 0, z = 0 }: { x: number; y?: number; z?: number }) {
  console.log(x, y, z);
}

func({ x: 1, y: undefined });
// @log: 1 0 0
```

## Cách làm cho Options Object trở thành optional

Trong TypeScript, để có thể gọi hàm mà không cần truyền Options Object, chỉ định giá trị default cho Options Object là object rỗng `{}`.

```ts twoslash
type Options = {
  x?: number;
  y?: number;
  z?: number;
};

function func({ x = 0, y = 0, z = 0 }: Options = {}) {
  console.log(x, y, z);
}

func();
// @log: 0 0 0
```

<PostILearned>

・JavaScript/TypeScript không có cú pháp tương đương keyword argument của Python
・Thay vào đó có thể dùng Options Object pattern
・Ưu điểm của pattern này:
①Dễ hiểu giá trị tham số chỉ điều gì
②Không phá vỡ code cũ khi thêm tham số
③Có thể bỏ qua default argument

</PostILearned>

## Thông tin liên quan

[Partial&lt;T>](../type-reuse/utility-types/partial.md)
