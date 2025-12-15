---
sidebar_label: Method
---

# Method (method)

Để implement method trong class của JavaScript, sử dụng cú pháp method.

```js twoslash
class Greeter {
  greet(name) {
    return `Hello, ${name}!`;
  }
}
```

## Type annotation cho method

Trong TypeScript, có thể type annotation cho tham số và giá trị trả về của method.

```ts twoslash
class Greeter {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
```

Type annotation cho method giống với type annotation cho function declaration. Có thể bỏ qua type annotation cho tham số và giá trị trả về. Về hành vi trong trường hợp đó, tham khảo function declaration.

[Function declaration (function declaration)](../../functions/function-declaration.md)
