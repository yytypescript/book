---
sidebar_label: Mental model của kiểu
---

# Mental Model của Kiểu

## Lý thuyết nền tảng của hệ thống kiểu

Hệ thống kiểu của mỗi ngôn ngữ lập trình có thế giới quan riêng, và chức năng kiểu khác nhau giữa các ngôn ngữ.

Mặt khác, cũng có những chức năng chung giữa nhiều ngôn ngữ, và các chức năng kiểu đó không xuất hiện từ hư không. Làm nền tảng có một lĩnh vực nghiên cứu toán học gọi là **type theory** (lý thuyết kiểu), và hệ thống kiểu của mỗi ngôn ngữ được implementation dựa trên type theory.

Ví dụ, ngay cả những kiểu như `unknown` hoặc `never` của TypeScript mà thoạt nhìn không biết để làm gì, trong type theory có thể giải thích vai trò và chức năng của chúng một cách tổng quát. Những kiểu này được phân loại vào top type và bottom type, hoạt động như các kiểu ở hai đầu của cấu trúc phân cấp được tạo bởi quan hệ subtype.

<figure><figcaption>Kiểu ở hai đầu của cấu trúc phân cấp subtype</figcaption>
<img src="/reference/values-types-variables/mental-model-of-types/subtyping-end-points.svg" width="480" />
</figure>

Có kiến thức từ góc độ type theory cho phép suy luận tự nhiên về chức năng kiểu trong các ngôn ngữ khác có hệ thống kiểu tương tự. Ví dụ, trong ngôn ngữ Scala, có thể suy luận rằng kiểu `Nothing` ở bottom của cấu trúc phân cấp kiểu có cùng chức năng với kiểu `never`. Như vậy, bằng cách sử dụng kiến thức tổng quát về kiểu, ngay cả khi chuyển đổi ngôn ngữ lập trình, có thể suy luận và học các chức năng một cách thuận lợi.

Type theory là lĩnh vực rất sâu và khó, nhưng mặt khác cũng có nhiều khái niệm tương đối dễ hiểu và hữu ích cho thực tế. Tài liệu này giới thiệu một phần kiến thức để xây dựng thế giới quan của kiểu TypeScript, có thể gọi là **mental model**.

