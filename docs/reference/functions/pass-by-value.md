---
sidebar_label: Truyền theo giá trị và tham chiếu
---

# Truyền theo giá trị và truyền theo tham chiếu

Khi truyền biến làm actual argument cho function, có 2 cách truyền vào formal parameter: truyền theo giá trị (pass-by-value) và truyền theo tham chiếu (pass-by-reference) (truyền theo giá trị có thể chia nhỏ hơn nữa).

- Actual argument (tham số thực): Giá trị literal (như 123) hoặc biến được truyền từ phía gọi function
- Formal parameter (tham số hình thức): Biến được function nhận

Có những ngôn ngữ lập trình không hỗ trợ truyền theo tham chiếu.

- Ngôn ngữ hỗ trợ truyền theo tham chiếu: C++, C#, VB.NET, PHP, Swift, v.v.
- Ngôn ngữ không hỗ trợ truyền theo tham chiếu: C, Java, JavaScript, Python, Ruby, v.v.

## Loại biến

Biến có 2 loại: value type và reference type.

- Biến value type: Giá trị được gán được lưu trực tiếp trong biến (giá trị lưu = giá trị gán)
- Biến reference type: Giá trị tham chiếu được lưu trong biến, từ biến tham chiếu đến giá trị được gán (giá trị lưu ≠ giá trị gán)

Giá trị tham chiếu là giá trị xác định vị trí của giá trị được gán trong bộ nhớ, thường sử dụng địa chỉ bộ nhớ, v.v.
Cả biến value type và reference type đều có thể truyền theo giá trị và truyền theo tham chiếu.

## Truyền theo giá trị

Truyền theo giá trị là truyền giá trị của biến (giá trị lưu).

- Biến value type: Bản sao của giá trị được gán được truyền (truyền bản sao)
- Biến reference type: Bản sao của giá trị tham chiếu được truyền, giá trị tại nơi tham chiếu không được sao chép mà được chia sẻ (truyền giá trị tham chiếu, chia sẻ, chia sẻ giá trị)

Actual argument và formal parameter trở thành biến độc lập, giá trị độc lập. Do đó, ngay cả khi gán giá trị cho formal parameter trong function, nó không ảnh hưởng đến phía gọi function.
Code sau là ví dụ truyền theo giá trị trong ngôn ngữ C++. Biến `a` được khởi tạo với `1`, và giá trị của biến `a` được truyền cho function `change`. Ngay cả khi gán `2` cho formal parameter `n` trong function `change`, biến `a` ở phía gọi vẫn là `1`.

```cpp
#include <print>

void change(int n) {  // Formal parameter n là truyền theo giá trị của biến value type
    n = 2;            // Gán cho formal parameter không ảnh hưởng đến phía gọi
}

int main() {
    int a = 1;              // Biến value type
    change(a);              // Actual argument là biến value type a
    std::println("{}", a);  //=> 1
    return 0;
}
```

## Truyền theo tham chiếu

Truyền theo tham chiếu là truyền chính biến đó. Biến được chia sẻ bằng cách tham chiếu biến của phía gọi (chia sẻ biến).
Actual argument và formal parameter trở thành cùng một biến, cùng một giá trị. Do đó, khi gán giá trị cho formal parameter trong function, nó ảnh hưởng đến phía gọi function.
Code sau là ví dụ truyền theo tham chiếu trong ngôn ngữ C++. Biến `a` được khởi tạo với `1`, và chính biến `a` được truyền cho function `change` (tham chiếu/chia sẻ biến của phía gọi). Khi gán `2` cho argument trong function `change`, giá trị của biến `a` ở phía gọi cũng trở thành `2`.

```cpp
#include <print>

void change(int &n) {  // Formal parameter n là truyền theo tham chiếu của biến value type
    n = 2;             // Gán cho formal parameter ảnh hưởng đến phía gọi
}

int main() {
    int a = 1;              // Biến value type
    change(a);              // Actual argument là biến value type a
    std::println("{}", a);  //=> 2
    return 0;
}
```

## JavaScript là truyền theo giá trị

JavaScript không có tính năng truyền theo tham chiếu như C++. Tất cả argument của function là truyền theo giá trị. Do đó, gán giá trị cho formal parameter không ảnh hưởng đến phía gọi function.

```js twoslash
function change(n) {
  n = 2;
}
let n = 1;
change(n);
console.log(n);
// @log: 1
```

Tuy nhiên, với object thì hơi đặc biệt. Object là reference type và biến tham chiếu đến object.
Khi gán biến đó cho biến khác, không phải object được sao chép để tạo object mới, mà các biến khác nhau tham chiếu đến cùng một object.
Ví dụ, như code sau, khi gán object `{ n: 1 }` cho biến `x`, rồi gán biến `x` cho biến `y`, biến `x` và biến `y` tham chiếu đến cùng một object. Khi thay đổi property `n` của biến `y`, property `n` của biến `x` cũng thay đổi.

```js twoslash
const x = { n: 1 };
const y = x;
y.n = 2;
console.log(x);
// @log: { n: 2 }
```

Tuy nhiên, nếu gán giá trị khác cho biến `y`, biến `x` và biến `y` không còn tham chiếu đến cùng một object nữa, và việc thay đổi property của biến `y` không ảnh hưởng đến biến `x`.

```js twoslash
const x = { n: 1 };
let y = x;
y = { n: 2 }; // Gán lại object khác cho y
y.n = 3;
console.log(x);
// @log: { n: 1 }
```

Như trên, trong JavaScript, khi gán biến chứa object cho biến khác, sẽ chia sẻ object được tham chiếu.
Khi thay đổi property của object được chia sẻ, nó ảnh hưởng đến các biến khác. Đặc tính này cũng áp dụng cho argument của function.
Ví dụ, như code sau, khi gán object `{ n: 1 }` cho biến `x`, rồi truyền biến `x` cho argument `y` của function `change`, biến `x` và biến `y` tham chiếu đến cùng một object. Khi thay đổi property của biến `y`, property của biến `x` ở phía gọi function cũng thay đổi.

```js twoslash
function change(y) {
  y.n = 2;
}
const x = { n: 1 };
change(x);
console.log(x);
// @log: { n: 2 }
```

Trong trường hợp argument cũng vậy, tương tự như đặc tính của việc gán lại biến, nếu gán giá trị khác cho biến `y`, biến `x` và biến `y` không còn tham chiếu đến cùng một object nữa, nên việc thay đổi biến `y` không ảnh hưởng đến biến `x`.

```js twoslash
function change(y) {
  y = { n: 2 };
  y.n = 3;
}
const x = { n: 1 };
change(x);
console.log(x);
// @log: { n: 1 }
```

Tóm lại, argument của function trong JavaScript là truyền theo giá trị. Điểm cần lưu ý là object, tương tự như biến, argument và biến phía gọi chia sẻ cùng một object. Và nếu thay đổi property của object trong argument, thay đổi đó ảnh hưởng đến phía gọi function.

<PostILearned>

・Argument của JavaScript đều là truyền theo giá trị
・JavaScript không có cơ chế tương đương với truyền theo tham chiếu của C++
・Tuy nhiên, object chia sẻ giá trị
・Nếu thay đổi object được chia sẻ trong function, nó ảnh hưởng đến phía gọi
・Việc chia sẻ object không chỉ giới hạn ở argument

</PostILearned>
