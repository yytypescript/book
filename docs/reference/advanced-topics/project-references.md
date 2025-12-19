---
sidebar_label: Project References
---

# Project References

Project references của TypeScript là tính năng mạnh mẽ giúp quản lý hiệu quả các chương trình TypeScript quy mô lớn. Với tính năng này, developer có thể chia codebase lớn thành các phần nhỏ hơn và làm việc hiệu quả hơn.

## Project References của TypeScript là gì

Project references là tính năng được giới thiệu trong TypeScript 3.0, cung cấp cách chia các TypeScript project liên quan thành các phần logic và định nghĩa rõ ràng mối quan hệ phụ thuộc giữa chúng. Nhờ đó có thể cấu trúc và quản lý các application hoặc library quy mô lớn dễ dàng hơn.

Ví dụ, một TypeScript project quy mô lớn kiểu monolith (cả frontend và backend) có thể được chia thành các project độc lập nhỏ hơn, và định nghĩa rõ ràng mối quan hệ phụ thuộc giữa chúng. Dưới đây là một ví dụ cấu trúc TypeScript project quy mô lớn sử dụng project references:

```plaintext
├── Frontend
│   ├── UI
│   └── Logic
│
├── Backend
│   ├── API
│   └── Database
│
└── Common
```

Trong đó, UI, Logic, API, Database, Common là các "project" trong project references. Mối quan hệ phụ thuộc giữa các project có thể được định nghĩa rõ ràng như sau:

- Frontend/UI phụ thuộc vào Frontend/Logic
- Frontend/Logic phụ thuộc vào Common
- Backend/API phụ thuộc vào Backend/Database
- Backend/Database phụ thuộc vào Common

Nhờ việc chia thành các đơn vị project, mỗi project có thể được build độc lập. Và việc build cũng được thực hiện tự động dựa trên mối quan hệ phụ thuộc.

## Tại sao cần Project References

Project references mang lại các lợi ích quan trọng sau:

1. Cải thiện đáng kể thời gian build
2. Tăng cường sự phân tách logic giữa các component
3. Thực hiện cách tổ chức code tốt hơn, mới hơn
4. Tăng tốc độ type checking và compilation
5. Giảm memory usage khi sử dụng editor
6. Tăng cường nhóm các phần logic của chương trình

Nhờ các lợi ích này, việc phát triển và bảo trì TypeScript project quy mô lớn trở nên dễ dàng hơn đáng kể.

## Khái niệm cơ bản về Project References

Để hiểu và sử dụng hiệu quả project references, cần nắm một số khái niệm cơ bản và tùy chọn cấu hình.

### Property `references` trong `tsconfig.json`

Trung tâm của project references là property `references` trong file `tsconfig.json`. Property này được sử dụng để định nghĩa tham chiếu đến các project khác.

```json
{
  "compilerOptions": {
    // Các compiler option thông thường
  },
  "references": [{ "path": "../otherproject" }]
}
```

Ví dụ này cho thấy project hiện tại đang tham chiếu đến project ở `../otherproject`.

### Vai trò của option `composite`

Các project được tham chiếu cần bật option `composite`. Option này có các hiệu ứng sau:

