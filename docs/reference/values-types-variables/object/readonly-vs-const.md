# readonlyとconstの違い

JavaScriptでは、`const`で宣言した変数は代入不可になります。TypeScriptではオブジェクト型のプロパティに`readonly`修飾子をつけると、そのプロパティが代入不可になります。これら2つの機能は「代入不可」という点では似ています。ではこれらの違いは何でしょうか。

## constは変数への代入を禁止にするもの

`const`は変数への代入を禁止するものです。たとえば、`const`で宣言されたxに値を代入しようとすると、TypeScriptではコンパイルエラーになり、JavaScriptでは実行時エラーになります。

```typescript
const x = 1;
x = 2; // Cannot assign to 'x' because it is a constant.(2588)
```

`const`の代入禁止が効くのは変数そのものへの代入だけです。変数がオブジェクトだった場合、プロパティへの代入は許可されます。

```typescript
const x = { y: 1 };
x = { y: 2 }; // 変数そのものへの代入は不可
x.y = 2; // プロパティへの代入は許可
```

## readonlyはプロパティへの代入を禁止にするもの

TypeScriptの`readonly`はプロパティへの代入を禁止するものです。たとえば、`readonly`がついたプロパティxに値を代入しようとすると、コンパイルエラーになります。

```typescript
let obj: { readonly x: number } = { x: 1 };
obj.x = 2; // Cannot assign to 'x' because it is a read-only property.(2540)
```

一方、変数自体への代入は許可されます。

```typescript
let obj: { readonly x: number } = { x: 1 };
obj = { x: 2 }; // 許可される
```

## constとreadonlyの違い

`const`は変数自体を代入不可するものです。変数がオブジェクトの場合、プロパティへの代入は許可されます。一方、`readonly`はプロパティを代入不可にするものです。変数自体を置き換えるような代入は許可されます。以上の違いがあるため、`const`と`readonly`を組み合わせると、変数自体とオブジェクトのプロパティの両方を変更不能なオブジェクトを作ることができます。

```typescript
const obj: { readonly x: number } = { x: 1 };
obj = { x: 2 }; // Cannot assign to 'obj' because it is a constant.(2588)
obj.x = 2; // Cannot assign to 'x' because it is a read-only property.(2540)
```

## 関連情報

{% page-ref page="../let-and-const.md" %}

