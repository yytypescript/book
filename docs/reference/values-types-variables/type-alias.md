---
sidebar_label: 型エイリアス
---

# 型エイリアス (type alias)

TypeScriptでは、型に名前をつけられます。名前のついた型を型エイリアス(タイプエイリアス; type alias)と呼びます。

## 型エイリアスの宣言

型エイリアスを宣言するには`type`キーワードを使います。次の例は、`string | number`型に`StringOrNumber`という型名を名付けたものです。

```ts
type StringOrNumber = string | number;
```

型エイリアスは、`string`などのビルトインの型と同様に、変数や引数、戻り値の型注釈などで使えます。

```ts
const value: StringOrNumber = 123;
```

## 型エイリアスの使用例

型エイリアスはさまざまな型に名前をつけられます。型エイリアスの一例を次に示します。

```ts
// プリミティブ型
type String = string;
// リテラル型
type OK = 200;
// 配列型
type Numbers = number[];
// オブジェクト型
type UserObject = { id: number; name: string };
// ユニオン型
type NumberOrNull = number | null;
// 関数型
type CallbackFunction = (value: string) => boolean;
```

## 型エイリアスの使い道

型エイリアスは同じ型を再利用したいときに使うと便利です。型の定義が一箇所になるため、保守性が向上します。

また、型に名前を与えることで可読性が上がる場合があります。型に名前があると、その型が何を意味しているのかがコードの読み手に伝わりやすくなります。

## 関連情報

[🚧interfaceとtypeの違い](../object-oriented/interface/interface-vs-type-alias.md)
