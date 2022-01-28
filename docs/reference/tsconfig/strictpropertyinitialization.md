---
description: クラスプロパティの初期化を必須にする
tags: [strict]
---

# strictPropertyInitialization

`strictPropertyInitialization`はクラスプロパティの初期化を必須にするコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: 2.7
- TypeScript公式が有効化推奨

:::caution

このオプションを効かすには[`strictNullChecks`](./strictnullchecks.md)も`true`する必要があります。

:::

## 解説

`strictPropertyInitialization`を`true`にすると、値が初期化されていないクラスプロパティについて警告を出します。

```ts twoslash
// @errors: 2564
class Foo {
  prop: number;
}
```

初期化は、次のいずれかで行う必要があります。

1. コンストラクタで初期化
1. 初期化子で初期化
1. undefinedとのユニオン型で型注釈する

次は、コンストラクタで初期化する例です。

```ts twoslash
class Foo {
  prop: number;

  constructor() {
    this.prop = 1;
  }
}
```

次は、[初期化子](../object-oriented/class/field-initializers.md)で初期化する例です。

```ts twoslash
class Foo {
  prop: number = 1;
  //           ^^^初期化子
}
```

プロパティの型が`undefined`との[ユニオン型](../values-types-variables/union.md)の場合、初期化しなくても警告が出ません。

```ts twoslash
class Foo {
  prop: number | undefined;
}
```

プロパティがオプションの場合も警告が出ません。

```ts twoslash
class Foo {
  prop?: number;
}
```

<TweetILearned>

TypeScriptのstrictPropertyInitializationはプロパティの初期化を必須にするコンパイラオプション。

⚠️strictNullChecksもtrueする必要あり
✅コンストラクタで初期化OR初期化子が必須になる
🙆🏻‍♂️undefinedとのユニオン型で型注釈するのはOK

</TweetILearned>

## 関連情報

[strict](./strict.md)

[フィールド (field)](../object-oriented/class/fields.md)
