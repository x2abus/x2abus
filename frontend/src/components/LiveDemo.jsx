import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Download, CheckCircle, Loader, Sparkles } from 'lucide-react';
import { mockDemoResults } from '../data/mock';

const LiveDemo = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    currentChallenges: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState(null);
  const [hasUsedDemo, setHasUsedDemo] = useState(false);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
    'Education', 'Real Estate', 'Consulting', 'Marketing', 'E-commerce', 'Other'
  ];

  const challenges = [
    'Lead Generation', 'Customer Communication', 'Content Creation', 
    'Process Automation', 'Data Analysis', 'Marketing Campaigns',
    'Customer Support', 'Sales Process', 'Project Management', 'Other'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (hasUsedDemo) {
      alert('Demo already used! Contact us for more personalized tools.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setResults({
        ...mockDemoResults,
        businessName: formData.businessName || mockDemoResults.businessName,
        industry: formData.industry || mockDemoResults.industry,
        targetAudience: formData.targetAudience || mockDemoResults.targetAudience,
        currentChallenges: formData.currentChallenges || mockDemoResults.currentChallenges
      });
      setIsGenerating(false);
      setHasUsedDemo(true);
    }, 3000);
  };

  const handleDownload = (tool) => {
    // Mock download functionality
    alert(`Downloading ${tool.name}... This is a demo version. Contact us for full functionality!`);
  };

  const isFormValid = formData.businessName && formData.industry && formData.targetAudience && formData.currentChallenges;

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Free Live Demo - No Credit Card Required</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See AI in Action for Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your business details below and watch AI generate custom tools specifically for your company in real-time.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <motion.div
              className="bg-gray-50 rounded-2xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Enter your business name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    required
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience *
                  </label>
                  <input
                    type="text"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Who are your ideal customers?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Challenge *
                  </label>
                  <select
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    required
                  >
                    <option value="">What's your biggest challenge?</option>
                    {challenges.map((challenge) => (
                      <option key={challenge} value={challenge}>{challenge}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={!isFormValid || isGenerating || hasUsedDemo}
                  className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                    !isFormValid || hasUsedDemo
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105'
                  }`}
                  whileHover={isFormValid && !hasUsedDemo ? { scale: 1.02 } : {}}
                  whileTap={isFormValid && !hasUsedDemo ? { scale: 0.98 } : {}}
                >
                  {isGenerating ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      <span>Generating AI Tools...</span>
                    </>
                  ) : hasUsedDemo ? (
                    <span>Demo Used - Contact for More</span>
                  ) : (
                    <>
                      <span>Generate AI Tools</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Results Section */}
            <motion.div
              className="lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {!results && !isGenerating && (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="text-orange-500" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Your AI Tools Will Appear Here
                    </h3>
                    <p className="text-gray-600">
                      Fill out the form to see custom AI tools generated specifically for your business.
                    </p>
                  </motion.div>
                )}

                {isGenerating && (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Loader className="text-orange-500 animate-spin" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Generating Your AI Tools...
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Our AI is analyzing your business and creating custom tools.
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Analyzing business requirements...</div>
                      <div className="text-sm text-gray-500">Creating custom solutions...</div>
                      <div className="text-sm text-gray-500">Finalizing your tools...</div>
                    </div>
                  </motion.div>
                )}

                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <CheckCircle className="text-green-500" size={24} />
                        <h3 className="text-xl font-bold text-green-800">
                          Success! Your AI Tools Are Ready
                        </h3>
                      </div>
                      <p className="text-green-700">
                        Based on <strong>{results.businessName}</strong> in the <strong>{results.industry}</strong> industry, 
                        targeting <strong>{results.targetAudience}</strong>, here are your custom AI tools:
                      </p>
                    </div>

                    <div className="space-y-4">
                      {results.generatedTools.map((tool, index) => (
                        <motion.div
                          key={index}
                          className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">{tool.name}</h4>
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                              {tool.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{tool.description}</p>
                          <button
                            onClick={() => handleDownload(tool)}
                            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            <Download size={16} />
                            <span>Download Tool</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-gray-600 mb-4">
                        Want more advanced tools and full functionality?
                      </p>
                      <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
                        Get Full Access
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;