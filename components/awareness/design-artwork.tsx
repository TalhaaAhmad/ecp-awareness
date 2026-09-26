import type { CSSProperties } from "react";
import { preload } from "react-dom";
import styles from "./design-artwork.module.css";

type ArtworkSource = "home" | "quiz" | "game";

type DesignArtworkProps = {
  source: ArtworkSource;
  crop: readonly [number, number, number, number];
  alt?: string;
  className?: string;
  priority?: boolean;
};

const dimensions: Record<ArtworkSource, readonly [number, number]> = {
  home: [1123, 1431],
  quiz: [1114, 1500],
  game: [1125, 1422],
};

/** Show an unchanged design-pack illustration using the pack's centered cover crop. */
export function DesignArtwork({
  source,
  crop,
  alt = "",
  className = "",
  priority = false,
}: DesignArtworkProps) {
  const [x, y, width, height] = crop;
  const [sourceWidth, sourceHeight] = dimensions[source];
  const src = `/design/${source}-reference.jpeg`;
  const style = { "--artwork-ratio": `${width} / ${height}` } as CSSProperties;

  if (priority) preload(src, { as: "image", fetchPriority: "high" });

  return (
    <div
      className={`${styles.frame} ${className}`.trim()}
      style={style}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <svg
        className={styles.image}
        viewBox={`${x} ${y} ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <image href={src} width={sourceWidth} height={sourceHeight} />
      </svg>
    </div>
  );
}
