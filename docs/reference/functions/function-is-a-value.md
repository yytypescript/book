# Function là value

Trong các ngôn ngữ khác, function đôi khi có vị trí đặc biệt. Trong một số ngôn ngữ, khai báo biến cùng tên không gây lỗi, nhưng định nghĩa function cùng tên lại gây lỗi. Trong ngôn ngữ khác, không thể gán function vào biến.

Function trong JavaScript là value. Nghĩa là, so với các ngôn ngữ khác như PHP, nó ít được đối xử đặc biệt hơn. Ví dụ, bạn có thể gán function vào biến.

```js twoslash
function hello() {
  return "Hello World";
}

const helloWorld = hello; // Gán function vào biến

helloWorld(); // Gọi function cũng không có vấn đề
```

Ngoài ra, trong JavaScript, bạn có thể khai báo function có cùng tên với function đã định nghĩa. Điều này không gây lỗi. Về bản chất, điều này hoạt động như reassignment.

```js twoslash
function hello() {
  return "HELLO";
}

// Đây là lần khai báo function thứ hai, nhưng về bản chất là reassignment
function hello() {
  return "KONNICHIWA";
}

hello();
// @log: KONNICHIWA
```

Như vậy, function trong JavaScript có tính chất như value giống như giá trị boolean hoặc string. Reassignment không mong muốn có thể gây bug, nhưng trong JavaScript, với function declaration không có cách nào khác ngoài viết cẩn thận.

Trong JavaScript, nếu muốn tránh bug do reassignment function, hãy kết hợp `const` và function expression. Function expression sẽ được đề cập sau.

```js twoslash
const hello = function () {
  return "HELLO";
};
```

Nhân tiện, trong TypeScript, compiler sẽ cảnh báo khai báo function trùng lặp nên không lo lắng về bug.

## Scope của function

Vì function là value, tên function cũng có khái niệm scope giống như biến. Ví dụ, function được định nghĩa bên trong function scope chỉ có thể được sử dụng trong local scope đó.

```js twoslash
function main() {
  // Function trong local scope
  function hello() {
    console.log("hello");
  }

  hello();
}

main();
// @log: "hello"

// Không thể truy cập function được khai báo trong local scope
hello();
// @error: ReferenceError: hello is not defined
```
