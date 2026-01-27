"use client";

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CardBlog from "../common/CardBlog";
import Link from "next/link";

interface BlogPost {
  title: string;
  slug: string;
  url: string;
  img_url: string;
  date?: string;
}

export type BlogPreviewDict = {
  heading: string;
  loadingText: string;
  aria: {
    prevPost: string;
    nextPost: string;
  };
  cta: {
    title: string;
    highlight: string;
    button: string;
  };
  // mocks por idioma (pra não ficar travado em pt-br)
  mockPosts: BlogPost[];
};

export default function BlogPreview({ t }: { t: BlogPreviewDict }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // índice do carrossel (mobile)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response: AxiosResponse<BlogPost[]> = await axios.get(
          "https://api.gedui.com.br/blog/posts"
        );

        const postsOrdenados = [...response.data]
          .sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 3);

        setPosts(postsOrdenados);
      } catch {
        console.warn("API indisponível, usando mock local.");
        setPosts(t.mockPosts);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [t.mockPosts]);

  function handlePrev() {
    if (!posts.length) return;
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  }

  function handleNext() {
    if (!posts.length) return;
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  }

  return (
    <section
      className="
        min-h-screen w-full bg-primary
        bg-[url('/grafismo_duplo.png')] bg-no-repeat bg-cover
        bg-[position:center_95%]
        md:bg-[position:center_center]
      "
      aria-labelledby="blog-heading"
      role="region"
    >

      <div
        className="
          min-h-screen
          p-10
          flex flex-col
          items-center
          justify-between
        "
      >
        <h2
          id="blog-heading"
          className="
            font-semibold
            text-3xl md:text-4xl lg:text-5xl
            text-white text-center
            mb-16 md:mb-20 lg:mb-0
          "
        >
          {t.heading}
        </h2>

        {loading ? (
          <p className="text-white mt-10">{t.loadingText}</p>
        ) : posts.length === 0 ? (
          <p className="text-white mt-10">{t.loadingText}</p>
        ) : (
          <>
            {/* =====================
               MOBILE / TABLET
            ===================== */}
            <div className="relative w-full max-w-md mt-12 flex items-center justify-center lg:hidden">
              {/* Botão esquerda */}
              <button
                onClick={handlePrev}
                aria-label={t.aria.prevPost}
                type="button"
                className="
                  absolute left-0 z-10
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-white/20
                  text-white
                  hover:bg-white/30
                  transition
                "
              >
                ‹
              </button>

              {/* Card */}
              <div className="mx-12 w-full overflow-hidden pt-32 pb-4">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {posts.map((post) => (
                    <div key={post.slug} className="w-full flex-shrink-0 flex justify-center px-1">
                      <CardBlog img_url={post.img_url} title={post.title} url={post.url} />
                    </div>
                  ))}
                </div>
              </div>


              {/* Botão direita */}
              <button
                onClick={handleNext}
                aria-label={t.aria.nextPost}
                type="button"
                className="
                  absolute right-0 z-10
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-white/20
                  text-white
                  hover:bg-white/30
                  transition
                "
              >
                ›
              </button>
            </div>

            {/* =====================
               DESKTOP
            ===================== */}
            <div className="hidden lg:flex space-x-24 mt-24">
              {posts.map((post) => (
                <CardBlog
                  key={post.slug}
                  img_url={post.img_url}
                  title={post.title}
                  url={post.url}
                />
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div
          className="
            mx-auto
            mt-20 
            w-full
            max-w-[90%] sm:max-w-lg lg:max-w-4xl
            px-6 pt-8 sm:px-10 py-10
            rounded-2xl
            border border-[rgba(162,162,162,0.5)]
            bg-[rgba(162,162,162,0.10)]
            shadow-[0_4px_10px_rgba(0,0,0,0.15)]
            backdrop-blur-sm
            flex flex-col items-center gap-4
          "
        >
          <h2 className="text-base sm:text-lg lg:text-3xl font-bold text-center text-white leading-snug">
            {t.cta.title}{" "}
            <span className="text-secondary">{t.cta.highlight}</span>
          </h2>

          <Link
            href="/agendar"
            className="
              px-8 py-3
              rounded-full
              bg-gradient-to-r from-white to-[#0E55A5]/78
              text-primary
              font-semibold
              text-sm sm:text-base
              hover:bg-white
              transition
              -mb-15
              shadow-[0_4px_30px_2px_#0E55A5]
            "
            role="menuitem"
          >
            {t.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
