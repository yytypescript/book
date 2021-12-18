---
sidebar_label: 判別可能なユニオン型
---

# 判別可能なユニオン型 (discriminated union)

TypeScriptの判別可能なユニオン型は、ユニオンに属する各オブジェクトの型を区別するための「しるし」がついた特別なユニオン型です。オブジェクト型からなるユニオン型を絞り込む際に、分岐ロジックが複雑になる場合は、判別可能なユニオン型を使うとコードの可読性と保守性がよくなります。

## 通常のユニオン型は絞り込みが複雑になる

TypeScriptの[ユニオン型](./union.md)は自由度が高く、好きな型を組み合わせられます。次の`UploadStatus`はファイルアップロードの状況を表現したユニオン型です。アップロード中`InProgress`、アップロード成功`Success`、アップロード失敗`Failure`の組み合わせです。

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
```

`UploadStatus`の各状態を整理したのが次の表です。

| 型           | 意味             | `done`  | `progress` |  `error`   |
| ------------ | ---------------- | :-----: | :--------: | :--------: |
| `InProgress` | アップロード中   | `false` | 進捗率(%)  |     -      |
| `Success`    | アップロード成功 | `true`  |     -      |     -      |
| `Failure`    | アップロード失敗 | `true`  |     -      | エラー詳細 |

状態を表示する関数を実装してみます。

```ts twoslash
// @errors: 2339
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.done === false) {
    console.log(`アップロード中:${status.progress}%`);
  }
}
```

この実装は、`done`が`false`であることをチェックしています。不具合はないはずです。しかし、コンパイラーには`progress`が無いと警告されます。これは、if分岐内でも、`status`が`Success`や`Failure`かもしれないとコンパイラーが考えるためです。

このエラーを解消するには、`progress`があることをチェックする必要があります。そうすると、コンパイラーはif分岐内の`status`は`InProgress`だと判断します。

```ts twoslash {2}
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.done === false && "progress" in status) {
    //                         ^^^^^^^^^^^^^^^^^^^^追加
    console.log(`アップロード中:${status.progress}%`);
    // コンパイルエラーが解消！
  }
}
```

コンパイルエラーを起こさないように、すべての状態に対応した関数が次です。

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.done) {
    if ("error" in status) {
      console.log(`アップロード失敗:${status.error.message}`);
    } else {
      console.log("アップロード成功");
    }
  } else if ("progress" in status) {
    console.log(`アップロード中:${status.progress}%`);
  }
}
```

どうでしょうか。このコードはなんだかごちゃついていませんか。あまり読みやすいとは言えないかもしれません。こうしたオブジェクトのユニオン型は、判別可能なユニオン型に書き直すとよいです。読みやすく、保守性も良くなります。

## 判別可能なユニオン型とは？

TypeScriptの判別可能なユニオン型(discriminated union)はユニオン型の応用です。判別可能なユニオン型は、タグ付きユニオン(tagged union)や直和型と呼ぶこともあります。

判別可能なユニオン型は次の特徴を持ったユニオン型です。

1. オブジェクト型で構成されたユニオン型
1. 各オブジェクト型を判別するためのプロパティ(しるし)を持つ
   - このプロパティのことをディスクリミネータ(discriminator)と呼ぶ
1. ディスクリミネータの型は[リテラル型](./literal-types.md)などであること
1. ディスクリミネータさえ有れば、各オブジェクト型は固有のプロパティを持ってもよい

たとえば、上の`UploadStatus`を判別可能なユニオン型に書き直すと、次のようになります。

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { type: "InProgress"; progress: number };
type Success = { type: "Success" };
type Failure = { type: "Failure"; error: Error };
```

これを表に整理したのが次です。

| 型           | 意味             | ディスクリミネータ   | `progress` |  `error`   |
| ------------ | ---------------- | -------------------- | :--------: | :--------: |
| `InProgress` | アップロード中   | `type: "InProgress"` | 進捗率(%)  |     -      |
| `Success`    | アップロード成功 | `type: "Success"`    |     -      |     -      |
| `Failure`    | アップロード失敗 | `type: "Failure"`    |     -      | エラー詳細 |

変わった点といえば、`done: boolean`がなくなり、`type`というディスクリミネータが追加されたところです。`type`の型が`string`ではなく、`InProgress`などのリテラル型になったことも重要な変更点です。

## 判別可能なユニオン型の絞り込み

判別可能なユニオン型は、ディスクリミネータを分岐すると型が絞り込まれます。

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { type: "InProgress"; progress: number };
type Success = { type: "Success" };
type Failure = { type: "Failure"; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.type === "InProgress") {
    console.log(`アップロード中:${status.progress}%`);
    //                          ^?
  } else if (status.type === "Success") {
    console.log("アップロード成功", status);
    //                           ^?
  } else if (status.type === "Failure") {
    console.log(`アップロード失敗:${status.error.message}`);
    //                           ^?
  } else {
    console.log("不正なステータス: ", status);
  }
}
```

