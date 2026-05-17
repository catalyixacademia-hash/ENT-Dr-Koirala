'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const TESTIMONIALS = [
{
  id: 'test-1',
  name: 'Priya Sharma',
  condition: 'Chronic Sinusitis',
  rating: 5,
  text: "Dr. Mehta diagnosed my 3-year sinusitis struggle in one visit. The FESS procedure changed my life — I can breathe properly for the first time in years. His TikTok videos actually helped me understand what was happening before my appointment.",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d8cd6cb1-1763300485347.png",
  avatarAlt: 'Indian woman with short black hair smiling warmly in blue top',
  city: 'Mumbai'
},
{
  id: 'test-2',
  name: 'Rajesh Nair',
  condition: 'Tinnitus Treatment',
  rating: 5,
  text: "I had ringing in my ears for 8 months and was told to 'live with it.' Dr. Mehta identified the root cause immediately and put me on a treatment plan. Three months later, 90% reduction in symptoms. Truly exceptional.",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb468779-1763295443265.png",
  avatarAlt: 'Middle-aged Indian man with glasses and professional expression',
  city: 'Pune'
},
{
  id: 'test-3',
  name: 'Ananya Kulkarni',
  condition: 'Pediatric ENT — Child Patient',
  rating: 5,
  text: "My 4-year-old needed ear tubes and I was terrified. Dr. Mehta walked us through every step with incredible patience. The procedure was flawless. My daughter now calls him 'the ear doctor who is nice'!",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa84eeaf-1772876175126.png",
  avatarAlt: 'Young Indian mother with curly hair and warm smile in yellow kurta',
  city: 'Thane'
},
{
  id: 'test-4',
  name: 'Suresh Patel',
  condition: 'Deviated Septum Surgery',
  rating: 5,
  text: "After years of mouth-breathing and poor sleep, septoplasty with Dr. Mehta gave me my life back. The online booking was seamless, the pre-op consultation thorough, and recovery was exactly as predicted. Highly recommend.",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png",
  avatarAlt: 'Older Indian man with salt and pepper hair smiling confidently',
  city: 'Navi Mumbai'
},
{
  id: 'test-5',
  name: 'Meera Iyer',
  condition: 'Allergic Rhinitis',
  rating: 5,
  text: "Seasonal allergies were ruining my quality of life. Dr. Mehta's allergy testing and immunotherapy plan has reduced my symptoms dramatically. His social media content on allergens is also incredibly informative!",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14e479cba-1763300676390.png",
  avatarAlt: 'Young Indian woman with long dark hair and bright smile in casual wear',
  city: 'Mumbai'
}];


export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => i === 0 ? TESTIMONIALS?.length - 1 : i - 1);
  const next = () => setActiveIdx((i) => i === TESTIMONIALS?.length - 1 ? 0 : i + 1);

  const active = TESTIMONIALS?.[activeIdx];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real outcomes from real patients — because your health journey matters.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-muted/30 rounded-3xl p-8 lg:p-12 border relative animate-fade-in" key={active?.id}>
            {/* Quote mark */}
            <div className="absolute top-6 right-8 text-8xl font-serif text-primary/10 leading-none select-none">"</div>

            <div className="flex gap-1 mb-6">
              {Array.from({ length: active?.rating })?.map((_, i) =>
              <Icon key={`${active?.id}-star-${i}`} name="StarIcon" size={18} variant="solid" className="text-yellow-400" />
              )}
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-8 font-medium">
              "{active?.text}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <AppImage
                  src={active?.avatar}
                  alt={active?.avatarAlt}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full" />
                
              </div>
              <div>
                <p className="font-bold text-foreground">{active?.name}</p>
                <p className="text-sm text-muted-foreground">{active?.condition} · {active?.city}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Icon name="CheckBadgeIcon" size={18} className="text-secondary" />
                <span className="text-xs font-semibold text-secondary">Verified Patient</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl border bg-white hover:bg-muted transition-colors card-shadow active:scale-95"
              aria-label="Previous testimonial">
              
              <Icon name="ChevronLeftIcon" size={20} className="text-foreground" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS?.map((_, i) =>
              <button
                key={`dot-${i}`}
                onClick={() => setActiveIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                aria-label={`Go to testimonial ${i + 1}`} />

              )}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-xl border bg-white hover:bg-muted transition-colors card-shadow active:scale-95"
              aria-label="Next testimonial">
              
              <Icon name="ChevronRightIcon" size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>);

}