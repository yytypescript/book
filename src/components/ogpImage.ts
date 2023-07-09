import { useDoc } from "./useDoc";

export function useOgpImageUrl(): string {
  const { metadata, frontMatter, assets } = useDoc();
  return assets.image ?? frontMatter.image ?? getOgpImageUrl(metadata.title);
}

export const getOgpImageUrl = (title: string): string =>
  `https://tsbook-og-image.vercel.app/${encodeURIComponent(
    title
  )}.png?pattern=cross&md=0&fontSize=75px&textColor=%23ffffff&textStrongColor=%238340BB&overlay=https%3A%2F%2Fraw.githubusercontent.com%2Fyytypescript%2Fog-image%2Fmain%2Fpublic%2Fogp-overlay.svg`;
