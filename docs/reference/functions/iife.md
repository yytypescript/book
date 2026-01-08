---
sidebar_label: "即時実行関数式(IIFE)"
---

# 即時実行関数式 (IIFE)

IIFE (Immediately Invoked Function Expression; 即時実行関数式) とは定義と同時に実行される関数です。
デザインパターンの1種で、Self-Executing Anonymous Function; 自己実行匿名関数とも呼ばれます。

TypeScriptにおいては、次のように定義、使用します。

```typescript
(() => {
  console.log("IIFE");
})();

const result1 = (function (arg: string) {
  console.log(`IIFE with args:${arg}`);
  return "IIFE with args";
})("hoge");

const result2 = await (async () => {
  console.log("async IIFE");
  return "async IIFE";
})();
```

## TypeScriptでの利用シーン

### ReactのuseEffectなど、非同期関数を受け取らない引数に非同期処理を渡したい場合

ReactのuseEffectなど、非同期関数を受け取らない引数に非同期処理を渡したい場合、即時実行関数を使うことで、非同期処理を引数に渡すことができます。

```ts twoslash
function useEffect(f: () => void, args: string[]) {}
// ---cut---
useEffect(() => {
  (async () => {
    const result = await fetch("https://example.com");
    console.log(result);
  })();
}, []);
```

ただし、実行は非同期で実行されることに注意してください。戻り値としてvoidではなく、何らかの具体値を返す関数には適用できません。

```ts twoslash
// @errors: 2322
function receivesSyncFunc(func: () => string) {
  console.log(func());
}

// NG
receivesSyncFunc((): string => {
  // Promise<string>が戻り値となってしまい、利用不可
  return (async () => {
    return "hoge";
  })();
});
```

### ifやswitchなどを式として扱いたい場合

TypeScriptでのifやswitchは構文であり式ではないため、判定結果を変数に代入することができません。そのため、疑似的にifやswitchを式として扱うときにIIEFを利用できます。<br />
また、ifやswitchの条件判定が複雑になった場合に、判定に利用する変数や、どこまでが判定処理かを明確にできるため可読性が向上します。

```typescript
const result = ((type: string) => {
  if (type === "Apple") {
    return "林檎";
  } else if (type === "Orange") {
    return "オレンジ";
  } else {
    return "謎の果物";
  }
})(fruit.type);
```

もしIIFEを使わない場合は次のような実装となります。

```typescript
let result;
const type = fruit.type;
if (type === "Apple") {
  result = "林檎";
} else if (type === "Orange") {
  result = "蜜柑";
} else {
  result = "謎の果物";
}
```

この場合、constではなくletを使う必要があるため、変数の再代入のリスクが発生してしまいます。

### スコープ内での変数汚染を防ぐ

汎用的な変数の場合、同じスコープ内で複数回使いたい場合があるかと思います。
その際に、IIFEを利用することで変数名のスコープを限定し名前の重複を回避できます。

```typescript
async function callApiAAndB() {
  await (async () => {
    const result = await fetch("api1");
    if (result !== "OK") {
      console.log(result);
    }
  })();
  await (async () => {
    const result = await fetch("api2");
    if (result !== "Success") {
      console.log(result);
    }
  })();
}
```

## 参考

[MDN - IIFE (即時実行関数式)](https://developer.mozilla.org/ja/docs/Glossary/IIFE)
[MDN Self-Executing Anonymous Function](https://developer.mozilla.org/ja/docs/Glossary/Self-Executing_Anonymous_Function)
