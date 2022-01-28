# オブジェクトをマージ (結合) する

前ページではオブジェクトの浅いコピーについて語りました。
そこでは以前出てきたスプレッド構文 (`...`) のおかげで簡単に浅いコピーができることがわかりました。

今回はふたつ以上のオブジェクトをマージすることを考えます。なお、前ページのオブジェクトの浅いコピーで得た知識を活用するため、まだお読みでない方については改めてお読みいただき、その後こちらをご覧ください。

[オブジェクトを浅くコピーする](shallow-copy-object.md)

## 今回行うマージについて

マージという言葉をよく聞くのは Git などに代表される VCS (Version Control System) でしょう。一般的にマージはする側とされる側が存在し、する側にされる側のすべて (時に選択できる) が移動ないしコピーされることを指すことが多いでしょう。

JavaScript, TypeScript でコードベースで行われるマージは VCS のそれとは少々異なり、ふたつのオブジェクトから新しいマージ済みのオブジェクトを生成することが主流です。

### マージをするには

オブジェクトを浅くコピーする知識を使います。おさらいとして浅いコピーはスプレッド構文を使えば次のように書くだけです。

```ts
const copied = { ...obj };
```

オブジェクトのマージはマージしたいオブジェクトを引数のようにスプレッド構文で並べるだけでコピーができます

```ts
const merged = { ...obj1, ...obj2 };
```

### うれしいこと

オブジェクトのマージはふたつにとどまらず、何個でもオブジェクトをマージできます。

```ts
const merged = {
  ...obj1,
  ...obj2,
  ...obj3,
  // ...
};
```

浅いコピーのときもES2017で出力しましたのでこちらも併せて出力すると

<!--prettier-ignore-->
```ts
const merged = Object.assign(Object.assign(Object.assign({}, obj1), obj2), obj3);
```

とコンパイルされます。ちなみにこれは少々冗長で

```ts
const merged = Object.assign({}, obj1, obj2, obj3);
```

と書いても同じ結果になります。

### 注意すること

同名のキーがある場合、必ず最後に書かれているものが優先されます。値を消し込まないように注意してください。

```ts twoslash
const obj1: object = {
  firstName: "Otto",
  middleName: "von",
  lastName: "Bismarck",
};
const obj2: object = {
  firstName: "Yuko",
  lastName: "Sato",
};

const merged: object = { ...obj1, ...obj2 };

console.log(merged);
// @log: { firstName: "Yuko", middleName: "von" lastName: "Sato" }
```
