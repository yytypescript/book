---
title: JSX
slug: /reference/jsx
---

JSX (JavaScript XML) là cú pháp mở rộng của JavaScript, thường được áp dụng trong các library và framework JavaScript hướng component (đặc biệt là React). Sử dụng JSX cho phép nhúng cú pháp giống HTML tag vào trong code JavaScript, giúp biểu diễn code UI một cách trực quan và dễ đọc hơn. Nhờ đó, trải nghiệm coding, phát triển và debug của developer được cải thiện.

## Sự khác biệt giữa JSX và ECMAScript

Cú pháp JavaScript được quy định bởi đặc tả ngôn ngữ gọi là ECMAScript. Mặt khác, JSX là ngôn ngữ mở rộng cú pháp JavaScript một cách độc lập. Do đó, JSX không được đưa vào đặc tả ngôn ngữ ECMAScript. Khi browser implement JavaScript engine, nó tuân thủ ECMAScript (tiêu chuẩn), nên hiện tại browser không thể trực tiếp hiểu và thực thi JSX. Để giải quyết vấn đề này, cần quá trình gọi là transpile - chuyển đổi JSX thành JavaScript mà browser có thể nhận dạng. Các tool hỗ trợ công việc transpile này là Babel và TypeScript compiler.

## Sự khác biệt giữa cú pháp JSX và cú pháp HTML

Nhìn lần đầu có thể khó nhận ra sự khác biệt, nhưng thực tế JSX và HTML không hoàn toàn giống nhau. Ở cấp độ cú pháp, có nhiều sự khác biệt giữa JSX và HTML. Ví dụ, cách viết tên thuộc tính, cách chỉ định style, cách viết self-closing tag, v.v. đều khác nhau. Chi tiết về những điều này sẽ được giải thích kỹ hơn trong phần "Thuộc tính" sau. Điểm quan trọng cần nhớ là JSX là hybrid của HTML và JavaScript, nên được thiết kế để hài hòa các quy tắc và quy ước của cả hai.

## Cú pháp JSX

### Element

Dạng phổ biến nhất trong JSX là biểu diễn component bằng element (tag) có thể nest.

```tsx twoslash
const element = <br />;
// Kết quả render: <br/>
```

### Element lồng nhau

JSX element có thể nest giống như HTML. Ví dụ, xem xét tình huống 2 element `br` được nest trong element `div`.

```tsx twoslash
const element = (
  <div>
    <br />
    <br />
  </div>
);
// Kết quả render: <div><br/><br/></div>
```

Đây là những ví dụ đơn giản, nhưng cũng có thể thêm attribute và child element để biểu diễn component phức tạp hơn.

### Text element

Trong JSX, có thể viết text trực tiếp vào element.

```tsx twoslash
const element = <h1>I'm a text element.</h1>;
// Kết quả render: <h1>I&#x27;m a text element.</h1>
```

Như trên, khi viết text trực tiếp vào element, text đó được output nguyên dạng.

#### Khoảng trắng và element

Trong JSX, khoảng trắng giữa các element được tự động bỏ qua. Ví dụ,

<!--prettier-ignore-->
```tsx twoslash
const element = (
  <p>
    This is a
    <strong>pen</strong>
    .
  </p>
);
// Kết quả render: <p>This is a<strong>pen</strong>.</p>
```

Code trên được render thành "This is a**pen**." với "a" và "pen" không có khoảng trắng phân cách.

Để tránh điều này, viết chuỗi như biểu thức JavaScript.

<!--prettier-ignore-->
```tsx twoslash
const element = (
  <p>
    This is a{" "}
    <strong>pen</strong>
    .
  </p>
);
// Kết quả render: <p>This is a<!-- --> <strong>pen</strong>.</p>
```

Như vậy, nó sẽ được render đúng thành "This is a pen.".

### Thuộc tính

Tên thuộc tính JSX được khuyến khích viết theo camelCase theo quy ước đặt tên JavaScript. Cần chú ý điểm này khác với attribute trong HTML.

### Thuộc tính HTML tiêu chuẩn

Trong JSX, có thể gán thuộc tính cho element giống như HTML attribute.

```tsx twoslash
const element1 = <img src="image.jpg" alt="A beautiful scene" />;
const element2 = <a href="http://example.com">Visit our website</a>;
```

Tuy nhiên, vì thuộc tính `class` là từ dành riêng của JavaScript, nên sử dụng `className` thay thế. Ví dụ, trong code sau áp dụng thuộc tính `className` cho element `h1`.

