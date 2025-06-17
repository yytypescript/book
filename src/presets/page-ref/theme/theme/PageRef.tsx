import DocCard from "@theme/DocCard";
import {
  useDoc,
  useDocById,
  useVersions,
} from "@docusaurus/plugin-content-docs/client";

export default function PageRef(props: {
  readonly path: string;
}) {
  const {
    metadata: { version, source },
  } = useDoc();
  const versions = useVersions("default");
  const versionData = versions.find(({ name }) => name === version);
  if (!versionData) {
    throw new Error(
      `Version ${version} not found in versions in ${source} for path ${props.path}`,
    );
  }
  const doc = versionData.docs.find((doc) => doc.path === props.path);
  if (!doc) {
    throw new Error(
      `Doc with path ${props.path} not found in version ${version} in ${source}`,
    );
  }
  const { id } = doc;
  const docInfo = useDocById(id);
  return (
    <DocCard
      item={{ type: "link", href: props.path, label: docInfo.title, docId: id }}
    />
  );
}
