# Reactでいいねボタンを作ろう

このチュートリアルでは、TypeScriptとReactの両方を用いて、SNSでよく見かける「いいねボタン」のUIを実装します。

本チュートリアルは、TypeScriptとReactによるコーディングの体験をすることを主眼に置いています。そのため、TSとReactの理論的な説明は省きます。「TypeScriptとReactでUIを開発するにはどのような流れになるのか」を感じ取って頂くことを目的としています。

Reactの専門書と比べて、本書の解説は詳しさや正確さは劣ります。それでも、初めてReactに触れる方でも読み進められるよう、Reactについて随時ワンポイント解説をしていくので、安心してお読みください。

このチュートリアルで作成するいいねボタンの最終的な成果物は[デモサイト](https://like-button.typescriptbook.jp)で確認できます。チュートリアルを開始する前に事前に触ってみることで、各ステップでどんな実装をしているかのイメージが掴みやすくなります。また、完成形のソースコードは[GitHub](https://github.com/yytypescript/like-button)で確認することができます。

## Reactとは？

ReactはFacebook社が開発した、ウェブアプリケーションのUIを作るためのパッケージです。JavaScriptやTypeScriptだけでもインタラクティブなUIは実装できます。しかし、UIが複雑になるとReactなしではコードの記述量が増大したり、可読性が悪くなったりと難易度が上がります。なんといっても、UIが今どのような状態なのかを管理するのは、プログラマが把握しきれない複雑さになることがあります。Reactを使うと、複雑なUIやインタラクションを短く簡潔に読みやすく書けるようになり、状態の管理も分かりやすくなります。

## Reactの3大特徴

Reactはどのような特徴を持ったパッケージなのでしょうか？ここではReactの特徴を3つに分けて説明します。Reactについて多少の予備知識を得たい方は、このセクションをお読みください。今すぐコードを書きたいという方は、ここは読み飛ばしても問題ありません。

### 特徴その1: 仮想DOM

Reactは仮想DOM(virtual DOM)という考えを採用しています。仮想DOMを理解するには、仮想ではない普通のDOMが何かを知る必要があります。DOM(document object model)とは、HTMLをJavaScriptから参照・操作する仕組みです。これのおかげで、HTMLを文字列操作ではなく、オブジェクトとして処理できます。DOMはHTMLを操作するためのAPIのようなものです。

プログラマがDOMを操作すると、間接的にHTMLが書き換えられ、その結果が画面に描画されます。多くの動的なUIはDOM操作で成り立っています。

```js twoslash
// <input id="email">の文字色を赤色にするDOM操作の例
const emailInput = document.getElementById("email");
emailInput.style.color = "red";
```

DOMは必ずしもプログラマにとって使いやすいAPIではありません。上の例のようなスタイルを少し変更するくらいなら実用的です。しかし、複雑なUIを作ろうとすると途端に難しくなります。注意深く実装しないと、表示や状態の変更し忘れといったバグを生みやすくなります。操作の方法が悪くパフォーマンス面で問題が出たりします。

仮想DOMはリアルDOMのプロキシのようなものです。リアルDOMと比べて、状態管理上のバグを起こしにくい設計になっています。加えて、パフォーマンス面では描画処理の最適化もします。プログラマにとっては、リアルDOMを扱うときのような慎重さが不要になります。画面表示を変えたければ、仮想DOMを操作します。仮想DOMに起こった変更はリアルDOMに伝わり、画面に現れてきます。仮想DOMは、複雑なUIを苦労せずに実装するための仕組みと言えます。

### 特徴その2: 宣言的UI

Reactの2つ目の特徴はUIを宣言的に書ける点です。Reactを使わずにUIを実装すると、命令的なコードになります。命令的なコードでは、何かを表示したい場合でもどのように表示するかのhowの部分を細かく書く必要があります。

次の簡単なHTMLのリストを表示するために、命令的なコードと宣言的なコードで書き方がどう違うかを見ていきましょう。

```html
<ul>
  <li>リンゴ</li>
  <li>オレンジ</li>
  <li>ぶどう</li>
</ul>
```

まず、命令的なコードでは、次のようになります。

```js twoslash
const list = document.createElement("ul");
const apple = document.createElement("li");
apple.innerText = "リンゴ";
list.append(apple);
const orange = document.createElement("li");
orange.innerText = "オレンジ";
list.append(orange);
const grape = document.createElement("li");
grape.innerText = "ぶどう";
list.append(grape);
```

この処理を日本語に書き下すと、次のようになります。

- `ul`要素を作り、変数`list`に代入する
- `li`要素を作り、変数`apple`に代入する
- `apple`のテキストは「リンゴ」にする
- `list`に`apple`を追加する
- `li`要素を作り、変数`orange`に代入する
- `orange`のテキストは「オレンジ」にする
- `list`に`orange`を追加する
- ...

3つの果物のリストのような簡単なUIでも、どのように作ったらいいかを細かく記述しなければなりません。これを見るだけでも、UIを命令的に書くのは大変で、保守していくことも考えると望ましい書き方には思えないのではないでしょうか。

今度は宣言的な書き方を見てみましょう。次はReactでの書き方です。

```js twoslash
function Fruits() {
  return (
    <ul>
      <li>リンゴ</li>
      <li>オレンジ</li>
      <li>ぶどう</li>
    </ul>
  );
}
```

見てのとおり、どのように表示するかの部分はなく、「このような表示になってほしい」という目標だけが書かれています。

宣言的UIでは、実装の細部やアルゴリズムを気にしなくてよいです。「どんなUIにしたいか」の一点に集中してコードを書けるようになります。

### 特徴その3: コンポーネントベース

Reactの3つ目の特徴は、コンポーネントベースです。コンポーネントというのはUIの部品のことです。たとえば、小さいもので言えばボタンや入力欄、より大きめの部品だとフォーム、さらに大きい部品ではページもコンポーネントです。

Reactには、小さいコンポーネントを組み合わせ、大きなアプリケーションを成すという思想があります。ここがReactがコンポーネントベースと言われるゆえんです。

コンポーネントベースのメリットは、同じコンポーネントを再利用できる点です。たとえば、ボタンコンポーネントを1つ作っておけば、それをアプリケーションの至るところで使い回せます。プログラマは同じコードを何度も書かなくて済み、開発効率が良くなります。

加えて、オープンソースのコンポーネントも数多く公開されています。プログラマは自分でゼロからコンポーネントを作らなくても、公開されているコンポーネントを利用することもできます。カレンダーUIのような自力で作ると面倒なコンポーネントも種類豊富に公開されているので、開発者はオープンソースのコンポーネントを使うとより手軽にアプリケーションが作れます。

## このチュートリアルに必要なもの

このチュートリアルをやるに当たって、必要なツールがあります。それらはここにリストアップしておくのであらかじめ用意しておいてください。

- Node.js (このチュートリアルではv22.16.0で動作確認しています)
- NPM (v10.8.2で動作確認しています)
- VS CodeやWebStormなどのエディター

## プロジェクトを作る

まず、`npm create`コマンドでReactプロジェクトのひながたを生成します。

```sh
npm create vite@latest like-button -- --template react-swc-ts
```

1分ほどするとひながたの生成が完了します。`like-button`ディレクトリが生成されるので、次のコマンドを実行してそのディレクトリに移動すると、ひながたが生成されているのが分かります。

```sh
cd like-button
```

```text title="生成後のディレクトリ構成"
.
├── eslint.config.js
├── index.html
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

ひながたのディレクトリに移動したら、次のコマンドを実行してライブラリなど依存パッケージをインストールします。

```sh
npm install
```

これを実行するとReactもインストールされます。インストールされたReactのバージョンを確認するには次のコマンドを用います。

```sh
npm list react
```

```text title="npm list reactの実行結果"
like-button@0.0.0 /Users/test/like-button
├─┬ react-dom@18.3.1
│ └── react@18.3.1 deduped
└── react@18.3.1
```

このディレクトリにて次のコマンドを実行すると、Reactのローカル開発サーバーが起動します。

```sh
npm run dev
```

コマンドを実行すると、次のようなメッセージが表示されます。ここに表示されているURLをブラウザで開くと、ひながたアプリの様子が確認できます。

```text title="npm run devの実行結果"
  VITE v5.4.10  ready in 262 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

![ViteとReactのロゴが表示された、カウントが0のVite + Reactスターターページ](react-like-button-tutorial/screen1.png)

<!-- TODO: 上の画像をおきかえる -->

Reactのローカル開発サーバーを停止する場合は、<kbd>Ctrl</kbd> + <kbd>C</kbd>キーを押してください。<kbd>Ctrl</kbd>キーと<kbd>C</kbd>キーを同時に押すと、コマンドを中断することができます。

ここからは実際にコードを書いて行きますので、生成したlike-buttonプロジェクトをお好みのエディターで開いてください。

ひながた初期状態の上のページはsrc/App.tsxの内容が描画されています。ためしに、src/App.tsxを変更してみましょう。App.tsxを、次のような内容にまるっと書き換えてください。

```tsx twoslash title="src/App.tsx"
// @noErrors
import "./App.css";

function App() {
  return (
    <>
      <h1>TypeScriptはいいぞ</h1>
    </>
  );
}

export default App;
```

:::tip ワンポイント解説: .tsxって何？TypeScriptの中にHTMLが書ける？

App.tsxを見てこのような疑問を持ったのではないでしょうか。このHTMLに見える部分はJSXと言われるものです。JSXはJavaScriptを拡張した言語で、JavaScriptの中にXMLを直接書けるようにしたものです。XMLとHTMLは厳密には異なりますが、ここでは同じものと考えてください。

UIを実装しようとするとHTMLと密接に関わるコードを書くことになりますが、JavaScriptの構文だけでHTMLを表現しようとすると、可読性が低くなりがちです。ReactではJSXを採用することで可読性の問題を解決しました。JSXは、HTMLをほぼありのままに書けるので、可読性の高いコードになります。

TypeScriptとJSXは本来無関係の言語ですが、開発者の利便性のために、TypeScriptでもJSXが書けるようになっています。

JSXを書いたJavaScriptファイルは拡張子を.jsxにします。同様にTypeScriptファイルは.tsxにします。

:::

[JSX](../reference/jsx/README.md)

書き換えたらファイルを保存し、ブラウザで確認してみてください。ブラウザに書いた文言が表示されていればOKです。

![「TypeScriptはいいぞ」というテキストが表示されたWebページのスクリーンショット](react-like-button-tutorial/screen2.png)

## ボタンを作る場所を用意する

ここからは、いいねボタンを実際に作っていきます。まずは、いいねボタンを実装する場所を作ります。

まず、先ほど「TypeScriptはいいぞ」と書いたところを`<LikeButton />`に変えます。次に、`LikeButton`関数を作ります。次のコードのようになるようにしてください。

```tsx twoslash {6,11-13} title="src/App.tsx"
import "./App.css";

function App() {
  return (
    <>
      <LikeButton />
    </>
  );
}

function LikeButton() {
  return <span>いいねボタン予定地</span>;
}

export default App;
```

この`LikeButton`関数が、これからいいねボタンを作っていく場所になります。

![「いいねボタン予定地」というテキストが中央に表示されたブラウザウィンドウのスクリーンショット](react-like-button-tutorial/screen3.png)

:::tip ワンポイント解説: 関数コンポーネント

ReactのJSXでは、HTMLタグの`div`や`header`が使えるだけでなく、自分で定義した関数もタグとして使うことができます。上で定義した`LikeButton`関数はその一例です。JSXを戻り値として返す関数だけがタグとして使えます。上の例では、`span`タグが戻り値になっているのがわかると思います。

JSXを戻り値にする関数をReact用語で「関数コンポーネント」と言います。Reactを使ったフロントエンドアプリケーション開発では、関数コンポーネントをうまく使うことがポイントになります。画面の部品をコンポーネントにしておくと、再利用できたり変更が一箇所で済んだりと、開発や保守がしやすくなります。

:::

:::tip ワンポイント解説: JSXのセルフクロージング要素

先ほども書いたように、JSXはJavaScriptの拡張構文であり、厳密にはHTMLと異なるものです。そのため、JSXにはHTMLとは異なる書き方や制約があります。

`<LikeButton />`のようにスラッシュをタグに含める書き方も、JSXならではの書き方です。これはセルフクロージング要素(self-closing element)と呼ばれます。自己閉じ要素、自己完結型要素と呼ばれることもあります。`<LikeButton></LikeButton>`のように子要素などを持たない場合に、`<LikeButton />`のように末尾に`/`をつけることで、短く表現できる書き方です。

JSXとHTMLのその他の違いについては、[Reactの公式ドキュメント](https://beta.reactjs.org/learn/writing-markup-with-jsx)を参照してください。

:::

## ボタンのビジュアルを作り込む

いいねボタンの実装場所が確保できたので、ここではボタンのタグを変更したり、CSSを書いたりして、ボタンの見た目を作っていきます。今回作るボタンは次の図のようなシンプルなものです。

![今回実装するいいねボタン](react-like-button-tutorial/like1.png)

まずは、`LikeButton`関数の`span`タグのテキストを`♥ {count}`にします。この`count`は変数なので、その変数も一緒に定義します。

```tsx twoslash {2-3} title="src/App.tsx"
function LikeButton() {
  const count = 999;
  return <span>♥ {count}</span>;
}
```

`count`変数は固定値になっていますが、あとでクリックしたときに増減するように変えるので今はこれで構いません。JSX内では`{}`で囲まれた部分には、JavaScriptの変数や式が書けます。上の例は変数名だけですが、`{count + 1}`のような式も有効です。

次に、CSSのクラスを割り当てるために、`span`タグに`className`属性を追加します。

```tsx twoslash {3} title="src/App.tsx"
function LikeButton() {
  const count = 999;
  return <span className="likeButton">♥ {count}</span>;
}
```

:::tip ワンポイント解説: class属性は使わない？

HTMLではCSSクラスを指定するのに`class`属性を用いるので、ここで`className`属性にしていることに驚いたのではないでしょうか。これは初期のReactがDOMプロパティに直接値をセットしていた名残りです。DOMでは、HTMLの`class`属性が`className`プロパティになります。現在は、ReactがDOMプロパティを直接セットすることがなくなったので、`className`属性に縛られる技術的理由はないのですが、React開発陣は`class`属性への乗り換えは慎重のようです。これまで作られたコンポーネントが動かなくなるかも知れないからです。また、両方サポートする気もないようです。`class`と`className`のどちらもOKとなると混乱を招くからです。

:::

続いて、`likeButton`クラスのCSSを書いていきます。Reactではスタイルシートを実装するのにいくつか方法がありますが、ここではApp.cssにCSSを書く方法にします。次のCSSをApp.cssの最後に追加してください。

```css title="src/App.css"
.likeButton {
  background-color: rgb(231, 76, 60);
  color: white;
  padding: 0.8rem;
  border-radius: 0.4rem;
  cursor: pointer;
}
```

App.cssに上の内容を書いたら、ブラウザで確認してみましょう。スタイルが効いていれば、次の図のような表示になっているはずです。

![赤色の背景の上にハートアイコンと数字「999」が表示された「いいね」ボタンがブラウザの中央に配置されているスクリーンショット](react-like-button-tutorial/screen4.png)

:::caution トラブルシューティング

App.cssはApp.tsxで`import`しているので特に何もしなくても`LikeButton`コンポーネントのスタイルに反映されます。もし、スタイルが反映されていないようなら、App.tsxにApp.cssを`import`するコードがあるか確認してください。

```tsx twoslash {1} title="src/App.tsx"
import "./App.css"; // この行があるか確認する

function App() {
  // ...
}
```

:::

ここまでで、ボタンのビジュアルの作り込みは一旦完了です。

## ボタンに機能をつける

このままでは、ボタンを押しても何も起きません。ここからは、ボタンを押したときに999がひとつ増えて1,000にカウントアップされる機能を作っていきます。

現状のボタンは`count`変数を表示していますが、この変数は固定値になっています。この値が変動できるように、Reactの`useState`関数を使い、カウント数の状態をReactに管理させるようにします。

```tsx twoslash {2,13} title="App.tsx"
import "./App.css";
import { useState } from "react"; // この行を追加

function App() {
  return (
    <>
      <LikeButton />
    </>
  );
}

function LikeButton() {
  const [count, setCount] = useState(999); // このように書き換える
  return <span className="likeButton">♥ {count}</span>;
}

export default App;
```

この`useState`は関数コンポーネントに状態を持たせるためのReactの機能です。`useState`の戻り値を`count`と`setCount`の2つの変数に代入しています。`count`には`999`のような値が代入され、`setCount`には`count`の値を変更する関数が代入されます。

次に、`span`要素をクリックしたときに、`count`の値を増加する`handleClick`関数を実装します。この関数では、現在の`count`の値に1を足した値を`setCount`関数に渡すようにします。そして、`span`要素の`onClick`属性に`handleClick`関数を渡します。

```tsx twoslash {14-16,18} title="src/App.tsx"
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <>
      <LikeButton />
    </>
  );
}

function LikeButton() {
  const [count, setCount] = useState(999);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <span className="likeButton" onClick={handleClick}>
      ♥ {count}
    </span>
  );
}

export default App;
```

これで、ボタンをクリックしたらいいねの数が増えるようになります。

![](react-like-button-tutorial/like2.gif)

以上でTypeScriptで作るReactいいねボタンは完成です。
