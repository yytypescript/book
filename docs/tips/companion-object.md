# コンパニオンオブジェクトパターン

TypeScriptでは値と型に同名を与えてその両方を区別なく使うことができるテクニックがあります。これをコンパニオンオブジェクトと呼びます。
これは、クラスを作るほどでもなけどそれっぽいファクトリーメソッドとオブジェクトが欲しいときに重宝します。

## コンパニオンオブジェクト (Companion Object)

次の例は長方形 (Rectangle) を作成するためのメソッド`from()`をもつオブジェクト`Rectangle`とその生成されるオブジェクトの型`Rectangle`です。これらの名称は衝突することなく定義ができ、外部から呼び出したときは同名で使用できます。

次の型と値 (ファクトリーメソッドを持つオブジェクト) は同じファイル`rectangle.ts`に存在するとします。

```ts
export type Rectangle = {
  height: number;
  width: number;
};

export const Rectangle = {
  from(height: number, width: number): Rectangle {
    return {
      height,
      width,
    };
  },
};
```

値も型も同名で定義します。これを外部から import してみます。

```ts twoslash
// @filename: rectangle.ts
export type Rectangle = {
  height: number;
  width: number;
};

export const Rectangle = {
  from(height: number, width: number): Rectangle {
    return {
      height,
      width,
    };
  },
};
// @filename: index.ts
// ---cut---
import { Rectangle } from "./rectangle";

const rec: Rectangle = Rectangle.from(1, 3);

console.log(rec.height);
// @log: 1
console.log(rec.width);
// @log: 3
```

このように import の部分は`Rectangle`のみとなり見通しもつきやすいという特徴があります。ちなみに`Rectangle.from()`のRectangleが値であり`const rec: Rectangle`のRectangleが型です。このようにTypeScriptでは同名の値と型を同時に使うことができます。
