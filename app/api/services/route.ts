import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const servicesFile = path.join(process.cwd(), 'data', 'services.json');
const pricesFile = path.join(process.cwd(), 'data', 'prices.json');

export async function GET(req: NextRequest) {
  try {
    const servicesData = fs.readFileSync(servicesFile, 'utf-8');
    const pricesData = fs.readFileSync(pricesFile, 'utf-8');
    
    const services = JSON.parse(servicesData);
    const prices = JSON.parse(pricesData);
    
    // Fiyatları senkronize et
    const updatedServices = services.map((service: any) => {
      // Önceden tanımlı hizmetler için özel mapping
      switch (service.title) {
        case 'TV Ekran Değişimi':
          return { ...service, priceRange: prices.screenReplacement ? `₺${prices.screenReplacement} - ₺${Math.round(Number(prices.screenReplacement) * 1.5)}` : service.priceRange };
        case 'LED Panel & Arka Aydınlatma Tamiri':
          return { ...service, priceRange: prices.ledRepairRange || service.priceRange };
        case 'Anakart & Logic Board Tamiri':
          return { ...service, priceRange: prices.motherboardRepairRange || service.priceRange };
        case 'Genel TV Tamiri':
          return { ...service, priceRange: prices.generalQuoteRange || service.priceRange };
        default:
          // Yeni hizmetler için dinamik mapping
          const serviceKey = service.title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '')
            .replace(/tamiri|tamir|değişimi|değişim|onarımı|onarım/g, '')
            .trim();
          
          const dynamicPriceRange = prices[`${serviceKey}Range`];
          if (dynamicPriceRange) {
            return { ...service, priceRange: dynamicPriceRange };
          }
          
          return service;
      }
    });
    
    return new Response(JSON.stringify(updatedServices), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Hizmetler okunamadı.' }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    fs.writeFileSync(servicesFile, JSON.stringify(body, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Hizmetler kaydedilemedi.' }), { status: 500 });
  }
} 