# bigint型

JavaScriptのbigint型は、数値型よりも大きな整数を扱えるプリミティブ型です。

## bigint型リテラル

bigint型のリテラルは整数値の末尾に`n`をつけて書きます。

```javascript
const x = 100n;
```

## bigint型の型注釈

TypeScriptでbigint型を型注釈するには、`bigint`を用います。

```typescript
const x: bigint = 100n;
```

## bigint型を数値型と計算する

bigint型と数値型はそのままでは一緒に演算をすることはできません。どちらかに型を合わせる必要があります。

```typescript
2n + 3 // Operator '+' cannot be applied to types '2n' and '3'.
```

数値型が小数部を持っていない限り、より表現幅の広いbigint型に合わせる方が無難です。

```typescript
2n + BigInt(3) //=> 5n
```