:::info Để tìm hiểu sâu hơn
Nếu đọc nội dung chương này và có hứng thú với type system hoặc type theory, khuyến khích đọc các chương về simple type và subtyping trong sách nhập môn nổi tiếng『[Types and Programming Languages](https://www.cis.upenn.edu/~bcpierce/tapl/)』.

Nếu có kiến thức về logic, inference rule sẽ dễ đọc hơn. Ngoài ra, cách đọc Types and Programming Languages là thay vì xác minh tỉ mỉ từng định lý, hãy đọc với mục đích thu thập kiến thức và khái niệm từ những phần thú vị, như vậy sẽ dễ đọc hơn, hãy thử thách xem.
:::

## Thiết kế theo set theory

Một công cụ toán học rất hữu ích và quen thuộc để nghĩ về mental model của kiểu, tức là "cách diễn giải kiểu", đó là set theory (lý thuyết tập hợp). Trong chương này, chúng ta sẽ coi "kiểu = tập hợp".

Nói chung type (kiểu) và set (tập hợp) là các khái niệm khác nhau, nhưng giữa type theory và set theory có [mối liên hệ mật thiết](https://en.wikipedia.org/wiki/Russell%27s_paradox).

Đặc biệt trong TypeScript, thiết kế được cố ý tạo ra để có thể xử lý kiểu theo set theory, và bằng cách coi kiểu như "**tập hợp các giá trị**", có thể hiểu kiểu một cách trực quan. Cách nhìn này không phải là thiên lệch, mà là cách nghĩ về kiểu được khuyến nghị trong [tài liệu chính thức](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html#types-as-sets).

Trong chương này, chúng ta sẽ xây dựng mental model cho phép suy luận tự nhiên về hành vi của kiểu bằng cách nghĩ về kiểu từ góc độ set theory như vậy.

## Union và intersection

Nhờ có thể xử lý kiểu theo set theory, kiểu TypeScript có thể sử dụng một số phép toán mà tập hợp có.

Phép toán tập hợp là thao tác tạo tập hợp mới từ tập hợp, và có nhiều loại phép toán như vậy. TypeScript được trang bị [union type](./union.md) và [intersection type](./intersection.md) tương ứng với union (hợp) và intersection (giao) trong các phép toán đó.

```ts twoslash twoslash
type A = { a: string };
type B = { b: number };

// Kiểu biểu diễn union của A và B
type Union = A | B;

// Kiểu biểu diễn intersection của A và B
type Intersection = A & B;
```

<figure><figcaption>Biểu diễn kiểu tương ứng với union và intersection</figcaption>
<img src="/reference/values-types-variables/mental-model-of-types/union-intersection-inclusion.svg" width="480" />
</figure>

Trực quan, union type là kiểu biểu diễn hợp của hai tập hợp, và intersection type là kiểu biểu diễn phần giao của hai kiểu. Union type đặc biệt đóng vai trò quan trọng trong narrowing (thu hẹp kiểu), có thể loại bỏ chọn lọc các ứng cử viên kiểu từ hợp của các kiểu.

```ts twoslash title="Narrowing kiểu là loại bỏ tập hợp từ union"
type StrOrNum = string | number;

function narrowUnion(param: StrOrNum) {
  if (typeof param === "string") {
    // Loại bỏ string từ union của string và number
    console.log(param.toUpperCase());
  } else {
    // Tập hợp còn lại là number
    console.log(param * 3);
  }
}
```

Hai kiểu này quan trọng như phép toán có thể hợp thành kiểu mới từ nhiều kiểu, nhưng tiếp theo chúng ta sẽ giải thích bằng 3 kiểu sau về cách kiểu cụ thể có thể được diễn giải như tập hợp.

## Unit type

Từ đây, chúng ta sẽ giải thích với các ví dụ cụ thể rằng trong TypeScript, kiểu có thể được xử lý như tập hợp các giá trị.

Trước tiên, hãy đơn giản coi kiểu là "tập hợp các giá trị". Ví dụ, kiểu `number` biểu diễn số, nếu kiểu này là tập hợp thì các phần tử của nó là các giá trị `number` cụ thể. Ví dụ, các số như `1` hay `3.14` là phần tử của tập hợp này. Như đã nói trong trang [kiểu number](../values-types-variables/number/README.md), phạm vi có thể biểu diễn của number type là hữu hạn, và tập hợp kiểu `number` là tập hợp các phần tử trong phạm vi đó cộng với các hằng số đặc biệt như `NaN` và `Infinity`.

Bây giờ, có một khái niệm kiểu quan trọng gọi là **unit type**. Unit type là kiểu đơn vị theo nghĩa đen, là kiểu chỉ có một giá trị làm phần tử. Trong set theory, tập hợp có một phần tử duy nhất được gọi là unit set hoặc singleton set.

Thứ tương ứng với unit set trong thế giới kiểu là unit type. Ví dụ, trong PHP, kiểu `null` có giá trị duy nhất `null` tương ứng với unit type, trong Kotlin và Scala có kiểu tên rõ ràng là `Unit` là unit type.

Trong TypeScript, kiểu `null` với giá trị duy nhất `null` và kiểu `undefined` với giá trị duy nhất `undefined` tương ứng với unit type.

```ts twoslash title="null và undefined là unit type"
type N = null;
const n: N = null;

type U = undefined;
const u: U = undefined;
```

Ngoài ra, TypeScript có [literal type](../values-types-variables/literal-types.md), và literal type này cũng tương ứng với unit type.

```ts twoslash title="Literal type là unit type"
type Unit = 1;
const one: Unit = 1;
```

Literal type là kiểu có thể biểu diễn value literal như kiểu, và mỗi primitive type như `number` hay `string` đều có literal type được tạo bởi literal của giá trị cụ thể.

- String literal type: `"st"`, `"@"`, ...
- Number literal type: `1`, `3.14`, `-2`, ...
- Boolean literal type: chỉ có hai `true`, `false`

Kiểu là tập hợp các giá trị, nhưng giá trị cụ thể tương ứng một-một với literal type của nó.

Số phần tử của tập hợp được tổng quát hóa bởi khái niệm "cardinality" (độ lớn) và được biểu diễn bằng cardinal number. Ví dụ, cardinality của unit set chỉ có một phần tử là 1. Tức là, cardinality của unit type khi coi kiểu như tập hợp là 1.

Vậy hãy nghĩ về kiểu đơn giản có cardinality 2, tức là có hai phần tử. Ví dụ, các phần tử (giá trị) của kiểu `boolean` biểu diễn boolean chỉ có `true` và `false`, không thể gán giá trị nào khác cho biến kiểu `boolean`. Do đó, kiểu `boolean` có thể coi như tập hợp cardinality 2.

```ts twoslash
const b1: boolean = true;
const b2: boolean = false;
// @errors: 2322
const b3: boolean = 1;
```

Nhớ lại về literal type, với boolean cũng có các literal type `true` và `false`. Mỗi kiểu này là unit type chỉ có một giá trị.

Literal type tương ứng một-một với giá trị cụ thể. Tập hợp các kiểu có phép toán tập hợp, nên có thể nghĩ là tạo tập hợp mới với literal type làm phần tử. Hợp thành từ hai singleton `true` và `false` để tạo union từ hai kiểu (hoặc giá trị) sẽ cho kiểu cardinality 2.

```ts twoslash title="Union của true và false"
type Bool = true | false;
```

Kiểu `Bool` được hợp thành bằng union type như vậy trở thành kiểu đồng nhất với kiểu `boolean`.

## Bottom type

Unit type là kiểu chỉ có một giá trị, nhưng cũng tồn tại kiểu không có giá trị nào. Kiểu như vậy được gọi là **bottom type**. Khi kiểu là tập hợp, bottom type tương ứng với empty set (tập rỗng), cũng được gọi là empty type.

Bottom type là kiểu không có giá trị nào, được sử dụng làm kiểu trả về của hàm ném exception. Bottom type trong TypeScript là kiểu `never` ở vị trí bottom, tức là dưới cùng của cấu trúc phân cấp subtype.

```ts twoslash
function neverReturn(): never {
  throw new Error("Hàm không bao giờ trả về");
}
```

Kiểu `never` như tập hợp là empty set, không có giá trị nào, nên không thể gán bất kỳ phần tử nào cho biến của kiểu đó.

```ts twoslash
// @errors: 1206 2322
const n: never = 42;
```

## Top type

Nếu bottom type là kiểu không có giá trị nào, thì ngược lại cũng tồn tại kiểu có tất cả giá trị. Kiểu như vậy được gọi là **top type**.

Top type có tất cả giá trị, có thể gán mọi giá trị cho biến của kiểu đó. Trong ngôn ngữ hướng đối tượng, thường là kiểu ở vị trí root, tức là top của cấu trúc phân cấp kiểu, và trong TypeScript kiểu `unknown` tương ứng với top type.

```ts twoslash
const u1: unknown = 42;
const u2: unknown = "st";
const u3: unknown = { p: 1 };
const u4: unknown = null;
const u5: unknown = () => 2;
```

Nếu bottom type tương ứng với empty set, thì có thể nói top type tương ứng với universal set (tập toàn thể). Nhân tiện, trong TypeScript, union type đặc biệt `{} | null | undefined` được xử lý tương đương với kiểu `unknown`, có thể gán qua lại.

```ts twoslash twoslash title="Union type đặc biệt tương đương kiểu unknown"
declare const u: unknown;
const t: {} | null | undefined = u;
```

`{}` là empty object type biểu diễn object không có property, kiểu này bao gồm mọi kiểu object và mọi primitive type trừ `null` và `undefined`. Do đó, có thể nghĩ `unknown` như universal set có thể phân chia thành 3 tập hợp như trên.

## Dynamic type

Trong TypeScript còn có một top type đặc biệt khác ngoài kiểu `unknown`. Đó là kiểu `any`. Kiểu `any` giống kiểu `unknown`, có thể gán mọi kiểu giá trị.

```ts twoslash
const a1: any = 42;
const a2: any = "st";
const a3: any = { p: 1 };
const a4: any = null;
const a5: any = () => 2;
```

Tính đặc biệt của kiểu `any` là không chỉ có thể gán từ mọi kiểu như top type, mà còn có thể gán cho mọi kiểu trừ kiểu `never`.

```ts twoslash
declare const a: any;

const n1: unknown = a;
const n2: {} = a;
const n3: number = a;
const n4: 1 = a;
// @errors: 2322
const n5: never = a;
```

Vì kiểu `any` có thể gán cho mọi kiểu trừ kiểu `never`, thoạt nhìn có vẻ hoạt động như bottom type, nhưng thực tế không phải bottom type.

TypeScript vốn là ngôn ngữ **type annotation tùy chọn** cho JavaScript, khi bỏ qua type annotation và không thể type inference, kiểu không xác định được ngầm suy luận là kiểu `any`. Trong tình huống này, kiểu `any` không chỉ có thể gán từ mọi kiểu mà còn phải có thể gán cho mọi kiểu, nhờ đó có thể dần dần thêm kiểu cho JavaScript không có type annotation.

Thực tế, kiểu `any` là top type duy nhất cho đến khi kiểu `unknown` được thêm vào TypeScript, nhưng với việc kiểu `unknown` được thêm vào như kiểu thuần túy ở top của quan hệ subtype, khái niệm quan hệ subtype trở nên rõ ràng hơn.

Và mental model của kiểu `any` nên được gán cho khái niệm kiểu gọi là Dynamic type.

Trong type system của gradual typing, cần kiểu làm ranh giới giữa thế giới tĩnh và động. Kiểu ranh giới này được gọi là `dynamic`, biểu diễn bằng ký hiệu `?`. Loại kiểu này biểu diễn kiểu không xác định tĩnh (statically-unknown type), hữu ích cho việc cùng tồn tại static typing và dynamic typing.

Nói chính xác hơn, như [mô tả trong tài liệu chính thức](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#gradual-typing), kiểu `any` của TypeScript hơn là Dynamic type, chỉ là "**thiết bị vô hiệu hóa type check**" đơn giản hơn. Nhưng biết đến sự tồn tại của Dynamic type giúp dễ hiểu vị trí của kiểu `any` trong type system.

## Diễn giải quan hệ subtype

Quan hệ subtype về cơ bản là "khi kiểu B là subtype của kiểu A, có thể chỉ định giá trị kiểu B khi yêu cầu giá trị kiểu A", là quan hệ về tính tương thích giữa các kiểu. Với các kiểu thông thường không phải function type, như đã thấy ở trên, nếu diễn giải kiểu như tập hợp thì quan hệ subtype tương ứng với **quan hệ bao hàm tập hợp**.

Trong [giải thích về quan hệ subtype](./structural-subtyping.md), đã nói rằng quan hệ giữa các kiểu có thể được hiểu như **cấu trúc phân cấp**, nhưng quan hệ bao hàm tập hợp có thể nói là cấu trúc với cách nhìn hơi khác về cấu trúc phân cấp.

<figure><figcaption>Cách nhìn theo tập hợp và cách nhìn theo phân cấp</figcaption>
<img src="/reference/values-types-variables/mental-model-of-types/2way-views-types.svg" width="480" />
</figure>

Top type `unknown` hoạt động như supertype, tức là kiểu cấp trên của mọi kiểu, mọi kiểu là subtype của kiểu `unknown`. Do đó, khi diễn giải kiểu như tập hợp, kiểu `unknown` là tập hợp chứa mọi giá trị trong TypeScript. Tức là universal set, mọi kiểu có thể coi như tập con của kiểu `unknown`.

Ngược lại, bottom type `never` là subtype của mọi kiểu. Do đó, khi diễn giải kiểu như tập hợp, kiểu `never` là tập hợp không chứa giá trị nào trong TypeScript, tức là có thể coi như empty set.

Như vậy, bằng cách nắm bắt quan hệ subtype như quan hệ bao hàm tập hợp, có thể suy luận trực quan hơn về tính tương thích kiểu.

Ví dụ, union của hai tập hợp bao hàm intersection của chúng. Union type và intersection type tương ứng với union và intersection, nên từ quan hệ bao hàm có thể suy luận intersection type là subtype của union type. Thực tế xác minh, có thể gán biến intersection type cho biến union type.

```ts twoslash
type A = { a: string };
type B = { b: number };

type Union = A | B;
type Intersection = A & B;

const a_and_b: Intersection = { a: "st", b: 42 };
const a_or_b: Union = a_and_b;
```
