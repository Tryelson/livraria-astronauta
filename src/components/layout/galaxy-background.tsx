/**
 * Fundo fixo de galáxia — puramente decorativo (CSS em globals.css).
 * Respeita prefers-reduced-motion.
 */
export function GalaxyBackground() {
  return (
    <div
      aria-hidden
      className="galaxy-background pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="galaxy-nebula galaxy-nebula--orange" />
      <div className="galaxy-nebula galaxy-nebula--teal" />
      <div className="galaxy-nebula galaxy-nebula--violet" />
      <div className="galaxy-stars galaxy-stars--far" />
      <div className="galaxy-stars galaxy-stars--mid" />
      <div className="galaxy-stars galaxy-stars--near" />
      <div className="galaxy-shooting-star" />
    </div>
  );
}
