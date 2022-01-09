---
description: interfaceでの宣言と、type aliasによる宣言の違い
---

# 🚧interfaceとtypeの違い

型エイリアスを利用することで、インターフェースと同様の定義が行なえます。

```ts
type Animal = {
  name: string;
  bark(): string;
};
interface Animal {
  name: string;
  bark(): string;
}
```

この章では、インターフェースと型エイリアスの違いについて詳しく説明していきます。

## インターフェースと型エイリアスの違い

| 内容             | インターフェース   | 型エイリアス                     |
| :--------------- | :----------------- | :------------------------------- |
| 継承             | 可能               | 不可。ただし交差型で表現は可能   |
| 継承による上書き | 上書きまたはエラー | フィールド毎に交差型が計算される |
| 同名のものを宣言 | 定義がマージされる | エラー                           |
| Mapped Type      | 使用不可           | 使用可能                         |

### 継承

インターフェースは、インターフェースや型エイリアスを継承できます。

```ts
interface Animal {
  name: string;
}
type Creature = {
  dna: string;
};
interface Dog extends Animal, Creature {
  dogType: string;
}
```

一方、型エイリアスは継承は行なえません。代わりに交差型(&)を使用することで、継承と似たことを実現できます。

```ts
type Animal = {
  name: string,
};
type Creature = {
  dna: string,
};
// NG
type Dog extends Animal
// OK
type Dog = Animal &
  Creature & {
    dogType: string,
  };
```

### プロパティのオーバーライド

インターフェースで継承の際にプロパティをオーバーライドした際には、継承元のプロパティの型が

```ts
// OK
interface Animal {
  name: any;
  price: {
    yen: number;
  };
  legCount: number;
}

interface Dog extends Animal {
  name: string;
  price: {
    yen: number;
    dollar: number;
  };
}
// 最終的なDogの定義
interface Dog {
  name: string;
  price: {
    yen: number;
    dollar: number;
  };
  legCount: number;
}

// NG
interface A {
  numberField: number;
  price: {
    yen: number;
    dollar: number;
  };
}
interface B extends A {
  numberField: string; // Error:stringはnumberに代入できないため
  // Error:dollar
  price: {
    yen: number;
    euro: number;
  };
}
```

一方、型エイリアスの場合は上書きにはならず、フィールドの型の交差型が計算されます。また、交差型で矛盾があって計算できない場合もコンパイルエラーにはなりません。

```ts
type Animal = {
  name: number;
  price: {
    yen: number;
    dollar: number;
  };
};

type Dog = Animal & {
  name: string;
  price: {
    yen: number;
    euro: number;
  };
};
// 最終的なDogの定義
type Dog = {
  name: never; // 交差型作れない場合はコンパイルエラーではなくnever型になる
  price: {
    yen: number;
    dollar: number;
    euro: number;
  };
};
```

### 同名のものを宣言

TODO: 書く

### Mapped Type

TODO: 書く

## インターフェースと型エイリアスの使い分け

インターフェースは型の宣言であり、型エイリアスは型に名前をつける機能です。この定義に立ち返って使い分けをしましょう。

TODO: 残りを書く

## 関連情報

[インターフェース (interface)](/reference/object-oriented/interface/interface-vs-type-alias)

[型エイリアス (type alias)](../../values-types-variables/type-alias.md)
