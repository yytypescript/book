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

| Đặc điểm            | Phương pháp Monolith     | Project References         |
| ------------------- | ------------------------ | -------------------------- |
| Thời gian build     | Build toàn bộ mỗi lần    | Chỉ build phần thay đổi    |
| Quản lý dependency  | Ngầm định                | Rõ ràng                    |
| Tham chiếu giữa module | Không hạn chế         | Hạn chế theo ranh giới project |
| Memory usage        | Cao                      | Thấp                       |
| Performance IDE     | Giảm với project lớn     | Tương đối ổn định          |
| Partial build       | Không thể                | Dễ dàng                    |
| Config file         | Đơn hoặc phức tạp        | Nhiều config rõ ràng       |

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

### ワークスペースの初期化

#### ディレクトリの作成

まず、新しいワークスペースのためのディレクトリを作成します。ターミナルを開き、次のコマンドを実行してください：

```bash
mkdir typescript-monorepo-example
cd typescript-monorepo-example
```

#### package.json の作成

次に、ワークスペースルートに `package.json` ファイルを直接作成します。次の内容で `package.json` ファイルを作成してください：

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

ここで重要なポイントは次の通りです：

- `"private": true`: このフィールドは、このパッケージが誤って公開されることを防ぎます。モノレポのルートパッケージは通常公開されないため、このフラグを設定します。
- `"workspaces": ["packages/*"]`: このフィールドは、Yarnにワークスペースの場所を指示します。この設定により、`packages` ディレクトリ内のすべてのサブディレクトリがワークスペースのプロジェクトとして認識されます。

#### .yarnrc.yml の作成

続いて、Yarnの設定ファイル `.yarnrc.yml` をワークスペースルートに作成し、次の内容を追加します：

```yaml
nodeLinker: node-modules
```

この設定により、Yarnがnode_modulesディレクトリを使用するようになります。

### 共通の TypeScript 設定

#### tsconfig.base.json の作成

TypeScriptの共通設定を作成します。ワークスペースルートに `tsconfig.base.json` ファイルを作成し、次の内容を追加してください：

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

`tsconfig.base.json` の役割は、すべてのプロジェクトで共有される基本的なTypeScript設定を提供することです。この設定の中で、プロジェクト参照において特に重要なポイントは次の通りです：

- `"composite": true`: このオプションは、プロジェクト参照を使用する際に必須です。これにより、プロジェクトが他のプロジェクトから参照可能になります。
- `"declaration": true`: 宣言ファイル（.d.ts）を生成します。これは `"composite": true` を使用する際に必要です。
- `"rootDir"` と `"outDir"`: これらのオプションは、ソースファイルと出力ファイルの場所を指定します。プロジェクト参照を使用する際、これらの設定は一貫性を保つために重要です。

#### ワークスペースルートの tsconfig.json の作成

次に、ワークスペースルートに `tsconfig.json` ファイルを作成し、次の内容を追加します：

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

このワークスペースルートの `tsconfig.json` は、TypeScriptコンパイラーに向けた「目次」または「地図」のような役割を果たします。このファイルの `"references"` フィールドには、ワークスペース内のすべてのプロジェクトが列挙されており、これによってTypeScriptコンパイラーはワークスペース全体の構造を把握できます。ここでのプロジェクトの列挙順序は重要ではなく、TypeScriptコンパイラーが自動的に依存関係を解析し、適切なビルド順序を決定します。

このファイルには `compilerOptions` を含めていないことに注目してください。各プロジェクト固有の設定は、それぞれのプロジェクトの `tsconfig.json` で行います。このファイルの主な目的は、ワークスペース全体を一度にビルドできるようにすることです。ワークスペースルートで `tsc -b` を実行するだけで、すべてのプロジェクトを適切な順序でビルドできるようになります。

