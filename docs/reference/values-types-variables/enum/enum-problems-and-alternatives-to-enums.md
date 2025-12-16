# Vấn đề của enum và các giải pháp thay thế

Kiểu liệt kê (enum) trong TypeScript có một số vấn đề được chỉ ra. Ở đây sẽ giải thích các vấn đề đó và các giải pháp thay thế.

## Vấn đề của enum

### Enum quá đặc thù của TypeScript

TypeScript là ngôn ngữ mở rộng từ JavaScript. Tuy là mở rộng, nhưng không phải thêm tính năng bừa bãi, mà chỉ giới hạn trong thế giới type. Do tư tưởng này của TypeScript, nếu bỏ qua phần liên quan đến type thì ngôn ngữ không quá xa rời cú pháp JavaScript.

Cũng có những AltJS xa rời cú pháp JavaScript một cách triệt để. Trong số đó, TypeScript được nhiều developer ủng hộ một phần vì sự hấp dẫn của việc không xa rời JavaScript quá nhiều.

Nhìn vào enum của TypeScript, không chỉ cú pháp không có trong JavaScript, mà enum sau khi compile còn biến thành object của JavaScript, đây là tính năng riêng vượt ra ngoài việc mở rộng thế giới type. Một số TypeScript programmer không thể chấp nhận điểm này.

### Enum số có vấn đề về type safety

Enum số có vấn đề về type safety là có thể gán bất kỳ giá trị `number` nào. Ví dụ sau là enum chỉ có member với giá trị `0` và `1`, nhưng thực tế có thể gán các số khác.

Vấn đề này xảy ra với TypeScript phiên bản dưới 5.0.

```ts twoslash
// TypeScript v4.9.5
// @noErrors
enum ZeroOrOne {
  Zero = 0,
  One = 1,
}
const zeroOrOne: ZeroOrOne = 9; // Không có compile error!
```

Từ TypeScript 5.0 đã được cải thiện và sẽ phát sinh compile error.

```ts twoslash
// TypeScript v5.0.4
// @errors: 2322
enum ZeroOrOne {
  Zero = 0,
  One = 1,
}
const zeroOrOne: ZeroOrOne = 9;
```

Enum có đặc tính là khi truy cập object enum bằng giá trị sẽ nhận được tên member. Khi truy cập bằng giá trị không có trong member, ta mong muốn có compile error, nhưng không được như vậy.

```ts twoslash
enum ZeroOrOne {
  Zero = 0,
  One = 1,
}

console.log(ZeroOrOne[0]); // Đây là như mong đợi
// @log: "Zero"
console.log(ZeroOrOne[9]); // Đây mong muốn có compile error...
// @log: undefined
```

### Chỉ enum chuỗi là nominal type

Hệ thống type của TypeScript áp dụng [structural subtyping](../structural-subtyping.md). Tuy nhiên, enum chuỗi là ngoại lệ và là nominal type.

```ts twoslash
// @errors: 2322
enum StringEnum {
  Foo = "foo",
}
const foo1: StringEnum = StringEnum.Foo; // Compile thành công
const foo2: StringEnum = "foo"; // Compile error
```

Đặc tính này gây bất ngờ. Hơn nữa, enum số không phải nominal type nên có sự không nhất quán.

## Các giải pháp thay thế cho enum

Dưới đây là một số giải pháp thay thế cho enum. Tuy nhiên, không có giải pháp nào tái hiện 100% đặc điểm của enum. Hãy cân nhắc mục đích và công dụng khi sử dụng các giải pháp sau.

### Giải pháp thay thế 1: Union type

Giải pháp đơn giản nhất là sử dụng union type.

```ts twoslash
type YesNo = "yes" | "no";

function toJapanese(yesno: YesNo) {
  switch (yesno) {
    case "yes":
      return "はい";
    case "no":
      return "いいえ";
  }
}
```

Cũng có thể kết hợp union type với Symbol.

```ts twoslash
const yes = Symbol();
const no = Symbol();
type YesNo = typeof yes | typeof no;

function toJapanese(yesno: YesNo) {
  switch (yesno) {
    case yes:
      return "はい";
    case no:
      return "いいえ";
  }
}
```

### Giải pháp thay thế 2: Object literal

Cũng có thể sử dụng object literal.

```ts twoslash
const Position = {
  Top: 0,
  Right: 1,
  Bottom: 2,
  Left: 3,
} as const;

type Position = (typeof Position)[keyof typeof Position];
// Dòng trên có nghĩa tương đương với type Position = 0 | 1 | 2 | 3

function toJapanese(position: Position) {
  switch (position) {
    case Position.Top:
      return "上";
    case Position.Right:
      return "右";
    case Position.Bottom:
      return "下";
    case Position.Left:
      return "左";
  }
}
```

## Tổng kết

Đã giải thích các vấn đề của enum và các giải pháp thay thế. Đặc biệt vì enum có vấn đề về type safety, hãy cân nhắc kỹ trước khi sử dụng tích cực.
