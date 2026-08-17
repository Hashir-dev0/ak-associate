"use client";

import React from "react";
import { NewsItem } from "@/data/news";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsCard } from "./NewsCard";

interface NewsSectionProps {
  news?: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news: propNews }) => {
  const news = propNews || [];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeading
          eyebrow="FROM THE BLOG"
          title="NEWS & ARTICLES"
          subtitle="Engineering insights, construction planning guides, and turnkey contracting advice from our technical team."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};