```tsx twoslash
const element = <h1 className="greeting">Hello, world!</h1>;
// Kết quả render: <h1 class='greeting'>Hello, world!</h1>
```

Thuộc tính sử dụng trong JSX là tên property của DOM trong JavaScript. Do đó, một số HTML attribute có tên khác trong JSX. Bảng sau hiển thị một số HTML attribute phổ biến và tên thuộc tính JSX tương ứng.

| HTML          | JSX           |
| ------------- | ------------- |
| `class`       | `className`   |
| `tabindex`    | `tabIndex`    |
| `for`         | `htmlFor`     |
| `colspan`     | `colSpan`     |
| `maxlength`   | `maxLength`   |
| `cellpadding` | `cellPadding` |
| `cellspacing` | `cellSpacing` |
| `rowspan`     | `rowSpan`     |

### Thuộc tính style

Trong HTML, thuộc tính style thường là chuỗi.

```html
<div style="background-color: yellow; color: blue;">Hello!</div>
```

Mặt khác, trong JSX thuộc tính style phải là object.

```jsx
<div style={{ backgroundColor: "yellow", color: "blue" }}>Hello!</div>;
// Kết quả render: <div style='background-color:yellow;color:blue'>Hello!</div>
```

### Thuộc tính boolean

Thuộc tính boolean chỉ định đặc tính cụ thể cho element. Ví dụ, element input có thuộc tính kiểu boolean gọi là "disabled", và khi chỉ định giá trị true thì element input sẽ bị vô hiệu hóa.

```tsx twoslash
const element = <input disabled />;
// Kết quả render: <input disabled=''/>
```

Cũng có thể chỉ định rõ ràng bằng cách thêm `{true}` làm giá trị thuộc tính.

```tsx twoslash
const element = <input disabled={true} />;
// Kết quả render: <input disabled=''/>
```

Tuy nhiên, thường khuyến khích bỏ qua phần giá trị khi giá trị thuộc tính là true. Vì viết như vậy code sẽ ngắn và đơn giản hơn. Do đó, như ví dụ trên, chỉ cần chỉ định tên thuộc tính là có thể kích hoạt thuộc tính đó.

### Biểu thức

Trong JSX có thể nhúng biểu thức JavaScript. Nhờ đó, có thể dễ dàng đưa giá trị động vào JSX.

### Biểu thức cơ bản

Để nhúng biểu thức JavaScript vào trong JSX, sử dụng dấu ngoặc nhọn `{}`. Trong ví dụ sau, giá trị của biến `name` được nhúng vào element `<h1>`.

```tsx twoslash
const name = "Josh Perez";
const greeting = <h1>Hello, {name}</h1>;
// Kết quả render: <h1>Hello, <!-- -->Josh Perez</h1>
```

Ở đây đang nhúng biến JavaScript, nhưng vì kết quả đánh giá biểu thức được chèn vào, nên cũng có thể thực hiện phép toán JavaScript và gọi method.

```tsx twoslash
const a = 10;
const b = 20;
const sum = <h1>{a + b}</h1>;
// Kết quả render: <h1>30</h1>

const name = "Josh Perez";
const greeting = <h1>Hello, {name.toUpperCase()}</h1>;
// Kết quả render: <h1>Hello, <!-- -->JOSH PEREZ</h1>
```

### Biểu thức điều kiện

Vì câu lệnh if của JavaScript là statement chứ không phải expression, nên không thể viết trực tiếp trong expression của JSX. Khi cần biểu thức điều kiện, sử dụng toán tử ba ngôi.

```tsx twoslash
const isUser = true;
const greeting = isUser ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>;
```

Như vậy, bằng cách sử dụng toán tử ba ngôi `điều kiện ? giá trị khi true : giá trị khi false`, có thể chuyển đổi hiển thị theo điều kiện trong JSX.

### Short-circuit evaluation

Cũng có thể thực hiện short-circuit evaluation bằng toán tử logic của JavaScript. Sử dụng điều này để chỉ hiển thị element trong điều kiện cụ thể hoặc cung cấp giá trị mặc định.

### Short-circuit evaluation bằng toán tử AND logic (`&&`)

Toán tử AND logic `&&` trả về giá trị đó nếu phần tử đầu tiên là `false` hoặc giá trị falsy (`false`, `null`, `undefined`, `""`, `0`, `NaN`), nếu không thì trả về giá trị thứ hai.

