export default function BottomNav({ current, onChange }) {
  const tabs = [
    { id: "home",     icon: "🏠", label: "الرئيسية" },
    { id: "tasks",    icon: "✅", label: "المهام"    },
    { id: "stats",    icon: "📊", label: "الإحصائيات"},
    { id: "settings", icon: "⚙️", label: "الإعدادات" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        background: "white",
        borderTop: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0 16px",
        zIndex: 1000,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 16px",
            borderRadius: 12,
            transition: "all 0.2s",
          }}
        >
          <span
            style={{
              fontSize: current === tab.id ? 26 : 22,
              transition: "font-size 0.2s",
              filter: current === tab.id ? "none" : "grayscale(80%)",
            }}
          >
            {tab.icon}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: current === tab.id ? 700 : 400,
              color: current === tab.id ? "#333" : "#aaa",
            }}
          >
            {tab.label}
          </span>
          {current === tab.id && (
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#333",
                marginTop: 1,
              }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
