// Sitenin tüm fiyatlarını merkezi olarak tutan yapı
export type SitePrices = {
  screenReplacement: number;
  ledRepair: number;
  motherboardRepair: number;
  samsung55nu7100: number;
  ledRepairRange: string;
  motherboardRepairRange: string;
  generalQuoteRange: string;
  // Yeni fiyat yapısı - her marka/boyut/sorun kombinasyonu için
  [brand: string]: {
    [size: string]: {
      [issue: string]: number;
    };
  } | number | string;
};

export const sitePrices: SitePrices = {
  screenReplacement: 1800,
  ledRepair: 900,
  motherboardRepair: 1200,
  samsung55nu7100: 1800,
  ledRepairRange: '₺500 - ₺2.000',
  motherboardRepairRange: '₺600 - ₺2.500',
  generalQuoteRange: '₺3242 - ₺3442',
  // Yeni fiyat yapısı burada tanımlanacak (API'den gelecek)
}; 