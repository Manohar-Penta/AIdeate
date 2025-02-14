import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { NavComponent } from "@/components/NavComponent";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "AIdeate",
  description: "AI powered blogging platform",
  creator: "Penta Manohar",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased m-0 p-0`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <NavComponent />
            <div className="min-h-screen scroll-smooth">{children}</div>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
