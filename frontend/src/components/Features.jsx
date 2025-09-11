import React from 'react';
import { motion } from 'motion/react';
import { Wrench, Users, Shield, Zap, Target, Camera, ArrowRight } from 'lucide-react';
import { mockFeatures, mockAITools } from '../data/mock';

const iconMap = {
  Wrench, Users, Shield, Zap, Target, Camera
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Scale with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From custom CRM systems to AI-generated content, we provide the complete toolkit for modern businesses.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mockFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="text-orange-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* AI Tools Showcase */}
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              100+ AI Business Tools at Your Fingertips
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access our comprehensive library of AI-powered tools designed for every aspect of your business operations.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {mockAITools.slice(0, 24).map((tool, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-medium">{tool}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-500 mb-6">And {mockAITools.length - 24}+ more tools available...</p>
            <motion.button
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 mx-auto hover:bg-orange-600 transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore All Tools</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get a free AI assessment and discover how these tools can revolutionize your operations.
          </p>
          <motion.button
            className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Free Assessment
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;