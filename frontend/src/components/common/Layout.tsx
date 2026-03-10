// src/components/common/Layout.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import loadCommonDictionary from "@/i18n/loadCommonDictionary";
import { getLocaleFromPath } from "@/i18n/getLocaleFromPath";

type CommonDict = Awaited<ReturnType<typeof loadCommonDictionary>>;

interface LayoutProps {
  children: ReactNode;
  headerVariant?: "transparent" | "primary";
}

export default function Layout({ children, headerVariant }: LayoutProps) {
  const [common, setCommon] = useState<CommonDict | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const locale = getLocaleFromPath(path);

    loadCommonDictionary(locale)
      .then(setCommon)
      .catch(() => loadCommonDictionary("pt-BR").then(setCommon));
  }, []);

  if (!common) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header t={common.header} variant={headerVariant} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer t={common.footer} />
    </div>
  );
}