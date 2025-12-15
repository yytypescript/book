# Tạo trình tạo ảnh mèo với Next.js

## Tổng quan về Next.js

Next.js là framework để tạo ứng dụng Web. Next.js dựa trên React, bổ sung các tính năng cần thiết cho phát triển Web hiện đại như sau.

- Routing: Tự động routing trang theo cấu trúc thư mục và tên file được quy định
- Tối ưu hóa performance: Tạo trang trước ở phía server, thực hiện hiển thị ban đầu nhanh chóng. Tự động tối ưu hóa ảnh và code splitting.
- CSS framework: Hỗ trợ các phương pháp styling như Tailwind CSS hay CSS Modules
- Bundler: Thực hiện config webpack, Babel, v.v. nội bộ, developer không cần quan tâm đến config

Ngoài ra, không chỉ phía client như UI, mà còn hỗ trợ xử lý phía server. Ví dụ, có thể giao tiếp trực tiếp với database hoặc external API từ Next.js. Cũng có thể thêm JSON API đơn giản.

Next.js được Vercel Inc. thúc đẩy phát triển, công ty này cung cấp hosting service tên là [Vercel](https://vercel.com/). Do đó, ứng dụng xây dựng bằng Next.js có thể dễ dàng công khai.

Như vậy, điểm hấp dẫn của Next.js là có thể ngay lập tức bắt đầu phát triển ứng dụng Web thực thụ.

## Những gì sẽ tạo

Trong tutorial này, có tiêu đề "Trình tạo ảnh mèo". Nói về nó là gì, đó là ứng dụng web đơn giản khi nhấn nút sẽ lấy URL ảnh từ API ảnh mèo và hiển thị ảnh mèo dễ thương ngẫu nhiên.

<video width="600" controls="controls" loop="controls" autoPlay="autoplay" muted="muted" playsInline="playsinline"   aria-label="Video demo phiên bản hoàn chỉnh của trình tạo ảnh mèo. Ở giữa trang nền trắng hiển thị ảnh mèo, mỗi khi click nút kiểu bong bóng 'Xem mèo khác' thì ảnh mèo thay đổi ngẫu nhiên" src="/tutorials/nextjs/nextjs-cat-image-generator-demo.mp4"></video>

Sản phẩm cuối cùng có thể xác nhận ở [demo site](https://random-cat.typescriptbook.jp/). Bằng cách trải nghiệm trước khi bắt đầu tutorial, bạn có thể dễ dàng hình dung mỗi bước đang implement gì. Ngoài ra, source code phiên bản hoàn chỉnh có thể xem ở [GitHub](https://github.com/yytypescript/random-cat).

## Những gì học trong tutorial này

Trong tutorial này, bạn có thể học các tính năng Next.js thường dùng trong thực tế. Cụ thể là các nội dung sau.

- Tạo project Next.js mới
- Cách sử dụng App Router
- Server component và client component
- Cách sử dụng server action
- Tích hợp external API
- Xử lý thông tin xác thực bí mật (API key)

## Những thứ cần thiết cho tutorial này

Những thứ cần thiết cho tutorial này như sau.

- Node.js v22 trở lên
- npm v10 trở lên (đi kèm với Node.js)
- Browser (tutorial này giả định sử dụng Google Chrome)

Về cách giới thiệu Node.js, vui lòng xem [Chuẩn bị môi trường phát triển](./setup.md).

## Setup Next.js

Đầu tiên, tạo project bằng lệnh `npx create-next-app`. `random-cat` là phần tên project. Phần này có thể đặt tên bất kỳ, nhưng trong tutorial này chúng ta sẽ tiến hành với tên `random-cat`.

```sh
npx create-next-app random-cat
```

Khi thực thi lệnh này, thiết lập tương tác sẽ bắt đầu. Nếu là lần đầu chạy `create-next-app`, sẽ được hỏi có thể giới thiệu `create-next-app` không, hãy nhấn Enter để tiếp tục.

```text
Need to install the following packages:
create-next-app@15.3.1
Ok to proceed? (y)
```

`create-next-app` sẽ đưa ra một số câu hỏi. Hãy chọn như sau cho mỗi câu hỏi:

<div style={{
  backgroundColor: "#1a1a1a",
  color: "#e0e0e0",
  fontFamily: "monospace",
  padding: "20px",
  lineHeight: "1.3",
  whiteSpace: "pre",
  overflow: "auto",
  borderRadius: "8px",
}}>
  <span style={{ color: "#22c55e" }}>✓</span> Would you like to use TypeScript? … No / <span style={{ color: "#22c55e", textDecoration: "underline" }}>Yes</span><br/>
  <span style={{ color: "#22c55e" }}>✓</span> Would you like to use ESLint? … No / <span style={{ color: "#22c55e", textDecoration: "underline" }}>Yes</span><br/>
  <span style={{ color: "#22c55e" }}>✓</span> Would you like to use Tailwind CSS? … No / <span style={{ color: "#22c55e", textDecoration: "underline" }}>Yes</span><br/>
  <span style={{ color: "#22c55e" }}>✓</span> Would you like your code inside a `src/` directory? … <span style={{ color: "#22c55e", textDecoration: "underline" }}>No</span> / Yes<br/>
  <span style={{ color: "#22c55e" }}>✓</span> Would you like to use App Router? (recommended) … No / <span style={{ color: "#22c55e", textDecoration: "underline" }}>Yes</span><br/>
  <span style={{ color: "#22c55e" }}>✓</span> Would you like to use Turbopack for `next dev`? … No / <span style={{ color: "#22c55e", textDecoration: "underline" }}>Yes</span><br/>
  <span style={{ color: "#22c55e" }}>✓</span> Would you like to customize the import alias (`@/*` by default)? … <span style={{ color: "#22c55e", textDecoration: "underline" }}>No</span> / Yes
</div>

Sau khi setup project hoàn tất, hãy di chuyển vào thư mục đã tạo.

```sh
cd random-cat
```

Xác nhận cấu trúc file của project như sau.

```text
.
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── node_modules/
├── public/
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Khởi động development server

Thực thi lệnh sau để khởi động development server.

```sh
npm run dev
```

Sau khi development server khởi động, hãy truy cập URL hiển thị trong terminal bằng browser. Mặc định là <http://localhost:3000>.

![Màn hình ban đầu của ứng dụng Next.js hiển thị trong browser. Ở giữa có logo Next.js và hướng dẫn "Chỉnh sửa app/page.tsx để bắt đầu", bên dưới có nút "Deploy now"](/tutorials/nextjs/nextjs-initial-screen-dark-mode.png)

## Page component

Trong Next.js, cấu trúc dưới thư mục `app` tương ứng với routing của trang. Ví dụ, `app/page.tsx` sẽ là trang hiển thị khi truy cập `/`. `app/about/page.tsx` sẽ hiển thị khi truy cập `/about`.

File `page.tsx` này được gọi là page component trong thuật ngữ Next.js.

## Tạo page component cho trang chủ

Chỉnh sửa `app/page.tsx` như sau để tạo page component cho trang chủ. Đây chỉ đơn giản là hiển thị "Vị trí dành cho ảnh mèo".

```tsx twoslash title="app/page.tsx"
export default function Home() {
  return <div>Vị trí dành cho ảnh mèo</div>;
}
```

Để Next.js nhận diện file là page component, cần tuân thủ 2 quy tắc sau:

1. Tên file phải là `page.tsx`
2. Function phải được export với `export default`

Chỉ cần tuân thủ điều này, chỉ cần tạo file trong thư mục `app` là tự động được routing. Tên function có thể là gì cũng được, nhưng thường sử dụng tên dễ hiểu như page component như `Home` hay `Page`.

Sau khi implement component, hãy reload browser và xác nhận màn hình hiển thị "Vị trí dành cho ảnh mèo".

![Ứng dụng Next.js hiển thị trong browser. Màn hình placeholder chỉ có text "Vị trí dành cho ảnh mèo" ở góc trên bên trái](/tutorials/nextjs/nextjs-cat-placeholder-dark-mode.png)

## The Cat API

Trong tutorial này, để hiển thị ảnh mèo ngẫu nhiên, chúng ta sử dụng [The Cat API](https://thecatapi.com/). API này có thể lấy ảnh mèo hoặc lấy thông tin mèo theo giống.

API này miễn phí và có thể sử dụng đến 10,000 request mỗi tháng. Ngoài ra, nếu số lượng ảnh yêu cầu mỗi lần là 10 tấm trở xuống, có thể sử dụng mà không cần API key authentication. Trong quá trình thực hiện tutorial này, cả hai điều kiện đều được đáp ứng, nên không cần đăng ký gói trả phí hay lấy API key.

Trong tutorial lần này, chúng ta sẽ gửi request đến `/v1/images/search` được mô tả trong Quickstart của [API document](https://docs.thecatapi.com/) để lấy ảnh mèo ngẫu nhiên.

Thử truy cập <https://api.thecatapi.com/v1/images/search> bằng browser. Vì kết quả trả về ngẫu nhiên nên giá trị hơi khác, nhưng bạn có thể lấy được data với cấu trúc như sau làm response. Lưu ý rằng cấu trúc data của response là array.

```json title="Sample response của The Cat API"
[
  {
    "id": "co9",
    "url": "https://cdn2.thecatapi.com/images/co9.jpg",
    "width": 900,
    "height": 600
  }
]
```

`url` trong response là URL của ảnh mèo. Chúng ta lấy giá trị này để hiển thị ảnh mèo ngẫu nhiên.

## Implement hàm lấy ảnh

Trong bước này, chúng ta implement hàm lấy ảnh mèo từ The Cat API. Tạo file mới `fetch-image.ts` trong thư mục `app` và viết code sau.

```tsx twoslash title="app/fetch-image.ts"
// Hàm lấy ảnh từ API
export async function fetchImage() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: Đã lấy thông tin ảnh", images);
  return images[0]; // Trả về phần tử đầu tiên từ array thông tin ảnh
}
```

[`fetch`](https://developer.mozilla.org/ja/docs/Web/API/Window/fetch) là API chuẩn của browser để lấy resource bằng HTTP request. Return value là object [Response](https://developer.mozilla.org/ja/docs/Web/API/Response). Bằng cách thực thi method `json()` của object Response, có thể parse body của response dưới dạng JSON và lấy dưới dạng object JavaScript.

[`async` keyword](/reference/asynchronous/async) đính kèm vào hàm `fetchImage` cho thấy hàm này thực hiện xử lý bất đồng bộ. `fetch` và `res.json` là hàm bất đồng bộ, để chờ các xử lý này, mỗi cái đều có [`await` keyword](/reference/asynchronous/await).

<!-- todo: Thay đổi link khi rewrite async/await hoàn tất -->

Hàm này được export bằng keyword `export` để có thể import từ bên ngoài. Điều này để sau này import và sử dụng hàm này trong `page.tsx`.

## Gọi API khi truy cập trang

Sử dụng hàm `fetchImage` đã implement ở trên để gọi API khi truy cập trang. Chỉnh sửa `app/page.tsx` như sau.

```tsx twoslash {1-2,4-11} title="app/page.tsx"
// @filename: fetch-image.ts
export declare function fetchImage(): Promise<any>;
// @filename: types.ts
declare module "next/server" {
  export function connection(): Promise<void>;
}
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
import { connection } from "next/server"; // Thêm
import { fetchImage } from "./fetch-image"; // Thêm

export default async function Home() {
  //           ^^^^^(1) Thêm async keyword
  // (2) Để kết quả fetchImage không bị cố định khi build
  await connection();
  // (3) Lấy ảnh từ API
  const image = await fetchImage();
  // (4) Hiển thị URL ảnh ra console
  console.log("Home: Đã lấy thông tin ảnh", image);
  return <div>Vị trí dành cho ảnh mèo</div>;
}
```

Code này gọi The Cat API khi có truy cập vào trang và hiển thị kết quả ra console.

(2) `await connection()` là để thực hiện gọi hàm `fetchImage` tại thời điểm request. Next.js có tính năng static site generation (SSG) để tạo trang tại thời điểm build. Nếu không có `await connection()` và build app, hàm `fetchImage` sẽ được thực thi tại thời điểm build và ảnh bị cố định. Kết quả là khi reload browser trong runtime, ảnh sẽ không thay đổi.

Vì yêu cầu của app này là muốn hiển thị ảnh khác khi reload browser, nên chúng ta gọi [`connection`](https://nextjs.org/docs/app/api-reference/functions/connection). Tham khảo, hiện tại đang ở development mode với `npm start dev`, nên dù không có `connection` thì reload vẫn thay đổi ảnh.

(3) là phần gọi hàm `fetchImage`. Vì hàm này là hàm bất đồng bộ nên gọi bằng `await` keyword. Trong JavaScript, để sử dụng `await` keyword, cần thêm `async` keyword vào hàm. Nếu quên điều này sẽ xảy ra lỗi. (1) thêm `async` keyword là vì lý do đó.

(4) là phần hiển thị data đã lấy ra console. Đây là code tạm thời để xác nhận "data có được lấy đúng không" trong quá trình implement. Sau này sẽ thay thế bằng xử lý hiển thị ảnh.

Bây giờ, hãy mở developer tools của browser và kiểm tra console. Click chuột phải trong browser và chọn "Inspect" hoặc "Developer tools", rồi chọn tab "Console".

Console sẽ hiển thị "Home: Đã lấy thông tin ảnh". Đây là message output bằng `console.log`.

![Màn hình ứng dụng Next.js. Phía trên hiển thị "Vị trí dành cho ảnh mèo", nửa dưới mở Chrome DevTools console, output log chứa URL và size của ảnh mèo](/tutorials/nextjs/nextjs-cat-placeholder-console-log.png)

Log hiển thị "Server". Điều này là do `Home` được thực thi ở phía server. Điều này sẽ được giải thích chi tiết sau, tạm thời đừng bận tâm.

## Thêm type cho return value của hàm

Type của `image` là `any`. `any` type là type "không thực hiện type check". Do đó, có nguy cơ xảy ra bug mà không nhận ra khi tham chiếu property không tồn tại.

[any](../reference/values-types-variables/any.md)

```tsx twoslash {5,7} title="app/page.tsx"
// @filename: fetch-image.ts
export declare function fetchImage(): Promise<any>;
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
import { fetchImage } from "./fetch-image";

export default async function Home() {
  // Lấy ảnh từ API
  const image = await fetchImage();
  //    ^?
  // Hiển thị URL ảnh ra console
  console.log("Home: Đã lấy thông tin ảnh", image.name); // Đang tham chiếu property name không tồn tại
  return <div>Vị trí dành cho ảnh mèo</div>;
}
```

`image` không có property `name`, nhưng vì `image` là `any` type nên dù viết code sai như trên, TypeScript cũng không cảnh báo gì.

Xử lý API response là nơi dễ xảy ra bug trong frontend, nên chúng ta sẽ chỉ định type để xử lý API response một cách an toàn.

Định nghĩa type cho thông tin ảnh trong response là `Image`. Và type annotation return value của hàm `fetchImage` là `Promise<Image>`.

```tsx twoslash {1-4,7-8} title="app/fetch-image.ts"
// Định nghĩa type cho thông tin ảnh
type Image = {
  url: string;
};

// Hàm lấy ảnh từ API
export async function fetchImage(): Promise<Image> {
  //                              ^^^^^^^^^^^^^^^^Thêm type annotation
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: Đã lấy thông tin ảnh", images);
  return images[0]; // Trả về phần tử đầu tiên từ array thông tin ảnh
}
```

API response chứa các property khác ngoài `url`, nhưng vì thông tin cần thiết cho ứng dụng này chỉ là `url`, nên chúng ta bỏ qua định nghĩa type cho các property khác. Nếu sau này cần các property khác, chỉ cần thêm định nghĩa property vào `Image`.

Khi return value của hàm `fetchImage` được type annotation đúng, nếu vô tình viết code tham chiếu property không tồn tại trong API response, TypeScript sẽ cảnh báo nên có thể nhận ra vấn đề.

```tsx twoslash {2-3,5} title="app/page.tsx"
// @errors: 2339
export default async function Home() {
  // Lấy ảnh từ API
  const image = await fetchImage();
  //    ^?
  // Hiển thị URL ảnh ra console
  console.log("Home: Đã lấy thông tin ảnh", image.name); // Đang tham chiếu property name không tồn tại
  return <div>Vị trí dành cho ảnh mèo</div>;
}
// ---cut-after---
export declare function fetchImage(): Promise<Image>;
type Image = {
  url: string;
};
```

:::info Check response nghiêm ngặt

Code ở trên là code tin tưởng 100% cấu trúc data mà API trả về. Nó ngầm giả định rằng kết quả parse JSON string có cấu trúc như sau:

- Là array
- Phần tử của array là object
- Object đó có property `url`
- Giá trị của property `url` là string

Tùy trường hợp, có thể API không đáng tin cậy. Để an toàn hơn, TypeScript cũng có thể thêm xử lý check API response. Nếu thêm xử lý check vào hàm `fetchImage`, sẽ như sau:

```ts twoslash
// @noErrors
type Image = {
  url: string;
};
// ---cut---
// Hàm lấy ảnh từ API
export async function fetchImage(): Promise<Image> {
  //                              ^^^^^^^^^^^^^^^^type annotation
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  //            ^^^^^^^Dùng unknown type để không thành any type
  console.log("Đã lấy thông tin ảnh", images);
  if (!isImageArray(images)) {
    throw new Error("Data lấy được không đúng");
  }
  if (!images[0]) {
    throw new Error("Data lấy được rỗng");
  }
  return images[0]; // Trả về phần tử đầu tiên từ array thông tin ảnh
}

// Hàm check xem có phải array của Image type không
function isImageArray(value: unknown): value is Image[] {
  // value là array
  if (!Array.isArray(value)) {
    return false;
  }
  // Tất cả phần tử của array đều là Image type
  if (!value.every(isImage)) {
    return false;
  }
  return true;
}

// Hàm check xem có phải Image type không
function isImage(value: unknown): value is Image {
  // value là object
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // value có field url
  if (!("url" in value)) {
    return false;
  }
  // field url là string
  if (typeof (value as Image).url !== "string") {
    return false;
  }
  return true;
}
```

Xử lý check này cũng sử dụng các kỹ thuật TypeScript như [unknown type](../reference/statements/unknown.md) để type an toàn cho value không rõ type, và [type guard function](../reference/functions/type-guard-functions.md) để type value trong khi check type. Bạn không cần hiểu những điều này ở đây, nhưng nếu quan tâm hãy xem giải thích sau khi hoàn thành tutorial.

Sample code ở trên là cách viết tăng tính an toàn chỉ bằng tính năng TypeScript. Như bạn thấy đó là code có tính thủ tục, và có thể cảm thấy "phải viết nhiều code như vậy để tăng type safety à". Để giải quyết vấn đề này, cũng có thể sử dụng các thư viện check type declarative như [zod](https://zod.dev/), [valibot](https://valibot.dev/), [typebox](https://github.com/sinclairzx81/typebox). Nếu quan tâm hãy xem thử.

Không có tiêu chuẩn rõ ràng về việc xử lý check nên nghiêm ngặt đến đâu. Check thì tăng tính an toàn, nhưng chi phí implement bảo trì tăng, và cũng ảnh hưởng đến performance runtime. Cân bằng là quan trọng trong thực tế. Và TypeScript là ngôn ngữ có thể linh hoạt đối ứng dù đặt cân bằng ở đâu.
:::

## Hiển thị ảnh khi hiển thị trang

Đã có thể lấy data ảnh, ở đây chúng ta sẽ viết xử lý hiển thị ảnh mèo khi hiển thị trang.

Đầu tiên, tạo React component để hiển thị ảnh. Tạo file mới `app/cat-image.tsx` và viết code sau.

```tsx twoslash title="app/cat-image.tsx"
// Định nghĩa argument của component
type CatImageProps = {
  url: string;
};

// Component hiển thị ảnh
export function CatImage({ url }: CatImageProps) {
  return (
    <div>
      <img src={url} />
    </div>
  );
}
```

Component `CatImage` này nhận property `url` và sử dụng URL đó để hiển thị ảnh mèo.

Tiếp theo, chỉnh sửa `app/page.tsx` như sau để sử dụng component hiển thị ảnh mèo.

```tsx twoslash {1,7-8} title="app/page.tsx"
// @filename: fetch-image.ts
type Image = {
  url: string;
};
export declare function fetchImage(): Promise<Image>;
export {};
// @filename: cat-image.tsx
type CatImageProps = {
  url: string;
};
export declare function CatImage({ url }: CatImageProps): JSX.Element;
export {};
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
import { CatImage } from "./cat-image"; // Thêm
import { fetchImage } from "./fetch-image";

export default async function Home() {
  // Lấy ảnh từ API
  const image = await fetchImage();
  // Truyền URL ảnh
  return <CatImage url={image.url} />;
}
```

Import component `CatImage` và sử dụng trong component `Home`. Bằng cách truyền property `url` cho component `CatImage`, ảnh mèo sẽ được hiển thị.

Sau khi thay đổi `page.tsx` xong, hãy xác nhận ảnh mèo có hiển thị không. Ảnh có hiển thị đúng không?

![Màn hình browser ngay sau khi hiển thị trang trong ứng dụng Next.js. Nhờ component CatImage đã implement, ảnh 2 con mèo đang xem TV hiển thị toàn màn hình](/tutorials/nextjs/nextjs-cat-image-display-result.png)

## Làm cho ảnh cập nhật khi click button

Trong section này, không chỉ load ảnh khi hiển thị trang, mà chúng ta implement tính năng khi user click button "Xem mèo khác" sẽ lấy ảnh mèo mới và hiển thị.

Chỉnh sửa `app/cat-image.tsx` như sau.

```tsx twoslash {1,11-12,14-19,23-26} title="app/cat-image.tsx"
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
"use client"; // (1) Chỉ định use client

import { useState } from "react"; // Thêm
import { fetchImage } from "./fetch-image";

type CatImageProps = {
  url: string;
};

export function CatImage({ url }: CatImageProps) {
  // (2) Quản lý state bằng useState
  const [imageUrl, setImageUrl] = useState(url);

  // (3) Định nghĩa hàm lấy ảnh
  const refreshImage = async () => {
    setImageUrl(""); // Khởi tạo
    const image = await fetchImage();
    setImageUrl(image.url);
  };

  return (
    <div>
      {/* (4) Hiển thị button */}
      <button onClick={refreshImage}>Xem mèo khác</button>
      {/* (5) Hiển thị ảnh */}
      {imageUrl && <img src={imageUrl} />}
    </div>
  );
}
// ---cut-after---
// @filename: fetch-image.ts
type Image = {
  url: string;
};
export declare function fetchImage(): Promise<Image>;
export {};
```

Hãy xem từng thay đổi một.

```ts
// (2) Quản lý state bằng useState
const [imageUrl, setImageUrl] = useState<string>(url);
```

`useState` là một trong các hook của React, là cơ chế để quản lý state trong component. State là giá trị ảnh hưởng đến hiển thị của component, là data có thể thay đổi do thao tác của user hoặc xử lý bất đồng bộ.

Phân tích `const [imageUrl, setImageUrl] = useState(url);`:

- `imageUrl` là biến state, giữ URL của ảnh mèo hiện tại.
- `setImageUrl` là hàm để cập nhật state. Gọi hàm này có thể thay đổi giá trị `imageUrl`.
- Truyền `url` làm giá trị ban đầu cho `useState`.

Khi state `imageUrl` thay đổi, React sẽ re-render component. Nghĩa là component `CatImage` sẽ được hiển thị lại trên màn hình phản ánh state mới. Do đó, chỉ cần gọi `setImageUrl` khi lấy URL ảnh, ảnh mới sẽ tự động hiển thị.

`useState` là tính năng phía client, nên cần thêm directive `"use client"` ở đầu component. Chi tiết sẽ được mô tả sau.

```ts
// (3) Định nghĩa hàm lấy ảnh
const refreshImage = async () => {
  setImageUrl(""); // Khởi tạo
  const image = await fetchImage();
  setImageUrl(image.url);
};
```

Ở đây chúng ta thêm hàm bất đồng bộ `refreshImage`. Hàm này thực hiện xử lý lấy lại ảnh. Thêm `async` keyword là vì đang `await` `fetchImage` trong hàm. Lý do viết `refreshImage` trong hàm `CatImage` là để sử dụng hàm `setImageUrl`.

Hãy xem chi tiết trong hàm. Đầu tiên, `setImageUrl("")` khởi tạo URL ảnh. Điều này để cải thiện trải nghiệm user. Nếu không khởi tạo, ảnh cũ sẽ tiếp tục hiển thị cho đến khi lấy lại xong. Như vậy, dù click button cũng không có thay đổi về mặt giao diện. User có thể thắc mắc "Click có thực sự có hiệu lực không?". Bằng cách khởi tạo, có thể truyền đạt trực quan trạng thái "đang load ảnh mới". Đặc biệt khi response chậm, bước này trở nên quan trọng.

Khi gọi `setImageUrl(image.url)`, biến state `imageUrl` được cập nhật và component re-render. Sử dụng giá trị `imageUrl` mới, phần `{imageUrl && <img src={imageUrl} />}` trong JSX được đánh giá lại và ảnh mèo mới hiển thị trên màn hình.

Nghĩa là chỉ cần gọi hàm `refreshImage` này là có thể gây ra thay đổi trực quan "thay đổi ảnh mèo trên màn hình thành ảnh mới".

<!--prettier-ignore-->
```ts
{/* (4) Hiển thị button */}
<button onClick={refreshImage}>Xem mèo khác</button>
```

Sử dụng attribute `onClick={refreshImage}` của JSX để liên kết sự kiện click button với hàm `refreshImage`. Với viết này, khi user click button, hàm `refreshImage` sẽ được gọi.

<!--prettier-ignore-->
```ts
{/* (5) Hiển thị ảnh */}
{imageUrl && <img src={imageUrl} />}
```

Code này sử dụng kỹ thuật "conditional rendering" để chuyển đổi hiển thị và ẩn ảnh. Đây là cú pháp JSX sử dụng toán tử logic `&&`, hoạt động như sau:

1. Nếu `imageUrl` là chuỗi rỗng, vế trái được xem là "falsy", vế phải `<img>` không được đánh giá. Do đó, không hiển thị gì.
2. Nếu `imageUrl` không phải chuỗi rỗng, vế trái được xem là "truthy", vế phải `<img>` được đánh giá. Do đó, ảnh hiển thị.

Nhờ đó, trong khi `imageUrl` là chuỗi rỗng thì ảnh không hiển thị, khi URL ảnh được lấy từ API và state được cập nhật bằng `setImageUrl` thì ảnh hiển thị.

:::info JSX không thể viết statement

Nhìn điều kiện phân nhánh ở trên, bạn có thể thắc mắc "Tại sao không dùng if statement đơn giản?". Có lý do cho điều này. Phần được bao bởi `{}` trong JSX chỉ có thể viết expression JavaScript. if là statement nên không thể sử dụng. Nếu cố sử dụng sẽ bị compile error như ví dụ sau.

```tsx title="Không thể dùng statement trong expression JSX"
<div>{if (imageUrl) { <img src={imageUrl} /> }}</div>
```

Do đó, để phân nhánh điều kiện trong expression JSX, cần sử dụng toán tử logic hoặc toán tử ba ngôi.

```tsx twoslash
declare const imageUrl: string;
// ---cut---
<div>
  {imageUrl && <img src="..." />} ── Toán tử AND logic
  {!imageUrl || <img src="..." />} ── Toán tử OR logic
  {imageUrl ? <img src="..." /> : "Đang tải"} ── Toán tử ba ngôi
</div>;
```

Tham khảo, trong JavaScript, pattern sử dụng toán tử logic thay cho if statement được gọi là [short-circuit evaluation](/reference/jsx#%E7%9F%AD%E7%B5%A1%E8%A9%95%E4%BE%A1).

:::

Bây giờ khi click sẽ cập nhật ảnh. Hãy xác nhận xem có hoạt động đúng trong browser không.

<video width="600" controls="controls" loop="controls" autoPlay="autoplay" muted="muted" playsInline="playsinline" aria-label="Demo ứng dụng Next.js. Ngay sau khi load trang hiển thị ảnh mèo, user click button 'Xem mèo khác' thì ảnh biến mất một lúc rồi thay bằng ảnh mèo mới" src="/tutorials/nextjs/nextjs-cat-image-refresh-demo.mp4"></video>

## Tính năng server-side của Next.js

Ở đây chúng ta giải thích về tính năng server-side của Next.js đã bỏ qua giải thích. Đặc biệt, muốn trả lời các thắc mắc đã hoãn lại sau.

- Component `Home` được thực thi ở server nghĩa là gì?
- Tại sao tính năng client-side cần chỉ định `"use client"`?

Nhìn lại lịch sử, React ra đời như một library client-side chỉ chạy trên browser. Ban đầu vì giải quyết được nhiều vấn đề trong việc xây dựng UI phía client nên được sử dụng rộng rãi.

Tuy nhiên, cũng có những vấn đề không thể giải quyết chỉ bằng client-side. Đặc biệt là vấn đề SEO (Search Engine Optimization) và tốc độ hiển thị ban đầu. Để giải quyết những vấn đề này, React đã có các tính năng như server-side rendering (SSR) và static site generation (SSG).

Next.js không chỉ dễ dàng implement SSR và SSG, mà còn trở nên phổ biến như framework dễ truy cập data phía server sử dụng API route. Đến đây, Next.js và React không còn chỉ là "Web API client" đơn thuần, việc liên kết seamless với server-side trở thành điều đương nhiên.

Next.js gần đây hỗ trợ mạnh mẽ tính năng server-side.

- Server component (tính năng render React component ở phía server)
- API route (tính năng tạo server-side API đơn giản)
- Server action (tính năng thực thi xử lý phía server theo thao tác user như submit form)
- Middleware (tính năng xen xử lý giữa request và response)
- Static site generation

Sử dụng các tính năng này, có thể dễ dàng làm những điều sau:

- Cải thiện performance khi load ban đầu
- Tăng cường SEO (Search Engine Optimization)
- Tăng cường security (có thể sử dụng thông tin bí mật như API key mà không công khai cho client)
- Implement authentication và authorization
- Truy cập trực tiếp database từ server-side

Trong tutorial này, chúng ta tập trung giải thích "Server component" - tính năng thường dùng nhất trong các tính năng server-side.

Có "Server component" nghĩa là cũng có "Client component". Đầu tiên hãy xem đặc điểm của 2 loại này.

## Client component

Client component là React component được thực thi trên browser. Bằng cách viết directive `"use client"` ở đầu file, xác định rõ component trong file đó là client component. Component `CatImage` đã tạo trong tutorial này là client component.

Đặc điểm của client component như sau:

1. Có thể đối ứng các thao tác như click hay input bằng `useState` hay `useEffect`.
2. Có thể sử dụng browser-only API như `window` hay `document`.
3. Có thể giữ state của UI trong component

Trong component `CatImage` đã tạo trong tutorial này, chúng ta implement giữ URL ảnh bằng `useState` và xử lý cập nhật ảnh khi click button. Đây là những điểm tận dụng đặc điểm của client component.

## Server component

Server component là React component được render trên server. Khi định nghĩa component không có `"use client"`, nó sẽ thành server component. Component `Home` đã tạo ở trên là server component.

:::info Đặc điểm của server component

Server component có một số đặc điểm mà client component không có.

1. **Có thể truy cập resource trên server**
   Có thể sử dụng trực tiếp database, file system, internal API không công khai trên internet.
2. **Có thể xử lý thông tin bí mật một cách an toàn**
   Trong client component, nếu bao gồm thông tin bí mật như API key, có nguy cơ bị xem bằng developer tools của browser. Trong server component, chỉ kết quả gọi API được gửi đến client nên có thể sử dụng thông tin bí mật một cách an toàn.
3. **Có lợi cho SEO**
   Client component có trường hợp nội dung không được bao gồm trong HTML, nên search engine có thể không hiểu nội dung trang. Server component vì nội dung được render trên server nên có lợi cho SEO.
4. **Có thể tối ưu hóa giao tiếp API**
   Khi lấy data phía client, nếu nhiều user truy cập đồng thời, các API request trùng lặp cho cùng data có thể gây tải lớn cho backend server. Trong server component, lấy data phía server và kết hợp với tính năng cache của Next.js có thể tối ưu hóa việc lấy data. Nhờ đó, tải backend giảm và trải nghiệm user cũng cải thiện.
5. **Cải thiện tốc độ hiển thị ban đầu**
   Server component vì được render trên server, thời gian đến khi HTML ban đầu được gửi đến client được rút ngắn. Nhờ đó, thời gian chờ đợi cho đến khi user xem được trang được rút ngắn và trải nghiệm user cải thiện.

:::

## Sử dụng server action

Vì giải thích nhiều quá nên chán, từ đây hãy quay lại coding. Hàm `fetchImage` đã tạo ở trên được gọi từ cả server component `Home` và client component `CatImage`.

Ở đây không nảy sinh thắc mắc sao? Thắc mắc "`fetchImage` được thực thi ở server-side hay client-side?". Đáp án là "cả hai". `fetchImage` khi được gọi từ `Home` thì thực thi ở server-side, khi được gọi từ `CatImage` thì thực thi ở client-side.

Hãy thử làm cho nó luôn được thực thi ở server-side. Thêm directive `"use server"` ở đầu `fetch-image.ts`. Nhờ đó, hàm `fetchImage` sẽ luôn được thực thi ở server-side.

```tsx twoslash {1} title="app/fetch-image.ts"
"use server"; // Thêm

// Định nghĩa type cho thông tin ảnh
type Image = {
  url: string;
};

// Hàm lấy ảnh từ API
export async function fetchImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: Đã lấy thông tin ảnh", images);
  return images[0]; // Trả về phần tử đầu tiên từ array thông tin ảnh
}
```

Hàm được chỉ định `"use server"` như vậy sẽ được thực thi ở server-side. Hàm như vậy được gọi là "server action". Server action có thể được gọi từ client component một cách seamless như thể là hàm client-side.

Hãy kiểm tra network trong developer tools của browser. Bạn có thể thấy khi click button "Xem mèo khác", giao tiếp phát sinh là đến `localhost`.

Ngoài ra, terminal đang chạy `npm run dev` sẽ hiển thị log server-side "fetchImage: Đã lấy thông tin ảnh". Điều này xác nhận hàm `fetchImage` đang được thực thi ở server-side.

## Sử dụng API key

The Cat API là API có thể sử dụng mà không cần API key. Tuy nhiên, API sử dụng trong ứng dụng thực tế thường cần API key. Ở đây chúng ta học cách sử dụng API key trong Next.js để có kỹ năng áp dụng trong thực tế.

Trong Next.js, thường quản lý API key bằng biến môi trường. Biến môi trường được định nghĩa trong file `.env`. Ví dụ, chúng ta sẽ sử dụng biến môi trường tên `CAT_API_KEY`. Tạo file `.env` ở thư mục root của project và viết như sau.

```bash title=".env"
CAT_API_KEY=DEMO_KEY
```

Tiếp theo, thêm code để load biến môi trường. Tạo file `app/env.ts` và viết như sau.

```ts twoslash title="app/env.ts"
if (!process.env.CAT_API_KEY) {
  throw new Error("Biến môi trường CAT_API_KEY chưa được set");
}

