import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Crown } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

interface NavbarProps {
  forceOpaque?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ forceOpaque = false }) => {
  const [isNavOpaque, setIsNavOpaque] = useState(forceOpaque);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Reset state on location change
    setIsMobileMenuOpen(false);

    // If forced opaque, we don't need the scroll logic for transparency
    if (forceOpaque) {
      setIsNavOpaque(true);
    } else {
      setIsNavOpaque(false);
    }
  }, [location, forceOpaque]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      if (!forceOpaque) {
        // Simple logic for pages with hero: become opaque after 100px scroll
        // In Homepage, this was tied to servicesRef, but for a global component, 
        // a scroll threshold is more reliable or we can use the triggerRef approach if needed.
        setIsNavOpaque(scrollPosition > 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Initial animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceOpaque]);

  const navLinks = [
    { title: "Services", href: "/services" },
    { title: "Membership", href: "/membership" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" }
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-2 transition-all duration-700 ${isNavOpaque
        ? "bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl border-b border-primary/10 shadow-medium"
        : isScrolled
          ? "bg-white/10 backdrop-blur-md border-b border-white/5 shadow-soft"
          : "bg-transparent border-transparent shadow-none"
        }`}
    >
      {/* Subtle rose gold accent line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Brand Identity */}
        <div className="flex-1 lg:flex-none flex items-center overflow-visible">
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group cursor-pointer transition-transform duration-300">
            <img
              src="/lgo.png"
              alt="Forever Young NYC Logo"
              className={`h-12 md:h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${!isNavOpaque ? "brightness-0 invert" : ""}`}
            />
            <h1 className={`text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium transition-colors duration-300 whitespace-nowrap ${isNavOpaque ? "text-foreground group-hover:text-primary" : "text-white group-hover:text-white/80"}`}>
              Forever Young NYC
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className={`relative transition-all duration-300 text-sha-caps group ${(location.pathname === link.href)
                ? "text-primary"
                : (isNavOpaque ? "text-foreground hover:text-primary" : "text-white hover:text-white/80")
                }`}
            >
              {link.title}
              <span className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 ${(location.pathname === link.href) ? "w-full bg-gradient-to-r from-primary to-accent" : "w-0 group-hover:w-full " + (isNavOpaque ? "bg-gradient-to-r from-primary to-accent" : "bg-white")
                }`}></span>
            </Link>
          ))}
        </div>

        {/* Right Section: CTA & Mobile Toggle */}
        <div className="flex-1 lg:flex-none flex items-center justify-end space-x-2 md:space-x-5">
          <div className="hidden md:flex items-center space-x-4">

            <Button variant="hero" size="sm" asChild className="shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
              <Link to="/booking" className="text-[0.7rem] uppercase tracking-widest">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-full transition-colors ${isNavOpaque ? "text-foreground hover:bg-black/5" : "text-white hover:bg-white/10"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[60] bg-background/98 backdrop-blur-2xl transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <img src="/lgo.png" alt="Logo" className="h-12 w-auto" />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
          </div>

          <nav className="flex flex-col space-y-8 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className={`text-3xl font-light tracking-widest transition-colors ${location.pathname === link.href ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <Button variant="hero" size="xl" className="w-full text-white" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/booking">Book Now</Link>
            </Button>

          </div>

          <div className="mt-12 text-center text-xs text-muted-foreground uppercase tracking-[0.3em]">
            The Secret Sanctuary
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
