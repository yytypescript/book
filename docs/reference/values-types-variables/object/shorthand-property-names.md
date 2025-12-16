# Shorthand property names

Khi key của object và tên biến giống nhau, có thể sử dụng shorthand property names khi gán giá trị vào object. Đây là tính năng liên quan đến destructuring assignment. Ví dụ sau minh họa gần như toàn bộ.

```ts twoslash
import fs from "fs";
// ---cut---
type Wild = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

const name = "pikachu";
const no = 25;
const genre = "mouse pokémon";
const height = 0.4;
const weight = 6.0;

const pikachu: Wild = {
  name,
  no,
  genre,
  height,
  weight,
};
```

Đây là dạng rút gọn của cách viết sau.

```ts twoslash
import fs from "fs";

type Wild = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

const name = "pikachu";
const no = 25;
const genre = "mouse pokémon";
const height = 0.4;
const weight = 6.0;
// ---cut---
const pikachu: Wild = {
  name: name,
  no: no,
  genre: genre,
  height: height,
  weight: weight,
};
```

Tất nhiên cũng có thể viết trên một dòng.

```ts twoslash
import fs from "fs";

type Wild = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

const name = "pikachu";
const no = 25;
const genre = "mouse pokémon";
const height = 0.4;
const weight = 6.0;
// ---cut---
const pikachu: Wild = { name, no, genre, height, weight };
```
