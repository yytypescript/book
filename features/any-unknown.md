# anyとunknown

現在こそTypeScriptはそれなりの地位を得て、多くのnpmで公開されているパッケージはそもそもTypeScriptで作られていたり、第三者によって型定義ファイルが提供されることも増えましたが、いまだに型定義ファイルを持たないパッケージもあります。

JavaScriptをTypeScriptの世界に招くにあたり必要なのは型です。ですが前述の通りJavaScriptとしてのみ公開されているパッケージには当然型の定義ファイルがないものもあります。それらは型定義ファイルが公開されるまで使うことができないかと言うとそうではありません。若干TypeScriptとしての恩恵を捨てることにはなりますが、全く使えないよりはいいでしょう。

型が不定の時、TypeScriptでは`any`または`unknown`という型を使います。

```typescript
const whatIsIt: any = superElegantPackage.doesFirst();
const whatIsIt: unknown = superElegantPackage.doesSecond();
```

これらの型の使い方について説明をします。

## `any, unknown`について

`any`型、`unknown`型はどのような値も代入できます。

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
// 1
console.log(any5.length);
// 18
console.log(any6.name);
// origin
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

これだけ見ると`unknown`型よりも`any`型の方が優れていると思われるかもしれませんが、そうではありません。`any`型は言い換えればTypeScriptが型のチェックを放棄した型であり、そのためなんでもできます。つまりそこだけJavaScriptに戻っているのと変わりません。

`any`型に関しては、以下のような無茶なコードもTypeScriptは一切関与せず、実行して落ちて初めてこのプログラムが不完全であることがわかります。

```typescript
console.log(any6.x.y.z);
// -> Cannot read property 'z' of undefined
```

`unknown`型は一貫してTypeScriptがプロパティ、メソッドへのアクセスを行わせません。そのため実行することができず、意図しないランタイム時のエラーを防止します。

```typescript
console.log(unknown6.x.y.z);
// -> Object is of type 'unknown'.
```

TypeScriptのプロジェクトを作る時に必要な`tsconfig.json`という設定ファイルにはこの`any`型の使用を防ぐためのオプションとして`noImplicitAny`があります。既存のJavaScriptのプロジェクトをTypeScriptに置き換えていくのではなく、スクラッチの状態からTypeScriptで作るのであればこの設定を入れると良いでしょう。

`tsconfig.json`にある他の厳格なコーディングのための設定の説明もありますので併せて参照してください。

{% page-ref page="../handson/setting-tsconfig.json.md" %}

## `Type assertion`に使う

以下のクラスを例に考えます。

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

一般的な言語でいうところのキャストはTypeScriptでは`Type assertion`と言い、`as`という構文を使います。  
TypeScriptではアップキャストは問題なくできます。これは他の言語でも同じだと思います。

```typescript
const duck: Duck = new Duck();
const bird: Bird = duck as Bird;
```

ダウンキャストに関してもTypeScriptはこの`Type assertion`を使えば問題なくできます。  
`Type assertion`を使うことによる問題は全てエンジニアで対処する必要があります。

```typescript
const bird: Bird = new Bird();
const duck: Duck = bird as Duck;
duck.quack();
// -> duck.quack is not a function
```

ところが、全く関係のないクラスへの`Type assertion`はできません。

```typescript
const cat: Cat = new Cat();

const duck: Duck = cat as Duck;
// -> Conversion of type 'Cat' to type 'Duck' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// -> Property 'quack' is missing in type 'Cat' but required in type 'Duck'.
```

このようなときにどうしても無理やり`Type assertion`をしたい時に`any, unknow`を使うことができます。

### 一度`any, unknown`にキャストする

このような時は一度`any, unknown`に`Type assertion`した後に本来`Type assertion`したいクラスに`Type assertion`します。

```typescript
const cat: Cat = new Cat();

const duck1: Duck = cat as any as Duck;
const duck2: Duck = cat as unknown as Duck;
```

ただし、この時に発生しうる問題についてはダウンキャスト同様、エンジニアで対処しなければなりません。

