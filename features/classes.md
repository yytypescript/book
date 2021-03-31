# クラス \(Classes\)

JavaScriptにもクラスの概念は存在します。TypeScriptでのクラスは主にJavaScriptのクラスをより型安全に拡張されています。

## クラスに関する機能

簡易な一覧ですが、型に関する機能が拡張されていることがわかると思います。

| 機能名 | JavaScript | TypeScript |
| :--- | :--- | :--- |
| クラス機能 | ○ | ○ |
| 継承 | ○ | ○ |
| super | ○ | ○ |
| 抽象クラス\(abstract\) | ✕ | ○ |
| アクセス修飾子 | △ | ○ |
| インターフェース | ✕ | ○ |
| ジェネリクス | ✕ | ○ |

クラスにかかわらずTypeScriptの特徴となるのはコーディング中に型が不適切な場合はコンパイルエラーを教えてくれることです。JavaScriptの場合は基本的に実行を行い不正な型が発生した場合に型エラーを知ることになります。TypeScriptコードに問題がなく型安全と判断された場合に限りコンパイルを行うことができます。また出力されたJavaScriptファイルには型情報は除かれます。

## 書式

一般的なクラスの書式を日本語で説明するとこのようになります。

```typescript
class クラス名 {
   プロパティ;
   constructor(){}

   メソッド(){
     処理
   }
}
```

下記は実際のコードのサンプルです。

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

多くのクラスはインスタンス化\(`new`\)し、メソッドやプロパティを呼ぶために使われます。

```typescript
const greeter = new Greeter("world");
console.log(greeter.greet());
// -> 'Hello, world'
```

## 継承

オブジェクト指向の基本的な概念である継承をサポートしています。継承する場合は`extends`キーワードを使用します。

```typescript
class Food { }

class Meat extends Food { }
class Fish extends Food { }
class Vegetables extends Food { }
```

この場合`Food`は親、`Meat, Fish, Vegetables`は子の関係になります。

