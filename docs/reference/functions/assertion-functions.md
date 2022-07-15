---
sidebar_label: アサーション関数
---

# アサーション関数 (assertion functions)

ユーザー定義の型ガード関数として使われるのはType predicateが主ですが、Assertion functionという方法もあります。
Type predicateは`boolean`型の戻り値に対して使いましたがこちらは関数が例外を投げるかどうかで判定します。型ガード関数のページで作った関数`isDuck()`をAssertion functionsで書きかえると次のようになります。

```ts twoslash
// @errors: 2339
class Animal {}
class Duck {
  public quacks(): void {}
}
declare function walksLikeDuck(animal: Animal): boolean;
declare function quacksLikeDuck(animal: Animal): boolean;

const animal = new Animal();
// ---cut---
function isDuck(animal: Animal): asserts animal is Duck {
  if (walksLikeDuck(animal)) {
    if (quacksLikeDuck(animal)) {
      return;
    }
  }

  throw new Error("YOU ARE A FROG!!!");
}

// ここではquacks()は存在しない
animal.quacks();

isDuck(animal);

animal.quacks();
```

こちらはこの関数が呼ばれた後であればいつでも変数`animal`は`Duck`型として解釈されます。
