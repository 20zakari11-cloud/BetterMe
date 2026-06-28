import { create } from "zustand";
import { persist } from "zustand/middleware";
import { checkAchievements } from "../utils/achievements";
import { getTodayKey, getDayNumber } from "../utils/dateUtils";

const defaultUser = {
  name: "",
  goal: "",
  theme: "spring",
  darkMode: false,
  restDays: [],
  negativeThings: [],
  positiveThings: [],
  onboardingComplete: false,
  challengeStartDate: null,
};

export const useStore = create(
  persist(
    (set, get) => ({
      user: defaultUser,
      tasks: {},       // { "2024-01-01": [{id, title, note, done}] }
      days: {},        // { "2024-01-01": { completed, streakDay } }
      streak: 0,
      bestStreak: 0,
      weeklyReflections: {},  // { weekNumber: text }
      achievements: [],
      currentTab: "home",

      setTab: (tab) => set({ currentTab: tab }),

      updateUser: (data) =>
        set((s) => ({ user: { ...s.user, ...data } })),

      completeOnboarding: (data) => {
        const startDate = new Date().toISOString().split("T")[0];
        set((s) => ({
          user: {
            ...s.user,
            ...data,
            challengeStartDate: startDate,
            onboardingComplete: true,
          },
        }));
      },

      getTodayTasks: () => {
        const key = getTodayKey();
        return get().tasks[key] || [];
      },

      getTasksForDay: (dateKey) => {
        return get().tasks[dateKey] || [];
      },

      addTask: (title, note = "") => {
        const key = getTodayKey();
        set((s) => {
          const existing = s.tasks[key] || [];
          const newTask = {
            id: Date.now().toString(),
            title,
            note,
            done: false,
            createdAt: Date.now(),
          };
          return { tasks: { ...s.tasks, [key]: [...existing, newTask] } };
        });
      },

      addTaskForDay: (dateKey, title, note = "") => {
        set((s) => {
          const existing = s.tasks[dateKey] || [];
          const newTask = {
            id: Date.now().toString() + Math.random(),
            title,
            note,
            done: false,
            createdAt: Date.now(),
          };
          return { tasks: { ...s.tasks, [dateKey]: [...existing, newTask] } };
        });
      },

      updateTask: (taskId, updates, dateKey) => {
        const key = dateKey || getTodayKey();
        set((s) => {
          const dayTasks = (s.tasks[key] || []).map((t) =>
            t.id === taskId ? { ...t, ...updates } : t
          );
          const updated = { tasks: { ...s.tasks, [key]: dayTasks } };
          return updated;
        });
        // Check day completion after task update
        setTimeout(() => get().checkDayCompletion(key), 100);
      },

      deleteTask: (taskId, dateKey) => {
        const key = dateKey || getTodayKey();
        set((s) => ({
          tasks: {
            ...s.tasks,
            [key]: (s.tasks[key] || []).filter((t) => t.id !== taskId),
          },
        }));
      },

      copyTasksToWeek: (sourceDateKey) => {
        const sourceTasks = get().tasks[sourceDateKey] || [];
        if (!sourceTasks.length) return;
        const { user } = get();
        const today = new Date(sourceDateKey);
        const dayOfWeek = today.getDay();
        const updates = {};
        for (let i = 1; i <= 6 - dayOfWeek; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() + i);
          const key = d.toISOString().split("T")[0];
          const dayName = d.toLocaleDateString("ar", { weekday: "long" });
          if (!user.restDays.includes(dayName)) {
            updates[key] = sourceTasks.map((t) => ({
              ...t,
              id: Date.now().toString() + Math.random(),
              done: false,
            }));
          }
        }
        set((s) => ({ tasks: { ...s.tasks, ...updates } }));
      },

      copyTasksToAllDays: (sourceDateKey) => {
        const sourceTasks = get().tasks[sourceDateKey] || [];
        if (!sourceTasks.length) return;
        const { user } = get();
        const startDate = new Date(user.challengeStartDate);
        const updates = {};
        for (let i = 0; i < 60; i++) {
          const d = new Date(startDate);
          d.setDate(d.getDate() + i);
          const key = d.toISOString().split("T")[0];
          if (key <= sourceDateKey) continue;
          const dayName = d.toLocaleDateString("ar", { weekday: "long" });
          if (!user.restDays.includes(dayName)) {
            updates[key] = sourceTasks.map((t) => ({
              ...t,
              id: Date.now().toString() + Math.random(),
              done: false,
            }));
          }
        }
        set((s) => ({ tasks: { ...s.tasks, ...updates } }));
      },

      checkDayCompletion: (dateKey) => {
        const key = dateKey || getTodayKey();
        const dayTasks = get().tasks[key] || [];
        if (!dayTasks.length) return;
        const allDone = dayTasks.every((t) => t.done);
        const wasCompleted = get().days[key]?.completed;
        if (allDone && !wasCompleted) {
          // Mark day complete and update streak
          set((s) => {
            const newStreak = s.streak + 1;
            const newBest = Math.max(s.bestStreak, newStreak);
            const newDays = {
              ...s.days,
              [key]: { completed: true, completedAt: Date.now() },
            };
            return { streak: newStreak, bestStreak: newBest, days: newDays };
          });
          // Check achievements
          const { streak, achievements } = get();
          const newAchievements = checkAchievements(streak, achievements, get());
          if (newAchievements.length) {
            set((s) => ({ achievements: [...s.achievements, ...newAchievements.map(a => a.id)] }));
            window.dispatchEvent(new CustomEvent("achievement", { detail: newAchievements[0] }));
          }
        } else if (!allDone && wasCompleted) {
          set((s) => ({
            streak: Math.max(0, s.streak - 1),
            days: { ...s.days, [key]: { completed: false } },
          }));
        }
      },

      missDay: (dateKey) => {
        set((s) => ({
          streak: Math.max(0, s.streak - 1),
          days: { ...s.days, [dateKey]: { completed: false, missed: true } },
        }));
      },

      saveWeeklyReflection: (weekNum, text) => {
        set((s) => ({
          weeklyReflections: { ...s.weeklyReflections, [weekNum]: text },
        }));
      },

      savePositiveThings: (things) => {
        set((s) => ({ user: { ...s.user, positiveThings: things } }));
      },

      resetChallenge: () => {
        set({
          user: defaultUser,
          tasks: {},
          days: {},
          streak: 0,
          bestStreak: 0,
          weeklyReflections: {},
          achievements: [],
          currentTab: "home",
        });
      },
    }),
    {
      name: "better-me-store",
      version: 1,
    }
  )
);
