---
sidebar_label: 構造的型付け
---

# TypeScriptと構造的型付け

プログラミング言語にとって、型システムは大事なトピックです。型システムとは、プログラム内のさまざまな値や変数に「型」を割り当てる決まりを指します。この決まりによってデータの性質や扱い方が決まります。特に、**どのように型と型を区別するのか**、逆に、**どのように型同士が互換性ありと判断するか**は、言語の使いやすさや安全性に直結するテーマです。

考えてみましょう。`string`型と`boolean`型は同じものと見なせるでしょうか？これらは明らかに異なるデータ型であり、たとえば`boolean`型の変数に文字列を代入することは、型の安全性を守る上で望ましくありません。このような型の区別は、プログラムを正しく動作させるために欠かせません。

さらに、型の「互換性」も重要な概念です。たとえば、次のふたつのクラスを考えます。

```ts twoslash
class Person {
  walk() {}
}

class Dog {
  walk() {}
}
```

これらのクラスは、`walk`メソッドを持つ点で似ています。このようなとき、`Person`型と`Dog`型は「互換性がある」とみなすことができるでしょうか。それとも、まったく異なる型として扱うべきでしょうか。

こうした問題を扱うために、プログラミング言語はさまざまな型システムを採用しています。どのように型を区別すべきか、また、どのように型同士の互換性を判断するべきか、このような観点から型システムの仕様を考える必要があります。TypeScriptでは、「構造的型付け」という型システムが採用されています。構造的型付けがどのように型を区別し、逆にどのように型同士に互換性があると判断するのか、こうした言語仕様を知ることは、よいコードを書くために役立ちます。

## 型の区別に関する2つのアプローチ

プログラミング言語における型の区別や互換性の判定には、主に次の2つのアプローチが存在します。

- 名前的型付け
- 構造的型付け

ここからは、TypeScriptだけでなく他の言語も含めて、それぞれのアプローチについて見ていきましょう。

### 名前的型付け

名前的型付け(nominal typing)は、型の名前に基づいて型の区別を行う方法です。このアプローチでは、型同士が同一かどうかを判断する際に、その型の名前が重要な役割を果たします。たとえば、`string`型と`number`型は名前が異なるため、異なる型として扱います。同様に、型が同じ名前を持つ場合（例：`string`と`string`）は、同じ型と判断します。このアプローチでは、`Person`型と`Dog`型は名前が異なるため、異なる型として扱い、互換性もなしと判断します。

名前的型付けを採用している言語の例としては、Java、PHP、C#、Swiftなどが挙げられます。これらの言語では、型の互換性は型の名前によって制御されます。たとえばJavaでは、次のように`Person`インスタンスを`Dog`型の変数に代入しようとすると、型の不一致がコンパイルエラーとして報告されます。

```java
class Person {}

class Dog {}

class Main {
    public static void main(String[] args) {
        Person person = new Person();
        Dog dog = person; // コンパイルエラー: 不適合な型
    }
}
```

この例では、`Person`型と`Dog`型は名前が異なるため、Javaの型システムはこれらを異なる型として扱い、互換性がないと判断します。このように、名前的型付けでは型の名前が型の同一性および互換性を判断するための基準となります。

### 構造的型付け

構造的型付け(structural typing)は、型の名前ではなく、その「構造」に着目して型の区別や互換性を判定するアプローチです。この方法では、型が持つプロパティやメソッドの構造が同一であれば、異なる名前を持つ型同士でも互換性があると見なします。TypeScriptはこの構造的型付けを型システムとして採用しています。

構造的型付けの考え方を、`Person`クラスと`Dog`クラスの例で具体的に見てみましょう。

```ts twoslash
class Person {
  walk() {}
}

class Dog {
  walk() {}
}
```

これらのクラスは、名前は異なりますが、構造が同じです。両クラスとも`walk`メソッドをひとつ持っています。このメソッドは引数を取らず、戻り値も持ちません。構造的型付けの観点からは、この共通の構造により`Person`と`Dog`は互換性があると判断されます。

