# Readonly modifier trong class

Trong TypeScript, thêm readonly modifier cho field để biến field đó thành chỉ đọc.

Field chỉ đọc chỉ có thể gán giá trị trong constructor hoặc field initializer.

```ts twoslash
class Octopus {
  readonly name: string;
  readonly legs = 8; // Gán trong field initializer là OK

  constructor() {
    this.name = "たこちゃん"; // Gán trong constructor là OK
  }
}
```

Field chỉ đọc sẽ báo lỗi compile khi cố gắng gán lại giá trị.

```ts twoslash
class Octopus {
  readonly name: string;
  readonly legs = 8; // Gán trong field initializer là OK

  constructor() {
    this.name = "たこちゃん"; // Gán trong constructor là OK
  }
}
// ---cut---
// @errors: 2540
const octopus = new Octopus();
octopus.legs = 16;
```

Ngay cả trong xử lý của method, việc gán lại giá trị cho field chỉ đọc cũng không được phép.

```ts twoslash
// @errors: 2540
class Octopus {
  readonly name = "たこちゃん";

  setName(newName: string): void {
    this.name = newName;
  }
}
```

## Thông tin liên quan

[Readonly property của object type (readonly property)](../../values-types-variables/object/readonly-property.md)

[Readonly modifier của interface](../interface/readonly-modifier-in-interfaces.md)
