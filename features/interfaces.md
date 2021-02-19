# インターフェース \(Interfaces\)

TypeScriptでは型を表現する方法のひとつとしてインターフェースが存在します。

## インターフェースを定義する

TypeScriptでは`interface` キーワードでインターフェースを定義できます。

```typescript
interface Person {
    name: string;
    age: number;
}
```

## TypeScriptのインターフェース

Javaなどのオブジェクト指向言語ではクラスの抽象的な型定義として利用されます。そのため、インターフェース単体では利用されず、特定のクラスがインターフェースを継承し実装を追加することで初めて効果を発揮します。

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

## プロパティの宣言で使える便利な記号

タイプエイリアスと同じようにインターフェースの定義ではプロパティの宣言で選択可\(Optional\)、読み取り専用\(Readonly\)にすることができます。同様にインデックス型も使用可能です。こちらについては説明が重複しますのでタイプエイリアスのページをご参照ください。

{% page-ref page="type-aliases.md" %}

## 継承 \(Inheritance\)

`extends`キーワードを利用して定義済みのインターフェースを継承して新たにインターフェースを定義することができます。  
インターフェースを継承した場合、継承元のプロパティの型情報はすべて引き継がれます。新しくプロパティを追加することもできますし、すでに宣言されているプロパティの型を部分型に指定しなおすこともできます。

### プロパティを追加する

```typescript
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    grade: number; // 学年
}

interface Teacher extends Person {
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

### プロパティを部分型に宣言しなおす

ある型からその型のリテラル型にすることも、ユニオン型から部分的に選択することもTypeScriptではそれぞれサブタイプにしていることと同じ意味があります。もちろん他のオブジェクト指向の言語と同じようにサブクラスにすることもできます。

#### リテラル型に変更する

```typescript
interface WebPage {
  path: string;
}

interface IndexPage extends WebPage {
  path: '/';
}
```

#### ユニオン型から選ぶ

```typescript
interface Person {
  age: number | undefined;
}

interface Student extends Person {
  age: number;
}
```

## 実装\(Implementation\)

他の言語と同じようにインターフェースをクラスが実装することもできます。実装時に複数のインターフェースを指定することもできます。そのときは`,`でインターフェースを区切り列挙します。このとき同じ名前のプロパティが違う型で衝突すると、その型は`never`型になります。`never`型の変数には値の代入ができません。

```typescript
interface Measurements {
  bust: number;
  waist: number;
  hip: number;
}

interface SensitiveSizes {
  bust: 'secret';
  waist: 'secret';
  hip: 'secret';
}

class Adorescent implements Measurements, SensitiveSizes {
  // bust: never;
  // waist: never;
  // hip: never;
}
```

## インターフェースが抱える問題

インターフェースはTypeScriptで独自に定義された概念であり、JavaScriptには存在しません。つまりコンパイルをかけると消えてなくなります。そのため他の言語でできるような**その型が期待するインターフェースかどうか**の判定ができません。上記の`Student`インターフェースで次のようなことをしても実行することはできません。

```typescript
if (studentA instanceof Student) {
  // ...
}
// 'Student' only refers to a type, but is being used as a value here.
```

これを解消するためには型ガードを自前で実装する必要があります。以下はその例の`isStudent()`です。

```typescript
type UnknownObject<T extends object> = {
  [P in keyof T]: unknown;
};

function isStudent(obj: unknown): obj is Student {
  if (typeof obj !== 'object') {
    return false;
  }
  if (obj === null) {
    return false;
  }

  const {
    name,
    age,
    grade
  } = obj as UnknownObject<Student>;

  if (typeof name !== 'string') {
    return false;
  }
  if (typeof age !== 'number') {
    return false;
  }
  if (typeof grade !== 'number') {
    return false;
  }

  return true;
}
```

以下は`isStudent()`の解説です。

### 戻り値の`obj is Student`

Type predicateと呼ばれる機能です。専門に解説してあるページがありますので参照ください。ここではこの関数が戻り値として`true`を返すと、呼び出し元では引数`obj`が`Student`として解釈されるようになります。

{% page-ref page="type-guards.md" %}

### `UnknownObject`

`typeof`で判定される`object`型はオブジェクトではあるものの、プロパティが何も定義されていない状態です。そのためそのオブジェクトがどのようなプロパティを持っているかの検査すらできません。

```typescript
const obj: object = {
  name: '花子'
};

obj.name;
// Property 'name' does not exist on type 'object'.
```

そこでインデックス型を使っていったんオブジェクトのいかなるプロパティも`unknown`型のオブジェクトであると型アサーションを使い解釈させます。これですべての`string`型のプロパティにアクセスできるようになります。あとは各々の`unknown`型のプロパティを`typeof, instanceof`で判定させれば**この関数の判定が正しい限り**TypeScriptは引数が期待する`Student`インターフェースを実装したオブジェクトであると解釈します。

### 関数の判定が正しい限りとは

インターフェースに変更が加わった時この関数も同時に更新されないとこの関係は崩れてしまいます。たとえば`student.name`は現在`string`型ですが、これが姓名の区別のために次のようなオブジェクトに差し替えられたとします。

```typescript
interface Name {
  surname: string;
  givenName: string;
}
```

この変更に対し`isStudent()`も随伴して更新されなければこの関数が`Student`インターフェースであると判定するオブジェクトの`name`プロパティは明らかに違うものになるでしょう。

