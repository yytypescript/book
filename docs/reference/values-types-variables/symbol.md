---
sidebar_label: シンボル型
---

# シンボル型 (symbol type)

JavaScriptのシンボル型(symbol type)は、プリミティブ型の一種で、その値が一意になる値です。論理型や数値型は値が同じであれば、等価比較が`true`になります。一方、シンボルはシンボル名が同じであっても、初期化した場所が違うと`false`になります。

```js twoslash
const s1 = Symbol("foo");
const s2 = Symbol("foo");
console.log(s1 === s1);
// @log: true
console.log(s1 === s2);
// @log: false
```

Rubyにもシンボルという名前の型があります。Rubyのシンボルは値さえ同じなら、書いてある場所が異なっても等価比較が`true`になります。

```ruby
# Rubyコード
s1 = :foo
s2 = :foo
p s1 == s2 #=> true
```

一方、JavaScriptでは前述のとおり、シンボルを初期化した場所で決まるので、Rubyから来た方は注意してください。Rubyのシンボル的なことは、JavaScriptやTypeScriptでは文字列を用いて解決します。

## シンボルの型注釈

TypeScriptでシンボルの型注釈は`symbol`を用います。

```ts
const s: symbol = Symbol();
```

## シンボルの用途

JavaScriptにシンボルが導入された動機は、JavaScriptの組み込みAPIの下位互換性を壊さずに新たなAPIを追加することでした。要するに、JavaScript本体をアップデートしやすくするために導入されたものです。したがって、アプリケーションを開発する場合に限っては、シンボルを駆使してコードを書く機会はそう多くはありません。
