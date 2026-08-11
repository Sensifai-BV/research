import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function LatexRenderer({ content, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !content) return;

    const container = containerRef.current;
    container.innerHTML = '';

    // Regex matching block math ($$...$$ or \[...\]) and inline math (\(...` or $...$)
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?:\$[^$\n]+\$))/g;
    const parts = content.split(regex);

    parts.forEach(part => {
      if (!part) return;

      if ((part.startsWith('$$') && part.endsWith('$$')) || (part.startsWith('\\[') && part.endsWith('\\]'))) {
        const math = part.startsWith('$$') ? part.slice(2, -2).trim() : part.slice(2, -2).trim();
        const el = document.createElement('div');
        el.className = 'my-4 text-center overflow-x-auto py-2 font-serif text-lg';
        try {
          katex.render(math, el, { displayMode: true, throwOnError: false });
        } catch {
          el.textContent = part;
        }
        container.appendChild(el);
      } else if ((part.startsWith('\\(') && part.endsWith('\\)')) || (part.startsWith('$') && part.endsWith('$') && part.length > 2)) {
        const math = part.startsWith('\\(') ? part.slice(2, -2).trim() : part.slice(1, -1).trim();
        const el = document.createElement('span');
        el.className = 'inline-block px-1 font-serif';
        try {
          katex.render(math, el, { displayMode: false, throwOnError: false });
        } catch {
          el.textContent = part;
        }
        container.appendChild(el);
      } else {
        const lines = part.split('\n');
        lines.forEach((line, i) => {
          if (i > 0) container.appendChild(document.createElement('br'));
          if (line) {
            const span = document.createElement('span');
            span.textContent = line;
            container.appendChild(span);
          }
        });
      }
    });
  }, [content]);

  return <div ref={containerRef} className={className} />;
}
