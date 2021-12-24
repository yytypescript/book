# クラスのreadonly修飾子

TypeScriptでは、フィールドにreadonly修飾子をつけると、そのフィールドを読み取り専用にできます。

読み取り専用フィールドは、コンストラクタかフィールド初期化子でのみ値を代入できます。

```ts
class Octopus {
  readonly name: string;
  readonly legs = 8; // フィールド初期化子での代入はOK

  constructor() {
    this.name = "たこちゃん"; // コンストラクターでの代入はOK
  }
}
```

読み取り専用フィールドは、再代入しようとするとコンパイルエラーになります。

```ts
const octopus = new Octopus();
octopus.legs = 16;
//      ^^^^ Cannot assign to 'legs' because it is a read-only property.(2540)
```

メソッド内の処理であっても、読み取り専用フィールドへの再代入は許されません。

```ts
class Octopus {
  readonly name = "たこちゃん";

  setName(newName: string): void {
    this.name = newName;
    //   ^^^^ Cannot assign to 'name' because it is a read-only property.(2540)
  }
}
```

## 関連情報

[オブジェクト型のreadonlyプロパティ (readonly property)](../../values-types-variables/object/readonly-property.md)

[インターフェースのreadonly修飾子](../interface/readonly-modifier-in-interfaces.md)
