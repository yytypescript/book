---
sidebar_label: アクセス修飾子
---

# アクセス修飾子 (access modifier)

JavaやPHPなどの言語では、フィールドやメソッドに`private`, `protected`, `public`を指定できます。JavaScriptでも`private`のようなプロパティを実現するために[プライベートクラスフィールド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields)という仕様が実験的に導入されはじめてはいますが、現状はJavaのようなアクセス修飾子はありません。TypeScriptにはJava風のアクセス修飾子があります。

| アクセス修飾子 | 説明                                     |
| :------------- | :--------------------------------------- |
| (宣言なし)     | publicと同等                             |
| public         | どこからもアクセス可能                   |
| protected      | 自身のクラスとサブクラスからアクセス可能 |
| private        | 自身のクラスのみアクセス可能             |

アクセス修飾子を省略した場合は`public`になります。

アクセス修飾子は、フィールド、コンストラクタ、メソッドに宣言することができます。

## `public`

`public`アクセス修飾子はどこからもアクセス可能です。

```ts
class Animal {
  public name: string; // フィールドにpublicアクセス修飾子

  // コンストラクターにpublicアクセス修飾子
  public constructor(theName: string) {
    this.name = theName;
  }

  // メソッドにpublicアクセス修飾子
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
    // publicアクセス修飾子である`this.name`を使用することが可能
  }
}
```

`gorilla`を実装し、動作を確認してみます。

```ts twoslash
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// ---cut---
const gorilla = new Animal("ゴリラ");
gorilla.move(10);
// @log: "ゴリラ moved 10m."
gorilla.name = "ゴリラゴリラ";
gorilla.move(20);
// @log: "ゴリラゴリラ moved 20m."
```

`name`プロパティは`public`宣言されているため、インスタンスされた変数(`gorilla`)からの読み書きが可能になっています。「ゴリラ」から「ゴリラゴリラ」に変更することができます。

## `protected`

`protected`アクセス修飾子は自身のクラスとサブクラスからアクセス可能です。

`Animal`クラス`move`メソッドのアクセス修飾子を`public`から`protected`に変更しエラーを出してみます。

```ts twoslash
// @errors: 2445
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }

  // `public`から`protected`に変更
  protected move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

const gorilla = new Animal("ゴリラ");
gorilla.move(10);
```

`gorilla.move()`メソッドは`protected`宣言されているため、自身のクラスとサブクラスのみアクセスとなります。つまりインスタンスされた`gorilla`からはアクセスが拒否され、コンパイルエラーが発生します。

`protected`で保護された`move()`メソッドを新たに実装し、10倍速く動くゴリラを作ってみます。

```ts twoslash
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }

  // `public`から`protected`に変更
  protected move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  move(distanceInMeters: number) {
    super.move(distanceInMeters * 10);
  }
}

const gorilla = new Gorilla("速いゴリラ");
gorilla.move(10);
// @log: "速いゴリラ moved 100m."
```

`Animal`スーパークラスを持つ`Gorilla`クラスを定義し`move()`を実装しています。`Gorilla`クラスの`move()`メソッド内で`super`キーワードを利用してスーパークラスの`move()`メソッドを呼び出しています。

## `private`

`private`アクセス修飾子は自身のクラスのみアクセス可能です。

`protected move()`を`private move()`に変更してみます。`private`に変更されたことにより`Gorilla`クラスの`super.move`にアクセスすることが許されずエラーとなります。

```ts twoslash
// @errors: 2415 2341
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }

  // `public`から`private`に変更
  private move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  move(distanceInMeters: number) {
    super.move(distanceInMeters * 10);
  }
}
```

`private`メソッドの多くの使い方としては、自身のクラス内の長いコードを機能別に分ける時に利用します。
