# Tạo nút Like với React

Trong tutorial này, sử dụng cả TypeScript và React, chúng ta sẽ implement UI "nút Like" thường thấy trên SNS.

Tutorial này tập trung vào trải nghiệm coding với TypeScript và React. Do đó, giải thích lý thuyết về TS và React được bỏ qua. Mục đích là để bạn cảm nhận "Quy trình phát triển UI với TypeScript và React như thế nào".

So với sách chuyên về React, giải thích trong sách này kém chi tiết và chính xác hơn. Tuy nhiên, để người lần đầu tiếp xúc với React cũng có thể đọc được, chúng tôi sẽ giải thích từng điểm về React, nên hãy yên tâm đọc.

Thành phẩm cuối cùng của nút Like được tạo trong tutorial này có thể xác nhận tại [demo site](https://like-button.typescriptbook.jp). Bằng cách thử trước khi bắt đầu tutorial, bạn sẽ dễ hình dung implementation ở mỗi bước đang làm gì. Ngoài ra, source code hoàn chỉnh có thể xem tại [GitHub](https://github.com/yytypescript/like-button).

## React là gì?

React là package do Facebook phát triển để tạo UI cho web application. Chỉ với JavaScript hoặc TypeScript cũng có thể implement UI interactive. Tuy nhiên, khi UI trở nên phức tạp, không có React thì lượng code tăng lên, khả năng đọc kém đi và độ khó tăng lên. Đặc biệt, việc quản lý trạng thái UI hiện tại như thế nào đôi khi trở nên phức tạp vượt quá khả năng nắm bắt của programmer. Sử dụng React, có thể viết UI phức tạp và interaction một cách ngắn gọn dễ đọc, và việc quản lý trạng thái cũng trở nên dễ hiểu hơn.

## 3 đặc điểm lớn của React

React là package có những đặc điểm gì? Ở đây chúng tôi giải thích đặc điểm của React chia thành 3 phần. Những ai muốn có một chút kiến thức sơ bộ về React, hãy đọc phần này. Những ai muốn viết code ngay, có thể bỏ qua phần này cũng không sao.

### Đặc điểm 1: Virtual DOM

React áp dụng khái niệm virtual DOM. Để hiểu virtual DOM, cần biết DOM không phải virtual - DOM thông thường là gì. DOM (document object model) là cơ chế tham chiếu và thao tác HTML từ JavaScript. Nhờ điều này, có thể xử lý HTML như object thay vì thao tác string. DOM giống như API để thao tác HTML.

Khi programmer thao tác DOM, HTML được viết lại gián tiếp, và kết quả được render lên màn hình. Nhiều UI động được tạo thành từ thao tác DOM.

```js twoslash
// Ví dụ thao tác DOM đổi màu chữ của <input id="email"> thành đỏ
const emailInput = document.getElementById("email");
emailInput.style.color = "red";
```

DOM không nhất thiết là API dễ sử dụng cho programmer. Với ví dụ trên như thay đổi style một chút thì còn thực dụng. Tuy nhiên, khi cố tạo UI phức tạp thì trở nên khó khăn ngay. Nếu không implement cẩn thận, dễ tạo ra bug như quên thay đổi hiển thị hoặc trạng thái. Cách thao tác không tốt cũng có thể gây vấn đề về performance.

Virtual DOM giống như proxy của real DOM. So với real DOM, nó được thiết kế để khó gây bug trong quản lý trạng thái hơn. Thêm vào đó, về mặt performance, nó cũng tối ưu hóa xử lý rendering. Với programmer, không cần sự cẩn thận như khi xử lý real DOM. Nếu muốn thay đổi hiển thị màn hình, thao tác virtual DOM. Thay đổi xảy ra ở virtual DOM được truyền đến real DOM và xuất hiện trên màn hình. Virtual DOM có thể nói là cơ chế để implement UI phức tạp mà không cần vất vả.

### Đặc điểm 2: Declarative UI

Đặc điểm thứ 2 của React là có thể viết UI theo cách declarative. Nếu implement UI mà không dùng React, code sẽ trở nên imperative. Trong code imperative, ngay cả khi muốn hiển thị gì đó, cần viết chi tiết phần how - làm thế nào để hiển thị.

Hãy xem cách viết khác nhau giữa code imperative và declarative để hiển thị HTML list đơn giản sau.

```html
<ul>
  <li>Táo</li>
  <li>Cam</li>
  <li>Nho</li>
</ul>
```

Đầu tiên, với code imperative sẽ như sau.

```js twoslash
const list = document.createElement("ul");
const apple = document.createElement("li");
apple.innerText = "Táo";
list.append(apple);
const orange = document.createElement("li");
orange.innerText = "Cam";
list.append(orange);
const grape = document.createElement("li");
grape.innerText = "Nho";
list.append(grape);
```

Nếu viết lại xử lý này bằng tiếng Việt sẽ như sau.

- Tạo element `ul`, gán vào biến `list`
- Tạo element `li`, gán vào biến `apple`
- Text của `apple` là "Táo"
- Thêm `apple` vào `list`
- Tạo element `li`, gán vào biến `orange`
- Text của `orange` là "Cam"
- Thêm `orange` vào `list`
- ...

Ngay cả list đơn giản của 3 loại trái cây cũng phải mô tả chi tiết làm như thế nào. Chỉ nhìn điều này, có lẽ bạn không nghĩ viết UI theo cách imperative là dễ dàng và việc bảo trì cũng không phải cách viết mong muốn.

Bây giờ hãy xem cách viết declarative. Sau đây là cách viết trong React.

```js twoslash
function Fruits() {
  return (
    <ul>
      <li>Táo</li>
      <li>Cam</li>
      <li>Nho</li>
    </ul>
  );
}
```

Như bạn thấy, không có phần làm thế nào để hiển thị, chỉ có mục tiêu "muốn hiển thị như thế này" được viết.

Với declarative UI, không cần quan tâm đến chi tiết implementation hay algorithm. Có thể tập trung viết code chỉ vào một điểm "muốn UI như thế nào".

### Đặc điểm 3: Component-based

Đặc điểm thứ 3 của React là component-based. Component là các phần của UI. Ví dụ, nhỏ thì là button hay input field, phần lớn hơn là form, phần lớn hơn nữa là page cũng là component.

React có tư tưởng kết hợp các component nhỏ để tạo thành application lớn. Đây là lý do React được gọi là component-based.

Lợi ích của component-based là có thể tái sử dụng cùng một component. Ví dụ, nếu tạo một button component, có thể sử dụng lại nó ở nhiều nơi trong application. Programmer không cần viết cùng code nhiều lần, hiệu quả phát triển tốt hơn.

Thêm vào đó, nhiều component open source cũng được công bố. Programmer không cần tự tạo component từ đầu, cũng có thể sử dụng component đã được công bố. Các component phức tạp như calendar UI tự làm thì phiền phức cũng được công bố phong phú về chủng loại, nên developer sử dụng component open source có thể tạo application dễ dàng hơn.

## Những thứ cần thiết cho tutorial này

Để thực hiện tutorial này, cần có một số tool. Hãy chuẩn bị trước những thứ được liệt kê ở đây.

- Node.js (Tutorial này được xác nhận hoạt động với v22.16.0)
- NPM (Được xác nhận hoạt động với v10.8.2)
- Editor như VS Code hoặc WebStorm

## Tạo project

Đầu tiên, tạo template React project bằng lệnh `npm create`.

```sh
npm create vite@latest like-button -- --template react-swc-ts
```

Sau khoảng 1 phút, việc tạo template hoàn tất. Thư mục `like-button` được tạo, chạy lệnh sau để di chuyển vào thư mục đó, bạn sẽ thấy template đã được tạo.

```sh
cd like-button
```

```text title="Cấu trúc thư mục sau khi tạo"
.
├── eslint.config.js
├── index.html
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Sau khi di chuyển vào thư mục template, chạy lệnh sau để install các dependency package như library.

```sh
npm install
```

Chạy lệnh này sẽ install React. Để xác nhận version React đã install, dùng lệnh sau.

```sh
npm list react
```

```text title="Kết quả chạy npm list react"
like-button@0.0.0 /Users/test/like-button
├─┬ react-dom@18.3.1
│ └── react@18.3.1 deduped
└── react@18.3.1
```

Chạy lệnh sau trong thư mục này sẽ khởi động React local development server.

```sh
npm run dev
```

Khi chạy lệnh, message sau sẽ hiển thị. Mở URL hiển thị ở đây trong browser, bạn có thể xác nhận trạng thái của template app.

```text title="Kết quả chạy npm run dev"
  VITE v5.4.10  ready in 262 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

![Trang starter Vite + React với logo Vite và React hiển thị, count là 0](react-like-button-tutorial/screen1.png)

<!-- TODO: Thay thế hình trên -->

Để dừng React local development server, nhấn <kbd>Ctrl</kbd> + <kbd>C</kbd>. Nhấn đồng thời phím <kbd>Ctrl</kbd> và phím <kbd>C</kbd> có thể ngắt lệnh.

Từ đây chúng ta sẽ thực sự viết code, nên hãy mở project like-button đã tạo trong editor yêu thích của bạn.

Trang trên ở trạng thái ban đầu của template là nội dung của src/App.tsx được render. Hãy thử thay đổi src/App.tsx. Thay thế toàn bộ App.tsx thành nội dung sau.

```tsx twoslash title="src/App.tsx"
// @noErrors
import "./App.css";

function App() {
  return (
    <>
      <h1>TypeScript tuyệt vời</h1>
    </>
  );
}

export default App;
```

:::tip Giải thích: .tsx là gì? Có thể viết HTML trong TypeScript?

Nhìn App.tsx, bạn có thể có câu hỏi như vậy. Phần trông giống HTML này được gọi là JSX. JSX là ngôn ngữ mở rộng của JavaScript, cho phép viết XML trực tiếp trong JavaScript. XML và HTML về mặt nghiêm ngặt thì khác nhau, nhưng ở đây hãy coi chúng giống nhau.

Khi cố implement UI, bạn sẽ viết code liên quan chặt chẽ với HTML, nhưng nếu cố biểu diễn HTML chỉ bằng cú pháp JavaScript, khả năng đọc thường kém. React đã giải quyết vấn đề khả năng đọc bằng cách áp dụng JSX. JSX có thể viết HTML gần như nguyên vẹn, nên code có khả năng đọc cao.

TypeScript và JSX ban đầu là ngôn ngữ không liên quan, nhưng vì tiện lợi cho developer, TypeScript cũng có thể viết JSX.

File JavaScript viết JSX có extension .jsx. Tương tự, file TypeScript có extension .tsx.

:::

[JSX](../reference/jsx/README.md)

Sau khi thay đổi, save file và kiểm tra trong browser. Nếu text bạn viết hiển thị trong browser là OK.

![Screenshot trang web hiển thị text "TypeScript tuyệt vời"](react-like-button-tutorial/screen2.png)

## Tạo chỗ đặt button

Từ đây, chúng ta sẽ thực sự tạo nút like. Đầu tiên, tạo nơi để implement nút like.

Đầu tiên, thay đổi chỗ vừa viết "TypeScript tuyệt vời" thành `<LikeButton />`. Tiếp theo, tạo hàm `LikeButton`. Hãy làm cho code trông như sau.

```tsx twoslash {6,11-13} title="src/App.tsx"
import "./App.css";

function App() {
  return (
    <>
      <LikeButton />
    </>
  );
}

function LikeButton() {
  return <span>Vị trí nút like</span>;
}

export default App;
```

Hàm `LikeButton` này là nơi chúng ta sẽ tạo nút like từ bây giờ.

![Screenshot browser window hiển thị text "Vị trí nút like" ở giữa](react-like-button-tutorial/screen3.png)

:::tip Giải thích: Function component

Trong JSX của React, không chỉ có thể sử dụng HTML tag như `div` hay `header`, mà còn có thể sử dụng hàm bạn tự định nghĩa như tag. Hàm `LikeButton` được định nghĩa ở trên là một ví dụ. Chỉ những hàm trả về JSX mới có thể được sử dụng như tag. Trong ví dụ trên, bạn có thể thấy tag `span` là return value.

Hàm có JSX là return value được gọi là "function component" trong thuật ngữ React. Trong phát triển frontend application sử dụng React, việc sử dụng function component tốt là điểm quan trọng. Nếu biến các phần của màn hình thành component, có thể tái sử dụng, thay đổi chỉ cần ở một chỗ, và việc phát triển bảo trì trở nên dễ dàng hơn.

:::

:::tip Giải thích: Self-closing element trong JSX

Như đã viết trước đó, JSX là cú pháp mở rộng của JavaScript, về mặt nghiêm ngặt khác với HTML. Do đó, JSX có cách viết và ràng buộc khác với HTML.

Cách viết như `<LikeButton />` với slash trong tag cũng là cách viết riêng của JSX. Đây được gọi là self-closing element. Đôi khi cũng được gọi là self-closing element, self-contained element. Khi không có child element như `<LikeButton></LikeButton>`, có thể biểu diễn ngắn gọn bằng cách thêm `/` ở cuối như `<LikeButton />`.

Về các khác biệt khác giữa JSX và HTML, hãy tham khảo [tài liệu chính thức của React](https://beta.reactjs.org/learn/writing-markup-with-jsx).

:::

## Tạo visual của button

Đã có chỗ đặt nút like, ở đây chúng ta sẽ thay đổi tag của button, viết CSS, và tạo giao diện của button. Button chúng ta tạo lần này là button đơn giản như hình sau.

![Nút like sẽ implement lần này](react-like-button-tutorial/like1.png)

Đầu tiên, thay đổi text của tag `span` trong hàm `LikeButton` thành `♥ {count}`. `count` này là biến, nên cũng định nghĩa biến đó cùng lúc.

```tsx twoslash {2-3} title="src/App.tsx"
function LikeButton() {
  const count = 999;
  return <span>♥ {count}</span>;
}
```

Biến `count` là giá trị cố định, nhưng sau này sẽ thay đổi để tăng giảm khi click nên bây giờ như thế này là được. Trong JSX, phần được bao bởi `{}` có thể viết biến hoặc expression JavaScript. Ví dụ trên chỉ là tên biến, nhưng expression như `{count + 1}` cũng hợp lệ.

Tiếp theo, để gán CSS class, thêm attribute `className` vào tag `span`.

```tsx twoslash {3} title="src/App.tsx"
function LikeButton() {
  const count = 999;
  return <span className="likeButton">♥ {count}</span>;
}
```

:::tip Giải thích: Không dùng attribute class?

Trong HTML, dùng attribute `class` để chỉ định CSS class, nên bạn có thể ngạc nhiên khi ở đây dùng attribute `className`. Đây là di sản từ thời đầu React khi set giá trị trực tiếp vào DOM property. Trong DOM, attribute `class` của HTML trở thành property `className`. Hiện tại, React không còn set trực tiếp DOM property nữa, nên về mặt kỹ thuật không có lý do phải bị ràng buộc bởi attribute `className`, nhưng team phát triển React có vẻ thận trọng về việc chuyển sang attribute `class`. Vì có thể component đã được tạo cho đến nay sẽ không hoạt động. Ngoài ra, họ cũng không có ý định hỗ trợ cả hai. Vì nếu cả `class` và `className` đều OK sẽ gây nhầm lẫn.

:::

Tiếp theo, viết CSS cho class `likeButton`. Trong React có nhiều cách implement stylesheet, ở đây chúng ta sẽ dùng cách viết CSS trong App.css. Thêm CSS sau vào cuối App.css.

```css title="src/App.css"
.likeButton {
  background-color: rgb(231, 76, 60);
  color: white;
  padding: 0.8rem;
  border-radius: 0.4rem;
  cursor: pointer;
}
```

Sau khi viết nội dung trên vào App.css, hãy kiểm tra trong browser. Nếu style có hiệu lực, hiển thị sẽ như hình sau.

![Screenshot button "like" với icon heart và số "999" trên nền màu đỏ đặt ở giữa browser](react-like-button-tutorial/screen4.png)

:::caution Troubleshooting

App.css được `import` trong App.tsx nên sẽ tự động phản ánh vào style của component `LikeButton` mà không cần làm gì đặc biệt. Nếu style không được phản ánh, hãy xác nhận trong App.tsx có code `import` App.css không.

```tsx twoslash {1} title="src/App.tsx"
import "./App.css"; // Xác nhận có dòng này

function App() {
  // ...
}
```

:::

Đến đây việc tạo visual của button tạm hoàn thành.

## Thêm chức năng cho button

Như thế này, nhấn button cũng không có gì xảy ra. Từ đây, chúng ta sẽ tạo chức năng count up từ 999 lên 1,000 khi nhấn button.

Button hiện tại hiển thị biến `count`, nhưng biến này là giá trị cố định. Để giá trị này có thể thay đổi, sử dụng hàm `useState` của React để React quản lý trạng thái count.

```tsx twoslash {2,13} title="App.tsx"
import "./App.css";
import { useState } from "react"; // Thêm dòng này

function App() {
  return (
    <>
      <LikeButton />
    </>
  );
}

function LikeButton() {
  const [count, setCount] = useState(999); // Viết lại như thế này
  return <span className="likeButton">♥ {count}</span>;
}

export default App;
```

`useState` này là tính năng của React để cho function component có state. Return value của `useState` được gán vào 2 biến `count` và `setCount`. `count` được gán giá trị như `999`, `setCount` được gán hàm để thay đổi giá trị của `count`.

Tiếp theo, implement hàm `handleClick` để tăng giá trị `count` khi click vào element `span`. Trong hàm này, truyền giá trị `count` hiện tại cộng 1 vào hàm `setCount`. Và truyền hàm `handleClick` vào attribute `onClick` của element `span`.

```tsx twoslash {14-16,18} title="src/App.tsx"
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <>
      <LikeButton />
    </>
  );
}

function LikeButton() {
  const [count, setCount] = useState(999);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <span className="likeButton" onClick={handleClick}>
      ♥ {count}
    </span>
  );
}

export default App;
```

Bây giờ khi click button, số like sẽ tăng lên.

![](react-like-button-tutorial/like2.gif)

Đến đây nút Like React tạo với TypeScript đã hoàn thành.
