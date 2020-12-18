# 列挙型 \(Enum\)

Enumは変数に値を自動的に割り当てる型になります。TypeScriptでは数字と文字ベースの列挙が存在します。

### Enum宣言と利用

`interface`や`class`と同様に`enum`の後に列挙型名を指定しメンバを宣言します。

```typescript
enum DayOfTheWeek {
  SUN,
  MON,
  THE,
  WED,
  THU,
  FRI,
  SAT
}
```

一番初めに宣言されたメンバに初期値が無い場合は0からインクリメントされた値が自動的に設定設定されます。

使用するには`列挙型名.メンバ`と記述します。

```typescript
console.log(DayOfTheWeek.SUN); // 0
console.log(DayOfTheWeek.MON); // 1
console.log(DayOfTheWeek.THE); // 2
```

クラスやインターフェースと同様に型として扱うことができます。

```typescript
function dayOff(today: DayOfTheWeek) {
  if (today === DayOfTheWeek.SUN || today === DayOfTheWeek.SAT) {
    console.log('Happy Day!!');
  } else {
    console.log('Today is work.');
  }
}

dayOff(DayOfTheWeek.SUN);
// -> 'Happy Day!!'
dayOff(DayOfTheWeek.MON);
// -> 'Today is work.'
```

### 数値列挙

```typescript
enum DayOfTheWeek {
  SUN,       // 0
  MON,       // 1
  THE,       // 2
  WED,       // 3
  THU,       // 4
  FRI,       // 5
  SAT        // 6
}
```

先頭のメンバに初期値を宣言することもできます。

```typescript
enum DayOfTheWeek {
  SUN = 1,  // 1
  MON,      // 2
  THE,      // 3
  WED,      // 3
  THU,      // 4
  FRI,      // 5
  SAT       // 6
}
```

すべてのメンバに値を代入することもできます。その場合は値が重複しないようにしましょう。

VS Codeでは仮想キーコードを列挙型で宣言しています。

[https://github.com/microsoft/vscode/blob/master/src/vs/base/common/keyCodes.ts](https://github.com/microsoft/vscode/blob/master/src/vs/base/common/keyCodes.ts)

```typescript
export const enum KeyCode {
  Unknown = 0,

  Backspace = 1,
  Tab = 2,
  Enter = 3,
  Shift = 4,
  Ctrl = 5,
  Alt = 6,
  PauseBreak = 7,
  // ---- 略
  KEY_A = 31,
  KEY_B = 32,
  KEY_C = 33,
  KEY_D = 34,
  KEY_E = 35,
  KEY_F = 36,
  // ---- 略
  MAX_VALUE
}
```

### 文字列列挙

数値の代わりに文字列を初期値として代入することができます。文字列列挙型では各メンバに文字列リテラルを宣言する必要があります。

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

### Enumのアンチパターン

YYTypeScriptメンバ内で話し合った結果、Enumとして機能はあるが使用を勧めしないアンチパターンを紹介します。興味がない方は飛ばしてください。

#### 中間メンバに値を代入する

先頭のメンバ以外にも初期値を代入することもできますが列挙型のメリットを潰すことになりますし、代入した値によっては重複が発生します。

Enumはメンバ郡の値の一意性を保証する訳ではないことに注意をしてください。

```typescript
enum DayOfTheWeek {
  SUN = 10,  // 10
  MON,       // 11
  THE,       // 12
  WED = 11   // 11
  THU,       // 12
  FRI,       // 13
  SAT        // 14
}
```

#### 重複した値を代入する

重複する値を代入する場合は列挙型のメリットを潰してしまいます。

```typescript
enum DayOfTheWeek {
  SUN = 10,  // 10
  MON = 9,   //  9
  THE = 8,   //  8
  WED = 8,   //  8
  THU = 9,   //  9
  FRI = 10,  // 10
  SAT = 11   // 11
}
```

#### 数値と文字列の混合

この機能をどのような場面で有効活用できるかわかる人がいるならば教えてください。

```typescript
enum DayOfTheWeek {
  SUN = 'Happy holidays!',  // Happy holidays!
  MON = 1,                  // 1
  THE,                      // 2
  WED,                      // 3
  THU,                      // 4
  FRI = 'TGIF',             // TGIF
  SAT = 10                  // 10
}
```