```tsx twoslash
declare const isLoggedIn: boolean;
// ---cut---
const message = isLoggedIn && <h1>Welcome back!</h1>;
```

Trong ví dụ này, chỉ khi `isLoggedIn` là truthy thì `<h1>Welcome back!</h1>` mới được hiển thị.

### Short-circuit evaluation bằng toán tử OR logic (`||`)

Toán tử OR logic `||` trả về giá trị đó nếu operand đầu tiên là giá trị truthy, nếu không thì trả về giá trị thứ hai.

```tsx twoslash
declare const isLoggedIn: boolean;
// ---cut---
const message = isLoggedIn || <h1>Please sign up.</h1>;
```

Trong ví dụ này, chỉ khi `isLoggedIn` là giá trị falsy (`undefined`, `null`, `""`, `0`, `NaN`) thì `<h1>Please sign up.</h1>` mới được hiển thị.

### Short-circuit evaluation bằng toán tử Nullish coalescing (`??`)

Toán tử Nullish coalescing `??` chỉ trả về giá trị thứ hai khi operand đầu tiên là `null` hoặc `undefined`. Do đó, ngay cả khi operand đầu tiên là `false`, `0`, `NaN`, chuỗi rỗng, giá trị đó vẫn được giữ lại.

```tsx twoslash
declare const input: { name?: string };
// ---cut---
const message = input.name ?? <p>No input provided.</p>;
```

Trong ví dụ này, chỉ khi `input.name` là `null` hoặc `undefined` thì `<p>No input provided.</p>` mới được hiển thị.

### Loop (xử lý lặp)

Vì không thể sử dụng trực tiếp statement như `for-of` loop của JavaScript trong JSX, nên khi thực hiện xử lý lặp trên array, sử dụng expression như hàm `Array.prototype.map`. Expression là đoạn code trả về giá trị, ngược lại statement không tạo ra giá trị. JSX về cơ bản là cú pháp dựa trên expression nên sử dụng expression.

Hàm `Array.prototype.map` áp dụng function cho mỗi phần tử của array và tạo array mới với kết quả đó. Sử dụng điều này để tạo một loạt element. Dưới đây là sample code.

```tsx twoslash
const numbers = [1, 2, 3];
const list = (
  <ul>
    {numbers.map((number) => (
      <li key={number.toString()}>{number}</li>
    ))}
  </ul>
);
// Kết quả render: <ul><li>1</li><li>2</li><li>3</li></ul>
```

Trong ví dụ này, function được áp dụng cho mỗi phần tử của array `numbers`, và array mới gồm các element `<li>` được tạo từ kết quả đó. Sau đó, array đó được mở rộng vào element `<ul>` và gán vào `list`.

Ngoài ra, trong React khuyến khích thêm property `key` duy nhất cho các element trong array. Điều này được sử dụng để React theo dõi thay đổi DOM một cách hiệu quả. Trong ví dụ trên, số được chuyển đổi thành chuỗi được sử dụng làm `key`.

### Self-closing tag

Trong JSX, có thể sử dụng self-closing tag giống như XML. Điều này được sử dụng cho element không có nội dung giữa opening tag và closing tag.

```tsx twoslash
const element = <img src="myImage.jpg" alt="" />;
```

Ngay cả khi element đó không có nội dung, viết `<img></img>` cũng có thể về mặt cú pháp. Tuy nhiên, thường khuyến khích viết self-closing tag như `<img />`. Đây là để làm rõ rằng tag không có nội dung từ quan điểm dễ đọc.

### Fragment

Thông thường JSX element phải nest tất cả child element trong một parent element. Điều này là do JSX yêu cầu cuối cùng trả về một root node. Tuy nhiên, yêu cầu này thường buộc phải thêm element thừa vào cấu trúc DOM của React. Chức năng React cung cấp để giải quyết điều này là "Fragment".

Sử dụng Fragment, có thể trả về nhiều element cùng lúc mà không cần một parent element. Nhờ đó, có thể render nhiều element mà không phá vỡ cấu trúc và ngăn việc tạo DOM node thừa.

### Sử dụng Fragment trong JSX

Fragment có thể được biểu diễn rõ ràng bằng tag `<React.Fragment>`. Trong ví dụ sau, element `h1` và `h2` được gom trong fragment.

```tsx twoslash
const element = (
  <React.Fragment>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </React.Fragment>
);
// Kết quả render: <h1>Hello!</h1><h2>Good to see you here.</h2>
```

