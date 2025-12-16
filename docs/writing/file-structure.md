# Cấu trúc file

Trang này giải thích cấu trúc thư mục và các file trong repository.

Cấu trúc file của repository như sau:

```tree
├── .markdownlint.yaml ... Cấu hình markdownlint
├── .prettierrc ... Cấu hình prettier
├── .textlintrc ... Cấu hình textlint
├── docs/ ... ⭐️ Nội dung sách (văn bản, hình ảnh)
├── docusaurus.config.js ... Cấu hình Docusaurus
├── prh/ ... Định nghĩa rule prh cho textlint
├── sidebars.js ... ⭐️ Cấu hình sidebar (mục lục)
├── src/ ... Các chương trình mở rộng Docusaurus
└── static/ ... File tĩnh cho Docusaurus
```

Đối với người đóng góp, hai phần quan trọng nhất là thư mục `docs` và file `sidebars.js`.
