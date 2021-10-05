# 例外処理 \(exception\)

JavaScriptにはJavaに似た例外処理の構文があります。例外には`Error`オブジェクトを使い、throw構文で例外を投げます。try-catch構文で例外を捕捉できます。

```javascript
try {
  throw new Error("something wrong");
} catch (e) {
  console.log(e.message); //=> "something wrong"
}
```

## throw構文

JavaScriptのthrowは例外を投げる構文です。例外として投げるオブジェクトはErrorオブジェクトを使うのが一般的です。

```javascript
throw new Error("network error!");
```

JavaScriptのthrowはJavaなどと異なり、何でも投げることができます。プリミティブ型でさえ投げれます。

```javascript
throw "just a string";
```

これはアンチパターンです。throwが何でも投げられるとしても、Errorオブジェクトを用いるべきです。Errorオブジェクトを使ったほうがコードの読み手に意外性を与えないからです。加えて、スタックトレースが追えるのはErrorオブジェクトだけだからです。

## try-catch構文

JavaScriptで例外を捉えるにはtry-catch構文を使います。例外が投げられる可能性がある部分をtryブロックで囲み、catchブロックで捉えた例外に対する処理を行います。

```javascript
try {
  throw new Error("something wrong");
} catch (e) {
  console.error(e);
}
```

### catchの型

TypeScriptではcatchの変数の型はデフォルトで`any`型になります。

```typescript
try {
  // ...
} catch (e) {
  // eはany型になる
}
```

型が`Error`オブジェクトの型ではなく`any`型になるのは、JavaScriptの仕様上どんな値がthrowされるか分からないためです。

TypeScriptのコンパイラーオプションの`useUnknownInCatchVariables`を有効にすると、catchの変数の型が`unknown`型になります。「どんな値がthrowされるか分からない」ことを型として正確に表現できるため、より型安全にしたい場合は、このオプションを有効化するとよいでしょう。

{% page-ref page="../tsconfig/useunknownincatchvariables.md" %}

{% page-ref page="../values-types-variables/undefined.md" %}

### catchの分岐

JavaやPHPでは捉えるエラーの型に対応するcatchを複数書けますが、JavaScriptとTypeScriptではcatchは1つしか書けません。JavaScriptでエラーの型によってエラーハンドリングを分岐したい場合は、catchブロックの中で分岐を書く方法で対応します。

```typescript
try {
  // ...
} catch (e) {
  if (e instanceof TypeError) {
    // TypeErrorに対する処理
  } else if (e instanceof RangeError) {
    // RangeErrorに対する処理
  } else if (e instanceof EvalError) {
    // EvalErrorに対する処理
  } else {
    // その他のエラー
  }
}
```

### try-catchはブロックスコープ

JavaScriptのtry-catch文内の変数はブロックスコープになります。そのため、try-catch内で宣言された変数は、try-catchの外では参照できません。

```typescript
async function fetchData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data); // dataが参照できる
  } catch (e: unknown) {
    return;
  }
  console.log(data); // dataが参照できない
}

fetchData();
```

{% page-ref page="variable-scope.md" %}

try-catch文の外でも変数を参照したい場合は、tryの前に代入用の変数をlet宣言しておく必要があります。

```typescript
async function fetchData() {
  let data: any;
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    data = await res.json();
  } catch (e: unknown) {
    return;
  }
  console.log(data); // dataが参照できる
}

fetchData();
```

### finallyブロック

JavaScriptにもJavaやPHPと同じようにfinallyが書けます。finallyは例外が発生しようがしまいが必ず実行される処理です。finallyはtry-catchの後に書きます。finally内の処理はtryとcatchの処理が実行された後に実行されます。

```javascript
try {
  // ...
} catch (e) {
  // ...
} finally {
  // ...
}
```

