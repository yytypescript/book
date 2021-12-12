# 配列の破壊的操作

JavaScriptの配列メソッドには、破壊的なメソッドと非破壊的なメソッドの2種類があります。特に、破壊的なメソッドは注意深く使う必要があります。

## 非破壊的なメソッド

**非**破壊的なメソッドは、操作に配列の変更をともなわないメソッドです。たとえば、`concat`は非破壊的なメソッドです。これは複数の配列を結合するメソッドです。もとの配列は書き換えず、新しい配列を返します。

```ts twoslash
const nums1 = [1, 2];
const nums2 = [3, 4];
const all = nums1.concat(nums2);
console.log(nums1);
// @log: [ 1, 2 ]
console.log(nums2);
// @log: [ 3, 4 ]
console.log(all);
// @log: [ 1, 2, 3, 4 ]
```

## 非破壊的なメソッドの一覧

非破壊的なメソッドには次のものがあります。

| メソッド                                                                                                       | 操作                                                                                           |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [concat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)           | 2つ以上の配列を結合した配列を返す                                                              |
| [find](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/find)               | 提供されたテスト関数を満たす配列内の最初の要素を返す                                           |
| [findIndex](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)     | 配列内の指定されたテスト関数を満たす最初の要素の位置を返す                                     |
| [lastIndexOf](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) | 配列中で与えられた要素が見つかった最後のインデックスを返す                                     |
| [slice](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)             | 配列の一部を切り出して返す                                                                     |
| [includes](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)       | 配列に任意の要素が含まれているかを`true`か`false`で返す                                        |
| [indexOf](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)         | 引数に与えられた内容と同じ内容を持つ最初の配列要素のインデックスを返す                         |
| [join](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/join)               | 全要素を連結した文字列を返す                                                                   |
| [keys](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)               | 配列のインデックスをArray Iteratorオブジェクトで返す                                           |
| [entries](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)         | 配列のインデックスと値のペアをArray Iteratorオブジェクトで返す                                 |
| [values](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/values)           | 配列の値をArray Iteratorオブジェクトで返す                                                     |
| [forEach](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)         | 与えられた関数を、配列の各要素に対して一度ずつ実行する                                         |
| [filter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)           | 与えられた関数によって実装されたテストに合格したすべての配列からなる新しい配列を返す           |
| [flat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)               | すべてのサブ配列の要素を指定した深さで再帰的に結合した新しい配列を返す                         |
| [flatMap](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)         | 最初にマッピング関数を使用してそれぞれの要素をマップした後、結果を新しい配列内にフラット化する |
| [map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)                 | 与えられた関数を配列のすべての要素に対して呼び出し、その結果からなる新しい配列を返す           |
| [every](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every)             | 列内のすべての要素が指定された関数で実装されたテストに合格するかどうかをテストする             |
| [some](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/some)               | 配列の少なくともひとつの要素が、指定された関数で実装されたテストに合格するかどうかをテストする |
| [reduce](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)           | 配列のそれぞれの要素に対してユーザーが提供した「縮小」コールバック関数を呼び出す               |
| [reduceRight](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) | アキュームレーターと配列のそれぞれの値に対して (右から左へ) 関数を適用して、単一の値にする     |

## 破壊的なメソッド

破壊的なメソッドは、配列の内容や配列の要素の順番を変更する操作をともなうメソッドです。たとえば、`push`は破壊的メソッドの1つです。これは、配列末尾に要素を追加します。

```ts twoslash
const nums = [1, 2];
nums.push(3);
console.log(nums);
// @log: [ 1, 2, 3 ]
```

## 破壊的なメソッドの一覧

破壊的なメソッドには次のものがあります。

| メソッド                                                                                                     | 操作                                                                                   |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [push](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push)             | 配列の末尾に要素を追加する                                                             |
| [unshift](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)       | 配列の最初に要素を追加する                                                             |
| [pop](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)               | 配列から最後の要素を取り除き、その要素を返す                                           |
| [shift](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)           | 配列から最初の要素を取り除き、その要素を返す                                           |
| [splice](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)         | 要素を取り除いたり、置き換えたり、新しい要素を追加する                                 |
| [sort](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)             | 配列の要素をソートする                                                                 |
| [reverse](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)       | 配列の要素を逆順に並び替える                                                           |
| [fill](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)             | 開始インデックスから終了インデックスまでのすべての要素を、静的な値に変更した配列を返す |
| [copyWithin](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) | サイズを変更せずに、配列の一部を同じ配列内の別の場所にシャローコピーして返す           |

## 特に要注意な破壊的なメソッド

`reverse`メソッドは配列を逆順にした配列を返します。戻り値があるので、一見すると**非**破壊なメソッドに見えなくもありません。しかし、このメソッドは配列の順番も逆にしてしまうので注意が必要です。

```ts twoslash
const nums = [1, 2, 3];
const newNums = nums.reverse();
console.log(nums);
// @log: [ 3, 2, 1 ]
console.log(newNums);
// @log: [ 3, 2, 1 ]
```

PHPの`array_reverse`関数はJavaScriptの`reverse`メソッドと名前が同じですが、PHPのほうは**非**破壊的な操作です。もとの配列を変更せずに逆順にソートされた配列を新しく生成して返します。

```php title="PHPのarray_reverse"
$nums = [1, 2, 3];
$reversedNums = array_reverse($nums);
var_dump($nums);
//=> [1, 2, 3]
var_dump($reversedNums);
//=> [3, 2, 1]
```

このように、他の言語では非破壊的な配列操作がJavaScriptでは破壊的操作の場合もあります。メソッド名だけで破壊的か非破壊的かを判断せず、各メソッドの使い方をしっかり確認する必要があります。

## 破壊的なメソッドを安全に使う方法

破壊的なメソッドを**非**破壊的に使うには、破壊的操作を行う前に、配列を別の配列にコピーします。配列のコピーはスプレッド構文`...`を用います。

[スプレッド構文](./spread-syntax-for-array.md)

コピーした配列に対して破壊的操作を行えば、もとの配列が変更される心配が無くなります。

```ts twoslash
const original = [1, 2, 3];
const copy = [...original]; // コピーを作る
copy.reverse();
console.log(original); // 破壊的操作の影響がない
// @log: [ 1, 2, 3 ]
console.log(copy);
// @log: [ 3, 2, 1 ]
```

この`reverse`の例は、コピーと破壊的なメソッドの呼び出しを1行に短縮して書くこともできます。

```ts twoslash {2}
const original = [1, 2, 3];
const reversed = [...original].reverse();
console.log(original);
// @log: [ 1, 2, 3 ]
console.log(reversed);
// @log: [ 3, 2, 1 ]
```

<TweetILearned>

・JavaScriptの配列メソッドには、破壊的なものと非破壊的なものがある
・破壊的なものは、配列に変更を加える
・非破壊的なものは、配列に変更を加えない
・非破壊に思えるメソッドが実は破壊的なこともあるから要注意
・配列をコピーしてから破壊的操作をすると安全

</TweetILearned>
