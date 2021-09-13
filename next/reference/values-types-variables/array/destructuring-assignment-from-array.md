# 配列の分割代入 \(Destructuring assignment\)

配列は分割代入を使うことができます。

```typescript
const [alpha, bravo, charlie, delta, echo] = phone();
```

配列の中の配列も同様に分割代入を使えます。

```typescript
const [alpha, [bravo, [charlie, [delta, echo]]]] = phone();
```

先頭からではなく、特定番目だけ欲しい時は次のように書くこともできます。

```typescript
const [,,, delta, echo] = phone();
```

残余引数を使うこともできます。次の例では`alpha`が`T`型で`rest`は`T[]`型になります。

```typescript
const [alpha, ...rest] = phone();
```

