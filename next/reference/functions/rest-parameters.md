# 残余引数/可変長引数 \(rest parameter\)

通常の関数は引数の数が決まっています。JavaScriptでは引数の数に決まりがない関数も作れます。引数の個数が決まっていない引数のことを可変長引数\(variable length arguments, variadic arguments\)といいます。JavaScriptでは可変長引数は残余引数\(rest parameter\)と呼びます。

## 残余引数の書き方

JavaScriptで残余引数を書くには、引数の前に`...`を書きます。

```javascript
function func(...params) {
  // ...
}
```

受け取った残余引数は配列になります。

```javascript
function func(...params) {
  console.log(params);
}
func(1, 2, 3); //=> [ 1, 2, 3 ]
```

普通の引数と残余引数を持つ関数を作ることもできます。

```javascript
function func(param1, ...params) {
  console.log(param1, params);
}
func(1, 2, 3); //=> 1 [ 2, 3 ]
```

残余引数は必ず最後の引数でなければなりません。残余引数を複数持たせること、残余引数の後に普通の引数を置くことはできません。

```javascript
// 構文エラーになるコード
function func(...params1, ...params2) {}
function func(...params, param1) {}
```

## 残余引数の型注釈

TypeScriptで残余引数に型注釈するには、配列の型を書きます。例えば、残余引数が数値型なら、`number[]`のように書きます。

```typescript
function func(...params: number[]) {
  // ...
}
```

## 配列を残余引数として渡す

JavaScriptに組み込みのメソッドに`Math.max()`があります。これは、与えられた`number`型の引数の最大値を返却します。この関数は残余引数を要求します。

```javascript
Math.max(1, 10, 100) //=> 100
```

残余引数は、引数受取時には配列になりますが、関数呼び出しのときに配列にまとめて渡すことはできません。

```typescript
const scores: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const highest = Math.max(scores);
// Argument of type 'number[]' is not assignable to parameter of type 'number'.(2345)
```

このように配列を直接渡してしまうと、`max`の関数内では引数ひとつの`number[][]`型が渡されたと解釈されます。`max`の期待する引数の型は`number[]`型なので、このコードは正しく動きません。配列を引数として渡したい場合は、スプレッド構文\(spread syntax\)を用います。スプレッド構文は`...`と書きます。

```typescript
const scores: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const highest = Math.max(...scores);
```

残余引数もスプレッド構文も`...`と同じ表記ですが、スプレッド構文は配列を引数にバラすものです。

