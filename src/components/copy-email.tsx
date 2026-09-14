'use client';

import { useEffect, useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  // Both labels share one grid cell so the button never changes width.
  const label = 'col-start-1 row-start-1 transition-[opacity,filter] duration-200 ease-out';

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm transition-transform duration-150 ease-out active:scale-[0.97]"
    >
      <span className="grid text-left">
        <span className={`${label} ${copied ? 'opacity-0 blur-[2px]' : ''}`}>{email}</span>
        <span className={`${label} ${copied ? '' : 'opacity-0 blur-[2px]'}`} aria-hidden="true">
          Copied to clipboard
        </span>
      </span>
      <span className="font-mono text-xs text-muted">Copy</span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </button>
  );
}
