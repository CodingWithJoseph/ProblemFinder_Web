import { Metadata } from "next";
import ClientLayout from "./layout.client";

export const metadata: Metadata = {
    title: "BlueLabs",
    description: "Build fast. Build often.",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.ico",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}