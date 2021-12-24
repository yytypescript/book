---
sidebar_label: 構造的部分型
---

# 構造的部分型 (structural subtyping)

オブジェクト指向。そこまでとはいかなくてもクラスを扱うことができる言語において、ある元となる型(基本型: supertype)とその継承関係にある型(派生型: subtype)という話は欠かすことができません。

## 構造的部分型とは

プログラミング言語の派生型の方式は公称型(nominal typing)と構造的部分型(structural subtyping)の2種類が存在します。どちらも派生型の定義として**リスコフの置換原則**を満たしており、どちらが正しいというものではありません。それぞれが正しい、異なる派生型の解釈です。

公称型と構造的部分型の違いを理解しておくことでより安全で堅牢なTypeScriptができるようになります。

### 公称型(Nominal Typing)

Java, C++で採用されている定義です。
ある型を基本型にする派生型は、互いに置換ができません。

### 構造的部分型(Structural Subtyping)

Go, TypeScriptで採用されている定義です。
その型の見た目(シグネチャ)が等しければ置換可能であるという点が公称型と大きく異なっています。公称型ほど硬くはなく、とはいえ型の恩恵は受けたいというやや緩い型付けです。

## 実際の例で見る

データを意味するクラスのDataを、ファイル読み込みで取得する場合と他のサーバーにリクエストを送信して取得する場合を考えます。InputSourceというスーパークラス(基本型)を考え、そのサブクラス(派生型)としてFile, Requestを考えます。Dataクラスの構造は重要ではないので**欲しいデータがそのような形をしている**程度に考えてください。

なお、登場するクラスのほとんどは実際に存在するわけではなく、理解のために英語をあたかもクラスのように書いているだけです。そのため次のコードをそのまま転記しても動きませんのでご了承ください。

### 公称型の場合

以下はJavaでの紹介です。

```java
public class InputSource {
  public Data fetch() {
    throw new UnsupportedOperationException("Please implement InputSource and override this method");
  }
}

public class File extends InputSource {
  public final String destination;

  public File(final String destination) {
    this.destination = destination;
  }

  public Data fetch() {
    final Reader reader = FileSystem.readFrom(destination);
    // ...

    return data;
  }
}

public class Request extends InputSource {
  public final String destination;

  public Request(final String destination) {
    this.destination = destination;
  }

  public Data fetch() {
    final Response response = HTTPRequest.get(destination);
    // ...

    return data;
  }
}
```

このようなクラスの関係であればリスコフの置換原則から次のようにして動かすことができます。これはFile, Requestのインスタンスをスーパークラスの変数で受けていることを意味します。

```java
final InputSource source1 = new File("/data/~~~.txt");
final InputSource source2 = new Request("https://~~~");

final Data data1 = source1.fetch();
final Data data2 = source2.fetch();
```

次に、次のように結果を受ける変数の型をお互いのサブクラスに変更します。

```java
final Request source3 = new File("/data/~~~.txt");
final File source4 = new Request("https://~~~");
```

すると、このようなエラーがえられます。

```java
incompatible types: File cannot be converted to Request
  final Request source3 = new File("/data/~~~.txt");
                          ^
incompatible types: Request cannot be converted to File
  final File source4 = new Request("https://~~~");
                       ^
```

これは公称型に慣れ親しんでいる方にとっては至極当然の結果です。FileはRequestではなく、RequestはFileではないため入れ替えることはできません。

### 構造的部分型の場合

以下はTypeScriptでの紹介です。

```ts
class InputSource {
  public fetch(): Data {
    throw new Error("Please implement InputSource and override this method");
  }
}

class File extends InputSource {
  public readonly destination: string;

  public constructor(destination: string) {
    super();
    this.destination = destination;
  }

  public fetch(): Data {
    const reader: Reader = FileSystem.readFrom(this.destination);
    // ...

    return data;
  }
}

class Request extends InputSource {
  public readonly destination: string;

  public constructor(destination: string) {
    super();
    this.destination = destination;
  }

  public fetch(): Data {
    const response: Response = HTTPRequest.get(this.destination);
    // ...

    return data;
  }
}
```

こちらも同様にリスコフの置換原則が成立するのでスーパークラスの変数でサブクラスを受けることができます。

```ts
const source1: InputSource = new File("/data/~~~.txt");
const source2: InputSource = new Request("https://~~~~");

const data1: Data = source1.fetch();
const data2: Data = source2.fetch();
```

次に、先ほどと同じように結果を受ける変数の型をお互いのサブクラスに変更します。

```ts
const source3: Request = new File("/data/~~~.txt");
const source4: File = new Request("https://~~~~");

const data3: Data = source3.fetch();
const data4: Data = source4.fetch();
```

するとこれはエラーが出ることなく実行できます。これが構造的部分型の大きな特徴で、File, Requestのシグネチャが同じために可換になります。

```ts
interface IInputSource {
  destination: string;

  fetch(): Data;
}
```

File, Requestは共にこのIInputSourceのようなインターフェースであると解釈されるためこのようなことが起こります。

## TypeScriptでさらに注意すること

今回の例は共に同じスーパークラスを持つサブクラスの話でしたが、実はこれは**スーパークラスが異なっていても起こりえます**。スーパークラスのInputSourceを上記TypeScriptの例から抹消してしまっても同様にこのコードは動作します。

```ts
class File {
  public destination: string;

  public constructor(destination: string) {
    this.destination = destination;
  }

  public fetch(): Data {
    const reader: Reader = FileSystem.readFrom(this.destination);
    // ...

    return data;
  }
}

class Request {
  public destination: string;

  public constructor(destination: string) {
    this.destination = destination;
  }

  public fetch(): Data {
    const response: Response = HTTP.get(this.destination);
    // ...

    return data;
  }
}

const source3: Request = new File("/data/~~~.txt");
const source4: File = new Request("https://~~~~");

const data3: Data = source3.fetch();
const data4: Data = source4.fetch();
```

消えたのはInputSourceと、その継承を示す`extends InputSource`と`super();`だけです。このコードは正常なTypeScriptのコードとして動作します。

## 関連情報

[公称型クラス](../object-oriented/class/class-nominality.md)
