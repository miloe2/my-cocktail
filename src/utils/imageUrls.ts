// utils/imageUrls.ts
const imageUrls = [
  { name: "모히또", url: "/images/beverages/mojito.webp" },
  { name: "마가리타", url: "/images/beverages/margarita.webp" },
];

const defaultUrl = `/images/beverages/default-cocktail.webp`;
export const findImage = (name: string): string  => {
  const found = imageUrls.find((item) => name.includes(item.name));
  return found ? found.url : defaultUrl;
};
