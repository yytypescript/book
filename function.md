# 関数

JavaScriptでは関数は第一級オブジェクトです。よって変数に代入したりすることも可能です。また筆記方法も複数存在し、TypeScriptもそれを継承しています。

## 関数の宣言

関数の宣言は主に3通りの方法があります。以下は全て同じ関数`increment()`を宣言しています。

### 名前付き関数

```typescript
function increment(num: number): number {
  return num + 1;
}
```

### 匿名関数

```typescript
const increment = function(num: number): number {
  return num + 1;
}
```

### 匿名かつアロー関数

```typescript
const increment = (num: number): number => {
  return num + 1;
}
```

本書では関数は全て名前付き関数での記述となっています。

また、匿名かつアロー関数は、1行で戻り値を返却できる場合はさらに短縮することができます。

### 匿名かつアロー関数1行版

```typescript
const increment = (num: number): number => num + 1;
```

この時は`return`を**書いてはいけない**ので注意してください。

さらに、引数が1個である場合はカッコも省略できます。

### 匿名かつアロー関数1行かつ引数が1個版

```typescript
const increment = num => num + 1;
```

ただし、これができるのは引数が1個の時のみで、0個の時や複数ある時はできません。  
また、この時は引数に対して**型をつけることができません**。

今では使う機会も減りましたが`generator`という特殊な関数を作ることもできます。ですがこの関数はアロー関数での表記を認めておらず、必ず`function*() {}`と書く必要があります。

## `this`

`function() {}`と`() => {}`で異なる点はいくつかありますが特に注意しなければならないのは`this`です。例えば以下のようなクラスを考えます。

```typescript
class JetLag {
  private message: string;
  
  public constructor(message: string) {
    this.message = message;
  }
  
  public replyFunction(ms: number): void {
    setTimeout(function() {
      console.log(this.message);
    }, ms);
  }

  public replyArrow(ms: number): void {
    setTimeout(() => {
      console.log(this.message);
    }, ms);
  }
}
```

このクラスのメソッドは、どちらも指定したミリ秒後にコンストラクタで指定した文字列を表示しますが、実際に実行してみると以下のようになります。

```typescript
const jetlag: JetLag = new JetLag('i can hear you later');

jetlag.replyFunction(10);
// undefined
jetlag.replyArrow(10);
// 'i can hear you later'
```

これは`function() {}`と`() => {}`が意味するコンテキストが違うために起こります。`() => {}`は宣言時に`this`であるものを使用するのに対して`function() {}`は実行時に`this`であるものを使用します。`setTimeout()`のような処理に時間差が発生しうるものに対してTypeScriptやJavaScriptでは処理が終了しだい関数を呼ぶことで返事を返すことがよくあります。これをコールバックと言います。

### 不定な`this`をはっきりさせる

`function() {}`を使うときに`this`を確定させる方法として以下のふたつがあります。以下は上記クラスの`replyFunction()`を書き換えていると解釈してください。

#### 使いたい`this`を退避させる

一度`this`をほかの変数に代入してあとで呼び出します。

```typescript
public replyFunction(ms: number): void {
  const self: this = this;

  setTimeout(function() {
    consol.log(self.message);
  }, ms);
}
```

#### `function() {}`の`this`を束縛する

`function`には`bind()`という関数があります。その関数に、`function`で`this`として使用したい変数を引数に入れます。

```typescript
public replyFunction(ms: number): void {
  setTimeout(function() {
    consol.log(this.message);
  }.bind(this), ms);
}
```

`() => {}`が実装される前まではほぼ必須だった`this`の取り扱いですが、現在ではそこまで必要ではなくなりました。

## 関数の型

匿名関数、匿名かつアロー関数では変数に代入していることからわかるように、関数も型による表現が可能です。

上記関数`increment()`では関数の型はこのようになります。

```typescript
(num: number) => number;
```

これは実際の匿名かつアロー関数と少々宣言が異なります。厳密に言うと戻り値の位置が異なります。匿名かつアロー関数は、実体を除けば以下の形をしています。

```typescript
(num: number): number => {...};
```

## 引数

関数の入力値である引数は特殊なことをしない限り、要求する型の変数を、要求する数だけ入力しなければいけません。  
例えば原点との距離を求める以下の関数があったとします。

