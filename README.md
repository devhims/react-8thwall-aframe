# react-8thwall-aframe

A lightweight package to integrate 8th Wall WebAR capabilities into React applications. This package streamlines the process of including necessary scripts, managing script loading states, and registering A-Frame components, making it easier to create engaging WebAR experiences in React apps.

## Features

- Easy integration of 8th Wall and other 3d scripts in React applications
- Hooks for managing WebAR script loading states and Aframe component registration
- Built-in support for custom Draco compressed gltf/glb models
- TypeScript batteries included 🔋

## Installation

```sh
npm install react-8thwall-aframe
```

## Usage

### 1. XR8Scripts Component

The XR8Scripts component should be placed in the <head> of your document to load all necessary 8th Wall scripts. Example usage in Nextjs 14 (app router):

```jsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { XR8Scripts } from 'react-8thwall-aframe';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang='en'>
      <head>
        <XR8Scripts xr8ApiKey='' /> // include the api key
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 2. useXR8Ready Hook

The useXR8Ready hook checks if the 8th Wall scripts are loaded and the Draco loader is initialized.

```jsx
import { useXR8Ready } from 'react-8thwall';

function ARComponent() {
  const { xrReady, dracoReady, error } = useXR8Ready();

  if (error) return <div>Error: {error.message}</div>;
  if (!xrReady || !dracoReady) return <div>Loading AR...</div>;

  return <div>{/* the view along with the aframe scene */}</div>;
}
```

### 3. useAFrameComponents Hook

The `useAFrameComponents` hook allows you to register custom A-Frame components easily. It follows a naming convention where the key in the components object is the name of the component (in kebab-case) as it will be used in A-Frame, and the value is the component object itself.

```jsx
import { useAFrameComponents } from 'react-8thwall';

const sampleComponent = {
  init: function () {
    // Your component initialization logic
  },
  update: function () {
    // Logic for when component data changes
  },
  // Other A-Frame component lifecycle methods
};

function ARScene() {
  const components = {
    'sample-component': sampleComponent,
    // Add other components here, following the 'component-name': componentObject pattern
  };
  const componentsRegistered = useAFrameComponents(components);

  if (!componentsRegistered) {
    return <div>Loading components...</div>;
  }

  return (
    <a-scene>
      <a-entity sample-component></a-entity>
    </a-scene>
  );
}
```

## Examples

This repository includes a sample Next.js 14 project demonstrating how to use `react-8thwall-aframe` library in a React application. To run the example:

1. Clone this repository
2. Navigate to the example directory: `cd react-8thwall-aframe/example`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

**Note:** You'll need to provide your own 8th Wall API key in the example project's `layout.js` file and add the domain to list of authorised domains for the self-hosted project in 8thwall editor.

Here are some examples of available using react-8thwall-aframe:

1. **Animation Sample:** Explore 8th Wall WebAR animations in React
2. **Custom Component:** Learn how to create custom A-Frame components
3. **Interaction Example:** Discover interactive WebAR experiences

Each of these examples demonstrates different aspects of WebAR development using `react-8thwall-aframe`, showcasing the package's capabilities in creating engaging and interactive AR content.

## API Reference

### XR8Scripts

#### Props:

- `xr8ApiKey` (required): Your 8th Wall API key
- `remoteJsChannel` (optional): Channel for remote debugging
- `aframeVersion` (optional): Specify A-Frame version (default: '1.3.0')
- `aframeExtrasVersion` (optional): Specify A-Frame Extras version (default: '6.1.1')

### useXR8Ready

#### Parameters:

- `customPath` (optional): Custom path for Draco decoder

Returns an object with:

- `xrReady`: Boolean indicating if XR scripts are ready
- `dracoReady`: Boolean indicating if Draco loader is ready
- `error`: Error object if an error occurred, null otherwise

### useAFrameComponents

#### Parameters:

- components: An object where keys are component names and values are component definitions

Returns:

- `true` when components are registered

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
