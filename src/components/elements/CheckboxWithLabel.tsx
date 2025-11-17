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
		<label className={styles.checkboxWithLabel}>
			<input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
			<span>{label}</span>
		</label>
	);
}
