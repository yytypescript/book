# Đặc điểm của TypeScript

TypeScript là một superset của JavaScript, được Microsoft phát hành lần đầu vào ngày 01/10/2012. Mục tiêu ban đầu của TypeScript là giải quyết các vấn đề về khả năng mở rộng của JavaScript khi được sử dụng trong các dự án lớn, nơi số lượng developer và độ phức tạp của code tăng lên theo thời gian.

Về bản chất, TypeScript mở rộng JavaScript bằng cách bổ sung static typing, giúp code rõ ràng và dễ kiểm soát hơn. Code viết bằng TypeScript được compile thành JavaScript thuần và chạy trên tất cả các môi trường có thể chạy JavaScript như browser, server. Hơn nữa, đây là dự án open-source, được cung cấp theo Apache License 2.0.

## Superset của JavaScript

Có thể xem TypeScript là JavaScript với phần hệ thống kiểu được bổ sung thêm, trong khi các cú pháp và hành vi còn lại vẫn giữ nguyên. Vì vậy, nếu bạn đã quen với JavaScript, việc tiếp cận TypeScript thường khá nhanh.

## Transpile

Code TypeScript có thể được transpile sang nhiều phiên bản JavaScript khác nhau (ví dụ: ES5, ES6), từ đó giúp đảm bảo khả năng tương thích với các browser và môi trường chạy khác nhau.

## Static typing

TypeScript là ngôn ngữ hỗ trợ [static typing](./static-type.md), Bằng cách chỉ định kiểu cho biến và tham số hàm, nhiều lỗi có thể được phát hiện sớm hơn trong quá trình phát triển, giúp tăng độ an toàn của code.

```typescript
function sum(a: number, b: number): number {
  return a + b;
}
```

## Type inference

TypeScript có khả năng tự động suy luận kiểu dựa trên context, ngay cả khi biến không được khai báo type annotation. Nhờ đó, developer vẫn có được lợi ích của static typing mà không cần phải khai báo kiểu một cách tường minh ở mọi nơi.

## Hệ thống structural subtyping

TypeScript áp dụng hệ thống [structural subtyping](../reference/values-types-variables/structural-subtyping.md), trong đó kiểu của một object được xác định dựa trên shape của nó (tức là object có những property và method nào). Vì vậy, TypeScript kiểm tra tính tương thích dựa trên cấu trúc, thay vì dựa trên tên kiểu như nominal typing.

## Generics

TypeScript hỗ trợ [generics](../reference/generics/README.md), cho phép viết code tổng quát và có thể tái sử dụng.

```typescript twoslash
function identity<T>(arg: T): T {
  return arg;
}
```

## Biểu diễn kiểu nâng cao

TypeScript cung cấp hệ thống kiểu nâng cao, cho phép biểu diễn các kiểu phức tạp một cách linh hoạt hơn. Nhờ đó, logic của ứng dụng có thể được mô tả rõ ràng và chặt chẽ hơn ngay từ cấp độ kiểu.

1. **Union type**: Có thể biểu diễn một trong nhiều kiểu. Ví dụ, khi xử lý biến có giá trị khởi tạo là `null`, có thể sử dụng union type.

   ```typescript
   type NullableString = string | null;
   ```

2. **Tuple type**: Kiểu cho phép chỉ định kiểu khác nhau cho mỗi phần tử của array. Điều này cho phép biểu diễn ngắn gọn các tổ hợp kiểu khác nhau.

   ```typescript
   type Response = [number, string];

   const response: Response = [200, "OK"];
   ```

## Hỗ trợ nhiều paradigm ngôn ngữ

TypeScript hỗ trợ cả lập trình hướng đối tượng (OOP) và lập trình hàm (FP), cho phép developer lựa chọn phong cách phù hợp với từng bài toán cụ thể.

## Class và interface

TypeScript hỗ trợ lập trình hướng đối tượng dựa trên class và interface. Điều này giúp tái sử dụng code và kế thừa dễ dàng hơn, hữu ích khi quản lý dự án lớn.

```typescript twoslash
interface Person {
  firstName: string;
  lastName: string;
}

class Employee implements Person {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

## Quản lý bộ nhớ

TypeScript về cơ bản quản lý bộ nhớ giống như JavaScript. JavaScript engine sử dụng garbage collection để tự động giải phóng bộ nhớ.

## Xử lý bất đồng bộ

TypeScript hỗ trợ lập trình bất đồng bộ event-driven giống JavaScript. Sử dụng Promise và async/await có thể implement xử lý bất đồng bộ một cách ngắn gọn và hiệu quả.

```typescript twoslash
async function fetchData(): Promise<void> {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

## Mô hình single-thread

TypeScript (và JavaScript) áp dụng mô hình single-thread. Mô hình single-thread thực hiện code đơn giản và dễ hiểu, hỗ trợ xử lý tác vụ hiệu quả với event loop và xử lý bất đồng bộ. Mặt khác, cũng có thể tạo thread chạy background bằng Web Workers để thực hiện multitask.

## Môi trường phát triển mạnh mẽ

TypeScript mang lại trải nghiệm phát triển tốt thông qua các tính năng như intellisense và hiển thị lỗi realtime trong editor. Nhờ có auto-completion và thông tin kiểu rõ ràng, developer có thể phát hiện lỗi sớm hơn và viết code một cách tự tin hơn.

## Open-source

TypeScript được phát triển dưới dạng open-source, source code và tài liệu được công bố trên [TypeScript GitHub repository](https://github.com/microsoft/TypeScript). Developer có thể đóng góp cho dự án TypeScript thông qua GitHub repository.

## Tóm tắt

Với những đặc điểm trên, TypeScript ngày càng được sử dụng rộng rãi trong phát triển Web hiện đại. Việc bổ sung static typing và hệ thống kiểu nâng cao giúp TypeScript phù hợp với nhiều phong cách phát triển khác nhau, từ các dự án lớn đến lập trình hướng đối tượng và lập trình hàm. Bên cạnh đó, việc là một dự án open-source với sự hỗ trợ mạnh mẽ từ Microsoft cũng góp phần tạo nên sức hút của TypeScript.
