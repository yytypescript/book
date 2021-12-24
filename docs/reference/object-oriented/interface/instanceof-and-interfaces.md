# インターフェースとinstanceof

インターフェースはTypeScriptで独自に定義された概念であり、JavaScriptには存在しません。つまりコンパイルをかけると消えてなくなります。そのため他の言語でできるような**その型が期待するインターフェースかどうか**の判定ができません。上記の`Student`インターフェースで次のようなことをしても実行することはできません。

```ts
if (studentA instanceof Student) {
  // ...
}
// 'Student' only refers to a type, but is being used as a value here.
```

これを解消するためには型ガードを自前で実装する必要があります。以下はその例の`isStudent()`です。

```ts
type UnknownObject<T extends object> = {
  [P in keyof T]: unknown;
};

function isStudent(obj: unknown): obj is Student {
  if (typeof obj !== "object") {
    return false;
  }
  if (obj === null) {
    return false;
  }

  const { name, age, grade } = obj as UnknownObject<Student>;

  if (typeof name !== "string") {
    return false;
  }
  if (typeof age !== "number") {
    return false;
  }
  if (typeof grade !== "number") {
    return false;
  }

  return true;
}
```

以下は`isStudent()`の解説です。

## 戻り値の`obj is Student`

Type predicateと呼ばれる機能です。専門に解説してあるページがありますので参照ください。ここではこの関数が戻り値として`true`を返すと、呼び出し元では引数`obj`が`Student`として解釈されるようになります。

[型ガード関数 (type guard function)](../../functions/type-guard-functions.md)

## `UnknownObject`

`typeof`で判定される`object`型はオブジェクトではあるものの、プロパティが何も定義されていない状態です。そのためそのオブジェクトがどのようなプロパティを持っているかの検査すらできません。

```ts
const obj: object = {
  name: "花子",
};

obj.name;
// Property 'name' does not exist on type 'object'.
```

そこでインデックス型を使っていったんオブジェクトのいかなるプロパティも`unknown`型のオブジェクトであると型アサーションを使い解釈させます。これですべての`string`型のプロパティにアクセスできるようになります。あとは各々の`unknown`型のプロパティを`typeof, instanceof`で判定させれば**この関数の判定が正しい限り**TypeScriptは引数が期待する`Student`インターフェースを実装したオブジェクトであると解釈します。

## 関数の判定が正しい限りとは

インターフェースに変更が加わった時この関数も同時に更新されないとこの関係は崩れてしまいます。たとえば`student.name`は現在`string`型ですが、これが姓名の区別のために次のようなオブジェクトに差し替えられたとします。

```ts
interface Name {
  surname: string;
  givenName: string;
}
```

この変更に対し`isStudent()`も随伴して更新されなければこの関数が`Student`インターフェースであると判定するオブジェクトの`name`プロパティは明らかに違うものになるでしょう。
