# react-native-encoding-api

A React Native package for handling text encoding and decoding operations.

## Installation

```bash
npm install react-native-encoding-api
# or
yarn add react-native-encoding-api
```

## Usage

```typescript
import { encode, decode } from 'react-native-encoding-api';

// Example usage
const encoded = encode('Hello World', 'base64');
const decoded = decode(encoded, 'base64');
```

## Features

- Support for various encoding formats (UTF-8, Base64, etc.)
- TypeScript support
- React Native compatible

## License

MIT 