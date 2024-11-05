const imageUrls = [
  {
    name: "모히또",
    aliases: ["모히또", "모히토"],
    url: "/images/beverages/mojito.webp",
  },
  {
    name: "마가리타",
    aliases: ["마가리타", "마르가리타"],
    url: "/images/beverages/margarita.webp",
  },
  {
    name: "진",
    aliases: ["진"],
    url: "/images/beverages/margarita.webp",
  },
  {
    name: "보드카",
    aliases: ["보드카"],
    url: "/images/beverages/margarita.webp",
  },
];

const defaultUrl = `/images/beverages/default-cocktail.webp`;

export const findImage = (name: string): string => {
  const found = imageUrls.find((item) =>
    item.aliases.some((alias) => name.includes(alias)),
  );
  return found ? found.url : defaultUrl;
};
