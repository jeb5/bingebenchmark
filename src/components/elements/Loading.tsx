import LoadingSVG from "@/assets/icons/loading.svg";
import { clsx } from "clsx";

export default function Loading({ className }: { className?: string }) {
  return <LoadingSVG className={clsx("loading-svg", className)} />;
}
