---
sidebar_label: Type definition file
---

# Type definition file (.d.ts)

Khi coding bằng TypeScript trong project của mình, bạn có thể sử dụng chức năng autocomplete và code check của IDE hoặc editor bằng cách khai báo type. Tuy nhiên, khi sử dụng package bên ngoài (npm) thì không chắc là có bao gồm type definition file.

## Type definition file là gì

Type definition file là file mô tả các khai báo có thể truy cập. Extension là `.d.ts`.

Type definition file được tạo chủ yếu để phân phối package. Khi TypeScript được compile sang JavaScript, thông tin type sẽ biến mất. Nếu sử dụng package JavaScript nguyên bản thì không thể hưởng lợi từ type definition. Tuy nhiên, bằng cách đính kèm type definition file, có thể sử dụng để autocomplete và code check.

Đáng tiếc là không phải tất cả package được public trên npm đều có definition file. Điều này sẽ được giải thích trong phần **Có hay không có type definition file**.

### Ví dụ output type definition file

Khi compile bằng lệnh tsc với option `-d`, có thể output JavaScript và type definition file.

#### File TypeScript

Thử compile file TypeScript sau (sample.ts) với option `-d`.

```ts title="sample.ts" twoslash
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person): string {
  return "Hello, " + person.firstName + " " + person.lastName;
}
```

Thực hiện compile với option `-d` của lệnh tsc.

```bash
tsc -d
```

#### File JavaScript

sample.ts sử dụng Interface, nhưng vì JavaScript không có khái niệm Interface nên chỉ còn function. Thông tin type của tham số cũng biến mất.

```js title="sample.js" twoslash
function greeter(person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
//# sourceMappingURL=sample.js.map
```

#### File `d.ts`

File chỉ chứa thông tin definition được output.

```ts title="sample.d.ts" twoslash
interface Person {
  firstName: string;
  lastName: string;
}
declare function greeter(person: Person): string;
```

## Có hay không có type definition file

Type definition file được tạo bởi developer của package hoặc volunteer.

- Có type definition file
  - Package được viết bằng TypeScript
  - Package được viết bằng JavaScript nhưng đính kèm file `.d.ts`
- Có type definition file nhưng cần cài đặt riêng
  - Package được viết bằng JavaScript nhưng đã được đăng ký trên DefinitelyTyped
- Không có type definition file
  - Package được viết bằng JavaScript và không tồn tại type definition file

### Có type definition file

Khi xem trang giới thiệu package trên NPM, đôi khi có icon TS hiển thị bên phải tên package. Điều này cho biết có tồn tại type definition file.
Điều này có nghĩa là developer của package đang phát triển bằng TypeScript, hoặc đang phát triển bằng JavaScript nhưng có đính kèm type definition file. Với package có bao gồm type definition file, không cần thao tác đặc biệt nào.

