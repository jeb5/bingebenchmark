import styles from "./CheckboxWithLabel.module.css";
export default function CheckboxWithLabel({
	label,
	checked,
	setChecked,
}: {
	label: string;
	checked: boolean;
	setChecked: (checked: boolean) => void;
}) {
	return (
    <label className="text-xs">
      <input
        className="w-3 h-3 mr-1.5 accent-(--signature-blue)"
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
