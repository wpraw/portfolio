export default function PhotoPlaceholder({ label = "TWOJE ZDJĘCIE", className = "", ...rest }) {
  return (
    <div className={`bg-olive p-3 shadow-[12px_12px_0_0_var(--color-royal)] ${className}`} {...rest}>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-steel/40">
        <svg className="absolute inset-0 h-full w-full opacity-25" aria-hidden>
          <defs>
            <pattern id="diag" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>
        <span className="font-hand rotate-[-6deg] text-2xl text-paper/70">{label}</span>
      </div>
    </div>
  );
}
