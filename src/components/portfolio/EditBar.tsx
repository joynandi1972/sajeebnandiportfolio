import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Save, X, CheckCircle, Loader2 } from "lucide-react";
import { useEditMode } from "@/contexts/EditMode";
import { useState } from "react";

export default function EditBar() {
  const { isEditing, hasChanges, startEditing, save, cancel } = useEditMode();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      save();
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <>
      {/* Floating button when NOT editing */}
      <AnimatePresence>
        {!isEditing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={startEditing}
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
