---
description: TSConfigのオプション一覧
---

# オプションの一覧

## ルートオプション

TSConfigのルートのオプションです。これらは、型チェックを対象とするファイルなどのプロジェクト全体に関する設定です。

| オプション名 | 追加されたバージョン |
| ------------ | -------------------- |
| files        | -                    |
| extends      | 2.1                  |
| include      | 2.0                  |
| exclude      | -                    |
| references   | -                    |

## 型チェック

型チェックに関する設定です。

| オプション名                                                                  | 追加されたバージョン |
| ----------------------------------------------------------------------------- | -------------------- |
| allowUnreachableCode                                                          | 1.8                  |
| allowUnusedLabels                                                             | 1.8                  |
| [alwaysStrict](./alwaysstrict.md)                                             | 2.1                  |
| [exactOptionalPropertyTypes](./exactoptionalpropertytypes.md)                 | 4.4                  |
| [noFallthroughCasesInSwitch](./nofallthroughcasesinswitch.md)                 | 1.8                  |
| [noimplicitany](./noimplicitany.md)                                           | -                    |
| [noimplicitoverride](./noimplicitoverride.md)                                 | 4.3                  |
| [noImplicitReturns](./noimplicitreturns.md)                                   | 1.8                  |
| [noimplicitthis](./noimplicitthis.md)                                         | 2.0                  |
| [nopropertyaccessfromindexsignature](./nopropertyaccessfromindexsignature.md) | 4.2                  |
| [nouncheckedindexedaccess](./nouncheckedindexedaccess.md)                     | 4.1                  |
| [nounusedlocals](./nounusedlocals.md)                                         | 2.0                  |
| [nounusedparameters](./nounusedparameters.md)                                 | 2.0                  |
| [strict](./strict.md)                                                         | 2.3                  |
| [strictbindcallapply](./strictbindcallapply.md)                               | 3.2                  |
| [strictfunctiontypes](./strictfunctiontypes.md)                               | 2.6                  |
| [strictnullchecks](./strictnullchecks.md)                                     | 2.0                  |
| [strictpropertyinitialization](./strictpropertyinitialization.md)             | 2.7                  |
| [useunknownincatchvariables](./useunknownincatchvariables.md)                 | 4.4                  |

## モジュール解決

TypeScriptコンパイラーのモジュール解決に関する設定です。

| オプション名               | 追加されたバージョン |
| -------------------------- | -------------------- |
| allowArbitraryExtensions   | -                    |
| allowImportingTsExtensions | -                    |
| allowUmdGlobalAccess       | 3.5                  |
| baseUrl                    | -                    |
| customConditions           | -                    |
| module                     | 1.0                  |
| moduleResolution           | -                    |
| moduleSuffixes             | 4.7                  |
| noResolve                  | -                    |
| paths                      | -                    |
| resolveJsonModule          | -                    |
| resolvePackageJsonExports  | -                    |
| resolvePackageJsonImports  | -                    |
| rootDir                    | 1.5                  |
| rootDirs                   | 2.0                  |
| typeRoots                  | -                    |
| types                      | -                    |

## 型定義ファイル・JavaScriptファイルの出力

型定義ファイルやJavaScriptファイルをどのように出力するかの設定です。

| オプション名           | 追加されたバージョン |
| ---------------------- | -------------------- |
| declaration            | 1.0                  |
| declarationDir         | 2.0                  |
| declarationMap         | 2.9                  |
| downlevelIteration     | 2.3                  |
| emitBOM                | -                    |
| emitDeclarationOnly    | 2.8                  |
| importHelpers          | -                    |
| importsNotUsedAsValues | 3.8                  |
| inlineSourceMap        | 1.5                  |
| inlineSources          | 1.5                  |
| mapRoot                | -                    |
| newLine                | 1.5                  |
| noEmit                 | -                    |
| noEmitHelpers          | 1.5                  |
| noEmitOnError          | 1.4                  |
| outDir                 | -                    |
| outFile                | 1.0                  |
| preserveConstEnums     | -                    |
| preserveValueImports   | 4.5                  |
| removeComments         | -                    |
| sourceMap              | -                    |
| sourceRoot             | -                    |
| stripInternal          | -                    |

## JavaScriptのサポート

生のJavaScriptの取り扱いに関する設定です。

