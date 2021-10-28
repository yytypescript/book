---
sidebar_label: this引数
---

# this引数 (this parameter)

アロー関数以外の関数とクラスのメソッドの第1引数は`this`という特殊な引数を受けることができます。これは使用するコンテキストによって`this`の意味するところが変わってしまうため、これらがどのコンテキストで使用されるべきなのかをTypeScriptに伝えるために使います。この`this`は呼び出す側は意識する必要はありません。第2引数以降を指定してください。

```twoslash include main
class Male {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public toString(): string {
    return `Monsieur ${this.name}`;
  }
}

class Female {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public toString(this: Female): string {
    return `Madame ${this.name}`;
  }
}
```

```ts twoslash
// @include: main
```

上記クラス`Male`、`Female`はほぼ同じ構造ですが`toString()`のメソッドの引数が異なります。

`Male`、`Female`はともに普通の用途で使うことができます。

```ts twoslash
// @include: main
// ---cut---
const male: Male = new Male("Frédéric");
const female: Female = new Female("Frédérique");

male.toString();
// @log: Monsieur Frédéric
female.toString();
// @log: Madame Frédérique
```

ですが各インスタンスの`toString()`を変数に代入すると意味が変わります。

```ts twoslash
// @errors: 2684
// @include: main
const male: Male = new Male("Frédéric");
const female: Female = new Female("Frédérique");
// ---cut---
const maleToStr: () => string = male.toString;
const femaleToStr: (this: Female) => string = female.toString;

maleToStr();
femaleToStr();
```

`femaleToStr()`のコンテキストが`Female`ではないとの指摘を受けています。このコードを実行することはできません。ちなみにこの対応をしていない`maleToStr()`は実行こそできますが実行時に例外が発生します。

```js twoslash
class Male {
  // ...
  // prettier-ignore
  toString() {
// @error: TypeError: Cannot read property 'name' of undefined
    return `Monsieur ${this.name}`;
  }
}
```

引数の`this`を指定することによって意図しないメソッドの持ち出しを避けることができます。
