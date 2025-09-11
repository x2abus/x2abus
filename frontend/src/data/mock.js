// Mock data for Windsor Online Services AI SaaS Platform

export const mockPricingPlans = [
  {
    id: 1,
    name: "Starter",
    price: 97,
    period: "month",
    description: "Perfect for small businesses getting started with AI",
    features: [
      "5 AI-generated business tools per month",
      "Basic chatbot integration",
      "Email marketing templates",
      "Social media content (10 posts/month)",
      "Basic CRM access",
      "Email support"
    ],
    popular: false,
    buttonText: "Start Free Trial"
  },
  {
    id: 2,
    name: "Growth",
    price: 297,
    period: "month",
    description: "Ideal for growing businesses ready to scale with AI",
    features: [
      "25 AI-generated business tools per month",
      "Advanced chatbot with custom training",
      "Complete marketing automation suite",
      "Social media management (50 posts/month)",
      "Full CRM with pipeline management",
      "Video & image ad content creation",
      "Lead generation tools",
      "Priority support"
    ],
    popular: true,
    buttonText: "Start Free Trial"
  },
  {
    id: 3,
    name: "Enterprise",
    price: 597,
    period: "month",
    description: "For established businesses wanting complete AI integration",
    features: [
      "Unlimited AI-generated business tools",
      "Custom AI agents & applications",
      "White-label client portal",
      "Unlimited social media management",
      "Advanced CRM with automations",
      "Custom app development",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    company: "TechStart Solutions",
    role: "CEO",
    content: "Windsor AI transformed our business operations completely. We went from manual processes to having custom AI tools running our entire workflow. Revenue increased by 300% in just 6 months.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Growth Marketing Pro",
    role: "Marketing Director",
    content: "The AI-generated content and automation tools are incredible. We're now managing 50+ client campaigns with the same team size. The ROI has been phenomenal.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    company: "E-commerce Dynamics",
    role: "Operations Manager",
    content: "The custom CRM and client portal features have streamlined our entire business. Our clients love accessing their AI-generated tools through the portal. Game-changer!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockCompetitors = [
  {
    name: "ChatGPT Plus",
    price: "$20/month",
    features: {
      "AI Writing": true,
      "Custom Business Tools": false,
      "CRM Integration": false,
      "Client Portal": false,
      "Marketing Automation": false,
      "Lead Generation": false,
      "24/7 Support": false,
      "Custom Apps": false
    }
  },
  {
    name: "Jasper AI",
    price: "$39/month",
    features: {
      "AI Writing": true,
      "Custom Business Tools": false,
      "CRM Integration": false,
      "Client Portal": false,
      "Marketing Automation": true,
      "Lead Generation": false,
      "24/7 Support": false,
      "Custom Apps": false
    }
  },
  {
    name: "Windsor AI",
    price: "$297/month",
    features: {
      "AI Writing": true,
      "Custom Business Tools": true,
      "CRM Integration": true,
      "Client Portal": true,
      "Marketing Automation": true,
      "Lead Generation": true,
      "24/7 Support": true,
      "Custom Apps": true
    },
    highlight: true
  }
];

export const mockAITools = [
  "Email Marketing Templates", "Social Media Content Generator", "Sales Page Creator",
  "Blog Post Writer", "Ad Copy Generator", "Lead Magnet Creator", "Chatbot Builder",
  "Customer Service Scripts", "Proposal Generator", "Invoice Templates", "Contract Creator",
  "SEO Content Optimizer", "Video Script Writer", "Podcast Show Notes", "Press Release Generator",
  "Newsletter Templates", "Event Planning Tools", "Survey Creator", "Landing Page Builder",
  "Product Description Writer", "Review Response Generator", "FAQ Creator", "Training Materials",
  "Standard Operating Procedures", "Employee Handbook Generator", "Meeting Minutes Template",
  "Project Proposal Creator", "Budget Planner", "Market Research Tools", "Competitor Analysis",
  "SWOT Analysis Generator", "Business Plan Template", "Pitch Deck Creator", "Investor Reports",
  "Financial Projections", "Cost Calculator", "ROI Calculator", "Conversion Rate Optimizer",
  "A/B Testing Framework", "Customer Journey Mapper", "Persona Creator", "Brand Guidelines",
  "Logo Design Brief", "Website Copy Generator", "Product Launch Checklist", "Crisis Management Plan",
  "PR Strategy Template", "Influencer Outreach Scripts", "Partnership Proposals", "Vendor Agreements",
  "Employee Onboarding Checklists", "Performance Review Templates", "Job Descriptions", "Interview Questions"
];

export const mockFeatures = [
  {
    title: "100+ AI Business Tools",
    description: "Access our comprehensive library of AI-powered business tools designed for every aspect of your operations.",
    icon: "Wrench"
  },
  {
    title: "Custom CRM System",
    description: "Manage your clients, track projects, and automate workflows with our intelligent CRM platform.",
    icon: "Users"
  },
  {
    title: "Client Portal Access",
    description: "Give your clients secure access to their AI-generated tools and resources through a branded portal.",
    icon: "Shield"
  },
  {
    title: "Marketing Automation",
    description: "Automate your entire marketing funnel with AI-powered email sequences, social media, and ad campaigns.",
    icon: "Zap"
  },
  {
    title: "Lead Generation Tools",
    description: "Generate and qualify leads automatically with our advanced AI lead generation and scoring system.",
    icon: "Target"
  },
  {
    title: "Content Creation Suite",
    description: "Create unlimited video, image, and written content for your business and clients using AI.",
    icon: "Camera"
  }
];

export const mockDemoResults = {
  businessName: "TechStart Solutions",
  industry: "Technology Consulting",
  targetAudience: "Small to medium businesses",
  currentChallenges: "Lead generation and client communication",
  generatedTools: [
    {
      name: "Custom Lead Qualification Chatbot",
      description: "AI-powered chatbot that qualifies leads and books consultations automatically",
      type: "chatbot",
      downloadUrl: "#"
    },
    {
      name: "Email Marketing Sequence",
      description: "7-part email sequence to nurture leads and convert them to clients",
      type: "email-template",
      downloadUrl: "#"
    },
    {
      name: "Social Media Content Calendar",
      description: "30-day content calendar with posts optimized for engagement",
      type: "content-calendar",
      downloadUrl: "#"
    }
  ]
};