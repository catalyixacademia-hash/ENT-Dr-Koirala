import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { type Language, getTranslations } from '@/lib/i18n';
import { getBlogPosts } from '@/lib/i18n-content';

const CATEGORY_COLORS = [
  'bg-blue-50 text-blue-600',
  'bg-teal-50 text-teal-600',
  'bg-pink-50 text-pink-600',
];

interface BlogSectionProps {
  language: Language;
}

export default function BlogSection({ language }: BlogSectionProps) {
  const t = getTranslations(language);
  const posts = getBlogPosts(language);

  return (
    <section id="insights" className="section-padding bg-background">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">
              {t.blog_tag}
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground">
              {t.blog_title}
            </h2>
          </div>
          <a href="#" className="btn-outline text-sm px-5 py-2.5">
            {t.blog_view_all}
            <Icon name="ArrowRightIcon" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border card-shadow hover:card-shadow-md transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <AppImage
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[index % CATEGORY_COLORS.length]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    {t.blog_read_more} <Icon name="ArrowRightIcon" size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
