'use server';

import { createClient } from '@supabase/supabase-js';

type Fields = { name: string; email: string; message: string };

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fields?: Fields;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // People never see this field; bots fill in everything.
  if (formData.get('company')) return { status: 'success', message: 'Thanks, your message is in.' };

  const fields: Fields = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  if (!fields.name || fields.name.length > 120) {
    return { status: 'error', message: 'Add your name so I know who I’m talking to.', fields };
  }
  if (!EMAIL_PATTERN.test(fields.email)) {
    return { status: 'error', message: 'That email address doesn’t look right.', fields };
  }
  if (fields.message.length < 10 || fields.message.length > 5000) {
    return { status: 'error', message: 'Tell me a little more, at least a sentence.', fields };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { status: 'error', message: 'The form is offline right now. Email me instead.', fields };
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from('messages').insert(fields);

  if (error) {
    console.error('Contact form insert failed', error.message);
    return { status: 'error', message: 'That didn’t send. Try again, or email me instead.', fields };
  }

  return { status: 'success', message: 'Thanks, your message is in. I’ll get back to you soon.' };
}
