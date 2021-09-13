# アロー関数 \(arrow functions\)

関数式にはもうひとつの書き方があります。それがアロー関数です。

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

アロー関数は関数式をより手軽に書けるものですが、厳密にはアロー関数は書き方が違うだけではありません。が、まずはアロー関数が`function`式の代替えとして、多くの場合、使えることを覚えておくとよいです。それを知った上で、2つの違いを詳しく知りたい方は「[通常の関数とアロー関数の違いは「書き方だけ」ではない。異なる性質が10個ほどある](https://qiita.com/suin/items/a44825d253d023e31e4d)」の解説を御覧ください。

