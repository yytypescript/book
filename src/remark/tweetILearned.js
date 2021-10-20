"use strict";

/**
 * @typedef {import("mdast").Root} Root
 */

/**
 * @type {(settings: [never]) => (node: Root) => void}
 */
exports.tweetILearned = () => (node) => {
  node.children.unshift({
    type: /** @type {any} */ ("import"),
    value: 'import TweetILearned from "@site/src/components/TweetILearned";',
  });
};
