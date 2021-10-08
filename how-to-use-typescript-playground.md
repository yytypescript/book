# TypeScript Playgroundの使い方

## TypeScript Playgroundとは

公式が提供している Web で TypeScript を手軽に試すことができる実行環境です。

## TypeScript Playgroundの使い方

[TypeScript Playground](https://www.typescriptlang.org/play) にアクセスすれば、すぐに使い始めることができます。

### プログラムの実行結果を確認する

Playground にアクセスできたら、早速コードを実行してみましょう。

次のサンプルコードを Playground のエディターに入力します。

```typescript
function add(a:number, b:number) {
    return a + b;
}

console.log(add(1, 2));
```

入力が終わったらエディターの上部にある`RUN` をクリックして、コードを実行できます。

実行後は右側の `Logs` のタブで実行結果が確認できます。

![](.gitbook/assets/sukurnshotto-2021-10-01-201539png.png)

### JavaScriptのコンパイル結果を確認する

TypeScript を書いていると実際に生成される JavaScript のコードを確認したい時があると思います。そんな時は、右側の `.JS` タブを開くことで生成される JavaScript のコードを確認することができます。

試しに TypeScript 固有の機能である `enum` のコンパイル結果を確認してみます。

エディターに次のコードを入力して `.JS` タブを開いてみてください。

```typescript
enum Color {
    RED = 'red',
    BLUE = 'blue',
    GREEN = 'green'
}

console.log(Color.RED);
```

TypeScript が `enum` を どのように JavaScript へコンパイルしているか簡単に確認することができます。

![](.gitbook/assets/sukurnshotto-2021-10-01-202145png.png)

### コンパイルエラーの確認方法

次のサンプルコードをエディター上で入力してみてください。エディター上に表示される赤の波線にマウスオーバーをすることでリアルタイムにコンパイルエラーを確認することができます。

```typescript
let value = '1';
value = 1;
value = true;
```

また、エディターでマウスオーバーをする以外にも右側の `Errors` タブを表示して、すべてのエラーを一覧で確認することができます。

![](.gitbook/assets/sukurnshotto-2021-10-01-220014png.png)

### 型定義の確認方法

`.D.TS` タブを開くことでエディターのコードから生成される型定義を確認することができます。

```typescript
// コード
function add(a:number, b:number) {
    return a + b;
}

// .D.TSの出力
declare function add(a: number, b: number): number;
```

### 書いたコードを共有する

↓のURLを開いてみてください。エディターにコードが入力された状態で TypeScript Playgournd が表示されます。

[https://www.typescriptlang.org/play?\#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwChF3FTioRSllEAaioBuFgF8WLCAgDOcADbEAdArgBzLOgwBGSgCZ69EUA](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwChF3FTioRSllEAaioBuFgF8WLCAgDOcADbEAdArgBzLOgwBGSgCZ69EUA)

TypeScript Playground はページのURLを共有するだけで書いたコードを他の人に共有することができます。

これは

1. エディターのコードを文字列圧縮ライブラリで圧縮して文字列をURLに設定する  
2. URLを共有する  
3. 共有されたURLが開かれる時に圧縮された文字列をデコードしてエディターに展開する

という仕組みでコードが共有されています。

新規で Playground を開き上記のリンク先と同じコードをエディターに入力すると、同じURLが生成されるのを確認できます。

## TypeScript Playgroundの設定方法

### TypeScript のバージョンの設定

左上のバージョンが記載されたタブをクリックすることで、実行する Type Script のバージョンを変更することができます。

デフォルトでは TypeScript のバージョンは 4.1 以上なので、次のサンプルコードはコンパイルエラーが発生しません。

バージョンを 4.1 未満に変更してみてください。TypeScript のバージョンが変更されたことで   
`Template Literal Types` が非対応となりコンパイルエラーが発生するのが確認できます。

```typescript
type LocaleLang = 'en' | 'ja' | 'fr';
type LocaleId = `locale_${LocaleLang}`;
```

### TS Config の設定

画面上部の `TS Config` のタブをクリックすることで TS Config の設定をすることができます。

次のサンプルコードをエディターに入力すると、`noImplicitAny` が有効になっているためコンパイルエラーがが発生します。

```typescript
// Parameter 'name' implicitly has an 'any' type.
function hello(name) {
    console.log(`hello, ${name}`);
}
```

`TS Config` タブを開き `TypeChecking > noImplicitAny` のチェックボックスをOFFに変更すると、コンパイルエラーが消えているのが確認できます。

