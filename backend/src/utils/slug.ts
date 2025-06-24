/**
 * Format some text into slug.
 * @param text String object.
 * @returns String with slug format.
 */
export const createSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}