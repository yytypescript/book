# 型引数の制約

TypeScriptではジェネリクスの型引数を特定の型に限定することができます。

## ジェネリクス型引数で直面する問題

`changeBackgroundColor()`という関数を例に考えてみます。この関数は指定されたHTML要素の背景色を変更して、そのHTML要素を返す関数です。
ジェネリクス型`T`を定義することで`HTMLButtonElement`や`HTMLDivElement`などの任意のHTML要素を受け取れるようにしています。

```ts
function changeBackgroundColor<T>(element: T) {
  // Property 'style' does not exist on type 'T'.(2339)
  element.style.backgroundColor = "red";
  return element;
}
```

このコードはコンパイルに失敗します。ジェネリクスの型`T`は任意の型が指定可能なので、渡す型によっては`style`プロパティが存在しない場合があるからです。コンパイラは存在しないプロパティへの参照が発生する可能性を検知してコンパイルエラーとしているのです。

`any`を使えばコンパイルエラーを回避することは可能ですが型のチェックがされません。将来バグが発生する危険性もあるので、できる限り避けたいところです。

```ts
function changeBackgroundColor<T>(element: T) {
  // any にキャストすればコンパイルエラーは回避できる
  // 型チェックされないのでバグの可能性
  (element as any).style.backgroundColor = "red";
  return element;
}
```

## 型引数に制約をつける

TypeScriptでは`extends`キーワードを用いることでジェネリクスの型`T`を特定の型に限定することができます。

今回の例では`<T extends HTMLElement>`とすることで型`T`は必ず`HTMLElement`またはそのサブタイプの`HTMLButtonElement`や`HTMLDivElement`であることが保証されるため`style`プロパティに安全にアクセスできるようになります。

```ts
function changeBackgroundColor<T extends HTMLElement>(element: T) {
  element.style.backgroundColor = "red";
  return element;
}
```

この`extends`キーワードはインターフェースに対しても使います。インターフェースは実装のときは`implements`キーワードを使いますが型引数に使うときは`implements`を使わず同様に`extends`を使います。

```ts
interface ValueObject<T> {
  value: T;

  toString(): string;
}

class UserID implements ValueObject<number> {
  public value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public toString(): string {
    return `${this.value}`;
  }
}

class Entity<ID extends ValueObject<unknown>> {
  private id: ID;

  public constructor(id: ID) {
    this.id = id;
  }

  //...
}
```

`Entity`クラスは`ValueObject`インターフェースを実装しているクラスをIDとして受ける構造になっていますが19行目にあるようにこのときの型引数の制約は`implements`ではなく`extends`でなければなりません。
