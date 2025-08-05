import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceTier: React.FC = () => {
  const { tier } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'Unknown'} Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Detailed information about this service tier
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Service tier details page will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceTier;