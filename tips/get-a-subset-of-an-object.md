---
description: オブジェクトから任意のプロパティのみを持ったオブジェクトを得る方法。
---

# オブジェクトのサブセットを得る

オブジェクトのサブセットを得る方法です。サブセットとは、あるオブジェクトのいち部分を切り取ったもので、ここで紹介する方法は、プロパティ名を指定してオブジェクトの一部分を切り出すものです。例えば、次のような5つのプロパティを持つオブジェクトがあるとき、ここから3つのプロパティだけを持つオブジェクトを作る方法です。

```typescript
const fullAddress = {
    zipcode: "100-0005",
    country: "JP",
    prefecture: "東京都",
    city: "千代田区",
    address: "丸の内1丁目"
};

// 上の5つプロパティを持つオブジェクトから、下の3つのプロパティだけを抽出したオブジェクトを得たい

const partialAddress = {
    prefecture: "東京都",
    city: "千代田区",
    address: "丸の内1丁目"
};
```

### 方法1: 即時関数・分割代入・shorthand property nameの合わせ技

オブジェクトのサブセットを得る1つ目の方法は、即時関数と分割代入、そして、shorthand property nameを組み合わせる方法です。

```typescript
const partialAddress = (({ prefecture, city, address }) => ({
    prefecture,
    city,
    address,
}))(fullAddress);
```

この方法は、外部ライブラリを必要としないため導入が簡単な反面、この書き方を初めて見る人にとっては意外性のあるコードとして受け止められるかもしれません。また、プロパティ名の指定は、即時関数の引数部分とshorthand property nameの2箇所に書く必要があります。

### 方法2: lodash.pick

2つ目の方法はlodashを用いるものです。lodashはライブラリで、pickというオブジェクトのサブセットを得るための関数が提供されています。

```typescript
import _ from "lodash";

const partialAddress = _.pick(fullAddress, ["prefecture", "city", "address"]);
```

lodashはnpmでインストールします。

```bash
# lodashのインストール
npm install lodash
# lodashの型定義のインストール
npm install -D @types/lodash
```

lodash全体ではなく、pick関数だけが必要な場合は、パッケージ`lodash.pick`をインストールする方法もあります。

```bash
# pick関数のインストール
npm install lodash.pick
# pick関数の型定義のインストール
npm install -D @types/lodash.pick
```

lodash.pickをインストールした場合は、次のようにしてpick関数を使います。

```typescript
import pick from "lodash.pick";

const partialAddress = pick(fullAddress, ["prefecture", "city", "address"]);
```

