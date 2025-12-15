---
sidebar_label: Generator
---

# Generator

Hàm sử dụng Generator không thể viết bằng arrow function, mà bắt buộc phải viết dưới dạng `function*() {}`. Dưới đây là các cách khai báo Generator hợp lệ:

```ts twoslash
function* generatorFunction1() {
  // ...
}

const generatorFunction2 = function* () {
  // ...
};

class GeneratorSample {
  public *generatorFunction3() {
    // ...
  }
}
```

Generator là một object của class implement interface `IterableIterator<T>`, vừa là iterator (`Iterator<T>`) vừa là iterable (`Iterable<T>`). Các class thỏa mãn điều kiện này có thể sử dụng keyword `yield` trong hàm generator. `yield` khi được gọi sẽ trả về giá trị cho caller một lần, và khi được gọi tiếp theo sẽ tiếp tục xử lý từ vị trí đó.

Trước khi `Promise` trở nên phổ biến, Generator đã từng được sử dụng để xử lý bất đồng bộ. Tuy nhiên, với sự ra đời của `Promise` và `async/await`, việc sử dụng Generator cho mục đích xử lý bất đồng bộ đã giảm đi đáng kể. Hiện nay, Generator vẫn hữu ích khi cần lấy lượng lớn dữ liệu theo từng phần thay vì một lần.
