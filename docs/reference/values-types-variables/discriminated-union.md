---
sidebar_label: Discriminated union
image: /reference/values-types-variables/discriminated-union/summary-card.png
---

# Discriminated union (union có thể phân biệt)

![](/reference/values-types-variables/discriminated-union/summary-card@3x.png)

Discriminated union của TypeScript là union type đặc biệt, có "dấu hiệu" để phân biệt từng kiểu object trong union. Khi thu hẹp union type gồm các kiểu object mà logic phân nhánh phức tạp, sử dụng discriminated union sẽ cải thiện khả năng đọc và bảo trì code.

## Union type thông thường có việc thu hẹp phức tạp

[Union type](./union.md) của TypeScript có độ tự do cao, cho phép kết hợp bất kỳ kiểu nào. `UploadStatus` sau đây là union type biểu diễn trạng thái upload file. Là sự kết hợp của đang upload `InProgress`, upload thành công `Success`, upload thất bại `Failure`.

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
```

Bảng sau tổng hợp các trạng thái của `UploadStatus`.

| Kiểu         | Ý nghĩa           | `done`  | `progress` |   `error`    |
| ------------ | ----------------- | :-----: | :--------: | :----------: |
| `InProgress` | Đang upload       | `false` | Tiến độ(%) |      -       |
| `Success`    | Upload thành công | `true`  |     -      |      -       |
| `Failure`    | Upload thất bại   | `true`  |     -      | Chi tiết lỗi |

Hãy thử implement function hiển thị trạng thái.

```ts twoslash
// @errors: 2339
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.done === false) {
    console.log(`Đang upload: ${status.progress}%`);
  }
}
```

Implementation này kiểm tra `done` là `false`. Không có bug. Tuy nhiên, compiler cảnh báo không có `progress`. Vì ngay cả trong nhánh if, compiler vẫn nghĩ `status` có thể là `Success` hoặc `Failure`.

Để giải quyết lỗi này, cần kiểm tra có `progress` hay không. Như vậy, compiler sẽ xác định `status` trong nhánh if là `InProgress`.

```ts twoslash {2}
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.done === false && "progress" in status) {
    //                         ^^^^^^^^^^^^^^^^^^^^thêm
    console.log(`Đang upload: ${status.progress}%`);
    // Lỗi compile được giải quyết!
  }
}
```

Function sau xử lý tất cả trạng thái mà không gây lỗi compile.

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { done: boolean; progress: number };
type Success = { done: boolean };
type Failure = { done: boolean; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.done) {
    if ("error" in status) {
      console.log(`Upload thất bại: ${status.error.message}`);
    } else {
      console.log("Upload thành công");
    }
  } else if ("progress" in status) {
    console.log(`Đang upload: ${status.progress}%`);
  }
}
```

Code này có vẻ lộn xộn và không dễ đọc. Với union type của object như vậy, nên viết lại thành discriminated union. Sẽ dễ đọc và bảo trì hơn.

## Discriminated union là gì?

Discriminated union của TypeScript là ứng dụng của union type. Discriminated union còn được gọi là tagged union hoặc sum type.

Discriminated union là union type có các đặc điểm sau.

1. Union type gồm các kiểu object
2. Có property (dấu hiệu) để phân biệt từng kiểu object
   - Property này được gọi là discriminator
3. Kiểu của discriminator phải là [literal type](./literal-types.md), v.v.
4. Miễn có discriminator, mỗi kiểu object có thể có property riêng

Ví dụ, viết lại `UploadStatus` trên thành discriminated union như sau.

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { type: "InProgress"; progress: number };
type Success = { type: "Success" };
type Failure = { type: "Failure"; error: Error };
```

Bảng tổng hợp như sau.

| Kiểu         | Ý nghĩa           | Discriminator        | `progress` |   `error`    |
| ------------ | ----------------- | -------------------- | :--------: | :----------: |
| `InProgress` | Đang upload       | `type: "InProgress"` | Tiến độ(%) |      -       |
| `Success`    | Upload thành công | `type: "Success"`    |     -      |      -       |
| `Failure`    | Upload thất bại   | `type: "Failure"`    |     -      | Chi tiết lỗi |

Điểm thay đổi là `done: boolean` đã biến mất, và discriminator `type` được thêm vào. Điểm quan trọng nữa là kiểu của `type` không phải `string` mà là literal type như `InProgress`.

## Thu hẹp discriminated union

Discriminated union được thu hẹp kiểu khi phân nhánh discriminator.

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { type: "InProgress"; progress: number };
type Success = { type: "Success" };
type Failure = { type: "Failure"; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  if (status.type === "InProgress") {
    console.log(`Đang upload: ${status.progress}%`);
    //                          ^?
  } else if (status.type === "Success") {
    console.log("Upload thành công", status);
    //                           ^?
  } else if (status.type === "Failure") {
    console.log(`Upload thất bại: ${status.error.message}`);
    //                           ^?
  } else {
    console.log("Trạng thái không hợp lệ: ", status);
  }
}
```

