import * as base64 from "js-base64";
import pako from "pako";
import { useEffect, useState } from "react";
import { Point } from "./model";

type Loading = Readonly<{ loading: true }>;
type Loaded = Readonly<{
  loading: false;
  code?: string;
  saveCode: (code: string) => void;
  point?: Point;
}>;
type Return = Loading | Loaded;

const useStore = (): Return => {
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [point, setPoint] = useState<Point | undefined>(undefined);

  useEffect(() => {
    setCode(loadCode());
    setPoint(loadPoint());
    setLoading(false);
  }, []);

  return loading ? { loading } : { loading, code, saveCode, point };
};

export default useStore;

const loadCode = (): string | undefined => {
  const base64encodedCode = window.location.hash.replace(/^#/, "").trim();
  try {
    const decoded = base64.toUint8Array(base64encodedCode);
    const restored = pako.inflate(decoded, { to: "string" });
    return restored;
  } catch (e) {
    return undefined;
  }
};

const saveCode = (code: string): void => {
  const compressed = pako.deflate(code);
  const compressedEncoded = base64.fromUint8Array(compressed, true);
  const url = "#" + compressedEncoded;
  window.history.replaceState(null, "", url);
};

const loadPoint = (): Point | undefined => {
  const url = new URL(window.location.href);
  const lineString = url.searchParams.get("line");
  const columnString = url.searchParams.get("column");
  const intPattern = /^\d+$/;
  if (
    typeof lineString !== "string" ||
    typeof columnString !== "string" ||
    !intPattern.test(lineString) ||
    !intPattern.test(columnString)
  ) {
    return undefined;
  }
  const line = parseInt(lineString, 10);
  const column = parseInt(columnString, 10);
  return { line, column };
};
