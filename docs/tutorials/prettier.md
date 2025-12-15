# Tự động hóa format code với Prettier

Trong tutorial này, sử dụng code formatter "Prettier", bạn sẽ học cách tự động hóa format code TypeScript.

## Những gì có thể học trong chương này

Trong chương này, với mục tiêu giới thiệu Prettier để tự động hóa format code, bạn sẽ học những điều sau.

- Cách giới thiệu Prettier
- Cách chạy Prettier
- Cách config rule format

## Prettier là gì

Prettier là tool tự động format code. Prettier hỗ trợ nhiều định dạng như sau.
Ngoài ra, bằng cách sử dụng plugin có thể format ngôn ngữ khác như PHP.

- JavaScript
- TypeScript
- [JSX](./../reference/jsx/README.md)
- Flow
- JSON
- HTML
- Vue
- Angular
- Ember
- Css
- Less
- SCSS
- styled-components
- styled-jsx
- GraphQL
- Markdown
- MDX
- YAML
- Svelte

## Tại sao nên giới thiệu Prettier

Khi phát triển với nhiều người, xảy ra sự khác biệt về code style như indent lệch tùy người, có hay không có dấu phẩy cuối object.

<!-- prettier-ignore -->
```ts
// Có dấu phẩy cuối object
// String dùng double quote
// Có semicolon cuối dòng
const user1 = {
  name: "Taro",
  age: 20,
};

// Không có dấu phẩy cuối object
// String dùng single quote
// Không có semicolon cuối dòng
const user2 = {
  name: 'Masaru',
  age: 30
}
```

Để thống nhất các code style này thủ công, cần tạo guideline và chia sẻ trong team, kiểm tra cẩn thận trong code review. Ngoài ra, khi có member mới tham gia team, cũng phát sinh công sức chia sẻ rule.

Bằng cách giới thiệu Prettier để tự động hóa format code, có thể dễ dàng thống nhất style code. Developer không cần quan tâm đến code style chi tiết và có thể tập trung vào phát triển, nên có thể phát triển hiệu quả hơn.

## Những thứ cần thiết cho tutorial này

Những thứ cần thiết cho tutorial này như sau.

- Node.js v16 trở lên
- Yarn v1 (Tutorial này được xác nhận hoạt động với v1.22.19)

Về cách giới thiệu Node.js, vui lòng xem [Chuẩn bị môi trường phát triển](./setup.md).

Chúng ta sẽ sử dụng Yarn làm package management tool. Hãy install trước. Nếu đã install rồi thì có thể bỏ qua bước này.

```shell
npm install -g yarn
```

## Tạo project

Tạo project để sử dụng cho tutorial này.

```shell
mkdir prettier-tutorial
cd prettier-tutorial
```

Tạo package.json ở project root. Nội dung như sau.

```json title="package.json"
{
  "name": "prettier-tutorial",
  "license": "UNLICENSED"
}
```

## Install Prettier

Prettier là package chỉ sử dụng khi phát triển nên install với option `-D`.

```shell
yarn add -D 'prettier@^2'
```

Hiển thị version để xác nhận install.

```shell
yarn prettier -v
2.8.1
```

## Tự động format TypeScript

Sử dụng lệnh `prettier` để tự động format file TypeScript bằng Prettier.

Đầu tiên, tạo thư mục `src` và tạo `src/helloWorld.ts`.

```shell
mkdir src
touch src/helloWorld.ts
```

Thay đổi nội dung `helloWorld.ts` như sau.
Code này cố ý khó đọc để xác nhận tự động format.

<!--prettier-ignore-->
```ts twoslash title="src/helloWorld.ts"
const hello = ( name: string) =>   {
console.log("Hello,World "
+ name)

}
```

Hãy chạy lệnh `prettier`.
Lệnh có thể chạy với format `prettier [option] [file/directory]`.

Trong ví dụ sau, chỉ định `src` làm argument để thực thi tự động format cho tất cả file trong thư mục `src`.

```shell
yarn prettier src
```

Kết quả format hiển thị, nhưng khi xác nhận `helloWorld.ts` bạn sẽ nhận ra nội dung file không thay đổi. Khi chạy lệnh `prettier` không có option, chỉ hiển thị kết quả format, không thực hiện viết lại file.

Để thực hiện viết lại file cùng lúc, chỉ định option `--write`.

```shell
yarn prettier --write src
```