実際には、このファイルがなくても各プロジェクト（例：`packages/web`）で `tsc -b` を実行すれば、依存関係を解決しながらビルドすることは可能です。しかし、このファイルを用意することで、ワークスペース全体のビルドが簡単になります。このファイルは、大規模なプロジェクトの管理を容易にし、ビルドプロセスを効率化するための重要なツールです。コンパイルの制御ではなく、プロジェクト構造の定義に焦点を当てていることが特徴です。

### プロジェクトの設定

#### プロジェクトの基本構造の作成

まず、プロジェクトの基本構造を作成します。`packages` ディレクトリを作成し、その中に3つのサブディレクトリ（`common`、`cli`、`web`）を作成します。次のコマンドを実行してください：

```bash
mkdir -p packages/{common,cli,web}
```

#### common プロジェクトの設定

まず、`common` プロジェクトの設定を行います。`packages/common/package.json` ファイルを作成し、次の内容を追加してください：

```json
{
  "name": "@company/common",
  "type": "module",
  "exports": "./dist/index.js"
}
```

ここで、`"exports"` フィールドは、このパッケージが外部に公開するエントリーポイントを指定します。これにより、他のプロジェクトがこのパッケージをインポートする際の参照先が明確になります。

次に、`packages/common/tsconfig.json` ファイルを作成し、次の内容を追加します：

```json
{
  "extends": "../../tsconfig.base.json"
}
```

`"extends"` フィールドは、別の TSConfig ファイルから設定を継承することを指定します。この場合、ワークスペースルートの `tsconfig.base.json` から設定を継承しています。

最後に、`packages/common/src/index.ts` ファイルを作成し、次の内容を追加します：

```typescript title="packages/common/src/index.ts"
export function helloWorld(): string {
  return "Hello World";
}
```

#### cli プロジェクトの設定

次に、`cli` プロジェクトの設定を行います。`packages/cli/package.json` ファイルを作成し、次の内容を追加してください：

```json
{
  "name": "@company/cli",
  "type": "module",
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

`"dependencies"` フィールドは、このプロジェクトが依存する他のパッケージを指定します。ここでは、`@company/common` パッケージへの依存を宣言しています。`"workspace:^"` は、このパッケージがワークスペース内の別のプロジェクトであることを示しています。

続いて、`packages/cli/tsconfig.json` ファイルを作成し、次の内容を追加します：

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

`"references"` フィールドは、このプロジェクトが参照する他のプロジェクトを指定します。これにより、TypeScriptコンパイラはプロジェクト間の依存関係を理解し、適切な順序でビルドを行うことができます。

最後に、`packages/cli/src/index.ts` ファイルを作成し、次の内容を追加します：

```typescript title="packages/cli/src/index.ts"
import { helloWorld } from "@company/common";

console.log(helloWorld());
```

#### web プロジェクトの設定

最後に、`web` プロジェクトの設定を行います。`packages/web/package.json` ファイルを作成し、次の内容を追加してください：

```json
{
  "name": "@company/web",
  "type": "module",
  "dependencies": {
    "@company/common": "workspace:^"
  }
}
```

次に、`packages/web/tsconfig.json` ファイルを作成し、次の内容を追加します：

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

最後に、`packages/web/src/index.ts` ファイルを作成し、次の内容を追加します：

```typescript title="packages/web/src/index.ts"
import { helloWorld } from "@company/common";

