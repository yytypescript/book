/**
 * サバイバルTypeScriptのGPTsで利用する知識データを生成するスクリプト
 * https://chat.openai.com/g/g-EzVTRSzR7-sabaibarutypescript
 */

import fs from "fs";
import path from "path";

interface MarkdownPage {
  url: string;
  title: string;
  content: string;
}

/**
 * 指定したディレクトリ配下のMarkdownファイルを再帰的に検索
 */
function findMarkdownFiles(
  dirPath: string,
  arrayOfFiles: string[] = []
): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = findMarkdownFiles(dirPath + "/" + file, arrayOfFiles);
    } else if (file.endsWith(".md")) {
      // writing配下のファイルは除外
      if (dirPath.includes("writing")) {
        return arrayOfFiles;
      }
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

/**
 * Markdownファイルパスから必要な情報を抽出
 */
function extractContent(filePath: string): MarkdownPage | null {
  const content = fs.readFileSync(filePath, "utf8");
  const titleMatch = content.match(/^#\s(.+)/);
  const title = titleMatch ? titleMatch[1] : "Untitled";
  const urlPath = filePath
    .substring(filePath.indexOf("/docs/") + 1)
    .replace(/\.md$/, "")
    .replace(/\\/g, "/")
    .replace(/^docs\//, "https://typescriptbook.jp/");

  if (title) {
    return {
      title,
      content,
      url: urlPath,
    };
  }

  return null;
}

/**
 * 指定したディレクトリ配下のMarkdownファイルを処理
 */
async function processMarkdownFiles(dirPath: string) {
  const markdownFiles = findMarkdownFiles(dirPath);
  const pages: MarkdownPage[] = [];

  markdownFiles.forEach((filePath) => {
    const page = extractContent(filePath);
    if (page) {
      pages.push(page);
    }
  });

  return pages;
}

/**
 * docs.jsonを生成
 */
async function createDocsJson() {
  const docsPath = path.join(__dirname, "..", "docs"); // このパスはプロジェクトに合わせて調整してください。
  const pages = await processMarkdownFiles(docsPath);
  const json = JSON.stringify({ docs: pages }, null, 2);
  fs.writeFileSync(path.join(__dirname, "docs.json"), json);
  console.log("docs.json has been written");
}

// メイン処理
async function main() {
  await createDocsJson();
}

main().catch(console.error);
