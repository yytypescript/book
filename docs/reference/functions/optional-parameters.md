---
sidebar_label: オプション引数
---

# オプション引数 (optional parameter)

オプション引数(optional parameter)は、渡す引数を省略できるようにするTypeScript固有の機能です。オプション引数は疑問符`?`を引数名の後ろに書くことで表現します。

## オプション引数の構文

```ts twoslash
interface 型 {}
// ---cut---
// @noImplicitAny: false
function 関数名(引数名?: 型) {}
//                  ^オプション引数の標示
```

オプション引数は、関数を呼び出すときに引数が省略できます。

```ts twoslash
function hello(person?: string) {}
hello(); // 引数を省略して呼び出せる
hello("alice"); // 省略しない呼び出しももちろんOK
```

## 省略すると`undefined`になる

オプション引数の型は、型と`undefined`の[ユニオン型](./../values-types-variables/union.md)になります。ユニオン型は日本語で言うと「いずれか」の意味です。上の例では、引数`person`は`string | undefined`型になります。

```ts twoslash
function hello(person?: string) {}
//             ^?
```

引数を省略した場合、オプション引数の実行時の値は`undefined`になります。

```ts twoslash
function hello(person?: string) {
  console.log(person);
}
hello();
// @log: undefined
```

## オプション引数の取り回し

オプション引数は、型が`undefined`とのユニオン型になるため、そのままでは使えません。たとえば、次のコードはstringの`toUpperCase`メソッドを呼び出すコードです。これはコンパイルエラーになります。なぜなら、`person`が`undefined`型である可能性があるからです。そして、`undefined`には`toUpperCase`メソッドがありません。

```ts twoslash
// @errors: 18048
function hello(person?: string) {
  return "Hello " + person.toUpperCase();
}
```

この問題を解消するには、次の2つの方法があります。

### デフォルト値を代入する

引数が`undefined`の場合分けを`if`文で書き、そこでデフォルト値を代入する方法です。

```ts twoslash {2-4}
function hello(person?: string) {
  if (typeof person === "undefined") {
    person = "anonymous";
  }
  return "Hello " + person.toUpperCase();
}
```

Null合体代入演算子`??=`でデフォルト値を代入する方法もあります。

```ts twoslash {2}
function hello(person?: string) {
  person ??= "anonymous";
  return "Hello " + person.toUpperCase();
}
```

さらに、デフォルト引数を指定することでも同じことができます。多くのケースでは、デフォルト引数を使うほうがよいです。

```ts twoslash {1-2}
function hello(person: string = "anonymous") {
  //                          ^^^^^^^^^^^^^デフォルト引数
  return "Hello " + person.toUpperCase();
}
```

[デフォルト引数](./default-parameters.md)

### 処理を分ける

オプション引数を取り回すもうひとつの方法は、処理を分けることです。

```ts twoslash {2-4}
function hello(person?: string) {
  if (typeof person === "undefined") {
    return "Hello ANONYMOUS";
  }
  return "Hello " + person.toUpperCase();
}
```

## `T | undefined`との違い

オプション引数はユニオン型`T | undefined`として解釈されます。であれば、引数の型を`T | undefined`と書けば同じなはずです。なぜTypeScriptは、疑問符`?`という別の記法を用意したのでしょうか。違いがあるのでしょうか。

これには呼び出す側で、**引数を省略できるかどうかという違い**が生まれます。オプション引数は引数自体を省略できますが、`T | undefined`型の引数は引数が省略できません。

たとえば、次のオプション引数の関数は引数なしで呼び出せます。

```ts twoslash
function hello(person?: string) {}
hello(); // 引数を省略して呼び出せる
```

一方、次のような`undefined`とのユニオン型の引数は、引数なしではコンパイルエラーになります。

```ts twoslash
// @errors: 2554
function hello(person: string | undefined) {}
hello();
```

この関数を呼び出すためには、`undefined`を渡す必要があります。

```ts twoslash {2}
function hello(person: string | undefined) {}
hello(undefined);
```

## オプション引数の後に普通の引数は書けない

オプション引数は必ず最後に書かなければいけません。次のようにオプション引数より後ろに普通の引数を書くと、コンパイルエラーになります。

```ts twoslash
// @errors: 1016
function func(foo?: string, bar: string) {}
```
