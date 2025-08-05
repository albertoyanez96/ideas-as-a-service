import React from 'react';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See how we've helped entrepreneurs turn their ideas into successful businesses
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Portfolio gallery with case studies will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;