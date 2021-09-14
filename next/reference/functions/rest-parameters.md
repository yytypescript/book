# 残余引数/可変長引数 \(rest parameter\)

通常の関数は引数の数が決まっています。JavaScriptでは引数の数に決まりがない関数も作れます。引数の個数が決まっていない引数のことを可変長引数\(variable length arguments, variadic arguments\)といいます。JavaScriptでは可変長引数は残余引数\(rest parameter\)とも呼びます。

## 残余引数の書き方

JavaScriptで残余引数を書くには、引数の前に`...`を書きます。

```javascript
function func(...params) {
  // ...
}
```

残余引数は配列になります。

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

残余引数は最終的に配列として解釈されるからといって引数をまとめてひとつの配列として渡すことはできません。

```typescript
average([1, 3, 5, 7, 9]);
```

このように配列を直接渡してしまうと`average()`の関数内では要素数1の`number[][]`型が渡されたと解釈されます。もちろん`average()`の期待する引数の型は`number[]`型なのでこのコードを実行することはできません。配列を引数として渡したい場合は、後述のスプレッド構文を使うことで実現ができます。

```typescript
average(...[1, 3, 5, 7, 9]);
```

## スプレッド構文 \(spread syntax\)

JavaScriptに組み込みのメソッドとして存在する`Math.max()`は与えられた`number`型の引数の最大値を返却しますが引数として残余引数を要求します。上記のとおり配列をそのまま入れることができないので次のようなことができません。

```typescript
const scores: number[] = mathExamination();
const max: number = Math.max(scores);
```

この例は学校の数学の試験をイメージしています。学校であれば生徒の数は1年間でそう増減はしないので40人ぐらいの生徒なら力技でもなんとかなるかもしれません。

```typescript
Math.max(
  scores[0],
  scores[1],
  scores[2],
  scores[3],
  scores[4],
  scores[5],
  scores[6],
  ...
);
```

書いている最中で力つきました。これは来年は描き直しが必要な上に、生徒が転入したり転校したりしてもコードを書き直す必要があります。このようなときはスプレッド構文を使って配列を引数の列に変換します。

```typescript
const scores: number[] = mathExamination();
const max: number = Math.max(...scores);
```

残余引数もスプレッド構文もどちらも`...`と表記しますが片方は個々の引数を配列にし、もう片方は配列を個々の引数にします。

