---
sidebar_label: オーバーロード関数
---

# オーバーロード関数 (overload functions)

オーバーロードとは、関数の名称は同じでありながら異なる引数、戻り値を持つことができる機能です。TypeScriptもこの機能を用意しているのですが、大元がJavaScriptであることが災いし、やや使いづらいです。

## オーバーロードの定義

オーバーロードはその関数が受け付けたい引数、戻り値の組を実装する関数の上に書きます。先ほど使用した2点の距離を求める関数`distance()`をオーバーロードで定義すると次のようになります。なお、この例では戻り値の型はすべて`number`型ですが、別の型にしても実装さえできれば他の型にしても問題ありません。

```ts
function distance(p: Point): number;
function distance(p1: Point, p2: Point): number;
function distance(x: number, y: number): number;
function distance(x1: number, y1: number, x2: number, y2: number): number;
```

なお、上記のような書き方のオーバーロードは名前付き関数またはクラスのメソッドでのみ可能です。匿名関数、アロー関数ではタイプエイリアスまたはインターフェースでオーバーロードを定義します。たとえば、上記例だと次のようなタイプエイリアスになります。

```ts
type Distance = {
  (p: Point): number;
  (p1: Point, p2: Point): number;
  (x: number, y: number): number;
  (x1: number, y1: number, x2: number, y2: number): number;
};

const distance: Distance = (
  arg1: number | Point,
  arg2?: number | Point,
  arg3?: number,
  arg4?: number
): number => {
  // ...
};
```

## オーバーロードの実装

ここからが大変です。実装はオーバーロードで定義したすべてをひとつの関数で処理しなければいけません。つまり`distance()`の実装は次のようになります。これが呼び出し側では**あたかも**他言語のオーバーロードのようになります。

```ts
function distance(p: Point): number;
function distance(p1: Point, p2: Point): number;
function distance(x: number, y: number): number;
function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(
  arg1: Point | number,
  arg2?: Point | number,
  arg3?: number,
  arg4?: number
): number {
  // ...
}

distance(q1);
distance(q1, q2);
distance(1, 3);
distance(1, 3, 5, 7);
```

## オーバーロードでうれしいこと

オーバーロードの定義なしに実装すると次のような引数を考慮しなければなりません。

```ts
distance(q1, 5, undefined, 8);
```

オーバーロードを定義しておくことで意図する引数と戻り値の組み合わせを定義できるようになります。上記引数はオーバーロードの定義によりTypeScriptから指摘を受けます。

```text
Argument of type 'Point' is not assignable to parameter of type 'number'.
```

これはTypeScriptが`distance()`を`number`型の引数4個版で受けていると解釈している時の指摘です。
