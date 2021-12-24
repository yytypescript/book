# JavaScriptはTypeScriptの一部

TypeScriptの文法はJavaScriptの文法を拡張したものです。TypeScriptで拡張された文法は、主に型に関する部分です。それ以外のほとんどの文法はJavaScriptに由来するものです。そのため、素のJavaScriptもTypeScriptとして扱うことができます。たとえば、次のコードは100%JavaScriptのものですが、これをTypeScriptコンパイラーは解析でき、静的な検査が行なえます。

```js twoslash
const hello = "Hello";
const world = "World";
console.log(hello + " " + world);
// @log: "Hello World"
```

TypeScriptから見ると、JavaScriptはTypeScriptの一部と言えます。そのため、TypeScriptを十分に理解するには、JavaScriptの理解が欠かせません。まだJavaScriptをよく分かっていない場合は、TypeScriptの学習と平行してJavaScriptも学ぶ必要があります。本書はTypeScript入門者向けですが、TypeScriptの理解に欠かせないJavaScriptの文法や仕様についても同時に学べるようになっています。
