"use client";

import { useState, useEffect } from 'react';

interface StatisticItem {
  value: string;
  title: string;
  description: string;
}

interface Statistics {
  experience: StatisticItem;
  repairedTvs: StatisticItem;
  customerSatisfaction: StatisticItem;
}

interface SiteSettings {
  statistics?: Statistics;
}

const StatisticsSection = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then((data: SiteSettings) => {
        if (data.statistics) {
          setStatistics(data.statistics);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('İstatistikler yüklenemedi:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="bg-gray-200 rounded-lg p-6">
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  const statsArray = [
    statistics.experience,
    statistics.repairedTvs,
    statistics.customerSatisfaction
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {statsArray.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
              {stat.value}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {stat.title}
            </h3>
            <p className="text-sm text-gray-600">
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSection;
