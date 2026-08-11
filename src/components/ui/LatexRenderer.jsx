import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function renderInlineMarkdown(text, parentElement) {
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-zinc-950">$1</strong>')
    .replace(/__(.*?)__/g, '<strong class="font-extrabold text-zinc-950">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-xs font-mono text-indigo-600">$1</code>');

  parentElement.innerHTML = formatted;
}

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
        el.className = 'my-5 text-center overflow-x-auto py-3 px-4 rounded-xl border border-indigo-100 bg-indigo-50/40 font-serif text-lg text-zinc-950 shadow-2xs';
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
        // Parse markdown structural elements (headings, HR, lists, bold)
        const lines = part.split('\n');
        lines.forEach((line) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return;

          if (trimmedLine === '---' || trimmedLine === '***' || trimmedLine === '___') {
            const hr = document.createElement('hr');
            hr.className = 'my-6 border-zinc-200/80';
            container.appendChild(hr);
            return;
          }

          if (trimmedLine.startsWith('### ')) {
            const h3 = document.createElement('h3');
            h3.className = 'text-lg font-extrabold text-zinc-950 mt-6 mb-2 tracking-tight';
            renderInlineMarkdown(trimmedLine.slice(4), h3);
            container.appendChild(h3);
            return;
          }

          if (trimmedLine.startsWith('## ')) {
            const h2 = document.createElement('h2');
            h2.className = 'text-xl font-black text-zinc-950 mt-8 mb-3 tracking-tight';
            renderInlineMarkdown(trimmedLine.slice(3), h2);
            container.appendChild(h2);
            return;
          }

          if (trimmedLine.startsWith('# ')) {
            const h1 = document.createElement('h1');
            h1.className = 'text-2xl font-black text-zinc-950 mt-8 mb-4 tracking-tight';
            renderInlineMarkdown(trimmedLine.slice(2), h1);
            container.appendChild(h1);
            return;
          }

          const isOrderedList = /^\d+\.\s+/.test(trimmedLine);
          const isUnorderedList = /^[-*+]\s+/.test(trimmedLine);

          if (isOrderedList || isUnorderedList) {
            const listDiv = document.createElement('div');
            listDiv.className = 'my-1.5 pl-2 sm:pl-4 flex items-start gap-2 text-zinc-800 font-normal leading-relaxed text-sm sm:text-base';
            const bullet = document.createElement('span');
            bullet.className = 'font-extrabold text-indigo-600 shrink-0';
            bullet.textContent = isOrderedList ? trimmedLine.match(/^\d+\./)[0] : '•';
            const contentSpan = document.createElement('span');
            const listText = isOrderedList ? trimmedLine.replace(/^\d+\.\s+/, '') : trimmedLine.replace(/^[-*+]\s+/, '');
            renderInlineMarkdown(listText, contentSpan);
            listDiv.appendChild(bullet);
            listDiv.appendChild(contentSpan);
            container.appendChild(listDiv);
            return;
          }

          const p = document.createElement('p');
          p.className = 'my-2 text-zinc-800 leading-relaxed font-normal text-base sm:text-lg';
          renderInlineMarkdown(line, p);
          container.appendChild(p);
        });
      }
    });
  }, [content]);

  return <div ref={containerRef} className={className} />;
}
