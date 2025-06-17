import type {
  LoadContext,
  Plugin,
  Preset,
  PresetConfig,
} from "@docusaurus/types";
import type { Options as PresetClassicOptions } from "@docusaurus/preset-classic";
import themePlugin from "./theme";
import remarkPlugin from "./remark";

type Options = object;

export default function presetPageRef(
  context: LoadContext,
  opts: Options = {},
): Preset {
  injectRemarkPlugin(context.siteConfig.presets);
  return {
    themes: [themePlugin],
  };
}

function isClassicPreset(
  preset: PresetConfig,
): preset is [string, PresetClassicOptions] {
  if (!Array.isArray(preset)) {
    return false;
  }
  const [name] = preset;
  if (typeof name !== "string") {
    return false;
  }
  if (!(name === "classic" || name === "@docusaurus/preset-classic")) {
    return false;
  }
  const options = preset[1];
  if (typeof options !== "object" || options === null) {
    return false;
  }
  return true;
}

function injectRemarkPlugin(presets: ReadonlyArray<PresetConfig>): void {
  for (const preset of presets) {
    if (!isClassicPreset(preset)) {
      continue;
    }

    const options = preset[1];
    if (options.docs) {
      options.docs.remarkPlugins ??= [];
      options.docs.remarkPlugins.push([remarkPlugin, {}]);
    }
  }
}
