const wp = (p: string) => `https://novoreperio.com/wp-content/uploads/${p}`;
export const CLIENT_LOGOS = [
  { alt: "Mahkota", src: wp("2022/02/mmc-final-1.png") },
  { alt: "Matterport", src: wp("2025/01/mp-logo-v-lock-rgb-color-black.png") },
  { alt: "Glomac", src: wp("2022/02/glomac-1.png") },
  { alt: "KLCC", src: wp("2022/02/klcc-1.png") },
  { alt: "Mah Sing", src: wp("2022/02/mahsing-1.png") },
  { alt: "Maxis", src: wp("2022/02/maxis.png") },
  { alt: "MHUB", src: wp("2022/02/Mhub-1.png") },
  { alt: "Yamaha", src: wp("2022/02/yamaha-logo-1-1.png") },
  { alt: "UEM", src: wp("2022/02/uem-1.png") },
  { alt: "SP Setia", src: wp("2022/02/setia-1.png") },
] as const;
export const AFFILIATION_LOGOS = [
  { alt: "PROPTECH", src: wp("2022/02/prop.png") },
  { alt: "MDEC / Malaysia Digital", src: wp("2022/02/mdec.png") },
  { alt: "MHTC", src: wp("2023/01/Untitled-1.jpg") },
  { alt: "Penang Convention & Exhibition Bureau", src: wp("2022/11/PCeb-web2.png") },
  { alt: "Malaysia Convention & Exhibition Bureau", src: wp("2022/11/MyCeb-web.png") },
] as const;
