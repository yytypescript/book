# 🚧TypeScript Playgroundの使い方

## TypeScript Playgroundとは

公式が提供している Web で TypeScript を手軽に試すことができる実行環境です。

## TypeScript Playgroundの使い方

[TypeScript Playground](https://www.typescriptlang.org/play) にアクセスすれば、すぐに使い始めることができます。

検索をする際は「typescript playground」と検索をすれば、表示される検索結果からアクセスができます。

### プログラムの実行結果を確認する

Playground にアクセスできたら、早速試しにコードを実行してみましょう。

次のサンプルコードを Playground のエディターに入力します。

```typescript
function add(a:number, b:number) {
    return a + b;
}

console.log(add(1, 2));
```

入力が終わったら、エディターの上にある`RUN` をクリックして、エディターのコードを実行できます。

実行後は右側の `Logs` のタブで実行結果が確認できます。

![](.gitbook/assets/sukurnshotto-2021-10-01-201539png.png)

### JavaScriptのコンパイル結果を確認する

TypeScript を書いていると実際に生成される JavaScript のコードを確認したい時があると思います。そんな時は、右側の `.JS` タブを開くことで実際に生成される JavaScript のコードを確認することができます。

試しに TypeScript 固有の機能である `enum` のコンパイル結果を確認してみます。

エディタに次のコードを入力して `.JS` タブを開いてみてください。

```typescript
enum Color {
    RED = 'red',
    BLUE = 'blue',
    GREEN = 'green'
}

console.log(Color.RED);
```

TypeScript が enum を どのように JavaScript へコンパイルしているか簡単に確認することができます。

![](.gitbook/assets/sukurnshotto-2021-10-01-202145png.png)

### 書いたコードを共有する

↓のURLを開いてみてください。エディタにコードが入力された状態で TypeScript Playgournd が表示されます。

[https://www.typescriptlang.org/play?\#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwChF3FTioRSllEAaioBuFgF8WLCAgDOcADbEAdArgBzLOgwBGSgCZ69EUA](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBTIFxhAWwCMBTAJwBpFDcCTSBKRAbwChF3FTioRSllEAaioBuFgF8WLCAgDOcADbEAdArgBzLOgwBGSgCZ69EUA)

TypeScript Playground はページのURLを共有するだけで書いたコードを他の人に共有することができます。

TypeScript Playground は

1. エディターのコードを文字列圧縮ライブラリで圧縮して文字列をURLに設定する  
2. URLを共有する  
3. 共有されたURLが開かれる時に圧縮された文字列をデコードしてエディタに展開する

という仕組みでコードが共有されています。

試しに新く Playground を開き上記のURLで確認できるコードと同じコードを入力したら同じURLが生成されるのを確認できます。

### コンパイルエラーの確認方法

エディター上で赤く表示された波線にマウスオーバーをすることでリアルタイムにコンパイルのエラーを確認することができます。

```typescript
let value = '1';
value = 1;
value = true;
```

また、エディターでマウスオーバーをする以外にも右側の `Errors` タブを表示して、全てのエラーを一覧で確認することができます。

![](.gitbook/assets/sukurnshotto-2021-10-01-220014png.png)



## TypeScript PlaygroundのTS Configの設定方法

TODO

### 

