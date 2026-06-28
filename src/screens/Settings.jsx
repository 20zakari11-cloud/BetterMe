import { useState } from "react";
import { useStore } from "../data/store";
import { getTheme, THEMES } from "../utils/themes";

const ARABIC_DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export default function Settings() {
  const { user, updateUser, resetChallenge } = useStore();
  const theme = getTheme(user.theme, user.darkMode);
  const [showReset, setShowReset] = useState(false);
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const handleSaveName = () => {
    updateUser({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleRestDay = (day) => {
    const current = user.restDays;
    if (current.includes(day)) {
      updateUser({ restDays: current.filter((d) => d !== day) });
    } else if (current.length < 2) {
      updateUser({ restDays: [...current, day] });
    }
  };

  const Section = ({ title, children }) => (
    <div
      style={{
        background: theme.cardColor,
        borderRadius: 16,
        padding: "16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        marginBottom: 14,
      }}
    >
      <h3 style={{ fontWeight: 700, color: theme.textColor, marginBottom: 14, fontSize: 15 }}>
        {title}
      </h3>
      {children}
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
        <h1 style={{ color: "white", fontSize: 20, fontWeight: 800 }}>⚙️ الإعدادات</h1>
      </div>

      <div style={{ padding: "0 20px" }}>
        {/* Name */}
        <Section title="👤 الاسم">
          <input
            className="ob-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ borderColor: theme.primary, marginBottom: 10 }}
          />
          <button
            onClick={handleSaveName}
            style={{
              width: "100%",
              padding: "12px",
              background: saved ? "#43a047" : theme.gradient,
              border: "none",
              borderRadius: 12,
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            {saved ? "✅ تم الحفظ" : "حفظ الاسم"}
          </button>
        </Section>

        {/* Theme */}
        <Section title="🎨 الثيم">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => updateUser({ theme: key })}
                style={{
                  border: `2px solid ${user.theme === key ? t.primary : "#e0e0e0"}`,
                  borderRadius: 12,
                  padding: "12px 8px",
                  background: user.theme === key ? t.primary + "15" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{t.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: user.theme === key ? 700 : 400, color: user.theme === key ? t.primary : "#555" }}>
                  {t.name}
                </div>
              </button>
            ))}
          </div>
        </Section>

        {/* Rest Days */}
        <Section title="😴 أيام الراحة">
          <p style={{ fontSize: 13, color: theme.subTextColor, marginBottom: 10 }}>
            اختر يومين فقط
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ARABIC_DAYS.map((day) => {
              const sel = user.restDays.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => toggleRestDay(day)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 50,
                    border: `2px solid ${sel ? theme.primary : "#ddd"}`,
                    background: sel ? theme.primary : "white",
                    color: sel ? "white" : "#555",
                    fontWeight: sel ? 700 : 400,
                    cursor: "pointer",
                    fontSize: 13,
                    transition: "all 0.2s",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Dark Mode */}
        <Section title="🌙 الوضع الداكن">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: theme.textColor, fontSize: 14 }}>
              {user.darkMode ? "الوضع الداكن مفعّل" : "الوضع الفاتح مفعّل"}
            </span>
            <button
              onClick={() => updateUser({ darkMode: !user.darkMode })}
              style={{
                width: 52,
                height: 28,
                borderRadius: 50,
                border: "none",
                background: user.darkMode ? theme.primary : "#ccc",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.3s",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "white",
                  position: "absolute",
                  top: 3,
                  right: user.darkMode ? 3 : 27,
                  transition: "right 0.3s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          </div>
        </Section>

        {/* Danger Zone */}
        <div
          style={{
            background: "#fff5f5",
            borderRadius: 16,
            padding: "16px",
            border: "1px solid #ffcccc",
            marginBottom: 20,
          }}
        >
          <h3 style={{ fontWeight: 700, color: "#c62828", marginBottom: 10, fontSize: 15 }}>
            ⚠️ منطقة الخطر
          </h3>
          {!showReset ? (
            <button
              onClick={() => setShowReset(true)}
              style={{
                width: "100%",
                padding: "12px",
                background: "transparent",
                border: "2px solid #e53935",
                borderRadius: 12,
                color: "#e53935",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              🔄 إعادة التحدي من البداية
            </button>
          ) : (
            <div>
              <p style={{ color: "#c62828", fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
                هل أنت متأكد؟ ستُحذف جميع بياناتك نهائياً!
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setShowReset(false)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#f5f5f5",
                    border: "none",
                    borderRadius: 10,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  إلغاء
                </button>
                <button
                  onClick={resetChallenge}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#e53935",
                    border: "none",
                    borderRadius: 10,
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  تأكيد الحذف
                </button>
              </div>
            </div>
          )}
        </div>

        {/* App Info */}
        <div style={{ textAlign: "center", paddingBottom: 20 }}>
          <p style={{ color: theme.subTextColor, fontSize: 12 }}>Better Me — رحلة التحول</p>
          <p style={{ color: theme.subTextColor, fontSize: 11, marginTop: 2 }}>النسخة 1.0</p>
        </div>
      </div>
    </div>
  );
}