switch文で書いても同じく絞り込みをコンパイラーが理解します。

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { type: "InProgress"; progress: number };
type Success = { type: "Success" };
type Failure = { type: "Failure"; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  switch (status.type) {
    case "InProgress":
      console.log(`アップロード中:${status.progress}%`);
      break;
    case "Success":
      console.log("アップロード成功", status);
      break;
    case "Failure":
      console.log(`アップロード失敗:${status.error.message}`);
      break;
    default:
      console.log("不正なステータス: ", status);
  }
}
```

判別可能なユニオン型を使ったほうが、コンパイラーが型の絞り込みを理解できます。その結果、分岐処理が読みやすく、保守性も高くなります。

## ディスクリミネータに使える型

ディスクリミネータに使える型は、リテラル型と`null`、`undefined`です。

- リテラル型
  - 文字列リテラル型: (例)`"success"`、`"OK"`など
  - 数値リテラル型: (例)`1`、`200`など
  - 論理値リテラル型: `true`または`false`
- `null`
- `undefined`

上の`UploadStatus`では、文字列リテラル型をディスクリミネータに使いました。リテラル型には数値と論理値もあります。これらもディスクリミネータに使えます。

```ts twoslash title="数値リテラル型のディスクリミネータ"
type OkOrBadRequest =
  | { statusCode: 200; value: string }
  | { statusCode: 400; message: string };

function handleResponse(x: OkOrBadRequest) {
  if (x.statusCode === 200) {
    console.log(x.value);
  } else {
    console.log(x.message);
  }
}
```

```ts twoslash title="論理値リテラル型のディスクリミネータ"
// prettier-ignore
type OkOrNotOk = 
  | { isOK: true; value: string } 
  | { isOK: false; error: string };

function handleStatus(x: OkOrNotOk) {
  if (x.isOK) {
    console.log(x.value);
  } else {
    console.log(x.error);
  }
}
```

`null`と非nullの関係にある型もディスクリミネータになれます。次の例では、`error`プロパティが`null`または`Error`で、null・非nullの関係が成り立っています。

```ts twoslash
// prettier-ignore
type Result = 
  | { error: null; value: string } 
  | { error: Error };

function handleResult(result: Result) {
  if (result.error === null) {
    console.log(result.value);
  } else {
    console.log(result.error);
  }
}
```

同様に`undefined`もundefined・非undefinedの関係が成り立つプロパティは、ディスクリミネータになります。

```ts twoslash
// prettier-ignore
type Result = 
  | { error: undefined; value: string } 
  | { error: Error };

function handleResult(result: Result) {
  if (result.error) {
    console.log(result.error);
  } else {
    console.log(result.value);
  }
}
```

## ディスクリミネータを変数に代入する場合

ディスクリミネータを変数に代入し、その変数を条件分岐に使った場合も、型の絞り込みができます。

```ts twoslash
type Shape =
  | { type: "circle"; color: string; radius: number }
  | { type: "square"; color: string; size: number };

function toCSS(shape: Shape) {
  const { type, color } = shape;
  //      ^^^^ディスクリミネータ
  switch (type) {
    case "circle":
      return {
        background: color,
        borderRadius: shape.radius,
        //            ^?
      };

    case "square":
      return {
        background: color,
        width: shape.size,
        height: shape.size,
        //      ^?
      };
  }
}
```

<TweetILearned>

🦄TypeScriptの判別可能なユニオン型
・ディスクリミネータを持つオブジェクト型からなるユニオン型
・if/switch分岐で型が絞り込みやすい

🏷ディスクリミネータ
・各オブジェクト共通のプロパティキー(しるし的なもの)
・使える型は、リテラル型、null、undefined

</TweetILearned>

## 関連情報

[ユニオン型 (union type)](./union.md)
