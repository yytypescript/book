---
sidebar_label: Variance
---

# Variance (variance)

Trong TypeScript, khi xác định tính tương thích của các kiểu, khái niệm variance được sử dụng. Variance biểu thị mối quan hệ giữa các kiểu, và trong TypeScript, để biểu thị variance này, ta thêm `in` hoặc `out` trước type variable của generics.

Lưu ý, variance được đề cập ở đây cũng có thể thay đổi bằng cấu hình `strictFunctionTypes` trong tsconfig.json.
Trong phần này, trừ khi có đề cập đặc biệt, ta giả định `strictFunctionTypes` là `false`.

[strictFunctionTypes](../tsconfig/strictfunctiontypes.md)

## Covariance (Covariance)

Covariance là variance khi thêm `out` vào type variable của generics. Covariance có nghĩa là mối quan hệ subtype được bảo toàn.

## Contravariance (Contravariance)

Contravariance là variance khi thêm `in` vào type variable của generics. Contravariance có nghĩa là mối quan hệ subtype bị đảo ngược.

## Invariance (Invariance)

Invariance là variance khi thêm cả `in` và `out` vào type variable của generics. Invariance có nghĩa là kiểu không covariant cũng không contravariant.

## Bivariance (Bivariance)

Bivariance là variance khi không thêm `in` hoặc `out` vào type variable của generics.

Ở đây, ta định nghĩa `BivariantFunction<I, O>` (không thêm variance nên trong TypeScript giống như bivariant) là kiểu của hàm nhận một tham số `I` và trả về giá trị `O`.

```ts twoslash
type BivariantFunction<I, O> = (arg: I) => O;
```

Tiếp theo, định nghĩa `CovariantFunction<in I, O>` với tham số `I` là covariant, `ContravariantFunction<I, out O>` với giá trị trả về `O` là contravariant, và `InvariantFunction<in out I, in out O>` với cả tham số và giá trị trả về đều invariant. Chúng được định nghĩa như sau:

```ts twoslash
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;
```

## Ví dụ sử dụng quan hệ kế thừa class

Để dễ hiểu quan hệ kế thừa, định nghĩa các class `A`, `B`, `C`. `A` kế thừa `B`, `B` kế thừa `C`, và đã thêm các method.

```ts twoslash
class A {
  public a(): void {
    console.log("a");
  }
}

class B extends A {
  public b(): void {
    console.log("b");
  }
}

class C extends B {
  public c(): void {
    console.log("c");
  }
}
```

Định nghĩa các hàm với cả `I` và `O` đều là `B` cho mỗi loại variance.

```ts twoslash
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;

class B {
  // NOOP
}

// ---cut---
declare const biFunc: BivariantFunction<B, B>;
declare const coFunc: CovariantFunction<B, B>;
declare const contraFunc: ContravariantFunction<B, B>;
declare const inFunc: InvariantFunction<B, B>;
```

Thử thay đổi generics của các hàm này.

```ts twoslash
// @strictFunctionTypes: false
// @errors: 2322
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;

class A {
  public a(): void {
    console.log("a");
  }
}

class B extends A {
  public b(): void {
    console.log("b");
  }
}

class C extends B {
  public c(): void {
    console.log("c");
  }
}

declare const biFunc: BivariantFunction<B, B>;
declare const coFunc: CovariantFunction<B, B>;
declare const contraFunc: ContravariantFunction<B, B>;
declare const inFunc: InvariantFunction<B, B>;

// ---cut---
const f01: BivariantFunction<A, B> = biFunc;
const f02: BivariantFunction<C, B> = biFunc;
const f03: BivariantFunction<B, A> = biFunc;
const f04: BivariantFunction<B, C> = biFunc;

const f05: CovariantFunction<B, A> = coFunc;
const f06: CovariantFunction<B, C> = coFunc;

const f07: ContravariantFunction<A, B> = contraFunc;
const f08: ContravariantFunction<C, B> = contraFunc;

const f09: InvariantFunction<A, B> = inFunc;
const f10: InvariantFunction<C, B> = inFunc;
const f11: InvariantFunction<B, A> = inFunc;
const f12: InvariantFunction<B, C> = inFunc;
```

Tóm tắt những trường hợp xảy ra lỗi:

1. `f04`: Tham số và giá trị trả về đều bivariant nên mối quan hệ supertype và subtype được chấp nhận, nhưng `B` không có method `c()` so với giá trị trả về `C` nên xảy ra lỗi
2. `f06`: Giá trị trả về là covariant nên việc gán supertype được chấp nhận, nhưng giá trị trả về `C` là subtype của `B` nên xảy ra lỗi
3. `f07`: Tham số là contravariant nên việc gán subtype được chấp nhận, nhưng tham số `A` là supertype của `B` nên xảy ra lỗi
4. `f09`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi
5. `f10`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi
6. `f11`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi
7. `f12`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi

Ngoài ra, khi đặt `strictFunctionTypes` là `true`, ngoài các lỗi trên còn có:

1. `f01`: Tham số và giá trị trả về đều bivariant nên mối quan hệ supertype và subtype được chấp nhận, nhưng tham số `A` không có method `b()` nên xảy ra lỗi

