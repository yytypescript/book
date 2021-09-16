# インターフェースを実装する

他の言語と同じようにインターフェースをクラスが実装することもできます。実装時に複数のインターフェースを指定することもできます。そのときは`,`でインターフェースを区切り列挙します。このとき同じ名前のプロパティが違う型で衝突すると、その型は`never`型になります。`never`型の変数には値の代入ができません。

```typescript
interface Measurements {
  bust: number;
  waist: number;
  hip: number;
}

interface SensitiveSizes {
  bust: 'secret';
  waist: 'secret';
  hip: 'secret';
}

class Adorescent implements Measurements, SensitiveSizes {
  // bust: never;
  // waist: never;
  // hip: never;
}
```

## 