```typescript
function distance(p: Point): number {
  return (p.x ** 2 + p.y ** 2) ** (1 / 2);
};
```

なお、xy座標上の点を表す`Point`の定義は以下です。

```typescript
type Point = {
  x: number;
  y: number;
};
```

関数`distance`は平面状にある点`(x, y)`の原点からの距離を返します。この関数を呼ぶ時は必ず引数の数、順番は揃わなければなりません。つまり以下のような関数呼び出しはできません。

### 引数が少ない

```typescript
distance();
// -> Expected 2 arguments, but got 1.
```

### 引数が多い

```typescript
distance(p1, p2, p3);
// -> Expected 2 arguments, but got 3.
```

JavaScriptでは引数が少ない時はその引数には`undefined`が渡され、引数が多い場合は余分な引数は無視されるのですが、ここは大きな違いです。

## `Optional parameters`と`Default parameters`

引数を省略したいことがあります。その時は`Optional parameters`と`Default parameters`を使用することができます。  
上記の関数`distance()`は、現在は与えられた座標を元に原点からの距離を計算していますが、これを2点の距離を計算できるようにしたいとすると上記の関数`distance()`は以下のようになります。

```typescript
function distance(p1: Point, p2: Point): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}

distance(q1, q2);
```

### `Optional parameters`

ここで、第2引数は省略可能にし、省略した場合は第1引数と原点の距離を返したいとします。これは`Optional parameters`を使用すると以下のように書けます。

```typescript
function distance(p1: Point, p2?: Point): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}

distance(q1, q2);
distance(q1);
```

引数の`p2`の右隣に`?`がつきました。これで`p2`は省略可能な引数となり5, 6行目のどちらの書き方も受け付けるようになります。

しかし、この`Optional parameters`は意味する型が少々変わります。内部的には`p2`は`Point`ではなく`Point | undefined`のユニオン型として解釈されます。ユニオン型の説明は先の章にあるため詳しい説明は譲りますが、ユニオン型が与えられた時は、どちらの型にもあるプロパティ、メソッドでなければ使うことができません。当然ながら`undefined`には`x, y`というプロパティは存在しないため、上記のコードはTypeScriptに指摘されます。

この問題を解消したのが以下のふたつです。

#### 省略時の初期化処理を書く

```typescript
function distance(p1: Point, p2?: Point): number {
  let p0: Point | undefined = p2;
  
  if (p0 === undefined) {
    p0 = {
      x: 0,
      y: 0
    };
  }

  return ((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2) ** (1 / 2);
}
```

省略時はどの値を使うかという処理が明文化されますが、後述の`Default parameters`がほぼ同じことをできます。これで実装できる場合は`Default paramteres`の使用を検討してください。

#### 処理を分ける

```typescript
function distance(p1: Point, p2?: Point): number {
  if (p2 === undefined) {
    return (p1.x ** 2 + p1.y ** 2) ** (1 / 2);
  }

  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

`if`は`p2`が`undefined`の時に実行され、内部で`return`をしています。そのため`if`ブロックの下は`p2`が`Point`であることが確定します。そのためTypeScriptはユニオン型から普通の`Point`として解釈し、このように書くことができるようになります。

### `Point | undefined` との違い

`p2`の型が`Point | undefined`として解釈されるのなら、あえて`?`などという記号を新しく定義する必要などないのではと思われるかもしれませんが、明確な違いがあります。それは**呼び出し側で省略できるかどうかということ**です。上記の通り`Optional parameters`は省略が可能なのですが、`undefined`とのユニオン型であることを明記すると省略ができません。

```typescript
function distance(p1: Point, p2: Point | undefined): number
  // ...
}

distance(q1, q2);
distance(q1);
// -> Expected 2 arguments, but got 1.
// -> distance(q1);

