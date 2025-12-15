---
sidebar_label: Type variables
---

# Type variables (type variables)

Phần này giải thích "type variables" là gì - một khái niệm quan trọng trong generics.

## Type variables

Khi nói đến "biến", bạn thường nghĩ đến một container để gán giá trị. Ví dụ, trong đoạn code sau, `x` là biến và giá trị `1` được gán cho nó.

```ts twoslash
const x = 1;
```

Một khi đã định nghĩa biến, bạn không cần viết lại giá trị ở nhiều nơi, và có thể sử dụng biến đó để thực hiện nhiều xử lý khác nhau.

Nhờ có container tiện lợi là biến, bạn không cần viết lại cùng một đoạn code nhiều lần, có thể viết code trừu tượng hơn, và được hưởng nhiều lợi ích khác.

Type variables là một container tiện lợi khác. Tuy nhiên, điểm khác biệt là những gì có thể được lưu trữ không phải là "value" mà là "type".

```ts twoslash
function printAndReturn<T>(value: T): T {
  console.log(value);
  return value;
}
```

`T` trong hàm `printAndReturn` này là type variable. `<T>` là phần quyết định tên type variable, `T` được sử dụng trong kiểu của `value` và `T` được viết ở kiểu trả về là phần sử dụng biến, tức là phần tham chiếu.

Variable scope của `T` trong hàm `printAndReturn` là phạm vi của hàm này. Do đó, có thể tham chiếu `T` trong signature của hàm, cũng như trong phần xử lý của hàm. Mặt khác, không thể tham chiếu từ bên ngoài hàm.

```ts twoslash
// @errors: 2304
function printAndReturn<T>(value: T): T {
  let values: T[] = []; // OK
  const doSomething = (value: T) => {}; // OK
  return value;
}

let value: T;
```

Code sử dụng hàm này có thể gán kiểu mong muốn như `number` cho `T`:

```ts twoslash
declare function printAndReturn<T>(value: T): T;
// ---cut---
const value = printAndReturn<number>(123);
```

## Type arguments

Type arguments là kiểu được gán cho type variable. Trong đoạn code sau, `number` là type argument.

```ts twoslash
declare function printAndReturn<T>(value: T): T;
// ---cut---
const value = printAndReturn<number>(123);
```

Trong TypeScript, type inference cũng được thực hiện cho type arguments. Điều này được gọi là type argument inference. Trong ví dụ trên, tuy đã viết rõ ràng code gán `number` cho type variable `T`, nhưng compiler có thể suy luận được kiểu của type variable `T` là `number` từ biến `123`, nên cũng có thể bỏ qua việc viết type argument như đoạn code sau.

```ts twoslash
declare function printAndReturn<T>(value: T): T;
// ---cut---
const value = printAndReturn(123);
```

## Ký tự có thể dùng cho type variables

Các ký tự có thể dùng cho type variables trong TypeScript giống với các ký tự có thể dùng cho tên biến, tên hàm, tên class, v.v. Do đó, không có ràng buộc phải là một chữ cái in hoa.

```ts twoslash
function func1<T>(x: T) {}
function func2<Foo>(x: Foo) {}
function func3<fooBar>(x: fooBar) {}
function func4<$>(x: $) {}
function func5<かた>(x: かた) {}
```

Như vậy, `Foo` gồm 3 ký tự, `fooBar` theo kiểu camelCase, ký hiệu `$`, Unicode `かた` đều có thể được định nghĩa là tên type variable.

```ts
function func1<1>(x: 1) {} // Compile error
function func2<class>(x: class) {} // Compile error
```

Những gì không thể dùng làm tên type variable là những gì bắt đầu bằng số, và các từ khóa như `class`.

## Quy ước về tên type variables

Theo quy ước của TypeScript, `T` thường được sử dụng làm tên type variable. `T` được cho là viết tắt của template.

Trong generics đơn giản có hai type variables, `T` và `U` thường được sử dụng, lý do là vì U theo sau T trong bảng chữ cái. Theo quy tắc này, type variable thứ ba có thể là `V`.

```ts twoslash
function compare<T, U>(a: T, b: U) {}
```

Khi có nhiều type variables, đôi khi cũng đặt tên có ý nghĩa cho type variables. Trong trường hợp đó, quy tắc đặt tên với prefix `T` như `TKey`, `TValue` thường được sử dụng. Tuy nhiên, quy ước này có vẻ không phổ biến bằng quy ước "sử dụng `T` cho tên type variable".

```ts twoslash
function makeKeyValuePair<TKey, TValue>(key: TKey, value: TValue) {}
```

Khi đặt tên type variable bằng từ, thông thường sử dụng camelCase bắt đầu bằng chữ in hoa.

:::info

### Tranh luận về cách đặt tên type variables

Về chủ đề "cách đặt tên type variables nào là tốt nhất?", có nhiều ý kiến khác nhau giữa các programmer. Ở đây, chỉ đề cập đến cuộc tranh luận này để tham khảo, mong rằng bạn không bị nhầm lẫn. Trong thực tế, hãy ý thức về việc **tuân thủ quy ước đặt tên nhất quán trong project**.

### Ý kiến cho rằng nên dùng từ có ý nghĩa

Có quan điểm cho rằng nên dùng từ có ý nghĩa vì chỉ một ký tự như `T` khó hiểu được điều gì sẽ được đưa vào. Đây là quan điểm cho rằng `Array<Element>` dễ hiểu hơn `Array<T>`.

### Ý kiến cho rằng một ký tự tốt hơn

Vì generics vốn dĩ xử lý những thứ trừu tượng nên không thể đặt tên cụ thể, do đó T không có ý nghĩa lại tốt hơn - đây là một quan điểm.

Nếu định nghĩa tên type variable như `Element`, nhìn thoáng qua có vẻ như tên class, dễ gây nhầm lẫn. Để tránh nhầm lẫn, có ý kiến cho rằng `T` tốt hơn.

### Ý kiến cho rằng nên phân biệt dựa trên độ rộng của scope của type variable

Trong lập trình, có kỹ thuật đặt tên là càng rộng scope thì tên càng dài, càng hẹp scope thì tên càng ngắn. Ví dụ, trong vòng lặp `for`, thường dùng `i` cho biến, điều này một phần do quy ước, nhưng cũng do scope của biến hẹp. Điều này cũng áp dụng cho type variables, có quan điểm cho rằng type variables có scope rộng nên đặt tên bằng từ, còn type variables chỉ dùng trong hàm generic ngắn thì một ký tự là hợp lý.

:::
