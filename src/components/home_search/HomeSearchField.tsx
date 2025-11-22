import clsx from "clsx";
import SearchIcon from "../../assets/icons/search.svg";
import styles from "./HomeSearchField.module.css";

export default function HomeSearchField({
  value,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  focused,
}: {
  value: string;
  onChange: (newValue: string) => void;
  onFocus: () => any;
  onBlur: () => any;
  onSubmit: () => any;
  focused: boolean;
}) {
  return (
    <div className={"h-[38px] w-[300px]"}>
      <div className="relative h-full z-11">
        <input
          className="bg-(--strong-foreground) outline-none rounded-sm text-(--signature-offwhite) w-full h-full placeholder:text-(--signature-offwhite) placeholder:opacity-100 focus:placeholder:opacity-0 text-[15px] px-3.5 py-2"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a show"
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmit();
              e.preventDefault();
            }
          }}
        />
        <SearchIcon className="fill-(--signature-offwhite) absolute right-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5" />
      </div>
    </div>
  );
}
