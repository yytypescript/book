---
description: Bắt buộc check undefined khi tham chiếu property của index type hoặc phần tử array
---

# noUncheckedIndexedAccess

`noUncheckedIndexedAccess` là compiler option bắt buộc check undefined khi tham chiếu property của index type hoặc phần tử array.

- Mặc định: `false`
- Phiên bản thêm vào: 4.1

## Giải thích

Evaluate nghiêm ngặt khi truy cập property của object được khai báo bằng index type hoặc array.

[インデックス型 (index signature)](../values-types-variables/object/index-signature.md)

```ts twoslash
type ObjectLiteralLike = {
  en: string;
  fr: string;
  it: string;
  [lang: string]: string;
};

type ArrayObjectLike = {
  0: string;
  1: string;
  [num: number]: string;
};

function log(s: string): void {
  console.log(s);
}

const butterfly: ObjectLiteralLike = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

const phoneticCodes: ArrayObjectLike = {
  0: "alpha",
  1: "bravo",
  2: "charlie",
};
```

`ObjectLiteralLike, ArrayObjectLike` đều được khai báo là type của object có property kiểu `string`.

```ts twoslash
type ObjectLiteralLike = {
  en: string;
  fr: string;
  it: string;
  [lang: string]: string;
};

type ArrayObjectLike = {
  0: string;
  1: string;
  [num: number]: string;
};

function log(s: string): void {
  console.log(s);
}

const butterfly: ObjectLiteralLike = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

const phoneticCodes: ArrayObjectLike = {
  0: "alpha",
  1: "bravo",
  2: "charlie",
};
// ---cut---
const spanish: string = butterfly.es;
const third: string = phoneticCodes[2];

console.log(spanish);
console.log(third);
```

Khi truy cập property của các object này không đảm bảo type safe hoàn toàn. Khi bật option này sẽ báo lỗi như sau:

```ts twoslash
// @noUncheckedIndexedAccess: true
// @errors: 2322
type ObjectLiteralLike = {
  en: string;
  fr: string;
  it: string;
  [lang: string]: string;
};

type ArrayObjectLike = {
  0: string;
  1: string;
  [num: number]: string;
};

function log(s: string): void {
  console.log(s);
}

const butterfly: ObjectLiteralLike = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

const phoneticCodes: ArrayObjectLike = {
  0: "alpha",
  1: "bravo",
  2: "charlie",
};
// ---cut---
const spanish: string = butterfly.es;
const third: string = phoneticCodes[2];
```

Như vậy, property không được định nghĩa rõ ràng sẽ được phân tích là union type với `undefined`:

```ts twoslash
// @noUncheckedIndexedAccess: true
// @errors: 2322
type ObjectLiteralLike = {
  en: string;
  fr: string;
  it: string;
  [lang: string]: string;
};

type ArrayObjectLike = {
  0: string;
  1: string;
  [num: number]: string;
};

function log(s: string): void {
  console.log(s);
}

const butterfly: ObjectLiteralLike = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

const phoneticCodes: ArrayObjectLike = {
  0: "alpha",
  1: "bravo",
  2: "charlie",
};
// ---cut---
const spanish: string | undefined = butterfly.es;
const third: string | undefined = phoneticCodes[2];
```

Array khi truy cập bằng index notation sẽ được phân tích là union type với `undefined`, nhưng `for-of, array.forEach()` không bị ràng buộc này nên nên cân nhắc sử dụng tích cực:

```ts twoslash
const phoneticCodes: string[] = ["alpha", "bravo", "charlie"];

for (const p of phoneticCodes) {
  // ...
}

phoneticCodes.forEach((p: string) => {
  // ...
});
```
