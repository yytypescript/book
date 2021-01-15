# 構造的部分型 \(Structural Subtyping\)

オブジェクト指向。そこまでとはいかなくてもクラスを扱うことができる言語において、ある元となる型\(基本型: supertype\)とその継承関係にある型\(派生型: subtype\)という話は欠かすことができません。

## 構造的部分型とは

プログラミング言語の派生型の方式は公称型\(nominal typing\)と構造的部分型\(structural subtyping\)の2種類が存在します。どちらも派生型の定義として**リスコフの置換原則**を満たしており、どちらが正しいというものではありません。それぞれが正しい、異なる派生型の解釈です。

公称型と構造的部分型の違いを理解しておくことでより安全で堅牢なTypeScriptができるようになります。

### 公称型\(Nominal Typing\)

Java, C++で採用されている定義です。  
ある型を基本型にする派生型は、互いに置換ができません。

### 構造的部分型\(Structural Subtyping\)

Go, TypeScriptで採用されている定義です。  
その型の見た目\(シグネチャ\)が等しければ置換可能であるという点が公称型と大きく異なっています。公称型ほど硬くはなく、とはいえ型の恩恵は受けたいというやや緩い型付けです。

## 実際の例で見る

データを意味するクラスのDataを、ファイル読み込みで取得する場合と他のサーバーにリクエストを送信して取得する場合を考えます。InputSourceという親クラス\(基本型\)を考え、その子クラス\(派生型\)としてFile, Requestを考えます。Dataクラスの構造は重要ではないので**欲しいデータがそのような形をしている**程度に考えてください。

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

このようなクラスの関係であればリスコフの置換原則から次のようにして動かすことができます。これはFile, Requestのインスタンスを親クラスの変数で受けていることを意味します。

```java
final InputSource source1 = new File("/data/~~~.txt");
final InputSource source2 = new Request("https://~~~");

final Data data1 = source1.fetch();
final Data data2 = source2.fetch();
```

次に、次のように結果を受ける変数の型をお互いの子クラスに変更します。

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

```typescript
class InputSource {
  public fetch(): Data {
    throw new Error('Please implement InputSource and override this method');
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

こちらも同様にリスコフの置換原則が成立するので親クラスの変数で子クラスを受けることができます。

```typescript
const source1: InputSource = new File('/data/~~~.txt');
const source2: InputSource = new Request('https://~~~~');

const data1: Data = source1.fetch();
const data2: Data = source2.fetch();
```

次に、先ほどと同じように結果を受ける変数の型をお互いの子クラスに変更します。

```typescript
const source3: Request = new File('/data/~~~.txt');
const source4: File = new Request('https://~~~~');

const data3: Data = source3.fetch();
const data4: Data = source4.fetch();
```

するとこれはエラーが出ることなく実行できます。これが構造的部分型の大きな特徴で、File, Requestのシグネチャが同じために可換になります。

```typescript
interface IInputSource {
  destination: string;

  fetch(): Data;
}
```

File, Requestは共にこのIInputSourceのようなインターフェースであると解釈されるためこのようなことが起こります。

## TypeScriptでさらに注意すること

今回の例は共に同じ親クラスを持つ子クラスの話でしたが、実はこれは**親クラスが異なっていても起こりえます**。親クラスのInputSourceを上記TypeScriptの例から抹消してしまっても同様にこのコードは動作します。

```typescript
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

const source3: Request = new File('/data/~~~.txt');
const source4: File = new Request('https://~~~~');

const data3: Data = source3.fetch();
const data4: Data = source4.fetch();
```

消えたのはInputSourceと、その継承を示す`extends InputSource`と`super();`だけです。このコードは正常なTypeScriptのコードとして動作します。

## 公称型に慣れている人が注意すべきこと

このような特徴があるためにタイプセーフが目的で導入されることがあるValue Objectについては細心の注意を払う必要があります。たとえばUUIDを主キーとして持つUserId, GroupIdを定義します。これを構造的部分型のカラクリを知らないで実装すると次のようになります。

```typescript
class UserId {
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }
}

class GroupId {
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }
}
```

これらのクラスは前章で述べたとおりシグネチャが同じため可換になってしまいます。

```typescript
const id1: UserId = new GroupId('9566d14b-7ea0-4328-8e66-6ab432d459fb');
const id2: GroupId = new UserId('aae645a2-eb3f-406c-8845-3b1e56d4c28e');
```

タイプセーフを確保したい時に使える方法はひとつではなくいくつか存在しますが、ここではそのうちもっともわかりやすいひとつを紹介します。

### ユニークになるようにプロパティと型の組み合わせを与える

シグネチャが異なるように設定することでタイプセーフを確保できるのでそのようにプロパティを与えます。とはいえ毎回違う名前のプロパティを設定するのは簡単ではないため、型を使って調整します。

```typescript
class UserId {
  public readonly klazzName: 'UserId' = 'UserId';
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }
}

class GroupId {
  public readonly klazzName: 'GroupId' = 'GroupId';
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }
}
```

UserId, GroupIdは共に`klazzName`というプロパティを持ちましたが、型のリテラルタイプが異なります。このようにすることでTypeScriptはUserId, GroupIdを異なる型と認識し、タイプセーフになります。

```typescript
Type 'GroupId' is not assignable to type 'UserId'.
  Types of property 'klazzName' are incompatible.
    Type '"GroupId"' is not assignable to type '"UserId"'.

const id1: UserId = new GroupId('9566d14b-7ea0-4328-8e66-6ab432d459fb');
      ~~~
Type 'UserId' is not assignable to type 'GroupId'.
  Types of property 'klazzName' are incompatible.
    Type '"UserId"' is not assignable to type '"GroupId"'.

const id2: GroupId = new UserId('aae645a2-eb3f-406c-8845-3b1e56d4c28e');
      ~~~
```

実行するとこのようなエラーが発生します。置換することができなくなります。

