export const getTextStats = (text: string): { symbols: number, words: number, sentences: number, lines: number } => {
  const symbols = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.match(/[^.!?]*[.!?]*\s*/g)?.filter((s) => s.trim().length > 0).length ?? 0;
  const lines = text.split('\n').length;

  return { symbols, words, sentences, lines };
};

export const toSentenceCase = (text: string): string => {
  if (!text) return '';
  const sentences = text.match(/[^.!?]*[.!?]*\s*/g) ?? [];
  return sentences
    .map((sentence) => {
      return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
    })
    .join('');
};

export const toCapitalizedCase = (text: string): string => {
  if (!text) return '';
  return text
    .split(/(\s+)/) // Split by spaces, preserving them as separate tokens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};


export const toTitleCase = (text: string): string => {
  if (!text) return '';
  const smallWords = new Set(['a', 'an', 'and', 'the', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'to', 'from']);
  return text
    .split(/(\s+)/) // Split by spaces, preserving them as separate tokens
    .map((word, index) =>
      smallWords.has(word.toLowerCase()) && index !== 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
};

/**
 * Removes excessive spaces from the text, leaving only single spaces between words.
 * Trims leading and trailing spaces.
 * @param text - The input string.
 * @returns The cleaned string with single spaces.
 */
export const removeExcessiveSpaces = (text: string): string => {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
};