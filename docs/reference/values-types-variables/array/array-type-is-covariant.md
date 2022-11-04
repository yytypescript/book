---
sidebar_label: 配列の共変性
---

# 配列の共変性 (covariance)

TypeScriptの配列の型は共変(covariant)です。ここでは配列の共変性(covariance)がどのようなものなのか、共変性があるためにどういうことに注意が必要なのか、なぜTypeScriptの配列は共変なのかについて見ていきます。

## 共変とは

型の世界の話で、共変とはその型自身、もしくは、その部分型(subtype)が代入できることを言います。たとえば、Animal型とDog型の2つの型があるとします。DogはAnimalの部分型とします。共変であれば、Animal型の変数にはAnimal自身とその部分型のDogが代入できます。

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  isDog: boolean;
}

let pochi: Dog = { isAnimal: true, isDog: true };
let animal: Animal = pochi; // 代入OK
```

一方で共変では、Dog型の変数には、DogのスーパータイプであるAnimalは代入できません。

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  isDog: boolean;
}
// ---cut---
// @errors: 2741
let animal: Animal = { isAnimal: true };
let pochi: Dog = animal;
```

## 配列は共変が許される

TypeScriptの配列型は共変になっています。たとえば、`Animal[]`型の配列に`Dog[]`を代入できます。

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  isDog: boolean;
}

let pochi: Dog = { isAnimal: true, isDog: true };
let animal: Animal = pochi; // 代入OK
// ---cut---
const dogs: Dog[] = [pochi];
const animals: Animal[] = dogs; // 代入OK
```

一見するとこの性質は問題なさそうです。ところが、次の例のように`animals[0]`をAnimal型の値に置き換えると問題が起こります。

```ts twoslash
interface Animal {
  isAnimal: boolean;
}
interface Dog extends Animal {
  wanwan(): string; // メソッド
}

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

では、具体的にどのようなところで不便になるのか、見ていきましょう。込み入った話になるので、段階を踏んで説明していきます。

まず、共変とは、ある型とその部分型が代入できることです。たとえば、`number`型は、ユニオン型の`number | null`型の部分型です。これを配列にした`number[]`型は、`(number | null)[]`型の部分型ということになります。

TypeScriptの配列の型は、共変です。したがって、`number[]`型は`(number | null)[]`型に代入できます。もし、TypeScriptの配列の型が非変なら、`(number | null)[]`型に代入できるのは、それ自身になります。`number[]`は`(number | null)[]`に代入できないことになります。

ここまでのことを整理すると次のようになります。

- `number`は`number | null`の部分型
- `number[]`は`(number | null)[]`の部分型
- 共変なら、`(number | null)[]`に`number[]`が代入できる
- 非変なら、`(number | null)[]`に`number[]`は代入できない

次に、ここで話を変えて、次のような関数を考えてみます。

```ts twoslash
function sum(values: (number | null)[]): number {
  let total = 0;
  for (const value of values) {
    if (typeof value === "number") {
      total += value;
    }
  }
  return total;
}
```

この`sum`関数は、`(number | null)[]`、つまり数値とヌルが混在しうる配列を受け取り、数値だけピックアップして、その合計値を返す関数です。関数の引数に代入する場合も、TypeScriptの配列は共変です。共変なので、次のような`number[]`型の値を代入できます。

```ts twoslash
declare function sum(values: (number | null)[]): number;
// ---cut---
const values: number[] = [1, 2, 3];
sum(values);
```

もしも、TypeScriptの配列が非変だと、上のようなコードはコンパイルエラーになるでしょう。`sum`関数は、引数に`(number | null)[]`を期待していますが、`number[]`を渡しているからです。そして、そのようなコンパイルエラーを回避しようとしたら、次のような余計な型アサーションを加えたりしないとなりません。

```ts twoslash
declare function sum(values: (number | null)[]): number;
declare const values: number[];
// ---cut---
sum(values as (number | null)[]);
//         ^^^^^^^^^^^^^^^^^型アサーション
```

こうしたことが随所で起きると、書くのも読むのも不便になります。したがって、TypeScriptでは型の完璧さよりも、利便性を優先しているものと考えられます。

また、TypeScriptはJavaScriptに型を追加した言語で、根底にはJavaScriptがあります。JavaScriptからTypeScriptに移行するコードもあると思いますが、配列が非変であることを前提に書かれたJavaScriptコードは少ないと思われます。そうした状況もあって、共変を許した可能性もあります。
