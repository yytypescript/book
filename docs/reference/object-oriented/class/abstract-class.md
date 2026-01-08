---
sidebar_label: 抽象クラス
---

# 抽象クラス (abstract class)

JavaやPHPなどの言語では、`abstract`修飾子を使って抽象クラスを定義できます。抽象クラスは、直接インスタンスを作れないクラスのことです。JavaScriptには抽象クラスを定義する構文はありません。一方、TypeScriptには`abstract`修飾子があり抽象クラスを表現できます。

`abstract`は抽象クラスを作成する時に宣言します。抽象クラスとは直接インスタンス化(`new`)することができず、必ずスーパークラスとして利用することを保証するものです。抽象クラス内のメソッドにも`abstract`宣言を行うことができます。`interface`と同じようにサブクラスは抽象メソッドを実装する必要があります。

`Food`クラスを抽象クラスに変更し、"要冷蔵"メソッド`keepRefrigerated()`を抽象メソッドとして追加すると`Meat`クラスでエラーが発生します。これは`Meat`クラスに`keepRefrigerated`メソッドが実装されていないからです。

```ts twoslash
// @errors: 2515
abstract class Food {
  constructor(
    protected name: string,
    protected calorie: number
  ) {}
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}

class Meat extends Food {}
```

`keepRefrigerated()`メソッドを実装することによりエラーはなくなります。

```ts twoslash
abstract class Food {
  constructor(
    protected name: string,
    protected calorie: number
  ) {}
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}
// ---cut---
class Meat extends Food {
  keepRefrigerated(): boolean {
    return true;
  }
}
```

## JavaScriptへのコンパイルしたときに起こること

TypeScriptの抽象クラスは、JavaScriptにコンパイルしたとき、消されることなく残ります。何も中身がない抽象クラスを定義してコンパイルしてみるとどうなるでしょうか。

```ts twoslash
abstract class AbstractClass {}
```

上のTypeScriptをコンパイルすると、次のJavaScriptが生成されます。

```ts twoslash title="コンパイル結果"
// @showEmit
// @alwaysStrict: false
abstract class AbstractClass {}
```

このように、抽象クラスは`abstract`修飾子が外され、ただのクラスとしてコンパイルされます。

抽象メソッドは、コンパイル時に消されます。たとえば、次の実装の中身がある`concreteMethod`は残りますが、抽象メソッドの`abstractMethod`は消えます。

```ts twoslash
abstract class AbstractClass {
  concreteMethod(): void {
    /* 実装の中身 */
  }
  abstract abstractMethod(): void;
}
```

上のTypeScriptのコンパイル結果は次のようになります。

```ts twoslash title="コンパイル結果"
// @showEmit
// @alwaysStrict: false
abstract class AbstractClass {
  concreteMethod(): void {
    /* 実装の中身 */
  }
  abstract abstractMethod(): void;
}
```
