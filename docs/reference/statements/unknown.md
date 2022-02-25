# 🚧unknown型

TODO: 次のことについて書く

- unknownはTypeScriptの型
- unknownはどんな型も代入できる型
- unknown型はanyを除いて他の型には代入できない
- 同様にunknown型は、プロパティアクセスや関数呼び出しがコンパイルエラーになる。
- control flow analysisや型ガード関数と組み合わせて型の絞り込みして使うことが多い

TypeScriptにはunknown型という型があります。これはこの型の変数の実体が何かをわからないときに使うタイプセーフなany型です。
unknown型にはどのような値を代入してもエラーにはなりません。

```ts twoslash
let value: unknown;
value = 1; // OK
value = "string"; // OK
value = { name: "オブジェクト" }; // OK
```

## unknown型はタイプセーフ

any型はどのような型の変数にも代入できます。ただし、次の例ではboolean型、string型、object型には代入が失敗してほしいところです。

```ts twoslash
const value: any = 10;
const int: number = value;
const bool: boolean = value;
const str: string = value;
const obj: object = value;
```

一方、unknown型に代入した値はany型, unknown型をのぞき他の型には代入できません。

```ts twoslash
// @errors: 2322
const value: unknown = 10;
const int: number = value;
const bool: boolean = value;
const str: string = value;
const obj: object = value;

const any: any = value; // OK
const unknown: unknown = value; // OK
```

number型である変数`int`に対しても代入が失敗しているのはやりすぎではないかと思われるかもしれません。

また、unknown型にはたとえその変数にある元の値の型がわかっていたとしてもいかなる操作も許されません。

```ts twoslash
// @errors: 2571
const value: unknown = 10;

value.toFixed();
```

## unknownはどのように使う

## 関連情報

[any型](../values-types-variables/any.md)

[any vs unknown](any-vs-unknown.md)

アウトラインです。これをもとに執筆してほしいです。

links→内部リンク
keywords→できるだけ盛り込みたい検索用ワード

unknownとは
解決する疑問: unknownとはいったい何？

[x] unknownはTypeScriptの特別な型
[x] unknown型にはどんな型も代入できる
[x] unknown型はどんな型にも代入できない(anyを除く)
[x] 代入しようとするとコンパイルエラーになる
[x] keywords: TypeScript、型、代入

unknownの用例
解決する疑問: そんな型どこで使うの？

[ ] anyよりも型安全なコードになる
[ ] JSON.parseの戻り値の型注釈に
[ ] 型ガード関数に
[ ] links: 型ガード関数

keywords: 用法, 使い方

unknownの絞り込み
解決する疑問: unknownの変数が返ってきた。使うとエラーになる。どうしたらいい？

unknownの値を処理するには、型を絞り込む
絞り込むには、型ガードを使う。
links: 型ガード、制御フロー分析、型の絞り込み

keywords: 判定、チェック、キャスト、変換、型ガード、type predicate

unknownから文字列型への絞り込み
解決する疑問: unknownを文字列型に絞り込みたい

if (typeof value === 'string')
keywords: string 文字列型

unknownから配列型への絞り込み
解決する疑問: unknownから配列型(number[])に絞り込みたい

Array.isArrayを使う
さらに、ループの中でtypeofを使う
keywords: array 配列

unknownからオブジェクト型への絞り込み
解決する疑問: unknownのプロパティにアクセスできない

typeofでしぼりこむ
プロパティごとにtypeofする
keywords: オブジェクト、プロパティ

unknownと型アサーション
普通は型アサーションは一定の制約がある (string as 'a'はOKだが、string as numberは無理)
unknownはどんな型にも型アサーションできる
unknownを型アサーションするのは楽だが、型安全性は犠牲になるよ
links: 型アサーション「as」

unknownとcatch
解決する疑問: catch(e)のeがunknownでハンドリングできないんだが

useUnknownInCatchVariablesがtrueだとunknownになる
TODO: 順当にいったら型ガードで絞り込むだけど、ベストプラクティスありません？

instanceof
isError関数を作っておく
カスタムエラーオブジェクトならクラスに型ガード静的メソッドを作っておくといいかも？
links: 例外処理、useUnknownInCatchVariables

keywords: catch, 例外、エラー, ハンドリング

unknownとanyの違い
解決する疑問: unknownとanyって似てるけどどう違う？

ひとことでunknownは型安全なany
anyにしたくなったらunknownを使おう
links: unknownとanyの違い

keywords: any 違い, anyの代わり
