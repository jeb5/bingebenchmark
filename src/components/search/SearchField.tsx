import clsx from "clsx";
import SearchIcon from "../../assets/icons/search.svg";

export default function SearchField({
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
    <div className="h-[29px]">
      <div className="relative h-full z-11">
        <input
          className={clsx(
            "bg-(--strong-foreground) outline-none rounded-sm text-(--signature-offwhite) w-full h-full placeholder:text-(--signature-offwhite) placeholder:opacity-100 focus:placeholder:opacity-0 text-[14px] px-[9px] py-1.5",
            { "rounded-b-none": focused }
          )}
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
        <SearchIcon className="fill-(--signature-offwhite) absolute top-1/2 -translate-y-1/2 w-5 h-5 right-1" />
      </div>
    </div>
  );
}
