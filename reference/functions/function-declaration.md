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

{% page-ref page="../tsconfig/noimplicitany.md" %}

次の例のように定義済みの関数プロパティに再代入する形で関数を上書きする場合は`button.onclick`の引数`event`の型が`MouseEvent`と定義されているため、その型情報から代入する関数の引数の型を省略しても、`event`の型を`MousetEvent`と推論してくれます。

```typescript
const button = document.createElement('button');

// event は MouseEvent型になる
button.onclick = function(event) {
    console.log(event.target);

    // Property 'hoge' does not exist on type 'MouseEvent'.(2339)
    console.log(event.hoge);
}
```

戻り値の型注釈を省略した場合、コンパイラーがコードから型推論します。

```typescript
function increment(num: number) {
  return num + 1;
}

// TypeError: Type 'number' is not assignable to type 'string'.
const value: string = increment(1);
```

`return`が複数あり違う型を返している場合推論される型はユニオン型になります。

```typescript
type Person = {
  age?: number;
};

// 戻り値の型はnumber | null型
function getAge(person: Person) {
  if (typeof person.age === 'undefined') {
    return null;
  }

  return person.age;
}
```

