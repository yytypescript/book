# tsconfig cho nhà phát triển NPM package

## Mục tiêu: Người dùng package cũng được hưởng lợi từ type của TypeScript

Khi publish package, bạn cần compile sang `js` vì package phải có khả năng chạy được. Tức là compile là bắt buộc. Tuy nhiên, vì đã tạo package bằng TypeScript, hãy cung cấp luôn thông tin type của package.

### Xuất file định nghĩa type

Hãy xuất file định nghĩa type cùng với package. Để làm điều này, thay đổi mục `declaration` trong tsconfig.json thành `true`.

```json
"declaration": true,
/* Generates corresponding '.d.ts' file. */
```

Khi thiết lập như vậy, file có cùng tên nhưng đuôi `d.ts` sẽ được xuất ra cùng thư mục với file `js` đã compile. Đây chính là file chứa thông tin type. Lưu ý rằng không có option nào để xuất riêng file định nghĩa type này sang thư mục khác với file `js` đã compile.

Giả sử chúng ta tạo một `Value Object` đơn giản có property kiểu `number`.

```ts twoslash
class NumericalValueObject {
  private value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public equals(other: NumericalValueObject): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return `${this.value}`;
  }
}
```

Khi compile và tạo định nghĩa type, kết quả sẽ như sau:

```ts twoslash
declare class NumericalValueObject {
  private value;
  constructor(value: number);
  equals(other: NumericalValueObject): boolean;
  toString(): string;
}
```

Nội dung file này giống như một interface.

### Cho phép nhảy đến file `ts` gốc từ khai báo

Tính năng này hữu ích khi sử dụng IDE, cho phép xem source code TypeScript gốc được viết như thế nào. Thay đổi mục `declarationMap` trong tsconfig.json thành `true`.

```json
"declarationMap": true,
/* Generates a sourcemap for each corresponding '.d.ts' file. */
```

Khi thiết lập như vậy, file có cùng tên nhưng đuôi `d.ts.map` sẽ được xuất ra cùng thư mục với file `js` đã compile. File này thực hiện mapping giữa file `ts` gốc và file `js` thực thi. Tuy nhiên, chỉ thiết lập này là chưa đủ, bạn cần publish cả file `ts` gốc cùng với package.

### Publish cả file `ts` gốc

Nếu không có thiết lập đặc biệt, file `ts` gốc cũng sẽ được publish. Tuy nhiên, nếu bạn đang điều chỉnh nội dung publish, cần thay đổi property `files` trong package.json để include cả file `ts` gốc. Nếu đã thiết lập `declarationMap` trong tsconfig.json nhưng không thể tham chiếu đến file `ts` gốc, hãy kiểm tra xem nội dung publish có bị hạn chế ở đây không.

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": false,
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "files": ["dist", "src"],
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```

Ví dụ này giả định `js, d.ts, d.ts.map` đã compile nằm trong `dist`, và file `ts` gốc nằm trong `src`.

Để kiểm tra những file nào sẽ được include trong package, chạy lệnh sau:

```sh
npm publish --dry-run
```

### Xuất `sourceMap` của JavaScript

`sourceMap` là thứ giúp mapping dòng code giữa AltJS và JavaScript đã compile. Nhờ có nó, khi debug hoặc trace, bạn có thể dễ dàng biết vấn đề xảy ra ở dòng nào trong file `ts` gốc. Khi sử dụng `module bundler`, nếu không bật option này thì về cơ bản bạn sẽ không biết gì cả. Nên bật option này ngay cả khi không publish package.

Thay đổi mục `sourceMap` trong tsconfig.json thành `true`.

```json
"sourceMap": true,
/* Generates corresponding '.map' file. */
```

Tương tự, file có cùng tên nhưng đuôi `js.map` sẽ được xuất ra cùng thư mục với file `js` đã compile.
