# インターフェース

TypeScriptでは型を表現する方法の一つとしてインターフェースが存在します。

## インターフェースを定義する

TypeScriptでは `interface` キーワードでインターフェースを定義できます。

```typescript
interface Person {
    name: string;
    age: number;
}
```

## TypeScriptのインターフェース

Javaなどのオブジェクト指向言語ではクラスの抽象的な型定義として利用されます。そのため、インターフェース単体では利用されず、特定のクラスがインターフェースを継承し実装を追加する事で初めて効果を発揮します。

TypeScriptではインターフェースは型注釈として利用できるため、オブジェクトの型をInterfaceで定義するという使い方ができます。

```typescript
interface Person {
    name: string;
    age: number;
}

const taro: Person = {
    name: '太郎',
    age: 12,
}
```

## オプショナルな型の指定

プロパティはデフォルトで指定が必須となります。

```typescript
interface Person {
    name: string;
    age: number:
}

// "age" が未指定なのでコンパイルエラー
// Property 'age' is missing in type '{ name: string; }' 
// but required in type 'Person'.
const taro: Person = {
    name: '太郎',
}
```

`?` を付与することで、省略可能なプロパティとする事ができます。

これは `T | undefined` と書く場合と同じです。

```typescript
interface Person {
    name: string;
    age?: number; // ?が付いているので省略可能
    weight: number | undefined; // weight?: number; と同じ
}

// "age", "weight" は未指定でもOK
const taro: Person = {
    name: '太郎',
}
```

TypeScript（というよりはJavaScript）では、`undefined` と `null` は異なる値となるため、 `null` を指定した場合はプロパティは省略可能になりません。

```typescript
interface Person {
    name: string;
    age: number | null;
}

// "age" は number型かnullの指定が必須
// Property 'age' is missing in type '{ name: string; }' 
// but required in type 'Person'.
const taro: Person = {
    name: '太郎',
}
```

## 読み取り専用のプロパティ

`readonly` キーワードを指定することでプロパティを読み取り専用にする事ができます。

```typescript
interface Person {
    name: string;
    readonly age: number;
}

const taro: Person = {
    name: '太郎',
    age: 20,
}

// 値の書き換えは可能
taro.name = 'タロウ';

// 読み取り専用なので値の書き換えをするとコンパイルエラー
// Cannot assign to 'age' because it is a read-only property.
taro.age  = 30;
```

## キーの型指定

オブジェクトのキーに対して型を指定する事ができます。  
これを **インデックスシグネチャ** と呼びます。

JavaScriptはオブジェクトのキーとして、文字列・数値・シンボル型を使う事ができます。  
例えば、何かのIDをキーにして値を保持したい時に、キーに数値以外の型を利用できなくすれば、安心して利用する事ができます。

```typescript
// メッセージIDをキーにしてメッセージを管理する型を作りたい
interface Messages {
    [id: number]: string;
}

let messages: Messages = [];
messages[0] = "これはOK”;
messages['error'] = "これはNG";
```

## 継承

`extends` キーワードを利用して定義済みのインターフェースを継承して新たにインターフェースを定義する事ができます。  
インターフェースを継承した場合、継承元のプロパティの型情報は全て引き継がれます。

```typescript
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    grade: number; // 学年
}

interface Teacher {
    students: Student[];  // 生徒
}

const studentA: Student = {
    name: '花子',
    age: 10,
    grade: 3,
}

const teacher: Teacher = {
    name: '太郎',
    age: 30,
    students: [studentA],
}
    
```

#### プロパティの上書きについて

インターフェースを継承した場合は部分型に限り継承元のプロパティを上書きする事ができます。

```typescript
interface Person {
    age: number | undefined;
}

interface Student extends Person {
    age: number; // number は number | undefined の一部なのでOK
}

// コンパイルエラー
interface Teacher extends Person {
    age: string; // string は number | undefined の一部でないのでNG
}
```

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

| メインライター | 対応スケジュール |
| :--- | :--- |
| t-yng | 4/3 初版の執筆完了 |



