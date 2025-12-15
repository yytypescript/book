---
sidebar_label: Indexed Access Types
---

# Indexed Access Types

Indexed access types trong TypeScript cung cấp cách để truy cập kiểu của property hoặc phần tử mảng.

```ts twoslash
type A = { foo: number };
type Foo = A["foo"];
//   ^?
```

## Cú pháp Indexed Access Types

Indexed access types sử dụng bracket notation với kiểu.

```ts
ObjectType["propertyName"];
ArrayType[number];
```

## Object Types và Indexed Access Types

Indexed access types cũng có thể sử dụng với [union type](../values-types-variables/union.md).

```ts twoslash
type Person = { name: string; age: number };
type T = Person["name" | "age"];
//   ^?
```

Kết hợp với [type operator `keyof`](keyof-type-operator.md), bạn có thể lấy union type của tất cả các property trong object.

```ts twoslash
type Foo = { a: number; b: string; c: boolean };
type T = Foo[keyof Foo];
//   ^?
```

Nếu chỉ định tên property không tồn tại trong object type, compiler sẽ báo lỗi.

```ts twoslash
// @errors: 2339
type Account = { name: string };
type T = Account["password"];
```

## Array Types và Indexed Access Types

Indexed access types cũng có thể dùng để truy cập kiểu phần tử của [array type](../values-types-variables/array/type-annotation-of-array.md). Để truy cập kiểu phần tử, thêm `[number]` vào array type.

```ts twoslash
type StringArray = string[];
type T = StringArray[number];
//   ^?
```

Cũng hoạt động với array type có phần tử là union type.

```ts twoslash
type MixedArray = (string | undefined)[];
type T = MixedArray[number];
//   ^?
```

Kết hợp với [type operator `typeof`](typeof-type-operator.md), bạn có thể trích xuất kiểu phần tử từ giá trị mảng.

```ts twoslash
const array = [null, "a", "b"];
type T = (typeof array)[number];
//   ^?
```

## Tuple Types và Indexed Access Types

Indexed access types cũng có thể dùng để truy cập kiểu phần tử của [tuple type](../values-types-variables/tuple.md). Để truy cập kiểu phần tử của tuple, sử dụng [numeric literal type](../values-types-variables/literal-types.md) trong bracket notation.

```ts twoslash
type Tuple = [string, number];
type T = Tuple[0];
//   ^?
```

Kết hợp với [type operator `typeof`](typeof-type-operator.md), bạn có thể trích xuất kiểu phần tử từ giá trị tuple.

```ts twoslash
const stateList = ["open", "closed"] as const;
type State = (typeof stateList)[number];
//   ^?
```

<PostILearned>

TypeScriptのインデックスアクセス型は、プロパティや配列要素の型を参照できる

✏️構文1: オブジェクトの型["プロパティ名"]
✏️構文2: 配列型[number]
🔑keyofと組み合わせると全プロパティの型が取れる
🧲typeofと組み合わせると配列値から要素型が取れる

</PostILearned>
