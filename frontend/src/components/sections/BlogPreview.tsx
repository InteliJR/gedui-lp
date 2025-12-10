import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CardBlog from "../common/CardBlog";

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

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Colocar aqui a URL interna para pegar os posts
        const response: AxiosResponse<BlogPost[]> = await axios.get(
          "https://api.gedui.com.br/blog/posts"
        );

        const data = response.data;

        const postsOrdenados = [...data]
          .sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 3);

        setPosts(postsOrdenados);
      } catch (error) {
        console.warn("API indisponível, usando mock local.");
        setPosts(mockUltimasBlog);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section
      className="min-h-screen w-full bg-primary bg-[url('/grafismo_duplo.png')] bg-no-repeat bg-cover bg-center"
      aria-labelledby="quem-somos-heading"
      role="region"
    >
      <div className="justify-center min-h-screen p-10 flex flex-col items-center">
        <h2 className="font-semibold lg:text-5xl text-white text-center">
          Últimas do blog
        </h2>

        {loading ? (
          <p className="text-white mt-10">Carregando...</p>
        ) : (
          <div className="flex space-x-50 mt-50">
            {posts.map((post) => (
              <CardBlog
                key={post.slug}
                img_url={post.img_url}
                title={post.title}
                url={post.url}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
