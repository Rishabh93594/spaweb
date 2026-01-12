import React, { useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Crown, 
  Star, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  Gift, 
  GlassWater, 
  Gem, 
  Calendar,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import Assets
import silverImg from '@/assets/membership_silver_1767937204957.png';
import goldImg from '@/assets/membership_gold_tier_1767937222532.png';
import diamondImg from '@/assets/membership_diamond_tier_1767937239635.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Membership = () => {
  const headerRef = useRef<HTMLElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const perksRef = useRef<HTMLElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(headerElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
        );
      }

      // Tiers Animation
      if (tiersRef.current) {
        const cards = tiersRef.current.querySelectorAll('.tier-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tiersRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Perks Animation
      if (perksRef.current) {
        const perks = perksRef.current.querySelectorAll('.perk-item');
        gsap.fromTo(perks,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: perksRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Decoration Floating Animation
      if (decorationRef.current) {
        gsap.to(decorationRef.current, {
          y: "-=30",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const tiers = [
    {
      name: 'Silver',
      price: '149',
      image: silverImg,
      badge: 'Essentials',
      description: 'Perfect for those beginning their journey into cinematic wellness.',
      features: [
        '1 Signature Ritual per month',
        'Priority weekday booking',
        '10% off additional treatments',
        'Access to the Serenity Lounge',
        'Complimentary organic tea service'
      ],
      color: 'from-slate-200 to-slate-400'
    },
    {
      name: 'Gold',
      price: '299',
      image: goldImg,
      badge: 'Signature',
      popular: true,
      description: 'Our most coveted tier, offering the complete Bella Vita experience.',
      features: [
        '2 Signature Rituals per month',
        'Priority weekend booking',
        '20% off additional treatments',
        'Dedicated wellness concierge',
        'Quarterly guest pass',
        'Quarterly skin analysis'
      ],
      color: 'from-amber-200 to-amber-500'
    },
    {
      name: 'Diamond',
      price: '549',
      image: diamondImg,
      badge: 'Pinnacle',
      description: 'The ultimate sanctuary. Absolute priority and bespoke care.',
      features: [
        '4 Rituals of your choice monthly',
        'Anytime VIP priority booking',
        '30% off additional treatments',
        'Private VIP suite access',
        'Monthly guest pass',
        'Unlimited spa amenities access',
        'Personalized gifting service'
      ],
      color: 'from-emerald-200 to-emerald-500'
    }
  ];

  const perks = [
    {
      icon: Clock,
      title: 'Extended Hours',
      description: 'Members enjoy exclusive early and late access to our facilities.'
    },
    {
      icon: Gift,
      title: 'Monthly Surprises',
      description: 'Delight in curated luxury gifts and product samples delivered to you.'
    },
    {
      icon: GlassWater,
      title: 'Artisan Hydration',
      description: 'Unlimited access to our infused organic waters and wellness elixirs.'
    },
    {
      icon: Calendar,
      title: 'Private Events',
      description: 'Invitations to exclusive wellness workshops and seasonal soirées.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Results',
      description: 'Biannual comprehensive health and skin reports using advanced tech.'
    },
    {
      icon: Sparkles,
      title: 'Member Rituals',
      description: 'Access to "Member Only" treatments designed by our lead therapists.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <Navbar forceOpaque={true} />

      {/* Hero Section */}
      <section ref={headerRef} className="relative pt-32 pb-20 px-6 text-center overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 -z-10 blur-3xl rounded-full opacity-50"></div>
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1 text-sha-caps tracking-[0.2em] animate-gentle-fade">
            <Crown className="w-3 h-3 mr-2" />
            The Circle
          </Badge>
          <h1 className="text-5xl md:text-7xl text-foreground mb-8 leading-tight font-normal">
            A Sanctuary of <span className="italic font-serif text-primary">Belonging</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Elevate your wellness from an occasional luxury to a lifestyle. Join the Bella Vita Circle and immerse yourself in consistent, personalized care.
          </p>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={tiersRef} className="grid md:grid-cols-3 gap-10">
            {tiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`tier-card relative group border-0 bg-white/40 backdrop-blur-md overflow-hidden flex flex-col h-full rounded-2xl transition-all duration-700 hover:shadow-luxury ${tier.popular ? 'ring-2 ring-primary/20 scale-105 z-10' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 left-0 bg-primary text-white text-[0.6rem] py-1.5 text-center uppercase tracking-[0.3em] font-medium z-20">
                    Most Coveted
                  </div>
                )}
                
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={tier.image} 
                    alt={tier.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-3xl font-light text-foreground">{tier.name}</h3>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl text-primary font-normal">€{tier.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">/ month</span>
                  </div>

                  <p className="text-muted-foreground text-sm font-light mb-8 italic">
                    {tier.description}
                  </p>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-foreground/80">
                        <Check className="w-4 h-4 mr-3 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={tier.popular ? "hero" : "luxury"} 
                    className="w-full rounded-full h-12 shadow-soft hover:shadow-medium transition-all duration-500 group/btn"
                  >
                    Select {tier.name}
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section ref={perksRef} className="py-32 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-foreground font-light mb-6">Exclusive <span className="italic font-serif text-primary">Circle Perks</span></h2>
            <div className="w-20 h-px bg-primary/30 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {perks.map((perk, i) => (
              <div key={i} className="perk-item flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-soft text-primary group-hover:scale-110 transition-transform duration-500">
                  <perk.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">{perk.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl text-foreground mb-8 font-light leading-tight">
            Ready to <span className="italic font-serif">Come Home</span> to Yourself?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed">
            Our memberships are curated to ensure we maintain an intimate, unhurried atmosphere. Limited placements available for new Diamond members.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="hero" size="xl" className="rounded-full px-12 shadow-luxury hover:scale-105 transition-all duration-500">
              Apply for Membership
            </Button>
            <Link to="/contact" className="text-primary hover:text-primary/80 text-sm uppercase tracking-widest font-medium transition-colors border-b border-primary/20 pb-1">
              Speak with a Concierge
            </Link>
          </div>
        </div>

        {/* Decorative items icon placement - matching Services page style */}
        <div 
          ref={decorationRef}
          className="absolute bottom-0 right-4 md:right-10 lg:right-16 translate-y-[5%] pointer-events-none hidden md:block"
        >
          <img 
            src="/items.svg" 
            alt="" 
            className="w-36 lg:w-48 h-auto object-contain opacity-15 grayscale"
            style={{ filter: 'brightness(0.6) contrast(1.1)' }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Membership;