Tuy nhiên, để biểu diễn fragment ngắn gọn hơn, shorthand `<>...</>` thường được sử dụng. Trong ví dụ sau, tag `<React.Fragment>` được thay thế bằng `<>...</>`.

```tsx twoslash
const element = (
  <>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </>
);
// Kết quả render: <h1>Hello!</h1><h2>Good to see you here.</h2>
```

Dù ở dạng nào, bằng cách sử dụng fragment, element `h1` và `h2` được đặt cùng cấp và được render mà không thêm HTML element wrap thừa. Fragment là công cụ để liên tục cải thiện hiệu suất render của ứng dụng React.

### Comment trong JSX

Comment là yếu tố quan trọng để cải thiện tính dễ đọc của code. Tuy nhiên, comment trong JSX hơi đặc biệt và cần viết rõ ràng trong block JavaScript, tức là trong dấu ngoặc nhọn `{}`.

### Comment một dòng

Cách viết comment một dòng trong JSX như sau.

```tsx twoslash
const element = <div>{/* This is a comment */}</div>;
// Kết quả render: <div></div>
```

Như vậy, comment được viết theo dạng `{/* */}`. Với cách viết này, comment không hiển thị trên browser mà chỉ tồn tại để hỗ trợ developer.

### Generics

Bằng cách sử dụng generics, có thể tái sử dụng component hoặc function đã định nghĩa một lần ở dạng có thể tương thích với nhiều type khác nhau. Ở đây, hãy xem chi tiết về định nghĩa và sử dụng React component với generics type.

[Generics](../generics/README.md)

### Định nghĩa generic component

Đầu tiên, định nghĩa component sử dụng type variable `T`. Ở đây tạo type với tên `ItemType` và thiết kế để nó nhận type `T` qua property `prop`.

```tsx
type ItemType<T> = {
  prop: T;
};

const Item = <T,>({ prop }: ItemType<T>) => <>{prop}</>;
```

Component có tên `Item` ở trên được áp dụng generics type. Do đó, có thể nhận bất kỳ type nào làm `prop`.

Điểm đáng chú ý là giải thích về cách viết `<T>`. Nếu chỉ viết `<T>` làm generics, TypeScript có thể nhầm lẫn nó với tag JSX. Điều này là do khi TypeScript parser đọc `<T>`, khó xác định được nó là bắt đầu generics hay bắt đầu JSX element. Để tránh nhầm lẫn này, cần thêm `,` vào `<T>` chỉ bắt đầu generics và viết thành `<T,>`.

### Sử dụng generic component

Bây giờ, hãy sử dụng component generics type đã định nghĩa ở trên.

```tsx twoslash
// @errors: 2322
type ItemType<T> = {
  prop: T;
};
const Item = <T,>({ prop }: ItemType<T>) => <>{prop}</>;
// ---cut---
const item1 = <Item<string> prop="a" />; // OK
const item2 = <Item<number> prop="a" />; // Error
```

Đang truyền type argument `string` cho component `Item` và truyền giá trị chuỗi `a` làm property `prop`. Điều này không có vấn đề. Tuy nhiên, dòng tiếp theo truyền type argument `number` cho component `Item` nhưng lại truyền giá trị chuỗi `a` làm property `prop`. Do đó, TypeScript phát sinh lỗi type. Như vậy, có thể xác nhận type safety được đảm bảo.

## Best practice của JSX

Best practice trong JSX hữu ích để viết code hiệu quả và dễ đọc. Dưới đây là một số best practice chính.

### Tên component luôn bắt đầu bằng chữ hoa

React nhận dạng component bắt đầu bằng chữ thường là DOM tag. Do đó, khuyến khích tên component luôn bắt đầu bằng chữ hoa.

```tsx twoslash
// Good
const MyComponent = () => {
  return <div />;
};

// Bad
const myComponent = () => {
  return <div />;
};
```

### Bao multiline JSX trong ngoặc đơn

Khuyến khích bao JSX trải dài nhiều dòng trong ngoặc đơn để tăng tính dễ đọc.

```tsx {3-7,12-14} twoslash
// Good
const Good = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};

// Bad
const Bad = () => {
  // prettier-ignore
  return <div>
    <h1>Hello, world!</h1>
  </div>;
};
```

### Sử dụng self-closing tag

Thông thường, JSX element được viết bằng cách đặt child element giữa opening tag và closing tag. Tuy nhiên, khi nội dung rỗng, tức không có child element, có thể sử dụng dạng rút gọn gọi là self-closing tag. Với self-closing tag, có thể gộp opening tag và closing tag thành một tag.

