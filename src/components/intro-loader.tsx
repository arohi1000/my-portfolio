import type { CSSProperties } from 'react';

const words = ['Storefronts', 'Platforms', 'Launch sites', 'Motion'];
const columns = [0, 1, 2, 3, 4, 5];

const vars = (values: Record<string, number>) => values as CSSProperties;

/**
 * First-visit intro: words flash while a counter runs to 100, the name rises,
 * then ink and accent columns lift away in turn to reveal the page.
 *
 * It is pure CSS. The inline boot script in the root layout decides whether it
 * plays (`data-intro` on <html>) and removes it when the exit has finished, so
 * it never waits on React and never blocks the server-rendered content below.
 */
export function IntroLoader() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-panels intro-panels-accent">
        {columns.map((c) => (
          <span key={c} className="intro-col" style={vars({ '--c': c })} />
        ))}
      </div>
      <div className="intro-panels intro-panels-ink">
        {columns.map((c) => (
          <span key={c} className="intro-col" style={vars({ '--c': c })} />
        ))}
      </div>

      <div className="intro-content">
        <div className="intro-meta">
          <span>Agnivesh Arohi</span>
          <span>Portfolio v2 · 2026</span>
        </div>

        <div className="intro-words">
          {words.map((word, i) => (
            <span key={word} className="intro-word" style={vars({ '--w': i })}>
              {word}
            </span>
          ))}
          <span className="intro-name">
            <span style={vars({ '--w': words.length })}>
              Agnivesh Arohi
              <span className="intro-dot" />
            </span>
          </span>
        </div>

        <div className="intro-footer">
          <span className="intro-count" />
          <span>Delhi, India</span>
        </div>

        <span className="intro-bar" />
      </div>
    </div>
  );
}
