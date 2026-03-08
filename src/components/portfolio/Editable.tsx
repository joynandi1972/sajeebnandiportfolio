import { useEditMode } from "@/contexts/EditMode";

interface EditableTextProps {
  contentKey: string;
  className?: string;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
  multiline?: boolean;
  rows?: number;
}

export function EditableText({
  contentKey,
  className = "",
  placeholder,
  as: Tag = "span",
  multiline = false,
  rows = 3,
}: EditableTextProps) {
  const { isEditing, get, set } = useEditMode();
  const value = get(contentKey);

  if (!isEditing) {
    return <Tag className={className}>{value}</Tag>;
  }

  const editClass =
    "bg-transparent border-b-2 border-dashed outline-none w-full transition-colors focus:border-solid " +
    "border-primary/50 focus:border-primary " +
    className;

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={e => set(contentKey, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={editClass + " resize-none leading-relaxed"}
        style={{ minWidth: "200px" }}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={e => set(contentKey, e.target.value)}
      placeholder={placeholder}
      className={editClass}
      style={{ minWidth: "80px" }}
    />
  );
}

// Editable number with +/- controls
interface EditableNumberProps {
  contentKey: string;
  className?: string;
  min?: number;
  max?: number;
}

export function EditableNumber({ contentKey, className = "", min = 0, max = 999 }: EditableNumberProps) {
  const { isEditing, get, set } = useEditMode();
  const value = get(contentKey);

  if (!isEditing) return <span className={className}>{value}</span>;

  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={e => set(contentKey, e.target.value)}
      className={
        "bg-transparent border-b-2 border-dashed border-primary/50 focus:border-primary outline-none w-14 text-center " +
        className
      }
    />
  );
}
