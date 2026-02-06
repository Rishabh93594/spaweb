import React, { useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Crown,
  Heart,
  Quote,
  History,
  Target,
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headerRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero video parallax and zoom effect
      gsap.fromTo(heroVideoRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // Header Animation
      const headerElements = heroContentRef.current?.children;
      if (headerElements) {
        gsap.fromTo(headerElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5
          }
        );
      }

      // Parallax effect on hero video during scroll
      if (headerRef.current) {
        gsap.to(heroVideoRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Story Section Animation
      if (storyRef.current) {
        gsap.fromTo(storyRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Founder Section Animation
      if (founderRef.current) {
        const image = founderRef.current.querySelector('.founder-image');
        const content = founderRef.current.querySelector('.founder-content')?.children;

        if (image) {
          gsap.from(image, {
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 75%",
            }
          });
        }

        if (content) {
          gsap.from(content, {
            x: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 75%",
            }
          });
        }
      }

      // Philosophy Animation
      if (philosophyRef.current) {
        const cards = philosophyRef.current.querySelectorAll('.philosophy-card');
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
              trigger: philosophyRef.current,
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

  const philosophy = [
    {
      icon: Crown,
      title: 'French Precision',
      description: 'We bring the sophistication of French skincare techniques and meticulous attention to detail to every ritual.'
    },
    {
      icon: Heart,
      title: 'Holistic Care',
      description: 'Our approach integrates modern medical advancements with time-honored organic wellness practices.'
    },
    {
      icon: Sparkles,
      title: 'Cinematic Serenity',
      description: 'We believe your environment should be as transformative as your treatment. Every space is a sanctuary.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <Navbar forceOpaque={true} />

      {/* Video Hero Header */}
      <section ref={headerRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/20">
          <video
            ref={heroVideoRef}
            src="/bellavitaspa.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div ref={heroContentRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-1 text-sha-caps backdrop-blur-sm tracking-[0.2em]">
            <History className="w-3 h-3 mr-2" />
            Our Legacy
          </Badge>
          <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight font-normal drop-shadow-md">
            The Story of <span className="italic font-serif">Forever Young NYC</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-sm">
            A journey born from a passion for timeless elegance and the art of transformative wellness.
          </p>
        </div>
      </section>



      {/* Meet the Founder - Gold Sand Overlay */}
      <section ref={founderRef} className="py-24 px-6 bg-accent/[0.04] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative founder-image">
              <div className="absolute -inset-4 bg-white/40 backdrop-blur-sm rounded-2xl transform rotate-3 -z-10 shadow-soft"></div>
              <img
                src="/valerie-moore.png"
                alt="Valerie Moore"
                className="w-full aspect-[4/5] object-cover rounded-xl shadow-luxury"
              />
            </div>

            <div className="w-full md:w-1/2 founder-content">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">The Visionary</Badge>
              <h2 className="text-4xl text-foreground mb-4">Valerie Moore</h2>
              <p className="text-sha-caps text-primary font-medium tracking-widest mb-8">
                Founder & Lead Specialist
              </p>

              <div className="relative mb-12">
                <Quote className="absolute -top-6 -left-8 w-16 h-16 text-primary/10 -z-10" />
                <p className="text-2xl text-foreground font-light leading-relaxed italic">
                  "I wanted to create a place where the soul feels at home. Wellness isn't a luxury; it's a necessary harmony that everyone deserves to experience in its most refined form."
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed font-light">
                <p>
                  With over 15 years of experience in therapeutic massage and advanced aesthetic treatments, Valerie Moore combines deep technical expertise with a natural intuition for human wellness.
                </p>
                <p>
                  Her philosophy is built on the belief that every client is unique, requiring a bespoke approach that addresses their specific physical needs while nurturing their emotional peace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section ref={philosophyRef} className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl text-foreground font-light mb-6">The <span className="italic font-serif text-primary">Forever Young NYC Philosophy</span></h2>
            <div className="w-20 h-px bg-primary/30 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {philosophy.map((item, i) => (
              <Card key={i} className="philosophy-card group border-0 bg-primary/5 hover:bg-white transition-all duration-700 hover:shadow-luxury rounded-2xl">
                <CardContent className="p-10 text-center">
                  <div className="inline-flex w-16 h-16 items-center justify-center rounded-full bg-white shadow-soft text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-normal text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-t from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl text-foreground mb-8 font-light leading-tight">
            Begin Your <span className="italic font-serif">Radiant Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed">
            Experience the harmony of expert care and cinematic serenity. Your sanctuary is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="hero" size="xl" className="rounded-full px-12 shadow-luxury hover:scale-105 transition-all duration-500" asChild>
              <Link to="/booking">
                <Heart className="w-5 h-5 mr-3" />
                Book Your Ritual
              </Link>
            </Button>
            <Button variant="luxury" size="xl" className="rounded-full px-12 border-border/50 hover:bg-white transition-all duration-500" asChild>
              <Link to="/services">Explore Treatments</Link>
            </Button>
          </div>
        </div>

        {/* Decorative SVG placement */}
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

export default About;
