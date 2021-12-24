# undefinedとnullの違い

多くのプログラミング言語で「値がない」を表現する方法は、nullなど1とおりです。しかし、JavaScriptでは「値がない」に相当する表現にnullとundefinedの2とおりがあります。他の言語からJavaScriptに来た人が驚き、使い分けに悩む部分です。ここでは、nullとundefinedの仕様上の違い、実際のコーディングでどう使い分けるべきかについて説明します。

## 意味合いの違い

undefinedとnullは大きなくくりで「値がない」ことを意味する点は共通しています。意味的な違いがあるとしたら、undefinedは「値が代入されていないため、値がない」、nullは「代入すべき値が存在しないため、値がない」という微妙な違いです。

この意味的な違いを厳密につきつめてコーディングするのは、入門者には難しいものです。使い分けに客観的な基準があるわけではないためです。もしどちらを使うべきか迷ったらundefinedを使っておくほうが無難です。

## 言語仕様上の違い

undefinedとnullには言語の仕様上の違いがあります。これは意味合いの違いのような漠然としたものではなく、はっきりと確認できるものです。

### nullは自然発生しない

undefinedは言語仕様上、プログラマーが明示的に使わなくても、自然に発生してくるものです。たとえば、変数を宣言したときに初期値がなければJavaScriptはその変数にundefinedを代入します。

```js twoslash
let value;
console.log(value);
// @log: undefined
```

オブジェクトに存在しないプロパティや配列にない要素にアクセスしたときも、自動的にundefinedになります。

```js twoslash
const obj = {};
console.log(obj.foo);
// @log: undefined
const arr = [];
console.log(arr[0]);
// @log: undefined
```

戻り値がない関数の戻り値を取得したときもundefinedになります。

```js twoslash
function func() {}
console.log(func());
// @log: undefined
```

一方、nullはプログラマーが意図的に使わない限り発生しません。JavaScriptとしてはnullを提供することがないということです。ただし、一部のDOM系のAPIはnullを返すこともあるため、ライブラリによってはnullと出会うことはあります。

### undefinedは変数

undefinedもnullもプリミティブ型の値という点は共通していますが、undefinedは変数でありnullはリテラルです。nullはリテラルなのでnullという名前の変数を作ることはできません。一方でundefinedはリテラルではなく変数なので、undefinedという変数を作ることはできます。

### typeof演算子

typeof演算子の結果がundefinedとnullで変わってきます。undefinedはtypeofの結果がプリミティブ名を指す"undefined"になるのに対し、nullは"null"ではなく"object"になります。

```js twoslash
typeof undefined;
// @log: "undefined"
typeof null;
// @log: "object"
```

### JSON

オブジェクトプロパティの値にundefinedを用いたとき、そのオブジェクトをJSON.stringifyでJSON化したときに、オブジェクトプロパティは削除されます。一方、プロパティの値がnullのときは、JSON化したときに値が保持されます。

```js twoslash
console.log(JSON.stringify({ foo: undefined }));
// @log: {}
console.log(JSON.stringify({ foo: null }));
// @log: {"foo": null}
```

## undefinedとnullの使い分け

undefinedとnullをどう使い分けたらいいかは大きな論争を呼ぶテーマです。プログラマーの中には、undefinedだけを使うべきと言う人もいれば、nullを使うべきという人もいます。また、undefinedとnullの意味合いの違いをしっかり理解して、使い分けるべきと主張する人もいます。逆に、深く考えすぎずに使うというスタンスの人もいます。

特にこだわりがないのなら、TypeScriptではnullは使わずにundefinedをもっぱら使うようにするのがお勧めです。とは言っても、nullを返すAPIがなくはないので、自分が新たにコードを書く部分においては、nullは使わずにundefinedにできるだけ寄せるといったイメージです。APIが返すnullをundefinedに変換していってもいいですが、変換コードだらけになるような場合は、nullをそのまま許容するといった折衷案もよいです。

### 使い分け意識を育てる労力は、それに見合うメリットが少ない

2種類を使い分けるとなると、コードの各所でどちらを使うべきかの意思決定が必要になります。意思決定は個人作業ならまだしも、チームワークとなるとハードルが上がってきます。チームで「こういう場合はundefinedを使うべき」「こういうときはnullを使う」といったルールと具体例を共通認識として持つ必要がでてきます。共通認識が確立されていないと、コーディング中に質問が出てきたり、コードレビューで指摘されて手直しが発生したりと、あまり本質的でないところで開発が一時停止していまいがちです。使い分けをするために、ルール策定や意識のすり合わせすることは不可能ではありませんが、その労力に見合うほど、undefinedとnullを使い分けるメリットは大したものではないというが実際のところです。

一方で、「nullは使わずundefinedに統一しよう」はシンプルなルールです。これなら共通認識として持つことがしやすく、チームワークもしやすくなります。実際にTypeScriptの開発チームでは「[nullは使わない」というたった1行のシンプルなガイドライン](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined)を示し、数多くの開発者が参加しやすくなるようにしています。

### undefinedに統一するほうが簡単

「値がない」ことを意味するものがundefinedとnullの2種類あることが混乱の元なので、どちらか一方を使うようにするほうがコーディング上の意思決定を減らせます。なので、nullに寄せていく方法も考えられます。しかし、それはお勧めしません。undefinedはいたるところで自然に発生してくるので、それらをすべてnullにしようとすると、記述量がどんどん増えていくからです。

変数宣言で初期値をnullにする程度なら簡単ですが、存在しないオブジェクトプロパティや配列要素にアクセスしたときにもnullを返すようにするところまでやろうとすると難しくなってきます。したがって、統一するとしたらundefinedに寄せるほうが現実的です。
