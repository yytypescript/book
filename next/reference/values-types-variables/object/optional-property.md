# オブジェクト型のオプショナルプロパティ \(optional property\)

TypeScriptで、オブジェクトプロパティのオプショナルさを型付けするには、プロパティ名の後ろに`?`を書きます。

```typescript
let size: { width?: number };
```

オプショナルプロパティを持ったオブジェクト型には、そのオプショナルプロパティを持たないオブジェクトを代入できます。

```typescript
size = {}; // OK
```

また、オプショナルプロパティの値が`undefined`のオブジェクトも代入できます。

```typescript
size = { width: undefined }; // OK
```

しかし、オプショナルプロパティの値が`null`の場合は代入できません。

```typescript
size = { width: null }; // コンパイルエラー
```