Sau khi chạy, xác nhận `helloWorld.ts`, có thể thấy code đã được format như sau.

```ts twoslash title="src/helloWorld.ts"
const hello = (name: string) => {
  console.log("Hello,World " + name);
};
```

## Rule format mặc định của Prettier

Prettier có rule format mặc định được định nghĩa. Nhìn kết quả chạy trước đó, có thể thấy indent là space với width 2.

Giá trị mặc định của các mục đại diện như sau.
Nếu muốn xác nhận giá trị mặc định của tất cả mục, hãy tham khảo [tài liệu chính thức của Prettier](https://prettier.io/docs/en/options.html).

| Mục | Giá trị mặc định |
| --------------- | -------------- |
| Số ký tự tối đa 1 dòng | 80 |
| Độ rộng indent | 2 |
| Indent | Space |
| Semicolon | Có |
| Quote | Double quote |

## Config rule format của Prettier

### Config bằng CLI option

Rule format có thể chỉ định như option khi chạy lệnh `prettier`.
Hãy format `helloWorld.ts` vừa format bằng rule format khác.

```shell
yarn prettier --no-semi --tab-width 4 --write src
```

Nhìn code đã format, có thể xác nhận semicolon đã biến mất và độ rộng indent đã thay đổi từ 2 thành 4.

<!--prettier-ignore-->
```ts twoslash title="src/helloWorld.ts"
const hello = (name: string) => {
    console.log("Hello,World " + name)
}
```

### Tạo file config

Prettier cũng có thể viết rule format trong file config.

Tạo `.prettierrc` ở project root.

```shell
touch .prettierrc
```

Tiếp theo, thay đổi `.prettierrc` như sau.

```json title=".prettierrc"
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Sau khi tạo file config, hãy chạy lệnh `prettier`.
Prettier tự động đọc file config và set rule format khi có `.prettierrc` ở project root.

```shell
yarn prettier --write src
```

Có thể xác nhận `helloWorld.ts` đã thay đổi bằng rule format viết trong file config.

<!--prettier-ignore-->
```ts twoslash title="src/helloWorld.ts"
const hello = (name: string) => {
  console.log('Hello,World ' + name);
};
```

Trong ví dụ trên, file config được tạo với format JSON, nhưng Prettier cũng hỗ trợ format JS, YAML, TOML.

```js twoslash title="prettier.config.js"
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};
```

```yaml title=".prettierrc.yml"
tabWidth: 2
semi: true
singleQuote: true
```

```toml title=".prettierrc.toml"
tabWidth = 2
semi = true
singleQuote = true
```

Ngoài `.prettierrc`, còn có một số tên file được nhận diện tự động như file config.
Kết hợp format và tên file như sau.

| Format | Tên file |
| :----------- | :-------------------------------------------------------------------------------------- |
| json | `.prettierrc`, `.prettierrc.json`, `.prettierrc.json5` |
| js | `.prettierrc.js`, `.prettierrc.cjs`, `prettier.config.js`, <br /> `prettier.config.cjs` |
| yaml | `.prettierrc`, `.prettierrc.yml`, `.prettierrc.yaml` |
| toml | `.prettierrc.toml` |

### Xác nhận rule format khác

Ngoài những gì giới thiệu ở đây, còn có một số rule format khác.
Nếu muốn xác nhận rule format khác, tên option CLI, tên key file config, hãy tham khảo [tài liệu chính thức của Prettier](https://prettier.io/docs/en/options.html).

### Rule format nào là tốt?

Khi giới thiệu Prettier vào project, có thể có trường hợp bạn băn khoăn về rule format.

Rule format có phần lớn là sở thích, nên hãy thảo luận và quyết định với developer của project. Rule format có thể thay đổi dễ dàng sau này chỉ bằng cách chạy lệnh `prettier`, nên quyết định với tiền đề có thể thay đổi sau cũng không sao.

Nếu không có yêu cầu đặc biệt, khuyến nghị sử dụng rule format mặc định của Prettier.

## Vô hiệu hóa tự động format của Prettier

Bằng cách viết `prettier-ignore` như comment, có thể loại trừ một phần code khỏi đối tượng tự động format của Prettier.

```ts twoslash title="src/helloWorld.ts"
const board1 = [1, 0, 0, 1];

//  prettier-ignore
const board2 = [
  1, 0,
  0, 1
];
```
