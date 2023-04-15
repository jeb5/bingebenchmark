import SearchIcon from "../../assets/icons/search.svg";
import styles from "./SearchField.module.css";

export default function SearchField({
	value,
	onChange,
	onFocus,
	onBlur,
	onSubmit,
	focused,
	homeVersion,
}: {
	value: string;
	onChange: (newValue: string) => void;
	onFocus: () => any;
	onBlur: () => any;
	onSubmit: () => any;
	focused: boolean;
	homeVersion?: boolean;
}) {
	return (
		<div className={`${styles.inputContainerContainer} ${homeVersion ? styles.homeVersion : ""}`}>
			<div className={`${styles.inputContainer} ${focused ? styles.focusedState : ""}`}>
				<input
					className={styles.input}
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					placeholder="Search for a show"
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyUp={e => {
						if (e.key === "Enter") {
							onSubmit();
							e.preventDefault();
						}
					}}
				/>
				<SearchIcon className={styles.searchIcon} />
			</div>
		</div>
	);
}
