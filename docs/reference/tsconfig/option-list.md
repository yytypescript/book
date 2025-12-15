---
description: Danh sách option của TSConfig
---

# Danh sách option

Thông tin mới nhất vui lòng tham khảo [TypeScript TSConfig Reference](https://www.typescriptlang.org/ja/tsconfig).

## Root option

Các option ở root của TSConfig. Đây là các cấu hình liên quan đến toàn bộ project như file nào được type check.

| Tên option   | Phiên bản thêm vào |
| ------------ | ------------------ |
| files        | -                  |
| extends      | 2.1                |
| include      | 2.0                |
| exclude      | -                  |
| references   | -                  |

## Type check

Cấu hình liên quan đến type check.

| Tên option                                                                    | Phiên bản thêm vào |
| ----------------------------------------------------------------------------- | ------------------ |
| allowUnreachableCode                                                          | 1.8                |
| allowUnusedLabels                                                             | 1.8                |
| [alwaysStrict](./alwaysstrict.md)                                             | 2.1                |
| [exactOptionalPropertyTypes](./exactoptionalpropertytypes.md)                 | 4.4                |
| [noFallthroughCasesInSwitch](./nofallthroughcasesinswitch.md)                 | 1.8                |
| [noimplicitany](./noimplicitany.md)                                           | -                  |
| [noimplicitoverride](./noimplicitoverride.md)                                 | 4.3                |
| [noImplicitReturns](./noimplicitreturns.md)                                   | 1.8                |
| [noimplicitthis](./noimplicitthis.md)                                         | 2.0                |
| [nopropertyaccessfromindexsignature](./nopropertyaccessfromindexsignature.md) | 4.2                |
| [nouncheckedindexedaccess](./nouncheckedindexedaccess.md)                     | 4.1                |
| [nounusedlocals](./nounusedlocals.md)                                         | 2.0                |
| [nounusedparameters](./nounusedparameters.md)                                 | 2.0                |
| [strict](./strict.md)                                                         | 2.3                |
| [strictbindcallapply](./strictbindcallapply.md)                               | 3.2                |
| [strictfunctiontypes](./strictfunctiontypes.md)                               | 2.6                |
| [strictnullchecks](./strictnullchecks.md)                                     | 2.0                |
| [strictpropertyinitialization](./strictpropertyinitialization.md)             | 2.7                |
| [useunknownincatchvariables](./useunknownincatchvariables.md)                 | 4.4                |

## Module resolution

Cấu hình liên quan đến module resolution của TypeScript compiler.

| Tên option                 | Phiên bản thêm vào |
| -------------------------- | ------------------ |
| allowArbitraryExtensions   | -                  |
| allowImportingTsExtensions | -                  |
| allowUmdGlobalAccess       | 3.5                |
| baseUrl                    | -                  |
| customConditions           | -                  |
| module                     | 1.0                |
| moduleResolution           | -                  |
| moduleSuffixes             | 4.7                |
| noResolve                  | -                  |
| paths                      | -                  |
| resolveJsonModule          | -                  |
| resolvePackageJsonExports  | -                  |
| resolvePackageJsonImports  | -                  |
| rootDir                    | 1.5                |
| rootDirs                   | 2.0                |
| typeRoots                  | -                  |
| types                      | -                  |

## Output của type definition file và JavaScript file

Cấu hình về cách output type definition file và JavaScript file.

| Tên option             | Phiên bản thêm vào |
| ---------------------- | ------------------ |
| declaration            | 1.0                |
| declarationDir         | 2.0                |
| declarationMap         | 2.9                |
| downlevelIteration     | 2.3                |
| emitBOM                | -                  |
| emitDeclarationOnly    | 2.8                |
| importHelpers          | -                  |
| importsNotUsedAsValues | 3.8                |
| inlineSourceMap        | 1.5                |
| inlineSources          | 1.5                |
| mapRoot                | -                  |
| newLine                | 1.5                |
| noEmit                 | -                  |
| noEmitHelpers          | 1.5                |
| noEmitOnError          | 1.4                |
| outDir                 | -                  |
| outFile                | 1.0                |
| preserveConstEnums     | -                  |
| preserveValueImports   | 4.5                |
| removeComments         | -                  |
| sourceMap              | -                  |
| sourceRoot             | -                  |
| stripInternal          | -                  |

## Hỗ trợ JavaScript

Cấu hình liên quan đến xử lý JavaScript thuần.

| Tên option           | Phiên bản thêm vào |
| -------------------- | ------------------ |
| allowJs              | 1.8                |
| checkJs              | 2.3                |
| maxNodeModuleJsDepth | -                  |

## Hỗ trợ editor

Cấu hình về hành vi của TypeScript trong editor.

| Tên option       | Phiên bản thêm vào |
| ---------------- | ------------------ |
| disableSizeLimit | -                  |
| plugins          | -                  |

## Ràng buộc về khả năng tương thích

Cấu hình liên quan đến khả năng tương thích như tương tác giữa ESModule và CommonJS, phân biệt chữ hoa chữ thường của file khi phát triển trên các file system khác nhau.

| Tên option                                  | Phiên bản thêm vào |
| ------------------------------------------- | ------------------ |
| allowSyntheticDefaultImports                | 1.8                |
| esModuleInterop                             | 2.7                |
| forceConsistentCasingInFileNames            | -                  |
| [isolatedModules](./isolatedModules.md)     | 1.5                |
| preserveSymlinks                            | -                  |
| verbatimModuleSyntax                        | -                  |

## Hỗ trợ backward compatibility

Cấu hình để hỗ trợ các phiên bản cũ hơn của TypeScript.

| Tên option                     | Phiên bản thêm vào |
| ------------------------------ | ------------------ |
| charset                        | -                  |
| keyofStringsOnly               | 2.9                |
| noImplicitUseStrict            | -                  |
| noStrictGenericChecks          | 2.4                |
| out                            | -                  |
| suppressExcessPropertyErrors   | -                  |
| suppressImplicitAnyIndexErrors | -                  |

## Ngôn ngữ và cấu hình môi trường

Cấu hình liên quan đến các tính năng ngôn ngữ thử nghiệm như decorator và cú pháp JSX.

| Tên option              | Phiên bản thêm vào |
| ----------------------- | ------------------ |
| emitDecoratorMetadata   | -                  |
| experimentalDecorators  | -                  |
| jsx                     | 2.2                |
| jsxFactory              | -                  |
| jsxFragmentFactory      | 4.0                |
| jsxImportSource         | 4.1                |
| lib                     | 2.0                |
| moduleDetection         | 4.7                |
| noLib                   | -                  |
| reactNamespace          | -                  |
| target                  | 1.0                |
| useDefineForClassFields | 3.7                |

## Thông tin chẩn đoán của compiler

Cấu hình liên quan đến thông tin chẩn đoán của compiler như profiling compile.

| Tên option          | Phiên bản thêm vào |
| ------------------- | ------------------ |
| diagnostics         | -                  |
| explainFiles        | 4.2                |
| extendedDiagnostics | -                  |
| generateCpuProfile  | 3.7                |
| listEmittedFiles    | -                  |
| listFiles           | -                  |
| traceResolution     | 2.0                |

## Project

Cấu hình liên quan đến TypeScript Project References.

| Tên option                              | Phiên bản thêm vào |
| --------------------------------------- | ------------------ |
| composite                               | 3.0                |
| disableReferencedProjectLoad            | 4.0                |
| disableSolutionSearching                | 3.8                |
| disableSourceOfProjectReferenceRedirect | 3.7                |
| incremental                             | 3.4                |
| tsBuildInfoFile                         | 3.4                |

## Output format

Cấu hình liên quan đến output format.

| Tên option          | Phiên bản thêm vào |
| ------------------- | ------------------ |
| noErrorTruncation   | -                  |
| preserveWatchOutput | -                  |
| pretty              | -                  |

## Độ đầy đủ của type check

Cấu hình liên quan đến độ nghiêm ngặt của type check.

| Tên option          | Phiên bản thêm vào |
| ------------------- | ------------------ |
| skipDefaultLibCheck | -                  |
| skipLibCheck        | 2.0                |

## File watching

Cấu hình liên quan đến file watching.

| Tên option                                | Phiên bản thêm vào |
| ----------------------------------------- | ------------------ |
| assumeChangesOnlyAffectDirectDependencies | 3.8                |
| watchFile                                 | 3.8                |
| watchDirectory                            | 3.8                |
| fallbackPolling                           | 3.8                |
| synchronousWatchDirectory                 | -                  |
| excludeDirectories                        | -                  |
| excludeFiles                              | -                  |

## Lấy type

Cấu hình liên quan đến download type trong JavaScript project.

| Tên option                          | Phiên bản thêm vào |
| ----------------------------------- | ------------------ |
| enable                              | -                  |
| include                             | -                  |
| exclude                             | -                  |
| disableFilenameBasedTypeAcquisition | 4.1                |
