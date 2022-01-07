// [このツールの使い方を見る]

// noinspection All

let o: any, oo: any, ooo: any, oooo: any;

// リテラル
o = [null, true, false, 0, 0b0, 0x00, 0n, "", "\n", ``, `...0`, o``, /.*/, {}];

// 特別な変数
o = [undefined, NaN, Infinity];

// 演算子
o = [
  [ooo++, ++oooo, ooo--, --oooo],
  [o + o, o - oo, o * oo, o / oo, o ** o, o % ooo],
  [o < o, o <= o, o > oo, o >= o, o == o, o === o, o !== o],
  [~oooo, ~~oooo, o ^ oo, o << 0, o >> o, o >>> o, o & ooo, o | o],
  [!oooo, !!oooo, o && o, o || o],
  [typeof o, void o],
  [o ?? o],
  [new Map()],
];

// 式
o = [
  [(o += oo), (o -= oo), (o *= oo), (o /= ooo), (o **= o), (o %= o)],
  [(o ^= oo), (o <<= o), (o >>= o), (o >>>= o), (o &= oo), (o |= o)],
  [(o &&= o), (o ||= o), (o ??= o)],
  [0 ? 0 : 0],
  [function (param: any): any {}],
  [(param: any): any => {}],
  [class {}],
];

o.prop = 0;
o["prop"] = 0;

// オプショナルチェーン
let nullableValue: any;
nullableValue?.property;
nullableValue?.[0];
nullableValue?.();

// 文
if (o) {
} else if (o) {
} else {
}

switch (o) {
  case o:
    break;
  default:
}

while (ooo) {}

do {} while (ooo);

label: for (let o = 0; o < 0; o++) {
  continue label;
}

for (let oo of o) {
}

for (let oo in o) {
}

try {
  throw new Error();
} catch (e) {
} finally {
}

debugger;

delete ooo.ooo;

function func(p1 = 1, param?: any): any {
  return param;
}

function* generator(): any {
  yield o;
}

enum Enum {
  A,
  B = 2,
  C = "C",
}

// オブジェクト指向
abstract class O {
  public o!: any;
  public ooo: any = ooo;
  protected static oo: any;
  #ooo: any;
  constructor(private oooo: any) {}
  abstract method(param: any): any;
  *generator(param: any) {
    yield* o;
  }
  private static method(param: any): any {}
  static get getter(): any {
    return o;
  }
  set setter(ooo: any) {}
  ["name"]: null;
  #method() {}
  static {}
}

interface Interface {
  readonly prop?: string;
  new (param: any): any;
  method(param: any): any;
  (param: any): any;
  [K: string]: any;
}

{
  class ClassA {
    method() {}
  }
  class ClassB extends ClassA implements ClassA {
    override method() {}
  }
}

namespace Namespace {
  export type A = any;
}
module Module {}

// アンビエント宣言
declare let value: any;
declare const uniqueSymbol: unique symbol;

// 型エイリアス
type Primitive = null | undefined | boolean | string | number | symbol | bigint;
type SpecialType = any | void | unknown | never | object;
type Union = 1 | 2;
type Intersection = 1 & 2;
type FunctionType = (param: any) => any;
type ConstructorType = new (param: any) => any;
type TypeOf = typeof o;
type KeyOf = keyof Object;
type SomeObject = {
  readonly prop?: string;
  new (param: any): any;
  method(param: any): any;
  (param: any): any;
  [K: string]: any;
};
type ArrayType = any[] | readonly any[];
type Tuples = [any] | readonly [any] | [name: number] | [...any[]];
type MappedType = { -readonly [K in "a" as string]-?: any };
type ConditionalType = any extends any ? any : any;
type Module = typeof import("react");
type TemplateLiteralType = `${string}`;

// アサーション
{
  const x = 1 as any;
  const y = 1 as const;
}

// スプレッド構文
{
  const { a, b: b2 = 0, ...others } = { a: 1, b: 2, ...o } as any;
  const [e1, e2, ...rest] = [1, 2, ...o];
  function func(...rest: any[]) {}
}

// モジュール
import React from "react";
import { useState } from "react";
import { useState as useState2 } from "react";
import * as React2 from "react";
import commonJs = require("react");
import AofNamespace = Namespace.A;

export default ooo;
export { ooo };
export { ooo as oooo };
export const namedExport = 1;
// @ts-ignore
export = {};
// @ts-ignore
export * as everything from "x";

// デコレータ
declare function deco(): any;
{
  @deco()
  class SomeClass {
    @deco() prop: any;
    method(@deco() param: any) {}
  }
}

// オーバーロード
{
  function func(a: number): number;
  function func(a: string): string;
  function func(a: any): any {}
}

// 型ガード
{
  function isFoo(v: any): v is any {
    return true;
  }
  function assertsFoo(v: any): asserts v is any {}
}

// 非同期
{
  async function foo() {
    await foo();
  }
}

// ジェネリクス
type A<T> = T;
type B<T extends any = any> = T;
function func1<T>(a: T): any {}
const func2 = <T, U>(a: T, b: U): any => {};

// JSX
function jsx() {
  return (
    <>
      <div className={ooo} {...{}}>
        <input type="checkbox" disabled /> text
      </div>
    </>
  );
}