TypeScriptのコード例を見てみましょう。

```ts twoslash
class Person {
  walk() {}
}

class Dog {
  walk() {}
}
// ---cut---
const person = new Person();
const dog: Dog = person; // コンパイルエラーにならない
```

このコードでは、`Person`インスタンスを`Dog`型の変数に代入していますが、コンパイルエラーになりません。これは、`Person`と`Dog`が構造的に互換性があるためです。

一方で、構造が異なる場合は互換性が認められません。

```ts twoslash
// @errors: 2741
class Person {
  speak() {}
}
class Dog {
  bark() {}
}
const person = new Person();
const dog: Dog = person; // コンパイルエラーになる
```

この場合、`Person`と`Dog`は異なるメソッドを持っているため、構造的に互換性がないと見なされ、代入しようとするとコンパイルエラーが発生します。

構造的型付けを採用している他の言語には、Go言語があります。このように構造的型付けは、型の名前よりもその「構造」に重点を置いた型システムを提供し、柔軟かつ直感的なプログラミングを可能にします。

次の表は、名前的型付けと構造的型付けの特徴をまとめたものです。

|              | 名前的型付け                 | 構造的型付け                 |
| ------------ | ---------------------------- | ---------------------------- |
| 型の区別基準 | 型の名前                     | 型の構造                     |
| 互換性の判断 | 名前が同じであれば互換性あり | 構造が同じであれば互換性あり |
| 主な採用言語 | Java, C#, Swift, PHPなど     | TypeScript, Goなど           |

## 部分型

多くのプログラミング言語では、型と型の関係性を階層関係で捉えることができます。階層構造において、頂点に位置するのはもっとも抽象的な型です。階層を下に進むほど具体的な型に分化していきます。階層構造の上位に位置する型を**基本型**(supertype)と言います。下層の型と比べると、基本型は抽象的な型です。階層構造の下位に位置する型を**部分型**(subtype)と呼びます。部分型は、基本型が持つすべての性質や振る舞い(メソッドやプロパティ)を持ちつつ、加えて新たな性質や振る舞いも持つ型です。

たとえば、図形と面積に関する型を考えたとき、図形(`Shape`)という基本型の下に、円(`Circle`)や長方形(`Rectangle`)という部分型が定義できます。`Shape`は下位の型に比べて抽象的な型で、面積を求められる能力(`area`メソッド)を持っています。一方で、`Circle`はより具体的な型で、`Shape`の能力を引き継ぎつつ、半径(`radius`)という新たな属性を持っています。同様に、`Rectangle`も`Shape`の能力を引き継ぎつつ、幅(`width`)と高さ(`height`)という新たな属性を持っています。

import ClassDiagramShapeCircleRectangle from '@site/static/img/reference/values-types-variables/structural-subtyping/class-diagram-shape-circle-rectangle.svg';

<!-- 画像ソース: https://www.figma.com/file/E22NH0kgcl5xhVCtn1HCfz/%E3%82%B5%E3%83%90%E3%82%A4%E3%83%90%E3%83%ABTypeScript%E7%94%BB%E5%83%8F%E3%82%A2%E3%82%BB%E3%83%83%E3%83%88?type=design&node-id=558-127&mode=design&t=Mw06bZx3zqMd92aa-4 -->

<figure class="themed">
    <figcaption>階層構造</figcaption>
    <ClassDiagramShapeCircleRectangle />
</figure>

部分型は基本型と互換性があります。基本型の変数に部分型の値を代入することが可能です。たとえば、`Circle`と`Rectangle`は異なる型ですが、同じ`Shape`として扱うことができます。より抽象的な階層レベルで扱えると利便性が高まります。たとえば、異なる図形同士の面積を合計するケースです。`Shape`型の変数に`Circle`や`Rectangle`の値を代入して、それらの合計面積を求めることができます。

