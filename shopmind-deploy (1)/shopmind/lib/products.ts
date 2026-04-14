export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  rating: number;
  inStock: boolean;
  image?: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "UltraBook Pro 14",
    category: "Laptops",
    price: 749,
    description:
      "Slim and powerful 14-inch laptop with Intel Core i5, 16GB RAM, 512GB SSD. Perfect for everyday productivity and light creative work.",
    tags: ["budget", "lightweight", "productivity", "laptop"],
    rating: 4.3,
    inStock: true,
  },
  {
    id: "p2",
    name: "GameBeast X17",
    category: "Laptops",
    price: 1599,
    description:
      "17-inch gaming powerhouse with RTX 4070, AMD Ryzen 9, 32GB RAM, 1TB NVMe SSD. Dominates AAA titles at max settings.",
    tags: ["gaming", "high-performance", "laptop", "rtx"],
    rating: 4.7,
    inStock: true,
  },
  {
    id: "p3",
    name: "BudgetBook 11",
    category: "Laptops",
    price: 299,
    description:
      "Affordable 11-inch Chromebook with 8GB RAM and 128GB storage. Ideal for students and basic web browsing.",
    tags: ["budget", "student", "chromebook", "cheap", "affordable"],
    rating: 3.9,
    inStock: true,
  },
  {
    id: "p4",
    name: "ProStation Desktop",
    category: "Desktops",
    price: 1199,
    description:
      "Mid-tower workstation with Intel Core i7, 32GB RAM, RTX 3060, 2TB HDD + 512GB SSD. Great for content creators.",
    tags: ["desktop", "workstation", "content-creation", "powerful"],
    rating: 4.5,
    inStock: true,
  },
  {
    id: "p5",
    name: "UltraWide 34\" Monitor",
    category: "Monitors",
    price: 449,
    description:
      "34-inch curved ultrawide QHD monitor, 144Hz, 1ms response. Immersive experience for gaming and multitasking.",
    tags: ["monitor", "ultrawide", "gaming", "curved", "display"],
    rating: 4.6,
    inStock: true,
  },
  {
    id: "p6",
    name: "MechType Pro Keyboard",
    category: "Accessories",
    price: 129,
    description:
      "Tenkeyless mechanical keyboard with Cherry MX Red switches, RGB backlight. Loved by gamers and coders alike.",
    tags: ["keyboard", "mechanical", "gaming", "rgb", "accessories"],
    rating: 4.8,
    inStock: false,
  },
  {
    id: "p7",
    name: "PixelShot Camera",
    category: "Cameras",
    price: 899,
    description:
      "Mirrorless camera with 24MP sensor, 4K video, 5-axis stabilization. Beginner-friendly with pro-level results.",
    tags: ["camera", "photography", "mirrorless", "4k", "video"],
    rating: 4.4,
    inStock: true,
  },
  {
    id: "p8",
    name: "SoundMax Headphones",
    category: "Audio",
    price: 199,
    description:
      "Over-ear ANC headphones with 40-hour battery, aptX HD, premium drivers. Studio-quality sound for music lovers.",
    tags: ["headphones", "audio", "anc", "wireless", "music"],
    rating: 4.5,
    inStock: true,
  },
];
