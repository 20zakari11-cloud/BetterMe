import { useEffect, useState } from "react";

const LEVELS = [
  { min: 0, max: 0,  size: 40,  emoji: "🔥", label: "ابدأ التحدي", opacity: 0.4 },
  { min: 1, max: 3,  size: 56,  emoji: "🔥", label: "شعلة صغيرة",  opacity: 0.65 },
  { min: 4, max: 7,  size: 72,  emoji: "🔥", label: "آخذ في النمو", opacity: 0.8  },
  { min: 8, max: 14, size: 88,  emoji: "🔥", label: "مشتعل!",       opacity: 0.9  },
  { min: 15, max: 29,size: 104, emoji: "🔥", label: "قوة هائلة",    opacity: 1.0  },
  { min: 30, max: 60,size: 120, emoji: "🔥", label: "لا يُوقف!",     opacity: 1.0  },
];

export default function FireStreak({ streak, dayNumber }) {
  const [animate, setAnimate] = useState(false);
  const [exploding, setExploding] = useState(false);

  const level = LEVELS.findLast((l) => streak >= l.min) || LEVELS[0];

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(t);
  }, [streak]);

  useEffect(() => {
    if (dayNumber === 60) {
      setExploding(true);
    }
  }, [dayNumber]);

  if (exploding) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 80, animation: "explode 1s ease-out forwards" }}>💥🔥💥</div>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#f4a020", marginTop: 8 }}>
          أكملت تحدي الـ 60 يوم! 🎉
        </p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <div
        style={{
          fontSize: level.size,
          opacity: level.opacity,
          display: "inline-block",
          animation: animate ? "streakPulse 0.6s ease" : "fireFloat 2s ease-in-out infinite",
          filter: streak > 0 ? `drop-shadow(0 0 ${streak > 10 ? 16 : 8}px #ff6b3580)` : "none",
          transition: "font-size 0.4s ease, opacity 0.4s ease",
        }}
      >
        {level.emoji}
      </div>
      <div style={{ marginTop: 4 }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            background: "linear-gradient(135deg, #ff6b35, #f4a020)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {streak}
        </span>
        <span style={{ fontSize: 13, color: "#999", marginRight: 4 }}>يوم متواصل</span>
      </div>
      <div style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>{level.label}</div>
    </div>
  );
}