console.log(helloWorld());
```

### 依存関係のインストール

すべてのプロジェクトの設定が完了したら、依存関係をインストールします。ワークスペースルートで次のコマンドを実行してください：

```bash
yarn install
```

### プロジェクトのビルド

これで、ワークスペース全体をビルドする準備が整いました。次のコマンドをワークスペースルートで実行してプロジェクトをビルドしてください：

```bash
yarn tsc -b
```

このコマンドをワークスペースルートで実行することが重要です。なぜなら、ワークスペースルートの `tsconfig.json` がプロジェクト参照の構造を定義しているからです。

このコマンドを実行すると、次のような処理が行われます：

1. TypeScriptコンパイラ（tsc）は、まずワークスペースルートの `tsconfig.json` を読み込みます。このファイルには `"references"` フィールドがあり、ここに列挙されているプロジェクトがビルドの対象となります。
2. `"references"` フィールドに記載されている順序は重要ではありません。TypeScriptコンパイラは、これらの参照を解析し、プロジェクト間の依存関係を自動的に判断します。
3. 依存関係グラフに基づいて、プロジェクトを適切な順序でビルドします。この例では、次の順序でビルドが行われます：
   - まず `common` プロジェクト（他のプロジェクトに依存していないため）
   - 次に `cli` と `web` プロジェクト（両方とも `common` に依存しているため）
4. 各プロジェクトのビルド時には、そのプロジェクトの `tsconfig.json` が使用されます。これらの設定ファイルは `tsconfig.base.json` を継承しているため、共通の設定が適用されます。
5. 各プロジェクトのソースファイルがコンパイルされ、指定された出力ディレクトリ（`dist`）に JavaScript ファイルと型定義ファイル（.d.ts）が生成されます。
6. プロジェクト参照の情報を含む `.tsbuildinfo` ファイルが各プロジェクトに生成されます。これにより、次回のビルド時に変更されたファイルのみを再コンパイルすることができ、ビルド時間が短縮されます。

このプロセスにより、プロジェクト間の依存関係が正しく解決され、必要な順序でビルドが行われます。また、変更があったプロジェクトとその依存先のみが再ビルドされるため、大規模なプロジェクトでも効率的なビルドが可能になります。

### 実行

ビルドが成功したら、作成したプロジェクトを実行してみましょう。まず、CLI プロジェクトを実行します：

```bash
node packages/cli/dist/index.js
```

次に、Web プロジェクトを実行します：

```bash
node packages/web/dist/index.js
```

両方のコマンドで "Hello World" が出力されれば、セットアップは成功です。

### まとめ

このチュートリアルでは、TypeScriptのプロジェクト参照機能を使用してモノレポを構築する方法を学びました。この構造により、大規模なTypeScriptプロジェクトを効率的に管理し、ビルド時間を短縮し、コードの再利用性を高めることができます。プロジェクト参照を活用することで、ビルド時間の短縮、型チェックの効率化、依存関係の明確化など、多くの利点を得ることができます。

## プロジェクト参照の活用: ソースとテストの分離

### はじめに {#source-test-separation-intro}

#### 概要 {#source-test-separation-overview}

このチュートリアルでは、TypeScriptのプロジェクト参照機能を使用して、ソースコードとテストコードを分離した構造を持つプロジェクトを構築する方法を、ステップバイステップで説明します。

#### 目的 {#source-test-separation-purpose}

このガイドの目的は、次の要素を含むプロジェクト構造を構築することです：

1. メインのソースコードを含む `src` ディレクトリ
2. テストコードを含む `src` ディレクトリ内の `.test.ts` ファイル
3. ソースコードとテストコードを分離しつつ、プロジェクト参照を使用して関連つける

この構造により、ビルドの最適化と依存関係の明確化を実現します。依存関係の明確化は、次のような利点をもたらします：

- コードの構造が明確になり、開発者が全体像を把握しやすくなります。
- 不適切な依存関係（例：ソースコードがテストコードに依存する）を防ぎ、コードの品質を向上させます。
- ビルドプロセスの効率化につながり、大規模プロジェクトでのビルド時間を短縮します。

#### 最終的なプロジェクト構造 {#source-test-separation-final-structure}

チュートリアルの完了時、次のような構造のプロジェクトが完成します：

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

この構造により、効率的なコード管理と高速なビルドが可能になります。

#### 完成形のコード {#source-test-separation-final-code}

このチュートリアルの完成形のコードは、次のGitHubリポジトリで確認できます：
https://github.com/yytypescript/project-reference-samples/tree/main/01-source-test-separation

### 前提条件 {#source-test-separation-prerequisites}

このチュートリアルをはじめる前に、次のツールがインストールされていることを確認してください：

- Node.js（最新の LTS バージョン）
- Yarn（バージョン 4.4.0 以上）

また、基本的な TypeScript の知識があることを前提としています。

### プロジェクトの初期化 {#source-test-separation-init}

まず、新しいプロジェクトのためのディレクトリを作成します。ターミナルを開き、次のコマンドを実行してください：

```bash
mkdir typescript-source-test-separation
cd typescript-source-test-separation
```

次に、`package.json` ファイルを手動で作成します。次の内容を `package.json` ファイルに追加してください：

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

続いて、`.yarnrc.yml` ファイルを作成し、次の内容を追加します：

```yaml
nodeLinker: node-modules
```

この設定により、Yarnがnode_modulesディレクトリを使用するようになります。

最後に、依存関係をインストールします：

```bash
yarn install
```

### TypeScript設定ファイルの作成

#### ルートの tsconfig.json

プロジェクトのルートディレクトリに `tsconfig.json` ファイルを作成し、次の内容を追加します：

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

このファイルは、TypeScriptコンパイラに向けた「目次」または「地図」のような役割を果たします。`"references"` フィールドには、このプロジェクトが参照する他のTSConfigファイルを指定します。これにより、TypeScriptコンパイラはプロジェクト間の依存関係を理解し、適切な順序でビルドを行うことができます。

`"files"` フィールドを空に設定することで、このファイル自体はコンパイル対象にならず、純粋にプロジェクト参照の設定のみを行います。これにより、プロジェクト全体の構造を定義しつつ、実際のコンパイルは各サブプロジェクトの設定に委ねることができます。

#### ソースコード用の tsconfig.src.json

次に、ソースコード用の `tsconfig.src.json` ファイルを作成し、次の内容を追加します：

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

このファイルでは、次の設定が特に重要です：

- `"composite": true`: このオプションは、プロジェクト参照を使用する際に必須です。これにより、このプロジェクトが他のプロジェクトから参照可能になります。
- `"rootDir"`: ソースファイルのルートディレクトリを指定します。
- `"outDir"`: コンパイル後のファイルの出力先を指定します。

その他の設定項目：

- `"include"`: コンパイル対象のファイルを指定します。
- `"exclude"`: コンパイルから除外するファイルを指定します。ここではテストファイルを除外しています。

#### テストコード用の tsconfig.test.json

最後に、テストコード用の `tsconfig.test.json` ファイルを作成し、次の内容を追加します：

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

このファイルでは、次の設定が特に重要です：

- `"composite": true`: ソースコードの設定と同様、プロジェクト参照を可能にします。
- `"references"`: ソースコードのプロジェクトへの参照を定義します。これにより、テストコードからソースコードへの依存関係が明確になります。
- `"noEmit": true`: この設定により、テストコードのトランスパイル（JavaScriptへの変換）は行われませんが、型チェックは実行されます。これは、テストコードは直接実行されるため、トランスパイルする必要がない一方で、型の整合性は確認したいという要求に応えるものです。

その他の設定項目：

- `"skipLibCheck": true`: 宣言ファイルの型チェックをスキップし、ビルド時間を短縮します。

この構成により、ソースコードからテストコードへの依存が不可能になります。これは、本番コードにテストコードが混入することを防ぎ、コードの品質と保守性を向上させる重要な利点です。

### ソースコードとテストコードの作成

#### ソースコードの作成

`src` ディレクトリを作成し、その中に `hello-world.ts` ファイルを作成します：

```typescript
export function helloWorld(): string {
  return "Hello World";
}
```

#### テストコードの作成

同じく `src` ディレクトリ内に、`hello-world.test.ts` ファイルを作成します：

```typescript
import { expect, test } from "vitest";
import { helloWorld } from "./hello-world";

