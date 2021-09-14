# クラスのreadonly修飾子

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

## 関連情報

{% page-ref page="../../values-types-variables/object/readonly-property.md" %}

{% page-ref page="../interface/readonly-modifier-in-interfaces.md" %}

