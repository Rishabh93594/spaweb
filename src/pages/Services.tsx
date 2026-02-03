import React, { useState, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Star, Heart, Filter, Search, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData, categories } from '@/data/services';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Image Imports
import massage1 from '@/assets/massage_1_1767783087775.png';
import massage2 from '@/assets/massage_2_1767783110626.png';
import massage3 from '@/assets/massage_3_1767783130069.png';
import facial1 from '@/assets/facial_1_1767783148788.png';
import facial2 from '@/assets/facial_2_1767783169084.png';
import facial3 from '@/assets/facial_3_1767783189005.png';
import body1 from '@/assets/body_1_1767783206652.png';
import body2 from '@/assets/body_2_1767783225345.png';
import laser1 from '@/assets/laser_services.png';
import lymphatic1 from '@/assets/intro_lymphatic.png';
import saltScrub from '@/assets/himalayan_salt_scrub_1767936432487.png';
import goldFacial from '@/assets/gold_facial_1_1767936799829.png';
import couples from '@/assets/couples_massage_ritual_1767936416128.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');

  const [filterDuration, setFilterDuration] = useState('all');

  const headerRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  // Extract unique durations
  const durations = Array.from(new Set(servicesData.map(s => s.duration).filter(Boolean)));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(headerElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
          }
        );
      }

      // Filter Bar Animation
      gsap.fromTo(filterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power2.out"
        }
      );

      // Cards Animation - Staggered entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
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

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesDuration = filterDuration === 'all' || service.duration === filterDuration;

    const matchesPrice = filterPrice === 'all' ||
      (filterPrice === 'low' && service.price <= 100) ||
      (filterPrice === 'medium' && service.price > 100 && service.price <= 150) ||
      (filterPrice === 'high' && service.price > 150);

    return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
  });

  // Helper to map services to images
  const getServiceImage = (service: any) => {
    const { category, name, id } = service;
    const c = category.toLowerCase();
    const n = name.toLowerCase();

    const pick = (arr: string[]) => arr[name.length % arr.length];

    if (n.includes('lymphatic')) return lymphatic1;
    if (n.includes('salt') || n.includes('scrub')) return saltScrub;
    if (n.includes('gold')) return goldFacial;
    if (n.includes('couple')) return couples;

    if (c.includes('massage')) return pick([massage1, massage2, massage3]);
    if (c.includes('facial') || c.includes('skin')) return pick([facial1, facial2, facial3]);
    if (c.includes('laser')) return laser1;
    if (c.includes('body')) return pick([body1, body2]);

    return body1; // Fallback
  };

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <Navbar forceOpaque={true} />

      {/* Cinematic Header */}
      <section ref={headerRef} className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1 text-sha-caps tracking-[0.2em]">
            <Crown className="w-3 h-3 mr-2" />
            Bespoke Wellness
          </Badge>
          <h1 className="text-5xl md:text-7xl text-foreground mb-6 leading-tight font-normal">
            The Art of <span className="italic font-serif">Self-Care</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Indulge in our curated collection of luxury treatments, each designed to restore balance and enhance your natural radiance.
          </p>
        </div>
      </section>

      {/* Elegant Filters */}
      <section ref={filterRef} className="sticky top-[80px] z-40 py-6 px-6 bg-background/80 backdrop-blur-xl border-y border-border/50 shadow-soft">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span className="text-xs uppercase tracking-widest font-medium">Refine:</span>
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40 bg-white/50 border-border/50 rounded-full h-11 text-xs tracking-widest uppercase">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Every Category</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterDuration} onValueChange={setFilterDuration}>
                <SelectTrigger className="w-32 bg-white/50 border-border/50 rounded-full h-11 text-xs tracking-widest uppercase">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  {durations.map(d => (
                    <SelectItem key={d as string} value={d as string}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterPrice} onValueChange={setFilterPrice}>
                <SelectTrigger className="w-36 bg-white/50 border-border/50 rounded-full h-11 text-xs tracking-widest uppercase">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="low">Under $100</SelectItem>
                  <SelectItem value="medium">$100 - $150</SelectItem>
                  <SelectItem value="high">$150+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-background/30">
        <div className="max-w-7xl mx-auto">
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="service-card group hover:shadow-luxury transition-all duration-700 border-0 bg-white/40 backdrop-blur-sm overflow-hidden flex flex-col h-full rounded-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 z-10" />
                  <img
                    src={getServiceImage(service)}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-none">
                    <Badge className="bg-white/90 backdrop-blur-md text-foreground border-0 text-[0.6rem] py-1 px-3 tracking-widest uppercase rounded-full shadow-sm">
                      {service.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl text-foreground font-normal leading-tight group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 flex-grow">
                    {service.description || "Experience rejuvenation with this specialized treatment."}
                  </p>

                  <div className="flex items-center justify-between py-6 border-t border-border/30">
                    <div className="flex items-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
                      <Clock className="w-4 h-4 mr-2 text-primary/50" />
                      {service.duration || 'Session'}
                    </div>
                    <div className="text-2xl font-normal text-primary">
                      ${service.price}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="hero" className="flex-1 rounded-full h-12 shadow-soft hover:shadow-medium transition-all duration-500 group/btn" asChild>
                      <Link to={`/booking?service=${service.id}`} className="flex items-center justify-center">
                        Book Ritual
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-24 animate-gentle-fade">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 mb-6">
                <Search className="w-8 h-8 text-primary/30" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-3">No rituals found matching your criteria.</h3>
              <p className="text-muted-foreground mb-8">Try adjusting your filters to find your perfect treatment.</p>
              <Button
                variant="luxury"
                className="rounded-full px-8"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterPrice('all');
                  setFilterDuration('all');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-t from-primary/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-white/50 backdrop-blur-md text-primary border-primary/10 px-4 py-1 text-sha-caps tracking-widest">
            Personalized Care
          </Badge>
          <h2 className="text-4xl md:text-5xl text-foreground mb-6 font-light">
            Undecided on your <span className="italic font-serif">Perfect Ritual?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed">
            Our wellness consultants are dedicated to curating a bespoke experience tailored to your unique needs. Connect with us for a personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="hero" size="xl" className="rounded-full px-10 shadow-luxury hover:scale-105 transition-all duration-500" asChild>
              <Link to="/booking">
                <Heart className="w-5 h-5 mr-3" />
                Begin Your Journey
              </Link>
            </Button>
          </div>
        </div>

        <div
          ref={decorationRef}
          className="absolute bottom-0 right-4 md:right-10 lg:right-16 translate-y-[5%] pointer-events-none hidden md:block"
        >
          <div className="w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;