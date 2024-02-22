import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const constants = {
  BASEURL: 'https://coderdiaz.com'
}

/**
 * Merges class names using tailwind-merge and clsx
 * @param inputs A list of class names to be merged
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an absolute url from a given path
 * @param path The path to be appended to the base url
 * @returns The absolute url
 */
export const generateAbsoluteUrl = (path: string) => constants.BASEURL.concat(path);