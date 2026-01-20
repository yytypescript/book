# メソッド戻り値のthis型とメソッドチェーン

## this型とは

TypeScriptではメソッドの戻り値の型として`this`を指定できます。`this`型は「このクラス自身の型」を表す特殊な型です。

```ts twoslash
class Parent {
  returnParent(): Parent {
    return this;
  }

  returnThis(): this {
    return this;
  }
}

const p = new Parent();
const a = p.returnParent();
//    ^?
const b = p.returnThis();
//    ^?
```

`Parent`インスタンスから呼び出すと、どちらも戻り値の型は`Parent`です。一見すると、クラス名を直接書くのと同じように思えます。

しかし、継承関係において重要な違いがあります。`Parent`を継承した`Child`クラスを作り、`Child`のインスタンスからメソッドを呼び出してみましょう。

```ts twoslash
class Parent {
  returnParent(): Parent {
    return this;
  }

  returnThis(): this {
    return this;
  }
}
// ---cut---
class Child extends Parent {}

const child = new Child();
const a = child.returnParent();
//    ^?
const b = child.returnThis();
//    ^?
```

`returnParent`は戻り値の型を`Parent`と明示しています。そのため、`Child`インスタンスから呼び出しても、戻り値の型は`Parent`のままです。

一方、`returnThis`は戻り値の型を`this`としています。`Child`インスタンスから呼び出すと、戻り値の型は`Child`になります。

このように、`this`型は呼び出し元のクラスに応じて変化する型です。

## this型が必要になるとき

この違いが問題になるのは、サブクラスで親クラスのメソッドを呼び出した後、サブクラス固有のメソッドを続けて呼びたいときです。

```ts twoslash
// @errors: 2339
class Parent {
  foo(): Parent {
    return this;
  }
}

class Child extends Parent {
  bar(): Child {
    return this;
  }
}

const child = new Child();
child.bar().foo(); // OK: Child -> Parent
child.foo().bar(); // Error!
```

`child.foo()`の戻り値は`Parent`型なので、`Child`にしかない`bar`メソッドが呼び出せません。

戻り値の型を`this`に変更すると、この問題が解消されます。

```ts twoslash
class Parent {
  foo(): this {
    return this;
  }
}

class Child extends Parent {
  bar(): this {
    return this;
  }
}

const child = new Child();
child.bar().foo(); // OK
child.foo().bar(); // OK
```

`child.foo()`の戻り値が`Child`型になるため、続けて`bar`を呼び出せます。

なお、`this`型は型チェックを回避しているわけではありません。むしろ、継承関係においてより正確な型情報を提供しています。戻り値をクラス名で固定すると、サブクラスで呼び出しても常に親クラスの型として扱われてしまいます。`this`型を使うことで、実際のクラスに応じた適切な型が推論されます。

## 応用例: fluent interface

`this`型の実用的な応用例として、fluent interfaceがあります。fluent interfaceとは「流れるようなインターフェース」という意味で、メソッドチェーンを使って可読性の高いコードを実現するメソッドの作り方のことです。よくドメイン固有言語(DSL)を提供するようなクラスを作るときに使われます。

商品検索のクエリを組み立てるクラスを考えます。

```ts twoslash
class ProductQuery {
  protected params = new URLSearchParams();

  category(name: string): void {
    this.params.set("category", name);
  }

  maxPrice(price: number): void {
    this.params.set("maxPrice", String(price));
  }

  minReview(rating: number): void {
    this.params.set("minReview", String(rating));
  }

  toString(): string {
    return this.params.toString();
  }
}

const query = new ProductQuery();
query.category("Pizza");
query.maxPrice(2000);
query.minReview(4);
console.log(query.toString());
// @log: "category=Pizza&maxPrice=2000&minReview=4"
```

メソッドごとにステートメントを分ける必要があります。メソッドチェーンを使って処理を連続させるには、各メソッドが`this`を返すようにします。

```ts twoslash
class ProductQuery {
  protected params = new URLSearchParams();

  category(name: string): this {
    this.params.set("category", name);
    return this;
  }

  maxPrice(price: number): this {
    this.params.set("maxPrice", String(price));
    return this;
  }

  minReview(rating: number): this {
    this.params.set("minReview", String(rating));
    return this;
  }

  toString(): string {
    return this.params.toString();
  }
}

const query = new ProductQuery()
  .category("Pizza")
  .maxPrice(2000)
  .minReview(4)
  .toString();
console.log(query);
// @log: "category=Pizza&maxPrice=2000&minReview=4"
```

戻り値の型を`this`にすることで、メソッドチェーンが可能になりました。

ここで、この`ProductQuery`を拡張して、スマートフォン検索専用のクエリクラスを作りたいとします。`this`型を使っているおかげで、サブクラスでもメソッドチェーンが正しく動作します。

```ts twoslash
class ProductQuery {
  protected params = new URLSearchParams();

  category(name: string): this {
    this.params.set("category", name);
    return this;
  }

  maxPrice(price: number): this {
    this.params.set("maxPrice", String(price));
    return this;
  }

  minReview(rating: number): this {
    this.params.set("minReview", String(rating));
    return this;
  }

  toString(): string {
    return this.params.toString();
  }
}

class SmartphoneQuery extends ProductQuery {
  os(name: string): this {
    this.params.set("os", name);
    return this;
  }

  maker(name: string): this {
    this.params.set("maker", name);
    return this;
  }
}

const query = new SmartphoneQuery()
  .maxPrice(100000)
  .minReview(4)
  .os("Android")
  .maker("Google")
  .toString();
console.log(query);
// @log: "os=Android&maker=Google&maxPrice=100000&minReview=4"
```

もし戻り値の型を`ProductQuery`と明示していた場合、`maxPrice`メソッドの戻り値は`ProductQuery`型になり、`SmartphoneQuery`にしかない`os`や`maker`メソッドが呼び出せなくなります。`this`型を使うことで、継承階層でもメソッドチェーンを安全に実現できます。
