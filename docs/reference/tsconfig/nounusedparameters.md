# noUnusedParameters

**リリースされたバージョン: 2.0**

関数で使用していない引数を禁止します。

```typescript
function add(n1: number, n2: number, n3: number): number {
  return n1 + n2;
}
```

このオプションを有効にすると次のようなエラーが発生します。

```text
error TS6133: 'n3' is declared but its value is never read.

function add(n1: number, n2: number, n3: number): number {
                                     ~~
```

これを回避するためには、使用していない引数を`_`で始まる名前に変更します。

```typescript
function add(n1: number, n2: number, _n3: number): number {
  return n1 + n2;
}
```
