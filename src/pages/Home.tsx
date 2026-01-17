import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import CenterCard from "../components/CenterCard";
import { Link } from "react-router-dom";

type Center = {
  id: string;
  name: string;
  category: string;
  location: string;
  image?: string;
  featured?: boolean;
};

export default function Home() {
  const [featuredCenters, setFeaturedCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from("centers")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error && data) {
        setFeaturedCenters(data);
      }
      setLoading(false);
    }

    fetchFeatured();
  }, []);

  return (
    <div className="container mx-auto px-4 py-14">
      {/* Hero */}
      <section className="mb-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Сургалтын төвүүдийг нэг дороос
        </h1>
        <p className="text-gray-600 max-w-2xl mb-6">
          EduClub.mn — чанартай сургалтын төвүүдийг хайж, харьцуулж,
          сонгох платформ.
        </p>

        <Link
          to="/centers"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded"
        >
          Сургалтын төвүүдийг үзэх
        </Link>
      </section>

      {/* Featured */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">⭐</span>
          <h2 className="text-2xl font-bold">
            Онцлох сургалтын төвүүд
          </h2>
        </div>

        {loading && <p>Ачааллаж байна...</p>}

        {!loading && featuredCenters.length === 0 && (
          <p className="text-gray-500">
            Одоогоор онцлох төв алга байна
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCenters.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      </section>
    </div>
  );
}
