# アロー関数 \(arrow function\)

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

## アロー関数の型注釈

アロー関数でも型指定の方法は関数宣言と同様です。

```typescript
const increment = (num: number): number => num + 1;
```

アロー関数で括弧を省略した記述をした場合には、**引数と戻り値に型を指定できない**ので注意してください。

```typescript
const increment = num => num + 1;
```

また`noImplicitAny`を `true` に設定している場合は、引数の型指定が必須となるため括弧を省略したアロー関数の記述自体が出来なくなります。

```typescript
// TypeError: Parameter 'num' implicitly has an 'any' type
const increment = num => num + 1;
```

