import clsx from "clsx";
export default function Button({ text, onClick, className }: { text: string; onClick: () => void; className?: string }) {
  return (
    <button
      className={clsx("text-xs bg-(--signature-blue) py-px px-2 rounded-xs text-inherit cursor-pointer", className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
