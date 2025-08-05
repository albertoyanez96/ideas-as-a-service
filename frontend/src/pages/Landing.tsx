import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { SERVICE_TIERS } from '../types';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Turn Ideas into{' '}
              <span className="text-yellow-300">Market-Ready</span>{' '}
              Businesses
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              From concept to launch, we provide everything you need to transform your business idea into a successful venture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200"
              >
                Submit Your Idea
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors duration-200"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Ideas as a Service?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We've helped hundreds of entrepreneurs turn their ideas into successful businesses. Here's what makes us different.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Seasoned professionals with experience in market research, business strategy, and startup development.',
                icon: '👥'
              },
              {
                title: 'Proven Process',
                description: 'Our 5-step methodology has helped launch over 200 successful businesses with $50M+ in combined revenue.',
                icon: '🚀'
              },
              {
                title: 'Complete Package',
                description: 'From market validation to launch strategy, we provide everything you need in one comprehensive service.',
                icon: '📦'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Service Tier
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From quick validation to complete business packages
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_TIERS.map((tier, index) => (
              <div
                key={tier.tier}
                className={`relative p-6 rounded-2xl ${
                  index === 1
                    ? 'border-2 border-blue-500 bg-white dark:bg-gray-900 shadow-xl'
                    : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${tier.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {tier.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {tier.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={`/services/${tier.tier.toLowerCase()}`}
                    className={`block w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      index === 1
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our 5-Step Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From idea submission to business launch
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Submit Idea', description: 'Share your business concept with our team' },
              { step: '02', title: 'Market Research', description: 'We analyze market potential and competition' },
              { step: '03', title: 'Strategy Development', description: 'Create comprehensive business plan and strategy' },
              { step: '04', title: 'Brand & Identity', description: 'Develop brand identity and marketing materials' },
              { step: '05', title: 'Launch Preparation', description: 'Everything needed for successful market entry' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Turn Your Idea into Reality?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of successful entrepreneurs who trusted us with their ideas.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get Started Today
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;