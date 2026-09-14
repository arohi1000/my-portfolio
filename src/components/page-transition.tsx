import { ViewTransition, type ReactNode } from 'react';

// Links tag navigations as `nav-forward` (into a case study) or `nav-back`
// (towards home). Untagged transitions, like the browser back button, don't slide.
const directional = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' };

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}
