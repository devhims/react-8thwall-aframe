import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
import { XR8Scripts } from 'react-8thwall-aframe';

export const metadata = {
  title: '8thWall Samples with Next.js',
  description:
    'Demonstrate the use of react-8thwall-aframe library with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <XR8Scripts xr8ApiKey={process.env.XR8_API_KEY} />
        <script
          type='module'
          src='https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js'
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
