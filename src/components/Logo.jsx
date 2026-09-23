import { PlayIcon } from "./Icons";

// Wordmark: ember play badge + "MSG" in the display font.
const Logo = ({ className = "" }) => (
  <span className={"inline-flex select-none items-center gap-2 " + className}>
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-accent to-accent-2 text-accent-fg shadow-[0_0_24px_-4px_var(--accent)]">
      <PlayIcon className="h-4 w-4 translate-x-px" />
    </span>
    <span className="font-display text-3xl leading-none tracking-wider text-fg">
      MSG
    </span>
  </span>
);

export default Logo;
