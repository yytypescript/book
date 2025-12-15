# Thư viện chuẩn sử dụng generics

Generics được sử dụng ở nhiều nơi trong thư viện chuẩn. Các đối tượng tiêu biểu sử dụng generics bao gồm:

- Array object
- Promise object
- Map object

Hãy xem generics được sử dụng như thế nào trong các đối tượng này.

## Tại sao generics được sử dụng

`Array` object cần lưu trữ các phần tử có nhiều kiểu khác nhau như `string` hay `number` tùy theo tình huống. Lúc này, kiểu của phần tử mảng sẽ thay đổi tùy thuộc vào chương trình bạn implement. Nói cách khác, cần phải trừu tượng hóa kiểu phần tử để programmer có thể chỉ định kiểu khi implement.

Generics được sử dụng như một phương pháp để trừu tượng hóa kiểu này.

```ts twoslash
const numbers: Array<number> = [1, 2, 3, 4];
```

`Array` có thể được biểu diễn kiểu bằng cú pháp khác. Chi tiết về những cách này có trong trang về array, vui lòng tham khảo thêm.

```ts twoslash
const numbers: number[] = [1, 2, 3, 4];
```

[Type annotation của array](../values-types-variables/array/type-annotation-of-array.md)

## Sử dụng thư viện chuẩn

Hãy xem implementation thực tế sử dụng thư viện chuẩn với generics.

### `Array.prototype.map<T>()`

Method `map<T>()` của `Array` object trả về một mảng mới bằng cách áp dụng hàm được truyền vào làm tham số cho tất cả các phần tử của mảng. Trong đoạn code mẫu, generics được sử dụng trong `map<number>` để chỉ định kiểu phần tử của mảng số mới được tạo ra.

```ts twoslash
const textNumbers = ["1", "2", "3", "4"];
const numbers = textNumbers.map<number>(function (text: string) {
  return Number(text);
});
```

### `Map<K, V>`

Trong `Map<K, V>` object, `K` chỉ định kiểu của key và `V` chỉ định kiểu của value liên kết với key. Method `map<T>()` trước đó chỉ có một type definition cho generics, nhưng `Map<K, V>` có hai type definition. Như vậy, type definition của generics không nhất thiết phải là một, mà có thể có nhiều type definition.

```ts twoslash
type Address = {
  country: string;
  postalCode: string;
  address1: string;
};

const addresses = new Map<string, Address>();
addresses.set("Tuan", {
  country: "Vietnam",
  postalCode: "100000",
  address1: "Ha Noi",
});

console.log(addresses.get("Tuan"));
```

### `Promise<T>`

Về `Promise` object, có mô tả chi tiết hơn trong cuốn sách này, vui lòng tham khảo.

[Promise](../asynchronous/promise.md)

### Cách tham khảo type definition của thư viện chuẩn

Type definition file của thư viện chuẩn có thể xem trong thư mục src/lib của repository chính thức TypeScript.
<https://github.com/microsoft/TypeScript/tree/main/src/lib>

Type của `Array.prototype.map()` có thể xem trong file [lib/lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts#L1246).
