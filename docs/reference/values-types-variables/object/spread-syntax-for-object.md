---
sidebar_label: "オブジェクトのスプレッド構文「...」"
---

# オブジェクトのスプレッド構文「...」(spread syntax)

JavaScriptのオブジェクトではスプレッド構文「...」を使うことで、プロパティを展開することができます。

## オブジェクトの作成

あるオブジェクトにプロパティを追加して新しいオブジェクトを作成する場合に、スプレッド構文を使用すると簡潔に書けます。

```ts twoslash
const obj = { a: 1, b: 2 };
const obj2 = { ...obj, c: 3 };
console.log(obj2);
// @log: { a: 1, b: 2, c: 3 }
```

スプレッド構文はオブジェクトリテラルの好きな位置に記述できます。

```ts twoslash
const obj = { a: 1, b: 2 };
const obj2 = { z: 0, ...obj, c: 3 };
console.log(obj2);
// @log: { z: 0, a: 1, b: 2, c: 3 }
```

## プロパティの上書き

スプレッド構文を使うと、既存のプロパティを上書きした新しいオブジェクトを作成できます。後に書いたプロパティが優先されます。

```ts twoslash
const obj = { a: 1, b: 2 };
const obj2 = { ...obj, b: 100 };
console.log(obj2);
// @log: { a: 1, b: 100 }
```

## オブジェクトのコピー

オブジェクトのコピーを作る際に、スプレッド構文が便利です。スプレッド構文で作成されたコピーは、元のオブジェクトとは異なる実体を持ちます。

```ts twoslash
const obj = { a: 1, b: 2 };
const backup = { ...obj };
obj.a = 100; // 変更を加える
console.log(obj);
// @log: { a: 100, b: 2 }
console.log(backup); // コピーには影響なし
// @log: { a: 1, b: 2 }
```

注意点として、この方法は浅いコピー(shallow copy)です。深いコピー(deep copy)ではない点に注意してください。浅いコピーで複製できるのは、1層目のプロパティだけです。オブジェクトの中にオブジェクトが入っている場合は、2層目より深くにあるオブジェクトは、元のオブジェクトのものと値を共有します。

```js twoslash
const obj = { a: 1, b: { c: 2 } };
const backup = { ...obj };
obj.b.c = 100;
console.log(obj.b.c);
// @log: 100
console.log(backup.b.c); // 変更の影響あり
// @log: 100
```

上記のような浅いコピーの挙動についての詳しい解説はこちらにあります。

[オブジェクトを浅くコピーする](../../../tips/shallow-copy-object.md)

## オブジェクトのマージ

複数のオブジェクトをマージすることもできます。

```ts twoslash
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged);
// @log: { a: 1, b: 2, c: 3, d: 4 }
```

## 分割代入と残余パターン

オブジェクトの分割代入では、残余パターン（rest pattern）を使って、特定のプロパティを取り出した残りを別の変数に代入できます。

```ts twoslash
const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log(a);
// @log: 1
console.log(rest);
// @log: { b: 2, c: 3 }
```

この構文は、特定のプロパティを除外した新しいオブジェクトを作りたいときに便利です。

```ts twoslash
const user = { id: 1, name: "Alice", password: "secret" };
const { password, ...safeUser } = user;
console.log(safeUser);
// @log: { id: 1, name: "Alice" }
```

<PostILearned>

・オブジェクトのスプレッド構文でプロパティを展開できる
・新しいオブジェクト作成やコピーに便利
・後に書いたプロパティで上書きできる
・浅いコピーなので入れ子には注意
・残余パターンで特定プロパティを除外できる

</PostILearned>

## 関連情報

[配列のスプレッド構文「...」](../array/spread-syntax-for-array.md)

[オブジェクトの分割代入](./destructuring-assignment-from-objects.md)