```ts twoslash
declare class Shape {
  area(): number;
}
declare class Circle extends Shape {
  radius: number;
  constructor(options: { radius: number });
  area(): number;
}
declare class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(options: { width: number; height: number });
  area(): number;
}
// ---cut---
function totalArea(shape1: Shape, shape2: Shape): number {
  return shape1.area() + shape2.area();
}

const circle = new Circle({ radius: 10 });
const rectangle = new Rectangle({ width: 10, height: 20 });
totalArea(circle, rectangle); // CircleとRectangleをShapeとして扱える
```

ある型とある型が、基本型と部分型の関係になるかどうかを判断する基準は、名前的型付けと構造的型付けでも異なります。たとえば、`Circle`が`Shape`の部分型かどうかは、名前的型付けと構造的型付けで判断基準が異なるということです。それぞれどのような判断基準があるのか、次の節で見ていきましょう。

### 名前的部分型

名前的型付けを採用しているプログラミング言語では、型の階層関係を定義する際に、型の名前とその関係性に重点を置きます。このアプローチでは、クラスやインターフェースの継承を通じて、型間の親子関係（基本型と部分型の関係）が形成されます。名前的型付けのアプローチで扱われる部分型のことを**名前的部分型**(nominal subtype)と呼びます。

たとえば、Javaでは`extends`キーワードを使用して、基本型と部分型の関係性を宣言します。この宣言により、特定のクラスが別のクラスの部分型であることをJavaコンパイラに知らせます。

```java
class Shape {}

class Circle extends Shape {}
```

このコード例では、`Circle`クラスが`Shape`クラスを継承しています。この継承により、`Circle`は`Shape`の部分型となります。この階層関係により、`Shape`型の変数に`Circle`型のインスタンスを代入することが可能になります。この代入は、`Circle`が`Shape`の部分型であるために、型の互換性が保証されているからです。

```java
Shape shape = new Circle();
```

一方で、`Circle`と`Shape`間に`extends`キーワードによる継承関係が宣言されていない場合、両者の間に階層関係は存在しません。

```java
class Shape {}

class Circle {}
```

この状況では、`Shape`型の変数に`Circle`型のインスタンスを代入しようとすると、型不一致のエラーが発生します。このエラーは、`Circle`と`Shape`が互換性のない独立した型であるとJavaコンパイラに判断されたために起きます。

```java
Shape shape = new Circle();
// エラー: 不適合な型: CircleをShapeに変換できません
```

### 構造的部分型

構造的型付けを採用しているTypeScriptでは、型間の階層関係もその構造に基づいて判断されます。このアプローチでは、型の名前ではなく、型が持つプロパティやメソッドの構造に着目して、基本型と部分型の関係性を判断します。このような部分型のことを**構造的部分型**(structural subtype)と呼びます。

次のTypeScriptのコード例を考えてみましょう。

```ts twoslash
class Shape {
  area(): number {
    return 0;
  }
}

class Circle {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

この例では、`Circle`クラスは`Shape`クラスの`area`メソッドを持っており、追加で`radius`プロパティを定義しています。`extends`キーワードを使用していないにもかかわらず、`Circle`は`Shape`の部分型として扱われます。これは、`Circle`が`Shape`の持つ構造（ここでは`area`メソッド）を含んでいるためです。その結果、`Shape`型の変数に`Circle`型のインスタンスを代入することが可能になります。

```ts twoslash
declare class Shape {
  area(): number;
}
declare class Circle {
  constructor(radius: number);
  area(): number;
}
// ---cut---
const shape: Shape = new Circle(10);
```

TypeScriptでも`extends`キーワードを用いてクラス間の継承関係を宣言できます。しかし、これは部分型かどうかを判定するための基準には用いられません。これはJavaのような名前的部分型の言語とは異なる点です。`extends`キーワードが持つ効果は、親クラスの機能を継承すること、そして、子クラスが親クラスのインターフェースを守ることです。

```ts twoslash
class Animal {
  walk() {}
}

