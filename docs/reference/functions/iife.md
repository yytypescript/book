---
sidebar_label: "即時実行関数"
---

# 即時実行関数 (IIFE)

IIFE (Immediately Invoked Function Expression; 即時実行関数式) とは定義と同時に実行される関数です。

次のように定義します。

```typescript
(() => {
  console.log("IIFE");
})();

const result1 = (function (arg: string) {
  console.log(`IIFE with args:${arg}`);
  return "IIFE with args";
})("hoge");

const result2 = await(async () => {
  console.log("async IIFE");
  return "async IIFE";
})();
```

## TypeScriptでの使用パターン

### ReactのuseEffectなど、非同期関数を受け取らない引数に非同期処理を渡したい場合

ReactのuseEffectなど、非同期関数を受け取らない引数に非同期処理を渡したい場合、即時実行関数を使うことで、非同期処理を引数に渡すことができます。

```typescript
useEffect(() => {
  (async () => {
    const result = await fetch("https://example.com");
    console.log(result);
  })();
}, []);
```

ただし、実行は非同期で実行されることに注意してください。戻り値としてvoidではなく、何らかの具体値を返す関数には適用できません。

```typescript
function receivesSyncFunc(func: () => string) {
  console.log(func());
}

// NG
receivesSyncFunc(() => {
  (async () => {
    return "hoge";
  })();
});
```

### ifやswitchなどを式として扱いたい場合

次のように使用します。

```typescript
const result = (() => {
  if (type === "Apple") {
    return "林檎";
  } else if (type === "Orange") {
    return "オレンジ";
  } else {
    return "謎の果物";
  }
})();
```

もしIIFEを使わない場合は次のような実装となります。

```typescript
let result;
if (type === "Apple") {
  result = "林檎";
} else if (type === "Orange") {
  result = "オレンジ";
} else {
  result = "謎の果物";
}
```

この場合、constではなくletを使う必要があるため、変数の再代入のリスクが発生してしまいます。

### スコープ内での変数汚染を防ぐ

## 参考

[MDN - IIFE (即時実行関数式)](https://developer.mozilla.org/ja/docs/Glossary/IIFE)
