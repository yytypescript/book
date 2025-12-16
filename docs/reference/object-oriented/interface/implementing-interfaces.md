# Implement interface

Trong TypeScript, class có thể implement interface. Để implement, sử dụng từ khóa `implements`.

```ts twoslash
interface Human {
  think(): void;
}

class Developer implements Human {
  think(): void {
    console.log("Mình sẽ implement như thế nào nhỉ~");
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
    console.log("Mình sẽ viết code như thế nào nhỉ~");
  }

  writeCode(): void {
    console.log("Tạch tạch tạch");
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