class Dog extends Animal {
  walk() {}
}
```

このコードでは、`Dog`が`Animal`を継承しています。この例では、`Dog`の`walk`メソッドが`Animal`の`walk`メソッドと同じ引数と戻り値を持っているため、`Dog`は`Animal`のインターフェースを守っているということになります。`Dog`が`Animal`のインターフェースを守っているため、`Dog`についてコンパイルエラーは発生しません。

一方で、子クラスが親クラスのインターフェースを守らない場合、TypeScriptはエラーを報告します。次のコード例では、`Dog`クラスの`walk`メソッドが`Animal`クラスのそれと異なる引数を持っています。`Dog`クラスは`Animal`クラスのインターフェースを守っていないということです。この例では、`walk`メソッドに対して、その旨の警告がなされます。これが`extends`キーワードの効果です。

```ts twoslash
// @errors: 2416
class Animal {
  walk() {}
}

class Dog extends Animal {
  walk(speed: number) {} // コンパイルエラーになる
}
```

## 構造的型付けの採用理由

TypeScriptが構造的型付けを採用した背景には、JavaScriptの特性が深く関わっています。ここでは、なぜTypeScriptが構造的型付けを選んだのかについて考えてみましょう。

### ダックタイピング

ダックタイピングは、オブジェクトの型よりもオブジェクトの持つメソッドやプロパティが何であるかによってオブジェクトを判断するプログラミングスタイルです。ダックタイピングの世界では、特定のインターフェースを`implements`キーワードを使うなどして明示的に実装する必要はありません。代わりに、オブジェクトが特定の規約にしたがっているか、たとえば、特定のメソッドを持っているかという基準で、そのオブジェクトの型を判断します。ダックタイピングでは、型を判断するために型の名前を使わないのが一般的です。ちなみに、ダックタイピングという用語は、「もし鳥がアヒルのように歩き、アヒルのように鳴くなら、それはアヒルだ」という言葉に由来しています。

ダックタイピングは、動的型付け言語によく見られます。JavaScriptも動的型付け言語であり、ダックタイピングとともに歩んできた歴史があります。TypeScriptはJavaScriptの延長線上にある言語です。そのため、ダックタイピングが行えるような型システムが求められました。構造的型付けは、ダックタイピングに適した型システムです。こうした背景もTypeScriptが構造的型付けを採用した理由のひとつと考えられます。

### オブジェクトリテラル

JavaScriptの特徴のひとつには[オブジェクトリテラル]があります。オブジェクトリテラルは、クラスやインターフェースなどの型を定義することなく、その場でオブジェクトを生成する機能です。

[オブジェクトリテラル]: ./object/object-literal.md

```ts twoslash
const circle = {
  radius: 10,
  area() {
    return Math.PI * this.radius ** 2;
  },
};
```

上の例のように、`circle`オブジェクトには型の名前がありません。型に名前がない以上、名前的型付けのように型名を使って型を判断することができません。こうしたJavaScriptコードを扱えるようにするためにも、TypeScriptは構造的型付けを採用したと考えられます。

## 構造的型システムの利点

構造的型付けの柔軟性や便利さは注目に値するところがあります。ここでは、具体例を交えて構造的型付けの利点について見ていきましょう。

### モックテストの簡略化

構造的型付けは、モックテストや依存性の注入を簡単に行えるようにします。特に、外部のAPIやサービスに依存するコンポーネントをテストする際に、その依存関係を模倣したモックオブジェクトを簡単に作成できます。名前的型付けでは、モック化したいオブジェクトをまずインターフェース化する必要があります。その上で、インターフェースを実装するモッククラスを用意します。構造的型付けでは、必要なメソッドやプロパティを持つオブジェクトリテラルを直接提供するだけで、テスト用のモックを簡単に用意できます。インターフェースの定義が省けるため、構造がシンプルになり、テストの準備も省力化されます。

次の例では、`UserService`クラスが`UserApi`に依存しています。この依存関係をテストするために、`UserApi`のメソッド`getUser`を模倣したモックを作成し、`UserService`の動作をテストします。

```ts twoslash
// @noErrors: 2355
type User = { id: number; name: string };

