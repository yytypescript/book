# インターフェースとinstanceof

[instanceof演算子](../class/instanceof-operator.md)は、オブジェクトがクラスのインスタンスかを判定するJavaScriptの演算子です。ここでは、`instanceof`演算子がTypeScriptのインターフェースとどのような関係にあるのかを解説します。

## 他言語の`instanceof`との違い

JavaやPHPなど他の言語の`instanceof`演算子は、インターフェースに用いることができる言語もありますので、他言語の次にTypeScriptに学ぶ場合は注意してください。次はPHPで`instanceof`演算子をインターフェースに使っている例です。

```php title="PHPのinstanceof演算子の例"
interface MyInterface
{
}

class MyClass implements MyInterface
{
}

$a = new MyClass();
var_dump($a instanceof MyInterface);
//=> bool(true)
```

### `instanceof`はインターフェースに使えない

TypeScriptは上のような言語とは異なり、`instanceof インターフェイス名`で型を判定することができません。もしも、`instanceof`演算子にインターフェース名を使うと、コンパイルエラーになります。

```ts twoslash title="TypeScriptでinstanceof演算子を使うとコンパイルエラーになる例"
// @errors: 2693
interface MyInterface {}

class MyClass implements MyInterface {}

const a = new MyClass();
console.log(a instanceof MyInterface);
```

なぜかというと、インターフェースがTypeScript固有の機能でコンパイル時にコードから消えるためです。インターフェースは型レベルのものです。TypeScriptはJavaScriptにコンパイルするとき、型レベルのものを消します。変数の型注釈がコンパイル時に消えるのと同じ理屈です。

コンパイル時に消えるということは、JavaScript実行時にインターフェースの情報が、どこにもないということです。そのため、`instanceof`がインターフェース名を取ることができないというわけです。

## インターフェースの判定には型ガード関数を使う

実行時に値がインターフェースと互換しているかを判定するには、[型ガード関数](../../functions/type-guard-functions.md)を用います。型ガード関数は、型を判定したい値を引数に取り、`true`または`false`を返す関数です。たとえば、値が`Student`インターフェース型であるかを判定する関数は次のようになります。

```ts twoslash
interface Student {
  name: string;
  grade: number;
}

// Student型かを判定する型ガード関数
function isStudent(value: unknown): value is Student {
  // 値がオブジェクトであるかの判定
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { name, grade } = value as Record<keyof Student, unknown>;
  // nameプロパティーが文字列型かを判定
  if (typeof name !== "string") {
    return false;
  }
  // gradeプロパティーが数値型かを判定
  if (typeof grade !== "number") {
    return false;
  }
  return true;
}
```

そして、この`isStudent`関数を`instanceof`の代わりに用いると、実行時に型の判定ができるようになります。

```ts twoslash
interface Student {
  name: string;
  grade: number;
}

// Student型かを判定する型ガード関数
function isStudent(value: unknown): value is Student {
  // 値がオブジェクトであるかの判定
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { name, grade } = value as Record<keyof Student, unknown>;
  // nameプロパティが文字列型かを判定
  if (typeof name !== "string") {
    return false;
  }
  // gradeプロパティが数値型かを判定
  if (grade !== "number") {
    return false;
  }
  return true;
}
// ---cut---
const tom: object = { name: "Tom", grade: 2 };
//    ^?
if (isStudent(tom)) {
  tom;
  // ^?
}
```

型ガード関数の詳細については、次のページをご覧ください。

[型ガード関数](../../functions/type-guard-functions.md)

## 複雑なインターフェースの判定はzodが便利

型ガード関数の例として、上で`isStudent`の実装を示しましたが、中身を見てみるとプロパティーごとに型を判定するロジックが必要なのが分かります。プロパティーが少なければ、型ガード関数の実装は短く保守可能な範囲に収まりますが、プロパティーが多くなると保守困難なコードになると想像されます。

そのようなケースで便利なのが[zod](https://zod.dev/)です。zodはオブジェクトの構造をチェックするライブラリで、TypeScript向けに作られています。zodでは、オブジェクトの構造を定義すると、構造をチェックする型ガード関数が得られます。次は、`isStudent`をzodで実装した例です。

```ts twoslash
import z from "zod";

// zodによるスキーマの定義
const studentSchema = z.object({
  name: z.string(),
  grade: z.number(),
});
// インターフェースの型を導出
type Student = z.infer<typeof studentSchema>;
//   ^?
// 型ガード関数
function isStudent(value: unknown): value is Student {
  return studentSchema.safeParse(value).success;
}
// 型の判定
const tom: object = { name: "Tom", grade: 2 };
if (isStudent(tom)) {
  tom;
  //^?
}
```

zodを用いると、宣言的なコードになることで、型ガード関数の細かい実装を自分で書かなくてよくなることがわかるかと思います。プロパティーの数が多いインターフェースや、プロパティーがネストされて構造化されたインターフェースの型ガード関数が必要になった場合は、zodの導入を検討してみるといいでしょう。

## 抽象クラスと`instanceof`

TypeScriptにはインターフェースの似たものに[抽象クラス](./../class/abstract-class.md)があります。抽象クラスはインターフェースと異なり、`instanceof`演算子が使えます。これは、抽象クラスはコンパイルしても、クラスとして残るためです。

```ts twoslash
abstract class AbstractClass {}
class ConcreteClass extends AbstractClass {}
const obj = new ConcreteClass();
console.log(obj instanceof AbstractClass);
// @log: true
```
