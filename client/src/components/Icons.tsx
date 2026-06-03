export function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-8 h-8 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 2l7 4v6c0 5-3.58 9.74-7 11-3.42-1.26-7-6-7-11V6l7-4z"
      />
    </svg>
  );
}

export function LightningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-8 h-8 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

export function MobileIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-8 h-8 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 18h2" />
    </svg>
  );
}

export function PeopleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-8 h-8 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4h-1" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20H4v-2a4 4 0 014-4h1" />
      <circle cx="12" cy="7" r="4" strokeWidth={1.5} />
    </svg>
  );
}
