const imageUrls = [
  {
    name: "모히또",
    aliases: ["모히또", "모히토", "mojito"],
    url: "/images/beverages/mojito.webp",
  },
  {
    name: "마가리타",
    aliases: ["마가리타", "마르가리타", "margarita"],
    url: "/images/beverages/margarita.webp",
  },
  {
    name: "진",
    aliases: ["진", "gin"],
    url: "/images/beverages/gin.webp",
  },
  {
    name: "보드카",
    aliases: ["보드카", "vodka"],
    url: "/images/beverages/vodka.webp",
  },
  {
    name: "위스키",
    aliases: ["위스키", "whiskey"],
    url: "/images/beverages/whiskey.webp",
  },
  {
    name: "럼",
    aliases: ["rum", "럼", "피나콜라다"],
    url: "/images/beverages/rum.webp",
  },
];

const defaultUrl = `/images/beverages/default-cocktail.webp`;

export const findImage = (name: string): string => {
  const found = imageUrls.find((item) =>
    item.aliases.some((alias) => name.includes(alias)),
  );
  return found ? found.url : defaultUrl;
};
