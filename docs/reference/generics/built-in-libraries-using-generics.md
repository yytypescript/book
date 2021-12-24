# 🚧ジェネリクスが使われている標準ライブラリ

ジェネリクスは標準ライブラリの中でも多くの箇所で利用されています。ジェネリクスを利用する代表的なものとしては、

- Arrayオブジェクト
- Promiseオブジェクト
- Mapオブジェクト

などがあります。

これらのオブジェクトでジェネリクスがどう使われているのかを見てきましょう。

## なぜジェネリクスが使われているか

`Array`オブジェクトは`string`や`number`など状況に応じて色々な型の要素を保持する必要があります。このとき、配列の要素の型はどんなプログラムを実装するかで変わってきます。つまり、要素の型を抽象化してプログラマーが実装時に型を指定できる必要があります。

この型を抽象化する方法としてジェネリクスが利用されています。

```ts
const numbers: Array<number> = [1, 2, 3, 4];
```

`Array`は特別に別の記法で型表記をすることもできます。これらについては配列のページに詳細がありますので併せて参照ください。

```ts
const numbers: number[] = [1, 2, 3, 4];
```

[配列の型注釈 (type annotation)](../values-types-variables/array/type-annotation-of-array.md)

## 標準ライブラリを使ってみる

実際にジェネリクスが使われる標準ライブラリを利用した実装をみてみましょう。

### `Array.prototype.map<T>()`

`Array`オブジェクトの`map<T>()`メソッドは引数で渡された関数をすべての配列の要素に適用することで新しい配列を返す関数です。サンプルコードでは、新しく生成される数値配列の要素の型を指定する`map<number>`でジェネリクスが使われています。

```ts
const textNumbers = ["1", "2", "3", "4"];
const numbers = textNumbers.map<number>(function (text: string) {
  return Number(text);
});
```

### `Map<K, V>`

`Map<K, V>`オブジェクトでは、`K`にキーの型を指定し`V`にキーに紐づく値の型を指定します。先ほどの`map<T>()`メソッドは、ジェネリクスの型定義がひとつだけでしたが、`Map<K, V>`は型定義がふたつあります。このようにジェネリクスの型定義はひとつである必要はなく、複数の型定義を持つことも可能です。

```ts
type Address = {
  country: string;
  postalCode: string;
  address1: string;
};

const addresses = new Map<string, Address>();
addresses.set("太郎", {
  country: "日本",
  postalCode: "8256405",
  address1: "東京都",
});

console.log(addresses.get("太郎"));
```

### `Promise<T>`

`Promise`オブジェクトについての説明は本書より詳細な記載がありますので、そちらをご参照ください。

TODO: Promiseへリンクする

### 標準ライブラリの型定義の参照方法

標準ライブラリの型定義ファイルはTypeScriptの公式リポジトリのlibディレクトリで確認することができます。
<https://github.com/microsoft/TypeScript/tree/master/lib>

`Array.prototype.map()`の型は [lib/lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1170) のファイルで確認できます。
