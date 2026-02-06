import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Clock, Star, Heart, Gift, Crown, Quote, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import massageImage1 from '@/assets/massage_1_1767783087775.png';
import massageImage2 from '@/assets/massage_2_1767783110626.png';
import massageImage3 from '@/assets/massage_3_1767783130069.png';
import facialImage1 from '@/assets/facial_1_1767783148788.png';
import facialImage2 from '@/assets/facial_2_1767783169084.png';
import facialImage3 from '@/assets/facial_3_1767783189005.png';
import bodyImage1 from '@/assets/body_1_1767783206652.png';
import bodyImage2 from '@/assets/body_2_1767783225345.png';
import bodyImage3 from '@/assets/body_3_1767783242570.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLElement>(null);
  const membershipRef = useRef<HTMLElement>(null);
  const relaxationRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [offerForm, setOfferForm] = React.useState({
    name: '',
    email: '',
    phone: ''
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Hero video parallax and zoom effect
      gsap.fromTo(heroVideoRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3 }
      );

      // Hero content stagger animation - slower luxury feel
      if (heroContentRef.current) {
        const heroElements = heroContentRef.current.children;
        gsap.fromTo(heroElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.5
          }
        );
      }

      // Services section - refined entrance with batching
      if (servicesRef.current) {
        const serviceCards = servicesRef.current.querySelectorAll('.service-card');
        const sectionHeader = servicesRef.current.querySelector('.section-header');

        // Header elegant slide and fade
        gsap.fromTo(sectionHeader,
          { y: 30, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 85%",
            }
          }
        );

        // Cards staggered rise
        gsap.fromTo(serviceCards,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // Membership section - cinematic parallax reveal
      if (membershipRef.current) {
        const memberCards = membershipRef.current.querySelectorAll('.member-card');
        const header = membershipRef.current.querySelector('.text-center');

        gsap.fromTo(header,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: membershipRef.current,
              start: "top 80%",
            }
          }
        );

        memberCards.forEach((card, index) => {
          gsap.fromTo(card,
            {
              y: 150,
              opacity: 0,
              rotateX: -15,
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1.5,
              delay: index * 0.2,
              ease: "elastic.out(1, 0.75)",
              scrollTrigger: {
                trigger: membershipRef.current,
                start: "top 70%",
              }
            }
          );
        });
      }

      // Relaxation Section - Split reveal
      if (relaxationRef.current) {
        const image = relaxationRef.current.querySelector('.relaxation-image');
        const content = relaxationRef.current.querySelector('.relaxation-content');

        gsap.fromTo(image,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: relaxationRef.current,
              start: "top 75%",
            }
          }
        );

        gsap.fromTo(content,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: relaxationRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // Hero Elements Stagger
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });

      // CTA section - smooth drift reveal
      if (ctaRef.current) {
        const content = ctaRef.current.querySelector('.cta-content');
        gsap.fromTo(content,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Parallax effect on hero video during scroll
      gsap.to(heroVideoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });


      // Founder Section Entrance Animation
      if (founderRef.current) {
        const image = founderRef.current.querySelector('.founder-image');
        const content = founderRef.current.querySelector('.founder-content');
        const contentElements = content?.children;

        if (image) {
          gsap.from(image, {
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 80%",
            }
          });
        }

        if (contentElements) {
          gsap.from(contentElements, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 80%",
            }
          });
        }
      }
    });

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero max-w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
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

        <div ref={heroContentRef} className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center hero-content">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-3 py-1 md:px-4 md:py-2 text-[0.6rem] md:text-sha-caps backdrop-blur-sm tracking-[0.2em] md:tracking-widest">
            <Crown className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Luxury Medi Spa Experience
          </Badge>
          <h1 className="text-4xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight font-normal drop-shadow-md">
            Discover Your
            <span className="block text-white/90 italic font-serif">Secret Sanctuary</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-sm">
            Indulge in bespoke treatments crafted with French elegance and precision.
            Your journey to ultimate wellness begins here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="w-full sm:min-w-[200px] text-sha-caps text-white" asChild>
              <Link to="/booking">
                <Heart className="w-5 h-5 mr-2" />
                Book Your Escape
              </Link>
            </Button>
            <Button variant="luxury" size="xl" className="w-full sm:min-w-[200px] text-sha-caps text-white border-white/20 hover:bg-white hover:text-primary" asChild>
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section ref={servicesRef} className="py-20 px-6 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="section-header text-center mb-16">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Signature Treatments</Badge>
            <h2 className="text-4xl text-foreground mb-4">
              Exquisite Wellness Experiences
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each treatment is thoughtfully designed to restore, rejuvenate, and elevate your natural radiance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Massage Services */}
            <Card className="service-card group hover:shadow-luxury transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
              <div className="relative overflow-hidden rounded-t-lg shrink-0">
                <Carousel
                  className="w-full"
                  opts={{ loop: true }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                >
                  <CarouselContent>
                    {[massageImage1, massageImage2, massageImage3].map((img, idx) => (
                      <CarouselItem key={idx}>
                        <img
                          src={img}
                          alt={`Luxury massage therapy ${idx + 1}`}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CarouselPrevious className="relative left-0 translate-x-0 h-10 w-10 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-md" />
                    <CarouselNext className="relative right-0 translate-x-0 h-10 w-10 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-md" />
                  </div>
                </Carousel>
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="text-xl">Post Op Lymphatic Drainage Massage</CardTitle>
                  <CardDescription className="min-h-[3rem]">Specialized technique designed to reduce swelling and accelerate recovery after surgery</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      60-90 min
                    </span>
                    <span className="text-primary font-semibold">From $150</span>
                  </div>
                  <Button variant="spa" className="w-full mt-auto" asChild>
                    <Link to="/booking?service=lymphatic-drainage">
                      Book Treatment
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* Facial Services */}
            <Card className="service-card group hover:shadow-luxury transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
              <div className="relative overflow-hidden rounded-t-lg shrink-0">
                <Carousel
                  className="w-full"
                  opts={{ loop: true }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                >
                  <CarouselContent>
                    {[massageImage1, massageImage2, massageImage3].map((img, idx) => (
                      <CarouselItem key={idx}>
                        <img
                          src={img}
                          alt={`Swedish Massage ${idx + 1}`}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CarouselPrevious className="relative left-0 translate-x-0 h-10 w-10 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-md" />
                    <CarouselNext className="relative right-0 translate-x-0 h-10 w-10 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-md" />
                  </div>
                </Carousel>
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="text-xl">Swedish Massage</CardTitle>
                  <CardDescription className="min-h-[3rem]">Classic relaxation technique using long, smooth strokes to separate and lengthen muscle fibers</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      60-90 min
                    </span>
                    <span className="text-primary font-semibold">From $120</span>
                  </div>
                  <Button variant="spa" className="w-full mt-auto" asChild>
                    <Link to="/booking?service=swedish-massage">
                      Book Treatment
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* Body Treatments */}
            <Card className="service-card group hover:shadow-luxury transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
              <div className="relative overflow-hidden rounded-t-lg shrink-0">
                <Carousel
                  className="w-full"
                  opts={{ loop: true }}
                  plugins={[
                    Autoplay({
                      delay: 6000,
                    }),
                  ]}
                >
                  <CarouselContent>
                    {[bodyImage1, bodyImage2, bodyImage3].map((img, idx) => (
                      <CarouselItem key={idx}>
                        <img
                          src={img}
                          alt={`Luxury body treatment ${idx + 1}`}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CarouselPrevious className="relative left-0 translate-x-0 h-10 w-10 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-md" />
                    <CarouselNext className="relative right-0 translate-x-0 h-10 w-10 bg-white/20 hover:bg-white/40 border-0 text-white backdrop-blur-md" />
                  </div>
                </Carousel>
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="text-xl">Deep Tissue Massage</CardTitle>
                  <CardDescription className="min-h-[3rem]">Intense pressure therapy targeting deep muscle layers to release chronic tension and knots</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      60-90 min
                    </span>
                    <span className="text-primary font-semibold">From $160</span>
                  </div>
                  <Button variant="spa" className="w-full mt-auto" asChild>
                    <Link to="/booking?service=deep-tissue">
                      Book Treatment
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
          <div className="mt-16 text-center">
            <Button variant="luxury" size="xl" className="min-w-[200px]" asChild>
              <Link to="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section ref={membershipRef} className="py-20 px-6 bg-gradient-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Exclusive Access</Badge>
            <h2 className="text-4xl text-foreground mb-4">
              Membership Privileges
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join our exclusive circle and enjoy priority booking, member rates, and special perks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Silver Membership */}
            <Card className="member-card border-2 border-border hover:border-primary/30 transition-all duration-300 bg-card/90 backdrop-blur-sm flex flex-col h-full">
              <div className="flex flex-col flex-grow">
                <CardHeader className="text-center pb-2">
                  <Badge className="mx-auto mb-2 bg-muted text-muted-foreground w-fit">Silver</Badge>
                  <CardTitle className="text-2xl">Wellness Member</CardTitle>
                  <div className="text-3xl font-bold text-primary">$79<span className="text-base text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col flex-grow">
                  <ul className="space-y-2 text-sm flex-grow">
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />15% off all treatments</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Priority booking</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Monthly wellness consultation</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Complimentary amenities</li>
                  </ul>
                  <Button variant="elegant" className="w-full mt-auto" asChild>
                    <Link to="/contact">Choose Silver</Link>
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* Gold Membership */}
            <Card className="member-card border-2 border-primary shadow-luxury bg-primary/5 backdrop-blur-sm relative flex flex-col h-full">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader className="text-center pb-2">
                  <Badge className="mx-auto mb-2 bg-primary text-primary-foreground w-fit">Gold</Badge>
                  <CardTitle className="text-2xl">Luxury Member</CardTitle>
                  <div className="text-3xl font-bold text-primary">$149<span className="text-base text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col flex-grow">
                  <ul className="space-y-2 text-sm flex-grow">
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />25% off all treatments</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Unlimited spa amenities</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Monthly signature treatment</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Guest privileges</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Personal wellness advisor</li>
                  </ul>
                  <Button variant="hero" className="w-full mt-auto" asChild>
                    <Link to="/contact">Choose Gold</Link>
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* Platinum Membership */}
            <Card className="member-card border-2 border-border hover:border-primary/30 transition-all duration-300 bg-card/90 backdrop-blur-sm flex flex-col h-full">
              <div className="flex flex-col flex-grow">
                <CardHeader className="text-center pb-2">
                  <Badge className="mx-auto mb-2 bg-gradient-primary text-primary-foreground w-fit">Platinum</Badge>
                  <CardTitle className="text-2xl">Elite Member</CardTitle>
                  <div className="text-3xl font-bold text-primary">$299<span className="text-base text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col flex-grow">
                  <ul className="space-y-2 text-sm flex-grow">
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Unlimited treatments</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Private spa suite access</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Concierge services</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Exclusive events</li>
                    <li className="flex items-center"><Star className="w-4 h-4 text-primary mr-2" />Personal therapist</li>
                  </ul>
                  <Button variant="luxury" className="w-full mt-auto" asChild>
                    <Link to="/contact">Choose Platinum</Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Relaxation Special Offer Section - MOVED HERE (Before Founder) */}
      <section ref={relaxationRef} className="py-24 px-6 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative relaxation-image">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl transform -rotate-3 scale-[1.02]"></div>
              <img
                src="/bella.png"
                alt="Relaxation Ionic Foot Massage"
                className="relative z-10 w-full rounded-2xl shadow-2xl object-cover h-[500px] lg:h-[600px]"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-background/95 backdrop-blur border border-border p-6 rounded-xl shadow-luxury max-w-xs">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-2 rounded-full text-primary">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Limited Time Offer</h4>
                    <p className="text-sm text-muted-foreground">Experience ultimate serenity at an exclusive price.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Form Side */}
            <div className="w-full lg:w-1/2 relaxation-content">
              <Badge className="mb-6 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 px-4 py-1.5 text-sm">
                EXCLUSIVE OFFER
              </Badge>
              <h2 className="text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                Complete Relaxation <br />
                <span className="text-primary italic font-serif">Ionic Foot Massage</span>
              </h2>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-2xl text-muted-foreground line-through decoration-red-500/50 decoration-2">$85</span>
                <span className="text-5xl font-bold text-primary">$45</span>
                <span className="text-sm font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded">-45% OFF</span>
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Step away from the chaos and immerse yourself in pure tranquility. Our signature Relaxation Ionic Foot Massage
                combines ancient healing traditions with modern luxury. Let the warm, aromatic waters soothe your tired feet
                while our expert therapists melt away tension, leaving you feeling lighter, revitalized, and profoundly at peace.
              </p>

              <Card className="border-primary/20 bg-background/50 backdrop-blur shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Claim Your Discount</CardTitle>
                  <CardDescription>Fill out the form below to lock in this special price.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    if (!offerForm.name || !offerForm.email || !offerForm.phone) {
                      toast.error("Please fill in all mandatory fields to claim this offer.");
                      return;
                    }
                    // Redirect to booking with special offer
                    window.location.href = "/booking?service=foot-bath-special";
                  }}>
                    <div className="space-y-2">
                      <Label htmlFor="offer-name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="offer-name"
                        placeholder="Your Name"
                        className="bg-white/80"
                        value={offerForm.name}
                        onChange={(e) => setOfferForm({ ...offerForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offer-email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="offer-email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-white/80"
                        value={offerForm.email}
                        onChange={(e) => setOfferForm({ ...offerForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offer-phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="offer-phone"
                        type="tel"
                        placeholder="+1 234 567 890"
                        className="bg-white/80"
                        value={offerForm.phone}
                        onChange={(e) => setOfferForm({ ...offerForm, phone: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-12">
                      Get This Offer <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      *Offer valid for new customers only. Limited availability.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section ref={founderRef} className="py-24 px-6 bg-gradient-secondary overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative founder-image">
              <div className="absolute -inset-4 bg-primary/5 rounded-2xl transform rotate-3"></div>
              <img
                src="/valerie-moore.png"
                alt="Valerie Moore - Owner of Forever Young NYC"
                className="relative z-10 w-full aspect-[4/5] object-cover rounded-xl shadow-luxury transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full md:w-1/2 founder-content">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">The Visionary</Badge>
              <h2 className="text-3xl md:text-4xl text-foreground mb-2">Valerie Moore</h2>
              <p className="text-[0.65rem] md:text-sha-caps text-primary font-medium tracking-[0.15em] md:tracking-widest mb-8">
                Owner / Certified Massage Specialist
              </p>

              <div className="relative">
                <Quote className="absolute -top-4 md:-top-6 -left-4 md:-left-8 w-12 h-12 md:w-16 md:h-16 text-primary/10 -z-10 transform -scale-x-100" />
                <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed italic mb-8">
                  "I believe that true wellness lies in the balance of body and spirit. At Forever Young NYC, we don't just offer treatments; we curate journeys of transformation. Every touch, every scent, and every moment is dedicated to restoring your inner harmony and revealing your natural radiance."
                </p>
              </div>

              <div className="h-[1px] w-24 bg-accent mb-8"></div>

              <Button variant="luxury" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/about">Learn More About Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-6 bg-primary/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center cta-content">
          <h2 className="text-4xl text-foreground mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Book your first appointment and discover the Forever Young NYC difference
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="text-white" asChild>
              <Link to="/booking">
                <Gift className="w-5 h-5 mr-2" />
                Book Your First Visit
              </Link>
            </Button>
            <Button variant="luxury" size="xl" asChild>
              <Link to="/services">Browse All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;