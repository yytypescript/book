# switchのフォールスルー問題

JavaScriptのswitchの`case`には、分岐を抜けさせる働きがありません。分岐を抜けるには、`break`が必要です。`break`を書かない場合、次の分岐も実行されます。この仕様をフォールスルー(fallthrough)と言います。

```ts twoslash
let s = "A";
switch (s) {
  case "A": // breakが無い分岐
    console.log(1);
  case "B": // この分岐にも処理が続く
    console.log(2);
}
// @log: 1 2 の順で出力される
```

フォールスルーはしばしばバグの原因になります。TypeScriptでは、コンパイラオプション`noFallthroughCasesInSwitch`を`true`にすると、フォールスルーを警告するようになります。このオプションは有効化しておきましょう。

```ts twoslash
// @noFallthroughCasesInSwitch: true
// @errors: 7029
let s = "A";
switch (s) {
  case "A":
    console.log(1);
  case "B":
    console.log(2);
}
```

[noFallthroughCasesInSwitch](../tsconfig/nofallthroughcasesinswitch.md)

<TweetILearned>

😴JavaScriptのswitchのcaseには、分岐を抜けさせる働きがない
⏩breakを書かないと次の分岐も実行される(フォールスルー)
🐞フォールスルーはバグになりがち
✅TypeScriptではnoFallthroughCasesInSwitchを有効にするとフォールスルーが検出される

</TweetILearned>
