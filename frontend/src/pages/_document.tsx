import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="pt-BR">
            <Head>
                {/* Meta Tags Básicas */}
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                {/* Preconnect para performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://assets.calendly.com" />

                {/* Calendly Widget CSS */}
                <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

                {/* Favicon (adicione mais tamanhos depois) */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

                {/* Manifest para PWA (opcional) */}
                <link rel="manifest" href="/site.webmanifest" />

                {/* Theme Color */}
                <meta name="theme-color" content="#0ea5e9" />

                {/* Fonts (exemplo - ajuste conforme identidade visual) */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
