/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

type CropSource = "home" | "quiz" | "journey" | "maze";
type CropProps = {
  source: CropSource;
  x?: number;
  y: number;
  width: number;
  height: number;
  alt?: string;
  className?: string;
  priority?: boolean;
};

const widths: Record<CropSource, number> = { home: 1205, quiz: 1141, journey: 1215, maze: 905 };
const heights: Record<CropSource, number> = { home: 1536, quiz: 1536, journey: 1536, maze: 1024 };

/** Display a cropped region of the reference artwork with responsive scaling. */
export function ReferenceCrop({
  source,
  x = 0,
  y,
  width,
  height,
  alt = "",
  className = "",
  priority = false,
}: CropProps) {
  const style: CSSProperties = { aspectRatio: `${width} / ${height}` };
  const fullWidth = widths[source];
  const fullHeight = heights[source];

  return (
    <div
      className={`reference-crop ${className}`}
      style={style}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <img
        src={`/reference/${source}.jpg`}
        alt=""
        loading={priority ? "eager" : "lazy"}
        draggable={false}
        style={{
          width: `${(fullWidth / width) * 100}%`,
          maxWidth: "none",
          height: "auto",
          position: "absolute",
          left: `${(-x / width) * 100}%`,
          top: 0,
          transform: `translateY(${(-y / fullHeight) * 100}%)`,
        }}
      />
    </div>
  );
}
