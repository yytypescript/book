import React from "react";
import HtmlNavbarItem from "@theme-original/NavbarItem/HtmlNavbarItem";
import { Props } from "@theme/NavbarItem/HtmlNavbarItem";
import { Bot } from "../../../components/icons/Bot";

export default function HtmlNavbarItemWrapper(props: Props) {
  if (props.value === "custom-ask-to-ai-link") {
    return (
      <div className="navbar__item">
        <a
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: "4px 16px",
            borderRadius: "48px",
            gap: "4px",
          }}
          href="https://chat.openai.com/g/g-EzVTRSzR7-sabaibarutypescript"
          target="_blank"
          rel="noreferrer noopener"
          className="navbar__link button button--primary"
        >
          <Bot />
          AIに質問する
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
        </a>
      </div>
    );
  }

  return <HtmlNavbarItem {...props} />;
}
