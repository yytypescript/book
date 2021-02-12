# 用語

TypeScriptについて調べていると、さまざまな用語が登場します。事前にその用語の意味を知っていないと全体の説明が理解できないことも少なくありません。

そのため、TypeScriptでよく使われる用語を知っておくことは、今後TypeScriptを学んでいく上でも非常に重要です。

ここでは、そんなTypeScriptを学ぶ上でしておいた方が良い用語をまとめています。

### ユニオン型

`'a' | 'b'` とか型を or で表現した型

### リテラル型

### インデックスシグネチャ

`[x: string]: number` とか

### Mapped types

型を動的に生成する機能

### Type Guard

型ガード、タイプガードと呼んだりする。  
型で条件判定することで、型を限定することができる。

nullable な値に対してのnullチェックとか 

```typescript
type User = {
    name: string;
    age?: number;
}

const taro = {
    name: 'タロウ',
    age: 17,
}

function isAdult(user: User): boolean {
    // undefinedの可能性があるのでコンパイルに失敗する
    return user.age >= 20;
}

function isAdult(user: User): boolean {
    if (user.age != null) {
        // タイプガードによりここの中では undefined でないことが保証される
        return user.age >= 20;
    } else {
        return false;
    }
}
```



