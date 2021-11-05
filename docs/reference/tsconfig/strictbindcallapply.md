# strictBindCallApply

リリースされたバージョン: 3.2

`function.bind(), function.call(), function.apply()` はその関数を実行します。どれも第2引数以降にその関数の引数を代入できます。

たとえば、与えられた引数の名、姓からイニシャルを返す関数`initial()`を考えます。与えられた文字列に対する例外検査などが少々甘いですが実装は次のようになります。

```typescript
function initial(givenName: string, surname: string): string {
  return `${givenName[0].toUpperCase()}. ${surname[0].toUpperCase()}`;
}
```

このとき`function.bind(), function.call(), function.apply()`を使って関数を呼び出すには次のようにします。

```typescript
initial("salvador", "dali");
// -> 'S. D'
initial.bind(null, "salvador", "dali")();
// -> 'S. D'
initial.call(null, "salvador", "dali");
// -> 'S. D'
initial.apply(null, ["salvador", "dali"]);
// -> 'S. D'
```

これらの関数の問題点は、例え関数が引数にある型を要求するように作っていたとしても任意の値を代入できてしまうことでした。
引数を本来の`string`型から他の型に変えて実行するとすべて実行時エラーになります。

```typescript
initial.bind(null, "salvador", 5)();
// TypeError: Cannot read property 'toUpperCase' of undefined
initial.call(null, "salvador", 5);
// TypeError: Cannot read property 'toUpperCase' of undefined
initial.apply(null, ["salvador", 5]);
// TypeError: Cannot read property 'toUpperCase' of undefined
```

このオプションを有効にするとこれらの関数呼び出しのときの引数の評価が厳密になり実行することができなくなります。

```text
// error of initial.bind()
error TS2769: No overload matches this call.
  Overload 1 of 6, '(this: (this: any, arg0: "salvador", arg1: string) => string, thisArg: any, arg0: "salvador", arg1: string): () => string', gave the following error.
    Argument of type 'number' is not assignable to parameter of type 'string'.
  Overload 2 of 6, '(this: (this: any, ...args: "salvador"[]) => string, thisArg: any, ...args: "salvador"[]): (...args: "salvador"[]) => string', gave the following error.
    Argument of type '5' is not assignable to parameter of type '"salvador"'.

initial.bind(null, 'salvador', 5)();
                               ~
// error of initial.call()
error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

initial.call(null, 'salvador', 5);
                               ~

// error of initial.apply()
error TS2322: Type 'number' is not assignable to type 'string'.

initial.apply(null, ['salvador', 5]);
                                 ~
```
