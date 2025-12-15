# Implement interface

Trong TypeScript, class có thể implement interface. Để implement, sử dụng từ khóa `implements`.

```ts twoslash
interface Human {
  think(): void;
}

class Developer implements Human {
  think(): void {
    console.log("どういう実装にしようかな〜");
  }
}
```

Có thể chỉ định nhiều interface. Trong trường hợp đó, liệt kê các interface phân tách bằng dấu `,`.

```ts twoslash
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

Để implement field được định nghĩa trong interface ở class, định nghĩa field ở phía class.

```ts twoslash
interface Human {
  name: string;
}

class Developer implements Human {
  name: string = "Bob";
}
```
