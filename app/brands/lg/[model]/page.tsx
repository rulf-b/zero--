"use client";
import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import ModelDetail from '@/components/ModelDetail';

export default function LGModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  // Büyük/küçük harf duyarsız arama
  const modelData = tvScreens.find(
    (item) => item.brand === "LG" && item.model.toLowerCase() === decodedModel.toLowerCase()
  );

  if (!modelData) return notFound();

  return (
    <ModelDetail
      brand={modelData.brand}
      model={modelData.model}
    />
  );
} 