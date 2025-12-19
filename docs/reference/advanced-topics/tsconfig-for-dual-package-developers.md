---
sidebar_label: tsconfig cho nhà phát triển Dual Package
---

# tsconfig cho nhà phát triển Dual Package

Có một khái niệm gọi là Universal JS - TypeScript một mình cân cả frontend lẫn backend! Thực tế, JavaScript gần như không thể tránh khỏi nếu muốn làm frontend động, và JavaScript giờ cũng có thể dùng cho backend. Nếu có thể tái sử dụng cùng một codebase, sẽ rất có giá trị về mặt bảo trì vì không cần phải làm việc với nhiều ngôn ngữ khác nhau - đây chính là giá trị của ngôn ngữ thống nhất.

Tuy nhiên, frontend và backend có cách resolve module JavaScript khác nhau. Vì sự khác biệt này, không có nghĩa là phải tách code TypeScript thành hai phần riêng biệt. Có một khái niệm gọi là Dual Package - một module xuất ra cả hai định dạng `commonjs` và `esmodule`.

## Bắt đầu với Dual Package

Tên nghe có vẻ đao to búa lớn, nhưng thực ra chỉ là xuất JavaScript cho `commonjs` và JavaScript cho `esmodule`. Tức là chuẩn bị tsconfig.json cho mỗi `module` output.

Cấu trúc project sẽ đại khái như sau:

```text
./
├── tsconfig.base.json
├── tsconfig.cjs.json
├── tsconfig.esm.json
└── tsconfig.json
```

- tsconfig.base.json
  - Đây là tsconfig.json cơ sở
- tsconfig.cjs.json
  - tsconfig.json cho `commonjs`, kế thừa từ tsconfig.base.json
- tsconfig.esm.json
  - tsconfig.json cho `esmodule`, kế thừa từ tsconfig.base.json
- tsconfig.json
  - tsconfig.json này dành cho IDE vì IDE ưu tiên tìm file với tên này

Việc tách tsconfig.base.json và tsconfig.json hay không là tùy sở thích. Gộp chung cũng không có vấn đề gì.

### Kế thừa tsconfig.json

tsconfig.json có tính năng kế thừa từ tsconfig.json khác. Ở trên, tsconfig.cjs.json và tsconfig.esm.json kế thừa từ tsconfig.base.json như sau:

```json
// tsconfig.cjs.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "./dist/cjs"
    // ...
  }
}
```

```json
// tsconfig.esm.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "esnext",
    "outDir": "./dist/esm"
    // ...
  }
}
```

`outDir` là option để thay đổi thư mục xuất file `js` đã compile và file định nghĩa type (sẽ đề cập sau).

Khi đã có các file tsconfig.xxx.json như vậy, chỉ cần compile với chỉ định file như sau:

```bash
tsc -p tsconfig.cjs.json
tsc -p tsconfig.esm.json
```

## package.json cho Dual Package

package.json cũng cần thiết lập cho Dual Package.

### `main`

Đây là mục chỉ định file entry point của package trong package.json. Với Dual Package, thiết lập file `js` entry point cho `commonjs` ở đây.

### `module`

Với Dual Package, thiết lập file `js` entry point cho `esmodule` ở đây.

### `types`

Thiết lập file `ts` entry point cho file định nghĩa type. Nếu đang xuất file định nghĩa type, dùng output từ tsconfig.json của `commonjs` hay `esmodule` đều được.

package.json sẽ trông như thế này:

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```

Thư mục output của file `js` sau compile chỉ là ví dụ. Bạn có thể thay đổi nơi output bằng cách thay đổi `outDir` trong tsconfig.json, sau đó thiết lập file `js` entry point trong package.json.

## Tree Shaking

Với sự xuất hiện của `module bundler`, frontend có thêm lựa chọn bundle tất cả vào một file `js` thay vì load nhiều file `js` bằng `<script>` như trước. File `js` all-in-one này giúp developer thoải mái hơn vì có thể mang tất cả những gì mình làm được lên môi trường browser, nhưng nhược điểm là kích thước một file `js` trở nên quá lớn. Đặc biệt với SPA (Single Page Application), đây là vấn đề nghiêm trọng. SPA chỉ hoạt động sau khi load xong, nên người dùng sẽ phải nhìn màn hình trống một lúc.

Để tránh tình trạng này, `module bundler` đã nỗ lực không ngừng để giảm kích thước. Một trong những tính năng đó là Tree Shaking, và bài viết này sẽ giới thiệu cách tạo package hỗ trợ Tree Shaking cho developer.

### Tree Shaking là gì

Tree Shaking là tính năng không include các function, class không được sử dụng vào file `js` cuối cùng. Không dùng thì không cần đưa vào - đây là kết luận hoàn toàn hợp lý, nhưng có điều kiện để sử dụng Tree Shaking:

- Được viết bằng `esmodule`
- Code không có side effect

Hãy xem chi tiết từng điều kiện.

## Được viết bằng `esmodule`

`commonjs` và `esmodule` có cách resolve file bên ngoài khác nhau.

`commonjs` sử dụng `require()`. `require()` có thể dùng ở bất kỳ dòng nào trong file, nhưng `import` của `esmodule` phải đặt ở đầu file - đây là sự khác biệt quyết định.

`require()` có thể chuyển đổi file load bằng code - khi nào thì load file `js` này, khi khác thì load file `js` kia. Tức là có thể làm như sau:

```ts twoslash
declare function shouldCallPolice(): boolean;
// ---cut---
let police = null;
let firefighter = null;

if (shouldCallPolice()) {
  police = require("./police");
} else {
  firefighter = require("./firefighter");
}
```

Mặt khác, như đã đề cập, `esmodule` không thể mix logic load vào code.

Trong ví dụ trên, ngay cả khi `shouldCallPolice()` được tạo để luôn trả về `true`, `module bundler` có thể không detect được điều đó. Sẽ khó để chọn không load `firefighter` vốn không cần thiết.

Gần đây đã có `module bundler` có thể Tree Shaking cả `commonjs`.

## Code không có side effect

Side effect được đề cập ở đây bao gồm:

- Chỉ `export` thôi đã có effect
- Ảnh hưởng đến những thứ đã tồn tại, như prototype pollution

Nếu `module bundler` cho rằng có thể có những thứ này, hiệu quả Tree Shaking sẽ giảm.

### Thông báo rằng không có side effect

Có cách để thông báo cho `module bundler` rằng package không có side effect. Chỉ cần thêm một thứ vào package.json là xong.

### `sideEffects`

Thêm property này vào package.json với giá trị `false` để thông báo rằng package không có side effect.

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": false,
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```

Nếu có side effect và biết rõ file nào, chỉ định file đó:

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "license": "CC BY-SA 3.0",
  "sideEffects": ["./xxx.js", "./yyy.js"],
  "main": "./cjs/index.js",
  "module": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json"
  }
}
```
