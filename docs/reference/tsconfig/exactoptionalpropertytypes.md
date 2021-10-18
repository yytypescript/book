# exactOptionalPropertyTypes

今までオプション修飾子は値を設定しないことに加えて `undefined` を意図的に設定することができました。

```typescript
interface User {
  name: string;
  nationality?: 'India' | 'China';
}

const user1: User = {
  name: 'Srinivasa Aiyangar Ramanujan',
  nationality: 'India'
};

const user2: User = {
  name: 'Sergei Vasilevich Rachmaninov'
  nationality: undefined
};

const user3: User = {
  name: 'Yekaterina II Alekseyevna',
};
```

値が未定義であることと値が `undefined` であることは厳密には動作が異なります。たとえば `Object.keys()` は最たる例で、上記の `user1, user2, user3` にそれぞれ `Object.keys()` を適用すれば結果は次のようになります。

```typescript
// user1
[ 'name', 'nationality' ]
// user2
[ 'name', 'nationality' ]
// user3
[ 'name' ]
```

この差異が意図しない実行時エラーを生むことがあります。意図する値が設定されていれば\(この場合 `'India' | 'China'` \) `nationality` は `Object.keys()` に含まれるべきですが `undefined` のときは結局その先で値の存在チェックが必要になります。

このオプションを有効にすると `interface, type` でオプション修飾子を持つキーはその値がキー自体を持たないようにしなければなりません。先ほどの例では `undefined` を代入した `user2` で次のようなエラーが発生します。

```typescript
TS2322: Type 'undefined' is not assignable to type '"India" | "China"'.

nationality: undefined
~~~~~~~~~~~
```

どうしてもキーに `undefined` も指定したい場合はオプション修飾子に加えて `undefined` のユニオン型を付加してください。

