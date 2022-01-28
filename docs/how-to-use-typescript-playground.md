# TypeScript Playgroundの使い方

## TypeScript Playgroundとは

公式が提供している Web で TypeScript を手軽に試すことができる実行環境です。

## TypeScript Playgroundを使う

[TypeScript Playground](https://www.typescriptlang.org/play) にアクセスすれば、すぐに使いはじめることができます。

### プログラムの実行結果を確認する

Playground にアクセスできたら、早速コードを実行してみましょう。

次のサンプルコードを Playground のエディターに入力します。

```ts
function add(a: number, b: number) {
  return a + b;
}

console.log(add(1, 2));
```

入力が終わったらエディターの上部にある`RUN`をクリックして、コードを実行できます。

実行後は右側の`Logs`のタブで実行結果が確認できます。

![](how-to-use-typescript-playground/image1.png)

### JavaScriptのコンパイル結果を確認する

TypeScript を書いていると実際に生成される JavaScript のコードを確認したい時があると思います。そんな時は、右側の`.JS`タブを開くことで生成される JavaScript のコードを確認することができます。

試しに TypeScript 固有の機能である`enum`のコンパイル結果を確認してみます。

エディターに次のコードを入力して`.JS`タブを開いてみてください。

```ts
enum Color {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
}

console.log(Color.RED);
```

TypeScript が`enum`をどのように JavaScript へコンパイルしているか簡単に確認することができます。

![](how-to-use-typescript-playground/image2.png)

### コンパイルエラーの確認方法

次のサンプルコードをエディター上で入力してみてください。エディター上に表示される赤の波線にマウスオーバーをすることでリアルタイムにコンパイルエラーを確認することができます。

```ts
let value = "1";
value = 1;
value = true;
```

また、エディターでマウスオーバーをする以外にも右側の`Errors`タブを表示して、すべてのエラーを一覧で確認することができます。

![](how-to-use-typescript-playground/image3.png)

### 型定義の確認方法

`.D.TS`タブを開くことでエディターのコードから生成される型定義を確認することができます。

```ts
// コード
function add(a: number, b: number) {
  return a + b;
}

// .D.TSの出力
declare function add(a: number, b: number): number;
```

### 書いたコードを共有する

↓のURLを開いてみてください。エディターにコードが入力された状態で TypeScript Playground が表示されます。

<https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwChF3FTioRSllEAaioBuFgF8WLCAgDOcADbEAdArgBzLOgwBGSgCZ69EUA>

TypeScript Playground はページのURLを共有するだけで書いたコードを他の人に共有することができます。

これは

1. エディターのコードを文字列圧縮ライブラリで圧縮して文字列をURLに設定する &#x20;
2. URLを共有する &#x20;
3. 共有されたURLが開かれる時に圧縮された文字列をデコードしてエディターに展開する

という仕組みでコードが共有されています。

新規で Playground を開き上記のリンク先と同じコードをエディターに入力すると、同じURLが生成されるのを確認できます。

### 色々な形式でコードを共有する

上部の`Export`タブから色々な形式でコードを共有するためのテキストを出力することができます。

たとえば`Copy as Markdown Link with Preview`を選択した場合は次のような形式のテキストを出力することができます。

````markdown
```
function add(a:number, b:number) {
    return a + b;
}
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwFgAoRTxU4qEUpMkQBqKgG52AX3bsICAM5wANsQB0SuAHMs6DAEZKAJnr0xQA)
````

## TypeScript Playgroundの設定方法

### TypeScript のバージョンの設定

左上のバージョンが記載されたタブをクリックすることで、実行する Type Script のバージョンを変更することができます。

デフォルトでは TypeScript のバージョンは 4.1 以上なので、次のサンプルコードはコンパイルエラーが発生しません。

バージョンを 4.1 未満に変更してみてください。TypeScript のバージョンが変更されたことで
`Template Literal Types`が非対応となりコンパイルエラーが発生するのが確認できます。

```ts
type LocaleLang = "en" | "ja" | "fr";
type LocaleId = `locale_${LocaleLang}`;
```

### TS Config の設定

画面上部の`TS Config`のタブをクリックすることで TS Config の設定をすることができます。

次のサンプルコードをエディターに入力して、出力される JavaScript のコードを`.JS`で確認をするとデフォルトでは

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

Playground の初期設定では`module: 'esnext'`が選択されているので、次の出力結果になります。

```js
export function add(a, b) {
  return a + b;
}
```

`TS Config`タブを開き`Module`の設定を`CommonJS`に変更をしてみます。TS Config の設定が変更されて`CommonJS`形式で出力される JavaScript のコードを確認することができます。

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
function add(a, b) {
  return a + b;
}
exports.add = add;
```
