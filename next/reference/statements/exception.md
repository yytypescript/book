# 🚧例外処理

JavaScriptにはJavaに似た例外処理の構文があります。例外には`Error`オブジェクトを使い、throw構文で例外を投げます。try-catch構文で例外を捕捉できます。

```javascript
try {
  throw new Error("something wrong");
} catch (e) {
  console.log(e.message); //=> "something wrong"
}
```





TODO: 次の内容を説明する。

* throw構文\(例外の投げ方\)
* throwできるものはErrorに限らないこと
  * Error以外を投げるのは本書としては非推奨の旨
    * 主な理由はスタックトレースが追えない

TODO: 下記内容について書く

* tryはブロックスコープ
* catchの型注釈の書き方
* JavaやPHPにある複数catchはJSにはない
  * JSで型ごとにcatchを分岐するには？
* finally

