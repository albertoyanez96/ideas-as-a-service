import { PrismaClient, ServiceTier, IdeaStatus, DeliverableType, DeliverableStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ideasasaservice.com' },
    update: {},
    create: {
      email: 'admin@ideasasaservice.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'CLIENT',
    },
  });

  const portfolioItems = [
    {
      title: 'EcoFood Delivery',
      description: 'Sustainable food delivery service connecting local organic farms with urban consumers',
      industry: 'Food & Agriculture',
      challenge: 'Client wanted to enter the competitive food delivery space with a sustainability focus but needed market validation and a complete business strategy.',
      solution: 'We conducted comprehensive market research, developed a sustainable business model, created brand identity, and provided go-to-market strategy.',
      results: 'Successfully launched in 3 cities, achieved $500K ARR in first year, secured $2M Series A funding.',
      tier: ServiceTier.LAUNCH_READY,
      featured: true,
    },
    {
      title: 'AI-Powered Fitness Coach',
      description: 'Mobile app providing personalized workout plans using machine learning',
      industry: 'Health & Fitness',
      challenge: 'Technical founder had great AI algorithms but needed business strategy, market positioning, and funding guidance.',
      solution: 'Developed comprehensive business plan, competitive analysis, pricing strategy, and investor pitch deck.',
      results: 'App reached 100K+ downloads, featured in App Store, raised $1.5M seed round.',
      tier: ServiceTier.BLUEPRINT,
      featured: true,
    },
    {
      title: 'Remote Team Collaboration Tool',
      description: 'SaaS platform for distributed teams with advanced project management features',
      industry: 'Software & Technology',
      challenge: 'Entrepreneur needed quick validation of remote work tool concept before committing resources.',
      solution: 'Conducted rapid market research, competitor analysis, and customer interviews to validate market demand.',
      results: 'Validated strong market demand, refined product features, proceeding to development phase.',
      tier: ServiceTier.VALIDATION,
      featured: false,
    },
    {
      title: 'Enterprise Innovation Lab',
      description: 'Corporate innovation program for Fortune 500 company',
      industry: 'Corporate Innovation',
      challenge: 'Large corporation needed to establish internal innovation processes and culture transformation.',
      solution: 'Designed comprehensive innovation framework, training programs, and implementation roadmap.',
      results: 'Launched 15+ internal startups, generated $50M+ in new revenue streams, cultural transformation achieved.',
      tier: ServiceTier.ENTERPRISE,
      featured: true,
    }
  ];

  for (const item of portfolioItems) {
    await prisma.portfolio.create({
      data: item,
    });
  }

  const sampleIdea = await prisma.idea.create({
    data: {
      title: 'Smart Home Energy Manager',
      description: 'IoT device that optimizes home energy usage and reduces electricity bills',
      industry: 'Smart Home & IoT',
      targetAudience: 'Environmentally conscious homeowners aged 30-55',
      tier: ServiceTier.BLUEPRINT,
      price: 2999,
      status: IdeaStatus.IN_PROGRESS,
      userId: testUser.id,
    },
  });

  await prisma.deliverable.createMany({
    data: [
      {
        name: 'Market Research Report',
        description: 'Comprehensive analysis of smart home energy market',
        type: DeliverableType.MARKET_RESEARCH,
        status: DeliverableStatus.COMPLETED,
        ideaId: sampleIdea.id,
      },
      {
        name: 'Business Plan',
        description: 'Complete business strategy and financial projections',
        type: DeliverableType.BUSINESS_PLAN,
        status: DeliverableStatus.IN_PROGRESS,
        ideaId: sampleIdea.id,
      },
      {
        name: 'Brand Identity Package',
        description: 'Logo, color palette, and brand guidelines',
        type: DeliverableType.BRAND_IDENTITY,
        status: DeliverableStatus.PENDING,
        ideaId: sampleIdea.id,
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        content: 'Welcome! We\'ve started working on your Smart Home Energy Manager idea. Our team has completed the initial market research and the results look very promising!',
        sender: 'ADMIN',
        ideaId: sampleIdea.id,
      },
      {
        content: 'Thank you for the update! I\'m excited to see the market research results. When can I expect the business plan?',
        sender: 'CLIENT',
        ideaId: sampleIdea.id,
      },
      {
        content: 'The business plan is currently in development and should be ready by the end of this week. We\'re focusing on the financial projections and go-to-market strategy.',
        sender: 'ADMIN',
        ideaId: sampleIdea.id,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin user: admin@ideasasaservice.com (password: password123)');
  console.log('📧 Test user: test@example.com (password: password123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });