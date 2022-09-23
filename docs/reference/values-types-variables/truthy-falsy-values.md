---
sidebar_label: truthyな値、falsyな値
---

# truthyな値、falsyな値

## 特定の条件で処理を変えたい

どのような言語でも、ある条件のときは別の処理をさせたいということがあります。むしろ、ない言語はないでしょう。当然、TypeScriptでもそのような機能はあり、`if`を使います。

```ts twoslash
class Employee {
  isPartTime(): boolean {
    return false;
  }
}

const employee = new Employee();

// ---cut---
if (employee.isPartTime()) {
  // ...
}
```

このときメソッドの`isPartTime()`は真偽値、つまりboolean型を返すとは誰もが見てもそう思います。

## JavaScriptでは、真偽値でなくてもifの対象にできる

ところが、JavaScriptではその限りではありません。JavaScriptではその値(や演算結果)が仮にboolean型である必要はありません。では、どのような値の場合は`if`ブロックを実行し、逆に実行しないのでしょうか。

## true, false「っぽい」値

このようなとき、条件を満たすとされる値のことをtruthyと、また満たさないとされる値のことをfalsyと呼びます。これは英語の真と偽を意味するtruthとfalseにそれぞれ「のような」というニュアンスを模す接尾語のyをつけたものです。

## falsyな値

falsyな値から説明します。というのはfalsyな値というのは限られており、それ以外のすべての値がtruthyとなるのでこれだけ覚えてしまえばいいということでもあります。

| 値        | 型        | 意味         |
| --------- | --------- | ------------ |
| false     | boolean   | 疑値         |
| 0         | number    | 数値の0      |
| -0        | number    | 数値の-0     |
| NaN       | number    | Not a Number |
| 0n        | bigint    | 整数値の0    |
| ''        | string    | 空文字列     |
| null      | null      | null         |
| undefined | undefined | undefined    |

これらの値が`if`の条件式に入った場合、その`if`ブロックは実行されません。

## truthy, falsyな値で条件分岐することの問題点

これらの値を使って`if`の条件式にすること自体は可能なのですが、同時に意図しない挙動を含むことがあるので使う際は注意したほうがよいでしょう。たとえば、次の例は配列にある`null`を取り除くつもりでコードを書きましたが、意図しない結果になります。

```ts twoslash
const array = [null, 3, 0, null, 1, 2];

console.log(array.filter((n) => n));
// @log: [3, 1, 2]
```

`array.filter()`でfalsyな値を取り除いた結果、`null`はともかくnumber型でfalsyな値である`0`までもが取り除かれてしまいました。

### このような事態にならないために

意図しない分岐を避けるためには、truthy, falsyの値を直接boolean型として使うのではなく、ちゃんとtrue, falseの値を返すようにします。

```ts twoslash
const array = [null, 3, 0, null, 1, 2];

console.log(array.filter((n) => n !== null));
// @log: [3, 0, 1, 2]
```

## 最後ここを書いて終わりだ

TypeScriptのeslintにもboolean型を期待するところでboolean型以外が与えられると警告を発するオプションがあります。

[strict-boolean-expression](https://typescript-eslint.io/rules/strict-boolean-expressions/)
