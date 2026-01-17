type Props = {
  category: string;
  setCategory: (v: string) => void;
};

export default function FilterSidebar({ category, setCategory }: Props) {
  return (
    <aside className="filter-sidebar">
      <h3>Шүүлтүүр</h3>

      <label>
        Сургалтын төрөл
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Бүгд</option>
          <option value="Англи хэл">Англи хэл</option>
          <option value="Дизайн">Дизайн</option>
          <option value="Програмчлал">Програмчлал</option>
        </select>
      </label>
    </aside>
  );
}
