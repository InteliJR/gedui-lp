"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
}

// Dados mockados dos posts de blog
const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Tendências E Desafios Para 2025",
    subtitle: "Educação Corporativa E Tecnologia:",
    description:
      "A educação corporativa, essencial para o sucesso e crescimento das organizações, está passando por uma revolução impulsionada pelos avanços tecnológicos e pelas mudanças nas dinâmicas de trabalho.",
    imageUrl: "/blog/educacaocorporativa.png",
    imageAlt: "Gráficos e documentos",
    link: "/blog/tendencias-educacao-2025",
  },
  {
    id: "2",
    title: "Inclusão E Acessibilidade Para Todos",
    subtitle: "Impacto Social Da Educação Tecnológica:",
    description:
      "A tecnologia educacional que tá acessível, que dá acesso, signa desempenhando um papel central no desafio de garantir educação de qualidade, inclusiva e equitativa para todas as pessoas, independentemente de suas limitações ou circunstâncias socioeconômicas.",
    imageUrl: "/blog/inclusao.png",
    imageAlt: "Pessoas trabalhando juntas",
    link: "/blog/inclusao-acessibilidade",
  },
  {
    id: "3",
    title: "A Transformação Dos Cursos De Pedagogia E O Papel Da Formação Continuada",
    subtitle: "Tecnologia Na Educação:",
    description:
      "Uma necessidade cada vez mais presente, uma necessidade da educação moderna, especialmente para capacitar professores e equipes a integrar tecnologia de forma eficaz e significativa nas suas práticas pedagógicas.",
    imageUrl: "/blog/transformacao.png",
    imageAlt: "Sala de aula moderna",
    link: "/blog/transformacao-pedagogia",
  },
  {
    id: "4",
    title: "A Transformação Que Está Redefinindo O Futuro Das Escolas",
    subtitle: "Ia Na Educação:",
    description:
      "Um artigo da Education Next traz a encução de como a inteligência artificial está transformando a educação, desde a personalização do aprendizado até a automação de tarefas administrativas.",
    imageUrl: "/blog/futuro.png",
    imageAlt: "Aluno usando tecnologia",
    link: "/blog/futuro-escolas",
  },
  {
    id: "5",
    title: "Promovendo A Diversidade E A Inclusão Por Meio Da Educação Corporativa",
    subtitle: "Educação Corporativa:",
    description:
      "No competitivo cenário corporativo atual, promover a diversidade e a inclusão não é apenas uma responsabilidade social, mas uma estratégia essencial para o sucesso organizacional e a inovação.",
    imageUrl: "/blog/diversidade.png",
    imageAlt: "Diversidade e inclusão",
    link: "/blog/diversidade-inclusao-corporativa",
  },
];

const ITEMS_PER_PAGE = 4;

export default function BlogCardList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(BLOG_POSTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = BLOG_POSTS.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave para o topo da lista
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Cards de blog */}
      <div className="space-y-0">
        {currentPosts.map((post) => {
          const globalIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
          return (
            <BlogCard
              key={post.id}
              {...post}
              isImageLeft={globalIndex % 2 === 0}
            />
          );
        })}
      </div>

      {/* Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

