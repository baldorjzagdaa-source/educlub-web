import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

type Center = {
  id: string;
  name: string;
  category: string;
  location: string;
  image?: string;
  featured?: boolean;
};

export default function AdminCenters() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [editing, setEditing] = useState<Center | null>(null);

  async function fetchCenters() {
    const { data } = await supabase
      .from("centers")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setCenters(data);
  }

  useEffect(() => {
    fetchCenters();
  }, []);

  async function remove(id: string) {
    if (!confirm("Устгах уу?")) return;

    await supabase.from("centers").delete().eq("id", id);
    fetchCenters();
  }

  async function save() {
    if (!editing) return;

    await supabase
      .from("centers")
      .update({
        name: editing.name,
        category: editing.category,
        location: editing.location,
        image: editing.image,
        featured: editing.featured,
      })
      .eq("id", editing.id);

    setEditing(null);
    fetchCenters();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        🧑‍💼 Admin – Сургалтын төвүүд
      </h1>

      <div className="space-y-4">
        {centers.map((c) => (
          <div
            key={c.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-500">
                {c.category} · {c.location}
              </p>
              {c.featured && (
                <span className="text-xs text-yellow-600">
                  ⭐ Онцлох
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditing(c)}
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => remove(c.id)}
                className="px-3 py-1 border rounded text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md space-y-3">
            <h2 className="font-bold text-lg mb-2">Edit center</h2>

            <input
              className="w-full border px-3 py-2"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />

            <input
              className="w-full border px-3 py-2"
              value={editing.category}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value,
                })
              }
            />

            <input
              className="w-full border px-3 py-2"
              value={editing.location}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  location: e.target.value,
                })
              }
            />

            <input
              className="w-full border px-3 py-2"
              value={editing.image || ""}
              onChange={(e) =>
                setEditing({ ...editing, image: e.target.value })
              }
            />

            <label className="flex gap-2 items-center text-sm">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    featured: e.target.checked,
                  })
                }
              />
              ⭐ Онцлох
            </label>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
