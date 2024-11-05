import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import SessionProvider from "../app/components/SessionProvider";
import Navbar from "@/components/Navbar/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const noto = Noto_Sans_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Flow | Administrador",
  description:
    "App de gestión de stock e inventario que permite controlar en tiempo real los niveles de existencias, entradas y salidas de productos. Optimiza el seguimiento de inventarios, reduce errores y facilita la toma de decisiones con reportes automáticos y alertas personalizables",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es">
      <body className={noto.className}>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <div className="flex w-full h-full">
              {/* hidden xl:block w-80 h-full xl:fixed bg-red-500 */}
              <div
                className={cn(
                  "h-full  hidden",
                  session?.user?.name && "xl:block w-80 xl:fixed"
                )}
              >
                <Sidebar />
              </div>

              {/* w-full xl:ml-80 bg-orange-300 */}

              <div className={cn("w-full", session?.user?.name && "xl:ml-80")}>
                <Navbar />
                <div className="p-6 bg-[#fafbfc] dark:bg-secondary">
                  {children}
                  <Toaster />
                </div>
              </div>
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
