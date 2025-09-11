import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { mockPricingPlans } from '../data/mock';

const Pricing = ({ onOpenLeadFunnel }) => {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 w-full max-w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include our core AI tools and dedicated support.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockPricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-2 border-orange-500 shadow-2xl'
                  : 'border-2 border-gray-200 shadow-lg hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={14} fill="white" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={plan.buttonText === "Contact Sales" ? onOpenLeadFunnel : onOpenLeadFunnel}
                className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Not sure which plan is right for you? Get a free consultation.
          </p>
          <motion.button
            className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-200 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Free Consultation
          </motion.button>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mt-12 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-bold text-green-800 mb-2">30-Day Money-Back Guarantee</h4>
          <p className="text-green-700">
            Try Windsor AI risk-free. If you're not completely satisfied within 30 days, we'll refund every penny.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;