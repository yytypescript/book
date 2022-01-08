import Link from "@docusaurus/Link";
import useThemeContext from "@theme/hooks/useThemeContext";
import clsx from "clsx";
import type * as monaco from "monaco-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/vsLight";
import * as React from "react";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import {
  findByPoint,
  Fragment,
  getTopicDetails,
  Point,
  Position,
} from "./model";
import useStore from "./useStore";

const reactDts = require("!!raw-loader!@types/react/index.d.ts").default;
const initialCode = "// ここに解読するコードを入力してください\n\n";

type CodeReadingAssistantProps = Readonly<{
  readme: ReactNode;
  loading?: ReactNode;
}>;

const CodeReadingAssistant: React.FC<CodeReadingAssistantProps> = ({
  readme,
  loading = "Loading...",
}) => {
  const store = useStore();
  if (store.loading) {
    return <>{loading}</>;
  }
  return (
    <Main
      readme={readme}
      initialCode={store.code ?? initialCode}
      initialPoint={store.point}
      saveCode={store.saveCode}
    />
  );
};

export default CodeReadingAssistant;

type MainProps = Readonly<{
  initialCode: string;
  initialPoint?: Point;
  saveCode: (code: string) => void;
}> &
  Pick<CodeReadingAssistantProps, "readme">;

const Main: React.FC<MainProps> = ({
  initialCode,
  initialPoint,
  saveCode,
  readme,
}) => {
  const { code, setCode, setPoint, position, fragments } = useFragments({
    initialCode,
    initialPoint,
  });
  const [secondaryHighlightedPosition, setSecondaryHighlightedPosition] =
    useState<Position | undefined>();
  const { isDarkTheme } = useThemeContext();

  return (
    <main
      className={clsx(
        styles.container,
        isDarkTheme ? styles.darkTheme : styles.theme
      )}
      data-clarity-mask="True"
    >
      <div className={styles.editorContainer}>
        <div className={styles.left}>
          <Editor
            code={code}
            setCode={(code) => {
              setCode(code);
              saveCode(code);
            }}
            setCursorPoint={setPoint}
            highlightedPosition={position}
            secondaryHighlightedPosition={secondaryHighlightedPosition}
          />
        </div>
        <div className={styles.right}>
          {fragments.length === 0 ? (
            readme
          ) : (
            <Fragments
              fragments={fragments}
              onSelectFragment={setSecondaryHighlightedPosition}
            />
          )}
        </div>
      </div>
    </main>
  );
};

type EditorProps = Readonly<{
  code: string;
  setCode: (code: string) => void;
  setCursorPoint: (point: Point) => void;
  highlightedPosition?: Position;
  secondaryHighlightedPosition?: Position;
}>;

const Editor: React.FC<EditorProps> = ({
  code,
  setCode,
  setCursorPoint,
  highlightedPosition,
  secondaryHighlightedPosition,
}) => {
  const { isDarkTheme } = useThemeContext();
  const monaco = useMonaco();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>();
  const [decorations, setDecorations] = useState<Array<string>>([]);

  useEffect(() => {
    if (containerRef.current) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.Latest,
        experimentalDecorators: true,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        noEmit: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: "React",
        allowNonTsExtensions: true,
        esModuleInterop: true,
        strict: true,
        typeRoots: ["node_modules/@types"],
      });
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        reactDts,
        `file:///node_modules/@types/react/index.d.ts`
      );
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
      monaco.editor.defineTheme("my-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: { "editor.background": "#18191a" },
      });
      monaco.editor.getModels().forEach((model) => model.dispose());
      const modelUri = monaco.Uri.file("code.tsx");
      const codeModel = monaco.editor.createModel(code, "typescript", modelUri);
      const editor = monaco.editor.create(containerRef.current, {
        theme: isDarkTheme ? "my-dark" : "light",
        minimap: { enabled: false },
        automaticLayout: true,
        glyphMargin: true,
      });
      editor.setModel(codeModel); //
      editor.onDidChangeModelContent(() => setCode(editor.getValue()));
      editor.onDidChangeCursorSelection(({ selection, source, reason }) => {
        if (
          (source === "mouse" ||
            reason === monaco.editor.CursorChangeReason.Explicit) &&
          selection.startLineNumber === selection.endLineNumber &&
          selection.startColumn === selection.endColumn
        ) {
          setCursorPoint({
            line: selection.startLineNumber,
            column: selection.startColumn,
          });
        }
      });
      editorRef.current = editor;
    }
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    if (!highlightedPosition) {
      const newDecorations = editorRef.current.deltaDecorations(
        decorations,
        []
      );
      setDecorations(newDecorations);
      return;
    }
    const decorationOptions: Array<monaco.editor.IModelDeltaDecoration> = [
      {
        range: new monaco.Range(
          highlightedPosition.start.line,
          highlightedPosition.start.column,
          highlightedPosition.end.line,
          highlightedPosition.end.column
        ),
        options: {
          inlineClassName: styles.highlighted,
          glyphMarginClassName: styles.glyphMargin,
        },
      },
    ];
    if (secondaryHighlightedPosition) {
      decorationOptions.push({
        range: new monaco.Range(
          secondaryHighlightedPosition.start.line,
          secondaryHighlightedPosition.start.column,
          secondaryHighlightedPosition.end.line,
          secondaryHighlightedPosition.end.column
        ),
        options: {
          inlineClassName: styles.highlighted,
          glyphMarginClassName: styles.glyphMargin,
        },
      });
    }
    const newDecorations = editorRef.current.deltaDecorations(
      decorations,
      decorationOptions
    );
    setDecorations(newDecorations);
  }, [highlightedPosition, secondaryHighlightedPosition]);

  useEffect(() => {
    editorRef.current?.updateOptions({
      theme: isDarkTheme ? "my-dark" : "light",
    });
  }, [isDarkTheme]);

  return <div ref={containerRef} style={{ height: "100%" }} />;
};