Viết bằng switch cũng được compiler hiểu việc thu hẹp tương tự.

```ts twoslash
type UploadStatus = InProgress | Success | Failure;
type InProgress = { type: "InProgress"; progress: number };
type Success = { type: "Success" };
type Failure = { type: "Failure"; error: Error };
// ---cut---
function printStatus(status: UploadStatus) {
  switch (status.type) {
    case "InProgress":
      console.log(`Đang upload: ${status.progress}%`);
      break;
    case "Success":
      console.log("Upload thành công", status);
      break;
    case "Failure":
      console.log(`Upload thất bại: ${status.error.message}`);
      break;
    default:
      console.log("Trạng thái không hợp lệ: ", status);
  }
}
```

Sử dụng discriminated union giúp compiler hiểu được việc thu hẹp kiểu. Kết quả là xử lý phân nhánh dễ đọc và bảo trì hơn.

## Kiểu có thể dùng cho discriminator

Các kiểu có thể dùng cho discriminator là literal type, `null`, và `undefined`.

- Literal type
  - String literal type: (ví dụ) `"success"`, `"OK"`, v.v.
  - Number literal type: (ví dụ) `1`, `200`, v.v.
  - Boolean literal type: `true` hoặc `false`
- `null`
- `undefined`

Trong `UploadStatus` trên, chúng ta dùng string literal type làm discriminator. Literal type còn có number và boolean. Chúng cũng có thể dùng làm discriminator.

```ts twoslash title="Discriminator là number literal type"
type OkOrBadRequest =
  | { statusCode: 200; value: string }
  | { statusCode: 400; message: string };

function handleResponse(x: OkOrBadRequest) {
  if (x.statusCode === 200) {
    console.log(x.value);
  } else {
    console.log(x.message);
  }
}
```

```ts twoslash title="Discriminator là boolean literal type"
// prettier-ignore
type OkOrNotOk =
  | { isOK: true; value: string }
  | { isOK: false; error: string };

function handleStatus(x: OkOrNotOk) {
  if (x.isOK) {
    console.log(x.value);
  } else {
    console.log(x.error);
  }
}
```

Kiểu có quan hệ `null` và non-null cũng có thể làm discriminator. Trong ví dụ sau, property `error` là `null` hoặc `Error`, tạo thành quan hệ null/non-null.

```ts twoslash
// prettier-ignore
type Result =
  | { error: null; value: string }
  | { error: Error };

function handleResult(result: Result) {
  if (result.error === null) {
    console.log(result.value);
  } else {
    console.log(result.error);
  }
}
```

Tương tự, `undefined` cũng có thể làm discriminator với property có quan hệ undefined/non-undefined.

```ts twoslash
// prettier-ignore
type Result =
  | { error: undefined; value: string }
  | { error: Error };

function handleResult(result: Result) {
  if (result.error) {
    console.log(result.error);
  } else {
    console.log(result.value);
  }
}
```

## Khi gán discriminator vào biến

Khi gán discriminator vào biến và dùng biến đó trong điều kiện phân nhánh, vẫn có thể thu hẹp kiểu.

```ts twoslash
type Shape =
  | { type: "circle"; color: string; radius: number }
  | { type: "square"; color: string; size: number };

function toCSS(shape: Shape) {
  const { type, color } = shape;
  //      ^^^^discriminator
  switch (type) {
    case "circle":
      return {
        background: color,
        borderRadius: shape.radius,
        //            ^?
      };

    case "square":
      return {
        background: color,
        width: shape.size,
        height: shape.size,
        //      ^?
      };
  }
}
```

<PostILearned>

Discriminated union của TypeScript
・Union type gồm các kiểu object có discriminator
・Dễ thu hẹp kiểu với if/switch

Discriminator
・Property key chung của các object (như dấu hiệu)
・Kiểu có thể dùng: literal type, null, undefined

</PostILearned>

## Thông tin liên quan

[Union type](./union.md)
