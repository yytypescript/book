---
sidebar_label: オブジェクトで受け、オブジェクトを返す
---

# オブジェクトで受け、オブジェクトを返す (RORO)

関数やメソッドでオブジェクトひとつを引数として受け、戻り値もオブジェクトひとつとする RORO という考え方があります。RORO は **Receive an Object, Return an Object** の略です。この考えは JavaScript ならびに TypeScript では大きな恩恵をもたらします。

## いままでの関数

JavaScript に限らず、駆け出しの頃の関数はこのような関数をしています。

```ts
function findUser(
  name?: string,
  age?: number,
  country?: string,
  isVip?: boolean
): User {
  // ...
}
```

好きなパラメータで検索できるようにか、引数自体を省略可能にして検索できるようにしています。とはいえ次の問題が立ちはだかります。

### 引数が追加されたとき

居住地と国籍は違う！とパラメータとして国籍(`nationality`)が追加されたとします。このとき国籍はどこに追加されるでしょうか?`isVip`の次が安全ですが人によってはその位置を嫌うかもしれません。

また、今回は`findUser()`という関数に限定しての話にしていますが、同じような引数をとる`~~~User()`のメソッドがあれば何箇所も同時に修正が必要になるでしょう。これは面倒です。

### 省略可能でない引数がある他の関数の場合

引数のうち、省略可能であるものは右側 (後ろ) に詰めて書かなければいけません。今回は検索ですべての引数を省略可能にしていますが、ものによっては国 (`country`) のみは必須入力とする関数を作るとなれば、それだけは関数の第 1 引数にせざるを得ません。このような問題が生じれば引数が追加されたときと同じように引数の並びで混乱を生むでしょう。

このような問題を解決するものとしてオブジェクトに必要な情報をひとつに詰めて引数に送るROROという考えがあります。

## RORO (Receive an Object, Return an Object)

上記ユーザーであればデータクラスのような (ただのデータだけ入った可視性 public のクラス) を作れば問題は回避できます。 TypeScript でその型を`UserInfo`とすれば`UserInfo`は次になります。

```ts
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  isVip?: boolean;
};
```

今回は律儀に`Optional`の`?`をつけましたが`Partial<T>`でも代用可です。

このようにしてこの型のオブジェクトを引数の方としてひとつ受けるようにします。

```ts
function findUser(info: UserInfo): User {
  if (info.age >= 20) {
    // ...
  }

  // ...
}
```

これでは JavaScript ならびに TypeScript で使える便利な Tip というよりは、ただの Tip です。ではこれはなぜ JavaScript, TypeScript で重用されるのかというと、分割代入が関係しています。

分割代入を使うと関数はオブジェクトのキーを引数に指定するだけでその値にアクセスできます。たとえば`findUserByName()`と名前 (`name`) しか必要のない関数で`UserInfo`をすべて受けるのではなく分割代入を使うとこのようになります。

```ts
function findUserByName({ name }: UserInfo): User {
  // ...
}
```

分割代入について再度知識が必要な方は次のページをご参照ください。

[オブジェクトの分割代入 (destructuring assignment)](../reference/values-types-variables/object/destructuring-assignment-from-objects.md)

[分割代入引数 (destructuring assignment parameter)](../reference/functions/destructuring-assignment-parameters.md)

分割代入はこの関数を使う側としても引数の順番を気にする必要がなくなるとともに、ありがたいことに今後の機能拡張によって`UserInfo`が成長したとしても毎回引数を追加する必要はなく`UserInfo`を書き換え使用したい関数でそのキーにアクセスをするだけですみます。上記例のように国籍 (`nationality`) が増えれば好きなところに加えるだけです。順番は呼び出しに影響を与えません。

```ts
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  nationality?: string;
  isVip?: boolean;
};
```

これだけで`nationality`を (`byName`で国籍を使っている問題は置いておくとして) 簡単に呼び出せます。

```ts
function findUserByName({ name, nationality }: UserInfo): User {
  // ...
}
```

関数の説明でもあったとおりですが、分割代入にも初期値を使うことができます。たとえば`findUser()`では通常引退済みのユーザーを検索しないのであれば`UserInfo`と関数は次のように書き換えるだけです。

```ts
type UserInfo = {
  name?: string;
  age?: number;
  country?: string;
  nationality?: string;
  isVip?: boolean;
  isRetired: boolean;
};
```

```ts
function findUser({ name, age, country, isRetired = false }: UserInfo): User {
  // ...
}
```
