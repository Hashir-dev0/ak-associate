import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, ArrowRight, Clock } from "lucide-react";
import { NewsItem } from "@/data/news";

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <article className="group bg-white rounded-sm border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Thumbnail with Overlapping Date Badge */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-900">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlapping Date Badge matching design.md */}
          <div className="absolute top-4 left-4 bg-brand-500 text-white p-2.5 rounded-sm shadow-lg text-center leading-none">
            <span className="block font-display font-extrabold text-xl">{news.date.day}</span>
            <span className="block text-[10px] font-display font-bold uppercase tracking-wider text-brand-100">
              {news.date.month}
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-3 right-3 bg-navy-950/80 backdrop-blur-sm text-slate-200 text-[11px] font-display font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
            {news.category}
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              <span>{news.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-brand-500" />
              <span>{news.commentsCount} Comments</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold uppercase text-lg text-navy-900 leading-snug mb-3 group-hover:text-brand-600 transition-colors">
            {news.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
            {news.excerpt}
          </p>
        </div>
      </div>

      {/* Card Action */}
      <div className="px-6 pb-6 pt-2 border-t border-slate-100">
        <Link
          href={`/contact?subject=${encodeURIComponent(news.title)}`}
          className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-brand-600 hover:text-brand-700 transition-colors group/btn"
        >
          <span>READ ARTICLE / INQUIRE</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};
