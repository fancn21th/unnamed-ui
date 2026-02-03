export const findFirstForbiddenCharIndex = (() => {
  // 预定义常量，避免重复创建
  const FORBIDDEN_CHARS = new Set([
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "（",
    "）",
    "「",
    "」",
    "。",
    "，",
  ]);
  const CHINESE_REGEX = /[\u4e00-\u9fa5]/;

  let segmenter: any = null;

  // 检查是否支持 Intl.Segmenter
  const isSegmenterSupported = (): boolean => {
    return (
      typeof window !== "undefined" &&
      "Intl" in window &&
      "Segmenter" in (Intl as any)
    );
  };

  // 获取或初始化 segmenter
  const getSegmenter = (): any => {
    if (segmenter !== null) return segmenter;

    if (isSegmenterSupported()) {
      try {
        segmenter = new (Intl as any).Segmenter("zh", {
          granularity: "grapheme",
        });
      } catch {
        segmenter = null;
      }
    }
    return segmenter;
  };

  // 检查字符是否为禁止字符
  const isForbiddenChar = (char: string): boolean => {
    return FORBIDDEN_CHARS.has(char) || CHINESE_REGEX.test(char);
  };

  return (str: string): number => {
    // 简化的空值检查
    if (!str) return -1;

    const seg = getSegmenter();

    // 使用 Intl.Segmenter 进行 Unicode 感知处理
    if (seg) {
      let index = 0;
      for (const segment of seg.segment(str)) {
        const char = segment.segment;
        if (isForbiddenChar(char)) return index;
        index += char.length;
      }
    } else {
      // 降级到直接字符遍历
      for (let i = 0; i < str.length; i++) {
        if (isForbiddenChar(str[i])) return i;
      }
    }

    return -1;
  };
})();
