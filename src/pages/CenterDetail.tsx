import { useParams } from "react-router-dom";
import { centers } from "../data/centers";

export default function CenterDetail() {
  const { id } = useParams<{ id: string }>();

  const center = centers.find((c) => c.id === id);

  if (!center) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold">
          ❌ Сургалтын төв олдсонгүй
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Image */}
      <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden mb-6">
        {center.image ? (
          <img
            src={center.image}
            alt={center.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        {center.name}
      </h1>

      {/* Meta info */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
          {center.category}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
          📍 {center.location}
        </span>
      </div>

      {/* Description placeholder */}
      <p className="text-gray-600 leading-relaxed">
        Энэхүү сургалтын төв нь чанартай сургалт, мэргэжлийн
        багш нараараа онцлог. Дэлгэрэнгүй мэдээллийг удахгүй
        нэмэх болно.
      </p>
    </div>
  );
}
