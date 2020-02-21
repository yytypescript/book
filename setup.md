# 3.1 開発環境の準備

{% hint style="warning" %}
このページは未完成です。クロレ\(mosapride\)執筆中 twitter: @v\_kurore
{% endhint %}

TypeScriptの開発するに当たってNode.jsが必要になります。まずはNode.jsのおさらいをしましょう。

### Node.jsとは

Node.jsとは、Chrome の V8 JavaScript エンジン で動作する JavaScript 環境です。Server-Side JavaScriptと説明される場合が多いのですが開発初期はサーバー\(Linux\)のみ動作対象OSだったためその名残となっています。2011年7月15日 Node.js v0.5.1からWindowsをサポート。2011年11月11日リリースNode.js v0.6.1からはMacをサポートするようになりました。

Node.jsにはJavaScriptに存在しないAPIが存在します。わかりやすい関数はFileSystem\(fs\)です。fs.readFile\(path\)はPC上のファイル読み込みができまし、fs.writeFile\(path , data\)はPC上のディレクトリにファイル書き込みを行うことができます。ほとんどのブラウザではサンドボックスが導入されておりブラウザ外部の操作は行うことはできません。では、Node.jsは拡張されたJavaScriptかと言われるとそうではありません。Node.jsではwindows.alert\(\)など、ブラウザ独自のAPIは存在しないからです。

JavaScriptはブラウザ上で動作するプログラミング言語に対し、Node.jsはデスクトップまたはサーバー上でNode.jsファイルを動作させる環境となります。

#### なぜTypeScript開発環境にNode.jsが必要なのか

Node.jsを利用してデスクトップアプリやWebサーバーなどを作成することができます。TypeScriptの開発環境にNode.jsが必要な理由はTypeScriptコンパイラを利用するためです。

### Node.jsのインストール

Node.js公式ページがらダウンロード・インストールを行う事ができますが、これはおすすめしません。何故ならばNode.jsの開発サイクルのスピードが早いためです。毎年10月に新しいバージョンのLTS版がリリースされます。

{% hint style="info" %}
🧙♂ **Tips:** "LTS" Long Term Supportの略。長期サポートの安定版。
{% endhint %}

１台のPC上にNode.jsを利用したプロジェクトが１つ、かつ、Node.jsのアップデートを行う予定がない場合は問題がありませんが複数のプロジェクトがあり、それらが異なったバージョンの場合に支障が出てきます。言語仕様の変更などにより正しく動作する保証はありません。使用するフレームワークが最新のLTSをサポートしていない場合や脆弱性が明らかになりアップデートする必要も出てくるでしょう。  
これらの問題を回避するためにNVMを利用します。NVMはnode version managerの略で複数のNode.jsを複数インストールし、バージョンを切り替えを行う事ができます。

#### NVMからNode.jsのインストールを行う\(Mac編\)

nvm-sh/nvmを利用します。  
[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)  
gitコマンドが必要となりますが、OS X 10.9以降は/usr/bin/gitが廃止されました。Xcodeをインストールすることによりgitも同時にインストールされるためApp StoreからXcodeをインストールしておく必要があります。  
  
terminalからインストールスクリプトを実行します。スクリプトのパスにバージョンが記載されています。最新バージョンはnvm-sh/nvm公式ページより確認してください。2020年2月現在ではv0.35.2となります。

```text
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

スクリプト実行後、nvmコマンドのPATHを設定します。`~/.bash_profile`を作成しexport文を追加します。

```text
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

PATHを有効にするためterminalを再起動してください。

nvmコマンドの確認のため`nvm --version`を実行します。インストールしたバージョンが表示されれば成功です。

nvmを利用し最新版のNode.jsをインストールします。Node.jsのインストールが行えるバージョン一覧はnvmコマンドを利用すると良いでしょう。`nvm ls-remote`を実行します。

```text
$ nvm ls-remote
     ・・・・
       v12.13.0   (LTS: Erbium)
       v12.13.1   (LTS: Erbium)
       v12.14.0   (LTS: Erbium)
       v12.14.1   (LTS: Erbium)
       v12.15.0   (LTS: Erbium)
       v12.16.0   (Latest LTS: Erbium)
        v13.0.0
        v13.0.1
        v13.1.0
        v13.2.0
        v13.3.0
        v13.4.0
        v13.5.0
        v13.6.0
        v13.7.0
        v13.8.0
```

この場合はv12.16.0がLTSの最新版だと言うことがわかると思います。Node.js v12.16.0をインストールする場合は`nvm install バージョン`を実行します。

```text
$ nvm install v12.16.0
```

