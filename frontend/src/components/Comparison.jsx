import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Crown } from 'lucide-react';
import { mockCompetitors } from '../data/mock';

const Comparison = () => {
  const featureKeys = Object.keys(mockCompetitors[0].features);

  return (
    <section className="py-20 bg-gray-50">
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
            Why Choose Windsor AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we stack up against the competition. We're not just another AI tool - we're your complete business transformation partner.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="bg-white rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                  {mockCompetitors.map((competitor, index) => (
                    <th key={index} className={`text-center p-6 ${competitor.highlight ? 'bg-orange-50' : ''}`}>
                      <div className="space-y-2">
                        {competitor.highlight && (
                          <div className="flex justify-center">
                            <Crown className="text-orange-500" size={24} />
                          </div>
                        )}
                        <div className="font-bold text-lg text-gray-900">{competitor.name}</div>
                        <div className="text-sm text-gray-600">{competitor.price}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Features */}
              <tbody>
                {featureKeys.map((feature, index) => (
                  <motion.tr
                    key={feature}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="p-6 font-medium text-gray-900">{feature}</td>
                    {mockCompetitors.map((competitor, compIndex) => (
                      <td key={compIndex} className={`text-center p-6 ${competitor.highlight ? 'bg-orange-50' : ''}`}>
                        {competitor.features[feature] ? (
                          <Check className="text-green-500 mx-auto" size={24} />
                        ) : (
                          <X className="text-red-400 mx-auto" size={24} />
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden">
            {mockCompetitors.map((competitor, index) => (
              <motion.div
                key={index}
                className={`p-6 ${index !== mockCompetitors.length - 1 ? 'border-b border-gray-200' : ''} ${
                  competitor.highlight ? 'bg-orange-50' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  {competitor.highlight && (
                    <Crown className="text-orange-500 mx-auto mb-2" size={24} />
                  )}
                  <h3 className="text-xl font-bold text-gray-900">{competitor.name}</h3>
                  <p className="text-gray-600">{competitor.price}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {featureKeys.map((feature) => (
                    <div key={feature} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{feature}</span>
                      {competitor.features[feature] ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-400" size={16} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience the Windsor Difference?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already transformed their operations with our comprehensive AI platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;