class UserApi {
  async getUser(id: number): Promise<User | undefined> {
    // 実装は割愛しますが、fetchなどを使って実際のAPIを呼び出す実装をイメージしてください。
  }
}

class UserService {
  private api: UserApi;

  constructor(api: UserApi) {
    this.api = api;
  }

  async userExists(id: number): Promise<boolean> {
    const user = await this.api.getUser(id);
    return user !== undefined;
  }
}
```

テストケースでは、`UserApi`の構造を満たすオブジェクトを直接作成し、`UserService`のインスタンスに渡すだけで単体テストを行えます。

```ts twoslash
declare const test: any;
declare const expect: any;
declare type User = { id: number; name: string };
declare class UserApi {
  getUser(id: number): Promise<User | undefined>;
}
declare class UserService {
  private api;
  constructor(api: UserApi);
  userExists(id: number): Promise<boolean>;
}
// ---cut---
test("ユーザーがいるときはtrueを返す", async () => {
  // モックオブジェクトを直接作成
  const api: UserApi = {
    async getUser(id) {
      return { id, name: "Alice" };
    },
  };
  // モックオブジェクトをUserServiceに渡してテスト
  const service = new UserService(api);
  const result = await service.userExists(123);
  expect(result).toBe(true);
});
```

このように、構造的型付けを利用することで、テスト対象の依存物の注入がより簡単になります。

## 構造的型付けの注意点

構造的型付けは、その柔軟性により多くの利点を提供しますが、注意が必要な点もあります。特に、意図せず型に互換性が生じる可能性があることがそのひとつです。

構造的型付けシステムでは、型の互換性はその構造に基づいて判断されます。このため、異なる目的や意味合いを持つ型が、偶然同じ構造を持っている場合に、意図せずに互換性があると判断されることがあります。

```ts
class UserId {
  id: string;
}

class ProductId {
  id: string;
}

