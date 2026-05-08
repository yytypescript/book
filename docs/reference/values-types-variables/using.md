---
sidebar_label: using宣言
---

# 新しい変数宣言 using

[変数宣言: letとconst](reference/values-types-variables/let-and-const.md)

この章の最初のページで`let`と`const`という変数宣言について学びました。

**using宣言**(using declaration)とは、JavaScriptに導入される新しい変数宣言であり、執筆時点のECMAScriptプロポーザルではStage3の機能です。TypeScriptでは5.2からサポートされています。

using宣言された変数がスコープを抜けるときに、その変数に紐づくリソースについて自動的にクリーンアップ処理が実行されることで「**明示的なリソース管理** (Explicit Resource Management)」を実現できます。

:::info Denoを使う理由
このページでは以下の理由から [Deno](https://deno.com) ランタイムのファイル API をサンプルコードに多用しています。

1. **`Symbol.dispose` が標準で実装済み**: Deno の `FsFile` は `using` 宣言がそのまま使えるオブジェクトの実例です。
2. **リソースの概念が直感的**: ファイルハンドルやネットワーク接続は、ブラウザの Web API よりもコンピュータのリソース管理に近く、「開いたら閉じる」というライフサイクルが分かりやすいです。
:::

## リソースとは

using宣言を理解するための前提として「**リソース** (resource)」の概念を知っておく必要があります。リソース、あるいはシステムリソースとは、以下のようなコンポーネントのことを指します。

- ファイル(具体的にはファイルハンドル)
- ネットワーク接続(ネットワークソケット)
- DB接続(データベースコネクション)
- メモリ領域

JavaScript/TypeScriptの文脈において、特にメモリ領域は実行環境が持つGC(ガベージコレクタ)により自動的に管理されます。そのためC言語やZig言語のようにプログラマーが明示的なメモリ解放を行なう必要がありません。

```c title="C言語の明示的なメモリ解放"
#include <stdlib.h>

int main(void) {
    // メモリを確保
    int *array = malloc(5 * sizeof(int));

    array[0] = 42;

    // 明示的にメモリを解放しなければならない
    free(array);

    return 0;
}
```

GCはメモリ領域以外のリソースの管理は行わないため、非メモリリソースの管理はプログラマーが明示的に行なう必要があります。例えば、以下の Deno 環境で作成されたファイル読み込みの処理では、ファイルハンドルは以下のように読み取りのために `open()` したら、利用終了時には `close()` するという処理を行なう必要があります。

```ts twoslash {2-3,9-12} title="resource.ts"
// @noErrors
declare namespace Deno {
  interface OpenOptions { read?: boolean; write?: boolean }
  interface FsFile {
    read(p: Uint8Array): Promise<number | null>;
    close(): void;
    [Symbol.dispose](): void;
  }
  function open(path: string | URL, options?: OpenOptions): Promise<FsFile>;
}
// ---cut---
async function readFile(fileName: string): Promise<void> {
  // ファイルを開く
  const file = await Deno.open(fileName);
  try {
    // ファイルを読み取る
    const buffer = new Uint8Array(5);
    const bytesRead = await file.read(buffer);
    console.log(bytesRead);
  } finally {
    // 必ずファイルを閉じる(リソースを解放)
    file.close();
  }
}
```

:::info
[`Deno.open`](https://docs.deno.com/api/deno/~/Deno.open) は Deno ランタイムを利用した環境で利用できるファイルを開くためのAPIです。以下のような型を持ちます。

```ts
open(
  path: string | URL,
  options?: OpenOptions,
): Promise<FsFile>
```
:::

メモリやファイルといったリソースは利用後に必ず解放する必要があります。この解放処理を忘れると、リソースリークという問題が発生します。

## リソースリークとは

「**リソースリーク** (Resource leak)」とは、リソースの使用後に解放処理を忘れることで、そのリソースが無駄に占有され続ける問題のことです。例えば、メモリ解放を忘れた場合には「**メモリリーク** (Memory leak)」と呼ばれる問題となり、プログラムの使用したメモリ領域が解放されず残されることでメモリ容量が徐々に減っていってしまいます。

以下のようにリソースの種類により、リークの問題は呼称が異なりますが、一般にはリソースリークと呼ばれます。

- ファイルハンドルリーク
- ソケットリーク
- DB接続リーク

メモリリーク以外のリソースリークでも、システムパフォーマンスの低下やクラッシュといった問題が発生する可能性があります。

リソースの使用後には必ず解放を行いたいところですが、手動で書かなければいけない場合には解放し忘れてしまう場合もあるでしょう。GCがメモリ解放を自動的に行ってくれるように、非メモリリソースの解放も自動的に行ってくれたら楽になることが想像できますね。

## usingの登場

そこで、 using宣言が現れました。using宣言で宣言された変数に紐づけられたリソースは、その変数がスコープを抜けるときに `Symbol.dispose` で指定されたメソッドが呼び出されます。このメソッドに記述されたリソースの解放処理が自動的に実行されます。

```ts
{
  // 変数初期化によるリソースの確保
  using file = Deno.openSync(fileName);

  file.writeSync(data);

  file.readSync(buffer);
} // スコープを抜けると自動的に `file` に紐づくリソースの解放処理が呼ばれる
```

スコープ脱出のタイミングでリソース解放が行われる、つまり、コードの構造により自動的にリソースの解放タイミングが決まります。この `using` 宣言を使うことで先程の `resource.ts` は以下のように書き換えることができます。

```ts twoslash title="resource.ts"
declare namespace Deno {
  interface OpenOptions { read?: boolean; write?: boolean }
  interface FsFile {
    read(p: Uint8Array): Promise<number | null>;
    close(): void;
    [Symbol.dispose](): void;
  }
  function open(path: string | URL, options?: OpenOptions): Promise<FsFile>;
}
// ---cut---
async function readFile(fileName: string): Promise<void> {
  // ファイルを開く
  using file = await Deno.open(fileName);
  // ファイルを読み取る
  const buffer = new Uint8Array(5);
  const bytesRead = await file.read(buffer);
  console.log(bytesRead);
}
```

### DisposableとSymbol.dispose

`using` 宣言で使えるオブジェクトは、`Disposable` インターフェースを実装している、つまり `[Symbol.dispose]()` メソッドを持つ必要があります。

```ts twoslash {1, 4-6, 11}
const getConnection = (host: string): Disposable => {
  console.log(`接続を開く: ${host}`);
  return {
    [Symbol.dispose]() {
      console.log(`接続を閉じる: ${host}`);
    },
  };
};

{
  using connection = getConnection("localhost");
  // ...
} // ここで自動的に「接続を閉じる: localhost」が出力される
```

実は、このようなパターンは後ほど詳しく解説しますが、RAII(Resource Acquisition is Initialization)パターンと呼ばれ、他のプログラミング言語にも同様のパターンを見ることができます。

### await using

クリーンアップ処理自体が非同期の場合には、`await using` 宣言を使います。`await using` はスコープ脱出時に `[Symbol.asyncDispose]()` を `await` して呼び出します。

`await using` は `AsyncDisposable` インターフェースを実装したオブジェクトが対象となります。

```ts twoslash {1, 4-8, 13}
const getConnection = (host: string): AsyncDisposable => {
  console.log(`接続を開く: ${host}`);
  return {
    async [Symbol.asyncDispose]() {
      // 非同期のクリーンアップ処理(例: ネットワーク越しの切断)
      await Promise.resolve();
      console.log(`接続を閉じる: ${host}`);
    },
  };
};

{
  await using connection = getConnection("localhost");
  // ...
} // ここで非同期の「接続を閉じる: localhost」が await される
// ---cut-after---
export {};
```

ただし、`await using` はスコープ脱出時にまず `[Symbol.asyncDispose]()` を探し、なければ `[Symbol.dispose]()` にフォールバックします。そのため `AsyncDisposable` だけでなく `Disposable` を実装したオブジェクトにも使えます。

`using` と `await using` の使い分けは次のとおりです。

| 宣言 | 対応インターフェース | クリーンアップ |
| --- | --- | --- |
| `using` | `Disposable` (`Symbol.dispose`) | 同期 |
| `await using` | `AsyncDisposable` (`Symbol.asyncDispose`) を優先、なければ `Disposable` (`Symbol.dispose`) にフォールバック | 非同期（フォールバック時は同期） |

なお、`await using` は `async` 関数またはトップレベル `await` が使える環境でのみ利用できます。

## 他の言語でのパターン

### RAIIパターン

**RAII**(Resource Acquisition Is Initialization)パターンとは、文字通り「リソース取得は初期化」を意味しており、リソースの確保と解放を変数の初期化と破棄に結びつけるというプログラミングパターンを表します。

JavaScriptの `using` を含め、以下に挙げるようなプログラミング言語では類似のRAIIパターンを採用しています。

### C#のusing句

JavaScriptの `using` に似ているのがC#の `using` です。`using` 句に指定されたオブジェクトは `IDisposable` インターフェースを実装している必要があります。

`IDisposable` インターフェースは `Dispose` メソッドを持ちます。

```csharp
public interface IDisposable
{
    void Dispose();
}
```

実装例として、DB接続クラスに `IDisposable` を実装すると以下のようになります。

```csharp
class Connection : IDisposable
{
    private readonly string host;

    public Connection(string host)
    {
        this.host = host;
        Console.WriteLine($"接続を開く: {host}");
    }

    public void Dispose()
    {
        Console.WriteLine($"接続を閉じる: {host}");
    }
}
```

この `Connection` クラスを `using` 句で使うと、スコープ脱出時に自動的に `Dispose` が呼ばれます。

```csharp title="C#のusing句"
using(var connection = new Connection("localhost"))
{
  // ...
} // スコープを抜けるときに自動的にDisposeが呼ばれる
```

`IDisposable` インターフェースを実装していることで、スコープ脱出時に、`IDisposable`インターフェースの `Dispose` メソッドによるリソース解放が行われます。

C# 8.0以降では、JavaScriptの `using` により似ている以下のような宣言形式も使えます。

```csharp title="C#のusing var"
{
  using var connection = new Connection("localhost");
  // ...
} // スコープを抜けるときに自動的にDisposeが呼ばれる
```

### Rustのdropメソッド

RustもRAIIパターンを採用しており、所有権という概念のもとで、メモリを含むあらゆるリソースの解放タイミングを**スコープの脱出時**に定めており、**コードの構造によって解放のタイミングが決定されます**。これによって、リソースリークを静的に防ぎ安全性を担保します。

このような所有権に基づいたリソース管理はまさに、RAIIに基づいたリソース管理の方法となっています。

Rustの `Drop` トレイトに存在する `drop` というメソッドがこれを実現しています。オブジェクトがスコープを抜けるときにはこのメソッドが自動的に呼び出されて、登録されているリソース解放の処理を行います。

```rust title="Rustのdropメソッド"
struct Connection {
    host: String,
}

impl Connection {
    fn new(host: &str) -> Self {
        println!("接続を開く: {}", host);
        Connection { host: host.to_string() }
    }
}

impl Drop for Connection {
    fn drop(&mut self) {
        // スコープを抜けるときに自動的に呼ばれる
        println!("接続を閉じる: {}", self.host);
    }
}

fn main() {
    {
        let connection = Connection::new("localhost");
        // ...
    } // ここで自動的に「接続を閉じる: localhost」が出力される
}
```

Rustでは `using` のような特別な宣言は不要で、すべての変数がデフォルトでRAIIの対象となります。

## 各言語のRAIIパターン比較

TypeScript・C#・Rustそれぞれの仕組みを比較すると以下のとおりです。

| 比較項目 | TypeScript | C# | Rust |
| --- | --- | --- | --- |
| インターフェース/トレイト | `Disposable` | `IDisposable` | `Drop` |
| クリーンアップメソッド | `[Symbol.dispose]()` | `Dispose()` | `drop(&mut self)` |
| 宣言構文 | `using` / `await using` | `using` 句 / `using var` | 不要(暗黙) |
| 強制力 | オプトイン(明示的に `using` が必要) | オプトイン(明示的に `using` が必要) | すべての変数が対象 |

大きな違いは**強制力**にあります。TypeScriptとC#では `using` / `using var` を書かなければRAIIは機能せず、うっかり書き忘れるとリソースリークが起きます。一方Rustでは所有権システムにより、すべての変数がスコープ脱出時に自動的に `drop` される仕組みになっており、書き忘れが原理的に発生しません。
