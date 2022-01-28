---
sidebar_label: セッターとゲッター
---

# セッターとゲッター (set, get)

プロパティへのインターセプター(参照・代入・監視などの意味)としGetter/Setterがあります。

記述方法のサンプルは次のようになります。

```ts
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
console.log(human.name); // 田中太郎
```

メソッドと違い、getter/setterを呼ぶ場合は`()`は不要です。

```ts twoslash
class Human {
  private _name: string;

  public constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

const human = new Human("田中太郎");
// ---cut---
// @errors: 2349 6234
// Getter
console.log(human.name); // 正しいGetterの使用方法
// @log: "田中太郎"
console.log(human.name()); // エラー :human.name is not a function

// Setter
human.name = "田中太郎"; // 正しいSetterの使用方法
human.name("田中太郎");
```

## Getter

Getterの記述方法を日本語で表すと次のようになります。

```ts
get 名前(): 型 {
  必要ならば処理();
  return 戻り値;
}
```

Getterに引数を指定することはできません。また戻り値を必ず指定する必要があります。

## Setter

Setterの記述方法を日本語で表すと次のようになります。

```ts
set 名前(変数 : 型) {
  必要ならば処理();
  保存処理();
}
```

引数が必ずひとつ必要です。また戻り値を指定することはできません。
