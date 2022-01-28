# インターフェースを実装する

TypeScriptでは、クラスがインターフェースを実装できます。実装するには`implements`キーワードを用います。

```ts
interface Human {
  think(): void;
}

class Developer implements Human {
  think(): void {
    console.log("どういう実装にしようかな〜");
  }
}
```

インターフェースを複数指定することもできます。そのときは`,`でインターフェースを区切り列挙します。

```ts
interface Human {
  think(): void;
}

interface Programmer {
  writeCode(): void;
}

class TypeScriptProgrammer implements Human, Programmer {
  think(): void {
    console.log("どういうコードにしようかな〜");
  }

  writeCode(): void {
    console.log("カタカタ");
  }
}
```

インターフェースで定義されたフィールドをクラスで実装するには、クラス側にはフィールドを定義します。

```ts
interface Human {
  name: string;
}

class Developer implements Human {
  name: string = "Bob";
}
```
