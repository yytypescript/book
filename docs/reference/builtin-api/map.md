---
title: Map<K, V>
---

`Map`はJavaScriptの組み込みAPIのひとつで、キーと値のペアを取り扱うためのオブジェクトです。`Map`にはひとつのキーについてはひとつの値のみを格納できます。

## Mapオブジェクトの作り方

`Map`オブジェクトを作るには`Map`クラスを`new`します。たとえば、キーが`string`、値が`number`の`Map<string, number>`は次のように作ります。

```ts twoslash
const map = new Map<string, number>();
map.set("a", 1);
console.log(map.get("a"));
// @log: 1
```

コンストラクタにキーと値の[タプル型]`[K, V]`の配列`[K, V][]`を渡すと`Map<K, V>`オブジェクトが作られます。

[タプル型](../values-types-variables/tuple.md)

```ts twoslash
const map = new Map<string, number>([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map);
// @log: Map (3) {"a" => 1, "b" => 2, "c" => 3}
```

`Map`の型変数を省略した場合、TypeScriptはコンストラクタ引数から`Map<K, V>`の型を推論します。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
map;
//^?
```

コンストラクタ引数を省略した場合、空の`Map`が作られます。

```ts twoslash
const map = new Map<string, number>();
console.log(map);
// @log: Map(0) {}
```

型引数とコンストラクタ引数の両方を省略した場合、`Map<any, any>`型になります。

```ts twoslash
const map = new Map();
//    ^?
```

## Mapの型注釈

TypeScriptでMapの型注釈をする場合は、`Map<string, number>`のようにMap要素の型を型変数に指定します。

```ts twoslash
function doSomething(map: Map<string, number>) {}
```

## Mapのキーは厳密等価で判定される

`Map`のキーが同じかどうかは厳密等価(`===`)で判定します。等価(`==`)ではありません。

たとえば、`null`と`undefined`は等価ですが、厳密等価では等しくありません。

```ts twoslash
console.log(null == undefined);
// @log: true
console.log(null === undefined);
// @log: false
```

そのため、`Map`は`null`と`undefined`を異なるキーとみなします。

```ts twoslash
const map = new Map<any, any>([[null, 1]]);
console.log(map.has(null));
// @log: true
console.log(map.has(undefined));
// @log: false
```

`NaN`同士は厳密等価ではありませんが、例外的に同じキーとみなされます。

```ts twoslash
console.log(NaN === NaN);
// @log: false

const map = new Map<number, number>();
map.set(NaN, 1);
map.set(NaN, 2);
console.log(map);
// @log: Map (1) {NaN => 2}
```

オブジェクトは等価でも厳密等価でもないため、別のキーとみなされます。

```ts twoslash
console.log({} == {});
// @log: false
console.log({} === {});
// @log: false

const map = new Map<object, number>();
map.set({}, 1);
map.set({}, 2);
console.log(map);
// @log: Map (2) {{} => 1, {} => 2}
```

## Mapの操作

### 要素をセットする - `set`

`Map`にキーと値のペアを追加するには`set`メソッドを使います。

```ts twoslash
const map = new Map<string, number>();
map.set("a", 1);
console.log(map);
// @log: Map (1) {"a" => 1}
```

すでにキーがある場合は、値を上書きします。

```ts twoslash
const map = new Map([["a", 1]]);
map.set("a", 5);
console.log(map);
// @log: Map (1) {"a" => 5}
```

### 値を取得する - `get`

`Map`からキーをもとに要素を取得するには`get`メソッドを使います。

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.get("a"));
// @log: 1
```

`get`メソッドは、キーが存在しない場合、`undefined`を返します。

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.get("b"));
// @log: undefined
```

### 特定の要素を削除する - `delete`

`Map`からキーを指定して要素を削除するには`delete`メソッドを使います。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
map.delete("a");
console.log(map);
// @log: Map (1) {"b" => 2}
```

`delete`の戻り値は、キーが存在した場合`true`、そうでない場合`false`になります。

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.delete("a"));
// @log: true
console.log(map.delete("b"));
// @log: false
```

### キーの有無を確認する - `has`

`Map`にキーが存在するかどうかを調べるには`has`メソッドを使います。

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.has("a"));
// @log: true
console.log(map.has("b"));
// @log: false
```

:::tip 存在確認からの要素取得

要素が存在するかを`has`チェックしてから、`get`で要素を取得するコードはTypeScriptではうまく書けません。

```ts twoslash
// @errors: 2532
const map = new Map([["a", 1]]);
if (map.has("a")) {
  // TypeScriptは"a"があることを認識しない
  const n = map.get("a");
  n * 2;
}
```

この場合、`get`で値を取得して、その値が`undefined`でないことをチェックするとうまくいきます。

```ts twoslash
const map = new Map([["a", 1]]);
const n = map.get("a");
if (typeof n === "number") {
  n * 2;
}
```

:::

### 要素の個数を取得する - `size`

`Map`に登録されている要素数を調べるには`size`フィールドの値を見ます。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map.size);
// @log: 3
```

### 全要素を削除する - `clear`

`Map`に登録されている要素をすべて削除するには`clear`メソッドを使います。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map.size);
// @log: 3
map.clear();
console.log(map.size);
// @log: 0
```

### キーを列挙する - `keys`

`keys`メソッドはキーの反復可能オブジェクトを返します。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keys = [...map.keys()];
console.log(keys);
// @log: ["a", "b", "c"]
```

### 値を列挙する - `values`

`values`メソッドは値の反復可能オブジェクトを返します。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const values = [...map.values()];
console.log(values);
// @log: [1, 2, 3]
```

