---
description: 任意の型を除外する
title: "Exclude<T, U>"
---

`Exclude<T, U>`は、ユニオン型`T`から`U`で指定した型を取り除いたユニオン型を返すユーティリティ型です。

## Exclude&lt;T, U>の型引数

### T

型引数`T`には、ユニオン型を渡します。

### U

型引数`U`には、`T`から取り除きたい型を渡します。

## Excludeの使用例

```ts
type Grade = "A" | "B" | "C" | "D" | "E";
type PassGrade = Exclude<Grade, "E">;
```

上のPassGradeは次の型と同じになります。

```ts
type PassGrade = "A" | "B" | "C" | "D";
```

`Exclude`の第2引数をユニオン型にすると、複数の型を取り除くこともできます。

```ts
type Grade = "A" | "B" | "C" | "D" | "E";
type PassGrade = Exclude<Grade, "D" | "E">;
//=> "A" | "B" | "C"
```

## Excludeの注意点

`U`は`T`の部分集合である制限がありません。つまり、`T`に存在しない型を`U`に入れてしまったり、タイポなどに気をつけなければいけません。次の例は、Pull Requestに関する型と解釈してください。

```ts
type PullRequestState = "draft" | "reviewed" | "rejected";
type MergeableState = Exclude<PullRequestState, "draft" | "rejected">;
//=> "reviewed"
```

`MergeableState`は`reviewed`を意味しますが、この`Exclude`の使い方には2つの潜在的な問題があります。

### `PullRequestState`に新しい状態が追加された時

`PullRequestState`に`testFailed`という`MergeableState`に含めたくない状態を追加したとします。するとこの修正に伴って`MergeableState`の第2引数も同時に修正しないといけません。これを忘れると`testFailed`は`MergeableState`に含まれてしまいます。

```ts
type PullRequestState = "draft" | "reviewed" | "rejected" | "testFailed";
type MergeableState = Exclude<PullRequestState, "draft" | "rejected">;
//=> "reviewed" | "testFailed"
```

### 変更した場合

`PullRequestState`の`draft`を`open`に変更しました。この場合も、`Exclude`の第2引数の修正を忘れると`MergeableState`に`open`が含まれてしまいます。

```ts
type PullRequestState = "open" | "reviewed" | "rejected";
type MergeableState = Exclude<PullRequestState, "draft" | "rejected">;
//=> "open" | "reviewed"
```
