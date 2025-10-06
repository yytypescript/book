---
description: 暗黙のany型を禁ずる
tags: [strict]
---

# noImplicitAny

`noImplicitAny`は暗黙のany型を禁止するコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: -
- TypeScript公式が有効化推奨

## 暗黙のanyの問題点

型注釈もなく型推論もできない場合、TypeScriptは変数の型を`any`にします。これを暗黙のanyといいます。特に引数やプロパティで暗黙のanyになることが多いです。

```ts twoslash title="暗黙のanyが発生する例"
// @noImplicitAny: false
function foo(param) {}
//           ^?

class Bar {
  private prop;
  //      ^?
}
```

any型の変数には型チェックが無いため、バグの危険性が増します。

```ts twoslash
function increment(number) {
  console.log(number + 1);
}
increment("1");
// @log: "11"
increment(undefined);
// @log: NaN
// @noImplicitAny: false
```

## `noImplicitAny`で暗黙のanyを防ぐ

`noImplicitAny`を`true`にすると、変数が暗黙のanyになることを避けられます。TypeScriptは暗黙のanyになる変数を見つけると、警告を出すようになります。

```ts twoslash title="暗黙のanyが警告される例"
// @noImplicitAny: true
// @errors: 7006 7008
function foo(param) {}

class Bar {
  private prop;
}
```

## 関数の戻り値の型

関数の戻り値は、多くの場合は推論されるため暗黙の`any`にはなりません。したがって、戻り値に型注釈が無くても、`noImplicitAny`では警告されません（`noImplicitAny`の対象は「暗黙のany」だけです）。

```ts twoslash
function foo() {
  //     ^?
  return 1;
}
```

<PostILearned>

😢TypeScriptは型注釈がないOR型推論不能の場合、型をanyにする(暗黙のany)
🙅‍♂️noImplicitAnyは暗黙のanyを禁止するコンパイラオプション
😊これをtrueにすると暗黙のanyが警告される
✅有効化推奨のオプション

</PostILearned>

## 関連情報

[strict](./strict.md)

[any型](../values-types-variables/any.md)

[関数宣言](../functions/function-declaration.md)

[フィールド](../object-oriented/class/fields.md)
