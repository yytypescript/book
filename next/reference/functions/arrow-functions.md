# アロー関数 \(arrow functions\)

関数にはもうひとつの書き方があります。それがアロー関数です。

```javascript
// function式を用いた関数式
const hello = function (name) {
  return `Hello, ${name}!`;
};

// アロー関数の関数式
const hello = (name) => {
  return `Hello, ${name}!`;
};
```

アロー関数は`function`式に比べて短く書けるのが特徴的です。上の`hello`関数はさらに引数のカッコや`return`を省略して書くこともできます。

```javascript
const hello = name => `Hello, ${name}!`;
```

`return` を省略したアロー関数でオブジェクトリテラルを返したい時はそのまま返すことができません。

```typescript
const func = () => {x: 1};

console.log(func());
// -> undefined
```

このときはオブジェクトリテラルを`()` で括ることで返すことができます。

```typescript
const func = () => ({x: 1});

console.log(func());
// -> { x: 1 }
```



