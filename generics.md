# ジェネリクス

{% hint style="warning" %}
このページは未完成です。suin執筆中
{% endhint %}

型の安全性とコードの再利用性の両立は難しいものです。あらゆる型で同じコードを使おうとすると、型の安全性が犠牲になります。逆に、型の安全性を重視しようとすると、同じようなコードを量産する必要が出て、コードの再利用性が低下します。こうした問題を解決するために導入された言語機能がジェネリクスです。ジェネリクスを用いると、**型の安全性とコードの再利用性を両立する**ことができます。

## ジェネリクスが解決する問題

ジェネリクスが具体的にどのような問題を解決するのか見ていきましょう。ここに、`chooseRandomly`という普通の関数があります。この関数は、2つの文字列を引数に受け取り、五分五分の確率で第1引数か第2引数の値を抽選して返します。

```typescript
function chooseRandomly(v1: string, v2: string): string {
  return Math.random() <= 0.5 ? v1 : v2;
}
```

`chooseRandomly`は文字列の抽選に限っては、この関数を再利用していくことができます。

```typescript
const winOrLose = chooseRandomly("勝ち", "負け");
```

次に、文字列だけでなく数値の抽選も同じロジックで行う必要が出てきたとを考えてみましょう。`chooseRandomly`は文字列にしか対応していないので、数値用の関数を新設しないとなりません。

```typescript
// 数値用の抽選関数
function chooseRandomlyNumber(v1: number, v2: number): number {
  return Math.random() <= 0.5 ? v1 : v2;
}
const num: number = chooseRandomlyNumber(1, 2);
```

さらに、五分五分抽選のロジックは汎用的なので、広告のA/Bテストのために`URL`オブジェクト向けの実装も作ることになりました。

```typescript
// URLオブジェクト向けの抽選関数
function chooseRandomlyURL(v1: URL, v2: URL): URL {
  return Math.random() <= 0.5 ? v1 : v2;
}
const url: URL = chooseRandomlyURL(urlA, urlB);
```

ここまでに、`chooseRandomly`関数は二度複製され、型だけが異なる同じ関数が3つもできてしまいました。

さて、複製だらけのコードをひとつにまとめつつ、型の安全性を損なわないようにするにはどうしたらいいのでしょうか？ \(執筆つづく……\)



