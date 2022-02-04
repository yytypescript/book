# オブジェクトを浅くコピーする

オブジェクトとは色々なキーとプロパティの組み合わせをひとつのモノとして扱うことができます。

オブジェクトを扱っているとき、そのインスタンスに対する比較や代入は他の言語と同じように参照の比較、代入です。その参照をほかのどこかで持たれているとそこで書き換えられる可能性があります。

## インスタンスを安易に上書きすると起こる弊害

たとえば生活習慣病に関するサービスを作るとします。そのサービスでは一日の食事を入力するとその食事から熱量 (カロリー) が計算され、さらに将来的に生活習慣病 (少々異なりますがMetabolic Syndromeとします) になるかどうか判定できるとします。

ここで一日の食事を意味するオブジェクトの型として`MealsPerDay`を定義し、一日に摂取した食事の熱量からいずれ生活習慣病になるかどうか判定する関数`willBeMetabo()`を定義すれば次のようになります。

```ts
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

function willBeMetabo(meals: MealsPerDay): boolean {
  // ...
}
```

使い方としては次のようになります。

```ts twoslash
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

declare function willBeMetabo(meals: MealsPerDay): boolean;

// ---cut---
// 439.2 kcal
const meals: MealsPerDay = {
  breakfast: "a vegetable salad",
  lunch: "a cod's meuniere",
  dinner: "a half bottle of wine (white)",
};

willBeMetabo(meals);
// @log: false
```

ですが、これだけだと食べ物ではないもの、たとえばネジなどの不正な入力があったときにサービスが予想しない反応をしかねません。そこで入力されているものが本当に食事かどうかをバリデーションする関数として`isMeals()`を定義します。この関数は食事ではないものが与えられると例外を投げます。

`isMeals()`の構造は単純です。朝食、昼食、夕食をそれぞれそれが食事であるかどうかを判定するだけです。ひとつの食事が食事であるかを判定する関数`isMeal()`があるとすれば内部でそれを呼ぶだけです。`isMeal()`の実装については今回は重要ではないため省略します。

```ts
function isMeals(meals: MealsPerDay): void {
  if (!isMeal(meals.breakfast)) {
    throw new Error("BREAKFAST IS NOT A MEAL!");
  }
  if (!isMeal(meals.lunch)) {
    throw new Error("LUNCH IS NOT A MEAL!!!");
  }
  if (!isMeal(meals.dinner)) {
    throw new Error("DINNER IS NOT A MEAL!!!");
  }
}
```

今回のユースケースでは`isMeals()`でバリデーションを行ったあとその食事を`willBeMetabo()`で判定します。食べられないものが与られたときは例外を捕捉して対応できればよいので大まかにはこのような形になるでしょう。

```ts
function shouldBeCareful(meals: MealsPerDay): boolean {
  try {
    // ...
    isMeals(meals);

    return willBeMetabo(meals);
  } catch (err: unknown) {
    // ...
  }
}
```

ここで`isMeals()`の制作者あるいは維持者が何を思ってか`isMeals()`に自分の好きなコッテコテギトギトの食事を、もとのインスタンスを上書きするようにプログラムを書いたとします。この変更によって前述のとても健康的で500 kcalにも満たない食事をしているはずのユーザーが`isMeals()`を19,800 kcalものカロリー爆弾を摂取していることになります。

```ts twoslash
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

const meals: MealsPerDay = {
  breakfast: "a vegetable salad",
  lunch: "a cod's meuniere",
  dinner: "a half bottle of wine (white)",
};

declare function willBeMetabo(meals: MealsPerDay): boolean;

declare function isMeal(meal: string): boolean;

// ---cut---
function isMeals(meals: MealsPerDay): void {
  meals.breakfast = "a beef steak";
  // beef steak will be 1200 kcal
  meals.lunch = "a bucket of ice cream";
  // a bucket of ice cream will be 7200 kcal
  meals.dinner = "3 pizzas";
  // 3 pizzas will be 11400 kcal

  if (!isMeal(meals.breakfast)) {
    throw new Error("BREAKFAST IS NOT MEAL!");
  }
  if (!isMeal(meals.lunch)) {
    throw new Error("LUNCH IS NOT MEAL!!!");
  }
  if (!isMeal(meals.dinner)) {
    throw new Error("DINNER IS NOT MEAL!!!");
  }
}

console.log(meals);
// @log: 439.2 kcal

isMeals(meals);

console.log(meals);
// @log: 19,800 kcal!!!

willBeMetabo(meals);
// @log: true
```

`isMeals()`を呼んでしまったらもうどのような食事が与えられても`willBeMetabo()`は誰もが生活習慣病に一直線であると判別されることになります。変数`meals`の変更は`isMeals()`内に留まらず、外側にも影響を与えます。

### 今回の問題

今回の例は`isMeals()`が悪さをしました。この関数が自分たちで作ったものであればすぐに原因を見つけることができるでしょう。このような問題のある関数を書かないようにすることはもちろん大事なことですが、未熟なチームメイトがいればこのような関数を書くかもしれません。人類が過ちを犯さない前提よりも過ちを犯すことがないようにする設計の方が大事です。

`isMeals()`が外部から持ってきたパッケージだとすると問題です。自分たちでこのパッケージに手を加えることは容易ではないため (できなくはありません) 。制作者にプルリクエストを出してバグフィックスが行われるまで開発を止めるというのも現実的ではありません。

### どうすればよかったのか

そもそもインスタンスを書き換えられないようにしてしまうか、元のインスタンスが破壊されないようにスケープゴートのインスタンスを用意するのが一般的です。前者はバリューオブジェクトと呼ばれるものが代表します。ここで紹介するのは後者のスケープゴート、つまりコピーを用意する方法です。

