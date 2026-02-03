export interface SourceItem {
  key: number;
  title: string;
  content: string;
  url?: string;
  favicon?: string;
  sourceType?: "internal" | "external";
  domain?: string;
  sourceName?: string;
}

const getCurrentHost = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hostname;
};

export const isExternalSource = (source: SourceItem): boolean => {
  if (source.sourceType) {
    return source.sourceType === "external";
  }
  if (!source.url) {
    return false;
  }
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost";
    const urlObj = new URL(source.url, baseUrl);
    const currentHost = getCurrentHost();
    const sourceHost = urlObj.hostname;
    if (!sourceHost || sourceHost === currentHost) {
      return false;
    }
    const internalDomains = [currentHost, "localhost", "127.0.0.1"].filter(
      Boolean,
    );
    if (internalDomains.some((domain) => sourceHost.includes(domain))) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
