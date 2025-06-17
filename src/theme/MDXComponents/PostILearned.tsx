import nl2br from "react-nl2br";

export default function PostILearned({
  text,
}: {
  readonly text: string;
}) {
  const textWithBookName = `${text.trim()}\n\n『サバイバルTypeScript』より`;
  return (
    <div className="admonition admonition-tip alert alert--info margin-top--md margin-bottom--md">
      <div className="admonition-heading">
        <h5>学びをシェアする</h5>
      </div>
      <div className="admonition-content">
        <p>{nl2br(textWithBookName)}</p>
        <a
          href={`https://x.com/intent/post?text=${encodeURIComponent(textWithBookName)}`}
          target="_blank"
          className="button button--info"
          style={{ textDecoration: "none" }}
          rel="noreferrer"
        >
          この内容をXにポストする
        </a>
      </div>
    </div>
  );
}
