# Đặc điểm của TypeScript

TypeScript là ngôn ngữ superset của JavaScript có khả năng mở rộng (scalable), được Microsoft phát hành lần đầu vào ngày 1 tháng 10 năm 2012. Ngôn ngữ scalable là ngôn ngữ có thể tiếp tục hoạt động tốt ngay cả khi quy mô dự án và số lượng thành viên trong team tăng lên, và TypeScript phù hợp với các dự án lớn nhờ đặc tính này.

TypeScript là superset của JavaScript, với việc bổ sung static typing vào JavaScript. Code viết bằng TypeScript được compile thành JavaScript thuần và chạy trên tất cả các môi trường có thể chạy JavaScript như browser, server. Hơn nữa, đây là dự án open-source, được cung cấp theo Apache License 2.0.

## Superset của JavaScript

TypeScript là JavaScript với việc bổ sung kiểu, phần còn lại về cơ bản tương thích. Nếu bạn đã quen thuộc với JavaScript, bạn có thể học nhanh chóng.

## Transpile

Code TypeScript có thể được transpile sang các phiên bản JavaScript khác nhau (ví dụ: ES5, ES6). Điều này giúp tránh các vấn đề tương thích với browser và môi trường chạy.

## Static typing

TypeScript là ngôn ngữ có [static typing](./static-type.md), bằng cách chỉ định kiểu cho biến và tham số hàm, độ an toàn của code được cải thiện và bug dễ phát hiện hơn.

```typescript
function sum(a: number, b: number): number {
  return a + b;
}
```

## Type inference

TypeScript tự động suy luận kiểu dựa trên context ngay cả với biến không có type annotation. Điều này cải thiện độ an toàn mà developer không cần khai báo kiểu rõ ràng.

## Hệ thống structural subtyping

TypeScript áp dụng hệ thống [structural subtyping](../reference/values-types-variables/structural-subtyping.md), xác định kiểu dựa trên shape của object (tức là object có những property và method nào). Do đó, nó hoạt động dựa trên structural subtyping thay vì nominal typing.

## Generics

TypeScript hỗ trợ [generics](../reference/generics/README.md), cho phép viết code tổng quát và có thể tái sử dụng.

```typescript twoslash
function identity<T>(arg: T): T {
  return arg;
}
```

## Biểu diễn kiểu nâng cao

Trong TypeScript, có thể biểu diễn kiểu phức tạp bằng hệ thống kiểu nâng cao. Điều này cho phép phát triển logic ứng dụng một cách mạnh mẽ và biểu cảm hơn. Dưới đây là một số ví dụ về biểu diễn kiểu nâng cao có sẵn trong TypeScript.

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

TypeScript hỗ trợ cả lập trình hướng đối tượng (OOP) và lập trình hàm (FP). Điều này cho phép developer xây dựng chương trình linh hoạt và mạnh mẽ.

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

TypeScript cung cấp môi trường phát triển mạnh mẽ. Để developer có trải nghiệm phát triển tốt, nó cung cấp tính năng intellisense và hiển thị lỗi realtime cho editor. Nhờ đó, auto-completion và thông tin kiểu có sẵn, phát triển diễn ra suôn sẻ, lỗi kiểu và sự không nhất quán được phát hiện sớm, giúp viết code đáng tin cậy hơn.

## Open-source

TypeScript được phát triển dưới dạng open-source, source code và tài liệu được công bố trên [TypeScript GitHub repository](https://github.com/microsoft/TypeScript). Developer có thể đóng góp cho dự án TypeScript thông qua GitHub repository.

## Tóm tắt

Với những đặc điểm này, TypeScript đã trở thành lựa chọn rất hấp dẫn trong phát triển Web hiện đại. Với việc giới thiệu static typing và hệ thống kiểu nâng cao, nó đáp ứng nhiều phong cách phát triển khác nhau như dự án lớn, lập trình hướng đối tượng và lập trình hàm, cho phép code mạnh mẽ và linh hoạt. Và việc là open-source nhưng có sự hỗ trợ mạnh mẽ từ Microsoft cũng là một trong những điểm hấp dẫn.
