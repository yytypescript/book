# constructor shorthand

メソッドの引数にはアクセス修飾子を設定することはできませんがコンストラクタは特別です。

引数に対してアクセス修飾子を宣言した場合はこのような意味になります。

| アクセス修飾子 | 説明                                                                             |
| :------------- | :------------------------------------------------------------------------------- |
| (宣言なし)     | constructorメソッド内のみアクセス可能                                            |
| public         | 自身のクラス内、継承クラス、インスタンス化されたクラスのどれからでもアクセス可能 |
| protected      | 自身のクラス、継承クラスからアクセス可能                                         |
| private        | 自身のクラスのみアクセス可能                                                     |

`ConstructorInAccessModifier`クラスと`ConstructorOutAccessModifier`クラスのふたつを定義しました。

ふたつのクラスの違いはコンストラクタにアクセス修飾子を定義しているかどうかだけで機能はまったく同じです。

```ts title="example.ts"
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
  constructor(arg0: number, arg1: number, arg2: number, arg3: number) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    console.log({ arg0, arg1, arg2, arg3 });
  }
}
```

コンパイル後のJavaScriptファイルを見てみると同一の機能を持つことが確認することができます。

```js title="example.js"
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

```ts title="example.ts" twoslash
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
  constructor(arg0: number, arg1: number, arg2: number, arg3: number) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    console.log({ arg0, arg1, arg2, arg3 });
  }
}

// ---cut---
// @errors: 2339 2445 2341
const InAccess = new ConstructorInAccessModifier(1, 2, 3, 4);
InAccess.arg0;
InAccess.arg1;
InAccess.arg2;
InAccess.arg3;

const outAccess = new ConstructorOutAccessModifier(1, 2, 3, 4);
outAccess.arg0;
outAccess.arg1;
outAccess.arg2;
outAccess.arg3;
```

つまり、コンストラクタの引数のアクセス修飾子はプロパティ宣言の省略をしてくれるだけにすぎません。