distance(q1, undefined);
```

6行目のような書き方は指摘を受けます、動作させるためには10行目のように書かなければいけません。

### `Optional parameters`でできないこと

`Optional parameters`は必ず最後に書かなければいけません。つまり、以下のように`Optional parameters`より後ろに普通の引数を書くことはできません。

```typescript
function distance(p1?: Point, p2: Point): number {
  // ...
}
// -> A required parameter cannot follow an optional parameter.
```

### `Default parameters`

省略した時、原点との距離を求めるといったわかりやすい例であればいいのですが`(1, 2)`との距離を求める、といった変化球がきたとします。なにも考えないとこのようになります。

```typescript
function distance(p1: Point, p2?: Point): number {
  if (p2 === undefined) {
    return ((p1.x - 1) ** 2 + (p1.y - 2) ** 2) ** (1 / 2);
  }

  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

もちろん動くのですが、意図がわかりにくくなってしまいます。このような時に便利なのが`Default parameters`です。`Default parameters`を使用すると以下のように書けます。

```typescript
const p0: Point = {
  x: 1,
  y: 2
};

function distance(p1: Point, p2: Point = p0): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}

distance(q1, q2);
distance(q1);
distance(q1, undefined);
```

`Optional parameters`と違いユニオン型ではないため、処理の分岐が不要になります。拡張性や見通しを考えれば`Default parameters`の方に軍配が上がるでしょう。

### 初期値に関数の戻り値を使う

`Default parameters`には関数の戻り値を指定することができます。例えば、ある`(px, py)`が与えられると転置した`(py, px)`を返す`inverse`という関数の戻り値を初期値として使用します。ちなみに`inverse`は以下です。

```typescript
function inverse(p: Point): Point {
  return {
    x: p.y,
    y: p.x
  };
}
```

これを使うと`distance`は以下のようになります。

```typescript
function distance(p1: Point, p2: Point = inverse(p1)): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

また、`Default parameters`は`Optional parameters`と異なり、最後に書く必要はありません。呼び出し側で`Default parameters`を使用させたい時は`undefined`を指定します。

```typescript
const p0: Point = {
  x: 1,
  y: 2
};

function distance(p1: Point = p0, p2: Point): number {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}

distance(q1, q2);
distance(undefined, q2);
```

### `Default parameters`でできないこと

しかしながら、関数を`Default parameters`として使う時は非同期の関数を使うことができません。TypeScriptならびにJavaScriptは処理を非同期的に扱うことが多く、`Promise / async / await`といった非同期処理を同期的に扱うための機能があります。詳細は先の章にあるため詳しい説明は譲りますが非同期関数が値を返すまで処理を待つということはできません。

```typescript
async function distanceAync(p1: Point, p2: Point = await inverseAync(p1)): Promise<number> {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
}
```

このように`Default parameters`を書くことはできません。なお`inverseAsync`は非同期関数とします。

## `Rest parameters`

いわゆる可変の引数のことです。たとえば引数に与えられた数値の平均を返す関数`average`を作るとします。これを`Rest parameters`を使って表現すると以下のようになります。

```typescript
function average(...nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }

  return nums.reduce((prev: number, cur: number): number => {
    return prev + cur;
  }) / nums.length;
}

average(); // 0
average(1, 3); // 2
```

0除算を防ぐ目的で少々処理が複雑になっていますが、可変の引数の前に`...`を付ければ、可変引数を受け付け、それらを配列として受けることができます。

### `Rest parameters`でできないこと

`Rest parameters`は最終的に配列として解釈されるからといって、引数をまとめてひとつの配列として渡すことはできません。

```typescript
average([1, 3, 5, 7, 9]);
```

このように配列を直接渡してしまうと`average`の関数内では要素数1の`number[][]`が渡されたと解釈されます。

### `Spread syntax`

JavaScriptに組み込みのメソッドとして存在する`Math.max`は`Rest parameters`を要求します。上記の通り配列をそのまま入れることができません。つまり以下のようなことができません。

```typescript
const scores: number[] = mathExamination();

Math.max(scores);
```

これは学校の試験をイメージして書いています。生徒の数は1年間ではそう増減はしないので、40人ぐらいの生徒なら力技でもなんとかなるかもしれません。

```typescript
Math.max(scores[0], scores[1], scores[2], scores[3], scores[4], scores[5], scores[6], ...);
```

書いている最中に力つきました。しかもこれが生徒が転入したり転校したりするとコードを書き換えなければならなくなります。

このような時は`Spread syntax`を使って配列を引数の列に変換します。

```typescript
const scores: number[] = mathExamination();

