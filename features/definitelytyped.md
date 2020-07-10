# 定義ファイル

自身のプロジェクトでTypeScriptでコーディングする場合は型を宣言することにより、IDEやエディタの補完機能やコードチェックを行えます。しかし外部のパッケージを利用する場合は型定義ファイルが含まれているとは限りません。

## 定義ファイルとは

定義ファイルとはアクセス可能な宣言を記述したファイルです。拡張子は`.d.ts`です。

定義ファイルは主にパッケージを配布するために作成されます。TypeScriptからJavaScriptにコンパイルされるときに型情報は無くなってしまいます。そのままJavaScriptパッケージを利用すると型定義の恩恵を得ることができません。しかし定義ファイルを同梱することにより補完やコードチェックとして利用するようにできます。

ただし、必ずしも定義ファイルが存在するとは限りません。**定義ファイルの有無**にて説明します。

### 定義ファイル出力例

tscコマンドに`-d`オプションをつけてコンパイルを行うと定義ファイルを出力することができます。

```typescript
// sample.ts
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person): string {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
```

出力されたsample.d.tsファイルの`greeter`関数の処理部はなくなり、定義情報のみになっていることが確認できます。

```typescript
// sample.d.ts
interface Person {
    firstName: string;
    lastName: string;
}
declare function greeter(person: Person): string;
```

## 定義ファイルの有無

定義ファイルはパッケージ開発者またはボランティアにより作成されます。

* 定義ファイル有り
  * TypeScriptで書かれたパッケージ
  * JavaScriptで書かれたパッケージだが、.d.tsファイルを同梱している
* 定義ファイル有りだが別途インストールが必要
  * JavaScriptで書かれたパッケージだが、 DefinitelyTypedに登録されている
* 定義ファイル無し
  * JavaScriptで書かれたパッケージで定義ファイルが存在しない

定義ファイル有りの場合は、設定なく型情報を参照することができます。

### 定義情報を別途インストール

もし、パッケージに定義ファイルが同梱されていない場合は自身でインストールする必要があります。

[TypeSearch](https://microsoft.github.io/TypeSearch/)からパッケージ名を検索しインストールを行います。TypeSearchのリポジトリは[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)であり、ここに多くのライブラリの定義ファイルが一元管理されています。

[Express](https://expressjs.com/)本体と定義ファイルのインストール例は下記のようになります。

```text
$ npm install express --save
$ npm install @types/express --save-dev
```

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

* クロレ
  * 定義ファイルを書く
    * 定義ファイルのタイプ
      * TypeScriptで書かれたパッケージは @types不要
      * JavaScriptで書かれているけど .d.ts を同梱しているパッケージ \(ex gatsby\)
      * JavaScriptで書かれたパッケージで@typesに登録されているものは @types/hogehogeをインストール　**\***
      * JavaScriptで書かれたパッケージで@typesに登録されていないものは、  _\*\*_
        * 自力で書くかanyで頑張る
        * allowJs: true? checkJs: true? どっちかONか両方ONにすると、jsファイルを型推論してくれた記憶が……
        * 自分で型定義ファイルを書いたらtsconfig.json `typeRoots` をなんやかんやする
        * \[typeRootsの誤解 -- TypeScriptで、npmからインストールしたパッケージに型定義ファイル \(\*.d.ts\) が存在しない場合の正しい対処方法 - Qiita\]\([https://qiita.com/tetradice/items/b89a5dd41fcebf96379e](https://qiita.com/tetradice/items/b89a5dd41fcebf96379e)
          * /// 
          * これ今も使う？

| メインライター | 対応スケジュール |
| :--- | :--- |
| クロレ | 2020/05/?? |

