function IconBase({ children, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function GridIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </IconBase>
  );
}

export function BriefcaseIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M3 12h18" />
    </IconBase>
  );
}

export function PlusSquareIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </IconBase>
  );
}

export function FileTextIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6M9 9h1" />
    </IconBase>
  );
}

export function PenSquareIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 21h6" />
      <path d="M14.5 4.5 19.5 9.5" />
      <path d="M12 7 5 14v5h5l7-7a1.8 1.8 0 0 0 0-2.5l-2.5-2.5A1.8 1.8 0 0 0 12 7Z" />
    </IconBase>
  );
}

export function ChevronIcon({ open, className = "" }) {
  return (
    <IconBase className={className}>
      {open ? <path d="m6 9 6 6 6-6" /> : <path d="m9 6 6 6-6 6" />}
    </IconBase>
  );
}

export function UsersIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </IconBase>
  );
}

export function TrendUpIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 16 10 10l4 4 6-8" />
      <path d="M16 6h4v4" />
    </IconBase>
  );
}

export function SparklesIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7Z" />
      <path d="m19 14 .8 2 .2.2 2 .8-2 .8-.2.2-.8 2-.8-2-.2-.2-2-.8 2-.8.2-.2Z" />
      <path d="m5 14 .8 2 .2.2 2 .8-2 .8-.2.2-.8 2-.8-2-.2-.2-2-.8 2-.8.2-.2Z" />
    </IconBase>
  );
}
