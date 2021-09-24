# インターフェースを実装する

TypeScriptでは、クラスがインターフェースを実装できます。実装するには`implements`キーワードを用います。

```typescript
interface Human {
  think(): void;
}

class Developer implements Human {
  think(): void {
    console.log("どういう実装にしようかな〜");
  }
}
```

インターフェイスを複数指定することもできます。そのときは`,`でインターフェースを区切り列挙します。

```typescript
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

## 

