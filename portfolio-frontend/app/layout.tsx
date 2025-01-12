
"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "context/ContextApi";
import { Provider } from "react-redux";
import { store } from "store/store";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ThemeProvider from "context/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClinet = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Uttam Pun | Developer</title>
        <meta name='title' content='Uttam Pun | Developer' />
        <meta name='description' content='Uttam pun developer' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider>
              <QueryClientProvider client={queryClinet}>
                <ReactQueryDevtools initialIsOpen={false} />

                {children}
                <Toaster />
              </QueryClientProvider>
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
