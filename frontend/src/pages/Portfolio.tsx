import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, StarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { api } from '../services/api';

interface PortfolioItem {
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
  duration?: string;
  budget?: string;
  keyMetrics?: any;
  createdAt: string;
}

const Portfolio: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await api.get('/portfolio');
        const data = response.data;
        if (data.success) {
          setPortfolios(data.data);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const filteredPortfolios = portfolios.filter((portfolio: PortfolioItem) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return portfolio.featured;
    return portfolio.tier === filter;
  });

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'featured', name: 'Featured' },
    { id: 'VALIDATION', name: 'Validation' },
    { id: 'BLUEPRINT', name: 'Blueprint' },
    { id: 'LAUNCH_READY', name: 'Launch Ready' },
    { id: 'ENTERPRISE', name: 'Enterprise' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Success Stories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how we've transformed business ideas into market-ready ventures across industries. 
            Each project showcases our comprehensive approach to turning concepts into profitable businesses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === filterOption.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {filterOption.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    {portfolio.featured && (
                      <div className="flex items-center bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                        <StarIcon className="h-3 w-3 mr-1" />
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                      {portfolio.title}
                    </h3>
                    <p className="text-white/80 text-sm">{portfolio.industry}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {portfolio.description}
                  </p>

                  {/* Metrics */}
                  {portfolio.keyMetrics?.impactMetrics && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          {portfolio.keyMetrics.impactMetrics.costSavings}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Savings</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {portfolio.keyMetrics.impactMetrics.roiTime}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">ROI Time</div>
                      </div>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {portfolio.duration || 'N/A'}
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {portfolio.budget || 'Custom'}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/portfolio/${portfolio.id}`}
                    className="flex items-center justify-between w-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium px-4 py-3 rounded-lg transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400"
                  >
                    <span>View Case Study</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Success Story?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join these successful entrepreneurs who trusted us with their ideas.
            </p>
            <Link
              to="/submit"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Submit Your Idea
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;