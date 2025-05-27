/**
 * A drop-in replacement for the native TextEncoder/TextDecoder that's missing in React Native.
 * Provides the exact same API and behavior as the Web API's TextEncoder/TextDecoder.
 */

export class TextEncoder {
  /**
   * Encodes a string into UTF-8 bytes
   * @param text The text to encode
   * @returns A Uint8Array containing the UTF-8 encoded bytes
   */
  encode(text: string): Uint8Array {
    const bytes = new Uint8Array(text.length * 4); // Maximum possible size
    let i = 0;
    let j = 0;

    while (i < text.length) {
      const charCode = text.charCodeAt(i++);

      if (charCode < 0x80) {
        bytes[j++] = charCode;
      } else if (charCode < 0x800) {
        bytes[j++] = 0xC0 | (charCode >> 6);
        bytes[j++] = 0x80 | (charCode & 0x3F);
      } else if (charCode < 0xD800 || charCode >= 0xE000) {
        bytes[j++] = 0xE0 | (charCode >> 12);
        bytes[j++] = 0x80 | ((charCode >> 6) & 0x3F);
        bytes[j++] = 0x80 | (charCode & 0x3F);
      } else {
        // Surrogate pair
        const nextCharCode = text.charCodeAt(i++);
        const codePoint = ((charCode - 0xD800) << 10) + (nextCharCode - 0xDC00) + 0x10000;
        bytes[j++] = 0xF0 | (codePoint >> 18);
        bytes[j++] = 0x80 | ((codePoint >> 12) & 0x3F);
        bytes[j++] = 0x80 | ((codePoint >> 6) & 0x3F);
        bytes[j++] = 0x80 | (codePoint & 0x3F);
      }
    }

    return bytes.slice(0, j);
  }
}

export class TextDecoder {
  private encoding: string;
  private fatal: boolean;
  private ignoreBOM: boolean;

  constructor(encoding: string = 'utf-8', options: { fatal?: boolean; ignoreBOM?: boolean } = {}) {
    this.encoding = encoding.toLowerCase();
    this.fatal = options.fatal || false;
    this.ignoreBOM = options.ignoreBOM || false;

    if (this.encoding !== 'utf-8') {
      throw new Error('Only UTF-8 encoding is supported');
    }
  }

  /**
   * Decodes a Uint8Array into a string using UTF-8 encoding
   * @param bytes The input array to decode
   * @returns The decoded string
   */
  decode(bytes: Uint8Array): string {
    if (!(bytes instanceof Uint8Array)) {
      throw new TypeError('Expected Uint8Array');
    }

    let result = '';
    let i = 0;

    // Handle BOM if present and not ignored
    if (!this.ignoreBOM && bytes.length >= 3 && 
        bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
      i = 3;
    }

    while (i < bytes.length) {
      const byte1 = bytes[i++];

      if (byte1 < 0x80) {
        result += String.fromCharCode(byte1);
      } else if (byte1 < 0xE0) {
        if (i >= bytes.length) {
          if (this.fatal) throw new Error('Invalid UTF-8 sequence');
          break;
        }
        const byte2 = bytes[i++];
        if ((byte2 & 0xC0) !== 0x80) {
          if (this.fatal) throw new Error('Invalid UTF-8 sequence');
          continue;
        }
        result += String.fromCharCode(((byte1 & 0x1F) << 6) | (byte2 & 0x3F));
      } else if (byte1 < 0xF0) {
        if (i + 1 >= bytes.length) {
          if (this.fatal) throw new Error('Invalid UTF-8 sequence');
          break;
        }
        const byte2 = bytes[i++];
        const byte3 = bytes[i++];
        if ((byte2 & 0xC0) !== 0x80 || (byte3 & 0xC0) !== 0x80) {
          if (this.fatal) throw new Error('Invalid UTF-8 sequence');
          continue;
        }
        result += String.fromCharCode(
          ((byte1 & 0x0F) << 12) |
          ((byte2 & 0x3F) << 6) |
          (byte3 & 0x3F)
        );
      } else if (byte1 < 0xF5) {
        if (i + 2 >= bytes.length) {
          if (this.fatal) throw new Error('Invalid UTF-8 sequence');
          break;
        }
        const byte2 = bytes[i++];
        const byte3 = bytes[i++];
        const byte4 = bytes[i++];
        if ((byte2 & 0xC0) !== 0x80 || (byte3 & 0xC0) !== 0x80 || (byte4 & 0xC0) !== 0x80) {
          if (this.fatal) throw new Error('Invalid UTF-8 sequence');
          continue;
        }
        const codepoint =
          ((byte1 & 0x07) << 18) |
          ((byte2 & 0x3F) << 12) |
          ((byte3 & 0x3F) << 6) |
          (byte4 & 0x3F);
        
        if (codepoint > 0x10FFFF) {
          if (this.fatal) throw new Error('Invalid UTF-8 sequence');
          continue;
        }

        if (codepoint < 0x10000) {
          result += String.fromCharCode(codepoint);
        } else {
          const offset = codepoint - 0x10000;
          result += String.fromCharCode(
            0xD800 + (offset >> 10),
            0xDC00 + (offset & 0x3FF)
          );
        }
      } else {
        if (this.fatal) throw new Error('Invalid UTF-8 sequence');
        continue;
      }
    }

    return result;
  }
} 