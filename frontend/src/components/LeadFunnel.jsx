import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, User, Mail, Phone, Building, MessageSquare, Loader } from 'lucide-react';

const LeadFunnel = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    businessGoals: '',
    currentChallenges: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/lead-funnel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Something went wrong. Please try again or contact us directly at windsoronlineservices@gmail.com');
      }
    } catch (error) {
      alert('Network error. Please try again or contact us directly at windsoronlineservices@gmail.com');
    }
    
    setIsSubmitting(false);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        return formData.company && formData.role;
      case 3:
        return formData.businessGoals && formData.currentChallenges;
      case 4:
        return formData.budget && formData.timeline;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We've received your information and will contact you within 24 hours with a personalized AI strategy for your business.
          </p>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Get Your Free AI Business Assessment
          </h2>
          <p className="text-gray-600">
            Tell us about your business and we'll create a custom AI strategy for you.
          </p>
          
          {/* Progress Bar */}
          <div className="flex justify-center mt-6 space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= currentStep ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="mr-2 text-orange-500" size={24} />
                Let's start with your contact information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Business Email Address *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number (Optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building className="mr-2 text-orange-500" size={24} />
                Tell us about your business
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  <option value="">Select Your Role *</option>
                  <option value="CEO/Founder">CEO/Founder</option>
                  <option value="Marketing Director">Marketing Director</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="IT Director">IT Director</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="mr-2 text-orange-500" size={24} />
                What are your business goals?
              </h3>
              <div className="space-y-4">
                <textarea
                  name="businessGoals"
                  value={formData.businessGoals}
                  onChange={handleInputChange}
                  placeholder="What are your main business goals for the next 12 months? *"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                  required
                />
                <textarea
                  name="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={handleInputChange}
                  placeholder="What are your biggest business challenges right now? *"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                  required
                />
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="mr-2 text-orange-500" size={24} />
                Final details
              </h3>
              <div className="space-y-4">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  <option value="">What's your monthly budget for AI tools? *</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 - $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                  <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  <option value="">When would you like to get started? *</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="Within 3 months">Within 3 months</option>
                  <option value="Within 6 months">Within 6 months</option>
                  <option value="Just exploring">Just exploring options</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Cancel
            </button>
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            {currentStep < 4 ? (
              <motion.button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className={`px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all duration-200 ${
                  isStepValid(currentStep)
                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={isStepValid(currentStep) ? { scale: 1.05 } : {}}
                whileTap={isStepValid(currentStep) ? { scale: 0.95 } : {}}
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={!isStepValid(4) || isSubmitting}
                className={`px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all duration-200 ${
                  isStepValid(4) && !isSubmitting
                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={isStepValid(4) && !isSubmitting ? { scale: 1.05 } : {}}
                whileTap={isStepValid(4) && !isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={16} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Get My Free Assessment</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadFunnel;