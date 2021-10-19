# オブジェクト型のオプショナルプロパティ \(optional property\)

TypeScriptで、オブジェクトプロパティのオプショナルさを型付けするには、プロパティ名の後ろに`?`を書きます。

```typescript
let size: { width?: number };
```

オプションプロパティを持ったオブジェクト型には、そのオプションプロパティを持たないオブジェクトを代入できます。

```typescript
size = {}; // OK
```

また、オプションプロパティの値が`undefined`のオブジェクトも代入できます。

```typescript
size = { width: undefined }; // OK
```

しかし、オプションプロパティの値が`null`の場合は代入できません。

```typescript
size = { width: null }; // コンパイルエラー
```

## 関連情報

{% page-ref page="optional-chaining.md" %}

