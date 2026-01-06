# Reactコンポーネントのテストを書こう

このチュートリアルでは、Vitestのコンポーネントテスト(component testing)機能を使って、Reactコンポーネントのテストを書くことを学びます。

## 本章で学べること

本章では、簡単なコンポーネントのテストを書くことを目標に、具体的には次のことをやっていきます。

- Vitestを使ったReactコンポーネントテストのやり方
- コンポーネントテストを書くときの考え方
- Vitestを使ったスナップショットテストのやり方
- 単体テストとコンポーネントテストを共存させる方法

本章の目的はコンポーネントテストを完全に理解することではありません。むしろ、それがどういったものなのか、その雰囲気を実際に体験することに主眼を置いています。そのため、内容はかなり最低限のものとなりますが、少しの時間でコンポーネントテストを試してみれるシンプルな内容にまとめます。ぜひ手を動かしてみてください。

::::info
Reactでコンポーネントが作れることを前提にします。Reactの基本的な使い方を知りたい方は[Reactでいいねボタンを作ろう](./react-like-button-tutorial.md)をご参照ください。また、Vitestの基本的を知りたい方は[Vitestでテストを書こう](./vitest.md)をご参照ください。
::::

## このチュートリアルに必要なもの

このチュートリアルで必要なものは次のとおりです。

- Node.js v24以上
- npm v11以上 (Node.jsに同梱)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

<!-- regression test: node -v と npm -v の結果を確認し、環境が適合していない場合、問題として報告してください。 -->

## プロジェクトの作成

テストに使用するプロジェクトを作成します。

```shell
mkdir vitest-component-test-tutorial
cd vitest-component-test-tutorial
```

次の内容で`package.json`を作成します。

```json title="package.json"
{
  "name": "vitest-component-test-tutorial",
  "version": "1.0.0",
  "license": "UNLICENSED",
  "type": "module"
}
```

## ライブラリをインストールする

このチュートリアルでは、パッケージ管理ツールとしてnpmを使います。

まず、Reactをインストールします。`dependencies`として次を入れます。

```shell
npm install \
  react \
  react-dom \
  @types/react \
  @types/react-dom
```

次に、テストに必要なものを`devDependencies`としてインストールします。

```shell
npm install -D \
  typescript \
  vitest \
  vitest-browser-react \
  @vitejs/plugin-react \
  @vitest/browser-playwright
```

<!-- regression test: 執筆時点では次のバージョンがインストールされました。メジャーバージョンが異なってもチュートリアルが通れば問題ありません。もし、チュートリアルが通らない場合、問題報告の参考情報として活用してください。
├── @types/react-dom@19.2.3
├── @types/react@19.2.7
├── @vitejs/plugin-react@5.1.2
├── @vitest/browser-playwright@4.0.16
├── react-dom@19.2.3
├── react@19.2.3
├── typescript@5.9.3
├── vitest-browser-react@2.0.2
└── vitest@4.0.16
-->

## TypeScriptコンパイラーを設定する

次の内容で`tsconfig.json`を作成します。

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "types": ["react"]
  }
}
```

## Vitestを設定する

`vitest.config.ts`を次の内容で作成してください。

```ts title="vitest.config.ts"
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

<!-- regression test: コンテナ内でXサーバーが使えない場合は、test.browser.headlessをtrueにしてください。 -->

## PlaywrightのChromiumをインストールする

Vitestのコンポーネントテストには実ブラウザが必要になります。次のコマンドでChromiumをインストールしてください。

```shell
npx playwright install chromium
```

<!-- regression test: 上のコマンドが問題無く実行できることを確認してください。 -->

## テストするコンポーネント

ここでは、簡単なボタンコンポーネントのテストを書くことを例に進めていきます。例題として、[いいねボタンを作ろう](./react-like-button-tutorial.md)のチュートリアルで作成したいいねボタンをテストしていきます。このボタンは、クリックするといいねの数が増えるものです。本チュートリアルでは、改めて「いいねボタン」を実装するので、「いいねボタンを作ろう」のチュートリアルをやっていなくても問題ありません。

