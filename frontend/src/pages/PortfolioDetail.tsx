import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { api } from '../services/api';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  imageUrl?: string;
  tier: string;
  featured: boolean;
  clientName?: string;
  clientTitle?: string;
  testimonial?: string;
  duration?: string;
  teamSize?: string;
  budget?: string;
  technologies?: string;
  methodology?: string;
  keyMetrics?: any;
  deliverables?: any;
  timeline?: any;
  beforeAfter?: any;
  lessonsLearned?: string;
  nextSteps?: string;
  galleryImages: string[];
  createdAt: string;
  updatedAt: string;
}

const PortfolioDetail: React.FC = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get(`/portfolio/${id}`);
        const data = response.data;
        if (data.success) {
          setPortfolio(data.data);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolio();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Portfolio not found</h1>
          <Link to="/portfolio" className="text-blue-600 hover:text-blue-500">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'process', name: 'Process & Timeline', icon: '⏱️' },
    { id: 'deliverables', name: 'Deliverables', icon: '📦' },
    { id: 'results', name: 'Results & Impact', icon: '📈' },
    { id: 'insights', name: 'Insights', icon: '💡' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/portfolio"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Portfolio
            </Link>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                portfolio.featured 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                {portfolio.featured ? '⭐ Featured' : portfolio.tier}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{portfolio.title}</h1>
              <p className="text-xl opacity-90 mb-6">{portfolio.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{portfolio.duration}</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <span>{portfolio.teamSize}</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                  <span>{portfolio.budget}</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              {portfolio.keyMetrics?.impactMetrics && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      {portfolio.keyMetrics.impactMetrics.costSavings}
                    </div>
                    <div className="text-sm opacity-80">Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-300">
                      {portfolio.keyMetrics.impactMetrics.roiTime}
                    </div>
                    <div className="text-sm opacity-80">ROI Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">
                      {portfolio.keyMetrics.impactMetrics.userEngagement}
                    </div>
                    <div className="text-sm opacity-80">User Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300">
                      {portfolio.keyMetrics.impactMetrics.satisfactionScore}
                    </div>
                    <div className="text-sm opacity-80">Satisfaction</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Challenge */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The Challenge</h2>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-6 rounded-r-lg">
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: portfolio.challenge.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Solution</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: portfolio.solution.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            </section>

            {/* Client Testimonial */}
            {portfolio.testimonial && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Client Testimonial</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-6">
                    "{portfolio.testimonial}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {portfolio.clientName?.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{portfolio.clientName}</div>
                      <div className="text-gray-600 dark:text-gray-400">{portfolio.clientTitle}</div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'process' && portfolio.timeline && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Timeline</h2>
            <div className="space-y-8">
              {Object.entries(portfolio.timeline).map(([phase, data]: [string, any], index) => (
                <div key={phase} className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    {index < Object.keys(portfolio.timeline).length - 1 && (
                      <div className="w-px h-24 bg-gray-300 dark:bg-gray-600 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{data.title}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{data.duration}</span>
                      </div>
                      <ul className="space-y-2">
                        {data.activities.map((activity: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'deliverables' && portfolio.deliverables && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Deliverables</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(portfolio.deliverables).map(([category, items]: [string, any]) => (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Results & Impact</h2>
            
            {/* Key Results */}
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-6 rounded-r-lg">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: portfolio.results.replace(/\n/g, '<br/>') }} />
              </div>
            </div>

            {/* Before/After Metrics */}
            {portfolio.keyMetrics && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">Before</h3>
                  <div className="space-y-3">
                    {Object.entries(portfolio.keyMetrics.beforeMetrics).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium text-red-700 dark:text-red-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">After</h3>
                  <div className="space-y-3">
                    {Object.entries(portfolio.keyMetrics.afterMetrics).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium text-green-700 dark:text-green-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Insights</h2>
            
            {portfolio.lessonsLearned && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lessons Learned</h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: portfolio.lessonsLearned.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              </section>
            )}

            {portfolio.nextSteps && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Future Roadmap</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: portfolio.nextSteps.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              </section>
            )}

            {/* Technologies Used */}
            {portfolio.technologies && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.technologies.split(', ').map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Idea?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you create a success story like this one.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;