| オプション名         | 追加されたバージョン |
| -------------------- | -------------------- |
| allowJs              | 1.8                  |
| checkJs              | 2.3                  |
| maxNodeModuleJsDepth | -                    |

## エディターサポート

エディター上でのTypeScriptの挙動の設定です。

| オプション名     | 追加されたバージョン |
| ---------------- | -------------------- |
| disableSizeLimit | -                    |
| plugins          | -                    |

## 相互運用性の成約

ESModuleとCommonJS間の相互運用や異なるファイルシステムでの開発を想定したファイルの大文字小文字の区別など相互運用性に関する設定です。

| オプション名                            | 追加されたバージョン |
| --------------------------------------- | -------------------- |
| allowSyntheticDefaultImports            | 1.8                  |
| esModuleInterop                         | 2.7                  |
| forceConsistentCasingInFileNames        | -                    |
| [isolatedModules](./isolatedModules.md) | 1.5                  |
| preserveSymlinks                        | -                    |
| verbatimModuleSyntax                    | -                    |

## 下位互換性のサポート

TypeScriptの下位バージョンをサポートするための設定です。

| オプション名                   | 追加されたバージョン |
| ------------------------------ | -------------------- |
| charset                        | -                    |
| keyofStringsOnly               | 2.9                  |
| noImplicitUseStrict            | -                    |
| noStrictGenericChecks          | 2.4                  |
| out                            | -                    |
| suppressExcessPropertyErrors   | -                    |
| suppressImplicitAnyIndexErrors | -                    |

## 言語と環境設定

デコレーターなどの実験的な言語機能やJSX構文に関する設定です。

| オプション名            | 追加されたバージョン |
| ----------------------- | -------------------- |
| emitDecoratorMetadata   | -                    |
| experimentalDecorators  | -                    |
| jsx                     | 2.2                  |
| jsxFactory              | -                    |
| jsxFragmentFactory      | 4.0                  |
| jsxImportSource         | 4.1                  |
| lib                     | 2.0                  |
| moduleDetection         | 4.7                  |
| noLib                   | -                    |
| reactNamespace          | -                    |
| target                  | 1.0                  |
| useDefineForClassFields | 3.7                  |

## コンパイラの診断情報

コンパイルのプロファイリングなどのコンパイラの診断情報に関する設定です

| オプション名        | 追加されたバージョン |
| ------------------- | -------------------- |
| diagnostics         | -                    |
| explainFiles        | 4.2                  |
| extendedDiagnostics | -                    |
| generateCpuProfile  | 3.7                  |
| listEmittedFiles    | -                    |
| listFiles           | -                    |
| traceResolution     | 2.0                  |

## プロジェクト

TypeScriptのProject Referencesに関する設定です。

| オプション名                            | 追加されたバージョン |
| --------------------------------------- | -------------------- |
| composite                               | 3.0                  |
| disableReferencedProjectLoad            | 4.0                  |
| disableSolutionSearching                | 3.8                  |
| disableSourceOfProjectReferenceRedirect | 3.7                  |
| incremental                             | 3.4                  |
| tsBuildInfoFile                         | 3.4                  |

## 出力フォーマット

出力フォーマットに関する設定です。

| オプション名        | 追加されたバージョン |
| ------------------- | -------------------- |
| noErrorTruncation   | -                    |
| preserveWatchOutput | -                    |
| pretty              | -                    |

## 型チェックの完全性

型チェックの厳密性に関する設定です。

| オプション名        | 追加されたバージョン |
| ------------------- | -------------------- |
| skipDefaultLibCheck | -                    |
| skipLibCheck        | 2.0                  |

## ファイル監視

ファイルの監視に関する設定です。

| オプション名                              | 追加されたバージョン |
| ----------------------------------------- | -------------------- |
| assumeChangesOnlyAffectDirectDependencies | 3.8                  |
| watchFile                                 | 3.8                  |
| watchDirectory                            | 3.8                  |
| fallbackPolling                           | 3.8                  |
| synchronousWatchDirectory                 | -                    |
| excludeDirectories                        | -                    |
| excludeFiles                              | -                    |

## 型の取得

JavaScriptプロジェクトでの型のダウンロードに関する設定です。

| オプション名                        | 追加されたバージョン |
| ----------------------------------- | -------------------- |
| enable                              | -                    |
| include                             | -                    |
| exclude                             | -                    |
| disableFilenameBasedTypeAcquisition | 4.1                  |
