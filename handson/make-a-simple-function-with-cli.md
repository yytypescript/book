---
description: >-
  JavaScriptからTypeScriptへのマイグレーションは想像以上に簡単なこと、コンパイラが生成するJSコードがどんなものなのか、コンパイラがあることのメリットを体感してもらう
---

# 簡単な関数をCLIで作ってみよう

## JavaScriptで発生しうる問題

JavaScriptで以下のような関数があったとします。

```typescript
function increment(num) {
  return num + 1;
}

console.log(increment(1));
```

ただの引数を`+1`して返すだけのその名も`increment`です。

上記をペーストして実行します。 実行時のファイル名を`increment.js`としていますが、異なる名前にした方は読みかえてください。

```bash
$ node increment.js
2
```

予想通りのなんでもない関数ですが、この関数が以下のように呼ばれたらどうでしょうか。

```typescript
function increment(num) {
  return num + 1;
}

console.log(increment('1'));
```

呼び出し時の`1`が`'1'`になりました。これだけでこの関数の結果は大きく変わってしまいます。

```bash
$ node increment.js
11
```

これは算術演算子の`+`\(加算\)を期待してこの関数を作ったと思われるところに文字列が入ってしまったため、`+`が文字列連結として解釈されてしまったことが原因です。  
もしこれが金額の計算だったとしたら大変なことになります。

TypeScriptを使うと、コーディングの時点でこのような型の不一致による意図しない挙動を抑えられるようになります。

## JavaScriptをTypeScriptに変換する

変更は拡張子を`.js`から`.ts` に変更するだけです。

```bash
$ mv increment.js increment.ts
```

これをエディタで開くと`increment`の引数にあたる`num`のところで何か言われます。

```typescript
Parameter 'num' implicitly has an 'any' type, ...
```

これは、TypeScriptはこの引数に対していかなる型情報も与えられていない\(いわゆる`any`\)よということを言っています。そこで型を付加します。付加する型は`number`型です。

```typescript
function increment(num: number) {
  return num + 1;
}

console.log(increment('1'));
```

すると今度は呼び出し側の引数で何か言われます。

```typescript
Argument of type '"1"' is not assignable to parameter of type 'number'.`
```

引数の`'1'`は`number`型ではないよという至極まっとうな指摘です。

ひとまずこの警告を完全無視してトランスパイルをしてみます。

```bash
$ tsc increment.ts
```

するとやはり警告が出てしまいます。

```typescript
increment.ts:3:23 - error TS2345: Argument of type '"1"' is not assignable to parameter of type 'number'.

3 console.log(increment('1'));
                        ~~~


Found 1 error.
```

このように事前にコードが孕んでいる危険を、コーディングまたはトランスパイルの時点で検知できます。

### 戻り値にも型を書く

今回は引数のみの紹介となりましたが、戻り値にも型を指定することができます。これによりその関数内で意図しない結果を返さないかどうかの検知に使うことができます。  
戻り値も書いた`increment.ts`の完全版は以下のようになります。

```typescript
function increment(num: number): number {
  return num + 1;
}
```

もちろん、この関数で戻り値を`string`型など`number`型ではない型に設定するとTypeScriptから指摘を受けます。

```typescript
increment.ts:2:3 - error TS2322: Type 'number' is not assignable to type 'string'.

2   return num + 1;
    ~~~~~~~~~~~~~~~
```

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

| メインライター | 対応スケジュール |
| :--- | :--- |
| jamashita | 02/21 初版執筆完了 |

