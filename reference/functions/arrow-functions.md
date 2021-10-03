# アロー関数 \(arrow function\)

JavaScriptの関数は関数式に加えて、もうひとつの書き方があります。それがアロー関数\(arrow function\)です。

```javascript
// 関数式
const hello = function (name) {
  return `Hello, ${name}!`;
};

// アロー関数
const hello = (name) => {
  return `Hello, ${name}!`;
};
```

アロー関数は関数式に比べて短く書けるのが特徴的です。引数が1つだけの場合は、引数の括弧が省略できます。

```javascript
const hello = name => {
  return `Hello, ${name}!`;
};
```

更に、関数内のコードが式1つだけの場合は、ブレースと`return`が省略できます。

```javascript
const hello = name => `Hello, ${name}!`;
```

`return` を省略したアロー関数でオブジェクトリテラルを返したい時はそのまま返すことができません。

```typescript
const func = () => {x: 1}; // この書き方は誤り
console.log(func());
//=> undefined
```

このときはオブジェクトリテラルを`()` で括ることで返すことができます。

```typescript
const func = () => ({ x: 1 });
console.log(func());
//=> { x: 1 }
```

## アロー関数の型注釈

TypeScriptでのアロー関数の型注釈は関数宣言と同様です。

```typescript
const increment = (num: number): number => num + 1;
```

アロー関数で括弧を省略した記述をした場合には、**引数と戻り値のどちらも型注釈を書けません。**

```typescript
const increment = num => num + 1;
```

コンパイラーオプションで`noImplicitAny`を有効にしている場合は、引数の型注釈が必須となるため、括弧を省略したアロー関数の記述自体が出来なくなります。

```typescript
const increment = num => num + 1;
//                ^^^ Parameter 'num' implicitly has an 'any' type.(7006)
```

{% page-ref page="../tsconfig/strict-type-checks/noimplicitany.md" %}

`noImplicitAny`が有効になっていても、関数引数に直接アロー関数を書く場合は型注釈を省略できます。

```typescript
[1, 2, 3].map(num => num + 1);
```

## 関連情報

{% page-ref page="function-expression-vs-arrow-functions.md" %}

{% page-ref page="function-expression.md" %}

