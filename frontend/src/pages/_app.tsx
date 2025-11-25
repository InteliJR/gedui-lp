import "@/styles/globals.css";
import type { AppProps } from "next/app";
import OrganizationSchema from "@/components/common/OrganizationSchema";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <OrganizationSchema />
      <Component {...pageProps} />
    </>
  );
}
