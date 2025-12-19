// 仅用于 demo 占位时间：12:25 起，每条消息 +1 分钟
export function getTimeForIndex(index: number) {
  const baseMinutes = 12 * 60 + 25 + index;
  const hh = String(Math.floor(baseMinutes / 60)).padStart(2, "0");
  const mm = String(baseMinutes % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}


