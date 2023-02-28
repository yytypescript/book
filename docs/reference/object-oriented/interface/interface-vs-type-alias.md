---
description: interfaceでの宣言とtype aliasによる宣言の違い
---

# interfaceとtypeの違い

型エイリアスを利用することで、インターフェースと同様の定義が行なえます。

```ts twoslash
// @noErrors
interface Animal {
  name: string;
  bark(): string;
}
type Animal = {
  name: string;
  bark(): string;
};
```

この章では、インターフェースと型エイリアスの違いについて詳しく説明していきます。

## インターフェースと型エイリアスの違い

| 内容             | インターフェース   | 型エイリアス                     |
| :--------------- | :----------------- | :------------------------------- |
| 継承             | 可能               | 不可。ただし交差型で表現は可能   |
| 継承による上書き | 上書きまたはエラー | フィールド毎に交差型が計算される |
| 同名のものを宣言 | 定義がマージされる | エラー                           |
| Mapped Types     | 使用不可           | 使用可能                         |

### 継承

インターフェースは、インターフェースや型エイリアスを継承できます。

```ts twoslash
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

一方、型エイリアスは継承は行えません。代わりに交差型(&)を使用することで、継承と似たことを実現できます。

```ts twoslash
type Animal = {
  name: string;
};
type Creature = {
  dna: string;
};
type Dog = Animal &
  Creature & {
    dogType: string;
  };
```

### プロパティのオーバーライド

インターフェースで継承の際にプロパティをオーバーライドすると、継承元のプロパティの型が上書きされます。

```ts twoslash
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
```

ただし、オーバーライドするためには元の型に代入できるものでなければなりません。次の例は`number`型であるフィールドを`string`型でオーバーライドしようとしている例です。

```ts twoslash
// @errors: 2430
interface A {
  numberField: number;
  price: {
    yen: number;
    dollar: number;
  };
}

interface B extends A {
  numberField: string;
  price: {
    yen: number;
    euro: number;
  };
}
```

一方、型エイリアスの場合は上書きにはならず、フィールドの型の交差型が計算されます。また、交差型で矛盾があって計算できない場合もコンパイルエラーにはなりません。

```ts twoslash
// @noErrors
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
  name: never; // 交差型を作れない場合はコンパイルエラーではなくnever型になる
  price: {
    yen: number;
    dollar: number;
    euro: number;
  };
};
```

### 同名のものを宣言

型エイリアスは同名のものを複数定義できず、コンパイルエラーになります。

```ts twoslash
// @errors: 2300
type SameNameTypeWillError = {
  message: string;
};
type SameNameTypeWillError = {
  detail: string;
};
```

一方、インターフェースの場合は、同名のインターフェースを定義でき、同名の定義をすべて合成したインターフェースになります。
ただし、同名のフィールドだが、型の定義が違っている場合はコンパイルエラーになります。

```ts twoslash
// @errors: 2717
interface SameNameInterfaceIsAllowed {
  myField: string;
  sameNameSameTypeIsAllowed: number;
  sameNameDifferentTypeIsNotAllowed: string;
}

interface SameNameInterfaceIsAllowed {
  newField: string;
  sameNameSameTypeIsAllowed: number;
}

interface SameNameInterfaceIsAllowed {
  sameNameDifferentTypeIsNotAllowed: number;
}
```

### Mapped Types

Mapped Typesについては別のページで詳しく説明しますので、ここでは型エイリアスとインターフェースのどちらで使えるかだけを説明します。

[Mapped Types](../../type-reuse/mapped-types.md)

Mapped Typesは型のキーを動的に指定することができる仕組みであり、型エイリアスでのみ利用することができます。
次の例ではユニオン型の一覧をキーとした新しい型を生成しています。

```typescript twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
```

インターフェースでMapped Typesを使うとエラーになります。

```typescript twoslash
// @errors: 7061
type SystemSupportLanguage = "en" | "fr" | "it" | "es";

interface Butterfly {
  [key in SystemSupportLanguage]: string;
}
```

## インターフェースと型エイリアスの使い分け

実際に型を定義する時にインターフェースと型エイリアスのどちらを使うのがよいのでしょうか？残念ながら、これに関しては明確な正解はありません。

インターフェースと型エイリアスのどちらでも型を定義することができますが、拡張性やMapped Typesの利用可否といった点で異なる部分が存在するので、これらのメリット・デメリットを考慮してプロジェクト内でルールを決めてそれに遵守するようにしましょう。

参考例として、Googleが公開しているTypeScriptのスタイルガイドの[型エイリアスvsインターフェス](https://google.github.io/styleguide/tsguide.html#interfaces-vs-type-aliases)の項目では、プリミティブな値やユニオン型やタプルの型定義をする場合は型エイリアスを利用し、オブジェクトの型を定義する場合はインターフェースを使うことを推奨しています。

インターフェースと型エイリアスの使い分けに悩む場面が多く開発スピードが落ちてしまうのであれば、型エイリアスに統一して書く方針にする考え方もあります。

### インターフェースの利用例

ライブラリを作成する際に定義した型の構造がアプリケーション側に依存するような場合にはインターフェースを利用するのが適切です。

Node.jsの`process.env`の型定義は`@types/node/process.d.ts`で次のように実装されています。

```ts twoslash
declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        TZ?: string;
      }
    }
  }
}
```

インターフェースで型定義されていることで、パッケージを利用する側で型の拡張が自由に行えるようになっています。

もし`ProcessEnv`が型エイリアスで定義されていると型の拡張が行えず、とても開発しづらい状態になってしまいます。このように不特定多数のユーザーが型を参照するような場合には、拡張性を考慮してインターフェースで型定義をするようにしましょう。

```ts twoslash
// src/types/global.d.ts
declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production";
      }
    }
  }
}
```

## 関連情報

[インターフェース (interface)](./README.md)

[型エイリアス (type alias)](../../values-types-variables/type-alias.md)
