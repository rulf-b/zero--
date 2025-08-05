import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import ModelDetail from '@/components/ModelDetail';

export default function NordmendeModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Nordmende" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <ModelDetail
      brand={modelData.brand}
      model={modelData.model}
    />
  );
} 