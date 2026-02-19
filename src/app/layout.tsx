import Navbar from "@/components/layout/Navbar";
import "../app/globals.css"
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SidebarProvider defaultOpen={false}>
          <MobileSidebar />
          <SidebarInset>
            <Navbar />
            <Toaster />
            <main>{children}</main>
            <Footer />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
