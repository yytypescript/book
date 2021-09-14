# 関数宣言 \(function declaration\)

## 関数宣言構文

JavaScriptの関数宣言はfunction構文を使います。

```javascript
function hello() {
  return "hello";
}
```

## 関数宣言構文の型注釈

TypeScriptでは関数宣言の引数と戻り値に型注釈を書けます。

```typescript
function increment(num: number): number {
  return num + 1;
}
```

引数の型注釈を省略した場合、コンパイラーは`any`型と暗黙的に解釈します。

```typescript
function increment(num): number {
  // このnumはany型です
  return num + 1;
}
```

コンパイラーオプションの`noImplicitAny`を`true`に設定することで、引数の型注釈を必須にできます。

```typescript
// TypeError: Parameter 'num' implicitly has an 'any' type
function increment(num): number {
  return num + 1;
}
```

{% page-ref page="../tsconfig/strict-type-checks/noimplicitany.md" %}

戻り値の型注釈を省略した場合、コンパイラーがコードから型推論します。

```typescript
function increment(num: number) {
  return num + 1;
}

// TypeError: Type 'number' is not assignable to type 'string'.
const value: string = increment(1);
```

