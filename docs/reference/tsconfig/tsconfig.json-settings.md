# Cấu hình tsconfig.json

Node.js không tự support TypeScript, nên khi đưa TypeScript vào cần có file cấu hình TypeScript là tsconfig.json.

## tsconfig.json đầu tiên

Trong project có typescript trong dependencies (hoặc devDependencies) của package.json, chạy lệnh sau:

```bash
npx tsc --init
```

Nếu typescript được cài global có thể chạy như sau:

```bash
tsc --init
```

tsconfig.json sẽ được tạo. Nếu đã có tsconfig.json sẵn thì không bị ghi đè, nên hãy đổi tên tsconfig.json hiện có sang tên khác để không còn file có tên tsconfig.json.

Giải thích chính thức về tsconfig.json ở đây:

<https://www.typescriptlang.org/docs/handbook/tsconfig-json.html>

Giải thích tất cả option sẽ không đủ chỗ, nên ở đây tôi sẽ trích xuất các use case và giải thích theo các góc độ sau:

- Cách quyết định `target`
- Frontend và backend
- Phiên bản 2020 nếu tạo từ đầu

## `target`

TypeScript cuối cùng sẽ được compile sang JavaScript. Option này quy định output sang JavaScript phiên bản nào.

Khi set `target`, TypeScript sẽ load definition file của các object và function có thể dùng tại thời điểm `target` đó. Nghĩa là nếu chỉ định `target` quá cũ, có thể không dùng được các object và function thường dùng ngày nay.

Ngay cả khi đặt `target` mới nhất, nếu môi trường chạy vẫn cũ thì không dùng được. TypeScript sẽ autocomplete như thể object, function đó tồn tại khi code, nhưng việc môi trường thực thi `js` có object hay function phiên bản đó hay không là vấn đề khác. Tuy nhiên, khi có cú pháp mới được sinh ra, nếu set `target` trước khi cú pháp đó ra đời thì khi compile sẽ chuyển đổi sang cú pháp hợp lệ cho `target` đó. Ví dụ nổi tiếng là cách viết function. Ví dụ nếu chỉ định `"target": "es5"`, các cú pháp như arrow function `() => {}` có từ `"target": "es2015"` sẽ được compile sang dạng `function() {}` chạy được trên `ES5`.

### `lib`

Muốn dùng tính năng không có trong `target` muốn dùng? Khi đó có thể chỉ định option `lib` để sử dụng được.

Các thứ như vậy cho phép dùng tính năng có trong phiên bản mới nhất hoặc đang trong giai đoạn proposal chưa được implement được gọi chung là polyfill. Muốn biết thêm về polyfill, xem [What is a polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill) (bài viết của Remy Sharp - người tạo ra từ này).

`lib` không bắt buộc phải chỉ định. Khi chỉ định `target`, library dùng trong `target` đó sẽ tự động được thêm vào. Dùng khi muốn thêm library chưa được implement trong `target` đã chỉ định, hoặc muốn loại trừ library không cần thiết.

Tuy nói không nhất thiết phải chỉ định, nhưng trong Node.js đôi khi API được support trước khi syntax được support, nên có thể chỉ định `lib` để dùng API mà Node.js đã hỗ trợ nhưng `target` chưa support.

#### Lưu ý khi chỉ định `lib`

Khi chỉ định `lib`, phải ghi rõ dùng `lib` của `target` nào.

Cách viết `target` không chỉ định `lib` như sau là OK:

```json
{
  "compilerOptions": {
    "target": "es2018"
    // "lib": []
  }
}
```

Khi chỉ định `lib`, phải ghi rõ dùng `lib` của `target` nào:

```json
{
  "compilerOptions": {
    "target": "es2018",
    "lib": [
      "es2018",
      "esnext.AsyncIterable",
      "esnext.Array",
      "esnext.Intl",
      "esnext.Symbol"
    ]
  }
}
```

Nếu bỏ qua phần tử đầu `"es2018"` trong `lib`, nhiều library sẽ không tồn tại.

### Nên chỉ định `target` là gì

Nếu không có lý do đặc biệt như phải chạy trên code cũ hoặc dùng Node.js cũ, chỉ định gần với phiên bản mới nhất là không vấn đề gì. Tính đến 09/2020, Node.js 14.x đã ra mắt như LTS. Với Node.js 14.x thì `"target": "es2020"` là lựa chọn an toàn.

Ngoài ra, nếu muốn giao xử lý cho compiler chuyên dụng như Babel hoặc module bundler, chỉ định `target` là `"esnext"` rồi từ đó nhờ từng cái compile theo version.

Tính năng EcmaScript được support theo từng version Node.js có thể kiểm tra tại [node.green](https://node.green).

## Frontend và backend

Frontend và backend có cách load module khác nhau. Chi tiết xem trang về `import / export / require`:

[import / export /require](../import-export-require.md)

Từ module ở đây, người chưa quen hãy hiểu là code trong các file khác mà code đó load. Chúng có thể là code trong file khác trong cùng project, hoặc từ `npm install`. Đặc biệt, các thứ từ `npm install` được gọi là package.

### `module`

Option này chỉ định JavaScript được output sẽ load module như thế nào.

Hãy coi các library có cơ chế load module khác nhau nói chung là không tương thích. Và điều này **khác nhau giữa frontend và backend**.

#### `commonjs`

Cách giải quyết load module dùng ở backend (server-side). Nếu module hoặc package đang tạo chỉ cần đảm bảo hoạt động ở backend thì đây là lựa chọn an toàn nhất.

#### `es2015, es2020, esnext`

Cách giải quyết load module gọi là `esmodule`. Được dùng ở frontend. Node.js từ 13.2.0 cũng support cách giải quyết module này ở backend, nhưng tính đến 2020 ít package support.

Do có sự khác biệt này, nếu dùng ở backend thì chỉ định `commonjs`, frontend thì chỉ định `es2015, es2020, esnext`.

## Phiên bản 2020 nếu tạo từ đầu

Tạo từ đầu nghĩa là không có vướng mắc gì về tính nhất quán với tài sản hiện có. Đây là giới thiệu những gì cần có để lập trình đầy type.

Với điều kiện không vướng mắc, giả sử dùng Node.js 14.x.

### Trường hợp backend

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "src",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"],
  "compileOnSave": false
}
```

### Trường hợp frontend

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "jsx": "react",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "src",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"],
  "compileOnSave": false
}
```

### Về phần khác nhau

Phần khác nhau trong 2 cấu hình tsconfig.json này là `module, lib, jsx`. Nếu là frontend có thể thêm `dom` vào `lib` (tuy nhiên điều này đã có trong `"target": "es2020"`). Hơn nữa, nếu dùng `jsx` thì chỉ định bằng option `jsx` cách muốn compile output `tsx` sang file js.