1. Nếu `rootDir` không được thiết lập rõ ràng, mặc định sẽ là thư mục chứa file `tsconfig.json`.
2. Tất cả file implementation phải match với pattern `include` hoặc được liệt kê trong mảng `files`.
3. Phải bật option `declaration`.

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  }
}
```

### Option `declarationMap` và lợi ích

Khi bật option `declarationMap`, source map của declaration file (`.d.ts`) sẽ được tạo ra. Điều này mang lại các lợi ích sau:

1. Có thể sử dụng các tính năng của editor như "Go to Definition" hoặc "Rename" một cách trong suốt qua ranh giới project.
2. Có thể nắm bắt chi tiết hơn mối quan hệ tương ứng giữa source code và code sau compile.

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

Bằng cách hiểu các thiết lập cơ bản này, bạn có thể sử dụng hiệu quả project references và quản lý hiệu quả các TypeScript project quy mô lớn.

## Các vấn đề chính mà Project References giải quyết

Project references giải quyết nhiều vấn đề mà developer gặp phải trong các TypeScript project quy mô lớn. Dưới đây là các vấn đề chính và cách giải quyết:

1. Thời gian build dài:
   - Khi sử dụng project references, chỉ cần recompile các project đã thay đổi, giúp giảm đáng kể thời gian compilation trong project quy mô lớn.
2. Độ phức tạp của cấu trúc code:
   - Chia codebase lớn thành các phần logic và quản lý mỗi phần như một project độc lập, giúp cấu trúc tổng thể rõ ràng và dễ quản lý hơn.
3. Quản lý dependency:
   - Có thể định nghĩa rõ ràng dependency giữa các project trong file `tsconfig.json`, làm rõ cấu trúc và mối quan hệ của toàn bộ codebase.
4. Recompilation không cần thiết:
   - Có thể tránh recompilation các phần không thay đổi, giúp tăng đáng kể hiệu quả của build process.
5. Type checking chậm:
   - Chia project thành các phần nhỏ giúp tăng tốc type checking của mỗi phần, cải thiện performance tổng thể.
6. Tham chiếu không phù hợp giữa các module:
   - Định nghĩa rõ ràng ranh giới project giúp ngăn chặn tham chiếu không mong muốn giữa các module, cải thiện cấu trúc code.
7. Độ phức tạp của build process:
   - Sử dụng mode `tsc --build` giúp giảm nhu cầu về nhiều config file hoặc build script phức tạp, đơn giản hóa build process.

Bằng cách giải quyết các vấn đề này, project references giúp cải thiện đáng kể hiệu quả phát triển và khả năng bảo trì của các TypeScript project quy mô lớn.

## Lợi ích của Project References

Khi áp dụng project references, developer có thể hưởng nhiều lợi ích. Các lợi ích chính như sau:

### Hiệu quả về Memory

Project references rất hiệu quả về memory so với phương pháp truyền thống:

1. Giảm số lượng process:
   - Phương pháp truyền thống: Khi chạy `tsc --watch` cho mỗi package, cần 1 process cho mỗi package.
   - Project references: 1 process có thể cover tất cả các package.
2. So sánh memory usage:
   - Phương pháp truyền thống (`tsc --watch`): 120MB~200MB mỗi process
   - Project references: Khoảng 70MB (không thay đổi nhiều theo số lượng package)
3. So sánh với 10 project:
   - Phương pháp truyền thống: 1.2GB~2.0GB
   - Project references: Khoảng 70MB

Việc giảm memory usage đáng kể này cho phép sử dụng tài nguyên máy phát triển cho các task khác.

### Cải thiện Developer Experience (DX)

Việc áp dụng project references mang lại những cải thiện về developer experience sau:

1. Feedback loop nhanh:
   - Rút ngắn thời gian build giúp nhận được feedback nhanh chóng sau khi thay đổi code.
   - Có thể build từng phần, kiểm tra nhanh chỉ phần liên quan đến nơi đang làm việc.
2. Cải thiện performance của IDE:
   - Chia nhỏ project giúp tăng tốc type checking của mỗi phần, cải thiện response của IDE.
   - Giảm memory usage giúp IDE hoạt động mượt mà ngay cả với project quy mô lớn.
3. Cải thiện code navigation:
   - Tính năng `declarationMap` giúp jump giữa các project (như Go to Definition) mượt mà hơn.
4. Làm rõ ranh giới module:
   - Dependency giữa các project trở nên rõ ràng, giúp dễ hiểu architecture.
   - Phát hiện sớm dependency không phù hợp, giúp duy trì chất lượng code dễ dàng hơn.
5. Môi trường phát triển linh hoạt:
   - Có thể làm việc chỉ với một phần của project quy mô lớn, developer có thể tập trung vào phần cần thiết.
6. Đơn giản hóa build process:
   - Mode `tsc --build` giúp không cần build script phức tạp.
7. Cải thiện phát hiện lỗi:
   - Phát hiện nhanh và chính xác hơn sự không khớp về type giữa các project, hoặc dependency không phù hợp.
8. Cải thiện collaboration:
   - Chia project rõ ràng giúp phân công công việc và phạm vi trách nhiệm giữa các team rõ ràng hơn.

Nhờ các lợi ích này, developer có thể làm việc hiệu quả hơn, ít stress hơn, cải thiện chất lượng code và tăng tốc độ phát triển.

### So sánh phương pháp truyền thống và Project References

Bảng sau so sánh sự khác biệt chính giữa quản lý project kiểu monolith truyền thống và sử dụng project references:

| Đặc điểm               | Phương pháp Monolith  | Project References             |
| ---------------------- | --------------------- | ------------------------------ |
| Thời gian build        | Build toàn bộ mỗi lần | Chỉ build phần thay đổi        |
| Quản lý dependency     | Ngầm định             | Rõ ràng                        |
| Tham chiếu giữa module | Không hạn chế         | Hạn chế theo ranh giới project |
| Memory usage           | Cao                   | Thấp                           |
| Performance IDE        | Giảm với project lớn  | Tương đối ổn định              |
| Partial build          | Không thể             | Dễ dàng                        |
| Config file            | Đơn hoặc phức tạp     | Nhiều config rõ ràng           |

Từ so sánh này, có thể thấy project references rất hiệu quả cho quản lý project quy mô lớn.

## Triển khai Project References

Sau khi hiểu khái niệm cơ bản về project references, hãy xem cách triển khai trong các tình huống phức tạp hơn. Ở đây sẽ giải thích triển khai project references trong cấu hình monorepo.

### Monorepo là gì

Monorepo là phương pháp phát triển quản lý nhiều project hoặc package liên quan trong một repository duy nhất. Phương pháp này được ưa chuộng trong phát triển project quy mô lớn hoặc library có nhiều package vì dễ dàng chia sẻ code, quản lý dependency và điều phối release.

### Thiết kế cấu trúc Project

Cấu trúc monorepo điển hình như sau:

```plaintext
.
├── package.json
├── packages (nơi đặt code chương trình)
│   ├── cli
│   ├── common
│   └── web
├── tsconfig.base.json (file mô tả cấu hình compile chung cho tất cả package)
├── tsconfig.json (file mô tả cấu hình project references)
```

Trong ví dụ này, có 3 package (cli, common, web) trong thư mục `packages`. Các package này có mối quan hệ phụ thuộc như sau:

- Package `cli` phụ thuộc vào package `common`
- Package `web` phụ thuộc vào package `common`

Đây là cấu hình implement các tính năng chung trong package `common`, và sử dụng chúng trong `cli` (CLI application) và `web` (web application).

### Cấu hình file `tsconfig.json`

Khi sử dụng project references trong monorepo, cần cấu hình phù hợp nhiều file `tsconfig.json`.

#### `tsconfig.json` ở root

`tsconfig.json` ở thư mục root đóng vai trò như "mục lục" của toàn bộ project:

```json
{
  "include": [],
  "references": [
    {
      "path": "packages/cli"
    },
    {
      "path": "packages/common"
    },
    {
      "path": "packages/web"
    }
  ]
}
```

Cấu hình này giúp TypeScript compiler nhận biết từng package trong monorepo và build theo thứ tự phù hợp.

#### `tsconfig.base.json` chung

Tập hợp cấu hình chung vào `tsconfig.base.json` giúp đơn giản hóa cấu hình của mỗi package:

```json
{
  "compilerOptions": {
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "target": "ESNext",
    "declaration": true,
    "composite": true,
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "${configDir}/src",
    "outDir": "${configDir}/dist"
  }
}
```

Điểm quan trọng ở đây là cấu hình `composite: true`. Nhờ đó mỗi package được nhận biết như một "project" trong project references.

#### `tsconfig.json` của mỗi package

`tsconfig.json` của mỗi package kế thừa cấu hình chung và thêm tham chiếu khi cần:

```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

