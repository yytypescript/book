# クラス

JavaScriptにもクラスの概念は存在します。TypeScriptでのクラスはJavaScriptのクラスをより型安全に拡張されています。

### クラスに関する機能

簡易な一覧ですが、型に関する機能が拡張されていることが分かると思います。

| 機能名 | JavaScript | TypeScript |
| :--- | :--- | :--- |
| クラス機能 | ○ | ○ |
| 継承 | ○ | ○ |
| super | ○ | ○ |
| 抽象クラス\(abstract\) | ✕ | ○ |
| アクセス修飾子 | △ | ○ |
| インターフェース | ✕ | ○ |
| ジェネリクス | ✕ | ○ |

TypeScriptは型が不適切な場合はコンパイルエラーとなります。コードに問題がなく型安全と判断された場合に限りコンパイルを行う事ができます。また出力されたJavaScriptファイルには型情報は除かれます。

### 書式

一般的なクラスの書式はこのようになります。

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

インスタンス化し、メソッドやプロパティを呼ぶことができます。

```typescript
let greeter = new Greeter("world");
console.log(greeter.greet());  // Hello, world
```

### 継承

オブジェクト指向の基本的な継承をサポートしています。継承する場合は`extends`キーワードを使用します。

```typescript
class Food { }

class Meat extends Food { }
class Fish extends Food { }
class Vegetables extends Food { }
```

この場合`Food`は親、`Meat`、`Fish`、`Vegetables`は子の関係になります。

親は「基本クラス」、「スーパークラス」。子は「派生クラス」、「サブクラス」などと呼ばれます。本章では親を「スーパークラス」、子を「サブクラス」として呼び方を統一します。

サブクラスはスーパークラスのプロパティ、メソッドを継承します。

```typescript
class Food {
  constructor(protected name: string , protected calorie: number) { }
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
}

class Meat extends Food { }
let meat = new Meat('chicken' , 100);
meat.showDebug(); // スーパークラスのメソッドが使用できる。
```

#### abstract

abstractは抽象クラスを作成する時に宣言します。抽象クラスとは直接インスタンス化\(new\)することができず、必ずスーパークラスとして利用することを保証するものです。抽象クラス内のメソッドにもabstract宣言を行うことができます。interfaceと似てサブクラスは抽象メソッドを実装する必要があります。

Foodクラスに抽象クラスに変更し、"要冷蔵"メソッド`keepRefrigerated()`を抽象メソッドとして追加すると`Meat`クラスでエラーが発生します。これは`Meat`クラスに`keepRefrigerated`メソッドが実装されていないからです。

```typescript
abstract class Food {
  constructor(protected name: string , protected calorie: number) { }
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}

class Meat extends Food { } // エラー：非抽象クラス 'Meat' はクラス 'Food' からの継承抽象メンバー 'keepRefrigerated' を実装しません。
```

keepRefrigeratedメソッドを実装することによりエラーはなくなります。

```typescript
class Meat extends Food {
  keepRefrigerated(): boolean {
    return true;
  }
}
```

### プロパティとメソッドに対するアクセス修飾子

| アクセス修飾子 | 説明 |
| :--- | :--- |
| \(宣言なし\) | publicと同等 |
| public | どこからもアクセス可能 |
| protected | 自身のクラスとサブクラスからアクセス可能 |
| private | 自身のクラスのみアクセス可能 |

アクセス修飾子を省略した場合は`public`になります。

アクセス修飾子は、プロパティ、コンストラクター、メソッドに宣言に宣言することができます。

#### public

`public`アクセス修飾子はどこからもアクセス可能です。

```typescript
class Animal {
  public name: string;  // プロパティにpublicアクセス修飾子
  public constructor(theName: string) { this.name = theName; } // コンストラクターにpublicアクセス修飾子
  public move(distanceInMeters: number) { // メソッドにpublicアクセス修飾子
    console.log(`${this.name} moved ${distanceInMeters}m.`); // publicアクセス修飾子である`this.name`を使用することが可能
  }
}
```

gorillaを実装し、動作を確認してみます。

```typescript
const gorilla = new Animal('ゴリラ');
gorilla.move(10);   // ゴリラ moved 10m.
gorilla.name = 'ゴリラゴリラ';
gorilla.move(20);   // ゴリラゴリラ moved 20m.
```

nameプロパティもpublic宣言されているため、「ゴリラ」から「ゴリラゴリラ」に変更することができます。

#### protected

