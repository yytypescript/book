# 配列 \(Array\)

TypeScriptというよりかはJavaScriptの紹介になりますが、値をまとめて扱うコレクションとして有名な配列がTypeScriptにもあります。

## 配列の型について

型は以下の2通りの表記方法があり、自由に選択できます。

```typescript
const array1: T[] = [];
const array2: Array<T> = [];
```

1番目の筆記方法を単に`array`とよび、2番目の筆記方法を`generic`と呼びます。差はなく、プロジェクトで統一して使えればいいかと思います。ちなみに一般的なのは`array`です。  
JavaScriptのlinterとして有名な`ESLint`では、この筆記方法をどちらかに統一することを強制するオプションもあります。

`T`は使う時に決めることができるジェネリクス`(Generics)`と呼ばれるものです。本書にも記載がありますのでそちらに詳細は譲りますが、この`T`はその配列が要素としてどの型を受け付けるかを示します。

例えば、以下は`T`を`number`とした例です。

```typescript
const list1: number[] = [1, 1.5, 2];
const list2: Array<number> = [1, 1.5, 2];
```

型を指定すれば、配列の要素はそれ以外を受け付けなくなります。あらかじめ要素が含まれる状態で初期化した時も、あとから追加する時も型のチェックが働きます。

```typescript
const array: number[] = [1, 'nu'];
// -> Type 'string' is not assignable to type 'number'.
```

```typescript
const array: number[] = [];

array.push('nu');
// -> Argument of type '"nu"' is not assignable to parameter of type 'number'.
```

## 要素へのアクセス

配列のn番目の要素にアクセスするためには`array[n]`のように筆記します。これは他の言語でも大差ないと思いますがこの時は型のチェックが完全に働かないことに注意してください。

```typescript
const list: number[] = [0];

list[100000].toFixed();
```

上記例は明らかに100000番目には何も入っていませんが、このコードはTypeScriptは`number`型を返すものとして扱います。つまり型チェックに引っかからず`number`型にあるメソッドの`toFixed()`を入力できてしまいます。

TypeScriptでは配列が含まないn番目へのアクセスがあった時は、例外を投げずに`undefined`を返します。上記例は結果として後ろにある`toFixed()`で実行時エラーを起こします。

つまり、TypeScriptはこのように解釈しています。

```typescript
const element: T = array[n];
```

実際に返しうる戻り値の型はこのようになります。

```typescript
const element: T | undefined = array[n];
```

配列を不特定個数の集合と扱うのではなく、ただの有限個の入れ物として扱いたい時はタプルを使うことができます。

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

| メインライター | 対応スケジュール |
| :--- | :--- |
| jamashita | 03/06 執筆完了 |

