# 公称型クラス

TypeScriptでは、クラスに1つでも非パブリックなプロパティがあると、そのクラスだけ構造的部分型ではなく公称型(nominal typing)になります。

たとえば、`UserId`クラスと`GroupId`クラスで同名になってしまっている`id`プロパティをプライベートにするだけで、相互の代入が不可能になります。

```ts
class UserId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class GroupId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const userId: UserId = new GroupId("...");
// Type 'GroupId' is not assignable to type 'UserId'.
//   Types have separate declarations of a private property 'id'.(2322)
```

この方法はフィールドに限らず、プライベートメソッドや`protected`プロパティでも同じ効果があります。

## 関連情報

[構造的部分型 (structural subtyping)](../../values-types-variables/structural-subtyping.md)
