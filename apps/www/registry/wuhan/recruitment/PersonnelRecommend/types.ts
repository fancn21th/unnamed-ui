/**
 * 推荐类型枚举
 * 定义三种推荐级别
 */
export enum RecommendType {
  /** 优先选择 */
  PRIORITY = "priority",
  /** 备选 */
  ALTERNATIVE = "alternative",
  /** 不建议 */
  NOT_RECOMMENDED = "notRecommended",
}