インストール後、`nvm alias default バージョン`を実行します。これはデフォルトで使用するバージョンを指定するためのコマンドです。今は一つのバージョンのみインストールしているため恩恵は感じられませんが覚えておきましょう。

```text
$ nvm alias default v12.16.0
```

最後に`node -v`でインストール・デフォルト設定したバージョンが表示されることを確認します。

```text
$ node -v
v12.16.0
```

#### NVMからNode.jsのインストールを行う\(Windows編\)

nvm-windowsを利用します  
[https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows) 公式ページのreleaseからnvm-setup.zipをダウンロード・インストールを行うだけです。ダウンロードダイアログが表示されるので文言を読み、インストールを行ってください。

インストール後はPCの再起動を行います。これはPAHTを確実に通すためです。

nvmコマンドの確認のためにコマンドプロンプトまたはPowerShellを起動し`nvm version`を実行します。インストールしたバージョンが表示されれば成功です。

nvmを利用し最新版のNode.jsをインストールします。Node.jsのインストールが行えるバージョン一覧はnvmコマンドを利用すると良いでしょう。`nvm list available`を実行します。

```text
C:\>nvm list available

|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|    13.9.0    |   12.16.1    |   0.12.18    |   0.11.16    |
|    13.8.0    |   12.16.0    |   0.12.17    |   0.11.15    |
|    13.7.0    |   12.15.0    |   0.12.16    |   0.11.14    |
|    13.6.0    |   12.14.1    |   0.12.15    |   0.11.13    |
|    13.5.0    |   12.14.0    |   0.12.14    |   0.11.12    |
|    13.4.0    |   12.13.1    |   0.12.13    |   0.11.11    |
|    13.3.0    |   12.13.0    |   0.12.12    |   0.11.10    |
|    13.2.0    |   10.19.0    |   0.12.11    |    0.11.9    |
|    13.1.0    |   10.18.1    |   0.12.10    |    0.11.8    |
|    13.0.1    |   10.18.0    |    0.12.9    |    0.11.7    |
|    13.0.0    |   10.17.0    |    0.12.8    |    0.11.6    |
|   12.12.0    |   10.16.3    |    0.12.7    |    0.11.5    |
```

この場合はv12.16.0がLTSの最新版だと言うことがわかると思います。Node.js v12.16.0をインストールする場合は`nvm install バージョン`を実行します。

```text
C:\>nvm install 12.16.0
```

インストール後、`nvm use バージョン`を実行します。これはデフォルトで使用するバージョンを指定するためのコマンドです。今は一つのバージョンのみインストールしているため恩恵は感じられませんが覚えておきましょう。

```text
C:\>nvm use 12.16.0
```

最後に`node -v`でインストール・デフォルト設定したバージョンが表示されることを確認します。

```text
C:\>node -v
ｖ12.16.0
```

### エディタは何を使ったらいいか？

シェアで決めつけるのも好きではありませんが、Visual Studio Codeが一番良く使われています。無料であり、インストールすれば拡張機能なしでもコーディングを行うことができます。

TypeScript、Visual Studio Codeも主にMicrosoftが中心に開発されているため相性が良いのかもしれません。

{% hint style="info" %}
🧙♂ **Tips:** Visual Studio Codeは主にTypeScriptで開発されています。またVS Codeと略すことが多いです。
{% endhint %}

対応OSはWindows、Mac、Linuxのいづれにも対応しています。ダウンロードサイトから環境にあったインストーラーをダウンロード・インストールを行ってください。  
[https://code.visualstudio.com/download](https://code.visualstudio.com/download)

### TypeScriptをインストールする

Windowsの場合は`コマンドプロンプト`、または`powershell`。Macの場合は`Terminal`からtypescriptコンパイラをインストールを行います。

```text
npm install -g typescript
```

`tsc`コマンドが実行できるか`tsc -v`コマンドで確認します。

```text
tsc -v
Version 3.7.5
```

表示されるバージョンはインストールした時点でのLTSになるので異なっていて問題ありません。

{% hint style="info" %}
これより下に記載されている事項は執筆完了時に削除願います
{% endhint %}

### メモ

node.jsのインストール方法は複数あるため、実行ファイル直でのインストール方法を記載するか、nvmを利用する場合はOS毎\(Win,Mac\)毎に記載する。\(かもしれない。\)  
  
エディタはVS Codeに終わらせるか、IntelliJも記載するかは不明。

typescriptのグローバルインストールをしないやり方を記載する？ `npm init` →package.jsonを作成→scriptプロパティに`"tsc" : "tsc"` を追加するみたいなことでも

| メインライター | 対応スケジュール |
| :--- | :--- |
| クロレ\(mosapride\) | 2020/02/18 |

