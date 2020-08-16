# ユーティリティ型 \(Utility types\)

TypeScriptで開発するということはJavaScriptに型を付与することです。型を付与する時にあらかじめ用意されている便利な型の表現がいくつかありますのでそちらを紹介します。今回紹介するものは全てではないので、他も興味がある方は公式やソースコードを参照してください。

これから紹介するユーティリティ型は全てTypeScriptのパッケージで定義されており、ソースコードも同梱されているのでその実装方法を見ることが可能です。

なお、以下でことわりなく`Person, User`というオブジェクトについて言及した時は以下のようなタイプエイリアスとそのオブジェクトを使うものとします。

```typescript
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};

type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
```

## `Required<T>`

全てのプロパティから`Optional`であることを意味する`?`を取り除きます。

`Required<Person>`は以下と同じ型になります。

```typescript
type RequiredPerson = {
  surname: string;
  middleName: string;
  givenName: string;
};
```

## `Readonly<T>`

オブジェクトのプロパティに対する代入を防ぐ`readonly`を全てのプロパティに対して適用します。プロパティがオブジェクトだった場合、それが持つプロパティまでは`readonly`にしないことに注意してください。これは普通の`readonly`と同じ挙動です。

`Readonly<Person>`は以下と同じ型になります。

```typescript
type ReadonlyPerson = {
  readonly surname: string;
  readonly middleName?: string;
  readonly givenName: string;
};
```

## `Partial<T>`

全てのプロパティに`Optional`であることを意味する`?`を適用します。

`Partial<Person>`は以下と同じ型になります。

```typescript
type PartialPerson = {
  surname?: string;
  middleName?: string;
  givenName?: string;
};
```

## `Record<K, T>`

`Index signatures`と似たような効果を持ちます。`K`はオブジェクトのキーを意味し、`string, number, symbol`型またはそれらのユニオン型を指定できます。`T`はオブジェクトのプロパティを意味します。`Index signatures`と異なり`K`に`symbol`型も適用できることに注意してください。

`Index signatures`についてはタイプエイリアスの頁を参照ください。

{% page-ref page="type-alias.md" %}

`Person`を`Record`を使って表現すると以下になりますが`Record`はプロパティを`Optinal`にする機能はないため`Person`とは完全に一致せず、上記の`Required<Person>`と同じものになります。

```typescript
type Name = 'surname' | 'middleName' | 'givenName';
type Person = Record<Name, string>;
```

## `Pick<T, K>`

ある巨大なタイプエイリアスから、必要な部分だけを抽出します。`K`はタイプエイリアス`T`のキーの部分集合である必要があります。

以下は`Pick`を使って`User`から`Person`を作る一例です。

```typescript
type Necessary = 'surname' | 'middleName' | 'givenName';
type Person = Pick<User, Necessary>;
```

### キーの部分集合である。について

部分集合と聞くと難しいかもしれませんが、言い換えると**キーでに存在しないリテラルタイプを指定できない**ことを意味しています。上記例は`User`の`middleName, givenName`の`Name`は大文字から始まりますが、これを小文字にしたタイプエイリアスを定義するとこれは`Pick`では使用できません。

```typescript
type Necessary = 'surname' | 'middlename' | 'givenname';
type Person = Pick<User, Necessary>;
// -> Type '"middlename"' is not assignable to type '"surname" | "middleName" | "givenName" | "age" | "address" | "nationality" | "createdAt" | "updatedAt"'.
```

## `Omit<T, K>`

`Pick`と逆の動作です。つまり不必要な部分を取り除きます。`K`はタイプエイリアス`T`のキーの部分集合である**必要はありません**。タイポなどに対する検査が`Pick`と比べて貧弱なので注意してください。

以下は`Omit`を使って`User`から`Person`を作る一例です。

```typescript
type Unnecessary = 'age' | 'address' | 'nationality' | 'createdAt' | 'updatedAt';
type Person = Omit<User, Unnecessary>;
```

### キーの部分集合である必要がない。について

