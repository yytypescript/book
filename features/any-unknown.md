# anyとunknown

現在こそTypeScriptはそれなりの地位を得て、多くのnpmで公開されているパッケージは最初からTypeScriptで作られていたり、第三者によって型定義ファイルが提供されることも増えましたが、いまだに型定義ファイルを持たないパッケージもあります。

JavaScriptをTypeScriptの世界に招くにあたり必須となるのはずばり型です。ですが前述のとおりJavaScriptとしてのみ公開されているパッケージには型の定義ファイルがないものもあります。

それらは型定義ファイルが公開されるまで使うことができないかと言うとそうではありません。若干TypeScriptとしての恩恵を捨てることにはなりますが、まったく使えないよりはいいでしょう。

型が不定のとき、TypeScriptでは`any`または`unknown`という型を使います。

```typescript
const whatIsIt: any = superElegantPackage.doesFirst();
const whatIsIt: unknown = superElegantPackage.doesSecond();
```

これらの型の使い方について説明をします。

## `any, unknown`について

`any, unknown`型はどのような値も代入できます。

```typescript
const any1: any = null;
const any2: any = undefined;
const any3: any = true;
const any4: any = 0.8;
const any5: any = 'Comment allez-vous';
const any6: any = {
  x: 0,
  y: 1,
  name: 'origin'
};

const unknown1: unknown = null;
const unknown2: unknown = undefined;
const unknown3: unknown = true;
const unknown4: unknown = 0.8;
const unknown5: unknown = 'Comment allez-vous';
const unknown6: unknown = {
  x: 0,
  y: 1,
  name: 'origin'
};
```

ちなみに逆の概念としてどの値も代入できない`never`という型もありますが、今回は説明を省きます。

`any`型に代入したオブジェクトのプロパティ、メソッドは使用することができます。

```typescript
console.log(any4.toFixed());
// -> 1
console.log(any5.length);
// -> 18
console.log(any6.name);
// -> 'origin'
```

一方、`unknown`型に代入したオブジェクトのプロパティ、メソッドは使用することができません。使用できないどころか、実行することができません。

```typescript
console.log(unknown4.toFixed());
// Object is of type 'unknown'.
console.log(unknown5.length);
// Object is of type 'unknown'.
console.log(unknown6.name);
// Object is of type 'unknown'.
```

これだけ見ると`unknown`型よりも`any`型の方が優れていると思われるかもしれませんがそうではありません。`any`型は言い換えれば**TypeScriptが型のチェックを放棄した型**であり、そのためなんでもできます。`any`型を使うということはTypeScriptでせっかく得た型という利点を手放しているのと同じです。

これでは存在しているエラーはコンパイル時には気が付けず、ソフトウェアをリリースしたあと実際のユーザーが使ったときに実行時エラーとなります。それが不具合報告や、クレームとなり、被害が拡大していきます。

`any`型に関しては、次のような無茶なコードもTypeScriptは一切関与せず、実行してみてプログラムが実行時エラーになる、初めてこのプログラムが不完全であることがわかります。

```typescript
console.log(any6.x.y.z);
// Cannot read property 'z' of undefined
```

`unknown`型は一貫してTypeScriptがプロパティ、メソッドへのアクセスを行わせません。そのため実行することができず、意図しないランタイム時のエラーを防止します。

```typescript
console.log(unknown6.x.y.z);
// Object is of type 'unknown'.
```

TypeScriptのプロジェクトを作る時に必要なtsconfig.jsonにはこの`any`型の使用を防ぐためのオプションとして`noImplicitAny`があります。既存のJavaScriptのプロジェクトをTypeScriptに置き換えていくのではなく、スクラッチの状態からTypeScriptで作るのであればこの設定を入れるとよいでしょう。

tsconfig.jsonにある他の厳格なコーディングのための設定の説明もありますので併せて参照してください。

{% page-ref page="../handson/tsconfig.json-settings.md" %}

## 型アサーションに使う

次のクラスを例に考えます。

```typescript
class Mammal {
}

class Cat extends Mammal {

  public miaow(): void {
    console.log('miaow miaow');
  }
}

class Bird {
}

class Duck extends Bird {

  public quack(): void {
    console.log('quack quack');
  }
}
```

一般的な言語でいうところのキャストはTypeScriptでは型アサーションと言い、`as`という構文を使います。  
TypeScriptではアップキャストは問題なくできます。これは他の言語でも同じだと思います。

```typescript
const duck: Duck = new Duck();
const bird: Bird = duck as Bird;
```

ダウンキャストに関してもTypeScriptはこの型アサーションを使えば問題なくできます。  
型アサーションを使うことによる問題はすべてプログラマが対処する必要があります。

```typescript
const bird: Bird = new Bird();
const duck: Duck = bird as Duck;
duck.quack();
// duck.quack is not a function
```

ところが、まったく関係のないクラスへの型アサーションはできません。

```typescript
const cat: Cat = new Cat();

const duck: Duck = cat as Duck;
// Conversion of type 'Cat' to type 'Duck' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// Property 'quack' is missing in type 'Cat' but required in type 'Duck'.
```

このような時にどうしても無理やり型アサーションをしたい時は一度`any, unknown`型を経由して本来欲しいクラスに型アサーションします。

```typescript
const cat: Cat = new Cat();

const duck1: Duck = cat as any as Duck;
const duck2: Duck = cat as unknown as Duck;
```

ただし、このときに発生しうる問題についてはダウンキャスト同様にプログラマが対処しなければなりません。

