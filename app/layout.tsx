import type { Metadata } from "next";
import "./globals.scss";
// import Cursor from "@/components/ui/cursor/Cursor";
import Menu from "@/components/ui/menu/Menu";
import LenisScrollProvider from "@/utils/lenis";

export const metadata: Metadata = {
    title: "azh.rz",
    description: "Portofolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                 <LenisScrollProvider>
                {/* <Cursor /> */}
                 <Menu/>
                {children}
                 </LenisScrollProvider>
            </body>
        </html>
    );
}
