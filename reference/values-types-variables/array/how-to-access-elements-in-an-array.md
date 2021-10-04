# 配列要素へのアクセス

## JavaScriptでの配列要素アクセス

JavaScriptの配列の要素にアクセスするにはブラケット`[]`を使います。ブラケットにはアクセスする要素のインデックス番号を書きます。インデックス番号は0始まりです。たとえば、`abc = ["a", "b", "c"]`の1つ目の要素にアクセスするには、`abc[0]`と書きます。

```javascript
const abc = ["a", "b", "c"];
console.log(abc[0]); //=> "a"
```

JavaScriptの配列では、存在しないインデックス番号でもアクセスできます。その場合でも、JavaScriptではエラーになりません。得られる値は`undefined`になります。

```javascript
const abc = ["a", "b", "c"];
console.log(abc[100]); //=> undefined
```

## TypeScriptの要素の型

TypeScriptでは、`Type[]`型の配列から要素を取り出したとき、その値の型は`Type`になります。たとえば、`string[]`型から0番目の要素の型は`string`になります。

```typescript
const abc: string[] = ["a", "b", "c"];
const character: string = abc[0];
```

JavaScriptでは存在しないインデックスで要素アクセスした場合、エラーにならず、代わりに`undefined`が得られると説明しましたが、TypeScriptでも不在要素へのアクセスについて、コンパイラーが警告することはありません。

```typescript
const abc = ["a", "b", "c"];
const character: string = abc[100]; // エラーにはならない
```

要素アクセスで得た値は`string`と`undefined`どちらの可能性もありながら、TypeScriptは常にstring型であると考えるようになっています。そのため、要素アクセスで`undefined`が返ってくる場合のエラーはTypeScriptでは発見できず、JavaScript実行時に判明することになります。

```typescript
const abc = ["a", "b", "c"];
const character: string = abc[100];
console.log(character); //=> undefined
character.toUpperCase();
// JavaScript実行時エラー: Cannot read properties of undefined (reading 'toUpperCase') 
```

## TypeScriptで要素アクセスを型安全にする設定

TypeScriptにこの問題を指摘してもらうようにするには、コンパイラーオプションの`noUncheckedIndexedAccess`を有効にします。

{% page-ref page="../../tsconfig/additional-checks/nouncheckedindexedaccess.md" %}

これを有効にすると、たとえば、`string[]`配列から要素アクセスで得た値の型は、string型もしくはundefined型を意味する`string | undefined`になります。

```typescript
const abc: string[] = ["a", "b", "c"];
const character: string | undefined = abc[0];
character.toUpperCase();
// コンパイルエラー: Object is possibly 'undefined'.(2532)
```

`string | undefined`型のままでは`toUpperCase`などの文字列型のメソッドは呼び出せません。そこで、if文で変数が文字列型だけになるように絞り込みます。すると、文字列型のメソッドを呼び出してもコンパイルエラーで指摘されることがなくなります。

```typescript
const abc: string[] = ["a", "b", "c"];
const character = abc[0];
if (typeof character === "string") { // 絞り込み条件
  character.toUpperCase(); // コンパイルエラーにならない
}
```

配列要素へのアクセスを安全にするために、`noUncheckedIndexedAccess`を有効にしておくことを推奨します。

