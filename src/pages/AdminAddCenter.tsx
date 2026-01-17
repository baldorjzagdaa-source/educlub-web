import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function AdminAddCenter() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) return alert("Зураг сонгоно уу");

    setLoading(true);

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `centers/${fileName}`;

    // Upload image
    const { error: uploadError } = await supabase.storage
      .from("centers")
      .upload(filePath, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("centers")
      .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    // Insert center
    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase.from("centers").insert({
      name: form.name,
      category: form.category,
      location: form.location,
      featured: form.featured,
      image: imageUrl,
      owner: user?.id,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("✅ Сургалтын төв амжилттай нэмэгдлээ");
      setForm({
        name: "",
        category: "",
        location: "",
        featured: false,
      });
      setImageFile(null);
    }

    setLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        🧑‍💼 Сургалтын төв нэмэх
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 border rounded-xl"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Төвийн нэр"
          className="w-full border rounded px-4 py-2"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Ангилал"
          className="w-full border rounded px-4 py-2"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Байршил"
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          ⭐ Онцлох төв
        </label>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Хадгалж байна..." : "Нэмэх"}
        </button>
      </form>
    </div>
  );
}
