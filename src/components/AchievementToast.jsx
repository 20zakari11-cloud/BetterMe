import { useEffect } from "react";

export default function AchievementToast({ data, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        right: 20,
        left: 20,
        background: "linear-gradient(135deg, #f4a020, #ff6b35)",
        borderRadius: 16,
        padding: "16px 20px",
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(244, 160, 32, 0.4)",
        animation: "slideDown 0.4s ease",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div style={{ fontSize: 36 }}>🏆</div>
      <div>
        <p style={{ color: "white", fontWeight: 800, fontSize: 15, marginBottom: 2 }}>
          إنجاز جديد!
        </p>
        <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: 14 }}>
          {data.title}
        </p>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{data.desc}</p>
      </div>
      <button
        onClick={onClose}
        style={{
          marginRight: "auto",
          background: "none",
          border: "none",
          color: "white",
          fontSize: 20,
          cursor: "pointer",
          opacity: 0.8,
        }}
      >
        ×
      </button>
    </div>
  );
}
