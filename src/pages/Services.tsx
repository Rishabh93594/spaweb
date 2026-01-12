import React, { useState, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Clock, Star, Heart, Filter, Search, Sparkles, Crown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import All Assets - 27 Unique Images
import massage1 from '@/assets/massage_1_1767783087775.png';
import massage2 from '@/assets/massage_2_1767783110626.png';
import massage3 from '@/assets/massage_3_1767783130069.png';

import deepTissue1 from '@/assets/deep_tissue_therapy_detail_1767936451228.png';
import deepTissue2 from '@/assets/deep_tissue_2_1767936661925.png';
import deepTissue3 from '@/assets/deep_tissue_3_1767936681469.png';

import couples1 from '@/assets/couples_massage_ritual_1767936416128.png';
import couples2 from '@/assets/couples_2_1767936699900.png';
import couples3 from '@/assets/couples_3_1767936720083.png';

import facial1 from '@/assets/facial_1_1767783148788.png';
import facial2 from '@/assets/facial_2_1767783169084.png';
import facial3 from '@/assets/facial_3_1767783189005.png';

import diamond1 from '@/assets/diamond_facial_1_1767936740147.png';
import diamond2 from '@/assets/diamond_facial_2_1767936764410.png';
import diamond3 from '@/assets/diamond_facial_3_1767936781558.png';

import gold1 from '@/assets/gold_facial_1_1767936799829.png';
import gold2 from '@/assets/gold_facial_2_1767936816393.png';
import gold3 from '@/assets/gold_facial_3_1767936832903.png';

import body1 from '@/assets/body_1_1767783206652.png';
import body2 from '@/assets/body_2_1767783225345.png';
import body3 from '@/assets/body_3_1767783242570.png';

import salt1 from '@/assets/himalayan_salt_scrub_1767936432487.png';
import salt2 from '@/assets/salt_scrub_2_1767936858314.png';
import salt3 from '@/assets/salt_scrub_3_1767936878641.png';

import cellulite1 from '@/assets/cellulite_1_1767936895218.png';
import cellulite2 from '@/assets/cellulite_2_1767936914026.png';
import cellulite3 from '@/assets/cellulite_3_1767936931343.png';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDuration, setFilterDuration] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  
  const headerRef = useRef<HTMLElement>(null);
   const filterRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

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

  const services = [
    {
      id: 'signature-massage',
      name: 'Signature Swedish Massage',
      category: 'massage',
      description: 'Classic relaxation massage with personalized pressure and aromatherapy oils',
      duration: '60 min',
      price: 120,
      images: [massage1, massage2, massage3],
      popular: true,
      rating: 4.9
    },
    {
      id: 'deep-tissue-massage',
      name: 'Deep Tissue Therapy',
      category: 'massage', 
      description: 'Intensive therapeutic massage targeting muscle tension and stress points',
      duration: '90 min',
      price: 160,
      images: [deepTissue1, deepTissue2, deepTissue3],
      popular: false,
      rating: 4.8
    },
    {
      id: 'couples-massage',
      name: 'Couples Retreat Massage',
      category: 'massage',
      description: 'Romantic dual massage experience in our private couples suite',
      duration: '90 min',
      price: 280,
      images: [couples1, couples2, couples3],
      popular: false,
      rating: 4.9
    },
    {
      id: 'radiance-facial',
      name: 'Radiance HydraFacial',
      category: 'facial',
      description: 'Advanced hydrating facial with immediate glow and anti-aging benefits',
      duration: '75 min',
      price: 95,
      images: [facial1, facial2, facial3],
      popular: true,
      rating: 4.7
    },
    {
      id: 'diamond-facial',
      name: 'Diamond Microdermabrasion',
      category: 'facial',
      description: 'Exfoliating treatment for smoother, brighter, and more youthful skin',
      duration: '60 min',
      price: 110,
      images: [diamond1, diamond2, diamond3],
      popular: false,
      rating: 4.6
    },
    {
      id: 'gold-facial',
      name: 'Anti-Aging Gold Facial',
      category: 'facial',
      description: 'Luxury facial with 24k gold infusion for ultimate skin rejuvenation',
      duration: '90 min',
      price: 185,
      images: [gold1, gold2, gold3],
      popular: false,
      rating: 4.9
    },
    {
      id: 'detox-wrap',
      name: 'Detox Body Wrap',
      category: 'body',
      description: 'Purifying full-body treatment to eliminate toxins and nourish skin',
      duration: '90 min',
      price: 150,
      images: [body1, body2, body3],
      popular: false,
      rating: 4.5
    },
    {
      id: 'himalayan-scrub',
      name: 'Himalayan Salt Scrub',
      category: 'body',
      description: 'Exfoliating body scrub followed by moisturizing massage',
      duration: '75 min',
      price: 135,
      images: [salt1, salt2, salt3],
      popular: true,
      rating: 4.8
    },
    {
      id: 'cellulite-treatment',
      name: 'Cellulite Reduction Treatment',
      category: 'body',
      description: 'Targeted body contouring treatment for smoother, firmer skin',
      duration: '60 min',
      price: 125,
      images: [cellulite1, cellulite2, cellulite3],
      popular: false,
      rating: 4.4
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesDuration = filterDuration === 'all' || 
                           (filterDuration === 'short' && parseInt(service.duration) <= 60) ||
                           (filterDuration === 'medium' && parseInt(service.duration) > 60 && parseInt(service.duration) <= 90) ||
                           (filterDuration === 'long' && parseInt(service.duration) > 90);
    const matchesPrice = filterPrice === 'all' ||
                        (filterPrice === 'low' && service.price <= 100) ||
                        (filterPrice === 'medium' && service.price > 100 && service.price <= 150) ||
                        (filterPrice === 'high' && service.price > 150);
    
    return matchesSearch && matchesCategory && matchesDuration && matchesPrice;
  });

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
            Indulge in our curated collection of luxury treatments, each designed to restore balance and enhance your natural radiance through French precision and organic elements.
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
                <SelectTrigger className="w-44 bg-white/50 border-border/50 rounded-full h-11 text-xs tracking-widest uppercase">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Every Category</SelectItem>
                  <SelectItem value="massage">Massage Rituals</SelectItem>
                  <SelectItem value="facial">Facial Care</SelectItem>
                  <SelectItem value="body">Body Journeys</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDuration} onValueChange={setFilterDuration}>
                <SelectTrigger className="w-44 bg-white/50 border-border/50 rounded-full h-11 text-xs tracking-widest uppercase">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="short">Short (≤ 60 min)</SelectItem>
                  <SelectItem value="medium">Standard (60-90 min)</SelectItem>
                  <SelectItem value="long">Extended (&gt; 90 min)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPrice} onValueChange={setFilterPrice}>
                <SelectTrigger className="w-44 bg-white/50 border-border/50 rounded-full h-11 text-xs tracking-widest uppercase">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="low">Under €100</SelectItem>
                  <SelectItem value="medium">€100 - €150</SelectItem>
                  <SelectItem value="high">€150+</SelectItem>
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
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                      }),
                    ]}
                    className="w-full h-full"
                  >
                    <CarouselContent className="h-full">
                      {service.images.map((img, index) => (
                        <CarouselItem key={index} className="h-full pl-0">
                          <img 
                            src={img} 
                            alt={`${service.name} view ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-700"></div>
                    
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {service.images.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      ))}
                    </div>

                    <div className="absolute inset-y-0 left-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CarouselPrevious className="relative left-0 translate-x-0 bg-white/20 backdrop-blur-md border-0 text-white hover:bg-white/40 h-8 w-8" />
                    </div>
                    <div className="absolute inset-y-0 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CarouselNext className="relative right-0 translate-x-0 bg-white/20 backdrop-blur-md border-0 text-white hover:bg-white/40 h-8 w-8" />
                    </div>
                  </Carousel>
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                    {service.popular && (
                      <Badge className="bg-primary/90 backdrop-blur-md text-white border-0 text-[0.6rem] py-1 px-3 tracking-widest uppercase rounded-full">
                        Signature
                      </Badge>
                    )}
                    <Badge className="bg-white/80 backdrop-blur-md text-foreground border-0 text-[0.6rem] py-1 px-3 tracking-widest uppercase rounded-full">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-soft">
                      <Star className="w-3.5 h-3.5 text-accent fill-current" />
                      <span className="text-xs font-semibold">{service.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl text-foreground font-normal leading-tight group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between py-6 border-t border-border/30">
                    <div className="flex items-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
                      <Clock className="w-4 h-4 mr-2 text-primary/50" />
                      {service.duration}
                    </div>
                    <div className="text-2xl font-normal text-primary">
                      €{service.price}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="hero" className="flex-1 rounded-full h-12 shadow-soft hover:shadow-medium transition-all duration-500 group/btn" asChild>
                      <Link to={`/booking?service=${service.id}`} className="flex items-center justify-center">
                        Book Ritual
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                      </Link>
                    </Button>
                    <Button variant="luxury" size="icon" className="rounded-full w-12 h-12 border-border/50 hover:bg-accent hover:text-white transition-all duration-500">
                      <Heart className="w-4 h-4" />
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
                  setFilterDuration('all');
                  setFilterPrice('all');
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
            <Button variant="luxury" size="xl" className="rounded-full px-10 border-border/50 hover:bg-white transition-all duration-500">
              View Gift Rituals
            </Button>
          </div>
        </div>

        {/* Mockup-perfect decorative icon placement - refined position & floating animation */}
        <div 
          ref={decorationRef}
          className="absolute bottom-0 right-4 md:right-10 lg:right-16 translate-y-[5%] pointer-events-none hidden md:block"
        >
          <img 
            src="/facial.svg" 
            alt="" 
            className="w-48 lg:w-72 h-auto object-contain opacity-40 grayscale"
            style={{ filter: 'brightness(0.7) contrast(1.2)' }}
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;