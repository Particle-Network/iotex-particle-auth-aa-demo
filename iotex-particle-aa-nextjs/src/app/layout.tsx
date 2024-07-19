"use client";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Particle imports
import { AuthType } from "@particle-network/auth-core";
import { IoTeX, IoTeXTestnet } from "@particle-network/chains";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCoreContextProvider
          options={{
            // All env variable must be defined at runtime
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
            clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
            appId: process.env.NEXT_PUBLIC_APP_ID!,

            // This is how you limit the options available.
            // Remove the authTypes array to display all options available
            authTypes: [
              AuthType.email,
              AuthType.google,
              AuthType.twitter,
              AuthType.github,
              AuthType.discord,
              AuthType.phone,
            ],
            themeType: "dark",
            fiatCoin: "USD",
            language: "en",

            // Define UI elements for the smart account
            erc4337: {
              name: "SIMPLE",
              version: "1.0.0",
            },
            wallet: {
              // Set to false to remove the embedded wallet modal
              visible: true,
              customStyle: {
                // Locks the chain selector to IoTeX mainnet and testnet
                supportChains: [IoTeXTestnet, IoTeX],
              },
            },
          }}
        >
          {children}
        </AuthCoreContextProvider>
      </body>
    </html>
  );
}