Math.max(...scores);
```

`Rest parameters`も`Spread syntax`もどちらも`...`と表記しますが片方は個々の引数を配列にし、もう片方は配列を個々の引数にします。

## `Destructuring assignment`

たとえばBMI\(Body Mass Index\)を計算したいとします。身長\(cm\)と体重\(kg\)が与えられれば関数`bmi`は以下のような計算になります。

```typescript
function bmi(height: number, weight: number): number {
  const mHeight: number = height / 100.0;
  return weight / (mHeight ** 2);
}
```

この関数は引数がどちらも`number`型なので入れ替えてしまうことがあります。

```typescript
bmi(170, 65);
bmi(65, 170);
```

このような誤用を避けるための方法として`Destructuring assignment`を使うことができます。`Destructing assignment`を使うと以下のように書きなおせます。

```typescript
type TopSecret = {
  height: number;
  weight: number;
};

function bmi({height, weight}: TopSecret): number {
  const mHeight: number = height / 100.0;
  return weight / (mHeight ** 2);
}
```

呼び出しは以下のようになります。これなら`height`と`weight`の意味を取り違えない限り問題は起こりにくくなるでしょう。以下は同じ結果を返します。

```typescript
bmi({height: 170, weight: 65});
bmi({weight: 65, height: 170});
```

### `Destructuring assignment`でうれしいこと

`Destructuring assignment`は普通の引数と異なり以下のような利点があります。

#### 引数の順番にとらわれない

これは、上記のとおりです。

#### `Default parameters`と併用できる

身長あるいは体重を省略できようにして、省略時に初期値を入れるようにすることができます。以下の`TopSecret`は上記のものと同一です。

```typescript
function bmi({height = 165, weight = 60}: Partial<TopSecret>): number {
  const mHeight: number = height / 100.0;
  return weight / (mHeight ** 2);
}
```

なお、`Partial<T>`とは、オブジェクト`T`のプロパティ、メソッドを省略可能にします。つまり`Partial<TopSecret>`は以下と同じです。

```typescript
type Partial<TopSecret> = {
  height?: number;
  weight?: number;
};
```

これによって呼び出し側は`bmi()`を以下のどのような方法でも呼び出すことができます。

```typescript
bmi({});
bmi({height: 180});
bmi({weight: 75});
bmi({height: 180, weight: 75});
bmi({weight: 75, height: 180});
```

## 戻り値

関数の戻り値を指定することができます。あえて書かなくてもTypeScript側で補完し、関数の戻り値として提供してくれますが、書いた方が意図しない戻り値を返していないかの検査が働くので良いでしょう。前述の通り書く位置が宣言と型で異なることに注意してください。

戻り値はJavaScriptと同じく1値のみの返却です。一度に多くの値を戻したい場合はタプルの章をご覧ください。

戻り値がないことを明示したい時は`void`と書きます。内部では`undefined`を返していることと同義です。ただし、戻り値を`undefined`と明記した時と違う点があります。それは`return`のない関数は`void`である必要があります。  
以下の例では`doNothing4()`は`return`のない関数で戻り値の型が`undefined`なのでTypeScriptから指摘を受けます。それ以外は問題がありません。

```typescript
function doNothing1(): void {
}

function doNothing2(): void {
  return;
}

function doNothing3(): void {
  return undefined;
}

function doNothing4(): undefined {
}
// -> A function whose declared type is neither 'void' nor 'any' must return a value.

function doNothing5(): undefined {
  return;
}

function doNothing6(): undefined {
  return undefined;
}
```

これは`undefined`から`void`への変換は可能であるのに対して`void`から`undefined`への変換が不可能であることに由来します。

```typescript
function returnUnfefined(): undefined {
  return undefined;
}

function returnVoid(): void {
}

const u1: undefined = returnUnfefined();
const u2: void = returnUnfefined();

const v1: undefined = returnVoid();
// -> Type 'void' is not assignable to type 'undefined'.
const v2: void = returnVoid();
```

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

| メインライター | 対応スケジュール |
| :--- | :--- |
| jamashita | 04/03 執筆完了 |