## テスト対象のコンポーネントを作る

まず、`like-button.tsx`を作成してください。

```tsx title="like-button.tsx"
import { useState } from "react";

export function LikeButton() {
  const [count, setCount] = useState(999);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <button onClick={handleClick} type="button">
      {count}
    </button>
  );
}
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

## コンポーネントテストを書く

ここからはテストの作り方とやり方に入ります。Vitestのコンポーネントテストの実行環境はブラウザです。Reactコンポーネントを描画し、操作し、表示が期待通りに変化することを確かめます。

### テストしたいことを決める

今回は、ボタンをクリックするといいねの数が増えることをテストしたいので、次のようなテストケースを考えます。

1. ボタンを表示したときのカウントが`999`であることを確かめる
2. ボタンをクリックしたらカウントが`1000`になることを確かめる

コンポーネントのテストは、基本的に次の3つのことを組み合わせて実現します。

- 描画
- 操作
- 状態確認

今回のテストケースに当てはめてみると、次のようになります。

- ボタンを表示したときのカウントが`999`であること
  - ボタンを描画する (描画)
  - ボタンのカウントが`999`か確かめる (状態確認)
- ボタンをクリックしたらカウントが`1000`になること
  - ボタンを描画する (描画)
  - ボタンをクリックする (操作)
  - ボタンのカウントが`1000`か確かめる (状態確認)

自分でコンポーネントのテストを書く際も、どのような操作と状態確認を行えばよいかを意識することでテスト作成がスムーズにできるはずです。

### テストを作る

まずは、1つ目のテストケースを作っていきましょう。`like-button.browser.test.tsx`というファイルこに、`test`関数を使ってテストケースを作成します。

```tsx title="like-button.browser.test.tsx"
import { test } from "vitest";

