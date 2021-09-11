# 変数宣言 \(Variable Declaration\)

JavaScriptの変数宣言には `let`、 `const` 、`var`の3種類の宣言方法があります。

`let`と`const`は、`var`における問題を解消するためにES2015で追加された構文です。これからJavaScriptを書く際は、`let`と`const`の2つだけを使うようにすると良いでしょう。

## letの変数宣言

`let`を用いた変数宣言の書き方は次のようにします。

```typescript
let x = 1;
```

`let`は再代入が可能です。

```typescript
let x = 1;
x = 2; // 再代入ができる
```

`let`は変数の初期値なしで変数定義できます。初期値なしの変数の値は`undefined`になります。

```javascript
let x; // 初期値なし
x = 1; // 後で代入
```

## constの変数宣言

`const`を用いた変数宣言の書き方は次のようになります。初期値は必須です。

```typescript
const y = 2;
```

`const`は変数への再代入が禁止されています。

```typescript
const y = 1;
y = 1; // Uncaught TypeError: Assignment to constant variable.
```

## letとconstの使い分け

初めて JavaScript を書く場合に、`let`と`const`のどちらの変数宣言を使えば良いか悩む場合があるかもしれません。

基本は`const`で変数宣言をして必要な場合にのみ、`let`を使うのがオススメです。`const`で変数宣言することで再代入を禁止して、意図せず変数が書き換えらることを予防できるので、より安全なコードになります。

## 

