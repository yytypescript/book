---
sidebar_label: クラスの継承
---

# クラスの継承 (inheritance)

JavaScriptのクラスも他のクラスを持つ言語と同じように、`extends`キーワードで継承ができます。

```javascript
class Parent {}
class Child extends Parent {}
```

サブクラスにコンストラクタを書く場合、スーパークラスのコンストラクタは必ず呼び出す必要があります。スーパークラスのコンストラクタは`super()`で呼び出します。

```javascript
class Parent {}
class Child extends Parent {
  constructor() {
    super();
  }
}
```
