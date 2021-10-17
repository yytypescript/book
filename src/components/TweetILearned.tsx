import React, { ReactElement, ReactNode } from "react";
import nl2br from "react-nl2br";

export default function TweetILearned({
  children,
}: {
  readonly children: ReactElement<{ readonly children: ReactNode[] }>;
}) {
  let texts: string = children.props.children
    .filter((child): child is string => typeof child === "string")
    .join("");
  texts += "\n\n『サバイバルTypeScript』より";
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
