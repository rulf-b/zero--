import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import ModelDetail from '@/components/ModelDetail';

export default function WoonModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Woon" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <ModelDetail
      brand={modelData.brand}
      model={modelData.model}
    />
  );
} 