test("helloWorld function", () => {
  expect(helloWorld()).toBe("Hello World");
});
```

### プロジェクトのビルドとテスト

これで、プロジェクトをビルドし、テストを実行する準備が整いました。

#### ソースコードのみをコンパイル

ソースコードのみをコンパイルするには、次のコマンドを実行します：

```bash
yarn tsc -b tsconfig.src.json
```

このコマンドは `tsconfig.src.json` で定義されたソースコードのみをコンパイルします。テストコードは除外されます。

#### ソースコードとテストコードの両方をコンパイル

ソースコードとテストコードの両方をコンパイルするには、プロジェクトのルートで次のコマンドを実行します：

```bash
yarn tsc -b
```

このコマンドを実行すると、次のような処理が内部的に行われます：

1. TypeScriptコンパイラは、まずルートの `tsconfig.json` を読み込みます。
2. 依存関係グラフの構築:
   - `tsconfig.json` の `references` フィールドに基づいて、`tsconfig.src.json` と `tsconfig.test.json` が参照されます。
   - さらに、`tsconfig.test.json` の `references` フィールドにより、`tsconfig.src.json` への依存関係が認識されます。
   - これにより、`src` → `test` という依存関係グラフが構築されます。
3. コンパイルの実行:
   - 依存関係グラフに基づいて、プロジェクトを適切な順序で処理します。
   - まず `tsconfig.src.json` が処理されます。これにより、ソースコードがトランスパイルされ、出力ファイルが生成されます。
   - 次に `tsconfig.test.json` が処理されます。この際、`tsconfig.src.json` の出力を参照します。
   - `tsconfig.test.json` の `"noEmit": true` 設定により、テストコードのトランスパイルは行われませんが、型チェックは実行されます。

この過程により、ソースコードのトランスパイルとテストコードの型チェックが一度の操作で行われます。これにより、ソースコードとテストコード間の型の整合性が保証され、かつテストコードが不要にトランスパイルされることを防ぎます。

#### テストの実行

テストを実行するには、次のコマンドを使用します：

```bash
yarn vitest
```

このコマンドは、Vitestを使用してテストを実行します。

### プロジェクト参照の利点 {#source-test-separation-benefits}

このプロジェクト構造には、次のような利点があります：

1. **ビルドの最適化**: ソースコードとテストコードが分離されているため、本番用のビルドにテストコードが含まれません。
2. **依存関係の明確化**: テストプロジェクトがソースプロジェクトに依存する構造により、不適切な依存関係を防ぎます。特に、ソースコードからテストコードへの依存が不可能になるため、本番コードの品質が向上します。
3. **高速なフィードバック**: 部分的なビルドが可能になり、変更された部分のみを素早くチェックできます。
4. **IDE パフォーマンスの向上**: プロジェクトの分割により、各部分の型チェックが高速化され、IDEのレスポンスが向上します。

### まとめ {#source-test-separation-summary}

このチュートリアルでは、TypeScriptのプロジェクト参照機能を使用して、ソースコードとテストコードを分離した構造を持つプロジェクトを構築する方法を学びました。この構造により、大規模なTypeScriptプロジェクトを効率的に管理し、ビルド時間を短縮し、コードの品質を向上させることができます。プロジェクト参照を活用することで、開発プロセスの効率化と保守性の向上を実現できます。

## おわりに

TypeScriptのプロジェクト参照機能は、大規模プロジェクトの管理を効率化する強力なツールです。主な利点には、ビルド時間の短縮、コード構造の改善、型チェックの効率化があります。この機能を使うと、大きなコードベースを論理的に分割し、モジュール間の依存関係を明確にできます。プロジェクト参照の導入には学習が必要ですが、プロジェクトの規模が大きくなるほど、その価値は増大します。大規模なTypeScriptプロジェクトの開発者にとって、この機能の習得は生産性と品質を向上させる重要な投資となるでしょう。