const useMonaco = (): typeof import("monaco-editor") => {
  return require("monaco-editor");
};

type FragmentsProps = Readonly<{
  fragments: ReadonlyArray<Fragment>;
}> &
  Pick<FragmentProps, "onSelectFragment">;

const Fragments: React.FC<FragmentsProps> = ({
  fragments,
  onSelectFragment,
}) => {
  const [last, ...parents] = [...fragments].reverse();
  return (
    <div>
      {last && (
        <div className={styles.firstFragment}>
          <div className={styles.firstFragment_title}>選択したコード</div>
          <FragmentItem fragment={last} onSelectFragment={onSelectFragment} />
        </div>
      )}
      {parents.length > 0 && (
        <div className={styles.otherFragments}>
          <div className={styles.otherFragments_title}>他の範囲のコード</div>
          {parents.map((fragment, key) => (
            <FragmentItem
              fragment={fragment}
              onSelectFragment={onSelectFragment}
              key={key}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type FragmentProps = Readonly<{
  fragment: Fragment;
  onSelectFragment: (position: Position | undefined) => void;
}>;

const FragmentItem: React.FC<FragmentProps> = ({
  fragment: { code, topics, position },
  onSelectFragment,
}) => {
  const details = getTopicDetails(topics);
  const maxLines = 3;
  const codeLines = code.split("\n");
  const firstThreeLines =
    codeLines.slice(0, maxLines).join("\n") +
    (codeLines.length > maxLines ? " ... " : "");
  return (
    <div
      className={styles.fragment}
      onMouseEnter={() => onSelectFragment(position)}
      onMouseLeave={() => onSelectFragment(undefined)}
    >
      <Code code={firstThreeLines} />
      {details.length > 0 && (
        <div>
          {details.map(({ topic, name, links }, key) => (
            <div className={styles.fragment_detail} key={key}>
              {details.length > 1 && (
                <div className={styles.fragment_detail_index}>{key + 1}</div>
              )}
              <div className={styles.fragment_detail_content}>
                <div>
                  <span className={styles.fragment_detail_name}>{name}</span>{" "}
                  <span className={styles.fragment_detail_topic}>
                    ({topic})
                  </span>
                </div>
                {links.length > 0 && (
                  <ul className={styles.fragment_detail_links}>
                    {links.map(({ name, url }, key) => (
                      <li
                        key={key}
                        className={styles.fragment_detail_links_item}
                      >
                        <Link to={url} target="_blank">
                          {name || url}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const useFragments = ({
  initialCode,
  initialPoint,
}: Readonly<{ initialCode: string; initialPoint?: Point }>) => {
  const [code, setCode] = useState<string>(initialCode);
  const [point, setPoint] = useState<Point | undefined>(initialPoint);
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const [fragments, setFragments] = useState<ReadonlyArray<Fragment>>([]);

  useEffect(() => {
    if (!point) return;
    const fragments = findByPoint(code, point);
    setFragments(fragments);
    const lastFragment = fragments.slice(-1)[0];
    setPosition(lastFragment?.position);
  }, [point]);

  useEffect(() => {
    setPoint(undefined);
    setPosition(undefined);
  }, [code]);

  return { code, setCode, setPoint, position, fragments };
};

const Code: React.FC<Readonly<{ code: string }>> = ({ code }) => {
  const { isDarkTheme } = useThemeContext();
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language="tsx"
      theme={isDarkTheme ? darkTheme : lightTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={clsx(className, styles.code)}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
