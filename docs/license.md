# 本書のライセンス

本書は[Creative Commons — 表示 - 継承 4.0 国際 — CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.ja)で公開しています。商用利用の制限がありません。

## サンプルコードのライセンス

本書のうち、コードブロックで表現されたプログラミングコードは、CC BY-SA 4.0またはMIT Licenseのデュアルライセンスで公開しています。読者が自身が開発するプログラムにサンプルコードを利用する際、MIT Licenseも選択していただけます。「コードブロックで表現されたプログラミングコード」とは次のような表示で、罫線や背景色により地の文と区別して表示するコードをいいます。

```ts
const value = "Hello World";
```

### MIT License

export const Year = () => <>{new Date().getFullYear()}</>;

<!-- markdownlint-disable MD033 -->

Copyright (c) <Year /> YYTypeScript

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## CC BY-SAの表示義務の詳細

CC BY-SA 4.0では具体的な表示義務の方法に定めがないため、本書では表示ポリシーを次のように定めます。

### CC BY-SAの表示ポリシー

本書コンテンツを再公開・二次創作する場合は、CC BY-SAの表示について次のことを行う必要があります。

1. 本書のタイトル『サバイバルTypeScript』を明記してください。
1. ウェブサイトやHTML形式で再公開される場合、ページごとに本書の該当する元ページに直接ハイパーリンクしてください。
   1. ハイパーリンクは直接であり、短縮URLやリダイレクトを挟んではいけません。
   1. ハイパーリンクはJavaScriptが無効になっている場合でもリンクを辿れる必要があります。
   1. リンクは`rel="nofollow"`にしてはいけません。
   1. リンク先はGitHubのページではなく、typescriptbook.jpのページのURLにしてください。
   1. その他、リンクをクリックしにくくするなど辿りにくくなるような仕掛けはしてはいけません。
1. GitHubのフォーク機能でフォークし、フォーク元のリンク先が本書のGitHubリポジトリになっている場合、GitHubリポジトリでのハイパーリンクは不要です。
1. 印刷物や画像、映像、スライドなど読者や聴衆がクリックでリンクを辿れない媒体では、本書のURLを明記してください。
   1. URLは目立たせる必要はありませんが、十分に読める文字サイズである必要があります。
   1. YouTubeなどの動画配信サイトでは、概要欄にリンクを載せる形でも構いません。

#### ハイパーリンクの具体例

<!--prettier-ignore-->
```html
<a href="https://typescriptbook.jp/overview/features">『サバイバルTypeScript』「TypeScriptの特徴」</a>
```

## 例外

本書は基本的にCC BY-SA 4.0でライセンスされていますが、本書に掲載される企業のロゴや広告クリエイティブは、各企業などに権利が帰属し、二次利用が不可の場合がありますのでご注意ください。

## Q&A

### なぜサンプルコードはMIT Licenseが選べるのですか？

CC BY-SA 4.0は優れたライセンスですが、プログラミングコードのライセンスにはMIT Licenseのほうが一般的です。CC BY-SA 4.0には継承の義務があるため、サンプルコードをコピペして利用するといったことがしにくいです。サンプルコードを利用していただきやすくするためにも、MIT Licenseが選択できるようにしています。

### 社内の勉強会や従業員の教育に本書を使えますか？

はい。お役立てください。
