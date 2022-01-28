import { SyntaxKind } from "typescript";

export type TopicDetail = {
  readonly topic: string;
  readonly name: string;
  readonly links: ReadonlyArray<{
    readonly name?: string;
    readonly url: string;
  }>;
};

export const getTopicDetails = (
  topics: ReadonlySet<string | SyntaxKind>
): ReadonlyArray<TopicDetail> => {
  return Array.from(topics).map(getTopicDetail);
};

export const getTopicDetail = (topic: string | SyntaxKind): TopicDetail => {
  const topicDetail = allTopicDetails.get(topic.toString());
  if (typeof topic === "number") {
    const kind = SyntaxKind[topic];
    if (kind) {
      topic = kind;
    } else {
      topic = "Unknown";
    }
  }
  if (topicDetail) {
    return { topic, ...topicDetail };
  }
  return { topic, name: toWords(topic), links: [] };
};

const toWords = (camelCaseText: string): string =>
  camelCaseText
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLocaleLowerCase();

const defineCustomTopicDetails = <T extends string>(topicDetails: {
  readonly [K in T]: Omit<TopicDetail, "topic">;
}) => topicDetails;

const page = (
  title: string,
  path: `https://typescriptbook.jp${string}`
): TopicDetail["links"][number] => ({
  name: `${title} | TypeScript入門『サバイバルTypeScript』`,
  url: path,
});

