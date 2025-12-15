---
description: Cách lấy object chỉ có property tùy ý từ object.
---

# Lấy subset của object

Đây là cách lấy subset của object. Subset là một phần được cắt ra từ một object, và phương pháp giới thiệu ở đây là cắt một phần của object bằng cách chỉ định tên property. Ví dụ, khi có object với nhiều property như sau, đây là cách tạo object chỉ có vài property từ đó.

```ts twoslash
const profile = {
  name: "suin",
  twitter: "suin",
  github: "suin",
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  building: "丸ビル",
  zipcode: "100-6390",
};

// Muốn lấy object chỉ có 6 property dưới đây từ object có 9 property ở trên

const address = {
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  building: "丸ビル",
  zipcode: "100-6390",
};
```

## Phương pháp 1: Kết hợp immediately invoked function, destructuring assignment và shorthand property name

Phương pháp đầu tiên để lấy subset của object là kết hợp immediately invoked function, destructuring assignment và shorthand property name.

```ts twoslash
const profile = {
  name: "suin",
  twitter: "suin",
  github: "suin",
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  building: "丸ビル",
  zipcode: "100-6390",
};
// ---cut---
const sns = (({ twitter, github }) => ({ twitter, github }))(profile);
//=> {
//   "twitter": "suin",
//   "github": "suin"
// }
```

Ưu và nhược điểm của phương pháp này như sau.

- Ưu điểm
  - Không cần library bên ngoài.
- Nhược điểm
  - Với người đọc lần đầu có thể thấy code bất ngờ.
  - Cần viết cùng tên property ở 2 chỗ: phần tham số của immediately invoked function và shorthand property name, nên dư thừa.

Cách viết này tiện lợi khi muốn trích xuất vài property ít, nhưng khi muốn trích xuất nhiều property thì lượng code tăng và dần trở nên khó khăn.

Khi property muốn loại bỏ ít hơn property muốn trích xuất, chỉ định property muốn loại bỏ như sau sẽ dễ hơn.

```ts twoslash
const profile = {
  name: "suin",
  twitter: "suin",
  github: "suin",
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  building: "丸ビル",
  zipcode: "100-6390",
};
// ---cut---
const address = (({ name, twitter, github, ...rest }) => rest)(profile);
//    ^?
//=> {
//   "country": "JP",
//   "prefecture": "東京都",
//   "city": "千代田区",
//   "address": "丸の内2-4-1",
//   "building": "丸ビル",
//   "zipcode": "100-6390"
// }
```

Trong JavaScript, có thể loại bỏ property từ object bằng `delete`, nên cách viết trên có thể trông rườm rà. Lý do viết như này là vì trong TypeScript, `delete` không dễ sử dụng. Khi muốn loại bỏ property từ object bằng `delete`, trong TypeScript property đó phải là optional.

```ts twoslash
const profile = {
  name: "suin",
  twitter: "suin",
  github: "suin",
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  building: "丸ビル",
  zipcode: "100-6390",
};
// ---cut---
// @errors: 2790
const address = { ...profile };
delete address.name;
```

## Phương pháp 2: lodash.pick / lodash.omit

Phương pháp thứ hai sử dụng [lodash](https://lodash.com/). lodash là library cung cấp nhiều hàm tiện ích, trong đó có hàm `pick` để lấy subset của object.

```ts twoslash
// @filename: lodash
// ---cut---
import _ from "lodash";

const sns = _.pick(profile, ["twitter", "github"]);
//=> {
//   "twitter": "suin",
//   "github": "suin"
// }
```

Nếu chỉ cần hàm `pick` thay vì toàn bộ lodash, có thể sử dụng package [lodash.pick](https://www.npmjs.com/package/lodash.pick). Trong trường hợp này, sử dụng hàm `pick` như sau.

```ts twoslash
// @filename: lodash.pick
// ---cut---
import pick from "lodash.pick";

const sns = pick(profile, ["twitter", "github"]);
```

Ưu và nhược điểm của lodash.pick như sau.

- Ưu điểm
  - Khai báo và dễ đọc.
  - Lượng code ít.
- Nhược điểm
  - Cần cài đặt library.

lodash.pick là hàm chỉ định tên property muốn trích xuất, nhưng khi property muốn loại bỏ ít hơn property muốn trích xuất, sử dụng [lodash.omit](https://www.npmjs.com/package/lodash.omit) sẽ tiện hơn.

```ts twoslash
// @filename: lodash
// ---cut---
import _ from "lodash";

const address = _.omit(profile, ["name", "twitter", "github"]);
//=> {
//   "country": "JP",
//   "prefecture": "東京都",
//   "city": "千代田区",
//   "address": "丸の内2-4-1",
//   "building": "丸ビル",
//   "zipcode": "100-6390"
// }
```

Cài đặt lodash, lodash.pick và lodash.omit bằng lệnh sau.

```bash
# Cài đặt lodash
npm install lodash
npm install -D @types/lodash

# Cài đặt lodash.pick và lodash.omit
npm install lodash.pick lodash.omit
npm install -D @types/lodash.pick @types/lodash.omit
```
