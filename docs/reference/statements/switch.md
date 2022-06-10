# switch文

switch構文はJavaScriptで条件分岐を行うための構文です。

```js
switch (条件) {
  case 値A:
    値Aの処理;
    break;
  case 値B:
    値Bの処理;
    break;
  default:
    値Aと値B以外の処理;
    break;
}
```

switch文を使った例は次です。

```js twoslash
const extension = "ts";
switch (extension) {
  case "js":
    console.log("JavaScript");
    break;
  case "ts":
    console.log("TypeScript");
    break;
  default:
    console.log("不明な言語");
    break;
}
// @log: "TypeScript"
```

このコードはif-elseで書き直すと次のようになります。

```js twoslash
const extension = "ts";
if (extension === "js") {
  console.log("JavaScript");
} else if (extension === "ts") {
  console.log("TypeScript");
} else {
  console.log("不明な言語");
}
// @log: "TypeScript"
```

caseは連続して書くこともできます。

```js twoslash
const food = "🍙";
switch (food) {
  case "🍎":
  case "🍓":
  case "🍉":
    console.log("くだもの");
    break;
  case "🍙":
  case "🍜":
  case "🍞":
    console.log("炭水化物");
    break;
  case "🥕":
  case "🧅":
  case "🥬":
    console.log("野菜");
    break;
  default:
    console.log("未知の食べ物");
    break;
}
// @log: "炭水化物"
```

## switchは厳密等価演算

switch構文でその値であると判断されるのは等価演算(`==`)ではなく厳密等価演算(`===`)です。たとえば`null`と`undefined`は等価演算では等しいとされますが厳密等価演算では等しくありません。

```ts twoslash
console.log(null == undefined);
// @log: true
console.log(null === undefined);
// @log: false
```

このふたつを使ったswitch構文を作るとそのことがよくわかります。

```ts twoslash
function test(n: unknown): void {
  switch (n) {
    case null:
      console.log("THIS IS null");
      return;
    case undefined:
      console.log("THIS IS undefined");
      return;
    default:
      console.log("THIS IS THE OTHER");
  }
}

test(null);
// @log: 'THIS IS null'
test(undefined);
// @log: 'THIS IS undefined'
```
