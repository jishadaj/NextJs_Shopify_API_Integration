"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import "../styles/globals.css";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A modern e-commerce platform powered by Shopify and Next.js." />
        <meta name="keywords" content="ecommerce, shop, buy, Shopify, Next.js" />
        <meta name="author" content="Jishad aj" />
        <title>MyShop - Best Online Store</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}