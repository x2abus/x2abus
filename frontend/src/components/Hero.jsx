import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

const Hero = ({ onOpenLeadFunnel }) => {
  const scrollToDemo = () => {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-20 md:h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-4 md:right-20 w-24 h-24 md:w-32 md:h-32 bg-orange-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-16 md:h-16 bg-orange-400 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 relative z-10 w-full max-w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-2 md:px-4 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} className="md:w-4 md:h-4" />
            <span>Trusted by 1000+ Businesses Worldwide</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Business with
            <span className="text-orange-500 block">AI-Powered Tools</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get custom AI agents, automated workflows, and business tools built specifically for your company. No coding required.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8 lg:space-x-12 mb-8 md:mb-12 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Zap className="text-orange-500" size={18} />
              <span className="text-gray-700 font-medium text-sm md:text-base">100+ AI Tools Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="text-orange-500" size={18} />
              <span className="text-gray-700 font-medium text-sm md:text-base">Custom CRM Included</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="text-orange-500" size={18} />
              <span className="text-gray-700 font-medium text-sm md:text-base">24/7 AI Support</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={scrollToDemo}
              className="w-full sm:w-auto bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg flex items-center justify-center space-x-2 hover:bg-orange-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Try Live Demo</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              className="w-full sm:w-auto bg-white text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Assessment
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 md:mt-16 text-center px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">Trusted by leading companies</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60">
              <div className="text-gray-400 font-semibold text-sm">TechStart</div>
              <div className="text-gray-400 font-semibold text-sm">GrowthCorp</div>
              <div className="text-gray-400 font-semibold text-sm">InnovateNow</div>
              <div className="text-gray-400 font-semibold text-sm">ScaleUp</div>
              <div className="text-gray-400 font-semibold text-sm">NextGen</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-300 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;