const userId: UserId = new UserId();
const productId: ProductId = userId; // 代入できるが、意図した設計ではない
```

この例では、`UserId`クラスと`ProductId`クラスがあり、どちらも`id`プロパティを持つ同じ構造になっています。TypeScriptはこれらの型を互換性があるとみなします。なぜなら構造が同じだからです。しかし、データモデルやドメインモデルの観点からは、ユーザーのIDと商品のIDはまったく異なる概念であり、型システムで区別したい場合がほとんどです。値オブジェクト(value object)のようなデザインパターンをTypeScriptで用いる場合は、このような問題に注意が必要です。型としてどうしても区別したい場合は、後述の「名前的型付けを実現する方法」で紹介するテクニックを検討してみてください。

## 名前的型付けを実現する方法

TypeScriptは基本的に構造的型付けを採用していますが、名前的型付けになる場合や、名前的型付けを模倣するデザインパターンもあります。これは、TypeScriptの型システムの柔軟性を利用したテクニックであり、プログラムの正当性を強化するために用いられることがあります。

### privateメンバーを持つクラス

TypeScriptでは、`private`メンバーを持つクラスは、他のクラスと区別されます。これは、`private`メンバーがそのクラス固有のものであるため、異なるクラスのインスタンス同士は、構造が同じであっても互換性がないと見なされるからです。

```ts twoslash
// @errors: 2322
class UserId {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

class ProductId {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}

const userId: UserId = new UserId("1");
const productId: ProductId = userId; // 代入エラー
```

この例では、`UserId`と`ProductId`は、内部的に`private`メンバー`id`を持っていますが、互いに別の型として扱われます。つまり、名前的型付けのように、名前によって型が区別されるようになります。

[公称型クラス](../object-oriented/class/class-nominality.md)

### ブランド型

ブランド型(または幽霊型(phantom type)、opaque type)は、型を区別するためのプロパティを型に持たせることで、その型を明確に区別するデザインパターンです。これは、型にメタデータのようなタグをつけることで、構造的には同じであっても型と型を区別できるようにします。

```ts twoslash
interface UserId {
  __brand: "UserId";
  id: number;
}

interface ProductId {
  __brand: "ProductId";
  id: number;
}
```

この例では、`__brand`プロパティを使って`UserId`型と`ProductId`型を区別しています。これにより、両者が構造的に同じ`id`プロパティを持っていても、型システム上では異なる型として扱われます。これは、構造的型付けの特徴をうまく利用したテクニックです。構造的型付けでは、構造が異なる場合は互換性がないと見なすわけですから、`__brand`のような構造を意図的に違えるものを使うことで、型を区別することができるのです。

ブランド型で用いられる`__brand`プロパティは、型を区別するためのものであり、実行時のデータとして持たせる必要はありません。このため、`__brand`プロパティは、実際のデータには含まれないようにすることが一般的です。これを達成するために、`__brand`プロパティは`as`キーワードを使って[型アサーション]を行う手法がよく使われます。

[型アサーション]: ./type-assertion-as.md

```ts twoslash
interface UserId {
  __brand: "UserId";
  id: number;
}
// ---cut---
const userId = { id: 1 } as UserId;
```

ブランド型を用いて作られた値は、あたかも名前的型付けのように、名前によって型が区別されるようになります。

```ts twoslash
// @errors: 2322
interface UserId {
  __brand: "UserId";
  id: number;
}

interface ProductId {
  __brand: "ProductId";
  id: number;
}
// ---cut---
const userId = { id: 1 } as UserId;
const productId: ProductId = userId; // 代入不可
```

これらのテクニックを利用することで、構造的型付けのTypeScriptでも、名前に依存した型の区別が行えます。名前による型の区別が必要な場合は、これらのテクニックを検討してみるとよいでしょう。

## まとめ

|                        | 名前的型付け                                                                                   | 構造的型付け                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 型の区別基準           | 型の名前                                                                                       | 型の構造（プロパティやメソッドなど）                                                 |
| 互換性の判断基準       | 名前が同じであれば互換性あり                                                                   | 構造が同じであれば互換性あり                                                         |
| 基本型と部分型の明示性 | 明示的（`extends`などのキーワードによる継承を使用）                                            | 暗黙的（型の構造が一致する場合、自動的に部分型とみなされる）                         |
| 主な採用言語           | Java, C#, Swift, PHP                                                                           | TypeScript, Go                                                                       |
| 利点                   | - 型の名前に基づく明確な区別が可能<br />- 明示的な型の階層関係により、設計の意図を明確にできる | - ダックタイピングにより、アドホックにオブジェクトを作れる                           |
| 欠点                   | - 型間の互換性が名前に依存し、柔軟性に欠ける場合がある                                         | - 意図しない型間の互換性が生じる可能性がある<br />- 型の区別が直感的でない場合がある |

構造的型付けはTypeScriptの型システムの核心を成す概念であり、型の互換性をその構造に基づいて判断します。これは、型の名前ではなく、型が持つプロパティやメソッドの構造を見て型の同一性や互換性を判断するというものです。このアプローチは、JavaScriptの動的で柔軟な特性に対応するために採用されており、ダックタイピングやオブジェクトリテラルといったJavaScriptの特徴と良く合います。

構造的型付けは柔軟性が高く、モックテストなどを容易にしますが、意図せず互換性が生じる可能性もあるという注意点があります。しかし、`private`メンバーやブランド型といったテクニックを用いることで、構造的型付けのシステム内で名前的型付けの振る舞いを模倣し、型の明確な区別を実現することも可能です。

構造的型付けを理解し、適切に活用することで、より安全で保守しやすいコードを書くことができるでしょう。

<PostILearned>

・TypeScriptは構造的型付け
・構造的型付けは型名より構造を重視
・構造的型付けは型の構造で互換性判断
・privateやブランド型で名前的型付けを模倣できる
・構造的型付けは意図しない互換性に注意

</PostILearned>
