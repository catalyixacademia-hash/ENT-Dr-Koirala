'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { type Language, getTranslations } from '@/lib/i18n';

const SOCIAL_PLATFORMS = [
  {
    id: 'social-tiktok',
    platform: 'TikTok',
    handle: '@dr_krishna_koirala_ent',
    followersKey: 'social_growing' as const,
    icon: 'PlayCircleIcon',
    color: 'from-slate-800 to-slate-900',
    href: 'https://www.tiktok.com/@dr_krishna_koirala_ent',
    descKey: 'social_tiktok_desc' as const,
  },
  {
    id: 'social-youtube',
    platform: 'YouTube',
    handle: '@DrKrishnaKoiralaENT',
    followersKey: 'social_subscribe' as const,
    icon: 'PlayIcon',
    color: 'from-red-600 to-red-700',
    href: 'https://www.youtube.com/@DrKrishnaKoiralaENT',
    descKey: 'social_youtube_desc' as const,
  },
  {
    id: 'social-facebook',
    platform: 'Facebook',
    handle: 'Dr. Krishna Koirala',
    followersKey: 'social_follow_btn' as const,
    icon: 'UserGroupIcon',
    color: 'from-blue-600 to-blue-700',
    href: 'https://www.facebook.com/drkrishnakoirala/',
    descKey: 'social_facebook_desc' as const,
  },
];

const VIDEO_TEASERS = [
  { id: 'video-yt-1', type: 'youtube', embedId: 'zI7t0kvavZc', href: 'https://www.youtube.com/watch?v=zI7t0kvavZc', title: 'ENT Tips — Dr. Krishna Koirala', platform: 'YouTube' },
  { id: 'video-yt-2', type: 'youtube', embedId: 'xirGZp3UmPY', href: 'https://www.youtube.com/watch?v=xirGZp3UmPY', title: 'ENT Awareness — Dr. Krishna Koirala', platform: 'YouTube' },
  { id: 'video-yt-3', type: 'youtube', embedId: 'MJ8Se500eS0', href: 'https://www.youtube.com/watch?v=MJ8Se500eS0', title: 'ENT Health — Dr. Krishna Koirala', platform: 'YouTube' },
  { id: 'video-tt-1', type: 'tiktok', href: 'https://vt.tiktok.com/ZSxYfrrcY/', title: 'ENT Short — TikTok', platform: 'TikTok' },
  { id: 'video-tt-2', type: 'tiktok', href: 'https://vt.tiktok.com/ZSxYfB2m7/', title: 'ENT Awareness — TikTok', platform: 'TikTok' },
  { id: 'video-tt-3', type: 'tiktok', href: 'https://vt.tiktok.com/ZSxYf8Xa5/', title: 'ENT Tips — TikTok', platform: 'TikTok' },
];

interface TikTokThumbnailCardProps {
  video: { id: string; type: string; href: string; title: string; platform: string };
  watchLabel: string;
}

function TikTokThumbnailCard({ video, watchLabel }: TikTokThumbnailCardProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState(video.title);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchThumbnail() {
      try {
        const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(video.href)}`;
        const res = await fetch(oembedUrl);
        if (!res.ok) throw new Error('oEmbed fetch failed');
        const data = await res.json();
        if (!cancelled) {
          if (data.thumbnail_url) setThumbnailUrl(data.thumbnail_url);
          if (data.title) setVideoTitle(data.title);
        }
      } catch {
        // fallback UI
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchThumbnail();
    return () => { cancelled = true; };
  }, [video.href]);

  return (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-2xl overflow-hidden border card-shadow group hover:card-shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        ) : thumbnailUrl ? (
          <>
            <img src={thumbnailUrl} alt={videoTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Icon name="PlayIcon" size={24} variant="solid" className="text-primary ml-1" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, #14B8A6 0%, transparent 70%)' }} />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Icon name="PlayIcon" size={24} variant="solid" className="text-primary ml-1" />
              </div>
              <span className="text-white/80 text-xs font-medium">{watchLabel}</span>
            </div>
          </div>
        )}
        <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-black/60 text-white z-10">TikTok</span>
      </div>
      <div className="p-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">{videoTitle}</p>
        <Icon name="ArrowTopRightOnSquareIcon" size={14} className="ml-2 shrink-0 text-muted-foreground" />
      </div>
    </a>
  );
}

interface SocialMediaHubProps {
  language: Language;
}

export default function SocialMediaHub({ language }: SocialMediaHubProps) {
  const t = getTranslations(language);

  return (
    <section id="media" className="section-padding bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">{t.social_tag}</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">{t.social_title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.social_desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SOCIAL_PLATFORMS.map((platform) => (
            <a
              key={platform.id}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative rounded-2xl p-6 bg-gradient-to-br ${platform.color} overflow-hidden group hover:scale-[1.02] transition-all duration-300 card-shadow-md`}
            >
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)' }} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Icon name={platform.icon as Parameters<typeof Icon>[0]['name']} size={28} className="text-white" />
                  <span className="text-white/70 text-xs font-medium">{platform.platform}</span>
                </div>
                <p className="text-3xl font-extrabold text-white font-tabular mb-1">{t[platform.followersKey]}</p>
                <p className="text-white/80 text-sm font-semibold mb-3">{t.social_followers_label}</p>
                <p className="text-white/70 text-xs leading-relaxed mb-4">{t[platform.descKey]}</p>
                <div className="flex items-center gap-2 text-white text-xs font-semibold">
                  <span>{platform.handle}</span>
                  <Icon name="ArrowTopRightOnSquareIcon" size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">{t.social_latest_videos}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEO_TEASERS.map((video) => {
              if (video.type === 'youtube') {
                return (
                  <div key={video.id} className="bg-white rounded-2xl overflow-hidden border card-shadow group hover:card-shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="relative aspect-video overflow-hidden">
                      <iframe src={`https://www.youtube.com/embed/${video.embedId}`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full border-0" />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">{video.title}</p>
                      <span className="ml-2 shrink-0 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">{video.platform}</span>
                    </div>
                  </div>
                );
              }
              return <TikTokThumbnailCard key={video.id} video={video} watchLabel={t.social_watch_tiktok} />;
            })}
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-4">{t.social_footer_desc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://www.tiktok.com/@dr_krishna_koirala_ent" target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2.5 text-sm">
              <Icon name="PlayCircleIcon" size={16} />
              {t.social_cta_tiktok}
            </a>
            <a href="https://www.youtube.com/@DrKrishnaKoiralaENT" target="_blank" rel="noopener noreferrer" className="btn-outline px-6 py-2.5 text-sm">
              <Icon name="PlayIcon" size={16} />
              {t.social_cta_youtube}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
