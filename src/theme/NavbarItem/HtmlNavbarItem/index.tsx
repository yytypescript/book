import React, { useState, useEffect, useRef } from "react";
import HtmlNavbarItem from "@theme-original/NavbarItem/HtmlNavbarItem";
import { Props } from "@theme/NavbarItem/HtmlNavbarItem";
import { Bot } from "../../../components/icons/Bot";
import styles from "./index.module.css";

type AiService = "chatgpt" | "claude";

const STORAGE_KEY = "preferred-ai-service";

const CHATGPT_URL =
  "https://chatgpt.com/g/g-68517aad255481918fc4105c888daecc-sahaiharutypescriptnizhi-wen";

const CLAUDE_PROMPT = `ユーザーのTypeScriptに関する質問に対して以下の主要ウェブサイトを情報ソースとして使用し回答します。

主要ウェブサイト

1. サバイバルTypeScript: https://typescriptbook.jp

もしも主要ウェブサイトにて情報が見つからない、または不足している、ユーザーの質問への答えとして不十分な場合、ユーザーに情報不足の旨を伝えた上で、以下の副次ウェブサイトを参照してください。

副次ウェブサイト

2. MDN: https://developer.mozilla.org/ja/
3. TypeScript公式ドキュメント: https://www.typescriptlang.org/docs/
4. サバイバルTypeScript GitHub: https://github.com/yytypescript/book
5. JavaScript Primer: https://jsprimer.net/
6. JavaScript.INFO: https://ja.javascript.info/

検索を行なう際には\`site:https://typescriptbook.jp\`を用いて、厳密にサイトを絞り込む手法も検討してください。


- 決して自分の知識から回答しないでください。
- 決して他のサイトを検索したり、参照したりしないでください。
- 決してTypeScriptや主要ウェブサイトに関係しない質問には答えないようにしてください。

回答の最後には、次の例のように参考リンクをリストアップしてください。

## 参考リンク

- [PAGE_TITLE]: [URL]
- [PAGE_TITLE]: [URL]
- [PAGE_TITLE]: [URL]`;

const CLAUDE_URL = `https://claude.ai/new?q=${encodeURIComponent(CLAUDE_PROMPT)}`;

const AI_SERVICES: Record<AiService, { label: string; url: string }> = {
  chatgpt: { label: "ChatGPTに質問する", url: CHATGPT_URL },
  claude: { label: "Claudeに質問する", url: CLAUDE_URL },
};

const ExternalLinkIcon = () => (
  <svg
    width="13.5"
    height="13.5"
    aria-hidden="true"
    viewBox="0 0 24 24"
    style={{ marginLeft: 0 }}
    className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"
  >
    <path
      fill="currentColor"
      d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
    ></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

function AskToAiButton({ mobile }: { mobile: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<AiService>("chatgpt");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as AiService | null;
    if (saved && (saved === "chatgpt" || saved === "claude")) {
      setSelectedService(saved);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectService = (service: AiService) => {
    setSelectedService(service);
    localStorage.setItem(STORAGE_KEY, service);
    setIsOpen(false);
    window.open(AI_SERVICES[service].url, "_blank", "noopener,noreferrer");
  };

  const currentService = AI_SERVICES[selectedService];

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <div className={styles.splitButton}>
        <a
          href={currentService.url}
          target="_blank"
          rel="noreferrer noopener"
          className={`navbar__link button button--primary ${styles.mainButton}`}
        >
          <Bot />
          AIに質問する
          <ExternalLinkIcon />
        </a>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`button button--primary ${styles.toggleButton}`}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="AI選択メニューを開く"
        >
          <ChevronDownIcon />
        </button>
      </div>

      {isOpen && (
        <div className={styles.menu}>
          {(Object.keys(AI_SERVICES) as AiService[]).map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => handleSelectService(service)}
              className={`${styles.menuItem} ${selectedService === service ? styles.menuItemSelected : ""}`}
            >
              {AI_SERVICES[service].label}
              {selectedService === service && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HtmlNavbarItemWrapper(props: Props) {
  // モバイルの場合はメニューのリスト項目として表示するためにラップする要素を変更
  const Item = ({ children }: { children: React.ReactNode }) =>
    props.mobile ? (
      <li className="menu__list-item">{children}</li>
    ) : (
      <div className="navbar__item">{children}</div>
    );

  if (props.value === "custom-ask-to-ai-link") {
    return (
      <Item>
        <AskToAiButton mobile={props.mobile ?? false} />
      </Item>
    );
  }

  return <HtmlNavbarItem {...props} />;
}
