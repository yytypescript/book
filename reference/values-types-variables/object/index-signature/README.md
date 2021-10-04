# インデックス型 \(index signature\)

TypeScriptで、オブジェクトのフィールド名をあえて指定せず、プロパティのみを指定したい場合があります。そのときに使えるのがこのインデックス型\(index signature\)です。たとえば、プロパティがすべて`number`型であるオブジェクトは次のように型注釈します。

```typescript
let obj: {
};
```

フィールド名の表現部分が`[K: string]`です。この`K`の部分は型変数です。任意の型変数名にできます。`K`や`key`にするのが一般的です。`string`の部分はフィールド名の型を表します。インデックス型のフィールド名の型は`string`、`number`、`symbol`のみが指定できます。

インデックス型のオブジェクトであれば、フィールド名が定義されていないプロパティも代入できます。たとえば、インデックス型`{ [K: string]: number }`には、値がnumber型であれば、`a`や`b`など定義されていないフィールドに代入できます。

```typescript
let obj: {
};

obj = { a: 1, b: 2 }; // OK
obj.c = 4; // OK
obj["d"] = 5; // OK
```

コンパイラーオプションの`noUncheckedIndexedAccess`を有効にした場合、インデックス型では、プロパティの型は自動的にプロパティに指定した型とundefined型のユニオン型になります。これは、プロパティが存在しないときに、値が`undefined`になるのを正確に型で表すためです。

```typescript
const obj: { [K: string]: number } = { a: 1 };
const b: number | undefined = obj.b;
console.log(b); //=> undefined
```

{% page-ref page="../../../tsconfig/additional-checks/nouncheckedindexedaccess.md" %}

## Record&lt;K, T&gt;を用いたインデックス型

インデックス型は`Record<K, T>`ユーティリティ型を用いても表現できます。次の2つの型注釈は同じ意味になります。

```typescript
let obj1: { [K: string]: number };
let obj2: Record<string, number>;
```

{% page-ref page="../../../type-reuse/utility-types/record.md" %}

