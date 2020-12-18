# exportとexport defaultどちらを使うべきか？Pros/Consある話

## named exports <a id="named-exports"></a>

### Pros <a id="Pros"></a>

* インポートの際にエディターの補完がきく
* TSではvscodeの自動インポートが可能になる
  * [https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import)
* ひとつのモジュールで複数の値をエクスポートできる
* 明示的に命名することによって、名前から情報を得ることができる

### Cons <a id="Cons"></a>

* インポートするときにエクスポートされた際に命名された名前を使う必要がある
* エクスポートの名前を変更するとインポートしている側のコードに影響がでる

## default export <a id="default-export"></a>

### Pros <a id="Pros1"></a>

* インポート時に任意の名前を命名できる
* インポートの構文が単純化される
* モジュールの主要なエクスポートが何であるか、モジュール作成者の意図が伝わる

### Cons <a id="Cons1"></a>

* インポートする際に、名前を考える必要がある
* エディターがデフォルトエクスポートがあるかどうかを検出できない
* 再エクスポートの際に名前をつける必要がある
* 関数・クラス以外をExportするときに、一度変数に代入する必要がある

named exportsとdefault exportについてはECMAScript Discussion Archivesにおいて、議論されているので、こちらも参考にしてみるとよいでしょう。  
[https://esdiscuss.org/topic/moduleimport](https://esdiscuss.org/topic/moduleimport)

## どちらをどのようなときに使うべきなのか？

