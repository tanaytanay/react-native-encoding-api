export type EncodingType = 'utf-8' | 'base64';

/**
 * Encodes a string using the specified encoding
 * @param text The text to encode
 * @param encoding The encoding to use
 * @returns The encoded string
 */
export function encode(text: string, encoding: EncodingType): string {
  switch (encoding) {
    case 'utf-8':
      return encodeURIComponent(text);
    case 'base64':
      return btoa(text);
    default:
      throw new Error(`Unsupported encoding: ${encoding}`);
  }
}

/**
 * Decodes a string using the specified encoding
 * @param text The text to decode
 * @param encoding The encoding to use
 * @returns The decoded string
 */
export function decode(text: string, encoding: EncodingType): string {
  switch (encoding) {
    case 'utf-8':
      return decodeURIComponent(text);
    case 'base64':
      return atob(text);
    default:
      throw new Error(`Unsupported encoding: ${encoding}`);
  }
} 