import Image from "next/image";

export default function Poster({ posterURL, posterWidth }: { posterURL: string; posterWidth: number }) {
  return (
    <Image
      src={posterURL}
      alt=""
      className="max-w-none showPoster object-cover"
      style={{
        width: posterWidth,
        height: posterWidth * (3 / 2),
      }}
      width={posterWidth}
      height={Math.floor(posterWidth * (3 / 2))}
    />
  );
}
