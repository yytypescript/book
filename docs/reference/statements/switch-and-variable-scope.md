# switchと変数スコープ

JavaScriptでは、`switch`ごとに変数スコープが作られます。

```ts twoslash
switch (
  true // 変数スコープその1
) {
  default:
    switch (
      true // 変数スコープその2
    ) {
      default:
      // ...
    }
}
```

## caseの変数スコープはない

`case`ごとには変数スコープが作られません。複数の`case`がある場合、`switch`全体で変数スコープを共有します。そのため、複数の`case`で同じ変数名を宣言すると実行時エラーが発生します。

<!--prettier-ignore-->
```ts twoslash
let x = 1;
switch (x) {
  case 1:
    const sameName = "A";
    break;
  case 2:
    const sameName = "B";
// @error: SyntaxError: Identifier 'sameName' has already been declared
    break;
}
// @noErrors
```

TypeScriptでは、同じ変数名を宣言するとコンパイルエラーを出します。

```ts twoslash
// @errors: 2451
let x = 1;
switch (x) {
  case 1:
    const sameName = "A";
    break;
  case 2:
    const sameName = "B";
    break;
}
```

## caseに変数スコープを作る方法

caseに変数スコープを作るには、中カッコでcase節を囲みます。

```ts twoslash
let x = 1;
switch (x) {
  case 1: {
    const sameName = "A";
    break;
  }
  case 2: {
    const sameName = "B";
    break;
  }
}
```

こうすると、JavaScriptの実行時エラーも、TypeScriptのコンパイルエラーも発生しなくなります。

<TweetILearned>

🌏JavaScriptのswitchは全体で1つの変数スコープ
😕caseレベルのスコープはない

もしも複数のcaseで同じ変数名を宣言すると…
🔥JavaScript → 実行時エラー
⛔️TypeScript → コンパイルエラー

✅caseに{}を書くと固有のスコープが作れる

</TweetILearned>
