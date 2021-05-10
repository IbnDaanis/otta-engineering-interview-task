export const compareSetSimilarity = (first: Set<string>, second: Set<string>): number => {
  let common: number = 0
  for (const a of first) {
    if (second.has(a)) common++
  }
  return common
}
