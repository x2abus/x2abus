import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { mockTestimonials } from '../data/mock';

const Testimonials = ({ onOpenLeadFunnel }) => {
  return (
    <section id="testimonials" className="py-20 bg-white">
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
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See what our clients say about their transformation journey with Windsor AI.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mockTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-50 rounded-3xl p-8 relative hover:shadow-lg transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote size={48} className="text-orange-500" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-orange-500 rounded-3xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Join 1,000+ Businesses Already Growing with Windsor AI
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">1,000+</div>
              <div className="text-orange-100">Active Businesses</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">300%</div>
              <div className="text-orange-100">Average ROI Increase</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">50,000+</div>
              <div className="text-orange-100">AI Tools Generated</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">Support Available</div>
            </motion.div>
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
            Ready to Write Your Success Story?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the growing community of businesses transforming their operations with AI. Your success story could be next.
          </p>
          <motion.button
            onClick={onOpenLeadFunnel}
            className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Transformation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;