## Ví dụ sử dụng union type

Hãy biểu diễn quan hệ kế thừa bằng union type.

```ts twoslash
type A = null;
type B = null | undefined;
type C = null | undefined | string;
```

Lúc này `A` là subtype của `B`, và `B` là subtype của `C`. Nói cách khác, `A extends B` và `B extends C`.

```ts twoslash
// @strictFunctionTypes: false
// @errors: 2322
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;

type A = null;
type B = null | undefined;
type C = null | undefined | string;

declare const biFunc: BivariantFunction<B, B>;
declare const coFunc: CovariantFunction<B, B>;
declare const contraFunc: ContravariantFunction<B, B>;
declare const inFunc: InvariantFunction<B, B>;

// ---cut---
const f01: BivariantFunction<A, B> = biFunc;
const f02: BivariantFunction<C, B> = biFunc;
const f03: BivariantFunction<B, A> = biFunc;
const f04: BivariantFunction<B, C> = biFunc;

const f05: CovariantFunction<B, A> = coFunc;
const f06: CovariantFunction<B, C> = coFunc;

const f07: ContravariantFunction<A, B> = contraFunc;
const f08: ContravariantFunction<C, B> = contraFunc;

const f09: InvariantFunction<A, B> = inFunc;
const f10: InvariantFunction<C, B> = inFunc;
const f11: InvariantFunction<B, A> = inFunc;
const f12: InvariantFunction<B, C> = inFunc;
```

1. `f03`: Tham số và giá trị trả về đều bivariant nên mối quan hệ supertype và subtype được chấp nhận, nhưng `undefined` của `B` không thể gán cho `null` của giá trị trả về `A` nên xảy ra lỗi
1. `f05`: Giá trị trả về là covariant nên việc gán supertype được chấp nhận, nhưng `undefined` của `B` không thể gán cho giá trị trả về `A` là `null` nên xảy ra lỗi
1. `f08`: Tham số là contravariant nên việc gán subtype được chấp nhận, nhưng `string` của tham số `C` không thể gán cho `B` nên xảy ra lỗi
1. `f09`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi
1. `f10`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi
1. `f11`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi
1. `f12`: Tham số và giá trị trả về đều invariant nên mối quan hệ supertype và subtype không được chấp nhận, do đó xảy ra lỗi

Khi đặt `strictFunctionTypes` là `true`, ngoài các lỗi trên còn có:

1. `f02`: Tham số và giá trị trả về đều bivariant nên mối quan hệ supertype và subtype được chấp nhận, nhưng `string` của tham số `C` không thể gán cho `B` nên xảy ra lỗi

## Kiểm tra quan hệ kế thừa

Hãy sử dụng [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) để kiểm tra quan hệ kế thừa. Định nghĩa kiểu `IsSubType<T, U>` để xác định xem kiểu `T` có phải là subtype của `U` hay không.

```ts twoslash
type IsSubType<T, U> = T extends U ? true : false;
```

Áp dụng `IsSubType<T, U>` cho các class `A`, `B`, `C` trước đó.

```ts twoslash
type IsSubType<T, U> = T extends U ? true : false;

// ---cut---
class A {
  public a(): void {
    console.log("a");
  }
}

class B extends A {
  public b(): void {
    console.log("b");
  }
}

class C extends B {
  public c(): void {
    console.log("c");
  }
}

declare const t1: IsSubType<A, A>;
//            ^?
declare const t2: IsSubType<B, B>;
//            ^?
declare const t3: IsSubType<C, C>;
//            ^?

declare const t4: IsSubType<A, B>;
//            ^?
declare const t5: IsSubType<B, C>;
//            ^?
declare const t6: IsSubType<A, C>;
//            ^?

declare const t7: IsSubType<B, A>;
//            ^?
declare const t8: IsSubType<C, B>;
//            ^?
declare const t9: IsSubType<C, A>;
//            ^?
```

Có thể thấy chỉ trả về `true` khi là chính class đó hoặc subclass.

Hãy xem union type. Lưu ý, vì đây là union type nên sử dụng Distributive Conditional Type.

[Distributive Conditional Types](../type-reuse/conditional-types/distributive-conditional-types.md)

```ts twoslash
type IsSubType<T, U> = [T] extends [U] ? true : false;
```

```ts twoslash
type IsSubType<T, U> = [T] extends [U] ? true : false;

// ---cut---
type A = null;
type B = null | undefined;
type C = null | undefined | string;

declare const t1: IsSubType<A, A>;
//            ^?
declare const t2: IsSubType<B, B>;
//            ^?
declare const t3: IsSubType<C, C>;
//            ^?

declare const t4: IsSubType<A, B>;
//            ^?
declare const t5: IsSubType<B, C>;
//            ^?
declare const t6: IsSubType<A, C>;
//            ^?

declare const t7: IsSubType<B, A>;
//            ^?
declare const t8: IsSubType<C, B>;
//            ^?
declare const t9: IsSubType<C, A>;
//            ^?
```

Có thể thấy `t4`, `t5`, `t6` trả về `true` vì `A` là subtype của `B`, và `B` là subtype của `C`.
