export function clamp(min, value, max) {
  return Math.min(max, Math.max(min, value))
}