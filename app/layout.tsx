import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "ZBTMS",
  description: "Zyrex BurnIn Test Management System by @fjrrhn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full mx-auto">
            <SidebarTrigger />
            <section className="w-11/12 mx-auto min-h-screen">
              {children}
            </section>
          </main>
        </SidebarProvider>
        <Toaster position="top-center" expand={true} richColors/>
      </body>
    </html>
  );
}
