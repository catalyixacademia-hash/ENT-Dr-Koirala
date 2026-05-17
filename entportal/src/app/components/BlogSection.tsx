import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const POSTS = [
{
  id: 'post-1',
  title: '7 Warning Signs You Should See an ENT Doctor',
  excerpt: 'Many ENT conditions are ignored until they become serious. Here are the key symptoms that warrant immediate specialist attention.',
  category: 'Patient Education',
  readTime: '4 min read',
  date: 'May 12, 2026',
  image: "https://images.unsplash.com/photo-1709136494772-e7db10d0d1f6",
  imageAlt: 'Doctor in white coat reviewing patient ear X-ray on lightbox in clinical setting',
  categoryColor: 'bg-blue-50 text-blue-600'
},
{
  id: 'post-2',
  title: 'Sinusitis vs. Common Cold — How to Tell the Difference',
  excerpt: 'The symptoms overlap, but the treatments are very different. Learn how to distinguish between a cold and a sinus infection.',
  category: 'Sinus & Nose',
  readTime: '3 min read',
  date: 'May 5, 2026',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f96fa73f-1768205766212.png",
  imageAlt: 'Person holding nose in discomfort with sinus pressure, blurred clinical background',
  categoryColor: 'bg-teal-50 text-teal-600'
},
{
  id: 'post-3',
  title: 'Protecting Your Child\'s Hearing — A Parent\'s Guide',
  excerpt: 'From loud environments to ear infections, here\'s what every parent needs to know about preserving their child\'s hearing health.',
  category: 'Pediatric ENT',
  readTime: '5 min read',
  date: 'Apr 28, 2026',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18776e785-1769256827151.png",
  imageAlt: 'Happy child getting ear examination from friendly pediatric ENT doctor in colorful clinic',
  categoryColor: 'bg-pink-50 text-pink-600'
}];


export default function BlogSection() {
  return (
    <section id="insights" className="section-padding bg-background">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">
              Insights & Education
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground">
              Latest ENT Health Articles
            </h2>
          </div>
          <a href="#" className="btn-outline text-sm px-5 py-2.5">
            View All Articles
            <Icon name="ArrowRightIcon" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {POSTS?.map((post) =>
          <article
            key={post?.id}
            className="bg-white rounded-2xl overflow-hidden border card-shadow hover:card-shadow-md transition-all duration-300 group hover:-translate-y-1 cursor-pointer">
            
              <div className="relative aspect-[16/10] overflow-hidden">
                <AppImage
                src={post?.image}
                alt={post?.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500" />
              
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${post?.categoryColor}`}>
                    {post?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post?.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                  {post?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post?.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post?.date}</span>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    Read more <Icon name="ArrowRightIcon" size={12} />
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}