export const CAT_API_KEY = process.env.CAT_API_KEY;
```

Cuối cùng, chỉnh sửa `fetch-image.ts` như sau.

```tsx twoslash {3,10-12} title="app/fetch-image.ts"
// @filename: fetch-image.ts
// ---cut---
"use server";

import { CAT_API_KEY } from "./env"; // Thêm

type Image = {
  url: string;
};

export async function fetchImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search", {
    headers: { "x-api-key": CAT_API_KEY }, // Thêm
  });
  const images = await res.json();
  console.log("fetchImage: Đã lấy thông tin ảnh", images);
  return images[0];
}
// ---cut-after---
// @filename: env.ts
export declare const CAT_API_KEY: string;
```

Bằng cách quản lý API key như biến môi trường như vậy, không cần viết trực tiếp API key vào source code.

## Hoàn thiện visual

Phần chức năng đã hoàn thành, cuối cùng hãy hoàn thiện visual design. Chúng ta sẽ làm ứng dụng hấp dẫn hơn trong khi tận dụng cấu trúc server component và client component đã implement.

Đầu tiên, tạo stylesheet. Vì nội dung stylesheet dài, hãy download stylesheet từ URL sau. Sau khi download, lưu dưới tên `page.module.css` trong thư mục `app`.

<https://raw.githubusercontent.com/yytypescript/random-cat/main/app/page.module.css>

```bash
cd app
curl https://raw.githubusercontent.com/yytypescript/random-cat/main/app/page.module.css > page.module.css
```

Trong Next.js, cả server component và client component đều có thể sử dụng CSS module. File kết thúc bằng `.module.css` được gọi là CSS Modules, tên class định nghĩa trong file CSS có thể được tham chiếu như object từ TypeScript.

Ở đây chúng ta áp dụng style cho client component trong `cat-image.tsx`. Đầu tiên, để sử dụng CSS module cần 2 bước sau:

1. Import: Thêm dòng `import styles from "./page.module.css";` để import CSS module. Nhờ đó có thể truy cập tên class CSS thông qua object `styles`.
2. className attribute: Áp dụng style cho element JSX với format `className={styles.className}`. Ví dụ nếu chỉ định `<div className={styles.page}>`, style của class `.page` trong file CSS sẽ được áp dụng cho element `div` đó.

Lợi ích của phương pháp này là tránh xung đột tên class. CSS module nội bộ chuyển đổi tên class thành giá trị unique, nên dù sử dụng cùng tên class trong component khác cũng không có vấn đề.

```tsx twoslash {5,21,22,25,26} title="app/cat-image.tsx"
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
"use client";

