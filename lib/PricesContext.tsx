"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SitePrices } from './sitePrices';

interface PricesContextType {
  prices: SitePrices;
  setPrices: (prices: SitePrices) => void;
  updatePrice: (key: keyof SitePrices, value: any) => void;
  refreshPrices: () => Promise<void>;
  loading: boolean;
}

const PricesContext = createContext<PricesContextType | undefined>(undefined);

export const PricesProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices, setPrices] = useState<SitePrices | null>(null);
  const [loading, setLoading] = useState(true);

  // Fiyatları backend'den çek
  useEffect(() => {
    fetch('/api/prices')
      .then(res => res.json())
      .then(data => {
        setPrices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fiyatlar yüklenirken hata:', error);
        setLoading(false);
      });
  }, []);

  // Fiyat güncelle - yeni yapıya uygun
  const updatePrice = async (key: keyof SitePrices, value: any) => {
    if (!prices) return;
    
    const updated = { ...prices, [key]: value };
    setPrices(updated);
    
    try {
      await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      
      // Güncel fiyatları tekrar çek
      const res = await fetch('/api/prices');
      const data = await res.json();
      setPrices(data);
    } catch (error) {
      console.error('Fiyat güncellenirken hata:', error);
    }
  };

  // Fiyatları yenile
  const refreshPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/prices');
      const data = await res.json();
      setPrices(data);
    } catch (error) {
      console.error('Fiyatlar yenilenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PricesContext.Provider value={{ prices: prices as SitePrices, setPrices, updatePrice, refreshPrices, loading }}>
      {children}
    </PricesContext.Provider>
  );
};

export const usePrices = () => {
  const ctx = useContext(PricesContext);
  if (!ctx) throw new Error('usePrices must be used within a PricesProvider');
  return ctx;
}; 