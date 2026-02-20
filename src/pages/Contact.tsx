import React, { useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const headerRef = useRef<HTMLElement>(null);
  const contactGridRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    reason: 'Signature Massage',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all mandatory fields: Name, Phone, and Email.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      toast.success("Inquiry sent successfully! We will contact you shortly.");
      setFormData({ name: '', email: '', phone: '', reason: 'Signature Massage', message: '' });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send inquiry. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

      // Contact Grid Animation
      if (contactGridRef.current) {
        const children = contactGridRef.current.children;
        gsap.fromTo(children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactGridRef.current,
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

  const contactDetails = [
    {
      icon: MapPin,
      title: 'Our Sanctuary',
      detail: '123 Avenue des Champs-Élysées, Paris, France',
    },
    {
      icon: Phone,
      title: 'Direct Line',
      detail: '+33 1 23 45 67 89',
    },
    {
      icon: Mail,
      title: 'General Inquiries',
      detail: 'concierge@foreveryoung.nyc',
    },
    {
      icon: Clock,
      title: 'Ritual Hours',
      detail: 'Mon - Sun: 9:00 AM - 9:00 PM',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <Navbar forceOpaque={true} />

      {/* Hero Header */}
      <section ref={headerRef} className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1 text-sha-caps tracking-[0.2em]">
            <MessageSquare className="w-3 h-3 mr-2" />
            Connect With Us
          </Badge>
          <h1 className="text-5xl md:text-7xl text-foreground mb-6 leading-tight font-normal">
            Begin Your <span className="italic font-serif">Dialogue</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Our wellness consultants are here to curate your perfect journey. Reach out for bespoke inquiries or personalized ritual planning.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div ref={contactGridRef} className="grid lg:grid-cols-5 gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-8">
                {contactDetails.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-soft">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-1">{item.title}</h4>
                      <p className="text-lg text-foreground font-light">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-border/30">
                <h4 className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-6">Social Presence</h4>
                <div className="flex gap-4">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <Button key={i} variant="luxury" size="icon" className="rounded-full w-12 h-12 border-border/50 hover:bg-primary hover:text-white transition-all duration-500">
                      <Icon className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-luxury border border-white/20">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-medium text-muted-foreground ml-1">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-border/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-light"
                        placeholder="Jean-Luc Picard"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-medium text-muted-foreground ml-1">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-border/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-light"
                        placeholder="jeanluc@enterprise.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-medium text-muted-foreground ml-1">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/50 border border-border/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-light"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-medium text-muted-foreground ml-1">Interested Ritual</label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full bg-white/50 border border-border/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-light appearance-none backdrop-blur-md"
                    >
                      <option>Signature Massage</option>
                      <option>Radiance Facial</option>
                      <option>Body Journey</option>
                      <option>Membership Inquiry</option>
                      <option>Other / General</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-medium text-muted-foreground ml-1">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-white/50 border border-border/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-light min-h-[150px] resize-none"
                      placeholder="Tell us about your wellness goals..."
                    ></textarea>
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full rounded-2xl h-14 shadow-luxury hover:scale-[1.02] transition-all duration-500 group">
                    Send Inquiry
                    <Send className="w-4 h-4 ml-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative SVG placement */}
      <section className="relative h-64 overflow-hidden">
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

export default Contact;
