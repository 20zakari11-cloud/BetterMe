export const getTodayKey = () => new Date().toISOString().split("T")[0];

export const getDayNumber = (startDate) => {
  if (!startDate) return 1;
  const start = new Date(startDate);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(60, diff + 1));
};

export const getGreeting = (name) => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return `صباح الخير، ${name} ☀️`;
  if (h >= 12 && h < 17) return `مرحباً، ${name} 👋`;
  if (h >= 17 && h < 21) return `مساء الخير، ${name} 🌅`;
  return `تصبح على خير، ${name} 🌙`;
};

export const getWeekNumber = (startDate) => {
  const dayNum = getDayNumber(startDate);
  return Math.ceil(dayNum / 7);
};

export const formatDate = (dateKey) => {
  const d = new Date(dateKey);
  return d.toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getDayKey = (startDate, dayNumber) => {
  const start = new Date(startDate);
  start.setDate(start.getDate() + dayNumber - 1);
  return start.toISOString().split("T")[0];
};

export const isRestDay = (dateKey, restDays) => {
  const d = new Date(dateKey);
  const dayName = d.toLocaleDateString("ar", { weekday: "long" });
  return restDays.includes(dayName);
};
