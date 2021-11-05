# useUnknownInCatchVariables

リリースされたバージョン: 4.4

JavaScript はいかなる値も例外として投げることができます。そのため補足した値は`any`型でした。

```typescript
// case 1
try {
  throw new Error();
} catch (err) {
  // err is any
}

// case 2
try {
  throw "This is an error!";
} catch (err) {
  // err is any
}

// case 3
try {
  throw undefined;
} catch (err) {
  // err is any
}
```

この混沌は TypeScript4.0 でようやく整理されることとなりました。補足した値に対して`unknown`型を明記することによって補足した値の型はわからないものの型安全を獲得できるようになりました。

```typescript
// case 1
try {
  throw new Error();
} catch (err) {
  // err is any
}

// case 2
try {
  throw "This is an error!";
} catch (err: unknown) {
  // err is unknown
}

// case 3
try {
  throw undefined;
} catch (err: unknown) {
  // err is any
}
```

今回のオプションはこの機能を常時有効にするものです。例外が補足した値は型の明記をすることなくすべてが`unknown`型として解釈されるようになります。

```typescript
// case 1
try {
  throw new Error();
} catch (err) {
  // err is unknown
}

// case 2
try {
  throw "This is an error!";
} catch (err) {
  // err is unknown
}

// case 3
try {
  throw undefined;
} catch (err) {
  // err is unknown
}
```

また、この制限を緩くしたい。つまり`unknown`型ではなく`any`型にしたいのであれば補足した値に対し`any`型を明記してください。
