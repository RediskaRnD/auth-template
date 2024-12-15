import { titleCase } from 'title-case';

export type TextStats = {
  symbols: number;
  words: number;
  sentences: number;
  lines: number;
};

export const getTextStats = (text: string): TextStats => {
  const symbols = text.length;
  const words = text.trim() ? text.trim().split(/\s+/g).length : 0;
  const sentences = text.match(/[^.!?]*[.!?]*\s*/g)?.filter((s) => s.trim().length > 0).length ?? 0;
  const lines = text ? text.split('\n').length : 0;

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

export const toUpperCase = (text: string): string => {
  return text.toUpperCase();
};

export const toLowerCase = (text: string): string => {
  return text.toLowerCase();
};

export const toCapitalizedCase = (text: string): string => {
  if (!text) return '';
  return text
    .split(/(\s+)/g) // Split by spaces, preserving them as separate tokens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

export const toTitleCase = (text: string): string => {
  if (!text) return '';
  return titleCase(text.toLowerCase());
};

/**
 * Removes excessive spaces from the text, leaving only single spaces between words.
 * Trims leading and trailing spaces.
 * @param text - The input string.
 * @returns The cleaned string with single spaces.
 */
export const removeExcessiveSpaces = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/[^\S\r\n]+/g, ' ')
    .trim();
};

export const removeEmptyLines = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/^[\r\t\f\v ]*\n/gm, '');
};