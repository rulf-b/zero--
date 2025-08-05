"use client";
import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import ModelDetail from '@/components/ModelDetail';

export default function HisenseModelDetail({ params }: { params: { model: string } }) {
  // URL'den model parametresini al ve decode et
  const modelName = decodeURIComponent(params.model);
  
  // Hisense markasındaki model datasını ara
  const modelData = tvScreens.find(
    (item) => item.brand === "Hisense" && 
              item.model.toLowerCase() === modelName.toLowerCase()
  );

  // Model bulunamazsa 404 döndür
  if (!modelData) {
    return notFound();
  }

  // ModelDetail componentini render et
  return (
    <ModelDetail
      brand={modelData.brand}
      model={modelData.model}
    />
  );
} 