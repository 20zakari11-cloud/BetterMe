import { useState } from "react";

export default function WeeklyReflectionModal({ weekNumber, theme, onSave, onClose }) {
  const [text, setText] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: theme.cardColor,
          borderRadius: 24,
          padding: "28px 24px",
          width: "100%",
          maxWidth: 400,
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>✨</div>
          <h2 style={{ fontWeight: 800, color: theme.textColor, fontSize: 18, marginBottom: 6 }}>
            تأمل الأسبوع {weekNumber}
          </h2>
          <p style={{ color: theme.subTextColor, fontSize: 14 }}>
            ما أفضل شيء حدث معك هذا الأسبوع؟
          </p>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب تأملك هنا..."
          rows={4}
          style={{
            width: "100%",
            border: `2px solid ${theme.primary}`,
            borderRadius: 14,
            padding: "12px",
            fontSize: 14,
            resize: "none",
            direction: "rtl",
            fontFamily: "inherit",
            color: theme.textColor,
            background: theme.bgColor,
            outline: "none",
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              background: "#f5f5f5",
              border: "none",
              borderRadius: 12,
              fontWeight: 600,
              cursor: "pointer",
              color: "#555",
            }}
          >
            لاحقاً
          </button>
          <button
            onClick={() => text.trim() && onSave(text)}
            disabled={!text.trim()}
            style={{
              flex: 2,
              padding: "12px",
              background: theme.gradient,
              border: "none",
              borderRadius: 12,
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              opacity: !text.trim() ? 0.6 : 1,
            }}
          >
            حفظ التأمل ✨
          </button>
        </div>
      </div>
    </div>
  );
}
