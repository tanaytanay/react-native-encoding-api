# react-native-encoding-api

A complete implementation of the Web API's TextEncoder and TextDecoder for React Native. This package provides both encoding and decoding functionality with the exact same API and behavior as the Web API.

## Installation

```bash
npm install react-native-encoding-api
# or
yarn add react-native-encoding-api
```

## Usage in React Native

### Basic Usage
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

### Common Use Cases

1. **Encoding/Decoding API Data**
```typescript
import { TextEncoder, TextDecoder } from 'react-native-encoding-api';

async function sendAndReceiveData() {
  try {
    // Encoding data to send
    const encoder = new TextEncoder();
    const data = { message: 'Hello!' };
    const bytes = encoder.encode(JSON.stringify(data));

    // Sending data
    const response = await fetch('https://api.example.com/data', {
      method: 'POST',
      body: bytes
    });

    // Decoding response
    const buffer = await response.arrayBuffer();
    const responseBytes = new Uint8Array(buffer);
    const decoder = new TextDecoder();
    const responseText = decoder.decode(responseBytes);
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

2. **Working with Binary Data**
```typescript
import { TextEncoder, TextDecoder } from 'react-native-encoding-api';

// Example: Reading and writing files
const readAndWriteFile = async (uri: string, content: string) => {
  try {
    // Encoding content to write
    const encoder = new TextEncoder();
    const bytes = encoder.encode(content);

    // Writing to file
    await fetch(uri, {
      method: 'PUT',
      body: bytes
    });

    // Reading from file
    const response = await fetch(uri);
    const buffer = await response.arrayBuffer();
    const readBytes = new Uint8Array(buffer);
    const decoder = new TextDecoder();
    return decoder.decode(readBytes);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

3. **WebSocket Communication**
```typescript
import { TextEncoder, TextDecoder } from 'react-native-encoding-api';

const ws = new WebSocket('wss://example.com');
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Sending data
ws.onopen = () => {
  const data = { type: 'message', content: 'Hello!' };
  const bytes = encoder.encode(JSON.stringify(data));
  ws.send(bytes);
};

// Receiving data
ws.onmessage = (event) => {
  const bytes = new Uint8Array(event.data);
  const text = decoder.decode(bytes);
  console.log('Received:', text);
};
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

## Features

- Complete implementation of both TextEncoder and TextDecoder
- Exact match to the Web API behavior
- Handles UTF-8 BOM (Byte Order Mark)
- Proper error handling for invalid UTF-8 sequences
- Support for all UTF-8 byte sequences (1-4 bytes)
- Proper handling of surrogate pairs for characters outside the BMP
- TypeScript support
- React Native compatible

## License

MIT 