Hai biểu diễn sau là tương đương:

```tsx twoslash
// Version dài
const a = <input></input>;
// Version ngắn (self-closing tag)
const b = <input />;
```

Ví dụ trước viết rõ ràng opening tag và closing tag ở dạng `<input></input>`. Mặt khác, ví dụ sau sử dụng self-closing tag gộp opening tag và closing tag thành một ở dạng `<input />`. Cả hai cách viết đều hoạt động hoàn toàn giống nhau, nhưng dạng sau ngắn gọn và thường được ưa thích hơn.

### Bỏ qua thuộc tính boolean khi là `true`

Trong JSX, khi giá trị thuộc tính là `true`, có thể bỏ qua giá trị và chỉ viết tên thuộc tính. Cách viết này gọi là thuộc tính boolean.

Hai biểu diễn sau là tương đương:

```tsx twoslash
// Version dài
const a = <input required={true} />;
// Version ngắn (thuộc tính boolean)
const b = <input required />;
```

Ví dụ trước thiết lập rõ ràng `{true}` (tức là true) cho thuộc tính `required`. Mặt khác, ví dụ sau chỉ viết tên thuộc tính `required` để chỉ ra thuộc tính là true. Cả hai cách viết đều hoạt động hoàn toàn giống nhau, nhưng dạng sau ngắn gọn và thường được ưa thích hơn.

### Sử dụng property `key` duy nhất trong hàm map

Khi tạo list bằng hàm `map`, khuyến khích gán property `key` duy nhất cho mỗi element. Nhờ đó React có thể áp dụng thay đổi, thêm, xóa một cách hiệu quả.

```tsx twoslash
declare const numbers: number[];
// ---cut---
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

## JSX và compile

JSX không phải là một phần của JavaScript nên không thể thực thi trực tiếp trên browser. Mặc định, cú pháp JSX không có trong cú pháp JavaScript, và ngay cả khi thực thi nguyên dạng, browser cũng không thể hiểu. Do đó, cần compile (hoặc chuyển đổi) JSX thành JavaScript.

Trong TypeScript, để chỉ định phương pháp compile JSX như vậy, thiết lập flag tên "jsx" trong `tsconfig.json`. Flag này có thể thiết lập 5 giá trị sau.

1. "react": Khi chọn thiết lập này, JSX được chuyển đổi thành JavaScript. Và trong file .js output, mỗi JSX element được chuyển đổi thành cuộc gọi `React.createElement` tương ứng. Điều này chỉ định cách library React chuyển đổi JSX thành JavaScript tiêu chuẩn.
2. "react-jsx": JSX element gốc được chuyển đổi thành cuộc gọi `_jsx` và được bao gồm trong file .js output. Nhờ đó, có thể kỳ vọng cải thiện hiệu suất ở một mức độ nào đó.
3. "react-jsxdev": Tương tự, JSX element gốc được chuyển đổi thành cuộc gọi `_jsx`, nhưng mode này được thiết kế để chỉ sử dụng trong môi trường development. Cuộc gọi `_jsx` được tạo ở đây bao gồm kiểm tra runtime bổ sung để dễ dàng debug trong quá trình development.
4. "preserve": Mode này giữ nguyên JSX trong file output. Nghĩa là, cú pháp JSX gốc không bị thay đổi, và extension file output được kỳ vọng là .jsx. Sử dụng khi cần giữ nguyên JSX cho bước chuyển đổi tiếp theo (ví dụ transpiler như Babel).
5. "react-native": Option này cũng giữ nguyên JSX trong output. Tuy nhiên, extension file output được kỳ vọng vẫn là .js. Điều này chủ yếu được sử dụng trong môi trường development React Native.

Với các thiết lập trên, có thể kiểm soát cách cú pháp JSX được compile thành JavaScript. Và khi sử dụng TypeScript cùng JSX, các thiết lập này là không thể thiếu.

Hãy xem kết quả compile của sample code sau với mỗi flag.

```tsx twoslash title="TypeScript trước khi compile"
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="Kết quả compile react (JavaScript code)"
// @jsx: react
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="Kết quả compile react-jsx (JavaScript code)"
// @jsx: react-jsx
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="Kết quả compile react-jsxdev (JavaScript code)"
// @jsx: react-jsxdev
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="Kết quả compile preserve (JavaScript code)"
// @jsx: preserve
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="Kết quả compile react-native (JavaScript code)"
// @jsx: react-native
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```
