# 分割代入引数 \(destructuring assignment parameter\)

たとえばBMI\(Body Mass Index\)を計算したいとします。身長\(cm\)と体重\(kg\)が与えられれば関数`bmi()`は次のような計算になります。

```typescript
function bmi(height: number, weight: number): number {
  const mHeight: number = height / 100.0;
  
  return weight / (mHeight ** 2);
}
```

この関数は引数がどちらも`number`型なので入れ替えてしまうことがあります。22は平均的な体型ですが402はややとてつもなく肥満です。

```typescript
bmi(170, 65);
// -> 22.49134948096886
bmi(65, 170);
// -> 402.36686390532543
```

このような誤用を避けるための方法として分割代入を使うことができます。分割代入を使うと次のように書きなおせます。

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

呼び出しは次のようになります。これなら`height`と`weight`の意味を取り違えない限り問題は起こりにくくなるでしょう。以下は同じ結果を返します。

```typescript
bmi({height: 170, weight: 65});
bmi({weight: 65, height: 170});
```

すでに`height, weight`という変数が定義済みであればこのように書くこともできます。

```typescript
const height: number = 170;
const weight: number = 65;

bmi({height, weight});
bmi({weight, height});
```

### 分割代入でうれしいこと

分割代入は普通の引数と異なり次のような利点があります。

#### 引数の順番にとらわれない

これは、上記のとおりです。

#### デフォルト引数と併用できる

身長あるいは体重を省略できるようにして、省略時に初期値を入れるようにすることができます。

```typescript
function bmi({height = 165, weight = 60}: Partial<TopSecret>): number {
  const mHeight: number = height / 100.0;
  return weight / (mHeight ** 2);
}
```

`Partial<T>`とは、オブジェクト`T`のプロパティ、メソッドを省略可能にします。つまり`Partial<TopSecret>`は以下と同じです。このときの`?`は引数で説明したオプション引数と意味するものは同じです。

この`Partial<T>`については専門に解説しているページがありますので併せて参照ください。

{% page-ref page="../type-reuse/utility-types/partial.md" %}

```typescript
type PartialTopSecret = {
  height?: number;
  weight?: number;
};
```

これによって呼び出し側は`bmi()`を次のどのような方法でも呼び出すことができます。

```typescript
bmi({});
bmi({height: 180});
bmi({weight: 75});
bmi({height: 180, weight: 75});
bmi({weight: 75, height: 180});
```

さらに次のように引数の型の右にも`= {}`とデフォルト引数を付けてあげれば引数自体を省略することができるようになります。

```typescript
function bmi({height = 165, weight = 60}: Partial<TopSecret> = {}): number {
  // ...
}

bmi();
```

