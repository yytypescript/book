# Set&lt;T&gt;

`Set`はJavaScriptの組み込みAPIのひとつで、値のコレクションを扱うためのオブジェクトです。`Set`には重複する値が格納できません。`Set`に格納された値は一意\(unique\)になります。

## Setオブジェクトの作り方

`Set`オブジェクトを新たに作るには、`Set`クラスを`new`します。コンストラクターに配列を渡すと、値が`Set`に格納されます。

```typescript
const fruits = new Set(["apple", "orange", "banana"]);
console.log(fruits);
//=> Set { 'apple', 'orange', 'banana' }
```

コンストラクターに渡す配列の中に重複がある場合、重複した値は取り除かれます。

```typescript
const fruits = new Set(['apple', 'apple', 'apple']);
console.log(fruits);
//=> Set { 'apple' }
```

コンストラクター引数を省略した場合、空の`Set`オブジェクトが作られます。

```typescript
const fruits = new Set();
console.log(fruits); //=> Set {}
```

空の`Set`オブジェクトのTypeScript上の型は`Set<unknown>`になります。これでは後から`Set`に値を追加できないので、空の`Set`を作るときは、`Set`の型変数を指定する必要があります。

```typescript
const fruits = new Set<string>();
//                    ^^^^^^^^ 型変数を指定
```

## Setの型注釈

TypeScriptで`Set`の型注釈をする場合は、`Set<string>`のようにSet要素の型を型変数に指定します。

```typescript
function doSomething(strings: Set<string>) {
  // ...
}
```

## Setの操作

### 値を追加する

`Set`に値を追加するには`add`メソッドを用います。同じ値は何度追加しても増えないようになっています。

```typescript
const fruits = new Set<string>();
fruits.add("apple");
fruits.add("apple");
console.log(fruits); //=> Set (1) {"apple"}
```

追加した値は最後に足されます。すでに存在する値は、追加されず順番は変わりません。

```typescript
const numbers = new Set<number>();
numbers.add(1).add(2).add(3);
numbers.add(1);
console.log(numbers); //=> Set (3) {1, 2, 3}
```

### 値を削除する

`Set`から値を取り除くには、`delete`メソッドを使います。

```typescript
const numbers = new Set([1, 2, 3]);
numbers.delete(3);
console.log(numbers); //=> Set (2) {1, 2}
```

### 値が有無を確認する

`Set`に値が存在するかどうかは`has`メソッドで調べられます。

```typescript
const numbers = new Set([1, 2, 3]);
console.log(numbers.has(1)); //=> true
console.log(numbers.has(999)); //=> false
```

### 値の個数を取得する

`Set`にいくつ値が登録されているかを調べるには、`size`フィールドの値を見ます。

```typescript
const fruits = new Set(["apple", "orange", "banana"]);
console.log(fruits.size); //=> 3
```

### Setを空っぽにする

`Set`に登録された値をすべて削除するには`clear`メソッドを使います。

```typescript
const fruits = new Set(["apple", "orange", "banana"]);
fruits.clear();
console.log(fruits); //=> Set (0) {}
```

### Setをループする

`Set`オブジェクトはfor-of構文でループできます。

```typescript
const fruits = new Set(["apple", "orange", "banana"]);

for (const fruit of fruits) {
  console.log(fruit); // "apple"、"orange"、"banana"の順で出力される
}
```

{% page-ref page="../statements/for-of.md" %}

### Setを配列に変換する

`Set`オブジェクトを配列に変換するには、スプレッド構文を用います。

```typescript
const fruits = new Set(["apple", "orange", "banana"]);
const array = [...fruits];
console.log(array); //=> ["apple", "orange", "banana"]
```

{% page-ref page="../values-types-variables/array/spread-syntax-for-array.md" %}

## Setは直接JSONにできない

`Set`オブジェクトは`JSON.stringify`にかけても、`Set`に登録されている値はJSONになりません。

```typescript
const fruits = new Set(["apple", "orange", "banana"]);
console.log(JSON.stringify(fruits)); //=> "{}"
```

SetオブジェクトのデータをJSON化したい場合は、一度配列にするなどひと手間必要です。

```typescript
const fruits = new Set(["apple", "orange", "banana"]);
const array = [...fruits];
console.log(JSON.stringify(array)); //=> ["apple","orange","banana"]
```

## レシピ

### 配列から重複要素を取り除く

「`Set`に渡した値は重複しない」という特性を使って、配列から値が重複する要素を取り除く処理に応用できます。

```javascript
const array1 = [0, 0, 1, 1, 2, 2];
const array2 = [...new Set(array1)];
console.log(array2); //=> [ 0, 1, 2 ]
```

