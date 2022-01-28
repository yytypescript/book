"use strict";

/**
 * @typedef {import("mdast").Root} Root
 */

const fs = require("fs");

/**
 * @type {(settings: [never]) => (node: Root) => void}
 */
const pageRef = () => (node) => {
  let linkFound = false;

  for (const [index, paragraph] of node.children.entries()) {
    if (paragraph.type !== "paragraph") {
      continue;
    }
    if (paragraph.children.length !== 1) {
      continue;
    }
    if (paragraph.children[0]?.type !== "link") {
      continue;
    }
    const link = paragraph.children[0];
    if (!link.url.startsWith("/")) {
      continue;
    }
    linkFound = true;
    node.children[index] = {
      type: /** @type {any} */ ("jsx"),
      value: `<PageRef link="${slugToFilename(link.url)}" slug="${
        link.url
      }" title="${link.title || link.url}" />`,
    };
  }

  if (linkFound) {
    node.children.unshift({
      type: /** @type {any} */ ("import"),
      value: 'import PageRef from "@site/src/components/PageRef";',
    });
  }
};

/**
 * @param {string} slug
 * @return {string}
 */
function slugToFilename(slug) {
  if (fs.existsSync(`./docs${slug}/README.md`)) {
    return `${slug}/README.md`;
  }
  return `${slug}.md`;
}

exports.pageRef = pageRef;