`Pick`と逆です。`User`の`createdAt, updatedAt`の`At`は大文字から始まりますが、これに気づかずに小文字で書いてしまってもこのことに対する指摘はなく`Omit`の結果は`createdAt, updatedAt`を含んでしまいます。

```typescript
type Unnecessary = 'age' | 'address' | 'nationality' | 'createdat' | 'updatedat';
type Person = Omit<User, Unnecessary>;
// -> 
// {
//    surname: string,
//    middleName?: string,
//    givenName: string,
//    createdAt: string,
//    updatedAt: string
// }
```

## `Exclude<T, U>`

ユニオン型`T`から`U`を取り除きます。

```typescript
type Grade = 'A' | 'B' | 'C' | 'D' | 'E';
type PassingGrade = Exclude<Grade, 'E'>;
```

この例は成績についてです。落第を示す成績が`'E'`でそれ以外は及第だとすればこのようにして及第を示すタイプエイリアス`PassingGrade`を作ることができます。

### `Exclude`の注意点

`U`は`T`の部分集合である制限がありません。つまり`Omit`と同様、タイポなどに気をつけなければいけません。

以下は`Pull Request`に関するタイプエイリアスと解釈してください。

```typescript
type PullRequestState = 'drft' | 'reviewed' | 'rejected';
type MergeableState = Exclude<PullRequestState, 'drft' | 'rejected'>;
```

`MergeableState`は`'reviewed'`を意味しますが安易に`Exclude`を使うと2点の問題があります。

#### `PullRequestState`に新しい状態が追加された時

`PullRequestState`に`'testFailed'`という`MergeableState`に含めたくない状態を追加したとします。するとこの修正に伴って`MergeableState`の`U`\(第2ジェネリクス\)も同時に修正しないといけません。これを忘れると`'testFailed'`は`MergeableState`に含まれてしまいます。

```typescript
type PullRequestState = 'drft' | 'reviewed' | 'rejected' | 'testFailed';
type MergeableState = Exclude<PullRequestState, 'drft' | 'rejected'>;
// -> 'reviewed' | 'testFailed'
```

#### タイポ

`PullRequestState`の`'drft'`は誤字だったので`'draft'`に修正しました。これも同様に`MergeableState`の第2ジェネリクスの修正を忘れると`MergeableState`に`'draft'`が含まれてしまいます。

```typescript
type PullRequestState = 'draft' | 'reviewed' | 'rejected';
type MergeableState = Exclude<PullRequestState, 'drft' | 'rejected'>;
// -> 'draft' | 'reviewed'
```

#### ユニオン型ではない型を指定する

また`Exclude`の第1ジェネリクスにユニオン型ではない型を指定しても意味がありません。

```typescript
type InputText = Exclude<string, ''>;
// -> string
```

入力した文字を表す型として`InputText`を定義したとしても、この`InputText`は`''`以外の全ての`string`とは解釈されず、ただの`string`型になります。

## `Extract<T, U>`

`Exclude`と逆です。ユニオン型`T`から`U`を抽出します。

```typescript
type Grade = 'A' | 'B' | 'C' | 'D' | 'E';
type FailingGrade = Extract<Grade, 'E'>;
```

落第を表す成績が`'E'`ならこのようにして落第を表すタイプエイリアス`FailingGrade`を作ることができます。

### `Extract`の注意点

`Eclude`と同様`U`については`T`の部分集合である制限がありません。タイポに気をつける必要があります。

#### タイポ

```typescript
type PullRequestState = 'draft' | 'reviewed' | 'rejected';
type MergeableState = Extract<PullRequestState, 'reviewd'>;
```

`MergeableState`の第2ジェネリクスはタイポです。これに気づかないと`MergeableState`は`never`という型になり、いかなる値も代入できません。

#### ユニオン型ではない型を指定する

`Extract`の第1ジェネリクスにユニオン型ではない型を指定すると`never`になります。

```typescript
type Zero = Extract<number, 0>;
// -> never
```

`0`を表す型として`Zero`を定義したとしても、これはただの`never`型になります。

