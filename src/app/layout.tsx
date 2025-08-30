import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import Header from '@/components/header';
import Template from './template';
import { CurrencyProvider } from '@/context/currency-context';

export const metadata: Metadata = {
  title: 'Mega Shop',
  description: 'Your one-stop shop for everything you need.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          <CurrencyProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <Template>{children}</Template>
            </div>
            <Toaster />
          </CurrencyProvider>
        </CartProvider>
      </body>
    </html>
  );
}
