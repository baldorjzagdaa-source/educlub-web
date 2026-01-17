export type Center = {
  id: number;
  name: string;
  category: string;
  location: string;
  ageGroup: string;
  price: number;
  rating: number;
  image: string;
};

export const mockCenters: Center[] = [
  {
    id: 1,
    name: "English Excellence",
    category: "Англи хэл",
    location: "Сүхбаатар",
    ageGroup: "7-12",
    price: 180000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
  },
  {
    id: 2,
    name: "Design Studio Pro",
    category: "Дизайн",
    location: "Хан-Уул",
    ageGroup: "18+",
    price: 280000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  },
  {
    id: 3,
    name: "Sport Kids Club",
    category: "Спорт",
    location: "Баянзүрх",
    ageGroup: "6-12",
    price: 150000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07d",
  },
];
