import styles from "./Button.module.css";
export default function Button({
	text,
	onClick,
	className,
}: {
	text: string;
	onClick: () => void;
	className?: string;
}) {
	return (
		<button className={`${styles.button} ${className}`} onClick={onClick}>
			{text}
		</button>
	);
}