Ví dụ, date library [date-fns](https://date-fns.org/) được xây dựng bằng JavaScript nhưng có đính kèm `typings.d.ts`. Chỉ cần install là có thể hưởng lợi từ definition file.

```bash
npm install date-fns
```

Trường hợp có type definition file, có thể tham chiếu thông tin type mà không cần cấu hình.

### Có type definition file nhưng cần cài đặt riêng

Khi xem trang giới thiệu package trên NPM, đôi khi có icon DT hiển thị bên phải tên package. Điều này cho biết type definition file không có trong package này, nhưng đã được đăng ký trên [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).
Trong trường hợp này, sau khi install package, cần install type definition file riêng. Việc install definition file cũng sử dụng lệnh `npm`.

Ví dụ, [Express](https://expressjs.com/) được xây dựng bằng JavaScript, nhưng type definition file cần được install riêng dưới dạng package `@types/express`.

Ví dụ install [Express](https://expressjs.com/) và definition file như sau.

```bash
npm install express --save # install express
npm install @types/express --save-dev # install type definition file
```

### Không có type definition file

Cũng có library không có type definition file. Trong trường hợp đó

1. Chấp nhận `any`
2. Tạo type definition file

Cũng có thể sử dụng library không có type definition file nhưng nó sẽ ngầm trở thành type `any`. Bạn cũng có thể tự tạo và public lên DefinitelyTyped.

[Cách đóng góp (contribute) | Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ja.md#%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AA%E3%83%93%E3%83%A5%E3%83%BC%E3%83%88%E8%B2%A2%E7%8C%AE%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)

## Keyword xuất hiện trong type definition file

Ở đây giới thiệu các keyword thường được sử dụng trong type definition file để bạn có thể đọc được type definition file.

### declare

Sử dụng keyword `declare` có thể cho TypeScript biết rằng variable, function, class, v.v. "tồn tại" trong JavaScript. Điều này được gọi là "ambient declaration".

Giả sử file sau được load như JavaScript library và `hello` có thể sử dụng như global function.

```js twoslash
function hello(name) {
  return "Hello, " + name;
}
```

Trong trạng thái này, nếu gọi function `hello` từ TypeScript sẽ xảy ra lỗi type. Điều này là do TypeScript không biết function `hello` tồn tại.

```ts twoslash
// @errors: 2304
hello("taro");
```

Bằng cách sử dụng `declare` để thực hiện ambient declaration, có thể khai báo với TypeScript rằng function `hello` "tồn tại" ở đâu đó trong JavaScript. Nhờ đó TypeScript có thể nhận ra function `hello`.

```ts twoslash
declare function hello(name: string): string;

hello("taro");
// @log: "hello, taro"
```

Như một ví dụ về type definition file của module thực tế, hãy xem type definition file của `jest`. Có thể xác nhận các function như `beforeAll` được ambient declare trong type definition file. Nhờ đó TypeScript có thể nhận ra `beforeAll` là function mà không cần import module.

```ts title="node_modules/@types/jest/index.d.ts" twoslash
// @noErrors
declare var beforeAll: jest.Lifecycle;

declare namespace jest {
  type Lifecycle = (fn: ProvidesHookCallback, timeout?: number) => any;
}
```

### namespace

Sử dụng keyword `namespace` có thể định nghĩa namespace.
Bằng cách định nghĩa namespace, có thể tránh xung đột tên type.

Hãy nghĩ về việc muốn định nghĩa type `Element` như type của library và cho người dùng library tham chiếu. Type này đã được định nghĩa sẵn trong `lib.dom.d.ts` của TypeScript, nên nếu định nghĩa trực tiếp trong cùng không gian global sẽ xung đột tên.

```ts title="node_modules/typescript/lib/lib.dom.d.ts"
interface Element
  extends Node,
    ARIAMixin,
    Animatable,
    ChildNode,
    InnerHTML,
    NonDocumentTypeChildNode,
    ParentNode,
    Slottable {
  readonly attributes: NamedNodeMap;
  /** Allows for manipulation of element's class content attribute as a set of whitespace-separated tokens through a DOMTokenList object. */
  readonly classList: DOMTokenList;

  // lược bỏ
}
```

Code sau là ví dụ định nghĩa `Element` như type riêng của library mà không sử dụng `namespace`. Trong TypeScript, khi interface cùng tên được định nghĩa, declaration merging xảy ra, nên sẽ merge với type được định nghĩa trong `lib.dom.d.ts`, và yêu cầu chỉ định nhiều property như `attributes`.

```ts twoslash
// hello.d.ts
// @showEmittedFile: index.d.ts
interface Element {
  id: string;
}

// index.ts
// @errors: 2740
const e: Element = {
  id: "1",
};
```

Bằng cách định nghĩa namespace, có thể tránh xung đột và định nghĩa type riêng của library.

```ts twoslash
// @filename: hello.d.ts
namespace Hello {
  interface Element {
    id: number;
  }
}

// @filename: index.ts
// @errors: 2740
const e: Hello.Element = {
  id: 1,
};
```

Trong type definition file của React, type `Element` được định nghĩa với namespace `namespace JSX` như sau.

Về sự khác biệt giữa `declare global` và `declare namespace`
Trong type definition file chúng hoạt động giống nhau nên không có sự khác biệt. Bằng cách viết `declare global`, có thể làm rõ ý định của developer là định nghĩa namespace trong global scope?

```ts twoslash
// @filename: node_modules/@types/react/index.d.ts
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}

    // lược bỏ
  }
}
```

### module

Trước TypeScript 1.5, keyword `module` được sử dụng để định nghĩa "internal module (namespace)". Điều này tương đương với chức năng của `namespace` hiện tại. Tuy nhiên, vì tên này trùng với keyword của định nghĩa "external module" của ESModule và có thể gây nhầm lẫn, từ TypeScript 1.5, "internal module" được đổi tên thành "namespace" và keyword `namespace` mới được giới thiệu.

Hiện tại, keyword `module` đã không còn được khuyến khích sử dụng, vui lòng sử dụng keyword `namespace`.

### Triple-slash directive

Comment line bắt đầu bằng ba dấu slash (`///`) ở đầu type definition file được gọi là triple-slash directive. Đây là định dạng riêng của TypeScript và có chức năng đưa ra chỉ thị cho compiler.

Triple-slash directive có một số loại, ở đây giới thiệu 2 directive đại diện thường thấy trong nhiều type definition file.

#### `/// <reference path="..." />` (Reference directive)

Reference directive có thể khai báo dependency giữa các type definition file cho compiler, và có thể chỉ thị để load thêm type definition file được chỉ định bằng `path` khi compile. Ví dụ, trong ví dụ sau, khi compiler load `index.d.ts`, nó sẽ load thêm `global.d.ts`.

```ts title="node_modules/@types/react/index.d.ts" twoslash
// @noErrors
/// <reference path="global.d.ts" />
```

#### `/// <reference types="..." />` (Type directive)

Type directive có thể khai báo dependency đến npm package. Xử lý giải quyết dependency của package được khai báo tương tự như xử lý giải quyết package trong câu lệnh import, nên type directive cũng có thể được coi như import của type.

Ví dụ sau là một phần của type definition file của express. Type directive cho thấy đang phụ thuộc vào type definition file của package `serve-static`.

```ts title="node_modules/@types/express/index.d.ts" twoslash
// @noErrors
/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />
```
