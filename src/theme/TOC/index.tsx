import React from "react";
import clsx from "clsx";
import TOCItems from "@theme/TOCItems";
import type { Props } from "@theme/TOC";
import styles from "./styles.module.css";

const LINK_CLASS_NAME = "table-of-contents__link toc-highlight";
const LINK_ACTIVE_CLASS_NAME = "table-of-contents__link--active";

export default function TOC({ className, ...props }: Props): JSX.Element {
  return (
    <div className={clsx(styles.tableOfContents, "thin-scrollbar", className)}>
      <a
        href="https://2026.tskaigi.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.tocBanner}
      >
        <img
          src="/img/sponsors/tskaigi2026-banner.png"
          alt="TSKaigi 2026 — 2026年5月22日-23日 ベルサール羽田空港にて開催"
          className={styles.tocBannerImage}
        />
      </a>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