import { useState } from "react";
import { fetchImage } from "./fetch-image";
import styles from "./page.module.css"; // Thêm

type CatImageProps = {
  url: string;
};

export function CatImage({ url }: CatImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(url);

  const refreshImage = async () => {
    setImageUrl(""); // Khởi tạo
    const image = await fetchImage();
    setImageUrl(image.url);
  };

  return (
    <div className={styles.page}>
      <button onClick={refreshImage} className={styles.button}>
        Xem mèo khác
      </button>
      <div className={styles.frame}>
        {imageUrl && <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
}
// ---cut-after---
// @filename: fetch-image.ts
type Image = {
  url: string;
};
export declare function fetchImage(): Promise<Image>;
export {};
```

Vậy là việc phát triển trình tạo ảnh mèo sử dụng Next.js đã hoàn thành.

![Preview design cuối cùng của ứng dụng Next.js. Ở giữa trang nền trắng có ảnh mèo con lông vàng được bao bởi khung đen, phía trên có button kiểu bong bóng "Xem mèo khác"](/tutorials/nextjs/nextjs-styled-cat-image-page.png)

## Production build và thực thi

Trong Next.js, thực thi `next build` có thể tạo code production đã được tối ưu hóa, và `next start` có thể thực thi code production đã tạo. Tutorial này sử dụng boilerplate nên đã có sẵn lệnh `build` và `start` trong `package.json`. Hãy thực thi `npm run build` và `npm run start` để chạy ứng dụng production.

```sh
npm run build
npm run start
```

Sau khi khởi động ứng dụng, truy cập <http://localhost:3000> bằng browser để xác nhận ứng dụng production đang chạy.
