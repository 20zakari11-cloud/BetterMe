import { useState } from "react";
import { useStore } from "../data/store";

export default function Day60Screen({ theme, user, onClose }) {
  const { negativeThings = [], positiveThings = [] } = user;
  const { savePositiveThings } = useStore();
  const [posInput, setPosInput] = useState("");
  const [posList, setPosList] = useState(positiveThings);
  const [showComparison, setShowComparison] = useState(positiveThings.length > 0);
  const [step, setStep] = useState(positiveThings.length > 0 ? "compare" : "celebrate");

  const addPositive = () => {
    if (!posInput.trim()) return;
    setPosList((l) => [...l, posInput.trim()]);
    setPosInput("");
  };

  const handleSave = () => {
    savePositiveThings(posList);
    setStep("compare");
  };

  if (step === "celebrate") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #f4a020 0%, #ff6b35 50%, #e91e63 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
          direction: "rtl",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16, animation: "explode 1s ease" }}>💥🔥💥</div>
        <h1 style={{ color: "white", fontSize: 28, fontWeight: 900, marginBottom: 12 }}>
          مبروك {user.name}! 🎉
        </h1>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, marginBottom: 32, maxWidth: 300 }}>
          لقد أكملت رحلة Better Me بنجاح! أنت الآن نسخة أفضل من نفسك.
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 20,
            padding: "20px",
            width: "100%",
            maxWidth: 360,
            backdropFilter: "blur(10px)",
            marginBottom: 24,
          }}
        >
          <p style={{ color: "white", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
            ما الأشياء الإيجابية التي تغيرت في حياتك؟
          </p>
          {posList.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "8px 12px",
                marginBottom: 6,
              }}
            >
              <span style={{ color: "white", fontSize: 14 }}>✨ {item}</span>
              <button
                onClick={() => setPosList((l) => l.filter((_, idx) => idx !== i))}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
              >
                ×
              </button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input
              value={posInput}
              onChange={(e) => setPosInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPositive()}
              placeholder="أضف شيئاً إيجابياً..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: "rgba(255,255,255,0.25)",
                color: "white",
                fontSize: 14,
                direction: "rtl",
                outline: "none",
              }}
            />
            <button
              onClick={addPositive}
              style={{
                padding: "0 14px",
                background: "white",
                border: "none",
                borderRadius: 10,
                color: "#f4a020",
                fontWeight: 800,
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={posList.length === 0}
          style={{
            padding: "16px 40px",
            background: "white",
            border: "none",
            borderRadius: 50,
            color: "#f4a020",
            fontWeight: 800,
            fontSize: 16,
            cursor: "pointer",
            opacity: posList.length === 0 ? 0.5 : 1,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          عرض المقارنة 🔍
        </button>
      </div>
    );
  }

  // Compare screen
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bgColor,
        direction: "rtl",
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #f4a020, #ff6b35)",
          padding: "48px 24px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
        <h1 style={{ color: "white", fontSize: 22, fontWeight: 900 }}>رحلتك في 60 يوم</h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>قبل وبعد التحدي</p>
      </div>

      <div style={{ padding: "24px 20px" }}>
        {/* Before */}
        <div
          style={{
            background: "#fff5f5",
            border: "2px solid #ffcccc",
            borderRadius: 16,
            padding: "16px",
            marginBottom: 16,
          }}
        >
          <h3 style={{ color: "#c62828", fontWeight: 700, marginBottom: 12, fontSize: 15 }}>
            😔 قبل التحدي — ما أردت تغييره
          </h3>
          {negativeThings.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "8px 12px",
                background: "#ffeeee",
                borderRadius: 10,
                marginBottom: 6,
                fontSize: 14,
                color: "#c62828",
              }}
            >
              • {item}
            </div>
          ))}
        </div>

        {/* After */}
        <div
          style={{
            background: "#f1f8e9",
            border: "2px solid #c5e1a5",
            borderRadius: 16,
            padding: "16px",
            marginBottom: 24,
          }}
        >
          <h3 style={{ color: "#2e7d32", fontWeight: 700, marginBottom: 12, fontSize: 15 }}>
            ✨ بعد التحدي — ما تغيّر
          </h3>
          {posList.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "8px 12px",
                background: "#e8f5e9",
                borderRadius: 10,
                marginBottom: 6,
                fontSize: 14,
                color: "#2e7d32",
              }}
            >
              ✅ {item}
            </div>
          ))}
        </div>

        {/* Final Message */}
        <div
          style={{
            background: "linear-gradient(135deg, #f4a020, #ff6b35)",
            borderRadius: 20,
            padding: "24px",
            textAlign: "center",
            color: "white",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 10 }}>🔥</div>
          <h2 style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>
            أكملت رحلة Better Me! 🎉
          </h2>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            60 يوماً من الالتزام والتحسين. أنت تستحق الفخر!
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: 16,
            padding: "14px",
            background: theme.gradient,
            border: "none",
            borderRadius: 14,
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          الرجوع للرئيسية
        </button>
      </div>
    </div>
  );
}
