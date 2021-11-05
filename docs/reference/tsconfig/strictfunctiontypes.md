# 🚧strictFunctionTypes

リリースされたバージョン: 2.6

オブジェクト指向では、スーパークラスに対しサブクラスのインスタンスを代入することはできますがその逆は一般的ではありません。
たとえばJavaScriptの`Error`クラスを拡張しスタックトレースを出力できるようになった`RuntimeError`というクラスを用意します。ここではスタックトレースの実装は重要ではないので`stacktrace()`というメソッドが加わったとだけ解釈してください。

```typescript
class RuntimeError extends Error {
  public stacktrace(): string {
    return "...";
  }
}
```

`RuntimeError`クラスのスタックトレースを出力する関数`dumpRuntimeError()`を定義します。当然ながら`RuntimeError`のインスタンスは代入できますがスーパークラスの`Error`を代入することはできません。

```typescript
function dumpRuntimeError(err: RuntimeError): void {
  console.log(err.stacktrace());
}

dumpRuntimeError(new RuntimeError("runtime error"));
dumpRuntimeError(new Error("error"));
```

```text
error TS2345: Argument of type 'Error' is not assignable to parameter of type 'RuntimeError'.
  Property 'stacktrace' is missing in type 'Error' but required in type 'RuntimeError'.

errorDump(new Error('error'));
          ~~~~~~~~~~~~~~~~~~
```

しかしながら`dumpRuntimeError`型の部分型である`dumpError`という型を定義したとすると、次の代入が成り立ちます。

```typescript
type dumpError = (err: Error) => void;
const dumpError: dumpError = dumpRuntimeError;
```

この関数`dumpError()`に`Error`型のインスタンスを代入すると`Error`型には`stacktrace()`というメソッドがないため実行時エラーになります。

このオプションを有効にすることで関数の引数の方は厳密に評価されるようになります。そのクラスまたはサブクラス以外を代入することはできなくなります。

```text
error TS2322: Type '(err: RuntimeError) => void' is not assignable to type 'dumpError'.
  Types of parameters 'err' and 'err' are incompatible.
    Property 'stacktrace' is missing in type 'Error' but required in type 'RuntimeError'.

const dumpError: dumpError = dumpRuntimeError;
      ~~~~~~~~~
```

TODO: 次について書く

- メソッド構文(method syntax)には効かない
- 関数構文(function syntax)にだけ効く
- TSの引数は元々bivariant仕様
- strictFunctionTypesはそれをcontravariantにする
- メソッドまでやると互換性的に問題がある
- なのでメソッドは除外しbivariantのまま
