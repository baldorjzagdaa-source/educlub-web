import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import CenterCard from "../components/CenterCard";

type Center = {
  id: string;
  name: string;
  category: string;
  location: string;
  image?: string;
  featured?: boolean;
};

const PAGE_SIZE = 9;

export default function Centers() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  async function fetchCenters(reset = false) {
    if (loading) return;
    setLoading(true);

    const from = reset ? 0 : page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("centers")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }
    if (category) {
      query = query.eq("category", category);
    }
    if (location) {
      query = query.eq("location", location);
    }

    const { data } = await query;

    if (data) {
      if (reset) {
        setCenters(data);
      } else {
        setCenters((prev) => [...prev, ...data]);
      }

      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchCenters(true);
  }, [search, category, location]);

  function loadMore() {
    setPage((p) => p + 1);
    fetchCenters();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Сургалтын төвүүд</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          placeholder="Хайх..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded"
        />

        <input
          placeholder="Ангилал"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        />

        <input
          placeholder="Байршил"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded"
        />
      </div>

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {centers.map((c) => (
          <CenterCard key={c.id} center={c} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 border rounded bg-white hover:bg-gray-100"
          >
            {loading ? "Ачааллаж байна..." : "Дараагийнх"}
          </button>
        </div>
      )}

      {!hasMore && centers.length > 0 && (
        <p className="text-center text-gray-500 mt-10">
          Бүх сургалтын төвүүд харагдлаа
        </p>
      )}
    </div>
  );
}
