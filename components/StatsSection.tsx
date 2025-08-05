"use client";

import { useState, useEffect } from 'react';

interface Statistics {
  experience: number;
  repairedTvs: number;
  customerSatisfaction: number;
}

const StatsSection = () => {
  const [stats, setStats] = useState<Statistics>({
    experience: 15,
    repairedTvs: 5000,
    customerSatisfaction: 98
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const data = await response.json();
          if (data.statistics) {
            setStats({
              experience: data.statistics.experience || 15,
              repairedTvs: data.statistics.repairedTvs || 5000,
              customerSatisfaction: data.statistics.customerSatisfaction || 98
            });
          }
        }
      } catch (error) {
        console.error('İstatistikler yüklenemedi:', error);
        // Fallback veriler zaten state'de mevcut
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-lg animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-2xl font-bold text-blue-600 mb-2">{stats.experience}+</div>
        <p className="text-sm text-gray-600 mb-1">Yıllık Deneyim</p>
        <p className="text-xs text-gray-500">Sektördeki tecrübemiz</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-2xl font-bold text-green-600 mb-2">{stats.repairedTvs.toLocaleString()}+</div>
        <p className="text-sm text-gray-600 mb-1">Onarılan TV</p>
        <p className="text-xs text-gray-500">Tüm marka ve modeller</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-2xl font-bold text-gray-900 mb-2">%{stats.customerSatisfaction}</div>
        <p className="text-sm text-gray-600 mb-1">Müşteri Memnuniyeti</p>
        <p className="text-xs text-gray-500">Google & WhatsApp yorumları</p>
      </div>
    </div>
  );
};

export default StatsSection;
