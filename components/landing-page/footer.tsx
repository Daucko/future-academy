import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  School,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-900 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white">
              <School className="text-primary text-3xl" />
              <span className="text-xl font-bold">Future Academy</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering students to become innovative leaders of tomorrow
              through holistic education and character development.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                'About Us',
                'Admissions',
                'Academics',
                'Campus Life',
                'Careers',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary text-lg mt-0.5" />
                <span>
                  123 Innovation Drive,
                  <br />
                  Green Valley, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary text-lg" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary text-lg" />
                <span>admissions@futureacademy.edu</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <form className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-primary"
              />
              <Button type="button" className="shadow-lg shadow-primary/20">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2024 Future Academy. All rights reserved.</p>
          <div className="flex gap-6">
            {/* Legal Links */}
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-slate-400 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
