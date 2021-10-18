# noImplicitThis

**リリースされたバージョン: 2.0**

名前付き関数、匿名関数はアロー関数と異なり、実行時に`this`が決定されます。そのため、内部で`this`を使っているとそれらは関数を書いている時点では`any`型と同じ扱いになります。

たとえば、対角線の長さを求める関数 `lengthOfDiagonal()` を考えます。\(横, 縦\)を \(width, height\) とすれば関数は次のようになります。

```typescript
function lengthOfDiagonal(): number {
  return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
}
```

これを `width, height` をプロパティに持つオブジェクトのインスタンスに代入すれば対角線の長さを計算できます。

```typescript
const area = {
  width: 3,
  height: 4,
  diagonal: lengthOfDiagonal
};

console.log(area.diagonal());
// -> 5
```

このとき、打ち間違いで `width` を `witch` としてしまったとするとこの関数は意図した結果を返さなくなります。

```typescript
const area = {
  witch: 3,
  height: 4,
  diagonal: lengthOfDiagonal
};

console.log(area.diagonal());
// -> NaN
```

このオプションを有効にすると `any` 型として認識されてしまっている `this` がどの型であるかを明確にできない限り実行することができなくなります。

```typescript
error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
         ~~~~
error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
                             ~~~~
```

これを回避するためには `this`が何かを明示します。引数の`this`については関数のページに詳細がありますので併せてご参照ください。

{% page-ref page="../functions/this-parameters.md" %}

```typescript
type Area = {
  width: number;
  height: number;
  diagonal(): number;
};

function lengthOfDiagonal(this: Area): number {
  return ((this.width ** 2) + (this.height ** 2)) ** (1/2);
}

const area: Area = {
  width: 3,
  height: 4,
  diagonal: lengthOfDiagonal
};
```

## \`\`