test("ボタンを表示したときのカウントが999であること", async () => {
  // ここにテストの中身を書いていきます
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

描画・操作・状態確認のリズムを意識しながら、順番にテストを組んでいきましょう。最初は描画です。コンポーネントの描画は`vitest-browser-react`の`render`を使って、次のようにします。

```tsx {0-2,5} title="like-button.browser.test.tsx"
import { test } from "vitest";
import { render } from "vitest-browser-react";
import { LikeButton } from "./like-button";

test("ボタンを表示したときのカウントが999であること", async () => {
  await render(<LikeButton />);
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

次は状態確認です。`999`と表示されていることを確かめます。具体的には、ボタンを取得し、そのテキストが`999`という文字列に等しいかのアサーションを実施します。

今回、ボタンの取得には`getByRole`を使います。これは[WAI-ARIA](https://developer.mozilla.org/ja/docs/Learn/Accessibility/WAI-ARIA_basics)(アクセシビリティ向上を主目的として定められたwebの仕様)で定められたロールを引数に指定すると、そのロールを持つ要素を取得するクエリです。具体的には、次のように書けます。詳細は[Locator](https://main.vitest.dev/api/browser/locators)をご参照ください。

<!-- regression test: 上の段落に含まれる全てのリンク先が正しいことを確認してください。 -->

```tsx {5-6} title="like-button.browser.test.tsx"
import { test } from "vitest";
import { render } from "vitest-browser-react";
import { LikeButton } from "./like-button";

test("ボタンを表示したときのカウントが999であること", async () => {
  const { getByRole } = await render(<LikeButton />);
  const button = getByRole("button");
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

そして、ボタンのテキストのアサーションは`toHaveTextContent`を使います。`expect.element`に要素を渡し、そのまま`toHaveTextContent`を呼び出すと、その要素がどのようなテキストを持っているかのアサーションが行なえます。具体的には次のようになります。

```tsx {0,7} title="like-button.browser.test.tsx"
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { LikeButton } from "./like-button";

test("ボタンを表示したときのカウントが999であること", async () => {
  const { getByRole } = await render(<LikeButton />);
  const button = getByRole("button");
  await expect.element(button).toHaveTextContent(/^999$/);
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

ここで、`toHaveTextContent`の引数に正規表現を渡しています。これは、ボタンのテキストが`999`という文字列に完全一致することを確かめるためです。もしも、`toHaveTextContent("999")`と書いた場合、部分一致でもテストが通るようになるので注意してください。`1999`や`9990`などでもテストが通ってしまいます。

ここで一旦`npx vitest`コマンドでテストを実行し、テストが通ることを確認しましょう。

```shell
npx vitest
```

<!-- regression test: tmuxを用いてvitestを実行してください。AIエージェントが使えるターミナルはTTYがオフになっている場合があるためです。tmux new-session -d -s vitest -c "$PWD" -x 256 'npx vitest' -->

次のような出力が表示され、「PASS」と表示されていればテストが通っています。

```taml
<bold><bgBlue> DEV </bgBlue></bold> <blue>v4.0.16 </blue><brightBlack>/Users/suin/codes/github.com/yytypescript/vitest-component-test-tutorial</brightBlack>

 <green>✓</green> <black><bgYellow> chromium </bgYellow></black><bgYellow></bgYellow> like-button.browser.test.tsx <dim>(1 test)</dim><green> 15<dim>ms</dim></green>
   <green>✓</green> ボタンを表示したときのカウントが999であること<green> 14<dim>ms</dim></green>

<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>   Start at </dim> 11:56:20
<dim>   Duration </dim> 1.40s<dim> (transform 0ms, setup 0ms, import 40ms, tests 15ms, environment 0ms)</dim>

<bold><bgGreen> PASS </bgGreen></bold> <green>Waiting for file changes...</green>
       <dim>press </dim>h to show help, press q to quit
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。vitest-tutorialディレクトリのパス、実行時間の差異は無視してください。バージョンはメジャーバージョンのみを確認してください。tmuxでの結果確認はtmux capture-pane -p -e -t vitest -S - -E -でできます。 -->

さて、今度はふたつめのテストケースです。ボタンを描画したら、クリックし、値が`1000`になっていることを確かめます。コンポーネントの操作は、取得した要素に対して`click`を呼び出すことで実現できます。

```tsx {10-15} title="like-button.browser.test.tsx"
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { LikeButton } from "./like-button";

test("ボタンを表示したときのカウントが999であること", async () => {
  const { getByRole } = await render(<LikeButton />);
  const button = getByRole("button");
  await expect.element(button).toHaveTextContent(/^999$/);
});

test("ボタンをクリックしたらカウントが1000になること", async () => {
  const { getByRole } = await render(<LikeButton />);
  const button = getByRole("button");
  await button.click();
  await expect.element(button).toHaveTextContent(/^1000$/);
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

この状態で`npx vitest`コマンドの出力を確認しましょう。テストが再実行され、2つ目のテストケースもPASSしているはずです。

```taml
<bold><bgBlue> RERUN </bgBlue></bold> <dim><blue>like-button.browser.test.tsx </blue></dim><blue>x1 </blue>

 <green>✓</green> <black><bgYellow> chromium </bgYellow></black><bgYellow></bgYellow> like-button.browser.test.tsx <dim>(2 tests)</dim><green> 72<dim>ms</dim></green>
   <green>✓</green> ボタンを表示したときのカウントが999であること<green> 4<dim>ms</dim></green>
   <green>✓</green> ボタンをクリックしたらカウントが1000になること<green> 67<dim>ms</dim></green>

<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>2 passed</green></bold><brightBlack> (2)</brightBlack>
<dim>   Start at </dim> 11:47:15
<dim>   Duration </dim> 82ms

<bold><bgGreen> PASS </bgGreen></bold> <green>Waiting for file changes...</green>
       <dim>press </dim>h to show help, press q to quit
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。tmuxでの結果確認はtmux capture-pane -p -e -t vitest -S - -E -でできます。 -->

以上が、VitestのコンポーネントテストでReactコンポーネントのテストを作成する流れです。

## Vitestを使ったスナップショットテストの作り方とやり方

ここからは「スナップショットテスト」と呼ばれるテスト手法について解説します。先ほどまでのテストはコンポーネントのある部分(例: テキスト)の状態を確認するものでしたが、「スナップショットテスト」はコンポーネントの全体の状態を確かめるためのテストです。より正確には、コンポーネントのHTMLをまるごと保存し、テスト実行時にコンポーネントを描画して生成したHTMLと保存しておいたHTMLが一致するかを確認します。

「スナップショットテスト」は簡単に書けます。それでいてスタイルなど含めた全体の確認ができるので、手軽なリグレッションテストとして活用できます。一方で、そうであるからこそコンポーネントを一旦作り終えるまでは機能しないテストですので、テストファースト開発には不向きです。

:::caution
本来、スナップショットテストの対象はコンポーネントに限られたものではありません。幅広いテストにスナップショットテストが実施できます。詳しくはVitestの[公式ドキュメント](https://vitest.dev/guide/snapshot.html)をご参照ください。
:::

<!-- regression test: 上の段落に含まれる全てのリンク先が正しいことを確認してください。 -->

それでは、スナップショットテストを実際にやってみましょう。

スナップショットテストは次の2ステップから成ります。

1. スナップショットを検証したい状態にコンポーネントを持っていく
2. スナップショットに照合する

ここではボタンが描画されてまだ何も操作されていない状態、つまりボタンに`999`と表示されている状態についてスナップショットテストを実施することを考えます。描画されたばかりの状態を検証したいので、描画してすぐにスナップショット照合を行えばよいことになります。

では、2つ目のテストケースを修正して、スナップショットテストを実施してみましょう。描画結果のスナップショットを取るには、次のように`render`の戻り値の`container`を`expect`関数に渡し、`toMatchSnapshot`メソッドを呼び出します。

```tsx {11,14} title="like-button.browser.test.tsx"
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { LikeButton } from "./like-button";

test("ボタンを表示したときのカウントが999であること", async () => {
  const { getByRole } = await render(<LikeButton />);
  const button = getByRole("button");
  await expect.element(button).toHaveTextContent(/^999$/);
});

test("ボタンをクリックしたらカウントが1000になること", async () => {
  const { getByRole, container } = await render(<LikeButton />);
  const button = getByRole("button");
  await button.click();
  expect(container).toMatchSnapshot();
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

変更を保存すると、テストが再実行されます。出力には「Snapshots 1 written」と表示されています。これは、スナップショットファイルが生成されたことを示しています。

```taml
<bold><bgBlue> RERUN </bgBlue></bold> <dim><blue>like-button.browser.test.tsx </blue></dim><blue>x2 </blue>

 <green>✓</green> <black><bgYellow> chromium </bgYellow></black><bgYellow></bgYellow> like-button.browser.test.tsx <dim>(2 tests)</dim><green> 34<dim>ms</dim></green>
   <green>✓</green> ボタンを表示したときのカウントが999であること<green> 3<dim>ms</dim></green>
   <green>✓</green> ボタンをクリックしたらカウントが1000になること<green> 30<dim>ms</dim></green>

<dim>  Snapshots </dim> <bold><green>1 written</green></bold>
<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>2 passed</green></bold><brightBlack> (2)</brightBlack>
<dim>   Start at </dim> 11:58:41
<dim>   Duration </dim> 39ms

<bold><bgGreen> PASS </bgGreen></bold> <green>Waiting for file changes...</green>
       <dim>press </dim>h to show help, press q to quit
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。tmuxでの結果確認はtmux capture-pane -p -e -t vitest -S - -E -でできます。 -->

`__snapshots__`というディレクトリが自動で追加されているはずです。これはVitestがスナップショットテスト用のファイルを保存していくためのフォルダです。Vitestのスナップショットテストは初回実行時にスナップショットテスト用のファイルを生成し、2回目から照合を行います。

ここでスナップショットテストについてもう少しだけ知るために、生成されたスナップショットテスト用のファイルの中身を覗いてみましょう。`__snapshots__`ディレクトリの中に作られた`like-button.browser.test.tsx.snap`は次のようになっています。

<!-- prettier-ignore -->
```js title="__snapshots__/like-button.browser.test.tsx.snap"
// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`ボタンをクリックしたらカウントが1000になること 1`] = `
<div>
  <button
    type="button"
  >
    1000
  </button>
</div>
`;
```

<!-- regression test: スナップショットファイルの中身が上のようになっているか確認してください。 -->

このように、スナップショットテスト用のファイルはテストケースの名前と、そのテストケースで使われるスナップショットで構成されています。

今回生成されたスナップショットは`1000`というテキストを持った`button`タグと、その親要素である`div`タグで構成されています。これは、まさに`LikeButton`コンポーネントのHTMLに一致します。

このスナップショットテストは実行のたびに、`LikeButton`コンポーネントを描画して、たった今作られたこのスナップショットとの違いが生まれていないかを確認してくれます。たとえば、もしも何かの手違いで、クリック時のカウントアップが機能しなくなっていたら、このスナップショットテストで検知できます。

実際にボタンをクリックしてもカウントが増えないようにインクリメントの処理を無くし、テストが失敗する様子を確認してみましょう。

```tsx {4-7} title="like-button.tsx"
import { useState } from "react";

export function LikeButton() {
  const [count, setCount] = useState(999);
  const handleClick = () => {
    // setCount(count + 1);
    // 上をコメントアウトしてください
  };
  return (
    <button onClick={handleClick} type="button">
      {count}
    </button>
  );
}
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

この状態でもう一度、Vitestの実行結果を確認しましょう。すると、先ほどのスナップショットテストが実行されますが、今回はテストが通らず、描画されたコンポーネントとスナップショットの差分が表示されます。次の差分からは、スナップショットとしては`1000`を期待しているのに、実際には`999`が表示されていることが分かります。

```taml
<bold><bgBlue> RERUN </bgBlue></bold> <dim><blue>like-button.tsx </blue></dim><blue>x1 </blue>

 <red>❯</red> <black><bgYellow> chromium </bgYellow></black><bgYellow></bgYellow> like-button.browser.test.tsx <dim>(2 tests | </dim><red>1 failed<dim></dim></red><dim>)</dim><green> 39<dim>ms</dim></green>
   <green>✓</green> ボタンを表示したときのカウントが999であること<green> 4<dim>ms</dim></green>
<red>   × ボタンをクリックしたらカウントが1000になること</red><green> 35<dim>ms</dim></green>

<red>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<bold></bold></red><bold><bgRed> Failed Tests 1 </bgRed></bold><red>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

<bold></bold></red><bold><bgRed> FAIL </bgRed></bold> <black><bgYellow> chromium </bgYellow></black><bgYellow></bgYellow> like-button.browser.test.tsx<dim>:11:1 > </dim>ボタンをクリックしたらカウントが1000になること
<bold><red>Error</red></bold><red>: Snapshot `ボタンをクリックしたらカウントが1000になること 1` mismatched</red>

<green>- Expected</green>
<red>+ Received</red>

<dim>  &lt;div></dim>
<dim>    &lt;button</dim>
<dim>      type="button"</dim>
<dim>    ></dim>
<green>-     1000</green>
<red>+     999</red>
<dim>    &lt;/button></dim>
<dim>  &lt;/div></dim>

<cyan> <dim>❯</dim></cyan><cyan> like-button.browser.test.tsx:<dim>15:20</dim></cyan>
    <brightBlack> 13| </brightBlack>  <magenta>const</magenta> button <yellow>=</yellow> <blue>getByRole</blue>(<green>"button"</green>)<yellow>;</yellow>
    <brightBlack> 14| </brightBlack>  <magenta>await</magenta> button<yellow>.</yellow><blue>click</blue>()<yellow>;</yellow>
    <brightBlack> 15| </brightBlack>  <blue>expect</blue>(container)<yellow>.</yellow><blue>toMatchSnapshot</blue>()<yellow>;</yellow>
    <brightBlack>   | </brightBlack>                   <red>^</red>
    <brightBlack> 16| </brightBlack>})<yellow>;</yellow>

<dim><red>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


</red>  Snapshots </dim> <bold><red>1 failed</red></bold>
<dim> Test Files </dim> <bold><red>1 failed</red></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><red>1 failed</red></bold> | <green>1 passed</green><brightBlack> (2)</brightBlack>
<dim>   Start at </dim> 17:57:59
<dim>   Duration </dim> 47ms

<bold><bgRed> FAIL </bgRed></bold> <red>Tests failed. Watching for file changes...</red>
       <dim>press </dim><yellow>u</yellow> to update snapshot, press h to show help
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。tmuxでの結果確認はtmux capture-pane -p -e -t vitest -S - -E -でできます。 -->

今回はボタンの振る舞いを変更しましたが、たとえば`button`タグから`div`タグへの変更や、`button`タグへのクラスの追加など、DOMに対する変更のほとんどをスナップショットテストで検知できます。

スナップショットテストの詳しいやり方やベストプラクティスなど、さらに詳しい情報に触れたい方はVitestの[公式ドキュメント](https://vitest.dev/guide/snapshot.html)をご参照ください。

<!-- regression test: 上の段落に含まれる全てのリンク先が正しいことを確認してください。 -->

## ユニットテストとコンポーネントテストを共存させる

ここまでの手順では、まずはシンプルにはじめるため、`vitest.config.ts`がコンポーネントテスト専用の設定になっています。

一方で実務では、コンポーネントテストだけでなく、ユニットテストや結合テストなどさまざまなレベルのテストが必要になります。ここからは、[Vitestでテストを書こう](./vitest.md)の続きとして、ユニットテストとコンポーネントテストを共存させる方法を学びます。

まず、Vitestの[テストプロジェクト機能](https://vitest.dev/guide/projects)を用いた設定に変更します。変更後の`vitest.config.ts`は次のようになります。

<!-- regression test: 上の段落に含まれる全てのリンク先が正しいことを確認してください。 -->

```ts title="vitest.config.ts"
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["**/*.unit.{test,spec}.ts"],
          environment: "node",
        },
      },
      {
        test: {
          name: "browser",
          include: ["**/*.browser.{test,spec}.{ts,tsx}"],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
```

<!-- regression test: 上のコードがコンパイルエラーにならないことを確認してください。 -->

<!-- regression test: コンテナ内でXサーバーが使えない場合は、test.projects[1].test.browser.headlessをtrueにしてください。 -->

`projects`に`unit`と`browser`という2つのプロジェクトを定義しています。`unit`プロジェクトはユニットテストの実行に、`browser`プロジェクトはコンポーネントテストの実行に使用します。

これで、次のようにテストのレベルを限定して実行できます。

- ユニットテストだけを実行: `npx vitest --project unit`
- コンポーネントテストだけを実行: `npx vitest --project browser`

<!-- regression test: 上のコマンドで実際に単体テストとコンポーネントテストが別々に実行できることを確認してください。 -->

テストレベルを横断して実行したい場合は、これまでどおり`npx vitest`と実行するだけです。

<!-- regression test: 上のコマンドで実際に全てのテストが実行できることを確認してください。 -->
