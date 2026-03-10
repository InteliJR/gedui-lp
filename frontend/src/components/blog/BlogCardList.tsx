"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import type { PaginationDict } from "./Pagination";

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
}

export type BlogCardListDict = {
  posts?: BlogPost[];
  card: {
    readMoreLabel: string;
    readMoreAriaLabel: string;
  };
  pagination: PaginationDict;
};

const ITEMS_PER_PAGE = 4;

export default function BlogCardList({
  t,
  initialPosts = [],
  totalCount = 0,
  apiLocale = "pt-br"
}: {
  t: BlogCardListDict,
  initialPosts?: any[],
  totalCount?: number,
  apiLocale?: string
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentApiPosts, setCurrentApiPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  const fetchPage = async (page: number) => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gedui.com.br';
      const res = await fetch(`${baseUrl}/api/v1/${apiLocale}/articles?page=${page}&page_size=${ITEMS_PER_PAGE}`);

      if (res.ok) {
        const data = await res.json();
        setCurrentApiPosts(data.results || []);
      }
    } catch (error) {
      console.error("Erro ao buscar página:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formattedPosts: BlogPost[] = useMemo(() => {
    const sourcePosts = currentApiPosts.length > 0 ? currentApiPosts : (t.posts || []);

    return sourcePosts.map((apiPost: any, index: number) => {
      if (apiPost.id) return apiPost;

      return {
        id: apiPost.slug || String(index),
        title: apiPost.title || "",
        subtitle: "",
        description: "",
        imageUrl: apiPost.image || "/placeholder-image.png",
        imageAlt: apiPost.title || "Imagem do artigo",
        link: `/blog/${apiPost.slug}`,
      };
    });
  }, [currentApiPosts, t.posts]);

  return (
    <div className="w-full">
      <div className={`space-y-0 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {formattedPosts.map((post, index) => {
          return (
            <BlogCard
              key={post.id}
              {...post}
              isImageLeft={index % 2 === 0}
              t={t.card}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          t={t.pagination}
        />
      )}
    </div>
  );
}