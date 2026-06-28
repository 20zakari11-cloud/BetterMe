import { useState } from "react";
import { useStore } from "../data/store";
import { THEMES } from "../utils/themes";

const GOALS = [
  "تحسين الدراسة 📚",
  "تقليل استخدام السوشال ميديا 📵",
  "الالتزام بالرياضة 🏃",
  "تنظيم النوم 😴",
  "بناء عادات إيجابية ✨",
];

const ARABIC_DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export default function Onboarding() {
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    goal: "",
    customGoal: "",
    theme: "spring",
    restDays: [],
    negativeThings: [],
  });
  const [negInput, setNegInput] = useState("");
  const [customGoal, setCustomGoal] = useState(false);

  const theme = THEMES[data.theme];

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const toggleRestDay = (day) => {
    setData((d) => {
      if (d.restDays.includes(day)) {
        return { ...d, restDays: d.restDays.filter((x) => x !== day) };
      }
      if (d.restDays.length >= 2) return d;
      return { ...d, restDays: [...d.restDays, day] };
    });
  };

  const addNegative = () => {
    if (!negInput.trim()) return;
    setData((d) => ({ ...d, negativeThings: [...d.negativeThings, negInput.trim()] }));
    setNegInput("");
  };

  const removeNegative = (i) => {
    setData((d) => ({ ...d, negativeThings: d.negativeThings.filter((_, idx) => idx !== i) }));
  };

  const finish = () => {
    completeOnboarding({
      ...data,
      goal: customGoal ? data.customGoal : data.goal,
    });
  };

  const progressPct = ((step + 1) / 5) * 100;

  return (
    <div
      className="onboarding"
      style={{
        background: `linear-gradient(160deg, ${theme.bg} 0%, ${theme.bgDark}22 100%)`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        direction: "rtl",
      }}
    >
      {/* Progress Bar */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: theme.primary, fontWeight: 600 }}>
            خطوة {step + 1} من 5
          </span>
          <span style={{ fontSize: 13, color: "#999" }}>Better Me</span>
        </div>
        <div style={{ height: 6, background: "#e0e0e0", borderRadius: 99 }}>
          <div
            style={{
              height: "100%",
              width: `${progressPct}%`,
              background: theme.gradient,
              borderRadius: 99,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div style={{ flex: 1, padding: "32px 24px", display: "flex", flexDirection: "column" }}>
        {/* Step 0 — Name */}
        {step === 0 && (
          <div className="step-container">
            <div className="step-emoji">👋</div>
            <h1 className="step-title">أهلاً بك في Better Me</h1>
            <p className="step-sub">رحلة 60 يوم لتحسين نفسك. ما اسمك؟</p>
            <input
              className="ob-input"
              placeholder="اكتب اسمك..."
              value={data.name}
              onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
              style={{ borderColor: theme.primary }}
            />
            <button
              className="ob-btn"
              style={{ background: theme.gradient }}
              onClick={next}
              disabled={!data.name.trim()}
            >
              التالي ←
            </button>
          </div>
        )}

        {/* Step 1 — Goal */}
        {step === 1 && (
          <div className="step-container">
            <div className="step-emoji">🎯</div>
            <h1 className="step-title">ما هدفك الرئيسي؟</h1>
            <p className="step-sub">اختر هدفاً واحداً أو اكتب هدفك الخاص</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {GOALS.map((g) => (
                <button
                  key={g}
                  className={`goal-btn ${data.goal === g && !customGoal ? "selected" : ""}`}
                  style={{
                    borderColor: data.goal === g && !customGoal ? theme.primary : "#ddd",
                    background: data.goal === g && !customGoal ? theme.primary + "15" : "white",
                    color: data.goal === g && !customGoal ? theme.primary : "#333",
                  }}
                  onClick={() => { setData((d) => ({ ...d, goal: g })); setCustomGoal(false); }}
                >
                  {g}
                </button>
              ))}
              <button
                className={`goal-btn ${customGoal ? "selected" : ""}`}
                style={{
                  borderColor: customGoal ? theme.primary : "#ddd",
                  background: customGoal ? theme.primary + "15" : "white",
                  color: customGoal ? theme.primary : "#333",
                }}
                onClick={() => setCustomGoal(true)}
              >
                ✏️ اكتب هدفك الخاص
              </button>
            </div>
            {customGoal && (
              <input
                className="ob-input"
                placeholder="اكتب هدفك..."
                value={data.customGoal}
                onChange={(e) => setData((d) => ({ ...d, customGoal: e.target.value }))}
                style={{ borderColor: theme.primary }}
              />
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="ob-btn-back" onClick={back}>→ رجوع</button>
              <button
                className="ob-btn"
                style={{ background: theme.gradient, flex: 1 }}
                onClick={next}
                disabled={!data.goal && !data.customGoal}
              >
                التالي ←
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Theme */}
        {step === 2 && (
          <div className="step-container">
            <div className="step-emoji">🎨</div>
            <h1 className="step-title">اختر ثيمك المفضل</h1>
            <p className="step-sub">ألوان التطبيق ستتغير حسب اختيارك</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "20px 0" }}>
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setData((d) => ({ ...d, theme: key }))}
                  style={{
                    border: `3px solid ${data.theme === key ? t.primary : "#e0e0e0"}`,
                    borderRadius: 16,
                    padding: "20px 12px",
                    background: data.theme === key ? t.primary + "15" : "white",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    transform: data.theme === key ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 6 }}>{t.emoji}</div>
                  <div style={{ fontWeight: 700, color: data.theme === key ? t.primary : "#333", fontSize: 15 }}>
                    {t.name}
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 99,
                      background: t.gradient,
                      marginTop: 8,
                    }}
                  />
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="ob-btn-back" onClick={back}>→ رجوع</button>
              <button className="ob-btn" style={{ background: theme.gradient, flex: 1 }} onClick={next}>
                التالي ←
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Rest Days */}
        {step === 3 && (
          <div className="step-container">
            <div className="step-emoji">😴</div>
            <h1 className="step-title">اختر يومَي الراحة</h1>
            <p className="step-sub">اختر يومين في الأسبوع بدون مهام</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "20px 0", justifyContent: "center" }}>
              {ARABIC_DAYS.map((day) => {
                const sel = data.restDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleRestDay(day)}
                    style={{
                      padding: "12px 18px",
                      borderRadius: 50,
                      border: `2px solid ${sel ? theme.primary : "#ddd"}`,
                      background: sel ? theme.primary : "white",
                      color: sel ? "white" : "#333",
                      fontWeight: sel ? 700 : 400,
                      cursor: "pointer",
                      fontSize: 14,
                      transition: "all 0.2s",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <p style={{ textAlign: "center", color: theme.primary, fontWeight: 600, marginBottom: 16 }}>
              {data.restDays.length === 0 && "لم تختر أي يوم بعد"}
              {data.restDays.length === 1 && `اخترت: ${data.restDays[0]} — اختر يوماً آخر`}
              {data.restDays.length === 2 && `✅ ممتاز! ${data.restDays.join(" و ")}`}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="ob-btn-back" onClick={back}>→ رجوع</button>
              <button
                className="ob-btn"
                style={{ background: theme.gradient, flex: 1 }}
                onClick={next}
                disabled={data.restDays.length !== 2}
              >
                التالي ←
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Negative Things */}
        {step === 4 && (
          <div className="step-container">
            <div className="step-emoji">📝</div>
            <h1 className="step-title">ما الأشياء السلبية؟</h1>
            <p className="step-sub" style={{ marginBottom: 20 }}>
              اكتب الأشياء التي تريد تغييرها. ستراها مجدداً في نهاية التحدي 💪
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input
                className="ob-input"
                placeholder="مثال: أسهر كثيراً..."
                value={negInput}
                onChange={(e) => setNegInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNegative()}
                style={{ borderColor: theme.primary, flex: 1, marginBottom: 0 }}
              />
              <button
                onClick={addNegative}
                style={{
                  background: theme.gradient,
                  border: "none",
                  borderRadius: 12,
                  color: "white",
                  fontWeight: 700,
                  padding: "0 16px",
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                +
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {data.negativeThings.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: theme.primary + "12",
                    border: `1px solid ${theme.primary}30`,
                    borderRadius: 12,
                    padding: "10px 14px",
                  }}
                >
                  <span style={{ color: "#333", fontSize: 14 }}>• {item}</span>
                  <button
                    onClick={() => removeNegative(i)}
                    style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: 18 }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {data.negativeThings.length === 0 && (
              <p style={{ textAlign: "center", color: "#aaa", fontSize: 13, marginBottom: 12 }}>
                لم تضف أي شيء بعد
              </p>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="ob-btn-back" onClick={back}>→ رجوع</button>
              <button
                className="ob-btn"
                style={{ background: theme.gradient, flex: 1 }}
                onClick={finish}
                disabled={data.negativeThings.length === 0}
              >
                ابدأ التحدي 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