## 浅いコピー (shallow copy) とは

題名にもあるとおり**浅い**とは何を指しているのでしょうか？それはオブジェクトのコピーをするにあたりオブジェクトがいかに深い構造になっていても (ネストしていても) 第一階層のみをコピーすることに由来します。当然対義語は深いコピー (deep copy) です。

### 浅いコピーをしたオブジェクトは等しくない

浅いコピーをする関数を`shallowCopy()`とします。実装は難しくありませんが今回は挙動についてのみ触れたいため言及は後にします。浅いコピーをしたオブジェクトとそのオリジナルは`===`で比較すると`false`を返します。これはコピーの原義から当然の挙動であり、もし`true`を返すようであればそれはコピーに失敗していることになります。

```ts twoslash
declare function shallowCopy(obj: object): object;

// ---cut---
const object1: object = {};
const object2: object = shallowCopy(object1);

console.log(object1 === object2);
// @log: false
```

次の例は先ほどのインスタンスの上書きを浅いコピーをすることにより防いでいる例です。`meals`のインスタンスは変化せず`isMeals()`に引数として与えた`scapegoat`だけが変更されます。

```ts twoslash
type MealsPerDay = {
  breakfast: string;
  lunch: string;
  dinner: string;
};

const meals: MealsPerDay = {
  breakfast: "a vegetable salad",
  lunch: "a cod's meuniere",
  dinner: "a half bottle of wine (white)",
};

declare function shallowCopy(meals: MealsPerDay): MealsPerDay;

declare function isMeals(meals: MealsPerDay): void;

// ---cut---
const scapegoat: MealsPerDay = shallowCopy(meals);

console.log(meals);
// @log: { breakfast: "a vegetable salad", lunch: "a cod's meuniere", dinner: "a half bottle of wine (white)" }

console.log(scapegoat);
// @log: { breakfast: "a vegetable salad", lunch: "a cod's meuniere", dinner: "a half bottle of wine (white)" }

isMeals(scapegoat);

console.log(meals);
// @log: { breakfast: "a vegetable salad", lunch: "a cod's meuniere", dinner: "a half bottle of wine (white)" }

console.log(scapegoat);
// @log: { breakfast: "a beef steak", lunch: "a bucket of ice cream", dinner: "3 pizzas" }
```

### 浅いコピーで防ぎきれない場合

先ほども述べたように浅いコピーはオブジェクトの第一階層のみをコピーします。そのためもしオブジェクトが深い、複雑な階層を持っている場合、それらをすべてコピーしているのではなく、第二階層以降は単なる参照になります。次の例は浅いコピーのプロパティにオブジェクトがある場合、それがコピーではなく参照になっていることを示しています。

```ts twoslash
declare function shallowCopy(meals: NestObject): NestObject;

// ---cut---
type NestObject = {
  nest: object;
};

const object1: NestObject = {
  nest: {},
};
const object2: NestObject = shallowCopy(object1);

console.log(object1 === object2);
// @log: false
console.log(object1.nest === object2.nest);
// @log: true
```

完全なコピーを作りたい場合は浅いコピーと一緒に出てきた深いコピーを使います。
深いコピーについて今回は深く触れません。浅いコピーに比べ深いコピーはコピーに時間がかかり、さらに参照ではなく実体をコピーするため、記憶領域を同じ量確保しなければなりません。何でもかんでも深いコピーをするとあっという間に時間的、空間的な領域を浪費します。浅いコピーでこと足りる場合は浅いコピーを使用する方がよいでしょう。

### 浅いコピーを実装する

浅いコピーの実装は昨今のJSでは大変楽になっており、次のコードで完成です。

```ts
const shallowCopied: object = { ...sample };
```

もちろん変数`sample`はオブジェクトである必要があります。この`...`はスプレッド構文です。スプレッド構文については関数の章を参照ください。

オブジェクトのコピーにスプレッド構文を使えるようになったのはES2018からです。たとえば次のような浅いコピーの例を

```ts
const sample: object = {
  year: 1999,
  month: 7,
};

const shallowCopied: object = { ...sample };
```

ES2018でコンパイルすると次のようになります。

```ts
const sample = {
  year: 1999,
  month: 7,
};
const shallowCopied = { ...sample };
```

ほぼ同じですがES2017でコンパイルすると次のようになります。

```ts
const sample = {
  year: 1999,
  month: 7,
};
const shallowCopied = Object.assign({}, sample);
```

となります。スプレッド構文が実装される前はこの`Object.assign()`を使っていました。このふたつはまったく同じものではありませんが`Object.assign({}, obj)`を`{...obj}`のほぼ代替として使うことができます。

### `...`について

スプレッド構文は配列をはじめとするコレクションに対しても使うことができます。内部的には次のメソッドを実装しているクラスであればスプレッド構文に対応します。そのため、自作のスプレッド構文対応クラスも作成できます。

```ts
[Symbol.iterator](): Iterator<T>;
```

コレクションはこれから得られる結果から同じオブジェクトを作ることにも対応しているので、次のように書くことで簡単にコレクションの浅いコピーができます。

```ts
const a1: number[] = [2, 3, 4];
const a2: number[] = [...a1];

const m1: Map<number, string> = new Map<number, string>([
  [1, "a"],
  [2, "e"],
  [3, "f"],
]);
const m2 = new Map([...m1]);

const s1: Set<string> = new Set(["g", "d", "k"]);
const s2: Set<string> = new Set([...s1]);
```

2, 9, 16 行目がそれぞれのコレクションの浅いコピーを意味しています。

実はObjectクラスは`[Symbol.iterator]()`に対応していないのですが、スプレッド構文によるオブジェクトの浅いコピーをサポートしています。
