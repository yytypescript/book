# タプル

TypeScriptは1値のみ返却可能です。戻り値に複数の値を返したい時に、配列を返しつつ中に様々な値を入れることがあります。なお以下の関数の返却値は定数になっていますが、実際は演算した結果だと解釈してください。

```typescript
function tuple() {
  //...
  return [1, 'ok', true];
}
```

極端な例ですが、上記のような時がないとは言えません。

## 配列が抱える問題

上記例では戻り値の型として何が妥当でしょうか。配列のページから読み進めていただいた方は`any[]`または`unknown[]`が型の候補として浮かぶと思います。

```typescript
const list: unknown[] = tuple();

list[0].
```

ですが、この`list[0]`の後に`.`をつけてもTypeScriptは入力補完をしません。それは`list`の要素は`unknown`であり、つまりTypeScriptはそれがどの型であるかを関心しないからです。

せっかくTypeScriptを使って型による恩恵を享受しているのに、ここだけ型がないものとしてコーディングをするのも味気がありません。そこで使えるのがタプルです。

## タプルの型

タプルの型は至極簡単です。`[]`を書いて中に型を書くだけです。つまり、上記関数`tuple()`は以下のような戻り値を持っていると言えます。

```typescript
const list: [number, string, boolean] = tuple();
```

同様に関数の戻り値を書くことができます。

```typescript
function tuple(): [number, string, boolean] {
  //...
  return [1, 'ok', true];
}
```

## タプルへのアクセス

タプルを受けた変数はそのまま中の型が持っているプロパティ、メソッドを使用できます。

```typescript
const list: [number, string, boolean] = tuple();

list[0].toExponential();
list[1].length;
list[2].valueOf();
```

タプルを受けた変数は、タプルで定義した範囲外の要素に対してアクセスができません。

```typescript
const list: [number, string, boolean] = tuple();

list[5];

// -> Tuple type '[number, string, boolean]' of length '3' has no element at index '5'.
```

そのため`array.push()`のような、配列の要素を増やす操作をしてもその要素を使うことはできません。

## タプルを使う場面

TypeScriptで非同期プログラミングをする時に、時間のかかる処理を直列ではなく並列で行いたい時があります。その時TypeScriptでは`Promise.all()`というものを使用します。  
`Promise`についての詳しい説明は本書に専門の項目がありますので譲りますが、この時タプルが役に立ちます。

たとえば以下のような処理に時間が`3`秒、`5`秒かかる関数`takes3Seconds(), takes5Seconds()`があるとします。

```typescript
async function takes3Seconds(): Promise<string> {
    // ...
    return 'finished!';
}

async function takes5Seconds(): Promise<number> {
    // ...
    return -1;
}
```

この関数をそのまま実行すると`3 + 5 = 8`秒かかってしまいます。

```typescript
const str = await takes3Seconds();
const num = await takes5Seconds();
```

これを`Promise.all()`を使うことで以下のように書くことができます。この時かかる時間は関数の中で最も時間がかかる関数、つまり`Math.max(3, 5) = 5`秒です。

```typescript
const tuple: [string, number] = await Promise.all([
    takes3Seconds(),
    takes5Seconds()
]);
```

この時`Promise.all()`の戻り値を受けた変数`tuple`は`[string, number]`型です。  
また、この時実行する関数の戻り値とタプルの型の順番は一致します。つまり以下のように入れ替えたら、入れ変えた結果のタプルである`[number, string]`型が得られます。

```typescript
const tuple: [number, string] = await Promise.all([
    takes5Seconds(),
    takes3Seconds()
]);
```

`take3seconds()`の方が早く終わるから、先に`tuple`に入るということはありません。引数に渡した順番の通りに`tuple`の要素の型は決まります。

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

| メインライター | 対応スケジュール |
| :--- | :--- |
| jamashita | 03/06 執筆完了 |



