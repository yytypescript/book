# anyとunknownの違い

`any, unknown`型はどのような値も代入できます。

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

ちなみに逆の概念としてどの値も代入できない`never`という型もありますが、今回は説明を省きます。

`any`型に代入したオブジェクトのプロパティ、メソッドは使用することができます。

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

一方、`unknown`型に代入したオブジェクトのプロパティ、メソッドは使用することができません。使用できないどころか、実行することができません。

```ts twoslash
const unknown4: unknown = 0.8;
const unknown5: unknown = "Comment allez-vous";
const unknown6: unknown = {
  x: 0,
  y: 1,
  name: "origin",
};

// ---cut---
// @errors: 2571
console.log(unknown4.toFixed());
console.log(unknown5.length);
console.log(unknown6.name);
```

これだけ見ると`unknown`型よりも`any`型の方が優れていると思われるかもしれませんがそうではありません。`any`型は言い換えれば**TypeScriptが型のチェックを放棄した型**であり、そのためなんでもできます。`any`型を使うということはTypeScriptでせっかく得た型という利点を手放しているのと同じです。

これでは存在しているエラーはコンパイル時には気が付けず、ソフトウェアをリリースしたあと実際のユーザーが使ったときに実行時エラーとなります。それが不具合報告や、クレームとなり、被害が拡大していきます。

`any`型に関しては、次のような無茶なコードもTypeScriptは一切関与せず、実行してみてプログラムが実行時エラーになる、初めてこのプログラムが不完全であることがわかります。

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

`unknown`型は一貫してTypeScriptがプロパティ、メソッドへのアクセスを行わせません。そのため実行することができず、意図しないランタイム時のエラーを防止します。

```ts twoslash
const unknown6: unknown = {
  x: 0,
  y: 1,
  name: "origin",
};

// ---cut---
// @errors: 2571
console.log(unknown6.x.y.z);
```

TypeScriptのプロジェクトを作る時に必要なtsconfig.jsonにはこの`any`型の使用を防ぐためのオプションとして`noImplicitAny`があります。既存のJavaScriptのプロジェクトをTypeScriptに置き換えていくのではなく、スクラッチの状態からTypeScriptで作るのであればこの設定を入れるとよいでしょう。
