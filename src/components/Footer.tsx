import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-gradient-to-b from-primary via-[#0f1a16] to-[#070b0a] text-white/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/lgo.png"
                alt="Forever Young NYC Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
              <h3 className="text-3xl font-bold text-white tracking-widest">FOREVER YOUNG NYC</h3>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Your sanctuary for luxury wellness and rejuvenation in the heart of the city.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/services" className="hover:text-primary transition-colors">Massage Therapy</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Facial Treatments</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Body Treatments</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Wellness Packages</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/membership" className="hover:text-primary transition-colors">Membership</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>123 Rue de Luxe, Paris</p>
              <p>+33 1 23 45 67 89</p>
              <p>hello@lateliersecret.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-sm text-white/40">
          <p>&copy; 2024 Forever Young NYC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
