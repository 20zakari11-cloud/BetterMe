import { useState, useEffect } from "react";
import { useStore } from "./data/store";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Tasks from "./screens/Tasks";
import Stats from "./screens/Stats";
import Settings from "./screens/Settings";
import BottomNav from "./components/BottomNav";
import AchievementToast from "./components/AchievementToast";
import "./index.css";

export default function App() {
  const { user, currentTab, setTab } = useStore();
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    const handler = (e) => setAchievement(e.detail);
    window.addEventListener("achievement", handler);
    return () => window.removeEventListener("achievement", handler);
  }, []);

  if (!user.onboardingComplete) {
    return <Onboarding />;
  }

  const screens = { home: Home, tasks: Tasks, stats: Stats, settings: Settings };
  const Screen = screens[currentTab] || Home;

  return (
    <div className="app-root" data-theme={user.theme} data-dark={user.darkMode ? "true" : "false"}>
      <div className="screen-container">
        <Screen />
      </div>
      <BottomNav current={currentTab} onChange={setTab} />
      {achievement && (
        <AchievementToast data={achievement} onClose={() => setAchievement(null)} />
      )}
    </div>
  );
}
