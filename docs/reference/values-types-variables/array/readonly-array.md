---
sidebar_label: 読み取り専用の配列
---

# 読み取り専用の配列 (readonly array)

TypeScriptでは配列を読み取り専用(readonly)として型注釈できます。型注釈の方法は2とおりあります。1つ目は`readonly`キーワードを使う方法です。2つ目は`ReadonlyArray<T>`を使う方法です。

## readonly T\[]

配列の型注釈`T[]`の前に`readonly`キーワードを添えると、読み取り専用の配列型にできます。たとえば、`readonly number[]`と書くと、その変数の型はnumberの読み取り専用配列型になります。

```ts
const nums: readonly number[] = [1, 2, 3];
```

## ReadonlyArray&lt;T>

`ReadonlyArray<T>`のような書き方でも読み取り専用の配列型になります。たとえば、要素がnumber型の配列を読み取り専用にしたい場合、`ReadonlyArray<number>`と書きます。

```ts
const nums: ReadonlyArray<number> = [1, 2, 3];
```

## readonly T\[]とReadonlyArray&lt;T>の違い

`readonly T[]`と`ReadonlyArray<T>`の違いは書き方以外にありません。どちらを使うかは書き手の好みです。開発チームとしてはどちらの書き方にするかは統一しておいたほうがよいでしょう。

## 読み取り専用配列の特徴

読み取り専用の配列には、配列に対して破壊的操作をする`push`メソッドや`pop`メソッドが、**コンパイル時には無いことに**なります。したがって、`readonly number[]`型の変数`nums`に対して、`nums.push(4)`をするコードはコンパイルエラーになります。

```ts twoslash
// @errors: 2339
const nums: readonly number[] = [1, 2, 3];
nums.push(4);
```

これは、破壊的操作系のメソッドを呼び出そうとするコードがTypeScriptコンパイラーに警告されるだけです。配列オブジェクトから`push`メソッドを削除しているわけではありません。なので、JavaScript実行時には`push`メソッドが残っている状態になります。

```ts twoslash
const nums: readonly number[] = [1, 2, 3];
console.log("pop" in nums);
// @log: true
```

メソッドは削除されるわけではないので、コンパイルエラーを無視して実行してみると、読み取り専用型でも配列を書き換えることはできます。

```ts twoslash
const nums: readonly number[] = [1, 2, 3];
// @ts-ignore
nums.push(4); // 本来コンパイルエラーになるが無視する
console.log(nums);
// @log: [1, 2, 3, 4]
```

## 読み取り専用配列を配列に代入する

TypeScriptの読み取り専用配列を普通の配列に代入することはできません。代入しようとするとコンパイルエラーになります。

```ts twoslash
// @errors: 4104
const readonlyNumbers: readonly number[] = [1, 2, 3];
const writableNumbers: number[] = readonlyNumbers;
```

これは、普通の配列は`push`や`pop`などのメソッドが必要なのに、読み取り専用配列にはそれが無いことになっているためです。どうしても読み取り専用配列を普通の配列に代入したいときは、型アサーション(type assertion)を使う方法があります。

```ts
const readonlyNumbers: readonly number[] = [1, 2, 3];
const writableNumbers: number[] = readonlyNumbers as number[];
//                                                ^^^^^^^^^^^ 型アサーション
```

[型アサーション「as」(type assertion)](../type-assertion-as.md)

逆のパターンとして、普通の配列を読み取り専用配列に代入することは可能です。

## 関連情報

[配列の破壊的操作](array-operations.md)

[オブジェクト型のreadonlyプロパティ (readonly property)](../object/readonly-property.md)

[Readonly&lt;T>](../../type-reuse/utility-types/readonly.md)
