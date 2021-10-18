# 列挙型 \(enum\)

TypeScriptでは、列挙型\(enum\)を用いると、定数のセットに意味を持たせたコード表現ができます。

列挙型を宣言するには、`enum`キーワードの後に列挙型名とメンバーを書きます。次の例では、`Postion`が列挙型名で、`Top`、`Right`、`Bottom`、`Left`がメンバーになります。

```typescript
enum Position {
  Top,
  Right,
  Bottom,
  Left,
}
```

`enum`キーワードはTypeScript独自のものです。なのでJavaScriptにコンパイルすると次のようなコードになります。

```typescript
var Position;
(function (Position) {
    Position[Position["Top"] = 0] = "Top";
    Position[Position["Right"] = 1] = "Right";
    Position[Position["Bottom"] = 2] = "Bottom";
    Position[Position["Left"] = 3] = "Left";
})(Position || (Position = {}));
```

ご覧のとおり、列挙型名と同じ名前のオブジェクトが定義されます。列挙型のメンバーはオブジェクトのプロパティーになります。値は0からの連番になります。

```typescript
console.log(Position.Top); // 0
console.log(Position.Right); // 1
console.log(Position.Bottom); // 2
```

列挙型名は型として扱うことができます。

```typescript
let position: Position;
//            ^^^^^^^^型
```

