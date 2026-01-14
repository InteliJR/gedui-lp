"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import type { PaginationDict } from "./Pagination";

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
}

export type BlogCardListDict = {
  posts: BlogPost[];
  card: {
    readMoreLabel: string;
    readMoreAriaLabel: string;
  };
  pagination: PaginationDict;
};

const ITEMS_PER_PAGE = 4;

export default function BlogCardList({ t }: { t: BlogCardListDict }) {
  const [currentPage, setCurrentPage] = useState(1);

  const posts = t.posts;

  const totalPages = useMemo(
    () => Math.ceil(posts.length / ITEMS_PER_PAGE),
    [posts.length]
  );

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage]);

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
          const globalIndex = posts.findIndex((p) => p.id === post.id);

          return (
            <BlogCard
              key={post.id}
              {...post}
              isImageLeft={globalIndex % 2 === 0}
              t={t.card}
            />
          );
        })}
      </div>

      {/* Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        t={t.pagination}
      />

    </div>
  );
}
