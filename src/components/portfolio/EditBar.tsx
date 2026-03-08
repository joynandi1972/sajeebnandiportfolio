import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Save, X, CheckCircle, Loader2, Lock } from "lucide-react";
import { useEditMode } from "@/contexts/EditMode";
import { useState } from "react";

const EDIT_PASSWORD = "sajeeb2024";
const UNLOCK_KEY = "sajeeb_edit_unlocked";

function isUnlocked() {
  try { return sessionStorage.getItem(UNLOCK_KEY) === "1"; } catch { return false; }
}

export default function EditBar() {
  const { isEditing, hasChanges, startEditing, save, cancel } = useEditMode();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [showPrompt, setShowPrompt] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const handleUnlock = () => {
    if (pw === EDIT_PASSWORD) {
      try { sessionStorage.setItem(UNLOCK_KEY, "1"); } catch {}
      setUnlocked(true);
      setShowPrompt(false);
      setPw("");
      setPwError(false);
      startEditing();
    } else {
      setPwError(true);
      setPw("");
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      save();
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  const handleEditClick = () => {
    if (unlocked) {
      startEditing();
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <>
      {/* Floating edit button — only when not editing */}
      <AnimatePresence>
        {!isEditing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEditClick}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm shadow-lg transition-all"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 8px 30px hsl(var(--primary) / 0.4)",
            }}
          >
            <Pencil className="w-4 h-4" />
            Edit Portfolio
          </motion.button>
        )}
      </AnimatePresence>

      {/* Password prompt modal */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            style={{ background: "hsl(155 50% 5% / 0.7)", backdropFilter: "blur(12px)" }}
            onClick={() => { setShowPrompt(false); setPw(""); setPwError(false); }}>
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="w-full max-w-sm rounded-2xl p-8 shadow-2xl"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "hsl(var(--primary-muted))" }}>
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display font-semibold text-xl text-foreground">Owner Access</h2>
                <p className="text-sm text-muted-foreground mt-1 text-center">Enter your password to edit this portfolio</p>
              </div>

              <input
                type="password"
                value={pw}
                onChange={e => { setPw(e.target.value); setPwError(false); }}
                onKeyDown={e => e.key === "Enter" && handleUnlock()}
                placeholder="Password"
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all mb-1"
                style={{
                  background: "hsl(var(--muted))",
                  border: `1.5px solid ${pwError ? "hsl(0 55% 50%)" : "hsl(var(--border))"}`,
                  color: "hsl(var(--foreground))",
                }}
              />
              {pwError && (
                <p className="text-xs mb-3" style={{ color: "hsl(0 55% 50%)" }}>Incorrect password. Try again.</p>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => { setShowPrompt(false); setPw(""); setPwError(false); }}
                  className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
                  Cancel
                </button>
                <button
                  onClick={handleUnlock}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                  Unlock
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-lg"
            style={{ background: "hsl(155 50% 20%)", color: "hsl(155 60% 85%)", border: "1px solid hsl(155 40% 35%)" }}
          >
            <CheckCircle className="w-4 h-4" />
            Portfolio saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit mode toolbar */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between gap-4 px-6 py-3 shadow-lg"
            style={{
              background: "hsl(155 50% 14%)",
              borderBottom: "1px solid hsl(155 40% 28%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(155 60% 55%)" }} />
              <span className="text-sm font-semibold" style={{ color: "hsl(155 40% 82%)" }}>
                Edit Mode — Click any text to edit it
              </span>
              {hasChanges && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(45 70% 20%)", color: "hsl(45 80% 70%)" }}>
                  Unsaved changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={cancel}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
                style={{ color: "hsl(155 20% 70%)", border: "1px solid hsl(155 30% 35%)" }}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.03] disabled:opacity-70"
                style={{ background: "hsl(155 55% 50%)", color: "hsl(155 50% 8%)" }}
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Saving…</>
                ) : (
                  <><Save className="w-4 h-4" />Save Changes</>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEditing && <div className="h-[52px]" />}
    </>
  );
}
