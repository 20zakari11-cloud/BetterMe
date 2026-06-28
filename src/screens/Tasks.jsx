import { useState } from "react";
import { useStore } from "../data/store";
import { getTheme } from "../utils/themes";
import { getTodayKey, isRestDay, formatDate } from "../utils/dateUtils";

export default function Tasks() {
  const {
    user, tasks, addTask, updateTask, deleteTask,
    checkDayCompletion, copyTasksToWeek, copyTasksToAllDays
  } = useStore();
  const theme = getTheme(user.theme, user.darkMode);
  const todayKey = getTodayKey();
  const todayTasks = tasks[todayKey] || [];
  const isRest = isRestDay(todayKey, user.restDays);

  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNote, setEditNote] = useState("");
  const [showCopyMenu, setShowCopyMenu] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTask(newTitle.trim(), newNote.trim());
    setNewTitle("");
    setNewNote("");
    setShowForm(false);
  };

  const handleToggle = (taskId, current) => {
    updateTask(taskId, { done: !current }, todayKey);
    setTimeout(() => checkDayCompletion(todayKey), 100);
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditNote(task.note || "");
  };

  const handleSaveEdit = () => {
    updateTask(editId, { title: editTitle, note: editNote }, todayKey);
    setEditId(null);
  };

  const handleCopy = (type) => {
    if (type === "week") {
      copyTasksToWeek(todayKey);
      setCopyMsg("✅ تم نسخ المهام لبقية أيام الأسبوع!");
    } else {
      copyTasksToAllDays(todayKey);
      setCopyMsg("✅ تم نسخ المهام لجميع أيام التحدي!");
    }
    setShowCopyMenu(false);
    setTimeout(() => setCopyMsg(""), 3000);
  };

  const completedCount = todayTasks.filter((t) => t.done).length;
  const pct = todayTasks.length > 0 ? Math.round((completedCount / todayTasks.length) * 100) : 0;

  return (
    <div
      className="screen"
      style={{ background: theme.bgColor, color: theme.textColor, minHeight: "100vh", paddingBottom: 90 }}
    >
      {/* Header */}
      <div
        style={{
          background: theme.gradient,
          padding: "48px 24px 24px",
          borderRadius: "0 0 24px 24px",
          marginBottom: 20,
        }}
      >
        <h1 style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
          ✅ مهام اليوم
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
          {formatDate(todayKey)}
        </p>
        {!isRest && todayTasks.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
                {completedCount} من {todayTasks.length} مهمة
              </span>
              <span style={{ color: "white", fontWeight: 700, fontSize: 13 }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.3)", borderRadius: 99 }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "white",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px" }}>
        {isRest ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>😴</div>
            <h2 style={{ fontWeight: 700, color: theme.textColor }}>يوم راحة مستحق!</h2>
            <p style={{ color: theme.subTextColor, marginTop: 8 }}>استرح اليوم. العودة غداً أقوى 💪</p>
          </div>
        ) : (
          <>
            {/* Copy Message */}
            {copyMsg && (
              <div
                style={{
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  padding: "12px 16px",
                  borderRadius: 12,
                  marginBottom: 12,
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {copyMsg}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: theme.gradient,
                  border: "none",
                  borderRadius: 14,
                  color: "white",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                + إضافة مهمة
              </button>
              {todayTasks.length > 0 && (
                <button
                  onClick={() => setShowCopyMenu(!showCopyMenu)}
                  style={{
                    padding: "12px 16px",
                    background: theme.cardColor,
                    border: `2px solid ${theme.primary}`,
                    borderRadius: 14,
                    color: theme.primary,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  نسخ المهام
                </button>
              )}
            </div>

            {/* Copy Menu */}
            {showCopyMenu && (
              <div
                style={{
                  background: theme.cardColor,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                  border: `1px solid ${theme.primary}20`,
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: 10, fontSize: 14, color: theme.textColor }}>
                  نسخ المهام إلى:
                </p>
                <button
                  onClick={() => handleCopy("week")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: 8,
                    background: theme.primary + "15",
                    border: `1px solid ${theme.primary}30`,
                    borderRadius: 12,
                    color: theme.primary,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  📅 بقية أيام الأسبوع
                </button>
                <button
                  onClick={() => handleCopy("all")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: theme.primary + "15",
                    border: `1px solid ${theme.primary}30`,
                    borderRadius: 12,
                    color: theme.primary,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  🔄 جميع أيام التحدي المتبقية
                </button>
              </div>
            )}

            {/* Add Task Form */}
            {showForm && (
              <div
                style={{
                  background: theme.cardColor,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <input
                  className="ob-input"
                  placeholder="عنوان المهمة..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ borderColor: theme.primary, marginBottom: 8 }}
                  autoFocus
                />
                <input
                  className="ob-input"
                  placeholder="ملاحظة (اختياري)..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  style={{ borderColor: "#ddd", marginBottom: 12 }}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setShowForm(false)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "#f5f5f5",
                      border: "none",
                      borderRadius: 12,
                      color: "#666",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleAdd}
                    style={{
                      flex: 2,
                      padding: "10px",
                      background: theme.gradient,
                      border: "none",
                      borderRadius: 12,
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    disabled={!newTitle.trim()}
                  >
                    إضافة ✓
                  </button>
                </div>
              </div>
            )}

            {/* Tasks List */}
            {todayTasks.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 20px", color: theme.subTextColor }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                <p style={{ fontWeight: 600 }}>لا توجد مهام اليوم</p>
                <p style={{ fontSize: 13, marginTop: 4 }}>اضغط "+ إضافة مهمة" للبدء</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: theme.cardColor,
                      borderRadius: 16,
                      padding: "14px 16px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                      border: task.done ? `1px solid ${theme.primary}30` : "1px solid transparent",
                    }}
                  >
                    {editId === task.id ? (
                      <div>
                        <input
                          className="ob-input"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          style={{ borderColor: theme.primary, marginBottom: 8 }}
                        />
                        <input
                          className="ob-input"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          style={{ borderColor: "#ddd", marginBottom: 10 }}
                        />
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => setEditId(null)}
                            style={{ flex: 1, padding: "8px", background: "#f5f5f5", border: "none", borderRadius: 10, cursor: "pointer" }}
                          >
                            إلغاء
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            style={{ flex: 2, padding: "8px", background: theme.gradient, border: "none", borderRadius: 10, color: "white", fontWeight: 700, cursor: "pointer" }}
                          >
                            حفظ
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <button
                          onClick={() => handleToggle(task.id, task.done)}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 50,
                            border: `2px solid ${task.done ? theme.primary : "#ccc"}`,
                            background: task.done ? theme.primary : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flexShrink: 0,
                            marginTop: 2,
                            transition: "all 0.2s",
                          }}
                        >
                          {task.done && <span style={{ color: "white", fontSize: 14 }}>✓</span>}
                        </button>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontWeight: 600,
                              fontSize: 15,
                              color: task.done ? theme.subTextColor : theme.textColor,
                              textDecoration: task.done ? "line-through" : "none",
                              marginBottom: task.note ? 4 : 0,
                            }}
                          >
                            {task.title}
                          </p>
                          {task.note && (
                            <p style={{ fontSize: 13, color: theme.subTextColor }}>{task.note}</p>
                          )}
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            onClick={() => handleEdit(task)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#aaa" }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteTask(task.id, todayKey)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#e74c3c" }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Completion Banner */}
            {todayTasks.length > 0 && pct === 100 && (
              <div
                style={{
                  marginTop: 20,
                  padding: "16px",
                  background: "linear-gradient(135deg, #43a047, #66bb6a)",
                  borderRadius: 16,
                  textAlign: "center",
                  color: "white",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 6 }}>🎉</div>
                <p style={{ fontWeight: 800, fontSize: 16 }}>أحسنت! أكملت جميع مهام اليوم</p>
                <p style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>استمر وحافظ على الستريك 🔥</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
