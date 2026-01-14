// src/components/common/Layout.tsx
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type HeaderVariant = "transparent" | "primary";

interface LayoutProps {
  children: ReactNode;
  headerVariant?: HeaderVariant;
}

export default function Layout({
  children,
  headerVariant = "transparent",
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant={headerVariant} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}
