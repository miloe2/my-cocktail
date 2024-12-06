const imageUrls = [
  {
    name: "모히또",
    aliases: ["모히또", "모히토", "Mojito"],
    url: "/images/beverages/mojito.webp",
  },
  {
    name: "마가리타",
    aliases: ["마가리타", "마르가리타", "Margarita"],
    url: "/images/beverages/margarita.webp",
  },
  {
    name: "진",
    aliases: ["진", "Gin"],
    url: "/images/beverages/gin.webp",
  },
  {
    name: "보드카",
    aliases: ["보드카", "Vodka"],
    url: "/images/beverages/vodka.webp",
  },
  {
    name: "위스키",
    aliases: [
      "위스키",
      "Whiskey",
      "패션드",
      "Old Fashioned",
      "맨하탄",
      "맨해튼",
      "Manhattan",
      "버번",
    ],
    url: "/images/beverages/whiskey.webp",
  },
  {
    name: "럼",
    aliases: ["Rum", "럼", "피나콜라다", "피나 콜라다"],
    url: "/images/beverages/rum.webp",
  },
  {
    name: "피즈",
    aliases: ["Fizz", "피즈"],
    url: "/images/beverages/fizz.webp",
  },
  {
    name: "스프리츠",
    aliases: ["Spritz", "Aperol", "스프리츠", "아페롤"],
    url: "/images/beverages/spritz.webp",
  },
  {
    name: "마티니",
    aliases: ["Martini", "마티니"],
    url: "/images/beverages/martini.webp",
  },
  {
    name: "다이키리",
    aliases: ["Daiquiri", "다이키리"],
    url: "/images/beverages/daiquiri.webp",
  },
  {
    name: "선라이즈",
    aliases: ["Sunrise", "선라이즈"],
    url: "/images/beverages/sunrise.webp",
  },

  // ##### 과일 #####
  {
    name: "파인애플",
    aliases: ["Pineapple", "파인애플"],
    url: "/images/beverages/pineapple.webp",
  },
];

const defaultUrl = `/images/beverages/default-cocktail.webp`;

export const findImage = (name: string): string => {
  const found = imageUrls.find((item) =>
    item.aliases.some((alias) => name.includes(alias)),
  );
  return found ? found.url : defaultUrl;
};
