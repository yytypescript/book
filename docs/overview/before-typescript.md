# TypeScript誕生の背景

TypeScriptは、JavaScriptでも大規模なアプリケーションを開発しやすくすることを目的に開発されたプログラミング言語です。

確かにJavaScriptは元々、大規模な開発を想定した設計ではありませんでした。それでも、JavaScript自体が進化して、大規模開発に対応してゆけば良かったはずです。しかし、実際はそううまくは行きませんでした。代わりに、大規模開発の一部はTypeScriptが引き受けることになったのです。

なぜ、そうなったのでしょうか？その答えはJavaScriptの歴史にあります。TypeScriptが必要な発明で、そして、今もなお必要とされている理由が見えてきます。それでは、TypeScript誕生以前の歴史をひも解いていきましょう。

## 1990年代

### JavaScriptの誕生

JavaScript誕生以前は、簡単なフォームのバリデーションをするのも、サーバーサイドのプログラムで行う必要がありました。Netscape Navigatorというブラウザを開発していたNetscape社は、クライアントサイドで動くプログラムの必要性に気づきました。そこで、1995年、Netscape社はNetscape Navigatorで動くスクリプト言語として、JavaScriptを実装しました。

### 補助的な道具

当時のJavaScriptは、HTMLの補助的な言語と考えられていて、その用途は簡単なアニメーションを実装したり、フォームのバリデーションに使う程度でした。ましてや、JavaScriptが大規模なアプリケーションを作るための言語とは見なされていませんでした。

今となっては事実か不明ですが、当時JavaScriptにはセキュリティ上の問題があるという主張があり、ブラウザの設定でJavaScriptをオフにした上でネットサーフィンをするのが、“ITリテラシーが高い人”という印象すらありました。そのため、サイトによっては「当サイトを閲覧するにはJavaScriptをオンにしてください」といった注意書きもしばしば見かけました。

1990年代のJavaScriptは、現代のように必須のものでは決してなく、あくまで補助的・随意的な立ち位置の言語だったのです。

## 2000年代初頭

### くすぶりはじめる大規模開発のニーズ

