# 🚧例外処理

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

TypeScriptのコンパイラーオプションの`useUnknownInCatchVariables`を有効にすると、catchの変数の型が`unknown`型になります。「どんな値がthrowされるか分からない」ことを型として正確に表現できるため、より型安全にしたい場合は、このオプションを有効化すると良いでしょう。

{% page-ref page="../tsconfig/strict-type-checks/useunknownincatchvariables.md" %}

{% page-ref page="../values-types-variables/undefined.md" %}

### catchの分岐

TODO:

* JavaやPHPにある複数catchはJSにはない
  * JSで型ごとにcatchを分岐するには？

### try-catchはブロックスコープ

TODO

### finally

TODO

