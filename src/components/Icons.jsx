// Small inline SVG icons (inherit size from className and color from text color).
const Svg = ({ className = "h-5 w-5", children, filled = false }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const PlayIcon = ({ className }) => (
  <Svg className={className} filled>
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
  </Svg>
);

export const InfoIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
);

export const SparkleIcon = ({ className }) => (
  <Svg className={className} filled>
    <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5ZM19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1-2.1-.9 2.1-.9L19 15Z" />
  </Svg>
);

export const HomeIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
  </Svg>
);

export const SunIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const MoonIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </Svg>
);

export const LogOutIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M15 17l5-5-5-5M20 12H9M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  </Svg>
);

export const ChevronLeftIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M15 18l-6-6 6-6" />
  </Svg>
);

export const ChevronRightIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M9 18l6-6-6-6" />
  </Svg>
);

export const CloseIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

export const GlobeIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Svg>
);