Animalクラスのnameのアクセス修飾子を`public`から`protected`に変更しエラーを出してみます

```typescript
class Animal {
  protected name: string;  // `public`から`protected`に変更
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) { 
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

const gorilla = new Animal('ゴリラ');
gorilla.move(10);
gorilla.name = 'ゴリラゴリラ'; // error TS2445: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
gorilla.move(20);
```

`gorilla.name`プロパティは`protected`宣言されているため、自身のクラスとサブクラスのみアクセスとなります。つまりインスタンスされたgorillaからはアクセスが拒否され、コンパイルエラーが発生します。

`protected`で保護された`name`プロパティを操作するためにGorillaクラスを実装してみます。

```typescript
class Animal {
  protected name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  rename(name: string): void {
    this.name = name;
  }
}

const gorilla = new Gorilla('ゴリラ');
gorilla.move(10);  // ゴリラ moved 10m.
// gorilla.name = 'ゴリラゴリラ';
gorilla.rename('ゴリラゴリラ');
gorilla.move(20);  // ゴリラゴリラ moved 20m.
```

### コンストラクターの引数のアクセス修飾子

メソッドの引数にはアクセス修飾子を設定することはできませんがコンストラクターは特別です。

引数に対してアクセス修飾子を宣言した場合はこのようにな意味になります。

| アクセス修飾子 | 説明 |
| :--- | :--- |
| \(宣言なし\) | constructorメソッド内のみアクセス可能 |
| public | 自身のクラス内、継承クラス、インスタンス化されたクラスのどれからでもアクセス可能 |
| protected | 自身のクラス、継承クラスからアクセス可能 |
| private | 自身のクラスのみアクセス可能 |

ConstructorInAccessModifierクラスとConstructorOutAccessModifierクラスの２つを定義しました。

２つのクラスの違いはコンストラクターにアクセス修飾子を定義しているかどうかだけで機能は全く同じです。

```typescript
// example.ts
class ConstructorInAccessModifier {
  constructor(
    arg0: number,
    public arg1: number,
    protected arg2: number,
    private arg3: number
  ) {
    console.log({ arg0, arg1, arg2, arg3 });
  }
}

class ConstructorOutAccessModifier {
  public arg1: number;
  protected arg2: number;
  private arg3: number;
  constructor(
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: number
  ) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    console.log({ arg0, arg1, arg2, arg3 });
  }
}
```

コンパイル後のJavaScriptファイルを見てみると同一の機能を持つことが確認することができます。

```javascript
// example.js
class ConstructorInAccessModifier {
    constructor(arg0, arg1, arg2, arg3) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        console.log({ arg0, arg1, arg2, arg3 });
    }
}
class ConstructorOutAccessModifier {
    constructor(arg0, arg1, arg2, arg3) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        console.log({ arg0, arg1, arg2, arg3 });
    }
}
```

TypeScriptで記述する際は各アクセス修飾子のスコープ機能が有効になるため、インスタンスからのアクセスが可能なプロパティは`public`宣言された`arg1`のみが有効になります。

```typescript
// example.ts
let InAccess = new ConstructorInAccessModifier(1, 2, 3, 4);
InAccess.arg0; // エラー プロパティ 'arg0' は型 'ConstructorInAccessModifier' に存在しません。ts(2339)
InAccess.arg1;
InAccess.arg2; // エラー プロパティ 'arg2' は型 'ConstructorInAccessModifier' に存在しません。ts(2339)
InAccess.arg3; // エラー プロパティ 'arg3' は型 'ConstructorInAccessModifier' に存在しません。ts(2339)


let outAccess = new ConstructorOutAccessModifier(1, 2, 3, 4);
outAccess.arg0; // エラー プロパティ 'arg0' は型 'ConstructorOutAccessModifier' に存在しません。ts(2339)
outAccess.arg1;
outAccess.arg2; // エラー プロパティ 'arg2' は型 'ConstructorOutAccessModifier' に存在しません。ts(2339)
outAccess.arg3; // エラー プロパティ 'arg3' は型 'ConstructorOutAccessModifier' に存在しません。ts(2339)
```

つまり、コンストラクターの引数のアクセス修飾子はプロパティ宣言の省略をしてくれるだけにすぎません。

TypeScript  
[https://www.typescriptlang.org/docs/handbook/classes.html](https://www.typescriptlang.org/docs/handbook/classes.html)

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

| メインライター | 対応スケジュール |
| :--- | :--- |
| クロレ | 2020/05/?? |

