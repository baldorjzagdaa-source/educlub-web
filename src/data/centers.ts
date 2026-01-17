export type Center = {
  id: string;
  name: string;
  category: string;
  location: string;
  image?: string;
  featured?: boolean;
};

export const centers: Center[] = [
  {
    id: "1",
    name: "ABC English Center",
    category: "Language",
    location: "Ulaanbaatar",
    featured: true,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    id: "2",
    name: "IT Academy",
    category: "IT",
    location: "Darkhan",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    id: "3",
    name: "Math Genius",
    category: "Math",
    location: "Ulaanbaatar",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  },
  {
    id: "4",
    name: "Design Pro",
    category: "Design",
    location: "Ulaanbaatar",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
];
