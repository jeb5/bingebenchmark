import Image from "next/image";
import transpixel from "@/assets/trans-pixel.png";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

export default function Poster({
  posterURL,
  posterWidth,
  showName,
  className,
}: {
  posterURL: string;
  posterWidth: number;
  showName?: string;
  className?: string;
}) {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [posterURL]);

  return (
    <Image
      src={error ? transpixel : posterURL}
      alt={showName ? `${showName} poster` : ""}
      className={clsx("max-w-none object-cover rounded-[3px] bg-(--strong-foreground)", className)}
      style={{
        width: posterWidth,
        height: posterWidth * (3 / 2),
      }}
      onError={() => setError(true)}
      width={posterWidth}
      height={Math.floor(posterWidth * (3 / 2))}
    />
  );
}
