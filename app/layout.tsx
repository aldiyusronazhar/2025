import type { Metadata } from "next";
import "./globals.scss";
// import Cursor from "@/components/ui/cursor/Cursor";
import Menu from "@/components/ui/menu/Menu";
import LenisScrollProvider from "@/utils/lenis";

export const metadata: Metadata = {
    title: "ethzer",
    description: "Portofolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#ff0000" /></head>
            <body>
                <LenisScrollProvider/>
                {/* <Cursor /> */}
                <Menu />
                {children}
            </body>
        </html>
    );
}
