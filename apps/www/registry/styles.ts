export const STYLES = [{ name: "wuhan" as const, title: "Wuhan" }] as const;

export type Style = (typeof STYLES)[number];

export async function getActiveStyle() {
  // In the future, this can read from cookies, session, etc.
  return STYLES[0];
}

export function getStyle(name: string) {
  return STYLES.find((style) => style.name === name);
}
