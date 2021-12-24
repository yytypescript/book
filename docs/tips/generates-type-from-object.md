# オブジェクトから型を生成する

多くの言語では型による構造体、オブジェクトの定義をしてからコーディングが始まりますが、元がJavaScriptであるTypeScriptにはそのような決まりがないことも多々あります。

## 一般的な型を先に決めるプログラミング

多くの言語ではその型が何かを決めてから、その型に属するオブジェクトを決めます。次の例はTypeScriptの例ですが、他の言語に当てはめても問題なく受け入れられると思います。

```ts
type Account = {
  accountName: string;
  password: string;
  age: number;
  plan: "Free" | "Standard" | "Premium";
};

const account: Account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard",
};
```

すでにJavaScriptの資産があるプロジェクトにおいては表立って型などなく、そのため`Account`といった型は存在せず代入式の`const account`のみが存在していることでしょう。そんなときはこの`const account`をTypeScriptに変換してできるだけ近い形で型を作ることができます。

### `typeof`

この`typeof`はJavaScriptのものではなく、TypeScriptの`typeof`です。これを実際に動作している変数に使ってみるとその変数をTypeScriptはどのような型と認識しているのかがわかります。

```ts
const account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard",
};

type Account = typeof account;
```

するとこの変数から生成された型`Account`は次のようになります。

```ts
type Account = {
  password: string;
  accountName: string;
  plan: string;
  age: number;
};
```

`plan`が意図するユニオン型にはなりませんが、それなりに近い型を得ることができました。

### プロパティを定数値で取得したい場合

プロパティを定数値で取得したい場合はオブジェクトに`as const`をつけます。

```ts
const account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard",
} as const;

type Account = typeof account;
```

`Account`は次のようになります。

```ts
type Account = {
  readonly password: "ccbyncsa30";
  readonly accountName: "yyts";
  readonly plan: "Standard";
  readonly age: 80;
};
```

### 特定のプロパティだけを定数値で取得したい場合

これでは型の制約が強力すぎて他の値が代入できないので、もう少し柔軟にします。たとえば`plan`だけがユニオン型になるようにしたければ`plan`の右に希望の型を書いてあげればそれでその型になります。

```ts
const account = {
  accountName: "yyts",
  password: "ccbyncsa30",
  age: 80,
  plan: "Standard" as "Free" | "Standard" | "Premium",
};

type Account = typeof account;
```

`Account`は次のようになります。

```ts
type Account = {
  password: string;
  accountName: string;
  plan: "Free" | "Standard" | "Premium";
  age: number;
};
```
