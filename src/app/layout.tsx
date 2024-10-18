import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import SessionProvider from "../app/components/SessionProvider";
import Navbar from "@/components/Navbar/Navbar";
const noto = Noto_Sans_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Flow | Administrador",
  description:
    "App de gestión de stock e inventario que permite controlar en tiempo real los niveles de existencias, entradas y salidas de productos. Optimiza el seguimiento de inventarios, reduce errores y facilita la toma de decisiones con reportes automáticos y alertas personalizables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={noto.className}>
        <SessionProvider>
          <div className="flex w-full h-full">
            <div className="hidden xl:block w-80 h-full xl:fixed">sidebar</div>
            <div className="w-full xl:ml-80">
              <Navbar />
              <div className="p-6 bg-[#fafbfc] dark:bg-secondary">
                {children}
              </div>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