他のプラットフォームに目を移すと、この時期にはすでにブラウザアプリケーションを実現する技術として、[Javaアプレット](https://ja.wikipedia.org/wiki/Java%E3%82%A2%E3%83%97%E3%83%AC%E3%83%83%E3%83%88)や[Adobe Flash](https://ja.wikipedia.org/wiki/Adobe_Flash)がありました。特にFlashはJavaアプレットよりも動作が軽く、ウェブサイト全体をFlashで実装するサイトが登場したり、この時代を省みて「[Flash黄金時代](https://dic.nicovideo.jp/a/flash%E9%BB%84%E9%87%91%E6%99%82%E4%BB%A3)」という言葉が後に生まれたりしました。一方のJavaScriptは依然として「補助的な道具」のイメージが支配的でした。

一般的に対話型のユーザーインターフェースを備えたウェブサイト、今で言うウェブアプリケーションは、当時は「リッチインターネットアプリケーション」と呼ばれ、その多くはJavaアプレットやFlashが担っていましたが、プログラマの中にはJavaScriptを使ったウェブアプリケーションの開発を試みる人たちもいました。

1997年に、Microsoftが企業向けウェブメーラーとして、Outlook Web Access 2000を市場投入しましたが、これはJavaScript製のウェブアプリケーションでした。現代の我々からすると意外かもしれませんが、この時代のJavaScriptはまだサーバーと通信することができませんでした。そこで、Microsoftはこのアプリのために、後のXMLHttpRequest(XHR)となるXMLHTTPという機能をInternet Explorerに追加したりもしました。XHRは革新的なアップデートでしたが、多くのプログラマから注目を得るのはもっと歴史が流れてからになります。

2000年代初頭には、対話型のUIを備えた大規模なウェブアプリケーションがJavaScriptで開発できるようになることが望まれだしてきました。

### 失われた10年

この頃には、JavaScriptはNetscape社が所有する言語から、ウェブ業界を上げて取り組む言語になっていました。そのため、JavaScriptの言語仕様はECMAScriptという名で策定され、各ベンダーがその仕様に基づいてそれぞれJavaScriptを実装するという流れになっていました。このECMAScriptを策定する会合がTC39であり、JavaScriptに関わるNetscape社やMicrosoft社を始めとしたベンダーが参加していました。

TC39では、大規模開発にも耐えうるJavaScriptの必要性を鑑みて、新たな言語仕様である「ECMAScript 4」の策定についての議論を1999年頃から始めていました。このECMAScript 4(ES4)では、主に次のような野心的な言語仕様が議論されていました:

- モジュール
- Javaのようなクラス
- 静的型付け
- Nullable型
- ユニオン型
- ジェネリクス

おや、どれもTypeScriptが持っているものではありませんか？そうなのです。「大規模なアプリケーション開発をしやすく」という点は、2つの言語が共有する問題意識であり、そのため、今から20年前のJavaScriptにおいても、TypeScriptと同じような解決策が検討されていたのです。

ここでひとつ疑問が出てきます。「ES4のアイディアがJavaScriptにもたらされていたら、そもそもTypeScriptなんて必要なかったのでは？」という疑問です。

実は、残念ながら、ES4は正式な仕様として採用されることにはならなかったのです。ES4の仕様策定は、2003年に2年間の中断を経て、2005年に再開され、2007年に仕様書のドラフトが公開されました。ES4はこれまでのJavaScriptと互換性がありませんでした。保守的な立場を取るMicrosoft社と、革新的な変更を加えたいNetscape社で対立が起こり、政治的な背景からも折り合いをつけられなかったES4の草案は、2008年についに破棄されることとなります。

このような出来事があり、一度は大規模化を目指したJavaScriptでしたが、その目標を達成できないまま、約10年の年月が流れることとなります。

## 2000年代中盤

### Google Mapの衝撃

JavaScriptの進化は足踏み状態、「本格的なアプリケーションを開発する言語ではない」というJavaScriptのイメージが依然として支配的な中、ウェブ業界に衝撃的な出来事が起こります。2005年のGoogle Mapの登場です。

当時の地図サイトの多くは、地図を移動したり拡大縮小するとウェブページがリロードされるものばかりだったので、画面遷移なしにスムーズに地図を操作できるGoogle Mapは、当時の感覚で言えば、ネイティブアプリの操作感をウェブページで実現した画期的な発明でした。

Google Mapの操作性を裏で支えたのが、AJAXです。AJAXは“**A**synchronous **Ja**vaScript and **X**ML”の略で、XMLHttpRequestオブジェクトによる非同期のHTTP通信を利用し、ページをリロードなしにサーバーからXMLでデータを取得し、HTMLの一部を書き換える技術です。今となってはAJAXは常識をとおりすぎて、古めの技術のイメージがありますが、当時としては最先端の技術でした。

Google Mapは多くのプログラマに衝撃を与えました。AJAXに脚光を浴びせただけでなく、JavaScriptでも立派なアプリケーションが作れることを証明して見せたのです。

## 2000年代後半

### 大規模化のニーズの強まり

Google Mapの成功を目にした開発者は、ブラウザさえあれば他に何もインストールする必要がないアプリケーションをユーザーに提供できるウェブアプリケーションにより一層の魅力を感じるようになり、JavaScriptによる大規模開発のニーズも日に日に増してきました。

2005年には、JavaScriptアプリケーションフレームワークの先駆けであるPrototype.jsがリリースされました。翌年にはjQueryがリリースされ、その後しばらくして、2009年にAngularJS、2010年にBackbone.jsが発表され、フロントエンドWebアプリケーション開発のツールが続々と発明される流れになっていきます。

### 進化なきJS、一世風靡のAltJS

JavaScriptの開発スタイルは一変し、大規模化が進む中、JavaScript自体には動きが見られません。期待が寄せられたES4も、2008年にご破算となってしまいました。

開発者たちは進化なきJavaScriptに甘んじていたわけではありませんでした。「JavaScript本体が良くならないなら、JavaScriptにコンパイルできる言語を作ればいいのではないだろうか？」開発者の中にはこう考える人々が現れました。

こうした発想のもと、JavaScriptアプリケーションの開発言語として一世を風靡するのが、2009年に発表されたCoffeeScriptです。CoffeeScriptはRubyのような簡潔な文法でコーディングできることが魅力の言語で、サーバーサイドフレームワークのRuby on Railsにもフロントエンド開発用言語として正式採用されました。CoffeeScriptにはclass構文があり、クラス指向のオブジェクト指向プログラミングに慣れ親しんだプログラマには好評でした。

コーディングは別の言語で行い、それをJavaScriptにコンパイルするという奇抜に思えた手法は成功を収め、このアプローチを採用する言語が数多く開発され、それらの言語は総称してAltJSと呼ばれるようになりました。言語から言語にコンパイルすることを「トランスパイル」と言いますが、この言葉が定着したのもこの頃です。AltJSが一般化すると、JavaScriptは「現代のアセンブラ」と揶揄されることもありました。

### ECMAScript 2015始動

2008年になると、ECMAScriptに新たな動きが生まれます。JavaScriptを改善しようという議論が再開したのです。ES4は革新的すぎたため、保守派から大きな反対にあいました。そこで、ES4ほど革新的ではなく、既存のJSとの互換性を保ちながらES4の成果を取り込むための折衷案として、Harmonyという新しい言語仕様が検討されることになりました。Harmonyにはclass構文や、module構文、import/exportなど大規模開発を想定した言語仕様が提案されました。そのうちのいくつかは、のちのECMAScript 2015に採用されることになります。

このようにして、JavaScriptの言語仕様を話し合うTC39が生産的な会合になってきたこともあり、JavaScriptの将来に期待も集まるようになってきました。

## 2010年代

### TypeScriptの誕生

ECMAScript 2015の策定に向け、TC39で大規模開発の議論が活発になる中、2012年に発表されたのがTypeScriptです。

TypeScriptは誕生当初より、ますます困難になるJavaScriptの大規模開発に焦点を当てていました。特に強調された特徴が、JavaScriptのスーパーセット、モジュール性、そして型です。

当時、人気を博していたCoffeeScriptがJavaScriptの文法とはドラスティックに異なる独自路線を打ち出したのに対し、TypeScriptはJavaScriptの文法を拡張するに留める「JavaScriptのスーパーセット言語」としての戦略を採用しました。そのため、TypeScriptを導入したとしても、既存のJavaScript資産はそのまま活用でき、チームの学習にも突発的なコストがかからず、徐々にTypeScriptの恩恵を増やしていけるようになっていたので、大規模開発でもすぐに導入できるようになっていました。

モジュール性は大規模開発ではとても重要になります。コードを適切な粒度に分割し整理できたり、実装の詳細をカプセル化できたり、変数名や関数名が衝突しないような言語仕様がなければ、大規模開発はかなり難しいものになります。

当時のJavaScriptには、モジュールシステムや名前空間といったものが無かったため、大規模開発を難しいものにしていました。TypeScriptは、この問題を解決するためにES2015の提案に上がっていたクラスやモジュールの構文を先取りし、モジュール性を実現しました。

型はTypeScriptの最大の特徴でした。型の恩恵として、コーディング中にコードジャンプやコード補完ができ、型情報がドキュメントにもなり、プログラムを動かす前にソースコードのチェックを行えるようになりました。このように型は大規模開発の生産性を大きく向上させました。

### 薄れないTypeScriptの強み

TypeScriptが発表された後、TypeScriptが手本としたECMAScript 2015は正式に発表され、その後、ECMAScriptは毎年アップデートされるようになりました。一時期停滞したJavaScriptも、大規模開発のハードルを下げるべく年々進化を遂げてきています。

そうした中で、TypeScriptが誕生当初に掲げていた3大特徴のうち、モジュール性はJavaScriptの仕様にも盛り込まれ、その部分ではTypeScriptは優位性を失いました。しかし、TypeScriptの目玉である「型」は、2020年の今日でもJavaScriptの仕様には盛り込まれていません。

大規模開発をするにあたって、型は非常に重要な言語仕様であり、JavaScriptが進化を続ける中においても、TypeScriptの「型」というのは今でも確固たる強みであることは間違いないでしょう。

## まとめ

1995年に生まれたJavaScriptは当初、大規模な開発に用いられることが想定されていませんでした。10年もすると、大規模開発のニーズが顕在化しはじめ、JavaScriptは対応に迫られました。しかし、ベンダー同士の合意をとりつけられず、JavaScriptの進化は停滞します。

JavaScriptが硬直状態だった間も、ウェブアプリケーションは大規模化が進み、開発の難易度が日に日に増してきました。それに対して、さまざまな解決策がコミュニティからなされるようになります。

その流れの中で発明されたのがTypeScriptです。TypeScriptは大規模開発の困難さに立ち向かう言語として、JavaScriptのスーパーセット・モジュール性・型の3つの特徴を携えて2012年に発表されました。

TypeScriptの発表後、JavaScriptも再び進歩を始め、6年ぶりのメジャーアップデートとしてECMAScript 2015を発表し、そこから毎年新仕様を発表しつづけています。それでも、TypeScriptの最大の特徴である「型」は、依然としてJavaScriptにはありません。今日においてもTypeScriptが大規模開発で好まれるのは、JavaScriptでは得られない開発体験があるためです。

## 参考資料

- [Chapter 4. How JavaScript Was Created](http://speakingjs.com/es5/ch04.html)
- [Microsoft augments JavaScript for large-scale development | InfoWorld](https://www.infoworld.com/article/2614863/microsoft-augments-javascript-for-large-scale-development.html)
- [The Real Story Behind ECMAScript](https://auth0.com/blog/the-real-story-behind-es4/)
- [JavaScript 2.0](https://web.archive.org/web/20000816194528/http://mozilla.org/js/language/js20-1999-02-18/index.html)
- [JavaScript 2.0 Motivation](https://web.archive.org/web/20000823225602/http://mozilla.org/js/language/js20-1999-02-18/motivation.html)
- [ActionScript - Wikipedia](https://en.wikipedia.org/wiki/ActionScript)
- [JavaScript - Wikipedia](https://ja.wikipedia.org/wiki/JavaScript)
- [ECMAScript - Wikipedia](https://en.wikipedia.org/wiki/ECMAScript)
- [A Brief History of JavaScrip](https://auth0.com/blog/a-brief-history-of-javascript/)
- [The ECMAScript 6 schedule change](https://2ality.com/2014/06/es6-schedule.html#fn2)
- [見えてきた「ECMAScript 6」。JavaScriptの生みの親が書く「Harmony of Dreams Come True」 － Publickey](https://www.publickey1.jp/blog/12/javascriptecmascript_6harmony_of_dreams_come_true.html)
- [JavaScript: The First 20 Years | Zenod](https://zenodo.org/record/3707008#.XrVIhBMzZTY)
- [Anders Hejlsberg: Introducing TypeScript | Channel 9](https://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript)
