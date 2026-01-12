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

const mockUltimasBlog: BlogPost[] = [
  {
    title: "Educacao corporativa e tecnologia tendencias e desafios para 2025",
    slug: "educacao-corporativa-e-tecnologia-tendencias-e-desafios-para-2025",
    url: "/pt-br/blog/educacao-corporativa-e-tecnologia-tendencias-e-desafios-para-2025",
    img_url: "https://gedui.blob.core.windows.net/geral/post26.webp",
  },
  {
    title: "Impacto social da educacao tecnologica inclusao e acessibilidade para todos",
    slug: "impacto-social-da-educacao-tecnologica-inclusao-e-acessibilidade-para-todos",
    url: "/pt-br/blog/impacto-social-da-educacao-tecnologica-inclusao-e-acessibilidade-para-todos",
    img_url: "https://gedui.blob.core.windows.net/geral/25_blog_gedui.jpg",
  },
  {
    title: "Tecnologia na educacao a transformacao dos cursos de pedagogia e o papel da formacao continuada",
    slug: "tecnologia-na-educacao-a-transformacao-dos-cursos-de-pedagogia-e-o-papel-da-formacao-continuada",
    url: "/pt-br/blog/tecnologia-na-educacao-a-transformacao-dos-cursos-de-pedagogia-e-o-papel-da-formacao-continuada",
    img_url: "https://gedui.blob.core.windows.net/geral/post_24.jpg",
  },
];

export default function BlogPreview() {
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
        setPosts(mockUltimasBlog);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  function handlePrev() {
    setCurrentIndex((prev) =>
      prev === 0 ? posts.length - 1 : prev - 1
    );
  }

  function handleNext() {
    setCurrentIndex((prev) =>
      prev === posts.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <section
      className="min-h-screen w-full bg-primary bg-[url('/grafismo_duplo.png')] bg-no-repeat bg-cover bg-center"
      aria-labelledby="blog-heading"
      role="region"
    >
      <div className="
        min-h-screen
        p-10
        flex flex-col
        items-center
        justify-between
      ">

        <h2
          id="blog-heading"
          className="
            font-semibold
            text-3xl md:text-4xl lg:text-5xl
            text-white text-center
            mb-16 md:mb-20 lg:mb-0
          "
        >
          Últimas do blog
        </h2>


        {loading ? (
          <p className="text-white mt-10">Carregando...</p>
        ) : (
          <>
            {/* =====================
               MOBILE / TABLET
            ===================== */}
            <div className="relative w-full max-w-md mt-12 flex items-center justify-center lg:hidden">
              {/* Botão esquerda */}
              <button
                onClick={handlePrev}
                aria-label="Post anterior"
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
              <div className="mx-12">
                <CardBlog
                  img_url={posts[currentIndex].img_url}
                  title={posts[currentIndex].title}
                  url={posts[currentIndex].url}
                />
              </div>

              {/* Botão direita */}
              <button
                onClick={handleNext}
                aria-label="Próximo post"
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
            Comece a transformação para o{" "}
            <span className="text-secondary">futuro do aprendizado.</span>
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
            Agendar Demonstração
          </Link>
        </div>
      </div>
    </section>
  );
}
