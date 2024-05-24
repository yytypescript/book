"use strict";

/**
 * @typedef {import("mdast").Root} Root
 */

/**
 * @type {(settings: [never]) => (node: Root) => void}
 */
exports.postILearned = () => (node) => {
  node.children.unshift({
    type: /** @type {any} */ ("import"),
    value:
      'import PostILearned from "@site/src/components/postILearned/postILearned";',
  });
};
