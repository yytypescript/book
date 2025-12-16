# Quy trình từ cài đặt đến Pull Request

Trang này giải thích quy trình từ cài đặt môi trường đến tạo Pull Request.

## Cài đặt môi trường

Fork repository trên GitHub, sau đó clone repository đã fork về máy. (Nếu bạn có quyền commit trực tiếp thì không cần fork.)

```shell
# Người dùng thông thường
git clone git@github.com:your-account/survival-typescript-vietnamese.git

# Người có quyền commit
git clone git@github.com:LeHoangTuanbk/survival-typescript-vietnamese.git
```

Cài đặt các công cụ cần thiết:

```shell
yarn
```

Khởi động dev server:

```shell
yarn start
```

Việc khởi động dev server mất khá nhiều thời gian. Hãy đợi và không dừng process.

Sau khi dev server khởi động, mở `http://localhost:3000` trong trình duyệt.

## Tạo branch

Tạo branch mới:

```bash
git checkout -b ten-branch
```

Không thể push trực tiếp vào branch master. Vì vậy cần thực hiện thay đổi trên branch riêng.

## Tạo nội dung

### Thêm trang mới

Thêm file Markdown mới vào thư mục docs:

```shell
mkdir -p docs/category/subcategory
touch docs/category/subcategory/new-page.md
```

Thêm đường dẫn trang mới vào `sidebars.js`. Đường dẫn không bao gồm extension `.md`.

```js title="sidebars.js"
module.exports = {
  // ...
  tutorialSidebar: [
    {
      type: "category",
      label: "Category",
      items: [
        {
          type: "category",
          label: "Subcategory",
          items: [
            // highlight-next-line
            "category/subcategory/new-page",
          ],
        },
      ],
    },
  ],
};
```

Sau khi hoàn thành, bắt đầu chỉnh sửa file đã tạo.

### Chỉnh sửa trang có sẵn

Tìm file cần chỉnh sửa trong thư mục docs và chỉnh sửa.

### Di chuyển trang có sẵn

1. Di chuyển file hoặc đổi tên file.
2. Cập nhật đường dẫn trong `sidebars.js`.
3. Thêm cấu hình redirect từ URL cũ sang URL mới trong `vercel.json`.
4. Chạy `yarn build` để kiểm tra link hỏng.

Ví dụ, nếu di chuyển `docs/tutorials/setup.md` sang `docs/getting-started/setup.md`, sửa `"tutorials/setup"` thành `"getting-started/setup"` trong `sidebars.js`, và thêm cấu hình sau vào `redirects` trong `vercel.json`:

```json title="vercel.json"
{ "source": "/tutorials/setup", "destination": "/getting-started/setup" }
```

Sau các thay đổi, chạy `yarn build` để kiểm tra link hỏng.

### Những điều cần biết khi chỉnh sửa nội dung

[VS Code](vscode.md)

[Markdown](markdown.md)

[Cấu trúc file](file-structure.md)

## Commit

Sau khi chỉnh sửa, commit các thay đổi:

```shell
git add docs/category/subcategory/new-page.md
git commit -m "Thêm trang mới"
```

:::tip
Ví dụ commit message:

- Thêm trang "Type annotation"
- Thêm sample code vào trang "Function"
- Sửa lỗi chính tả

:::

## Kiểm tra nội dung

### Kiểm tra code style

Sử dụng Prettier và markdownlint để sửa style Markdown và TypeScript trong code block:

```shell
yarn markdownlint:fix
yarn prettier:fix
```

:::tip
Với code block không muốn auto format bởi Prettier, thêm `<!--prettier-ignore-->` phía trước.

````markdown
<!--prettier-ignore-->
```ts
type Code =
  | 1
  | 2
  | 3;
```
````

:::

:::tip
Chi tiết về các lỗi markdownlint xem tại [tài liệu markdownlint](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md).
:::

### Commit kết quả kiểm tra

Xác nhận kết quả auto fix bằng diff:

```shell
git diff
```

:::tip
Để hoàn tác các thay đổi từ auto fix, dùng `git checkout`.
:::

Nếu không có vấn đề với nội dung auto fix, commit:

```shell
git add docs/category/subcategory/new-page.md
git commit --amend # Gộp vào commit trước đó
```

## Gửi Pull Request

:::caution
Trước khi gửi Pull Request, hãy **cố gắng** gộp các commit thành 1.
:::

Push các thay đổi:

```shell
git push -u origin ten-branch
```

Khi tạo Pull Request, sử dụng [chức năng liên kết issue bằng keyword của GitHub] để liên kết issue tương ứng. Điều này có 2 mục đích: một là để theo dõi lịch sử của PR, hai là để tự động close issue khi PR được merge. Ví dụ, với PR giải quyết issue #123, viết keyword sau trong nội dung:

[chức năng liên kết issue bằng keyword của GitHub]: https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword

```markdown
Close #123
```

Đây là bước cần thiết trong quy trình làm việc.

[Quy trình làm việc](ticket-driven.md)

Khi PR được tạo, CI sẽ chạy để kiểm tra code style. Nếu CI pass, maintainer sẽ merge. Nếu bạn có quyền merge, có thể tự merge sau khi kiểm tra kết quả CI.
