# 🚧型エイリアス \(type alias\)

TypeScriptでは、型に名前をつけられます。名前のついた型を型エイリアス\(type alias\)と呼びます。

## 型エイリアスの宣言

型エイリアスを宣言するには`type`キーワードを使います。次の例は、`string | number`型に`StringOrNumber`という型名を名付けたものです。

```typescript
type StringOrNumber = string | number;
```

型エイリアスは、`string`などのビルトインの型と同様に、型注釈などで使えます。

```typescript
const value: StringOrNumber = 123;
```

## 型エイリアスの使用例

型エイリアスは様々な型に名前をつけられます。型エイリアスの一例を次に示します。

```typescript
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

## 関連情報

{% page-ref page="../object-oriented/interface/interface-vs-type-alias.md" %}

