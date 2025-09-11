import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const logoUrl = "https://customer-assets.emergentagent.com/job_smartwrite-pro/artifacts/kfg8aba2_1000014458_20250803_123026_0000.png";

  const quickLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Demo', href: '#demo' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'AI Business Tools',
    'Custom CRM Systems',
    'Marketing Automation',
    'Lead Generation',
    'Content Creation',
    'Business Consulting'
  ];

  const resources = [
    'Blog',
    'Help Center',
    'API Documentation',
    'Case Studies',
    'Webinars',
    'Free Resources'
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src={logoUrl} 
              alt="Windsor Online Services" 
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming businesses with AI-powered tools and custom solutions. We're your partner in digital transformation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-orange-500" />
                <span className="text-gray-300">windsoronlineservices@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-500" />
                <span className="text-gray-300">(519) 917-4577</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-orange-500" />
                <span className="text-gray-300">Windsor, Ontario, Canada</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-500 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get the latest AI business insights and updates delivered to your inbox.
            </p>
            
            <div className="flex space-x-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-200"
              />
              <button className="bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Windsor Online Services. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;