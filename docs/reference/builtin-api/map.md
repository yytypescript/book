---
title: Map<K, V>
---

`Map`はJavaScriptの組み込みAPIのひとつで、key-valueのペアを取り扱うためのオブジェクトです。`Map`にはひとつのキーについてはひとつの値のみを格納できます。

## Mapオブジェクトの作り方

`Map`オブジェクトを新たに作るには`Map`クラスを`new`します。コンストラクタに`[K, V]`のタプルの配列を渡すと`Map`オブジェクトが作られます。

[タプル](../values-types-variables/tuple.md)

たとえば`string`のキーに対し`number`の値を持つ`Map<string, number>`は次のように作ります。

```typescript twoslash
const map = new Map<string, number>([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map);
// @log: Map (3) {"a" => 1, "b" => 2, "c" => 3}
```

コンストラクタ引数を省略した場合、空の`Map`オブジェクトが作られます。

```typescript twoslash
const map = new Map<string, number>();
console.log(map);
// @log: Map(0) {}
```

型引数とコンストラクタ引数の両方を省略した場合、`Map<any, any>`型になります。

```typescript twoslash
const map = new Map();
//    ^?
```

## Mapのキーが同じとみなされるロジック

`Map`のキーが同じであるというのは等価演算(`==`)ではなく、厳密等価演算(`===`)が同じであるかどうかで判定します。そのため

```typescript twoslash
console.log(null == undefined);
// @log: true
console.log(null === undefined);
// @log: false

const map = new Map<any, string>();

map.set(null, "this is null");
map.set(undefined, "this is undefined");

console.log(map);
// @log: Map (2) {null => "this is null", undefined => "this is undefined"}
```

等価演算では等しいとみなされる`null`と`undefined`ですが、`Map`では異なるキーとしてみなされます。一方`NaN`については例外的に

```typescript twoslash
console.log(NaN === NaN);
// @log: false

const map = new Map<number, string>();

map.set(NaN, "this is first NaN");
map.set(NaN, "this is second NaN");

console.log(map);
// @log: Map (1) {NaN => "this is the second NaN"}
```

`set`メソッドの使い方は後ほど説明しますが`NaN`をキーとして複数の値を入れることはできません。
また等価演算、厳密等価演算ともに常に`false`である異なるオブジェクトについては異なるキーとしてみなされます。

```typescript twoslash
console.log({} == {});
// @log: false
console.log({} === {});
// @log: false

const map = new Map<object, string>();

map.set({}, "this is first object");
map.set({}, "this is second object");

console.log(map);
// @log: Map (2) {{} => "this is first object", {} => "this is second object"}
```

## Mapとオブジェクトの違い

key-valueのペアのオブジェクトといえばずばりJavaScriptの`Object`そのものであり、`Map`と何が違うのか。と思われるかもしれませんが、次のような違いがあります。

1. 既存のキー
1. キーの型
1. 反復処理

### 既存のキー

`Map`はオブジェクト生成時には(引数を指定しなければ)キーを何も持っていませんが`Object`は`prototype`を持っています。

### キーの型

`Map`は任意の型をキーにすることができますが`Object`は`string`型あるいは`symbol`型のみをキーとすることができます。

### 反復処理

`Map`は反復可能なので`for...of`を使うことができますが`Object`は反復可能ではないので別の方法で反復させる必要があります。

## Mapの操作

### 値を追加する

`Map`に値を追加するには`set`メソッドを使います。既存のキーに対し同じキーを指定すると上書きします。

```typescript twoslash
const map = new Map([["a", 1]]);
map.set("a", 5);
console.log(map);
// @log: Map (1) {"a" => 5}
```

### 値を削除する

`Map`から値を削除するには`delete`メソッドを使います。キーが存在する場合はキーと値を削除し戻り値に`true`を、キーが存在しない場合は戻り値に`false`を返します。

```typescript twoslash
const map = new Map([["a", 1]]);
console.log(map.delete("a"));
// @log: true
console.log(map.delete("a"));
// @log: false
console.log(map);
// @log: Map (0) {}
```

### 値の有無を確認する

`Map`にキーが存在するかどうかを調べるには`has`メソッドを使います。

```typescript twoslash
const map = new Map([["a", 1]]);
console.log(map.has("a"));
// @log: true
console.log(map.has("b"));
// @log: false
```

### 値の個数を取得する

`Map`にキーがいくつ登録されているかを調べるには`size`フィールドの値を見ます。

```typescript twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map.size);
// @log: 3
```

### Mapを空っぽにする

`Map`に登録されているキーと値をすべて削除するには`clear`メソッドを使います。

```typescript twoslash
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

### Mapを反復させる

`Map`を反復させる方法は複数あります。

1. `for...of`を使う
1. `keys`メソッドを使う
1. `values`メソッドを使う
1. `entries`メソッドを使う

#### `for...of`を使う

`Map<K, V>`を`for...of`で反復させると`[K, V]`のタプルを得ることができます。

```typescript twoslash
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

#### `keys`メソッドを使う

`keys`メソッドを使うと`Map`のキーのみの反復可能オブジェクトを得ることができます。

```typescript twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keys = [...map.keys()];
console.log(keys);
// @log: ["a", "b", "c"]
```

#### `values`メソッドを使う

`values`メソッドを使うと`Map`の値のみの反復可能オブジェクトを得ることができます。

```typescript twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const values = [...map.values()];
console.log(values);
// @log: [1, 2, 3]
```

#### `entries`メソッドを使う

`entries`メソッドを使うと`Map`のキーと値の反復可能オブジェクトを得ることができます。

```typescript twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keyValues = [...map.entries()];
console.log(keyValues);
// @log: [["a", 1], ["b", 2], ["c", 3]]
```

### Mapを配列に変換する

`Map<K, V>`にスプレッド構文を使うと`[K, V]`のタプルの配列を得ることができます。

```typescript twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keyValues = [...map];
console.log(keyValues);
// @log: [["a", 1], ["b", 2], ["c", 3]]
```

## Mapとオブジェクトの操作の対応

`Map`とオブジェクトは似た操作ができます。次がその対応表です。

|                          | `Map`                 | オブジェクト                            |
| ------------------------ | --------------------- | --------------------------------------- |
| 値を追加する             | `map.set(key, value)` | `object.value = key`                    |
| 値を削除する             | `map.delete(key)`     | `delete object.key`                     |
| 値の存在を確認する       | `map.has(key)`        | `({}).hasOwnProperty.call(object, key)` |
| 値の個数を取得する       | `map.size`            | `Object.keys(object).length`            |
| 空にする                 | `map.clear()`         | なし                                    |
| キーを列挙する           | `map.keys()`          | `Object.keys(object)`                   |
| 値を列挙する             | `map.values()`        | `Object.values(object)`                 |
| キーと値のペアを列挙する | `map.entries()`       | `Object.entries(object)`                |
| 複製(シャローコピー)する | `new Map(map)`        | `{ ...object }`                         |

<TweetILearned>

・Mapのキーは厳密等価演算で評価される
・MapとObjectは似ているが等しいものではない

</TweetILearned>
