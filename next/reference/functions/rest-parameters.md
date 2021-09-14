# 残余引数/可変長引数 \(rest parameter\)

いわゆる可変の引数のことです。たとえば引数に与えられた数値の平均を返す関数`average()`を作るとします。これを残余引数を使って表現すると次のようになります。

```typescript
function average(...nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }

  return nums.reduce((prev: number, cur: number): number => {
    return prev + cur;
  }) / nums.length;
}

console.log(average()); // 0
console.log(average(1, 3)); // 2
```

0除算を防ぐ目的で少々処理が複雑になっていますが、可変の引数の前に`...`を付ければ、残余引数を受け付け、それらを配列として受けることができます。

### 残余引数でできないこと

残余引数は最終的に配列として解釈されるからといって引数をまとめてひとつの配列として渡すことはできません。

```typescript
average([1, 3, 5, 7, 9]);
```

このように配列を直接渡してしまうと`average()`の関数内では要素数1の`number[][]`型が渡されたと解釈されます。もちろん`average()`の期待する引数の型は`number[]`型なのでこのコードを実行することはできません。

配列を引数として渡したい場合は、後述のスプレッド構文を使うことで実現ができます。

```typescript
average(...[1, 3, 5, 7, 9]);
```

また可変個の引数を受けつける関係上、残余引数より後ろにほかの引数を置くことができません。

```typescript
function average(...nums: number[], subject: string): number {
  // ...
}
// A rest parameter must be last in a parameter list.
```

ただし残余引数の前であれば問題ありません。

```typescript
function average(subject: string, ...nums: number[]): number {
  // ...
}
```

### スプレッド構文\(Spread Syntax\)

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

書いている最中で力つきました。これは来年は描き直しが必要な上に、生徒が転入したり転校したりしてもコードを書き直す必要があります。

このようなときはスプレッド構文を使って配列を引数の列に変換します。

```typescript
const scores: number[] = mathExamination();

const max: number = Math.max(...scores);
```

残余引数もスプレッド構文もどちらも`...`と表記しますが片方は個々の引数を配列にし、もう片方は配列を個々の引数にします。

