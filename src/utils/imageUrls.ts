// utils/imageUrls.ts
const imageUrls = [
  { name: "모히또", url: "/images/beverages/mojito.webp" },
  { name: "마가리타", url: "/images/beverages/margarita.webp" },
];

export const findImage = (name: string): string | undefined => {
  const found = imageUrls.find((item) => name.includes(item.name));
  return found ? found.url : undefined;
};