Ví dụ này là cấu hình của package `cli` hoặc `web`, bao gồm tham chiếu đến package `common`.

### Sử dụng option `composite` và `declarationMap`

Option `composite` là cấu hình bắt buộc trong project references. Nhờ đó project có thể được tham chiếu từ các project khác.

Option `declarationMap` dùng để bao gồm source map trong file `.d.ts`. Nhờ đó cải thiện navigation giữa các project:

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

### Cấu hình tham chiếu giữa các Project

Tham chiếu giữa các project được cấu hình trong section `references` của `tsconfig.json`:

```json
{
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

Ngoài ra, cần khai báo rõ ràng dependency trong `package.json`:

```json
{
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

Cấu hình này giúp cả TypeScript compiler và package manager đều hiểu đúng dependency giữa các project.

## Sử dụng Build Mode

Để sử dụng hiệu quả project references, việc hiểu build mode của TypeScript compiler là quan trọng.

### Tổng quan về lệnh `tsc --build`

Lệnh `tsc --build` (hoặc `tsc -b`) build các project cần thiết theo đúng thứ tự, có xét đến project references.

Cách sử dụng cơ bản:

```bash
tsc -b                  # Sử dụng tsconfig.json ở thư mục hiện tại
tsc -b src              # Sử dụng src/tsconfig.json
tsc -b foo/tsconfig.json bar # Build nhiều project
```

### Incremental Build và Cleaning

`tsc --build` hỗ trợ incremental build, chỉ rebuild các file đã thay đổi và các dependency của chúng. Nhờ đó có thể giảm đáng kể thời gian build trong project quy mô lớn.

Để thực hiện clean build, sử dụng flag `--clean`:

```bash
tsc -b --clean
```

Lệnh này xóa output của build, và ở lần build tiếp theo sẽ recompile tất cả các file.

### Sử dụng Watch Mode

Watch mode theo dõi thay đổi của file và tự động rebuild:

```bash
tsc -b --watch
```

Điều này rất tiện lợi trong quá trình phát triển, không cần thực thi build thủ công mỗi khi thay đổi code.

## Công cụ quản lý Project References

Trong project quy mô lớn, việc quản lý project references có thể trở nên phức tạp. Vì vậy một số công cụ quản lý đã được phát triển:

- [Moonrepo](https://moonrepo.dev/moon)
- [@monorepo-utils/workspaces-to-typescript-project-references](https://www.npmjs.com/package/@monorepo-utils/workspaces-to-typescript-project-references)
- [update-ts-references](https://www.npmjs.com/package/update-ts-references)

## Lưu ý và Trade-off

Khi áp dụng project references, cần lưu ý các điểm sau:

1. Độ phức tạp của initial setup: Thiết lập ban đầu project references phức tạp hơn so với sử dụng một `tsconfig.json` duy nhất.
2. Quản lý build output: Cần quản lý phù hợp output directory của mỗi project.
3. Tương thích với build workflow hiện có: Có thể cần cập nhật build script hoặc CI/CD pipeline hiện có.
4. Learning curve: Các thành viên trong team cần hiểu khái niệm và cách sử dụng project references.

Các vấn đề này thường được bù đắp bởi lợi ích thu được khi quy mô project tăng lên.

Project references là tính năng mạnh mẽ cải thiện đáng kể việc quản lý TypeScript project quy mô lớn. Triển khai phù hợp có thể cải thiện hiệu quả phát triển, rút ngắn thời gian build và tổ chức codebase tốt hơn. Chương tiếp theo sẽ xem các ví dụ ứng dụng cụ thể của project references.

## Ứng dụng Project References: Monorepo

### Giới thiệu

#### Tổng quan

Tutorial này hướng dẫn từng bước cách xây dựng monorepo sử dụng tính năng project references của TypeScript.

#### Mục đích

Mục đích của hướng dẫn này là xây dựng cấu trúc monorepo bao gồm các yếu tố sau:

1. Project `common` chứa code chung
2. Project `cli` sử dụng project `common`
3. Project `web` sử dụng project `common`

Các project này được liên kết với nhau thông qua tính năng project references của TypeScript.

#### Cấu trúc Project cuối cùng

Khi hoàn thành tutorial, project sẽ có cấu trúc như sau:

```plaintext
typescript-monorepo-example/ (workspace root)
├── package.json
├── tsconfig.json
├── tsconfig.base.json
├── .yarnrc.yml
└── packages/
    ├── common/ (project)
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       └── index.ts
    ├── cli/ (project)
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       └── index.ts
    └── web/ (project)
        ├── package.json
        ├── tsconfig.json
        └── src/
            └── index.ts
```

Cấu trúc này cho phép chia sẻ code hiệu quả, type checking và build nhanh.

#### Code hoàn chỉnh

Code hoàn chỉnh của tutorial này có thể xem tại GitHub repository:
https://github.com/yytypescript/project-reference-samples/tree/main/02-monorepo

### Giải thích thuật ngữ

#### Workspace

Chỉ toàn bộ project bao gồm nhiều project, được quản lý bằng tính năng workspace của Yarn.

#### Workspace Root

Chỉ thư mục cấp cao nhất của workspace. Trong ví dụ này, thư mục `typescript-monorepo-example/` là workspace root.

#### Project

Chỉ đơn vị compilation của TypeScript. Trong ví dụ này, các thư mục `common`, `cli`, `web` là các project độc lập.

#### Project Root

Chỉ thư mục cấp cao nhất của mỗi project. Ví dụ, thư mục `packages/common/` là project root của project `common`.

### Yêu cầu

Trước khi bắt đầu tutorial này, hãy đảm bảo các công cụ sau đã được cài đặt:

- Node.js (phiên bản LTS mới nhất)
- Yarn (phiên bản 4.4.0 trở lên)

Ngoài ra, giả định bạn đã có kiến thức cơ bản về TypeScript.

### Khởi tạo Workspace

#### Tạo thư mục

Đầu tiên, tạo thư mục cho workspace mới. Mở terminal và chạy lệnh sau:

```bash
mkdir typescript-monorepo-example
cd typescript-monorepo-example
```

#### Tạo package.json

Tiếp theo, tạo trực tiếp file `package.json` ở workspace root. Tạo file `package.json` với nội dung sau:

```json
{
  "name": "typescript-monorepo-example",
  "private": true,
  "workspaces": ["packages/*"],
  "devDependencies": {
    "typescript": "^5.5.4"
  }
}
```

Các điểm quan trọng ở đây:

- `"private": true`: Field này ngăn package bị publish nhầm. Package root của monorepo thường không được publish nên cần set flag này.
- `"workspaces": ["packages/*"]`: Field này chỉ cho Yarn biết vị trí của workspace. Với cấu hình này, tất cả các thư mục con trong thư mục `packages` sẽ được nhận biết là project của workspace.

#### Tạo .yarnrc.yml

Tiếp theo, tạo file cấu hình Yarn `.yarnrc.yml` ở workspace root và thêm nội dung sau:

```yaml
nodeLinker: node-modules
```

Cấu hình này làm cho Yarn sử dụng thư mục node_modules.

### Cấu hình TypeScript chung

#### Tạo tsconfig.base.json

Tạo cấu hình TypeScript chung. Tạo file `tsconfig.base.json` ở workspace root và thêm nội dung sau:

```json
{
  "compilerOptions": {
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "target": "ESNext",
    "declaration": true,
    "composite": true,
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "${configDir}/src",
    "outDir": "${configDir}/dist"
  }
}
```

Vai trò của `tsconfig.base.json` là cung cấp cấu hình TypeScript cơ bản được chia sẻ bởi tất cả các project. Trong cấu hình này, các điểm đặc biệt quan trọng với project references:

- `"composite": true`: Option này bắt buộc khi sử dụng project references. Nhờ đó project có thể được tham chiếu từ các project khác.
- `"declaration": true`: Tạo declaration file (.d.ts). Điều này cần thiết khi sử dụng `"composite": true`.
- `"rootDir"` và `"outDir"`: Các option này chỉ định vị trí của source file và output file. Khi sử dụng project references, các cấu hình này quan trọng để đảm bảo tính nhất quán.

#### Tạo tsconfig.json ở workspace root

Tiếp theo, tạo file `tsconfig.json` ở workspace root và thêm nội dung sau:

```json
{
  "include": [],
  "references": [
    {
      "path": "packages/common"
    },
    {
      "path": "packages/cli"
    },
    {
      "path": "packages/web"
    }
  ]
}
```

`tsconfig.json` ở workspace root đóng vai trò như "mục lục" hoặc "bản đồ" cho TypeScript compiler. Field `"references"` trong file này liệt kê tất cả các project trong workspace, nhờ đó TypeScript compiler có thể nắm bắt cấu trúc của toàn bộ workspace. Thứ tự liệt kê các project ở đây không quan trọng, TypeScript compiler sẽ tự động phân tích dependency và quyết định thứ tự build phù hợp.

Lưu ý rằng file này không bao gồm `compilerOptions`. Cấu hình riêng của mỗi project được thực hiện trong `tsconfig.json` của project đó. Mục đích chính của file này là cho phép build toàn bộ workspace cùng một lúc. Chỉ cần chạy `tsc -b` ở workspace root là có thể build tất cả các project theo thứ tự phù hợp.

Thực tế, ngay cả không có file này, vẫn có thể build với việc resolve dependency bằng cách chạy `tsc -b` ở mỗi project (ví dụ: `packages/web`). Tuy nhiên, chuẩn bị file này giúp việc build toàn bộ workspace trở nên đơn giản. File này là công cụ quan trọng để quản lý project quy mô lớn dễ dàng và tối ưu hóa build process. Đặc điểm là tập trung vào định nghĩa cấu trúc project, không phải kiểm soát compilation.

### Cấu hình Project

#### Tạo cấu trúc cơ bản của Project

Đầu tiên, tạo cấu trúc cơ bản của project. Tạo thư mục `packages` và trong đó tạo 3 thư mục con (`common`, `cli`, `web`). Chạy lệnh sau:

```bash
mkdir -p packages/{common,cli,web}
```

#### Cấu hình project common

Đầu tiên, cấu hình project `common`. Tạo file `packages/common/package.json` và thêm nội dung sau:

```json
{
  "name": "@company/common",
  "type": "module",
  "exports": "./dist/index.js"
}
```

Ở đây, field `"exports"` chỉ định entry point mà package này expose ra ngoài. Điều này làm rõ điểm tham chiếu khi các project khác import package này.

Tiếp theo, tạo file `packages/common/tsconfig.json` và thêm nội dung sau:

```json
{
  "extends": "../../tsconfig.base.json"
}
```

Field `"extends"` chỉ định việc kế thừa cấu hình từ TSConfig file khác. Trong trường hợp này, kế thừa cấu hình từ `tsconfig.base.json` ở workspace root.

Cuối cùng, tạo file `packages/common/src/index.ts` và thêm nội dung sau:

```typescript title="packages/common/src/index.ts"
export function helloWorld(): string {
  return "Hello World";
}
```

#### Cấu hình project cli

Tiếp theo, cấu hình project `cli`. Tạo file `packages/cli/package.json` và thêm nội dung sau:

```json
{
  "name": "@company/cli",
  "type": "module",
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

Field `"dependencies"` chỉ định các package khác mà project này phụ thuộc. Ở đây khai báo dependency đến package `@company/common`. `"workspace:^"` cho biết package này là project khác trong workspace.

Tiếp theo, tạo file `packages/cli/tsconfig.json` và thêm nội dung sau:

```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

Field `"references"` chỉ định các project khác mà project này tham chiếu. Nhờ đó, TypeScript compiler có thể hiểu dependency giữa các project và thực hiện build theo thứ tự phù hợp.

Cuối cùng, tạo file `packages/cli/src/index.ts` và thêm nội dung sau:

```typescript title="packages/cli/src/index.ts"
import { helloWorld } from "@company/common";

console.log(helloWorld());
```

#### Cấu hình project web

Cuối cùng, cấu hình project `web`. Tạo file `packages/web/package.json` và thêm nội dung sau:

```json
{
  "name": "@company/web",
  "type": "module",
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

Tiếp theo, tạo file `packages/web/tsconfig.json` và thêm nội dung sau:

```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

Cuối cùng, tạo file `packages/web/src/index.ts` và thêm nội dung sau:

```typescript title="packages/web/src/index.ts"
import { helloWorld } from "@company/common";

console.log(helloWorld());
```

### Cài đặt Dependency

Sau khi hoàn thành cấu hình tất cả các project, cài đặt dependency. Chạy lệnh sau ở workspace root:

```bash
yarn install
```

### Build Project

Bây giờ đã sẵn sàng để build toàn bộ workspace. Chạy lệnh sau ở workspace root để build project:

```bash
yarn tsc -b
```

Việc chạy lệnh này ở workspace root là quan trọng vì `tsconfig.json` ở workspace root định nghĩa cấu trúc project references.

Khi chạy lệnh này, các xử lý sau sẽ được thực hiện:

1. TypeScript compiler (tsc) đầu tiên đọc `tsconfig.json` ở workspace root. File này có field `"references"`, và các project được liệt kê ở đây sẽ là đối tượng build.
2. Thứ tự được ghi trong field `"references"` không quan trọng. TypeScript compiler sẽ phân tích các tham chiếu này và tự động xác định dependency giữa các project.
3. Dựa trên dependency graph, build các project theo thứ tự phù hợp. Trong ví dụ này, build được thực hiện theo thứ tự:
   - Đầu tiên project `common` (vì không phụ thuộc vào project khác)
   - Tiếp theo project `cli` và `web` (vì cả hai đều phụ thuộc vào `common`)
4. Khi build mỗi project, `tsconfig.json` của project đó được sử dụng. Các file cấu hình này kế thừa từ `tsconfig.base.json` nên cấu hình chung được áp dụng.
5. Source file của mỗi project được compile, và JavaScript file cùng type definition file (.d.ts) được tạo ra trong output directory được chỉ định (`dist`).
6. File `.tsbuildinfo` chứa thông tin project references được tạo ra cho mỗi project. Nhờ đó, ở lần build tiếp theo chỉ cần recompile các file đã thay đổi, giúp rút ngắn thời gian build.

Qua process này, dependency giữa các project được resolve đúng cách và build được thực hiện theo thứ tự cần thiết. Ngoài ra, chỉ các project đã thay đổi và dependency của chúng được rebuild, nên có thể build hiệu quả ngay cả với project quy mô lớn.

### Chạy

Sau khi build thành công, hãy chạy các project đã tạo. Đầu tiên, chạy CLI project:

```bash
node packages/cli/dist/index.js
```

Tiếp theo, chạy Web project:

```bash
node packages/web/dist/index.js
```

Nếu cả hai lệnh đều output "Hello World", setup đã thành công.

### Tổng kết

Trong tutorial này, chúng ta đã học cách xây dựng monorepo sử dụng tính năng project references của TypeScript. Cấu trúc này cho phép quản lý hiệu quả các TypeScript project quy mô lớn, rút ngắn thời gian build và tăng khả năng tái sử dụng code. Bằng cách tận dụng project references, có thể thu được nhiều lợi ích như rút ngắn thời gian build, tối ưu hóa type checking và làm rõ dependency.

## Ứng dụng Project References: Tách Source và Test

### Giới thiệu {#source-test-separation-intro}

#### Tổng quan {#source-test-separation-overview}

Tutorial này giải thích từng bước cách xây dựng project có cấu trúc tách biệt source code và test code, sử dụng tính năng project references của TypeScript.

#### Mục đích {#source-test-separation-purpose}

Mục đích của hướng dẫn này là xây dựng cấu trúc project bao gồm các yếu tố sau:

1. Thư mục `src` chứa source code chính
2. Các file `.test.ts` trong thư mục `src` chứa test code
3. Tách biệt source code và test code, đồng thời liên kết chúng bằng project references

Cấu trúc này giúp tối ưu hóa build và làm rõ dependency. Việc làm rõ dependency mang lại các lợi ích sau:

- Cấu trúc code trở nên rõ ràng, developer dễ nắm bắt toàn cảnh hơn.
- Ngăn chặn dependency không phù hợp (ví dụ: source code phụ thuộc vào test code), cải thiện chất lượng code.
- Dẫn đến tối ưu hóa build process, rút ngắn thời gian build trong project quy mô lớn.

#### Cấu trúc Project cuối cùng {#source-test-separation-final-structure}

Khi hoàn thành tutorial, project sẽ có cấu trúc như sau:

```plaintext
typescript-source-test-separation/
├── package.json
├── tsconfig.json
├── tsconfig.src.json
├── tsconfig.test.json
├── .yarnrc.yml
└── src/
    ├── hello-world.ts
    └── hello-world.test.ts
```

Cấu trúc này cho phép quản lý code hiệu quả và build nhanh.

#### Code hoàn chỉnh {#source-test-separation-final-code}

Code hoàn chỉnh của tutorial này có thể xem tại GitHub repository:
https://github.com/yytypescript/project-reference-samples/tree/main/01-source-test-separation

### Yêu cầu {#source-test-separation-prerequisites}

Trước khi bắt đầu tutorial này, hãy đảm bảo các công cụ sau đã được cài đặt:

- Node.js (phiên bản LTS mới nhất)
- Yarn (phiên bản 4.4.0 trở lên)

Ngoài ra, giả định bạn đã có kiến thức cơ bản về TypeScript.

### Khởi tạo Project {#source-test-separation-init}

Đầu tiên, tạo thư mục cho project mới. Mở terminal và chạy lệnh sau:

```bash
mkdir typescript-source-test-separation
cd typescript-source-test-separation
```

Tiếp theo, tạo thủ công file `package.json`. Thêm nội dung sau vào file `package.json`:

```json
{
  "name": "typescript-source-test-separation",
  "private": true,
  "devDependencies": {
    "@types/node": "^22.3.0",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}
```

Tiếp theo, tạo file `.yarnrc.yml` và thêm nội dung sau:

```yaml
nodeLinker: node-modules
```

Cấu hình này làm cho Yarn sử dụng thư mục node_modules.

Cuối cùng, cài đặt dependency:

```bash
yarn install
```

### Tạo file cấu hình TypeScript

#### tsconfig.json ở root

Tạo file `tsconfig.json` ở thư mục root của project và thêm nội dung sau:

```json
{
  "files": [],
  "references": [
    {
      "path": "tsconfig.src.json"
    },
    {
      "path": "tsconfig.test.json"
    }
  ]
}
```

File này đóng vai trò như "mục lục" hoặc "bản đồ" cho TypeScript compiler. Field `"references"` chỉ định các TSConfig file khác mà project này tham chiếu. Nhờ đó, TypeScript compiler có thể hiểu dependency giữa các project và thực hiện build theo thứ tự phù hợp.

Bằng cách set field `"files"` thành rỗng, file này không trở thành đối tượng compile, chỉ thực hiện cấu hình project references thuần túy. Điều này cho phép định nghĩa cấu trúc toàn bộ project, đồng thời giao compilation thực tế cho cấu hình của mỗi sub-project.

#### tsconfig.src.json cho source code

Tiếp theo, tạo file `tsconfig.src.json` cho source code và thêm nội dung sau:

```json
{
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["**/*.ts"],
  "exclude": ["**/*.test.ts"]
}
```

Trong file này, các cấu hình sau đặc biệt quan trọng:

- `"composite": true`: Option này bắt buộc khi sử dụng project references. Nhờ đó project này có thể được tham chiếu từ các project khác.
- `"rootDir"`: Chỉ định thư mục root của source file.
- `"outDir"`: Chỉ định nơi output file sau compile.

Các cấu hình khác:

- `"include"`: Chỉ định các file là đối tượng compile.
- `"exclude"`: Chỉ định các file loại trừ khỏi compile. Ở đây loại trừ test file.

#### tsconfig.test.json cho test code

Cuối cùng, tạo file `tsconfig.test.json` cho test code và thêm nội dung sau:

```json
{
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "noEmit": true,
    "skipLibCheck": true
  },
  "references": [
    {
      "path": "tsconfig.src.json"
    }
  ]
}
```

Trong file này, các cấu hình sau đặc biệt quan trọng:

- `"composite": true`: Tương tự cấu hình source code, cho phép project references.
- `"references"`: Định nghĩa tham chiếu đến project source code. Điều này làm rõ dependency từ test code đến source code.
- `"noEmit": true`: Với cấu hình này, test code không được transpile (chuyển đổi sang JavaScript), nhưng type checking vẫn được thực hiện. Điều này đáp ứng yêu cầu không cần transpile test code vì nó được chạy trực tiếp, trong khi vẫn muốn kiểm tra tính nhất quán của type.

Các cấu hình khác:

- `"skipLibCheck": true`: Bỏ qua type checking của declaration file, rút ngắn thời gian build.

Với cấu hình này, không thể có dependency từ source code đến test code. Đây là lợi ích quan trọng để ngăn test code lẫn vào production code, cải thiện chất lượng và khả năng bảo trì của code.

### Tạo Source Code và Test Code

#### Tạo Source Code

Tạo thư mục `src` và tạo file `hello-world.ts` trong đó:

```typescript
export function helloWorld(): string {
  return "Hello World";
}
```

#### Tạo Test Code

Tương tự, tạo file `hello-world.test.ts` trong thư mục `src`:

```typescript
import { expect, test } from "vitest";
import { helloWorld } from "./hello-world";

test("helloWorld function", () => {
  expect(helloWorld()).toBe("Hello World");
});
```

### Build và Test Project

Bây giờ đã sẵn sàng để build project và chạy test.

#### Chỉ compile Source Code

Để chỉ compile source code, chạy lệnh sau:

```bash
yarn tsc -b tsconfig.src.json
```

Lệnh này chỉ compile source code được định nghĩa trong `tsconfig.src.json`. Test code được loại trừ.

#### Compile cả Source Code và Test Code

Để compile cả source code và test code, chạy lệnh sau ở root của project:

```bash
yarn tsc -b
```

Khi chạy lệnh này, các xử lý sau được thực hiện nội bộ:

1. TypeScript compiler đầu tiên đọc `tsconfig.json` ở root.
2. Xây dựng dependency graph:
   - Dựa trên field `references` của `tsconfig.json`, `tsconfig.src.json` và `tsconfig.test.json` được tham chiếu.
   - Thêm vào đó, dựa trên field `references` của `tsconfig.test.json`, dependency đến `tsconfig.src.json` được nhận biết.
   - Nhờ đó, dependency graph `src` → `test` được xây dựng.
3. Thực thi compile:
   - Dựa trên dependency graph, xử lý các project theo thứ tự phù hợp.
   - Đầu tiên `tsconfig.src.json` được xử lý. Nhờ đó source code được transpile và output file được tạo ra.
   - Tiếp theo `tsconfig.test.json` được xử lý. Lúc này tham chiếu output của `tsconfig.src.json`.
   - Do cấu hình `"noEmit": true` của `tsconfig.test.json`, test code không được transpile, nhưng type checking được thực hiện.

Qua process này, transpile source code và type checking test code được thực hiện trong một thao tác. Điều này đảm bảo tính nhất quán của type giữa source code và test code, đồng thời ngăn test code bị transpile không cần thiết.

#### Chạy Test

Để chạy test, sử dụng lệnh sau:

```bash
yarn vitest
```

Lệnh này sử dụng Vitest để chạy test.

### Lợi ích của Project References {#source-test-separation-benefits}

Cấu trúc project này có các lợi ích sau:

1. **Tối ưu hóa Build**: Vì source code và test code được tách biệt, test code không được include trong build cho production.
2. **Làm rõ Dependency**: Cấu trúc test project phụ thuộc vào source project giúp ngăn dependency không phù hợp. Đặc biệt, vì không thể có dependency từ source code đến test code, chất lượng production code được cải thiện.
3. **Feedback nhanh**: Cho phép build từng phần, có thể kiểm tra nhanh chỉ phần đã thay đổi.
4. **Cải thiện Performance IDE**: Việc chia nhỏ project giúp tăng tốc type checking của mỗi phần, cải thiện response của IDE.

### Tổng kết {#source-test-separation-summary}

Trong tutorial này, chúng ta đã học cách xây dựng project có cấu trúc tách biệt source code và test code, sử dụng tính năng project references của TypeScript. Cấu trúc này cho phép quản lý hiệu quả các TypeScript project quy mô lớn, rút ngắn thời gian build và cải thiện chất lượng code. Bằng cách tận dụng project references, có thể tối ưu hóa development process và cải thiện khả năng bảo trì.

## Kết luận

Tính năng project references của TypeScript là công cụ mạnh mẽ giúp tối ưu hóa việc quản lý project quy mô lớn. Các lợi ích chính bao gồm rút ngắn thời gian build, cải thiện cấu trúc code, và tối ưu hóa type checking. Với tính năng này, có thể chia codebase lớn thành các phần logic và làm rõ dependency giữa các module. Việc áp dụng project references đòi hỏi học tập, nhưng giá trị của nó tăng lên khi quy mô project lớn hơn. Đối với developer của các TypeScript project quy mô lớn, việc thành thạo tính năng này sẽ là đầu tư quan trọng để cải thiện năng suất và chất lượng.
