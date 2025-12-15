# Deploy lên Vercel

Trong tutorial này, bạn sẽ học cách deploy lên Vercel ứng dụng tạo ảnh mèo đã tạo trong hands-on Next.js trước đó.

## Vercel là gì?

Là cloud platform cho frontend do Vercel - công ty phát triển Next.js - cung cấp, có các đặc điểm sau.

- Có thể xây dựng môi trường deploy dễ dàng chỉ bằng cách liên kết với GitHub repository mà không cần config đặc biệt (zero config)
- Có thể sử dụng môi trường preview tự động theo từng pull request
- Tự động nén file JavaScript và CSS và phân phối qua môi trường CDN

Đặc biệt Vercel được phát triển như môi trường hosting Next.js, có thể sử dụng tính năng server-side của Next.js mà không cần setup đặc biệt, nên nếu không có lý do sử dụng cloud platform khác, Vercel là lựa chọn được khuyến nghị làm môi trường hosting cho Next.js.

## Những thứ cần thiết cho tutorial này

Trong tutorial lần này, để xây dựng môi trường deploy bằng cách liên kết với GitHub repository, cần những thứ sau.

- Tài khoản GitHub
- Code đã tạo trong "[Tạo trình tạo ảnh mèo với Next.js](./nextjs.md)" và GitHub repository đã push code đó
  - Nếu bạn đã thực hiện tutorial trên, hãy push code vào repository của tài khoản GitHub của bạn.
  - Nếu bạn không cần phải là code tự tạo, cũng có thể [fork](https://docs.github.com/ja/get-started/quickstart/fork-a-repo) [random-cat repository](https://github.com/yytypescript/random-cat) do sách này cung cấp.

## Quy trình deploy

- Tạo tài khoản Vercel
- Đăng nhập vào Vercel
- Liên kết GitHub repository

## Tạo tài khoản Vercel

:::note
Nếu bạn đã có tài khoản Vercel, hãy bỏ qua bước này.
:::

Đầu tiên, truy cập [Vercel](https://vercel.com/signup) và tạo tài khoản Vercel bằng tài khoản GitHub. Sau khi tạo tài khoản, màn hình chọn GitHub repository để liên kết sẽ hiển thị, hãy tiếp tục với "Liên kết GitHub repository".

## Đăng nhập vào Vercel

Chuyển đến [màn hình đăng nhập Vercel](https://vercel.com/login) và đăng nhập bằng tài khoản GitHub.

## Liên kết GitHub repository

Truy cập [trang liên kết GitHub repository của Vercel](https://vercel.com/new), tìm kiếm GitHub repository của trình tạo ảnh mèo và click nút "Import".

![Màn hình liên kết GitHub repository của Vercel, tìm kiếm "random-cat" từ repository của user, nút "Import" hiển thị bên cạnh tên repository trong kết quả tìm kiếm.](vercel-deploy/vercel-import-github-random-cat.png)

Màn hình config project hiển thị, để config mặc định và click nút "Deploy".

![Màn hình tạo project mới của Vercel, GitHub repository "random-cat" được chọn, preset Next.js được set. Tên project và root directory được tự động điền, nút "Deploy" hiển thị.](vercel-deploy/vercel-project-settings-random-cat.png)

Nếu màn hình hoàn tất deploy hiển thị thì deploy đã hoàn thành. 🎉Preview hiển thị trên màn hình là link, click vào có thể hiển thị app đã deploy.

![Màn hình hoàn tất deploy của Vercel, cùng với message thông báo deploy project mới thành công, ở giữa hiển thị app hiển thị ảnh mèo với nút "Xem mèo khác".](vercel-deploy/vercel-deploy-complete-random-cat.png)

Click nút "Continue To Dashboard" để chuyển đến trang dashboard của project. Trên dashboard có thể xác nhận domain được Vercel tự động tạo. Domain này không thay đổi miễn là project còn tồn tại, nên có thể công khai app bằng cách chia sẻ URL này với người khác.

![Thông tin production deploy của project "random-cat" hiển thị trên dashboard Vercel. Ở giữa có nút "Xem mèo khác" và ảnh mèo, bên phải hiển thị chi tiết như URL deploy và status "Ready".](vercel-deploy/vercel-dashboard-production-random-cat.png)

## Trải nghiệm auto deploy

Hãy tạo và merge pull request để thực thi auto deploy. Trong Vercel, môi trường CI/CD cho auto deploy cũng được tự động xây dựng khi hoàn tất liên kết GitHub, nên chỉ cần tạo và merge pull request là tự động deploy.

Hãy thực sự sửa một phần code của trình tạo ảnh mèo và thực thi auto deploy.

Thay đổi text của button từ "Xem mèo khác" thành "One more cat!" như sau và tạo pull request trên GitHub repository.

```tsx twoslash {22-24} title="app/cat-image.tsx"
// @filename: index.tsx
// @jsx: react-jsx
// ---cut---
"use client";
import { useState } from "react";
import { fetchImage } from "./fetch-image";
import styles from "./page.module.css";
type CatImageProps = {
  url: string;
};
export function CatImage({ url }: CatImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(url);
  const refreshImage = async () => {
    setImageUrl("");
    const image = await fetchImage();
    setImageUrl(image.url);
  };
  return (
    <div className={styles.page}>
      <button onClick={refreshImage} className={styles.button}>
        One more cat!
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

Vercel tự động thực thi build và deploy môi trường preview khi có branch mới được push vào GitHub repository đã liên kết.

Khi tạo pull request, Vercel BOT sẽ comment status của build và URL môi trường preview như hình, reviewer có thể dễ dàng xác nhận thay đổi mới bằng cách click link "Visit Preview".

![Comment được Vercel BOT đăng trên pull request GitHub, hiển thị bảng trạng thái deploy mới nhất của project "random-cat". Status là "Ready", có thể truy cập môi trường preview từ link "Visit Preview".](vercel-deploy/vercel-github-pr-preview-comment.png)

Kết quả build cũng hiển thị trong status checks của pull request, nên cũng có thể ngăn ngừa sự cố deploy nhầm khi build fail.

![Màn hình pull request GitHub, 2 check của Vercel thành công, xác nhận không có conflict với base branch. Nút "Merge pull request" có màu xanh và enabled.](vercel-deploy/vercel-github-checks-merge-ready.png)

Click nút "Merge pull request" để merge pull request này. Khi có branch mới được merge vào base branch, update sẽ tự động deploy vào môi trường production.

Bằng cách truy cập URL môi trường production đã xác nhận trước đó, có thể xác nhận design của button đã thay đổi và sửa đổi lần này đã được tự động deploy vào môi trường production. 😺

![Màn hình preview của trình tạo ảnh mèo deploy trên Vercel. Ở giữa màn hình hiển thị nút "One more cat!" và ảnh mèo mướp đang nhìn figurine hổ.](vercel-deploy/random-cat-preview-one-more-cat.png)

## Xóa project

Nếu bạn lo lắng về project còn lại, có thể xóa project bằng cách di chuyển đến trang Settings, click nút "Delete" và nhập text cần thiết trong dialog.

![Màn hình settings project Vercel, hiển thị section xóa project "random-cat", nút "Delete" màu đỏ được highlight. Có mũi tên chú thích cho thấy được truy cập từ tab "Settings" ở trên.](vercel-deploy/vercel-project-settings-delete-random-cat.png)
![Dialog xóa project Vercel, tên project và text "delete my project" được nhập vào 2 ô input để xác nhận xóa, nút "Delete" được highlight.](vercel-deploy/vercel-project-delete-confirmation.png)
