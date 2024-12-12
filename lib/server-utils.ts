'use server';

import { setTimeout } from 'timers/promises';

/**
 * Ensures that the execution time of a block of code takes at least a specified minimum duration.
 *
 * @param {number} startTime - The timestamp (in milliseconds) at the start of the execution, typically obtained using `Date.now()`.
 * @param {number} minDuration - The minimum duration (in milliseconds) that the code block should take. If the code execution completes faster than this duration, the function will delay the completion to match the minimum duration.
 * @returns {Promise<void>} A promise that resolves when the total execution time has reached the minimum duration.
 *
 * @example
 * const startTime = Date.now();
 * // Perform some asynchronous operations...
 * await enforceMinExecutionTime(startTime, 3000); // Ensures at least 3 seconds have passed since `startTime`.
 */
export const enforceMinExecutionTime = async (startTime: number, minDuration: number): Promise<void> => {
  const elapsed = Date.now() - startTime;
  const wait = minDuration - elapsed;
  if (wait > 0) {
    await setTimeout(wait);
  }
};
