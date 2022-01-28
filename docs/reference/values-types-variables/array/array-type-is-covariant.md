---
sidebar_label: 配列の共変性
---

# 配列の共変性 (covariance)

TypeScriptの配列の型は共変(covariant)です。ここでは配列の共変性(covariance)がどのようなものなのか、共変性があるためにどういうことに注意が必要なのか、なぜTypeScriptの配列は共変なのかについて見ていきます。

## 共変とは

型の世界の話で、共変とはその型自身、もしくは、その部分型(subtype)が代入できることを言います。たとえば、Animal型とDog型の2つの型があるとします。DogはAnimalの部分型とします。共変であれば、Animal型の変数にはAnimal自身とその部分型のDogが代入できます。

```ts
type Animal = { isAnimal: boolean };
type Dog = { isAnimal: boolean; isDog: boolean };

let pochi: Dog = { isAnimal: true, isDog: true };
let animal: Animal = pochi; // 代入OK
```

一方で共変では、Dog型の変数には、DogのスーパータイプであるAnimalは代入できません。

```ts
let animal: Animal = { isAnimal: true };
let pochi: Dog = animal;
// コンパイルエラー: Property 'isDog' is missing in type 'Animal' but required in type 'Dog'.(2741)
```

## 配列は共変が許される

TypeScriptの配列型は共変になっています。たとえば、`Animal[]`型の配列に`Dog[]`を代入できます。

```ts
const dogs: Dog[] = [pochi];
const animals: Animal[] = dogs; // 代入OK
```

一見するとこの性質は問題なさそうです。ところが、次の例のように`animals[0]`をAnimal型の値に置き換えると問題が起こります。

```ts
type Animal = { isAnimal: boolean };
type Dog = {
  isAnimal: boolean;
  wanwan(): string; // メソッド
};

const pochi = {
  isAnimal: true,
  wanwan() {
    return "wanwan"; // メソッドの実装
  },
};

const dogs: Dog[] = [pochi];
const animals: Animal[] = dogs;
animals[0] = { isAnimal: true }; // 同時にdogs[0]も書き換わる
const mayBePochi: Dog = dogs[0];
mayBePochi.wanwan();
// JS実行時エラー: mayBePochi.wanwan is not a function
```

変数`animals`に`dogs`を代入した場合、`animals`の変更は`dogs`にも影響します。これはJavaScriptの配列がミュータブルなオブジェクトであるためです。`animals[0]`にAnimal型の値を代入すると、`dogs[0]`もAnimalの値になります。`dogs`は`Dog[]`型なので、型どおりならAnimal型を受け付けないことが望ましいですが、実際はそれができてしまいます。その結果、`dogs[0]`の`wanwan`メソッドを呼び出すところで、メソッドが存在しないというJavaScript実行時エラーが発生します。

型の安全性を突き詰めると、配列は共変であるべきではないです。型がある他の言語のJavaでは、`List<T>`型は共変ではなく非変(invariant)になっています。非変な配列では、その型自身しか代入できないようになり、上のような問題が起こらなくなります。

```java
// Javaコード
import java.util.*;

class Animal {
}

class Dog extends Animal {
}

public class Main {
    static {
        List<Dog> dogs = new ArrayList<Dog>();
        List<Animal> animals = dogs;
        // エラー: 不適合な型: List<Dog>をList<Animal>に変換できません
    }
}
```

上のJavaコードの例では`dogs`を`animals`に代入する段階でコンパイルエラーになります。

## TypeScriptで配列が共変になっている理由

配列が非変である言語がある中、TypeScriptはなぜ型の安全性を犠牲にしてまで配列を共変にしているでしょうか。それはTypeScriptが健全性(soundness)と利便性のバランスを取ること目標にして、型システムを設計しているためです。配列が非変であると健全性は高くなりますが、利便性は下がります。
