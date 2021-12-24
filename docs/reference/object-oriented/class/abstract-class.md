---
sidebar_label: 抽象クラス
---

# 抽象クラス (abstract class)

JavaやPHPなどの言語では、`abstract`修飾子を使って抽象クラスを定義できます。抽象クラスは、直接インスタンスを作れないクラスのことです。JavaScriptには抽象クラスを定義する構文はありません。一方、TypeScriptには`abstract`修飾子があり抽象クラスを表現できます。

`abstract`は抽象クラスを作成する時に宣言します。抽象クラスとは直接インスタンス化(`new`)することができず、必ずスーパークラスとして利用することを保証するものです。抽象クラス内のメソッドにも`abstract`宣言を行うことができます。`interface`と同じようにサブクラスは抽象メソッドを実装する必要があります。

`Food`クラスに抽象クラスに変更し、"要冷蔵"メソッド`keepRefrigerated()`を抽象メソッドとして追加すると`Meat`クラスでエラーが発生します。これは`Meat`クラスに`keepRefrigerated`メソッドが実装されていないからです。

```ts twoslash
// @errors: 2515
abstract class Food {
  constructor(protected name: string, protected calorie: number) {}
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}

class Meat extends Food {}
```

`keepRefrigerated()`メソッドを実装することによりエラーはなくなります。

```ts
class Meat extends Food {
  keepRefrigerated(): boolean {
    return true;
  }
}
```
