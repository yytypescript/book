---
sidebar_label: "\U0001F6A7分割代入引数"
---

# 🚧分割代入引数 (destructuring assignment parameter)

たとえばBMI(Body Mass Index)を計算したいとします。身長(cm)と体重(kg)が与えられれば関数`bmi()`は次のような計算になります。

```javascript
function bmi(height, weight) {
  const mHeight: number = height / 100.0;
  return weight / mHeight ** 2;
}
```

この関数は引数がどちらも数値型なので、入れ替えてしまう間違いが起こりえます。22は平均的な体型ですが402はややとてつもなく肥満です。

```javascript
bmi(170, 65);
//=> 22.49134948096886
bmi(65, 170);
//=> 402.36686390532543
```

## 分割代入引数

このような誤用を避けるための方法として、JavaScriptでは分割代入引数(destructuring assignment parameter)を使うことができます。

```javascript
function bmi({ height, weight }) {
  const mHeight: number = height / 100.0;
  return weight / mHeight ** 2;
}
```

呼び出しは次のようになります。これなら`height`と`weight`の意味を取り違えない限り問題は起こりにくくなるでしょう。また、引数の位置を入れ替えても結果は同じになります。

```typescript
bmi({ height: 170, weight: 65 });
bmi({ weight: 65, height: 170 });
```

### 分割代入引数の型注釈

TODO

## キーの省略

JavaScriptでは、分割代入引数の名前と同じ変数が定義済みであれば、オブジェクトのキーを省略し、変数だけ渡すことができます。

```typescript
const height = 170;
const weight = 65;

// before
bmi({ height: height, weight: weight });

// after
bmi({ weight, height });
```

## 分割代入引数のデフォルト値

TODO

## 分割代入引数全体のオプショナル化

TODO
