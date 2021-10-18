# 変数宣言の型注釈 \(type annotation\)

TypeScriptでは変数宣言するときに、その変数にどんな値が代入可能かを指定できます。その指定のことを型注釈\(type annotation; 型アノテーション\)と言います。変数宣言の型注釈は、次のように変数名の右に型を書きます。

```typescript
const num: number = 123;
//       ^^^^^^^^ 型注釈
```

JavaやGo、PHPなどの言語も変数に対して型を宣言できますが、変数名と型を書く位置は左右逆です。それらの言語に慣れている方は注意しましょう。

```javascript
int num = 123; // Java
```



