---
sidebar_label: アサーション関数
---

# アサーション関数 (assertion functions)

やりたいことはほぼType predicateと同じです。Type predicateは`boolean`型の戻り値に対して使いましたがこちらは例外を投げるかどうかで判定します。上記関数`isDuck()`をAssertion functionsで書きかえると次のようになります。

```ts twoslash
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

// ...

isDuck(animal);

animal.quacks();
```

こちらはこの関数が呼ばれた後であればいつでも変数`animal`は`Duck`型として解釈されます。