親は「基本クラス」、「スーパークラス」。子は「派生クラス」、「サブクラス」などと呼ばれます。本書では親を「スーパークラス」、子を「サブクラス」として呼び方を統一します。

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
const meat = new Meat('chicken' , 100);
meat.showDebug(); // スーパークラスのメソッドが使用できる。
```

### `abstract`

`abstract`は抽象クラスを作成する時に宣言します。抽象クラスとは直接インスタンス化\(`new`\)することができず、必ずスーパークラスとして利用することを保証するものです。抽象クラス内のメソッドにも`abstract`宣言を行うことができます。`interface`と同じようにサブクラスは抽象メソッドを実装する必要があります。

`Food`クラスに抽象クラスに変更し、"要冷蔵"メソッド`keepRefrigerated()`を抽象メソッドとして追加すると`Meat`クラスでエラーが発生します。これは`Meat`クラスに`keepRefrigerated`メソッドが実装されていないからです。

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

`keepRefrigerated()`メソッドを実装することによりエラーはなくなります。

```typescript
class Meat extends Food {
  keepRefrigerated(): boolean {
    return true;
  }
}
```

## プロパティとメソッドに対するアクセス修飾子

| アクセス修飾子 | 説明 |
| :--- | :--- |
| \(宣言なし\) | publicと同等 |
| public | どこからもアクセス可能 |
| protected | 自身のクラスとサブクラスからアクセス可能 |
| private | 自身のクラスのみアクセス可能 |

アクセス修飾子を省略した場合は`public`になります。

アクセス修飾子は、プロパティ、コンストラクタ、メソッドに宣言することができます。

### `public`

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

`gorilla`を実装し、動作を確認してみます。

```typescript
const gorilla = new Animal('ゴリラ');
gorilla.move(10);
// -> 'ゴリラ moved 10m.'
gorilla.name = 'ゴリラゴリラ';
gorilla.move(20);
// -> 'ゴリラゴリラ moved 20m.'
```

`name`プロパティは`public`宣言されているため、インスタンスされた変数\(`gorilla`\)からの読み書きが可能になっています。「ゴリラ」から「ゴリラゴリラ」に変更することができます。

### `protected`

`protected`アクセス修飾子は自身のクラスとサブクラスからアクセス可能です。

`Animal`クラス`move`メソッドのアクセス修飾子を`public`から`protected`に変更しエラーを出してみます。

```typescript
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  protected move(distanceInMeters: number) { // `public`から`protected`に変更
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

const gorilla = new Animal('ゴリラ');
gorilla.move(10); // error TS2339: Property 'move' does not exist on type 'Animal'.
```

`gorilla.move()`メソッドは`protected`宣言されているため、自身のクラスとサブクラスのみアクセスとなります。つまりインスタンスされた`gorilla`からはアクセスが拒否され、コンパイルエラーが発生します。

`protected`で保護された`move()`メソッドを新たに実装し、10倍速く動くゴリラを作ってみます。

```typescript
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  protected move(distanceInMeters: number) { // `public`から`protected`に変更
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  move(distanceInMeters: number) {
    super.move(distanceInMeters * 10);
  }
}

const gorilla = new Gorilla('早いゴリラ');
gorilla.move(10);
// -> '速いゴリラ moved 100m.'
```

`Animal`スーパークラスを持つ`Gorilla`クラスを定義し`move()`を実装しています。`Gorilla`クラスの`move()`メソッド内で`super`キーワードを利用してスーパークラスの`move()`メソッドを呼び出しています。

### `private`

`private`アクセス修飾子は自身のクラスのみアクセス可能です。

`protected move()`を`private move()`に変更してみます。`private`に変更されたことにより`Gorilla`クラスの`super.move`にアクセスすることが許されずエラーとなります。

```typescript
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  private move(distanceInMeters: number) { // `public`から`protected`に変更
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  move(distanceInMeters: number) {
    super.move(distanceInMeters * 10); // Property 'move' is private and only accessible within class 'Animal'.
  }
}
```

`private`メソッドの多くの使い方としては、自身のクラス内の長いコードを機能別に分ける時に利用します。

## コンストラクタの引数のアクセス修飾子

メソッドの引数にはアクセス修飾子を設定することはできませんがコンストラクタは特別です。

引数に対してアクセス修飾子を宣言した場合はこのような意味になります。

| アクセス修飾子 | 説明 |
| :--- | :--- |
| \(宣言なし\) | constructorメソッド内のみアクセス可能 |
| public | 自身のクラス内、継承クラス、インスタンス化されたクラスのどれからでもアクセス可能 |
| protected | 自身のクラス、継承クラスからアクセス可能 |
| private | 自身のクラスのみアクセス可能 |

`ConstructorInAccessModifier`クラスと`ConstructorOutAccessModifier`クラスのふたつを定義しました。

ふたつのクラスの違いはコンストラクタにアクセス修飾子を定義しているかどうかだけで機能はまったく同じです。

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
const InAccess = new ConstructorInAccessModifier(1, 2, 3, 4);
InAccess.arg0; // エラー プロパティ 'arg0' は型 'ConstructorInAccessModifier' に存在しません。ts(2339)
InAccess.arg1;
InAccess.arg2; // エラー プロパティ 'arg2' は型 'ConstructorInAccessModifier' に存在しません。ts(2339)
InAccess.arg3; // エラー プロパティ 'arg3' は型 'ConstructorInAccessModifier' に存在しません。ts(2339)

const outAccess = new ConstructorOutAccessModifier(1, 2, 3, 4);
outAccess.arg0; // エラー プロパティ 'arg0' は型 'ConstructorOutAccessModifier' に存在しません。ts(2339)
outAccess.arg1;
outAccess.arg2; // エラー プロパティ 'arg2' は型 'ConstructorOutAccessModifier' に存在しません。ts(2339)
outAccess.arg3; // エラー プロパティ 'arg3' は型 'ConstructorOutAccessModifier' に存在しません。ts(2339)
```

つまり、コンストラクタの引数のアクセス修飾子はプロパティ宣言の省略をしてくれるだけにすぎません。

## Readonly修飾子\(Readonly modifier\)

`readonly`修飾子を利用してプロパティを読み取り専用にすることができます。

`readonly`を宣言したプロパティは変数宣言時、またはコンストラクタ内で初期化する必要があります。

```typescript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
const dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
```

## Getter/Setter

プロパティへのインターセプター\(参照・代入・監視などの意味\)としGetter/Setterがあります。

記述方法のサンプルは次のようになります。

```typescript
class Human {
  private _name: string;
  // Getter宣言
  get name(): string {
    return this._name;
  }

  // Setter宣言
  set name(name: string) {
    this._name = name;
  }
}

const human = new Human();
// Setterを利用
human.name = `田中太郎`;

// Getterを利用
console.log(human.name);  // 田中太郎
```

メソッドと違い、getter/setterを呼ぶ場合は`()`は不要です。

```typescript
// Getter
console.log(human.name); // 正しいGetterの使用方法
console.log(human.name()); // エラー :human.name is not a function

// Setter
human.name = '田中太郎'; // 正しいSetterの使用方法
human.name('田中太郎'); // エラー :human.name is not a function
```

### Getter

Getterの記述方法を日本語で表すと次のようになります。

```typescript
get 名前(): 型 {
  必要ならば処理();
  return 戻り値;
}
```

Getterに引数を指定することはできません。また戻り値を必ず指定する必要があります。

### Setter

Setterの記述方法を日本語で表すと次のようになります。

```typescript
set 名前(変数 : 型) {
  必要ならば処理();
  保存処理();
}
```

引数が必ずひとつ必要です。また戻り値を指定することはできません。