### キーと値のペアを列挙する - `entries`

`entries`メソッドはキーと値の反復可能オブジェクトを返します。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keyValues = [...map.entries()];
console.log(keyValues);
// @log: [["a", 1], ["b", 2], ["c", 3]]
```

### キーと値のペアを反復する

`Map`は`for...of`で反復できます。反復の順序は登録された順です。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (const [key, value] of map) {
  console.log(key, value);
  // "a", 1
  // "b", 2
  // "c", 3 の順で出力される
}
```

### 複製する

`Map`オブジェクトを複製(シャローコピー)するには、MapオブジェクトをMapコンストラクタに渡します。

```ts twoslash
const map1 = new Map([["a", 1]]);
const map2 = new Map(map1);
console.log(map2);
// @log: Map (1) {"a" => 1}
```

## Mapは直接JSONにできない

`Map`オブジェクトはJSON.stringifyにかけても、登録されている要素はJSONになりません。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(JSON.stringify(map));
// @log: "{}"
```

`Map`をJSON化する場合は、一度オブジェクトにする必要があります。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const obj = Object.fromEntries(map);
console.log(JSON.stringify(obj));
// @log: "{"a":1,"b":2,"c":3}"
```

## 他の型との相互運用

### Mapを配列にする

`Map<K, V>`にスプレッド構文を使うと、タプル型配列`[K, V][]`が得られます。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keyValues = [...map];
console.log(keyValues);
// @log: [["a", 1], ["b", 2], ["c", 3]]
```

### オブジェクトをMapにする

オブジェクトを`Map`に変換するには、`Object.entries`の戻り値をMapコンストラクタに渡します。

```ts twoslash
const obj = { a: 1, b: 2, c: 3 };
const map = new Map(Object.entries(obj));
console.log(map);
// @log: Map (3) {"a" => 1, "b" => 2, "c" => 3}
```

### Mapをオブジェクトにする

Mapをオブジェクトにするには、`Object.fromEntries`にMapオブジェクトを渡します。

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const obj = Object.fromEntries(map);
console.log(obj);
// @log: { "a": 1, "b": 2, "c": 3 }
```

## Mapとオブジェクトの違い

キーと値のペアが表現ができるという点で、`Map`とオブジェクトは似ていますが、次の違いがあります。

| 違い                     | `Map`        | オブジェクト       |
| ------------------------ | ------------ | ------------------ |
| プロトタイプキーの上書き | 起きない     | 起こりうる         |
| キーに使える型           | 任意の型     | `string`か`symbol` |
| 反復の順序               | 挿入順       | 複雑なロジック     |
| JSON化                   | 直接できない | 直接できる         |

### プロトタイプキーの上書き

オブジェクトはプロトタイプのキーを上書きする可能性があります。

```js twoslash
const obj = {};
console.log(obj.toString);
// @log: function toString() { [native code] }
obj.toString = 1;
console.log(obj.toString);
// @log: 1
```

`Map`は要素をセットしてもプロトタイプのキーを上書きする心配がありません。要素とプロトタイプは別の領域にあるためです。

```ts twoslash
const map = new Map<string, any>();
console.log(map.toString);
// @log: function toString() { [native code] }
map.set("toString", 1);
console.log(map.toString);
// @log: function toString() { [native code] }
```

### キーに使える型

オブジェクトのキーに使える型は`string`型か`symbol`型のどちらです。`Map`は任意の型をキーにできます。

### 反復の順序

オブジェクトのプロパティの反復順序は、書いた順や追加した順ではなく、複雑なロジックになっています。

[オブジェクトをループする方法](../values-types-variables/object/how-to-loop-an-object.md)

`Map`の要素の反復順序は要素を追加した順であることが保証されています。

### JSON化

オブジェクトはそのまま`JSON.stringify`でJSON化できます。`Map`は`JSON.stringify`しても要素はJSONになりません。一度`Map`をオブジェクトに変換する必要があります。

### Mapとオブジェクトの書き方比較

`Map`とオブジェクトは似た操作ができます。次がその対応表です。

|                | `Map`                 | オブジェクト              |
| -------------- | --------------------- | ------------------------- |
| 型注釈の書き方 | `Map<K, V>`           | `Record<K, V>`            |
| 初期化         | `new Map([["a", 1]])` | `{ a: 1 }`                |
| 要素のセット   | `map.set(key, value)` | `obj[key] = value`        |
| 値の取得       | `map.get(key)`        | `obj[key]`                |
| 要素の削除     | `map.delete(key)`     | `delete obj.key`          |
| キーの有無確認 | `map.has(key)`        | `key in obj`              |
| 要素数の取得   | `map.size`            | `Object.keys(obj).length` |
| 全要素削除     | `map.clear()`         | -                         |
| キーの列挙     | `map.keys()`          | `Object.keys(obj)`        |
| 値の列挙       | `map.values()`        | `Object.values(obj)`      |
| 要素の列挙     | `map.entries()`       | `Object.entries(obj)`     |
| 複製           | `new Map(map)`        | `{ ...obj }`              |

[Record<Keys, Type>](../type-reuse/utility-types/record.md)

<TweetILearned>

🗺Mapはキーと値のペアを扱うJSビルトインのAPI
📝TypeScriptではMap<string, number>のように型注釈する
🔬キーは厳密等価で判定される
🔪Mapは直接JSON化できない

⚖️Mapとオブジェクトの違い
→ Mapはキーに任意の型が使える
→ Mapはキーの順序が挿入順保証

</TweetILearned>
