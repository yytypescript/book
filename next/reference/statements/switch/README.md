# switch文

switch構文はJavaScriptで条件分岐を行うための構文です。

```javascript
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

```javascript
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
// 出力結果: TypeScript
```

このコードはif-elseで書き直すと次のようになります。

```javascript
const extension = "ts";
if (extension === "js") {
  console.log("JavaScript");
} else if (extension === "ts") {
  console.log("TypeScript");
} else {
  console.log("不明な言語");
}
// 出力結果: TypeScript
```

caseは連続して書くこともできます。

```javascript
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
}
// 出力結果: 炭水化物
```

