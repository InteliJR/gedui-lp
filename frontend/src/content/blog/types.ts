import type React from "react";

export type BlogPostData = {
    slug: string;
    title: string;
    excerpt: string;
    date: string; // YYYY-MM-DD
    modifiedDate: string; // YYYY-MM-DD
    category: string;
    readTime: string;
    author: string;
    image: string;
    content: React.ReactNode;
};

export type BlogPostsBySlug = Record<string, BlogPostData>;
