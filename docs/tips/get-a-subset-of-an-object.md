---
description: オブジェクトから任意のプロパティのみを持ったオブジェクトを得る方法。
---

# オブジェクトのサブセットを得る

オブジェクトのサブセットを得る方法です。サブセットとは、あるオブジェクトのいち部分を切り取ったもので、ここで紹介する方法は、プロパティ名を指定してオブジェクトの一部分を切り出すものです。たとえば、次のような数多くのプロパティを持つオブジェクトがあるとき、ここから数個のプロパティだけを持つオブジェクトを作る方法です。

```ts
const profile = {
  name: "suin",
  twitter: "suin",
  github: "suin",
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  buiding: "丸ビル",
  zipcode: "100-6390",
};

// 上の9つプロパティを持つオブジェクトから、下の6つのプロパティだけを抽出したオブジェクトを得たい

const address = {
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  buiding: "丸ビル",
  zipcode: "100-6390",
};
```

## 方法1: 即時関数・分割代入・shorthand property nameの合わせ技

オブジェクトのサブセットを得る1つ目の方法は、即時関数と分割代入、そして、shorthand property nameを組み合わせる方法です。

```ts
const sns = (({ twitter, github }) => ({ twitter, github }))(profile);
//=> {
//   "twitter": "suin",
//   "github": "suin"
// }
```

この方法のメリットとデメリットは次のとおりです。

- メリット
  - 外部ライブラリを必要としない。
- デメリット
  - 初見の読み手には意外性のあるコードに見える場合がある。
  - 即時関数の引数部分とshorthand property nameの2箇所に同じプロパティ名を書く必要があり冗長。

この書き方は、数個の少ないプロパティを抽出したいときは便利ですが、たくさんのプロパティを抽出しようとすると記述量が増え、徐々に大変さが出てきます。

抽出したいプロパティよりも、除きたいプロパティのほうが少ない場合は、次のような書き方で除きたいプロパティを指定するほうが簡単です。

```ts
const address = (({ name, twitter, github, ...rest }) => rest)(profile);
//=> {
//   "country": "JP",
//   "prefecture": "東京都",
//   "city": "千代田区",
//   "address": "丸の内2-4-1",
//   "buiding": "丸ビル",
//   "zipcode": "100-6390"
// }
```

JavaScriptでは、`delete`を使うとオブジェクトからプロパティを取り除けるので、上の書き方はまどろっこしいと思われるかもしれません。この書き方をするには理由があって、TypeScriptでは`delete`の使い勝手が良くないからです。たとえば、`profile`オブジェクトから`name`プロパティを`delete`するコードを書いただけでは、「Property 'name' does not exist on type ...」といったコンパイルエラーが発生してしまうのです。

```ts
const address = { ...profile };
delete address.name;
// ERROR: Property 'name' does not exist on type '{ country: string; prefecture: string; city: string; address: string; buiding: string; zipcode: string; }'.(2339)
```

## 方法2: lodash.pick / lodash.omit

2つ目の方法は[lodash](https://lodash.com/)を用いるものです。lodashはさまざまな便利関数を提供するライブラリで、その中のひとつに`pick`というオブジェクトのサブセットを得るための関数があります。

```ts
import _ from "lodash";

const sns = _.pick(profile, ["twitter", "github"]);
//=> {
//   "twitter": "suin",
//   "github": "suin"
// }
```

lodash全体ではなく、`pick`関数だけが必要な場合は、パッケージ[lodash.pick](https://www.npmjs.com/package/lodash.pick)を使うこともできます。この場合、次のようにして`pick`関数を使います。

```ts
import pick from "lodash.pick";

const sns = pick(profile, ["twitter", "github"]);
```

lodash.pickのメリットとデメリットは次のとおりです。

- メリット
  - 宣言的で読みやすい。
  - 記述量が少ない。
- デメリット
  - ライブラリを導入する必要がある。

lodash.pickは抽出したいプロパティ名を指定する関数ですが、抽出したいプロパティより除外したいプロパティが少ない場合は、[lodash.omit](https://www.npmjs.com/package/lodash.omit)を使ったほうが便利です。

```ts
import _ from "lodash";

const address = _.omit(profile, ["name", "twitter", "github"]);
//=> {
//   "country": "JP",
//   "prefecture": "東京都",
//   "city": "千代田区",
//   "address": "丸の内2-4-1",
//   "buiding": "丸ビル",
//   "zipcode": "100-6390"
// }
```

lodash、lodash.pickとlodash.omitのインストールは次のコマンドで行なえます。

```bash
# lodashのインストール
npm install lodash
npm install -D @types/lodash

# lodash.pickとlodash.omitのインストール
npm install lodash.pick lodash.omit
npm install -D @types/lodash.pick @types/lodash.omit
```
