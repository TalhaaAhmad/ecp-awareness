export function LandmarksSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Crescent and Star */}
      <path
        d="M 440 25 A 18 18 0 1 1 424 53 A 15 15 0 1 0 440 25 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <polygon
        points="444,28 447,36 455,36 449,41 451,49 444,44 437,49 439,41 433,36 441,36"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Ground Line */}
      <line x1="0" y1="95" x2="500" y2="95" stroke="currentColor" strokeWidth="2" opacity="0.6" />

      {/* Ziarat Residency (Left) */}
      <rect x="20" y="70" width="40" height="25" fill="currentColor" opacity="0.75" />
      <polygon points="15,70 40,48 65,70" fill="currentColor" opacity="0.85" />
      <rect x="36" y="55" width="8" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Faisal Mosque (Center-Left) */}
      {/* 4 Minarets */}
      <polygon points="110,18 113,85 107,85" fill="currentColor" opacity="0.9" />
      <polygon points="180,18 183,85 177,85" fill="currentColor" opacity="0.9" />
      <polygon points="125,28 127,88 123,88" fill="currentColor" opacity="0.8" />
      <polygon points="165,28 167,88 163,88" fill="currentColor" opacity="0.8" />
      {/* Tent-shaped Main Hall */}
      <polygon points="145,35 118,85 172,85" fill="currentColor" opacity="0.7" />
      <polygon points="145,35 130,85 160,85" fill="currentColor" opacity="0.85" />
      <line x1="145" y1="28" x2="145" y2="35" stroke="currentColor" strokeWidth="1.5" />

      {/* Minar-e-Pakistan (Center-Right) */}
      {/* Spire */}
      <polygon points="260,10 263,78 257,78" fill="currentColor" opacity="0.95" />
      {/* Dome / Petals */}
      <path d="M 252 78 Q 260 70 268 78 L 272 88 L 248 88 Z" fill="currentColor" opacity="0.85" />
      {/* Base */}
      <path d="M 242 88 Q 260 84 278 88 L 282 95 L 238 95 Z" fill="currentColor" opacity="0.9" />

      {/* Quaid-e-Azam Mazar (Right) */}
      <path d="M 330 65 A 25 25 0 0 1 380 65 L 385 95 L 325 95 Z" fill="currentColor" opacity="0.8" />
      <rect x="345" y="78" width="20" height="17" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
