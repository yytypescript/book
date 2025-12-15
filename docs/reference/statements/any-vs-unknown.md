# Sự khác biệt giữa any và unknown

Cả hai kiểu `any` và `unknown` đều có thể được gán bất kỳ giá trị nào.

```ts twoslash
const any1: any = null;
const any2: any = undefined;
const any3: any = true;
const any4: any = 0.8;
const any5: any = "Comment allez-vous";
const any6: any = {
  x: 0,
  y: 1,
  name: "origin",
};

const unknown1: unknown = null;
const unknown2: unknown = undefined;
const unknown3: unknown = true;
const unknown4: unknown = 0.8;
const unknown5: unknown = "Comment allez-vous";
const unknown6: unknown = {
  x: 0,
  y: 1,
  name: "origin",
};
```

Ngoài ra, có một kiểu ngược lại là `never`, không thể gán bất kỳ giá trị nào, nhưng ở đây chúng ta sẽ không giải thích về nó.

Với kiểu `any`, bạn có thể sử dụng các property và method của object đã được gán.

```ts twoslash
const any4: any = 0.8;
const any5: any = "Comment allez-vous";
const any6: any = {
  x: 0,
  y: 1,
  name: "origin",
};
// ---cut---
console.log(any4.toFixed());
// @log: 1
console.log(any5.length);
// @log: 18
console.log(any6.name);
// @log: "origin"
```

Ngược lại, với kiểu `unknown`, bạn không thể sử dụng các property và method của object đã được gán. Không chỉ không sử dụng được, mà còn không thể thực thi.

```ts twoslash
const unknown4: unknown = 0.8;
const unknown5: unknown = "Comment allez-vous";
const unknown6: unknown = {
  x: 0,
  y: 1,
  name: "origin",
};

// ---cut---
// @errors: 18046
console.log(unknown4.toFixed());
console.log(unknown5.length);
console.log(unknown6.name);
```

Chỉ nhìn vào điều này có thể nghĩ rằng kiểu `any` tốt hơn kiểu `unknown`, nhưng không phải vậy. Nói cách khác, kiểu `any` là **kiểu mà TypeScript từ bỏ việc kiểm tra kiểu**, vì vậy bạn có thể làm bất cứ điều gì. Sử dụng kiểu `any` giống như đang từ bỏ lợi ích về kiểu mà TypeScript mang lại.

Khi đó, các lỗi tồn tại sẽ không được phát hiện tại thời điểm compile, và sẽ trở thành lỗi runtime khi người dùng thực tế sử dụng sau khi phát hành phần mềm. Điều đó dẫn đến báo cáo lỗi và khiếu nại, làm thiệt hại lan rộng.

Với kiểu `any`, TypeScript hoàn toàn không can thiệp vào những đoạn code vô lý như sau, và chỉ khi chạy thử chương trình gặp lỗi runtime, ta mới biết được chương trình này không hoàn chỉnh.

```ts twoslash
const any6: any = {
  x: 0,
  y: 1,
  name: "origin",
};

// ---cut---
console.log(any6.x.y.z);
// @error: Cannot read property 'z' of undefined
```

Kiểu `unknown` nhất quán không cho phép truy cập property và method. Vì vậy không thể thực thi, và ngăn chặn lỗi runtime không mong muốn.

```ts twoslash
const unknown6: unknown = {
  x: 0,
  y: 1,
  name: "origin",
};

// ---cut---
// @errors: 18046
console.log(unknown6.x.y.z);
```

Trong file tsconfig.json cần thiết khi tạo project TypeScript, có option `noImplicitAny` để ngăn chặn việc sử dụng kiểu `any`. Nếu bạn tạo project TypeScript từ đầu thay vì chuyển đổi project JavaScript hiện có sang TypeScript, nên bật cài đặt này.
