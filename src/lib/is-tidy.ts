export default function isTidy(data: any): data is Record<string, any>[] {
  if (!Array.isArray(data) || data.length === 0) return false;
  const keys = Object.keys(data[0]);
  return data.every(d =>
    typeof d === "object" &&
    !Array.isArray(d) &&
    Object.keys(d).length === keys.length &&
    keys.every(k => k in d)
  );
}
