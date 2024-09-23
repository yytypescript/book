# TypeScriptの特徴

TypeScriptは、Microsoftにより2012年10月1日に初めて発表された、スケーラブルなJavaScriptの上位互換言語です。スケーラブルな言語は、プロジェクトの規模や開発チームの人数が増えても、うまく機能し続けることができる言語のことで、TypeScriptはその特性から大規模プロジェクトにも適しています。

TypeScriptはJavaScriptの上位互換であり、JavaScriptに静的な型付けが追加されています。TypeScriptで書かれたコードは純粋なJavaScriptにコンパイルされ、ブラウザ、サーバーなどJavaScriptが実行できるすべての実行環境で動作します。さらに、オープンソースプロジェクトであり、Apache License 2.0で提供されています。

## JavaScriptの上位互換

TypeScriptはJavaScriptに型が追加され、それ以外の部分は基本的に互換性があります。これまでJavaScriptに慣れ親しんできた方であれば時間をかけずに習得できます。

## トランスパイル

TypeScriptコードは、さまざまなJavaScriptのバージョン（例: ES5, ES6）へトランスパイルすることができます。これにより、ブラウザや実行環境の互換性問題を回避できます。

## 静的型付け

TypeScriptは[静的型付け](./static-type.md)を持つ言語で、変数や関数の引数に型を指定することで、コードの安全性が向上し、バグが発見しやすくなります。

```typescript
function sum(a: number, b: number): number {
  return a + b;
}
```

## 型推論

TypeScriptは、型注釈がついていない変数でもコンテキストに基づいて自動的に型を推測します。これにより、開発者は型を明示しなくても安全性が向上します。

## 構造的部分型システム

TypeScriptは[構造的部分型](../reference/values-types-variables/structural-subtyping.md)システムを採用しており、オブジェクトの形状（つまり、オブジェクトがどのようなプロパティとメソッドを有しているか）に基づいて型を判断します。したがって、公称型ではなく、構造的部分型に基づいて動作します。

## ジェネリクス

TypeScriptは[ジェネリクス](../reference/generics/README.md)をサポートしており、汎用的で再利用可能なコードを書くことができます。

```typescript twoslash
function identity<T>(arg: T): T {
  return arg;
}
```

## 高度な型表現

TypeScriptでは、高度な型システムを用いて複雑な型を表現できます。これにより、アプリケーションのロジックをより堅牢で表現豊かな形で開発できます。以下は、TypeScriptで利用可能な高度な型表現のいくつかの例です。

1. **ユニオン型**: 複数の型のどれかを表すことができます。たとえば、初期値が`null`の変数を処理する場合、ユニオン型を使うことができます。

   ```typescript
   type NullableString = string | null;
   ```

2. **タプル型**: 配列の各要素に異なる型を指定できる型です。これにより、異なる型の組み合わせを簡潔に表現できます。

   ```typescript
   type Response = [number, string];

   const response: Response = [200, "OK"];
   ```

## 複数の言語パラダイムのサポート

TypeScriptは、オブジェクト指向プログラミング (OOP) と関数型プログラミング (FP) の両方をサポートしています。これにより、開発者は柔軟で強力なプログラムを構築することができます。

## クラスとインターフェース

TypeScriptはクラスベースのオブジェクト指向プログラミングとインターフェースをサポートします。これにより、コードの再利用や継承が容易になり、大規模なプロジェクトを管理する際に役立ちます。

```typescript twoslash
interface Person {
  firstName: string;
  lastName: string;
}

class Employee implements Person {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

## メモリ管理

TypeScriptは、基本的にJavaScriptと同様のメモリ管理を行います。JavaScriptエンジンがガベージコレクションを用いて、自動的にメモリを解放します。

## 非同期処理

TypeScriptは、JavaScriptと同様にイベント駆動型の非同期プログラミングをサポートしています。Promiseやasync/awaitを用いて、非同期処理を簡潔かつ効率的に実装できます。

```typescript twoslash
async function fetchData(): Promise<void> {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

## シングルスレッドモデル

TypeScript (およびJavaScript) はシングルスレッドモデルを採用しています。シングルスレッドモデルは、シンプルで分かりやすいコードを実現し、イベントループと非同期処理で効率的なタスク処理をサポートします。一方で、Web Workersを利用してバックグラウンドで実行されるスレッドを作成し、マルチタスクを実現することもできます。

## 強力な開発環境

TypeScriptは強力な開発環境を提供しています。開発者が良質な開発体験を享受できるよう、インテリセンスとリアルタイムエラー表示の機能をエディターに提供しています。これにより、自動補完や型情報が手に入るため、開発がスムーズに進み、型の誤りや不整合が早い段階で検出され、確かなコードを書きやくなっています。

## オープンソース

TypeScriptは、オープンソースで開発されており、[TypeScript GitHubリポジトリ](https://github.com/microsoft/TypeScript)でソースコードやドキュメントが公開されています。開発者は、GitHubリポジトリを介してTypeScriptプロジェクトに寄与することができます。

## まとめ

これらの特徴により、TypeScriptは現代のWeb開発において非常に魅力的な選択肢となっています。静的型付けと高度な型システムを導入したことで、大規模プロジェクトや、オブジェクト指向プログラミングおよび関数型プログラミングなど、多様な開発スタイルに対応しており、堅牢で柔軟なコードが実現できます。そして、オープンソースでありながら、Microsoftの強力なバックアップがあることも魅力のひとつです。
