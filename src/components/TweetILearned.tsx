import React from "react";
import nl2br from "react-nl2br";

export default function TweetILearned({
  children,
}: {
  readonly children: Child | Child[];
}) {
  const texts = extractText(children) + "\n\n『サバイバルTypeScript』より";
  return (
    <div className="admonition admonition-tip alert alert--info">
      <div className="admonition-heading">
        <h5>学びをシェアする</h5>
      </div>
      <div className="admonition-content">
        <p>{nl2br(texts)}</p>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            texts
          )}`}
          target="_blank"
          className="button button--info"
          style={{ textDecoration: "none" }}
        >
          この内容をツイートする
        </a>
      </div>
    </div>
  );
}

function extractText(children: Child | Child[]): string {
  if (Array.isArray(children)) {
    return children
      .map((child) => extractTextFromChild(child.props))
      .join("\n\n");
  } else {
    return extractTextFromChild(children.props);
  }
}

function extractTextFromChild(props: Child["props"]): string {
  if (isParagraph(props)) {
    const { children } = props;
    if (typeof children === "string") {
      return children;
    }
    return children.filter((x): x is string => typeof x === "string").join("");
  } else {
    return props.map((x) => extractTextFromChild(x)).join("\n\n");
  }
}

type Child = {
  readonly props: Paragraph | ReadonlyArray<Paragraph>;
};

type Paragraph = {
  readonly mdxType: "p";
  readonly children: string | ReadonlyArray<string | object>;
};

function isParagraph(value: Child["props"]): value is Paragraph {
  return (
    typeof value === "object" && (value as Partial<Paragraph>).mdxType === "p"
  );
}
