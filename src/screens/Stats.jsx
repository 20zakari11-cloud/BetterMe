import { useStore } from "../data/store";
import { getTheme } from "../utils/themes";
import { getDayNumber } from "../utils/dateUtils";
import { ACHIEVEMENTS, TASK_ACHIEVEMENTS } from "../utils/achievements";

export default function Stats() {
  const { user, streak, bestStreak, tasks, days, achievements, weeklyReflections } = useStore();
  const theme = getTheme(user.theme, user.darkMode);
  const dayNumber = getDayNumber(user.challengeStartDate);

  const allTasks = Object.values(tasks).flat();
  const completedTasks = allTasks.filter((t) => t.done).length;
  const totalTasks = allTasks.length;
  const completedDays = Object.values(days).filter((d) => d.completed).length;
  const missedDays = Object.values(days).filter((d) => d.missed).length;
  const consistencyPct = dayNumber > 1 ? Math.round((completedDays / (dayNumber - 1)) * 100) : 0;

  const allAchievements = [...ACHIEVEMENTS, ...TASK_ACHIEVEMENTS];

  const StatCard = ({ label, value, icon, color }) => (
    <div
      style={{
        background: theme.cardColor,
        borderRadius: 16,
        padding: "16px",
        textAlign: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        flex: 1,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: color || theme.primary }}>{value}</div>
      <div style={{ fontSize: 12, color: theme.subTextColor, marginTop: 4 }}>{label}</div>
    </div>
  );

  return (
    <div
      className="screen"
      style={{ background: theme.bgColor, color: theme.textColor, minHeight: "100vh", paddingBottom: 90 }}
    >
      {/* Header */}
      <div
        style={{
          background: theme.gradient,
          padding: "48px 24px 28px",
          borderRadius: "0 0 24px 24px",
          marginBottom: 24,
        }}
      >
        <h1 style={{ color: "white", fontSize: 20, fontWeight: 800 }}>📊 إحصائياتك</h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 4 }}>
          تقدمك في رحلة الـ 60 يوم
        </p>

        {/* Consistency Ring */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `conic-gradient(white ${consistencyPct * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: theme.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span style={{ color: "white", fontWeight: 800, fontSize: 22 }}>{consistencyPct}%</span>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 8 }}>نسبة الالتزام</p>
        </div>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Stats Grid */}
        <div style={{ display: "flex", gap: 10 }}>
          <StatCard label="الستريك الحالي" value={streak} icon="🔥" color="#f4a020" />
          <StatCard label="أفضل ستريك" value={bestStreak} icon="⭐" color="#9c27b0" />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <StatCard label="أيام مكتملة" value={completedDays} icon="✅" color="#43a047" />
          <StatCard label="أيام فائتة" value={missedDays} icon="❌" color="#e53935" />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <StatCard label="مهام منجزة" value={completedTasks} icon="📌" color={theme.primary} />
          <StatCard label="أيام متبقية" value={Math.max(0, 60 - dayNumber)} icon="📅" color="#1565c0" />
        </div>

        {/* Challenge Progress Bar */}
        <div
          style={{
            background: theme.cardColor,
            borderRadius: 16,
            padding: "16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: theme.textColor, fontSize: 14 }}>تقدم التحدي</span>
            <span style={{ color: theme.primary, fontWeight: 700 }}>
              اليوم {dayNumber}/60
            </span>
          </div>
          <div style={{ height: 12, background: "#f0f0f0", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(dayNumber / 60) * 100}%`,
                background: theme.gradient,
                borderRadius: 99,
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "#aaa" }}>البداية</span>
            <span style={{ fontSize: 11, color: "#aaa" }}>اليوم 60</span>
          </div>
        </div>

        {/* Achievements */}
        <div
          style={{
            background: theme.cardColor,
            borderRadius: 16,
            padding: "16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ fontWeight: 700, color: theme.textColor, marginBottom: 14, fontSize: 15 }}>
            🏆 الإنجازات
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {allAchievements.map((a) => {
              const earned = achievements.includes(a.id);
              return (
                <div
                  key={a.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    background: earned ? theme.primary + "12" : "#f8f8f8",
                    borderRadius: 12,
                    border: `1px solid ${earned ? theme.primary + "30" : "transparent"}`,
                    opacity: earned ? 1 : 0.5,
                  }}
                >
                  <div style={{ fontSize: 28 }}>{earned ? a.title.split(" ")[1] || "🏅" : "🔒"}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: theme.textColor }}>
                      {a.title.split(" ")[0]}
                    </p>
                    <p style={{ fontSize: 12, color: theme.subTextColor }}>{a.desc}</p>
                  </div>
                  {earned && (
                    <span style={{ marginRight: "auto", color: theme.primary, fontSize: 18 }}>✓</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Reflections */}
        {Object.keys(weeklyReflections).length > 0 && (
          <div
            style={{
              background: theme.cardColor,
              borderRadius: 16,
              padding: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ fontWeight: 700, color: theme.textColor, marginBottom: 14, fontSize: 15 }}>
              📝 تأملاتك الأسبوعية
            </h3>
            {Object.entries(weeklyReflections).map(([week, text]) => (
              <div
                key={week}
                style={{
                  padding: "12px",
                  background: theme.primary + "10",
                  borderRadius: 12,
                  marginBottom: 8,
                  borderRight: `3px solid ${theme.primary}`,
                }}
              >
                <p style={{ fontSize: 12, color: theme.primary, fontWeight: 700, marginBottom: 4 }}>
                  الأسبوع {week}
                </p>
                <p style={{ fontSize: 13, color: theme.textColor }}>{text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
