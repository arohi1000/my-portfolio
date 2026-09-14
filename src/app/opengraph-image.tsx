import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: 72,
          background: '#ecebe6',
          color: '#151513',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#ff5a1f' }} />
          {site.title}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 190,
            fontWeight: 700,
            letterSpacing: -10,
            lineHeight: 0.85,
          }}
        >
          <span>Agnivesh</span>
          <span style={{ alignSelf: 'flex-end' }}>Arohi</span>
        </div>
      </div>
    ),
    size,
  );
}
