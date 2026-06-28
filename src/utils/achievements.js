export const ACHIEVEMENTS = [
  { id: "first_day", title: "البداية 🌱", desc: "أكملت أول يوم في التحدي", streak: 1 },
  { id: "week_one", title: "أسبوع قوي ⚡", desc: "حافظت على الستريك 7 أيام", streak: 7 },
  { id: "two_weeks", title: "أسبوعان 💪", desc: "14 يوم متواصل!", streak: 14 },
  { id: "month_one", title: "بطل الشهر 🏆", desc: "30 يوم من الالتزام", streak: 30 },
  { id: "final", title: "المحول 🔥💥", desc: "أكملت تحدي الـ 60 يوم!", streak: 60 },
];

export const TASK_ACHIEVEMENTS = [
  { id: "tasks_10", title: "منجز 🎯", desc: "أكملت 10 مهام", count: 10 },
  { id: "tasks_50", title: "مثابر ⭐", desc: "أكملت 50 مهمة", count: 50 },
  { id: "tasks_100", title: "بطل المهام 🏅", desc: "أكملت 100 مهمة!", count: 100 },
];

export const checkAchievements = (streak, earned, store) => {
  const newOnes = [];
  for (const a of ACHIEVEMENTS) {
    if (streak >= a.streak && !earned.includes(a.id)) {
      newOnes.push(a);
    }
  }
  // Count total completed tasks
  const allTasks = Object.values(store.tasks || {}).flat();
  const completedCount = allTasks.filter((t) => t.done).length;
  for (const a of TASK_ACHIEVEMENTS) {
    if (completedCount >= a.count && !earned.includes(a.id)) {
      newOnes.push(a);
    }
  }
  return newOnes;
};
