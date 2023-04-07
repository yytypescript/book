---
title: Date
---

Dateは時刻のためのJavaScriptの読み込みクラスです。DateオブジェクトはUTC(協定世界時)の1970/01/01からの経過ミリ秒を表す数値を含んでいます。

## はじめに、Dateオブジェクトについて

Dateオブジェクトは1977年に廃止されたJavaのDateクラスを基にして10日でJavaScriptエンジンに含まれました。そのためwebを壊さない限り修正できないほど壊れていると言われているほどAPIがひどく、操作が難しいものとなっています。
そのため、ここで紹介するDateオブジェクトをそのまま使うのではなく、日付を扱うパッケージの導入を積極的に検討してください。

また、執筆時点でTemporalという新しい日付操作のAPIが開発されています。

### よく見る日付操作のパッケージ

#### [date-fns](https://date-fns.org/)

オブジェクトというよりは関数として日付の操作をします。直接Dateオブジェクトを操作する上での煩わしい点をカバーします。

#### [Day.js](https://day.js.org/)

軽量な日付操作のためのオブジェクトを提供します。後述するMoment.jsとAPIに互換性があり、Moment.jsを使っているプロジェクトでの乗り換え先に検討されることがあります。

#### [Moment.js](https://momentjs.com/)

日付操作のためのパッケージとして絶大な知名度がありますが現在は新規開発は行われておらず、積極的に新規プロジェクトで導入する必要はありません。

## Dateの操作

### 年を取得する - `Date.prototype.getFullYear()`

年を取得します。誤って`Date.prototype.getYear()`を使用しないでください。

### 年の下2-3桁を取得する - `Date.prototype.getYear()`

**非推奨です**。与えられた日付の年数を表す数値から1900を引いた値を返します。代わりに`Date.prototype.getFullYear()`を使ってください。

### 月を取得する - `Date.prototype.getMonth()`

月を取得しますが、0-11を返すため実際の月にするためには1を加算してください。

### 日を取得する - `Date.prototype.getDate()`

日を取得します。誤って`Date.prototype.getDay()`を使用しないでください。

### 曜日を取得する - `Date.prototype.getDay()`

曜日を取得します。0-6を返します。０が日曜日、1が月曜日のようになっています。

### 時を取得する - `Date.prototype.getHours()`

時を取得します。

### 分を取得する - `Date.prototype.getMinutes()`

分を取得します。

### 秒を取得する - `Date.prototype.getSeconds()`

秒を取得します。

### ミリ秒を取得する - `Date.prototype.getMilliseconds()`

ミリ秒を取得します。

### UTC 1970/01/01 00:00:00からの経過ミリ秒を取得する - `Date.prototype.getTime()`

協定世界時の1970/01/01 00:00:00からの経過ミリ秒単位の数値で返します。

### ISO8601に準じた文字列に変換する - `Date.prototype.toJSON()`

ISO8601に準じた文字列を返します。ISO8601は`YYYY-MM-DDThh:mm:ss.sssZ`の形式です。
