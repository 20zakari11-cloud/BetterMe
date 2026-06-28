export const THEMES = {
  spring: {
    name: "🌸 الربيع",
    primary: "#6db56d",
    secondary: "#f4a7c3",
    accent: "#ff85a1",
    bg: "#f0faf0",
    bgDark: "#1a2e1a",
    card: "#ffffff",
    cardDark: "#243024",
    gradient: "linear-gradient(135deg, #6db56d 0%, #f4a7c3 100%)",
    emoji: "🌸",
  },
  summer: {
    name: "☀️ الصيف",
    primary: "#f4a020",
    secondary: "#ffd166",
    accent: "#ff6b35",
    bg: "#fffbf0",
    bgDark: "#2e2000",
    card: "#ffffff",
    cardDark: "#3a2800",
    gradient: "linear-gradient(135deg, #f4a020 0%, #ffd166 100%)",
    emoji: "☀️",
  },
  autumn: {
    name: "🍂 الخريف",
    primary: "#c0622f",
    secondary: "#e8956d",
    accent: "#d4500a",
    bg: "#fdf5ec",
    bgDark: "#2e1a0e",
    card: "#ffffff",
    cardDark: "#3a2010",
    gradient: "linear-gradient(135deg, #c0622f 0%, #e8956d 100%)",
    emoji: "🍂",
  },
  winter: {
    name: "❄️ الشتاء",
    primary: "#4a90d9",
    secondary: "#a8d8f0",
    accent: "#2066b0",
    bg: "#eef6fb",
    bgDark: "#0e1e2e",
    card: "#ffffff",
    cardDark: "#142030",
    gradient: "linear-gradient(135deg, #4a90d9 0%, #a8d8f0 100%)",
    emoji: "❄️",
  },
};

export const getTheme = (name, dark = false) => {
  const t = THEMES[name] || THEMES.spring;
  return {
    ...t,
    isDark: dark,
    bgColor: dark ? t.bgDark : t.bg,
    cardColor: dark ? t.cardDark : t.card,
    textColor: dark ? "#f0f0f0" : "#1a1a1a",
    subTextColor: dark ? "#aaaaaa" : "#666666",
  };
};
