import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addDetailedPortfolio() {
  const detailedPortfolio = await prisma.portfolio.create({
    data: {
      title: 'GreenCycle: Smart Waste Management Platform',
      description: 'AI-powered waste sorting and recycling management system for smart cities and corporate campuses',
      industry: 'GreenTech & Smart Cities',
      challenge: `Our client, a mid-sized city municipality, was struggling with:
      • 40% contamination rate in recycling streams
      • $2.3M annual waste management costs spiraling out of control
      • Lack of real-time data on waste generation patterns
      • Poor citizen engagement with recycling programs
      • Manual sorting processes leading to inefficiencies
      • No visibility into cost-per-ton metrics by neighborhood`,
      
      solution: `We developed a comprehensive 360° solution including:
      
      **1. AI-Powered Smart Bins**
      • Computer vision for automatic waste sorting
      • IoT sensors for fill-level monitoring
      • Real-time contamination detection
      • Automated alerts for collection optimization
      
      **2. Citizen Engagement App**
      • Gamified recycling rewards program
      • Educational content and recycling guides
      • Photo-based waste identification
      • Community leaderboards and challenges
      
      **3. Municipal Dashboard**
      • Real-time analytics and KPI tracking
      • Route optimization for collection trucks
      • Predictive maintenance for equipment
      • Cost analysis and ROI reporting
      
      **4. Data Analytics Platform**
      • Machine learning models for demand forecasting
      • Waste generation pattern analysis
      • Environmental impact tracking
      • Performance benchmarking against similar cities`,
      
      results: `**Quantifiable Business Impact:**
      • 73% reduction in recycling contamination
      • $890K annual cost savings (38% reduction)
      • 156% increase in citizen participation
      • 45% improvement in collection route efficiency
      • 2.3 tons of CO2 emissions prevented daily
      • 89% customer satisfaction score
      • ROI achieved in 14 months
      • Featured in Smart Cities Weekly as "Innovation of the Year"`,
      
      tier: 'LAUNCH_READY',
      featured: true,
      clientName: 'Sarah Chen',
      clientTitle: 'Director of Environmental Services, Metro City',
      testimonial: `"Ideas as a Service didn't just build us an app - they transformed how our entire city thinks about waste management. The team's deep understanding of both technology and municipal operations was evident from day one. What impressed me most was their ability to translate complex environmental challenges into elegant, user-friendly solutions. The AI-powered sorting system alone has saved us nearly $1M annually, but the real win is the cultural shift toward sustainability in our community. This platform has become the foundation for our smart city initiatives."`,
      
      duration: '12 months (MVP in 4 months)',
      teamSize: '8 specialists (PM, 2 developers, AI engineer, UX designer, data scientist, IoT specialist, municipal advisor)',
      budget: '$89,000 total investment',
      technologies: 'React Native, Node.js, Python (TensorFlow), PostgreSQL, AWS IoT Core, Computer Vision APIs, Stripe, Twilio',
      methodology: 'Agile with 2-week sprints, continuous stakeholder feedback, phased rollout across 3 city districts',
      
      keyMetrics: {
        beforeMetrics: {
          contaminationRate: '40%',
          annualCosts: '$2.3M',
          citizenParticipation: '23%',
          collectionEfficiency: '67%',
          dataVisibility: '10%'
        },
        afterMetrics: {
          contaminationRate: '11%',
          annualCosts: '$1.41M',
          citizenParticipation: '59%',
          collectionEfficiency: '97%',
          dataVisibility: '95%'
        },
        impactMetrics: {
          costSavings: '$890K annually',
          co2Reduction: '2.3 tons daily',
          userEngagement: '156% increase',
          roiTime: '14 months',
          satisfactionScore: '89%'
        }
      },
      
      deliverables: {
        research: [
          'Market Analysis Report (47 pages)',
          'Competitive Landscape Study',
          'User Research & Persona Development',
          'Technical Feasibility Assessment',
          'Municipal Compliance Review'
        ],
        strategy: [
          'Business Model Canvas',
          'Go-to-Market Strategy',
          'Revenue Model Design',
          'Risk Assessment & Mitigation Plan',
          'Implementation Roadmap'
        ],
        design: [
          'Brand Identity Package (logo, colors, typography)',
          'UI/UX Design System (120+ components)',
          'Mobile App Wireframes & Prototypes',
          'Dashboard Mockups & User Flows',
          'Marketing Website Design'
        ],
        development: [
          'Mobile Apps (iOS & Android)',
          'Web Dashboard Platform',
          'AI Sorting Algorithm',
          'IoT Integration System',
          'Real-time Analytics Engine'
        ],
        business: [
          'Financial Projections (5-year model)',
          'Investor Pitch Deck',
          'Partnership Agreements Template',
          'Operations Manual',
          'Training Materials & Documentation'
        ]
      },
      
      timeline: {
        phase1: {
          title: 'Discovery & Research',
          duration: '4 weeks',
          activities: [
            'Stakeholder interviews with 15+ city officials',
            'Site visits to 8 waste management facilities',
            'Analysis of 2 years of historical waste data',
            'Competitor product testing and evaluation',
            'Technical infrastructure assessment'
          ]
        },
        phase2: {
          title: 'Strategy & Design',
          duration: '6 weeks',
          activities: [
            'Business model validation with focus groups',
            'Brand identity development and testing',
            'User experience design and prototyping',
            'Technical architecture planning',
            'Partnership and vendor negotiations'
          ]
        },
        phase3: {
          title: 'MVP Development',
          duration: '12 weeks',
          activities: [
            'Core platform development',
            'AI model training with 10K+ waste images',
            'IoT sensor integration and testing',
            'Beta testing with 100 city employees',
            'Security and compliance validation'
          ]
        },
        phase4: {
          title: 'Launch & Scale',
          duration: '8 weeks',
          activities: [
            'Phased rollout across 3 city districts',
            'Marketing campaign and citizen onboarding',
            'Performance monitoring and optimization',
            'Team training and knowledge transfer',
            'Success metrics measurement and reporting'
          ]
        }
      },
      
      beforeAfter: {
        before: {
          process: 'Manual waste sorting, paper-based tracking, reactive collection schedules',
          technology: 'Excel spreadsheets, basic CRM, no mobile presence',
          engagement: 'Quarterly newsletters, occasional social media posts',
          data: 'Monthly reports, no real-time insights',
          costs: 'Rising costs, no visibility into cost drivers'
        },
        after: {
          process: 'AI-automated sorting, real-time monitoring, predictive analytics',
          technology: 'Modern cloud platform, mobile apps, IoT integration',
          engagement: 'Gamified daily interactions, community challenges',
          data: 'Real-time dashboards, predictive insights, automated reporting',
          costs: 'Transparent cost tracking, optimization recommendations'
        }
      },
      
      lessonsLearned: `**Key Insights from This Project:**
      • Municipal technology adoption requires extensive stakeholder buy-in
      • AI models need local training data to account for regional waste patterns  
      • Citizen engagement is crucial - technology alone isn't enough
      • Phased rollouts reduce risk and improve adoption rates
      • Real-time data visibility transforms decision-making culture
      • Integration with existing city systems is more complex than anticipated
      • Training and change management are as important as the technology`,
      
      nextSteps: `**Future Enhancement Roadmap:**
      • Expand to 5 additional city districts
      • Integration with regional recycling markets
      • AI-powered waste reduction recommendations
      • Carbon credit tracking and monetization
      • Smart city platform integration (traffic, energy, water)
      • B2B expansion to corporate campuses and universities
      • International licensing opportunities in 3 target markets`,
      
      galleryImages: [
        '/images/portfolio/greencycle/smart-bins-installation.jpg',
        '/images/portfolio/greencycle/mobile-app-screens.jpg', 
        '/images/portfolio/greencycle/dashboard-analytics.jpg',
        '/images/portfolio/greencycle/ai-sorting-demo.jpg',
        '/images/portfolio/greencycle/team-training-session.jpg',
        '/images/portfolio/greencycle/citizen-engagement-event.jpg',
        '/images/portfolio/greencycle/before-after-facility.jpg',
        '/images/portfolio/greencycle/metrics-dashboard.jpg'
      ]
    }
  });

  console.log('✅ Detailed portfolio entry created:', detailedPortfolio.title);
  return detailedPortfolio;
}

addDetailedPortfolio()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });