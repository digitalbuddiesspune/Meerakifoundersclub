function EyeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EditIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h6" /><path d="M14.5 4.5 19.5 9.5" />
      <path d="M12 7 5 14v5h5l7-7a1.8 1.8 0 0 0 0-2.5l-2.5-2.5A1.8 1.8 0 0 0 12 7Z" />
    </svg>
  );
}

function TrashIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 6h18" /><path d="M8 6V4.8A1.8 1.8 0 0 1 9.8 3h4.4A1.8 1.8 0 0 1 16 4.8V6" />
      <path d="m8.5 10 .5 8m6-8-.5 8M6.5 6l1 14a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8l1-14" />
    </svg>
  );
}

const baseBtn = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition";

export function ViewActionButton({ label = "View", onClick, className = "", ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseBtn} border border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 ${className}`}
      {...props}
    >
      <EyeIcon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

export function EditActionButton({ label = "Edit", onClick, className = "", ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseBtn} border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 ${className}`}
      {...props}
    >
      <EditIcon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

export function DeleteActionButton({ label = "Delete", onClick, className = "", ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseBtn} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 ${className}`}
      {...props}
    >
      <TrashIcon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

export { EditIcon, EyeIcon, TrashIcon };
