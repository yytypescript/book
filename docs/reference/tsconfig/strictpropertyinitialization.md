---
description: プロパティの初期化を必須にする
tags: [strict]
---

# strictPropertyInitialization

`strictPropertyInitialization`はプロパティの初期化を必須にするコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: 2.7
- TypeScript公式が有効化推奨

## 解説

このオプションを有効にするために`strictNullChecks`も同様に有効にする必要があります。

クラスのプロパティは初期化しない状態では`undefined`が格納されます。

```typescript
class User {
  public name: string;
  public gender: string;
  public age: number;
}

const user: User = new User();

console.log(user.name);
// -> undefined
console.log(user.gender);
// -> undefined
console.log(user.age);
// -> undefined
```

これはクラスの宣言時に、コンストラクタで各プロパティが初期化されていないためです。
このオプションを有効にすると宣言されたプロパティは`undefined`とのユニオン型またはオプション修飾子がついている場合を除いて必ずコンストラクタの呼び出しの時点で初期化をする必要があります。

```typescript
class User {
  public name: string | undefined;
  public gender?: string;
  public age: number;
}

const user: User = new User();
```

```text
error TS2564: Property 'age' has no initializer and is not definitely assigned in the constructor.

public age: number;
       ~~~
```

これを回避するためにはコンストラクタで初期化するか、初期値を設定します。

```typescript
class User {
  public name: string | undefined;
  public gender?: string;
  public age: number;

  public constructor(age: number) {
    this.age = age;
  }
}
```

```typescript
class User {
  public name: string | undefined;
  public gender?: string;
  public age: number = 100;
}
```
