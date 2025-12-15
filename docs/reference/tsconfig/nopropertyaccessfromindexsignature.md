---
description: Bắt buộc dùng [] khi tham chiếu property của index type
---

# noPropertyAccessFromIndexSignature

`noPropertyAccessFromIndexSignature` là compiler option bắt buộc dùng `[]` khi tham chiếu property của index type.

- Mặc định: `false`
- Phiên bản thêm vào: 4.2

## Giải thích

Giống như `noUncheckedIndexedAccess`, đây là type evaluation đối với object có index type. Bắt buộc phải dùng index notation khi truy cập vào index type.

Về dot notation và index notation, xét object như sau thì truy cập property bằng dấu chấm (`.`) là dot notation, truy cập bằng bracket (`[]`) là index notation:

```ts twoslash
type SystemTerms = {
  en: string;
  [key: string]: string;
};

const butterfly: SystemTerms = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

// dot syntax
butterfly.en;
// indexed syntax
butterfly["en"];
```

`SystemTerms` là type giống với type xuất hiện trong `noUncheckedIndexedAccess`, đảm bảo tiếng Anh trong các từ/thuật ngữ của system nhưng sự tồn tại của ngôn ngữ khác là không chắc chắn:

```ts twoslash
type SystemTerms = {
  en: string;
  [key: string]: string;
};

const butterfly: SystemTerms = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};
// ---cut---
console.log(butterfly.fr);
// @log: "Papillon"
```

Khi truy cập property có sự tồn tại không chắc chắn bằng dot notation, nếu bật option này sẽ báo lỗi như sau:

```ts twoslash
// @noPropertyAccessFromIndexSignature: true
type SystemTerms = {
  en: string;
  [key: string]: string;
};

const butterfly: SystemTerms = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};
// ---cut---
// @errors: 4111
console.log(butterfly.fr);
```

Như vậy, truy cập vào index type bằng dot notation bị cấm.