const syntaxKindTopicDetails: {
  readonly [K in SyntaxKind]?: Omit<TopicDetail, "topic">;
} = {
  //         Unknown = 0,
  //         EndOfFileToken = 1,
  //         SingleLineCommentTrivia = 2,
  //         MultiLineCommentTrivia = 3,
  //         NewLineTrivia = 4,
  //         WhitespaceTrivia = 5,
  //         ShebangTrivia = 6,
  //         ConflictMarkerTrivia = 7,
  [SyntaxKind.NumericLiteral]: {
    name: "数値リテラル",
    links: [
      page(
        "数値型 (number type)",
        "https://typescriptbook.jp/reference/values-types-variables/number"
      ),
      {
        name: "Number - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number",
      },
    ],
  },
  [SyntaxKind.BigIntLiteral]: {
    name: "bigintリテラル",
    links: [
      page(
        "bigint型",
        "https://typescriptbook.jp/reference/values-types-variables/bigint"
      ),
      {
        name: "BigInt - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
      },
    ],
  },
  [SyntaxKind.StringLiteral]: {
    name: "文字列リテラル",
    links: [
      page(
        "文字列型 (string type)",
        "https://typescriptbook.jp/reference/values-types-variables/string"
      ),
      {
        name: "String - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String",
      },
    ],
  },
  [SyntaxKind.JsxText]: {
    name: "JSXのテキスト",
    links: [
      {
        name: "JSX の導入 – React",
        url: "https://ja.reactjs.org/docs/introducing-jsx.html",
      },
      {
        name: "JSX を深く理解する – React",
        url: "https://ja.reactjs.org/docs/jsx-in-depth.html#string-literals-1",
      },
    ],
  },
  //         JsxTextAllWhiteSpaces = 12,
  [SyntaxKind.RegularExpressionLiteral]: {
    name: "正規表現リテラル",
    links: [
      {
        name: "正規表現 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions",
      },
    ],
  },
  [SyntaxKind.NoSubstitutionTemplateLiteral]: {
    name: "テンプレートリテラル",
    links: [
      page(
        "文字列型 (string type)",
        "https://typescriptbook.jp/reference/values-types-variables/string#%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB"
      ),
    ],
  },
  //         TemplateHead = 15,
  //         TemplateMiddle = 16,
  //         TemplateTail = 17,
  //         OpenBraceToken = 18,
  //         CloseBraceToken = 19,
  //         OpenParenToken = 20,
  //         CloseParenToken = 21,
  //         OpenBracketToken = 22,
  //         CloseBracketToken = 23,
  //         DotToken = 24,
  [SyntaxKind.DotDotDotToken]: {
    name: "残余の代入",
    links: [
      page(
        "残余引数/可変長引数 (rest parameter)",
        "https://typescriptbook.jp/reference/functions/rest-parameters"
      ),
      page(
        "配列の分割代入 (destructuring assignment)",
        "https://typescriptbook.jp/reference/values-types-variables/array/destructuring-assignment-from-array#%E6%AE%8B%E4%BD%99%E9%83%A8%E5%88%86%E3%81%AE%E4%BB%A3%E5%85%A5"
      ),
      page(
        "オブジェクトの分割代入 (destructuring assignment)",
        "https://typescriptbook.jp/reference/values-types-variables/object/destructuring-assignment-from-objects"
      ),
    ],
  },
  //         SemicolonToken = 26,
  //         CommaToken = 27,
  [SyntaxKind.QuestionDotToken]: {
    name: "オプショナルチェーン",
    links: [
      page(
        "オプショナルチェーン (optional chaining)",
        "https://typescriptbook.jp/reference/values-types-variables/object/optional-chaining"
      ),
    ],
  },
  [SyntaxKind.LessThanToken]: {
    name: "小なり演算子",
    links: [
      {
        name: "小なり (<) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Less_than",
      },
    ],
  },
  //         LessThanSlashToken = 30,
  [SyntaxKind.GreaterThanToken]: {
    name: "大なり演算子",
    links: [
      {
        name: "大なり (>) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Greater_than",
      },
    ],
  },
  [SyntaxKind.LessThanEqualsToken]: {
    name: "小なりイコール演算子",
    links: [
      {
        name: "小なりイコール (<=) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal",
      },
    ],
  },
  [SyntaxKind.GreaterThanEqualsToken]: {
    name: "大なりイコール演算子",
    links: [
      {
        name: "大なりイコール (>=) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal",
      },
    ],
  },
  [SyntaxKind.EqualsEqualsToken]: {
    name: "等価演算子",
    links: [
      {
        name: "等価 (==) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Equality",
      },
    ],
  },
  [SyntaxKind.EqualsEqualsEqualsToken]: {
    name: "厳密等価演算子",
    links: [
      {
        name: "厳密等価 (===) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_equality",
      },
    ],
  },
  [SyntaxKind.ExclamationEqualsToken]: {
    name: "不等価演算子",
    links: [
      {
        name: "不等価 (!=) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Inequality",
      },
    ],
  },
  [SyntaxKind.ExclamationEqualsEqualsToken]: {
    name: "厳密不等価演算子",
    links: [
      {
        name: "厳密不等価 (!==) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_inequality",
      },
    ],
  },
  //         EqualsGreaterThanToken = 38,
  [SyntaxKind.PlusToken]: {
    name: "加算演算子または文字列結合演算子",
    links: [
      {
        name: "加算 (+) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Addition",
      },
      {
        name: "式と演算子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Expressions_and_Operators#string_operators",
      },
    ],
  },
  [SyntaxKind.MinusToken]: {
    name: "減算演算子",
    links: [
      {
        name: "減算 (-) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Subtraction",
      },
    ],
  },
  [SyntaxKind.AsteriskToken]: {
    name: "アスタリスク",
    links: [],
  },
  [SyntaxKind.AsteriskAsteriskToken]: {
    name: "べき乗演算子",
    links: [
      {
        name: "べき乗 (**) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Exponentiation",
      },
    ],
  },
  [SyntaxKind.SlashToken]: {
    name: "除算演算子",
    links: [
      {
        name: "除算 (/) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Division",
      },
    ],
  },
  [SyntaxKind.PercentToken]: {
    name: "剰余演算子",
    links: [
      {
        name: "剰余 (%) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Remainder",
      },
    ],
  },
  [SyntaxKind.PlusPlusToken]: {
    name: "インクリメント",
    links: [
      {
        name: "インクリメント (++) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Increment",
      },
    ],
  },
  [SyntaxKind.MinusMinusToken]: {
    name: "デクリメント",
    links: [
      {
        name: "デクリメント (--) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Decrement",
      },
    ],
  },
  [SyntaxKind.LessThanLessThanToken]: {
    name: "ビット左シフト演算子",
    links: [
      {
        name: "左シフト (<<) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Left_shift",
      },
    ],
  },
  [SyntaxKind.GreaterThanGreaterThanToken]: {
    name: "ビット右シフト演算子",
    links: [
      {
        name: "右シフト (>>) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Right_shift",
      },
    ],
  },
  [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: {
    name: "符号なし右シフト演算子",
    links: [
      {
        name: "符号なし右シフト (>>>) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift",
      },
    ],
  },
  [SyntaxKind.AmpersandToken]: {
    name: "ビット論理積",
    links: [
      {
        name: "ビット論理積 (&) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_AND",
      },
    ],
  },
  [SyntaxKind.BarToken]: {
    name: "ビット論理和",
    links: [
      {
        name: "ビット論理和 (|) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_OR",
      },
    ],
  },
  [SyntaxKind.CaretToken]: {
    name: "ビット排他的論理和",
    links: [
      {
        name: "ビット排他的論理和 (^) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR",
      },
    ],
  },
  [SyntaxKind.ExclamationToken]: {
    name: "論理否定演算子",
    links: [
      {
        name: "論理否定 (!) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
      },
    ],
  },
  [SyntaxKind.TildeToken]: {
    name: "ビット否定演算子",
    links: [
      {
        name: "ビット否定 (~) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT",
      },
    ],
  },
  [SyntaxKind.AmpersandAmpersandToken]: {
    name: "論理積",
    links: [
      {
        name: "論理積 (&&) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND",
      },
    ],
  },
  [SyntaxKind.BarBarToken]: {
    name: "論理和",
    links: [
      {
        name: "論理和 (||) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_OR",
      },
    ],
  },
  [SyntaxKind.QuestionToken]: {
    name: "オプション型",
    links: [
      page(
        "オプション引数 (optional parameter)",
        "https://typescriptbook.jp/reference/functions/optional-parameters"
      ),
      page(
        "オブジェクト型のオプションプロパティ (optional property)",
        "https://typescriptbook.jp/reference/values-types-variables/object/optional-property"
      ),
    ],
  },
  //         ColonToken = 58,
  //         AtToken = 59,
  [SyntaxKind.QuestionQuestionToken]: {
    name: "Null合体演算子",
    links: [
      {
        name: "Null 合体 (??) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator",
      },
    ],
  },
  //         /** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
  //         BacktickToken = 61,
  //         /** Only the JSDoc scanner produces HashToken. The normal scanner produces PrivateIdentifier. */
  //         HashToken = 62,
  [SyntaxKind.EqualsToken]: {
    name: "代入",
    links: [],
  },
  [SyntaxKind.PlusEqualsToken]: {
    name: "加算代入また文字列結合代入",
    links: [],
  },
  [SyntaxKind.MinusEqualsToken]: {
    name: "減算代入",
    links: [],
  },
  [SyntaxKind.AsteriskEqualsToken]: {
    name: "乗算代入",
    links: [],
  },
  [SyntaxKind.AsteriskAsteriskEqualsToken]: {
    name: "べき乗代入",
    links: [],
  },
  [SyntaxKind.SlashEqualsToken]: {
    name: "除算代入",
    links: [],
  },
  [SyntaxKind.PercentEqualsToken]: {
    name: "剰余代入",
    links: [],
  },
  [SyntaxKind.LessThanLessThanEqualsToken]: {
    name: "左シフト代入",
    links: [],
  },
  [SyntaxKind.GreaterThanGreaterThanEqualsToken]: {
    name: "右シフト代入",
    links: [],
  },
  [SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken]: {
    name: "符号なし右シフト代入",
    links: [],
  },
  [SyntaxKind.AmpersandEqualsToken]: {
    name: "ビット論理積代入",
    links: [],
  },
  [SyntaxKind.BarEqualsToken]: {
    name: "ビット論理和代入",
    links: [],
  },
  [SyntaxKind.BarBarEqualsToken]: {
    name: "論理和代入",
    links: [],
  },
  [SyntaxKind.AmpersandAmpersandEqualsToken]: {
    name: "論理積代入",
    links: [],
  },
  [SyntaxKind.QuestionQuestionEqualsToken]: {
    name: "Null合体代入",
    links: [],
  },
  [SyntaxKind.CaretEqualsToken]: {
    name: "ビット排他的論理和代入",
    links: [],
  },
  [SyntaxKind.Identifier]: {
    name: "識別子",
    links: [],
  },
  [SyntaxKind.PrivateIdentifier]: {
    name: "プライベートプロパティ",
    links: [
      {
        name: "プライベートクラス機能 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields",
      },
    ],
  },
  //         BreakKeyword = 81,
  //         CaseKeyword = 82,
  //         CatchKeyword = 83,
  //         ClassKeyword = 84,
  [SyntaxKind.ConstKeyword]: {
    name: "const",
    links: [
      page(
        "変数宣言: letとconst",
        "https://typescriptbook.jp/reference/values-types-variables/let-and-const"
      ),
    ],
  },
  //         ContinueKeyword = 86,
  //         DebuggerKeyword = 87,
  //         DefaultKeyword = 88,
  //         DeleteKeyword = 89,
  //         DoKeyword = 90,
  //         ElseKeyword = 91,
  //         EnumKeyword = 92,
  //         ExportKeyword = 93,
  //         ExtendsKeyword = 94,
  //         FalseKeyword = 95,
  //         FinallyKeyword = 96,
  //         ForKeyword = 97,
  //         FunctionKeyword = 98,
  //         IfKeyword = 99,
  //         ImportKeyword = 100,
  [SyntaxKind.InKeyword]: {
    name: "in演算子",
    links: [
      {
        name: "in - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in",
      },
    ],
  },
  [SyntaxKind.InstanceOfKeyword]: {
    name: "instanceof演算子",
    links: [
      page(
        "instanceof演算子",
        "https://typescriptbook.jp/reference/object-oriented/class/instanceof-operator"
      ),
      page(
        "インターフェースとinstanceof",
        "https://typescriptbook.jp/reference/object-oriented/interface/instanceof-and-interfaces"
      ),
      {
        name: "instanceof - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof",
      },
    ],
  },
  //         NewKeyword = 103,
  //         NullKeyword = 104,
  //         ReturnKeyword = 105,
  [SyntaxKind.SuperKeyword]: {
    name: "親クラスの参照",
    links: [
      page(
        "クラスの継承 (inheritance)",
        "https://typescriptbook.jp/reference/object-oriented/class/class-inheritance"
      ),
      {
        name: "super - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/super",
      },
    ],
  },
  //         SwitchKeyword = 107,
  //         ThisKeyword = 108,
  //         ThrowKeyword = 109,
  //         TrueKeyword = 110,
  //         TryKeyword = 111,
  //         TypeOfKeyword = 112,
  [SyntaxKind.VarKeyword]: {
    name: "古い変数宣言のやりかた",
    links: [
      page(
        "varはもう使わない",
        "https://typescriptbook.jp/reference/values-types-variables/vars-problems"
      ),
      {
        name: "var - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/var",
      },
    ],
  },
  [SyntaxKind.VoidKeyword]: {
    name: "void型",
    links: [
      page(
        "戻り値がない関数とvoid型 (void type)",
        "https://typescriptbook.jp/reference/functions/void-type"
      ),
    ],
  },
  //         WhileKeyword = 115,
  //         WithKeyword = 116,
  //         ImplementsKeyword = 117,
  //         InterfaceKeyword = 118,
  [SyntaxKind.LetKeyword]: {
    name: "let",
    links: [
      page(
        "変数宣言: letとconst",
        "https://typescriptbook.jp/reference/values-types-variables/let-and-const"
      ),
    ],
  },
  //         PackageKeyword = 120,
  [SyntaxKind.PrivateKeyword]: {
    name: "private修飾子",
    links: [
      page(
        "アクセス修飾子 (access modifier)",
        "https://typescriptbook.jp/reference/object-oriented/class/access-modifiers"
      ),
    ],
  },
  [SyntaxKind.ProtectedKeyword]: {
    name: "protected修飾子",
    links: [
      page(
        "アクセス修飾子 (access modifier)",
        "https://typescriptbook.jp/reference/object-oriented/class/access-modifiers"
      ),
    ],
  },
  [SyntaxKind.PublicKeyword]: {
    name: "public修飾子",
    links: [
      page(
        "アクセス修飾子 (access modifier)",
        "https://typescriptbook.jp/reference/object-oriented/class/access-modifiers"
      ),
    ],
  },
  [SyntaxKind.StaticKeyword]: {
    name: "static修飾子",
    links: [
      page(
        "静的フィールド (static field)",
        "https://typescriptbook.jp/reference/object-oriented/class/static-fields"
      ),
      page(
        "静的メソッド (static method)",
        "https://typescriptbook.jp/reference/object-oriented/class/static-methods"
      ),
    ],
  },
  //         YieldKeyword = 125,
  [SyntaxKind.AbstractKeyword]: {
    name: "abstract修飾子",
    links: [
      page(
        "抽象クラス (abstract class)",
        "https://typescriptbook.jp/reference/object-oriented/class/abstract-class"
      ),
    ],
  },
  //         AsKeyword = 127,
  [SyntaxKind.AssertsKeyword]: {
    name: "asserts",
    links: [
      page(
        "アサーション関数 (assertion functions)",
        "https://typescriptbook.jp/reference/functions/assertion-functions"
      ),
    ],
  },
  //         AssertKeyword = 129,
  [SyntaxKind.AnyKeyword]: {
    name: "any型",
    links: [
      page(
        "any型",
        "https://typescriptbook.jp/reference/values-types-variables/any"
      ),
    ],
  },
  [SyntaxKind.AsyncKeyword]: {
    name: "async",
    links: [
      page(
        "Promise / async / await",
        "https://typescriptbook.jp/reference/promise-async-await"
      ),
    ],
  },
  //         AwaitKeyword = 132,
  [SyntaxKind.AsyncKeyword]: {
    name: "async",
    links: [],
  },
  [SyntaxKind.BooleanKeyword]: {
    name: "論理型",
    links: [
      page(
        "論理型 (boolean type)",
        "https://typescriptbook.jp/reference/values-types-variables/boolean"
      ),
    ],
  },
  //         ConstructorKeyword = 134,
  [SyntaxKind.DeclareKeyword]: {
    name: "アンビエント宣言",
    links: [],
  },
  //         GetKeyword = 136,
  //         InferKeyword = 137,
  //         IntrinsicKeyword = 138,
  //         IsKeyword = 139,
  [SyntaxKind.KeyOfKeyword]: {
    name: "keyof型演算子",
    links: [
      page(
        "keyof型演算子",
        "https://typescriptbook.jp/reference/type-reuse/keyof-type-operator"
      ),
    ],
  },
  //         ModuleKeyword = 141,
  //         NamespaceKeyword = 142,
  [SyntaxKind.NeverKeyword]: {
    name: "never型",
    links: [
      page("never型", "https://typescriptbook.jp/reference/statements/never"),
    ],
  },
  [SyntaxKind.ReadonlyKeyword]: {
    name: "readonly修飾子",
    links: [
      page(
        "オブジェクト型のreadonlyプロパティ (readonly property)",
        "https://typescriptbook.jp/reference/values-types-variables/object/readonly-property"
      ),
      page(
        "クラスのreadonly修飾子",
        "https://typescriptbook.jp/reference/object-oriented/class/readonly-modifier-in-classes"
      ),
      page(
        "インターフェースのreadonly修飾子",
        "https://typescriptbook.jp/reference/object-oriented/interface/readonly-modifier-in-interfaces"
      ),
    ],
  },
  //         RequireKeyword = 145,
  [SyntaxKind.NumberKeyword]: {
    name: "数値型",
    links: [
      page(
        "数値型 (number type)",
        "https://typescriptbook.jp/reference/values-types-variables/number"
      ),
    ],
  },
  [SyntaxKind.ObjectKeyword]: {
    name: "オブジェクト型",
    links: [
      page(
        "object、Object、{}の違い",
        "https://typescriptbook.jp/reference/values-types-variables/object/difference-among-object-and-object"
      ),
    ],
  },
  //         SetKeyword = 148,
  [SyntaxKind.StringKeyword]: {
    name: "文字列型",
    links: [
      page(
        "文字列型 (string type)",
        "https://typescriptbook.jp/reference/values-types-variables/string"
      ),
    ],
  },
  [SyntaxKind.SymbolKeyword]: {
    name: "シンボル型",
    links: [
      page(
        "シンボル型 (symbol type)",
        "https://typescriptbook.jp/reference/values-types-variables/symbol"
      ),
    ],
  },
  //         TypeKeyword = 151,
  [SyntaxKind.UndefinedKeyword]: {
    name: "undefined型",
    links: [
      page(
        "undefined型",
        "https://typescriptbook.jp/reference/values-types-variables/undefined"
      ),
    ],
  },
  //         UniqueKeyword = 153,
  [SyntaxKind.UnknownKeyword]: {
    name: "unknown型",
    links: [
      page(
        "unknown型",
        "https://typescriptbook.jp/reference/statements/unknown"
      ),
      page(
        "anyとunknownの違い",
        "https://typescriptbook.jp/reference/statements/any-vs-unknown"
      ),
    ],
  },
  //         FromKeyword = 155,
  //         GlobalKeyword = 156,
  [SyntaxKind.BigIntKeyword]: {
    name: "bigint型",
    links: [
      page(
        "bigint型",
        "https://typescriptbook.jp/reference/values-types-variables/bigint"
      ),
    ],
  },
  [SyntaxKind.OverrideKeyword]: {
    name: "override修飾子",
    links: [
      {
        name: "TypeScript: Documentation - TypeScript 4.3",
        url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag",
      },
    ],
  },
  //         OfKeyword = 159,
  [SyntaxKind.TypeAliasDeclaration]: {
    name: "型エイリアス",
    links: [
      page(
        "型エイリアス (type alias)",
        "https://typescriptbook.jp/reference/values-types-variables/type-alias"
      ),
    ],
  },
  // QualifiedName = 160,
  [SyntaxKind.ComputedPropertyName]: {
    name: "動的プロパティ名",
    links: [
      {
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names",
      },
    ],
  },
  [SyntaxKind.TypeParameter]: {
    name: "型変数(ジェネリクス)",
    links: [
      page(
        "型変数 (type variables)",
        "https://typescriptbook.jp/reference/generics/type-variables#%E5%9E%8B%E5%A4%89%E6%95%B0"
      ),
    ],
  },
  [SyntaxKind.Decorator]: {
    name: "デコレータ",
    links: [
      {
        name: "TypeScript: Documentation - Decorators",
        url: "https://www.typescriptlang.org/docs/handbook/decorators.html",
      },
    ],
  },
  [SyntaxKind.PropertySignature]: {
    name: "プロパティシグネチャ",
    links: [
      page(
        "インターフェース (interface)",
        "https://typescriptbook.jp/reference/object-oriented/interface"
      ),
      page(
        "オブジェクトの型注釈 (type annotation)",
        "https://typescriptbook.jp/reference/values-types-variables/object/type-annotation-of-objects"
      ),
    ],
  },
  [SyntaxKind.PropertyDeclaration]: {
    name: "プロパティ宣言(フィールド宣言)",
    links: [
      page(
        "フィールド (field)",
        "https://typescriptbook.jp/reference/object-oriented/class/fields"
      ),
    ],
  },
  [SyntaxKind.MethodSignature]: {
    name: "メソッドシグネチャ",
    links: [],
  },
  [SyntaxKind.MethodDeclaration]: {
    name: "メソッド宣言",
    links: [
      page(
        "メソッド (method)",
        "https://typescriptbook.jp/reference/object-oriented/class/methods"
      ),
    ],
  },
  //         ClassStaticBlockDeclaration = 169,
  [SyntaxKind.Constructor]: {
    name: "コンストラクタ",
    links: [
      page(
        "コンストラクタ (constructor)",
        "https://typescriptbook.jp/reference/object-oriented/class/constructor"
      ),
    ],
  },
  [SyntaxKind.GetAccessor]: {
    name: "ゲッター",
    links: [
      page(
        "セッターとゲッター (set, get)",
        "https://typescriptbook.jp/reference/advanced-topics/getters-and-setters"
      ),
    ],
  },
  [SyntaxKind.SetAccessor]: {
    name: "セッター",
    links: [
      page(
        "セッターとゲッター (set, get)",
        "https://typescriptbook.jp/reference/advanced-topics/getters-and-setters"
      ),
    ],
  },
  [SyntaxKind.CallSignature]: {
    name: "関数呼び出しシグネチャ(コールシグネチャ)",
    links: [
      page(
        "関数の型の宣言 (function type declaration)",
        "https://typescriptbook.jp/reference/functions/function-type-declaration#%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E6%A7%8B%E6%96%87%E3%81%AB%E3%82%88%E3%82%8B%E9%96%A2%E6%95%B0%E3%81%AE%E5%9E%8B%E5%AE%A3%E8%A8%80"
      ),
    ],
  },
  [SyntaxKind.ConstructSignature]: {
    name: "コンストラクタシグネチャ",
    links: [],
  },
  [SyntaxKind.IndexSignature]: {
    name: "インデックス型(インデックスシグネチャ)",
    links: [
      page(
        "インデックス型 (index signature)",
        "https://typescriptbook.jp/reference/values-types-variables/object/index-signature"
      ),
    ],
  },
  [SyntaxKind.TypePredicate]: {
    name: "type predicate",
    links: [
      page(
        "型ガード関数 (type guard function)",
        "https://typescriptbook.jp/reference/functions/type-guard-functions"
      ),
    ],
  },
  [SyntaxKind.TypeReference]: {
    name: "型の参照",
    links: [],
  },
  [SyntaxKind.FunctionType]: {
    name: "関数型(関数のシグネチャ)",
    links: [
      page(
        "関数の型の宣言 (function type declaration)",
        "https://typescriptbook.jp/reference/functions/function-type-declaration"
      ),
    ],
  },
  [SyntaxKind.ConstructorType]: {
    name: "コンストラクタ型(コンストラクタのシグネチャ)",
    links: [],
  },
  [SyntaxKind.TypeQuery]: {
    name: "typeof型演算子",
    links: [
      page(
        "typeof型演算子",
        "https://typescriptbook.jp/reference/type-reuse/typeof-type-operator"
      ),
    ],
  },
  [SyntaxKind.TypeLiteral]: {
    name: "オブジェクトの型",
    links: [
      page(
        "オブジェクトの型注釈 (type annotation)",
        "https://typescriptbook.jp/reference/values-types-variables/object/type-annotation-of-objects"
      ),
    ],
  },
  [SyntaxKind.ArrayType]: {
    name: "配列型",
    links: [
      page(
        "配列の型注釈 (type annotation)",
        "https://typescriptbook.jp/reference/values-types-variables/array/type-annotation-of-array"
      ),
    ],
  },
  [SyntaxKind.TupleType]: {
    name: "タプル型",
    links: [
      page(
        "タプル (tuple)",
        "https://typescriptbook.jp/reference/values-types-variables/tuple"
      ),
    ],
  },
  [SyntaxKind.OptionalType]: {
    name: "オプション型",
    links: [],
  },
  [SyntaxKind.RestType]: {
    name: "残余型",
    links: [],
  },
  [SyntaxKind.UnionType]: {
    name: "ユニオン型",
    links: [
      page(
        "ユニオン型 (union type)",
        "https://typescriptbook.jp/reference/values-types-variables/union"
      ),
    ],
  },
  [SyntaxKind.IntersectionType]: {
    name: "インターセクション型",
    links: [
      page(
        "インターセクション型 (intersection type)",
        "https://typescriptbook.jp/reference/values-types-variables/intersection"
      ),
    ],
  },
  [SyntaxKind.ConditionalType]: {
    name: "条件型",
    links: [
      {
        name: "TypeScript: Documentation - Conditional Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
      },
    ],
  },
  [SyntaxKind.InferType]: {
    name: "infer",
    links: [
      {
        name: "TypeScript: Documentation - Conditional Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
      },
    ],
  },
  [SyntaxKind.ParenthesizedType]: {
    name: "型のグルーピング",
    links: [],
  },
  [SyntaxKind.ThisType]: {
    name: "thisの型",
    links: [
      page(
        "メソッド戻り値のthis型とメソッドチェーン",
        "https://typescriptbook.jp/reference/object-oriented/class/return-this-type"
      ),
    ],
  },
  [SyntaxKind.TypeOperator]: {
    name: "型演算子",
    links: [],
  },
  [SyntaxKind.IndexedAccessType]: {
    name: "インデックスアクセス型",
    links: [
      {
        name: "TypeScript: Documentation - Indexed Access Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
      },
    ],
  },
  [SyntaxKind.MappedType]: {
    name: "mapped type",
    links: [
      page(
        "Mapped type",
        "https://typescriptbook.jp/reference/type-reuse/mapped-types"
      ),
    ],
  },
  [SyntaxKind.LiteralType]: {
    name: "リテラル型",
    links: [
      page(
        "リテラル型 (literal type)",
        "https://typescriptbook.jp/reference/values-types-variables/literal-types"
      ),
    ],
  },
  [SyntaxKind.NamedTupleMember]: {
    name: "名前付きタプルメンバー",
    links: [
      {
        name: "TypeScript: Documentation - TypeScript 4.0",
        url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#labeled-tuple-elements",
      },
    ],
  },
  [SyntaxKind.TemplateLiteralType]: {
    name: "テンプレートリテラル型",
    links: [
      {
        name: "TypeScript: Documentation - Template Literal Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
      },
    ],
  },
  //         TemplateLiteralTypeSpan = 198,
  [SyntaxKind.ImportType]: {
    name: "インポート型",
    links: [],
  },
  [SyntaxKind.ObjectBindingPattern]: {
    name: "オブジェクトの分割代入",
    links: [
      page(
        "オブジェクトの分割代入 (destructuring assignment)",
        "https://typescriptbook.jp/reference/values-types-variables/object/destructuring-assignment-from-objects"
      ),
    ],
  },
  [SyntaxKind.ArrayBindingPattern]: {
    name: "配列の分割代入",
    links: [
      page(
        "配列の分割代入 (destructuring assignment)",
        "https://typescriptbook.jp/reference/values-types-variables/array/destructuring-assignment-from-array"
      ),
    ],
  },
  [SyntaxKind.BindingElement]: {
    name: "分割代入により定義される変数",
    links: [
      page(
        "配列の分割代入 (destructuring assignment)",
        "https://typescriptbook.jp/reference/values-types-variables/array/destructuring-assignment-from-array"
      ),
      page(
        "オブジェクトの分割代入 (destructuring assignment)",
        "https://typescriptbook.jp/reference/values-types-variables/object/destructuring-assignment-from-objects"
      ),
    ],
  },
  [SyntaxKind.ArrayLiteralExpression]: {
    name: "配列リテラル",
    links: [
      page(
        "配列リテラル (array literal)",
        "https://typescriptbook.jp/reference/values-types-variables/array/array-literal"
      ),
      {
        name: "Array - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
    ],
  },
  [SyntaxKind.ObjectLiteralExpression]: {
    name: "オブジェクトリテラル",
    links: [
      page(
        "オブジェクトリテラル (object literal)",
        "https://typescriptbook.jp/reference/values-types-variables/object/object-literal"
      ),
      {
        name: "オブジェクト初期化子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer",
      },
    ],
  },
  [SyntaxKind.PropertyAccessExpression]: {
    name: "プロパティへのアクセス",
    links: [
      {
        name: "プロパティアクセサー - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Property_Accessors",
      },
    ],
  },
  [SyntaxKind.ElementAccessExpression]: {
    name: "配列要素へのアクセスまたはオブジェクトプロパティへのアクセス",
    links: [
      page(
        "配列要素へのアクセス",
        "https://typescriptbook.jp/reference/values-types-variables/array/how-to-access-elements-in-an-array"
      ),
      {
        name: "プロパティアクセサー - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Property_Accessors",
      },
    ],
  },
  [SyntaxKind.CallExpression]: {
    name: "関数やメソッドの呼び出し",
    links: [],
  },
  [SyntaxKind.NewExpression]: {
    name: "インスタンスの生成",
    links: [
      page(
        "クラス (class)",
        "https://typescriptbook.jp/reference/object-oriented/class"
      ),
    ],
  },
  [SyntaxKind.TaggedTemplateExpression]: {
    name: "タグ付きテンプレート",
    links: [
      {
        name: "テンプレートリテラル (テンプレート文字列) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals#tagged_templates",
      },
    ],
  },
  //         TypeAssertionExpression = 210,
  [SyntaxKind.ParenthesizedExpression]: {
    name: "式のグルーピング",
    links: [],
  },
  [SyntaxKind.FunctionExpression]: {
    name: "関数式",
    links: [
      page(
        "関数式 (function expression)",
        "https://typescriptbook.jp/reference/functions/function-expression"
      ),
    ],
  },
  [SyntaxKind.ArrowFunction]: {
    name: "アロー関数",
    links: [
      page(
        "アロー関数 (arrow function)",
        "https://typescriptbook.jp/reference/functions/arrow-functions"
      ),
    ],
  },
  [SyntaxKind.DeleteExpression]: {
    name: "delete演算子(プロパティを削除する)",
    links: [
      {
        name: "delete 演算子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/delete",
      },
    ],
  },
  [SyntaxKind.TypeOfExpression]: {
    name: "typeof演算子",
    links: [
      page(
        "typeof演算子 (typeof operator)",
        "https://typescriptbook.jp/reference/values-types-variables/typeof-operator"
      ),
    ],
  },
  [SyntaxKind.VoidExpression]: {
    name: "void演算子",
    links: [
      {
        name: "void 演算子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/void",
      },
    ],
  },
  [SyntaxKind.AwaitExpression]: {
    name: "await",
    links: [
      page(
        "Promise / async / await",
        "https://typescriptbook.jp/reference/promise-async-await"
      ),
    ],
  },
  [SyntaxKind.PrefixUnaryExpression]: {
    name: "単項演算子",
    links: [
      {
        name: "式と演算子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators",
      },
    ],
  },
  [SyntaxKind.PostfixUnaryExpression]: {
    name: "単項演算子",
    links: [
      {
        name: "式と演算子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators",
      },
    ],
  },
  [SyntaxKind.BinaryExpression]: {
    name: "二項の演算",
    links: [],
  },
  [SyntaxKind.ConditionalExpression]: {
    name: "三項演算子",
    links: [
      page(
        "三項演算子 (ternary operator)",
        "https://typescriptbook.jp/reference/statements/ternary-operator"
      ),
    ],
  },
  //         TemplateExpression = 222,
  [SyntaxKind.YieldExpression]: {
    name: "yield",
    links: [
      {
        name: "yield - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/yield",
      },
      page(
        "ジェネレーター (generator)",
        "https://typescriptbook.jp/reference/advanced-topics/generator"
      ),
    ],
  },
  [SyntaxKind.SpreadElement]: {
    name: "スプレッド構文(配列など)",
    links: [
      page(
        "配列のスプレッド構文「...」(spread syntax)",
        "https://typescriptbook.jp/reference/values-types-variables/array/spread-syntax-for-array"
      ),
    ],
  },
  [SyntaxKind.ClassExpression]: {
    name: "クラス式",
    links: [
      {
        name: "クラス式 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/class",
      },
    ],
  },
  //         OmittedExpression = 226,
  //         ExpressionWithTypeArguments = 227,
  [SyntaxKind.AsExpression]: {
    name: "型アサーション(as)",
    links: [
      page(
        "型アサーション「as」(type assertion)",
        "https://typescriptbook.jp/reference/values-types-variables/type-assertion-as"
      ),
    ],
  },
  [SyntaxKind.NonNullExpression]: {
    name: "非nullアサーション",
    links: [
      {
        name: "TypeScript: Documentation - TypeScript 2.0",
        url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator",
      },
    ],
  },
  //         MetaProperty = 230,
  //         SyntheticExpression = 231,
  //         TemplateSpan = 232,
  //         SemicolonClassElement = 233,
  [SyntaxKind.Block]: {
    name: "ブロック",
    links: [
      page(
        "変数のスコープ (scope)",
        "https://typescriptbook.jp/reference/statements/variable-scope"
      ),
    ],
  },
  [SyntaxKind.EmptyStatement]: {
    name: "空の文",
    links: [],
  },
  [SyntaxKind.VariableStatement]: {
    name: "変数宣言の文",
    links: [
      page(
        "変数宣言: letとconst",
        "https://typescriptbook.jp/reference/values-types-variables/let-and-const"
      ),
    ],
  },
  [SyntaxKind.ExpressionStatement]: {
    name: "式文",
    links: [],
  },
  [SyntaxKind.IfStatement]: {
    name: "if文",
    links: [
      page(
        "if-else文",
        "https://typescriptbook.jp/reference/statements/if-else"
      ),
    ],
  },
  [SyntaxKind.DoStatement]: {
    name: "do文",
    links: [],
  },
  [SyntaxKind.WhileStatement]: {
    name: "while文",
    links: [],
  },
  [SyntaxKind.ForStatement]: {
    name: "for文",
    links: [],
  },
  [SyntaxKind.ForInStatement]: {
    name: "for-in文",
    links: [
      page(
        "オブジェクトをループする方法",
        "https://typescriptbook.jp/reference/values-types-variables/object/how-to-loop-an-object"
      ),
    ],
  },
  [SyntaxKind.ForOfStatement]: {
    name: "for-of文",
    links: [
      page(
        "for-of文 - 拡張for文",
        "https://typescriptbook.jp/reference/statements/for-of"
      ),
    ],
  },
  [SyntaxKind.ContinueStatement]: {
    name: "continue文",
    links: [],
  },
  [SyntaxKind.BreakStatement]: {
    name: "break文",
    links: [],
  },
  [SyntaxKind.ReturnStatement]: {
    name: "return文",
    links: [],
  },
  [SyntaxKind.WithStatement]: {
    name: "with文",
    links: [],
  },
  [SyntaxKind.SwitchStatement]: {
    name: "switch文",
    links: [
      page("switch文", "https://typescriptbook.jp/reference/statements/switch"),
    ],
  },
  [SyntaxKind.LabeledStatement]: {
    name: "ラベル",
    links: [],
  },
  [SyntaxKind.ThrowStatement]: {
    name: "throw文",
    links: [
      page(
        "例外処理 (exception)",
        "https://typescriptbook.jp/reference/statements/exception"
      ),
    ],
  },
  [SyntaxKind.TryStatement]: {
    name: "try文",
    links: [
      page(
        "例外処理 (exception)",
        "https://typescriptbook.jp/reference/statements/exception"
      ),
    ],
  },
  [SyntaxKind.DebuggerStatement]: {
    name: "debugger文",
    links: [],
  },
  [SyntaxKind.VariableDeclaration]: {
    name: "変数宣言",
    links: [],
  },
  [SyntaxKind.VariableDeclarationList]: {
    name: "変数宣言のリスト",
    links: [],
  },
  [SyntaxKind.FunctionDeclaration]: {
    name: "関数宣言",
    links: [
      page(
        "関数宣言 (function declaration)",
        "https://typescriptbook.jp/reference/functions/function-declaration"
      ),
    ],
  },
  [SyntaxKind.ClassDeclaration]: {
    name: "クラスの宣言",
    links: [
      page(
        "クラス (class)",
        "https://typescriptbook.jp/reference/object-oriented/class"
      ),
    ],
  },
  [SyntaxKind.InterfaceDeclaration]: {
    name: "インターフェースの宣言",
    links: [
      page(
        "インターフェース (interface)",
        "https://typescriptbook.jp/reference/object-oriented/interface"
      ),
    ],
  },
  [SyntaxKind.TypeAliasDeclaration]: {
    name: "型エイリアスの宣言",
    links: [
      page(
        "型エイリアス (type alias)",
        "https://typescriptbook.jp/reference/values-types-variables/type-alias"
      ),
    ],
  },
  [SyntaxKind.EnumDeclaration]: {
    name: "列挙型の宣言",
    links: [
      page(
        "列挙型 (enum)",
        "https://typescriptbook.jp/reference/values-types-variables/enum"
      ),
    ],
  },
  [SyntaxKind.ModuleDeclaration]: {
    name: "TypeScriptモジュールの宣言",
    links: [],
  },
  //         ModuleBlock = 261,
  [SyntaxKind.CaseBlock]: {
    name: "caseブロック",
    links: [
      page(
        "switchと変数スコープ",
        "https://typescriptbook.jp/reference/statements/switch-and-variable-scope"
      ),
    ],
  },
  //         NamespaceExportDeclaration = 263,
  [SyntaxKind.ImportEqualsDeclaration]: {
    name: "インポート代入",
    links: [],
  },
  [SyntaxKind.ImportDeclaration]: {
    name: "インポートの宣言",
    links: [],
  },
  [SyntaxKind.ImportClause]: {
    name: "インポートする変数など",
    links: [],
  },
  [SyntaxKind.NamespaceImport]: {
    name: "名前空間インポート",
    links: [],
  },
  [SyntaxKind.NamedImports]: {
    name: "名前つきインポート",
    links: [],
  },
  //         ImportSpecifier = 269,
  [SyntaxKind.ExportAssignment]: {
    name: "デフォルトエクスポートの宣言",
    links: [],
  },
  [SyntaxKind.ExportDeclaration]: {
    name: "名前つきエクスポートの宣言",
    links: [],
  },
  [SyntaxKind.NamedExports]: {
    name: "名前つきエクスポート",
    links: [],
  },
  [SyntaxKind.NamespaceExport]: {
    name: "名前空間エクスポート",
    links: [],
  },
  //         ExportSpecifier = 274,
  //         MissingDeclaration = 275,
  //         ExternalModuleReference = 276,
  [SyntaxKind.JsxElement]: {
    name: "JSXのタグ",
    links: [
      {
        name: "JSX の導入 – React",
        url: "https://ja.reactjs.org/docs/introducing-jsx.html",
      },
    ],
  },
  [SyntaxKind.JsxSelfClosingElement]: {
    name: "JSXの自己終了タグ",
    links: [
      {
        name: "JSX の導入 – React",
        url: "https://ja.reactjs.org/docs/introducing-jsx.html",
      },
    ],
  },
  [SyntaxKind.JsxOpeningElement]: {
    name: "JSXの開始タグ",
    links: [
      {
        name: "JSX の導入 – React",
        url: "https://ja.reactjs.org/docs/introducing-jsx.html",
      },
    ],
  },
  [SyntaxKind.JsxClosingElement]: {
    name: "JSXの終了タグ",
    links: [
      {
        name: "JSX の導入 – React",
        url: "https://ja.reactjs.org/docs/introducing-jsx.html",
      },
    ],
  },
  [SyntaxKind.JsxFragment]: {
    name: "JSXのフラグメント",
    links: [
      {
        name: "フラグメント – React",
        url: "https://ja.reactjs.org/docs/fragments.html#short-syntax",
      },
    ],
  },
  [SyntaxKind.JsxOpeningFragment]: {
    name: "JSXのフラグメントの開始タグ",
    links: [
      {
        name: "フラグメント – React",
        url: "https://ja.reactjs.org/docs/fragments.html#short-syntax",
      },
    ],
  },
  [SyntaxKind.JsxClosingFragment]: {
    name: "JSXのフラグメントの終了タグ",
    links: [
      {
        name: "フラグメント – React",
        url: "https://ja.reactjs.org/docs/fragments.html#short-syntax",
      },
    ],
  },
  [SyntaxKind.JsxAttribute]: {
    name: "JSXの属性",
    links: [
      {
        name: "JSX の導入 – React",
        url: "https://ja.reactjs.org/docs/introducing-jsx.html",
      },
    ],
  },
  [SyntaxKind.JsxAttributes]: {
    name: "JSXの属性たち",
    links: [],
  },
  [SyntaxKind.JsxSpreadAttribute]: {
    name: "JSXのスプレッド属性(属性の展開)",
    links: [
      {
        name: "JSX を深く理解する – React",
        url: "https://ja.reactjs.org/docs/jsx-in-depth.html#spread-attributes",
      },
    ],
  },
  [SyntaxKind.JsxExpression]: {
    name: "JSXの式",
    links: [
      {
        name: "JSX の導入 – React",
        url: "https://ja.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx",
      },
    ],
  },
  [SyntaxKind.CaseClause]: {
    name: "case節",
    links: [
      page(
        "switchと変数スコープ",
        "https://typescriptbook.jp/reference/statements/switch-and-variable-scope"
      ),
      page(
        "switchのフォールスルー問題",
        "https://typescriptbook.jp/reference/statements/switch-fallthrough"
      ),
    ],
  },
  [SyntaxKind.DefaultClause]: {
    name: "default節",
    links: [
      page(
        "switchと変数スコープ",
        "https://typescriptbook.jp/reference/statements/switch-and-variable-scope"
      ),
    ],
  },
  [SyntaxKind.HeritageClause]: {
    name: "継承",
    links: [
      page(
        "クラスの継承 (inheritance)",
        "https://typescriptbook.jp/reference/object-oriented/class/class-inheritance"
      ),
      page(
        "インターフェースを実装する",
        "https://typescriptbook.jp/reference/object-oriented/interface/implementing-interfaces"
      ),
      page(
        "構造的部分型 (structural subtyping)",
        "https://typescriptbook.jp/reference/values-types-variables/structural-subtyping"
      ),
    ],
  },
  [SyntaxKind.CatchClause]: {
    name: "catch節",
    links: [
      page(
        "例外処理 (exception)",
        "https://typescriptbook.jp/reference/statements/exception"
      ),
    ],
  },
  //         AssertClause = 292,
  //         AssertEntry = 293,
  [SyntaxKind.PropertyAssignment]: {
    name: "プロパティへの代入",
    links: [
      page(
        "オブジェクトのプロパティ",
        "https://typescriptbook.jp/reference/values-types-variables/object/properties-of-objects"
      ),
      {
        name: "オブジェクト初期化子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer",
      },
    ],
  },
  [SyntaxKind.ShorthandPropertyAssignment]: {
    name: "プロパティへの代入の省略形",
    links: [
      page(
        "Shorthand property names",
        "https://typescriptbook.jp/reference/values-types-variables/object/shorthand-property-names"
      ),
      {
        name: "オブジェクト初期化子 - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions",
      },
    ],
  },
  [SyntaxKind.SpreadAssignment]: {
    name: "スプレッド代入",
    links: [],
  },
  [SyntaxKind.EnumMember]: {
    name: "列挙型のメンバー",
    links: [
      page(
        "列挙型 (enum)",
        "https://typescriptbook.jp/reference/values-types-variables/enum"
      ),
    ],
  },
  //         UnparsedPrologue = 298,
  //         UnparsedPrepend = 299,
  //         UnparsedText = 300,
  //         UnparsedInternalText = 301,
  //         UnparsedSyntheticReference = 302,
  //         SourceFile = 303,
  //         Bundle = 304,
  //         UnparsedSource = 305,
  //         InputFiles = 306,
  //         JSDocTypeExpression = 307,
  //         JSDocNameReference = 308,
  //         JSDocMemberName = 309,
  //         JSDocAllType = 310,
  //         JSDocUnknownType = 311,
  //         JSDocNullableType = 312,
  //         JSDocNonNullableType = 313,
  //         JSDocOptionalType = 314,
  //         JSDocFunctionType = 315,
  //         JSDocVariadicType = 316,
  //         JSDocNamepathType = 317,
  //         JSDocComment = 318,
  //         JSDocText = 319,
  //         JSDocTypeLiteral = 320,
  //         JSDocSignature = 321,
  //         JSDocLink = 322,
  //         JSDocLinkCode = 323,
  //         JSDocLinkPlain = 324,
  //         JSDocTag = 325,
  //         JSDocAugmentsTag = 326,
  //         JSDocImplementsTag = 327,
  //         JSDocAuthorTag = 328,
  //         JSDocDeprecatedTag = 329,
  //         JSDocClassTag = 330,
  //         JSDocPublicTag = 331,
  //         JSDocPrivateTag = 332,
  //         JSDocProtectedTag = 333,
  //         JSDocReadonlyTag = 334,
  //         JSDocOverrideTag = 335,
  //         JSDocCallbackTag = 336,
  //         JSDocEnumTag = 337,
  //         JSDocParameterTag = 338,
  //         JSDocReturnTag = 339,
  //         JSDocThisTag = 340,
  //         JSDocTypeTag = 341,
  //         JSDocTemplateTag = 342,
  //         JSDocTypedefTag = 343,
  //         JSDocSeeTag = 344,
  //         JSDocPropertyTag = 345,
  //         SyntaxList = 346,
  //         NotEmittedStatement = 347,
  //         PartiallyEmittedExpression = 348,
  //         CommaListExpression = 349,
  //         MergeDeclarationMarker = 350,
  //         EndOfDeclarationMarker = 351,
  //         SyntheticReferenceExpression = 352,
  //         Count = 353,
};

const customTopicDetails = defineCustomTopicDetails({
  ReadonlyArray: {
    name: "読み取り専用配列",
    links: [
      page(
        "読み取り専用の配列 (readonly array)",
        "https://typescriptbook.jp/reference/values-types-variables/array/readonly-array"
      ),
    ],
  },
  UniqueSymbol: {
    name: "ユニークシンボル",
    links: [
      {
        name: "TypeScript: Documentation - Symbols",
        url: "https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol",
      },
    ],
  },
  TypeAnnotationOfVariable: {
    name: "変数の型注釈",
    links: [
      page(
        "変数宣言の型注釈 (type annotation)",
        "https://typescriptbook.jp/reference/values-types-variables/type-annotation"
      ),
    ],
  },
  ParameterOfFunction: {
    name: "関数の引数",
    links: [
      page(
        "関数の引数 (function parameter)",
        "https://typescriptbook.jp/reference/functions/function-parameters"
      ),
    ],
  },
  ParameterOfMethod: {
    name: "メソッドの引数",
    links: [
      page(
        "メソッド (method)",
        "https://typescriptbook.jp/reference/object-oriented/class/methods"
      ),
    ],
  },
  ParameterOfConstructor: {
    name: "コンストラクタの引数",
    links: [
      page(
        "コンストラクタ (constructor)",
        "https://typescriptbook.jp/reference/object-oriented/class/constructor"
      ),
    ],
  },
  NullType: {
    name: "null型",
    links: [
      page(
        "null型",
        "https://typescriptbook.jp/reference/values-types-variables/null"
      ),
    ],
  },
  NullLiteral: {
    name: "nullリテラル",
    links: [
      page(
        "null型",
        "https://typescriptbook.jp/reference/values-types-variables/null"
      ),
    ],
  },
  MultiplicationOperator: {
    name: "乗算演算子",
    links: [
      {
        name: "乗算 (*) - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Multiplication",
      },
    ],
  },
  Generator: {
    name: "ジェネレーター",
    links: [
      page(
        "ジェネレーター (generator)",
        "https://typescriptbook.jp/reference/advanced-topics/generator"
      ),
      {
        name: "イテレーターとジェネレーター - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Iterators_and_Generators",
      },
    ],
  },
  YieldAsterisk: {
    name: "yield*",
    links: [
      {
        name: "yield* - JavaScript | MDN",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/yield*",
      },
    ],
  },
  DefiniteAssignmentAssertion: {
    name: "definite assignment assertion",
    links: [
      page(
        "definite assignment assertion",
        "https://typescriptbook.jp/reference/values-types-variables/definite-assignment-assertion"
      ),
    ],
  },
  MinusReadonlyOfMappedType: {
    name: "mapping modifier (読み取り専用属性の除去)",
    links: [
      {
        name: "TypeScript: Documentation - Mapped Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers",
      },
    ],
  },
  PlusReadonlyOfMappedType: {
    name: "mapping modifier (読み取り専用属性の付与)",
    links: [
      {
        name: "TypeScript: Documentation - Mapped Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers",
      },
    ],
  },
  OptionProperty: {
    name: "オプションプロパティ",
    links: [
      page(
        "オブジェクト型のオプションプロパティ (optional property)",
        "https://typescriptbook.jp/reference/values-types-variables/object/optional-property"
      ),
    ],
  },
  MinusOptionTypeOfMappedType: {
    name: "mapping modifier (オプション属性の除去)",
    links: [
      {
        name: "TypeScript: Documentation - Mapped Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers",
      },
    ],
  },
  PlusOptionTypeOfMappedType: {
    name: "mapping modifier (オプション属性の付与)",
    links: [
      {
        name: "TypeScript: Documentation - Mapped Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers",
      },
    ],
  },
  KeyRemappingViaAs: {
    name: "asによるキーリマッピング",
    links: [
      {
        name: "TypeScript: Documentation - Mapped Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as",
      },
    ],
  },
  ImplementsInterface: {
    name: "インターフェースの実装",
    links: [
      page(
        "インターフェースを実装する",
        "https://typescriptbook.jp/reference/object-oriented/interface/implementing-interfaces"
      ),
      page(
        "構造的部分型 (structural subtyping)",
        "https://typescriptbook.jp/reference/values-types-variables/structural-subtyping"
      ),
    ],
  },
  ExtendsClass: {
    name: "クラスの継承",
    links: [
      page(
        "クラスの継承 (inheritance)",
        "https://typescriptbook.jp/reference/object-oriented/class/class-inheritance"
      ),
      page(
        "構造的部分型 (structural subtyping)",
        "https://typescriptbook.jp/reference/values-types-variables/structural-subtyping"
      ),
    ],
  },
  ConstAssertion: {
    name: "constアサーション",
    links: [
      page(
        "constアサーション「as const」 (const assertion)",
        "https://typescriptbook.jp/reference/values-types-variables/const-assertion"
      ),
    ],
  },
  ConstructorShorthand: {
    name: "constructor shorthand",
    links: [
      page(
        "constructor shorthand",
        "https://typescriptbook.jp/reference/object-oriented/class/constructor-shorthand"
      ),
    ],
  },
  DefaultTypeParameter: {
    name: "デフォルト型引数",
    links: [
      page(
        "デフォルト型引数",
        "https://typescriptbook.jp/reference/generics/default-type-parameter"
      ),
    ],
  },
});

export type CustomTopic = keyof typeof customTopicDetails;
export const CustomTopic = Object.fromEntries(
  Object.keys(customTopicDetails).map((_) => [_, _])
) as { readonly [K in CustomTopic]: K };

const allTopicDetails: ReadonlyMap<
  string,
  Omit<TopicDetail, "topic">
> = new Map([
  ...Object.entries(syntaxKindTopicDetails),
  ...Object.entries(customTopicDetails),
]);
