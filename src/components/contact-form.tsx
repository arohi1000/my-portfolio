'use client';

import { useActionState } from 'react';
import { sendMessage, type ContactState } from '@/app/actions';

const initialState: ContactState = { status: 'idle' };

const field =
  'w-full border-b border-line bg-transparent pb-3 pt-1 text-lg outline-none transition-colors duration-200 ease-[ease] placeholder:text-muted/70 focus:border-ink';
const label = 'font-mono text-xs uppercase tracking-[0.14em] text-muted';

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const values = state.fields;

  return (
    <form action={formAction} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={label}>Name</span>
          <input
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            defaultValue={values?.name}
            className={field}
          />
        </label>
        <label className="grid gap-2">
          <span className={label}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={values?.email}
            className={field}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className={label}>What are you working on?</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          defaultValue={values?.message}
          className={`${field} resize-none`}
        />
      </label>

      <div hidden>
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-7 py-4 font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.97] disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send message'}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={state.status === 'error' ? 'text-sm text-accent-text' : 'text-sm text-muted'}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
