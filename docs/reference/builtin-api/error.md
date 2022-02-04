---
title: Error
---

`Error`はJavaScriptの組み込みAPIのひとつで例外を取り扱うためのオブジェクトです。

## Errorオブジェクトの作り方

`Error`オブジェクトを作るには`Error`クラスを`new`します。例外を投げるためには`throw`を使います。

```ts
throw new Error();
```

## JavaScriptではErrorクラス以外も例外としてthrowできる

とはいえ、JavaScriptでは例外を表す`Error`クラスとそのサブクラスだけを`throw`できるのではなく、どのような値も`throw`できます。

```ts
throw "id is not string!";
```

## Errorクラスのサブクラス

組み込みAPIとして`Error`には次のサブクラスがあります。

- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

また`Error`を拡張し独自のサブクラスを定義することもできます。

```ts twoslash
class CustomeError extends Error {
  public constructor(message?: string) {
    super(message);
  }
}

const err: CustomeError = new CustomeError("FAILED!");

console.log(err.name);
// @log: "Error"
console.log(err.message);
// @log: "FAILED!"
console.log(err.stack);
// @log: "Error: FAILED! ..."
```

## 例外を捕捉する

`throw`された例外は`catch`で捕捉できます。ですが先ほど述べたようにJavaScriptはどのような値も`throw`できるので`catch`した値の型は定まらず`any`型か`unknown`型として解釈されます。どちらの型になるかはtsconfig.jsonの`useUnknownInCatchVariables`の設定により決まります。

[useunknownincatchvariables](../tsconfig/useunknownincatchvariables.md)

もし捕捉した値があるクラスのインスタンスまたはある型であるかを判定したい場合は`instanceof`, `keyof`あるいは型ガードを使います。

```ts
try {
  // ...
} catch (e) {
  if (e instanceof Error) {
    // ...
  }
}
```
