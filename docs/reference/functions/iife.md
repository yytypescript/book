---
sidebar_label: "IIFE"
---

# IIFE (Immediately Invoked Function Expression)

IIFE (Immediately Invoked Function Expression - Biểu thức hàm thực thi ngay lập tức) là function được thực thi ngay khi định nghĩa.
Đây là một loại design pattern, còn được gọi là Self-Executing Anonymous Function (hàm ẩn danh tự thực thi).

Trong TypeScript, định nghĩa và sử dụng như sau.

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

## Trường hợp sử dụng trong TypeScript

### Khi muốn truyền xử lý bất đồng bộ vào argument không nhận async function như useEffect của React

Khi muốn truyền xử lý bất đồng bộ vào argument không nhận async function như useEffect của React, bằng cách sử dụng IIFE, bạn có thể truyền xử lý bất đồng bộ vào argument.

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

Tuy nhiên, lưu ý rằng việc thực thi là bất đồng bộ. Không thể áp dụng cho function trả về giá trị cụ thể thay vì void.

```ts twoslash
// @errors: 2322
function receivesSyncFunc(func: () => string) {
  console.log(func());
}

// NG
receivesSyncFunc((): string => {
  // Giá trị trả về thành Promise<string> nên không sử dụng được
  return (async () => {
    return "hoge";
  })();
});
```

### Khi muốn xử lý if hoặc switch như expression

if và switch trong TypeScript là statement chứ không phải expression, nên không thể gán kết quả phán định vào biến. Do đó, có thể sử dụng IIFE để xử lý if hoặc switch như expression một cách giả lập.
Ngoài ra, khi điều kiện phán định của if hoặc switch trở nên phức tạp, việc làm rõ biến sử dụng để phán định và phạm vi xử lý phán định sẽ cải thiện khả năng đọc.

```typescript
const result = ((type: string) => {
  if (type === "Apple") {
    return "Táo";
  } else if (type === "Orange") {
    return "Cam";
  } else {
    return "Quả lạ";
  }
})(fruit.type);
```

Nếu không sử dụng IIFE, implementation sẽ như sau.

```typescript
let result;
const type = fruit.type;
if (type === "Apple") {
  result = "Táo";
} else if (type === "Orange") {
  result = "Cam";
} else {
  result = "Quả lạ";
}
```

Trong trường hợp này, cần sử dụng let thay vì const, nên phát sinh rủi ro gán lại biến.

### Ngăn chặn ô nhiễm biến trong scope

Với biến có tính tổng quát, có thể bạn muốn sử dụng nhiều lần trong cùng scope.
Khi đó, bằng cách sử dụng IIFE, có thể giới hạn scope của tên biến và tránh trùng tên.

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

## Tham khảo

[MDN - IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
[MDN Self-Executing Anonymous Function](https://developer.mozilla.org/en-US/docs/Glossary/Self-Executing_Anonymous_Function)
