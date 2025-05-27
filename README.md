# react-native-encoding-api

[![npm version](https://img.shields.io/npm/v/react-native-encoding-api.svg)](https://www.npmjs.com/package/react-native-encoding-api)
[![npm downloads](https://img.shields.io/npm/dm/react-native-encoding-api.svg)](https://www.npmjs.com/package/react-native-encoding-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform - iOS](https://img.shields.io/badge/platform-iOS-blue.svg)](https://www.apple.com/ios/)
[![Platform - Android](https://img.shields.io/badge/platform-Android-green.svg)](https://www.android.com/)
[![Platform - macOS](https://img.shields.io/badge/platform-macOS-black.svg)](https://www.apple.com/macos/)

A complete implementation of the Web API's TextEncoder and TextDecoder for React Native. This package provides both encoding and decoding functionality with the exact same API and behavior as the Web API.

## Requirements

- React Native >= 0.60.0
- TypeScript >= 4.0.0 (for TypeScript projects)

## Installation

```bash
npm install react-native-encoding-api
# or
yarn add react-native-encoding-api
```

## Usage

```typescript
import { TextEncoder, TextDecoder } from 'react-native-encoding-api';

// Encoding text to bytes
const encoder = new TextEncoder();
const bytes = encoder.encode('Hello World!');

// Decoding bytes back to text
const decoder = new TextDecoder();
const text = decoder.decode(bytes);
console.log(text); // Output: "Hello World!"
```

## API

### TextEncoder
```typescript
new TextEncoder()
```
- `encode(text: string): Uint8Array`: Encodes a string into UTF-8 bytes

### TextDecoder
```typescript
new TextDecoder(encoding?: string, options?: { fatal?: boolean; ignoreBOM?: boolean })
```
- `encoding` (optional): Currently only 'utf-8' is supported
- `options` (optional):
  - `fatal`: If true, throws an error for invalid UTF-8 sequences
  - `ignoreBOM`: If true, ignores the UTF-8 BOM (Byte Order Mark)
- `decode(input: Uint8Array): string`: Decodes a Uint8Array into a string

## License

MIT 