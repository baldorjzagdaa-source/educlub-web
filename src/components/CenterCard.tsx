import { Link } from "react-router-dom";

type Center = {
  id: string;
  name: string;
  category: string;
  location: string;
  image?: string;
  featured?: boolean;
};

export default function CenterCard({ center }: { center: Center }) {
  return (
    <Link
      to={`/centers/${center.id}`}
      className="group border rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="h-40 bg-gray-200 overflow-hidden">
        {center.image ? (
          <img
            src={center.image}
            alt={center.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg leading-tight">
            {center.name}
          </h3>

          {center.featured && (
            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
              ★ Featured
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
            {center.category}
          </span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">
            {center.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
