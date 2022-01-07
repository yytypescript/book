module.exports = {
  "*.md": [
    "markdownlint --fix",
    "prettier --write",
    "markdownlint",
    "textlint",
  ],
  "*.{js,jsx,ts,tsx,json,json5,css,scss,graphql,gql,html,vue,yaml}":
    "prettier --write",
  "src/**/*.{ts,tsx}": [() => "tsc"],
};
