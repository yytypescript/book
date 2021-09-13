# 型アサーション「as」

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

