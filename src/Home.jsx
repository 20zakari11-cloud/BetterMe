import { useState, useEffect } from "react";
import { useStore } from "../data/store";
import { getTheme } from "../utils/themes";
import { getGreeting, getDayNumber, getTodayKey, isRestDay } from "../utils/dateUtils";
import FireStreak from "../components/FireStreak";
import WeeklyReflectionModal from "../components/WeeklyReflectionModal";
import Day60Screen from "../components/Day60Screen";

export default function Home() {
  const { user, streak, getTodayTasks, checkDayCompletion, weeklyReflections, saveWeeklyReflection } = useStore();
  const theme = getTheme(user.theme, user.darkMode);
  const dayNumber = getDayNumber(user.challengeStartDate);
  const todayKey = getTodayKey();
  const todayTasks = getTodayTasks();
  const completedTasks = todayTasks.filter((t) => t.done).length;
  const totalTasks = todayTasks.length;
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const isRest = isRestDay(todayKey, user.restDays);
  const weekNumber = Math.ceil(dayNumber / 7);
  const [showReflection, setShowReflection] = useState(false);
  const [show60, setShow60] = useState(false);

  useEffect(() => {
    // Show weekly reflection prompt
    const isWeekEnd = dayNumber % 7 === 0 && dayNumber > 0;
    const alreadyDone = weeklyReflections[weekNumber];
    if (isWeekEnd && !alreadyDone) {
      setTimeout(() => setShowReflection(true), 1000);
    }
    // Show day 60 screen
    if (dayNumber >= 60) {
      setTimeout(() => setShow60(true), 500);
    }
  }, [dayNumber]);

  useEffect(() => {
    checkDayCompletion(todayKey);
  }, [todayTasks]);

  const greeting = getGreeting(user.name);
  const remaining = Math.max(0, 60 - dayNumber);

  if (show60) {
    return <Day60Screen theme={theme} user={user} onClose={() => setShow60(false)} />;
  }

  return (
    <div
      className="screen"
      style={{ background: theme.bgColor, color: theme.textColor, minHeight: "100vh", paddingBottom: 90 }}
    >
      {/* Header */}
      <div
        style={{
          background: theme.gradient,
          padding: "48px 24px 32px",
          borderRadius: "0 0 28px 28px",
          marginBottom: 24,
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, marginBottom: 4 }}>
          {new Date().toLocaleDateString("ar-SA", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h1 style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{greeting}</h1>

        {/* Day Progress */}
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "14px 18px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
              اليوم {dayNumber} من 60
            </span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
              متبقي {remaining} يوم
            </span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.3)", borderRadius: 99 }}>
            <div
              style={{
                height: "100%",
                width: `${(dayNumber / 60) * 100}%`,
                background: "white",
                borderRadius: 99,
                transition: "width 1s ease",
              }}
            />
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 6, textAlign: "left" }}>
            {Math.round((dayNumber / 60) * 100)}% من التحدي
          </p>
        </div>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Fire Streak Card */}
        <div
          className="card"
          style={{
            background: theme.cardColor,
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: theme.subTextColor, fontSize: 13, marginBottom: 8, fontWeight: 600 }}>
            🔥 الستريك
          </h3>
          <FireStreak streak={streak} dayNumber={dayNumber} />
        </div>

        {/* Today's Status */}
        <div
          className="card"
          style={{
            background: theme.cardColor,
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {isRest ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>😴</div>
              <h3 style={{ fontWeight: 700, color: theme.textColor }}>يوم راحة</h3>
              <p style={{ color: theme.subTextColor, fontSize: 13 }}>استرح اليوم وعد غداً أقوى 💪</p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ fontWeight: 700, color: theme.textColor, fontSize: 16 }}>مهام اليوم</h3>
                <span style={{ fontSize: 13, color: theme.subTextColor }}>
                  {completedTasks}/{totalTasks}
                </span>
              </div>
              {totalTasks === 0 ? (
                <p style={{ color: theme.subTextColor, fontSize: 13, textAlign: "center", padding: "10px 0" }}>
                  لا توجد مهام اليوم. اضغط على "المهام" لإضافتها ✏️
                </p>
              ) : (
                <>
                  <div style={{ height: 10, background: "#f0f0f0", borderRadius: 99, marginBottom: 12 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${completionPct}%`,
                        background: theme.gradient,
                        borderRadius: 99,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  {todayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        borderBottom: "1px solid #f5f5f5",
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{task.done ? "✅" : "⬜"}</span>
                      <span
                        style={{
                          fontSize: 14,
                          color: task.done ? theme.subTextColor : theme.textColor,
                          textDecoration: task.done ? "line-through" : "none",
                          flex: 1,
                        }}
                      >
                        {task.title}
                      </span>
                    </div>
                  ))}
                  {totalTasks > 3 && (
                    <p style={{ color: theme.subTextColor, fontSize: 12, marginTop: 8, textAlign: "center" }}>
                      +{totalTasks - 3} مهام أخرى
                    </p>
                  )}
                  {completionPct === 100 && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: "10px",
                        background: "#e8f5e9",
                        borderRadius: 12,
                        textAlign: "center",
                        color: "#2e7d32",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      🎉 أكملت جميع مهام اليوم!
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Goal Card */}
        <div
          className="card"
          style={{
            background: theme.gradient,
            borderRadius: 20,
            padding: "16px 20px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginBottom: 4 }}>هدفك من التحدي</p>
          <p style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{user.goal}</p>
        </div>
      </div>

      {/* Weekly Reflection Modal */}
      {showReflection && (
        <WeeklyReflectionModal
          weekNumber={weekNumber}
          theme={theme}
          onSave={(text) => {
            saveWeeklyReflection(weekNumber, text);
            setShowReflection(false);
          }}
          onClose={() => setShowReflection(false)}
        />
      )}
    </div>
  );
}
