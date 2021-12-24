---
sidebar_label: インターフェースの継承
---

# インターフェースの継承 (inheritance)

TypeScriptでは、`extends`キーワードを利用して定義済みのインターフェースを継承して、新たにインターフェースを定義することができます。インターフェースを継承した場合、継承元のプロパティの型情報はすべて引き継がれます。新しくプロパティを追加することもできますし、すでに宣言されているプロパティの型を部分型に指定しなおすこともできます。

## プロパティを追加する

```ts
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  grade: number; // 学年
}

interface Teacher extends Person {
  students: Student[]; // 生徒
}

const studentA: Student = {
  name: "花子",
  age: 10,
  grade: 3,
};

const teacher: Teacher = {
  name: "太郎",
  age: 30,
  students: [studentA],
};
```

## プロパティを部分型に宣言しなおす

ある型からその型のリテラル型にすることも、ユニオン型から部分的に選択することもTypeScriptではそれぞれサブタイプにしていることと同じ意味があります。もちろん他のオブジェクト指向の言語と同じようにサブクラスにすることもできます。

### リテラル型に変更する

```ts
interface WebPage {
  path: string;
}

interface IndexPage extends WebPage {
  path: "/";
}
```

### ユニオン型から選ぶ

```ts
interface Person {
  age: number | undefined;
}

interface Student extends Person {
  age: number;
}
```
